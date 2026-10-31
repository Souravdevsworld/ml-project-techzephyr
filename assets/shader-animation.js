"use strict";(()=>{var Pb=Object.create;var g0=Object.defineProperty;var zb=Object.getOwnPropertyDescriptor;var Bb=Object.getOwnPropertyNames;var Fb=Object.getPrototypeOf,Hb=Object.prototype.hasOwnProperty;var Ti=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Vb=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Bb(t))!Hb.call(e,s)&&s!==n&&g0(e,s,{get:()=>t[s],enumerable:!(i=zb(t,s))||i.enumerable});return e};var ur=(e,t,n)=>(n=e!=null?Pb(Fb(e)):{},Vb(t||!e||!e.__esModule?g0(n,"default",{value:e,enumerable:!0}):n,e));var A0=Ti(Te=>{"use strict";function jf(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,s=e[i];if(0<vc(s,t))e[i]=t,e[n]=s,n=i;else break t}}function Ei(e){return e.length===0?null:e[0]}function xc(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,s=e.length,a=s>>>1;i<a;){var r=2*(i+1)-1,o=e[r],l=r+1,c=e[l];if(0>vc(o,n))l<s&&0>vc(c,o)?(e[i]=c,e[l]=n,i=l):(e[i]=o,e[r]=n,i=r);else if(l<s&&0>vc(c,n))e[i]=c,e[l]=n,i=l;else break t}}return t}function vc(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}Te.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(_0=performance,Te.unstable_now=function(){return _0.now()}):(Jf=Date,v0=Jf.now(),Te.unstable_now=function(){return Jf.now()-v0});var _0,Jf,v0,Ki=[],Ts=[],Gb=1,jn=null,rn=3,$f=!1,Bo=!1,Fo=!1,td=!1,S0=typeof setTimeout=="function"?setTimeout:null,M0=typeof clearTimeout=="function"?clearTimeout:null,y0=typeof setImmediate<"u"?setImmediate:null;function yc(e){for(var t=Ei(Ts);t!==null;){if(t.callback===null)xc(Ts);else if(t.startTime<=e)xc(Ts),t.sortIndex=t.expirationTime,jf(Ki,t);else break;t=Ei(Ts)}}function ed(e){if(Fo=!1,yc(e),!Bo)if(Ei(Ki)!==null)Bo=!0,fr||(fr=!0,hr());else{var t=Ei(Ts);t!==null&&nd(ed,t.startTime-e)}}var fr=!1,Ho=-1,b0=5,T0=-1;function E0(){return td?!0:!(Te.unstable_now()-T0<b0)}function Kf(){if(td=!1,fr){var e=Te.unstable_now();T0=e;var t=!0;try{t:{Bo=!1,Fo&&(Fo=!1,M0(Ho),Ho=-1),$f=!0;var n=rn;try{e:{for(yc(e),jn=Ei(Ki);jn!==null&&!(jn.expirationTime>e&&E0());){var i=jn.callback;if(typeof i=="function"){jn.callback=null,rn=jn.priorityLevel;var s=i(jn.expirationTime<=e);if(e=Te.unstable_now(),typeof s=="function"){jn.callback=s,yc(e),t=!0;break e}jn===Ei(Ki)&&xc(Ki),yc(e)}else xc(Ki);jn=Ei(Ki)}if(jn!==null)t=!0;else{var a=Ei(Ts);a!==null&&nd(ed,a.startTime-e),t=!1}}break t}finally{jn=null,rn=n,$f=!1}t=void 0}}finally{t?hr():fr=!1}}}var hr;typeof y0=="function"?hr=function(){y0(Kf)}:typeof MessageChannel<"u"?(Qf=new MessageChannel,x0=Qf.port2,Qf.port1.onmessage=Kf,hr=function(){x0.postMessage(null)}):hr=function(){S0(Kf,0)};var Qf,x0;function nd(e,t){Ho=S0(function(){e(Te.unstable_now())},t)}Te.unstable_IdlePriority=5;Te.unstable_ImmediatePriority=1;Te.unstable_LowPriority=4;Te.unstable_NormalPriority=3;Te.unstable_Profiling=null;Te.unstable_UserBlockingPriority=2;Te.unstable_cancelCallback=function(e){e.callback=null};Te.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b0=0<e?Math.floor(1e3/e):5};Te.unstable_getCurrentPriorityLevel=function(){return rn};Te.unstable_next=function(e){switch(rn){case 1:case 2:case 3:var t=3;break;default:t=rn}var n=rn;rn=t;try{return e()}finally{rn=n}};Te.unstable_requestPaint=function(){td=!0};Te.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=rn;rn=e;try{return t()}finally{rn=n}};Te.unstable_scheduleCallback=function(e,t,n){var i=Te.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=n+s,e={id:Gb++,callback:t,priorityLevel:e,startTime:n,expirationTime:s,sortIndex:-1},n>i?(e.sortIndex=n,jf(Ts,e),Ei(Ki)===null&&e===Ei(Ts)&&(Fo?(M0(Ho),Ho=-1):Fo=!0,nd(ed,n-i))):(e.sortIndex=s,jf(Ki,e),Bo||$f||(Bo=!0,fr||(fr=!0,hr()))),e};Te.unstable_shouldYield=E0;Te.unstable_wrapCallback=function(e){var t=rn;return function(){var n=rn;rn=t;try{return e.apply(this,arguments)}finally{rn=n}}}});var C0=Ti((T3,w0)=>{"use strict";w0.exports=A0()});var V0=Ti(Nt=>{"use strict";var ad=Symbol.for("react.transitional.element"),kb=Symbol.for("react.portal"),Xb=Symbol.for("react.fragment"),Wb=Symbol.for("react.strict_mode"),qb=Symbol.for("react.profiler"),Yb=Symbol.for("react.consumer"),Zb=Symbol.for("react.context"),Jb=Symbol.for("react.forward_ref"),Kb=Symbol.for("react.suspense"),Qb=Symbol.for("react.memo"),L0=Symbol.for("react.lazy"),jb=Symbol.for("react.activity"),$b=Symbol.for("react.view_transition"),R0=Symbol.iterator;function t1(e){return e===null||typeof e!="object"?null:(e=R0&&e[R0]||e["@@iterator"],typeof e=="function"?e:null)}var O0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},I0=Object.assign,P0={};function pr(e,t,n){this.props=e,this.context=t,this.refs=P0,this.updater=n||O0}pr.prototype.isReactComponent={};pr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};pr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function z0(){}z0.prototype=pr.prototype;function rd(e,t,n){this.props=e,this.context=t,this.refs=P0,this.updater=n||O0}var od=rd.prototype=new z0;od.constructor=rd;I0(od,pr.prototype);od.isPureReactComponent=!0;var D0=Array.isArray;function sd(){}var me={H:null,A:null,T:null,S:null},B0=Object.prototype.hasOwnProperty;function ld(e,t,n){var i=n.ref;return{$$typeof:ad,type:e,key:t,ref:i!==void 0?i:null,props:n}}function e1(e,t){return ld(e.type,t,e.props)}function cd(e){return typeof e=="object"&&e!==null&&e.$$typeof===ad}function n1(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var U0=/\/+/g;function id(e,t){return typeof e=="object"&&e!==null&&e.key!=null?n1(""+e.key):t.toString(36)}function i1(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(sd,sd):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function dr(e,t,n,i,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(a){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case ad:case kb:r=!0;break;case L0:return r=e._init,dr(r(e._payload),t,n,i,s)}}if(r)return s=s(e),r=i===""?"."+id(e,0):i,D0(s)?(n="",r!=null&&(n=r.replace(U0,"$&/")+"/"),dr(s,t,n,"",function(c){return c})):s!=null&&(cd(s)&&(s=e1(s,n+(s.key==null||e&&e.key===s.key?"":(""+s.key).replace(U0,"$&/")+"/")+r)),t.push(s)),1;r=0;var o=i===""?".":i+":";if(D0(e))for(var l=0;l<e.length;l++)i=e[l],a=o+id(i,l),r+=dr(i,t,n,a,s);else if(l=t1(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,a=o+id(i,l++),r+=dr(i,t,n,a,s);else if(a==="object"){if(typeof e.then=="function")return dr(i1(e),t,n,i,s);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function Sc(e,t,n){if(e==null)return e;var i=[],s=0;return dr(e,i,"","",function(a){return t.call(n,a,s++)}),i}function s1(e){if(e._status===-1){var t=e._result,n=t();n.then(function(i){(e._status===0||e._status===-1)&&(e._status=1,e._result=i,n.status===void 0&&(n.status="fulfilled",n.value=i))},function(i){(e._status===0||e._status===-1)&&(e._status=2,e._result=i,n.status===void 0&&(n.status="rejected",n.reason=i))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var N0=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function F0(e){var t=me.T,n={};n.types=t!==null?t.types:null,me.T=n;try{var i=e(),s=me.S;s!==null&&s(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(sd,N0)}catch(a){N0(a)}finally{t!==null&&n.types!==null&&(t.types=n.types),me.T=t}}function H0(e){var t=me.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else F0(H0.bind(null,e))}var a1={map:Sc,forEach:function(e,t,n){Sc(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Sc(e,function(){t++}),t},toArray:function(e){return Sc(e,function(t){return t})||[]},only:function(e){if(!cd(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Nt.Activity=jb;Nt.Children=a1;Nt.Component=pr;Nt.Fragment=Xb;Nt.Profiler=qb;Nt.PureComponent=rd;Nt.StrictMode=Wb;Nt.Suspense=Kb;Nt.ViewTransition=$b;Nt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=me;Nt.__COMPILER_RUNTIME={__proto__:null,c:function(e){return me.H.useMemoCache(e)}};Nt.addTransitionType=H0;Nt.cache=function(e){return function(){return e.apply(null,arguments)}};Nt.cacheSignal=function(){return null};Nt.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=I0({},e.props),s=e.key;if(t!=null)for(a in t.key!==void 0&&(s=""+t.key),t)!B0.call(t,a)||a==="key"||a==="__self"||a==="__source"||a==="ref"&&t.ref===void 0||(i[a]=t[a]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var r=Array(a),o=0;o<a;o++)r[o]=arguments[o+2];i.children=r}return ld(e.type,s,i)};Nt.createContext=function(e){return e={$$typeof:Zb,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:Yb,_context:e},e};Nt.createElement=function(e,t,n){var i,s={},a=null;if(t!=null)for(i in t.key!==void 0&&(a=""+t.key),t)B0.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(s[i]=t[i]);var r=arguments.length-2;if(r===1)s.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];s.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)s[i]===void 0&&(s[i]=r[i]);return ld(e,a,s)};Nt.createRef=function(){return{current:null}};Nt.forwardRef=function(e){return{$$typeof:Jb,render:e}};Nt.isValidElement=cd;Nt.lazy=function(e){return{$$typeof:L0,_payload:{_status:-1,_result:e},_init:s1}};Nt.memo=function(e,t){return{$$typeof:Qb,type:e,compare:t===void 0?null:t}};Nt.startTransition=F0;Nt.unstable_useCacheRefresh=function(){return me.H.useCacheRefresh()};Nt.use=function(e){return me.H.use(e)};Nt.useActionState=function(e,t,n){return me.H.useActionState(e,t,n)};Nt.useCallback=function(e,t){return me.H.useCallback(e,t)};Nt.useContext=function(e){return me.H.useContext(e)};Nt.useDebugValue=function(){};Nt.useDeferredValue=function(e,t){return me.H.useDeferredValue(e,t)};Nt.useEffect=function(e,t){return me.H.useEffect(e,t)};Nt.useEffectEvent=function(e){return me.H.useEffectEvent(e)};Nt.useId=function(){return me.H.useId()};Nt.useImperativeHandle=function(e,t,n){return me.H.useImperativeHandle(e,t,n)};Nt.useInsertionEffect=function(e,t){return me.H.useInsertionEffect(e,t)};Nt.useLayoutEffect=function(e,t){return me.H.useLayoutEffect(e,t)};Nt.useMemo=function(e,t){return me.H.useMemo(e,t)};Nt.useOptimistic=function(e,t){return me.H.useOptimistic(e,t)};Nt.useReducer=function(e,t,n){return me.H.useReducer(e,t,n)};Nt.useRef=function(e){return me.H.useRef(e)};Nt.useState=function(e){return me.H.useState(e)};Nt.useSyncExternalStore=function(e,t,n){return me.H.useSyncExternalStore(e,t,n)};Nt.useTransition=function(){return me.H.useTransition()};Nt.version="19.3.1"});var Mc=Ti((A3,G0)=>{"use strict";G0.exports=V0()});var W0=Ti(on=>{"use strict";var r1=Mc();function X0(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Es(){}var dn={d:{f:Es,r:function(){throw Error(X0(522))},D:Es,C:Es,L:Es,m:Es,X:Es,S:Es,M:Es},p:0,findDOMNode:null},o1=Symbol.for("react.portal"),l1=Symbol.for("react.recoverable"),k0=Symbol.for("react.optimistic_key");function c1(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o1,key:i==null?null:i===k0?k0:""+i,children:e,containerInfo:t,implementation:n}}var Vo=r1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function bc(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}on.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=dn;on.browser=function(e){return{$$typeof:l1,_reason:e}};on.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(X0(299));return c1(e,t,null,n)};on.flushSync=function(e){var t=Vo.T,n=dn.p;try{if(Vo.T=null,dn.p=2,e)return e()}finally{Vo.T=t,dn.p=n,dn.d.f()}};on.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,dn.d.C(e,t))};on.prefetchDNS=function(e){typeof e=="string"&&dn.d.D(e)};on.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=bc(n,t.crossOrigin),s=typeof t.integrity=="string"?t.integrity:void 0,a=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?dn.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:s,fetchPriority:a}):n==="script"&&dn.d.X(e,{crossOrigin:i,integrity:s,fetchPriority:a,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};on.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=bc(t.as,t.crossOrigin);dn.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}}else t==null&&dn.d.M(e)};on.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=bc(n,t.crossOrigin);dn.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};on.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=bc(t.as,t.crossOrigin);dn.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}else dn.d.m(e)};on.requestFormReset=function(e){dn.d.r(e)};on.unstable_batchedUpdates=function(e,t){return e(t)};on.useFormState=function(e,t,n){return Vo.H.useFormState(e,t,n)};on.useFormStatus=function(){return Vo.H.useHostTransitionStatus()};on.version="19.3.1"});var Z0=Ti((C3,Y0)=>{"use strict";function q0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(q0)}catch(e){console.error(e)}}q0(),Y0.exports=W0()});var OS=Ti(sh=>{"use strict";var Ve=C0(),Lv=Mc(),u1=Z0();function k(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Ov(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Cl(e){for(var t=e,n=t;n&&!n.alternate;)t=n,(t.flags&4098)!==0&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function Iv(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Pv(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function J0(e){if(Cl(e)!==e)throw Error(k(188))}function h1(e){var t=e.alternate;if(!t){if(t=Cl(e),t===null)throw Error(k(188));return t!==e?null:e}for(var n=e,i=t;;){var s=n.return;if(s===null)break;var a=s.alternate;if(a===null){if(i=s.return,i!==null){n=i;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===n)return J0(s),e;if(a===i)return J0(s),t;a=a.sibling}throw Error(k(188))}if(n.return!==i.return)n=s,i=a;else{for(var r=!1,o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r){for(o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r)throw Error(k(189))}}if(n.alternate!==i)throw Error(k(190))}if(n.tag!==3)throw Error(k(188));return n.stateNode.current===n?e:t}function zv(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=zv(e),t!==null)return t;e=e.sibling}return null}function En(e,t,n,i,s,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,i,s,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&En(e.child,t,n,i,s,a))return!0;e=e.sibling}return!1}function Ba(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function K0(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),!(e.tag===3||e.tag===5||e.tag===27));)e=e.return;return t}function Bv(e){var t=[null,null],n=Ba(e);return n===null||Fv(t,e,n.child,{foundSelf:!1}),t}function Fv(e,t,n,i){for(;n!==null;){if(n===t)i.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(i.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&Fv(e,t,n.child,i))return!0;n=n.sibling}return!1}function He(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(k(559))}}var Sr=null,Vd=null;function f1(e,t,n){return e===n?!0:e===t?(Sr=e,!0):!1}function d1(e,t,n){return e===n?(Vd=e,!1):e===t?(Vd!==null&&(Sr=e),!0):!1}function Q0(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function Gd(e,t,n){for(var i=0,s=e;s;s=n(s))i++;s=0;for(var a=t;a;a=n(a))s++;for(;0<i-s;)e=n(e),i--;for(;0<s-i;)t=n(t),s--;for(;i--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var fe=Object.assign,p1=Symbol.for("react.element"),Tc=Symbol.for("react.transitional.element"),Zo=Symbol.for("react.portal"),Mr=Symbol.for("react.fragment"),Hv=Symbol.for("react.strict_mode"),kd=Symbol.for("react.profiler"),Vv=Symbol.for("react.consumer"),Ui=Symbol.for("react.context"),jp=Symbol.for("react.forward_ref"),Xd=Symbol.for("react.suspense"),Wd=Symbol.for("react.suspense_list"),$p=Symbol.for("react.memo"),Rs=Symbol.for("react.lazy");Symbol.for("react.scope");var qd=Symbol.for("react.activity"),m1=Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var g1=Symbol.for("react.memo_cache_sentinel"),Yd=Symbol.for("react.view_transition"),_1=Symbol.for("react.recoverable"),j0=Symbol.iterator;function Go(e){return e===null||typeof e!="object"?null:(e=j0&&e[j0]||e["@@iterator"],typeof e=="function"?e:null)}var v1=Symbol.for("react.client.reference");function Zd(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===v1?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Mr:return"Fragment";case kd:return"Profiler";case Hv:return"StrictMode";case Xd:return"Suspense";case Wd:return"SuspenseList";case qd:return"Activity";case Yd:return"ViewTransition"}if(typeof e=="object")switch(e.$$typeof){case Zo:return"Portal";case Ui:return e.displayName||"Context";case Vv:return(e._context.displayName||"Context")+".Consumer";case jp:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case $p:return t=e.displayName||null,t!==null?t:Zd(e.type)||"Memo";case Rs:t=e._payload,e=e._init;try{return Zd(e(t))}catch{}}return null}var Jo=Array.isArray,Ct=Lv.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,jt=u1.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ea={pending:!1,data:null,method:null,action:null},Jd=[],br=-1;function Bi(e){return{current:e}}function tn(e){0>br||(e.current=Jd[br],Jd[br]=null,br--)}function ve(e,t){br++,Jd[br]=e.current,e.current=t}var Ii=Bi(null),fl=Bi(null),Bs=Bi(null),uu=Bi(null);function hu(e,t){switch(ve(Bs,t),ve(fl,e),ve(Ii,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?fv(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=fv(t),e=cS(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}tn(Ii),ve(Ii,e)}function kr(){tn(Ii),tn(fl),tn(Bs)}function Kd(e){var t=e.memoizedState;t!==null&&($r._currentValue=t.memoizedState,ve(uu,e)),t=Ii.current;var n=cS(t,e.type);t!==n&&(ve(fl,e),ve(Ii,n))}function fu(e){fl.current===e&&(tn(Ii),tn(fl)),uu.current===e&&(tn(uu),$r._currentValue=Ea)}var ud,$0;function ws(e){if(ud===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);ud=t&&t[1]||"",$0=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ud+e+$0}var hd=!1;function fd(e,t){if(!e||hd)return"";hd=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var d=function(){throw Error()};if(Object.defineProperty(d.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(d,[])}catch(_){var h=_}Reflect.construct(e,[],d)}else{try{d.call()}catch(_){h=_}d=!1;try{var p=Object.getOwnPropertyDescriptor(e.prototype,"props");Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),d=!0,new e}finally{d&&(p!==void 0?Object.defineProperty(e.prototype,"props",p):delete e.prototype.props)}}}else{try{throw Error()}catch(_){h=_}(d=e())&&typeof d.catch=="function"&&d.catch(function(){})}}catch(_){if(_&&h&&typeof _.stack=="string")return[_.stack,h.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var a=i.DetermineComponentFrameRoot(),r=a[0],o=a[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(s=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;s<c.length&&!c[s].includes("DetermineComponentFrameRoot");)s++;if(i===l.length||s===c.length)for(i=l.length-1,s=c.length-1;1<=i&&0<=s&&l[i]!==c[s];)s--;for(;1<=i&&0<=s;i--,s--)if(l[i]!==c[s]){if(i!==1||s!==1)do if(i--,s--,0>s||l[i]!==c[s]){var f=`
`+l[i].replace(" at new "," at ");return e.displayName&&f.includes("<anonymous>")&&(f=f.replace("<anonymous>",e.displayName)),f}while(1<=i&&0<=s);break}}}finally{hd=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?ws(n):""}function y1(e,t){switch(e.tag){case 26:case 27:case 5:return ws(e.type);case 16:return ws("Lazy");case 13:return e.child!==t&&t!==null?ws("Suspense Fallback"):ws("Suspense");case 19:return ws("SuspenseList");case 0:case 15:return fd(e.type,!1);case 11:return fd(e.type.render,!1);case 1:return fd(e.type,!0);case 31:return ws("Activity");case 30:return ws("ViewTransition");default:return""}}function t_(e){try{var t="",n=null;do t+=y1(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Qd=Object.prototype.hasOwnProperty,tm=Ve.unstable_scheduleCallback,dd=Ve.unstable_cancelCallback,x1=Ve.unstable_shouldYield,S1=Ve.unstable_requestPaint,zn=Ve.unstable_now,M1=Ve.unstable_getCurrentPriorityLevel,Gv=Ve.unstable_ImmediatePriority,kv=Ve.unstable_UserBlockingPriority,du=Ve.unstable_NormalPriority,b1=Ve.unstable_LowPriority,Xv=Ve.unstable_IdlePriority,T1=Ve.log,E1=Ve.unstable_setDisableYieldValue,Rl=null,Bn=null;function Ns(e){if(typeof T1=="function"&&E1(e),Bn&&typeof Bn.setStrictMode=="function")try{Bn.setStrictMode(Rl,e)}catch{}}var Fn=Math.clz32?Math.clz32:C1,A1=Math.log,w1=Math.LN2;function C1(e){return e>>>=0,e===0?32:31-(A1(e)/w1|0)|0}var Ec=256,Ac=262144,wc=4194304;function xa(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Fu(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var s=0,a=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~a,i!==0?s=xa(i):(r&=o,r!==0?s=xa(r):n||(n=o&~e,n!==0&&(s=xa(n))))):(o=i&~a,o!==0?s=xa(o):r!==0?s=xa(r):n||(n=i&~e,n!==0&&(s=xa(n)))),s===0?0:t!==0&&t!==s&&(t&a)===0&&(a=s&-s,n=t&-t,a>=n||a===32&&(n&4194048)!==0)?t:s}function Dl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Wv(e,t){(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-Fn(n),s=1<<i;t|=e[i],n&=~s}return t}function R1(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function qv(){var e=wc;return wc<<=1,(wc&62914560)===0&&(wc=4194304),e}function pd(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ul(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function D1(e,t,n,i,s,a){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var f=31-Fn(n),d=1<<f;o[f]=0,l[f]=-1;var h=c[f];if(h!==null)for(c[f]=null,f=0;f<h.length;f++){var p=h[f];p!==null&&(p.lane&=-536870913)}n&=~d}i!==0&&Yv(e,i,0),a!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=a&~(r&~t))}function Yv(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-Fn(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function Zv(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-Fn(n),s=1<<i;s&t|e[i]&t&&(e[i]|=t),n&=~s}}function Jv(e,t){var n=t&-t;return n=(n&42)!==0?1:em(n),(n&(e.suspendedLanes|t))!==0?0:n}function em(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function nm(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Kv(){var e=jt.p;return e!==0?e:(e=window.event,e===void 0?32:US(e.type))}function e_(e,t){var n=jt.p;try{return jt.p=e,t()}finally{jt.p=n}}var cs=Math.random().toString(36).slice(2),je="__reactFiber$"+cs,An="__reactProps$"+cs,no="__reactContainer$"+cs,n_="__reactEvents$"+cs,U1="__reactListeners$"+cs,N1="__reactHandles$"+cs,i_="__reactResources$"+cs,Nl="__reactMarker$"+cs,pu="__reactLoad$"+cs;function Hu(e){delete e[je],delete e[An],delete e[U1],delete e[N1]}function ba(e){var t;if(t=e[je])return t;for(var n=e.parentNode;n;){if(t=n[no]||n[je]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=xv(e);e!==null;){if(n=e[je])return n;e=xv(e)}return t}e=n,n=e.parentNode}return null}function io(e){if(e=e[je]||e[no]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Ko(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(k(33))}function Lr(e){var t=e[i_];return t||(t=e[i_]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ze(e){e[Nl]=!0}function Qv(e){e[pu]=void 0}var jv=new Set,$v={};function Fa(e,t){Xr(e,t),Xr(e+"Capture",t)}function Xr(e,t){for($v[e]=t,e=0;e<t.length;e++)jv.add(t[e])}var L1=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),s_={},a_={};function O1(e){return Qd.call(a_,e)?!0:Qd.call(s_,e)?!1:L1.test(e)?a_[e]=!0:(s_[e]=!0,!1)}var Kt=!1;function r_(){var e=Kt;return Kt=!1,e}function Wc(e,t,n){if(O1(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,n)}}function Cc(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,n)}}function Qi(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,i)}}function Ln(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ty(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function I1(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var s=i.get,a=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(r){n=""+r,a.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function jd(e){if(!e._valueTracker){var t=ty(e)?"checked":"value";e._valueTracker=I1(e,t,""+e[t])}}function ey(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=ty(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}var P1=/[\n"\\]/g;function ii(e){return e.replace(P1,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function $d(e,t,n,i,s,a,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Ln(t)):e.value!==""+Ln(t)&&(e.value=""+Ln(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?r==="number"&&e.value==t?md(e,Ln(e.value)):md(e,Ln(t)):n!=null?md(e,Ln(n)):i!=null&&e.removeAttribute("value"),s==null&&a!=null&&(e.defaultChecked=!!a),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+Ln(o):e.removeAttribute("name")}function ny(e,t,n,i,s,a,r,o){if(a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(e.type=a),t!=null||n!=null){if(!(a!=="submit"&&a!=="reset"||t!=null)){jd(e);return}n=n!=null?""+Ln(n):"",t=t!=null?""+Ln(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??s,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),jd(e)}function md(e,t){e.defaultValue!==""+t&&(e.defaultValue=""+t)}function Or(e,t,n,i){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&i&&(e[n].defaultSelected=!0)}else{for(n=""+Ln(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,i&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function iy(e,t,n){if(t!=null&&(t=""+Ln(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+Ln(n):""}function sy(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(k(92));if(Jo(i)){if(1<i.length)throw Error(k(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=Ln(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),jd(e)}function Wr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var z1=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function o_(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||z1.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function ay(e,t,n){if(t!=null&&typeof t!="object")throw Error(k(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="",Kt=!0);for(var s in t)i=t[s],t.hasOwnProperty(s)&&n[s]!==i&&(o_(e,s,i),Kt=!0)}else for(var a in t)t.hasOwnProperty(a)&&o_(e,a,t[a])}function im(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var B1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),F1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function qc(e){return F1.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Ni(){}var tp=null;function sm(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Tr=null,Ir=null;function l_(e){var t=io(e);if(t&&(e=t.stateNode)){var n=e[An]||null;t:switch(e=t.stateNode,t.type){case"input":if($d(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+ii(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var s=i[An]||null;if(!s)throw Error(k(90));$d(i,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&ey(i)}break t;case"textarea":iy(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&Or(e,!!n.multiple,t,!1)}}}var gd=!1;function ry(e,t,n){if(gd)return e(t,n);gd=!0;try{var i=e(t);return i}finally{if(gd=!1,(Tr!==null||Ir!==null)&&(th(),Tr&&(t=Tr,e=Ir,Ir=Tr=null,l_(t),e)))for(t=0;t<e.length;t++)l_(e[t])}}function dl(e,t){var n=e.stateNode;if(n===null)return null;var i=n[An]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(k(231,t,typeof n));return n}var is=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ep=!1;if(is)try{mr={},Object.defineProperty(mr,"passive",{get:function(){ep=!0}}),window.addEventListener("test",mr,mr),window.removeEventListener("test",mr,mr)}catch{ep=!1}var mr,Ls=null,am=null,Yc=null;function oy(){if(Yc)return Yc;var e,t=am,n=t.length,i,s="value"in Ls?Ls.value:Ls.textContent,a=s.length;for(e=0;e<n&&t[e]===s[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===s[a-i];i++);return Yc=s.slice(e,1<i?1-i:void 0)}function Zc(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Rc(){return!0}function c_(){return!1}function _n(e){function t(n,i,s,a,r){this._reactName=n,this._targetInst=s,this.type=i,this.nativeEvent=a,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(a):a[o]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Rc:c_,this.isPropagationStopped=c_,this}return fe(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Rc)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Rc)},persist:function(){},isPersistent:Rc}),t}var $s={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Vu=_n($s),Ll=fe({},$s,{view:0,detail:0}),H1=_n(Ll),_d,vd,ko,Gu=fe({},Ll,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:rm,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ko&&(ko&&e.type==="mousemove"?(_d=e.screenX-ko.screenX,vd=e.screenY-ko.screenY):vd=_d=0,ko=e),_d)},movementY:function(e){return"movementY"in e?e.movementY:vd}}),u_=_n(Gu),V1=fe({},Gu,{dataTransfer:0}),G1=_n(V1),k1=fe({},Ll,{relatedTarget:0}),yd=_n(k1),X1=fe({},$s,{animationName:0,elapsedTime:0,pseudoElement:0}),W1=_n(X1),q1=fe({},$s,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Y1=_n(q1),Z1=fe({},$s,{data:0}),h_=_n(Z1),J1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},K1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Q1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function j1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Q1[e])?!!t[e]:!1}function rm(){return j1}var $1=fe({},Ll,{key:function(e){if(e.key){var t=J1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Zc(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?K1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:rm,charCode:function(e){return e.type==="keypress"?Zc(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Zc(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),tT=_n($1),eT=fe({},Gu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),f_=_n(eT),nT=fe({},$s,{submitter:0}),iT=_n(nT),sT=fe({},Ll,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:rm}),aT=_n(sT),rT=fe({},$s,{propertyName:0,elapsedTime:0,pseudoElement:0}),oT=_n(rT),lT=fe({},Gu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),cT=_n(lT),uT=fe({},$s,{newState:0,oldState:0,source:0}),hT=_n(uT),fT=[9,13,27,32],om=is&&"CompositionEvent"in window,$o=null;is&&"documentMode"in document&&($o=document.documentMode);var dT=is&&"TextEvent"in window&&!$o,ly=is&&(!om||$o&&8<$o&&11>=$o),d_=" ",p_=!1;function cy(e,t){switch(e){case"keyup":return fT.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function uy(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Er=!1;function pT(e,t){switch(e){case"compositionend":return uy(t);case"keypress":return t.which!==32?null:(p_=!0,d_);case"textInput":return e=t.data,e===d_&&p_?null:e;default:return null}}function mT(e,t){if(Er)return e==="compositionend"||!om&&cy(e,t)?(e=oy(),Yc=am=Ls=null,Er=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ly&&t.locale!=="ko"?null:t.data;default:return null}}var gT={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function m_(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!gT[e.type]:t==="textarea"}function hy(e,t,n,i){Tr?Ir?Ir.push(i):Ir=[i]:Tr=i,t=Pu(t,"onChange"),0<t.length&&(n=new Vu("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var tl=null,pl=null;function _T(e){rS(e,0)}function ku(e){var t=Ko(e);if(ey(t))return e}function g_(e,t){if(e==="change")return t}var fy=!1;is&&(is?(Uc="oninput"in document,Uc||(xd=document.createElement("div"),xd.setAttribute("oninput","return;"),Uc=typeof xd.oninput=="function"),Dc=Uc):Dc=!1,fy=Dc&&(!document.documentMode||9<document.documentMode));var Dc,Uc,xd;function __(){tl&&(tl.detachEvent("onpropertychange",dy),pl=tl=null)}function dy(e){if(e.propertyName==="value"&&ku(pl)){var t=[];hy(t,pl,e,sm(e)),ry(_T,t)}}function vT(e,t,n){e==="focusin"?(__(),tl=t,pl=n,tl.attachEvent("onpropertychange",dy)):e==="focusout"&&__()}function yT(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ku(pl)}function xT(e,t){if(e==="click")return ku(t)}function ST(e,t){if(e==="input"||e==="change")return ku(t)}function MT(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Vn=typeof Object.is=="function"?Object.is:MT;function ml(e,t){if(Vn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var s=n[i];if(!Qd.call(t,s)||!Vn(e[s],t[s]))return!1}return!0}function np(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function v_(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function y_(e,t){var n=v_(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=v_(n)}}function py(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?py(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function my(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=np(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=np(e.document)}return t}function lm(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var bT=is&&"documentMode"in document&&11>=document.documentMode,Ar=null,ip=null,el=null,sp=!1;function x_(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;sp||Ar==null||Ar!==np(i)||(i=Ar,"selectionStart"in i&&lm(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),el&&ml(el,i)||(el=i,i=Pu(ip,"onSelect"),0<i.length&&(t=new Vu("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Ar)))}function va(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var wr={animationend:va("Animation","AnimationEnd"),animationiteration:va("Animation","AnimationIteration"),animationstart:va("Animation","AnimationStart"),transitionrun:va("Transition","TransitionRun"),transitionstart:va("Transition","TransitionStart"),transitioncancel:va("Transition","TransitionCancel"),transitionend:va("Transition","TransitionEnd")},Sd={},gy={};is&&(gy=document.createElement("div").style,"AnimationEvent"in window||(delete wr.animationend.animation,delete wr.animationiteration.animation,delete wr.animationstart.animation),"TransitionEvent"in window||delete wr.transitionend.transition);function Ha(e){if(Sd[e])return Sd[e];if(!wr[e])return e;var t=wr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in gy)return Sd[e]=t[n];return e}var _y=Ha("animationend"),vy=Ha("animationiteration"),yy=Ha("animationstart"),TT=Ha("transitionrun"),ET=Ha("transitionstart"),AT=Ha("transitioncancel"),xy=Ha("transitionend"),Sy=new Map,ap="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");ap.push("scrollEnd");function _i(e,t){Sy.set(e,t),Fa(t,[e])}var wT=0;function ss(e,t){if(e.name!=null&&e.name!=="auto")return e.name;if(t.autoName!==null)return t.autoName;e=gi.identifierPrefix;var n=wT++;return e="_"+e+"t_"+n.toString(32)+"_",t.autoName=e}function S_(e){if(e==null||typeof e=="string")return e;var t=null,n=Gr;if(n!==null)for(var i=0;i<n.length;i++){var s=e[n[i]];if(s!=null){if(s==="none")return"none";t=t==null?s:t+(" "+s)}}return t??e.default}function us(e,t){return e=S_(e),t=S_(t),t==null?e==="auto"?null:e:t==="auto"?null:t}var mu=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},ti=[],Cr=0,cm=0;function Xu(){for(var e=Cr,t=cm=Cr=0;t<e;){var n=ti[t];ti[t++]=null;var i=ti[t];ti[t++]=null;var s=ti[t];ti[t++]=null;var a=ti[t];if(ti[t++]=null,i!==null&&s!==null){var r=i.pending;r===null?s.next=s:(s.next=r.next,r.next=s),i.pending=s}a!==0&&My(n,s,a)}}function Wu(e,t,n,i){ti[Cr++]=e,ti[Cr++]=t,ti[Cr++]=n,ti[Cr++]=i,cm|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function um(e,t,n,i){return Wu(e,t,n,i),gu(e)}function Va(e,t){return Wu(e,null,null,t),gu(e)}function My(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var s=!1,a=e.return;a!==null;)a.childLanes|=n,i=a.alternate,i!==null&&(i.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(s=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,s&&t!==null&&(s=31-Fn(n),e=a.hiddenUpdates,i=e[s],i===null?e[s]=[t]:i.push(t),t.lane=n|536870912),a):null}function gu(e){if(50<hl)throw hl=0,su=null,Error(k(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Rr={};function CT(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function bn(e,t,n,i){return new CT(e,t,n,i)}function hm(e){return e=e.prototype,!(!e||!e.isReactComponent)}function es(e,t){var n=e.alternate;return n===null?(n=bn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function by(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Jc(e,t,n,i,s,a){var r=0;if(i=e,typeof i=="function")hm(i)&&(r=1);else if(typeof i=="string")r=tA(e,n,Ii.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(i){case qd:return e=bn(31,n,t,s),e.elementType=qd,e.lanes=a,e;case Mr:return Aa(n.children,s,a,t);case Hv:r=8,s|=24;break;case kd:return e=bn(12,n,t,s|2),e.elementType=kd,e.lanes=a,e;case Xd:return e=bn(13,n,t,s),e.elementType=Xd,e.lanes=a,e;case Wd:return e=bn(19,n,t,s),e.elementType=Wd,e.lanes=a,e;case m1:case Yd:return e=s|32,e=bn(30,n,t,e),e.elementType=Yd,e.lanes=a,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof i=="object"&&i!==null)switch(i.$$typeof){case Ui:r=10;break t;case Vv:r=9;break t;case jp:r=11;break t;case $p:r=14;break t;case Rs:r=16,i=null;break t}r=29,n=Error(k(130,e===null?"null":typeof e,"")),i=null}return t=bn(r,n,t,s),t.elementType=e,t.type=i,t.lanes=a,t}function Aa(e,t,n,i){return e=bn(7,e,i,t),e.lanes=n,e}function Md(e,t,n){return e=bn(6,e,null,t),e.lanes=n,e}function Ty(e){var t=bn(18,null,null,0);return t.stateNode=e,t}function bd(e,t,n){return t=bn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var M_=new WeakMap;function si(e,t){if(typeof e=="object"&&e!==null){var n=M_.get(e);return n!==void 0?n:(t={value:e,source:t,stack:t_(t)},M_.set(e,t),t)}return{value:e,source:t,stack:t_(t)}}var Dr=[],Ur=0,_u=null,gl=0,ei=[],ni=0,Zs=null,Li=1,Oi="";function $i(e,t){Dr[Ur++]=gl,Dr[Ur++]=_u,_u=e,gl=t}function Ey(e,t,n){ei[ni++]=Li,ei[ni++]=Oi,ei[ni++]=Zs,Zs=e;var i=Li;e=Oi;var s=32-Fn(i)-1;i&=~(1<<s),n+=1;var a=32-Fn(t)+s;if(30<a){var r=s-s%5;a=(i&(1<<r)-1).toString(32),i>>=r,s-=r,Li=1<<32-Fn(t)+s|n<<s|i,Oi=a+e}else Li=1<<a|n<<s|i,Oi=e}function qu(e){e.return!==null&&($i(e,1),Ey(e,1,0))}function fm(e){for(;e===_u;)_u=Dr[--Ur],Dr[Ur]=null,gl=Dr[--Ur],Dr[Ur]=null;for(;e===Zs;)Zs=ei[--ni],ei[ni]=null,Oi=ei[--ni],ei[ni]=null,Li=ei[--ni],ei[ni]=null}function Ay(e,t){ei[ni++]=Li,ei[ni++]=Oi,ei[ni++]=Zs,Li=t.id,Oi=t.overflow,Zs=e}var Je=null,_e=null,Ht=!1,Fs=null,ai=!1,rp=Error(k(519));function Js(e){var t=Error(k(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw _l(si(t,e)),rp}function b_(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[je]=e,t[An]=i,n){case"dialog":Gt("cancel",t),Gt("close",t);break;case"iframe":case"object":case"embed":Gt("load",t);break;case"video":case"audio":for(n=0;n<Sl.length;n++)Gt(Sl[n],t);break;case"source":Gt("error",t);break;case"img":case"image":case"link":Gt("error",t),Gt("load",t);break;case"details":Gt("toggle",t);break;case"input":Gt("invalid",t),ny(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Gt("invalid",t);break;case"textarea":Gt("invalid",t),sy(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||lS(t.textContent,n)?(i.popover!=null&&(Gt("beforetoggle",t),Gt("toggle",t)),i.onScroll!=null&&Gt("scroll",t),i.onScrollEnd!=null&&Gt("scrollend",t),i.onClick!=null&&(t.onclick=Ni),t=!0):t=!1,t||Js(e,!0)}function vu(e){for(Je=e.return;Je;)switch(Je.tag){case 5:case 31:case 13:ai=!1;return;case 27:case 3:ai=!0;return;default:Je=Je.return}}function gr(e){if(e!==Je)return!1;if(!Ht)return vu(e),Ht=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Xp(e.type,e.memoizedProps)),n=!n),n&&_e&&Js(e),vu(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));_e=yv(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));_e=yv(e)}else t===27?(t=_e,ta(e.type)?(e=Zp,Zp=null,_e=e):_e=t):_e=Je?ri(e.stateNode.nextSibling):null;return!0}function Da(){_e=Je=null,Ht=!1}function Td(){var e=Fs;return e!==null&&(Sn===null?Sn=e:Sn.push.apply(Sn,e),Fs=null),e}function _l(e){Fs===null?Fs=[e]:Fs.push(e)}var op=Bi(null),Ga=null,ts=null;function Os(e,t,n){ve(op,t._currentValue),t._currentValue=n}function ns(e){e._currentValue=op.current,tn(op)}function Kc(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function lp(e,t,n,i){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){var r=s.child;a=a.firstContext;t:for(;a!==null;){var o=a;a=s;for(var l=0;l<t.length;l++)if(o.context===t[l]){a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),Kc(a.return,n,e),i||(r=null);break t}a=o.next}}else if(s.tag===18){if(r=s.return,r===null)throw Error(k(341));r.lanes|=n,a=r.alternate,a!==null&&(a.lanes|=n),Kc(r,n,e),r=null}else s.tag===13&&s.memoizedState!==null&&s.memoizedState.dehydrated===null?(s.lanes|=n,r=s.alternate,r!==null&&(r.lanes|=n),Kc(s.return,n,e),r=s.child,r=r!==null?r.sibling:null):r=s.child;if(r!==null)r.return=s;else for(r=s;r!==null;){if(r===e){r=null;break}if(s=r.sibling,s!==null){s.return=r.return,r=s;break}r=r.return}s=r}}function Ua(e,t,n,i){e=null;for(var s=t,a=!1;s!==null;){if(!a){if((s.flags&524288)!==0)a=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var r=s.alternate;if(r===null)throw Error(k(387));if(r=r.memoizedProps,r!==null){var o=s.type;Vn(s.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(s===uu.current){if(r=s.alternate,r===null)throw Error(k(387));r.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push($r):e=[$r])}s=s.return}return e!==null&&lp(t,e,n,i),t.flags|=262144,e!==null}function yu(e){for(e=e.firstContext;e!==null;){if(!Vn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Na(e){Ga=e,ts=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function $e(e){return wy(Ga,e)}function Nc(e,t){return Ga===null&&Na(e),wy(e,t)}function wy(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ts===null){if(e===null)throw Error(k(308));ts=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ts=ts.next=t;return n}var RT=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},DT=Ve.unstable_scheduleCallback,UT=Ve.unstable_NormalPriority,Pe={$$typeof:Ui,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function dm(){return{controller:new RT,data:new Map,refCount:0}}function Ol(e){e.refCount--,e.refCount===0&&DT(UT,function(){e.controller.abort()})}function T_(e,t){if((e.pendingLanes&4194048)!==0){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var i=t[e];n.indexOf(i)===-1&&n.push(i)}}}var Qo=null;function NT(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var nl=null,cp=0,La=0,Pr=null;function LT(e,t){if(nl===null){var n=nl=[];cp=0,La=Vm(),Pr={status:"pending",value:void 0,then:function(i){n.push(i)}}}return cp++,t.then(E_,E_),t}function E_(){if(--cp===0&&(Qo=null,nl!==null)){Pr!==null&&(Pr.status="fulfilled");var e=nl;nl=null,La=0,Pr=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function OT(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(s){n.push(s)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var s=0;s<n.length;s++)(0,n[s])(t)},function(s){for(i.status="rejected",i.reason=s,s=0;s<n.length;s++)(0,n[s])(void 0)}),i}var A_=Ct.S;Ct.S=function(e,t){if(Wx=zn(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&LT(e,t),Qo!==null)for(var n=Kr;n!==null;)T_(n,Qo),n=n.next;if(n=e.types,n!==null){for(var i=Kr;i!==null;)T_(i,n),i=i.next;if(La!==0){i=Qo,i===null&&(i=Qo=[]);for(var s=0;s<n.length;s++){var a=n[s];i.indexOf(a)===-1&&i.push(a)}}}A_!==null&&A_(e,t)};var wa=Bi(null);function pm(){var e=wa.current;return e!==null?e:he.pooledCache}function Qc(e,t){t===null?ve(wa,wa.current):ve(wa,t.pool)}function Cy(){var e=pm();return e===null?null:{parent:Pe._currentValue,pool:e}}var so=Error(k(460)),mm=Error(k(474)),Yu=Error(k(542)),xu={then:function(){}};function w_(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Ry(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Ni,Ni),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,R_(e),e===void 0&&!("reason"in t)?Error(k(600)):e;default:if(typeof t.status=="string")t.then(Ni,Ni);else{if(e=he,e!==null&&100<e.shellSuspendCounter)throw Error(k(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=i}},function(i){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,R_(e),e}throw Ca=t,so}}function Sa(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Ca=n,so):n}}var Ca=null;function C_(){if(Ca===null)throw Error(k(459));var e=Ca;return Ca=null,e}function R_(e){if(e===so||e===Yu)throw Error(k(483))}var zr=null,vl=0;function Lc(e){var t=vl;return vl+=1,zr===null&&(zr=[]),Ry(zr,e,t)}function As(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Oc(e,t){throw t.$$typeof===p1?Error(k(525)):(e=Object.prototype.toString.call(t),Error(k(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Dy(e){function t(u,g){if(e){var v=u.deletions;v===null?(u.deletions=[g],u.flags|=16):v.push(g)}}function n(u,g){if(!e)return null;for(;g!==null;)t(u,g),g=g.sibling;return null}function i(u){for(var g=new Map;u!==null;)u.key===null?g.set(u.index,u):g.set(u.key,u),u=u.sibling;return g}function s(u,g){return u=es(u,g),u.index=0,u.sibling=null,u}function a(u,g,v){return u.index=v,e?(v=u.alternate,v!==null?(v=v.index,v<g?(u.flags|=2,g):v):(u.flags|=134217730,g)):(u.flags|=1048576,g)}function r(u){return e&&u.alternate===null&&(u.flags|=134217730),u}function o(u,g,v,y){return g===null||g.tag!==6?(g=Md(v,u.mode,y),g.return=u,g):(g=s(g,v),g.return=u,g)}function l(u,g,v,y){var A=v.type;return A===Mr?(u=f(u,g,v.props.children,y,v.key),As(u,v),u):g!==null&&(g.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===Rs&&Sa(A)===g.type)?(g=s(g,v.props),As(g,v),g.return=u,g):(g=Jc(v.type,v.key,v.props,null,u.mode,y),As(g,v),g.return=u,g)}function c(u,g,v,y){return g===null||g.tag!==4||g.stateNode.containerInfo!==v.containerInfo||g.stateNode.implementation!==v.implementation?(g=bd(v,u.mode,y),g.return=u,g):(g=s(g,v.children||[]),g.return=u,g)}function f(u,g,v,y,A){return g===null||g.tag!==7?(g=Aa(v,u.mode,y,A),g.return=u,g):(g=s(g,v),g.return=u,g)}function d(u,g,v){if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return g=Md(""+g,u.mode,v),g.return=u,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Tc:return v=Jc(g.type,g.key,g.props,null,u.mode,v),As(v,g),v.return=u,v;case Zo:return g=bd(g,u.mode,v),g.return=u,g;case Rs:return g=Sa(g),d(u,g,v)}if(Jo(g)||Go(g))return g=Aa(g,u.mode,v,null),g.return=u,g;if(typeof g.then=="function")return d(u,Lc(g),v);if(g.$$typeof===Ui)return d(u,Nc(u,g),v);Oc(u,g)}return null}function h(u,g,v,y){var A=g!==null?g.key:null;if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return A!==null?null:o(u,g,""+v,y);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Tc:return v.key===A?l(u,g,v,y):null;case Zo:return v.key===A?c(u,g,v,y):null;case Rs:return v=Sa(v),h(u,g,v,y)}if(Jo(v)||Go(v))return A!==null?null:f(u,g,v,y,null);if(typeof v.then=="function")return h(u,g,Lc(v),y);if(v.$$typeof===Ui)return h(u,g,Nc(u,v),y);Oc(u,v)}return null}function p(u,g,v,y,A){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return u=u.get(v)||null,o(g,u,""+y,A);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Tc:return u=u.get(y.key===null?v:y.key)||null,l(g,u,y,A);case Zo:return u=u.get(y.key===null?v:y.key)||null,c(g,u,y,A);case Rs:return y=Sa(y),p(u,g,v,y,A)}if(Jo(y)||Go(y))return u=u.get(v)||null,f(g,u,y,A,null);if(typeof y.then=="function")return p(u,g,v,Lc(y),A);if(y.$$typeof===Ui)return p(u,g,v,Nc(g,y),A);Oc(g,y)}return null}function _(u,g,v,y){for(var A=null,C=null,w=g,D=g=0,T=null;w!==null&&D<v.length;D++){w.index>D?(T=w,w=null):T=w.sibling;var b=h(u,w,v[D],y);if(b===null){w===null&&(w=T);break}e&&w&&b.alternate===null&&t(u,w),g=a(b,g,D),C===null?A=b:C.sibling=b,C=b,w=T}if(D===v.length)return n(u,w),Ht&&$i(u,D),A;if(w===null){for(;D<v.length;D++)w=d(u,v[D],y),w!==null&&(g=a(w,g,D),C===null?A=w:C.sibling=w,C=w);return Ht&&$i(u,D),A}for(w=i(w);D<v.length;D++)T=p(w,u,D,v[D],y),T!==null&&(e&&(b=T.alternate,b!==null&&w.delete(b.key===null?D:b.key)),g=a(T,g,D),C===null?A=T:C.sibling=T,C=T);return e&&w.forEach(function(N){return t(u,N)}),Ht&&$i(u,D),A}function S(u,g,v,y){if(v==null)throw Error(k(151));for(var A=null,C=null,w=g,D=g=0,T=null,b=v.next();w!==null&&!b.done;D++,b=v.next()){w.index>D?(T=w,w=null):T=w.sibling;var N=h(u,w,b.value,y);if(N===null){w===null&&(w=T);break}e&&w&&N.alternate===null&&t(u,w),g=a(N,g,D),C===null?A=N:C.sibling=N,C=N,w=T}if(b.done)return n(u,w),Ht&&$i(u,D),A;if(w===null){for(;!b.done;D++,b=v.next())b=d(u,b.value,y),b!==null&&(g=a(b,g,D),C===null?A=b:C.sibling=b,C=b);return Ht&&$i(u,D),A}for(w=i(w);!b.done;D++,b=v.next())b=p(w,u,D,b.value,y),b!==null&&(e&&(T=b.alternate,T!==null&&w.delete(T.key===null?D:T.key)),g=a(b,g,D),C===null?A=b:C.sibling=b,C=b);return e&&w.forEach(function(F){return t(u,F)}),Ht&&$i(u,D),A}function m(u,g,v,y){if(typeof v=="object"&&v!==null&&v.type===Mr&&v.key===null&&v.props.ref===void 0&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case Tc:t:{for(var A=v.key;g!==null;){if(g.key===A){if(A=v.type,A===Mr){if(g.tag===7){n(u,g.sibling),y=s(g,v.props.children),As(y,v),y.return=u,u=y;break t}}else if(g.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===Rs&&Sa(A)===g.type){n(u,g.sibling),y=s(g,v.props),As(y,v),y.return=u,u=y;break t}n(u,g);break}else t(u,g);g=g.sibling}v.type===Mr?(y=Aa(v.props.children,u.mode,y,v.key),As(y,v),y.return=u,u=y):(y=Jc(v.type,v.key,v.props,null,u.mode,y),As(y,v),y.return=u,u=y)}return r(u);case Zo:t:{for(A=v.key;g!==null;){if(g.key===A)if(g.tag===4&&g.stateNode.containerInfo===v.containerInfo&&g.stateNode.implementation===v.implementation){n(u,g.sibling),y=s(g,v.children||[]),y.return=u,u=y;break t}else{n(u,g);break}else t(u,g);g=g.sibling}y=bd(v,u.mode,y),y.return=u,u=y}return r(u);case Rs:return v=Sa(v),m(u,g,v,y)}if(Jo(v))return _(u,g,v,y);if(Go(v)){if(A=Go(v),typeof A!="function")throw Error(k(150));return v=A.call(v),S(u,g,v,y)}if(typeof v.then=="function")return m(u,g,Lc(v),y);if(v.$$typeof===Ui)return m(u,g,Nc(u,v),y);Oc(u,v)}return typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint"?(v=""+v,g!==null&&g.tag===6?(n(u,g.sibling),y=s(g,v),y.return=u,u=y):(n(u,g),y=Md(v,u.mode,y),y.return=u,u=y),r(u)):n(u,g)}return function(u,g,v,y){try{vl=0;var A=m(u,g,v,y);return zr=null,A}catch(w){if(w===so||w===Yu)throw w;var C=bn(29,w,null,u.mode);return C.lanes=y,C.return=u,C}finally{}}}var Oa=Dy(!0),Uy=Dy(!1),Ds=!1;function gm(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function up(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Hs(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Vs(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(Qt&2)!==0){var s=i.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),i.pending=t,t=gu(e),My(e,null,n),t}return Wu(e,i,t,n),gu(e)}function il(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Zv(e,n)}}function Ed(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var s=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?s=a=r:a=a.next=r,n=n.next}while(n!==null);a===null?s=a=t:a=a.next=t}else s=a=t;n={baseState:i.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var hp=!1;function sl(){if(hp){var e=Pr;if(e!==null)throw e}}function al(e,t,n,i){hp=!1;var s=e.updateQueue;Ds=!1;var a=s.firstBaseUpdate,r=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?a=c:r.next=c,r=l;var f=e.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==r&&(o===null?f.firstBaseUpdate=c:o.next=c,f.lastBaseUpdate=l))}if(a!==null){var d=s.baseState;r=0,f=c=l=null,o=a;do{var h=o.lane&-536870913,p=h!==o.lane;if(p?(Wt&h)===h:(i&h)===h){h!==0&&h===La&&(hp=!0),f!==null&&(f=f.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var _=e,S=o;h=t;var m=n;switch(S.tag){case 1:if(_=S.payload,typeof _=="function"){d=_.call(m,d,h);break t}d=_;break t;case 3:_.flags=_.flags&-65537|128;case 0:if(_=S.payload,h=typeof _=="function"?_.call(m,d,h):_,h==null)break t;d=fe({},d,h);break t;case 2:Ds=!0}}h=o.callback,h!==null&&(e.flags|=64,p&&(e.flags|=8192),p=s.callbacks,p===null?s.callbacks=[h]:p.push(h))}else p={lane:h,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(c=f=p,l=d):f=f.next=p,r|=h;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;p=o,o=p.next,p.next=null,s.lastBaseUpdate=p,s.shared.pending=null}}while(!0);f===null&&(l=d),s.baseState=l,s.firstBaseUpdate=c,s.lastBaseUpdate=f,a===null&&(s.shared.lanes=0),js|=r,e.lanes=r,e.memoizedState=d}}function Ny(e,t){if(typeof e!="function")throw Error(k(191,e));e.call(t)}function Ly(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ny(n[e],t)}var Ks=Bi(null),Su=Bi(0);function D_(e,t){e=ls,ve(Su,e),ve(Ks,t),ls=e|t.baseLanes}function fp(){ve(Su,ls),ve(Ks,Ks.current)}function _m(){ls=Su.current,tn(Ks),tn(Su)}var sn=Bi(null),ln=null;function Gs(e){var t=e.alternate;ve(en,en.current&1),ve(sn,e),ln===null&&(t===null||Ks.current!==null||t.memoizedState!==null)&&(ln=e)}function dp(e){ve(en,en.current),ve(sn,e),ln===null&&(ln=e)}function Oy(e){e.tag===22?(ve(en,en.current),ve(sn,e),ln===null&&(ln=e)):ks()}function ks(){ve(en,en.current),ve(sn,sn.current)}function On(e){tn(sn),ln===e&&(ln=null),tn(en)}var en=Bi(0);function yl(e,t){ve(sn,sn.current),ve(en,t)}function vm(e){tn(en),tn(sn),ln===e&&(ln=null)}function Mu(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Yp(n)||Wm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!=="independent"){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var as=0,It=null,ce=null,Ie=null,bu=!1,Br=!1,Ia=!1,Tu=0,xl=0,Fr=null,IT=0;function De(){throw Error(k(321))}function ym(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Vn(e[n],t[n]))return!1;return!0}function xm(e,t,n,i,s,a){return as=a,It=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ct.H=e===null||e.memoizedState===null?hx:fx,Ia=!1,a=n(i,s),Ia=!1,Br&&(a=Py(t,n,i,s)),Iy(e),a}function Iy(e){Ct.H=Eu;var t=ce!==null&&ce.next!==null;if(as=0,Ie=ce=It=null,bu=!1,xl=0,Fr=null,t)throw Error(k(300));e===null||ze||(e=e.dependencies,e!==null&&yu(e)&&(ze=!0))}function Py(e,t,n,i){It=e;var s=0;do{if(Br&&(Fr=null),xl=0,Br=!1,25<=s)throw Error(k(301));if(s+=1,Ie=ce=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}Ct.H=kT,a=t(n,i)}while(Br);return a}function PT(){var e=Ct.H,t=e.useState()[0];return t=typeof t.then=="function"?Il(t):t,e=e.useState()[0],(ce!==null?ce.memoizedState:null)!==e&&(It.flags|=1024),t}function Sm(){var e=Tu!==0;return Tu=0,e}function Mm(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function bm(e){if(bu){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}bu=!1}as=0,Ie=ce=It=null,Br=!1,xl=Tu=0,Fr=null}function gn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ie===null?It.memoizedState=Ie=e:Ie=Ie.next=e,Ie}function Oe(){if(ce===null){var e=It.alternate;e=e!==null?e.memoizedState:null}else e=ce.next;var t=Ie===null?It.memoizedState:Ie.next;if(t!==null)Ie=t,ce=e;else{if(e===null)throw It.alternate===null?Error(k(467)):Error(k(310));ce=e,e={memoizedState:ce.memoizedState,baseState:ce.baseState,baseQueue:ce.baseQueue,queue:ce.queue,next:null},Ie===null?It.memoizedState=Ie=e:Ie=Ie.next=e}return Ie}function Zu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Il(e){var t=xl;return xl+=1,Fr===null&&(Fr=[]),e=Ry(Fr,e,t),t=It,(Ie===null?t.memoizedState:Ie.next)===null&&(t=t.alternate,Ct.H=t===null||t.memoizedState===null?hx:fx),e}function Ju(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Il(e);if(e.$$typeof===_1)return;if(e.$$typeof===Ui)return $e(e)}throw Error(k(438,String(e)))}function Tm(e){var t=null,n=It.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=It.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Zu(),It.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=g1;return t.index++,n}function rs(e,t){return typeof t=="function"?t(e):t}function jc(e){var t=Oe();return Em(t,ce,e)}function Em(e,t,n){var i=e.queue;if(i===null)throw Error(k(311));i.lastRenderedReducer=n;var s=e.baseQueue,a=i.pending;if(a!==null){if(s!==null){var r=s.next;s.next=a.next,a.next=r}t.baseQueue=s=a,i.pending=null}if(a=e.baseState,s===null)e.memoizedState=a;else{t=s.next;var o=r=null,l=null,c=t,f=!1;do{var d=c.lane&-536870913;if(d!==c.lane?(Wt&d)===d:(as&d)===d){var h=c.revertLane;if(h===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),d===La&&(f=!0);else if((as&h)===h){c=c.next,h===La&&(f=!0);continue}else d={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=d,r=a):l=l.next=d,It.lanes|=h,js|=h;d=c.action,Ia&&n(a,d),a=c.hasEagerState?c.eagerState:n(a,d)}else h={lane:d,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=h,r=a):l=l.next=h,It.lanes|=d,js|=d;c=c.next}while(c!==null&&c!==t);if(l===null?r=a:l.next=o,!Vn(a,e.memoizedState)&&(ze=!0,f&&(n=Pr,n!==null)))throw n;e.memoizedState=a,e.baseState=r,e.baseQueue=l,i.lastRenderedState=a}return s===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Ad(e){var t=Oe(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var i=n.dispatch,s=n.pending,a=t.memoizedState;if(s!==null){n.pending=null;var r=s=s.next;do a=e(a,r.action),r=r.next;while(r!==s);Vn(a,t.memoizedState)||(ze=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,i]}function zy(e,t,n){var i=It,s=Oe(),a=Ht;if(a){if(n===void 0)throw Error(k(407));n=n()}else n=t();var r=!Vn((ce||s).memoizedState,n);if(r&&(s.memoizedState=n,ze=!0),s=s.queue,Am(Hy.bind(null,i,s,e),[e]),e=s.getSnapshot!==t||r||Ie!==null&&(Ie.memoizedState.tag&1)!==0,qr(e?9:8,{destroy:void 0},Fy.bind(null,i,s,n,t),null),e){if(i.flags|=2048,he===null)throw Error(k(349));a||(as&127)!==0||By(i,t,n)}return n}function By(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=It.updateQueue,t===null?(t=Zu(),It.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Fy(e,t,n,i){t.value=n,t.getSnapshot=i,Vy(t)&&Gy(e)}function Hy(e,t,n){return n(function(){Vy(t)&&Gy(e)})}function Vy(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Vn(e,n)}catch{return!0}}function Gy(e){var t=Va(e,2);t!==null&&Tn(t,e,2)}function pp(e){var t=gn();if(typeof e=="function"){var n=e;if(e=n(),Ia){Ns(!0);try{n()}finally{Ns(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:rs,lastRenderedState:e},t}function ky(e,t,n,i){return e.baseState=n,Em(e,ce,typeof i=="function"?i:rs)}function zT(e,t,n,i,s){if(Qu(e))throw Error(k(485));if(e=t.action,e!==null){var a={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){a.listeners.push(r)}};Ct.T!==null?n(!0):a.isTransition=!1,i(a),n=t.pending,n===null?(a.next=t.pending=a,Xy(t,a)):(a.next=n.next,t.pending=n.next=a)}}function Xy(e,t){var n=t.action,i=t.payload,s=e.state;if(t.isTransition){var a=Ct.T,r={};r.types=a!==null?a.types:null,Ct.T=r;try{var o=n(s,i),l=Ct.S;l!==null&&l(r,o),U_(e,t,o)}catch(c){mp(e,t,c)}finally{a!==null&&r.types!==null&&(a.types=r.types),Ct.T=a}}else try{a=n(s,i),U_(e,t,a)}catch(c){mp(e,t,c)}}function U_(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){N_(e,t,i)},function(i){return mp(e,t,i)}):N_(e,t,n)}function N_(e,t,n){t.status="fulfilled",t.value=n,Wy(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Xy(e,n)))}function mp(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,Wy(t),t=t.next;while(t!==i)}e.action=null}function Wy(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function qy(e,t){return t}function L_(e,t){if(Ht){var n=he.formState;if(n!==null){t:{var i=It;if(Ht){if(_e){e:{for(var s=_e,a=ai;s.nodeType!==8;){if(!a){s=null;break e}if(s=ri(s.nextSibling),s===null){s=null;break e}}a=s.data,s=a==="F!"||a==="F"?s:null}if(s){_e=ri(s.nextSibling),i=s.data==="F!";break t}}Js(i)}i=!1}i&&(t=n[0])}}return n=gn(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:qy,lastRenderedState:t},n.queue=i,n=lx.bind(null,It,i),i.dispatch=n,i=pp(!1),a=Dm.bind(null,It,!1,i.queue),i=gn(),s={state:t,dispatch:null,action:e,pending:null},i.queue=s,n=zT.bind(null,It,s,a,n),s.dispatch=n,i.memoizedState=e,[t,n,!1]}function O_(e){var t=Oe();return Yy(t,ce,e)}function Yy(e,t,n){if(t=Em(e,t,qy)[0],e=jc(rs)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=Il(t)}catch(r){throw r===so?Yu:r}else i=t;t=Oe();var s=t.queue,a=s.dispatch;return n!==t.memoizedState&&(It.flags|=2048,qr(9,{destroy:void 0},BT.bind(null,s,n),null)),[i,a,e]}function BT(e,t){e.action=t}function I_(e){var t=Oe(),n=ce;if(n!==null)return Yy(t,n,e);Oe(),t=t.memoizedState,n=Oe();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function qr(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=It.updateQueue,t===null&&(t=Zu(),It.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function Zy(){return Oe().memoizedState}function $c(e,t,n,i){var s=gn();It.flags|=e,s.memoizedState=qr(1|t,{destroy:void 0},n,i===void 0?null:i)}function Ku(e,t,n,i){var s=Oe();i=i===void 0?null:i;var a=s.memoizedState.inst;ce!==null&&i!==null&&ym(i,ce.memoizedState.deps)?s.memoizedState=qr(t,a,n,i):(It.flags|=e,s.memoizedState=qr(1|t,a,n,i))}function P_(e,t){$c(8390656,8,e,t)}function Am(e,t){Ku(2048,8,e,t)}function FT(e){It.flags|=4;var t=It.updateQueue;if(t===null)t=Zu(),It.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Jy(e){var t=Oe().memoizedState;return FT({ref:t,nextImpl:e}),function(){if((Qt&2)!==0)throw Error(k(440));return t.impl.apply(void 0,arguments)}}function Ky(e,t){return Ku(4,2,e,t)}function Qy(e,t){return Ku(4,4,e,t)}function jy(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function $y(e,t,n){n=n!=null?n.concat([e]):null,Ku(4,4,jy.bind(null,t,e),n)}function wm(){}function tx(e,t){var n=Oe();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&ym(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function ex(e,t){var n=Oe();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&ym(t,i[1]))return i[0];if(i=e(),Ia){Ns(!0);try{e()}finally{Ns(!1)}}return n.memoizedState=[i,t],i}function Cm(e,t,n){return n===void 0||(as&1073741824)!==0&&(Wt&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=Yx(),It.lanes|=e,js|=e,n)}function nx(e,t,n,i){return Vn(n,t)?n:Ks.current!==null?(e=Cm(e,n,i),Vn(e,t)||(ze=!0),e):(as&106)===0||(as&1073741824)!==0&&(Wt&261930)===0?(ze=!0,e.memoizedState=n):(e=Yx(),It.lanes|=e,js|=e,t)}function ix(e,t,n,i,s){var a=jt.p;jt.p=a!==0&&8>a?a:8;var r=Ct.T,o={};o.types=r!==null?r.types:null,Ct.T=o,Dm(e,!1,t,n);try{var l=s(),c=Ct.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var f=OT(l,i);rl(e,t,f,Hn(e))}else rl(e,t,i,Hn(e))}catch(d){rl(e,t,{then:function(){},status:"rejected",reason:d},Hn())}finally{jt.p=a,r!==null&&o.types!==null&&(r.types=o.types),Ct.T=r}}function HT(){}function gp(e,t,n,i){if(e.tag!==5)throw Error(k(476));var s=sx(e).queue;ix(e,s,t,Ea,n===null?HT:function(){return ax(e),n(i)})}function sx(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Ea,baseState:Ea,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:rs,lastRenderedState:Ea},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:rs,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ax(e){var t=sx(e);t.next===null&&(t=e.alternate.memoizedState),rl(e,t.next.queue,{},Hn())}function Rm(){return $e($r)}function rx(){return Oe().memoizedState}function ox(){return Oe().memoizedState}function VT(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Hn();e=Hs(n);var i=Vs(t,e,n);i!==null&&(Tn(i,t,n),il(i,t,n)),t={cache:dm()},e.payload=t;return}t=t.return}}function GT(e,t,n){var i=Hn();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Qu(e)?cx(t,n):(n=um(e,t,n,i),n!==null&&(Tn(n,e,i),ux(n,t,i)))}function lx(e,t,n){var i=Hn();rl(e,t,n,i)}function rl(e,t,n,i){var s={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Qu(e))cx(t,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var r=t.lastRenderedState,o=a(r,n);if(s.hasEagerState=!0,s.eagerState=o,Vn(o,r))return Wu(e,t,s,0),he===null&&Xu(),!1}catch{}finally{}if(n=um(e,t,s,i),n!==null)return Tn(n,e,i),ux(n,t,i),!0}return!1}function Dm(e,t,n,i){if(i={lane:2,revertLane:Vm(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Qu(e)){if(t)throw Error(k(479))}else t=um(e,n,i,2),t!==null&&Tn(t,e,2)}function Qu(e){var t=e.alternate;return e===It||t!==null&&t===It}function cx(e,t){Br=bu=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function ux(e,t,n){if((n&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Zv(e,n)}}var Eu={readContext:$e,use:Ju,useCallback:De,useContext:De,useEffect:De,useImperativeHandle:De,useLayoutEffect:De,useInsertionEffect:De,useMemo:De,useReducer:De,useRef:De,useState:De,useDebugValue:De,useDeferredValue:De,useTransition:De,useSyncExternalStore:De,useId:De,useHostTransitionStatus:De,useFormState:De,useActionState:De,useOptimistic:De,useMemoCache:De,useCacheRefresh:De,useEffectEvent:De},hx={readContext:$e,use:Ju,useCallback:function(e,t){return gn().memoizedState=[e,t===void 0?null:t],e},useContext:$e,useEffect:P_,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,$c(4194308,4,jy.bind(null,t,e),n)},useLayoutEffect:function(e,t){return $c(4194308,4,e,t)},useInsertionEffect:function(e,t){$c(4,2,e,t)},useMemo:function(e,t){var n=gn();t=t===void 0?null:t;var i=e();if(Ia){Ns(!0);try{e()}finally{Ns(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=gn();if(n!==void 0){var s=n(t);if(Ia){Ns(!0);try{n(t)}finally{Ns(!1)}}}else s=t;return i.memoizedState=i.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},i.queue=e,e=e.dispatch=GT.bind(null,It,e),[i.memoizedState,e]},useRef:function(e){var t=gn();return e={current:e},t.memoizedState=e},useState:function(e){e=pp(e);var t=e.queue,n=lx.bind(null,It,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:wm,useDeferredValue:function(e,t){var n=gn();return Cm(n,e,t)},useTransition:function(){var e=pp(!1);return e=ix.bind(null,It,e.queue,!0,!1),gn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=It,s=gn();if(Ht){if(n===void 0)throw Error(k(407));n=n()}else{if(n=t(),he===null)throw Error(k(349));(Wt&127)!==0||By(i,t,n)}s.memoizedState=n;var a={value:n,getSnapshot:t};return s.queue=a,P_(Hy.bind(null,i,a,e),[e]),i.flags|=2048,qr(9,{destroy:void 0},Fy.bind(null,i,a,n,t),null),n},useId:function(){var e=gn(),t=he.identifierPrefix;if(Ht){var n=Oi,i=Li;n=(i&~(1<<32-Fn(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=Tu++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=IT++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Rm,useFormState:L_,useActionState:L_,useOptimistic:function(e){var t=gn();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Dm.bind(null,It,!0,n),n.dispatch=t,[e,t]},useMemoCache:Tm,useCacheRefresh:function(){return gn().memoizedState=VT.bind(null,It)},useEffectEvent:function(e){var t=gn(),n={impl:e};return t.memoizedState=n,function(){if((Qt&2)!==0)throw Error(k(440));return n.impl.apply(void 0,arguments)}}},fx={readContext:$e,use:Ju,useCallback:tx,useContext:$e,useEffect:Am,useImperativeHandle:$y,useInsertionEffect:Ky,useLayoutEffect:Qy,useMemo:ex,useReducer:jc,useRef:Zy,useState:function(){return jc(rs)},useDebugValue:wm,useDeferredValue:function(e,t){var n=Oe();return nx(n,ce.memoizedState,e,t)},useTransition:function(){var e=jc(rs)[0],t=Oe().memoizedState;return[typeof e=="boolean"?e:Il(e),t]},useSyncExternalStore:zy,useId:rx,useHostTransitionStatus:Rm,useFormState:O_,useActionState:O_,useOptimistic:function(e,t){var n=Oe();return ky(n,ce,e,t)},useMemoCache:Tm,useCacheRefresh:ox,useEffectEvent:Jy},kT={readContext:$e,use:Ju,useCallback:tx,useContext:$e,useEffect:Am,useImperativeHandle:$y,useInsertionEffect:Ky,useLayoutEffect:Qy,useMemo:ex,useReducer:Ad,useRef:Zy,useState:function(){return Ad(rs)},useDebugValue:wm,useDeferredValue:function(e,t){var n=Oe();return ce===null?Cm(n,e,t):nx(n,ce.memoizedState,e,t)},useTransition:function(){var e=Ad(rs)[0],t=Oe().memoizedState;return[typeof e=="boolean"?e:Il(e),t]},useSyncExternalStore:zy,useId:rx,useHostTransitionStatus:Rm,useFormState:I_,useActionState:I_,useOptimistic:function(e,t){var n=Oe();return ce!==null?ky(n,ce,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:Tm,useCacheRefresh:ox,useEffectEvent:Jy};function wd(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:fe({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var _p={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=Hn(),s=Hs(i);s.payload=t,n!=null&&(s.callback=n),t=Vs(e,s,i),t!==null&&(Tn(t,e,i),il(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=Hn(),s=Hs(i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=Vs(e,s,i),t!==null&&(Tn(t,e,i),il(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Hn(),i=Hs(n);i.tag=2,t!=null&&(i.callback=t),t=Vs(e,i,n),t!==null&&(Tn(t,e,n),il(t,e,n))}};function z_(e,t,n,i,s,a,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,a,r):t.prototype&&t.prototype.isPureReactComponent?!ml(n,i)||!ml(s,a):!0}function B_(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&_p.enqueueReplaceState(t,t.state,null)}function Pa(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=fe({},n));for(var s in e)n[s]===void 0&&(n[s]=e[s])}return n}function dx(e){mu(e)}function px(e){console.error(e)}function mx(e){mu(e)}function Au(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function F_(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function vp(e,t,n){return n=Hs(n),n.tag=3,n.payload={element:null},n.callback=function(){Au(e,t)},n}function gx(e){return e=Hs(e),e.tag=3,e}function _x(e,t,n,i){var s=n.type.getDerivedStateFromError;if(typeof s=="function"){var a=i.value;e.payload=function(){return s(a)},e.callback=function(){F_(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){F_(t,n,i),typeof s!="function"&&(Xs===null?Xs=new Set([this]):Xs.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function XT(e,t,n,i,s){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&Ua(t,n,s,!0),n=sn.current,n!==null){switch(n.tag){case 31:case 13:case 19:return ln===null?Ou():n.alternate===null&&Ue===0&&(Ue=3),n.flags&=-257,n.flags|=65536,n.lanes=s,i===xu?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),Od(e,i,s)),!1;case 22:return n.flags|=65536,i===xu?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),Od(e,i,s)),!1}throw Error(k(435,n.tag))}return Od(e,i,s),Ou(),!1}if(Ht)return t=sn.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,i!==rp&&(e=Error(k(422),{cause:i}),_l(si(e,n)))):(i!==rp&&(t=Error(k(423),{cause:i}),_l(si(t,n))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,i=si(i,n),s=vp(e.stateNode,i,s),Ed(e,s),Ue!==4&&(Ue=2)),!1;var a=Error(k(520),{cause:i});if(a=si(a,n),ul===null?ul=[a]:ul.push(a),Ue!==4&&(Ue=2),t===null)return!0;i=si(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=s&-s,n.lanes|=e,e=vp(n.stateNode,i,e),Ed(n,e),!1;case 1:if(t=n.type,a=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||a!==null&&typeof a.componentDidCatch=="function"&&(Xs===null||!Xs.has(a))))return n.flags|=65536,s&=-s,n.lanes|=s,s=gx(s),_x(s,e,n,i),Ed(n,s),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Um=Error(k(461)),ze=!1;function Fe(e,t,n,i){t.child=e===null?Uy(t,null,n,i):Oa(t,e.child,n,i)}function H_(e,t,n,i,s){n=n.render;var a=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return Na(t),i=xm(e,t,n,r,a,s),o=Sm(),e!==null&&!ze?(Mm(e,t,s),os(e,t,s)):(Ht&&o&&qu(t),t.flags|=1,Fe(e,t,i,s),t.child)}function V_(e,t,n,i,s){if(e===null){var a=n.type;return typeof a=="function"&&!hm(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,vx(e,t,a,i,s)):(e=Jc(n.type,null,i,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Lm(e,s)){var r=a.memoizedProps;if(n=n.compare,n=n!==null?n:ml,n(r,i)&&e.ref===t.ref)return os(e,t,s)}return t.flags|=1,e=es(a,i),e.ref=t.ref,e.return=t,t.child=e}function vx(e,t,n,i,s){if(e!==null){var a=e.memoizedProps;if(ml(a,i)&&e.ref===t.ref)if(ze=!1,t.pendingProps=i=a,Lm(e,s))(e.flags&131072)!==0&&(ze=!0);else return t.lanes=e.lanes,os(e,t,s)}return yp(e,t,n,i,s)}function yx(e,t,n,i){var s=i.children,a=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(a=a!==null?a.baseLanes|n:n,e!==null){for(i=t.child=e.child,s=0;i!==null;)s=s|i.lanes|i.childLanes,i=i.sibling;i=s&~a}else i=0,t.child=null;return G_(e,t,a,n,i)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Qc(t,a!==null?a.cachePool:null),a!==null?D_(t,a):fp(),Oy(t);else return i=t.lanes=536870912,G_(e,t,a!==null?a.baseLanes|n:n,n,i)}else a!==null?(Qc(t,a.cachePool),D_(t,a),ks(),t.memoizedState=null):(e!==null&&Qc(t,null),fp(),ks());return Fe(e,t,s,n),t.child}function ol(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function G_(e,t,n,i,s){var a=pm();return a=a===null?null:{parent:Pe._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Qc(t,null),fp(),Oy(t),e!==null&&Ua(e,t,i,!0),t.childLanes=s,null}function tu(e,t){return t=ju({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function k_(e,t,n){return Oa(t,e.child,null,n),e=tu(t,t.pendingProps),e.flags|=2,On(t),t.memoizedState=null,e}function WT(e,t,n){var i=t.pendingProps,s=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Ht){if(i.mode==="hidden")return e=tu(t,i),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},ol(null,e);if(dp(t),(e=_e)?(e=yS(e,ai),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Zs!==null?{id:Li,overflow:Oi}:null,retryLane:536870912,hydrationErrors:null},n=Ty(e),n.return=t,t.child=n,Je=t,_e=null)):e=null,e===null)throw Js(t);return t.lanes=536870912,null}return tu(t,i)}var a=e.memoizedState;if(a!==null){var r=a.dehydrated;if(dp(t),s)if(t.flags&256)t.flags&=-257,t=k_(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(k(558));else if(ze||Ua(e,t,n,!1),s=(n&e.childLanes)!==0,ze||s){if(Ks.current===null){if(i=he,i!==null&&(r=Jv(i,n),r!==0&&r!==a.retryLane))throw a.retryLane=r,Va(e,r),Tn(i,e,r),Um;Ou()}t=k_(e,t,n)}else e=a.treeContext,_e=ri(r.nextSibling),Je=t,Ht=!0,Fs=null,ai=!1,e!==null&&Ay(t,e),t=tu(t,i),t.flags|=134221824;return t}return e=es(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function vr(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(k(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function yp(e,t,n,i,s){return Na(t),n=xm(e,t,n,i,void 0,s),i=Sm(),e!==null&&!ze?(Mm(e,t,s),os(e,t,s)):(Ht&&i&&qu(t),t.flags|=1,Fe(e,t,n,s),t.child)}function X_(e,t,n,i,s,a){return Na(t),t.updateQueue=null,n=Py(t,i,n,s),Iy(e),i=Sm(),e!==null&&!ze?(Mm(e,t,a),os(e,t,a)):(Ht&&i&&qu(t),t.flags|=1,Fe(e,t,n,a),t.child)}function W_(e,t,n,i,s){if(Na(t),t.stateNode===null){var a=Rr,r=n.contextType;typeof r=="object"&&r!==null&&(a=$e(r)),a=new n(i,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=_p,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=i,a.state=t.memoizedState,a.refs={},gm(t),r=n.contextType,a.context=typeof r=="object"&&r!==null?$e(r):Rr,a.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(wd(t,n,r,i),a.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(r=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),r!==a.state&&_p.enqueueReplaceState(a,a.state,null),al(t,i,a,s),sl(),a.state=t.memoizedState),typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){a=t.stateNode;var o=t.memoizedProps,l=Pa(n,o);a.props=l;var c=a.context,f=n.contextType;r=Rr,typeof f=="object"&&f!==null&&(r=$e(f));var d=n.getDerivedStateFromProps;f=typeof d=="function"||typeof a.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,f||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o||c!==r)&&B_(t,a,i,r),Ds=!1;var h=t.memoizedState;a.state=h,al(t,i,a,s),sl(),c=t.memoizedState,o||h!==c||Ds?(typeof d=="function"&&(wd(t,n,d,i),c=t.memoizedState),(l=Ds||z_(t,n,l,i,h,c,r))?(f||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),a.props=i,a.state=c,a.context=r,i=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{a=t.stateNode,up(e,t),r=t.memoizedProps,f=Pa(n,r),a.props=f,d=t.pendingProps,h=a.context,c=n.contextType,l=Rr,typeof c=="object"&&c!==null&&(l=$e(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(r!==d||h!==l)&&B_(t,a,i,l),Ds=!1,h=t.memoizedState,a.state=h,al(t,i,a,s),sl();var p=t.memoizedState;r!==d||h!==p||Ds||e!==null&&e.dependencies!==null&&yu(e.dependencies)?(typeof o=="function"&&(wd(t,n,o,i),p=t.memoizedState),(f=Ds||z_(t,n,f,i,h,p,l)||e!==null&&e.dependencies!==null&&yu(e.dependencies))?(c||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,p,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,p,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=p),a.props=i,a.state=p,a.context=l,i=f):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),i=!1)}return a=i,vr(e,t),i=(t.flags&128)!==0,a||i?(a=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:a.render(),t.flags|=1,e!==null&&i?(t.child=Oa(t,e.child,null,s),t.child=Oa(t,null,n,s)):Fe(e,t,n,s),t.memoizedState=a.state,e=t.child):e=os(e,t,s),e}function q_(e,t,n,i){return Da(),t.flags|=256,Fe(e,t,n,i),t.child}var xp={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Sp(e){return{baseLanes:e,cachePool:Cy()}}function Mp(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=Pn),e}function xx(e,t,n){var i=t.pendingProps,s=!1,a=(t.flags&128)!==0,r;if((r=a)||(r=e!==null&&e.memoizedState===null?!1:(en.current&2)!==0),r&&(s=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(Ht){if(s?Gs(t):ks(),(e=_e)?(e=yS(e,ai),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Zs!==null?{id:Li,overflow:Oi}:null,retryLane:536870912,hydrationErrors:null},n=Ty(e),n.return=t,t.child=n,Je=t,_e=null)):e=null,e===null)throw Js(t);return Wm(e)?t.lanes=32:t.lanes=536870912,null}return a=i.children,i=i.fallback,s?(ks(),s=t.mode,a=ju({mode:"hidden",children:a},s),i=Aa(i,s,n,null),a.return=t,i.return=t,a.sibling=i,t.child=a,i=t.child,i.memoizedState=Sp(n),i.childLanes=Mp(e,r,n),t.memoizedState=xp,ol(null,i)):(Gs(t),Nm(t,a))}var o=e.memoizedState;if(o!==null){var l=o.dehydrated;if(l!==null)return qT(e,t,a,r,i,l,o,n)}return s?(ks(),s=i.fallback,a=t.mode,o=e.child,l=o.sibling,i=es(o,{mode:"hidden",children:i.children}),i.subtreeFlags=o.subtreeFlags&1206910976,l!==null?s=es(l,s):(s=Aa(s,a,n,null),s.flags|=2),s.return=t,i.return=t,i.sibling=s,t.child=i,ol(null,i),i=t.child,s=e.child.memoizedState,s===null?s=Sp(n):(a=s.cachePool,a!==null?(o=Pe._currentValue,a=a.parent!==o?{parent:o,pool:o}:a):a=Cy(),s={baseLanes:s.baseLanes|n,cachePool:a}),i.memoizedState=s,i.childLanes=Mp(e,r,n),t.memoizedState=xp,ol(e.child,i)):(Gs(t),n=e.child,e=n.sibling,n=es(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function Nm(e,t){return t=ju({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function ju(e,t){return e=bn(22,e,null,t),e.lanes=0,e}function Ic(e,t,n){return Oa(t,e.child,null,n),e=Nm(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function qT(e,t,n,i,s,a,r,o){if(n)return t.flags&256?(Gs(t),t.flags&=-257,Ic(e,t,o)):t.memoizedState!==null?(ks(),t.child=e.child,t.flags|=128,null):(ks(),a=s.fallback,r=t.mode,s=ju({mode:"visible",children:s.children},r),a=Aa(a,r,o,null),a.flags|=2,s.return=t,a.return=t,s.sibling=a,t.child=s,Oa(t,e.child,null,o),s=t.child,s.memoizedState=Sp(o),s.childLanes=Mp(e,i,o),t.memoizedState=xp,ol(null,s));if(Gs(t),Wm(a)){if(i=a.nextSibling&&a.nextSibling.dataset,i)var l=i.dgst;return i=l,i!==""&&(s=Error(k(419)),s.stack="",s.digest=i,_l({value:s,source:null,stack:null})),Ic(e,t,o)}if(ze||Ua(e,t,o,!1),i=(o&e.childLanes)!==0,ze||i){if(Ks.current!==null)return Ic(e,t,o);if(i=he,i!==null&&(s=Jv(i,o),s!==0&&s!==r.retryLane))throw r.retryLane=s,Va(e,s),Tn(i,e,s),Um;return Yp(a)||Ou(),Ic(e,t,o)}return Yp(a)?(t.flags|=192,t.child=e.child,null):(e=r.treeContext,_e=ri(a.nextSibling),Je=t,Ht=!0,Fs=null,ai=!1,e!==null&&Ay(t,e),t=Nm(t,s.children),t.flags|=134221824,t)}function Y_(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),Kc(e.return,t,n)}function Z_(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Mu(n)===null&&(t=e),e=e.sibling}return t}function Pc(e,t,n,i,s,a){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:s,treeForkCount:a}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=s,r.treeForkCount=a)}function Cd(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function bp(e,t,n){var i=t.pendingProps,s=i.revealOrder,a=i.tail;i=i.children;var r=en.current;if(t.flags&128)return yl(t,r),null;var o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,yl(t,r),s==="backwards"&&e!==null?(Cd(e),Fe(e,t,i,n),Cd(e)):Fe(e,t,i,n),i=Ht?gl:0,!o&&e!==null&&(e.flags&128)!==0)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Y_(e,n,t);else if(e.tag===19)Y_(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(s){case"backwards":n=Z_(t.child),n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null,Cd(t)),Pc(t,!0,s,null,a,i);break;case"unstable_legacy-backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Mu(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Pc(t,!0,n,null,a,i);break;case"together":Pc(t,!1,null,null,void 0,i);break;case"independent":t.memoizedState=null;break;default:n=Z_(t.child),n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Pc(t,!1,s,n,a,i)}return t.child}function J_(e,t,n){var i=t.pendingProps;return Os(t,t.type,i.value),Fe(e,t,i.children,n),t.child}function os(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),js|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Ua(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(k(153));if(t.child!==null){for(e=t.child,n=es(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=es(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Lm(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&yu(e)))}function YT(e,t,n){switch(t.tag){case 3:hu(t,t.stateNode.containerInfo),Os(t,Pe,e.memoizedState.cache),Da();break;case 27:case 5:Kd(t);break;case 4:hu(t,t.stateNode.containerInfo);break;case 10:Os(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,dp(t),null;break;case 13:var i=t.memoizedState;if(i!==null){if(i.dehydrated!==null)return Gs(t),t.flags|=128,null;i=Ua(e,t,n,!1);var s=t.child.childLanes;return i||(n&s)!==0?xx(e,t,n):(Gs(t),e=os(e,t,n),e!==null?e.sibling:null)}Gs(t);break;case 19:if(t.flags&128)return bp(e,t,n);if(s=(e.flags&128)!==0,i=(n&t.childLanes)!==0,i||(Ua(e,t,n,!1),i=(n&t.childLanes)!==0),s){if(i)return bp(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),yl(t,en.current),i)break;return null;case 22:return t.lanes=0,yx(e,t,n,t.pendingProps);case 24:Os(t,Pe,e.memoizedState.cache)}return os(e,t,n)}function Sx(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)ze=!0;else{if(!Lm(e,n)&&(t.flags&128)===0)return ze=!1,YT(e,t,n);ze=(e.flags&131072)!==0}else ze=!1,Ht&&(t.flags&1048576)!==0&&Ey(t,gl,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=Sa(t.elementType),t.type=e,typeof e=="function")hm(e)?(i=Pa(e,i),t.tag=1,t=W_(null,t,e,i,n)):(t.tag=0,t=yp(null,t,e,i,n));else{if(e!=null){var s=e.$$typeof;if(s===jp){t.tag=11,t=H_(null,t,e,i,n);break t}else if(s===$p){t.tag=14,t=V_(null,t,e,i,n);break t}else if(s===Ui){t.tag=10,t.type=e,t=J_(null,t,n);break t}}throw t=Zd(e)||e,Error(k(306,t,""))}}return t;case 0:return yp(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,s=Pa(i,t.pendingProps),W_(e,t,i,s,n);case 3:t:{if(hu(t,t.stateNode.containerInfo),e===null)throw Error(k(387));i=t.pendingProps;var a=t.memoizedState;s=a.element,up(e,t),al(t,i,null,n);var r=t.memoizedState;if(i=r.cache,Os(t,Pe,i),i!==a.cache&&lp(t,[Pe],n,!0),sl(),i=r.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=q_(e,t,i,n);break t}else if(i!==s){s=si(Error(k(424)),t),_l(s),t=q_(e,t,i,n);break t}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(_e=ri(e.firstChild),Je=t,Ht=!0,Fs=null,ai=!0,n=Uy(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(Da(),i===s){t=os(e,t,n);break t}Fe(e,t,i,n)}t=t.child}return t;case 26:return vr(e,t),e===null?(n=Mv(t.type,null,t.pendingProps,null))?t.memoizedState=n:Ht||(t.stateNode=uS(t.type,t.pendingProps,Bs.current,t)):t.memoizedState=Mv(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Kd(t),e===null&&Ht&&(i=t.stateNode=xS(t.type,t.pendingProps,Bs.current),Je=t,ai=!0,s=_e,ta(t.type)?(Zp=s,_e=ri(i.firstChild)):_e=s),Fe(e,t,t.pendingProps.children,n),vr(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Ht&&((s=i=_e)&&(i=FE(i,t.type,t.pendingProps,ai),i!==null?(t.stateNode=i,Je=t,_e=ri(i.firstChild),ai=!1,s=!0):s=!1),s||Js(t)),Kd(t),s=t.type,a=t.pendingProps,r=e!==null?e.memoizedProps:null,i=a.children,Xp(s,a)?i=null:r!==null&&Xp(s,r)&&(t.flags|=32),t.memoizedState!==null&&(s=xm(e,t,PT,null,null,n),$r._currentValue=s),vr(e,t),Fe(e,t,i,n),t.child;case 6:return e===null&&Ht&&((e=n=_e)&&(n=HE(n,t.pendingProps,ai),n!==null?(t.stateNode=n,Je=t,_e=null,e=!0):e=!1),e||Js(t)),null;case 13:return xx(e,t,n);case 4:return hu(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Oa(t,null,i,n):Fe(e,t,i,n),t.child;case 11:return H_(e,t,t.type,t.pendingProps,n);case 7:return i=t.pendingProps,vr(e,t),Fe(e,t,i,n),t.child;case 8:return Fe(e,t,t.pendingProps.children,n),t.child;case 12:return Fe(e,t,t.pendingProps.children,n),t.child;case 10:return J_(e,t,n);case 9:return s=t.type._context,i=t.pendingProps.children,Na(t),s=$e(s),i=i(s),t.flags|=1,Fe(e,t,i,n),t.child;case 14:return V_(e,t,t.type,t.pendingProps,n);case 15:return vx(e,t,t.type,t.pendingProps,n);case 19:return bp(e,t,n);case 31:return WT(e,t,n);case 22:return yx(e,t,n,t.pendingProps);case 24:return Na(t),i=$e(Pe),e===null?(s=pm(),s===null&&(s=he,a=dm(),s.pooledCache=a,a.refCount++,a!==null&&(s.pooledCacheLanes|=n),s=a),t.memoizedState={parent:i,cache:s},gm(t),Os(t,Pe,s)):((e.lanes&n)!==0&&(up(e,t),al(t,null,null,n),sl()),s=e.memoizedState,a=t.memoizedState,s.parent!==i?(s={parent:i,cache:i},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),Os(t,Pe,i)):(i=a.cache,Os(t,Pe,i),i!==s.cache&&lp(t,[Pe],n,!0))),Fe(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),i=t.pendingProps,i.name!=null&&i.name!=="auto"?t.flags|=e===null?18882560:18874368:Ht&&qu(t),e!==null&&e.memoizedProps.name!==i.name?t.flags|=4194816:vr(e,t),Fe(e,t,i.children,n),t.child;case 29:throw t.pendingProps}throw Error(k(156,t.tag))}function ji(e){e.flags|=4}function Rd(e,t,n,i,s){var a;if((a=(e.mode&32)!==0)&&(a=n===null?Ev(t,i):Ev(t,i)&&(i.src!==n.src||i.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(s&335544128)===s)if(e.stateNode.complete)e.flags|=8192;else if(Kx())e.flags|=8192;else throw Ca=xu,mm}else e.flags&=-16777217}function K_(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!TS(t))if(Kx())e.flags|=8192;else throw Ca=xu,mm}function zc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?qv():536870912,e.lanes|=t,Yr|=t)}function Xo(e,t){if(!Ht)switch(e.tailMode){case"visible":break;case"collapsed":for(var n=e.tail,i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function ge(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags&1206910976,i|=s.flags&1206910976,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags,i|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function ZT(e,t,n){var i=t.pendingProps;switch(fm(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ge(t),null;case 1:return ge(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),ns(Pe),kr(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(gr(t)?ji(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Td())),ge(t),null;case 26:var s=t.type,a=t.memoizedState;return e===null?(ji(t),a!==null?(ge(t),K_(t,a)):(ge(t),Rd(t,s,null,i,n))):a?a!==e.memoizedState?(ji(t),ge(t),K_(t,a)):(ge(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&ji(t),ge(t),Rd(t,s,e,i,n)),null;case 27:if(fu(t),n=Bs.current,s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&ji(t);else{if(!i){if(t.stateNode===null)throw Error(k(166));return ge(t),t.subtreeFlags&=-33554433,null}e=Ii.current,gr(t)?b_(t,e):(e=xS(s,i,n),t.stateNode=e,ji(t))}return ge(t),t.subtreeFlags&=-33554433,null;case 5:if(fu(t),s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&ji(t);else{if(!i){if(t.stateNode===null)throw Error(k(166));return ge(t),t.subtreeFlags&=-33554433,null}if(a=Ii.current,gr(t))b_(t,a);else{var r=bl(Bs.current);switch(a){case 1:a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case 2:a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;default:switch(s){case"svg":a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case"math":a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;case"script":a=r.createElement("div"),a.innerHTML="<script><\/script>",a=a.removeChild(a.firstChild);break;case"select":a=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?a.multiple=!0:i.size&&(a.size=i.size);break;default:a=typeof i.is=="string"?r.createElement(s,{is:i.is}):r.createElement(s)}}a[je]=t,a[An]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)a.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=a;t:switch(nn(a,s,i),s){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&ji(t)}}return ge(t),t.subtreeFlags&=-33554433,Rd(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&ji(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(k(166));if(e=Bs.current,gr(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,s=Je,s!==null)switch(s.tag){case 27:case 5:i=s.memoizedProps}e[je]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||lS(e.nodeValue,n)),e||Js(t,!0)}else e=bl(e).createTextNode(i),e[je]=t,t.stateNode=e}return ge(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=gr(t),n!==null){if(e===null){if(!i)throw Error(k(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(557));e[je]=t}else Da(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ge(t),e=!1}else n=Td(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(On(t),t):(On(t),null);if((t.flags&128)!==0)throw Error(k(558))}return ge(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=gr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!s)throw Error(k(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(k(317));s[je]=t}else Da(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ge(t),s=!1}else s=Td(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),s=!0;if(!s)return t.flags&256?(On(t),t):(On(t),null)}return On(t),(t.flags&128)!==0?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,s=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(s=i.alternate.memoizedState.cachePool.pool),a=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(a=i.memoizedState.cachePool.pool),a!==s&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),zc(t,t.updateQueue),ge(t),null);case 4:return kr(),e===null&&Gm(t.stateNode.containerInfo),t.flags|=67108864,ge(t),null;case 10:return ns(t.type),ge(t),null;case 19:if(vm(t),i=t.memoizedState,i===null)return ge(t),null;if(s=(t.flags&128)!==0,a=i.rendering,a===null)if(s)Xo(i,!1);else{if(Ue!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(a=Mu(e),a!==null){for(t.flags|=128,Xo(i,!1),e=a.updateQueue,t.updateQueue=e,zc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)by(n,e),n=n.sibling;return yl(t,en.current&1|2),Ht&&$i(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&zn()>Nu&&(t.flags|=128,s=!0,Xo(i,!1),t.lanes=4194304)}else{if(!s)if(e=Mu(a),e!==null){if(t.flags|=128,s=!0,e=e.updateQueue,t.updateQueue=e,zc(t,e),Xo(i,!0),i.tail===null&&i.tailMode!=="collapsed"&&i.tailMode!=="visible"&&!a.alternate&&!Ht)return ge(t),null}else 2*zn()-i.renderingStartTime>Nu&&n!==536870912&&(t.flags|=128,s=!0,Xo(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(e=i.last,e!==null?e.sibling=a:t.child=a,i.last=a)}if(i.tail!==null){e=i.tail;t:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break t}n=n.sibling}n=!0}return i.rendering=e,i.tail=e.sibling,i.renderingStartTime=zn(),e.sibling=null,a=en.current,a=s?a&1|2:a&1,i.tailMode==="visible"||i.tailMode==="collapsed"||!n||Ht?yl(t,a):(n=a,ve(sn,t),ve(en,n),ln===null&&(ln=t)),Ht&&$i(t,i.treeForkCount),e}return ge(t),null;case 22:case 23:return On(t),_m(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(n&536870912)!==0&&(t.flags&128)===0&&(ge(t),t.subtreeFlags&6&&(t.flags|=8192)):ge(t),n=t.updateQueue,n!==null&&zc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&tn(wa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ns(Pe),ge(t),null;case 25:return null;case 30:return t.flags|=33554432,ge(t),null}throw Error(k(156,t.tag))}function JT(e,t){switch(fm(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ns(Pe),kr(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return fu(t),null;case 31:if(t.memoizedState!==null){if(On(t),t.alternate===null)throw Error(k(340));Da()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(On(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(k(340));Da()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return vm(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return kr(),null;case 10:return ns(t.type),null;case 22:case 23:return On(t),_m(),e!==null&&tn(wa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ns(Pe),null;case 25:return null;default:return null}}function Mx(e,t){switch(fm(t),t.tag){case 3:ns(Pe),kr();break;case 26:case 27:case 5:fu(t);break;case 4:kr();break;case 31:t.memoizedState!==null&&On(t);break;case 13:On(t);break;case 19:vm(t);break;case 10:ns(t.type);break;case 22:case 23:On(t),_m(),e!==null&&tn(wa);break;case 24:ns(Pe)}}function Pl(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var s=i.next;n=s;do{if((n.tag&e)===e){i=void 0;var a=n.create,r=n.inst;i=a(),r.destroy=i}n=n.next}while(n!==s)}}catch(o){re(t,t.return,o)}}function Qs(e,t,n){try{var i=t.updateQueue,s=i!==null?i.lastEffect:null;if(s!==null){var a=s.next;i=a;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,s=t;var l=n,c=o;try{c()}catch(f){re(s,l,f)}}}i=i.next}while(i!==a)}}catch(f){re(t,t.return,f)}}function bx(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ly(t,n)}catch(i){re(e,e.return,i)}}}function Tx(e,t,n){n.props=Pa(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){re(e,t,i)}}function Ri(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:var s=e.stateNode,a=ss(e.memoizedProps,s);(s.ref===null||s.ref.name!==a)&&(s.ref=pS(a)),i=s.ref;break;case 7:if(e.stateNode===null){var r=new Gn(e);En(e.child,!1,zE,r,void 0,void 0),e.stateNode=r}i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(o){re(e,t,o)}}function Qe(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(s){re(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(s){re(e,t,s)}else n.current=null}function wu(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)vS(e.stateNode,t[n])}function Q_(e){for(var t=e.return;t!==null&&(Im(t)&&vS(e.stateNode,t.stateNode),!Om(t));)t=t.return}function ll(e){for(var t=e.return;t!==null&&(Im(t)&&BE(e.stateNode,t.stateNode),!Om(t));)t=t.return}function Om(e){return e.tag===5||e.tag===3||e.tag===27}function Im(e){return e&&e.tag===7&&e.stateNode!==null}function Tp(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(s){re(e,e.return,s)}}function Dd(e,t,n){try{var i=e.stateNode;yE(i,e.type,n,t),i[An]=t}catch(s){re(e,e.return,s)}}function Ex(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ta(e.type)||e.tag===4}function Ud(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Ex(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ta(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ep(e,t,n,i){var s=e.tag;if(s===5||s===6)s=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(s,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(s),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Ni)),wu(e,i),Kt=!0;else if(s!==4&&(s===27&&(wu(e,i),i=null,ta(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Ep(e,t,n,i),e=e.sibling;e!==null;)Ep(e,t,n,i),e=e.sibling}function Cu(e,t,n,i){var s=e.tag;if(s===5||s===6)s=e.stateNode,t?n.insertBefore(s,t):n.appendChild(s),wu(e,i),Kt=!0;else if(s!==4&&(s===27&&(wu(e,i),i=null,ta(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Cu(e,t,n,i),e=e.sibling;e!==null;)Cu(e,t,n,i),e=e.sibling}function Ax(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,s=t.attributes;s.length;)t.removeAttributeNode(s[0]);nn(t,i,n),t[je]=e,t[An]=n}catch(a){re(e,e.return,a)}}var Ru=!1,In=null;function j_(e){(e.tag===30||(e.subtreeFlags&33554432)!==0)&&(Ru=!0)}var Di=null;function $_(){var e=Di;return Di=null,e}var Mn=0;function ao(e,t,n,i,s){return Mn=0,wx(e.child,t,n,i,s)}function wx(e,t,n,i,s){for(var a=!1;e!==null;){if(e.tag===5){var r=e.stateNode;if(i!==null){var o=Wp(r);i.push(o),o.view&&(a=!0)}else a||Wp(r).view&&(a=!0);Ru=!0,hS(r,Mn===0?t:t+"_"+Mn,n),Mn++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&s||wx(e.child,t,n,i,s)&&(a=!0));e=e.sibling}return a}function zi(e,t){for(;e!==null;)e.tag===5?fS(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||zi(e.child,t)),e=e.sibling}function eu(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(eu(e),e.tag===30&&(e.flags&18874368)!==0&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name==="auto")throw Error(k(544));var n=t.name;t=us(t.default,t.share),t!=="none"&&(ao(e,n,t,null,!1)||zi(e.child,!1))}e=e.sibling}}function Ap(e,t){if(e.tag===30){var n=e.stateNode,i=e.memoizedProps,s=ss(i,n),a=us(i.default,n.paired?i.share:i.enter);a!=="none"?ao(e,s,a,null,!1)?(eu(e),n.paired||t||Zr(e,i.onEnter)):zi(e.child,!1):eu(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Ap(e,t),e=e.sibling;else eu(e)}function wp(e){if(In!==null&&In.size!==0){var t=In;if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var n=e.memoizedProps,i=n.name;if(i!=null&&i!=="auto"){var s=t.get(i);if(s!==void 0){var a=us(n.default,n.share);if(a!=="none"&&(ao(e,i,a,null,!1)?(a=e.stateNode,s.paired=a,a.paired=s,Zr(e,n.onShare)):zi(e.child,!1)),t.delete(i),t.size===0)break}}}wp(e)}e=e.sibling}}}function Cp(e){if(e.tag===30){var t=e.memoizedProps,n=ss(t,e.stateNode),i=In!==null?In.get(n):void 0,s=us(t.default,i!==void 0?t.share:t.exit);s!=="none"&&(ao(e,n,s,null,!1)?i!==void 0?(s=e.stateNode,i.paired=s,s.paired=i,In.delete(n),Zr(e,t.onShare)):Zr(e,t.onExit):zi(e.child,!1)),In!==null&&wp(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Cp(e),e=e.sibling;else In!==null&&wp(e)}function Cx(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=ss(t,e.stateNode);t=us(t.default,t.update),e.flags&=-5,t!=="none"&&ao(e,n,t,e.memoizedState=[],!1)}else(e.subtreeFlags&33554432)!==0&&Cx(e);e=e.sibling}}function Rp(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var t=e.stateNode;t.paired!==null&&(t.paired=null,zi(e.child,!1))}Rp(e)}e=e.sibling}}function nu(e){if(e.tag===30)e.stateNode.paired=null,zi(e.child,!1),Rp(e);else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)nu(e),e=e.sibling;else Rp(e)}function Rx(e){for(e=e.child;e!==null;)e.tag===30?zi(e.child,!1):(e.subtreeFlags&33554432)!==0&&Rx(e),e=e.sibling}function Pm(e,t,n,i,s,a,r){for(var o=!1;t!==null;){if(t.tag===5){var l=t.stateNode;if(a!==null&&Mn<a.length){var c=a[Mn],f=Wp(l);(c.view||f.view)&&(o=!0);var d;if(d=(e.flags&4)===0)if(f.clip)d=!0;else{d=c.rect;var h=f.rect;d=d.y!==h.y||d.x!==h.x||d.height!==h.height||d.width!==h.width}d&&(e.flags|=4),f.abs?f=!c.abs:(c=c.rect,f=f.rect,f=c.height!==f.height||c.width!==f.width),f&&(e.flags|=32)}else e.flags|=32;(e.flags&4)!==0&&hS(l,Mn===0?n:n+"_"+Mn,s),o&&(e.flags&4)!==0||(Di===null&&(Di=[]),Di.push(l,Mn===0?i:i+"_"+Mn,t.memoizedProps)),Mn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&r?e.flags|=t.flags&32:Pm(e,t.child,n,i,s,a,r)&&(o=!0));t=t.sibling}return o}function Dx(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,i=e.stateNode,s=ss(n,i),a=us(n.default,n.update);if(t){i=i.clones;var r=i===null?null:i.map(EE)}else r=e.memoizedState,e.memoizedState=null;i=e;var o=e.child;Mn=0,s=Pm(i,o,s,s,a,r,!1),(e.flags&4)!==0&&s&&(t||Zr(e,n.onUpdate))}else(e.subtreeFlags&33554432)!==0&&Dx(e,t);e=e.sibling}}var qe=!1,ie=!1,Ai=!1,Nd=!1,tv=typeof WeakSet=="function"?WeakSet:Set,Ye=null,wi=!1,jo=!1,Du=!1,Dp=!1;function KT(e,t,n){if(e=e.containerInfo,Gp=to,e=my(e),lm(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else t:{i=(i=e.ownerDocument)&&i.defaultView||window;var s=i.getSelection&&i.getSelection();if(s&&s.rangeCount!==0){i=s.anchorNode;var a=s.anchorOffset,r=s.focusNode;s=s.focusOffset;try{i.nodeType,r.nodeType}catch{i=null;break t}var o=0,l=-1,c=-1,f=0,d=0,h=e,p=null;e:for(;;){for(var _;h!==i||a!==0&&h.nodeType!==3||(l=o+a),h!==r||s!==0&&h.nodeType!==3||(c=o+s),h.nodeType===3&&(o+=h.nodeValue.length),(_=h.firstChild)!==null;)p=h,h=_;for(;;){if(h===e)break e;if(p===i&&++f===a&&(l=o),p===r&&++d===s&&(c=o),(_=h.nextSibling)!==null)break;h=p,p=h.parentNode}h=_}i=l===-1||c===-1?null:{start:l,end:c}}else i=null}i=i||{start:0,end:0}}else i=null;for(kp={focusedElem:e,selectionRange:i},to=!1,n=(n&335544064)===n,Ye=t,t=n?9270:1024;Ye!==null;){if(e=Ye,n&&(i=e.deletions,i!==null))for(a=0;a<i.length;a++)n&&Cp(i[a]);if(e.alternate===null&&(e.flags&2)!==0)n&&j_(e),Bc(n);else{if(e.tag===22){if(i=e.alternate,e.memoizedState!==null){i!==null&&i.memoizedState===null&&n&&Cp(i),Bc(n);continue}else if(i!==null&&i.memoizedState!==null){n&&j_(e),Bc(n);continue}}i=e.child,(e.subtreeFlags&t)!==0&&i!==null?(i.return=e,Ye=i):(n&&Cx(e),Bc(n))}}In=null}function Bc(e){for(;Ye!==null;){var t=Ye,n=e,i=t.alternate,s=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if((s&1024)!==0&&i!==null){n=void 0,s=i.memoizedProps,i=i.memoizedState;var a=t.stateNode;try{var r=Pa(t.type,s);n=a.getSnapshotBeforeUpdate(r,i),a.__reactInternalSnapshotBeforeUpdate=n}catch(o){re(t,t.return,o)}}break;case 3:if((s&1024)!==0){if(i=t.stateNode.containerInfo,n=i.nodeType,n===9)qp(i);else if(n===1)switch(i.nodeName){case"HEAD":case"HTML":case"BODY":qp(i);break;default:i.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&i!==null&&(n=ss(i.memoizedProps,i.stateNode),s=t.memoizedProps,s=us(s.default,s.update),s!=="none"&&ao(i,n,s,i.memoizedState=[],!0));break;default:if((s&1024)!==0)throw Error(k(163))}if(i=t.sibling,i!==null){i.return=t.return,Ye=i;break}Ye=t.return}}function Ux(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:Ci(e,n),i&4&&Pl(5,n);break;case 1:if(Ci(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){re(n,n.return,r)}else{var s=Pa(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){re(n,n.return,r)}}i&64&&bx(n),i&512&&Ri(n,n.return);break;case 3:if(Ci(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ly(e,t)}catch(r){re(n,n.return,r)}}break;case 27:t===null&&i&4&&Ax(n);case 26:case 5:Ci(e,n),t===null&&i&4&&Tp(n),i&512&&Ri(n,n.return);break;case 12:Ci(e,n);break;case 31:Ci(e,n),i&4&&Ix(e,n);break;case 13:Ci(e,n),i&4&&Px(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=lE.bind(null,n),VE(e,n))));break;case 22:if(i=n.memoizedState!==null||qe,!i){var a=t!==null&&t.memoizedState!==null||ie;t=qe,s=ie,qe=i,(ie=a)&&!s?(i=2,(n.subtreeFlags&8772)!==0&&(i|=1),di(e,n,i)):Ci(e,n),qe=t,ie=s}break;case 30:Ci(e,n),i&512&&Ri(n,n.return);break;case 7:i&512&&Ri(n,n.return);default:Ci(e,n)}}function Up(e,t){for(e=e.child;e!==null;)Nx(e,t),e=e.sibling}function Nx(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var i=n.style;typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"}else{var s=e.stateNode,a=e.memoizedProps.style,r=a!=null&&a.hasOwnProperty("display")?a.display:null;s.style.display=r==null||typeof r=="boolean"?"":(""+r).trim()}}catch(l){re(e,e.return,l)}Np(e,t);break;case 6:try{e.stateNode.nodeValue=t?"":e.memoizedProps,Kt=!0}catch(l){re(e,e.return,l)}break;case 18:try{var o=e.stateNode;t?gv(o,!0):gv(e.stateNode,!1)}catch(l){re(e,e.return,l)}break;case 22:case 23:e.memoizedState===null&&Up(e,t);break;default:Up(e,t)}}function Np(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){t:{var n=e,i=t;switch(n.tag){case 4:Nx(n,i);break t;case 22:n.memoizedState===null&&Np(n,i);break t;default:Np(n,i)}}e=e.sibling}}function Lx(e){var t=e.alternate;t!==null&&(e.alternate=null,Lx(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Hu(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ee=null,xn=!1;function fi(e,t,n){for(n=n.child;n!==null;)Ox(e,t,n),n=n.sibling}function Ox(e,t,n){if(Bn&&typeof Bn.onCommitFiberUnmount=="function")try{Bn.onCommitFiberUnmount(Rl,n)}catch{}switch(n.tag){case 26:ie||Qe(n,t),fi(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!ie&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:ie||Qe(n,t),ll(n);var i=Ee,s=xn;ta(n.type)&&(Ee=n.stateNode,xn=!1),fi(e,t,n),SS(n.stateNode,n.type,n.memoizedProps),Ee=i,xn=s;break;case 5:ie||Qe(n,t),ll(n);case 6:if(n.tag===6&&ll(n),i=Ee,s=xn,Ee=null,fi(e,t,n),Ee=i,xn=s,Ee!==null)if(xn)try{(Ee.nodeType===9?Ee.body:Ee.nodeName==="HTML"?Ee.ownerDocument.body:Ee).removeChild(n.stateNode),Kt=!0}catch(a){re(n,t,a)}else try{Ee.removeChild(n.stateNode),Kt=!0}catch(a){re(n,t,a)}break;case 18:Ee!==null&&(xn?(e=Ee,mv(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),eo(e)):mv(Ee,n.stateNode));break;case 4:i=Ee,s=xn,Ee=n.stateNode.containerInfo,xn=!0,fi(e,t,n),Ee=i,xn=s;break;case 0:case 11:case 14:case 15:Qs(2,n,t),ie||Qs(4,n,t),fi(e,t,n);break;case 1:ie||(Qe(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&Tx(n,t,i)),fi(e,t,n);break;case 21:fi(e,t,n);break;case 22:ie=(i=ie)||n.memoizedState!==null,fi(e,t,n),ie=i;break;case 30:Qe(n,t),fi(e,t,n);break;case 7:ie||Qe(n,t),fi(e,t,n);break;default:fi(e,t,n)}}function Ix(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{eo(e)}catch(n){re(t,t.return,n)}}}function Px(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{eo(e)}catch(n){re(t,t.return,n)}}function QT(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new tv),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new tv),t;default:throw Error(k(435,e.tag))}}function Fc(e,t){var n=QT(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var s=cE.bind(null,e,i);i.then(s,s)}})}function pn(e,t,n){var i=t.deletions;if(i!==null)for(var s=0;s<i.length;s++){var a=i[s],r=e,o=t,l=o;t:for(;l!==null;){switch(l.tag){case 27:if(ta(l.type)){Ee=l.stateNode,xn=!1;break t}break;case 5:Ee=l.stateNode,xn=!1;break t;case 3:case 4:Ee=l.stateNode.containerInfo,xn=!0;break t}l=l.return}if(Ee===null)throw Error(k(160));Ox(r,o,a),Ee=null,xn=!1,r=a.alternate,r!==null&&(r.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)zx(t,e,n),t=t.sibling}var pi=null;function zx(e,t,n){var i=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(s&4&&(i=e.updateQueue,i=i!==null?i.events:null,i!==null))for(var a=0;a<i.length;a++){var r=i[a];r.ref.impl=r.nextImpl}pn(t,e,n),mn(e),s&4&&(Qs(3,e,e.return),Pl(3,e),Qs(5,e,e.return));break;case 1:pn(t,e,n),mn(e),s&512&&(ie||i===null||Qe(i,i.return)),s&64&&qe&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(a=pi,pn(t,e,n),mn(e),s&512&&(ie||i===null||Qe(i,i.return)),s&4)if(s=i!==null?i.memoizedState:null,n=e.memoizedState,i===null)if(n===null)if(e.stateNode===null)if(qe)e.stateNode=uS(e.type,e.memoizedProps,t.containerInfo,e);else{t:{t=e.type,n=e.memoizedProps,s=a.ownerDocument||a;e:switch(t){case"title":i=s.getElementsByTagName("title")[0],(!i||i[Nl]||i[je]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=s.createElement(t),s.head.insertBefore(i,s.querySelector("head > title"))),nn(i,t,n),i[je]=e,Ze(i),t=i;break t;case"link":if(a=Tv("link","href",s).get(t+(n.href||""))){for(r=0;r<a.length;r++)if(i=a[r],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){a.splice(r,1);break e}}i=s.createElement(t),nn(i,t,n),s.head.appendChild(i);break;case"meta":if(a=Tv("meta","content",s).get(t+(n.content||""))){for(r=0;r<a.length;r++)if(i=a[r],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){a.splice(r,1);break e}}i=s.createElement(t),nn(i,t,n),s.head.appendChild(i);break;default:throw Error(k(468,t))}i[je]=e,Ze(i),t=i}e.stateNode=t}else qe||Jp(a,e.type,e.stateNode);else e.stateNode=bv(a,n,e.memoizedProps);else s!==n?(s===null?(t=i.stateNode,t===null||ie||t.parentNode.removeChild(t)):s.count--,n===null?qe||Jp(a,e.type,e.stateNode):bv(a,n,e.memoizedProps)):n===null&&e.stateNode!==null&&Dd(e,e.memoizedProps,i.memoizedProps);break;case 27:pn(t,e,n),mn(e),s&512&&(ie||i===null||Qe(i,i.return)),i!==null&&s&4&&Dd(e,e.memoizedProps,i.memoizedProps);break;case 5:if(a=Ai,Ai=!1,pn(t,e,n),Ai=a,mn(e),s&512&&(ie||i===null||Qe(i,i.return)),e.flags&32){t=e.stateNode;try{Wr(t,""),Kt=!0}catch(f){re(e,e.return,f)}}s&4&&e.stateNode!=null&&(t=e.memoizedProps,Dd(e,t,i!==null?i.memoizedProps:t)),s&1024&&(Nd=!0);break;case 6:if(pn(t,e,n),mn(e),s&4){if(e.stateNode===null)throw Error(k(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,Kt=!0}catch(f){re(e,e.return,f)}}break;case 3:if(Kt=!1,ru=null,a=pi,pi=Tl(t.containerInfo),pn(t,e,n),pi=a,mn(e),s&4&&i!==null&&i.memoizedState.isDehydrated)try{eo(t.containerInfo)}catch(f){re(e,e.return,f)}Nd&&(Nd=!1,Bx(e)),Kt=!1;break;case 4:s=Ai,Ai=qe,i=r_(),a=pi,pi=Tl(e.stateNode.containerInfo),pn(t,e,n),mn(e),pi=a,Kt&&jo&&(Du=!0),Kt=i,Ai=s;break;case 12:pn(t,e,n),mn(e);break;case 31:pn(t,e,n),mn(e),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Fc(e,t)));break;case 13:pn(t,e,n),mn(e),e.child.flags&8192&&e.memoizedState!==null!=(i!==null&&i.memoizedState!==null)&&($u=zn()),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Fc(e,t)));break;case 22:a=e.memoizedState!==null,r=i!==null&&i.memoizedState!==null;var o=qe,l=ie,c=Ai;qe=o||a,Ai=c||a,ie=l||r,pn(t,e,n),ie=l,Ai=c,qe=o,mn(e),s&8192&&(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,!a||i===null||r||qe||ie||(t=r||ie,n=qe,i=ie,qe=a||qe,ie=t,Cs(e,2),qe=n,ie=i),!a&&Ai||Up(e,a)),s&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Fc(e,n))));break;case 19:pn(t,e,n),mn(e),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Fc(e,t)));break;case 30:s&512&&(ie||i===null||Qe(i,i.return)),s=r_(),a=jo,r=(n&335544064)===n,o=e.memoizedProps,jo=r&&us(o.default,o.update)!=="none",pn(t,e,n),mn(e),r&&i!==null&&Kt&&(e.flags|=4),jo=a,Kt=s;break;case 21:break;case 7:s&512&&(ie||i===null||Qe(i,i.return)),i&&i.stateNode!==null&&(i.stateNode._fragmentFiber=e);default:pn(t,e,n),mn(e)}}function mn(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(Ex(i)){n=i;break}i=i.return}i=null;for(var s=e.return;s!==null;){if(Im(s)){var a=s.stateNode;i===null?i=[a]:i.push(a)}if(Om(s))break;s=s.return}var r=i;if(n==null)throw Error(k(160));switch(n.tag){case 27:var o=n.stateNode,l=Ud(e);Cu(e,l,o,r);break;case 5:var c=n.stateNode;n.flags&32&&(Wr(c,""),n.flags&=-33);var f=Ud(e);Cu(e,f,c,r);break;case 3:case 4:var d=n.stateNode.containerInfo,h=Ud(e);Ep(e,h,d,r);break;default:throw Error(k(161))}}catch(p){re(e,e.return,p)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Bx(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Bx(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,to=!0,t.reset(),to=!1),e=e.sibling}}function _r(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Fx(t,e),t=t.sibling;else Dx(t,!1)}function Fx(e,t){var n=e.alternate;if(n===null)Ap(e,!1);else switch(e.tag){case 3:if(Dp=wi=!1,$_(),_r(t,e),!wi&&!Du){if(e=Di,e!==null)for(var i=0;i<e.length;i+=3){n=e[i];var s=e[i+1];fS(n,e[i+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+s+")"})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===""&&(e.style.viewTransitionName="none",e.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),Dp=!0}Di=null;break;case 5:_r(t,e);break;case 4:i=wi,wi=!1,_r(t,e),wi&&(Du=!0),wi=i;break;case 22:e.memoizedState===null&&(n.memoizedState!==null?Ap(e,!1):_r(t,e));break;case 30:i=wi,s=$_(),wi=!1,_r(t,e),wi&&(e.flags|=4);var a=e.memoizedProps,r=e.stateNode;t=ss(a,r),r=ss(n.memoizedProps,r);var o=us(a.default,a.update);o==="none"?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Mn=0,t=Pm(e,n,t,r,o,a,!0),Mn!==(a===null?0:a.length)&&(e.flags|=32)),(e.flags&4)!==0&&t?(Zr(e,e.memoizedProps.onUpdate),Di=s):s!==null&&(s.push.apply(s,Di),Di=s),wi=(e.flags&32)!==0?!0:i;break;default:_r(t,e)}}function Ci(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Ux(e,t.alternate,t),t=t.sibling}function Cs(e,t){for(e=e.child;e!==null;){var n=e,i=t;switch(n.tag){case 0:case 11:case 14:case 15:Qs(4,n,n.return),Cs(n,i);break;case 1:Qe(n,n.return);var s=n.stateNode;typeof s.componentWillUnmount=="function"&&Tx(n,n.return,s),Cs(n,i);break;case 27:(i&2)!==0&&SS(n.stateNode,n.type,n.memoizedProps);case 5:Qe(n,n.return),n.tag!==5&&n.tag!==27||ll(n),Cs(n,i);break;case 6:ll(n);break;case 26:Qe(n,n.return),s=n.stateNode,n.memoizedState!==null||s===null||ie||s.parentNode.removeChild(s),Cs(n,i);break;case 22:n.memoizedState===null&&Cs(n,i);break;case 30:Qe(n,n.return),Cs(n,i);break;case 7:Qe(n,n.return);default:Cs(n,i)}e=e.sibling}}function di(e,t,n){for(n=(t.subtreeFlags&8772)!==0?n:n&-2,t=t.child;t!==null;){var i=t.alternate,s=e,a=t,r=a.flags,o=(n&1)!==0;switch(a.tag){case 0:case 11:case 15:di(s,a,n),Pl(4,a);break;case 1:if(di(s,a,n),i=a,s=i.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(f){re(i,i.return,f)}if(i=a,s=i.updateQueue,s!==null){var l=i.stateNode;try{var c=s.shared.hiddenCallbacks;if(c!==null)for(s.shared.hiddenCallbacks=null,s=0;s<c.length;s++)Ny(c[s],l)}catch(f){re(i,i.return,f)}}o&&r&64&&bx(a),Ri(a,a.return);break;case 27:(n&2)!==0&&Ax(a);case 5:a.tag!==5&&a.tag!==27||Q_(a),di(s,a,n),o&&i===null&&r&4&&Tp(a),Ri(a,a.return);break;case 6:Q_(a);break;case 26:l=a.stateNode,a.memoizedState!==null||l===null||qe||Jp(Tl(l.ownerDocument),a.type,l),di(s,a,n),o&&i===null&&r&4&&Tp(a),Ri(a,a.return);break;case 12:di(s,a,n);break;case 31:di(s,a,n),o&&r&4&&Ix(s,a);break;case 13:di(s,a,n),o&&r&4&&Px(s,a);break;case 22:a.memoizedState===null&&di(s,a,n),Ri(a,a.return);break;case 30:di(s,a,n),Ri(a,a.return);break;case 7:Ri(a,a.return);default:di(s,a,n)}t=t.sibling}}function zm(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Ol(n))}function Bm(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ol(e))}function $n(e,t,n,i){var s=(n&335544064)===n;if(t.subtreeFlags&(s?10262:10256))for(t=t.child;t!==null;)Hx(e,t,n,i),t=t.sibling;else s&&Rx(t)}function Hx(e,t,n,i){var s=(n&335544064)===n;s&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&nu(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:$n(e,t,n,i),a&2048&&Pl(9,t);break;case 1:$n(e,t,n,i);break;case 3:$n(e,t,n,i),s&&Dp&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,e.style.viewTransitionName==="root"&&(e.style.viewTransitionName=""),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName==="none"&&(e.style.viewTransitionName="")),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Ol(a)));break;case 12:if(a&2048){$n(e,t,n,i),a=t.stateNode;try{var r=t.memoizedProps,o=r.id,l=r.onPostCommit;typeof l=="function"&&l(o,t.alternate===null?"mount":"update",a.passiveEffectDuration,-0)}catch(c){re(t,t.return,c)}}else $n(e,t,n,i);break;case 31:$n(e,t,n,i);break;case 13:$n(e,t,n,i);break;case 23:break;case 22:r=t.stateNode,o=t.alternate,t.memoizedState!==null?(s&&o!==null&&o.memoizedState===null&&nu(o),r._visibility&2?$n(e,t,n,i):cl(e,t)):(s&&o!==null&&o.memoizedState!==null&&nu(t),r._visibility&2?$n(e,t,n,i):(r._visibility|=2,yr(e,t,n,i,(t.subtreeFlags&10256)!==0||!1))),a&2048&&zm(o,t);break;case 24:$n(e,t,n,i),a&2048&&Bm(t.alternate,t);break;case 30:s&&(a=t.alternate,a!==null&&(zi(a.child,!0),zi(t.child,!0))),$n(e,t,n,i);break;default:$n(e,t,n,i)}}function yr(e,t,n,i,s){for(s=s&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var a=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:yr(a,r,o,l,s),Pl(8,r);break;case 23:break;case 22:var f=r.stateNode;r.memoizedState!==null?f._visibility&2?yr(a,r,o,l,s):cl(a,r):(f._visibility|=2,yr(a,r,o,l,s)),s&&c&2048&&zm(r.alternate,r);break;case 24:yr(a,r,o,l,s),s&&c&2048&&Bm(r.alternate,r);break;default:yr(a,r,o,l,s)}t=t.sibling}}function cl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,s=i.flags;switch(i.tag){case 22:cl(n,i),s&2048&&zm(i.alternate,i);break;case 24:cl(n,i),s&2048&&Bm(i.alternate,i);break;default:cl(n,i)}t=t.sibling}}var Ma=8192;function ya(e,t,n){if(e.subtreeFlags&Ma)for(e=e.child;e!==null;)Vx(e,t,n),e=e.sibling}function Vx(e,t,n){switch(e.tag){case 26:ya(e,t,n),e.flags&Ma&&(e.memoizedState!==null?eA(n,pi,e.memoizedState,e.memoizedProps):(e=e.stateNode,(t&335544128)===t&&Av(n,e)));break;case 5:ya(e,t,n),e.flags&Ma&&(e=e.stateNode,(t&335544128)===t&&Av(n,e));break;case 3:case 4:var i=pi;pi=Tl(e.stateNode.containerInfo),ya(e,t,n),pi=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Ma,Ma=16777216,ya(e,t,n),Ma=i):ya(e,t,n));break;case 30:if((e.flags&Ma)!==0&&(i=e.memoizedProps.name,i!=null&&i!=="auto")){var s=e.stateNode;s.paired=null,In===null&&(In=new Map),In.set(i,s)}ya(e,t,n);break;default:ya(e,t,n)}}function Gx(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Wo(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];Ye=i,Xx(i,e)}Gx(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)kx(e),e=e.sibling}function kx(e){switch(e.tag){case 0:case 11:case 15:Wo(e),e.flags&2048&&Qs(9,e,e.return);break;case 3:Wo(e);break;case 12:Wo(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,iu(e)):Wo(e);break;default:Wo(e)}}function iu(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];Ye=i,Xx(i,e)}Gx(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Qs(8,t,t.return),iu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,iu(t));break;default:iu(t)}e=e.sibling}}function Xx(e,t){for(;Ye!==null;){var n=Ye;switch(n.tag){case 0:case 11:case 15:Qs(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Ol(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,Ye=i;else t:for(n=e;Ye!==null;){i=Ye;var s=i.sibling,a=i.return;if(Lx(i),i===n){Ye=null;break t}if(s!==null){s.return=a,Ye=s;break t}Ye=a}}}var jT={getCacheForType:function(e){var t=$e(Pe),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return $e(Pe).controller.signal}},$T=typeof WeakMap=="function"?WeakMap:Map,Qt=0,he=null,kt=null,Wt=0,se=0,Nn=null,Is=!1,ro=!1,Fm=!1,ls=0,Ue=0,js=0,Ra=0,Uu=0,Pn=0,Yr=0,ul=null,Sn=null,Lp=!1,$u=0,Wx=0,Nu=1/0,Lu=null,Xs=null,Ce=0,gi=null,za=null,Pi=0,Op=0,Ip=null,qx=null,Hr=null,Vr=null,Gr=null,hl=0,su=null;function Hn(){return(Qt&2)!==0&&Wt!==0?Wt&-Wt:Ct.T!==null?Vm():Kv()}function Yx(){if(Pn===0)if((Wt&536870912)===0||Ht){var e=Ac;Ac<<=1,(Ac&3932160)===0&&(Ac=262144),Pn=e}else Pn=536870912;return e=sn.current,e!==null&&(e.flags|=32),Pn}function Zr(e,t){if(t!=null){var n=e.stateNode,i=n.ref;i===null&&(i=n.ref=pS(ss(e.memoizedProps,n))),Vr===null&&(Vr=[]),Vr.push(t.bind(null,i))}}function Tn(e,t,n){(e===he&&(se===2||se===9)||e.cancelPendingCommit!==null)&&(Jr(e,0),Ps(e,Wt,Pn,!1)),Ul(e,n),((Qt&2)===0||e!==he)&&(e===he&&((Qt&2)===0&&(Ra|=n),Ue===4&&Ps(e,Wt,Pn,!1)),Fi(e))}function Zx(e,t,n){if((Qt&6)!==0)throw Error(k(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||Dl(e,t),s=i?nE(e,t):Ld(e,t,!0),a=i;do{if(s===0){ro&&!i&&Ps(e,t,0,!1);break}else{if(n=e.current.alternate,a&&!tE(n)){s=Ld(e,t,!1),a=!1;continue}if(s===2){if(a=t,e.errorRecoveryDisabledLanes&a)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;s=ul;var l=o.current.memoizedState.isDehydrated;if(l&&(Jr(o,r).flags|=256),r=Ld(o,r,!1),r!==2&&r!==6){if(Fm&&!l){o.errorRecoveryDisabledLanes|=a,Ra|=a,s=4;break t}a=Sn,Sn=s,a!==null&&(Sn===null?Sn=a:Sn.push.apply(Sn,a))}s=r}if(a=!1,s!==2)continue}}if(s===1){Jr(e,0),Ps(e,t,0,!0);break}t:{switch(i=e,a=s,a){case 0:case 1:throw Error(k(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Ps(i,t,Pn,!Is);break t;case 2:Sn=null;break;case 3:case 5:break;default:throw Error(k(329))}if((t&62914560)===t&&(s=$u+300-zn(),10<s)){if(Ps(i,t,Pn,!Is),Fu(i,0,!0)!==0)break t;Pi=t,i.timeoutHandle=km(ev.bind(null,i,n,Sn,Lu,Lp,t,Pn,Ra,Yr,Is,a,"Throttled",-0,0),s);break t}ev(i,n,Sn,Lu,Lp,t,Pn,Ra,Yr,Is,a,null,-0,0)}}break}while(!0);Fi(e)}function ev(e,t,n,i,s,a,r,o,l,c,f,d,h,p){e.timeoutHandle=-1;var _=t.subtreeFlags,S=(a&335544064)===a;if(d=null,(S||_&8192||(_&16785408)===16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ni},In=null,Vx(t,a,d),S&&(_=d,S=e.containerInfo,S=(S.nodeType===9?S:S.ownerDocument).__reactViewTransition,S!=null&&(_.count++,_.waitingForViewTransition=!0,_=El.bind(_),S.finished.then(_,_))),_=(a&62914560)===a?$u-zn():(a&4194048)===a?Wx-zn():0,_=nA(d,_),_!==null)){Pi=a,e.cancelPendingCommit=_(iv.bind(null,e,t,a,n,i,s,r,o,l,c,f,d,null,h,p)),Ps(e,a,r,!c);return}iv(e,t,a,n,i,s,r,o,l,c,f,d)}function tE(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var s=n[i],a=s.getSnapshot;s=s.value;try{if(!Vn(a(),s))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ps(e,t,n,i){t=Wv(e,t),t&=~Uu,t&=~Ra,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var s=t;0<s;){var a=31-Fn(s),r=1<<a;i[a]=-1,s&=~r}n!==0&&Yv(e,n,t)}function th(){return(Qt&6)===0?(zl(0,!1),!1):!0}function Hm(){if(kt!==null){if(se===0)var e=kt.return;else e=kt,ts=Ga=null,bm(e),zr=null,vl=0,e=kt;for(;e!==null;)Mx(e.alternate,e),e=e.return;kt=null}}function Jr(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,ME(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Pi=0,Hm(),he=e,kt=n=es(e.current,null),Wt=t,se=0,Nn=null,Is=!1,ro=Dl(e,t),Fm=!1,Yr=Pn=Uu=Ra=js=Ue=0,Sn=ul=null,Lp=!1,ls=Wv(e,t),Xu(),n}function Jx(e,t){It=null,Ct.H=Eu,t===so||t===Yu?(t=C_(),se=3):t===mm?(t=C_(),se=4):se=t===Um?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Nn=t,kt===null&&(Ue=1,Au(e,si(t,e.current)))}function Kx(){var e=sn.current;return e===null?!0:(Wt&4194048)===Wt?ln===null:(Wt&62914560)===Wt||(Wt&536870912)!==0?e===ln:!1}function Qx(){var e=Ct.H;return Ct.H=Eu,e===null?Eu:e}function jx(){var e=Ct.A;return Ct.A=jT,e}function Ou(){Ue=4,Is||(Wt&4194048)!==Wt&&sn.current!==null||(ro=!0),(js&134217727)===0&&(Ra&134217727)===0||he===null||Ps(he,Wt,Pn,!1)}function Ld(e,t,n){var i=Qt;Qt|=2;var s=Qx(),a=jx();(he!==e||Wt!==t)&&(Lu=null,Jr(e,t)),t=!1;var r=Ue;t:do try{if(se!==0&&kt!==null){var o=kt,l=Nn;switch(se){case 8:Hm(),r=6;break t;case 3:case 2:case 9:case 6:sn.current===null&&(t=!0);var c=se;if(se=0,Nn=null,Nr(e,o,l,c),n&&ro){r=0;break t}break;default:c=se,se=0,Nn=null,Nr(e,o,l,c)}}eE(),r=Ue;break}catch(f){Jx(e,f)}while(!0);return t&&e.shellSuspendCounter++,ts=Ga=null,Qt=i,Ct.H=s,Ct.A=a,kt===null&&(he=null,Wt=0,Xu()),r}function eE(){for(;kt!==null;)$x(kt)}function nE(e,t){var n=Qt;Qt|=2;var i=Qx(),s=jx();he!==e||Wt!==t?(Lu=null,Nu=zn()+500,Jr(e,t)):ro=Dl(e,t);t:do try{if(se!==0&&kt!==null){t=kt;var a=Nn;e:switch(se){case 1:se=0,Nn=null,Nr(e,t,a,1);break;case 2:case 9:if(w_(a)){se=0,Nn=null,nv(t);break}t=function(){se!==2&&se!==9||he!==e||(se=7),Fi(e)},a.then(t,t);break t;case 3:se=7;break t;case 4:se=5;break t;case 7:w_(a)?(se=0,Nn=null,nv(t)):(se=0,Nn=null,Nr(e,t,a,7));break;case 5:var r=null;switch(kt.tag){case 26:r=kt.memoizedState;case 5:case 27:var o=kt;if(r?TS(r):o.stateNode.complete){se=0,Nn=null;var l=o.sibling;if(l!==null)kt=l;else{var c=o.return;c!==null?(kt=c,eh(c)):kt=null}break e}}se=0,Nn=null,Nr(e,t,a,5);break;case 6:se=0,Nn=null,Nr(e,t,a,6);break;case 8:Hm(),Ue=6;break t;default:throw Error(k(462))}}iE();break}catch(f){Jx(e,f)}while(!0);return ts=Ga=null,Ct.H=i,Ct.A=s,Qt=n,kt!==null?0:(he=null,Wt=0,Xu(),Ue)}function iE(){for(;kt!==null&&!x1();)$x(kt)}function $x(e){var t=Sx(e.alternate,e,ls);e.memoizedProps=e.pendingProps,t===null?eh(e):kt=t}function nv(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=X_(n,t,t.pendingProps,t.type,void 0,Wt);break;case 11:t=X_(n,t,t.pendingProps,t.type.render,t.ref,Wt);break;case 5:bm(t);var i=t;i===Je&&(Ht?(vu(i),i.tag===5&&i.stateNode!=null&&(_e=i.stateNode)):(vu(i),Ht=!0));default:Mx(n,t),t=kt=by(t,ls),t=Sx(n,t,ls)}e.memoizedProps=e.pendingProps,t===null?eh(e):kt=t}function Nr(e,t,n,i){ts=Ga=null,bm(t),zr=null,vl=0;var s=t.return;try{if(XT(e,s,t,n,Wt)){Ue=1,Au(e,si(n,e.current)),kt=null;return}}catch(a){if(s!==null)throw kt=s,a;Ue=1,Au(e,si(n,e.current)),kt=null;return}t.flags&32768?(Ht||i===1?e=!0:ro||(Wt&536870912)!==0?e=!1:(Is=e=!0,(i===2||i===9||i===3||i===6)&&(i=sn.current,i!==null&&i.tag===13&&(i.flags|=16384))),tS(t,e)):eh(t)}function eh(e){var t=e;do{if((t.flags&32768)!==0){tS(t,Is);return}e=t.return;var n=ZT(t.alternate,t,ls);if(n!==null){kt=n;return}if(t=t.sibling,t!==null){kt=t;return}kt=t=e}while(t!==null);Ue===0&&(Ue=5)}function tS(e,t){do{var n=JT(e.alternate,e);if(n!==null){n.flags&=32767,kt=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){kt=e;return}kt=e=n}while(e!==null);Ue=6,kt=null}function iv(e,t,n,i,s,a,r,o,l,c,f,d){e.cancelPendingCommit=null;do nh();while(Ce!==0);if((Qt&6)!==0)throw Error(k(327));if(t!==null){if(t===e.current)throw Error(k(177));e===he&&(kt=he=null,Wt=0),za=t,gi=e,Pi=n,Ip=s,qx=i,sE(e,t,n,r,o,l,d)}}function sE(e,t,n,i,s,a,r){var o=t.lanes|t.childLanes;if(Op=o,o|=cm,D1(e,n,o,i,s,a),Vr=null,(n&335544064)===n?(Gr=NT(e),i=10262):(Gr=null,i=10256),(t.subtreeFlags&i)!==0||(t.flags&i)!==0?(e.callbackNode=null,e.callbackPriority=0,uE(du,function(){return Fp(),null})):(e.callbackNode=null,e.callbackPriority=0),Ru=!1,i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=Ct.T,Ct.T=null,s=jt.p,jt.p=2,a=Qt,Qt|=4;try{KT(e,t,n)}finally{Qt=a,jt.p=s,Ct.T=i}}Ce=1,Ru?Hr=CE(r,e.containerInfo,Gr,Pp,zp,rE,Bp,Fp,aE,null,null):(Pp(),zp(),Bp())}function aE(e){if(Ce!==0){var t=gi.onRecoverableError;t(e,{componentStack:null})}}function rE(){Ce===3&&(Ce=0,Fx(za,gi),Ce=4)}function Pp(){if(Ce===1){Ce=0;var e=gi,t=za,n=Pi,i=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||i){i=Ct.T,Ct.T=null;var s=jt.p;jt.p=2;var a=Qt;Qt|=4;try{jo=Du=!1,zx(t,e,n),n=kp;var r=my(e.containerInfo),o=n.focusedElem,l=n.selectionRange;if(r!==o&&o&&o.ownerDocument&&py(o.ownerDocument.documentElement,o)){if(l!==null&&lm(o)){var c=l.start,f=l.end;if(f===void 0&&(f=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(f,o.value.length);else{var d=o.ownerDocument||document,h=d&&d.defaultView||window;if(h.getSelection){var p=h.getSelection(),_=o.textContent.length,S=Math.min(l.start,_),m=l.end===void 0?S:Math.min(l.end,_);!p.extend&&S>m&&(r=m,m=S,S=r);var u=y_(o,S),g=y_(o,m);if(u&&g&&(p.rangeCount!==1||p.anchorNode!==u.node||p.anchorOffset!==u.offset||p.focusNode!==g.node||p.focusOffset!==g.offset)){var v=d.createRange();v.setStart(u.node,u.offset),p.removeAllRanges(),S>m?(p.addRange(v),p.extend(g.node,g.offset)):(v.setEnd(g.node,g.offset),p.addRange(v))}}}}for(d=[],p=o;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<d.length;o++){var y=d[o];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}to=!!Gp,kp=Gp=null}finally{Qt=a,jt.p=s,Ct.T=i}}e.current=t,Ce=2}}function zp(){if(Ce===2){Ce=0;var e=gi,t=za,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=Ct.T,Ct.T=null;var i=jt.p;jt.p=2;var s=Qt;Qt|=4;try{Ux(e,t.alternate,t)}finally{Qt=s,jt.p=i,Ct.T=n}}Ce=3}}function Bp(){if(Ce===4||Ce===3){Ce=0;var e=Hr;Hr=null,S1();var t=gi,n=za,i=Pi,s=qx,a=(i&335544064)===i?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?Ce=5:(Ce=0,za=gi=null,eS(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(Xs=null),nm(i),n=n.stateNode,Bn&&typeof Bn.onCommitFiberRoot=="function")try{Bn.onCommitFiberRoot(Rl,n,void 0,(n.current.flags&128)===128)}catch{}if(s!==null){n=Ct.T,a=jt.p,jt.p=2,Ct.T=null;try{for(var r=t.onRecoverableError,o=0;o<s.length;o++){var l=s[o];r(l.value,{componentStack:l.stack})}}finally{Ct.T=n,jt.p=a}}if(s=Vr,r=Gr,Gr=null,s!==null&&(Vr=null,r===null&&(r=[]),e!==null))for(l=0;l<s.length;l++)n=(0,s[l])(r),n!==void 0&&e.finished.finally(n);(Pi&3)!==0&&nh(),Fi(t),a=t.pendingLanes,(i&261930)!==0&&(a&42)!==0?t===su?hl++:(hl=0,su=t):(hl=0,su=null),zl(0,!1)}}function eS(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Ol(t)))}function nh(){return Hr!==null&&(Hr.skipTransition(),Hr=null),Pp(),zp(),Bp(),Fp()}function Fp(){if(Ce!==5)return!1;var e=gi,t=Op;Op=0;var n=nm(Pi),i=Ct.T,s=jt.p;try{jt.p=32>n?32:n,Ct.T=null,n=Ip,Ip=null;var a=gi,r=Pi;if(Ce=0,za=gi=null,Pi=0,(Qt&6)!==0)throw Error(k(331));var o=Qt;if(Qt|=4,kx(a.current),Hx(a,a.current,r,n),Qt=o,zl(0,!1),Bn&&typeof Bn.onPostCommitFiberRoot=="function")try{Bn.onPostCommitFiberRoot(Rl,a)}catch{}return!0}finally{jt.p=s,Ct.T=i,eS(e,t)}}function sv(e,t,n){t=si(n,t),t=vp(e.stateNode,t,2),e=Vs(e,t,2),e!==null&&(Ul(e,2),Fi(e))}function re(e,t,n){if(e.tag===3)sv(e,e,n);else for(;t!==null;){if(t.tag===3){sv(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Xs===null||!Xs.has(i))){e=si(n,e),n=gx(2),i=Vs(t,n,2),i!==null&&(_x(n,i,t,e),Ul(i,2),Fi(i));break}}t=t.return}}function Od(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new $T;var s=new Set;i.set(t,s)}else s=i.get(t),s===void 0&&(s=new Set,i.set(t,s));s.has(n)||(Fm=!0,s.add(n),e=oE.bind(null,e,t,n),t.then(e,e))}function oE(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,he===e&&(Wt&n)===n&&((Ue===4||Ue===3&&(Wt&62914560)===Wt&&300>zn()-$u)&&(Qt&2)===0?Jr(e,0):Uu|=n,Yr===Wt&&(Yr=0)),Fi(e)}function nS(e,t){t===0&&(t=qv()),e=Va(e,t),e!==null&&(Ul(e,t),Fi(e))}function lE(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),nS(e,n)}function cE(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(k(314))}i!==null&&i.delete(t),nS(e,n)}function uE(e,t){return tm(e,t)}var Kr=null,xr=null,Hp=!1,Iu=!1,Id=!1,zs=0;function Fi(e){e!==xr&&e.next===null&&(xr===null?Kr=xr=e:xr=xr.next=e),Iu=!0,Hp||(Hp=!0,fE())}function zl(e,t){if(!Id&&Iu){Id=!0;do for(var n=!1,i=Kr;i!==null;){if(!t)if(e!==0){var s=i.pendingLanes;if(s===0)var a=0;else{var r=i.suspendedLanes,o=i.pingedLanes;a=(1<<31-Fn(42|e)+1)-1,a&=s&~(r&~o),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,av(i,a))}else a=Wt,a=Fu(i,i===he?a:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(a&3)===0||Dl(i,a)||(n=!0,av(i,a));i=i.next}while(n);Id=!1}}function hE(){iS()}function iS(){Iu=Hp=!1;var e=0;zs!==0&&SE()&&(e=zs);for(var t=zn(),n=null,i=Kr;i!==null;){var s=i.next,a=sS(i,t);a===0?(i.next=null,n===null?Kr=s:n.next=s,s===null&&(xr=n)):(n=i,(e!==0||(a&3)!==0)&&(Iu=!0)),i=s}Ce!==0&&Ce!==5||zl(e,!1),zs!==0&&(zs=0)}function sS(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var r=31-Fn(a),o=1<<r,l=s[r];l===-1?((o&n)===0||(o&i)!==0)&&(s[r]=R1(o,t)):l<=t&&(e.expiredLanes|=o),a&=~o}if(t=he,n=Wt,n=Fu(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(se===2||se===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&dd(i),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||Dl(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&dd(i),nm(n)){case 2:case 8:n=kv;break;case 32:n=du;break;case 268435456:n=Xv;break;default:n=du}return i=aS.bind(null,e),n=tm(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&dd(i),e.callbackPriority=2,e.callbackNode=null,2}function aS(e,t){if(Ce!==0&&Ce!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(nh()&&e.callbackNode!==n)return null;var i=Wt;return i=Fu(e,e===he?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(Zx(e,i,t),sS(e,zn()),e.callbackNode!=null&&e.callbackNode===n?aS.bind(null,e):null)}function av(e,t){if(nh())return null;Zx(e,t,!0)}function fE(){bE(function(){(Qt&6)!==0?tm(Gv,hE):iS()})}function Vm(){if(zs===0){var e=La;e===0&&(e=Ec,Ec<<=1,(Ec&261888)===0&&(Ec=256)),zs=e}return zs}function rv(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:qc(e)}function dE(e,t,n,i,s){if(t==="submit"&&n&&n.stateNode===s){var a=rv((s[An]||null).action),r=i.submitter;r&&(t=(t=r[An]||null)?rv(t.formAction):r.getAttribute("formAction"),t!==null&&(a=t,r=null));var o=new Vu("action","action",null,i,s);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(zs!==0){var l=new FormData(s,r);gp(n,{pending:!0,data:l,method:s.method,action:a},null,l)}}else typeof a=="function"&&(o.preventDefault(),l=new FormData(s,r),gp(n,{pending:!0,data:l,method:s.method,action:a},a,l))},currentTarget:s}]})}}for(Hc=0;Hc<ap.length;Hc++)Vc=ap[Hc],ov=Vc.toLowerCase(),lv=Vc[0].toUpperCase()+Vc.slice(1),_i(ov,"on"+lv);var Vc,ov,lv,Hc;_i(_y,"onAnimationEnd");_i(vy,"onAnimationIteration");_i(yy,"onAnimationStart");_i("dblclick","onDoubleClick");_i("focusin","onFocus");_i("focusout","onBlur");_i(TT,"onTransitionRun");_i(ET,"onTransitionStart");_i(AT,"onTransitionCancel");_i(xy,"onTransitionEnd");Xr("onMouseEnter",["mouseout","mouseover"]);Xr("onMouseLeave",["mouseout","mouseover"]);Xr("onPointerEnter",["pointerout","pointerover"]);Xr("onPointerLeave",["pointerout","pointerover"]);Fa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Fa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Fa("onBeforeInput",["compositionend","keypress","textInput","paste"]);Fa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Fa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Fa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Sl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),pE=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Sl));function rS(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],s=i.event;i=i.listeners;t:{var a=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(f){mu(f)}s.currentTarget=null,a=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(f){mu(f)}s.currentTarget=null,a=l}}}}function Gt(e,t){var n=t[n_];n===void 0&&(n=t[n_]=new Set);var i=e+"__bubble";n.has(i)||(oS(t,e,2,!1),n.add(i))}function Pd(e,t,n){var i=0;t&&(i|=4),oS(n,e,i,t)}var Gc="_reactListening"+Math.random().toString(36).slice(2);function Gm(e){if(!e[Gc]){e[Gc]=!0,jv.forEach(function(n){n!=="selectionchange"&&(pE.has(n)||Pd(n,!1,e),Pd(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Gc]||(t[Gc]=!0,Pd("selectionchange",!1,t))}}function oS(e,t,n,i){switch(US(t)){case 2:var s=rA;break;case 8:s=oA;break;default:s=Jm}n=s.bind(null,t,n,e),s=void 0,!ep||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),i?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function zd(e,t,n,i,s){var a=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===s)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===s)return;r=r.return}for(;o!==null;){if(r=ba(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=a=r;continue t}o=o.parentNode}}i=i.return}ry(function(){var c=a,f=sm(n),d=[];t:{var h=Sy.get(e);if(h!==void 0){var p=Vu,_=e;switch(e){case"keypress":if(Zc(n)===0)break t;case"keydown":case"keyup":p=tT;break;case"focusin":_="focus",p=yd;break;case"focusout":_="blur",p=yd;break;case"beforeblur":case"afterblur":p=yd;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=u_;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=G1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=aT;break;case _y:case vy:case yy:p=W1;break;case xy:p=oT;break;case"scroll":case"scrollend":p=H1;break;case"wheel":p=cT;break;case"copy":case"cut":case"paste":p=Y1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=f_;break;case"submit":p=iT;break;case"toggle":case"beforetoggle":p=hT}var S=(t&4)!==0,m=!S&&(e==="scroll"||e==="scrollend"),u=S?h!==null?h+"Capture":null:h;S=[];for(var g=c,v;g!==null;){var y=g;if(v=y.stateNode,y=y.tag,y!==5&&y!==26&&y!==27||v===null||u===null||(y=dl(g,u),y!=null&&S.push(Ml(g,y,v))),m)break;g=g.return}0<S.length&&(h=new p(h,_,null,n,f),d.push({event:h,listeners:S}))}}if((t&7)===0){t:{if(p=e==="mouseover"||e==="pointerover",h=e==="mouseout"||e==="pointerout",p&&n!==tp&&(_=n.relatedTarget||n.fromElement)&&(ba(_)||_[no]))break t;(h||p)&&(_=f.window===f?f:(p=f.ownerDocument)?p.defaultView||p.parentWindow:window,h?(p=n.relatedTarget||n.toElement,h=c,p=p?ba(p):null,p!==null&&(m=Cl(p),S=p.tag,p!==m||S!==5&&S!==27&&S!==6)&&(p=null)):(h=null,p=c),h!==p&&(S=u_,y="onMouseLeave",u="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(S=f_,y="onPointerLeave",u="onPointerEnter",g="pointer"),m=h==null?_:Ko(h),v=p==null?_:Ko(p),_=new S(y,g+"leave",h,n,f),_.target=m,_.relatedTarget=v,y=null,ba(f)===c&&(S=new S(u,g+"enter",p,n,f),S.target=v,S.relatedTarget=m,y=S),m=y,S=h&&p?Gd(h,p,mE):null,h!==null&&cv(d,_,h,S,!1),p!==null&&m!==null&&cv(d,m,p,S,!0)))}t:{if(h=c?Ko(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var A=g_;else if(m_(h))if(fy)A=ST;else{A=yT;var C=vT}else p=h.nodeName,!p||p.toLowerCase()!=="input"||h.type!=="checkbox"&&h.type!=="radio"?c&&im(c.elementType)&&(A=g_):A=xT;if(A&&(A=A(e,c))){hy(d,A,n,f);break t}C&&C(e,h,c)}switch(C=c?Ko(c):window,e){case"focusin":(m_(C)||C.contentEditable==="true")&&(Ar=C,ip=c,el=null);break;case"focusout":el=ip=Ar=null;break;case"mousedown":sp=!0;break;case"contextmenu":case"mouseup":case"dragend":sp=!1,x_(d,n,f);break;case"selectionchange":if(bT)break;case"keydown":case"keyup":x_(d,n,f)}var w;if(om)t:{switch(e){case"compositionstart":var D="onCompositionStart";break t;case"compositionend":D="onCompositionEnd";break t;case"compositionupdate":D="onCompositionUpdate";break t}D=void 0}else Er?cy(e,n)&&(D="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(D="onCompositionStart");D&&(ly&&n.locale!=="ko"&&(Er||D!=="onCompositionStart"?D==="onCompositionEnd"&&Er&&(w=oy()):(Ls=f,am="value"in Ls?Ls.value:Ls.textContent,Er=!0)),C=Pu(c,D),0<C.length&&(D=new h_(D,e,null,n,f),d.push({event:D,listeners:C}),w?D.data=w:(w=uy(n),w!==null&&(D.data=w)))),(w=dT?pT(e,n):mT(e,n))&&(D=Pu(c,"onBeforeInput"),0<D.length&&(C=new h_("onBeforeInput","beforeinput",null,n,f),d.push({event:C,listeners:D}),C.data=w)),dE(d,e,c,n,f)}rS(d,t)})}function Ml(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Pu(e,t){for(var n=t+"Capture",i=[];e!==null;){var s=e,a=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||a===null||(s=dl(e,n),s!=null&&i.unshift(Ml(e,s,a)),s=dl(e,t),s!=null&&i.push(Ml(e,s,a))),e.tag===3)return i;e=e.return}return[]}function mE(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function cv(e,t,n,i,s){for(var a=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,s?(c=dl(n,a),c!=null&&r.unshift(Ml(n,c,l))):s||(c=dl(n,a),c!=null&&r.push(Ml(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var gE=/\r\n?/g,_E=/\u0000|\uFFFD/g;function uv(e){return(typeof e=="string"?e:""+e).replace(gE,`
`).replace(_E,"")}function lS(e,t){return t=uv(t),uv(e)===t}function ae(e,t,n,i,s,a){switch(n){case"children":if(typeof i=="string")t==="body"||t==="textarea"&&i===""||Wr(e,i);else if(typeof i=="number"||typeof i=="bigint")t!=="body"&&Wr(e,""+i);else return;break;case"className":Cc(e,"class",i);break;case"tabIndex":Cc(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Cc(e,n,i);break;case"style":ay(e,i,a);return;case"data":if(t!=="object"){Cc(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=qc(i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof a=="function"&&(n==="formAction"?(t!=="input"&&ae(e,t,"name",s.name,s,null),ae(e,t,"formEncType",s.formEncType,s,null),ae(e,t,"formMethod",s.formMethod,s,null),ae(e,t,"formTarget",s.formTarget,s,null)):(ae(e,t,"encType",s.encType,s,null),ae(e,t,"method",s.method,s,null),ae(e,t,"target",s.target,s,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=qc(i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=Ni);return;case"onScroll":i!=null&&Gt("scroll",e);return;case"onScrollEnd":i!=null&&Gt("scrollend",e);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(k(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(k(60));a?.__html!==n&&(e.innerHTML=n)}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=qc(i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":Gt("beforetoggle",e),Gt("toggle",e),Wc(e,"popover",i);break;case"xlinkActuate":Qi(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Qi(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Qi(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Qi(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Qi(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Qi(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Qi(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Qi(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Qi(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Wc(e,"is",i);break;case"innerText":case"textContent":return;default:if(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")n=B1.get(n)||n,Wc(e,n,i);else return}Kt=!0}function Vp(e,t,n,i,s,a){switch(n){case"style":ay(e,i,a);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(k(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(k(60));a?.__html!==n&&(e.innerHTML=n)}}break;case"children":if(typeof i=="string")Wr(e,i);else if(typeof i=="number"||typeof i=="bigint")Wr(e,""+i);else return;break;case"onScroll":i!=null&&Gt("scroll",e);return;case"onScrollEnd":i!=null&&Gt("scrollend",e);return;case"onClick":i!=null&&(e.onclick=Ni);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!$v.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(s=n.endsWith("Capture"),a=n.slice(2,s?n.length-7:void 0),t=e[An]||null,t=t!=null?t[n]:null,typeof t=="function"&&e.removeEventListener(a,t,s),typeof i=="function")){typeof t!="function"&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(a,i,s);break t}Kt=!0,n in e?e[n]=i:i===!0?e.setAttribute(n,""):Wc(e,n,i)}return}Kt=!0}function nn(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Gt("error",e),Gt("load",e);var i=!1,s=!1,a;for(a in n)if(n.hasOwnProperty(a)){var r=n[a];if(r!=null)switch(a){case"src":i=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(k(137,t));default:ae(e,t,a,r,n,null)}}s&&ae(e,t,"srcSet",n.srcSet,n,null),i&&ae(e,t,"src",n.src,n,null);return;case"input":Gt("invalid",e);var o=a=r=s=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var f=n[i];if(f!=null)switch(i){case"name":s=f;break;case"type":r=f;break;case"checked":l=f;break;case"defaultChecked":c=f;break;case"value":a=f;break;case"defaultValue":o=f;break;case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(k(137,t));break;default:ae(e,t,i,f,n,null)}}ny(e,a,o,l,c,r,s,!1);return;case"select":Gt("invalid",e),i=r=a=null;for(s in n)if(n.hasOwnProperty(s)&&(o=n[s],o!=null))switch(s){case"value":a=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:ae(e,t,s,o,n,null)}t=a,n=r,e.multiple=!!i,t!=null?Or(e,!!i,t,!1):n!=null&&Or(e,!!i,n,!0);return;case"textarea":Gt("invalid",e),a=s=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":s=o;break;case"children":a=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(k(91));break;default:ae(e,t,r,o,n,null)}sy(e,i,s,a);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:ae(e,t,l,i,n,null)}return;case"dialog":Gt("beforetoggle",e),Gt("toggle",e),Gt("cancel",e),Gt("close",e);break;case"iframe":case"object":Gt("load",e);break;case"video":case"audio":for(i=0;i<Sl.length;i++)Gt(Sl[i],e);break;case"image":Gt("error",e),Gt("load",e);break;case"details":Gt("toggle",e);break;case"embed":case"source":case"link":Gt("error",e),Gt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(k(137,t));default:ae(e,t,c,i,n,null)}return;default:if(im(t)){for(f in n)n.hasOwnProperty(f)&&(i=n[f],i!==void 0&&Vp(e,t,f,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&ae(e,t,o,i,n,null))}var vE={};function yE(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,a=null,r=null,o=null,l=null,c=null,f=null;for(p in n){var d=n[p];if(n.hasOwnProperty(p)&&d!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=d;default:i.hasOwnProperty(p)||ae(e,t,p,null,i,d)}}for(var h in i){var p=i[h];if(d=n[h],i.hasOwnProperty(h)&&(p!=null||d!=null))switch(h){case"type":p!==d&&(Kt=!0),a=p;break;case"name":p!==d&&(Kt=!0),s=p;break;case"checked":p!==d&&(Kt=!0),c=p;break;case"defaultChecked":p!==d&&(Kt=!0),f=p;break;case"value":p!==d&&(Kt=!0),r=p;break;case"defaultValue":p!==d&&(Kt=!0),o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(k(137,t));break;default:p!==d&&ae(e,t,h,p,i,d)}}$d(e,r,o,l,c,f,a,s);return;case"select":p=r=o=h=null;for(a in n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(a)||ae(e,t,a,null,i,l)}for(s in i)if(a=i[s],l=n[s],i.hasOwnProperty(s)&&(a!=null||l!=null))switch(s){case"value":a!==l&&(Kt=!0),h=a;break;case"defaultValue":a!==l&&(Kt=!0),o=a;break;case"multiple":a!==l&&(Kt=!0),r=a;default:a!==l&&ae(e,t,s,a,i,l)}t=o,n=r,i=p,h!=null?Or(e,!!n,h,!1):!!i!=!!n&&(t!=null?Or(e,!!n,t,!0):Or(e,!!n,n?[]:"",!1));return;case"textarea":p=h=null;for(o in n)if(s=n[o],n.hasOwnProperty(o)&&s!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:ae(e,t,o,null,i,s)}for(r in i)if(s=i[r],a=n[r],i.hasOwnProperty(r)&&(s!=null||a!=null))switch(r){case"value":s!==a&&(Kt=!0),h=s;break;case"defaultValue":s!==a&&(Kt=!0),p=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(k(91));break;default:s!==a&&ae(e,t,r,s,i,a)}iy(e,h,p);return;case"option":for(var _ in n)if(h=n[_],n.hasOwnProperty(_)&&h!=null&&!i.hasOwnProperty(_))switch(_){case"selected":e.selected=!1;break;default:ae(e,t,_,null,i,h)}for(l in i)if(h=i[l],p=n[l],i.hasOwnProperty(l)&&h!==p&&(h!=null||p!=null))switch(l){case"selected":h!==p&&(Kt=!0),e.selected=h&&typeof h!="function"&&typeof h!="symbol";break;default:ae(e,t,l,h,i,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var S in n)h=n[S],n.hasOwnProperty(S)&&h!=null&&!i.hasOwnProperty(S)&&ae(e,t,S,null,i,h);for(c in i)if(h=i[c],p=n[c],i.hasOwnProperty(c)&&h!==p&&(h!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(k(137,t));break;default:ae(e,t,c,h,i,p)}return;default:if(im(t)){for(var m in n)h=n[m],n.hasOwnProperty(m)&&h!==void 0&&!i.hasOwnProperty(m)&&Vp(e,t,m,void 0,i,h);for(f in i)h=i[f],p=n[f],!i.hasOwnProperty(f)||h===p||h===void 0&&p===void 0||Vp(e,t,f,h,i,p);return}}for(var u in n)h=n[u],n.hasOwnProperty(u)&&h!=null&&!i.hasOwnProperty(u)&&ae(e,t,u,null,i,h);for(d in i)h=i[d],p=n[d],!i.hasOwnProperty(d)||h===p||h==null&&p==null||ae(e,t,d,h,i,p)}function hv(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function xE(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var s=n[i],a=s.transferSize,r=s.initiatorType,o=s.duration;if(a&&o&&hv(r)){for(r=0,o=s.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var f=l.transferSize,d=l.initiatorType;f&&hv(d)&&(l=l.responseEnd,r+=f*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(a+r)/(s.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Gp=null,kp=null;function bl(e){return e.nodeType===9?e:e.ownerDocument}function fv(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function cS(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function uS(e,t,n,i){return n=bl(n).createElement(e),n[je]=i,n[An]=t,nn(n,e,t),Ze(n),n}function Xp(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Bd=null;function SE(){var e=window.event;return e&&e.type==="popstate"?e===Bd?!1:(Bd=e,!0):(Bd=null,!1)}var km=typeof setTimeout=="function"?setTimeout:void 0,ME=typeof clearTimeout=="function"?clearTimeout:void 0,dv=typeof Promise=="function"?Promise:void 0,pv=typeof requestAnimationFrame=="function"?requestAnimationFrame:km,bE=typeof queueMicrotask=="function"?queueMicrotask:typeof dv<"u"?function(e){return dv.resolve(null).then(e).catch(TE)}:km;function TE(e){setTimeout(function(){throw e})}function ta(e){return e==="head"}function mv(e,t){var n=t,i=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(s),eo(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")Hd(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,Hd(n);for(var a=n.firstChild;a;){var r=a.nextSibling,o=a.nodeName;a[Nl]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&a.rel.toLowerCase()==="stylesheet"||n.removeChild(a),a=r}}else n==="body"&&Hd(e.ownerDocument.body);n=s}while(n);eo(t)}function gv(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function hS(e,t,n){if(t=CSS.escape(t)!==t?"r-"+btoa(t).replace(/=/g,""):t,e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display==="inline"){if(t=e.getClientRects(),t.length===1)var i=1;else for(var s=i=0;s<t.length;s++){var a=t[s];0<a.width&&0<a.height&&i++}i===1&&(e=e.style,e.display=t.length===1?"inline-block":"block",e.marginTop="-"+n.paddingTop,e.marginBottom="-"+n.paddingBottom)}}function fS(e,t){e=e.style,t=t.style;var n=t!=null?t.hasOwnProperty("viewTransitionName")?t.viewTransitionName:t.hasOwnProperty("view-transition-name")?t["view-transition-name"]:null:null;e.viewTransitionName=n==null||typeof n=="boolean"?"":(""+n).trim(),n=t!=null?t.hasOwnProperty("viewTransitionClass")?t.viewTransitionClass:t.hasOwnProperty("view-transition-class")?t["view-transition-class"]:null:null,e.viewTransitionClass=n==null||typeof n=="boolean"?"":(""+n).trim(),e.display==="inline-block"&&(t==null?e.display=e.margin="":(n=t.display,e.display=n==null||typeof n=="boolean"?"":n,n=t.margin,n!=null?e.margin=n:(n=t.hasOwnProperty("marginTop")?t.marginTop:t["margin-top"],e.marginTop=n==null||typeof n=="boolean"?"":n,t=t.hasOwnProperty("marginBottom")?t.marginBottom:t["margin-bottom"],e.marginBottom=t==null||typeof t=="boolean"?"":t)))}function dS(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position==="absolute"||t.position==="fixed",clip:t.clipPath!=="none"||t.overflow!=="visible"||t.filter!=="none"||t.mask!=="none"||t.mask!=="none"||t.borderRadius!=="0px",view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Wp(e){var t=e.getBoundingClientRect(),n=getComputedStyle(e);return dS(t,n,e)}function EE(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return dS(t,n,e)}function AE(e){return e.documentElement.clientHeight}function wE(e){this.addEventListener("load",e),this.addEventListener("error",e)}function CE(e,t,n,i,s,a,r,o,l){var c=t.nodeType===9?t:t.ownerDocument;try{var f=c.startViewTransition({update:function(){var h=c.defaultView,p=h.navigation&&h.navigation.transition,_=c.fonts.status;i();var S=[];if(_==="loaded"&&(AE(c),c.fonts.status==="loading"&&S.push(c.fonts.ready)),_=S.length,e!==null)for(var m=e.suspenseyImages,u=0,g=0;g<m.length;g++){var v=m[g];if(!v.complete){var y=v.getBoundingClientRect();if(0<y.bottom&&0<y.right&&y.top<h.innerHeight&&y.left<h.innerWidth){if(u+=ES(v),u>ou){S.length=_;break}v=new Promise(wE.bind(v)),S.push(v)}}}if(0<S.length)return h=Promise.race([Promise.all(S),new Promise(function(A){return setTimeout(A,500)})]).then(s,s),(p?Promise.allSettled([p.finished,h]):h).then(a,a);if(s(),p)return p.finished.then(a,a);a()},types:n});c.__reactViewTransition=f;var d=[];return f.ready.then(function(){for(var h=c.documentElement.getAnimations({subtree:!0}),p=0;p<h.length;p++){var _=h[p],S=_.effect,m=S.pseudoElement;if(m!=null&&m.startsWith("::view-transition")){d.push(_),_=S.getKeyframes();for(var u=m=void 0,g=!0,v=0;v<_.length;v++){var y=_[v],A=y.width;if(m===void 0)m=A;else if(m!==A){g=!1;break}if(A=y.height,u===void 0)u=A;else if(u!==A){g=!1;break}delete y.width,delete y.height,y.transform==="none"&&delete y.transform}g&&m!==void 0&&u!==void 0&&(S.setKeyframes(_),g=getComputedStyle(S.target,S.pseudoElement),g.width!==m||g.height!==u)&&(g=_[0],g.width=m,g.height=u,g=_[_.length-1],g.width=m,g.height=u,S.setKeyframes(_))}}r()},function(h){c.__reactViewTransition===f&&(c.__reactViewTransition=null);try{if(typeof h=="object"&&h!==null)switch(h.name){case"InvalidStateError":(h.message==="View transition was skipped because document visibility state is hidden."||h.message==="Skipping view transition because document visibility state has become hidden."||h.message==="Skipping view transition because viewport size changed."||h.message==="Transition was aborted because of invalid state")&&(h=null)}h!==null&&l(h)}finally{i(),s(),r()}}),f.finished.finally(function(){for(var h=0;h<d.length;h++)d[h].cancel();c.__reactViewTransition===f&&(c.__reactViewTransition=null),o()}),f}catch{return i(),s(),r(),null}}function Ta(e,t){this._scope=document.documentElement,this._selector="::view-transition-"+e+"("+t+")"}Ta.prototype.animate=function(e,t){return t=typeof t=="number"?{duration:t}:fe({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)};Ta.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),i=[],s=0;s<n.length;s++){var a=n[s].effect;a!==null&&a.target===e&&a.pseudoElement===t&&i.push(n[s])}return i};Ta.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function pS(e){return{name:e,group:new Ta("group",e),imagePair:new Ta("image-pair",e),old:new Ta("old",e),new:new Ta("new",e)}}function Gn(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Gn.prototype.addEventListener=function(e,t,n){var i=null,s=null;if(!(n!=null&&typeof n!="boolean"&&(i=n.signal||null,i!==null&&i.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(mS(a,e,t,n)===-1){var r=this,o=t;n!=null&&typeof n!="boolean"&&n.once===!0&&(o=function(l){r.removeEventListener(e,t,n),typeof t=="function"?t.call(this,l):t.handleEvent(l)}),i!==null&&(s=r.removeEventListener.bind(r,e,t,n),i.addEventListener("abort",s,{once:!0}),s=i.removeEventListener.bind(i,"abort",s)),i=Qr(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:o,cleanup:s}),En(this._fragmentFiber.child,!1,RE,e,o,i)}this._eventListeners=a}};function RE(e,t,n,i){return He(e).addEventListener(t,n,i),!1}Gn.prototype.removeEventListener=function(e,t,n){var i=this._eventListeners;if(i!==null&&(t=mS(i,e,t,n),t!==-1)){var s=i[t];n=s.attachedListener;var a=s.cleanup;s=Qr(s.optionsOrUseCapture),En(this._fragmentFiber.child,!1,DE,e,n,s),i.splice(t,1),a!==null&&a()}};function DE(e,t,n,i){return He(e).removeEventListener(t,n,i),!1}function Qr(e){return e!=null&&typeof e!="boolean"&&(e.once===!0||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function _v(e){return e==null?"c=0":typeof e=="boolean"?"c="+(e?"1":"0"):"c="+(e.capture?"1":"0")}function mS(e,t,n,i){if(e.length===0)return-1;i=_v(i);for(var s=0;s<e.length;s++){var a=e[s];if(a.type===t&&a.listener===n&&_v(a.optionsOrUseCapture)===i)return s}return-1}Gn.prototype.dispatchEvent=function(e){var t=Ba(this._fragmentFiber);if(t===null)return!0;t=He(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var i=t.nodeType===9?t.createComment(""):document.createTextNode("");if(n)for(var s=0;s<n.length;s++){var a=n[s];i.addEventListener(a.type,a.attachedListener,Qr(a.optionsOrUseCapture))}if(t.appendChild(i),e=i.dispatchEvent(e),n)for(s=0;s<n.length;s++)a=n[s],i.removeEventListener(a.type,a.attachedListener,Qr(a.optionsOrUseCapture));return t.removeChild(i),e}return t.dispatchEvent(e)};Gn.prototype.focus=function(e){En(this._fragmentFiber.child,!0,gS,e,void 0,void 0)};function gS(e,t){return e.tag===6?!1:(e=He(e),GE(e,t))}Gn.prototype.focusLast=function(e){var t=[];En(this._fragmentFiber.child,!0,Xm,t,void 0,void 0);for(var n=t.length-1;0<=n&&!gS(t[n],e);n--);};function Xm(e,t){return t.push(e),!1}Gn.prototype.blur=function(){var e=Ba(this._fragmentFiber);e!==null&&(e=He(e),e=bl(e).activeElement,e!==null&&En(this._fragmentFiber.child,!1,UE,e,void 0,void 0))};function UE(e,t){return e.tag===6?!1:(e=He(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Gn.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),En(this._fragmentFiber.child,!1,NE,e,void 0,void 0)};function NE(e,t){return e.tag===6||(e=He(e),t.observe(e)),!1}Gn.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),En(this._fragmentFiber.child,!1,LE,e,void 0,void 0);for(var n=t=0;n<mi.length;n++){var i=mi[n];i.fragmentInstance===this&&i.observer===e?e.unobserve(i.instance):mi[t++]=i}mi.length=t}};function LE(e,t){return e.tag===6||(e=He(e),t.unobserve(e)),!1}var mi=[],Fd=!1;function OE(e,t,n){mi.push({fragmentInstance:e,observer:t,instance:n}),Fd||(Fd=!0,kE(function(){Fd=!1;var i=mi;mi=[];for(var s=0;s<i.length;s++){var a=i[s];a.observer.unobserve(a.instance)}}))}Gn.prototype.getClientRects=function(){var e=[];return En(this._fragmentFiber.child,!1,IE,e,void 0,void 0),e};function IE(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=He(e),t.push.apply(t,e.getClientRects());return!1}Gn.prototype.getRootNode=function(e){var t=Ba(this._fragmentFiber);return t===null?this:He(t).getRootNode(e)};Gn.prototype.compareDocumentPosition=function(e){var t=Ba(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];En(this._fragmentFiber.child,!1,Xm,n,void 0,void 0);var i=He(t);if(n.length===0){if(n=i,K0(this._fragmentFiber)){t:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break t}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var s=i=n.compareDocumentPosition(e);return n===e?s=Node.DOCUMENT_POSITION_CONTAINS:i&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=Bv(t)[1],n===null?s=Node.DOCUMENT_POSITION_PRECEDING:(e=He(n).compareDocumentPosition(e),s=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),s|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=He(n[0]),s=He(n[n.length-1]);var a=K0(this._fragmentFiber)?t.parentElement:i;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;i=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(s)&Node.DOCUMENT_POSITION_CONTAINED_BY;var r=t.compareDocumentPosition(e),o=s.compareDocumentPosition(e),l=r&Node.DOCUMENT_POSITION_CONTAINED_BY||o&Node.DOCUMENT_POSITION_CONTAINED_BY;return o=i&&a&&r&Node.DOCUMENT_POSITION_FOLLOWING&&o&Node.DOCUMENT_POSITION_PRECEDING,t=i&&t===e||a&&s===e||l||o?Node.DOCUMENT_POSITION_CONTAINED_BY:!i&&t===e||!a&&s===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:r,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||PE(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function PE(e,t,n,i,s){var a=ba(s);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)t:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break t}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=s.ownerDocument,s===a||s===a.documentElement||s===a.body;t:{for(a=t,t=Ba(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break t}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=Gd(n,a,Q0),t===null?t=!1:(En(t,!0,f1,a,n),a=Sr,Sr=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===i)&&(t=Gd(i,a,Q0),t===null?t=!1:(En(t,!0,d1,a,i),a=Sr,Vd=Sr=null,t=a!==null)),t):!1}function vv(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Gn.prototype.scrollIntoView=function(e){if(typeof e=="object")throw Error(k(566));var t=[];En(this._fragmentFiber.child,!1,Xm,t,void 0,void 0);var n=e!==!1;if(t.length===0){var i=Bv(this._fragmentFiber);if(i=n?i[1]||i[0]||Ba(this._fragmentFiber):i[0]||i[1],i===null)return;if(i.tag===6){e=He(i),vv(e,n);return}if(i=He(i),i.nodeType!==9){if(i.nodeType===11){n="host"in i?i.host:null,n!==null&&n.scrollIntoView(e);return}i.scrollIntoView(e)}}for(i=n?t.length-1:0;i!==(n?-1:t.length);){var s=t[i];s.tag===6?(s=He(s),vv(s,n)):He(s).scrollIntoView(e),i+=n?-1:1}};function zE(e,t){return e=He(e),_S(e,t),!1}function _S(e,t){e.reactFragments==null&&(e.reactFragments=new Set),e.reactFragments.add(t)}function vS(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i];e.addEventListener(s.type,s.attachedListener,Qr(s.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(a){for(var r=0,o=0;o<mi.length;o++){var l=mi[o];(l.fragmentInstance!==t||l.observer!==a||l.instance!==e)&&(mi[r++]=l)}mi.length=r,a.observe(e)}),_S(e,t))}function BE(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i];e.removeEventListener(s.type,s.attachedListener,Qr(s.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(a){typeof a.rootMargin=="string"?OE(t,a,e):a.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function qp(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":qp(n),Hu(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function FE(e,t,n,i){for(;e.nodeType===1;){var s=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Nl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(a=e.getAttribute("rel"),a==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(a!==s.rel||e.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(a=e.getAttribute("src"),(a!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&a&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var a=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===a)return e}else return e;if(e=ri(e.nextSibling),e===null)break}return null}function HE(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=ri(e.nextSibling),e===null))return null;return e}function yS(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=ri(e.nextSibling),e===null))return null;return e}function Yp(e){return e.data==="$?"||e.data==="$~"}function Wm(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function VE(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function ri(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Zp=null;function yv(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return ri(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function xv(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function GE(e,t){function n(){i=!0}if(e.ownerDocument.activeElement===e)return!0;var i=!1;try{e.ownerDocument.addEventListener("focus",n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener("focus",n,!0)}return i}function kE(e){pv(function(){pv(function(t){return e(t)})})}function xS(e,t,n){switch(t=bl(n),e){case"html":if(e=t.documentElement,!e)throw Error(k(452));return e;case"head":if(e=t.head,!e)throw Error(k(453));return e;case"body":if(e=t.body,!e)throw Error(k(454));return e;default:throw Error(k(451))}}function SS(e,t,n){for(var i in n){var s=n[i];n.hasOwnProperty(i)&&s!=null&&ae(e,t,i,null,vE,s)}n.dangerouslySetInnerHTML!=null&&(e.textContent=""),e.onclick===Ni&&(e.onclick=null),Hu(e)}function Hd(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Hu(e)}var oi=new Map,Sv=new Set;function Tl(e){if(typeof e.getRootNode=="function"){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var hs=jt.d;jt.d={f:XE,r:WE,D:qE,C:YE,L:ZE,m:JE,X:QE,S:KE,M:jE};function XE(){var e=hs.f(),t=th();return e||t}function WE(e){var t=io(e);t!==null&&t.tag===5&&t.type==="form"?ax(t):hs.r(e)}var oo=typeof document>"u"?null:document;function MS(e,t,n){var i=oo;if(i&&typeof t=="string"&&t){var s=ii(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof n=="string"&&(s+='[crossorigin="'+n+'"]'),Sv.has(s)||(Sv.add(s),e={rel:e,crossOrigin:n,href:t},i.querySelector(s)===null&&(t=i.createElement("link"),nn(t,"link",e),Ze(t),i.head.appendChild(t)))}}function qE(e){hs.D(e),MS("dns-prefetch",e,null)}function YE(e,t){hs.C(e,t),MS("preconnect",e,t)}function ZE(e,t,n){hs.L(e,t,n);var i=oo;if(i&&e&&t){var s='link[rel="preload"][as="'+ii(t)+'"]';t==="image"&&n&&n.imageSrcSet?(s+='[imagesrcset="'+ii(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(s+='[imagesizes="'+ii(n.imageSizes)+'"]')):s+='[href="'+ii(e)+'"]';var a=s;switch(t){case"style":a=jr(e);break;case"script":a=lo(e)}if(!(oi.has(a)||(e=fe({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),oi.set(a,e),i.querySelector(s)!==null||t==="style"&&i.querySelector(Bl(a))||t==="script"&&i.querySelector(Fl(a))))){var r=i.createElement("link");nn(r,"link",e),t==="style"&&(r[pu]=!0,r.onload=r.onerror=function(){Qv(r)}),Ze(r),i.head.appendChild(r)}}}function JE(e,t){hs.m(e,t);var n=oo;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+ii(i)+'"][href="'+ii(e)+'"]',a=s;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":a=lo(e)}if(!oi.has(a)&&(e=fe({rel:"modulepreload",href:e},t),oi.set(a,e),n.querySelector(s)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Fl(a)))return}i=n.createElement("link"),nn(i,"link",e),Ze(i),n.head.appendChild(i)}}}function KE(e,t,n){hs.S(e,t,n);var i=oo;if(i&&e){var s=Lr(i).hoistableStyles,a=jr(e);t=t||"default";var r=s.get(a);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Bl(a)))o.loading=5;else{e=fe({rel:"stylesheet",href:e,"data-precedence":t},n),(n=oi.get(a))&&qm(e,n);var l=r=i.createElement("link");Ze(l),nn(l,"link",e),l._p=new Promise(function(c,f){l.onload=c,l.onerror=f}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,au(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},s.set(a,r)}}}function QE(e,t){hs.X(e,t);var n=oo;if(n&&e){var i=Lr(n).hoistableScripts,s=lo(e),a=i.get(s);a||(a=n.querySelector(Fl(s)),a||(e=fe({src:e,async:!0},t),(t=oi.get(s))&&Ym(e,t),a=n.createElement("script"),Ze(a),nn(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function jE(e,t){hs.M(e,t);var n=oo;if(n&&e){var i=Lr(n).hoistableScripts,s=lo(e),a=i.get(s);a||(a=n.querySelector(Fl(s)),a||(e=fe({src:e,async:!0,type:"module"},t),(t=oi.get(s))&&Ym(e,t),a=n.createElement("script"),Ze(a),nn(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function Mv(e,t,n,i){var s=(s=Bs.current)?Tl(s):null;if(!s)throw Error(k(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(n=jr(n.href),t=Lr(s).hoistableStyles,i=t.get(n),i||(i={type:"style",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=jr(n.href);var a=Lr(s).hoistableStyles,r=a.get(e);if(r||(s=s.ownerDocument||s,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},a.set(e,r),(a=s.querySelector(Bl(e)))?a._p||(r.instance=a,r.state.loading=5):(a=oi.get(e),a||(a={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},oi.set(e,a)),$E(s,e,a,r.state))),t&&i===null)throw Error(k(528,""));return r}if(t&&i!==null)throw Error(k(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(n=lo(n),t=Lr(s).hoistableScripts,i=t.get(n),i||(i={type:"script",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(k(444,e))}}function jr(e){return'href="'+ii(e)+'"'}function Bl(e){return'link[rel="stylesheet"]['+e+"]"}function bS(e){return fe({},e,{"data-precedence":e.precedence,precedence:null})}function $E(e,t,n,i){if(t=e.querySelector('link[rel="preload"][as="style"]['+t+"]")){if(t[pu]!==!0){i.loading=1;return}}else t=e.createElement("link"),t[pu]=!0,t.onload=t.onerror=Qv.bind(null,t),nn(t,"link",n),Ze(t),e.head.appendChild(t);i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2})}function lo(e){return'[src="'+ii(e)+'"]'}function Fl(e){return"script[async]"+e}function bv(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+ii(n.href)+'"]');if(i)return t.instance=i,Ze(i),i;var s=fe({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),Ze(i),nn(i,"style",s),au(i,n.precedence,e),t.instance=i;case"stylesheet":s=jr(n.href);var a=e.querySelector(Bl(s));if(a)return t.state.loading|=4,t.instance=a,Ze(a),a;i=bS(n),(s=oi.get(s))&&qm(i,s),a=(e.ownerDocument||e).createElement("link"),Ze(a);var r=a;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),nn(a,"link",i),t.state.loading|=4,au(a,n.precedence,e),t.instance=a;case"script":return a=lo(n.src),(s=e.querySelector(Fl(a)))?(t.instance=s,Ze(s),s):(i=n,(s=oi.get(a))&&(i=fe({},n),Ym(i,s)),e=e.ownerDocument||e,s=e.createElement("script"),Ze(s),nn(s,"link",i),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(k(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,au(i,n.precedence,e));return t.instance}function au(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=i.length?i[i.length-1]:null,a=s,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)a=o;else if(a!==s)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function qm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Ym(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var ru=null;function Tv(e,t,n){if(ru===null){var i=new Map,s=ru=new Map;s.set(n,i)}else s=ru,i=s.get(n),i||(i=new Map,s.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),s=0;s<n.length;s++){var a=n[s];if(!(a[Nl]||a[je]||e==="link"&&a.getAttribute("rel")==="stylesheet")&&a.namespaceURI!=="http://www.w3.org/2000/svg"){var r=a.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(a):i.set(r,[a])}}return i}function Jp(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function tA(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Ev(e,t){return e==="img"&&t.src!=null&&t.src!==""&&t.onLoad==null&&t.loading!=="lazy"}function TS(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function ES(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function Av(e,t){typeof t.decode=="function"&&(e.imgCount++,t.complete||(e.imgBytes+=ES(t),e.suspenseyImages.push(t)),e=iA.bind(e),t.decode().then(e,e))}function eA(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var s=jr(i.href),a=t.querySelector(Bl(s));if(a){t=a._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=El.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Ze(a);return}a=t.ownerDocument||t,i=bS(i),(s=oi.get(s))&&qm(i,s),a=a.createElement("link"),Ze(a);var r=a;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),nn(a,"link",i),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=El.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var ou=0;function nA(e,t){return e.stylesheets&&e.count===0&&lu(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&lu(e,e.stylesheets),e.unsuspend){var a=e.unsuspend;e.unsuspend=null,a()}},6e4+t);0<e.imgBytes&&ou===0&&(ou=62500*xE());var s=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&lu(e,e.stylesheets),e.unsuspend)){var a=e.unsuspend;e.unsuspend=null,a()}},(e.imgBytes>ou?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(s)}}:null}function AS(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)lu(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function El(){this.count--,AS(this)}function iA(){this.imgCount--,AS(this)}var zu=null;function lu(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,zu=new Map,t.forEach(sA,e),zu=null,El.call(e))}function sA(e,t){if(!(t.state.loading&4)){var n=zu.get(e);if(n)var i=n.get(null);else{n=new Map,zu.set(e,n);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),a=0;a<s.length;a++){var r=s[a];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}s=t.instance,r=s.getAttribute("data-precedence"),a=n.get(r)||i,a===i&&n.set(null,s),n.set(r,s),this.count++,i=El.bind(this),s.addEventListener("load",i),s.addEventListener("error",i),a?a.parentNode.insertBefore(s,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var $r={$$typeof:Ui,Provider:null,Consumer:null,_currentValue:Ea,_currentValue2:Ea,_threadCount:0};function aA(e,t,n,i,s,a,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=pd(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=pd(0),this.hiddenUpdates=pd(null),this.identifierPrefix=i,this.onUncaughtError=s,this.onCaughtError=a,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.transitionTypes=null,this.incompleteTransitions=new Map}function wS(e,t,n,i,s,a,r,o,l,c,f,d){return e=new aA(e,t,n,r,l,c,f,d,o),t=1,a===!0&&(t|=24),a=bn(3,null,null,t),e.current=a,a.stateNode=e,t=dm(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:i,isDehydrated:n,cache:t},gm(a),e}function CS(e){return e?(e=Rr,e):Rr}function RS(e,t,n,i,s,a){s=CS(s),i.context===null?i.context=s:i.pendingContext=s,i=Hs(t),i.payload={element:n},a=a===void 0?null:a,a!==null&&(i.callback=a),n=Vs(e,i,t),n!==null&&(Tn(n,e,t),il(n,e,t))}function wv(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Zm(e,t){wv(e,t),(e=e.alternate)&&wv(e,t)}function DS(e){if(e.tag===13||e.tag===31){var t=Va(e,67108864);t!==null&&Tn(t,e,67108864),Zm(e,67108864)}}function Cv(e){if(e.tag===13||e.tag===31){var t=Hn();t=em(t);var n=Va(e,t);n!==null&&Tn(n,e,t),Zm(e,t)}}var to=!0;function rA(e,t,n,i){var s=Ct.T;Ct.T=null;var a=jt.p;try{jt.p=2,Jm(e,t,n,i)}finally{jt.p=a,Ct.T=s}}function oA(e,t,n,i){var s=Ct.T;Ct.T=null;var a=jt.p;try{jt.p=8,Jm(e,t,n,i)}finally{jt.p=a,Ct.T=s}}function Jm(e,t,n,i){if(to){var s=Kp(i);if(s===null)zd(e,t,i,Bu,n),Rv(e,i);else if(cA(s,e,t,n,i))i.stopPropagation();else if(Rv(e,i),t&4&&-1<lA.indexOf(e)){for(;s!==null;){var a=io(s);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var r=xa(a.pendingLanes);if(r!==0){var o=a;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-Fn(r);o.entanglements[1]|=l,r&=~l}Fi(a),(Qt&6)===0&&(Nu=zn()+500,zl(0,!1))}}break;case 31:case 13:o=Va(a,2),o!==null&&Tn(o,a,2),th(),Zm(a,2)}if(a=Kp(i),a===null&&zd(e,t,i,Bu,n),a===s)break;s=a}s!==null&&i.stopPropagation()}else zd(e,t,i,null,n)}}function Kp(e){return e=sm(e),Km(e)}var Bu=null;function Km(e){if(Bu=null,e=ba(e),e!==null){var t=Cl(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=Iv(t),e!==null)return e;e=null}else if(n===31){if(e=Pv(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Bu=e,null}function US(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(M1()){case Gv:return 2;case kv:return 8;case du:case b1:return 32;case Xv:return 268435456;default:return 32}default:return 32}}var Qp=!1,Ws=null,qs=null,Ys=null,Al=new Map,wl=new Map,Us=[],lA="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Rv(e,t){switch(e){case"focusin":case"focusout":Ws=null;break;case"dragenter":case"dragleave":qs=null;break;case"mouseover":case"mouseout":Ys=null;break;case"pointerover":case"pointerout":Al.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":wl.delete(t.pointerId)}}function qo(e,t,n,i,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:a,targetContainers:[s]},t!==null&&(t=io(t),t!==null&&DS(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function cA(e,t,n,i,s){switch(t){case"focusin":return Ws=qo(Ws,e,t,n,i,s),!0;case"dragenter":return qs=qo(qs,e,t,n,i,s),!0;case"mouseover":return Ys=qo(Ys,e,t,n,i,s),!0;case"pointerover":var a=s.pointerId;return Al.set(a,qo(Al.get(a)||null,e,t,n,i,s)),!0;case"gotpointercapture":return a=s.pointerId,wl.set(a,qo(wl.get(a)||null,e,t,n,i,s)),!0}return!1}function NS(e){var t=ba(e.target);if(t!==null){var n=Cl(t);if(n!==null){if(t=n.tag,t===13){if(t=Iv(n),t!==null){e.blockedOn=t,e_(e.priority,function(){Cv(n)});return}}else if(t===31){if(t=Pv(n),t!==null){e.blockedOn=t,e_(e.priority,function(){Cv(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function cu(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Kp(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);tp=i,n.target.dispatchEvent(i),tp=null}else return t=io(n),t!==null&&DS(t),e.blockedOn=n,!1;t.shift()}return!0}function Dv(e,t,n){cu(e)&&n.delete(t)}function uA(){Qp=!1,Ws!==null&&cu(Ws)&&(Ws=null),qs!==null&&cu(qs)&&(qs=null),Ys!==null&&cu(Ys)&&(Ys=null),Al.forEach(Dv),wl.forEach(Dv)}function kc(e,t){e.blockedOn===t&&(e.blockedOn=null,Qp||(Qp=!0,Ve.unstable_scheduleCallback(Ve.unstable_NormalPriority,uA)))}var Xc=null;function Uv(e){Xc!==e&&(Xc=e,Ve.unstable_scheduleCallback(Ve.unstable_NormalPriority,function(){Xc===e&&(Xc=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],s=e[t+2];if(typeof i!="function"){if(Km(i||n)===null)continue;break}var a=io(n);a!==null&&(e.splice(t,3),t-=3,gp(a,{pending:!0,data:s,method:n.method,action:i},i,s))}}))}function eo(e){function t(l){return kc(l,e)}Ws!==null&&kc(Ws,e),qs!==null&&kc(qs,e),Ys!==null&&kc(Ys,e),Al.forEach(t),wl.forEach(t);for(var n=0;n<Us.length;n++){var i=Us[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<Us.length&&(n=Us[0],n.blockedOn===null);)NS(n),n.blockedOn===null&&Us.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var s=n[i],a=n[i+1],r=s[An]||null;if(typeof a=="function")r||Uv(n);else if(r){var o=null;if(a&&a.hasAttribute("formAction")){if(s=a,r=a[An]||null)o=r.formAction;else if(Km(s)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),Uv(n)}}}function LS(){function e(a){a.canIntercept&&a.info==="react-transition"&&a.intercept({handler:function(){return new Promise(function(r){return s=r})},focusReset:"manual",scroll:"manual"})}function t(){s!==null&&(s(),s=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var a=navigation.currentEntry;a&&a.url!=null&&navigation.navigate(a.url,{state:a.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,s=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),s!==null&&(s(),s=null)}}}function Qm(e){this._internalRoot=e}ih.prototype.render=Qm.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(k(409));var n=t.current,i=Hn();RS(n,i,e,t,null,null)};ih.prototype.unmount=Qm.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;RS(e.current,2,null,e,null,null),th(),t[no]=null}};function ih(e){this._internalRoot=e}ih.prototype.unstable_scheduleHydration=function(e){if(e){var t=Kv();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Us.length&&t!==0&&t<Us[n].priority;n++);Us.splice(n,0,e),n===0&&NS(e)}};var Nv=Lv.version;if(Nv!=="19.3.1")throw Error(k(527,Nv,"19.3.1"));jt.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(k(188)):(e=Object.keys(e).join(","),Error(k(268,e)));return e=h1(t),e=e!==null?zv(e):null,e=e===null?null:e.stateNode,e};var hA={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:Ct,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Yo=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Yo.isDisabled&&Yo.supportsFiber))try{Rl=Yo.inject(hA),Bn=Yo}catch{}var Yo;sh.createRoot=function(e,t){if(!Ov(e))throw Error(k(299));var n=!1,i="",s=dx,a=px,r=mx;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=wS(e,1,!1,null,null,n,i,null,s,a,r,LS),e[no]=t.current,Gm(e),new Qm(t)};sh.hydrateRoot=function(e,t,n){if(!Ov(e))throw Error(k(299));var i=!1,s="",a=dx,r=px,o=mx,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(a=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=wS(e,1,!0,t,n??null,i,s,l,a,r,o,LS),t.context=CS(null),n=t.current,i=Hn(),i=em(i),s=Hs(i),s.callback=null,Vs(n,s,i),n=i,t.current.lanes=n,Ul(t,n),Fi(t),e[no]=t.current,Gm(e),new ih(t)};sh.version="19.3.1"});var zS=Ti((D3,PS)=>{"use strict";function IS(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(IS)}catch(e){console.error(e)}}IS(),PS.exports=OS()});var bb=Ti(qf=>{"use strict";var x3=Symbol.for("react.transitional.element"),S3=Symbol.for("react.fragment");function Mb(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var s in t)s!=="key"&&(n[s]=t[s])}else n=t;return t=n.ref,{$$typeof:x3,type:e,key:i,ref:t!==void 0?t:null,props:n}}qf.Fragment=S3;qf.jsx=Mb;qf.jsxs=Mb});var pc=Ti((pL,Tb)=>{"use strict";Tb.exports=bb()});var Cb=ur(zS());var mc=ur(Mc());var eM=0,wg=1,nM=2;var Cg=1,iM=2,Xi=3,vs=0,vn=1,Wi=2,Ss=0,Ja=1,Rg=2,Dg=3,Ug=4,sM=5,ca=100,aM=101,rM=102,oM=103,lM=104,cM=200,uM=201,hM=202,fM=203,Th=204,Eh=205,dM=206,pM=207,mM=208,gM=209,_M=210,vM=211,yM=212,xM=213,SM=214,Jh=0,Kh=1,Qh=2,Ka=3,jh=4,$h=5,tf=6,ef=7,Ng=0,MM=1,bM=2,Ms=0,TM=1,EM=2,AM=3,wM=4,CM=5,RM=6,DM=7;var Lg=300,nr=301,ir=302,nf=303,sf=304,rc=306,Ah=1e3,la=1001,wh=1002,ci=1003,UM=1004;var oc=1005;var Mi=1006,af=1007;var pa=1008;var qi=1009,Og=1010,Ig=1011,Ro=1012,rf=1013,ma=1014,Yi=1015,Do=1016,of=1017,lf=1018,Uo=1020,Pg=35902,zg=35899,Bg=1021,Fg=1022,hi=1023,bo=1026,No=1027,Hg=1028,cf=1029,Vg=1030,uf=1031;var hf=1033,lc=33776,cc=33777,uc=33778,hc=33779,ff=35840,df=35841,pf=35842,mf=35843,gf=36196,_f=37492,vf=37496,yf=37808,xf=37809,Sf=37810,Mf=37811,bf=37812,Tf=37813,Ef=37814,Af=37815,wf=37816,Cf=37817,Rf=37818,Df=37819,Uf=37820,Nf=37821,Lf=36492,Of=36494,If=36495,Pf=36283,zf=36284,Bf=36285,Ff=36286;var Wl=2300,Ch=2301,bh=2302,Sg=2400,Mg=2401,bg=2402;var NM=3200,LM=3201;var OM=0,IM=1,bs="",Wn="srgb",Qa="srgb-linear",ql="linear",oe="srgb";var Ya=7680;var Tg=519,PM=512,zM=513,BM=514,Gg=515,FM=516,HM=517,VM=518,GM=519,Eg=35044;var kg="300 es",Si=2e3,Yl=2001;var ys=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let a=s.indexOf(n);a!==-1&&s.splice(a,1)}}dispatchEvent(t){let n=this._listeners;if(n===void 0)return;let i=n[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,t);t.target=null}}},cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var jm=Math.PI/180,Rh=180/Math.PI;function fc(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(cn[e&255]+cn[e>>8&255]+cn[e>>16&255]+cn[e>>24&255]+"-"+cn[t&255]+cn[t>>8&255]+"-"+cn[t>>16&15|64]+cn[t>>24&255]+"-"+cn[n&63|128]+cn[n>>8&255]+"-"+cn[n>>16&255]+cn[n>>24&255]+cn[i&255]+cn[i>>8&255]+cn[i>>16&255]+cn[i>>24&255]).toLowerCase()}function qt(e,t,n){return Math.max(t,Math.min(n,e))}function fA(e,t){return(e%t+t)%t}function $m(e,t,n){return(1-n)*e+n*t}function Hl(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function wn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}var $t=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=qt(this.x,t.x,n.x),this.y=qt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=qt(this.x,t,n),this.y=qt(this.y,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),s=Math.sin(n),a=this.x-t.x,r=this.y-t.y;return this.x=a*i-r*s+t.x,this.y=a*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},xs=class{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,a,r,o){let l=i[s+0],c=i[s+1],f=i[s+2],d=i[s+3],h=a[r+0],p=a[r+1],_=a[r+2],S=a[r+3];if(o===0){t[n+0]=l,t[n+1]=c,t[n+2]=f,t[n+3]=d;return}if(o===1){t[n+0]=h,t[n+1]=p,t[n+2]=_,t[n+3]=S;return}if(d!==S||l!==h||c!==p||f!==_){let m=1-o,u=l*h+c*p+f*_+d*S,g=u>=0?1:-1,v=1-u*u;if(v>Number.EPSILON){let A=Math.sqrt(v),C=Math.atan2(A,u*g);m=Math.sin(m*C)/A,o=Math.sin(o*C)/A}let y=o*g;if(l=l*m+h*y,c=c*m+p*y,f=f*m+_*y,d=d*m+S*y,m===1-o){let A=1/Math.sqrt(l*l+c*c+f*f+d*d);l*=A,c*=A,f*=A,d*=A}}t[n]=l,t[n+1]=c,t[n+2]=f,t[n+3]=d}static multiplyQuaternionsFlat(t,n,i,s,a,r){let o=i[s],l=i[s+1],c=i[s+2],f=i[s+3],d=a[r],h=a[r+1],p=a[r+2],_=a[r+3];return t[n]=o*_+f*d+l*p-c*h,t[n+1]=l*_+f*h+c*d-o*p,t[n+2]=c*_+f*p+o*h-l*d,t[n+3]=f*_-o*d-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,s=t._y,a=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(s/2),d=o(a/2),h=l(i/2),p=l(s/2),_=l(a/2);switch(r){case"XYZ":this._x=h*f*d+c*p*_,this._y=c*p*d-h*f*_,this._z=c*f*_+h*p*d,this._w=c*f*d-h*p*_;break;case"YXZ":this._x=h*f*d+c*p*_,this._y=c*p*d-h*f*_,this._z=c*f*_-h*p*d,this._w=c*f*d+h*p*_;break;case"ZXY":this._x=h*f*d-c*p*_,this._y=c*p*d+h*f*_,this._z=c*f*_+h*p*d,this._w=c*f*d-h*p*_;break;case"ZYX":this._x=h*f*d-c*p*_,this._y=c*p*d+h*f*_,this._z=c*f*_-h*p*d,this._w=c*f*d+h*p*_;break;case"YZX":this._x=h*f*d+c*p*_,this._y=c*p*d+h*f*_,this._z=c*f*_-h*p*d,this._w=c*f*d-h*p*_;break;case"XZY":this._x=h*f*d-c*p*_,this._y=c*p*d-h*f*_,this._z=c*f*_+h*p*d,this._w=c*f*d+h*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],s=n[4],a=n[8],r=n[1],o=n[5],l=n[9],c=n[2],f=n[6],d=n[10],h=i+o+d;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(f-l)*p,this._y=(a-c)*p,this._z=(r-s)*p}else if(i>o&&i>d){let p=2*Math.sqrt(1+i-o-d);this._w=(f-l)/p,this._x=.25*p,this._y=(s+r)/p,this._z=(a+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-i-d);this._w=(a-c)/p,this._x=(s+r)/p,this._y=.25*p,this._z=(l+f)/p}else{let p=2*Math.sqrt(1+d-i-o);this._w=(r-s)/p,this._x=(a+c)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+r*o+s*c-a*l,this._y=s*f+r*l+a*o-i*c,this._z=a*f+r*c+i*l-s*o,this._w=r*f-i*o-s*l-a*c,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);let i=this._x,s=this._y,a=this._z,r=this._w,o=r*t._w+i*t._x+s*t._y+a*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=r,this._x=i,this._y=s,this._z=a,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-n;return this._w=p*r+n*this._w,this._x=p*i+n*this._x,this._y=p*s+n*this._y,this._z=p*a+n*this._z,this.normalize(),this}let c=Math.sqrt(l),f=Math.atan2(c,o),d=Math.sin((1-n)*f)/c,h=Math.sin(n*f)/c;return this._w=r*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=a*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(n),a*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},z=class e{constructor(t=0,n=0,i=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(BS.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(BS.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6]*s,this.y=a[1]*n+a[4]*i+a[7]*s,this.z=a[2]*n+a[5]*i+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=t.elements,r=1/(a[3]*n+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*n+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*n+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(t){let n=this.x,i=this.y,s=this.z,a=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*s-o*i),f=2*(o*n-a*s),d=2*(a*i-r*n);return this.x=n+l*c+r*d-o*f,this.y=i+l*f+o*c-a*d,this.z=s+l*d+a*f-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s,this.y=a[1]*n+a[5]*i+a[9]*s,this.z=a[2]*n+a[6]*i+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=qt(this.x,t.x,n.x),this.y=qt(this.y,t.y,n.y),this.z=qt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=qt(this.x,t,n),this.y=qt(this.y,t,n),this.z=qt(this.z,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,s=t.y,a=t.z,r=n.x,o=n.y,l=n.z;return this.x=s*l-a*o,this.y=a*r-i*l,this.z=i*o-s*r,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return tg.copy(this).projectOnVector(t),this.sub(tg)}reflect(t){return this.sub(tg.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},tg=new z,BS=new xs,Pt=class e{constructor(t,n,i,s,a,r,o,l,c){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c)}set(t,n,i,s,a,r,o,l,c){let f=this.elements;return f[0]=t,f[1]=s,f[2]=o,f[3]=n,f[4]=a,f[5]=l,f[6]=i,f[7]=r,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],f=i[4],d=i[7],h=i[2],p=i[5],_=i[8],S=s[0],m=s[3],u=s[6],g=s[1],v=s[4],y=s[7],A=s[2],C=s[5],w=s[8];return a[0]=r*S+o*g+l*A,a[3]=r*m+o*v+l*C,a[6]=r*u+o*y+l*w,a[1]=c*S+f*g+d*A,a[4]=c*m+f*v+d*C,a[7]=c*u+f*y+d*w,a[2]=h*S+p*g+_*A,a[5]=h*m+p*v+_*C,a[8]=h*u+p*y+_*w,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],f=t[8];return n*r*f-n*o*c-i*a*f+i*o*l+s*a*c-s*r*l}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],f=t[8],d=f*r-o*c,h=o*l-f*a,p=c*a-r*l,_=n*d+i*h+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let S=1/_;return t[0]=d*S,t[1]=(s*c-f*i)*S,t[2]=(o*i-s*r)*S,t[3]=h*S,t[4]=(f*n-s*l)*S,t[5]=(s*a-o*n)*S,t[6]=p*S,t[7]=(i*l-c*n)*S,t[8]=(r*n-i*a)*S,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,a,r,o){let l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-s*c,s*l,-s*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(eg.makeScale(t,n)),this}rotate(t){return this.premultiply(eg.makeRotation(-t)),this}translate(t,n){return this.premultiply(eg.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},eg=new Pt;function Xg(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Zl(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function kM(){let e=Zl("canvas");return e.style.display="block",e}var FS={};function To(e){e in FS||(FS[e]=!0,console.warn(e))}function XM(e,t,n){return new Promise(function(i,s){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}var HS=new Pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),VS=new Pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function dA(){let e={enabled:!0,workingColorSpace:Qa,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===oe&&(s.r=_s(s.r),s.g=_s(s.g),s.b=_s(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===oe&&(s.r=Mo(s.r),s.g=Mo(s.g),s.b=Mo(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===bs?ql:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return To("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return To("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,a)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Qa]:{primaries:t,whitePoint:i,transfer:ql,toXYZ:HS,fromXYZ:VS,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Wn},outputColorSpaceConfig:{drawingBufferColorSpace:Wn}},[Wn]:{primaries:t,whitePoint:i,transfer:oe,toXYZ:HS,fromXYZ:VS,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Wn}}}),e}var Zt=dA();function _s(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Mo(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var co,Dh=class{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{co===void 0&&(co=Zl("canvas")),co.width=t.width,co.height=t.height;let s=co.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=co}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=Zl("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=_s(a[r]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(_s(n[i]/255)*255):n[i]=_s(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},pA=0,Eo=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:pA++}),this.uuid=fc(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(ng(s[r].image)):a.push(ng(s[r]))}else a=ng(s);i.url=a}return n||(t.images[this.uuid]=i),i}};function ng(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Dh.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var mA=0,ig=new z,Yn=class e extends ys{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=la,s=la,a=Mi,r=pa,o=hi,l=qi,c=e.DEFAULT_ANISOTROPY,f=bs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mA++}),this.uuid=fc(),this.name="",this.source=new Eo(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new $t(0,0),this.repeat=new $t(1,1),this.center=new $t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ig).x}get height(){return this.source.getSize(ig).y}get depth(){return this.source.getSize(ig).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let n in t){let i=t[n];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Lg)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ah:t.x=t.x-Math.floor(t.x);break;case la:t.x=t.x<0?0:1;break;case wh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ah:t.y=t.y-Math.floor(t.y);break;case la:t.y=t.y<0?0:1;break;case wh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Yn.DEFAULT_IMAGE=null;Yn.DEFAULT_MAPPING=Lg;Yn.DEFAULT_ANISOTROPY=1;var Ne=class e{constructor(t=0,n=0,i=0,s=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*n+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*n+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*n+r[7]*i+r[11]*s+r[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,a,l=t.elements,c=l[0],f=l[4],d=l[8],h=l[1],p=l[5],_=l[9],S=l[2],m=l[6],u=l[10];if(Math.abs(f-h)<.01&&Math.abs(d-S)<.01&&Math.abs(_-m)<.01){if(Math.abs(f+h)<.1&&Math.abs(d+S)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let v=(c+1)/2,y=(p+1)/2,A=(u+1)/2,C=(f+h)/4,w=(d+S)/4,D=(_+m)/4;return v>y&&v>A?v<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(v),s=C/i,a=w/i):y>A?y<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(y),i=C/s,a=D/s):A<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(A),i=w/a,s=D/a),this.set(i,s,a,n),this}let g=Math.sqrt((m-_)*(m-_)+(d-S)*(d-S)+(h-f)*(h-f));return Math.abs(g)<.001&&(g=1),this.x=(m-_)/g,this.y=(d-S)/g,this.z=(h-f)/g,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=qt(this.x,t.x,n.x),this.y=qt(this.y,t.y,n.y),this.z=qt(this.z,t.z,n.z),this.w=qt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=qt(this.x,t,n),this.y=qt(this.y,t,n),this.z=qt(this.z,t,n),this.w=qt(this.w,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Uh=class extends ys{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Ne(0,0,t,n),this.scissorTest=!1,this.viewport=new Ne(0,0,t,n);let s={width:t,height:n,depth:i.depth},a=new Yn(s);this.textures=[];let r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){let n={minFilter:Mi,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let s=Object.assign({},t.textures[n].image);this.textures[n].source=new Eo(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gi=class extends Uh{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},Jl=class extends Yn{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=ci,this.minFilter=ci,this.wrapR=la,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Nh=class extends Yn{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=ci,this.minFilter=ci,this.wrapR=la,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ua=class{constructor(t=new z(1/0,1/0,1/0),n=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(vi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(vi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=vi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let a=i.getAttribute("position");if(n===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,vi):vi.fromBufferAttribute(a,r),vi.applyMatrix4(t.matrixWorld),this.expandByPoint(vi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ah.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ah.copy(i.boundingBox)),ah.applyMatrix4(t.matrixWorld),this.union(ah)}let s=t.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,vi),vi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Vl),rh.subVectors(this.max,Vl),uo.subVectors(t.a,Vl),ho.subVectors(t.b,Vl),fo.subVectors(t.c,Vl),ea.subVectors(ho,uo),na.subVectors(fo,ho),ka.subVectors(uo,fo);let n=[0,-ea.z,ea.y,0,-na.z,na.y,0,-ka.z,ka.y,ea.z,0,-ea.x,na.z,0,-na.x,ka.z,0,-ka.x,-ea.y,ea.x,0,-na.y,na.x,0,-ka.y,ka.x,0];return!sg(n,uo,ho,fo,rh)||(n=[1,0,0,0,1,0,0,0,1],!sg(n,uo,ho,fo,rh))?!1:(oh.crossVectors(ea,na),n=[oh.x,oh.y,oh.z],sg(n,uo,ho,fo,rh))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,vi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(vi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(fs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),fs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),fs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),fs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),fs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),fs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),fs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),fs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(fs),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},fs=[new z,new z,new z,new z,new z,new z,new z,new z],vi=new z,ah=new ua,uo=new z,ho=new z,fo=new z,ea=new z,na=new z,ka=new z,Vl=new z,rh=new z,oh=new z,Xa=new z;function sg(e,t,n,i,s){for(let a=0,r=e.length-3;a<=r;a+=3){Xa.fromArray(e,a);let o=s.x*Math.abs(Xa.x)+s.y*Math.abs(Xa.y)+s.z*Math.abs(Xa.z),l=t.dot(Xa),c=n.dot(Xa),f=i.dot(Xa);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}var gA=new ua,Gl=new z,ag=new z,Ao=class{constructor(t=new z,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):gA.setFromPoints(t).getCenter(i);let s=0;for(let a=0,r=t.length;a<r;a++)s=Math.max(s,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gl.subVectors(t,this.center);let n=Gl.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(Gl,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ag.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gl.copy(t.center).add(ag)),this.expandByPoint(Gl.copy(t.center).sub(ag))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},ds=new z,rg=new z,lh=new z,ia=new z,og=new z,ch=new z,lg=new z,Lh=class{constructor(t=new z,n=new z(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ds)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=ds.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(ds.copy(this.origin).addScaledVector(this.direction,n),ds.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){rg.copy(t).add(n).multiplyScalar(.5),lh.copy(n).sub(t).normalize(),ia.copy(this.origin).sub(rg);let a=t.distanceTo(n)*.5,r=-this.direction.dot(lh),o=ia.dot(this.direction),l=-ia.dot(lh),c=ia.lengthSq(),f=Math.abs(1-r*r),d,h,p,_;if(f>0)if(d=r*l-o,h=r*o-l,_=a*f,d>=0)if(h>=-_)if(h<=_){let S=1/f;d*=S,h*=S,p=d*(d+r*h+2*o)+h*(r*d+h+2*l)+c}else h=a,d=Math.max(0,-(r*h+o)),p=-d*d+h*(h+2*l)+c;else h=-a,d=Math.max(0,-(r*h+o)),p=-d*d+h*(h+2*l)+c;else h<=-_?(d=Math.max(0,-(-r*a+o)),h=d>0?-a:Math.min(Math.max(-a,-l),a),p=-d*d+h*(h+2*l)+c):h<=_?(d=0,h=Math.min(Math.max(-a,-l),a),p=h*(h+2*l)+c):(d=Math.max(0,-(r*a+o)),h=d>0?a:Math.min(Math.max(-a,-l),a),p=-d*d+h*(h+2*l)+c);else h=r>0?-a:a,d=Math.max(0,-(r*h+o)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(rg).addScaledVector(lh,h),p}intersectSphere(t,n){ds.subVectors(t.center,this.origin);let i=ds.dot(this.direction),s=ds.dot(ds)-i*i,a=t.radius*t.radius;if(s>a)return null;let r=Math.sqrt(a-s),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,a,r,o,l,c=1/this.direction.x,f=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),f>=0?(a=(t.min.y-h.y)*f,r=(t.max.y-h.y)*f):(a=(t.max.y-h.y)*f,r=(t.min.y-h.y)*f),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),d>=0?(o=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(o=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,ds)!==null}intersectTriangle(t,n,i,s,a){og.subVectors(n,t),ch.subVectors(i,t),lg.crossVectors(og,ch);let r=this.direction.dot(lg),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;ia.subVectors(this.origin,t);let l=o*this.direction.dot(ch.crossVectors(ia,ch));if(l<0)return null;let c=o*this.direction.dot(og.cross(ia));if(c<0||l+c>r)return null;let f=-o*ia.dot(lg);return f<0?null:this.at(f/r,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ge=class e{constructor(t,n,i,s,a,r,o,l,c,f,d,h,p,_,S,m){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c,f,d,h,p,_,S,m)}set(t,n,i,s,a,r,o,l,c,f,d,h,p,_,S,m){let u=this.elements;return u[0]=t,u[4]=n,u[8]=i,u[12]=s,u[1]=a,u[5]=r,u[9]=o,u[13]=l,u[2]=c,u[6]=f,u[10]=d,u[14]=h,u[3]=p,u[7]=_,u[11]=S,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){let n=this.elements,i=t.elements,s=1/po.setFromMatrixColumn(t,0).length(),a=1/po.setFromMatrixColumn(t,1).length(),r=1/po.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,s=t.y,a=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),f=Math.cos(a),d=Math.sin(a);if(t.order==="XYZ"){let h=r*f,p=r*d,_=o*f,S=o*d;n[0]=l*f,n[4]=-l*d,n[8]=c,n[1]=p+_*c,n[5]=h-S*c,n[9]=-o*l,n[2]=S-h*c,n[6]=_+p*c,n[10]=r*l}else if(t.order==="YXZ"){let h=l*f,p=l*d,_=c*f,S=c*d;n[0]=h+S*o,n[4]=_*o-p,n[8]=r*c,n[1]=r*d,n[5]=r*f,n[9]=-o,n[2]=p*o-_,n[6]=S+h*o,n[10]=r*l}else if(t.order==="ZXY"){let h=l*f,p=l*d,_=c*f,S=c*d;n[0]=h-S*o,n[4]=-r*d,n[8]=_+p*o,n[1]=p+_*o,n[5]=r*f,n[9]=S-h*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){let h=r*f,p=r*d,_=o*f,S=o*d;n[0]=l*f,n[4]=_*c-p,n[8]=h*c+S,n[1]=l*d,n[5]=S*c+h,n[9]=p*c-_,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){let h=r*l,p=r*c,_=o*l,S=o*c;n[0]=l*f,n[4]=S-h*d,n[8]=_*d+p,n[1]=d,n[5]=r*f,n[9]=-o*f,n[2]=-c*f,n[6]=p*d+_,n[10]=h-S*d}else if(t.order==="XZY"){let h=r*l,p=r*c,_=o*l,S=o*c;n[0]=l*f,n[4]=-d,n[8]=c*f,n[1]=h*d+S,n[5]=r*f,n[9]=p*d-_,n[2]=_*d-p,n[6]=o*f,n[10]=S*d+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(_A,t,vA)}lookAt(t,n,i){let s=this.elements;return kn.subVectors(t,n),kn.lengthSq()===0&&(kn.z=1),kn.normalize(),sa.crossVectors(i,kn),sa.lengthSq()===0&&(Math.abs(i.z)===1?kn.x+=1e-4:kn.z+=1e-4,kn.normalize(),sa.crossVectors(i,kn)),sa.normalize(),uh.crossVectors(kn,sa),s[0]=sa.x,s[4]=uh.x,s[8]=kn.x,s[1]=sa.y,s[5]=uh.y,s[9]=kn.y,s[2]=sa.z,s[6]=uh.z,s[10]=kn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],f=i[1],d=i[5],h=i[9],p=i[13],_=i[2],S=i[6],m=i[10],u=i[14],g=i[3],v=i[7],y=i[11],A=i[15],C=s[0],w=s[4],D=s[8],T=s[12],b=s[1],N=s[5],F=s[9],G=s[13],q=s[2],J=s[6],W=s[10],nt=s[14],H=s[3],rt=s[7],ut=s[11],bt=s[15];return a[0]=r*C+o*b+l*q+c*H,a[4]=r*w+o*N+l*J+c*rt,a[8]=r*D+o*F+l*W+c*ut,a[12]=r*T+o*G+l*nt+c*bt,a[1]=f*C+d*b+h*q+p*H,a[5]=f*w+d*N+h*J+p*rt,a[9]=f*D+d*F+h*W+p*ut,a[13]=f*T+d*G+h*nt+p*bt,a[2]=_*C+S*b+m*q+u*H,a[6]=_*w+S*N+m*J+u*rt,a[10]=_*D+S*F+m*W+u*ut,a[14]=_*T+S*G+m*nt+u*bt,a[3]=g*C+v*b+y*q+A*H,a[7]=g*w+v*N+y*J+A*rt,a[11]=g*D+v*F+y*W+A*ut,a[15]=g*T+v*G+y*nt+A*bt,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],s=t[8],a=t[12],r=t[1],o=t[5],l=t[9],c=t[13],f=t[2],d=t[6],h=t[10],p=t[14],_=t[3],S=t[7],m=t[11],u=t[15];return _*(+a*l*d-s*c*d-a*o*h+i*c*h+s*o*p-i*l*p)+S*(+n*l*p-n*c*h+a*r*h-s*r*p+s*c*f-a*l*f)+m*(+n*c*d-n*o*p-a*r*d+i*r*p+a*o*f-i*c*f)+u*(-s*o*f-n*l*d+n*o*h+s*r*d-i*r*h+i*l*f)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],f=t[8],d=t[9],h=t[10],p=t[11],_=t[12],S=t[13],m=t[14],u=t[15],g=d*m*c-S*h*c+S*l*p-o*m*p-d*l*u+o*h*u,v=_*h*c-f*m*c-_*l*p+r*m*p+f*l*u-r*h*u,y=f*S*c-_*d*c+_*o*p-r*S*p-f*o*u+r*d*u,A=_*d*l-f*S*l-_*o*h+r*S*h+f*o*m-r*d*m,C=n*g+i*v+s*y+a*A;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/C;return t[0]=g*w,t[1]=(S*h*a-d*m*a-S*s*p+i*m*p+d*s*u-i*h*u)*w,t[2]=(o*m*a-S*l*a+S*s*c-i*m*c-o*s*u+i*l*u)*w,t[3]=(d*l*a-o*h*a-d*s*c+i*h*c+o*s*p-i*l*p)*w,t[4]=v*w,t[5]=(f*m*a-_*h*a+_*s*p-n*m*p-f*s*u+n*h*u)*w,t[6]=(_*l*a-r*m*a-_*s*c+n*m*c+r*s*u-n*l*u)*w,t[7]=(r*h*a-f*l*a+f*s*c-n*h*c-r*s*p+n*l*p)*w,t[8]=y*w,t[9]=(_*d*a-f*S*a-_*i*p+n*S*p+f*i*u-n*d*u)*w,t[10]=(r*S*a-_*o*a+_*i*c-n*S*c-r*i*u+n*o*u)*w,t[11]=(f*o*a-r*d*a-f*i*c+n*d*c+r*i*p-n*o*p)*w,t[12]=A*w,t[13]=(f*S*s-_*d*s+_*i*h-n*S*h-f*i*m+n*d*m)*w,t[14]=(_*o*s-r*S*s-_*i*l+n*S*l+r*i*m-n*o*m)*w,t[15]=(r*d*s-f*o*s+f*i*l-n*d*l-r*i*h+n*o*h)*w,this}scale(t){let n=this.elements,i=t.x,s=t.y,a=t.z;return n[0]*=i,n[4]*=s,n[8]*=a,n[1]*=i,n[5]*=s,n[9]*=a,n[2]*=i,n[6]*=s,n[10]*=a,n[3]*=i,n[7]*=s,n[11]*=a,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),s=Math.sin(n),a=1-i,r=t.x,o=t.y,l=t.z,c=a*r,f=a*o;return this.set(c*r+i,c*o-s*l,c*l+s*o,0,c*o+s*l,f*o+i,f*l-s*r,0,c*l-s*o,f*l+s*r,a*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,a,r){return this.set(1,i,a,0,t,1,r,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){let s=this.elements,a=n._x,r=n._y,o=n._z,l=n._w,c=a+a,f=r+r,d=o+o,h=a*c,p=a*f,_=a*d,S=r*f,m=r*d,u=o*d,g=l*c,v=l*f,y=l*d,A=i.x,C=i.y,w=i.z;return s[0]=(1-(S+u))*A,s[1]=(p+y)*A,s[2]=(_-v)*A,s[3]=0,s[4]=(p-y)*C,s[5]=(1-(h+u))*C,s[6]=(m+g)*C,s[7]=0,s[8]=(_+v)*w,s[9]=(m-g)*w,s[10]=(1-(h+S))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){let s=this.elements,a=po.set(s[0],s[1],s[2]).length(),r=po.set(s[4],s[5],s[6]).length(),o=po.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),t.x=s[12],t.y=s[13],t.z=s[14],yi.copy(this);let c=1/a,f=1/r,d=1/o;return yi.elements[0]*=c,yi.elements[1]*=c,yi.elements[2]*=c,yi.elements[4]*=f,yi.elements[5]*=f,yi.elements[6]*=f,yi.elements[8]*=d,yi.elements[9]*=d,yi.elements[10]*=d,n.setFromRotationMatrix(yi),i.x=a,i.y=r,i.z=o,this}makePerspective(t,n,i,s,a,r,o=Si,l=!1){let c=this.elements,f=2*a/(n-t),d=2*a/(i-s),h=(n+t)/(n-t),p=(i+s)/(i-s),_,S;if(l)_=a/(r-a),S=r*a/(r-a);else if(o===Si)_=-(r+a)/(r-a),S=-2*r*a/(r-a);else if(o===Yl)_=-r/(r-a),S=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,s,a,r,o=Si,l=!1){let c=this.elements,f=2/(n-t),d=2/(i-s),h=-(n+t)/(n-t),p=-(i+s)/(i-s),_,S;if(l)_=1/(r-a),S=r/(r-a);else if(o===Si)_=-2/(r-a),S=-(r+a)/(r-a);else if(o===Yl)_=-1/(r-a),S=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}},po=new z,yi=new Ge,_A=new z(0,0,0),vA=new z(1,1,1),sa=new z,uh=new z,kn=new z,GS=new Ge,kS=new xs,ki=class e{constructor(t=0,n=0,i=0,s=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let s=t.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],f=s[9],d=s[2],h=s[6],p=s[10];switch(n){case"XYZ":this._y=Math.asin(qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-qt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-qt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-f,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return GS.makeRotationFromQuaternion(t),this.setFromRotationMatrix(GS,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return kS.setFromEuler(this),this.setFromQuaternion(kS,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ki.DEFAULT_ORDER="XYZ";var Kl=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},yA=0,XS=new z,mo=new xs,ps=new Ge,hh=new z,kl=new z,xA=new z,SA=new xs,WS=new z(1,0,0),qS=new z(0,1,0),YS=new z(0,0,1),ZS={type:"added"},MA={type:"removed"},go={type:"childadded",child:null},cg={type:"childremoved",child:null},ui=class e extends ys{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yA++}),this.uuid=fc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new z,n=new ki,i=new xs,s=new z(1,1,1);function a(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ge},normalMatrix:{value:new Pt}}),this.matrix=new Ge,this.matrixWorld=new Ge,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return mo.setFromAxisAngle(t,n),this.quaternion.multiply(mo),this}rotateOnWorldAxis(t,n){return mo.setFromAxisAngle(t,n),this.quaternion.premultiply(mo),this}rotateX(t){return this.rotateOnAxis(WS,t)}rotateY(t){return this.rotateOnAxis(qS,t)}rotateZ(t){return this.rotateOnAxis(YS,t)}translateOnAxis(t,n){return XS.copy(t).applyQuaternion(this.quaternion),this.position.add(XS.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(WS,t)}translateY(t){return this.translateOnAxis(qS,t)}translateZ(t){return this.translateOnAxis(YS,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ps.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?hh.copy(t):hh.set(t,n,i);let s=this.parent;this.updateWorldMatrix(!0,!1),kl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ps.lookAt(kl,hh,this.up):ps.lookAt(hh,kl,this.up),this.quaternion.setFromRotationMatrix(ps),s&&(ps.extractRotation(s.matrixWorld),mo.setFromRotationMatrix(ps),this.quaternion.premultiply(mo.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ZS),go.child=t,this.dispatchEvent(go),go.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(MA),cg.child=t,this.dispatchEvent(cg),cg.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ps.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ps.multiply(t.parent.matrixWorld)),t.applyMatrix4(ps),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ZS),go.child=t,this.dispatchEvent(go),go.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){let r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kl,t,xA),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kl,SA,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){let d=l[c];a(t.shapes,d)}else a(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(t.materials,this.material[l]));s.material=o}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(a(t.animations,l))}}if(n){let o=r(t.geometries),l=r(t.materials),c=r(t.textures),f=r(t.images),d=r(t.shapes),h=r(t.skeletons),p=r(t.animations),_=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=s,i;function r(o){let l=[];for(let c in o){let f=o[c];delete f.metadata,l.push(f)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};ui.DEFAULT_UP=new z(0,1,0);ui.DEFAULT_MATRIX_AUTO_UPDATE=!0;ui.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var xi=new z,ms=new z,ug=new z,gs=new z,_o=new z,vo=new z,JS=new z,hg=new z,fg=new z,dg=new z,pg=new Ne,mg=new Ne,gg=new Ne,oa=class e{constructor(t=new z,n=new z,i=new z){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),xi.subVectors(t,n),s.cross(xi);let a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,n,i,s,a){xi.subVectors(s,n),ms.subVectors(i,n),ug.subVectors(t,n);let r=xi.dot(xi),o=xi.dot(ms),l=xi.dot(ug),c=ms.dot(ms),f=ms.dot(ug),d=r*c-o*o;if(d===0)return a.set(0,0,0),null;let h=1/d,p=(c*l-o*f)*h,_=(r*f-o*l)*h;return a.set(1-p-_,_,p)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,gs)===null?!1:gs.x>=0&&gs.y>=0&&gs.x+gs.y<=1}static getInterpolation(t,n,i,s,a,r,o,l){return this.getBarycoord(t,n,i,s,gs)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,gs.x),l.addScaledVector(r,gs.y),l.addScaledVector(o,gs.z),l)}static getInterpolatedAttribute(t,n,i,s,a,r){return pg.setScalar(0),mg.setScalar(0),gg.setScalar(0),pg.fromBufferAttribute(t,n),mg.fromBufferAttribute(t,i),gg.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(pg,a.x),r.addScaledVector(mg,a.y),r.addScaledVector(gg,a.z),r}static isFrontFacing(t,n,i,s){return xi.subVectors(i,n),ms.subVectors(t,n),xi.cross(ms).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return xi.subVectors(this.c,this.b),ms.subVectors(this.a,this.b),xi.cross(ms).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,a){return e.getInterpolation(t,this.a,this.b,this.c,n,i,s,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,s=this.b,a=this.c,r,o;_o.subVectors(s,i),vo.subVectors(a,i),hg.subVectors(t,i);let l=_o.dot(hg),c=vo.dot(hg);if(l<=0&&c<=0)return n.copy(i);fg.subVectors(t,s);let f=_o.dot(fg),d=vo.dot(fg);if(f>=0&&d<=f)return n.copy(s);let h=l*d-f*c;if(h<=0&&l>=0&&f<=0)return r=l/(l-f),n.copy(i).addScaledVector(_o,r);dg.subVectors(t,a);let p=_o.dot(dg),_=vo.dot(dg);if(_>=0&&p<=_)return n.copy(a);let S=p*c-l*_;if(S<=0&&c>=0&&_<=0)return o=c/(c-_),n.copy(i).addScaledVector(vo,o);let m=f*_-p*d;if(m<=0&&d-f>=0&&p-_>=0)return JS.subVectors(a,s),o=(d-f)/(d-f+(p-_)),n.copy(s).addScaledVector(JS,o);let u=1/(m+S+h);return r=S*u,o=h*u,n.copy(i).addScaledVector(_o,r).addScaledVector(vo,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},WM={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},aa={h:0,s:0,l:0},fh={h:0,s:0,l:0};function _g(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var te=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Wn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=Zt.workingColorSpace){return this.r=t,this.g=n,this.b=i,Zt.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=Zt.workingColorSpace){if(t=fA(t,1),n=qt(n,0,1),i=qt(i,0,1),n===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+n):i+n-i*n,r=2*i-a;this.r=_g(r,a,t+1/3),this.g=_g(r,a,t),this.b=_g(r,a,t-1/3)}return Zt.colorSpaceToWorking(this,s),this}setStyle(t,n=Wn){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a,r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(a,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Wn){let i=WM[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=_s(t.r),this.g=_s(t.g),this.b=_s(t.b),this}copyLinearToSRGB(t){return this.r=Mo(t.r),this.g=Mo(t.g),this.b=Mo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Wn){return Zt.workingToColorSpace(un.copy(this),t),Math.round(qt(un.r*255,0,255))*65536+Math.round(qt(un.g*255,0,255))*256+Math.round(qt(un.b*255,0,255))}getHexString(t=Wn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Zt.workingColorSpace){Zt.workingToColorSpace(un.copy(this),n);let i=un.r,s=un.g,a=un.b,r=Math.max(i,s,a),o=Math.min(i,s,a),l,c,f=(o+r)/2;if(o===r)l=0,c=0;else{let d=r-o;switch(c=f<=.5?d/(r+o):d/(2-r-o),r){case i:l=(s-a)/d+(s<a?6:0);break;case s:l=(a-i)/d+2;break;case a:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=f,t}getRGB(t,n=Zt.workingColorSpace){return Zt.workingToColorSpace(un.copy(this),n),t.r=un.r,t.g=un.g,t.b=un.b,t}getStyle(t=Wn){Zt.workingToColorSpace(un.copy(this),t);let n=un.r,i=un.g,s=un.b;return t!==Wn?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(aa),this.setHSL(aa.h+t,aa.s+n,aa.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(aa),t.getHSL(fh);let i=$m(aa.h,fh.h,n),s=$m(aa.s,fh.s,n),a=$m(aa.l,fh.l,n);return this.setHSL(i,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,s=this.b,a=t.elements;return this.r=a[0]*n+a[3]*i+a[6]*s,this.g=a[1]*n+a[4]*i+a[7]*s,this.b=a[2]*n+a[5]*i+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},un=new te;te.NAMES=WM;var bA=0,ja=class extends ys{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bA++}),this.uuid=fc(),this.name="",this.type="Material",this.blending=Ja,this.side=vs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Th,this.blendDst=Eh,this.blendEquation=ca,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=Ka,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ya,this.stencilZFail=Ya,this.stencilZPass=Ya,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ja&&(i.blending=this.blending),this.side!==vs&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Th&&(i.blendSrc=this.blendSrc),this.blendDst!==Eh&&(i.blendDst=this.blendDst),this.blendEquation!==ca&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ka&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tg&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ya&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ya&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ya&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){let r=[];for(let o in a){let l=a[o];delete l.metadata,r.push(l)}return r}if(n){let a=s(t.textures),r=s(t.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let s=n.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Ql=class extends ja{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=Ng,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Be=new z,dh=new $t,TA=0,qn=class{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:TA++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=Eg,this.updateRanges=[],this.gpuType=Yi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)dh.fromBufferAttribute(this,n),dh.applyMatrix3(t),this.setXY(n,dh.x,dh.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Be.fromBufferAttribute(this,n),Be.applyMatrix3(t),this.setXYZ(n,Be.x,Be.y,Be.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Be.fromBufferAttribute(this,n),Be.applyMatrix4(t),this.setXYZ(n,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Be.fromBufferAttribute(this,n),Be.applyNormalMatrix(t),this.setXYZ(n,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Be.fromBufferAttribute(this,n),Be.transformDirection(t),this.setXYZ(n,Be.x,Be.y,Be.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=Hl(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=wn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Hl(n,this.array)),n}setX(t,n){return this.normalized&&(n=wn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Hl(n,this.array)),n}setY(t,n){return this.normalized&&(n=wn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Hl(n,this.array)),n}setZ(t,n){return this.normalized&&(n=wn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Hl(n,this.array)),n}setW(t,n){return this.normalized&&(n=wn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=wn(n,this.array),i=wn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=wn(n,this.array),i=wn(i,this.array),s=wn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,a){return t*=this.itemSize,this.normalized&&(n=wn(n,this.array),i=wn(i,this.array),s=wn(s,this.array),a=wn(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Eg&&(t.usage=this.usage),t}};var jl=class extends qn{constructor(t,n,i){super(new Uint16Array(t),n,i)}};var $l=class extends qn{constructor(t,n,i){super(new Uint32Array(t),n,i)}};var Vi=class extends qn{constructor(t,n,i){super(new Float32Array(t),n,i)}},EA=0,li=new Ge,vg=new ui,yo=new z,Xn=new ua,Xl=new ua,Ke=new z,ha=class e extends ys{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:EA++}),this.uuid=fc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Xg(t)?$l:jl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new Pt().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return li.makeRotationFromQuaternion(t),this.applyMatrix4(li),this}rotateX(t){return li.makeRotationX(t),this.applyMatrix4(li),this}rotateY(t){return li.makeRotationY(t),this.applyMatrix4(li),this}rotateZ(t){return li.makeRotationZ(t),this.applyMatrix4(li),this}translate(t,n,i){return li.makeTranslation(t,n,i),this.applyMatrix4(li),this}scale(t,n,i){return li.makeScale(t,n,i),this.applyMatrix4(li),this}lookAt(t){return vg.lookAt(t),vg.updateMatrix(),this.applyMatrix4(vg.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yo).negate(),this.translate(yo.x,yo.y,yo.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let s=0,a=t.length;s<a;s++){let r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Vi(i,3))}else{let i=Math.min(t.length,n.count);for(let s=0;s<i;s++){let a=t[s];n.setXYZ(s,a.x,a.y,a.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ua);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){let a=n[i];Xn.setFromBufferAttribute(a),this.morphTargetsRelative?(Ke.addVectors(this.boundingBox.min,Xn.min),this.boundingBox.expandByPoint(Ke),Ke.addVectors(this.boundingBox.max,Xn.max),this.boundingBox.expandByPoint(Ke)):(this.boundingBox.expandByPoint(Xn.min),this.boundingBox.expandByPoint(Xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ao);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){let i=this.boundingSphere.center;if(Xn.setFromBufferAttribute(t),n)for(let a=0,r=n.length;a<r;a++){let o=n[a];Xl.setFromBufferAttribute(o),this.morphTargetsRelative?(Ke.addVectors(Xn.min,Xl.min),Xn.expandByPoint(Ke),Ke.addVectors(Xn.max,Xl.max),Xn.expandByPoint(Ke)):(Xn.expandByPoint(Xl.min),Xn.expandByPoint(Xl.max))}Xn.getCenter(i);let s=0;for(let a=0,r=t.count;a<r;a++)Ke.fromBufferAttribute(t,a),s=Math.max(s,i.distanceToSquared(Ke));if(n)for(let a=0,r=n.length;a<r;a++){let o=n[a],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)Ke.fromBufferAttribute(o,c),l&&(yo.fromBufferAttribute(t,c),Ke.add(yo)),s=Math.max(s,i.distanceToSquared(Ke))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,s=n.normal,a=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qn(new Float32Array(4*i.count),4));let r=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<i.count;D++)o[D]=new z,l[D]=new z;let c=new z,f=new z,d=new z,h=new $t,p=new $t,_=new $t,S=new z,m=new z;function u(D,T,b){c.fromBufferAttribute(i,D),f.fromBufferAttribute(i,T),d.fromBufferAttribute(i,b),h.fromBufferAttribute(a,D),p.fromBufferAttribute(a,T),_.fromBufferAttribute(a,b),f.sub(c),d.sub(c),p.sub(h),_.sub(h);let N=1/(p.x*_.y-_.x*p.y);isFinite(N)&&(S.copy(f).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(N),m.copy(d).multiplyScalar(p.x).addScaledVector(f,-_.x).multiplyScalar(N),o[D].add(S),o[T].add(S),o[b].add(S),l[D].add(m),l[T].add(m),l[b].add(m))}let g=this.groups;g.length===0&&(g=[{start:0,count:t.count}]);for(let D=0,T=g.length;D<T;++D){let b=g[D],N=b.start,F=b.count;for(let G=N,q=N+F;G<q;G+=3)u(t.getX(G+0),t.getX(G+1),t.getX(G+2))}let v=new z,y=new z,A=new z,C=new z;function w(D){A.fromBufferAttribute(s,D),C.copy(A);let T=o[D];v.copy(T),v.sub(A.multiplyScalar(A.dot(T))).normalize(),y.crossVectors(C,T);let N=y.dot(l[D])<0?-1:1;r.setXYZW(D,v.x,v.y,v.z,N)}for(let D=0,T=g.length;D<T;++D){let b=g[D],N=b.start,F=b.count;for(let G=N,q=N+F;G<q;G+=3)w(t.getX(G+0)),w(t.getX(G+1)),w(t.getX(G+2))}}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new qn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);let s=new z,a=new z,r=new z,o=new z,l=new z,c=new z,f=new z,d=new z;if(t)for(let h=0,p=t.count;h<p;h+=3){let _=t.getX(h+0),S=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(n,_),a.fromBufferAttribute(n,S),r.fromBufferAttribute(n,m),f.subVectors(r,a),d.subVectors(s,a),f.cross(d),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,m),o.add(f),l.add(f),c.add(f),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=n.count;h<p;h+=3)s.fromBufferAttribute(n,h+0),a.fromBufferAttribute(n,h+1),r.fromBufferAttribute(n,h+2),f.subVectors(r,a),d.subVectors(s,a),f.cross(d),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)Ke.fromBufferAttribute(t,n),Ke.normalize(),t.setXYZ(n,Ke.x,Ke.y,Ke.z)}toNonIndexed(){function t(o,l){let c=o.array,f=o.itemSize,d=o.normalized,h=new c.constructor(l.length*f),p=0,_=0;for(let S=0,m=l.length;S<m;S++){o.isInterleavedBufferAttribute?p=l[S]*o.data.stride+o.offset:p=l[S]*f;for(let u=0;u<f;u++)h[_++]=c[p++]}return new qn(h,f,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);n.setAttribute(o,c)}let a=this.morphAttributes;for(let o in a){let l=[],c=a[o];for(let f=0,d=c.length;f<d;f++){let h=c[f],p=t(h,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,l=r.length;o<l;o++){let c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},a=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],f=[];for(let d=0,h=c.length;d<h;d++){let p=c[d];f.push(p.toJSON(t.data))}f.length>0&&(s[l]=f,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let f=s[c];this.setAttribute(c,f.clone(n))}let a=t.morphAttributes;for(let c in a){let f=[],d=a[c];for(let h=0,p=d.length;h<p;h++)f.push(d[h].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let c=0,f=r.length;c<f;c++){let d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},KS=new Ge,Wa=new Lh,ph=new Ao,QS=new z,mh=new z,gh=new z,_h=new z,yg=new z,vh=new z,jS=new z,yh=new z,Rn=class extends ui{constructor(t=new ha,n=new Ql){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){let o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,n){let i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(a&&o){vh.set(0,0,0);for(let l=0,c=a.length;l<c;l++){let f=o[l],d=a[l];f!==0&&(yg.fromBufferAttribute(d,t),r?vh.addScaledVector(yg,f):vh.addScaledVector(yg.sub(n),f))}n.add(vh)}return n}raycast(t,n){let i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ph.copy(i.boundingSphere),ph.applyMatrix4(a),Wa.copy(t.ray).recast(t.near),!(ph.containsPoint(Wa.origin)===!1&&(Wa.intersectSphere(ph,QS)===null||Wa.origin.distanceToSquared(QS)>(t.far-t.near)**2))&&(KS.copy(a).invert(),Wa.copy(t.ray).applyMatrix4(KS),!(i.boundingBox!==null&&Wa.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Wa)))}_computeIntersections(t,n,i){let s,a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,f=a.attributes.uv1,d=a.attributes.normal,h=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(r))for(let _=0,S=h.length;_<S;_++){let m=h[_],u=r[m.materialIndex],g=Math.max(m.start,p.start),v=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=g,A=v;y<A;y+=3){let C=o.getX(y),w=o.getX(y+1),D=o.getX(y+2);s=xh(this,u,t,i,c,f,d,C,w,D),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{let _=Math.max(0,p.start),S=Math.min(o.count,p.start+p.count);for(let m=_,u=S;m<u;m+=3){let g=o.getX(m),v=o.getX(m+1),y=o.getX(m+2);s=xh(this,r,t,i,c,f,d,g,v,y),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let _=0,S=h.length;_<S;_++){let m=h[_],u=r[m.materialIndex],g=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=g,A=v;y<A;y+=3){let C=y,w=y+1,D=y+2;s=xh(this,u,t,i,c,f,d,C,w,D),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{let _=Math.max(0,p.start),S=Math.min(l.count,p.start+p.count);for(let m=_,u=S;m<u;m+=3){let g=m,v=m+1,y=m+2;s=xh(this,r,t,i,c,f,d,g,v,y),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}}};function AA(e,t,n,i,s,a,r,o){let l;if(t.side===vn?l=i.intersectTriangle(r,a,s,!0,o):l=i.intersectTriangle(s,a,r,t.side===vs,o),l===null)return null;yh.copy(o),yh.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(yh);return c<n.near||c>n.far?null:{distance:c,point:yh.clone(),object:e}}function xh(e,t,n,i,s,a,r,o,l,c){e.getVertexPosition(o,mh),e.getVertexPosition(l,gh),e.getVertexPosition(c,_h);let f=AA(e,t,n,i,mh,gh,_h,jS);if(f){let d=new z;oa.getBarycoord(jS,mh,gh,_h,d),s&&(f.uv=oa.getInterpolatedAttribute(s,o,l,c,d,new $t)),a&&(f.uv1=oa.getInterpolatedAttribute(a,o,l,c,d,new $t)),r&&(f.normal=oa.getInterpolatedAttribute(r,o,l,c,d,new z),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new z,materialIndex:0};oa.getNormal(mh,gh,_h,h.normal),f.face=h,f.barycoord=d}return f}var wo=class e extends ha{constructor(t=1,n=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};let o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);let l=[],c=[],f=[],d=[],h=0,p=0;_("z","y","x",-1,-1,i,n,t,r,a,0),_("z","y","x",1,-1,i,n,-t,r,a,1),_("x","z","y",1,1,t,i,n,s,r,2),_("x","z","y",1,-1,t,i,-n,s,r,3),_("x","y","z",1,-1,t,n,i,s,a,4),_("x","y","z",-1,-1,t,n,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new Vi(c,3)),this.setAttribute("normal",new Vi(f,3)),this.setAttribute("uv",new Vi(d,2));function _(S,m,u,g,v,y,A,C,w,D,T){let b=y/w,N=A/D,F=y/2,G=A/2,q=C/2,J=w+1,W=D+1,nt=0,H=0,rt=new z;for(let ut=0;ut<W;ut++){let bt=ut*N-G;for(let Vt=0;Vt<J;Vt++){let de=Vt*b-F;rt[S]=de*g,rt[m]=bt*v,rt[u]=q,c.push(rt.x,rt.y,rt.z),rt[S]=0,rt[m]=0,rt[u]=C>0?1:-1,f.push(rt.x,rt.y,rt.z),d.push(Vt/w),d.push(1-ut/D),nt+=1}}for(let ut=0;ut<D;ut++)for(let bt=0;bt<w;bt++){let Vt=h+bt+J*ut,de=h+bt+J*(ut+1),Se=h+(bt+1)+J*(ut+1),ee=h+(bt+1)+J*ut;l.push(Vt,de,ee),l.push(de,Se,ee),H+=6}o.addGroup(p,H,T),p+=H,h+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function sr(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let s=e[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone():Array.isArray(s)?t[n][i]=s.slice():t[n][i]=s}}return t}function hn(e){let t={};for(let n=0;n<e.length;n++){let i=sr(e[n]);for(let s in i)t[s]=i[s]}return t}function wA(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Wg(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}var qM={clone:sr,merge:hn},CA=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,RA=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Zn=class extends ja{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=CA,this.fragmentShader=RA,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=sr(t.uniforms),this.uniformsGroups=wA(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let s in this.uniforms){let r=this.uniforms[s].value;r&&r.isTexture?n.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[s]={type:"m4",value:r.toArray()}:n.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}},$a=class extends ui{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ge,this.projectionMatrix=new Ge,this.projectionMatrixInverse=new Ge,this.coordinateSystem=Si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ra=new z,$S=new $t,tM=new $t,Cn=class extends $a{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=Rh*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(jm*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Rh*2*Math.atan(Math.tan(jm*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){ra.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ra.x,ra.y).multiplyScalar(-t/ra.z),ra.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ra.x,ra.y).multiplyScalar(-t/ra.z)}getViewSize(t,n){return this.getViewBounds(t,$S,tM),n.subVectors(tM,$S)}setViewOffset(t,n,i,s,a,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(jm*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,a=-.5*s,r=this.view;if(this.view!==null&&this.view.enabled){let l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,n-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}let o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}},xo=-90,So=1,Oh=class extends ui{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Cn(xo,So,t,n);s.layers=this.layers,this.add(s);let a=new Cn(xo,So,t,n);a.layers=this.layers,this.add(a);let r=new Cn(xo,So,t,n);r.layers=this.layers,this.add(r);let o=new Cn(xo,So,t,n);o.layers=this.layers,this.add(o);let l=new Cn(xo,So,t,n);l.layers=this.layers,this.add(l);let c=new Cn(xo,So,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,s,a,r,o,l]=n;for(let c of n)this.remove(c);if(t===Si)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Yl)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[a,r,o,l,c,f]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(n,a),t.setRenderTarget(i,1,s),t.render(n,r),t.setRenderTarget(i,2,s),t.render(n,o),t.setRenderTarget(i,3,s),t.render(n,l),t.setRenderTarget(i,4,s),t.render(n,c),i.texture.generateMipmaps=S,t.setRenderTarget(i,5,s),t.render(n,f),t.setRenderTarget(d,h,p),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}},tc=class extends Yn{constructor(t=[],n=nr,i,s,a,r,o,l,c,f){super(t,n,i,s,a,r,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ih=class extends Gi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new tc(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new wo(5,5,5),a=new Zn({name:"CubemapFromEquirect",uniforms:sr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:vn,blending:Ss});a.uniforms.tEquirect.value=n;let r=new Rn(s,a),o=n.minFilter;return n.minFilter===pa&&(n.minFilter=Mi),new Oh(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){let a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,s);t.setRenderTarget(a)}},Za=class extends ui{constructor(){super(),this.isGroup=!0,this.type="Group"}},DA={type:"move"},Co=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Za,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Za,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Za,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,a=null,r=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(let S of t.hand.values()){let m=n.getJointPose(S,i),u=this._getHandJoint(c,S);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}let f=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=f.position.distanceTo(d.position),p=.02,_=.005;c.inputState.pinching&&h>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(a=n.getPose(t.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(DA)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new Za;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}};var ec=class extends ui{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ki,this.environmentIntensity=1,this.environmentRotation=new ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}};var xg=new z,UA=new z,NA=new Pt,Hi=class{constructor(t=new z(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let s=xg.subVectors(i,n).cross(UA.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){let i=t.delta(xg),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:n.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||NA.getNormalMatrix(t),s=this.coplanarPoint(xg).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},qa=new Ao,LA=new $t(.5,.5),Sh=new z,nc=class{constructor(t=new Hi,n=new Hi,i=new Hi,s=new Hi,a=new Hi,r=new Hi){this.planes=[t,n,i,s,a,r]}set(t,n,i,s,a,r){let o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Si,i=!1){let s=this.planes,a=t.elements,r=a[0],o=a[1],l=a[2],c=a[3],f=a[4],d=a[5],h=a[6],p=a[7],_=a[8],S=a[9],m=a[10],u=a[11],g=a[12],v=a[13],y=a[14],A=a[15];if(s[0].setComponents(c-r,p-f,u-_,A-g).normalize(),s[1].setComponents(c+r,p+f,u+_,A+g).normalize(),s[2].setComponents(c+o,p+d,u+S,A+v).normalize(),s[3].setComponents(c-o,p-d,u-S,A-v).normalize(),i)s[4].setComponents(l,h,m,y).normalize(),s[5].setComponents(c-l,p-h,u-m,A-y).normalize();else if(s[4].setComponents(c-l,p-h,u-m,A-y).normalize(),n===Si)s[5].setComponents(c+l,p+h,u+m,A+y).normalize();else if(n===Yl)s[5].setComponents(l,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),qa.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),qa.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(qa)}intersectsSprite(t){qa.center.set(0,0,0);let n=LA.distanceTo(t.center);return qa.radius=.7071067811865476+n,qa.applyMatrix4(t.matrixWorld),this.intersectsSphere(qa)}intersectsSphere(t){let n=this.planes,i=t.center,s=-t.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let s=n[i];if(Sh.x=s.normal.x>0?t.max.x:t.min.x,Sh.y=s.normal.y>0?t.max.y:t.min.y,Sh.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Sh)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ic=class extends Yn{constructor(t,n,i=ma,s,a,r,o=ci,l=ci,c,f=bo,d=1){if(f!==bo&&f!==No)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:n,depth:d};super(h,s,a,r,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Eo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},sc=class extends Yn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var tr=class e extends ha{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};let a=t/2,r=n/2,o=Math.floor(i),l=Math.floor(s),c=o+1,f=l+1,d=t/o,h=n/l,p=[],_=[],S=[],m=[];for(let u=0;u<f;u++){let g=u*h-r;for(let v=0;v<c;v++){let y=v*d-a;_.push(y,-g,0),S.push(0,0,1),m.push(v/o),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let g=0;g<o;g++){let v=g+c*u,y=g+c*(u+1),A=g+1+c*(u+1),C=g+1+c*u;p.push(v,y,C),p.push(y,A,C)}this.setIndex(p),this.setAttribute("position",new Vi(_,3)),this.setAttribute("normal",new Vi(S,3)),this.setAttribute("uv",new Vi(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};var Ph=class extends ja{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=NM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},zh=class extends ja{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Mh(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function OA(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var er=class{constructor(t,n,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,s=n[i],a=n[i-1];t:{e:{let r;n:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<a)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(a=s,s=n[++i],t<s)break e}r=n.length;break n}if(!(t>=a)){let o=n[1];t<o&&(i=2,a=o);for(let l=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=a,a=n[--i-1],t>=a)break e}r=i,i=0;break n}break t}for(;i<r;){let o=i+r>>>1;t<n[o]?r=o:i=o+1}if(s=n[i],a=n[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,s)}return this.interpolate_(i,a,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,s=this.valueSize,a=t*s;for(let r=0;r!==s;++r)n[r]=i[a+r];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Bh=class extends er{constructor(t,n,i,s){super(t,n,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Sg,endingEnd:Sg}}intervalChanged_(t,n,i){let s=this.parameterPositions,a=t-2,r=t+1,o=s[a],l=s[r];if(o===void 0)switch(this.getSettings_().endingStart){case Mg:a=t,o=2*n-i;break;case bg:a=s.length-2,o=n+s[a]-s[a+1];break;default:a=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Mg:r=t,l=2*i-n;break;case bg:r=1,l=i+s[1]-s[0];break;default:r=t-1,l=n}let c=(i-n)*.5,f=this.valueSize;this._weightPrev=c/(n-o),this._weightNext=c/(l-i),this._offsetPrev=a*f,this._offsetNext=r*f}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,f=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,p=this._weightNext,_=(i-n)/(s-n),S=_*_,m=S*_,u=-h*m+2*h*S-h*_,g=(1+h)*m+(-1.5-2*h)*S+(-.5+h)*_+1,v=(-1-p)*m+(1.5+p)*S+.5*_,y=p*m-p*S;for(let A=0;A!==o;++A)a[A]=u*r[f+A]+g*r[c+A]+v*r[l+A]+y*r[d+A];return a}},Fh=class extends er{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,f=(i-n)/(s-n),d=1-f;for(let h=0;h!==o;++h)a[h]=r[c+h]*d+r[l+h]*f;return a}},Hh=class extends er{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Jn=class{constructor(t,n,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Mh(n,this.TimeBufferType),this.values=Mh(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:Mh(t.times,Array),values:Mh(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Hh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Fh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Bh(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let n;switch(t){case Wl:n=this.InterpolantFactoryMethodDiscrete;break;case Ch:n=this.InterpolantFactoryMethodLinear;break;case bh:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Wl;case this.InterpolantFactoryMethodLinear:return Ch;case this.InterpolantFactoryMethodSmooth:return bh}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]*=t}return this}trim(t,n){let i=this.times,s=i.length,a=0,r=s-1;for(;a!==s&&i[a]<t;)++a;for(;r!==-1&&i[r]>n;)--r;if(++r,a!==0||r!==s){a>=r&&(r=Math.max(r,1),a=r-1);let o=this.getValueSize();this.times=i.slice(a,r),this.values=this.values.slice(a*o,r*o)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,a=i.length;a===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let o=0;o!==a;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(r!==null&&r>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,r),t=!1;break}r=l}if(s!==void 0&&OA(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===bh,a=t.length-1,r=1;for(let o=1;o<a;++o){let l=!1,c=t[o],f=t[o+1];if(c!==f&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*i,h=d-i,p=d+i;for(let _=0;_!==i;++_){let S=n[d+_];if(S!==n[h+_]||S!==n[p+_]){l=!0;break}}}if(l){if(o!==r){t[r]=t[o];let d=o*i,h=r*i;for(let p=0;p!==i;++p)n[h+p]=n[d+p]}++r}}if(a>0){t[r]=t[a];for(let o=a*i,l=r*i,c=0;c!==i;++c)n[l+c]=n[o+c];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=n.slice(0,r*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,s=new i(this.name,t,n);return s.createInterpolant=this.createInterpolant,s}};Jn.prototype.ValueTypeName="";Jn.prototype.TimeBufferType=Float32Array;Jn.prototype.ValueBufferType=Float32Array;Jn.prototype.DefaultInterpolation=Ch;var fa=class extends Jn{constructor(t,n,i){super(t,n,i)}};fa.prototype.ValueTypeName="bool";fa.prototype.ValueBufferType=Array;fa.prototype.DefaultInterpolation=Wl;fa.prototype.InterpolantFactoryMethodLinear=void 0;fa.prototype.InterpolantFactoryMethodSmooth=void 0;var Vh=class extends Jn{constructor(t,n,i,s){super(t,n,i,s)}};Vh.prototype.ValueTypeName="color";var Gh=class extends Jn{constructor(t,n,i,s){super(t,n,i,s)}};Gh.prototype.ValueTypeName="number";var kh=class extends er{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-n)/(s-n),c=t*o;for(let f=c+o;c!==f;c+=4)xs.slerpFlat(a,0,r,c-o,r,c,l);return a}},ac=class extends Jn{constructor(t,n,i,s){super(t,n,i,s)}InterpolantFactoryMethodLinear(t){return new kh(this.times,this.values,this.getValueSize(),t)}};ac.prototype.ValueTypeName="quaternion";ac.prototype.InterpolantFactoryMethodSmooth=void 0;var da=class extends Jn{constructor(t,n,i){super(t,n,i)}};da.prototype.ValueTypeName="string";da.prototype.ValueBufferType=Array;da.prototype.DefaultInterpolation=Wl;da.prototype.InterpolantFactoryMethodLinear=void 0;da.prototype.InterpolantFactoryMethodSmooth=void 0;var Xh=class extends Jn{constructor(t,n,i,s){super(t,n,i,s)}};Xh.prototype.ValueTypeName="vector";var Wh=class{constructor(t,n,i){let s=this,a=!1,r=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this.abortController=new AbortController,this.itemStart=function(f){o++,a===!1&&s.onStart!==void 0&&s.onStart(f,r,o),a=!0},this.itemEnd=function(f){r++,s.onProgress!==void 0&&s.onProgress(f,r,o),r===o&&(a=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(f){s.onError!==void 0&&s.onError(f)},this.resolveURL=function(f){return l?l(f):f},this.setURLModifier=function(f){return l=f,this},this.addHandler=function(f,d){return c.push(f,d),this},this.removeHandler=function(f){let d=c.indexOf(f);return d!==-1&&c.splice(d,2),this},this.getHandler=function(f){for(let d=0,h=c.length;d<h;d+=2){let p=c[d],_=c[d+1];if(p.global&&(p.lastIndex=0),p.test(f))return _}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},YM=new Wh,qh=class{constructor(t){this.manager=t!==void 0?t:YM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,n){let i=this;return new Promise(function(s,a){i.load(t,s,n,a)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};qh.DEFAULT_MATERIAL_NAME="__DEFAULT";var Yh=class extends $a{constructor(t=-1,n=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,a=i-t,r=i+t,o=s+n,l=s-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}};var Zh=class extends Cn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var qg="\\[\\]\\.:\\/",IA=new RegExp("["+qg+"]","g"),Yg="[^"+qg+"]",PA="[^"+qg.replace("\\.","")+"]",zA=/((?:WC+[\/:])*)/.source.replace("WC",Yg),BA=/(WCOD+)?/.source.replace("WCOD",PA),FA=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Yg),HA=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Yg),VA=new RegExp("^"+zA+BA+FA+HA+"$"),GA=["material","materials","bones","map"],Ag=class{constructor(t,n,i){let s=i||xe.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,s)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,a=i.length;s!==a;++s)i[s].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},xe=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(IA,"")}static parseTrackName(t){let n=VA.exec(t);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let a=i.nodeName.substring(s+1);GA.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(a){for(let r=0;r<a.length;r++){let o=a[r];if(o.name===n||o.uuid===n)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)t[n++]=i[s]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,s=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let f=0;f<t.length;f++)if(t[f].name===c){c=f;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let r=t[s];if(r===void 0){let c=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(a!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=a}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};xe.Composite=Ag;xe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};xe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};xe.prototype.GetterByBindingType=[xe.prototype._getValue_direct,xe.prototype._getValue_array,xe.prototype._getValue_arrayElement,xe.prototype._getValue_toArray];xe.prototype.SetterByBindingTypeAndVersioning=[[xe.prototype._setValue_direct,xe.prototype._setValue_direct_setNeedsUpdate,xe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[xe.prototype._setValue_array,xe.prototype._setValue_array_setNeedsUpdate,xe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[xe.prototype._setValue_arrayElement,xe.prototype._setValue_arrayElement_setNeedsUpdate,xe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[xe.prototype._setValue_fromArray,xe.prototype._setValue_fromArray_setNeedsUpdate,xe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var U3=new Float32Array(1);function Zg(e,t,n,i){let s=kA(i);switch(n){case Bg:return e*t;case Hg:return e*t/s.components*s.byteLength;case cf:return e*t/s.components*s.byteLength;case Vg:return e*t*2/s.components*s.byteLength;case uf:return e*t*2/s.components*s.byteLength;case Fg:return e*t*3/s.components*s.byteLength;case hi:return e*t*4/s.components*s.byteLength;case hf:return e*t*4/s.components*s.byteLength;case lc:case cc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case uc:case hc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case df:case mf:return Math.max(e,16)*Math.max(t,8)/4;case ff:case pf:return Math.max(e,8)*Math.max(t,8)/2;case gf:case _f:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case vf:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case yf:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case xf:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Sf:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Mf:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case bf:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Tf:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Ef:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Af:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case wf:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Cf:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Rf:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Df:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Uf:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Nf:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Lf:case Of:case If:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Pf:case zf:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Bf:case Ff:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function kA(e){switch(e){case qi:case Og:return{byteLength:1,components:1};case Ro:case Ig:case Do:return{byteLength:2,components:1};case of:case lf:return{byteLength:2,components:4};case ma:case rf:case Yi:return{byteLength:4,components:1};case Pg:case zg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function _b(){let e=null,t=!1,n=null,i=null;function s(a,r){n(a,r),i=e.requestAnimationFrame(s)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){n=a},setContext:function(a){e=a}}}function WA(e){let t=new WeakMap;function n(o,l){let c=o.array,f=o.usage,d=c.byteLength,h=e.createBuffer();e.bindBuffer(l,h),e.bufferData(l,c,f),o.onUploadCallback();let p;if(c instanceof Float32Array)p=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=e.SHORT;else if(c instanceof Uint32Array)p=e.UNSIGNED_INT;else if(c instanceof Int32Array)p=e.INT;else if(c instanceof Int8Array)p=e.BYTE;else if(c instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let f=l.array,d=l.updateRanges;if(e.bindBuffer(c,o),d.length===0)e.bufferSubData(c,0,f);else{d.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<d.length;p++){let _=d[h],S=d[p];S.start<=_.start+_.count+1?_.count=Math.max(_.count,S.start+S.count-_.start):(++h,d[h]=S)}d.length=h+1;for(let p=0,_=d.length;p<_;p++){let S=d[p];e.bufferSubData(c,S.start*f.BYTES_PER_ELEMENT,f,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let f=t.get(o);(!f||f.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}var qA=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,YA=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ZA=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,JA=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,KA=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,QA=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jA=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,$A=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tw=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ew=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,nw=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,iw=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sw=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,aw=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,rw=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ow=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,lw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,uw=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hw=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,fw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,dw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,pw=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,mw=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,gw=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,_w=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,vw=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yw=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xw=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sw=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Mw="gl_FragColor = linearToOutputTexel( gl_FragColor );",bw=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Tw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ew=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Aw=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ww=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Rw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dw=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Uw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Lw=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ow=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Iw=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pw=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zw=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Bw=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Fw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hw=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Vw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gw=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,kw=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Xw=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ww=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qw=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Yw=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,jw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$w=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tC=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,eC=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nC=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,iC=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sC=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,aC=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rC=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,oC=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,lC=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cC=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,uC=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,hC=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fC=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dC=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,pC=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,mC=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gC=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_C=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vC=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yC=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xC=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,SC=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,MC=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bC=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,TC=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,EC=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,AC=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wC=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,CC=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,RC=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,DC=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,UC=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,NC=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,LC=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,OC=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,IC=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,PC=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zC=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,BC=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,FC=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,HC=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,VC=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,GC=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kC=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,XC=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,WC=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qC=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,YC=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ZC=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,JC=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,KC=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,QC=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,jC=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,$C=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,tR=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,eR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nR=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iR=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sR=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,aR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,rR=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oR=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lR=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cR=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,uR=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hR=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fR=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,dR=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pR=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mR=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,gR=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_R=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vR=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yR=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,xR=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,SR=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,MR=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,bR=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,TR=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ft={alphahash_fragment:qA,alphahash_pars_fragment:YA,alphamap_fragment:ZA,alphamap_pars_fragment:JA,alphatest_fragment:KA,alphatest_pars_fragment:QA,aomap_fragment:jA,aomap_pars_fragment:$A,batching_pars_vertex:tw,batching_vertex:ew,begin_vertex:nw,beginnormal_vertex:iw,bsdfs:sw,iridescence_fragment:aw,bumpmap_pars_fragment:rw,clipping_planes_fragment:ow,clipping_planes_pars_fragment:lw,clipping_planes_pars_vertex:cw,clipping_planes_vertex:uw,color_fragment:hw,color_pars_fragment:fw,color_pars_vertex:dw,color_vertex:pw,common:mw,cube_uv_reflection_fragment:gw,defaultnormal_vertex:_w,displacementmap_pars_vertex:vw,displacementmap_vertex:yw,emissivemap_fragment:xw,emissivemap_pars_fragment:Sw,colorspace_fragment:Mw,colorspace_pars_fragment:bw,envmap_fragment:Tw,envmap_common_pars_fragment:Ew,envmap_pars_fragment:Aw,envmap_pars_vertex:ww,envmap_physical_pars_fragment:Bw,envmap_vertex:Cw,fog_vertex:Rw,fog_pars_vertex:Dw,fog_fragment:Uw,fog_pars_fragment:Nw,gradientmap_pars_fragment:Lw,lightmap_pars_fragment:Ow,lights_lambert_fragment:Iw,lights_lambert_pars_fragment:Pw,lights_pars_begin:zw,lights_toon_fragment:Fw,lights_toon_pars_fragment:Hw,lights_phong_fragment:Vw,lights_phong_pars_fragment:Gw,lights_physical_fragment:kw,lights_physical_pars_fragment:Xw,lights_fragment_begin:Ww,lights_fragment_maps:qw,lights_fragment_end:Yw,logdepthbuf_fragment:Zw,logdepthbuf_pars_fragment:Jw,logdepthbuf_pars_vertex:Kw,logdepthbuf_vertex:Qw,map_fragment:jw,map_pars_fragment:$w,map_particle_fragment:tC,map_particle_pars_fragment:eC,metalnessmap_fragment:nC,metalnessmap_pars_fragment:iC,morphinstance_vertex:sC,morphcolor_vertex:aC,morphnormal_vertex:rC,morphtarget_pars_vertex:oC,morphtarget_vertex:lC,normal_fragment_begin:cC,normal_fragment_maps:uC,normal_pars_fragment:hC,normal_pars_vertex:fC,normal_vertex:dC,normalmap_pars_fragment:pC,clearcoat_normal_fragment_begin:mC,clearcoat_normal_fragment_maps:gC,clearcoat_pars_fragment:_C,iridescence_pars_fragment:vC,opaque_fragment:yC,packing:xC,premultiplied_alpha_fragment:SC,project_vertex:MC,dithering_fragment:bC,dithering_pars_fragment:TC,roughnessmap_fragment:EC,roughnessmap_pars_fragment:AC,shadowmap_pars_fragment:wC,shadowmap_pars_vertex:CC,shadowmap_vertex:RC,shadowmask_pars_fragment:DC,skinbase_vertex:UC,skinning_pars_vertex:NC,skinning_vertex:LC,skinnormal_vertex:OC,specularmap_fragment:IC,specularmap_pars_fragment:PC,tonemapping_fragment:zC,tonemapping_pars_fragment:BC,transmission_fragment:FC,transmission_pars_fragment:HC,uv_pars_fragment:VC,uv_pars_vertex:GC,uv_vertex:kC,worldpos_vertex:XC,background_vert:WC,background_frag:qC,backgroundCube_vert:YC,backgroundCube_frag:ZC,cube_vert:JC,cube_frag:KC,depth_vert:QC,depth_frag:jC,distanceRGBA_vert:$C,distanceRGBA_frag:tR,equirect_vert:eR,equirect_frag:nR,linedashed_vert:iR,linedashed_frag:sR,meshbasic_vert:aR,meshbasic_frag:rR,meshlambert_vert:oR,meshlambert_frag:lR,meshmatcap_vert:cR,meshmatcap_frag:uR,meshnormal_vert:hR,meshnormal_frag:fR,meshphong_vert:dR,meshphong_frag:pR,meshphysical_vert:mR,meshphysical_frag:gR,meshtoon_vert:_R,meshtoon_frag:vR,points_vert:yR,points_frag:xR,shadow_vert:SR,shadow_frag:MR,sprite_vert:bR,sprite_frag:TR},at={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Pt}},envmap:{envMap:{value:null},envMapRotation:{value:new Pt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Pt},normalScale:{value:new $t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0},uvTransform:{value:new Pt}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new $t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}}},Zi={basic:{uniforms:hn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:hn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new te(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:hn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:hn([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:hn([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new te(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:hn([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:hn([at.points,at.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:hn([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:hn([at.common,at.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:hn([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:hn([at.sprite,at.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Pt}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:hn([at.common,at.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:hn([at.lights,at.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};Zi.physical={uniforms:hn([Zi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Pt},clearcoatNormalScale:{value:new $t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Pt},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Pt},transmissionSamplerSize:{value:new $t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Pt},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Pt},anisotropyVector:{value:new $t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Pt}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};var Hf={r:0,b:0,g:0},ar=new ki,ER=new Ge;function AR(e,t,n,i,s,a,r){let o=new te(0),l=a===!0?0:1,c,f,d=null,h=0,p=null;function _(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?n:t).get(y)),y}function S(v){let y=!1,A=_(v);A===null?u(o,l):A&&A.isColor&&(u(A,1),y=!0);let C=e.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(e.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function m(v,y){let A=_(y);A&&(A.isCubeTexture||A.mapping===rc)?(f===void 0&&(f=new Rn(new wo(1,1,1),new Zn({name:"BackgroundCubeMaterial",uniforms:sr(Zi.backgroundCube.uniforms),vertexShader:Zi.backgroundCube.vertexShader,fragmentShader:Zi.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(C,w,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(f)),ar.copy(y.backgroundRotation),ar.x*=-1,ar.y*=-1,ar.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(ar.y*=-1,ar.z*=-1),f.material.uniforms.envMap.value=A,f.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(ER.makeRotationFromEuler(ar)),f.material.toneMapped=Zt.getTransfer(A.colorSpace)!==oe,(d!==A||h!==A.version||p!==e.toneMapping)&&(f.material.needsUpdate=!0,d=A,h=A.version,p=e.toneMapping),f.layers.enableAll(),v.unshift(f,f.geometry,f.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new Rn(new tr(2,2),new Zn({name:"BackgroundMaterial",uniforms:sr(Zi.background.uniforms),vertexShader:Zi.background.vertexShader,fragmentShader:Zi.background.fragmentShader,side:vs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Zt.getTransfer(A.colorSpace)!==oe,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(d!==A||h!==A.version||p!==e.toneMapping)&&(c.material.needsUpdate=!0,d=A,h=A.version,p=e.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function u(v,y){v.getRGB(Hf,Wg(e)),i.buffers.color.setClear(Hf.r,Hf.g,Hf.b,y,r)}function g(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,y=1){o.set(v),l=y,u(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,u(o,l)},render:S,addToRenderList:m,dispose:g}}function wR(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=h(null),a=s,r=!1;function o(b,N,F,G,q){let J=!1,W=d(G,F,N);a!==W&&(a=W,c(a.object)),J=p(b,G,F,q),J&&_(b,G,F,q),q!==null&&t.update(q,e.ELEMENT_ARRAY_BUFFER),(J||r)&&(r=!1,y(b,N,F,G),q!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function l(){return e.createVertexArray()}function c(b){return e.bindVertexArray(b)}function f(b){return e.deleteVertexArray(b)}function d(b,N,F){let G=F.wireframe===!0,q=i[b.id];q===void 0&&(q={},i[b.id]=q);let J=q[N.id];J===void 0&&(J={},q[N.id]=J);let W=J[G];return W===void 0&&(W=h(l()),J[G]=W),W}function h(b){let N=[],F=[],G=[];for(let q=0;q<n;q++)N[q]=0,F[q]=0,G[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:F,attributeDivisors:G,object:b,attributes:{},index:null}}function p(b,N,F,G){let q=a.attributes,J=N.attributes,W=0,nt=F.getAttributes();for(let H in nt)if(nt[H].location>=0){let ut=q[H],bt=J[H];if(bt===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(bt=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(bt=b.instanceColor)),ut===void 0||ut.attribute!==bt||bt&&ut.data!==bt.data)return!0;W++}return a.attributesNum!==W||a.index!==G}function _(b,N,F,G){let q={},J=N.attributes,W=0,nt=F.getAttributes();for(let H in nt)if(nt[H].location>=0){let ut=J[H];ut===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(ut=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(ut=b.instanceColor));let bt={};bt.attribute=ut,ut&&ut.data&&(bt.data=ut.data),q[H]=bt,W++}a.attributes=q,a.attributesNum=W,a.index=G}function S(){let b=a.newAttributes;for(let N=0,F=b.length;N<F;N++)b[N]=0}function m(b){u(b,0)}function u(b,N){let F=a.newAttributes,G=a.enabledAttributes,q=a.attributeDivisors;F[b]=1,G[b]===0&&(e.enableVertexAttribArray(b),G[b]=1),q[b]!==N&&(e.vertexAttribDivisor(b,N),q[b]=N)}function g(){let b=a.newAttributes,N=a.enabledAttributes;for(let F=0,G=N.length;F<G;F++)N[F]!==b[F]&&(e.disableVertexAttribArray(F),N[F]=0)}function v(b,N,F,G,q,J,W){W===!0?e.vertexAttribIPointer(b,N,F,q,J):e.vertexAttribPointer(b,N,F,G,q,J)}function y(b,N,F,G){S();let q=G.attributes,J=F.getAttributes(),W=N.defaultAttributeValues;for(let nt in J){let H=J[nt];if(H.location>=0){let rt=q[nt];if(rt===void 0&&(nt==="instanceMatrix"&&b.instanceMatrix&&(rt=b.instanceMatrix),nt==="instanceColor"&&b.instanceColor&&(rt=b.instanceColor)),rt!==void 0){let ut=rt.normalized,bt=rt.itemSize,Vt=t.get(rt);if(Vt===void 0)continue;let de=Vt.buffer,Se=Vt.type,ee=Vt.bytesPerElement,Y=Se===e.INT||Se===e.UNSIGNED_INT||rt.gpuType===rf;if(rt.isInterleavedBufferAttribute){let Q=rt.data,dt=Q.stride,Ut=rt.offset;if(Q.isInstancedInterleavedBuffer){for(let Mt=0;Mt<H.locationSize;Mt++)u(H.location+Mt,Q.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Mt=0;Mt<H.locationSize;Mt++)m(H.location+Mt);e.bindBuffer(e.ARRAY_BUFFER,de);for(let Mt=0;Mt<H.locationSize;Mt++)v(H.location+Mt,bt/H.locationSize,Se,ut,dt*ee,(Ut+bt/H.locationSize*Mt)*ee,Y)}else{if(rt.isInstancedBufferAttribute){for(let Q=0;Q<H.locationSize;Q++)u(H.location+Q,rt.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Q=0;Q<H.locationSize;Q++)m(H.location+Q);e.bindBuffer(e.ARRAY_BUFFER,de);for(let Q=0;Q<H.locationSize;Q++)v(H.location+Q,bt/H.locationSize,Se,ut,bt*ee,bt/H.locationSize*Q*ee,Y)}}else if(W!==void 0){let ut=W[nt];if(ut!==void 0)switch(ut.length){case 2:e.vertexAttrib2fv(H.location,ut);break;case 3:e.vertexAttrib3fv(H.location,ut);break;case 4:e.vertexAttrib4fv(H.location,ut);break;default:e.vertexAttrib1fv(H.location,ut)}}}}g()}function A(){D();for(let b in i){let N=i[b];for(let F in N){let G=N[F];for(let q in G)f(G[q].object),delete G[q];delete N[F]}delete i[b]}}function C(b){if(i[b.id]===void 0)return;let N=i[b.id];for(let F in N){let G=N[F];for(let q in G)f(G[q].object),delete G[q];delete N[F]}delete i[b.id]}function w(b){for(let N in i){let F=i[N];if(F[b.id]===void 0)continue;let G=F[b.id];for(let q in G)f(G[q].object),delete G[q];delete F[b.id]}}function D(){T(),r=!0,a!==s&&(a=s,c(a.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:D,resetDefaultState:T,dispose:A,releaseStatesOfGeometry:C,releaseStatesOfProgram:w,initAttributes:S,enableAttribute:m,disableUnusedAttributes:g}}function CR(e,t,n){let i;function s(c){i=c}function a(c,f){e.drawArrays(i,c,f),n.update(f,i,1)}function r(c,f,d){d!==0&&(e.drawArraysInstanced(i,c,f,d),n.update(f,i,d))}function o(c,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,f,0,d);let p=0;for(let _=0;_<d;_++)p+=f[_];n.update(p,i,1)}function l(c,f,d,h){if(d===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<c.length;_++)r(c[_],f[_],h[_]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,f,0,h,0,d);let _=0;for(let S=0;S<d;S++)_+=f[S]*h[S];n.update(_,i,1)}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function RR(e,t,n,i){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(w){return!(w!==hi&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){let D=w===Do&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==qi&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Yi&&!D)}function l(w){if(w==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",f=l(c);f!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);let d=n.logarithmicDepthBuffer===!0,h=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),_=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),u=e.getParameter(e.MAX_VERTEX_ATTRIBS),g=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),v=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),A=_>0,C=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:g,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:A,maxSamples:C}}function DR(e){let t=this,n=null,i=0,s=!1,a=!1,r=new Hi,o=new Pt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let p=d.length!==0||h||i!==0||s;return s=h,i=d.length,p},this.beginShadows=function(){a=!0,f(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,h){n=f(d,h,0)},this.setState=function(d,h,p){let _=d.clippingPlanes,S=d.clipIntersection,m=d.clipShadows,u=e.get(d);if(!s||_===null||_.length===0||a&&!m)a?f(null):c();else{let g=a?0:i,v=g*4,y=u.clippingState||null;l.value=y,y=f(_,h,v,p);for(let A=0;A!==v;++A)y[A]=n[A];u.clippingState=y,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function f(d,h,p,_){let S=d!==null?d.length:0,m=null;if(S!==0){if(m=l.value,_!==!0||m===null){let u=p+S*4,g=h.matrixWorldInverse;o.getNormalMatrix(g),(m===null||m.length<u)&&(m=new Float32Array(u));for(let v=0,y=p;v!==S;++v,y+=4)r.copy(d[v]).applyMatrix4(g,o),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,m}}function UR(e){let t=new WeakMap;function n(r,o){return o===nf?r.mapping=nr:o===sf&&(r.mapping=ir),r}function i(r){if(r&&r.isTexture){let o=r.mapping;if(o===nf||o===sf)if(t.has(r)){let l=t.get(r).texture;return n(l,r.mapping)}else{let l=r.image;if(l&&l.height>0){let c=new Ih(l.height);return c.fromEquirectangularTexture(e,r),t.set(r,c),r.addEventListener("dispose",s),n(c.texture,r.mapping)}else return null}}return r}function s(r){let o=r.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function a(){t=new WeakMap}return{get:i,dispose:a}}var Oo=4,ZM=[.125,.215,.35,.446,.526,.582],lr=20,Jg=new Yh,JM=new te,Kg=null,Qg=0,jg=0,$g=!1,or=(1+Math.sqrt(5))/2,Lo=1/or,KM=[new z(-or,Lo,0),new z(or,Lo,0),new z(-Lo,0,or),new z(Lo,0,or),new z(0,or,-Lo),new z(0,or,Lo),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)],NR=new z,kf=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,s=100,a={}){let{size:r=256,position:o=NR}=a;Kg=this._renderer.getRenderTarget(),Qg=this._renderer.getActiveCubeFace(),jg=this._renderer.getActiveMipmapLevel(),$g=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$M(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jM(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Kg,Qg,jg),this._renderer.xr.enabled=$g,t.scissorTest=!1,Vf(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===nr||t.mapping===ir?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Kg=this._renderer.getRenderTarget(),Qg=this._renderer.getActiveCubeFace(),jg=this._renderer.getActiveMipmapLevel(),$g=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Mi,minFilter:Mi,generateMipmaps:!1,type:Do,format:hi,colorSpace:Qa,depthBuffer:!1},s=QM(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=QM(t,n,i);let{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=LR(a)),this._blurMaterial=OR(a,t,n)}return s}_compileMaterial(t){let n=new Rn(this._lodPlanes[0],t);this._renderer.compile(n,Jg)}_sceneToCubeUV(t,n,i,s,a){let l=new Cn(90,1,n,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(JM),d.toneMapping=Ms,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));let S=new Ql({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1}),m=new Rn(new wo,S),u=!1,g=t.background;g?g.isColor&&(S.color.copy(g),t.background=null,u=!0):(S.color.copy(JM),u=!0);for(let v=0;v<6;v++){let y=v%3;y===0?(l.up.set(0,c[v],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+f[v],a.y,a.z)):y===1?(l.up.set(0,0,c[v]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+f[v],a.z)):(l.up.set(0,c[v],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+f[v]));let A=this._cubeSize;Vf(s,y*A,v>2?A:0,A,A),d.setRenderTarget(s),u&&d.render(m,l),d.render(t,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=h,t.background=g}_textureToCubeUV(t,n){let i=this._renderer,s=t.mapping===nr||t.mapping===ir;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$M()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jM());let a=s?this._cubemapMaterial:this._equirectMaterial,r=new Rn(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=t;let l=this._cubeSize;Vf(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,Jg)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let s=this._lodPlanes.length;for(let a=1;a<s;a++){let r=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=KM[(s-a-1)%KM.length];this._blur(t,a-1,a,r,o)}n.autoClear=i}_blur(t,n,i,s,a){let r=this._pingPongRenderTarget;this._halfBlur(t,r,n,i,s,"latitudinal",a),this._halfBlur(r,t,i,i,s,"longitudinal",a)}_halfBlur(t,n,i,s,a,r,o){let l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let f=3,d=new Rn(this._lodPlanes[s],c),h=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*lr-1),S=a/_,m=isFinite(a)?1+Math.floor(f*S):lr;m>lr&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${lr}`);let u=[],g=0;for(let w=0;w<lr;++w){let D=w/S,T=Math.exp(-D*D/2);u.push(T),w===0?g+=T:w<m&&(g+=2*T)}for(let w=0;w<u.length;w++)u[w]=u[w]/g;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=u,h.latitudinal.value=r==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:v}=this;h.dTheta.value=_,h.mipInt.value=v-i;let y=this._sizeLods[s],A=3*y*(s>v-Oo?s-v+Oo:0),C=4*(this._cubeSize-y);Vf(n,A,C,3*y,2*y),l.setRenderTarget(n),l.render(d,Jg)}};function LR(e){let t=[],n=[],i=[],s=e,a=e-Oo+1+ZM.length;for(let r=0;r<a;r++){let o=Math.pow(2,s);n.push(o);let l=1/o;r>e-Oo?l=ZM[r-e+Oo-1]:r===0&&(l=0),i.push(l);let c=1/(o-2),f=-c,d=1+c,h=[f,f,d,f,d,d,f,f,d,d,f,d],p=6,_=6,S=3,m=2,u=1,g=new Float32Array(S*_*p),v=new Float32Array(m*_*p),y=new Float32Array(u*_*p);for(let C=0;C<p;C++){let w=C%3*2/3-1,D=C>2?0:-1,T=[w,D,0,w+2/3,D,0,w+2/3,D+1,0,w,D,0,w+2/3,D+1,0,w,D+1,0];g.set(T,S*_*C),v.set(h,m*_*C);let b=[C,C,C,C,C,C];y.set(b,u*_*C)}let A=new ha;A.setAttribute("position",new qn(g,S)),A.setAttribute("uv",new qn(v,m)),A.setAttribute("faceIndex",new qn(y,u)),t.push(A),s>Oo&&s--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function QM(e,t,n){let i=new Gi(e,t,n);return i.texture.mapping=rc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Vf(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function OR(e,t,n){let i=new Float32Array(lr),s=new z(0,1,0);return new Zn({name:"SphericalGaussianBlur",defines:{n:lr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:c0(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function jM(){return new Zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:c0(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function $M(){return new Zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:c0(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function c0(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function IR(e){let t=new WeakMap,n=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===nf||l===sf,f=l===nr||l===ir;if(c||f){let d=t.get(o),h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return n===null&&(n=new kf(e)),d=c?n.fromEquirectangular(o,d):n.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{let p=o.image;return c&&p&&p.height>0||f&&p&&s(p)?(n===null&&(n=new kf(e)),d=c?n.fromEquirectangular(o):n.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",a),d.texture):null}}}return o}function s(o){let l=0,c=6;for(let f=0;f<c;f++)o[f]!==void 0&&l++;return l===c}function a(o){let l=o.target;l.removeEventListener("dispose",a);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:r}}function PR(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=e.getExtension(i)}return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);return s===null&&To("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function zR(e,t,n,i){let s={},a=new WeakMap;function r(d){let h=d.target;h.index!==null&&t.remove(h.index);for(let _ in h.attributes)t.remove(h.attributes[_]);h.removeEventListener("dispose",r),delete s[h.id];let p=a.get(h);p&&(t.remove(p),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",r),s[h.id]=!0,n.memory.geometries++),h}function l(d){let h=d.attributes;for(let p in h)t.update(h[p],e.ARRAY_BUFFER)}function c(d){let h=[],p=d.index,_=d.attributes.position,S=0;if(p!==null){let g=p.array;S=p.version;for(let v=0,y=g.length;v<y;v+=3){let A=g[v+0],C=g[v+1],w=g[v+2];h.push(A,C,C,w,w,A)}}else if(_!==void 0){let g=_.array;S=_.version;for(let v=0,y=g.length/3-1;v<y;v+=3){let A=v+0,C=v+1,w=v+2;h.push(A,C,C,w,w,A)}}else return;let m=new(Xg(h)?$l:jl)(h,1);m.version=S;let u=a.get(d);u&&t.remove(u),a.set(d,m)}function f(d){let h=a.get(d);if(h){let p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return a.get(d)}return{get:o,update:l,getWireframeAttribute:f}}function BR(e,t,n){let i;function s(h){i=h}let a,r;function o(h){a=h.type,r=h.bytesPerElement}function l(h,p){e.drawElements(i,p,a,h*r),n.update(p,i,1)}function c(h,p,_){_!==0&&(e.drawElementsInstanced(i,p,a,h*r,_),n.update(p,i,_))}function f(h,p,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,a,h,0,_);let m=0;for(let u=0;u<_;u++)m+=p[u];n.update(m,i,1)}function d(h,p,_,S){if(_===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<h.length;u++)c(h[u]/r,p[u],S[u]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,a,h,0,S,0,_);let u=0;for(let g=0;g<_;g++)u+=p[g]*S[g];n.update(u,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=d}function FR(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(a/3);break;case e.LINES:n.lines+=o*(a/2);break;case e.LINE_STRIP:n.lines+=o*(a-1);break;case e.LINE_LOOP:n.lines+=o*a;break;case e.POINTS:n.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function HR(e,t,n){let i=new WeakMap,s=new Ne;function a(r,o,l){let c=r.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=f!==void 0?f.length:0,h=i.get(o);if(h===void 0||h.count!==d){let T=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();let p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],g=o.morphAttributes.color||[],v=0;p===!0&&(v=1),_===!0&&(v=2),S===!0&&(v=3);let y=o.attributes.position.count*v,A=1;y>t.maxTextureSize&&(A=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let C=new Float32Array(y*A*4*d),w=new Jl(C,y,A,d);w.type=Yi,w.needsUpdate=!0;let D=v*4;for(let b=0;b<d;b++){let N=m[b],F=u[b],G=g[b],q=y*A*4*b;for(let J=0;J<N.count;J++){let W=J*D;p===!0&&(s.fromBufferAttribute(N,J),C[q+W+0]=s.x,C[q+W+1]=s.y,C[q+W+2]=s.z,C[q+W+3]=0),_===!0&&(s.fromBufferAttribute(F,J),C[q+W+4]=s.x,C[q+W+5]=s.y,C[q+W+6]=s.z,C[q+W+7]=0),S===!0&&(s.fromBufferAttribute(G,J),C[q+W+8]=s.x,C[q+W+9]=s.y,C[q+W+10]=s.z,C[q+W+11]=G.itemSize===4?s.w:1)}}h={count:d,texture:w,size:new $t(y,A)},i.set(o,h),o.addEventListener("dispose",T)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let p=0;for(let S=0;S<c.length;S++)p+=c[S];let _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(e,"morphTargetBaseInfluence",_),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",h.size)}return{update:a}}function VR(e,t,n,i){let s=new WeakMap;function a(l){let c=i.render.frame,f=l.geometry,d=t.get(l,f);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(n.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,e.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function r(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:a,dispose:r}}var vb=new Yn,tb=new ic(1,1),yb=new Jl,xb=new Nh,Sb=new tc,eb=[],nb=[],ib=new Float32Array(16),sb=new Float32Array(9),ab=new Float32Array(4);function Po(e,t,n){let i=e[0];if(i<=0||i>0)return e;let s=t*n,a=eb[s];if(a===void 0&&(a=new Float32Array(s),eb[s]=a),t!==0){i.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(a,o)}return a}function ke(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Xe(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Wf(e,t){let n=nb[t];n===void 0&&(n=new Int32Array(t),nb[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function GR(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function kR(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ke(n,t))return;e.uniform2fv(this.addr,t),Xe(n,t)}}function XR(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(ke(n,t))return;e.uniform3fv(this.addr,t),Xe(n,t)}}function WR(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ke(n,t))return;e.uniform4fv(this.addr,t),Xe(n,t)}}function qR(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(ke(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Xe(n,t)}else{if(ke(n,i))return;ab.set(i),e.uniformMatrix2fv(this.addr,!1,ab),Xe(n,i)}}function YR(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(ke(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Xe(n,t)}else{if(ke(n,i))return;sb.set(i),e.uniformMatrix3fv(this.addr,!1,sb),Xe(n,i)}}function ZR(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(ke(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Xe(n,t)}else{if(ke(n,i))return;ib.set(i),e.uniformMatrix4fv(this.addr,!1,ib),Xe(n,i)}}function JR(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function KR(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ke(n,t))return;e.uniform2iv(this.addr,t),Xe(n,t)}}function QR(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ke(n,t))return;e.uniform3iv(this.addr,t),Xe(n,t)}}function jR(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ke(n,t))return;e.uniform4iv(this.addr,t),Xe(n,t)}}function $R(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function t2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ke(n,t))return;e.uniform2uiv(this.addr,t),Xe(n,t)}}function e2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ke(n,t))return;e.uniform3uiv(this.addr,t),Xe(n,t)}}function n2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ke(n,t))return;e.uniform4uiv(this.addr,t),Xe(n,t)}}function i2(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let a;this.type===e.SAMPLER_2D_SHADOW?(tb.compareFunction=Gg,a=tb):a=vb,n.setTexture2D(t||a,s)}function s2(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||xb,s)}function a2(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||Sb,s)}function r2(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||yb,s)}function o2(e){switch(e){case 5126:return GR;case 35664:return kR;case 35665:return XR;case 35666:return WR;case 35674:return qR;case 35675:return YR;case 35676:return ZR;case 5124:case 35670:return JR;case 35667:case 35671:return KR;case 35668:case 35672:return QR;case 35669:case 35673:return jR;case 5125:return $R;case 36294:return t2;case 36295:return e2;case 36296:return n2;case 35678:case 36198:case 36298:case 36306:case 35682:return i2;case 35679:case 36299:case 36307:return s2;case 35680:case 36300:case 36308:case 36293:return a2;case 36289:case 36303:case 36311:case 36292:return r2}}function l2(e,t){e.uniform1fv(this.addr,t)}function c2(e,t){let n=Po(t,this.size,2);e.uniform2fv(this.addr,n)}function u2(e,t){let n=Po(t,this.size,3);e.uniform3fv(this.addr,n)}function h2(e,t){let n=Po(t,this.size,4);e.uniform4fv(this.addr,n)}function f2(e,t){let n=Po(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function d2(e,t){let n=Po(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function p2(e,t){let n=Po(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function m2(e,t){e.uniform1iv(this.addr,t)}function g2(e,t){e.uniform2iv(this.addr,t)}function _2(e,t){e.uniform3iv(this.addr,t)}function v2(e,t){e.uniform4iv(this.addr,t)}function y2(e,t){e.uniform1uiv(this.addr,t)}function x2(e,t){e.uniform2uiv(this.addr,t)}function S2(e,t){e.uniform3uiv(this.addr,t)}function M2(e,t){e.uniform4uiv(this.addr,t)}function b2(e,t,n){let i=this.cache,s=t.length,a=Wf(n,s);ke(i,a)||(e.uniform1iv(this.addr,a),Xe(i,a));for(let r=0;r!==s;++r)n.setTexture2D(t[r]||vb,a[r])}function T2(e,t,n){let i=this.cache,s=t.length,a=Wf(n,s);ke(i,a)||(e.uniform1iv(this.addr,a),Xe(i,a));for(let r=0;r!==s;++r)n.setTexture3D(t[r]||xb,a[r])}function E2(e,t,n){let i=this.cache,s=t.length,a=Wf(n,s);ke(i,a)||(e.uniform1iv(this.addr,a),Xe(i,a));for(let r=0;r!==s;++r)n.setTextureCube(t[r]||Sb,a[r])}function A2(e,t,n){let i=this.cache,s=t.length,a=Wf(n,s);ke(i,a)||(e.uniform1iv(this.addr,a),Xe(i,a));for(let r=0;r!==s;++r)n.setTexture2DArray(t[r]||yb,a[r])}function w2(e){switch(e){case 5126:return l2;case 35664:return c2;case 35665:return u2;case 35666:return h2;case 35674:return f2;case 35675:return d2;case 35676:return p2;case 5124:case 35670:return m2;case 35667:case 35671:return g2;case 35668:case 35672:return _2;case 35669:case 35673:return v2;case 5125:return y2;case 36294:return x2;case 36295:return S2;case 36296:return M2;case 35678:case 36198:case 36298:case 36306:case 35682:return b2;case 35679:case 36299:case 36307:return T2;case 35680:case 36300:case 36308:case 36293:return E2;case 36289:case 36303:case 36311:case 36292:return A2}}var e0=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=o2(n.type)}},n0=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=w2(n.type)}},i0=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let s=this.seq;for(let a=0,r=s.length;a!==r;++a){let o=s[a];o.setValue(t,n[o.id],i)}}},t0=/(\w+)(\])?(\[|\.)?/g;function rb(e,t){e.seq.push(t),e.map[t.id]=t}function C2(e,t,n){let i=e.name,s=i.length;for(t0.lastIndex=0;;){let a=t0.exec(i),r=t0.lastIndex,o=a[1],l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){rb(n,c===void 0?new e0(o,e,t):new n0(o,e,t));break}else{let d=n.map[o];d===void 0&&(d=new i0(o),rb(n,d)),n=d}}}var Io=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let a=t.getActiveUniform(n,s),r=t.getUniformLocation(n,a.name);C2(a,r,this)}}setValue(t,n,i,s){let a=this.map[n];a!==void 0&&a.setValue(t,i,s)}setOptional(t,n,i){let s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let a=0,r=n.length;a!==r;++a){let o=n[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,n){let i=[];for(let s=0,a=t.length;s!==a;++s){let r=t[s];r.id in n&&i.push(r)}return i}};function ob(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var R2=37297,D2=0;function U2(e,t){let n=e.split(`
`),i=[],s=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let r=s;r<a;r++){let o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}var lb=new Pt;function N2(e){Zt._getMatrix(lb,Zt.workingColorSpace,e);let t=`mat3( ${lb.elements.map(n=>n.toFixed(4))} )`;switch(Zt.getTransfer(e)){case ql:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function cb(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";let r=/ERROR: 0:(\d+)/.exec(a);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+a+`

`+U2(e.getShaderSource(t),o)}else return a}function L2(e,t){let n=N2(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function O2(e,t){let n;switch(t){case TM:n="Linear";break;case EM:n="Reinhard";break;case AM:n="Cineon";break;case wM:n="ACESFilmic";break;case RM:n="AgX";break;case DM:n="Neutral";break;case CM:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var Gf=new z;function I2(){Zt.getLuminanceCoefficients(Gf);let e=Gf.x.toFixed(4),t=Gf.y.toFixed(4),n=Gf.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function P2(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(dc).join(`
`)}function z2(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function B2(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let a=e.getActiveAttrib(t,s),r=a.name,o=1;a.type===e.FLOAT_MAT2&&(o=2),a.type===e.FLOAT_MAT3&&(o=3),a.type===e.FLOAT_MAT4&&(o=4),n[r]={type:a.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function dc(e){return e!==""}function ub(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function hb(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var F2=/^[ \t]*#include +<([\w\d./]+)>/gm;function s0(e){return e.replace(F2,V2)}var H2=new Map;function V2(e,t){let n=Ft[t];if(n===void 0){let i=H2.get(t);if(i!==void 0)n=Ft[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return s0(n)}var G2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fb(e){return e.replace(G2,k2)}function k2(e,t,n,i){let s="";for(let a=parseInt(t);a<parseInt(n);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function db(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function X2(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===Cg?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===iM?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===Xi&&(t="SHADOWMAP_TYPE_VSM"),t}function W2(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case nr:case ir:t="ENVMAP_TYPE_CUBE";break;case rc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function q2(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case ir:t="ENVMAP_MODE_REFRACTION";break}return t}function Y2(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case Ng:t="ENVMAP_BLENDING_MULTIPLY";break;case MM:t="ENVMAP_BLENDING_MIX";break;case bM:t="ENVMAP_BLENDING_ADD";break}return t}function Z2(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function J2(e,t,n,i){let s=e.getContext(),a=n.defines,r=n.vertexShader,o=n.fragmentShader,l=X2(n),c=W2(n),f=q2(n),d=Y2(n),h=Z2(n),p=P2(n),_=z2(a),S=s.createProgram(),m,u,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(dc).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(dc).join(`
`),u.length>0&&(u+=`
`)):(m=[db(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(dc).join(`
`),u=[db(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ms?"#define TONE_MAPPING":"",n.toneMapping!==Ms?Ft.tonemapping_pars_fragment:"",n.toneMapping!==Ms?O2("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,L2("linearToOutputTexel",n.outputColorSpace),I2(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(dc).join(`
`)),r=s0(r),r=ub(r,n),r=hb(r,n),o=s0(o),o=ub(o,n),o=hb(o,n),r=fb(r),o=fb(o),n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",n.glslVersion===kg?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===kg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);let v=g+m+r,y=g+u+o,A=ob(s,s.VERTEX_SHADER,v),C=ob(s,s.FRAGMENT_SHADER,y);s.attachShader(S,A),s.attachShader(S,C),n.index0AttributeName!==void 0?s.bindAttribLocation(S,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function w(N){if(e.debug.checkShaderErrors){let F=s.getProgramInfoLog(S)||"",G=s.getShaderInfoLog(A)||"",q=s.getShaderInfoLog(C)||"",J=F.trim(),W=G.trim(),nt=q.trim(),H=!0,rt=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(H=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,S,A,C);else{let ut=cb(s,A,"vertex"),bt=cb(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+J+`
`+ut+`
`+bt)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(W===""||nt==="")&&(rt=!1);rt&&(N.diagnostics={runnable:H,programLog:J,vertexShader:{log:W,prefix:m},fragmentShader:{log:nt,prefix:u}})}s.deleteShader(A),s.deleteShader(C),D=new Io(s,S),T=B2(s,S)}let D;this.getUniforms=function(){return D===void 0&&w(this),D};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let b=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(S,R2)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=D2++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=A,this.fragmentShader=C,this}var K2=0,a0=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let n=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(n),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new r0(t),n.set(t,i)),i}},r0=class{constructor(t){this.id=K2++,this.code=t,this.usedTimes=0}};function Q2(e,t,n,i,s,a,r){let o=new Kl,l=new a0,c=new Set,f=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures,p=s.precision,_={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,b,N,F,G){let q=F.fog,J=G.geometry,W=T.isMeshStandardMaterial?F.environment:null,nt=(T.isMeshStandardMaterial?n:t).get(T.envMap||W),H=nt&&nt.mapping===rc?nt.image.height:null,rt=_[T.type];T.precision!==null&&(p=s.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));let ut=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,bt=ut!==void 0?ut.length:0,Vt=0;J.morphAttributes.position!==void 0&&(Vt=1),J.morphAttributes.normal!==void 0&&(Vt=2),J.morphAttributes.color!==void 0&&(Vt=3);let de,Se,ee,Y;if(rt){let ne=Zi[rt];de=ne.vertexShader,Se=ne.fragmentShader}else de=T.vertexShader,Se=T.fragmentShader,l.update(T),ee=l.getVertexShaderID(T),Y=l.getFragmentShaderID(T);let Q=e.getRenderTarget(),dt=e.state.buffers.depth.getReversed(),Ut=G.isInstancedMesh===!0,Mt=G.isBatchedMesh===!0,Yt=!!T.map,an=!!T.matcap,R=!!nt,Me=!!T.aoMap,Ot=!!T.lightMap,Rt=!!T.bumpMap,gt=!!T.normalMap,be=!!T.displacementMap,_t=!!T.emissiveMap,Bt=!!T.metalnessMap,We=!!T.roughnessMap,Le=T.anisotropy>0,E=T.clearcoat>0,x=T.dispersion>0,I=T.iridescence>0,X=T.sheen>0,K=T.transmission>0,V=Le&&!!T.anisotropyMap,St=E&&!!T.clearcoatMap,it=E&&!!T.clearcoatNormalMap,vt=E&&!!T.clearcoatRoughnessMap,yt=I&&!!T.iridescenceMap,tt=I&&!!T.iridescenceThicknessMap,ct=X&&!!T.sheenColorMap,wt=X&&!!T.sheenRoughnessMap,xt=!!T.specularMap,ot=!!T.specularColorMap,zt=!!T.specularIntensityMap,U=K&&!!T.transmissionMap,et=K&&!!T.thicknessMap,st=!!T.gradientMap,ft=!!T.alphaMap,j=T.alphaTest>0,Z=!!T.alphaHash,mt=!!T.extensions,Lt=Ms;T.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Lt=e.toneMapping);let pe={shaderID:rt,shaderType:T.type,shaderName:T.name,vertexShader:de,fragmentShader:Se,defines:T.defines,customVertexShaderID:ee,customFragmentShaderID:Y,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:Mt,batchingColor:Mt&&G._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&G.instanceColor!==null,instancingMorph:Ut&&G.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:Q===null?e.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Qa,alphaToCoverage:!!T.alphaToCoverage,map:Yt,matcap:an,envMap:R,envMapMode:R&&nt.mapping,envMapCubeUVHeight:H,aoMap:Me,lightMap:Ot,bumpMap:Rt,normalMap:gt,displacementMap:h&&be,emissiveMap:_t,normalMapObjectSpace:gt&&T.normalMapType===IM,normalMapTangentSpace:gt&&T.normalMapType===OM,metalnessMap:Bt,roughnessMap:We,anisotropy:Le,anisotropyMap:V,clearcoat:E,clearcoatMap:St,clearcoatNormalMap:it,clearcoatRoughnessMap:vt,dispersion:x,iridescence:I,iridescenceMap:yt,iridescenceThicknessMap:tt,sheen:X,sheenColorMap:ct,sheenRoughnessMap:wt,specularMap:xt,specularColorMap:ot,specularIntensityMap:zt,transmission:K,transmissionMap:U,thicknessMap:et,gradientMap:st,opaque:T.transparent===!1&&T.blending===Ja&&T.alphaToCoverage===!1,alphaMap:ft,alphaTest:j,alphaHash:Z,combine:T.combine,mapUv:Yt&&S(T.map.channel),aoMapUv:Me&&S(T.aoMap.channel),lightMapUv:Ot&&S(T.lightMap.channel),bumpMapUv:Rt&&S(T.bumpMap.channel),normalMapUv:gt&&S(T.normalMap.channel),displacementMapUv:be&&S(T.displacementMap.channel),emissiveMapUv:_t&&S(T.emissiveMap.channel),metalnessMapUv:Bt&&S(T.metalnessMap.channel),roughnessMapUv:We&&S(T.roughnessMap.channel),anisotropyMapUv:V&&S(T.anisotropyMap.channel),clearcoatMapUv:St&&S(T.clearcoatMap.channel),clearcoatNormalMapUv:it&&S(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&S(T.clearcoatRoughnessMap.channel),iridescenceMapUv:yt&&S(T.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&S(T.iridescenceThicknessMap.channel),sheenColorMapUv:ct&&S(T.sheenColorMap.channel),sheenRoughnessMapUv:wt&&S(T.sheenRoughnessMap.channel),specularMapUv:xt&&S(T.specularMap.channel),specularColorMapUv:ot&&S(T.specularColorMap.channel),specularIntensityMapUv:zt&&S(T.specularIntensityMap.channel),transmissionMapUv:U&&S(T.transmissionMap.channel),thicknessMapUv:et&&S(T.thicknessMap.channel),alphaMapUv:ft&&S(T.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(gt||Le),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!J.attributes.uv&&(Yt||ft),fog:!!q,useFog:T.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:dt,skinning:G.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:bt,morphTextureStride:Vt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:T.dithering,shadowMapEnabled:e.shadowMap.enabled&&N.length>0,shadowMapType:e.shadowMap.type,toneMapping:Lt,decodeVideoTexture:Yt&&T.map.isVideoTexture===!0&&Zt.getTransfer(T.map.colorSpace)===oe,decodeVideoTextureEmissive:_t&&T.emissiveMap.isVideoTexture===!0&&Zt.getTransfer(T.emissiveMap.colorSpace)===oe,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Wi,flipSided:T.side===vn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:mt&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(mt&&T.extensions.multiDraw===!0||Mt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return pe.vertexUv1s=c.has(1),pe.vertexUv2s=c.has(2),pe.vertexUv3s=c.has(3),c.clear(),pe}function u(T){let b=[];if(T.shaderID?b.push(T.shaderID):(b.push(T.customVertexShaderID),b.push(T.customFragmentShaderID)),T.defines!==void 0)for(let N in T.defines)b.push(N),b.push(T.defines[N]);return T.isRawShaderMaterial===!1&&(g(b,T),v(b,T),b.push(e.outputColorSpace)),b.push(T.customProgramCacheKey),b.join()}function g(T,b){T.push(b.precision),T.push(b.outputColorSpace),T.push(b.envMapMode),T.push(b.envMapCubeUVHeight),T.push(b.mapUv),T.push(b.alphaMapUv),T.push(b.lightMapUv),T.push(b.aoMapUv),T.push(b.bumpMapUv),T.push(b.normalMapUv),T.push(b.displacementMapUv),T.push(b.emissiveMapUv),T.push(b.metalnessMapUv),T.push(b.roughnessMapUv),T.push(b.anisotropyMapUv),T.push(b.clearcoatMapUv),T.push(b.clearcoatNormalMapUv),T.push(b.clearcoatRoughnessMapUv),T.push(b.iridescenceMapUv),T.push(b.iridescenceThicknessMapUv),T.push(b.sheenColorMapUv),T.push(b.sheenRoughnessMapUv),T.push(b.specularMapUv),T.push(b.specularColorMapUv),T.push(b.specularIntensityMapUv),T.push(b.transmissionMapUv),T.push(b.thicknessMapUv),T.push(b.combine),T.push(b.fogExp2),T.push(b.sizeAttenuation),T.push(b.morphTargetsCount),T.push(b.morphAttributeCount),T.push(b.numDirLights),T.push(b.numPointLights),T.push(b.numSpotLights),T.push(b.numSpotLightMaps),T.push(b.numHemiLights),T.push(b.numRectAreaLights),T.push(b.numDirLightShadows),T.push(b.numPointLightShadows),T.push(b.numSpotLightShadows),T.push(b.numSpotLightShadowsWithMaps),T.push(b.numLightProbes),T.push(b.shadowMapType),T.push(b.toneMapping),T.push(b.numClippingPlanes),T.push(b.numClipIntersection),T.push(b.depthPacking)}function v(T,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),b.gradientMap&&o.enable(22),T.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),T.push(o.mask)}function y(T){let b=_[T.type],N;if(b){let F=Zi[b];N=qM.clone(F.uniforms)}else N=T.uniforms;return N}function A(T,b){let N;for(let F=0,G=f.length;F<G;F++){let q=f[F];if(q.cacheKey===b){N=q,++N.usedTimes;break}}return N===void 0&&(N=new J2(e,b,T,a),f.push(N)),N}function C(T){if(--T.usedTimes===0){let b=f.indexOf(T);f[b]=f[f.length-1],f.pop(),T.destroy()}}function w(T){l.remove(T)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:y,acquireProgram:A,releaseProgram:C,releaseShaderCache:w,programs:f,dispose:D}}function j2(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function s(r,o,l){e.get(r)[o]=l}function a(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:a}}function $2(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function pb(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function mb(){let e=[],t=0,n=[],i=[],s=[];function a(){t=0,n.length=0,i.length=0,s.length=0}function r(d,h,p,_,S,m){let u=e[t];return u===void 0?(u={id:d.id,object:d,geometry:h,material:p,groupOrder:_,renderOrder:d.renderOrder,z:S,group:m},e[t]=u):(u.id=d.id,u.object=d,u.geometry=h,u.material=p,u.groupOrder=_,u.renderOrder=d.renderOrder,u.z=S,u.group=m),t++,u}function o(d,h,p,_,S,m){let u=r(d,h,p,_,S,m);p.transmission>0?i.push(u):p.transparent===!0?s.push(u):n.push(u)}function l(d,h,p,_,S,m){let u=r(d,h,p,_,S,m);p.transmission>0?i.unshift(u):p.transparent===!0?s.unshift(u):n.unshift(u)}function c(d,h){n.length>1&&n.sort(d||$2),i.length>1&&i.sort(h||pb),s.length>1&&s.sort(h||pb)}function f(){for(let d=t,h=e.length;d<h;d++){let p=e[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:s,init:a,push:o,unshift:l,finish:f,sort:c}}function t3(){let e=new WeakMap;function t(i,s){let a=e.get(i),r;return a===void 0?(r=new mb,e.set(i,[r])):s>=a.length?(r=new mb,a.push(r)):r=a[s],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function e3(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new z,color:new te};break;case"SpotLight":n={position:new z,direction:new z,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new z,color:new te,distance:0,decay:0};break;case"HemisphereLight":n={direction:new z,skyColor:new te,groundColor:new te};break;case"RectAreaLight":n={color:new te,position:new z,halfWidth:new z,halfHeight:new z};break}return e[t.id]=n,n}}}function n3(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var i3=0;function s3(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function a3(e){let t=new e3,n=n3(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);let s=new z,a=new Ge,r=new Ge;function o(c){let f=0,d=0,h=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let p=0,_=0,S=0,m=0,u=0,g=0,v=0,y=0,A=0,C=0,w=0;c.sort(s3);for(let T=0,b=c.length;T<b;T++){let N=c[T],F=N.color,G=N.intensity,q=N.distance,J=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)f+=F.r*G,d+=F.g*G,h+=F.b*G;else if(N.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(N.sh.coefficients[W],G);w++}else if(N.isDirectionalLight){let W=t.get(N);if(W.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let nt=N.shadow,H=n.get(N);H.shadowIntensity=nt.intensity,H.shadowBias=nt.bias,H.shadowNormalBias=nt.normalBias,H.shadowRadius=nt.radius,H.shadowMapSize=nt.mapSize,i.directionalShadow[p]=H,i.directionalShadowMap[p]=J,i.directionalShadowMatrix[p]=N.shadow.matrix,g++}i.directional[p]=W,p++}else if(N.isSpotLight){let W=t.get(N);W.position.setFromMatrixPosition(N.matrixWorld),W.color.copy(F).multiplyScalar(G),W.distance=q,W.coneCos=Math.cos(N.angle),W.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),W.decay=N.decay,i.spot[S]=W;let nt=N.shadow;if(N.map&&(i.spotLightMap[A]=N.map,A++,nt.updateMatrices(N),N.castShadow&&C++),i.spotLightMatrix[S]=nt.matrix,N.castShadow){let H=n.get(N);H.shadowIntensity=nt.intensity,H.shadowBias=nt.bias,H.shadowNormalBias=nt.normalBias,H.shadowRadius=nt.radius,H.shadowMapSize=nt.mapSize,i.spotShadow[S]=H,i.spotShadowMap[S]=J,y++}S++}else if(N.isRectAreaLight){let W=t.get(N);W.color.copy(F).multiplyScalar(G),W.halfWidth.set(N.width*.5,0,0),W.halfHeight.set(0,N.height*.5,0),i.rectArea[m]=W,m++}else if(N.isPointLight){let W=t.get(N);if(W.color.copy(N.color).multiplyScalar(N.intensity),W.distance=N.distance,W.decay=N.decay,N.castShadow){let nt=N.shadow,H=n.get(N);H.shadowIntensity=nt.intensity,H.shadowBias=nt.bias,H.shadowNormalBias=nt.normalBias,H.shadowRadius=nt.radius,H.shadowMapSize=nt.mapSize,H.shadowCameraNear=nt.camera.near,H.shadowCameraFar=nt.camera.far,i.pointShadow[_]=H,i.pointShadowMap[_]=J,i.pointShadowMatrix[_]=N.shadow.matrix,v++}i.point[_]=W,_++}else if(N.isHemisphereLight){let W=t.get(N);W.skyColor.copy(N.color).multiplyScalar(G),W.groundColor.copy(N.groundColor).multiplyScalar(G),i.hemi[u]=W,u++}}m>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=at.LTC_FLOAT_1,i.rectAreaLTC2=at.LTC_FLOAT_2):(i.rectAreaLTC1=at.LTC_HALF_1,i.rectAreaLTC2=at.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=h;let D=i.hash;(D.directionalLength!==p||D.pointLength!==_||D.spotLength!==S||D.rectAreaLength!==m||D.hemiLength!==u||D.numDirectionalShadows!==g||D.numPointShadows!==v||D.numSpotShadows!==y||D.numSpotMaps!==A||D.numLightProbes!==w)&&(i.directional.length=p,i.spot.length=S,i.rectArea.length=m,i.point.length=_,i.hemi.length=u,i.directionalShadow.length=g,i.directionalShadowMap.length=g,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=g,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=y+A-C,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=w,D.directionalLength=p,D.pointLength=_,D.spotLength=S,D.rectAreaLength=m,D.hemiLength=u,D.numDirectionalShadows=g,D.numPointShadows=v,D.numSpotShadows=y,D.numSpotMaps=A,D.numLightProbes=w,i.version=i3++)}function l(c,f){let d=0,h=0,p=0,_=0,S=0,m=f.matrixWorldInverse;for(let u=0,g=c.length;u<g;u++){let v=c[u];if(v.isDirectionalLight){let y=i.directional[d];y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(v.isSpotLight){let y=i.spot[p];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(v.isRectAreaLight){let y=i.rectArea[_];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),r.identity(),a.copy(v.matrixWorld),a.premultiply(m),r.extractRotation(a),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),_++}else if(v.isPointLight){let y=i.point[h];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),h++}else if(v.isHemisphereLight){let y=i.hemi[S];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(m),S++}}}return{setup:o,setupView:l,state:i}}function gb(e){let t=new a3(e),n=[],i=[];function s(f){c.camera=f,n.length=0,i.length=0}function a(f){n.push(f)}function r(f){i.push(f)}function o(){t.setup(n)}function l(f){t.setupView(n,f)}let c={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:r}}function r3(e){let t=new WeakMap;function n(s,a=0){let r=t.get(s),o;return r===void 0?(o=new gb(e),t.set(s,[o])):a>=r.length?(o=new gb(e),r.push(o)):o=r[a],o}function i(){t=new WeakMap}return{get:n,dispose:i}}var o3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,l3=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function c3(e,t,n){let i=new nc,s=new $t,a=new $t,r=new Ne,o=new Ph({depthPacking:LM}),l=new zh,c={},f=n.maxTextureSize,d={[vs]:vn,[vn]:vs,[Wi]:Wi},h=new Zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $t},radius:{value:4}},vertexShader:o3,fragmentShader:l3}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let _=new ha;_.setAttribute("position",new qn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let S=new Rn(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cg;let u=this.type;this.render=function(C,w,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let T=e.getRenderTarget(),b=e.getActiveCubeFace(),N=e.getActiveMipmapLevel(),F=e.state;F.setBlending(Ss),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let G=u!==Xi&&this.type===Xi,q=u===Xi&&this.type!==Xi;for(let J=0,W=C.length;J<W;J++){let nt=C[J],H=nt.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let rt=H.getFrameExtents();if(s.multiply(rt),a.copy(H.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(a.x=Math.floor(f/rt.x),s.x=a.x*rt.x,H.mapSize.x=a.x),s.y>f&&(a.y=Math.floor(f/rt.y),s.y=a.y*rt.y,H.mapSize.y=a.y)),H.map===null||G===!0||q===!0){let bt=this.type!==Xi?{minFilter:ci,magFilter:ci}:{};H.map!==null&&H.map.dispose(),H.map=new Gi(s.x,s.y,bt),H.map.texture.name=nt.name+".shadowMap",H.camera.updateProjectionMatrix()}e.setRenderTarget(H.map),e.clear();let ut=H.getViewportCount();for(let bt=0;bt<ut;bt++){let Vt=H.getViewport(bt);r.set(a.x*Vt.x,a.y*Vt.y,a.x*Vt.z,a.y*Vt.w),F.viewport(r),H.updateMatrices(nt,bt),i=H.getFrustum(),y(w,D,H.camera,nt,this.type)}H.isPointLightShadow!==!0&&this.type===Xi&&g(H,D),H.needsUpdate=!1}u=this.type,m.needsUpdate=!1,e.setRenderTarget(T,b,N)};function g(C,w){let D=t.update(S);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Gi(s.x,s.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,e.setRenderTarget(C.mapPass),e.clear(),e.renderBufferDirect(w,null,D,h,S,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,e.setRenderTarget(C.map),e.clear(),e.renderBufferDirect(w,null,D,p,S,null)}function v(C,w,D,T){let b=null,N=D.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(N!==void 0)b=N;else if(b=D.isPointLight===!0?l:o,e.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let F=b.uuid,G=w.uuid,q=c[F];q===void 0&&(q={},c[F]=q);let J=q[G];J===void 0&&(J=b.clone(),q[G]=J,w.addEventListener("dispose",A)),b=J}if(b.visible=w.visible,b.wireframe=w.wireframe,T===Xi?b.side=w.shadowSide!==null?w.shadowSide:w.side:b.side=w.shadowSide!==null?w.shadowSide:d[w.side],b.alphaMap=w.alphaMap,b.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,b.map=w.map,b.clipShadows=w.clipShadows,b.clippingPlanes=w.clippingPlanes,b.clipIntersection=w.clipIntersection,b.displacementMap=w.displacementMap,b.displacementScale=w.displacementScale,b.displacementBias=w.displacementBias,b.wireframeLinewidth=w.wireframeLinewidth,b.linewidth=w.linewidth,D.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let F=e.properties.get(b);F.light=D}return b}function y(C,w,D,T,b){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&b===Xi)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,C.matrixWorld);let G=t.update(C),q=C.material;if(Array.isArray(q)){let J=G.groups;for(let W=0,nt=J.length;W<nt;W++){let H=J[W],rt=q[H.materialIndex];if(rt&&rt.visible){let ut=v(C,rt,T,b);C.onBeforeShadow(e,C,w,D,G,ut,H),e.renderBufferDirect(D,null,G,ut,C,H),C.onAfterShadow(e,C,w,D,G,ut,H)}}}else if(q.visible){let J=v(C,q,T,b);C.onBeforeShadow(e,C,w,D,G,J,null),e.renderBufferDirect(D,null,G,J,C,null),C.onAfterShadow(e,C,w,D,G,J,null)}}let F=C.children;for(let G=0,q=F.length;G<q;G++)y(F[G],w,D,T,b)}function A(C){C.target.removeEventListener("dispose",A);for(let D in c){let T=c[D],b=C.target.uuid;b in T&&(T[b].dispose(),delete T[b])}}}var u3={[Jh]:Kh,[Qh]:tf,[jh]:ef,[Ka]:$h,[Kh]:Jh,[tf]:Qh,[ef]:jh,[$h]:Ka};function h3(e,t){function n(){let U=!1,et=new Ne,st=null,ft=new Ne(0,0,0,0);return{setMask:function(j){st!==j&&!U&&(e.colorMask(j,j,j,j),st=j)},setLocked:function(j){U=j},setClear:function(j,Z,mt,Lt,pe){pe===!0&&(j*=Lt,Z*=Lt,mt*=Lt),et.set(j,Z,mt,Lt),ft.equals(et)===!1&&(e.clearColor(j,Z,mt,Lt),ft.copy(et))},reset:function(){U=!1,st=null,ft.set(-1,0,0,0)}}}function i(){let U=!1,et=!1,st=null,ft=null,j=null;return{setReversed:function(Z){if(et!==Z){let mt=t.get("EXT_clip_control");Z?mt.clipControlEXT(mt.LOWER_LEFT_EXT,mt.ZERO_TO_ONE_EXT):mt.clipControlEXT(mt.LOWER_LEFT_EXT,mt.NEGATIVE_ONE_TO_ONE_EXT),et=Z;let Lt=j;j=null,this.setClear(Lt)}},getReversed:function(){return et},setTest:function(Z){Z?Q(e.DEPTH_TEST):dt(e.DEPTH_TEST)},setMask:function(Z){st!==Z&&!U&&(e.depthMask(Z),st=Z)},setFunc:function(Z){if(et&&(Z=u3[Z]),ft!==Z){switch(Z){case Jh:e.depthFunc(e.NEVER);break;case Kh:e.depthFunc(e.ALWAYS);break;case Qh:e.depthFunc(e.LESS);break;case Ka:e.depthFunc(e.LEQUAL);break;case jh:e.depthFunc(e.EQUAL);break;case $h:e.depthFunc(e.GEQUAL);break;case tf:e.depthFunc(e.GREATER);break;case ef:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ft=Z}},setLocked:function(Z){U=Z},setClear:function(Z){j!==Z&&(et&&(Z=1-Z),e.clearDepth(Z),j=Z)},reset:function(){U=!1,st=null,ft=null,j=null,et=!1}}}function s(){let U=!1,et=null,st=null,ft=null,j=null,Z=null,mt=null,Lt=null,pe=null;return{setTest:function(ne){U||(ne?Q(e.STENCIL_TEST):dt(e.STENCIL_TEST))},setMask:function(ne){et!==ne&&!U&&(e.stencilMask(ne),et=ne)},setFunc:function(ne,Ji,bi){(st!==ne||ft!==Ji||j!==bi)&&(e.stencilFunc(ne,Ji,bi),st=ne,ft=Ji,j=bi)},setOp:function(ne,Ji,bi){(Z!==ne||mt!==Ji||Lt!==bi)&&(e.stencilOp(ne,Ji,bi),Z=ne,mt=Ji,Lt=bi)},setLocked:function(ne){U=ne},setClear:function(ne){pe!==ne&&(e.clearStencil(ne),pe=ne)},reset:function(){U=!1,et=null,st=null,ft=null,j=null,Z=null,mt=null,Lt=null,pe=null}}}let a=new n,r=new i,o=new s,l=new WeakMap,c=new WeakMap,f={},d={},h=new WeakMap,p=[],_=null,S=!1,m=null,u=null,g=null,v=null,y=null,A=null,C=null,w=new te(0,0,0),D=0,T=!1,b=null,N=null,F=null,G=null,q=null,J=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,nt=0,H=e.getParameter(e.VERSION);H.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(H)[1]),W=nt>=1):H.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),W=nt>=2);let rt=null,ut={},bt=e.getParameter(e.SCISSOR_BOX),Vt=e.getParameter(e.VIEWPORT),de=new Ne().fromArray(bt),Se=new Ne().fromArray(Vt);function ee(U,et,st,ft){let j=new Uint8Array(4),Z=e.createTexture();e.bindTexture(U,Z),e.texParameteri(U,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(U,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let mt=0;mt<st;mt++)U===e.TEXTURE_3D||U===e.TEXTURE_2D_ARRAY?e.texImage3D(et,0,e.RGBA,1,1,ft,0,e.RGBA,e.UNSIGNED_BYTE,j):e.texImage2D(et+mt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,j);return Z}let Y={};Y[e.TEXTURE_2D]=ee(e.TEXTURE_2D,e.TEXTURE_2D,1),Y[e.TEXTURE_CUBE_MAP]=ee(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[e.TEXTURE_2D_ARRAY]=ee(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Y[e.TEXTURE_3D]=ee(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),Q(e.DEPTH_TEST),r.setFunc(Ka),Rt(!1),gt(wg),Q(e.CULL_FACE),Me(Ss);function Q(U){f[U]!==!0&&(e.enable(U),f[U]=!0)}function dt(U){f[U]!==!1&&(e.disable(U),f[U]=!1)}function Ut(U,et){return d[U]!==et?(e.bindFramebuffer(U,et),d[U]=et,U===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=et),U===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=et),!0):!1}function Mt(U,et){let st=p,ft=!1;if(U){st=h.get(et),st===void 0&&(st=[],h.set(et,st));let j=U.textures;if(st.length!==j.length||st[0]!==e.COLOR_ATTACHMENT0){for(let Z=0,mt=j.length;Z<mt;Z++)st[Z]=e.COLOR_ATTACHMENT0+Z;st.length=j.length,ft=!0}}else st[0]!==e.BACK&&(st[0]=e.BACK,ft=!0);ft&&e.drawBuffers(st)}function Yt(U){return _!==U?(e.useProgram(U),_=U,!0):!1}let an={[ca]:e.FUNC_ADD,[aM]:e.FUNC_SUBTRACT,[rM]:e.FUNC_REVERSE_SUBTRACT};an[oM]=e.MIN,an[lM]=e.MAX;let R={[cM]:e.ZERO,[uM]:e.ONE,[hM]:e.SRC_COLOR,[Th]:e.SRC_ALPHA,[_M]:e.SRC_ALPHA_SATURATE,[mM]:e.DST_COLOR,[dM]:e.DST_ALPHA,[fM]:e.ONE_MINUS_SRC_COLOR,[Eh]:e.ONE_MINUS_SRC_ALPHA,[gM]:e.ONE_MINUS_DST_COLOR,[pM]:e.ONE_MINUS_DST_ALPHA,[vM]:e.CONSTANT_COLOR,[yM]:e.ONE_MINUS_CONSTANT_COLOR,[xM]:e.CONSTANT_ALPHA,[SM]:e.ONE_MINUS_CONSTANT_ALPHA};function Me(U,et,st,ft,j,Z,mt,Lt,pe,ne){if(U===Ss){S===!0&&(dt(e.BLEND),S=!1);return}if(S===!1&&(Q(e.BLEND),S=!0),U!==sM){if(U!==m||ne!==T){if((u!==ca||y!==ca)&&(e.blendEquation(e.FUNC_ADD),u=ca,y=ca),ne)switch(U){case Ja:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Rg:e.blendFunc(e.ONE,e.ONE);break;case Dg:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Ug:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Ja:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Rg:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Dg:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ug:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}g=null,v=null,A=null,C=null,w.set(0,0,0),D=0,m=U,T=ne}return}j=j||et,Z=Z||st,mt=mt||ft,(et!==u||j!==y)&&(e.blendEquationSeparate(an[et],an[j]),u=et,y=j),(st!==g||ft!==v||Z!==A||mt!==C)&&(e.blendFuncSeparate(R[st],R[ft],R[Z],R[mt]),g=st,v=ft,A=Z,C=mt),(Lt.equals(w)===!1||pe!==D)&&(e.blendColor(Lt.r,Lt.g,Lt.b,pe),w.copy(Lt),D=pe),m=U,T=!1}function Ot(U,et){U.side===Wi?dt(e.CULL_FACE):Q(e.CULL_FACE);let st=U.side===vn;et&&(st=!st),Rt(st),U.blending===Ja&&U.transparent===!1?Me(Ss):Me(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),r.setFunc(U.depthFunc),r.setTest(U.depthTest),r.setMask(U.depthWrite),a.setMask(U.colorWrite);let ft=U.stencilWrite;o.setTest(ft),ft&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),_t(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?Q(e.SAMPLE_ALPHA_TO_COVERAGE):dt(e.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(U){b!==U&&(U?e.frontFace(e.CW):e.frontFace(e.CCW),b=U)}function gt(U){U!==eM?(Q(e.CULL_FACE),U!==N&&(U===wg?e.cullFace(e.BACK):U===nM?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):dt(e.CULL_FACE),N=U}function be(U){U!==F&&(W&&e.lineWidth(U),F=U)}function _t(U,et,st){U?(Q(e.POLYGON_OFFSET_FILL),(G!==et||q!==st)&&(e.polygonOffset(et,st),G=et,q=st)):dt(e.POLYGON_OFFSET_FILL)}function Bt(U){U?Q(e.SCISSOR_TEST):dt(e.SCISSOR_TEST)}function We(U){U===void 0&&(U=e.TEXTURE0+J-1),rt!==U&&(e.activeTexture(U),rt=U)}function Le(U,et,st){st===void 0&&(rt===null?st=e.TEXTURE0+J-1:st=rt);let ft=ut[st];ft===void 0&&(ft={type:void 0,texture:void 0},ut[st]=ft),(ft.type!==U||ft.texture!==et)&&(rt!==st&&(e.activeTexture(st),rt=st),e.bindTexture(U,et||Y[U]),ft.type=U,ft.texture=et)}function E(){let U=ut[rt];U!==void 0&&U.type!==void 0&&(e.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function x(){try{e.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function I(){try{e.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{e.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{e.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function V(){try{e.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function St(){try{e.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{e.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function vt(){try{e.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function yt(){try{e.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function tt(){try{e.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ct(U){de.equals(U)===!1&&(e.scissor(U.x,U.y,U.z,U.w),de.copy(U))}function wt(U){Se.equals(U)===!1&&(e.viewport(U.x,U.y,U.z,U.w),Se.copy(U))}function xt(U,et){let st=c.get(et);st===void 0&&(st=new WeakMap,c.set(et,st));let ft=st.get(U);ft===void 0&&(ft=e.getUniformBlockIndex(et,U.name),st.set(U,ft))}function ot(U,et){let ft=c.get(et).get(U);l.get(et)!==ft&&(e.uniformBlockBinding(et,ft,U.__bindingPointIndex),l.set(et,ft))}function zt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),f={},rt=null,ut={},d={},h=new WeakMap,p=[],_=null,S=!1,m=null,u=null,g=null,v=null,y=null,A=null,C=null,w=new te(0,0,0),D=0,T=!1,b=null,N=null,F=null,G=null,q=null,de.set(0,0,e.canvas.width,e.canvas.height),Se.set(0,0,e.canvas.width,e.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:Q,disable:dt,bindFramebuffer:Ut,drawBuffers:Mt,useProgram:Yt,setBlending:Me,setMaterial:Ot,setFlipSided:Rt,setCullFace:gt,setLineWidth:be,setPolygonOffset:_t,setScissorTest:Bt,activeTexture:We,bindTexture:Le,unbindTexture:E,compressedTexImage2D:x,compressedTexImage3D:I,texImage2D:yt,texImage3D:tt,updateUBOMapping:xt,uniformBlockBinding:ot,texStorage2D:it,texStorage3D:vt,texSubImage2D:X,texSubImage3D:K,compressedTexSubImage2D:V,compressedTexSubImage3D:St,scissor:ct,viewport:wt,reset:zt}}function f3(e,t,n,i,s,a,r){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $t,f=new WeakMap,d,h=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(E,x){return p?new OffscreenCanvas(E,x):Zl("canvas")}function S(E,x,I){let X=1,K=Le(E);if((K.width>I||K.height>I)&&(X=I/Math.max(K.width,K.height)),X<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let V=Math.floor(X*K.width),St=Math.floor(X*K.height);d===void 0&&(d=_(V,St));let it=x?_(V,St):d;return it.width=V,it.height=St,it.getContext("2d").drawImage(E,0,0,V,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+V+"x"+St+")."),it}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),E;return E}function m(E){return E.generateMipmaps}function u(E){e.generateMipmap(E)}function g(E){return E.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?e.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function v(E,x,I,X,K=!1){if(E!==null){if(e[E]!==void 0)return e[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let V=x;if(x===e.RED&&(I===e.FLOAT&&(V=e.R32F),I===e.HALF_FLOAT&&(V=e.R16F),I===e.UNSIGNED_BYTE&&(V=e.R8)),x===e.RED_INTEGER&&(I===e.UNSIGNED_BYTE&&(V=e.R8UI),I===e.UNSIGNED_SHORT&&(V=e.R16UI),I===e.UNSIGNED_INT&&(V=e.R32UI),I===e.BYTE&&(V=e.R8I),I===e.SHORT&&(V=e.R16I),I===e.INT&&(V=e.R32I)),x===e.RG&&(I===e.FLOAT&&(V=e.RG32F),I===e.HALF_FLOAT&&(V=e.RG16F),I===e.UNSIGNED_BYTE&&(V=e.RG8)),x===e.RG_INTEGER&&(I===e.UNSIGNED_BYTE&&(V=e.RG8UI),I===e.UNSIGNED_SHORT&&(V=e.RG16UI),I===e.UNSIGNED_INT&&(V=e.RG32UI),I===e.BYTE&&(V=e.RG8I),I===e.SHORT&&(V=e.RG16I),I===e.INT&&(V=e.RG32I)),x===e.RGB_INTEGER&&(I===e.UNSIGNED_BYTE&&(V=e.RGB8UI),I===e.UNSIGNED_SHORT&&(V=e.RGB16UI),I===e.UNSIGNED_INT&&(V=e.RGB32UI),I===e.BYTE&&(V=e.RGB8I),I===e.SHORT&&(V=e.RGB16I),I===e.INT&&(V=e.RGB32I)),x===e.RGBA_INTEGER&&(I===e.UNSIGNED_BYTE&&(V=e.RGBA8UI),I===e.UNSIGNED_SHORT&&(V=e.RGBA16UI),I===e.UNSIGNED_INT&&(V=e.RGBA32UI),I===e.BYTE&&(V=e.RGBA8I),I===e.SHORT&&(V=e.RGBA16I),I===e.INT&&(V=e.RGBA32I)),x===e.RGB&&(I===e.UNSIGNED_INT_5_9_9_9_REV&&(V=e.RGB9_E5),I===e.UNSIGNED_INT_10F_11F_11F_REV&&(V=e.R11F_G11F_B10F)),x===e.RGBA){let St=K?ql:Zt.getTransfer(X);I===e.FLOAT&&(V=e.RGBA32F),I===e.HALF_FLOAT&&(V=e.RGBA16F),I===e.UNSIGNED_BYTE&&(V=St===oe?e.SRGB8_ALPHA8:e.RGBA8),I===e.UNSIGNED_SHORT_4_4_4_4&&(V=e.RGBA4),I===e.UNSIGNED_SHORT_5_5_5_1&&(V=e.RGB5_A1)}return(V===e.R16F||V===e.R32F||V===e.RG16F||V===e.RG32F||V===e.RGBA16F||V===e.RGBA32F)&&t.get("EXT_color_buffer_float"),V}function y(E,x){let I;return E?x===null||x===ma||x===Uo?I=e.DEPTH24_STENCIL8:x===Yi?I=e.DEPTH32F_STENCIL8:x===Ro&&(I=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ma||x===Uo?I=e.DEPTH_COMPONENT24:x===Yi?I=e.DEPTH_COMPONENT32F:x===Ro&&(I=e.DEPTH_COMPONENT16),I}function A(E,x){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==ci&&E.minFilter!==Mi?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function C(E){let x=E.target;x.removeEventListener("dispose",C),D(x),x.isVideoTexture&&f.delete(x)}function w(E){let x=E.target;x.removeEventListener("dispose",w),b(x)}function D(E){let x=i.get(E);if(x.__webglInit===void 0)return;let I=E.source,X=h.get(I);if(X){let K=X[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&T(E),Object.keys(X).length===0&&h.delete(I)}i.remove(E)}function T(E){let x=i.get(E);e.deleteTexture(x.__webglTexture);let I=E.source,X=h.get(I);delete X[x.__cacheKey],r.memory.textures--}function b(E){let x=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(x.__webglFramebuffer[X]))for(let K=0;K<x.__webglFramebuffer[X].length;K++)e.deleteFramebuffer(x.__webglFramebuffer[X][K]);else e.deleteFramebuffer(x.__webglFramebuffer[X]);x.__webglDepthbuffer&&e.deleteRenderbuffer(x.__webglDepthbuffer[X])}else{if(Array.isArray(x.__webglFramebuffer))for(let X=0;X<x.__webglFramebuffer.length;X++)e.deleteFramebuffer(x.__webglFramebuffer[X]);else e.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&e.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&e.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let X=0;X<x.__webglColorRenderbuffer.length;X++)x.__webglColorRenderbuffer[X]&&e.deleteRenderbuffer(x.__webglColorRenderbuffer[X]);x.__webglDepthRenderbuffer&&e.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let I=E.textures;for(let X=0,K=I.length;X<K;X++){let V=i.get(I[X]);V.__webglTexture&&(e.deleteTexture(V.__webglTexture),r.memory.textures--),i.remove(I[X])}i.remove(E)}let N=0;function F(){N=0}function G(){let E=N;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),N+=1,E}function q(E){let x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function J(E,x){let I=i.get(E);if(E.isVideoTexture&&Bt(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&I.__version!==E.version){let X=E.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(I,E,x);return}}else E.isExternalTexture&&(I.__webglTexture=E.sourceTexture?E.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,I.__webglTexture,e.TEXTURE0+x)}function W(E,x){let I=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&I.__version!==E.version){Y(I,E,x);return}n.bindTexture(e.TEXTURE_2D_ARRAY,I.__webglTexture,e.TEXTURE0+x)}function nt(E,x){let I=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&I.__version!==E.version){Y(I,E,x);return}n.bindTexture(e.TEXTURE_3D,I.__webglTexture,e.TEXTURE0+x)}function H(E,x){let I=i.get(E);if(E.version>0&&I.__version!==E.version){Q(I,E,x);return}n.bindTexture(e.TEXTURE_CUBE_MAP,I.__webglTexture,e.TEXTURE0+x)}let rt={[Ah]:e.REPEAT,[la]:e.CLAMP_TO_EDGE,[wh]:e.MIRRORED_REPEAT},ut={[ci]:e.NEAREST,[UM]:e.NEAREST_MIPMAP_NEAREST,[oc]:e.NEAREST_MIPMAP_LINEAR,[Mi]:e.LINEAR,[af]:e.LINEAR_MIPMAP_NEAREST,[pa]:e.LINEAR_MIPMAP_LINEAR},bt={[PM]:e.NEVER,[GM]:e.ALWAYS,[zM]:e.LESS,[Gg]:e.LEQUAL,[BM]:e.EQUAL,[VM]:e.GEQUAL,[FM]:e.GREATER,[HM]:e.NOTEQUAL};function Vt(E,x){if(x.type===Yi&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Mi||x.magFilter===af||x.magFilter===oc||x.magFilter===pa||x.minFilter===Mi||x.minFilter===af||x.minFilter===oc||x.minFilter===pa)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(E,e.TEXTURE_WRAP_S,rt[x.wrapS]),e.texParameteri(E,e.TEXTURE_WRAP_T,rt[x.wrapT]),(E===e.TEXTURE_3D||E===e.TEXTURE_2D_ARRAY)&&e.texParameteri(E,e.TEXTURE_WRAP_R,rt[x.wrapR]),e.texParameteri(E,e.TEXTURE_MAG_FILTER,ut[x.magFilter]),e.texParameteri(E,e.TEXTURE_MIN_FILTER,ut[x.minFilter]),x.compareFunction&&(e.texParameteri(E,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(E,e.TEXTURE_COMPARE_FUNC,bt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===ci||x.minFilter!==oc&&x.minFilter!==pa||x.type===Yi&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let I=t.get("EXT_texture_filter_anisotropic");e.texParameterf(E,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function de(E,x){let I=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",C));let X=x.source,K=h.get(X);K===void 0&&(K={},h.set(X,K));let V=q(x);if(V!==E.__cacheKey){K[V]===void 0&&(K[V]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,I=!0),K[V].usedTimes++;let St=K[E.__cacheKey];St!==void 0&&(K[E.__cacheKey].usedTimes--,St.usedTimes===0&&T(x)),E.__cacheKey=V,E.__webglTexture=K[V].texture}return I}function Se(E,x,I){return Math.floor(Math.floor(E/I)/x)}function ee(E,x,I,X){let V=E.updateRanges;if(V.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,x.width,x.height,I,X,x.data);else{V.sort((tt,ct)=>tt.start-ct.start);let St=0;for(let tt=1;tt<V.length;tt++){let ct=V[St],wt=V[tt],xt=ct.start+ct.count,ot=Se(wt.start,x.width,4),zt=Se(ct.start,x.width,4);wt.start<=xt+1&&ot===zt&&Se(wt.start+wt.count-1,x.width,4)===ot?ct.count=Math.max(ct.count,wt.start+wt.count-ct.start):(++St,V[St]=wt)}V.length=St+1;let it=e.getParameter(e.UNPACK_ROW_LENGTH),vt=e.getParameter(e.UNPACK_SKIP_PIXELS),yt=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,x.width);for(let tt=0,ct=V.length;tt<ct;tt++){let wt=V[tt],xt=Math.floor(wt.start/4),ot=Math.ceil(wt.count/4),zt=xt%x.width,U=Math.floor(xt/x.width),et=ot,st=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,zt),e.pixelStorei(e.UNPACK_SKIP_ROWS,U),n.texSubImage2D(e.TEXTURE_2D,0,zt,U,et,st,I,X,x.data)}E.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,it),e.pixelStorei(e.UNPACK_SKIP_PIXELS,vt),e.pixelStorei(e.UNPACK_SKIP_ROWS,yt)}}function Y(E,x,I){let X=e.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(X=e.TEXTURE_2D_ARRAY),x.isData3DTexture&&(X=e.TEXTURE_3D);let K=de(E,x),V=x.source;n.bindTexture(X,E.__webglTexture,e.TEXTURE0+I);let St=i.get(V);if(V.version!==St.__version||K===!0){n.activeTexture(e.TEXTURE0+I);let it=Zt.getPrimaries(Zt.workingColorSpace),vt=x.colorSpace===bs?null:Zt.getPrimaries(x.colorSpace),yt=x.colorSpace===bs||it===vt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);let tt=S(x.image,!1,s.maxTextureSize);tt=We(x,tt);let ct=a.convert(x.format,x.colorSpace),wt=a.convert(x.type),xt=v(x.internalFormat,ct,wt,x.colorSpace,x.isVideoTexture);Vt(X,x);let ot,zt=x.mipmaps,U=x.isVideoTexture!==!0,et=St.__version===void 0||K===!0,st=V.dataReady,ft=A(x,tt);if(x.isDepthTexture)xt=y(x.format===No,x.type),et&&(U?n.texStorage2D(e.TEXTURE_2D,1,xt,tt.width,tt.height):n.texImage2D(e.TEXTURE_2D,0,xt,tt.width,tt.height,0,ct,wt,null));else if(x.isDataTexture)if(zt.length>0){U&&et&&n.texStorage2D(e.TEXTURE_2D,ft,xt,zt[0].width,zt[0].height);for(let j=0,Z=zt.length;j<Z;j++)ot=zt[j],U?st&&n.texSubImage2D(e.TEXTURE_2D,j,0,0,ot.width,ot.height,ct,wt,ot.data):n.texImage2D(e.TEXTURE_2D,j,xt,ot.width,ot.height,0,ct,wt,ot.data);x.generateMipmaps=!1}else U?(et&&n.texStorage2D(e.TEXTURE_2D,ft,xt,tt.width,tt.height),st&&ee(x,tt,ct,wt)):n.texImage2D(e.TEXTURE_2D,0,xt,tt.width,tt.height,0,ct,wt,tt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){U&&et&&n.texStorage3D(e.TEXTURE_2D_ARRAY,ft,xt,zt[0].width,zt[0].height,tt.depth);for(let j=0,Z=zt.length;j<Z;j++)if(ot=zt[j],x.format!==hi)if(ct!==null)if(U){if(st)if(x.layerUpdates.size>0){let mt=Zg(ot.width,ot.height,x.format,x.type);for(let Lt of x.layerUpdates){let pe=ot.data.subarray(Lt*mt/ot.data.BYTES_PER_ELEMENT,(Lt+1)*mt/ot.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,j,0,0,Lt,ot.width,ot.height,1,ct,pe)}x.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,j,0,0,0,ot.width,ot.height,tt.depth,ct,ot.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,j,xt,ot.width,ot.height,tt.depth,0,ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?st&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,j,0,0,0,ot.width,ot.height,tt.depth,ct,wt,ot.data):n.texImage3D(e.TEXTURE_2D_ARRAY,j,xt,ot.width,ot.height,tt.depth,0,ct,wt,ot.data)}else{U&&et&&n.texStorage2D(e.TEXTURE_2D,ft,xt,zt[0].width,zt[0].height);for(let j=0,Z=zt.length;j<Z;j++)ot=zt[j],x.format!==hi?ct!==null?U?st&&n.compressedTexSubImage2D(e.TEXTURE_2D,j,0,0,ot.width,ot.height,ct,ot.data):n.compressedTexImage2D(e.TEXTURE_2D,j,xt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?st&&n.texSubImage2D(e.TEXTURE_2D,j,0,0,ot.width,ot.height,ct,wt,ot.data):n.texImage2D(e.TEXTURE_2D,j,xt,ot.width,ot.height,0,ct,wt,ot.data)}else if(x.isDataArrayTexture)if(U){if(et&&n.texStorage3D(e.TEXTURE_2D_ARRAY,ft,xt,tt.width,tt.height,tt.depth),st)if(x.layerUpdates.size>0){let j=Zg(tt.width,tt.height,x.format,x.type);for(let Z of x.layerUpdates){let mt=tt.data.subarray(Z*j/tt.data.BYTES_PER_ELEMENT,(Z+1)*j/tt.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,Z,tt.width,tt.height,1,ct,wt,mt)}x.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ct,wt,tt.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,xt,tt.width,tt.height,tt.depth,0,ct,wt,tt.data);else if(x.isData3DTexture)U?(et&&n.texStorage3D(e.TEXTURE_3D,ft,xt,tt.width,tt.height,tt.depth),st&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ct,wt,tt.data)):n.texImage3D(e.TEXTURE_3D,0,xt,tt.width,tt.height,tt.depth,0,ct,wt,tt.data);else if(x.isFramebufferTexture){if(et)if(U)n.texStorage2D(e.TEXTURE_2D,ft,xt,tt.width,tt.height);else{let j=tt.width,Z=tt.height;for(let mt=0;mt<ft;mt++)n.texImage2D(e.TEXTURE_2D,mt,xt,j,Z,0,ct,wt,null),j>>=1,Z>>=1}}else if(zt.length>0){if(U&&et){let j=Le(zt[0]);n.texStorage2D(e.TEXTURE_2D,ft,xt,j.width,j.height)}for(let j=0,Z=zt.length;j<Z;j++)ot=zt[j],U?st&&n.texSubImage2D(e.TEXTURE_2D,j,0,0,ct,wt,ot):n.texImage2D(e.TEXTURE_2D,j,xt,ct,wt,ot);x.generateMipmaps=!1}else if(U){if(et){let j=Le(tt);n.texStorage2D(e.TEXTURE_2D,ft,xt,j.width,j.height)}st&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,ct,wt,tt)}else n.texImage2D(e.TEXTURE_2D,0,xt,ct,wt,tt);m(x)&&u(X),St.__version=V.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function Q(E,x,I){if(x.image.length!==6)return;let X=de(E,x),K=x.source;n.bindTexture(e.TEXTURE_CUBE_MAP,E.__webglTexture,e.TEXTURE0+I);let V=i.get(K);if(K.version!==V.__version||X===!0){n.activeTexture(e.TEXTURE0+I);let St=Zt.getPrimaries(Zt.workingColorSpace),it=x.colorSpace===bs?null:Zt.getPrimaries(x.colorSpace),vt=x.colorSpace===bs||St===it?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let yt=x.isCompressedTexture||x.image[0].isCompressedTexture,tt=x.image[0]&&x.image[0].isDataTexture,ct=[];for(let Z=0;Z<6;Z++)!yt&&!tt?ct[Z]=S(x.image[Z],!0,s.maxCubemapSize):ct[Z]=tt?x.image[Z].image:x.image[Z],ct[Z]=We(x,ct[Z]);let wt=ct[0],xt=a.convert(x.format,x.colorSpace),ot=a.convert(x.type),zt=v(x.internalFormat,xt,ot,x.colorSpace),U=x.isVideoTexture!==!0,et=V.__version===void 0||X===!0,st=K.dataReady,ft=A(x,wt);Vt(e.TEXTURE_CUBE_MAP,x);let j;if(yt){U&&et&&n.texStorage2D(e.TEXTURE_CUBE_MAP,ft,zt,wt.width,wt.height);for(let Z=0;Z<6;Z++){j=ct[Z].mipmaps;for(let mt=0;mt<j.length;mt++){let Lt=j[mt];x.format!==hi?xt!==null?U?st&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt,0,0,Lt.width,Lt.height,xt,Lt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt,zt,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?st&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt,0,0,Lt.width,Lt.height,xt,ot,Lt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt,zt,Lt.width,Lt.height,0,xt,ot,Lt.data)}}}else{if(j=x.mipmaps,U&&et){j.length>0&&ft++;let Z=Le(ct[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,ft,zt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(tt){U?st&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ct[Z].width,ct[Z].height,xt,ot,ct[Z].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,zt,ct[Z].width,ct[Z].height,0,xt,ot,ct[Z].data);for(let mt=0;mt<j.length;mt++){let pe=j[mt].image[Z].image;U?st&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt+1,0,0,pe.width,pe.height,xt,ot,pe.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt+1,zt,pe.width,pe.height,0,xt,ot,pe.data)}}else{U?st&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,xt,ot,ct[Z]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,zt,xt,ot,ct[Z]);for(let mt=0;mt<j.length;mt++){let Lt=j[mt];U?st&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt+1,0,0,xt,ot,Lt.image[Z]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt+1,zt,xt,ot,Lt.image[Z])}}}m(x)&&u(e.TEXTURE_CUBE_MAP),V.__version=K.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function dt(E,x,I,X,K,V){let St=a.convert(I.format,I.colorSpace),it=a.convert(I.type),vt=v(I.internalFormat,St,it,I.colorSpace),yt=i.get(x),tt=i.get(I);if(tt.__renderTarget=x,!yt.__hasExternalTextures){let ct=Math.max(1,x.width>>V),wt=Math.max(1,x.height>>V);K===e.TEXTURE_3D||K===e.TEXTURE_2D_ARRAY?n.texImage3D(K,V,vt,ct,wt,x.depth,0,St,it,null):n.texImage2D(K,V,vt,ct,wt,0,St,it,null)}n.bindFramebuffer(e.FRAMEBUFFER,E),_t(x)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,X,K,tt.__webglTexture,0,be(x)):(K===e.TEXTURE_2D||K>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,X,K,tt.__webglTexture,V),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ut(E,x,I){if(e.bindRenderbuffer(e.RENDERBUFFER,E),x.depthBuffer){let X=x.depthTexture,K=X&&X.isDepthTexture?X.type:null,V=y(x.stencilBuffer,K),St=x.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,it=be(x);_t(x)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,it,V,x.width,x.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,it,V,x.width,x.height):e.renderbufferStorage(e.RENDERBUFFER,V,x.width,x.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,St,e.RENDERBUFFER,E)}else{let X=x.textures;for(let K=0;K<X.length;K++){let V=X[K],St=a.convert(V.format,V.colorSpace),it=a.convert(V.type),vt=v(V.internalFormat,St,it,V.colorSpace),yt=be(x);I&&_t(x)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,yt,vt,x.width,x.height):_t(x)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,yt,vt,x.width,x.height):e.renderbufferStorage(e.RENDERBUFFER,vt,x.width,x.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Mt(E,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=i.get(x.depthTexture);X.__renderTarget=x,(!X.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),J(x.depthTexture,0);let K=X.__webglTexture,V=be(x);if(x.depthTexture.format===bo)_t(x)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0,V):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0);else if(x.depthTexture.format===No)_t(x)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0,V):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Yt(E){let x=i.get(E),I=E.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==E.depthTexture){let X=E.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),X){let K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,X.removeEventListener("dispose",K)};X.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=X}if(E.depthTexture&&!x.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");let X=E.texture.mipmaps;X&&X.length>0?Mt(x.__webglFramebuffer[0],E):Mt(x.__webglFramebuffer,E)}else if(I){x.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(n.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer[X]),x.__webglDepthbuffer[X]===void 0)x.__webglDepthbuffer[X]=e.createRenderbuffer(),Ut(x.__webglDepthbuffer[X],E,!1);else{let K=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,V=x.__webglDepthbuffer[X];e.bindRenderbuffer(e.RENDERBUFFER,V),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,V)}}else{let X=E.texture.mipmaps;if(X&&X.length>0?n.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=e.createRenderbuffer(),Ut(x.__webglDepthbuffer,E,!1);else{let K=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,V=x.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,V),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,V)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function an(E,x,I){let X=i.get(E);x!==void 0&&dt(X.__webglFramebuffer,E,E.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),I!==void 0&&Yt(E)}function R(E){let x=E.texture,I=i.get(E),X=i.get(x);E.addEventListener("dispose",w);let K=E.textures,V=E.isWebGLCubeRenderTarget===!0,St=K.length>1;if(St||(X.__webglTexture===void 0&&(X.__webglTexture=e.createTexture()),X.__version=x.version,r.memory.textures++),V){I.__webglFramebuffer=[];for(let it=0;it<6;it++)if(x.mipmaps&&x.mipmaps.length>0){I.__webglFramebuffer[it]=[];for(let vt=0;vt<x.mipmaps.length;vt++)I.__webglFramebuffer[it][vt]=e.createFramebuffer()}else I.__webglFramebuffer[it]=e.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){I.__webglFramebuffer=[];for(let it=0;it<x.mipmaps.length;it++)I.__webglFramebuffer[it]=e.createFramebuffer()}else I.__webglFramebuffer=e.createFramebuffer();if(St)for(let it=0,vt=K.length;it<vt;it++){let yt=i.get(K[it]);yt.__webglTexture===void 0&&(yt.__webglTexture=e.createTexture(),r.memory.textures++)}if(E.samples>0&&_t(E)===!1){I.__webglMultisampledFramebuffer=e.createFramebuffer(),I.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let it=0;it<K.length;it++){let vt=K[it];I.__webglColorRenderbuffer[it]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,I.__webglColorRenderbuffer[it]);let yt=a.convert(vt.format,vt.colorSpace),tt=a.convert(vt.type),ct=v(vt.internalFormat,yt,tt,vt.colorSpace,E.isXRRenderTarget===!0),wt=be(E);e.renderbufferStorageMultisample(e.RENDERBUFFER,wt,ct,E.width,E.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+it,e.RENDERBUFFER,I.__webglColorRenderbuffer[it])}e.bindRenderbuffer(e.RENDERBUFFER,null),E.depthBuffer&&(I.__webglDepthRenderbuffer=e.createRenderbuffer(),Ut(I.__webglDepthRenderbuffer,E,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(V){n.bindTexture(e.TEXTURE_CUBE_MAP,X.__webglTexture),Vt(e.TEXTURE_CUBE_MAP,x);for(let it=0;it<6;it++)if(x.mipmaps&&x.mipmaps.length>0)for(let vt=0;vt<x.mipmaps.length;vt++)dt(I.__webglFramebuffer[it][vt],E,x,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+it,vt);else dt(I.__webglFramebuffer[it],E,x,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);m(x)&&u(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(St){for(let it=0,vt=K.length;it<vt;it++){let yt=K[it],tt=i.get(yt),ct=e.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ct=E.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(ct,tt.__webglTexture),Vt(ct,yt),dt(I.__webglFramebuffer,E,yt,e.COLOR_ATTACHMENT0+it,ct,0),m(yt)&&u(ct)}n.unbindTexture()}else{let it=e.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(it=E.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(it,X.__webglTexture),Vt(it,x),x.mipmaps&&x.mipmaps.length>0)for(let vt=0;vt<x.mipmaps.length;vt++)dt(I.__webglFramebuffer[vt],E,x,e.COLOR_ATTACHMENT0,it,vt);else dt(I.__webglFramebuffer,E,x,e.COLOR_ATTACHMENT0,it,0);m(x)&&u(it),n.unbindTexture()}E.depthBuffer&&Yt(E)}function Me(E){let x=E.textures;for(let I=0,X=x.length;I<X;I++){let K=x[I];if(m(K)){let V=g(E),St=i.get(K).__webglTexture;n.bindTexture(V,St),u(V),n.unbindTexture()}}}let Ot=[],Rt=[];function gt(E){if(E.samples>0){if(_t(E)===!1){let x=E.textures,I=E.width,X=E.height,K=e.COLOR_BUFFER_BIT,V=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,St=i.get(E),it=x.length>1;if(it)for(let yt=0;yt<x.length;yt++)n.bindFramebuffer(e.FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+yt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,St.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+yt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer);let vt=E.texture.mipmaps;vt&&vt.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,St.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let yt=0;yt<x.length;yt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(K|=e.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(K|=e.STENCIL_BUFFER_BIT)),it){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,St.__webglColorRenderbuffer[yt]);let tt=i.get(x[yt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,tt,0)}e.blitFramebuffer(0,0,I,X,0,0,I,X,K,e.NEAREST),l===!0&&(Ot.length=0,Rt.length=0,Ot.push(e.COLOR_ATTACHMENT0+yt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Ot.push(V),Rt.push(V),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Rt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ot))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),it)for(let yt=0;yt<x.length;yt++){n.bindFramebuffer(e.FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+yt,e.RENDERBUFFER,St.__webglColorRenderbuffer[yt]);let tt=i.get(x[yt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,St.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+yt,e.TEXTURE_2D,tt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let x=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[x])}}}function be(E){return Math.min(s.maxSamples,E.samples)}function _t(E){let x=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Bt(E){let x=r.render.frame;f.get(E)!==x&&(f.set(E,x),E.update())}function We(E,x){let I=E.colorSpace,X=E.format,K=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||I!==Qa&&I!==bs&&(Zt.getTransfer(I)===oe?(X!==hi||K!==qi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),x}function Le(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=F,this.setTexture2D=J,this.setTexture2DArray=W,this.setTexture3D=nt,this.setTextureCube=H,this.rebindTextures=an,this.setupRenderTarget=R,this.updateRenderTargetMipmap=Me,this.updateMultisampleRenderTarget=gt,this.setupDepthRenderbuffer=Yt,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=_t}function d3(e,t){function n(i,s=bs){let a,r=Zt.getTransfer(s);if(i===qi)return e.UNSIGNED_BYTE;if(i===of)return e.UNSIGNED_SHORT_4_4_4_4;if(i===lf)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Pg)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===zg)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Og)return e.BYTE;if(i===Ig)return e.SHORT;if(i===Ro)return e.UNSIGNED_SHORT;if(i===rf)return e.INT;if(i===ma)return e.UNSIGNED_INT;if(i===Yi)return e.FLOAT;if(i===Do)return e.HALF_FLOAT;if(i===Bg)return e.ALPHA;if(i===Fg)return e.RGB;if(i===hi)return e.RGBA;if(i===bo)return e.DEPTH_COMPONENT;if(i===No)return e.DEPTH_STENCIL;if(i===Hg)return e.RED;if(i===cf)return e.RED_INTEGER;if(i===Vg)return e.RG;if(i===uf)return e.RG_INTEGER;if(i===hf)return e.RGBA_INTEGER;if(i===lc||i===cc||i===uc||i===hc)if(r===oe)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===lc)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===cc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===uc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===hc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===lc)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===cc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===uc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===hc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ff||i===df||i===pf||i===mf)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===ff)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===df)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===pf)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===mf)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===gf||i===_f||i===vf)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===gf||i===_f)return r===oe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===vf)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===yf||i===xf||i===Sf||i===Mf||i===bf||i===Tf||i===Ef||i===Af||i===wf||i===Cf||i===Rf||i===Df||i===Uf||i===Nf)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===yf)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===xf)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Sf)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Mf)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===bf)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Tf)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ef)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Af)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===wf)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Cf)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Rf)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Df)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Uf)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Nf)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Lf||i===Of||i===If)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===Lf)return r===oe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Of)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===If)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Pf||i===zf||i===Bf||i===Ff)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===Pf)return a.COMPRESSED_RED_RGTC1_EXT;if(i===zf)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Bf)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ff)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Uo?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}var p3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,m3=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,o0=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){let i=new sc(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new Zn({vertexShader:p3,fragmentShader:m3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Rn(new tr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},l0=class extends ys{constructor(t,n){super();let i=this,s=null,a=1,r=null,o="local-floor",l=1,c=null,f=null,d=null,h=null,p=null,_=null,S=typeof XRWebGLBinding<"u",m=new o0,u={},g=n.getContextAttributes(),v=null,y=null,A=[],C=[],w=new $t,D=null,T=new Cn;T.viewport=new Ne;let b=new Cn;b.viewport=new Ne;let N=[T,b],F=new Zh,G=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Q=A[Y];return Q===void 0&&(Q=new Co,A[Y]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(Y){let Q=A[Y];return Q===void 0&&(Q=new Co,A[Y]=Q),Q.getGripSpace()},this.getHand=function(Y){let Q=A[Y];return Q===void 0&&(Q=new Co,A[Y]=Q),Q.getHandSpace()};function J(Y){let Q=C.indexOf(Y.inputSource);if(Q===-1)return;let dt=A[Q];dt!==void 0&&(dt.update(Y.inputSource,Y.frame,c||r),dt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function W(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",nt);for(let Y=0;Y<A.length;Y++){let Q=C[Y];Q!==null&&(C[Y]=null,A[Y].disconnect(Q))}G=null,q=null,m.reset();for(let Y in u)delete u[Y];t.setRenderTarget(v),p=null,h=null,d=null,s=null,y=null,ee.stop(),i.isPresenting=!1,t.setPixelRatio(D),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&S&&(d=new XRWebGLBinding(s,n)),d},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",W),s.addEventListener("inputsourceschange",nt),g.xrCompatible!==!0&&await n.makeXRCompatible(),D=t.getPixelRatio(),t.getSize(w),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let dt=null,Ut=null,Mt=null;g.depth&&(Mt=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,dt=g.stencil?No:bo,Ut=g.stencil?Uo:ma);let Yt={colorFormat:n.RGBA8,depthFormat:Mt,scaleFactor:a};d=this.getBinding(),h=d.createProjectionLayer(Yt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new Gi(h.textureWidth,h.textureHeight,{format:hi,type:qi,depthTexture:new ic(h.textureWidth,h.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let dt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(s,n,dt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Gi(p.framebufferWidth,p.framebufferHeight,{format:hi,type:qi,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),ee.setContext(s),ee.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function nt(Y){for(let Q=0;Q<Y.removed.length;Q++){let dt=Y.removed[Q],Ut=C.indexOf(dt);Ut>=0&&(C[Ut]=null,A[Ut].disconnect(dt))}for(let Q=0;Q<Y.added.length;Q++){let dt=Y.added[Q],Ut=C.indexOf(dt);if(Ut===-1){for(let Yt=0;Yt<A.length;Yt++)if(Yt>=C.length){C.push(dt),Ut=Yt;break}else if(C[Yt]===null){C[Yt]=dt,Ut=Yt;break}if(Ut===-1)break}let Mt=A[Ut];Mt&&Mt.connect(dt)}}let H=new z,rt=new z;function ut(Y,Q,dt){H.setFromMatrixPosition(Q.matrixWorld),rt.setFromMatrixPosition(dt.matrixWorld);let Ut=H.distanceTo(rt),Mt=Q.projectionMatrix.elements,Yt=dt.projectionMatrix.elements,an=Mt[14]/(Mt[10]-1),R=Mt[14]/(Mt[10]+1),Me=(Mt[9]+1)/Mt[5],Ot=(Mt[9]-1)/Mt[5],Rt=(Mt[8]-1)/Mt[0],gt=(Yt[8]+1)/Yt[0],be=an*Rt,_t=an*gt,Bt=Ut/(-Rt+gt),We=Bt*-Rt;if(Q.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(We),Y.translateZ(Bt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Mt[10]===-1)Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let Le=an+Bt,E=R+Bt,x=be-We,I=_t+(Ut-We),X=Me*R/E*Le,K=Ot*R/E*Le;Y.projectionMatrix.makePerspective(x,I,X,K,Le,E),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function bt(Y,Q){Q===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Q.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let Q=Y.near,dt=Y.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(dt=m.depthFar)),F.near=b.near=T.near=Q,F.far=b.far=T.far=dt,(G!==F.near||q!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),G=F.near,q=F.far),F.layers.mask=Y.layers.mask|6,T.layers.mask=F.layers.mask&3,b.layers.mask=F.layers.mask&5;let Ut=Y.parent,Mt=F.cameras;bt(F,Ut);for(let Yt=0;Yt<Mt.length;Yt++)bt(Mt[Yt],Ut);Mt.length===2?ut(F,T,b):F.projectionMatrix.copy(T.projectionMatrix),Vt(Y,F,Ut)};function Vt(Y,Q,dt){dt===null?Y.matrix.copy(Q.matrixWorld):(Y.matrix.copy(dt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Q.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Rh*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(Y){return u[Y]};let de=null;function Se(Y,Q){if(f=Q.getViewerPose(c||r),_=Q,f!==null){let dt=f.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let Ut=!1;dt.length!==F.cameras.length&&(F.cameras.length=0,Ut=!0);for(let R=0;R<dt.length;R++){let Me=dt[R],Ot=null;if(p!==null)Ot=p.getViewport(Me);else{let gt=d.getViewSubImage(h,Me);Ot=gt.viewport,R===0&&(t.setRenderTargetTextures(y,gt.colorTexture,gt.depthStencilTexture),t.setRenderTarget(y))}let Rt=N[R];Rt===void 0&&(Rt=new Cn,Rt.layers.enable(R),Rt.viewport=new Ne,N[R]=Rt),Rt.matrix.fromArray(Me.transform.matrix),Rt.matrix.decompose(Rt.position,Rt.quaternion,Rt.scale),Rt.projectionMatrix.fromArray(Me.projectionMatrix),Rt.projectionMatrixInverse.copy(Rt.projectionMatrix).invert(),Rt.viewport.set(Ot.x,Ot.y,Ot.width,Ot.height),R===0&&(F.matrix.copy(Rt.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ut===!0&&F.cameras.push(Rt)}let Mt=s.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){d=i.getBinding();let R=d.getDepthInformation(dt[0]);R&&R.isValid&&R.texture&&m.init(R,s.renderState)}if(Mt&&Mt.includes("camera-access")&&S){t.state.unbindTexture(),d=i.getBinding();for(let R=0;R<dt.length;R++){let Me=dt[R].camera;if(Me){let Ot=u[Me];Ot||(Ot=new sc,u[Me]=Ot);let Rt=d.getCameraImage(Me);Ot.sourceTexture=Rt}}}}for(let dt=0;dt<A.length;dt++){let Ut=C[dt],Mt=A[dt];Ut!==null&&Mt!==void 0&&Mt.update(Ut,Q,c||r)}de&&de(Y,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),_=null}let ee=new _b;ee.setAnimationLoop(Se),this.setAnimationLoop=function(Y){de=Y},this.dispose=function(){}}},rr=new ki,g3=new Ge;function _3(e,t){function n(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,Wg(e)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function s(m,u,g,v,y){u.isMeshBasicMaterial||u.isMeshLambertMaterial?a(m,u):u.isMeshToonMaterial?(a(m,u),d(m,u)):u.isMeshPhongMaterial?(a(m,u),f(m,u)):u.isMeshStandardMaterial?(a(m,u),h(m,u),u.isMeshPhysicalMaterial&&p(m,u,y)):u.isMeshMatcapMaterial?(a(m,u),_(m,u)):u.isMeshDepthMaterial?a(m,u):u.isMeshDistanceMaterial?(a(m,u),S(m,u)):u.isMeshNormalMaterial?a(m,u):u.isLineBasicMaterial?(r(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?l(m,u,g,v):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function a(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,n(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===vn&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,n(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===vn&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,n(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,n(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);let g=t.get(u),v=g.envMap,y=g.envMapRotation;v&&(m.envMap.value=v,rr.copy(y),rr.x*=-1,rr.y*=-1,rr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(rr.y*=-1,rr.z*=-1),m.envMapRotation.value.setFromMatrix4(g3.makeRotationFromEuler(rr)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,m.aoMapTransform))}function r(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,g,v){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*g,m.scale.value=v*.5,u.map&&(m.map.value=u.map,n(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function f(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function d(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function h(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,g){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===vn&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=g.texture,m.transmissionSamplerSize.value.set(g.width,g.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,u){u.matcap&&(m.matcap.value=u.matcap)}function S(m,u){let g=t.get(u).light;m.referencePosition.value.setFromMatrixPosition(g.matrixWorld),m.nearDistance.value=g.shadow.camera.near,m.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function v3(e,t,n,i){let s={},a={},r=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(g,v){let y=v.program;i.uniformBlockBinding(g,y)}function c(g,v){let y=s[g.id];y===void 0&&(_(g),y=f(g),s[g.id]=y,g.addEventListener("dispose",m));let A=v.program;i.updateUBOMapping(g,A);let C=t.render.frame;a[g.id]!==C&&(h(g),a[g.id]=C)}function f(g){let v=d();g.__bindingPointIndex=v;let y=e.createBuffer(),A=g.__size,C=g.usage;return e.bindBuffer(e.UNIFORM_BUFFER,y),e.bufferData(e.UNIFORM_BUFFER,A,C),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,v,y),y}function d(){for(let g=0;g<o;g++)if(r.indexOf(g)===-1)return r.push(g),g;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(g){let v=s[g.id],y=g.uniforms,A=g.__cache;e.bindBuffer(e.UNIFORM_BUFFER,v);for(let C=0,w=y.length;C<w;C++){let D=Array.isArray(y[C])?y[C]:[y[C]];for(let T=0,b=D.length;T<b;T++){let N=D[T];if(p(N,C,T,A)===!0){let F=N.__offset,G=Array.isArray(N.value)?N.value:[N.value],q=0;for(let J=0;J<G.length;J++){let W=G[J],nt=S(W);typeof W=="number"||typeof W=="boolean"?(N.__data[0]=W,e.bufferSubData(e.UNIFORM_BUFFER,F+q,N.__data)):W.isMatrix3?(N.__data[0]=W.elements[0],N.__data[1]=W.elements[1],N.__data[2]=W.elements[2],N.__data[3]=0,N.__data[4]=W.elements[3],N.__data[5]=W.elements[4],N.__data[6]=W.elements[5],N.__data[7]=0,N.__data[8]=W.elements[6],N.__data[9]=W.elements[7],N.__data[10]=W.elements[8],N.__data[11]=0):(W.toArray(N.__data,q),q+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,F,N.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(g,v,y,A){let C=g.value,w=v+"_"+y;if(A[w]===void 0)return typeof C=="number"||typeof C=="boolean"?A[w]=C:A[w]=C.clone(),!0;{let D=A[w];if(typeof C=="number"||typeof C=="boolean"){if(D!==C)return A[w]=C,!0}else if(D.equals(C)===!1)return D.copy(C),!0}return!1}function _(g){let v=g.uniforms,y=0,A=16;for(let w=0,D=v.length;w<D;w++){let T=Array.isArray(v[w])?v[w]:[v[w]];for(let b=0,N=T.length;b<N;b++){let F=T[b],G=Array.isArray(F.value)?F.value:[F.value];for(let q=0,J=G.length;q<J;q++){let W=G[q],nt=S(W),H=y%A,rt=H%nt.boundary,ut=H+rt;y+=rt,ut!==0&&A-ut<nt.storage&&(y+=A-ut),F.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=nt.storage}}}let C=y%A;return C>0&&(y+=A-C),g.__size=y,g.__cache={},this}function S(g){let v={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(v.boundary=4,v.storage=4):g.isVector2?(v.boundary=8,v.storage=8):g.isVector3||g.isColor?(v.boundary=16,v.storage=12):g.isVector4?(v.boundary=16,v.storage=16):g.isMatrix3?(v.boundary=48,v.storage=48):g.isMatrix4?(v.boundary=64,v.storage=64):g.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",g),v}function m(g){let v=g.target;v.removeEventListener("dispose",m);let y=r.indexOf(v.__bindingPointIndex);r.splice(y,1),e.deleteBuffer(s[v.id]),delete s[v.id],delete a[v.id]}function u(){for(let g in s)e.deleteBuffer(s[g]);r=[],s={},a={}}return{bind:l,update:c,dispose:u}}var Xf=class{constructor(t={}){let{canvas:n=kM(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=r;let _=new Uint32Array(4),S=new Int32Array(4),m=null,u=null,g=[],v=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ms,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,A=!1;this._outputColorSpace=Wn;let C=0,w=0,D=null,T=-1,b=null,N=new Ne,F=new Ne,G=null,q=new te(0),J=0,W=n.width,nt=n.height,H=1,rt=null,ut=null,bt=new Ne(0,0,W,nt),Vt=new Ne(0,0,W,nt),de=!1,Se=new nc,ee=!1,Y=!1,Q=new Ge,dt=new z,Ut=new Ne,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Yt=!1;function an(){return D===null?H:1}let R=i;function Me(M,L){return n.getContext(M,L)}try{let M={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${"180"}`),n.addEventListener("webglcontextlost",st,!1),n.addEventListener("webglcontextrestored",ft,!1),n.addEventListener("webglcontextcreationerror",j,!1),R===null){let L="webgl2";if(R=Me(L,M),R===null)throw Me(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Ot,Rt,gt,be,_t,Bt,We,Le,E,x,I,X,K,V,St,it,vt,yt,tt,ct,wt,xt,ot,zt;function U(){Ot=new PR(R),Ot.init(),xt=new d3(R,Ot),Rt=new RR(R,Ot,t,xt),gt=new h3(R,Ot),Rt.reversedDepthBuffer&&h&&gt.buffers.depth.setReversed(!0),be=new FR(R),_t=new j2,Bt=new f3(R,Ot,gt,_t,Rt,xt,be),We=new UR(y),Le=new IR(y),E=new WA(R),ot=new wR(R,E),x=new zR(R,E,be,ot),I=new VR(R,x,E,be),tt=new HR(R,Rt,Bt),it=new DR(_t),X=new Q2(y,We,Le,Ot,Rt,ot,it),K=new _3(y,_t),V=new t3,St=new r3(Ot),yt=new AR(y,We,Le,gt,I,p,l),vt=new c3(y,I,Rt),zt=new v3(R,be,Rt,gt),ct=new CR(R,Ot,be),wt=new BR(R,Ot,be),be.programs=X.programs,y.capabilities=Rt,y.extensions=Ot,y.properties=_t,y.renderLists=V,y.shadowMap=vt,y.state=gt,y.info=be}U();let et=new l0(y,R);this.xr=et,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let M=Ot.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=Ot.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(M){M!==void 0&&(H=M,this.setSize(W,nt,!1))},this.getSize=function(M){return M.set(W,nt)},this.setSize=function(M,L,P=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=M,nt=L,n.width=Math.floor(M*H),n.height=Math.floor(L*H),P===!0&&(n.style.width=M+"px",n.style.height=L+"px"),this.setViewport(0,0,M,L)},this.getDrawingBufferSize=function(M){return M.set(W*H,nt*H).floor()},this.setDrawingBufferSize=function(M,L,P){W=M,nt=L,H=P,n.width=Math.floor(M*P),n.height=Math.floor(L*P),this.setViewport(0,0,M,L)},this.getCurrentViewport=function(M){return M.copy(N)},this.getViewport=function(M){return M.copy(bt)},this.setViewport=function(M,L,P,B){M.isVector4?bt.set(M.x,M.y,M.z,M.w):bt.set(M,L,P,B),gt.viewport(N.copy(bt).multiplyScalar(H).round())},this.getScissor=function(M){return M.copy(Vt)},this.setScissor=function(M,L,P,B){M.isVector4?Vt.set(M.x,M.y,M.z,M.w):Vt.set(M,L,P,B),gt.scissor(F.copy(Vt).multiplyScalar(H).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(M){gt.setScissorTest(de=M)},this.setOpaqueSort=function(M){rt=M},this.setTransparentSort=function(M){ut=M},this.getClearColor=function(M){return M.copy(yt.getClearColor())},this.setClearColor=function(){yt.setClearColor(...arguments)},this.getClearAlpha=function(){return yt.getClearAlpha()},this.setClearAlpha=function(){yt.setClearAlpha(...arguments)},this.clear=function(M=!0,L=!0,P=!0){let B=0;if(M){let O=!1;if(D!==null){let $=D.texture.format;O=$===hf||$===uf||$===cf}if(O){let $=D.texture.type,lt=$===qi||$===ma||$===Ro||$===Uo||$===of||$===lf,pt=yt.getClearColor(),ht=yt.getClearAlpha(),At=pt.r,Dt=pt.g,Tt=pt.b;lt?(_[0]=At,_[1]=Dt,_[2]=Tt,_[3]=ht,R.clearBufferuiv(R.COLOR,0,_)):(S[0]=At,S[1]=Dt,S[2]=Tt,S[3]=ht,R.clearBufferiv(R.COLOR,0,S))}else B|=R.COLOR_BUFFER_BIT}L&&(B|=R.DEPTH_BUFFER_BIT),P&&(B|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",st,!1),n.removeEventListener("webglcontextrestored",ft,!1),n.removeEventListener("webglcontextcreationerror",j,!1),yt.dispose(),V.dispose(),St.dispose(),_t.dispose(),We.dispose(),Le.dispose(),I.dispose(),ot.dispose(),zt.dispose(),X.dispose(),et.dispose(),et.removeEventListener("sessionstart",bi),et.removeEventListener("sessionend",u0),ga.stop()};function st(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function ft(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let M=be.autoReset,L=vt.enabled,P=vt.autoUpdate,B=vt.needsUpdate,O=vt.type;U(),be.autoReset=M,vt.enabled=L,vt.autoUpdate=P,vt.needsUpdate=B,vt.type=O}function j(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Z(M){let L=M.target;L.removeEventListener("dispose",Z),mt(L)}function mt(M){Lt(M),_t.remove(M)}function Lt(M){let L=_t.get(M).programs;L!==void 0&&(L.forEach(function(P){X.releaseProgram(P)}),M.isShaderMaterial&&X.releaseShaderCache(M))}this.renderBufferDirect=function(M,L,P,B,O,$){L===null&&(L=Mt);let lt=O.isMesh&&O.matrixWorld.determinant()<0,pt=Db(M,L,P,B,O);gt.setMaterial(B,lt);let ht=P.index,At=1;if(B.wireframe===!0){if(ht=x.getWireframeAttribute(P),ht===void 0)return;At=2}let Dt=P.drawRange,Tt=P.attributes.position,Xt=Dt.start*At,le=(Dt.start+Dt.count)*At;$!==null&&(Xt=Math.max(Xt,$.start*At),le=Math.min(le,($.start+$.count)*At)),ht!==null?(Xt=Math.max(Xt,0),le=Math.min(le,ht.count)):Tt!=null&&(Xt=Math.max(Xt,0),le=Math.min(le,Tt.count));let Re=le-Xt;if(Re<0||Re===1/0)return;ot.setup(O,B,pt,P,ht);let ye,ue=ct;if(ht!==null&&(ye=E.get(ht),ue=wt,ue.setIndex(ye)),O.isMesh)B.wireframe===!0?(gt.setLineWidth(B.wireframeLinewidth*an()),ue.setMode(R.LINES)):ue.setMode(R.TRIANGLES);else if(O.isLine){let Et=B.linewidth;Et===void 0&&(Et=1),gt.setLineWidth(Et*an()),O.isLineSegments?ue.setMode(R.LINES):O.isLineLoop?ue.setMode(R.LINE_LOOP):ue.setMode(R.LINE_STRIP)}else O.isPoints?ue.setMode(R.POINTS):O.isSprite&&ue.setMode(R.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)To("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ue.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Ot.get("WEBGL_multi_draw"))ue.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{let Et=O._multiDrawStarts,Ae=O._multiDrawCounts,Jt=O._multiDrawCount,Dn=ht?E.get(ht).bytesPerElement:1,cr=_t.get(B).currentProgram.getUniforms();for(let Un=0;Un<Jt;Un++)cr.setValue(R,"_gl_DrawID",Un),ue.render(Et[Un]/Dn,Ae[Un])}else if(O.isInstancedMesh)ue.renderInstances(Xt,Re,O.count);else if(P.isInstancedBufferGeometry){let Et=P._maxInstanceCount!==void 0?P._maxInstanceCount:1/0,Ae=Math.min(P.instanceCount,Et);ue.renderInstances(Xt,Re,Ae)}else ue.render(Xt,Re)};function pe(M,L,P){M.transparent===!0&&M.side===Wi&&M.forceSinglePass===!1?(M.side=vn,M.needsUpdate=!0,_c(M,L,P),M.side=vs,M.needsUpdate=!0,_c(M,L,P),M.side=Wi):_c(M,L,P)}this.compile=function(M,L,P=null){P===null&&(P=M),u=St.get(P),u.init(L),v.push(u),P.traverseVisible(function(O){O.isLight&&O.layers.test(L.layers)&&(u.pushLight(O),O.castShadow&&u.pushShadow(O))}),M!==P&&M.traverseVisible(function(O){O.isLight&&O.layers.test(L.layers)&&(u.pushLight(O),O.castShadow&&u.pushShadow(O))}),u.setupLights();let B=new Set;return M.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;let $=O.material;if($)if(Array.isArray($))for(let lt=0;lt<$.length;lt++){let pt=$[lt];pe(pt,P,O),B.add(pt)}else pe($,P,O),B.add($)}),u=v.pop(),B},this.compileAsync=function(M,L,P=null){let B=this.compile(M,L,P);return new Promise(O=>{function $(){if(B.forEach(function(lt){_t.get(lt).currentProgram.isReady()&&B.delete(lt)}),B.size===0){O(M);return}setTimeout($,10)}Ot.get("KHR_parallel_shader_compile")!==null?$():setTimeout($,10)})};let ne=null;function Ji(M){ne&&ne(M)}function bi(){ga.stop()}function u0(){ga.start()}let ga=new _b;ga.setAnimationLoop(Ji),typeof self<"u"&&ga.setContext(self),this.setAnimationLoop=function(M){ne=M,et.setAnimationLoop(M),M===null?ga.stop():ga.start()},et.addEventListener("sessionstart",bi),et.addEventListener("sessionend",u0),this.render=function(M,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(L),L=et.getCamera()),M.isScene===!0&&M.onBeforeRender(y,M,L,D),u=St.get(M,v.length),u.init(L),v.push(u),Q.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),Se.setFromProjectionMatrix(Q,Si,L.reversedDepth),Y=this.localClippingEnabled,ee=it.init(this.clippingPlanes,Y),m=V.get(M,g.length),m.init(),g.push(m),et.enabled===!0&&et.isPresenting===!0){let $=y.xr.getDepthSensingMesh();$!==null&&Yf($,L,-1/0,y.sortObjects)}Yf(M,L,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(rt,ut),Yt=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,Yt&&yt.addToRenderList(m,M),this.info.render.frame++,ee===!0&&it.beginShadows();let P=u.state.shadowsArray;vt.render(P,M,L),ee===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();let B=m.opaque,O=m.transmissive;if(u.setupLights(),L.isArrayCamera){let $=L.cameras;if(O.length>0)for(let lt=0,pt=$.length;lt<pt;lt++){let ht=$[lt];f0(B,O,M,ht)}Yt&&yt.render(M);for(let lt=0,pt=$.length;lt<pt;lt++){let ht=$[lt];h0(m,M,ht,ht.viewport)}}else O.length>0&&f0(B,O,M,L),Yt&&yt.render(M),h0(m,M,L);D!==null&&w===0&&(Bt.updateMultisampleRenderTarget(D),Bt.updateRenderTargetMipmap(D)),M.isScene===!0&&M.onAfterRender(y,M,L),ot.resetDefaultState(),T=-1,b=null,v.pop(),v.length>0?(u=v[v.length-1],ee===!0&&it.setGlobalState(y.clippingPlanes,u.state.camera)):u=null,g.pop(),g.length>0?m=g[g.length-1]:m=null};function Yf(M,L,P,B){if(M.visible===!1)return;if(M.layers.test(L.layers)){if(M.isGroup)P=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(L);else if(M.isLight)u.pushLight(M),M.castShadow&&u.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Se.intersectsSprite(M)){B&&Ut.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Q);let lt=I.update(M),pt=M.material;pt.visible&&m.push(M,lt,pt,P,Ut.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Se.intersectsObject(M))){let lt=I.update(M),pt=M.material;if(B&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ut.copy(M.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),Ut.copy(lt.boundingSphere.center)),Ut.applyMatrix4(M.matrixWorld).applyMatrix4(Q)),Array.isArray(pt)){let ht=lt.groups;for(let At=0,Dt=ht.length;At<Dt;At++){let Tt=ht[At],Xt=pt[Tt.materialIndex];Xt&&Xt.visible&&m.push(M,lt,Xt,P,Ut.z,Tt)}}else pt.visible&&m.push(M,lt,pt,P,Ut.z,null)}}let $=M.children;for(let lt=0,pt=$.length;lt<pt;lt++)Yf($[lt],L,P,B)}function h0(M,L,P,B){let O=M.opaque,$=M.transmissive,lt=M.transparent;u.setupLightsView(P),ee===!0&&it.setGlobalState(y.clippingPlanes,P),B&&gt.viewport(N.copy(B)),O.length>0&&gc(O,L,P),$.length>0&&gc($,L,P),lt.length>0&&gc(lt,L,P),gt.buffers.depth.setTest(!0),gt.buffers.depth.setMask(!0),gt.buffers.color.setMask(!0),gt.setPolygonOffset(!1)}function f0(M,L,P,B){if((P.isScene===!0?P.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[B.id]===void 0&&(u.state.transmissionRenderTarget[B.id]=new Gi(1,1,{generateMipmaps:!0,type:Ot.has("EXT_color_buffer_half_float")||Ot.has("EXT_color_buffer_float")?Do:qi,minFilter:pa,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Zt.workingColorSpace}));let $=u.state.transmissionRenderTarget[B.id],lt=B.viewport||N;$.setSize(lt.z*y.transmissionResolutionScale,lt.w*y.transmissionResolutionScale);let pt=y.getRenderTarget(),ht=y.getActiveCubeFace(),At=y.getActiveMipmapLevel();y.setRenderTarget($),y.getClearColor(q),J=y.getClearAlpha(),J<1&&y.setClearColor(16777215,.5),y.clear(),Yt&&yt.render(P);let Dt=y.toneMapping;y.toneMapping=Ms;let Tt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),u.setupLightsView(B),ee===!0&&it.setGlobalState(y.clippingPlanes,B),gc(M,P,B),Bt.updateMultisampleRenderTarget($),Bt.updateRenderTargetMipmap($),Ot.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let le=0,Re=L.length;le<Re;le++){let ye=L[le],ue=ye.object,Et=ye.geometry,Ae=ye.material,Jt=ye.group;if(Ae.side===Wi&&ue.layers.test(B.layers)){let Dn=Ae.side;Ae.side=vn,Ae.needsUpdate=!0,d0(ue,P,B,Et,Ae,Jt),Ae.side=Dn,Ae.needsUpdate=!0,Xt=!0}}Xt===!0&&(Bt.updateMultisampleRenderTarget($),Bt.updateRenderTargetMipmap($))}y.setRenderTarget(pt,ht,At),y.setClearColor(q,J),Tt!==void 0&&(B.viewport=Tt),y.toneMapping=Dt}function gc(M,L,P){let B=L.isScene===!0?L.overrideMaterial:null;for(let O=0,$=M.length;O<$;O++){let lt=M[O],pt=lt.object,ht=lt.geometry,At=lt.group,Dt=lt.material;Dt.allowOverride===!0&&B!==null&&(Dt=B),pt.layers.test(P.layers)&&d0(pt,L,P,ht,Dt,At)}}function d0(M,L,P,B,O,$){M.onBeforeRender(y,L,P,B,O,$),M.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),O.onBeforeRender(y,L,P,B,M,$),O.transparent===!0&&O.side===Wi&&O.forceSinglePass===!1?(O.side=vn,O.needsUpdate=!0,y.renderBufferDirect(P,L,B,O,M,$),O.side=vs,O.needsUpdate=!0,y.renderBufferDirect(P,L,B,O,M,$),O.side=Wi):y.renderBufferDirect(P,L,B,O,M,$),M.onAfterRender(y,L,P,B,O,$)}function _c(M,L,P){L.isScene!==!0&&(L=Mt);let B=_t.get(M),O=u.state.lights,$=u.state.shadowsArray,lt=O.state.version,pt=X.getParameters(M,O.state,$,L,P),ht=X.getProgramCacheKey(pt),At=B.programs;B.environment=M.isMeshStandardMaterial?L.environment:null,B.fog=L.fog,B.envMap=(M.isMeshStandardMaterial?Le:We).get(M.envMap||B.environment),B.envMapRotation=B.environment!==null&&M.envMap===null?L.environmentRotation:M.envMapRotation,At===void 0&&(M.addEventListener("dispose",Z),At=new Map,B.programs=At);let Dt=At.get(ht);if(Dt!==void 0){if(B.currentProgram===Dt&&B.lightsStateVersion===lt)return m0(M,pt),Dt}else pt.uniforms=X.getUniforms(M),M.onBeforeCompile(pt,y),Dt=X.acquireProgram(pt,ht),At.set(ht,Dt),B.uniforms=pt.uniforms;let Tt=B.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Tt.clippingPlanes=it.uniform),m0(M,pt),B.needsLights=Nb(M),B.lightsStateVersion=lt,B.needsLights&&(Tt.ambientLightColor.value=O.state.ambient,Tt.lightProbe.value=O.state.probe,Tt.directionalLights.value=O.state.directional,Tt.directionalLightShadows.value=O.state.directionalShadow,Tt.spotLights.value=O.state.spot,Tt.spotLightShadows.value=O.state.spotShadow,Tt.rectAreaLights.value=O.state.rectArea,Tt.ltc_1.value=O.state.rectAreaLTC1,Tt.ltc_2.value=O.state.rectAreaLTC2,Tt.pointLights.value=O.state.point,Tt.pointLightShadows.value=O.state.pointShadow,Tt.hemisphereLights.value=O.state.hemi,Tt.directionalShadowMap.value=O.state.directionalShadowMap,Tt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Tt.spotShadowMap.value=O.state.spotShadowMap,Tt.spotLightMatrix.value=O.state.spotLightMatrix,Tt.spotLightMap.value=O.state.spotLightMap,Tt.pointShadowMap.value=O.state.pointShadowMap,Tt.pointShadowMatrix.value=O.state.pointShadowMatrix),B.currentProgram=Dt,B.uniformsList=null,Dt}function p0(M){if(M.uniformsList===null){let L=M.currentProgram.getUniforms();M.uniformsList=Io.seqWithValue(L.seq,M.uniforms)}return M.uniformsList}function m0(M,L){let P=_t.get(M);P.outputColorSpace=L.outputColorSpace,P.batching=L.batching,P.batchingColor=L.batchingColor,P.instancing=L.instancing,P.instancingColor=L.instancingColor,P.instancingMorph=L.instancingMorph,P.skinning=L.skinning,P.morphTargets=L.morphTargets,P.morphNormals=L.morphNormals,P.morphColors=L.morphColors,P.morphTargetsCount=L.morphTargetsCount,P.numClippingPlanes=L.numClippingPlanes,P.numIntersection=L.numClipIntersection,P.vertexAlphas=L.vertexAlphas,P.vertexTangents=L.vertexTangents,P.toneMapping=L.toneMapping}function Db(M,L,P,B,O){L.isScene!==!0&&(L=Mt),Bt.resetTextureUnits();let $=L.fog,lt=B.isMeshStandardMaterial?L.environment:null,pt=D===null?y.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Qa,ht=(B.isMeshStandardMaterial?Le:We).get(B.envMap||lt),At=B.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,Dt=!!P.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Tt=!!P.morphAttributes.position,Xt=!!P.morphAttributes.normal,le=!!P.morphAttributes.color,Re=Ms;B.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(Re=y.toneMapping);let ye=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,ue=ye!==void 0?ye.length:0,Et=_t.get(B),Ae=u.state.lights;if(ee===!0&&(Y===!0||M!==b)){let fn=M===b&&B.id===T;it.setState(B,M,fn)}let Jt=!1;B.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==Ae.state.version||Et.outputColorSpace!==pt||O.isBatchedMesh&&Et.batching===!1||!O.isBatchedMesh&&Et.batching===!0||O.isBatchedMesh&&Et.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Et.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Et.instancing===!1||!O.isInstancedMesh&&Et.instancing===!0||O.isSkinnedMesh&&Et.skinning===!1||!O.isSkinnedMesh&&Et.skinning===!0||O.isInstancedMesh&&Et.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Et.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Et.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Et.instancingMorph===!1&&O.morphTexture!==null||Et.envMap!==ht||B.fog===!0&&Et.fog!==$||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==it.numPlanes||Et.numIntersection!==it.numIntersection)||Et.vertexAlphas!==At||Et.vertexTangents!==Dt||Et.morphTargets!==Tt||Et.morphNormals!==Xt||Et.morphColors!==le||Et.toneMapping!==Re||Et.morphTargetsCount!==ue)&&(Jt=!0):(Jt=!0,Et.__version=B.version);let Dn=Et.currentProgram;Jt===!0&&(Dn=_c(B,L,O));let cr=!1,Un=!1,zo=!1,we=Dn.getUniforms(),Kn=Et.uniforms;if(gt.useProgram(Dn.program)&&(cr=!0,Un=!0,zo=!0),B.id!==T&&(T=B.id,Un=!0),cr||b!==M){gt.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),we.setValue(R,"projectionMatrix",M.projectionMatrix),we.setValue(R,"viewMatrix",M.matrixWorldInverse);let yn=we.map.cameraPosition;yn!==void 0&&yn.setValue(R,dt.setFromMatrixPosition(M.matrixWorld)),Rt.logarithmicDepthBuffer&&we.setValue(R,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&we.setValue(R,"isOrthographic",M.isOrthographicCamera===!0),b!==M&&(b=M,Un=!0,zo=!0)}if(O.isSkinnedMesh){we.setOptional(R,O,"bindMatrix"),we.setOptional(R,O,"bindMatrixInverse");let fn=O.skeleton;fn&&(fn.boneTexture===null&&fn.computeBoneTexture(),we.setValue(R,"boneTexture",fn.boneTexture,Bt))}O.isBatchedMesh&&(we.setOptional(R,O,"batchingTexture"),we.setValue(R,"batchingTexture",O._matricesTexture,Bt),we.setOptional(R,O,"batchingIdTexture"),we.setValue(R,"batchingIdTexture",O._indirectTexture,Bt),we.setOptional(R,O,"batchingColorTexture"),O._colorsTexture!==null&&we.setValue(R,"batchingColorTexture",O._colorsTexture,Bt));let Qn=P.morphAttributes;if((Qn.position!==void 0||Qn.normal!==void 0||Qn.color!==void 0)&&tt.update(O,P,Dn),(Un||Et.receiveShadow!==O.receiveShadow)&&(Et.receiveShadow=O.receiveShadow,we.setValue(R,"receiveShadow",O.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Kn.envMap.value=ht,Kn.flipEnvMap.value=ht.isCubeTexture&&ht.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&L.environment!==null&&(Kn.envMapIntensity.value=L.environmentIntensity),Un&&(we.setValue(R,"toneMappingExposure",y.toneMappingExposure),Et.needsLights&&Ub(Kn,zo),$&&B.fog===!0&&K.refreshFogUniforms(Kn,$),K.refreshMaterialUniforms(Kn,B,H,nt,u.state.transmissionRenderTarget[M.id]),Io.upload(R,p0(Et),Kn,Bt)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Io.upload(R,p0(Et),Kn,Bt),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&we.setValue(R,"center",O.center),we.setValue(R,"modelViewMatrix",O.modelViewMatrix),we.setValue(R,"normalMatrix",O.normalMatrix),we.setValue(R,"modelMatrix",O.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){let fn=B.uniformsGroups;for(let yn=0,Zf=fn.length;yn<Zf;yn++){let _a=fn[yn];zt.update(_a,Dn),zt.bind(_a,Dn)}}return Dn}function Ub(M,L){M.ambientLightColor.needsUpdate=L,M.lightProbe.needsUpdate=L,M.directionalLights.needsUpdate=L,M.directionalLightShadows.needsUpdate=L,M.pointLights.needsUpdate=L,M.pointLightShadows.needsUpdate=L,M.spotLights.needsUpdate=L,M.spotLightShadows.needsUpdate=L,M.rectAreaLights.needsUpdate=L,M.hemisphereLights.needsUpdate=L}function Nb(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(M,L,P){let B=_t.get(M);B.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),_t.get(M.texture).__webglTexture=L,_t.get(M.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:P,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,L){let P=_t.get(M);P.__webglFramebuffer=L,P.__useDefaultFramebuffer=L===void 0};let Lb=R.createFramebuffer();this.setRenderTarget=function(M,L=0,P=0){D=M,C=L,w=P;let B=!0,O=null,$=!1,lt=!1;if(M){let ht=_t.get(M);if(ht.__useDefaultFramebuffer!==void 0)gt.bindFramebuffer(R.FRAMEBUFFER,null),B=!1;else if(ht.__webglFramebuffer===void 0)Bt.setupRenderTarget(M);else if(ht.__hasExternalTextures)Bt.rebindTextures(M,_t.get(M.texture).__webglTexture,_t.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Tt=M.depthTexture;if(ht.__boundDepthTexture!==Tt){if(Tt!==null&&_t.has(Tt)&&(M.width!==Tt.image.width||M.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Bt.setupDepthRenderbuffer(M)}}let At=M.texture;(At.isData3DTexture||At.isDataArrayTexture||At.isCompressedArrayTexture)&&(lt=!0);let Dt=_t.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Dt[L])?O=Dt[L][P]:O=Dt[L],$=!0):M.samples>0&&Bt.useMultisampledRTT(M)===!1?O=_t.get(M).__webglMultisampledFramebuffer:Array.isArray(Dt)?O=Dt[P]:O=Dt,N.copy(M.viewport),F.copy(M.scissor),G=M.scissorTest}else N.copy(bt).multiplyScalar(H).floor(),F.copy(Vt).multiplyScalar(H).floor(),G=de;if(P!==0&&(O=Lb),gt.bindFramebuffer(R.FRAMEBUFFER,O)&&B&&gt.drawBuffers(M,O),gt.viewport(N),gt.scissor(F),gt.setScissorTest(G),$){let ht=_t.get(M.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+L,ht.__webglTexture,P)}else if(lt){let ht=L;for(let At=0;At<M.textures.length;At++){let Dt=_t.get(M.textures[At]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+At,Dt.__webglTexture,P,ht)}}else if(M!==null&&P!==0){let ht=_t.get(M.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,ht.__webglTexture,P)}T=-1},this.readRenderTargetPixels=function(M,L,P,B,O,$,lt,pt=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ht=_t.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&lt!==void 0&&(ht=ht[lt]),ht){gt.bindFramebuffer(R.FRAMEBUFFER,ht);try{let At=M.textures[pt],Dt=At.format,Tt=At.type;if(!Rt.textureFormatReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Rt.textureTypeReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=M.width-B&&P>=0&&P<=M.height-O&&(M.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+pt),R.readPixels(L,P,B,O,xt.convert(Dt),xt.convert(Tt),$))}finally{let At=D!==null?_t.get(D).__webglFramebuffer:null;gt.bindFramebuffer(R.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(M,L,P,B,O,$,lt,pt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ht=_t.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&lt!==void 0&&(ht=ht[lt]),ht)if(L>=0&&L<=M.width-B&&P>=0&&P<=M.height-O){gt.bindFramebuffer(R.FRAMEBUFFER,ht);let At=M.textures[pt],Dt=At.format,Tt=At.type;if(!Rt.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Rt.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Xt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Xt),R.bufferData(R.PIXEL_PACK_BUFFER,$.byteLength,R.STREAM_READ),M.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+pt),R.readPixels(L,P,B,O,xt.convert(Dt),xt.convert(Tt),0);let le=D!==null?_t.get(D).__webglFramebuffer:null;gt.bindFramebuffer(R.FRAMEBUFFER,le);let Re=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await XM(R,Re,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Xt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,$),R.deleteBuffer(Xt),R.deleteSync(Re),$}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,L=null,P=0){let B=Math.pow(2,-P),O=Math.floor(M.image.width*B),$=Math.floor(M.image.height*B),lt=L!==null?L.x:0,pt=L!==null?L.y:0;Bt.setTexture2D(M,0),R.copyTexSubImage2D(R.TEXTURE_2D,P,0,0,lt,pt,O,$),gt.unbindTexture()};let Ob=R.createFramebuffer(),Ib=R.createFramebuffer();this.copyTextureToTexture=function(M,L,P=null,B=null,O=0,$=null){$===null&&(O!==0?(To("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),$=O,O=0):$=0);let lt,pt,ht,At,Dt,Tt,Xt,le,Re,ye=M.isCompressedTexture?M.mipmaps[$]:M.image;if(P!==null)lt=P.max.x-P.min.x,pt=P.max.y-P.min.y,ht=P.isBox3?P.max.z-P.min.z:1,At=P.min.x,Dt=P.min.y,Tt=P.isBox3?P.min.z:0;else{let Qn=Math.pow(2,-O);lt=Math.floor(ye.width*Qn),pt=Math.floor(ye.height*Qn),M.isDataArrayTexture?ht=ye.depth:M.isData3DTexture?ht=Math.floor(ye.depth*Qn):ht=1,At=0,Dt=0,Tt=0}B!==null?(Xt=B.x,le=B.y,Re=B.z):(Xt=0,le=0,Re=0);let ue=xt.convert(L.format),Et=xt.convert(L.type),Ae;L.isData3DTexture?(Bt.setTexture3D(L,0),Ae=R.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(Bt.setTexture2DArray(L,0),Ae=R.TEXTURE_2D_ARRAY):(Bt.setTexture2D(L,0),Ae=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,L.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,L.unpackAlignment);let Jt=R.getParameter(R.UNPACK_ROW_LENGTH),Dn=R.getParameter(R.UNPACK_IMAGE_HEIGHT),cr=R.getParameter(R.UNPACK_SKIP_PIXELS),Un=R.getParameter(R.UNPACK_SKIP_ROWS),zo=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,ye.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ye.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,At),R.pixelStorei(R.UNPACK_SKIP_ROWS,Dt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Tt);let we=M.isDataArrayTexture||M.isData3DTexture,Kn=L.isDataArrayTexture||L.isData3DTexture;if(M.isDepthTexture){let Qn=_t.get(M),fn=_t.get(L),yn=_t.get(Qn.__renderTarget),Zf=_t.get(fn.__renderTarget);gt.bindFramebuffer(R.READ_FRAMEBUFFER,yn.__webglFramebuffer),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,Zf.__webglFramebuffer);for(let _a=0;_a<ht;_a++)we&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,_t.get(M).__webglTexture,O,Tt+_a),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,_t.get(L).__webglTexture,$,Re+_a)),R.blitFramebuffer(At,Dt,lt,pt,Xt,le,lt,pt,R.DEPTH_BUFFER_BIT,R.NEAREST);gt.bindFramebuffer(R.READ_FRAMEBUFFER,null),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(O!==0||M.isRenderTargetTexture||_t.has(M)){let Qn=_t.get(M),fn=_t.get(L);gt.bindFramebuffer(R.READ_FRAMEBUFFER,Ob),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,Ib);for(let yn=0;yn<ht;yn++)we?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Qn.__webglTexture,O,Tt+yn):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Qn.__webglTexture,O),Kn?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,fn.__webglTexture,$,Re+yn):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,fn.__webglTexture,$),O!==0?R.blitFramebuffer(At,Dt,lt,pt,Xt,le,lt,pt,R.COLOR_BUFFER_BIT,R.NEAREST):Kn?R.copyTexSubImage3D(Ae,$,Xt,le,Re+yn,At,Dt,lt,pt):R.copyTexSubImage2D(Ae,$,Xt,le,At,Dt,lt,pt);gt.bindFramebuffer(R.READ_FRAMEBUFFER,null),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Kn?M.isDataTexture||M.isData3DTexture?R.texSubImage3D(Ae,$,Xt,le,Re,lt,pt,ht,ue,Et,ye.data):L.isCompressedArrayTexture?R.compressedTexSubImage3D(Ae,$,Xt,le,Re,lt,pt,ht,ue,ye.data):R.texSubImage3D(Ae,$,Xt,le,Re,lt,pt,ht,ue,Et,ye):M.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,$,Xt,le,lt,pt,ue,Et,ye.data):M.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,$,Xt,le,ye.width,ye.height,ue,ye.data):R.texSubImage2D(R.TEXTURE_2D,$,Xt,le,lt,pt,ue,Et,ye);R.pixelStorei(R.UNPACK_ROW_LENGTH,Jt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Dn),R.pixelStorei(R.UNPACK_SKIP_PIXELS,cr),R.pixelStorei(R.UNPACK_SKIP_ROWS,Un),R.pixelStorei(R.UNPACK_SKIP_IMAGES,zo),$===0&&L.generateMipmaps&&R.generateMipmap(Ae),gt.unbindTexture()},this.initRenderTarget=function(M){_t.get(M).__webglFramebuffer===void 0&&Bt.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Bt.setTextureCube(M,0):M.isData3DTexture?Bt.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Bt.setTexture2DArray(M,0):Bt.setTexture2D(M,0),gt.unbindTexture()},this.resetState=function(){C=0,w=0,D=null,gt.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorSpace=Zt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Zt._getUnpackColorSpace()}};var Ab=ur(pc());function Eb(){let e=(0,mc.useRef)(null),t=(0,mc.useRef)(null);return(0,mc.useEffect)(()=>{if(!e.current||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let n=e.current,i=`
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `,s=`
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
          }
        }
        
        gl_FragColor = vec4(color[0],color[1],color[2],1.0);
      }
    `,a=new $a;a.position.z=1;let r=new ec,o=new tr(2,2),l={time:{type:"f",value:1},resolution:{type:"v2",value:new $t}},c=new Zn({uniforms:l,vertexShader:i,fragmentShader:s}),f=new Rn(o,c);r.add(f);let d;try{d=new Xf({antialias:!0})}catch{o.dispose(),c.dispose();return}d.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.appendChild(d.domElement);let h=()=>{let S=n.clientWidth,m=n.clientHeight;d.setSize(S,m),l.resolution.value.x=d.domElement.width,l.resolution.value.y=d.domElement.height};h();let p=new ResizeObserver(h);p.observe(n);let _=()=>{let S=requestAnimationFrame(_);l.time.value+=.05,d.render(r,a),t.current&&(t.current.animationId=S)};return t.current={camera:a,scene:r,renderer:d,uniforms:l,animationId:0},_(),()=>{p.disconnect(),t.current&&(cancelAnimationFrame(t.current.animationId),n&&t.current.renderer.domElement&&t.current.renderer.domElement.remove(),t.current.renderer.dispose(),o.dispose(),c.dispose(),t.current=null)}},[]),(0,Ab.jsx)("div",{ref:e,"aria-hidden":"true",className:"absolute inset-0 h-full w-full",style:{background:"transparent",overflow:"hidden"}})}var Rb=ur(pc()),wb=element.querySelector("[data-shader-root]");if(wb){let e=(0,Cb.createRoot)(wb);e.render((0,Rb.jsx)(Eb,{}));let t=new MutationObserver(()=>{element.isConnected||(e.unmount(),t.disconnect())});t.observe(document.body,{childList:!0,subtree:!0})}})();
/*! Bundled license information:

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
