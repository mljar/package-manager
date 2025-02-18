var _JUPYTERLAB;(()=>{"use strict";var e,r,t,n,a,o,i,u,s,l,f,d,c,p,h,v,g,m,b,y,w,k,S,j,E={379:(e,r,t)=>{var n={"./index":()=>t.e(7).then((()=>()=>t(7))),"./extension":()=>t.e(7).then((()=>()=>t(7))),"./style":()=>t.e(728).then((()=>()=>t(728)))},a=(e,r)=>(t.R=r,r=t.o(n,e)?n[e]():Promise.resolve().then((()=>{throw new Error('Module "'+e+'" does not exist in container.')})),t.R=void 0,r),o=(e,r)=>{if(t.S){var n="default",a=t.S[n];if(a&&a!==e)throw new Error("Container initialization failed as it has already been initialized with a different share scope");return t.S[n]=e,t.I(n,r)}};t.d(r,{get:()=>a,init:()=>o})}},P={};function T(e){var r=P[e];if(void 0!==r)return r.exports;var t=P[e]={id:e,exports:{}};return E[e](t,t.exports,T),t.exports}T.m=E,T.c=P,T.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return T.d(r,{a:r}),r},T.d=(e,r)=>{for(var t in r)T.o(r,t)&&!T.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},T.f={},T.e=e=>Promise.all(Object.keys(T.f).reduce(((r,t)=>(T.f[t](e,r),r)),[])),T.u=e=>e+"."+{7:"1e909998e63ec47f1777",728:"d5140372ce786055528e"}[e]+".js?v="+{7:"1e909998e63ec47f1777",728:"d5140372ce786055528e"}[e],T.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),T.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),e={},r="package-manager:",T.l=(t,n,a,o)=>{if(e[t])e[t].push(n);else{var i,u;if(void 0!==a)for(var s=document.getElementsByTagName("script"),l=0;l<s.length;l++){var f=s[l];if(f.getAttribute("src")==t||f.getAttribute("data-webpack")==r+a){i=f;break}}i||(u=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,T.nc&&i.setAttribute("nonce",T.nc),i.setAttribute("data-webpack",r+a),i.src=t),e[t]=[n];var d=(r,n)=>{i.onerror=i.onload=null,clearTimeout(c);var a=e[t];if(delete e[t],i.parentNode&&i.parentNode.removeChild(i),a&&a.forEach((e=>e(n))),r)return r(n)},c=setTimeout(d.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=d.bind(null,i.onerror),i.onload=d.bind(null,i.onload),u&&document.head.appendChild(i)}},T.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{T.S={};var e={},r={};T.I=(t,n)=>{n||(n=[]);var a=r[t];if(a||(a=r[t]={}),!(n.indexOf(a)>=0)){if(n.push(a),e[t])return e[t];T.o(T.S,t)||(T.S[t]={});var o=T.S[t],i="package-manager",u=[];return"default"===t&&((e,r,t,n)=>{var a=o[e]=o[e]||{},u=a[r];(!u||!u.loaded&&(1!=!u.eager?n:i>u.from))&&(a[r]={get:()=>T.e(7).then((()=>()=>T(7))),from:i,eager:!1})})("package-manager","1.0.0"),e[t]=u.length?Promise.all(u).then((()=>e[t]=1)):1}}})(),(()=>{var e;T.g.importScripts&&(e=T.g.location+"");var r=T.g.document;if(!e&&r&&(r.currentScript&&"SCRIPT"===r.currentScript.tagName.toUpperCase()&&(e=r.currentScript.src),!e)){var t=r.getElementsByTagName("script");if(t.length)for(var n=t.length-1;n>-1&&(!e||!/^http(s?):/.test(e));)e=t[n--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),T.p=e})(),t=e=>{var r=e=>e.split(".").map((e=>+e==e?+e:e)),t=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),n=t[1]?r(t[1]):[];return t[2]&&(n.length++,n.push.apply(n,r(t[2]))),t[3]&&(n.push([]),n.push.apply(n,r(t[3]))),n},n=(e,r)=>{e=t(e),r=t(r);for(var n=0;;){if(n>=e.length)return n<r.length&&"u"!=(typeof r[n])[0];var a=e[n],o=(typeof a)[0];if(n>=r.length)return"u"==o;var i=r[n],u=(typeof i)[0];if(o!=u)return"o"==o&&"n"==u||"s"==u||"u"==o;if("o"!=o&&"u"!=o&&a!=i)return a<i;n++}},a=e=>{var r=e[0],t="";if(1===e.length)return"*";if(r+.5){t+=0==r?">=":-1==r?"<":1==r?"^":2==r?"~":r>0?"=":"!=";for(var n=1,o=1;o<e.length;o++)n--,t+="u"==(typeof(u=e[o]))[0]?"-":(n>0?".":"")+(n=2,u);return t}var i=[];for(o=1;o<e.length;o++){var u=e[o];i.push(0===u?"not("+s()+")":1===u?"("+s()+" || "+s()+")":2===u?i.pop()+" "+i.pop():a(u))}return s();function s(){return i.pop().replace(/^\((.+)\)$/,"$1")}},o=(e,r)=>{if(0 in e){r=t(r);var n=e[0],a=n<0;a&&(n=-n-1);for(var i=0,u=1,s=!0;;u++,i++){var l,f,d=u<e.length?(typeof e[u])[0]:"";if(i>=r.length||"o"==(f=(typeof(l=r[i]))[0]))return!s||("u"==d?u>n&&!a:""==d!=a);if("u"==f){if(!s||"u"!=d)return!1}else if(s)if(d==f)if(u<=n){if(l!=e[u])return!1}else{if(a?l>e[u]:l<e[u])return!1;l!=e[u]&&(s=!1)}else if("s"!=d&&"n"!=d){if(a||u<=n)return!1;s=!1,u--}else{if(u<=n||f<d!=a)return!1;s=!1}else"s"!=d&&"n"!=d&&(s=!1,u--)}}var c=[],p=c.pop.bind(c);for(i=1;i<e.length;i++){var h=e[i];c.push(1==h?p()|p():2==h?p()&p():h?o(h,r):!p())}return!!p()},i=(e,r)=>e&&T.o(e,r),u=e=>(e.loaded=1,e.get()),s=e=>Object.keys(e).reduce(((r,t)=>(e[t].eager&&(r[t]=e[t]),r)),{}),l=(e,r,t)=>{var a=t?s(e[r]):e[r];return(r=Object.keys(a).reduce(((e,r)=>!e||n(e,r)?r:e),0))&&a[r]},f=(e,r,t,a)=>{var i=a?s(e[r]):e[r];return(r=Object.keys(i).reduce(((e,r)=>!o(t,r)||e&&!n(e,r)?e:r),0))&&i[r]},d=(e,r,t)=>{var a=t?s(e[r]):e[r];return Object.keys(a).reduce(((e,r)=>!e||!a[e].loaded&&n(e,r)?r:e),0)},c=(e,r,t,n)=>"Unsatisfied version "+t+" from "+(t&&e[r][t].from)+" of shared singleton module "+r+" (required "+a(n)+")",p=(e,r,t,n,o)=>{var i=e[t];return"No satisfying version ("+a(n)+")"+(o?" for eager consumption":"")+" of shared module "+t+" found in shared scope "+r+".\nAvailable versions: "+Object.keys(i).map((e=>e+" from "+i[e].from)).join(", ")},h=e=>{throw new Error(e)},v=e=>{"undefined"!=typeof console&&console.warn&&console.warn(e)},m=(e,r,t)=>t?t():((e,r)=>h("Shared module "+r+" doesn't exist in shared scope "+e))(e,r),b=(g=e=>function(r,t,n,a,o){var i=T.I(r);return i&&i.then&&!n?i.then(e.bind(e,r,T.S[r],t,!1,a,o)):e(r,T.S[r],t,n,a,o)})(((e,r,t,n,a,o)=>{if(!i(r,t))return m(e,t,o);var s=f(r,t,a,n);return s?u(s):(v(p(r,e,t,a,n)),u(l(r,t,n)))})),y=g(((e,r,t,n,a,s)=>{if(!i(r,t))return m(e,t,s);var l=d(r,t,n);return o(a,l)||v(c(r,t,l,a)),u(r[t][l])})),w={},k={123:()=>y("default","@jupyterlab/notebook",!1,[1,4,3,5]),345:()=>y("default","react",!1,[1,18,2,0]),470:()=>b("default","@jupyterlab/docregistry",!1,[1,4,3,5]),602:()=>y("default","@lumino/signaling",!1,[1,2,0,0]),655:()=>y("default","@jupyterlab/ui-components",!1,[1,4,3,5])},S={7:[123,345,470,602,655]},j={},T.f.consumes=(e,r)=>{T.o(S,e)&&S[e].forEach((e=>{if(T.o(w,e))return r.push(w[e]);if(!j[e]){var t=r=>{w[e]=0,T.m[e]=t=>{delete T.c[e],t.exports=r()}};j[e]=!0;var n=r=>{delete w[e],T.m[e]=t=>{throw delete T.c[e],r}};try{var a=k[e]();a.then?r.push(w[e]=a.then(t).catch(n)):t(a)}catch(e){n(e)}}}))},(()=>{var e={811:0};T.f.j=(r,t)=>{var n=T.o(e,r)?e[r]:void 0;if(0!==n)if(n)t.push(n[2]);else{var a=new Promise(((t,a)=>n=e[r]=[t,a]));t.push(n[2]=a);var o=T.p+T.u(r),i=new Error;T.l(o,(t=>{if(T.o(e,r)&&(0!==(n=e[r])&&(e[r]=void 0),n)){var a=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;i.message="Loading chunk "+r+" failed.\n("+a+": "+o+")",i.name="ChunkLoadError",i.type=a,i.request=o,n[1](i)}}),"chunk-"+r,r)}};var r=(r,t)=>{var n,a,[o,i,u]=t,s=0;if(o.some((r=>0!==e[r]))){for(n in i)T.o(i,n)&&(T.m[n]=i[n]);u&&u(T)}for(r&&r(t);s<o.length;s++)a=o[s],T.o(e,a)&&e[a]&&e[a][0](),e[a]=0},t=self.webpackChunkpackage_manager=self.webpackChunkpackage_manager||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})(),T.nc=void 0;var O=T(379);(_JUPYTERLAB=void 0===_JUPYTERLAB?{}:_JUPYTERLAB)["package-manager"]=O})();