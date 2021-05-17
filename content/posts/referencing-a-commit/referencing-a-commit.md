---
title: "Git 커밋 가리키기"
description: 커밋을 가리키는 다양한 방법들
date: 2021-05-17T12:24:00
tags: ["git"]
---

# SHA-1 해시로 가리키기

커밋마다 각자 고유한 해시값을 지니는데, 이 해시값으로 커밋을 가리킬 수 있다.

`git log`를 하면 해당 커밋 로그가 나오는데, commit 문자 옆에 써진 엄청 긴 `ca82a6dff817...`(생략)과 같은 문자가 바로 SHA-1해시이다.

💡 SHA-1 해시를 전부 다 쓰지 않고 줄여 써도 커밋을 가리킬 수 있다. 줄인 해시가 중복되지 않았다는 가정하에, 최소 4개의 문자를 쓰면 가리킬 수 있다. (ex. `git show ca82`).

```bash
# git show 명령은 해당 커밋의 정보를 보여주는 명령어이다.
$ git show ca82a6dff817ec66f44342007202690a93763949
$ git show ca82
```

---

# 브랜치로 가리키기

브랜치 이름으로도 커밋을 가리킬 수 있다. 따라서 아래 두 명령의 결과는 같다.

```bash
$ git show ca82a6dff817ec66f44342007202690a93763949

# main이 ca82a6d... 커밋을 가리키고 있다고 가정
$ git show main
```

---

# `@{n}` : Reflog로 가리키기

Git은 자동으로 브랜치와 HEAD가 지난 몇 달 동안에 가리켰었던 커밋을 모두 기록하는데 이 로그를 `Reflog`라고 한다.

`Reflog`는 `git reflog`명령어를 실행하면 볼 수 있다.

```bash
$ git reflog
734713b HEAD@{0}: commit: fixed refs handling, added gc auto, updated
d921970 HEAD@{1}: merge phedders/rdocs: Merge made by recursive.
1c002dd HEAD@{2}: commit: added some blame and merge stuff
...
```

Git은 `reflog`에서 보는 것 처럼, 이전에 가리키던 것이 무엇인지 확인할 수 있기 때문에 `@{n}` 규칙을 사용하면 브랜치나 HEAD가 n번 전에 가리켰던 것을 알 수 있다.

```bash
$ git show HEAD@{3}
$ git show main@{2}
```

커밋 순서가 아닌 시간으로도 가리킬 수 있다.

`{yesterday}`, `{1 month 2 weeks 3 days 1 hour 1 second ago}`, `{1979-02-26 18:30:00}` 와 같은 포맷들이 가능하다.

```bash
$ git show main@{5 minutes ago}

$ git show main@{yesterday}
$ git show main@{3.days.ago} # dot도 가능

$ git show main@{one.week.ago}
$ git show main@{1 weeks ago}

$ git show main@{2.month.ago}
```

---

# `^` : 부모 커밋 가리키기

`HEAD^` 와 같은 형태로 쓴다. HEAD대신 커밋을 의미하는 어떤 문자도 들어갈 수 있다.

`^`를 여러번 쓸 수도 있다. ex) `HEAD^^`(조부모), `HEAD^^^`(조부모의 부모), ...

단, `HEAD^2` 처럼, `^` 와 숫자가 같이 붙는 경우엔, 해당 커밋의 부모를 선택할 수있다.

그래서 두 번째 부모가 있는 Merge 커밋에만 사용할 수 있다. 첫 번째 부모는 Merge했을 때 기준이 된 branch를 의미하고, 두 번째 부모는 Merge하고자 하는 branch를 의미한다.

```bash
A - B - C <- (HEAD, main)
     \_ D <- (issue1)

$ git merge issue1

A - B - C - E (HEAD, main)
     \_ D _/
     (issue1)

$ git checkout HEAD^2 # issue1으로 HEAD가 이동
```

---

# `~` : 위로 n번째 부모 커밋 가리키기

여러 단계의 부모 커밋으로 올라가고 싶을 때, `^`를 여러번 쓰기 보단, 수를 지정해서 올라가는 것이 편한데 이럴 때 사용한다.

`HEAD~`(부모 커밋), `HEAD~3` 과 같은 식으로 쓸 수 있다.

그리고 `^`과 `~`수식은 `HEAD~^2^^`와 같은 형식으로 다같이 사용할 수 있다.

## 표현 예제

아래는 `~`와 `^`를 사용해 커밋들을 표현하는 예제이다. 해당 그림은 git 홈페이지의 gitrevisions에서 좋은 예제인 것 같아 가져왔다.

```bash
G   H   I   J
 \ /     \ /
  D   E   F
   \  |  / \
    \ | /   |
     \|/    |
      B     C
       \   /
        \ /
         A

A =      = A^0
B = A^   = A^1     = A~1
C =      = A^2
D = A^^  = A^1^1   = A~2
E = B^2  = A^^2
F = B^3  = A^^3
G = A^^^ = A^1^1^1 = A~3
H = D^2  = B^^2    = A^^^2  = A~2^2
I = F^   = B^3^    = A^^3^
J = F^2  = B^3^2   = A^^3^2
```

---

# 범위로 커밋 가리키기

범위를 주고 여러 커밋을 조회할 때 사용한다.

## `..` : 두 브랜치의 차집합 커밋

`{A}..{B}`형태로 쓰며, A에는 없지만 B에는 있는 커밋을 조회한다.

같은 브랜치인 경우 A~B까지의 커밋을 조회한다고 생각하면 된다.

```bash
A - B - E - F <- main
    \ _ C - D <- experiment

$ git log main..experiment # main 브랜치에는 없지만 experiment에만 있는 커밋
D
C

$ git log experiment..main # experiment에는 없지만 main에만 있는 커밋
F
E

$ git log main^^..main # main^^~main까지의 커밋
F
E

$ git log main..main^^ # ouptut 없음
```

## `...` : 두 브랜치의 (합집합 - 교집합) 커밋

`{A}...{B}`형태로 쓰며, A와 B 두 브랜치 사이에서 공통 부분을 제외한 나머지 커밋들을 보여준다.

```bash
A - B - E - F <- main
    \ _ C - D <- experiment

$ git log master...experiment
F
E
D
C

$ git log master^^...master
F
E

$ git log master...master^^
F
E
```

---

# References

[Pro Git](https://git-scm.com/book/en/v2)
