/*! For license information please see content.bundle.js.LICENSE.txt */
(()=>{"use strict";var t="ELEMENT_ACTION",e="RESULT_CHECK_ELEMENT_VIDEO_SELECTED";function n(t){return new Promise((function(e,n){chrome.runtime.sendMessage(t,(function(t){chrome.runtime.lastError?n(chrome.runtime.lastError.message):e(t)}))}))}function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(){o=function(){return e};var t,e={},n=Object.prototype,a=n.hasOwnProperty,i=Object.defineProperty||function(t,e,n){t[e]=n.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",s=c.asyncIterator||"@@asyncIterator",f=c.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,n){return t[e]=n}}function h(t,e,n,r){var o=e&&e.prototype instanceof E?e:E,a=Object.create(o.prototype),c=new j(r||[]);return i(a,"_invoke",{value:O(t,n,c)}),a}function d(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=h;var p="suspendedStart",v="suspendedYield",m="executing",y="completed",g={};function E(){}function w(){}function L(){}var b={};l(b,u,(function(){return this}));var x=Object.getPrototypeOf,_=x&&x(x(I([])));_&&_!==n&&a.call(_,u)&&(b=_);var T=L.prototype=E.prototype=Object.create(b);function k(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function N(t,e){function n(o,i,c,u){var s=d(t[o],t,i);if("throw"!==s.type){var f=s.arg,l=f.value;return l&&"object"==r(l)&&a.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,c,u)}),(function(t){n("throw",t,c,u)})):e.resolve(l).then((function(t){f.value=t,c(f)}),(function(t){return n("throw",t,c,u)}))}u(s.arg)}var o;i(this,"_invoke",{value:function(t,r){function a(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(a,a):a()}})}function O(e,n,r){var o=p;return function(a,i){if(o===m)throw Error("Generator is already running");if(o===y){if("throw"===a)throw i;return{value:t,done:!0}}for(r.method=a,r.arg=i;;){var c=r.delegate;if(c){var u=S(c,r);if(u){if(u===g)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===p)throw o=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=m;var s=d(e,n,r);if("normal"===s.type){if(o=r.done?y:v,s.arg===g)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(o=y,r.method="throw",r.arg=s.arg)}}}function S(e,n){var r=n.method,o=e.iterator[r];if(o===t)return n.delegate=null,"throw"===r&&e.iterator.return&&(n.method="return",n.arg=t,S(e,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),g;var a=d(o,e.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,g;var i=a.arg;return i?i.done?(n[e.resultName]=i.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,g):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function C(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function M(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function I(e){if(e||""===e){var n=e[u];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function n(){for(;++o<e.length;)if(a.call(e,o))return n.value=e[o],n.done=!1,n;return n.value=t,n.done=!0,n};return i.next=i}}throw new TypeError(r(e)+" is not iterable")}return w.prototype=L,i(T,"constructor",{value:L,configurable:!0}),i(L,"constructor",{value:w,configurable:!0}),w.displayName=l(L,f,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,L):(t.__proto__=L,l(t,f,"GeneratorFunction")),t.prototype=Object.create(T),t},e.awrap=function(t){return{__await:t}},k(N.prototype),l(N.prototype,s,(function(){return this})),e.AsyncIterator=N,e.async=function(t,n,r,o,a){void 0===a&&(a=Promise);var i=new N(h(t,n,r,o),a);return e.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},k(T),l(T,f,"Generator"),l(T,u,(function(){return this})),l(T,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},e.values=I,j.prototype={constructor:j,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(M),!e)for(var n in this)"t"===n.charAt(0)&&a.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function r(r,o){return c.type="throw",c.arg=e,n.next=r,o&&(n.method="next",n.arg=t),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var u=a.call(i,"catchLoc"),s=a.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&a.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),M(n),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;M(n)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:I(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),g}},e}function a(t,e,n,r,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function c(t){a(i,r,o,c,u,"next",t)}function u(t){a(i,r,o,c,u,"throw",t)}c(void 0)}))}}var c,u,s=(c=[],u=!1,function(){var t=i(o().mark((function t(e){return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(c.push(e),u){t.next=9;break}u=!0;case 3:if(!c.length){t.next=8;break}return t.next=6,c.shift()();case 6:t.next=3;break;case 8:u=!1;case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());function f(e){n({cmd:t,data:{action:"play",status:"sending"}}).catch((function(t){console.log(t)}))}function l(e){n({cmd:t,data:{action:"pause",status:"sending"}}).catch((function(t){console.log(t)}))}function h(e){n({cmd:t,data:{action:"seeked",status:"sending",mediaCurrentTime:e.target.currentTime}}).catch((function(t){console.log(t)}))}function d(t,e,n,r){return new Promise((function(o){return"pause"==e&&1==t.paused||"play"==e&&0==t.paused?o("no genero evento con exito"):(t.removeEventListener(e,n),t.addEventListener(e,(function r(){t.addEventListener(e,n),t.removeEventListener(e,r),o("no genero evento con exito")})),void r())}))}function p(){for(var t="",e=0;e<8;e++){var n=Math.floor(62*Math.random());t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n)}return t}var v=[];var m={ELEMENT_ACTION:function(t){if("received"==t.data.status){var e=v.find((function(e){return e.number==t.data.idNumber}));if(e){var n=e.element;"play"==t.data.action?s(i(o().mark((function t(){return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d(n,"play",f,(function(){e.element.play()}));case 2:case"end":return t.stop()}}),t)})))):"pause"==t.data.action?s(i(o().mark((function t(){return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d(n,"pause",l,(function(){e.element.pause()}));case 2:case"end":return t.stop()}}),t)})))):"seeked"==t.data.action&&s(i(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d(n,"seeking",h,(function(){t.data.dataSeek?n.currentTime=Math.max(0,n.currentTime+t.data.dataSeek):n.currentTime=Math.max(0,t.data.mediaCurrentTime)}));case 2:case"end":return e.stop()}}),e)}))))}}else"sending"==t.data.status&&window.postMessage({cmd:t.cmd,data:t.data},"*");return{status:"ok"}},GET_VIDEOS_DATA:function(){return n({cmd:"responseIMGS",data:(t=document.querySelectorAll("video"),e=Array.from(t).map((function(t,e){var n=function(t){try{t.crossOrigin="anonymous";var e=document.createElement("canvas");return e.width=100,e.height=56,e.getContext("2d").drawImage(t,0,0,e.width,e.height),e.toDataURL("image/png")}catch(t){console.log(t)}}(t);return{number:p(),img:n,element:t}})),v=e,e.map((function(t){return{number:t.number,img:t.img}})))}),{status:"ok"};var t,e},RESULT_CHECK_ELEMENT_VIDEO_SELECTED:function(t){return window.postMessage({cmd:e,data:t.data},"*"),{status:"ok"}},ADD_EVENTS_ELEMENT:function(t){var e,n=v.find((function(e){return e.number==t.data.idNumber}));return n&&(console.log("addEvents",t),(e=n.element).addEventListener("play",f),e.addEventListener("pause",l),e.addEventListener("seeking",h)),{status:"ok"}},REMOVE_EVENTS_ELEMENTS:function(t){var e,n=v.find((function(e){return e.number==t.data.idNumber}));return n&&(console.log("Remove Events",t),(e=n.element).removeEventListener("seeking",h),e.removeEventListener("play",f),e.removeEventListener("pause",l)),{status:"ok"}},CHECK_CONNECTION:function(){return{message:"connected"}}},y={ELEMENT_ACTION:function(t,e){"received"==e.status&&n({cmd:t,data:e}).catch((function(t){console.log(t)}))},CHECK_ELEMENT_VIDEO_SELECTED:function(t,e){n({cmd:t,data:e})}};window.addEventListener("message",(function(t){if(t.source==window){var e=t.data,n=e.cmd,r=e.data,o=y[n];o&&o(n,r)}}),!1),chrome.runtime.onMessage.addListener(function(){var t=i(o().mark((function t(e,n,r){var a;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(a=m[e.cmd])){t.next=14;break}return t.prev=2,t.t0=r,t.next=6,a(e,n);case 6:t.t1=t.sent,(0,t.t0)(t.t1),t.next=13;break;case 10:t.prev=10,t.t2=t.catch(2),r({err:t.t2});case 13:return t.abrupt("return",!0);case 14:r({error:"no existe tal accion"});case 15:case"end":return t.stop()}}),t,null,[[2,10]])})));return function(e,n,r){return t.apply(this,arguments)}}()),console.log("media-element-selection-extension")})();