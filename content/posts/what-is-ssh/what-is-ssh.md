---
title: SSH란❓
description: SSH에 대한 정리글
date: 2021-03-09T11:24:00
slug: what-is-ssh
tags: ["network", "ssh"]
---

![ssh](ssh.png)

원격 서버에 ssh를 이용해 접속을 많이 했지만, 정확히 이게 어떤 것인지 잘 모르고 썼었던 것 같아 조사하여 정리해보았다.

**SSH**는 리눅스 서버에 원격으로 접속하기 위해 사용하는 보안 프로토콜을 의미한다. Telnet이나 rsh같이 보안에 취약한 다른 원격 프로토콜들을 대체한, 현재 가장 보편적인 원격 접속 프로토콜이다. SSH는 패킷을 암호화하여 인터넷같이 보안되지 않는 네트워크 속에서도 안전한 연결을 제공한다.

<hr>

# **SSH Work Flow**

## **연결 시작**

SSH 연결은 클라이언트에 의해 시작된다. 클라이언트는 서버의 ssh 포트에 TCP 연결을 하게 되고, ssh 프로토콜 버전과 ssh 서버의 package 버전을 얻게 된다. 만약 클라이언트와 프로토콜 버전이 같다면 연결을 진행하고, 아니라면 연결을 끊는다.

## **클라이언트의 서버 검증**

클라이언트가 프로토콜 버전을 확인한 후 연결을 지속하기로 하면, 서버는 이제 클라이언트에게 **공개 키(public key)** 를 건네준다. 만약 서버와 클라이언트가 처음 연결한다면, 클라이언트는 다음과 같은 경고 메시지를 받는다.

```bash
The authenticity of host '[ip]:[port]' can't be established.
RSA key fingerprint is [server's public key].
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

연결을 한번 하고 나면 해당 키는 클라이언트의 `~/.ssh/known_hosts`파일에 저장되어 이후 해당 서버에 접속시엔 클라이언트가 해당 파일을 참고하여 서버를 확인하므로 경고 없이 연결된다.

## **세션 키 생성**

서버를 확인하고 나면, 서버와 클라이언트는 [Diffie-Hellman 알고리즘](https://ko.wikipedia.org/wiki/%EB%94%94%ED%94%BC-%ED%97%AC%EB%A8%BC_%ED%82%A4_%EA%B5%90%ED%99%98)을 이용해 같이 **세션 키(session key)**를 만든다(SSH 버전 2 기준이며, 버전 1은 다른 방식으로 서버 혼자 세션 키를 만든다). 이렇게 만들어진 세션 키는 대칭 키(암호화와 복호화에 같은 키를 사용한다)이며, 앞으로 클라이언트와 서버간의 모든 통신을 암호화, 복호화하는데 사용된다.

## **클라이언트 인증**

마지막으로는, 클라이언트의 인증 과정을 거친다. 인증은 **password 방식**과 **key 방식**이 있다.

🔢 **Password로 인증**

password 인증은 key방식에 비해 간단하다. 클라이언트는 로그인을 원하는 계정의 비밀번호를 입력하여 접속한다. 이 때 전송되는 password는 Step 3에서 만들어낸 세션 키로 암호화되어 전송되기 때문에 안전하다.

🔑 **Key로 인증**

인증은 [공개키 암호 방식](https://ko.wikipedia.org/wiki/%EA%B3%B5%EA%B0%9C_%ED%82%A4_%EC%95%94%ED%98%B8_%EB%B0%A9%EC%8B%9D)으로 진행된다. 암호화에 사용되며 누구에게나 공유 가능한 **공개키(Public key)** 와, 복호화에 사용되고 아무에게도 공유해서는 안 되는 **개인 키(Private key)** 를 이용해 암호화를 진행한다.

과정은 다음과 같다.

1. 클라이언트는 서버에 공개 키를 보낸다.
2. 서버는 클라이언트가 공개 키로 접속하길 원하는 계정의 `~/.ssh/authorized_keys` 파일을 참고한다.
3. 해당 키가 파일에 존재한다면, 서버는 생성한 난수로 공개 키를 암호화한 후 클라이언트로 보낸다.
4. 만약 클라이언트가 공개키와 쌍인 개인 키를 가지고 있으면, 클라이언트는 해당 메시지를 풀어서 서버가 만들어낸 난수를 알게 된다.
5. 클라이언트는 알게 된 난수와, 앞서 공유한 세션 키를 연산하여 해당 값의 [MD5](https://ko.wikipedia.org/wiki/MD5) Hash 값을 계산한다.
6. 클라이언트는 이 MD5 Hash를, 서버의 요청에 대한 답으로 보낸다.
7. 서버도 마찬가지로 세션 키와 난수를 이용하여 MD5 Hash 값을 스스로 계산하고, 이 값과 클라이언트가 보낸 값을 비교한다. 만약 두 값이 일치하면 클라이언트의 인증이 완료된다.

## **인증 완료**

모든 인증이 완료되면, 클라이언트와 서버의 연결이 수립된다.

앞으로의 모든 통신은 Step 3에서 만들어낸 세션키로 암호화된 보안 채널을 통해 이루어진다. 공개키 암호화 방식은 대칭키 방식보다 비용이 많이 들기 때문에 세션 키를 이용하여 암호화와 복호화를 진행한다.

<hr>

# **SSH Key로 인증하기**

이제 패스워드 대신 키를 이용해 원격 서버에 인증하는 방법을 살펴보자

## **RSA 키 생성**

대부분의 OS에는 OpenSSH라는 ssh client 프로그램이 설치되어 있는데, OpenSSH로 쉽게 key pair를 만들 수 있다. 먼저 터미널을 열고 아래 커맨드를 입력한다.

```bash
$ ssh-keygen -t rsa
```

`-t`는 key 타입을 지정하는 옵션이며, rsa1, rsa, dsa 총 3가지가 있다.

rsa1은 프로토콜 버전 1을 위한 것이며 rsa와 dsa는 버전 2를 위한 것인데, 현재 버전1은 거의 없으며 dsa보다는 rsa를 사용할 것이 권장되므로 rsa 타입으로 key를 만든다.

## **키 저장 및 비밀번호 설정**

위의 커맨드를 입력하면 다음과 같은 질문이 나온다.

```bash
Enter file in which to save the key (~/.ssh/id_rsa):
```

바로 `Enter`를 입력하게 되면 옆에 표시된 위치에 key가 저장되고, 아니면 직접 경로를 입력하면 된다.

```bash
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

그리고 나면 암호를 입력하라는 메시지가 뜬다. 암호를 설정하게 되면, 개인 키를 사용할 때 마다 암호를 입력해야 하는 단점이 있지만 좀 더 안전하다.

만약 설정하기 싫다면 바로 `Enter`를 입력하면 된다.

암호 설정까지 마치면, 지정했던 경로에 public key는 `id_rsa.pub`으로, private key는 `id_rsa`로 저장되어 있다.

## **원격 서버에 공개 키 복사하기**

이제 키 생성을 마치고 나면, 접속을 원하는 서버의 `~/.ssh/authorized_keys` 파일에 공개 키를 복사해놓으면 된다.

아래처럼 `ssh-copy-id` 커맨드를 사용하거나

```bash
# -i option으로 공개 키 경로를 지정하면 된다.
$ ssh-copy-id -i ~/.ssh/id_rsa.pub username@ip-address
```

또는 `ssh` 커맨드"<sup>커맨드</sup>"를 이용하여 복사할 수 있다.

```bash
$ cat ~/.ssh/id_rsa | ssh username@ip-address "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >>  ~/.ssh/authorized_keys"
```

위의 두 방법 말고도, 직접 복사를 할수도 있다.

아래 커맨드를 입력하여, 복사를 원하는 공개 키의 내용을 확인하고 `~/.ssh/authorized_keys`파일에 수동으로 붙여넣으면 된다.

```bash
$ cat ~/.ssh/id_rsa.pub
```

만약 원격 서버에 `~/.ssh`폴더가 없다면, 폴더를 생성한 후 파일을 만들어 키를 복사한다.

```bash
$ mkdir -p ~/.ssh
$ echo [public key string] >> ~/.ssh/authorized_keys
```

위의 과정을 거쳐 서버에 공개 키를 복사하고 나면, 다음 커맨드로 비밀번호 없이 접속이 가능하다.

```bash
$ ssh username@ip-address
```

<hr>

# **References**

[SSH Essentials: Working with SSH Servers, Clients, and Keys](https://www.digitalocean.com/community/tutorials/ssh-essentials-working-with-ssh-servers-clients-and-keys)

[Wikipedia: SSH (Secure Shell)](<https://en.wikipedia.org/wiki/SSH_(Secure_Shell)>)

[Understanding SSH workflow](https://medium.com/@Magical_Mudit/understanding-ssh-workflow-66a0e8d4bf65#:~:text=SSH%20protocol%20uses%20symmetric%20encryption,to%20encrypt%20all%20the%20communication)

[How To Set Up SSH Keys](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-2#step-two%E2%80%94store-the-keys-and-passphrase)

<br>

혹시 내용에 오류가 있을 경우 댓글로 알려주세요 🙂
