_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[7],{0:function(e,t,n){n("GcxT"),e.exports=n("nOHt")},"1TCz":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d}));var r=n("cpVT"),o=n("nKUr"),a=n("q1tI"),i=n("20a2"),c=n("sKF2"),u=n("k07w"),s=n.n(u).a.analytics.gaID;n("F3Qk"),n("hL/g"),n("vg9a");function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e){var t=e.Component,n=e.pageProps,r=Object(i.useRouter)();return Object(a.useEffect)((function(){var e=function(e){!function(e){window.gtag("config",s,{page_path:e})}(e)};return r.events.on("routeChangeComplete",e),function(){r.events.off("routeChangeComplete",e)}}),[r.events]),Object(o.jsx)(c.a,{defaultTheme:"system",enableSystem:!0,attribute:"class",children:Object(o.jsx)(t,m({},n))})}},"20a2":function(e,t,n){e.exports=n("nOHt")},F3Qk:function(e,t,n){},GcxT:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n("1TCz")}])},cpVT:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},g4pe:function(e,t,n){e.exports=n("8Kt/")},"hL/g":function(e,t,n){},k07w:function(e,t){e.exports={title:"whitedelay",author:{name:"Jiyeon Baek",summary:"Junior programmer"},email:"whitedelay@gmail.com",github:"https://github.com/whitedelay",description:"dev blog",siteUrl:"https://whitedelay.github.io",language:"ko-KR",analytics:{gaID:"G-W2MDDBSTKQ"}}},sKF2:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return u}));var r=n("q1tI"),o=n.n(r),a=n("g4pe"),i=n.n(a),c=Object(r.createContext)({setTheme:function(e){},themes:[]}),u=function(){return Object(r.useContext)(c)},s=["light","dark"],l="(prefers-color-scheme: dark)",m=function(e){var t=e.forcedTheme,n=e.disableTransitionOnChange,a=void 0!==n&&n,i=e.enableSystem,u=void 0===i||i,m=e.enableColorScheme,v=void 0===m||m,b=e.storageKey,y=void 0===b?"theme":b,g=e.themes,w=void 0===g?["light","dark"]:g,O=e.defaultTheme,j=void 0===O?u?"system":"light":O,T=e.attribute,k=void 0===T?"data-theme":T,E=e.value,S=e.children,_=Object(r.useState)((function(){return f(y,j)})),x=_[0],C=_[1],P=Object(r.useState)((function(){return f(y)})),L=P[0],I=P[1],K=E?Object.values(E):w,D=Object(r.useCallback)((function(e){var n=p(e);I(n),"system"!==x||t||M(n,!1)}),[x,t]),N=Object(r.useRef)(D);N.current=D;var M=Object(r.useCallback)((function(e,t,n){void 0===t&&(t=!0),void 0===n&&(n=!0);var r=(null==E?void 0:E[e])||e,o=a&&n?h():null;if(t)try{localStorage.setItem(y,e)}catch(e){}if("system"===e&&u){var i=p();r=(null==E?void 0:E[i])||i}if(n){var c,s=document.documentElement;"class"===k?((c=s.classList).remove.apply(c,K),s.classList.add(r)):s.setAttribute(k,r),null==o||o()}}),[]);Object(r.useEffect)((function(){var e=function(){return N.current.apply(N,[].slice.call(arguments))},t=window.matchMedia(l);return t.addListener(e),e(t),function(){return t.removeListener(e)}}),[]);var J=Object(r.useCallback)((function(e){t?M(e,!0,!1):M(e),C(e)}),[t]);return Object(r.useEffect)((function(){var e=function(e){e.key===y&&J(e.newValue)};return window.addEventListener("storage",e),function(){return window.removeEventListener("storage",e)}}),[J]),Object(r.useEffect)((function(){if(v){var e=t&&s.includes(t)?t:x&&s.includes(x)?x:"system"===x&&L||null;document.documentElement.style.setProperty("color-scheme",e)}}),[v,x,L,t]),o.a.createElement(c.Provider,{value:{theme:x,setTheme:J,forcedTheme:t,resolvedTheme:"system"===x?L:x,themes:u?[].concat(w,["system"]):w,systemTheme:u?L:void 0}},o.a.createElement(d,{forcedTheme:t,storageKey:y,attribute:k,value:E,enableSystem:u,defaultTheme:j,attrs:K}),S)},d=Object(r.memo)((function(e){var t=e.forcedTheme,n=e.storageKey,r=e.attribute,a=e.enableSystem,c=e.defaultTheme,u=e.value,s="class"===r?"var d=document.documentElement.classList;d.remove("+e.attrs.map((function(e){return"'"+e+"'"})).join(",")+");":"var d=document.documentElement;",m=function(e,t){e=(null==u?void 0:u[e])||e;var n=t?e:"'"+e+"'";return"class"===r?"d.add("+n+")":"d.setAttribute('"+r+"', "+n+")"},d="system"===c;return o.a.createElement(i.a,null,o.a.createElement("script",t?{key:"next-themes-script",dangerouslySetInnerHTML:{__html:"!function(){"+s+m(t)+"}()"}}:a?{key:"next-themes-script",dangerouslySetInnerHTML:{__html:"!function(){try {"+s+"var e=localStorage.getItem('"+n+"');"+(d?"":m(c)+";")+'if("system"===e||(!e&&'+d+')){var t="'+l+'",m=window.matchMedia(t);m.media!==t||m.matches?'+m("dark")+":"+m("light")+"}else if(e) "+(u?"var x="+JSON.stringify(u)+";":"")+m(u?"x[e]":"e",!0)+"}catch(e){}}()"}}:{key:"next-themes-script",dangerouslySetInnerHTML:{__html:"!function(){try{"+s+'var e=localStorage.getItem("'+n+'");if(e){'+(u?"var x="+JSON.stringify(u)+";":"")+m(u?"x[e]":"e",!0)+"}else{"+m(c)+";}}catch(t){}}();"}}))}),(function(e,t){return e.forcedTheme===t.forcedTheme})),f=function(e,t){if("undefined"!=typeof window){var n;try{n=localStorage.getItem(e)||void 0}catch(e){}return n||t}},h=function(){var e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),function(){window.getComputedStyle(document.body),setTimeout((function(){document.head.removeChild(e)}),1)}},p=function(e){return e||(e=window.matchMedia(l)),e.matches?"dark":"light"}},vg9a:function(e,t,n){}},[[0,0,2,1]]]);