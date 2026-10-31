"use strict";(()=>{var Wb=Object.create;var T_=Object.defineProperty;var qb=Object.getOwnPropertyDescriptor;var Yb=Object.getOwnPropertyNames;var Zb=Object.getPrototypeOf,Jb=Object.prototype.hasOwnProperty;var qi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Kb=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Yb(t))!Jb.call(e,s)&&s!==n&&T_(e,s,{get:()=>t[s],enumerable:!(i=qb(t,s))||i.enumerable});return e};var Ni=(e,t,n)=>(n=e!=null?Wb(Zb(e)):{},Kb(t||!e||!e.__esModule?T_(n,"default",{value:e,enumerable:!0}):n,e));var z_=qi(Bt=>{"use strict";var Jd=Symbol.for("react.transitional.element"),Qb=Symbol.for("react.portal"),jb=Symbol.for("react.fragment"),$b=Symbol.for("react.strict_mode"),tE=Symbol.for("react.profiler"),eE=Symbol.for("react.consumer"),nE=Symbol.for("react.context"),iE=Symbol.for("react.forward_ref"),sE=Symbol.for("react.suspense"),aE=Symbol.for("react.memo"),D_=Symbol.for("react.lazy"),rE=Symbol.for("react.activity"),oE=Symbol.for("react.view_transition"),A_=Symbol.iterator;function lE(e){return e===null||typeof e!="object"?null:(e=A_&&e[A_]||e["@@iterator"],typeof e=="function"?e:null)}var U_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N_=Object.assign,L_={};function Yr(e,t,n){this.props=e,this.context=t,this.refs=L_,this.updater=n||U_}Yr.prototype.isReactComponent={};Yr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Yr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function O_(){}O_.prototype=Yr.prototype;function Kd(e,t,n){this.props=e,this.context=t,this.refs=L_,this.updater=n||U_}var Qd=Kd.prototype=new O_;Qd.constructor=Kd;N_(Qd,Yr.prototype);Qd.isPureReactComponent=!0;var w_=Array.isArray;function Zd(){}var be={H:null,A:null,T:null,S:null},I_=Object.prototype.hasOwnProperty;function jd(e,t,n){var i=n.ref;return{$$typeof:Jd,type:e,key:t,ref:i!==void 0?i:null,props:n}}function cE(e,t){return jd(e.type,t,e.props)}function $d(e){return typeof e=="object"&&e!==null&&e.$$typeof===Jd}function uE(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var C_=/\/+/g;function Yd(e,t){return typeof e=="object"&&e!==null&&e.key!=null?uE(""+e.key):t.toString(36)}function hE(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(Zd,Zd):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function qr(e,t,n,i,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(a){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case Jd:case Qb:r=!0;break;case D_:return r=e._init,qr(r(e._payload),t,n,i,s)}}if(r)return s=s(e),r=i===""?"."+Yd(e,0):i,w_(s)?(n="",r!=null&&(n=r.replace(C_,"$&/")+"/"),qr(s,t,n,"",function(c){return c})):s!=null&&($d(s)&&(s=cE(s,n+(s.key==null||e&&e.key===s.key?"":(""+s.key).replace(C_,"$&/")+"/")+r)),t.push(s)),1;r=0;var o=i===""?".":i+":";if(w_(e))for(var l=0;l<e.length;l++)i=e[l],a=o+Yd(i,l),r+=qr(i,t,n,a,s);else if(l=lE(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,a=o+Yd(i,l++),r+=qr(i,t,n,a,s);else if(a==="object"){if(typeof e.then=="function")return qr(hE(e),t,n,i,s);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function hu(e,t,n){if(e==null)return e;var i=[],s=0;return qr(e,i,"","",function(a){return t.call(n,a,s++)}),i}function fE(e){if(e._status===-1){var t=e._result,n=t();n.then(function(i){(e._status===0||e._status===-1)&&(e._status=1,e._result=i,n.status===void 0&&(n.status="fulfilled",n.value=i))},function(i){(e._status===0||e._status===-1)&&(e._status=2,e._result=i,n.status===void 0&&(n.status="rejected",n.reason=i))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var R_=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function P_(e){var t=be.T,n={};n.types=t!==null?t.types:null,be.T=n;try{var i=e(),s=be.S;s!==null&&s(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Zd,R_)}catch(a){R_(a)}finally{t!==null&&n.types!==null&&(t.types=n.types),be.T=t}}function B_(e){var t=be.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else P_(B_.bind(null,e))}var dE={map:hu,forEach:function(e,t,n){hu(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return hu(e,function(){t++}),t},toArray:function(e){return hu(e,function(t){return t})||[]},only:function(e){if(!$d(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Bt.Activity=rE;Bt.Children=dE;Bt.Component=Yr;Bt.Fragment=jb;Bt.Profiler=tE;Bt.PureComponent=Kd;Bt.StrictMode=$b;Bt.Suspense=sE;Bt.ViewTransition=oE;Bt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=be;Bt.__COMPILER_RUNTIME={__proto__:null,c:function(e){return be.H.useMemoCache(e)}};Bt.addTransitionType=B_;Bt.cache=function(e){return function(){return e.apply(null,arguments)}};Bt.cacheSignal=function(){return null};Bt.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=N_({},e.props),s=e.key;if(t!=null)for(a in t.key!==void 0&&(s=""+t.key),t)!I_.call(t,a)||a==="key"||a==="__self"||a==="__source"||a==="ref"&&t.ref===void 0||(i[a]=t[a]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var r=Array(a),o=0;o<a;o++)r[o]=arguments[o+2];i.children=r}return jd(e.type,s,i)};Bt.createContext=function(e){return e={$$typeof:nE,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:eE,_context:e},e};Bt.createElement=function(e,t,n){var i,s={},a=null;if(t!=null)for(i in t.key!==void 0&&(a=""+t.key),t)I_.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(s[i]=t[i]);var r=arguments.length-2;if(r===1)s.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];s.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)s[i]===void 0&&(s[i]=r[i]);return jd(e,a,s)};Bt.createRef=function(){return{current:null}};Bt.forwardRef=function(e){return{$$typeof:iE,render:e}};Bt.isValidElement=$d;Bt.lazy=function(e){return{$$typeof:D_,_payload:{_status:-1,_result:e},_init:fE}};Bt.memo=function(e,t){return{$$typeof:aE,type:e,compare:t===void 0?null:t}};Bt.startTransition=P_;Bt.unstable_useCacheRefresh=function(){return be.H.useCacheRefresh()};Bt.use=function(e){return be.H.use(e)};Bt.useActionState=function(e,t,n){return be.H.useActionState(e,t,n)};Bt.useCallback=function(e,t){return be.H.useCallback(e,t)};Bt.useContext=function(e){return be.H.useContext(e)};Bt.useDebugValue=function(){};Bt.useDeferredValue=function(e,t){return be.H.useDeferredValue(e,t)};Bt.useEffect=function(e,t){return be.H.useEffect(e,t)};Bt.useEffectEvent=function(e){return be.H.useEffectEvent(e)};Bt.useId=function(){return be.H.useId()};Bt.useImperativeHandle=function(e,t,n){return be.H.useImperativeHandle(e,t,n)};Bt.useInsertionEffect=function(e,t){return be.H.useInsertionEffect(e,t)};Bt.useLayoutEffect=function(e,t){return be.H.useLayoutEffect(e,t)};Bt.useMemo=function(e,t){return be.H.useMemo(e,t)};Bt.useOptimistic=function(e,t){return be.H.useOptimistic(e,t)};Bt.useReducer=function(e,t,n){return be.H.useReducer(e,t,n)};Bt.useRef=function(e){return be.H.useRef(e)};Bt.useState=function(e){return be.H.useState(e)};Bt.useSyncExternalStore=function(e,t,n){return be.H.useSyncExternalStore(e,t,n)};Bt.useTransition=function(){return be.H.useTransition()};Bt.version="19.3.1"});var Zr=qi((JD,F_)=>{"use strict";F_.exports=z_()});var G_=qi(pn=>{"use strict";var pE=Zr();function V_(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Ks(){}var Mn={d:{f:Ks,r:function(){throw Error(V_(522))},D:Ks,C:Ks,L:Ks,m:Ks,X:Ks,S:Ks,M:Ks},p:0,findDOMNode:null},mE=Symbol.for("react.portal"),gE=Symbol.for("react.recoverable"),H_=Symbol.for("react.optimistic_key");function _E(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:mE,key:i==null?null:i===H_?H_:""+i,children:e,containerInfo:t,implementation:n}}var Al=pE.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function fu(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}pn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Mn;pn.browser=function(e){return{$$typeof:gE,_reason:e}};pn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(V_(299));return _E(e,t,null,n)};pn.flushSync=function(e){var t=Al.T,n=Mn.p;try{if(Al.T=null,Mn.p=2,e)return e()}finally{Al.T=t,Mn.p=n,Mn.d.f()}};pn.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,Mn.d.C(e,t))};pn.prefetchDNS=function(e){typeof e=="string"&&Mn.d.D(e)};pn.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=fu(n,t.crossOrigin),s=typeof t.integrity=="string"?t.integrity:void 0,a=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?Mn.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:s,fetchPriority:a}):n==="script"&&Mn.d.X(e,{crossOrigin:i,integrity:s,fetchPriority:a,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};pn.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=fu(t.as,t.crossOrigin);Mn.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}}else t==null&&Mn.d.M(e)};pn.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=fu(n,t.crossOrigin);Mn.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};pn.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=fu(t.as,t.crossOrigin);Mn.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}else Mn.d.m(e)};pn.requestFormReset=function(e){Mn.d.r(e)};pn.unstable_batchedUpdates=function(e,t){return e(t)};pn.useFormState=function(e,t,n){return Al.H.useFormState(e,t,n)};pn.useFormStatus=function(){return Al.H.useHostTransitionStatus()};pn.version="19.3.1"});var tp=qi((QD,X_)=>{"use strict";function k_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(k_)}catch(e){console.error(e)}}k_(),X_.exports=G_()});var tv=qi(Ue=>{"use strict";function sp(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,s=e[i];if(0<du(s,t))e[i]=t,e[n]=s,n=i;else break t}}function Yi(e){return e.length===0?null:e[0]}function mu(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,s=e.length,a=s>>>1;i<a;){var r=2*(i+1)-1,o=e[r],l=r+1,c=e[l];if(0>du(o,n))l<s&&0>du(c,o)?(e[i]=c,e[l]=n,i=l):(e[i]=o,e[r]=n,i=r);else if(l<s&&0>du(c,n))e[i]=c,e[l]=n,i=l;else break t}}return t}function du(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}Ue.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(W_=performance,Ue.unstable_now=function(){return W_.now()}):(ep=Date,q_=ep.now(),Ue.unstable_now=function(){return ep.now()-q_});var W_,ep,q_,xs=[],Qs=[],vE=1,di=null,mn=3,ap=!1,wl=!1,Cl=!1,rp=!1,J_=typeof setTimeout=="function"?setTimeout:null,K_=typeof clearTimeout=="function"?clearTimeout:null,Y_=typeof setImmediate<"u"?setImmediate:null;function pu(e){for(var t=Yi(Qs);t!==null;){if(t.callback===null)mu(Qs);else if(t.startTime<=e)mu(Qs),t.sortIndex=t.expirationTime,sp(xs,t);else break;t=Yi(Qs)}}function op(e){if(Cl=!1,pu(e),!wl)if(Yi(xs)!==null)wl=!0,Kr||(Kr=!0,Jr());else{var t=Yi(Qs);t!==null&&lp(op,t.startTime-e)}}var Kr=!1,Rl=-1,Q_=5,j_=-1;function $_(){return rp?!0:!(Ue.unstable_now()-j_<Q_)}function np(){if(rp=!1,Kr){var e=Ue.unstable_now();j_=e;var t=!0;try{t:{wl=!1,Cl&&(Cl=!1,K_(Rl),Rl=-1),ap=!0;var n=mn;try{e:{for(pu(e),di=Yi(xs);di!==null&&!(di.expirationTime>e&&$_());){var i=di.callback;if(typeof i=="function"){di.callback=null,mn=di.priorityLevel;var s=i(di.expirationTime<=e);if(e=Ue.unstable_now(),typeof s=="function"){di.callback=s,pu(e),t=!0;break e}di===Yi(xs)&&mu(xs),pu(e)}else mu(xs);di=Yi(xs)}if(di!==null)t=!0;else{var a=Yi(Qs);a!==null&&lp(op,a.startTime-e),t=!1}}break t}finally{di=null,mn=n,ap=!1}t=void 0}}finally{t?Jr():Kr=!1}}}var Jr;typeof Y_=="function"?Jr=function(){Y_(np)}:typeof MessageChannel<"u"?(ip=new MessageChannel,Z_=ip.port2,ip.port1.onmessage=np,Jr=function(){Z_.postMessage(null)}):Jr=function(){J_(np,0)};var ip,Z_;function lp(e,t){Rl=J_(function(){e(Ue.unstable_now())},t)}Ue.unstable_IdlePriority=5;Ue.unstable_ImmediatePriority=1;Ue.unstable_LowPriority=4;Ue.unstable_NormalPriority=3;Ue.unstable_Profiling=null;Ue.unstable_UserBlockingPriority=2;Ue.unstable_cancelCallback=function(e){e.callback=null};Ue.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Q_=0<e?Math.floor(1e3/e):5};Ue.unstable_getCurrentPriorityLevel=function(){return mn};Ue.unstable_next=function(e){switch(mn){case 1:case 2:case 3:var t=3;break;default:t=mn}var n=mn;mn=t;try{return e()}finally{mn=n}};Ue.unstable_requestPaint=function(){rp=!0};Ue.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=mn;mn=e;try{return t()}finally{mn=n}};Ue.unstable_scheduleCallback=function(e,t,n){var i=Ue.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=n+s,e={id:vE++,callback:t,priorityLevel:e,startTime:n,expirationTime:s,sortIndex:-1},n>i?(e.sortIndex=n,sp(Qs,e),Yi(xs)===null&&e===Yi(Qs)&&(Cl?(K_(Rl),Rl=-1):Cl=!0,lp(op,n-i))):(e.sortIndex=s,sp(xs,e),wl||ap||(wl=!0,Kr||(Kr=!0,Jr()))),e};Ue.unstable_shouldYield=$_;Ue.unstable_wrapCallback=function(e){var t=mn;return function(){var n=mn;mn=t;try{return e.apply(this,arguments)}finally{mn=n}}}});var nv=qi(($D,ev)=>{"use strict";ev.exports=tv()});var GM=qi(Kh=>{"use strict";var Ye=nv(),Vy=Zr(),yE=tp();function X(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Gy(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function gc(e){for(var t=e,n=t;n&&!n.alternate;)t=n,(t.flags&4098)!==0&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function ky(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Xy(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function iv(e){if(gc(e)!==e)throw Error(X(188))}function xE(e){var t=e.alternate;if(!t){if(t=gc(e),t===null)throw Error(X(188));return t!==e?null:e}for(var n=e,i=t;;){var s=n.return;if(s===null)break;var a=s.alternate;if(a===null){if(i=s.return,i!==null){n=i;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===n)return iv(s),e;if(a===i)return iv(s),t;a=a.sibling}throw Error(X(188))}if(n.return!==i.return)n=s,i=a;else{for(var r=!1,o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r){for(o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r)throw Error(X(189))}}if(n.alternate!==i)throw Error(X(190))}if(n.tag!==3)throw Error(X(188));return n.stateNode.current===n?e:t}function Wy(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Wy(e),t!==null)return t;e=e.sibling}return null}function zn(e,t,n,i,s,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,i,s,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&zn(e.child,t,n,i,s,a))return!0;e=e.sibling}return!1}function pr(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function sv(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),!(e.tag===3||e.tag===5||e.tag===27));)e=e.return;return t}function qy(e){var t=[null,null],n=pr(e);return n===null||Yy(t,e,n.child,{foundSelf:!1}),t}function Yy(e,t,n,i){for(;n!==null;){if(n===t)i.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(i.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&Yy(e,t,n.child,i))return!0;n=n.sibling}return!1}function qe(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(X(559))}}var io=null,Hp=null;function SE(e,t,n){return e===n?!0:e===t?(io=e,!0):!1}function ME(e,t,n){return e===n?(Hp=e,!1):e===t?(Hp!==null&&(io=e),!0):!1}function av(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function Vp(e,t,n){for(var i=0,s=e;s;s=n(s))i++;s=0;for(var a=t;a;a=n(a))s++;for(;0<i-s;)e=n(e),i--;for(;0<s-i;)t=n(t),s--;for(;i--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var Se=Object.assign,bE=Symbol.for("react.element"),gu=Symbol.for("react.transitional.element"),Pl=Symbol.for("react.portal"),so=Symbol.for("react.fragment"),Zy=Symbol.for("react.strict_mode"),Gp=Symbol.for("react.profiler"),Jy=Symbol.for("react.consumer"),$i=Symbol.for("react.context"),Qm=Symbol.for("react.forward_ref"),kp=Symbol.for("react.suspense"),Xp=Symbol.for("react.suspense_list"),jm=Symbol.for("react.memo"),ea=Symbol.for("react.lazy");Symbol.for("react.scope");var Wp=Symbol.for("react.activity"),EE=Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var TE=Symbol.for("react.memo_cache_sentinel"),qp=Symbol.for("react.view_transition"),AE=Symbol.for("react.recoverable"),rv=Symbol.iterator;function Dl(e){return e===null||typeof e!="object"?null:(e=rv&&e[rv]||e["@@iterator"],typeof e=="function"?e:null)}var wE=Symbol.for("react.client.reference");function Yp(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===wE?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case so:return"Fragment";case Gp:return"Profiler";case Zy:return"StrictMode";case kp:return"Suspense";case Xp:return"SuspenseList";case Wp:return"Activity";case qp:return"ViewTransition"}if(typeof e=="object")switch(e.$$typeof){case Pl:return"Portal";case $i:return e.displayName||"Context";case Jy:return(e._context.displayName||"Context")+".Consumer";case Qm:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case jm:return t=e.displayName||null,t!==null?t:Yp(e.type)||"Memo";case ea:t=e._payload,e=e._init;try{return Yp(e(t))}catch{}}return null}var Bl=Array.isArray,Ot=Vy.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,se=yE.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,er={pending:!1,data:null,method:null,action:null},Zp=[],ao=-1;function rs(e){return{current:e}}function on(e){0>ao||(e.current=Zp[ao],Zp[ao]=null,ao--)}function Ae(e,t){ao++,Zp[ao]=e.current,e.current=t}var is=rs(null),tc=rs(null),ua=rs(null),nh=rs(null);function ih(e,t){switch(Ae(ua,t),Ae(tc,e),Ae(is,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?xy(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=xy(t),e=_M(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}on(is),Ae(is,e)}function Ao(){on(is),on(tc),on(ua)}function Jp(e){var t=e.memoizedState;t!==null&&(Po._currentValue=t.memoizedState,Ae(nh,e)),t=is.current;var n=_M(t,e.type);t!==n&&(Ae(tc,e),Ae(is,n))}function sh(e){tc.current===e&&(on(is),on(tc)),nh.current===e&&(on(nh),Po._currentValue=er)}var cp,ov;function $s(e){if(cp===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);cp=t&&t[1]||"",ov=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+cp+e+ov}var up=!1;function hp(e,t){if(!e||up)return"";up=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var d=function(){throw Error()};if(Object.defineProperty(d.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(d,[])}catch(_){var h=_}Reflect.construct(e,[],d)}else{try{d.call()}catch(_){h=_}d=!1;try{var p=Object.getOwnPropertyDescriptor(e.prototype,"props");Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),d=!0,new e}finally{d&&(p!==void 0?Object.defineProperty(e.prototype,"props",p):delete e.prototype.props)}}}else{try{throw Error()}catch(_){h=_}(d=e())&&typeof d.catch=="function"&&d.catch(function(){})}}catch(_){if(_&&h&&typeof _.stack=="string")return[_.stack,h.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var a=i.DetermineComponentFrameRoot(),r=a[0],o=a[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(s=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;s<c.length&&!c[s].includes("DetermineComponentFrameRoot");)s++;if(i===l.length||s===c.length)for(i=l.length-1,s=c.length-1;1<=i&&0<=s&&l[i]!==c[s];)s--;for(;1<=i&&0<=s;i--,s--)if(l[i]!==c[s]){if(i!==1||s!==1)do if(i--,s--,0>s||l[i]!==c[s]){var f=`
`+l[i].replace(" at new "," at ");return e.displayName&&f.includes("<anonymous>")&&(f=f.replace("<anonymous>",e.displayName)),f}while(1<=i&&0<=s);break}}}finally{up=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?$s(n):""}function CE(e,t){switch(e.tag){case 26:case 27:case 5:return $s(e.type);case 16:return $s("Lazy");case 13:return e.child!==t&&t!==null?$s("Suspense Fallback"):$s("Suspense");case 19:return $s("SuspenseList");case 0:case 15:return hp(e.type,!1);case 11:return hp(e.type.render,!1);case 1:return hp(e.type,!0);case 31:return $s("Activity");case 30:return $s("ViewTransition");default:return""}}function lv(e){try{var t="",n=null;do t+=CE(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Kp=Object.prototype.hasOwnProperty,$m=Ye.unstable_scheduleCallback,fp=Ye.unstable_cancelCallback,RE=Ye.unstable_shouldYield,DE=Ye.unstable_requestPaint,Qn=Ye.unstable_now,UE=Ye.unstable_getCurrentPriorityLevel,Ky=Ye.unstable_ImmediatePriority,Qy=Ye.unstable_UserBlockingPriority,ah=Ye.unstable_NormalPriority,NE=Ye.unstable_LowPriority,jy=Ye.unstable_IdlePriority,LE=Ye.log,OE=Ye.unstable_setDisableYieldValue,_c=null,jn=null;function sa(e){if(typeof LE=="function"&&OE(e),jn&&typeof jn.setStrictMode=="function")try{jn.setStrictMode(_c,e)}catch{}}var $n=Math.clz32?Math.clz32:BE,IE=Math.log,PE=Math.LN2;function BE(e){return e>>>=0,e===0?32:31-(IE(e)/PE|0)|0}var _u=256,vu=262144,yu=4194304;function Ka(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Uh(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var s=0,a=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~a,i!==0?s=Ka(i):(r&=o,r!==0?s=Ka(r):n||(n=o&~e,n!==0&&(s=Ka(n))))):(o=i&~a,o!==0?s=Ka(o):r!==0?s=Ka(r):n||(n=i&~e,n!==0&&(s=Ka(n)))),s===0?0:t!==0&&t!==s&&(t&a)===0&&(a=s&-s,n=t&-t,a>=n||a===32&&(n&4194048)!==0)?t:s}function vc(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function $y(e,t){(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-$n(n),s=1<<i;t|=e[i],n&=~s}return t}function zE(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tx(){var e=yu;return yu<<=1,(yu&62914560)===0&&(yu=4194304),e}function dp(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function yc(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function FE(e,t,n,i,s,a){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var f=31-$n(n),d=1<<f;o[f]=0,l[f]=-1;var h=c[f];if(h!==null)for(c[f]=null,f=0;f<h.length;f++){var p=h[f];p!==null&&(p.lane&=-536870913)}n&=~d}i!==0&&ex(e,i,0),a!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=a&~(r&~t))}function ex(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-$n(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function nx(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-$n(n),s=1<<i;s&t|e[i]&t&&(e[i]|=t),n&=~s}}function ix(e,t){var n=t&-t;return n=(n&42)!==0?1:tg(n),(n&(e.suspendedLanes|t))!==0?0:n}function tg(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function eg(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function sx(){var e=se.p;return e!==0?e:(e=window.event,e===void 0?32:FM(e.type))}function cv(e,t){var n=se.p;try{return se.p=e,t()}finally{se.p=n}}var Ls=Math.random().toString(36).slice(2),an="__reactFiber$"+Ls,Fn="__reactProps$"+Ls,Fo="__reactContainer$"+Ls,uv="__reactEvents$"+Ls,HE="__reactListeners$"+Ls,VE="__reactHandles$"+Ls,hv="__reactResources$"+Ls,xc="__reactMarker$"+Ls,rh="__reactLoad$"+Ls;function Nh(e){delete e[an],delete e[Fn],delete e[HE],delete e[VE]}function $a(e){var t;if(t=e[an])return t;for(var n=e.parentNode;n;){if(t=n[Fo]||n[an]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Cy(e);e!==null;){if(n=e[an])return n;e=Cy(e)}return t}e=n,n=e.parentNode}return null}function Ho(e){if(e=e[an]||e[Fo]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function zl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(X(33))}function go(e){var t=e[hv];return t||(t=e[hv]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function $e(e){e[xc]=!0}function ax(e){e[rh]=void 0}var rx=new Set,ox={};function mr(e,t){wo(e,t),wo(e+"Capture",t)}function wo(e,t){for(ox[e]=t,e=0;e<t.length;e++)rx.add(t[e])}var GE=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),fv={},dv={};function kE(e){return Kp.call(dv,e)?!0:Kp.call(fv,e)?!1:GE.test(e)?dv[e]=!0:(fv[e]=!0,!1)}var ne=!1;function pv(){var e=ne;return ne=!1,e}function Bu(e,t,n){if(kE(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,n)}}function xu(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,n)}}function Ss(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,i)}}function Yn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function lx(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function XE(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var s=i.get,a=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(r){n=""+r,a.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Qp(e){if(!e._valueTracker){var t=lx(e)?"checked":"value";e._valueTracker=XE(e,t,""+e[t])}}function cx(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=lx(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}var WE=/[\n"\\]/g;function vi(e){return e.replace(WE,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function jp(e,t,n,i,s,a,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Yn(t)):e.value!==""+Yn(t)&&(e.value=""+Yn(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?r==="number"&&e.value==t?pp(e,Yn(e.value)):pp(e,Yn(t)):n!=null?pp(e,Yn(n)):i!=null&&e.removeAttribute("value"),s==null&&a!=null&&(e.defaultChecked=!!a),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+Yn(o):e.removeAttribute("name")}function ux(e,t,n,i,s,a,r,o){if(a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(e.type=a),t!=null||n!=null){if(!(a!=="submit"&&a!=="reset"||t!=null)){Qp(e);return}n=n!=null?""+Yn(n):"",t=t!=null?""+Yn(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??s,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),Qp(e)}function pp(e,t){e.defaultValue!==""+t&&(e.defaultValue=""+t)}function _o(e,t,n,i){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&i&&(e[n].defaultSelected=!0)}else{for(n=""+Yn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,i&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function hx(e,t,n){if(t!=null&&(t=""+Yn(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+Yn(n):""}function fx(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(X(92));if(Bl(i)){if(1<i.length)throw Error(X(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=Yn(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),Qp(e)}function Co(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var qE=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function mv(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||qE.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function dx(e,t,n){if(t!=null&&typeof t!="object")throw Error(X(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="",ne=!0);for(var s in t)i=t[s],t.hasOwnProperty(s)&&n[s]!==i&&(mv(e,s,i),ne=!0)}else for(var a in t)t.hasOwnProperty(a)&&mv(e,a,t[a])}function ng(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var YE=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),ZE=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function zu(e){return ZE.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function ts(){}var $p=null;function ig(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ro=null,vo=null;function gv(e){var t=Ho(e);if(t&&(e=t.stateNode)){var n=e[Fn]||null;t:switch(e=t.stateNode,t.type){case"input":if(jp(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+vi(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var s=i[Fn]||null;if(!s)throw Error(X(90));jp(i,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&cx(i)}break t;case"textarea":hx(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&_o(e,!!n.multiple,t,!1)}}}var mp=!1;function px(e,t,n){if(mp)return e(t,n);mp=!0;try{var i=e(t);return i}finally{if(mp=!1,(ro!==null||vo!==null)&&(qh(),ro&&(t=ro,e=vo,vo=ro=null,gv(t),e)))for(t=0;t<e.length;t++)gv(e[t])}}function ec(e,t){var n=e.stateNode;if(n===null)return null;var i=n[Fn]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(X(231,t,typeof n));return n}var ws=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),tm=!1;if(ws)try{Qr={},Object.defineProperty(Qr,"passive",{get:function(){tm=!0}}),window.addEventListener("test",Qr,Qr),window.removeEventListener("test",Qr,Qr)}catch{tm=!1}var Qr,aa=null,sg=null,Fu=null;function mx(){if(Fu)return Fu;var e,t=sg,n=t.length,i,s="value"in aa?aa.value:aa.textContent,a=s.length;for(e=0;e<n&&t[e]===s[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===s[a-i];i++);return Fu=s.slice(e,1<i?1-i:void 0)}function Hu(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Su(){return!0}function _v(){return!1}function An(e){function t(n,i,s,a,r){this._reactName=n,this._targetInst=s,this.type=i,this.nativeEvent=a,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(a):a[o]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Su:_v,this.isPropagationStopped=_v,this}return Se(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Su)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Su)},persist:function(){},isPersistent:Su}),t}var Ta={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Lh=An(Ta),Sc=Se({},Ta,{view:0,detail:0}),JE=An(Sc),gp,_p,Ul,Oh=Se({},Sc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ag,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ul&&(Ul&&e.type==="mousemove"?(gp=e.screenX-Ul.screenX,_p=e.screenY-Ul.screenY):_p=gp=0,Ul=e),gp)},movementY:function(e){return"movementY"in e?e.movementY:_p}}),vv=An(Oh),KE=Se({},Oh,{dataTransfer:0}),QE=An(KE),jE=Se({},Sc,{relatedTarget:0}),vp=An(jE),$E=Se({},Ta,{animationName:0,elapsedTime:0,pseudoElement:0}),tT=An($E),eT=Se({},Ta,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),nT=An(eT),iT=Se({},Ta,{data:0}),yv=An(iT),sT={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},aT={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},rT={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function oT(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=rT[e])?!!t[e]:!1}function ag(){return oT}var lT=Se({},Sc,{key:function(e){if(e.key){var t=sT[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Hu(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?aT[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ag,charCode:function(e){return e.type==="keypress"?Hu(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Hu(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),cT=An(lT),uT=Se({},Oh,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),xv=An(uT),hT=Se({},Ta,{submitter:0}),fT=An(hT),dT=Se({},Sc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ag}),pT=An(dT),mT=Se({},Ta,{propertyName:0,elapsedTime:0,pseudoElement:0}),gT=An(mT),_T=Se({},Oh,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),vT=An(_T),yT=Se({},Ta,{newState:0,oldState:0,source:0}),xT=An(yT),ST=[9,13,27,32],rg=ws&&"CompositionEvent"in window,Vl=null;ws&&"documentMode"in document&&(Vl=document.documentMode);var MT=ws&&"TextEvent"in window&&!Vl,gx=ws&&(!rg||Vl&&8<Vl&&11>=Vl),Sv=" ",Mv=!1;function _x(e,t){switch(e){case"keyup":return ST.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function vx(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var oo=!1;function bT(e,t){switch(e){case"compositionend":return vx(t);case"keypress":return t.which!==32?null:(Mv=!0,Sv);case"textInput":return e=t.data,e===Sv&&Mv?null:e;default:return null}}function ET(e,t){if(oo)return e==="compositionend"||!rg&&_x(e,t)?(e=mx(),Fu=sg=aa=null,oo=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return gx&&t.locale!=="ko"?null:t.data;default:return null}}var TT={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function bv(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!TT[e.type]:t==="textarea"}function yx(e,t,n,i){ro?vo?vo.push(i):vo=[i]:ro=i,t=Ch(t,"onChange"),0<t.length&&(n=new Lh("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var Gl=null,nc=null;function AT(e){pM(e,0)}function Ih(e){var t=zl(e);if(cx(t))return e}function Ev(e,t){if(e==="change")return t}var xx=!1;ws&&(ws?(bu="oninput"in document,bu||(yp=document.createElement("div"),yp.setAttribute("oninput","return;"),bu=typeof yp.oninput=="function"),Mu=bu):Mu=!1,xx=Mu&&(!document.documentMode||9<document.documentMode));var Mu,bu,yp;function Tv(){Gl&&(Gl.detachEvent("onpropertychange",Sx),nc=Gl=null)}function Sx(e){if(e.propertyName==="value"&&Ih(nc)){var t=[];yx(t,nc,e,ig(e)),px(AT,t)}}function wT(e,t,n){e==="focusin"?(Tv(),Gl=t,nc=n,Gl.attachEvent("onpropertychange",Sx)):e==="focusout"&&Tv()}function CT(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ih(nc)}function RT(e,t){if(e==="click")return Ih(t)}function DT(e,t){if(e==="input"||e==="change")return Ih(t)}function UT(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ei=typeof Object.is=="function"?Object.is:UT;function ic(e,t){if(ei(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var s=n[i];if(!Kp.call(t,s)||!ei(e[s],t[s]))return!1}return!0}function em(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Av(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function wv(e,t){var n=Av(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Av(n)}}function Mx(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Mx(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function bx(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=em(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=em(e.document)}return t}function og(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var NT=ws&&"documentMode"in document&&11>=document.documentMode,lo=null,nm=null,kl=null,im=!1;function Cv(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;im||lo==null||lo!==em(i)||(i=lo,"selectionStart"in i&&og(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),kl&&ic(kl,i)||(kl=i,i=Ch(nm,"onSelect"),0<i.length&&(t=new Lh("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=lo)))}function Za(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var co={animationend:Za("Animation","AnimationEnd"),animationiteration:Za("Animation","AnimationIteration"),animationstart:Za("Animation","AnimationStart"),transitionrun:Za("Transition","TransitionRun"),transitionstart:Za("Transition","TransitionStart"),transitioncancel:Za("Transition","TransitionCancel"),transitionend:Za("Transition","TransitionEnd")},xp={},Ex={};ws&&(Ex=document.createElement("div").style,"AnimationEvent"in window||(delete co.animationend.animation,delete co.animationiteration.animation,delete co.animationstart.animation),"TransitionEvent"in window||delete co.transitionend.transition);function gr(e){if(xp[e])return xp[e];if(!co[e])return e;var t=co[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ex)return xp[e]=t[n];return e}var Tx=gr("animationend"),Ax=gr("animationiteration"),wx=gr("animationstart"),LT=gr("transitionrun"),OT=gr("transitionstart"),IT=gr("transitioncancel"),Cx=gr("transitionend"),Rx=new Map,sm="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");sm.push("scrollEnd");function zi(e,t){Rx.set(e,t),mr(t,[e])}var PT=0;function Cs(e,t){if(e.name!=null&&e.name!=="auto")return e.name;if(t.autoName!==null)return t.autoName;e=Bi.identifierPrefix;var n=PT++;return e="_"+e+"t_"+n.toString(32)+"_",t.autoName=e}function Rv(e){if(e==null||typeof e=="string")return e;var t=null,n=To;if(n!==null)for(var i=0;i<n.length;i++){var s=e[n[i]];if(s!=null){if(s==="none")return"none";t=t==null?s:t+(" "+s)}}return t??e.default}function Os(e,t){return e=Rv(e),t=Rv(t),t==null?e==="auto"?null:e:t==="auto"?null:t}var oh=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},mi=[],uo=0,lg=0;function Ph(){for(var e=uo,t=lg=uo=0;t<e;){var n=mi[t];mi[t++]=null;var i=mi[t];mi[t++]=null;var s=mi[t];mi[t++]=null;var a=mi[t];if(mi[t++]=null,i!==null&&s!==null){var r=i.pending;r===null?s.next=s:(s.next=r.next,r.next=s),i.pending=s}a!==0&&Dx(n,s,a)}}function Bh(e,t,n,i){mi[uo++]=e,mi[uo++]=t,mi[uo++]=n,mi[uo++]=i,lg|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function cg(e,t,n,i){return Bh(e,t,n,i),lh(e)}function _r(e,t){return Bh(e,null,null,t),lh(e)}function Dx(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var s=!1,a=e.return;a!==null;)a.childLanes|=n,i=a.alternate,i!==null&&(i.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(s=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,s&&t!==null&&(s=31-$n(n),e=a.hiddenUpdates,i=e[s],i===null?e[s]=[t]:i.push(t),t.lane=n|536870912),a):null}function lh(e){if(50<$l)throw $l=0,Ku=null,Error(X(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ho={};function BT(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pn(e,t,n,i){return new BT(e,t,n,i)}function ug(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ts(e,t){var n=e.alternate;return n===null?(n=Pn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Ux(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Vu(e,t,n,i,s,a){var r=0;if(i=e,typeof i=="function")ug(i)&&(r=1);else if(typeof i=="string")r=cw(e,n,is.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(i){case Wp:return e=Pn(31,n,t,s),e.elementType=Wp,e.lanes=a,e;case so:return nr(n.children,s,a,t);case Zy:r=8,s|=24;break;case Gp:return e=Pn(12,n,t,s|2),e.elementType=Gp,e.lanes=a,e;case kp:return e=Pn(13,n,t,s),e.elementType=kp,e.lanes=a,e;case Xp:return e=Pn(19,n,t,s),e.elementType=Xp,e.lanes=a,e;case EE:case qp:return e=s|32,e=Pn(30,n,t,e),e.elementType=qp,e.lanes=a,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof i=="object"&&i!==null)switch(i.$$typeof){case $i:r=10;break t;case Jy:r=9;break t;case Qm:r=11;break t;case jm:r=14;break t;case ea:r=16,i=null;break t}r=29,n=Error(X(130,e===null?"null":typeof e,"")),i=null}return t=Pn(r,n,t,s),t.elementType=e,t.type=i,t.lanes=a,t}function nr(e,t,n,i){return e=Pn(7,e,i,t),e.lanes=n,e}function Sp(e,t,n){return e=Pn(6,e,null,t),e.lanes=n,e}function Nx(e){var t=Pn(18,null,null,0);return t.stateNode=e,t}function Mp(e,t,n){return t=Pn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Dv=new WeakMap;function yi(e,t){if(typeof e=="object"&&e!==null){var n=Dv.get(e);return n!==void 0?n:(t={value:e,source:t,stack:lv(t)},Dv.set(e,t),t)}return{value:e,source:t,stack:lv(t)}}var fo=[],po=0,ch=null,sc=0,gi=[],_i=0,xa=null,es=1,ns="";function bs(e,t){fo[po++]=sc,fo[po++]=ch,ch=e,sc=t}function Lx(e,t,n){gi[_i++]=es,gi[_i++]=ns,gi[_i++]=xa,xa=e;var i=es;e=ns;var s=32-$n(i)-1;i&=~(1<<s),n+=1;var a=32-$n(t)+s;if(30<a){var r=s-s%5;a=(i&(1<<r)-1).toString(32),i>>=r,s-=r,es=1<<32-$n(t)+s|n<<s|i,ns=a+e}else es=1<<a|n<<s|i,ns=e}function zh(e){e.return!==null&&(bs(e,1),Lx(e,1,0))}function hg(e){for(;e===ch;)ch=fo[--po],fo[po]=null,sc=fo[--po],fo[po]=null;for(;e===xa;)xa=gi[--_i],gi[_i]=null,ns=gi[--_i],gi[_i]=null,es=gi[--_i],gi[_i]=null}function Ox(e,t){gi[_i++]=es,gi[_i++]=ns,gi[_i++]=xa,es=t.id,ns=t.overflow,xa=e}var tn=null,Te=null,Xt=!1,ha=null,xi=!1,am=Error(X(519));function Sa(e){var t=Error(X(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ac(yi(t,e)),am}function Uv(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[an]=e,t[Fn]=i,n){case"dialog":qt("cancel",t),qt("close",t);break;case"iframe":case"object":case"embed":qt("load",t);break;case"video":case"audio":for(n=0;n<cc.length;n++)qt(cc[n],t);break;case"source":qt("error",t);break;case"img":case"image":case"link":qt("error",t),qt("load",t);break;case"details":qt("toggle",t);break;case"input":qt("invalid",t),ux(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":qt("invalid",t);break;case"textarea":qt("invalid",t),fx(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||gM(t.textContent,n)?(i.popover!=null&&(qt("beforetoggle",t),qt("toggle",t)),i.onScroll!=null&&qt("scroll",t),i.onScrollEnd!=null&&qt("scrollend",t),i.onClick!=null&&(t.onclick=ts),t=!0):t=!1,t||Sa(e,!0)}function uh(e){for(tn=e.return;tn;)switch(tn.tag){case 5:case 31:case 13:xi=!1;return;case 27:case 3:xi=!0;return;default:tn=tn.return}}function jr(e){if(e!==tn)return!1;if(!Xt)return uh(e),Xt=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||km(e.type,e.memoizedProps)),n=!n),n&&Te&&Sa(e),uh(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(X(317));Te=wy(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(X(317));Te=wy(e)}else t===27?(t=Te,Aa(e.type)?(e=Ym,Ym=null,Te=e):Te=t):Te=tn?Si(e.stateNode.nextSibling):null;return!0}function rr(){Te=tn=null,Xt=!1}function bp(){var e=ha;return e!==null&&(On===null?On=e:On.push.apply(On,e),ha=null),e}function ac(e){ha===null?ha=[e]:ha.push(e)}var rm=rs(null),vr=null,Es=null;function ra(e,t,n){Ae(rm,t._currentValue),t._currentValue=n}function As(e){e._currentValue=rm.current,on(rm)}function Gu(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function om(e,t,n,i){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){var r=s.child;a=a.firstContext;t:for(;a!==null;){var o=a;a=s;for(var l=0;l<t.length;l++)if(o.context===t[l]){a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),Gu(a.return,n,e),i||(r=null);break t}a=o.next}}else if(s.tag===18){if(r=s.return,r===null)throw Error(X(341));r.lanes|=n,a=r.alternate,a!==null&&(a.lanes|=n),Gu(r,n,e),r=null}else s.tag===13&&s.memoizedState!==null&&s.memoizedState.dehydrated===null?(s.lanes|=n,r=s.alternate,r!==null&&(r.lanes|=n),Gu(s.return,n,e),r=s.child,r=r!==null?r.sibling:null):r=s.child;if(r!==null)r.return=s;else for(r=s;r!==null;){if(r===e){r=null;break}if(s=r.sibling,s!==null){s.return=r.return,r=s;break}r=r.return}s=r}}function or(e,t,n,i){e=null;for(var s=t,a=!1;s!==null;){if(!a){if((s.flags&524288)!==0)a=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var r=s.alternate;if(r===null)throw Error(X(387));if(r=r.memoizedProps,r!==null){var o=s.type;ei(s.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(s===nh.current){if(r=s.alternate,r===null)throw Error(X(387));r.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push(Po):e=[Po])}s=s.return}return e!==null&&om(t,e,n,i),t.flags|=262144,e!==null}function hh(e){for(e=e.firstContext;e!==null;){if(!ei(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function lr(e){vr=e,Es=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function rn(e){return Ix(vr,e)}function Eu(e,t){return vr===null&&lr(e),Ix(e,t)}function Ix(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Es===null){if(e===null)throw Error(X(308));Es=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Es=Es.next=t;return n}var zT=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},FT=Ye.unstable_scheduleCallback,HT=Ye.unstable_NormalPriority,He={$$typeof:$i,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function fg(){return{controller:new zT,data:new Map,refCount:0}}function Mc(e){e.refCount--,e.refCount===0&&FT(HT,function(){e.controller.abort()})}function Nv(e,t){if((e.pendingLanes&4194048)!==0){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var i=t[e];n.indexOf(i)===-1&&n.push(i)}}}var Fl=null;function VT(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Xl=null,lm=0,cr=0,yo=null;function GT(e,t){if(Xl===null){var n=Xl=[];lm=0,cr=Hg(),yo={status:"pending",value:void 0,then:function(i){n.push(i)}}}return lm++,t.then(Lv,Lv),t}function Lv(){if(--lm===0&&(Fl=null,Xl!==null)){yo!==null&&(yo.status="fulfilled");var e=Xl;Xl=null,cr=0,yo=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function kT(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(s){n.push(s)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var s=0;s<n.length;s++)(0,n[s])(t)},function(s){for(i.status="rejected",i.reason=s,s=0;s<n.length;s++)(0,n[s])(void 0)}),i}var Ov=Ot.S;Ot.S=function(e,t){if($S=Qn(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&GT(e,t),Fl!==null)for(var n=Lo;n!==null;)Nv(n,Fl),n=n.next;if(n=e.types,n!==null){for(var i=Lo;i!==null;)Nv(i,n),i=i.next;if(cr!==0){i=Fl,i===null&&(i=Fl=[]);for(var s=0;s<n.length;s++){var a=n[s];i.indexOf(a)===-1&&i.push(a)}}}Ov!==null&&Ov(e,t)};var ir=rs(null);function dg(){var e=ir.current;return e!==null?e:xe.pooledCache}function ku(e,t){t===null?Ae(ir,ir.current):Ae(ir,t.pool)}function Px(){var e=dg();return e===null?null:{parent:He._currentValue,pool:e}}var Vo=Error(X(460)),pg=Error(X(474)),Fh=Error(X(542)),fh={then:function(){}};function Iv(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Bx(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(ts,ts),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Bv(e),e===void 0&&!("reason"in t)?Error(X(600)):e;default:if(typeof t.status=="string")t.then(ts,ts);else{if(e=xe,e!==null&&100<e.shellSuspendCounter)throw Error(X(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=i}},function(i){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Bv(e),e}throw sr=t,Vo}}function Qa(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(sr=n,Vo):n}}var sr=null;function Pv(){if(sr===null)throw Error(X(459));var e=sr;return sr=null,e}function Bv(e){if(e===Vo||e===Fh)throw Error(X(483))}var xo=null,rc=0;function Tu(e){var t=rc;return rc+=1,xo===null&&(xo=[]),Bx(xo,e,t)}function js(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Au(e,t){throw t.$$typeof===bE?Error(X(525)):(e=Object.prototype.toString.call(t),Error(X(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function zx(e){function t(u,g){if(e){var v=u.deletions;v===null?(u.deletions=[g],u.flags|=16):v.push(g)}}function n(u,g){if(!e)return null;for(;g!==null;)t(u,g),g=g.sibling;return null}function i(u){for(var g=new Map;u!==null;)u.key===null?g.set(u.index,u):g.set(u.key,u),u=u.sibling;return g}function s(u,g){return u=Ts(u,g),u.index=0,u.sibling=null,u}function a(u,g,v){return u.index=v,e?(v=u.alternate,v!==null?(v=v.index,v<g?(u.flags|=2,g):v):(u.flags|=134217730,g)):(u.flags|=1048576,g)}function r(u){return e&&u.alternate===null&&(u.flags|=134217730),u}function o(u,g,v,y){return g===null||g.tag!==6?(g=Sp(v,u.mode,y),g.return=u,g):(g=s(g,v),g.return=u,g)}function l(u,g,v,y){var T=v.type;return T===so?(u=f(u,g,v.props.children,y,v.key),js(u,v),u):g!==null&&(g.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===ea&&Qa(T)===g.type)?(g=s(g,v.props),js(g,v),g.return=u,g):(g=Vu(v.type,v.key,v.props,null,u.mode,y),js(g,v),g.return=u,g)}function c(u,g,v,y){return g===null||g.tag!==4||g.stateNode.containerInfo!==v.containerInfo||g.stateNode.implementation!==v.implementation?(g=Mp(v,u.mode,y),g.return=u,g):(g=s(g,v.children||[]),g.return=u,g)}function f(u,g,v,y,T){return g===null||g.tag!==7?(g=nr(v,u.mode,y,T),g.return=u,g):(g=s(g,v),g.return=u,g)}function d(u,g,v){if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return g=Sp(""+g,u.mode,v),g.return=u,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case gu:return v=Vu(g.type,g.key,g.props,null,u.mode,v),js(v,g),v.return=u,v;case Pl:return g=Mp(g,u.mode,v),g.return=u,g;case ea:return g=Qa(g),d(u,g,v)}if(Bl(g)||Dl(g))return g=nr(g,u.mode,v,null),g.return=u,g;if(typeof g.then=="function")return d(u,Tu(g),v);if(g.$$typeof===$i)return d(u,Eu(u,g),v);Au(u,g)}return null}function h(u,g,v,y){var T=g!==null?g.key:null;if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return T!==null?null:o(u,g,""+v,y);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case gu:return v.key===T?l(u,g,v,y):null;case Pl:return v.key===T?c(u,g,v,y):null;case ea:return v=Qa(v),h(u,g,v,y)}if(Bl(v)||Dl(v))return T!==null?null:f(u,g,v,y,null);if(typeof v.then=="function")return h(u,g,Tu(v),y);if(v.$$typeof===$i)return h(u,g,Eu(u,v),y);Au(u,v)}return null}function p(u,g,v,y,T){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return u=u.get(v)||null,o(g,u,""+y,T);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case gu:return u=u.get(y.key===null?v:y.key)||null,l(g,u,y,T);case Pl:return u=u.get(y.key===null?v:y.key)||null,c(g,u,y,T);case ea:return y=Qa(y),p(u,g,v,y,T)}if(Bl(y)||Dl(y))return u=u.get(v)||null,f(g,u,y,T,null);if(typeof y.then=="function")return p(u,g,v,Tu(y),T);if(y.$$typeof===$i)return p(u,g,v,Eu(g,y),T);Au(g,y)}return null}function _(u,g,v,y){for(var T=null,C=null,w=g,U=g=0,E=null;w!==null&&U<v.length;U++){w.index>U?(E=w,w=null):E=w.sibling;var b=h(u,w,v[U],y);if(b===null){w===null&&(w=E);break}e&&w&&b.alternate===null&&t(u,w),g=a(b,g,U),C===null?T=b:C.sibling=b,C=b,w=E}if(U===v.length)return n(u,w),Xt&&bs(u,U),T;if(w===null){for(;U<v.length;U++)w=d(u,v[U],y),w!==null&&(g=a(w,g,U),C===null?T=w:C.sibling=w,C=w);return Xt&&bs(u,U),T}for(w=i(w);U<v.length;U++)E=p(w,u,U,v[U],y),E!==null&&(e&&(b=E.alternate,b!==null&&w.delete(b.key===null?U:b.key)),g=a(E,g,U),C===null?T=E:C.sibling=E,C=E);return e&&w.forEach(function(O){return t(u,O)}),Xt&&bs(u,U),T}function M(u,g,v,y){if(v==null)throw Error(X(151));for(var T=null,C=null,w=g,U=g=0,E=null,b=v.next();w!==null&&!b.done;U++,b=v.next()){w.index>U?(E=w,w=null):E=w.sibling;var O=h(u,w,b.value,y);if(O===null){w===null&&(w=E);break}e&&w&&O.alternate===null&&t(u,w),g=a(O,g,U),C===null?T=O:C.sibling=O,C=O,w=E}if(b.done)return n(u,w),Xt&&bs(u,U),T;if(w===null){for(;!b.done;U++,b=v.next())b=d(u,b.value,y),b!==null&&(g=a(b,g,U),C===null?T=b:C.sibling=b,C=b);return Xt&&bs(u,U),T}for(w=i(w);!b.done;U++,b=v.next())b=p(w,u,U,b.value,y),b!==null&&(e&&(E=b.alternate,E!==null&&w.delete(E.key===null?U:E.key)),g=a(b,g,U),C===null?T=b:C.sibling=b,C=b);return e&&w.forEach(function(F){return t(u,F)}),Xt&&bs(u,U),T}function m(u,g,v,y){if(typeof v=="object"&&v!==null&&v.type===so&&v.key===null&&v.props.ref===void 0&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case gu:t:{for(var T=v.key;g!==null;){if(g.key===T){if(T=v.type,T===so){if(g.tag===7){n(u,g.sibling),y=s(g,v.props.children),js(y,v),y.return=u,u=y;break t}}else if(g.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===ea&&Qa(T)===g.type){n(u,g.sibling),y=s(g,v.props),js(y,v),y.return=u,u=y;break t}n(u,g);break}else t(u,g);g=g.sibling}v.type===so?(y=nr(v.props.children,u.mode,y,v.key),js(y,v),y.return=u,u=y):(y=Vu(v.type,v.key,v.props,null,u.mode,y),js(y,v),y.return=u,u=y)}return r(u);case Pl:t:{for(T=v.key;g!==null;){if(g.key===T)if(g.tag===4&&g.stateNode.containerInfo===v.containerInfo&&g.stateNode.implementation===v.implementation){n(u,g.sibling),y=s(g,v.children||[]),y.return=u,u=y;break t}else{n(u,g);break}else t(u,g);g=g.sibling}y=Mp(v,u.mode,y),y.return=u,u=y}return r(u);case ea:return v=Qa(v),m(u,g,v,y)}if(Bl(v))return _(u,g,v,y);if(Dl(v)){if(T=Dl(v),typeof T!="function")throw Error(X(150));return v=T.call(v),M(u,g,v,y)}if(typeof v.then=="function")return m(u,g,Tu(v),y);if(v.$$typeof===$i)return m(u,g,Eu(u,v),y);Au(u,v)}return typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint"?(v=""+v,g!==null&&g.tag===6?(n(u,g.sibling),y=s(g,v),y.return=u,u=y):(n(u,g),y=Sp(v,u.mode,y),y.return=u,u=y),r(u)):n(u,g)}return function(u,g,v,y){try{rc=0;var T=m(u,g,v,y);return xo=null,T}catch(w){if(w===Vo||w===Fh)throw w;var C=Pn(29,w,null,u.mode);return C.lanes=y,C.return=u,C}finally{}}}var ur=zx(!0),Fx=zx(!1),na=!1;function mg(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function cm(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function fa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function da(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(ie&2)!==0){var s=i.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),i.pending=t,t=lh(e),Dx(e,null,n),t}return Bh(e,i,t,n),lh(e)}function Wl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,nx(e,n)}}function Ep(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var s=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?s=a=r:a=a.next=r,n=n.next}while(n!==null);a===null?s=a=t:a=a.next=t}else s=a=t;n={baseState:i.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var um=!1;function ql(){if(um){var e=yo;if(e!==null)throw e}}function Yl(e,t,n,i){um=!1;var s=e.updateQueue;na=!1;var a=s.firstBaseUpdate,r=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?a=c:r.next=c,r=l;var f=e.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==r&&(o===null?f.firstBaseUpdate=c:o.next=c,f.lastBaseUpdate=l))}if(a!==null){var d=s.baseState;r=0,f=c=l=null,o=a;do{var h=o.lane&-536870913,p=h!==o.lane;if(p?(Zt&h)===h:(i&h)===h){h!==0&&h===cr&&(um=!0),f!==null&&(f=f.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var _=e,M=o;h=t;var m=n;switch(M.tag){case 1:if(_=M.payload,typeof _=="function"){d=_.call(m,d,h);break t}d=_;break t;case 3:_.flags=_.flags&-65537|128;case 0:if(_=M.payload,h=typeof _=="function"?_.call(m,d,h):_,h==null)break t;d=Se({},d,h);break t;case 2:na=!0}}h=o.callback,h!==null&&(e.flags|=64,p&&(e.flags|=8192),p=s.callbacks,p===null?s.callbacks=[h]:p.push(h))}else p={lane:h,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(c=f=p,l=d):f=f.next=p,r|=h;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;p=o,o=p.next,p.next=null,s.lastBaseUpdate=p,s.shared.pending=null}}while(!0);f===null&&(l=d),s.baseState=l,s.firstBaseUpdate=c,s.lastBaseUpdate=f,a===null&&(s.shared.lanes=0),Ea|=r,e.lanes=r,e.memoizedState=d}}function Hx(e,t){if(typeof e!="function")throw Error(X(191,e));e.call(t)}function Vx(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Hx(n[e],t)}var Ma=rs(null),dh=rs(0);function zv(e,t){e=Ns,Ae(dh,e),Ae(Ma,t),Ns=e|t.baseLanes}function hm(){Ae(dh,Ns),Ae(Ma,Ma.current)}function gg(){Ns=dh.current,on(Ma),on(dh)}var un=rs(null),gn=null;function pa(e){var t=e.alternate;Ae(ln,ln.current&1),Ae(un,e),gn===null&&(t===null||Ma.current!==null||t.memoizedState!==null)&&(gn=e)}function fm(e){Ae(ln,ln.current),Ae(un,e),gn===null&&(gn=e)}function Gx(e){e.tag===22?(Ae(ln,ln.current),Ae(un,e),gn===null&&(gn=e)):ma()}function ma(){Ae(ln,ln.current),Ae(un,un.current)}function Zn(e){on(un),gn===e&&(gn=null),on(ln)}var ln=rs(0);function oc(e,t){Ae(un,un.current),Ae(ln,t)}function _g(e){on(ln),on(un),gn===e&&(gn=null)}function ph(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||qm(n)||Xg(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!=="independent"){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Rs=0,Ht=null,_e=null,Fe=null,mh=!1,So=!1,hr=!1,gh=0,lc=0,Mo=null,XT=0;function Oe(){throw Error(X(321))}function vg(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ei(e[n],t[n]))return!1;return!0}function yg(e,t,n,i,s,a){return Rs=a,Ht=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ot.H=e===null||e.memoizedState===null?yS:xS,hr=!1,a=n(i,s),hr=!1,So&&(a=Xx(t,n,i,s)),kx(e),a}function kx(e){Ot.H=_h;var t=_e!==null&&_e.next!==null;if(Rs=0,Fe=_e=Ht=null,mh=!1,lc=0,Mo=null,t)throw Error(X(300));e===null||Ve||(e=e.dependencies,e!==null&&hh(e)&&(Ve=!0))}function Xx(e,t,n,i){Ht=e;var s=0;do{if(So&&(Mo=null),lc=0,So=!1,25<=s)throw Error(X(301));if(s+=1,Fe=_e=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}Ot.H=jT,a=t(n,i)}while(So);return a}function WT(){var e=Ot.H,t=e.useState()[0];return t=typeof t.then=="function"?bc(t):t,e=e.useState()[0],(_e!==null?_e.memoizedState:null)!==e&&(Ht.flags|=1024),t}function xg(){var e=gh!==0;return gh=0,e}function Sg(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Mg(e){if(mh){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}mh=!1}Rs=0,Fe=_e=Ht=null,So=!1,lc=gh=0,Mo=null}function Tn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Fe===null?Ht.memoizedState=Fe=e:Fe=Fe.next=e,Fe}function ze(){if(_e===null){var e=Ht.alternate;e=e!==null?e.memoizedState:null}else e=_e.next;var t=Fe===null?Ht.memoizedState:Fe.next;if(t!==null)Fe=t,_e=e;else{if(e===null)throw Ht.alternate===null?Error(X(467)):Error(X(310));_e=e,e={memoizedState:_e.memoizedState,baseState:_e.baseState,baseQueue:_e.baseQueue,queue:_e.queue,next:null},Fe===null?Ht.memoizedState=Fe=e:Fe=Fe.next=e}return Fe}function Hh(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function bc(e){var t=lc;return lc+=1,Mo===null&&(Mo=[]),e=Bx(Mo,e,t),t=Ht,(Fe===null?t.memoizedState:Fe.next)===null&&(t=t.alternate,Ot.H=t===null||t.memoizedState===null?yS:xS),e}function Vh(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return bc(e);if(e.$$typeof===AE)return;if(e.$$typeof===$i)return rn(e)}throw Error(X(438,String(e)))}function bg(e){var t=null,n=Ht.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=Ht.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Hh(),Ht.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=TE;return t.index++,n}function Ds(e,t){return typeof t=="function"?t(e):t}function Xu(e){var t=ze();return Eg(t,_e,e)}function Eg(e,t,n){var i=e.queue;if(i===null)throw Error(X(311));i.lastRenderedReducer=n;var s=e.baseQueue,a=i.pending;if(a!==null){if(s!==null){var r=s.next;s.next=a.next,a.next=r}t.baseQueue=s=a,i.pending=null}if(a=e.baseState,s===null)e.memoizedState=a;else{t=s.next;var o=r=null,l=null,c=t,f=!1;do{var d=c.lane&-536870913;if(d!==c.lane?(Zt&d)===d:(Rs&d)===d){var h=c.revertLane;if(h===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),d===cr&&(f=!0);else if((Rs&h)===h){c=c.next,h===cr&&(f=!0);continue}else d={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=d,r=a):l=l.next=d,Ht.lanes|=h,Ea|=h;d=c.action,hr&&n(a,d),a=c.hasEagerState?c.eagerState:n(a,d)}else h={lane:d,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=h,r=a):l=l.next=h,Ht.lanes|=d,Ea|=d;c=c.next}while(c!==null&&c!==t);if(l===null?r=a:l.next=o,!ei(a,e.memoizedState)&&(Ve=!0,f&&(n=yo,n!==null)))throw n;e.memoizedState=a,e.baseState=r,e.baseQueue=l,i.lastRenderedState=a}return s===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Tp(e){var t=ze(),n=t.queue;if(n===null)throw Error(X(311));n.lastRenderedReducer=e;var i=n.dispatch,s=n.pending,a=t.memoizedState;if(s!==null){n.pending=null;var r=s=s.next;do a=e(a,r.action),r=r.next;while(r!==s);ei(a,t.memoizedState)||(Ve=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,i]}function Wx(e,t,n){var i=Ht,s=ze(),a=Xt;if(a){if(n===void 0)throw Error(X(407));n=n()}else n=t();var r=!ei((_e||s).memoizedState,n);if(r&&(s.memoizedState=n,Ve=!0),s=s.queue,Tg(Zx.bind(null,i,s,e),[e]),e=s.getSnapshot!==t||r||Fe!==null&&(Fe.memoizedState.tag&1)!==0,Ro(e?9:8,{destroy:void 0},Yx.bind(null,i,s,n,t),null),e){if(i.flags|=2048,xe===null)throw Error(X(349));a||(Rs&127)!==0||qx(i,t,n)}return n}function qx(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Ht.updateQueue,t===null?(t=Hh(),Ht.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Yx(e,t,n,i){t.value=n,t.getSnapshot=i,Jx(t)&&Kx(e)}function Zx(e,t,n){return n(function(){Jx(t)&&Kx(e)})}function Jx(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!ei(e,n)}catch{return!0}}function Kx(e){var t=_r(e,2);t!==null&&Bn(t,e,2)}function dm(e){var t=Tn();if(typeof e=="function"){var n=e;if(e=n(),hr){sa(!0);try{n()}finally{sa(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ds,lastRenderedState:e},t}function Qx(e,t,n,i){return e.baseState=n,Eg(e,_e,typeof i=="function"?i:Ds)}function qT(e,t,n,i,s){if(kh(e))throw Error(X(485));if(e=t.action,e!==null){var a={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){a.listeners.push(r)}};Ot.T!==null?n(!0):a.isTransition=!1,i(a),n=t.pending,n===null?(a.next=t.pending=a,jx(t,a)):(a.next=n.next,t.pending=n.next=a)}}function jx(e,t){var n=t.action,i=t.payload,s=e.state;if(t.isTransition){var a=Ot.T,r={};r.types=a!==null?a.types:null,Ot.T=r;try{var o=n(s,i),l=Ot.S;l!==null&&l(r,o),Fv(e,t,o)}catch(c){pm(e,t,c)}finally{a!==null&&r.types!==null&&(a.types=r.types),Ot.T=a}}else try{a=n(s,i),Fv(e,t,a)}catch(c){pm(e,t,c)}}function Fv(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){Hv(e,t,i)},function(i){return pm(e,t,i)}):Hv(e,t,n)}function Hv(e,t,n){t.status="fulfilled",t.value=n,$x(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,jx(e,n)))}function pm(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,$x(t),t=t.next;while(t!==i)}e.action=null}function $x(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function tS(e,t){return t}function Vv(e,t){if(Xt){var n=xe.formState;if(n!==null){t:{var i=Ht;if(Xt){if(Te){e:{for(var s=Te,a=xi;s.nodeType!==8;){if(!a){s=null;break e}if(s=Si(s.nextSibling),s===null){s=null;break e}}a=s.data,s=a==="F!"||a==="F"?s:null}if(s){Te=Si(s.nextSibling),i=s.data==="F!";break t}}Sa(i)}i=!1}i&&(t=n[0])}}return n=Tn(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:tS,lastRenderedState:t},n.queue=i,n=gS.bind(null,Ht,i),i.dispatch=n,i=dm(!1),a=Rg.bind(null,Ht,!1,i.queue),i=Tn(),s={state:t,dispatch:null,action:e,pending:null},i.queue=s,n=qT.bind(null,Ht,s,a,n),s.dispatch=n,i.memoizedState=e,[t,n,!1]}function Gv(e){var t=ze();return eS(t,_e,e)}function eS(e,t,n){if(t=Eg(e,t,tS)[0],e=Xu(Ds)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=bc(t)}catch(r){throw r===Vo?Fh:r}else i=t;t=ze();var s=t.queue,a=s.dispatch;return n!==t.memoizedState&&(Ht.flags|=2048,Ro(9,{destroy:void 0},YT.bind(null,s,n),null)),[i,a,e]}function YT(e,t){e.action=t}function kv(e){var t=ze(),n=_e;if(n!==null)return eS(t,n,e);ze(),t=t.memoizedState,n=ze();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function Ro(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=Ht.updateQueue,t===null&&(t=Hh(),Ht.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function nS(){return ze().memoizedState}function Wu(e,t,n,i){var s=Tn();Ht.flags|=e,s.memoizedState=Ro(1|t,{destroy:void 0},n,i===void 0?null:i)}function Gh(e,t,n,i){var s=ze();i=i===void 0?null:i;var a=s.memoizedState.inst;_e!==null&&i!==null&&vg(i,_e.memoizedState.deps)?s.memoizedState=Ro(t,a,n,i):(Ht.flags|=e,s.memoizedState=Ro(1|t,a,n,i))}function Xv(e,t){Wu(8390656,8,e,t)}function Tg(e,t){Gh(2048,8,e,t)}function ZT(e){Ht.flags|=4;var t=Ht.updateQueue;if(t===null)t=Hh(),Ht.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function iS(e){var t=ze().memoizedState;return ZT({ref:t,nextImpl:e}),function(){if((ie&2)!==0)throw Error(X(440));return t.impl.apply(void 0,arguments)}}function sS(e,t){return Gh(4,2,e,t)}function aS(e,t){return Gh(4,4,e,t)}function rS(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function oS(e,t,n){n=n!=null?n.concat([e]):null,Gh(4,4,rS.bind(null,t,e),n)}function Ag(){}function lS(e,t){var n=ze();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&vg(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function cS(e,t){var n=ze();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&vg(t,i[1]))return i[0];if(i=e(),hr){sa(!0);try{e()}finally{sa(!1)}}return n.memoizedState=[i,t],i}function wg(e,t,n){return n===void 0||(Rs&1073741824)!==0&&(Zt&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=eM(),Ht.lanes|=e,Ea|=e,n)}function uS(e,t,n,i){return ei(n,t)?n:Ma.current!==null?(e=wg(e,n,i),ei(e,t)||(Ve=!0),e):(Rs&106)===0||(Rs&1073741824)!==0&&(Zt&261930)===0?(Ve=!0,e.memoizedState=n):(e=eM(),Ht.lanes|=e,Ea|=e,t)}function hS(e,t,n,i,s){var a=se.p;se.p=a!==0&&8>a?a:8;var r=Ot.T,o={};o.types=r!==null?r.types:null,Ot.T=o,Rg(e,!1,t,n);try{var l=s(),c=Ot.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var f=kT(l,i);Zl(e,t,f,ti(e))}else Zl(e,t,i,ti(e))}catch(d){Zl(e,t,{then:function(){},status:"rejected",reason:d},ti())}finally{se.p=a,r!==null&&o.types!==null&&(r.types=o.types),Ot.T=r}}function JT(){}function mm(e,t,n,i){if(e.tag!==5)throw Error(X(476));var s=fS(e).queue;hS(e,s,t,er,n===null?JT:function(){return dS(e),n(i)})}function fS(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:er,baseState:er,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ds,lastRenderedState:er},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ds,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function dS(e){var t=fS(e);t.next===null&&(t=e.alternate.memoizedState),Zl(e,t.next.queue,{},ti())}function Cg(){return rn(Po)}function pS(){return ze().memoizedState}function mS(){return ze().memoizedState}function KT(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=ti();e=fa(n);var i=da(t,e,n);i!==null&&(Bn(i,t,n),Wl(i,t,n)),t={cache:fg()},e.payload=t;return}t=t.return}}function QT(e,t,n){var i=ti();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},kh(e)?_S(t,n):(n=cg(e,t,n,i),n!==null&&(Bn(n,e,i),vS(n,t,i)))}function gS(e,t,n){var i=ti();Zl(e,t,n,i)}function Zl(e,t,n,i){var s={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(kh(e))_S(t,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var r=t.lastRenderedState,o=a(r,n);if(s.hasEagerState=!0,s.eagerState=o,ei(o,r))return Bh(e,t,s,0),xe===null&&Ph(),!1}catch{}finally{}if(n=cg(e,t,s,i),n!==null)return Bn(n,e,i),vS(n,t,i),!0}return!1}function Rg(e,t,n,i){if(i={lane:2,revertLane:Hg(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},kh(e)){if(t)throw Error(X(479))}else t=cg(e,n,i,2),t!==null&&Bn(t,e,2)}function kh(e){var t=e.alternate;return e===Ht||t!==null&&t===Ht}function _S(e,t){So=mh=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function vS(e,t,n){if((n&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,nx(e,n)}}var _h={readContext:rn,use:Vh,useCallback:Oe,useContext:Oe,useEffect:Oe,useImperativeHandle:Oe,useLayoutEffect:Oe,useInsertionEffect:Oe,useMemo:Oe,useReducer:Oe,useRef:Oe,useState:Oe,useDebugValue:Oe,useDeferredValue:Oe,useTransition:Oe,useSyncExternalStore:Oe,useId:Oe,useHostTransitionStatus:Oe,useFormState:Oe,useActionState:Oe,useOptimistic:Oe,useMemoCache:Oe,useCacheRefresh:Oe,useEffectEvent:Oe},yS={readContext:rn,use:Vh,useCallback:function(e,t){return Tn().memoizedState=[e,t===void 0?null:t],e},useContext:rn,useEffect:Xv,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Wu(4194308,4,rS.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Wu(4194308,4,e,t)},useInsertionEffect:function(e,t){Wu(4,2,e,t)},useMemo:function(e,t){var n=Tn();t=t===void 0?null:t;var i=e();if(hr){sa(!0);try{e()}finally{sa(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=Tn();if(n!==void 0){var s=n(t);if(hr){sa(!0);try{n(t)}finally{sa(!1)}}}else s=t;return i.memoizedState=i.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},i.queue=e,e=e.dispatch=QT.bind(null,Ht,e),[i.memoizedState,e]},useRef:function(e){var t=Tn();return e={current:e},t.memoizedState=e},useState:function(e){e=dm(e);var t=e.queue,n=gS.bind(null,Ht,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Ag,useDeferredValue:function(e,t){var n=Tn();return wg(n,e,t)},useTransition:function(){var e=dm(!1);return e=hS.bind(null,Ht,e.queue,!0,!1),Tn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=Ht,s=Tn();if(Xt){if(n===void 0)throw Error(X(407));n=n()}else{if(n=t(),xe===null)throw Error(X(349));(Zt&127)!==0||qx(i,t,n)}s.memoizedState=n;var a={value:n,getSnapshot:t};return s.queue=a,Xv(Zx.bind(null,i,a,e),[e]),i.flags|=2048,Ro(9,{destroy:void 0},Yx.bind(null,i,a,n,t),null),n},useId:function(){var e=Tn(),t=xe.identifierPrefix;if(Xt){var n=ns,i=es;n=(i&~(1<<32-$n(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=gh++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=XT++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Cg,useFormState:Vv,useActionState:Vv,useOptimistic:function(e){var t=Tn();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Rg.bind(null,Ht,!0,n),n.dispatch=t,[e,t]},useMemoCache:bg,useCacheRefresh:function(){return Tn().memoizedState=KT.bind(null,Ht)},useEffectEvent:function(e){var t=Tn(),n={impl:e};return t.memoizedState=n,function(){if((ie&2)!==0)throw Error(X(440));return n.impl.apply(void 0,arguments)}}},xS={readContext:rn,use:Vh,useCallback:lS,useContext:rn,useEffect:Tg,useImperativeHandle:oS,useInsertionEffect:sS,useLayoutEffect:aS,useMemo:cS,useReducer:Xu,useRef:nS,useState:function(){return Xu(Ds)},useDebugValue:Ag,useDeferredValue:function(e,t){var n=ze();return uS(n,_e.memoizedState,e,t)},useTransition:function(){var e=Xu(Ds)[0],t=ze().memoizedState;return[typeof e=="boolean"?e:bc(e),t]},useSyncExternalStore:Wx,useId:pS,useHostTransitionStatus:Cg,useFormState:Gv,useActionState:Gv,useOptimistic:function(e,t){var n=ze();return Qx(n,_e,e,t)},useMemoCache:bg,useCacheRefresh:mS,useEffectEvent:iS},jT={readContext:rn,use:Vh,useCallback:lS,useContext:rn,useEffect:Tg,useImperativeHandle:oS,useInsertionEffect:sS,useLayoutEffect:aS,useMemo:cS,useReducer:Tp,useRef:nS,useState:function(){return Tp(Ds)},useDebugValue:Ag,useDeferredValue:function(e,t){var n=ze();return _e===null?wg(n,e,t):uS(n,_e.memoizedState,e,t)},useTransition:function(){var e=Tp(Ds)[0],t=ze().memoizedState;return[typeof e=="boolean"?e:bc(e),t]},useSyncExternalStore:Wx,useId:pS,useHostTransitionStatus:Cg,useFormState:kv,useActionState:kv,useOptimistic:function(e,t){var n=ze();return _e!==null?Qx(n,_e,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:bg,useCacheRefresh:mS,useEffectEvent:iS};function Ap(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:Se({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var gm={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=ti(),s=fa(i);s.payload=t,n!=null&&(s.callback=n),t=da(e,s,i),t!==null&&(Bn(t,e,i),Wl(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=ti(),s=fa(i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=da(e,s,i),t!==null&&(Bn(t,e,i),Wl(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ti(),i=fa(n);i.tag=2,t!=null&&(i.callback=t),t=da(e,i,n),t!==null&&(Bn(t,e,n),Wl(t,e,n))}};function Wv(e,t,n,i,s,a,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,a,r):t.prototype&&t.prototype.isPureReactComponent?!ic(n,i)||!ic(s,a):!0}function qv(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&gm.enqueueReplaceState(t,t.state,null)}function fr(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=Se({},n));for(var s in e)n[s]===void 0&&(n[s]=e[s])}return n}function SS(e){oh(e)}function MS(e){console.error(e)}function bS(e){oh(e)}function vh(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function Yv(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function _m(e,t,n){return n=fa(n),n.tag=3,n.payload={element:null},n.callback=function(){vh(e,t)},n}function ES(e){return e=fa(e),e.tag=3,e}function TS(e,t,n,i){var s=n.type.getDerivedStateFromError;if(typeof s=="function"){var a=i.value;e.payload=function(){return s(a)},e.callback=function(){Yv(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){Yv(t,n,i),typeof s!="function"&&(ga===null?ga=new Set([this]):ga.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function $T(e,t,n,i,s){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&or(t,n,s,!0),n=un.current,n!==null){switch(n.tag){case 31:case 13:case 19:return gn===null?Ah():n.alternate===null&&Ie===0&&(Ie=3),n.flags&=-257,n.flags|=65536,n.lanes=s,i===fh?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),Lp(e,i,s)),!1;case 22:return n.flags|=65536,i===fh?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),Lp(e,i,s)),!1}throw Error(X(435,n.tag))}return Lp(e,i,s),Ah(),!1}if(Xt)return t=un.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,i!==am&&(e=Error(X(422),{cause:i}),ac(yi(e,n)))):(i!==am&&(t=Error(X(423),{cause:i}),ac(yi(t,n))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,i=yi(i,n),s=_m(e.stateNode,i,s),Ep(e,s),Ie!==4&&(Ie=2)),!1;var a=Error(X(520),{cause:i});if(a=yi(a,n),jl===null?jl=[a]:jl.push(a),Ie!==4&&(Ie=2),t===null)return!0;i=yi(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=s&-s,n.lanes|=e,e=_m(n.stateNode,i,e),Ep(n,e),!1;case 1:if(t=n.type,a=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||a!==null&&typeof a.componentDidCatch=="function"&&(ga===null||!ga.has(a))))return n.flags|=65536,s&=-s,n.lanes|=s,s=ES(s),TS(s,e,n,i),Ep(n,s),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Dg=Error(X(461)),Ve=!1;function We(e,t,n,i){t.child=e===null?Fx(t,null,n,i):ur(t,e.child,n,i)}function Zv(e,t,n,i,s){n=n.render;var a=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return lr(t),i=yg(e,t,n,r,a,s),o=xg(),e!==null&&!Ve?(Sg(e,t,s),Us(e,t,s)):(Xt&&o&&zh(t),t.flags|=1,We(e,t,i,s),t.child)}function Jv(e,t,n,i,s){if(e===null){var a=n.type;return typeof a=="function"&&!ug(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,AS(e,t,a,i,s)):(e=Vu(n.type,null,i,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Ng(e,s)){var r=a.memoizedProps;if(n=n.compare,n=n!==null?n:ic,n(r,i)&&e.ref===t.ref)return Us(e,t,s)}return t.flags|=1,e=Ts(a,i),e.ref=t.ref,e.return=t,t.child=e}function AS(e,t,n,i,s){if(e!==null){var a=e.memoizedProps;if(ic(a,i)&&e.ref===t.ref)if(Ve=!1,t.pendingProps=i=a,Ng(e,s))(e.flags&131072)!==0&&(Ve=!0);else return t.lanes=e.lanes,Us(e,t,s)}return vm(e,t,n,i,s)}function wS(e,t,n,i){var s=i.children,a=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(a=a!==null?a.baseLanes|n:n,e!==null){for(i=t.child=e.child,s=0;i!==null;)s=s|i.lanes|i.childLanes,i=i.sibling;i=s&~a}else i=0,t.child=null;return Kv(e,t,a,n,i)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&ku(t,a!==null?a.cachePool:null),a!==null?zv(t,a):hm(),Gx(t);else return i=t.lanes=536870912,Kv(e,t,a!==null?a.baseLanes|n:n,n,i)}else a!==null?(ku(t,a.cachePool),zv(t,a),ma(),t.memoizedState=null):(e!==null&&ku(t,null),hm(),ma());return We(e,t,s,n),t.child}function Jl(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Kv(e,t,n,i,s){var a=dg();return a=a===null?null:{parent:He._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&ku(t,null),hm(),Gx(t),e!==null&&or(e,t,i,!0),t.childLanes=s,null}function qu(e,t){return t=Xh({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Qv(e,t,n){return ur(t,e.child,null,n),e=qu(t,t.pendingProps),e.flags|=2,Zn(t),t.memoizedState=null,e}function tA(e,t,n){var i=t.pendingProps,s=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Xt){if(i.mode==="hidden")return e=qu(t,i),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Jl(null,e);if(fm(t),(e=Te)?(e=wM(e,xi),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:xa!==null?{id:es,overflow:ns}:null,retryLane:536870912,hydrationErrors:null},n=Nx(e),n.return=t,t.child=n,tn=t,Te=null)):e=null,e===null)throw Sa(t);return t.lanes=536870912,null}return qu(t,i)}var a=e.memoizedState;if(a!==null){var r=a.dehydrated;if(fm(t),s)if(t.flags&256)t.flags&=-257,t=Qv(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(X(558));else if(Ve||or(e,t,n,!1),s=(n&e.childLanes)!==0,Ve||s){if(Ma.current===null){if(i=xe,i!==null&&(r=ix(i,n),r!==0&&r!==a.retryLane))throw a.retryLane=r,_r(e,r),Bn(i,e,r),Dg;Ah()}t=Qv(e,t,n)}else e=a.treeContext,Te=Si(r.nextSibling),tn=t,Xt=!0,ha=null,xi=!1,e!==null&&Ox(t,e),t=qu(t,i),t.flags|=134221824;return t}return e=Ts(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function to(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(X(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function vm(e,t,n,i,s){return lr(t),n=yg(e,t,n,i,void 0,s),i=xg(),e!==null&&!Ve?(Sg(e,t,s),Us(e,t,s)):(Xt&&i&&zh(t),t.flags|=1,We(e,t,n,s),t.child)}function jv(e,t,n,i,s,a){return lr(t),t.updateQueue=null,n=Xx(t,i,n,s),kx(e),i=xg(),e!==null&&!Ve?(Sg(e,t,a),Us(e,t,a)):(Xt&&i&&zh(t),t.flags|=1,We(e,t,n,a),t.child)}function $v(e,t,n,i,s){if(lr(t),t.stateNode===null){var a=ho,r=n.contextType;typeof r=="object"&&r!==null&&(a=rn(r)),a=new n(i,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=gm,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=i,a.state=t.memoizedState,a.refs={},mg(t),r=n.contextType,a.context=typeof r=="object"&&r!==null?rn(r):ho,a.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Ap(t,n,r,i),a.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(r=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),r!==a.state&&gm.enqueueReplaceState(a,a.state,null),Yl(t,i,a,s),ql(),a.state=t.memoizedState),typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){a=t.stateNode;var o=t.memoizedProps,l=fr(n,o);a.props=l;var c=a.context,f=n.contextType;r=ho,typeof f=="object"&&f!==null&&(r=rn(f));var d=n.getDerivedStateFromProps;f=typeof d=="function"||typeof a.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,f||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o||c!==r)&&qv(t,a,i,r),na=!1;var h=t.memoizedState;a.state=h,Yl(t,i,a,s),ql(),c=t.memoizedState,o||h!==c||na?(typeof d=="function"&&(Ap(t,n,d,i),c=t.memoizedState),(l=na||Wv(t,n,l,i,h,c,r))?(f||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),a.props=i,a.state=c,a.context=r,i=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{a=t.stateNode,cm(e,t),r=t.memoizedProps,f=fr(n,r),a.props=f,d=t.pendingProps,h=a.context,c=n.contextType,l=ho,typeof c=="object"&&c!==null&&(l=rn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(r!==d||h!==l)&&qv(t,a,i,l),na=!1,h=t.memoizedState,a.state=h,Yl(t,i,a,s),ql();var p=t.memoizedState;r!==d||h!==p||na||e!==null&&e.dependencies!==null&&hh(e.dependencies)?(typeof o=="function"&&(Ap(t,n,o,i),p=t.memoizedState),(f=na||Wv(t,n,f,i,h,p,l)||e!==null&&e.dependencies!==null&&hh(e.dependencies))?(c||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,p,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,p,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=p),a.props=i,a.state=p,a.context=l,i=f):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),i=!1)}return a=i,to(e,t),i=(t.flags&128)!==0,a||i?(a=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:a.render(),t.flags|=1,e!==null&&i?(t.child=ur(t,e.child,null,s),t.child=ur(t,null,n,s)):We(e,t,n,s),t.memoizedState=a.state,e=t.child):e=Us(e,t,s),e}function ty(e,t,n,i){return rr(),t.flags|=256,We(e,t,n,i),t.child}var ym={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function xm(e){return{baseLanes:e,cachePool:Px()}}function Sm(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=Kn),e}function CS(e,t,n){var i=t.pendingProps,s=!1,a=(t.flags&128)!==0,r;if((r=a)||(r=e!==null&&e.memoizedState===null?!1:(ln.current&2)!==0),r&&(s=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(Xt){if(s?pa(t):ma(),(e=Te)?(e=wM(e,xi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:xa!==null?{id:es,overflow:ns}:null,retryLane:536870912,hydrationErrors:null},n=Nx(e),n.return=t,t.child=n,tn=t,Te=null)):e=null,e===null)throw Sa(t);return Xg(e)?t.lanes=32:t.lanes=536870912,null}return a=i.children,i=i.fallback,s?(ma(),s=t.mode,a=Xh({mode:"hidden",children:a},s),i=nr(i,s,n,null),a.return=t,i.return=t,a.sibling=i,t.child=a,i=t.child,i.memoizedState=xm(n),i.childLanes=Sm(e,r,n),t.memoizedState=ym,Jl(null,i)):(pa(t),Ug(t,a))}var o=e.memoizedState;if(o!==null){var l=o.dehydrated;if(l!==null)return eA(e,t,a,r,i,l,o,n)}return s?(ma(),s=i.fallback,a=t.mode,o=e.child,l=o.sibling,i=Ts(o,{mode:"hidden",children:i.children}),i.subtreeFlags=o.subtreeFlags&1206910976,l!==null?s=Ts(l,s):(s=nr(s,a,n,null),s.flags|=2),s.return=t,i.return=t,i.sibling=s,t.child=i,Jl(null,i),i=t.child,s=e.child.memoizedState,s===null?s=xm(n):(a=s.cachePool,a!==null?(o=He._currentValue,a=a.parent!==o?{parent:o,pool:o}:a):a=Px(),s={baseLanes:s.baseLanes|n,cachePool:a}),i.memoizedState=s,i.childLanes=Sm(e,r,n),t.memoizedState=ym,Jl(e.child,i)):(pa(t),n=e.child,e=n.sibling,n=Ts(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function Ug(e,t){return t=Xh({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Xh(e,t){return e=Pn(22,e,null,t),e.lanes=0,e}function wu(e,t,n){return ur(t,e.child,null,n),e=Ug(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function eA(e,t,n,i,s,a,r,o){if(n)return t.flags&256?(pa(t),t.flags&=-257,wu(e,t,o)):t.memoizedState!==null?(ma(),t.child=e.child,t.flags|=128,null):(ma(),a=s.fallback,r=t.mode,s=Xh({mode:"visible",children:s.children},r),a=nr(a,r,o,null),a.flags|=2,s.return=t,a.return=t,s.sibling=a,t.child=s,ur(t,e.child,null,o),s=t.child,s.memoizedState=xm(o),s.childLanes=Sm(e,i,o),t.memoizedState=ym,Jl(null,s));if(pa(t),Xg(a)){if(i=a.nextSibling&&a.nextSibling.dataset,i)var l=i.dgst;return i=l,i!==""&&(s=Error(X(419)),s.stack="",s.digest=i,ac({value:s,source:null,stack:null})),wu(e,t,o)}if(Ve||or(e,t,o,!1),i=(o&e.childLanes)!==0,Ve||i){if(Ma.current!==null)return wu(e,t,o);if(i=xe,i!==null&&(s=ix(i,o),s!==0&&s!==r.retryLane))throw r.retryLane=s,_r(e,s),Bn(i,e,s),Dg;return qm(a)||Ah(),wu(e,t,o)}return qm(a)?(t.flags|=192,t.child=e.child,null):(e=r.treeContext,Te=Si(a.nextSibling),tn=t,Xt=!0,ha=null,xi=!1,e!==null&&Ox(t,e),t=Ug(t,s.children),t.flags|=134221824,t)}function ey(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),Gu(e.return,t,n)}function ny(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&ph(n)===null&&(t=e),e=e.sibling}return t}function Cu(e,t,n,i,s,a){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:s,treeForkCount:a}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=s,r.treeForkCount=a)}function wp(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function Mm(e,t,n){var i=t.pendingProps,s=i.revealOrder,a=i.tail;i=i.children;var r=ln.current;if(t.flags&128)return oc(t,r),null;var o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,oc(t,r),s==="backwards"&&e!==null?(wp(e),We(e,t,i,n),wp(e)):We(e,t,i,n),i=Xt?sc:0,!o&&e!==null&&(e.flags&128)!==0)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ey(e,n,t);else if(e.tag===19)ey(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(s){case"backwards":n=ny(t.child),n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null,wp(t)),Cu(t,!0,s,null,a,i);break;case"unstable_legacy-backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&ph(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Cu(t,!0,n,null,a,i);break;case"together":Cu(t,!1,null,null,void 0,i);break;case"independent":t.memoizedState=null;break;default:n=ny(t.child),n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Cu(t,!1,s,n,a,i)}return t.child}function iy(e,t,n){var i=t.pendingProps;return ra(t,t.type,i.value),We(e,t,i.children,n),t.child}function Us(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ea|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(or(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(X(153));if(t.child!==null){for(e=t.child,n=Ts(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ts(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Ng(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&hh(e)))}function nA(e,t,n){switch(t.tag){case 3:ih(t,t.stateNode.containerInfo),ra(t,He,e.memoizedState.cache),rr();break;case 27:case 5:Jp(t);break;case 4:ih(t,t.stateNode.containerInfo);break;case 10:ra(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,fm(t),null;break;case 13:var i=t.memoizedState;if(i!==null){if(i.dehydrated!==null)return pa(t),t.flags|=128,null;i=or(e,t,n,!1);var s=t.child.childLanes;return i||(n&s)!==0?CS(e,t,n):(pa(t),e=Us(e,t,n),e!==null?e.sibling:null)}pa(t);break;case 19:if(t.flags&128)return Mm(e,t,n);if(s=(e.flags&128)!==0,i=(n&t.childLanes)!==0,i||(or(e,t,n,!1),i=(n&t.childLanes)!==0),s){if(i)return Mm(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),oc(t,ln.current),i)break;return null;case 22:return t.lanes=0,wS(e,t,n,t.pendingProps);case 24:ra(t,He,e.memoizedState.cache)}return Us(e,t,n)}function RS(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Ve=!0;else{if(!Ng(e,n)&&(t.flags&128)===0)return Ve=!1,nA(e,t,n);Ve=(e.flags&131072)!==0}else Ve=!1,Xt&&(t.flags&1048576)!==0&&Lx(t,sc,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=Qa(t.elementType),t.type=e,typeof e=="function")ug(e)?(i=fr(e,i),t.tag=1,t=$v(null,t,e,i,n)):(t.tag=0,t=vm(null,t,e,i,n));else{if(e!=null){var s=e.$$typeof;if(s===Qm){t.tag=11,t=Zv(null,t,e,i,n);break t}else if(s===jm){t.tag=14,t=Jv(null,t,e,i,n);break t}else if(s===$i){t.tag=10,t.type=e,t=iy(null,t,n);break t}}throw t=Yp(e)||e,Error(X(306,t,""))}}return t;case 0:return vm(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,s=fr(i,t.pendingProps),$v(e,t,i,s,n);case 3:t:{if(ih(t,t.stateNode.containerInfo),e===null)throw Error(X(387));i=t.pendingProps;var a=t.memoizedState;s=a.element,cm(e,t),Yl(t,i,null,n);var r=t.memoizedState;if(i=r.cache,ra(t,He,i),i!==a.cache&&om(t,[He],n,!0),ql(),i=r.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=ty(e,t,i,n);break t}else if(i!==s){s=yi(Error(X(424)),t),ac(s),t=ty(e,t,i,n);break t}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Te=Si(e.firstChild),tn=t,Xt=!0,ha=null,xi=!0,n=Fx(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(rr(),i===s){t=Us(e,t,n);break t}We(e,t,i,n)}t=t.child}return t;case 26:return to(e,t),e===null?(n=Dy(t.type,null,t.pendingProps,null))?t.memoizedState=n:Xt||(t.stateNode=vM(t.type,t.pendingProps,ua.current,t)):t.memoizedState=Dy(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Jp(t),e===null&&Xt&&(i=t.stateNode=CM(t.type,t.pendingProps,ua.current),tn=t,xi=!0,s=Te,Aa(t.type)?(Ym=s,Te=Si(i.firstChild)):Te=s),We(e,t,t.pendingProps.children,n),to(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Xt&&((s=i=Te)&&(i=ZA(i,t.type,t.pendingProps,xi),i!==null?(t.stateNode=i,tn=t,Te=Si(i.firstChild),xi=!1,s=!0):s=!1),s||Sa(t)),Jp(t),s=t.type,a=t.pendingProps,r=e!==null?e.memoizedProps:null,i=a.children,km(s,a)?i=null:r!==null&&km(s,r)&&(t.flags|=32),t.memoizedState!==null&&(s=yg(e,t,WT,null,null,n),Po._currentValue=s),to(e,t),We(e,t,i,n),t.child;case 6:return e===null&&Xt&&((e=n=Te)&&(n=JA(n,t.pendingProps,xi),n!==null?(t.stateNode=n,tn=t,Te=null,e=!0):e=!1),e||Sa(t)),null;case 13:return CS(e,t,n);case 4:return ih(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=ur(t,null,i,n):We(e,t,i,n),t.child;case 11:return Zv(e,t,t.type,t.pendingProps,n);case 7:return i=t.pendingProps,to(e,t),We(e,t,i,n),t.child;case 8:return We(e,t,t.pendingProps.children,n),t.child;case 12:return We(e,t,t.pendingProps.children,n),t.child;case 10:return iy(e,t,n);case 9:return s=t.type._context,i=t.pendingProps.children,lr(t),s=rn(s),i=i(s),t.flags|=1,We(e,t,i,n),t.child;case 14:return Jv(e,t,t.type,t.pendingProps,n);case 15:return AS(e,t,t.type,t.pendingProps,n);case 19:return Mm(e,t,n);case 31:return tA(e,t,n);case 22:return wS(e,t,n,t.pendingProps);case 24:return lr(t),i=rn(He),e===null?(s=dg(),s===null&&(s=xe,a=fg(),s.pooledCache=a,a.refCount++,a!==null&&(s.pooledCacheLanes|=n),s=a),t.memoizedState={parent:i,cache:s},mg(t),ra(t,He,s)):((e.lanes&n)!==0&&(cm(e,t),Yl(t,null,null,n),ql()),s=e.memoizedState,a=t.memoizedState,s.parent!==i?(s={parent:i,cache:i},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),ra(t,He,i)):(i=a.cache,ra(t,He,i),i!==s.cache&&om(t,[He],n,!0))),We(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),i=t.pendingProps,i.name!=null&&i.name!=="auto"?t.flags|=e===null?18882560:18874368:Xt&&zh(t),e!==null&&e.memoizedProps.name!==i.name?t.flags|=4194816:to(e,t),We(e,t,i.children,n),t.child;case 29:throw t.pendingProps}throw Error(X(156,t.tag))}function Ms(e){e.flags|=4}function Cp(e,t,n,i,s){var a;if((a=(e.mode&32)!==0)&&(a=n===null?Ly(t,i):Ly(t,i)&&(i.src!==n.src||i.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(s&335544128)===s)if(e.stateNode.complete)e.flags|=8192;else if(sM())e.flags|=8192;else throw sr=fh,pg}else e.flags&=-16777217}function sy(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!NM(t))if(sM())e.flags|=8192;else throw sr=fh,pg}function Ru(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?tx():536870912,e.lanes|=t,Do|=t)}function Nl(e,t){if(!Xt)switch(e.tailMode){case"visible":break;case"collapsed":for(var n=e.tail,i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function Ee(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags&1206910976,i|=s.flags&1206910976,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags,i|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function iA(e,t,n){var i=t.pendingProps;switch(hg(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ee(t),null;case 1:return Ee(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),As(He),Ao(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(jr(t)?Ms(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,bp())),Ee(t),null;case 26:var s=t.type,a=t.memoizedState;return e===null?(Ms(t),a!==null?(Ee(t),sy(t,a)):(Ee(t),Cp(t,s,null,i,n))):a?a!==e.memoizedState?(Ms(t),Ee(t),sy(t,a)):(Ee(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&Ms(t),Ee(t),Cp(t,s,e,i,n)),null;case 27:if(sh(t),n=ua.current,s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Ms(t);else{if(!i){if(t.stateNode===null)throw Error(X(166));return Ee(t),t.subtreeFlags&=-33554433,null}e=is.current,jr(t)?Uv(t,e):(e=CM(s,i,n),t.stateNode=e,Ms(t))}return Ee(t),t.subtreeFlags&=-33554433,null;case 5:if(sh(t),s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Ms(t);else{if(!i){if(t.stateNode===null)throw Error(X(166));return Ee(t),t.subtreeFlags&=-33554433,null}if(a=is.current,jr(t))Uv(t,a);else{var r=hc(ua.current);switch(a){case 1:a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case 2:a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;default:switch(s){case"svg":a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case"math":a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;case"script":a=r.createElement("div"),a.innerHTML="<script><\/script>",a=a.removeChild(a.firstChild);break;case"select":a=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?a.multiple=!0:i.size&&(a.size=i.size);break;default:a=typeof i.is=="string"?r.createElement(s,{is:i.is}):r.createElement(s)}}a[an]=t,a[Fn]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)a.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=a;t:switch(cn(a,s,i),s){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&Ms(t)}}return Ee(t),t.subtreeFlags&=-33554433,Cp(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Ms(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(X(166));if(e=ua.current,jr(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,s=tn,s!==null)switch(s.tag){case 27:case 5:i=s.memoizedProps}e[an]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||gM(e.nodeValue,n)),e||Sa(t,!0)}else e=hc(e).createTextNode(i),e[an]=t,t.stateNode=e}return Ee(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=jr(t),n!==null){if(e===null){if(!i)throw Error(X(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(X(557));e[an]=t}else rr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ee(t),e=!1}else n=bp(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Zn(t),t):(Zn(t),null);if((t.flags&128)!==0)throw Error(X(558))}return Ee(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=jr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!s)throw Error(X(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(X(317));s[an]=t}else rr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ee(t),s=!1}else s=bp(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),s=!0;if(!s)return t.flags&256?(Zn(t),t):(Zn(t),null)}return Zn(t),(t.flags&128)!==0?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,s=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(s=i.alternate.memoizedState.cachePool.pool),a=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(a=i.memoizedState.cachePool.pool),a!==s&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Ru(t,t.updateQueue),Ee(t),null);case 4:return Ao(),e===null&&Vg(t.stateNode.containerInfo),t.flags|=67108864,Ee(t),null;case 10:return As(t.type),Ee(t),null;case 19:if(_g(t),i=t.memoizedState,i===null)return Ee(t),null;if(s=(t.flags&128)!==0,a=i.rendering,a===null)if(s)Nl(i,!1);else{if(Ie!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(a=ph(e),a!==null){for(t.flags|=128,Nl(i,!1),e=a.updateQueue,t.updateQueue=e,Ru(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Ux(n,e),n=n.sibling;return oc(t,ln.current&1|2),Xt&&bs(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&Qn()>Eh&&(t.flags|=128,s=!0,Nl(i,!1),t.lanes=4194304)}else{if(!s)if(e=ph(a),e!==null){if(t.flags|=128,s=!0,e=e.updateQueue,t.updateQueue=e,Ru(t,e),Nl(i,!0),i.tail===null&&i.tailMode!=="collapsed"&&i.tailMode!=="visible"&&!a.alternate&&!Xt)return Ee(t),null}else 2*Qn()-i.renderingStartTime>Eh&&n!==536870912&&(t.flags|=128,s=!0,Nl(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(e=i.last,e!==null?e.sibling=a:t.child=a,i.last=a)}if(i.tail!==null){e=i.tail;t:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break t}n=n.sibling}n=!0}return i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Qn(),e.sibling=null,a=ln.current,a=s?a&1|2:a&1,i.tailMode==="visible"||i.tailMode==="collapsed"||!n||Xt?oc(t,a):(n=a,Ae(un,t),Ae(ln,n),gn===null&&(gn=t)),Xt&&bs(t,i.treeForkCount),e}return Ee(t),null;case 22:case 23:return Zn(t),gg(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(n&536870912)!==0&&(t.flags&128)===0&&(Ee(t),t.subtreeFlags&6&&(t.flags|=8192)):Ee(t),n=t.updateQueue,n!==null&&Ru(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&on(ir),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),As(He),Ee(t),null;case 25:return null;case 30:return t.flags|=33554432,Ee(t),null}throw Error(X(156,t.tag))}function sA(e,t){switch(hg(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return As(He),Ao(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return sh(t),null;case 31:if(t.memoizedState!==null){if(Zn(t),t.alternate===null)throw Error(X(340));rr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Zn(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(X(340));rr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return _g(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Ao(),null;case 10:return As(t.type),null;case 22:case 23:return Zn(t),gg(),e!==null&&on(ir),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return As(He),null;case 25:return null;default:return null}}function DS(e,t){switch(hg(t),t.tag){case 3:As(He),Ao();break;case 26:case 27:case 5:sh(t);break;case 4:Ao();break;case 31:t.memoizedState!==null&&Zn(t);break;case 13:Zn(t);break;case 19:_g(t);break;case 10:As(t.type);break;case 22:case 23:Zn(t),gg(),e!==null&&on(ir);break;case 24:As(He)}}function Ec(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var s=i.next;n=s;do{if((n.tag&e)===e){i=void 0;var a=n.create,r=n.inst;i=a(),r.destroy=i}n=n.next}while(n!==s)}}catch(o){fe(t,t.return,o)}}function ba(e,t,n){try{var i=t.updateQueue,s=i!==null?i.lastEffect:null;if(s!==null){var a=s.next;i=a;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,s=t;var l=n,c=o;try{c()}catch(f){fe(s,l,f)}}}i=i.next}while(i!==a)}}catch(f){fe(t,t.return,f)}}function US(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Vx(t,n)}catch(i){fe(e,e.return,i)}}}function NS(e,t,n){n.props=fr(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){fe(e,t,i)}}function Qi(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:var s=e.stateNode,a=Cs(e.memoizedProps,s);(s.ref===null||s.ref.name!==a)&&(s.ref=MM(a)),i=s.ref;break;case 7:if(e.stateNode===null){var r=new ni(e);zn(e.child,!1,qA,r,void 0,void 0),e.stateNode=r}i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(o){fe(e,t,o)}}function sn(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(s){fe(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(s){fe(e,t,s)}else n.current=null}function yh(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)AM(e.stateNode,t[n])}function ay(e){for(var t=e.return;t!==null&&(Og(t)&&AM(e.stateNode,t.stateNode),!Lg(t));)t=t.return}function Kl(e){for(var t=e.return;t!==null&&(Og(t)&&YA(e.stateNode,t.stateNode),!Lg(t));)t=t.return}function Lg(e){return e.tag===5||e.tag===3||e.tag===27}function Og(e){return e&&e.tag===7&&e.stateNode!==null}function bm(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(s){fe(e,e.return,s)}}function Rp(e,t,n){try{var i=e.stateNode;CA(i,e.type,n,t),i[Fn]=t}catch(s){fe(e,e.return,s)}}function LS(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Aa(e.type)||e.tag===4}function Dp(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||LS(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Aa(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Em(e,t,n,i){var s=e.tag;if(s===5||s===6)s=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(s,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(s),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ts)),yh(e,i),ne=!0;else if(s!==4&&(s===27&&(yh(e,i),i=null,Aa(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Em(e,t,n,i),e=e.sibling;e!==null;)Em(e,t,n,i),e=e.sibling}function xh(e,t,n,i){var s=e.tag;if(s===5||s===6)s=e.stateNode,t?n.insertBefore(s,t):n.appendChild(s),yh(e,i),ne=!0;else if(s!==4&&(s===27&&(yh(e,i),i=null,Aa(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(xh(e,t,n,i),e=e.sibling;e!==null;)xh(e,t,n,i),e=e.sibling}function OS(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,s=t.attributes;s.length;)t.removeAttributeNode(s[0]);cn(t,i,n),t[an]=e,t[Fn]=n}catch(a){fe(e,e.return,a)}}var Sh=!1,Jn=null;function ry(e){(e.tag===30||(e.subtreeFlags&33554432)!==0)&&(Sh=!0)}var ji=null;function oy(){var e=ji;return ji=null,e}var In=0;function Go(e,t,n,i,s){return In=0,IS(e.child,t,n,i,s)}function IS(e,t,n,i,s){for(var a=!1;e!==null;){if(e.tag===5){var r=e.stateNode;if(i!==null){var o=Xm(r);i.push(o),o.view&&(a=!0)}else a||Xm(r).view&&(a=!0);Sh=!0,yM(r,In===0?t:t+"_"+In,n),In++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&s||IS(e.child,t,n,i,s)&&(a=!0));e=e.sibling}return a}function as(e,t){for(;e!==null;)e.tag===5?xM(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||as(e.child,t)),e=e.sibling}function Yu(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Yu(e),e.tag===30&&(e.flags&18874368)!==0&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name==="auto")throw Error(X(544));var n=t.name;t=Os(t.default,t.share),t!=="none"&&(Go(e,n,t,null,!1)||as(e.child,!1))}e=e.sibling}}function Tm(e,t){if(e.tag===30){var n=e.stateNode,i=e.memoizedProps,s=Cs(i,n),a=Os(i.default,n.paired?i.share:i.enter);a!=="none"?Go(e,s,a,null,!1)?(Yu(e),n.paired||t||Uo(e,i.onEnter)):as(e.child,!1):Yu(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Tm(e,t),e=e.sibling;else Yu(e)}function Am(e){if(Jn!==null&&Jn.size!==0){var t=Jn;if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var n=e.memoizedProps,i=n.name;if(i!=null&&i!=="auto"){var s=t.get(i);if(s!==void 0){var a=Os(n.default,n.share);if(a!=="none"&&(Go(e,i,a,null,!1)?(a=e.stateNode,s.paired=a,a.paired=s,Uo(e,n.onShare)):as(e.child,!1)),t.delete(i),t.size===0)break}}}Am(e)}e=e.sibling}}}function wm(e){if(e.tag===30){var t=e.memoizedProps,n=Cs(t,e.stateNode),i=Jn!==null?Jn.get(n):void 0,s=Os(t.default,i!==void 0?t.share:t.exit);s!=="none"&&(Go(e,n,s,null,!1)?i!==void 0?(s=e.stateNode,i.paired=s,s.paired=i,Jn.delete(n),Uo(e,t.onShare)):Uo(e,t.onExit):as(e.child,!1)),Jn!==null&&Am(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)wm(e),e=e.sibling;else Jn!==null&&Am(e)}function PS(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=Cs(t,e.stateNode);t=Os(t.default,t.update),e.flags&=-5,t!=="none"&&Go(e,n,t,e.memoizedState=[],!1)}else(e.subtreeFlags&33554432)!==0&&PS(e);e=e.sibling}}function Cm(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var t=e.stateNode;t.paired!==null&&(t.paired=null,as(e.child,!1))}Cm(e)}e=e.sibling}}function Zu(e){if(e.tag===30)e.stateNode.paired=null,as(e.child,!1),Cm(e);else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Zu(e),e=e.sibling;else Cm(e)}function BS(e){for(e=e.child;e!==null;)e.tag===30?as(e.child,!1):(e.subtreeFlags&33554432)!==0&&BS(e),e=e.sibling}function Ig(e,t,n,i,s,a,r){for(var o=!1;t!==null;){if(t.tag===5){var l=t.stateNode;if(a!==null&&In<a.length){var c=a[In],f=Xm(l);(c.view||f.view)&&(o=!0);var d;if(d=(e.flags&4)===0)if(f.clip)d=!0;else{d=c.rect;var h=f.rect;d=d.y!==h.y||d.x!==h.x||d.height!==h.height||d.width!==h.width}d&&(e.flags|=4),f.abs?f=!c.abs:(c=c.rect,f=f.rect,f=c.height!==f.height||c.width!==f.width),f&&(e.flags|=32)}else e.flags|=32;(e.flags&4)!==0&&yM(l,In===0?n:n+"_"+In,s),o&&(e.flags&4)!==0||(ji===null&&(ji=[]),ji.push(l,In===0?i:i+"_"+In,t.memoizedProps)),In++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&r?e.flags|=t.flags&32:Ig(e,t.child,n,i,s,a,r)&&(o=!0));t=t.sibling}return o}function zS(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,i=e.stateNode,s=Cs(n,i),a=Os(n.default,n.update);if(t){i=i.clones;var r=i===null?null:i.map(OA)}else r=e.memoizedState,e.memoizedState=null;i=e;var o=e.child;In=0,s=Ig(i,o,s,s,a,r,!1),(e.flags&4)!==0&&s&&(t||Uo(e,n.onUpdate))}else(e.subtreeFlags&33554432)!==0&&zS(e,t);e=e.sibling}}var Qe=!1,oe=!1,Zi=!1,Up=!1,ly=typeof WeakSet=="function"?WeakSet:Set,je=null,Ji=!1,Hl=!1,Mh=!1,Rm=!1;function aA(e,t,n){if(e=e.containerInfo,Vm=Bo,e=bx(e),og(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else t:{i=(i=e.ownerDocument)&&i.defaultView||window;var s=i.getSelection&&i.getSelection();if(s&&s.rangeCount!==0){i=s.anchorNode;var a=s.anchorOffset,r=s.focusNode;s=s.focusOffset;try{i.nodeType,r.nodeType}catch{i=null;break t}var o=0,l=-1,c=-1,f=0,d=0,h=e,p=null;e:for(;;){for(var _;h!==i||a!==0&&h.nodeType!==3||(l=o+a),h!==r||s!==0&&h.nodeType!==3||(c=o+s),h.nodeType===3&&(o+=h.nodeValue.length),(_=h.firstChild)!==null;)p=h,h=_;for(;;){if(h===e)break e;if(p===i&&++f===a&&(l=o),p===r&&++d===s&&(c=o),(_=h.nextSibling)!==null)break;h=p,p=h.parentNode}h=_}i=l===-1||c===-1?null:{start:l,end:c}}else i=null}i=i||{start:0,end:0}}else i=null;for(Gm={focusedElem:e,selectionRange:i},Bo=!1,n=(n&335544064)===n,je=t,t=n?9270:1024;je!==null;){if(e=je,n&&(i=e.deletions,i!==null))for(a=0;a<i.length;a++)n&&wm(i[a]);if(e.alternate===null&&(e.flags&2)!==0)n&&ry(e),Du(n);else{if(e.tag===22){if(i=e.alternate,e.memoizedState!==null){i!==null&&i.memoizedState===null&&n&&wm(i),Du(n);continue}else if(i!==null&&i.memoizedState!==null){n&&ry(e),Du(n);continue}}i=e.child,(e.subtreeFlags&t)!==0&&i!==null?(i.return=e,je=i):(n&&PS(e),Du(n))}}Jn=null}function Du(e){for(;je!==null;){var t=je,n=e,i=t.alternate,s=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if((s&1024)!==0&&i!==null){n=void 0,s=i.memoizedProps,i=i.memoizedState;var a=t.stateNode;try{var r=fr(t.type,s);n=a.getSnapshotBeforeUpdate(r,i),a.__reactInternalSnapshotBeforeUpdate=n}catch(o){fe(t,t.return,o)}}break;case 3:if((s&1024)!==0){if(i=t.stateNode.containerInfo,n=i.nodeType,n===9)Wm(i);else if(n===1)switch(i.nodeName){case"HEAD":case"HTML":case"BODY":Wm(i);break;default:i.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&i!==null&&(n=Cs(i.memoizedProps,i.stateNode),s=t.memoizedProps,s=Os(s.default,s.update),s!=="none"&&Go(i,n,s,i.memoizedState=[],!0));break;default:if((s&1024)!==0)throw Error(X(163))}if(i=t.sibling,i!==null){i.return=t.return,je=i;break}je=t.return}}function FS(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:Ki(e,n),i&4&&Ec(5,n);break;case 1:if(Ki(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){fe(n,n.return,r)}else{var s=fr(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){fe(n,n.return,r)}}i&64&&US(n),i&512&&Qi(n,n.return);break;case 3:if(Ki(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Vx(e,t)}catch(r){fe(n,n.return,r)}}break;case 27:t===null&&i&4&&OS(n);case 26:case 5:Ki(e,n),t===null&&i&4&&bm(n),i&512&&Qi(n,n.return);break;case 12:Ki(e,n);break;case 31:Ki(e,n),i&4&&kS(e,n);break;case 13:Ki(e,n),i&4&&XS(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=_A.bind(null,n),KA(e,n))));break;case 22:if(i=n.memoizedState!==null||Qe,!i){var a=t!==null&&t.memoizedState!==null||oe;t=Qe,s=oe,Qe=i,(oe=a)&&!s?(i=2,(n.subtreeFlags&8772)!==0&&(i|=1),Oi(e,n,i)):Ki(e,n),Qe=t,oe=s}break;case 30:Ki(e,n),i&512&&Qi(n,n.return);break;case 7:i&512&&Qi(n,n.return);default:Ki(e,n)}}function Dm(e,t){for(e=e.child;e!==null;)HS(e,t),e=e.sibling}function HS(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var i=n.style;typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"}else{var s=e.stateNode,a=e.memoizedProps.style,r=a!=null&&a.hasOwnProperty("display")?a.display:null;s.style.display=r==null||typeof r=="boolean"?"":(""+r).trim()}}catch(l){fe(e,e.return,l)}Um(e,t);break;case 6:try{e.stateNode.nodeValue=t?"":e.memoizedProps,ne=!0}catch(l){fe(e,e.return,l)}break;case 18:try{var o=e.stateNode;t?Ey(o,!0):Ey(e.stateNode,!1)}catch(l){fe(e,e.return,l)}break;case 22:case 23:e.memoizedState===null&&Dm(e,t);break;default:Dm(e,t)}}function Um(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){t:{var n=e,i=t;switch(n.tag){case 4:HS(n,i);break t;case 22:n.memoizedState===null&&Um(n,i);break t;default:Um(n,i)}}e=e.sibling}}function VS(e){var t=e.alternate;t!==null&&(e.alternate=null,VS(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Nh(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ne=null,Ln=!1;function Li(e,t,n){for(n=n.child;n!==null;)GS(e,t,n),n=n.sibling}function GS(e,t,n){if(jn&&typeof jn.onCommitFiberUnmount=="function")try{jn.onCommitFiberUnmount(_c,n)}catch{}switch(n.tag){case 26:oe||sn(n,t),Li(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!oe&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:oe||sn(n,t),Kl(n);var i=Ne,s=Ln;Aa(n.type)&&(Ne=n.stateNode,Ln=!1),Li(e,t,n),RM(n.stateNode,n.type,n.memoizedProps),Ne=i,Ln=s;break;case 5:oe||sn(n,t),Kl(n);case 6:if(n.tag===6&&Kl(n),i=Ne,s=Ln,Ne=null,Li(e,t,n),Ne=i,Ln=s,Ne!==null)if(Ln)try{(Ne.nodeType===9?Ne.body:Ne.nodeName==="HTML"?Ne.ownerDocument.body:Ne).removeChild(n.stateNode),ne=!0}catch(a){fe(n,t,a)}else try{Ne.removeChild(n.stateNode),ne=!0}catch(a){fe(n,t,a)}break;case 18:Ne!==null&&(Ln?(e=Ne,by(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),zo(e)):by(Ne,n.stateNode));break;case 4:i=Ne,s=Ln,Ne=n.stateNode.containerInfo,Ln=!0,Li(e,t,n),Ne=i,Ln=s;break;case 0:case 11:case 14:case 15:ba(2,n,t),oe||ba(4,n,t),Li(e,t,n);break;case 1:oe||(sn(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&NS(n,t,i)),Li(e,t,n);break;case 21:Li(e,t,n);break;case 22:oe=(i=oe)||n.memoizedState!==null,Li(e,t,n),oe=i;break;case 30:sn(n,t),Li(e,t,n);break;case 7:oe||sn(n,t),Li(e,t,n);break;default:Li(e,t,n)}}function kS(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{zo(e)}catch(n){fe(t,t.return,n)}}}function XS(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{zo(e)}catch(n){fe(t,t.return,n)}}function rA(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ly),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ly),t;default:throw Error(X(435,e.tag))}}function Uu(e,t){var n=rA(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var s=vA.bind(null,e,i);i.then(s,s)}})}function bn(e,t,n){var i=t.deletions;if(i!==null)for(var s=0;s<i.length;s++){var a=i[s],r=e,o=t,l=o;t:for(;l!==null;){switch(l.tag){case 27:if(Aa(l.type)){Ne=l.stateNode,Ln=!1;break t}break;case 5:Ne=l.stateNode,Ln=!1;break t;case 3:case 4:Ne=l.stateNode.containerInfo,Ln=!0;break t}l=l.return}if(Ne===null)throw Error(X(160));GS(r,o,a),Ne=null,Ln=!1,r=a.alternate,r!==null&&(r.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)WS(t,e,n),t=t.sibling}var Ii=null;function WS(e,t,n){var i=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(s&4&&(i=e.updateQueue,i=i!==null?i.events:null,i!==null))for(var a=0;a<i.length;a++){var r=i[a];r.ref.impl=r.nextImpl}bn(t,e,n),En(e),s&4&&(ba(3,e,e.return),Ec(3,e),ba(5,e,e.return));break;case 1:bn(t,e,n),En(e),s&512&&(oe||i===null||sn(i,i.return)),s&64&&Qe&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(a=Ii,bn(t,e,n),En(e),s&512&&(oe||i===null||sn(i,i.return)),s&4)if(s=i!==null?i.memoizedState:null,n=e.memoizedState,i===null)if(n===null)if(e.stateNode===null)if(Qe)e.stateNode=vM(e.type,e.memoizedProps,t.containerInfo,e);else{t:{t=e.type,n=e.memoizedProps,s=a.ownerDocument||a;e:switch(t){case"title":i=s.getElementsByTagName("title")[0],(!i||i[xc]||i[an]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=s.createElement(t),s.head.insertBefore(i,s.querySelector("head > title"))),cn(i,t,n),i[an]=e,$e(i),t=i;break t;case"link":if(a=Ny("link","href",s).get(t+(n.href||""))){for(r=0;r<a.length;r++)if(i=a[r],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){a.splice(r,1);break e}}i=s.createElement(t),cn(i,t,n),s.head.appendChild(i);break;case"meta":if(a=Ny("meta","content",s).get(t+(n.content||""))){for(r=0;r<a.length;r++)if(i=a[r],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){a.splice(r,1);break e}}i=s.createElement(t),cn(i,t,n),s.head.appendChild(i);break;default:throw Error(X(468,t))}i[an]=e,$e(i),t=i}e.stateNode=t}else Qe||Zm(a,e.type,e.stateNode);else e.stateNode=Uy(a,n,e.memoizedProps);else s!==n?(s===null?(t=i.stateNode,t===null||oe||t.parentNode.removeChild(t)):s.count--,n===null?Qe||Zm(a,e.type,e.stateNode):Uy(a,n,e.memoizedProps)):n===null&&e.stateNode!==null&&Rp(e,e.memoizedProps,i.memoizedProps);break;case 27:bn(t,e,n),En(e),s&512&&(oe||i===null||sn(i,i.return)),i!==null&&s&4&&Rp(e,e.memoizedProps,i.memoizedProps);break;case 5:if(a=Zi,Zi=!1,bn(t,e,n),Zi=a,En(e),s&512&&(oe||i===null||sn(i,i.return)),e.flags&32){t=e.stateNode;try{Co(t,""),ne=!0}catch(f){fe(e,e.return,f)}}s&4&&e.stateNode!=null&&(t=e.memoizedProps,Rp(e,t,i!==null?i.memoizedProps:t)),s&1024&&(Up=!0);break;case 6:if(bn(t,e,n),En(e),s&4){if(e.stateNode===null)throw Error(X(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,ne=!0}catch(f){fe(e,e.return,f)}}break;case 3:if(ne=!1,ju=null,a=Ii,Ii=fc(t.containerInfo),bn(t,e,n),Ii=a,En(e),s&4&&i!==null&&i.memoizedState.isDehydrated)try{zo(t.containerInfo)}catch(f){fe(e,e.return,f)}Up&&(Up=!1,qS(e)),ne=!1;break;case 4:s=Zi,Zi=Qe,i=pv(),a=Ii,Ii=fc(e.stateNode.containerInfo),bn(t,e,n),En(e),Ii=a,ne&&Hl&&(Mh=!0),ne=i,Zi=s;break;case 12:bn(t,e,n),En(e);break;case 31:bn(t,e,n),En(e),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Uu(e,t)));break;case 13:bn(t,e,n),En(e),e.child.flags&8192&&e.memoizedState!==null!=(i!==null&&i.memoizedState!==null)&&(Wh=Qn()),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Uu(e,t)));break;case 22:a=e.memoizedState!==null,r=i!==null&&i.memoizedState!==null;var o=Qe,l=oe,c=Zi;Qe=o||a,Zi=c||a,oe=l||r,bn(t,e,n),oe=l,Zi=c,Qe=o,En(e),s&8192&&(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,!a||i===null||r||Qe||oe||(t=r||oe,n=Qe,i=oe,Qe=a||Qe,oe=t,ta(e,2),Qe=n,oe=i),!a&&Zi||Dm(e,a)),s&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Uu(e,n))));break;case 19:bn(t,e,n),En(e),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Uu(e,t)));break;case 30:s&512&&(oe||i===null||sn(i,i.return)),s=pv(),a=Hl,r=(n&335544064)===n,o=e.memoizedProps,Hl=r&&Os(o.default,o.update)!=="none",bn(t,e,n),En(e),r&&i!==null&&ne&&(e.flags|=4),Hl=a,ne=s;break;case 21:break;case 7:s&512&&(oe||i===null||sn(i,i.return)),i&&i.stateNode!==null&&(i.stateNode._fragmentFiber=e);default:bn(t,e,n),En(e)}}function En(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(LS(i)){n=i;break}i=i.return}i=null;for(var s=e.return;s!==null;){if(Og(s)){var a=s.stateNode;i===null?i=[a]:i.push(a)}if(Lg(s))break;s=s.return}var r=i;if(n==null)throw Error(X(160));switch(n.tag){case 27:var o=n.stateNode,l=Dp(e);xh(e,l,o,r);break;case 5:var c=n.stateNode;n.flags&32&&(Co(c,""),n.flags&=-33);var f=Dp(e);xh(e,f,c,r);break;case 3:case 4:var d=n.stateNode.containerInfo,h=Dp(e);Em(e,h,d,r);break;default:throw Error(X(161))}}catch(p){fe(e,e.return,p)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function qS(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;qS(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,Bo=!0,t.reset(),Bo=!1),e=e.sibling}}function $r(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)YS(t,e),t=t.sibling;else zS(t,!1)}function YS(e,t){var n=e.alternate;if(n===null)Tm(e,!1);else switch(e.tag){case 3:if(Rm=Ji=!1,oy(),$r(t,e),!Ji&&!Mh){if(e=ji,e!==null)for(var i=0;i<e.length;i+=3){n=e[i];var s=e[i+1];xM(n,e[i+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+s+")"})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===""&&(e.style.viewTransitionName="none",e.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),Rm=!0}ji=null;break;case 5:$r(t,e);break;case 4:i=Ji,Ji=!1,$r(t,e),Ji&&(Mh=!0),Ji=i;break;case 22:e.memoizedState===null&&(n.memoizedState!==null?Tm(e,!1):$r(t,e));break;case 30:i=Ji,s=oy(),Ji=!1,$r(t,e),Ji&&(e.flags|=4);var a=e.memoizedProps,r=e.stateNode;t=Cs(a,r),r=Cs(n.memoizedProps,r);var o=Os(a.default,a.update);o==="none"?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,In=0,t=Ig(e,n,t,r,o,a,!0),In!==(a===null?0:a.length)&&(e.flags|=32)),(e.flags&4)!==0&&t?(Uo(e,e.memoizedProps.onUpdate),ji=s):s!==null&&(s.push.apply(s,ji),ji=s),Ji=(e.flags&32)!==0?!0:i;break;default:$r(t,e)}}function Ki(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)FS(e,t.alternate,t),t=t.sibling}function ta(e,t){for(e=e.child;e!==null;){var n=e,i=t;switch(n.tag){case 0:case 11:case 14:case 15:ba(4,n,n.return),ta(n,i);break;case 1:sn(n,n.return);var s=n.stateNode;typeof s.componentWillUnmount=="function"&&NS(n,n.return,s),ta(n,i);break;case 27:(i&2)!==0&&RM(n.stateNode,n.type,n.memoizedProps);case 5:sn(n,n.return),n.tag!==5&&n.tag!==27||Kl(n),ta(n,i);break;case 6:Kl(n);break;case 26:sn(n,n.return),s=n.stateNode,n.memoizedState!==null||s===null||oe||s.parentNode.removeChild(s),ta(n,i);break;case 22:n.memoizedState===null&&ta(n,i);break;case 30:sn(n,n.return),ta(n,i);break;case 7:sn(n,n.return);default:ta(n,i)}e=e.sibling}}function Oi(e,t,n){for(n=(t.subtreeFlags&8772)!==0?n:n&-2,t=t.child;t!==null;){var i=t.alternate,s=e,a=t,r=a.flags,o=(n&1)!==0;switch(a.tag){case 0:case 11:case 15:Oi(s,a,n),Ec(4,a);break;case 1:if(Oi(s,a,n),i=a,s=i.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(f){fe(i,i.return,f)}if(i=a,s=i.updateQueue,s!==null){var l=i.stateNode;try{var c=s.shared.hiddenCallbacks;if(c!==null)for(s.shared.hiddenCallbacks=null,s=0;s<c.length;s++)Hx(c[s],l)}catch(f){fe(i,i.return,f)}}o&&r&64&&US(a),Qi(a,a.return);break;case 27:(n&2)!==0&&OS(a);case 5:a.tag!==5&&a.tag!==27||ay(a),Oi(s,a,n),o&&i===null&&r&4&&bm(a),Qi(a,a.return);break;case 6:ay(a);break;case 26:l=a.stateNode,a.memoizedState!==null||l===null||Qe||Zm(fc(l.ownerDocument),a.type,l),Oi(s,a,n),o&&i===null&&r&4&&bm(a),Qi(a,a.return);break;case 12:Oi(s,a,n);break;case 31:Oi(s,a,n),o&&r&4&&kS(s,a);break;case 13:Oi(s,a,n),o&&r&4&&XS(s,a);break;case 22:a.memoizedState===null&&Oi(s,a,n),Qi(a,a.return);break;case 30:Oi(s,a,n),Qi(a,a.return);break;case 7:Qi(a,a.return);default:Oi(s,a,n)}t=t.sibling}}function Pg(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Mc(n))}function Bg(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Mc(e))}function pi(e,t,n,i){var s=(n&335544064)===n;if(t.subtreeFlags&(s?10262:10256))for(t=t.child;t!==null;)ZS(e,t,n,i),t=t.sibling;else s&&BS(t)}function ZS(e,t,n,i){var s=(n&335544064)===n;s&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&Zu(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:pi(e,t,n,i),a&2048&&Ec(9,t);break;case 1:pi(e,t,n,i);break;case 3:pi(e,t,n,i),s&&Rm&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,e.style.viewTransitionName==="root"&&(e.style.viewTransitionName=""),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName==="none"&&(e.style.viewTransitionName="")),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Mc(a)));break;case 12:if(a&2048){pi(e,t,n,i),a=t.stateNode;try{var r=t.memoizedProps,o=r.id,l=r.onPostCommit;typeof l=="function"&&l(o,t.alternate===null?"mount":"update",a.passiveEffectDuration,-0)}catch(c){fe(t,t.return,c)}}else pi(e,t,n,i);break;case 31:pi(e,t,n,i);break;case 13:pi(e,t,n,i);break;case 23:break;case 22:r=t.stateNode,o=t.alternate,t.memoizedState!==null?(s&&o!==null&&o.memoizedState===null&&Zu(o),r._visibility&2?pi(e,t,n,i):Ql(e,t)):(s&&o!==null&&o.memoizedState!==null&&Zu(t),r._visibility&2?pi(e,t,n,i):(r._visibility|=2,eo(e,t,n,i,(t.subtreeFlags&10256)!==0||!1))),a&2048&&Pg(o,t);break;case 24:pi(e,t,n,i),a&2048&&Bg(t.alternate,t);break;case 30:s&&(a=t.alternate,a!==null&&(as(a.child,!0),as(t.child,!0))),pi(e,t,n,i);break;default:pi(e,t,n,i)}}function eo(e,t,n,i,s){for(s=s&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var a=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:eo(a,r,o,l,s),Ec(8,r);break;case 23:break;case 22:var f=r.stateNode;r.memoizedState!==null?f._visibility&2?eo(a,r,o,l,s):Ql(a,r):(f._visibility|=2,eo(a,r,o,l,s)),s&&c&2048&&Pg(r.alternate,r);break;case 24:eo(a,r,o,l,s),s&&c&2048&&Bg(r.alternate,r);break;default:eo(a,r,o,l,s)}t=t.sibling}}function Ql(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,s=i.flags;switch(i.tag){case 22:Ql(n,i),s&2048&&Pg(i.alternate,i);break;case 24:Ql(n,i),s&2048&&Bg(i.alternate,i);break;default:Ql(n,i)}t=t.sibling}}var ja=8192;function Ja(e,t,n){if(e.subtreeFlags&ja)for(e=e.child;e!==null;)JS(e,t,n),e=e.sibling}function JS(e,t,n){switch(e.tag){case 26:Ja(e,t,n),e.flags&ja&&(e.memoizedState!==null?uw(n,Ii,e.memoizedState,e.memoizedProps):(e=e.stateNode,(t&335544128)===t&&Oy(n,e)));break;case 5:Ja(e,t,n),e.flags&ja&&(e=e.stateNode,(t&335544128)===t&&Oy(n,e));break;case 3:case 4:var i=Ii;Ii=fc(e.stateNode.containerInfo),Ja(e,t,n),Ii=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=ja,ja=16777216,Ja(e,t,n),ja=i):Ja(e,t,n));break;case 30:if((e.flags&ja)!==0&&(i=e.memoizedProps.name,i!=null&&i!=="auto")){var s=e.stateNode;s.paired=null,Jn===null&&(Jn=new Map),Jn.set(i,s)}Ja(e,t,n);break;default:Ja(e,t,n)}}function KS(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ll(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];je=i,jS(i,e)}KS(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)QS(e),e=e.sibling}function QS(e){switch(e.tag){case 0:case 11:case 15:Ll(e),e.flags&2048&&ba(9,e,e.return);break;case 3:Ll(e);break;case 12:Ll(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ju(e)):Ll(e);break;default:Ll(e)}}function Ju(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];je=i,jS(i,e)}KS(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:ba(8,t,t.return),Ju(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ju(t));break;default:Ju(t)}e=e.sibling}}function jS(e,t){for(;je!==null;){var n=je;switch(n.tag){case 0:case 11:case 15:ba(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Mc(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,je=i;else t:for(n=e;je!==null;){i=je;var s=i.sibling,a=i.return;if(VS(i),i===n){je=null;break t}if(s!==null){s.return=a,je=s;break t}je=a}}}var oA={getCacheForType:function(e){var t=rn(He),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return rn(He).controller.signal}},lA=typeof WeakMap=="function"?WeakMap:Map,ie=0,xe=null,Yt=null,Zt=0,ue=0,qn=null,oa=!1,ko=!1,zg=!1,Ns=0,Ie=0,Ea=0,ar=0,bh=0,Kn=0,Do=0,jl=null,On=null,Nm=!1,Wh=0,$S=0,Eh=1/0,Th=null,ga=null,Le=0,Bi=null,dr=null,ss=0,Lm=0,Om=null,tM=null,bo=null,Eo=null,To=null,$l=0,Ku=null;function ti(){return(ie&2)!==0&&Zt!==0?Zt&-Zt:Ot.T!==null?Hg():sx()}function eM(){if(Kn===0)if((Zt&536870912)===0||Xt){var e=vu;vu<<=1,(vu&3932160)===0&&(vu=262144),Kn=e}else Kn=536870912;return e=un.current,e!==null&&(e.flags|=32),Kn}function Uo(e,t){if(t!=null){var n=e.stateNode,i=n.ref;i===null&&(i=n.ref=MM(Cs(e.memoizedProps,n))),Eo===null&&(Eo=[]),Eo.push(t.bind(null,i))}}function Bn(e,t,n){(e===xe&&(ue===2||ue===9)||e.cancelPendingCommit!==null)&&(No(e,0),la(e,Zt,Kn,!1)),yc(e,n),((ie&2)===0||e!==xe)&&(e===xe&&((ie&2)===0&&(ar|=n),Ie===4&&la(e,Zt,Kn,!1)),os(e))}function nM(e,t,n){if((ie&6)!==0)throw Error(X(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||vc(e,t),s=i?hA(e,t):Np(e,t,!0),a=i;do{if(s===0){ko&&!i&&la(e,t,0,!1);break}else{if(n=e.current.alternate,a&&!cA(n)){s=Np(e,t,!1),a=!1;continue}if(s===2){if(a=t,e.errorRecoveryDisabledLanes&a)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;s=jl;var l=o.current.memoizedState.isDehydrated;if(l&&(No(o,r).flags|=256),r=Np(o,r,!1),r!==2&&r!==6){if(zg&&!l){o.errorRecoveryDisabledLanes|=a,ar|=a,s=4;break t}a=On,On=s,a!==null&&(On===null?On=a:On.push.apply(On,a))}s=r}if(a=!1,s!==2)continue}}if(s===1){No(e,0),la(e,t,0,!0);break}t:{switch(i=e,a=s,a){case 0:case 1:throw Error(X(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:la(i,t,Kn,!oa);break t;case 2:On=null;break;case 3:case 5:break;default:throw Error(X(329))}if((t&62914560)===t&&(s=Wh+300-Qn(),10<s)){if(la(i,t,Kn,!oa),Uh(i,0,!0)!==0)break t;ss=t,i.timeoutHandle=Gg(cy.bind(null,i,n,On,Th,Nm,t,Kn,ar,Do,oa,a,"Throttled",-0,0),s);break t}cy(i,n,On,Th,Nm,t,Kn,ar,Do,oa,a,null,-0,0)}}break}while(!0);os(e)}function cy(e,t,n,i,s,a,r,o,l,c,f,d,h,p){e.timeoutHandle=-1;var _=t.subtreeFlags,M=(a&335544064)===a;if(d=null,(M||_&8192||(_&16785408)===16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ts},Jn=null,JS(t,a,d),M&&(_=d,M=e.containerInfo,M=(M.nodeType===9?M:M.ownerDocument).__reactViewTransition,M!=null&&(_.count++,_.waitingForViewTransition=!0,_=dc.bind(_),M.finished.then(_,_))),_=(a&62914560)===a?Wh-Qn():(a&4194048)===a?$S-Qn():0,_=hw(d,_),_!==null)){ss=a,e.cancelPendingCommit=_(hy.bind(null,e,t,a,n,i,s,r,o,l,c,f,d,null,h,p)),la(e,a,r,!c);return}hy(e,t,a,n,i,s,r,o,l,c,f,d)}function cA(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var s=n[i],a=s.getSnapshot;s=s.value;try{if(!ei(a(),s))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function la(e,t,n,i){t=$y(e,t),t&=~bh,t&=~ar,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var s=t;0<s;){var a=31-$n(s),r=1<<a;i[a]=-1,s&=~r}n!==0&&ex(e,n,t)}function qh(){return(ie&6)===0?(Tc(0,!1),!1):!0}function Fg(){if(Yt!==null){if(ue===0)var e=Yt.return;else e=Yt,Es=vr=null,Mg(e),xo=null,rc=0,e=Yt;for(;e!==null;)DS(e.alternate,e),e=e.return;Yt=null}}function No(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,UA(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),ss=0,Fg(),xe=e,Yt=n=Ts(e.current,null),Zt=t,ue=0,qn=null,oa=!1,ko=vc(e,t),zg=!1,Do=Kn=bh=ar=Ea=Ie=0,On=jl=null,Nm=!1,Ns=$y(e,t),Ph(),n}function iM(e,t){Ht=null,Ot.H=_h,t===Vo||t===Fh?(t=Pv(),ue=3):t===pg?(t=Pv(),ue=4):ue=t===Dg?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,qn=t,Yt===null&&(Ie=1,vh(e,yi(t,e.current)))}function sM(){var e=un.current;return e===null?!0:(Zt&4194048)===Zt?gn===null:(Zt&62914560)===Zt||(Zt&536870912)!==0?e===gn:!1}function aM(){var e=Ot.H;return Ot.H=_h,e===null?_h:e}function rM(){var e=Ot.A;return Ot.A=oA,e}function Ah(){Ie=4,oa||(Zt&4194048)!==Zt&&un.current!==null||(ko=!0),(Ea&134217727)===0&&(ar&134217727)===0||xe===null||la(xe,Zt,Kn,!1)}function Np(e,t,n){var i=ie;ie|=2;var s=aM(),a=rM();(xe!==e||Zt!==t)&&(Th=null,No(e,t)),t=!1;var r=Ie;t:do try{if(ue!==0&&Yt!==null){var o=Yt,l=qn;switch(ue){case 8:Fg(),r=6;break t;case 3:case 2:case 9:case 6:un.current===null&&(t=!0);var c=ue;if(ue=0,qn=null,mo(e,o,l,c),n&&ko){r=0;break t}break;default:c=ue,ue=0,qn=null,mo(e,o,l,c)}}uA(),r=Ie;break}catch(f){iM(e,f)}while(!0);return t&&e.shellSuspendCounter++,Es=vr=null,ie=i,Ot.H=s,Ot.A=a,Yt===null&&(xe=null,Zt=0,Ph()),r}function uA(){for(;Yt!==null;)oM(Yt)}function hA(e,t){var n=ie;ie|=2;var i=aM(),s=rM();xe!==e||Zt!==t?(Th=null,Eh=Qn()+500,No(e,t)):ko=vc(e,t);t:do try{if(ue!==0&&Yt!==null){t=Yt;var a=qn;e:switch(ue){case 1:ue=0,qn=null,mo(e,t,a,1);break;case 2:case 9:if(Iv(a)){ue=0,qn=null,uy(t);break}t=function(){ue!==2&&ue!==9||xe!==e||(ue=7),os(e)},a.then(t,t);break t;case 3:ue=7;break t;case 4:ue=5;break t;case 7:Iv(a)?(ue=0,qn=null,uy(t)):(ue=0,qn=null,mo(e,t,a,7));break;case 5:var r=null;switch(Yt.tag){case 26:r=Yt.memoizedState;case 5:case 27:var o=Yt;if(r?NM(r):o.stateNode.complete){ue=0,qn=null;var l=o.sibling;if(l!==null)Yt=l;else{var c=o.return;c!==null?(Yt=c,Yh(c)):Yt=null}break e}}ue=0,qn=null,mo(e,t,a,5);break;case 6:ue=0,qn=null,mo(e,t,a,6);break;case 8:Fg(),Ie=6;break t;default:throw Error(X(462))}}fA();break}catch(f){iM(e,f)}while(!0);return Es=vr=null,Ot.H=i,Ot.A=s,ie=n,Yt!==null?0:(xe=null,Zt=0,Ph(),Ie)}function fA(){for(;Yt!==null&&!RE();)oM(Yt)}function oM(e){var t=RS(e.alternate,e,Ns);e.memoizedProps=e.pendingProps,t===null?Yh(e):Yt=t}function uy(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=jv(n,t,t.pendingProps,t.type,void 0,Zt);break;case 11:t=jv(n,t,t.pendingProps,t.type.render,t.ref,Zt);break;case 5:Mg(t);var i=t;i===tn&&(Xt?(uh(i),i.tag===5&&i.stateNode!=null&&(Te=i.stateNode)):(uh(i),Xt=!0));default:DS(n,t),t=Yt=Ux(t,Ns),t=RS(n,t,Ns)}e.memoizedProps=e.pendingProps,t===null?Yh(e):Yt=t}function mo(e,t,n,i){Es=vr=null,Mg(t),xo=null,rc=0;var s=t.return;try{if($T(e,s,t,n,Zt)){Ie=1,vh(e,yi(n,e.current)),Yt=null;return}}catch(a){if(s!==null)throw Yt=s,a;Ie=1,vh(e,yi(n,e.current)),Yt=null;return}t.flags&32768?(Xt||i===1?e=!0:ko||(Zt&536870912)!==0?e=!1:(oa=e=!0,(i===2||i===9||i===3||i===6)&&(i=un.current,i!==null&&i.tag===13&&(i.flags|=16384))),lM(t,e)):Yh(t)}function Yh(e){var t=e;do{if((t.flags&32768)!==0){lM(t,oa);return}e=t.return;var n=iA(t.alternate,t,Ns);if(n!==null){Yt=n;return}if(t=t.sibling,t!==null){Yt=t;return}Yt=t=e}while(t!==null);Ie===0&&(Ie=5)}function lM(e,t){do{var n=sA(e.alternate,e);if(n!==null){n.flags&=32767,Yt=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Yt=e;return}Yt=e=n}while(e!==null);Ie=6,Yt=null}function hy(e,t,n,i,s,a,r,o,l,c,f,d){e.cancelPendingCommit=null;do Zh();while(Le!==0);if((ie&6)!==0)throw Error(X(327));if(t!==null){if(t===e.current)throw Error(X(177));e===xe&&(Yt=xe=null,Zt=0),dr=t,Bi=e,ss=n,Om=s,tM=i,dA(e,t,n,r,o,l,d)}}function dA(e,t,n,i,s,a,r){var o=t.lanes|t.childLanes;if(Lm=o,o|=lg,FE(e,n,o,i,s,a),Eo=null,(n&335544064)===n?(To=VT(e),i=10262):(To=null,i=10256),(t.subtreeFlags&i)!==0||(t.flags&i)!==0?(e.callbackNode=null,e.callbackPriority=0,yA(ah,function(){return zm(),null})):(e.callbackNode=null,e.callbackPriority=0),Sh=!1,i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=Ot.T,Ot.T=null,s=se.p,se.p=2,a=ie,ie|=4;try{aA(e,t,n)}finally{ie=a,se.p=s,Ot.T=i}}Le=1,Sh?bo=BA(r,e.containerInfo,To,Im,Pm,mA,Bm,zm,pA,null,null):(Im(),Pm(),Bm())}function pA(e){if(Le!==0){var t=Bi.onRecoverableError;t(e,{componentStack:null})}}function mA(){Le===3&&(Le=0,YS(dr,Bi),Le=4)}function Im(){if(Le===1){Le=0;var e=Bi,t=dr,n=ss,i=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||i){i=Ot.T,Ot.T=null;var s=se.p;se.p=2;var a=ie;ie|=4;try{Hl=Mh=!1,WS(t,e,n),n=Gm;var r=bx(e.containerInfo),o=n.focusedElem,l=n.selectionRange;if(r!==o&&o&&o.ownerDocument&&Mx(o.ownerDocument.documentElement,o)){if(l!==null&&og(o)){var c=l.start,f=l.end;if(f===void 0&&(f=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(f,o.value.length);else{var d=o.ownerDocument||document,h=d&&d.defaultView||window;if(h.getSelection){var p=h.getSelection(),_=o.textContent.length,M=Math.min(l.start,_),m=l.end===void 0?M:Math.min(l.end,_);!p.extend&&M>m&&(r=m,m=M,M=r);var u=wv(o,M),g=wv(o,m);if(u&&g&&(p.rangeCount!==1||p.anchorNode!==u.node||p.anchorOffset!==u.offset||p.focusNode!==g.node||p.focusOffset!==g.offset)){var v=d.createRange();v.setStart(u.node,u.offset),p.removeAllRanges(),M>m?(p.addRange(v),p.extend(g.node,g.offset)):(v.setEnd(g.node,g.offset),p.addRange(v))}}}}for(d=[],p=o;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<d.length;o++){var y=d[o];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}Bo=!!Vm,Gm=Vm=null}finally{ie=a,se.p=s,Ot.T=i}}e.current=t,Le=2}}function Pm(){if(Le===2){Le=0;var e=Bi,t=dr,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=Ot.T,Ot.T=null;var i=se.p;se.p=2;var s=ie;ie|=4;try{FS(e,t.alternate,t)}finally{ie=s,se.p=i,Ot.T=n}}Le=3}}function Bm(){if(Le===4||Le===3){Le=0;var e=bo;bo=null,DE();var t=Bi,n=dr,i=ss,s=tM,a=(i&335544064)===i?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?Le=5:(Le=0,dr=Bi=null,cM(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(ga=null),eg(i),n=n.stateNode,jn&&typeof jn.onCommitFiberRoot=="function")try{jn.onCommitFiberRoot(_c,n,void 0,(n.current.flags&128)===128)}catch{}if(s!==null){n=Ot.T,a=se.p,se.p=2,Ot.T=null;try{for(var r=t.onRecoverableError,o=0;o<s.length;o++){var l=s[o];r(l.value,{componentStack:l.stack})}}finally{Ot.T=n,se.p=a}}if(s=Eo,r=To,To=null,s!==null&&(Eo=null,r===null&&(r=[]),e!==null))for(l=0;l<s.length;l++)n=(0,s[l])(r),n!==void 0&&e.finished.finally(n);(ss&3)!==0&&Zh(),os(t),a=t.pendingLanes,(i&261930)!==0&&(a&42)!==0?t===Ku?$l++:($l=0,Ku=t):($l=0,Ku=null),Tc(0,!1)}}function cM(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Mc(t)))}function Zh(){return bo!==null&&(bo.skipTransition(),bo=null),Im(),Pm(),Bm(),zm()}function zm(){if(Le!==5)return!1;var e=Bi,t=Lm;Lm=0;var n=eg(ss),i=Ot.T,s=se.p;try{se.p=32>n?32:n,Ot.T=null,n=Om,Om=null;var a=Bi,r=ss;if(Le=0,dr=Bi=null,ss=0,(ie&6)!==0)throw Error(X(331));var o=ie;if(ie|=4,QS(a.current),ZS(a,a.current,r,n),ie=o,Tc(0,!1),jn&&typeof jn.onPostCommitFiberRoot=="function")try{jn.onPostCommitFiberRoot(_c,a)}catch{}return!0}finally{se.p=s,Ot.T=i,cM(e,t)}}function fy(e,t,n){t=yi(n,t),t=_m(e.stateNode,t,2),e=da(e,t,2),e!==null&&(yc(e,2),os(e))}function fe(e,t,n){if(e.tag===3)fy(e,e,n);else for(;t!==null;){if(t.tag===3){fy(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ga===null||!ga.has(i))){e=yi(n,e),n=ES(2),i=da(t,n,2),i!==null&&(TS(n,i,t,e),yc(i,2),os(i));break}}t=t.return}}function Lp(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new lA;var s=new Set;i.set(t,s)}else s=i.get(t),s===void 0&&(s=new Set,i.set(t,s));s.has(n)||(zg=!0,s.add(n),e=gA.bind(null,e,t,n),t.then(e,e))}function gA(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,xe===e&&(Zt&n)===n&&((Ie===4||Ie===3&&(Zt&62914560)===Zt&&300>Qn()-Wh)&&(ie&2)===0?No(e,0):bh|=n,Do===Zt&&(Do=0)),os(e)}function uM(e,t){t===0&&(t=tx()),e=_r(e,t),e!==null&&(yc(e,t),os(e))}function _A(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),uM(e,n)}function vA(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(X(314))}i!==null&&i.delete(t),uM(e,n)}function yA(e,t){return $m(e,t)}var Lo=null,no=null,Fm=!1,wh=!1,Op=!1,ca=0;function os(e){e!==no&&e.next===null&&(no===null?Lo=no=e:no=no.next=e),wh=!0,Fm||(Fm=!0,SA())}function Tc(e,t){if(!Op&&wh){Op=!0;do for(var n=!1,i=Lo;i!==null;){if(!t)if(e!==0){var s=i.pendingLanes;if(s===0)var a=0;else{var r=i.suspendedLanes,o=i.pingedLanes;a=(1<<31-$n(42|e)+1)-1,a&=s&~(r&~o),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,dy(i,a))}else a=Zt,a=Uh(i,i===xe?a:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(a&3)===0||vc(i,a)||(n=!0,dy(i,a));i=i.next}while(n);Op=!1}}function xA(){hM()}function hM(){wh=Fm=!1;var e=0;ca!==0&&DA()&&(e=ca);for(var t=Qn(),n=null,i=Lo;i!==null;){var s=i.next,a=fM(i,t);a===0?(i.next=null,n===null?Lo=s:n.next=s,s===null&&(no=n)):(n=i,(e!==0||(a&3)!==0)&&(wh=!0)),i=s}Le!==0&&Le!==5||Tc(e,!1),ca!==0&&(ca=0)}function fM(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var r=31-$n(a),o=1<<r,l=s[r];l===-1?((o&n)===0||(o&i)!==0)&&(s[r]=zE(o,t)):l<=t&&(e.expiredLanes|=o),a&=~o}if(t=xe,n=Zt,n=Uh(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(ue===2||ue===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&fp(i),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||vc(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&fp(i),eg(n)){case 2:case 8:n=Qy;break;case 32:n=ah;break;case 268435456:n=jy;break;default:n=ah}return i=dM.bind(null,e),n=$m(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&fp(i),e.callbackPriority=2,e.callbackNode=null,2}function dM(e,t){if(Le!==0&&Le!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Zh()&&e.callbackNode!==n)return null;var i=Zt;return i=Uh(e,e===xe?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(nM(e,i,t),fM(e,Qn()),e.callbackNode!=null&&e.callbackNode===n?dM.bind(null,e):null)}function dy(e,t){if(Zh())return null;nM(e,t,!0)}function SA(){NA(function(){(ie&6)!==0?$m(Ky,xA):hM()})}function Hg(){if(ca===0){var e=cr;e===0&&(e=_u,_u<<=1,(_u&261888)===0&&(_u=256)),ca=e}return ca}function py(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:zu(e)}function MA(e,t,n,i,s){if(t==="submit"&&n&&n.stateNode===s){var a=py((s[Fn]||null).action),r=i.submitter;r&&(t=(t=r[Fn]||null)?py(t.formAction):r.getAttribute("formAction"),t!==null&&(a=t,r=null));var o=new Lh("action","action",null,i,s);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(ca!==0){var l=new FormData(s,r);mm(n,{pending:!0,data:l,method:s.method,action:a},null,l)}}else typeof a=="function"&&(o.preventDefault(),l=new FormData(s,r),mm(n,{pending:!0,data:l,method:s.method,action:a},a,l))},currentTarget:s}]})}}for(Nu=0;Nu<sm.length;Nu++)Lu=sm[Nu],my=Lu.toLowerCase(),gy=Lu[0].toUpperCase()+Lu.slice(1),zi(my,"on"+gy);var Lu,my,gy,Nu;zi(Tx,"onAnimationEnd");zi(Ax,"onAnimationIteration");zi(wx,"onAnimationStart");zi("dblclick","onDoubleClick");zi("focusin","onFocus");zi("focusout","onBlur");zi(LT,"onTransitionRun");zi(OT,"onTransitionStart");zi(IT,"onTransitionCancel");zi(Cx,"onTransitionEnd");wo("onMouseEnter",["mouseout","mouseover"]);wo("onMouseLeave",["mouseout","mouseover"]);wo("onPointerEnter",["pointerout","pointerover"]);wo("onPointerLeave",["pointerout","pointerover"]);mr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));mr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));mr("onBeforeInput",["compositionend","keypress","textInput","paste"]);mr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));mr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));mr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var cc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bA=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(cc));function pM(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],s=i.event;i=i.listeners;t:{var a=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(f){oh(f)}s.currentTarget=null,a=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(f){oh(f)}s.currentTarget=null,a=l}}}}function qt(e,t){var n=t[uv];n===void 0&&(n=t[uv]=new Set);var i=e+"__bubble";n.has(i)||(mM(t,e,2,!1),n.add(i))}function Ip(e,t,n){var i=0;t&&(i|=4),mM(n,e,i,t)}var Ou="_reactListening"+Math.random().toString(36).slice(2);function Vg(e){if(!e[Ou]){e[Ou]=!0,rx.forEach(function(n){n!=="selectionchange"&&(bA.has(n)||Ip(n,!1,e),Ip(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ou]||(t[Ou]=!0,Ip("selectionchange",!1,t))}}function mM(e,t,n,i){switch(FM(t)){case 2:var s=mw;break;case 8:s=gw;break;default:s=Zg}n=s.bind(null,t,n,e),s=void 0,!tm||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),i?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function Pp(e,t,n,i,s){var a=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===s)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===s)return;r=r.return}for(;o!==null;){if(r=$a(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=a=r;continue t}o=o.parentNode}}i=i.return}px(function(){var c=a,f=ig(n),d=[];t:{var h=Rx.get(e);if(h!==void 0){var p=Lh,_=e;switch(e){case"keypress":if(Hu(n)===0)break t;case"keydown":case"keyup":p=cT;break;case"focusin":_="focus",p=vp;break;case"focusout":_="blur",p=vp;break;case"beforeblur":case"afterblur":p=vp;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=vv;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=QE;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=pT;break;case Tx:case Ax:case wx:p=tT;break;case Cx:p=gT;break;case"scroll":case"scrollend":p=JE;break;case"wheel":p=vT;break;case"copy":case"cut":case"paste":p=nT;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=xv;break;case"submit":p=fT;break;case"toggle":case"beforetoggle":p=xT}var M=(t&4)!==0,m=!M&&(e==="scroll"||e==="scrollend"),u=M?h!==null?h+"Capture":null:h;M=[];for(var g=c,v;g!==null;){var y=g;if(v=y.stateNode,y=y.tag,y!==5&&y!==26&&y!==27||v===null||u===null||(y=ec(g,u),y!=null&&M.push(uc(g,y,v))),m)break;g=g.return}0<M.length&&(h=new p(h,_,null,n,f),d.push({event:h,listeners:M}))}}if((t&7)===0){t:{if(p=e==="mouseover"||e==="pointerover",h=e==="mouseout"||e==="pointerout",p&&n!==$p&&(_=n.relatedTarget||n.fromElement)&&($a(_)||_[Fo]))break t;(h||p)&&(_=f.window===f?f:(p=f.ownerDocument)?p.defaultView||p.parentWindow:window,h?(p=n.relatedTarget||n.toElement,h=c,p=p?$a(p):null,p!==null&&(m=gc(p),M=p.tag,p!==m||M!==5&&M!==27&&M!==6)&&(p=null)):(h=null,p=c),h!==p&&(M=vv,y="onMouseLeave",u="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(M=xv,y="onPointerLeave",u="onPointerEnter",g="pointer"),m=h==null?_:zl(h),v=p==null?_:zl(p),_=new M(y,g+"leave",h,n,f),_.target=m,_.relatedTarget=v,y=null,$a(f)===c&&(M=new M(u,g+"enter",p,n,f),M.target=v,M.relatedTarget=m,y=M),m=y,M=h&&p?Vp(h,p,EA):null,h!==null&&_y(d,_,h,M,!1),p!==null&&m!==null&&_y(d,m,p,M,!0)))}t:{if(h=c?zl(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var T=Ev;else if(bv(h))if(xx)T=DT;else{T=CT;var C=wT}else p=h.nodeName,!p||p.toLowerCase()!=="input"||h.type!=="checkbox"&&h.type!=="radio"?c&&ng(c.elementType)&&(T=Ev):T=RT;if(T&&(T=T(e,c))){yx(d,T,n,f);break t}C&&C(e,h,c)}switch(C=c?zl(c):window,e){case"focusin":(bv(C)||C.contentEditable==="true")&&(lo=C,nm=c,kl=null);break;case"focusout":kl=nm=lo=null;break;case"mousedown":im=!0;break;case"contextmenu":case"mouseup":case"dragend":im=!1,Cv(d,n,f);break;case"selectionchange":if(NT)break;case"keydown":case"keyup":Cv(d,n,f)}var w;if(rg)t:{switch(e){case"compositionstart":var U="onCompositionStart";break t;case"compositionend":U="onCompositionEnd";break t;case"compositionupdate":U="onCompositionUpdate";break t}U=void 0}else oo?_x(e,n)&&(U="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(U="onCompositionStart");U&&(gx&&n.locale!=="ko"&&(oo||U!=="onCompositionStart"?U==="onCompositionEnd"&&oo&&(w=mx()):(aa=f,sg="value"in aa?aa.value:aa.textContent,oo=!0)),C=Ch(c,U),0<C.length&&(U=new yv(U,e,null,n,f),d.push({event:U,listeners:C}),w?U.data=w:(w=vx(n),w!==null&&(U.data=w)))),(w=MT?bT(e,n):ET(e,n))&&(U=Ch(c,"onBeforeInput"),0<U.length&&(C=new yv("onBeforeInput","beforeinput",null,n,f),d.push({event:C,listeners:U}),C.data=w)),MA(d,e,c,n,f)}pM(d,t)})}function uc(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ch(e,t){for(var n=t+"Capture",i=[];e!==null;){var s=e,a=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||a===null||(s=ec(e,n),s!=null&&i.unshift(uc(e,s,a)),s=ec(e,t),s!=null&&i.push(uc(e,s,a))),e.tag===3)return i;e=e.return}return[]}function EA(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function _y(e,t,n,i,s){for(var a=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,s?(c=ec(n,a),c!=null&&r.unshift(uc(n,c,l))):s||(c=ec(n,a),c!=null&&r.push(uc(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var TA=/\r\n?/g,AA=/\u0000|\uFFFD/g;function vy(e){return(typeof e=="string"?e:""+e).replace(TA,`
`).replace(AA,"")}function gM(e,t){return t=vy(t),vy(e)===t}function he(e,t,n,i,s,a){switch(n){case"children":if(typeof i=="string")t==="body"||t==="textarea"&&i===""||Co(e,i);else if(typeof i=="number"||typeof i=="bigint")t!=="body"&&Co(e,""+i);else return;break;case"className":xu(e,"class",i);break;case"tabIndex":xu(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":xu(e,n,i);break;case"style":dx(e,i,a);return;case"data":if(t!=="object"){xu(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=zu(i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof a=="function"&&(n==="formAction"?(t!=="input"&&he(e,t,"name",s.name,s,null),he(e,t,"formEncType",s.formEncType,s,null),he(e,t,"formMethod",s.formMethod,s,null),he(e,t,"formTarget",s.formTarget,s,null)):(he(e,t,"encType",s.encType,s,null),he(e,t,"method",s.method,s,null),he(e,t,"target",s.target,s,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=zu(i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=ts);return;case"onScroll":i!=null&&qt("scroll",e);return;case"onScrollEnd":i!=null&&qt("scrollend",e);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(X(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(X(60));a?.__html!==n&&(e.innerHTML=n)}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=zu(i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":qt("beforetoggle",e),qt("toggle",e),Bu(e,"popover",i);break;case"xlinkActuate":Ss(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Ss(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Ss(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Ss(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Ss(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Ss(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Ss(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Ss(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Ss(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Bu(e,"is",i);break;case"innerText":case"textContent":return;default:if(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")n=YE.get(n)||n,Bu(e,n,i);else return}ne=!0}function Hm(e,t,n,i,s,a){switch(n){case"style":dx(e,i,a);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(X(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(X(60));a?.__html!==n&&(e.innerHTML=n)}}break;case"children":if(typeof i=="string")Co(e,i);else if(typeof i=="number"||typeof i=="bigint")Co(e,""+i);else return;break;case"onScroll":i!=null&&qt("scroll",e);return;case"onScrollEnd":i!=null&&qt("scrollend",e);return;case"onClick":i!=null&&(e.onclick=ts);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!ox.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(s=n.endsWith("Capture"),a=n.slice(2,s?n.length-7:void 0),t=e[Fn]||null,t=t!=null?t[n]:null,typeof t=="function"&&e.removeEventListener(a,t,s),typeof i=="function")){typeof t!="function"&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(a,i,s);break t}ne=!0,n in e?e[n]=i:i===!0?e.setAttribute(n,""):Bu(e,n,i)}return}ne=!0}function cn(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":qt("error",e),qt("load",e);var i=!1,s=!1,a;for(a in n)if(n.hasOwnProperty(a)){var r=n[a];if(r!=null)switch(a){case"src":i=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(X(137,t));default:he(e,t,a,r,n,null)}}s&&he(e,t,"srcSet",n.srcSet,n,null),i&&he(e,t,"src",n.src,n,null);return;case"input":qt("invalid",e);var o=a=r=s=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var f=n[i];if(f!=null)switch(i){case"name":s=f;break;case"type":r=f;break;case"checked":l=f;break;case"defaultChecked":c=f;break;case"value":a=f;break;case"defaultValue":o=f;break;case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(X(137,t));break;default:he(e,t,i,f,n,null)}}ux(e,a,o,l,c,r,s,!1);return;case"select":qt("invalid",e),i=r=a=null;for(s in n)if(n.hasOwnProperty(s)&&(o=n[s],o!=null))switch(s){case"value":a=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:he(e,t,s,o,n,null)}t=a,n=r,e.multiple=!!i,t!=null?_o(e,!!i,t,!1):n!=null&&_o(e,!!i,n,!0);return;case"textarea":qt("invalid",e),a=s=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":s=o;break;case"children":a=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(X(91));break;default:he(e,t,r,o,n,null)}fx(e,i,s,a);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:he(e,t,l,i,n,null)}return;case"dialog":qt("beforetoggle",e),qt("toggle",e),qt("cancel",e),qt("close",e);break;case"iframe":case"object":qt("load",e);break;case"video":case"audio":for(i=0;i<cc.length;i++)qt(cc[i],e);break;case"image":qt("error",e),qt("load",e);break;case"details":qt("toggle",e);break;case"embed":case"source":case"link":qt("error",e),qt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(X(137,t));default:he(e,t,c,i,n,null)}return;default:if(ng(t)){for(f in n)n.hasOwnProperty(f)&&(i=n[f],i!==void 0&&Hm(e,t,f,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&he(e,t,o,i,n,null))}var wA={};function CA(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,a=null,r=null,o=null,l=null,c=null,f=null;for(p in n){var d=n[p];if(n.hasOwnProperty(p)&&d!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=d;default:i.hasOwnProperty(p)||he(e,t,p,null,i,d)}}for(var h in i){var p=i[h];if(d=n[h],i.hasOwnProperty(h)&&(p!=null||d!=null))switch(h){case"type":p!==d&&(ne=!0),a=p;break;case"name":p!==d&&(ne=!0),s=p;break;case"checked":p!==d&&(ne=!0),c=p;break;case"defaultChecked":p!==d&&(ne=!0),f=p;break;case"value":p!==d&&(ne=!0),r=p;break;case"defaultValue":p!==d&&(ne=!0),o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(X(137,t));break;default:p!==d&&he(e,t,h,p,i,d)}}jp(e,r,o,l,c,f,a,s);return;case"select":p=r=o=h=null;for(a in n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(a)||he(e,t,a,null,i,l)}for(s in i)if(a=i[s],l=n[s],i.hasOwnProperty(s)&&(a!=null||l!=null))switch(s){case"value":a!==l&&(ne=!0),h=a;break;case"defaultValue":a!==l&&(ne=!0),o=a;break;case"multiple":a!==l&&(ne=!0),r=a;default:a!==l&&he(e,t,s,a,i,l)}t=o,n=r,i=p,h!=null?_o(e,!!n,h,!1):!!i!=!!n&&(t!=null?_o(e,!!n,t,!0):_o(e,!!n,n?[]:"",!1));return;case"textarea":p=h=null;for(o in n)if(s=n[o],n.hasOwnProperty(o)&&s!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:he(e,t,o,null,i,s)}for(r in i)if(s=i[r],a=n[r],i.hasOwnProperty(r)&&(s!=null||a!=null))switch(r){case"value":s!==a&&(ne=!0),h=s;break;case"defaultValue":s!==a&&(ne=!0),p=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(X(91));break;default:s!==a&&he(e,t,r,s,i,a)}hx(e,h,p);return;case"option":for(var _ in n)if(h=n[_],n.hasOwnProperty(_)&&h!=null&&!i.hasOwnProperty(_))switch(_){case"selected":e.selected=!1;break;default:he(e,t,_,null,i,h)}for(l in i)if(h=i[l],p=n[l],i.hasOwnProperty(l)&&h!==p&&(h!=null||p!=null))switch(l){case"selected":h!==p&&(ne=!0),e.selected=h&&typeof h!="function"&&typeof h!="symbol";break;default:he(e,t,l,h,i,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var M in n)h=n[M],n.hasOwnProperty(M)&&h!=null&&!i.hasOwnProperty(M)&&he(e,t,M,null,i,h);for(c in i)if(h=i[c],p=n[c],i.hasOwnProperty(c)&&h!==p&&(h!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(X(137,t));break;default:he(e,t,c,h,i,p)}return;default:if(ng(t)){for(var m in n)h=n[m],n.hasOwnProperty(m)&&h!==void 0&&!i.hasOwnProperty(m)&&Hm(e,t,m,void 0,i,h);for(f in i)h=i[f],p=n[f],!i.hasOwnProperty(f)||h===p||h===void 0&&p===void 0||Hm(e,t,f,h,i,p);return}}for(var u in n)h=n[u],n.hasOwnProperty(u)&&h!=null&&!i.hasOwnProperty(u)&&he(e,t,u,null,i,h);for(d in i)h=i[d],p=n[d],!i.hasOwnProperty(d)||h===p||h==null&&p==null||he(e,t,d,h,i,p)}function yy(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function RA(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var s=n[i],a=s.transferSize,r=s.initiatorType,o=s.duration;if(a&&o&&yy(r)){for(r=0,o=s.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var f=l.transferSize,d=l.initiatorType;f&&yy(d)&&(l=l.responseEnd,r+=f*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(a+r)/(s.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Vm=null,Gm=null;function hc(e){return e.nodeType===9?e:e.ownerDocument}function xy(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function _M(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function vM(e,t,n,i){return n=hc(n).createElement(e),n[an]=i,n[Fn]=t,cn(n,e,t),$e(n),n}function km(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Bp=null;function DA(){var e=window.event;return e&&e.type==="popstate"?e===Bp?!1:(Bp=e,!0):(Bp=null,!1)}var Gg=typeof setTimeout=="function"?setTimeout:void 0,UA=typeof clearTimeout=="function"?clearTimeout:void 0,Sy=typeof Promise=="function"?Promise:void 0,My=typeof requestAnimationFrame=="function"?requestAnimationFrame:Gg,NA=typeof queueMicrotask=="function"?queueMicrotask:typeof Sy<"u"?function(e){return Sy.resolve(null).then(e).catch(LA)}:Gg;function LA(e){setTimeout(function(){throw e})}function Aa(e){return e==="head"}function by(e,t){var n=t,i=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(s),zo(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")Fp(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,Fp(n);for(var a=n.firstChild;a;){var r=a.nextSibling,o=a.nodeName;a[xc]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&a.rel.toLowerCase()==="stylesheet"||n.removeChild(a),a=r}}else n==="body"&&Fp(e.ownerDocument.body);n=s}while(n);zo(t)}function Ey(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function yM(e,t,n){if(t=CSS.escape(t)!==t?"r-"+btoa(t).replace(/=/g,""):t,e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display==="inline"){if(t=e.getClientRects(),t.length===1)var i=1;else for(var s=i=0;s<t.length;s++){var a=t[s];0<a.width&&0<a.height&&i++}i===1&&(e=e.style,e.display=t.length===1?"inline-block":"block",e.marginTop="-"+n.paddingTop,e.marginBottom="-"+n.paddingBottom)}}function xM(e,t){e=e.style,t=t.style;var n=t!=null?t.hasOwnProperty("viewTransitionName")?t.viewTransitionName:t.hasOwnProperty("view-transition-name")?t["view-transition-name"]:null:null;e.viewTransitionName=n==null||typeof n=="boolean"?"":(""+n).trim(),n=t!=null?t.hasOwnProperty("viewTransitionClass")?t.viewTransitionClass:t.hasOwnProperty("view-transition-class")?t["view-transition-class"]:null:null,e.viewTransitionClass=n==null||typeof n=="boolean"?"":(""+n).trim(),e.display==="inline-block"&&(t==null?e.display=e.margin="":(n=t.display,e.display=n==null||typeof n=="boolean"?"":n,n=t.margin,n!=null?e.margin=n:(n=t.hasOwnProperty("marginTop")?t.marginTop:t["margin-top"],e.marginTop=n==null||typeof n=="boolean"?"":n,t=t.hasOwnProperty("marginBottom")?t.marginBottom:t["margin-bottom"],e.marginBottom=t==null||typeof t=="boolean"?"":t)))}function SM(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position==="absolute"||t.position==="fixed",clip:t.clipPath!=="none"||t.overflow!=="visible"||t.filter!=="none"||t.mask!=="none"||t.mask!=="none"||t.borderRadius!=="0px",view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Xm(e){var t=e.getBoundingClientRect(),n=getComputedStyle(e);return SM(t,n,e)}function OA(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return SM(t,n,e)}function IA(e){return e.documentElement.clientHeight}function PA(e){this.addEventListener("load",e),this.addEventListener("error",e)}function BA(e,t,n,i,s,a,r,o,l){var c=t.nodeType===9?t:t.ownerDocument;try{var f=c.startViewTransition({update:function(){var h=c.defaultView,p=h.navigation&&h.navigation.transition,_=c.fonts.status;i();var M=[];if(_==="loaded"&&(IA(c),c.fonts.status==="loading"&&M.push(c.fonts.ready)),_=M.length,e!==null)for(var m=e.suspenseyImages,u=0,g=0;g<m.length;g++){var v=m[g];if(!v.complete){var y=v.getBoundingClientRect();if(0<y.bottom&&0<y.right&&y.top<h.innerHeight&&y.left<h.innerWidth){if(u+=LM(v),u>$u){M.length=_;break}v=new Promise(PA.bind(v)),M.push(v)}}}if(0<M.length)return h=Promise.race([Promise.all(M),new Promise(function(T){return setTimeout(T,500)})]).then(s,s),(p?Promise.allSettled([p.finished,h]):h).then(a,a);if(s(),p)return p.finished.then(a,a);a()},types:n});c.__reactViewTransition=f;var d=[];return f.ready.then(function(){for(var h=c.documentElement.getAnimations({subtree:!0}),p=0;p<h.length;p++){var _=h[p],M=_.effect,m=M.pseudoElement;if(m!=null&&m.startsWith("::view-transition")){d.push(_),_=M.getKeyframes();for(var u=m=void 0,g=!0,v=0;v<_.length;v++){var y=_[v],T=y.width;if(m===void 0)m=T;else if(m!==T){g=!1;break}if(T=y.height,u===void 0)u=T;else if(u!==T){g=!1;break}delete y.width,delete y.height,y.transform==="none"&&delete y.transform}g&&m!==void 0&&u!==void 0&&(M.setKeyframes(_),g=getComputedStyle(M.target,M.pseudoElement),g.width!==m||g.height!==u)&&(g=_[0],g.width=m,g.height=u,g=_[_.length-1],g.width=m,g.height=u,M.setKeyframes(_))}}r()},function(h){c.__reactViewTransition===f&&(c.__reactViewTransition=null);try{if(typeof h=="object"&&h!==null)switch(h.name){case"InvalidStateError":(h.message==="View transition was skipped because document visibility state is hidden."||h.message==="Skipping view transition because document visibility state has become hidden."||h.message==="Skipping view transition because viewport size changed."||h.message==="Transition was aborted because of invalid state")&&(h=null)}h!==null&&l(h)}finally{i(),s(),r()}}),f.finished.finally(function(){for(var h=0;h<d.length;h++)d[h].cancel();c.__reactViewTransition===f&&(c.__reactViewTransition=null),o()}),f}catch{return i(),s(),r(),null}}function tr(e,t){this._scope=document.documentElement,this._selector="::view-transition-"+e+"("+t+")"}tr.prototype.animate=function(e,t){return t=typeof t=="number"?{duration:t}:Se({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)};tr.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),i=[],s=0;s<n.length;s++){var a=n[s].effect;a!==null&&a.target===e&&a.pseudoElement===t&&i.push(n[s])}return i};tr.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function MM(e){return{name:e,group:new tr("group",e),imagePair:new tr("image-pair",e),old:new tr("old",e),new:new tr("new",e)}}function ni(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}ni.prototype.addEventListener=function(e,t,n){var i=null,s=null;if(!(n!=null&&typeof n!="boolean"&&(i=n.signal||null,i!==null&&i.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(bM(a,e,t,n)===-1){var r=this,o=t;n!=null&&typeof n!="boolean"&&n.once===!0&&(o=function(l){r.removeEventListener(e,t,n),typeof t=="function"?t.call(this,l):t.handleEvent(l)}),i!==null&&(s=r.removeEventListener.bind(r,e,t,n),i.addEventListener("abort",s,{once:!0}),s=i.removeEventListener.bind(i,"abort",s)),i=Oo(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:o,cleanup:s}),zn(this._fragmentFiber.child,!1,zA,e,o,i)}this._eventListeners=a}};function zA(e,t,n,i){return qe(e).addEventListener(t,n,i),!1}ni.prototype.removeEventListener=function(e,t,n){var i=this._eventListeners;if(i!==null&&(t=bM(i,e,t,n),t!==-1)){var s=i[t];n=s.attachedListener;var a=s.cleanup;s=Oo(s.optionsOrUseCapture),zn(this._fragmentFiber.child,!1,FA,e,n,s),i.splice(t,1),a!==null&&a()}};function FA(e,t,n,i){return qe(e).removeEventListener(t,n,i),!1}function Oo(e){return e!=null&&typeof e!="boolean"&&(e.once===!0||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function Ty(e){return e==null?"c=0":typeof e=="boolean"?"c="+(e?"1":"0"):"c="+(e.capture?"1":"0")}function bM(e,t,n,i){if(e.length===0)return-1;i=Ty(i);for(var s=0;s<e.length;s++){var a=e[s];if(a.type===t&&a.listener===n&&Ty(a.optionsOrUseCapture)===i)return s}return-1}ni.prototype.dispatchEvent=function(e){var t=pr(this._fragmentFiber);if(t===null)return!0;t=qe(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var i=t.nodeType===9?t.createComment(""):document.createTextNode("");if(n)for(var s=0;s<n.length;s++){var a=n[s];i.addEventListener(a.type,a.attachedListener,Oo(a.optionsOrUseCapture))}if(t.appendChild(i),e=i.dispatchEvent(e),n)for(s=0;s<n.length;s++)a=n[s],i.removeEventListener(a.type,a.attachedListener,Oo(a.optionsOrUseCapture));return t.removeChild(i),e}return t.dispatchEvent(e)};ni.prototype.focus=function(e){zn(this._fragmentFiber.child,!0,EM,e,void 0,void 0)};function EM(e,t){return e.tag===6?!1:(e=qe(e),QA(e,t))}ni.prototype.focusLast=function(e){var t=[];zn(this._fragmentFiber.child,!0,kg,t,void 0,void 0);for(var n=t.length-1;0<=n&&!EM(t[n],e);n--);};function kg(e,t){return t.push(e),!1}ni.prototype.blur=function(){var e=pr(this._fragmentFiber);e!==null&&(e=qe(e),e=hc(e).activeElement,e!==null&&zn(this._fragmentFiber.child,!1,HA,e,void 0,void 0))};function HA(e,t){return e.tag===6?!1:(e=qe(e),e===t||e.contains(t)?(t.blur(),!0):!1)}ni.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),zn(this._fragmentFiber.child,!1,VA,e,void 0,void 0)};function VA(e,t){return e.tag===6||(e=qe(e),t.observe(e)),!1}ni.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),zn(this._fragmentFiber.child,!1,GA,e,void 0,void 0);for(var n=t=0;n<Pi.length;n++){var i=Pi[n];i.fragmentInstance===this&&i.observer===e?e.unobserve(i.instance):Pi[t++]=i}Pi.length=t}};function GA(e,t){return e.tag===6||(e=qe(e),t.unobserve(e)),!1}var Pi=[],zp=!1;function kA(e,t,n){Pi.push({fragmentInstance:e,observer:t,instance:n}),zp||(zp=!0,jA(function(){zp=!1;var i=Pi;Pi=[];for(var s=0;s<i.length;s++){var a=i[s];a.observer.unobserve(a.instance)}}))}ni.prototype.getClientRects=function(){var e=[];return zn(this._fragmentFiber.child,!1,XA,e,void 0,void 0),e};function XA(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=qe(e),t.push.apply(t,e.getClientRects());return!1}ni.prototype.getRootNode=function(e){var t=pr(this._fragmentFiber);return t===null?this:qe(t).getRootNode(e)};ni.prototype.compareDocumentPosition=function(e){var t=pr(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];zn(this._fragmentFiber.child,!1,kg,n,void 0,void 0);var i=qe(t);if(n.length===0){if(n=i,sv(this._fragmentFiber)){t:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break t}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var s=i=n.compareDocumentPosition(e);return n===e?s=Node.DOCUMENT_POSITION_CONTAINS:i&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=qy(t)[1],n===null?s=Node.DOCUMENT_POSITION_PRECEDING:(e=qe(n).compareDocumentPosition(e),s=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),s|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=qe(n[0]),s=qe(n[n.length-1]);var a=sv(this._fragmentFiber)?t.parentElement:i;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;i=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(s)&Node.DOCUMENT_POSITION_CONTAINED_BY;var r=t.compareDocumentPosition(e),o=s.compareDocumentPosition(e),l=r&Node.DOCUMENT_POSITION_CONTAINED_BY||o&Node.DOCUMENT_POSITION_CONTAINED_BY;return o=i&&a&&r&Node.DOCUMENT_POSITION_FOLLOWING&&o&Node.DOCUMENT_POSITION_PRECEDING,t=i&&t===e||a&&s===e||l||o?Node.DOCUMENT_POSITION_CONTAINED_BY:!i&&t===e||!a&&s===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:r,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||WA(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function WA(e,t,n,i,s){var a=$a(s);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)t:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break t}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=s.ownerDocument,s===a||s===a.documentElement||s===a.body;t:{for(a=t,t=pr(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break t}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=Vp(n,a,av),t===null?t=!1:(zn(t,!0,SE,a,n),a=io,io=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===i)&&(t=Vp(i,a,av),t===null?t=!1:(zn(t,!0,ME,a,i),a=io,Hp=io=null,t=a!==null)),t):!1}function Ay(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}ni.prototype.scrollIntoView=function(e){if(typeof e=="object")throw Error(X(566));var t=[];zn(this._fragmentFiber.child,!1,kg,t,void 0,void 0);var n=e!==!1;if(t.length===0){var i=qy(this._fragmentFiber);if(i=n?i[1]||i[0]||pr(this._fragmentFiber):i[0]||i[1],i===null)return;if(i.tag===6){e=qe(i),Ay(e,n);return}if(i=qe(i),i.nodeType!==9){if(i.nodeType===11){n="host"in i?i.host:null,n!==null&&n.scrollIntoView(e);return}i.scrollIntoView(e)}}for(i=n?t.length-1:0;i!==(n?-1:t.length);){var s=t[i];s.tag===6?(s=qe(s),Ay(s,n)):qe(s).scrollIntoView(e),i+=n?-1:1}};function qA(e,t){return e=qe(e),TM(e,t),!1}function TM(e,t){e.reactFragments==null&&(e.reactFragments=new Set),e.reactFragments.add(t)}function AM(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i];e.addEventListener(s.type,s.attachedListener,Oo(s.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(a){for(var r=0,o=0;o<Pi.length;o++){var l=Pi[o];(l.fragmentInstance!==t||l.observer!==a||l.instance!==e)&&(Pi[r++]=l)}Pi.length=r,a.observe(e)}),TM(e,t))}function YA(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i];e.removeEventListener(s.type,s.attachedListener,Oo(s.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(a){typeof a.rootMargin=="string"?kA(t,a,e):a.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function Wm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Wm(n),Nh(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function ZA(e,t,n,i){for(;e.nodeType===1;){var s=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[xc])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(a=e.getAttribute("rel"),a==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(a!==s.rel||e.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(a=e.getAttribute("src"),(a!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&a&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var a=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===a)return e}else return e;if(e=Si(e.nextSibling),e===null)break}return null}function JA(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Si(e.nextSibling),e===null))return null;return e}function wM(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Si(e.nextSibling),e===null))return null;return e}function qm(e){return e.data==="$?"||e.data==="$~"}function Xg(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function KA(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Si(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Ym=null;function wy(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return Si(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function Cy(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function QA(e,t){function n(){i=!0}if(e.ownerDocument.activeElement===e)return!0;var i=!1;try{e.ownerDocument.addEventListener("focus",n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener("focus",n,!0)}return i}function jA(e){My(function(){My(function(t){return e(t)})})}function CM(e,t,n){switch(t=hc(n),e){case"html":if(e=t.documentElement,!e)throw Error(X(452));return e;case"head":if(e=t.head,!e)throw Error(X(453));return e;case"body":if(e=t.body,!e)throw Error(X(454));return e;default:throw Error(X(451))}}function RM(e,t,n){for(var i in n){var s=n[i];n.hasOwnProperty(i)&&s!=null&&he(e,t,i,null,wA,s)}n.dangerouslySetInnerHTML!=null&&(e.textContent=""),e.onclick===ts&&(e.onclick=null),Nh(e)}function Fp(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Nh(e)}var Mi=new Map,Ry=new Set;function fc(e){if(typeof e.getRootNode=="function"){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var Is=se.d;se.d={f:$A,r:tw,D:ew,C:nw,L:iw,m:sw,X:rw,S:aw,M:ow};function $A(){var e=Is.f(),t=qh();return e||t}function tw(e){var t=Ho(e);t!==null&&t.tag===5&&t.type==="form"?dS(t):Is.r(e)}var Xo=typeof document>"u"?null:document;function DM(e,t,n){var i=Xo;if(i&&typeof t=="string"&&t){var s=vi(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof n=="string"&&(s+='[crossorigin="'+n+'"]'),Ry.has(s)||(Ry.add(s),e={rel:e,crossOrigin:n,href:t},i.querySelector(s)===null&&(t=i.createElement("link"),cn(t,"link",e),$e(t),i.head.appendChild(t)))}}function ew(e){Is.D(e),DM("dns-prefetch",e,null)}function nw(e,t){Is.C(e,t),DM("preconnect",e,t)}function iw(e,t,n){Is.L(e,t,n);var i=Xo;if(i&&e&&t){var s='link[rel="preload"][as="'+vi(t)+'"]';t==="image"&&n&&n.imageSrcSet?(s+='[imagesrcset="'+vi(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(s+='[imagesizes="'+vi(n.imageSizes)+'"]')):s+='[href="'+vi(e)+'"]';var a=s;switch(t){case"style":a=Io(e);break;case"script":a=Wo(e)}if(!(Mi.has(a)||(e=Se({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Mi.set(a,e),i.querySelector(s)!==null||t==="style"&&i.querySelector(Ac(a))||t==="script"&&i.querySelector(wc(a))))){var r=i.createElement("link");cn(r,"link",e),t==="style"&&(r[rh]=!0,r.onload=r.onerror=function(){ax(r)}),$e(r),i.head.appendChild(r)}}}function sw(e,t){Is.m(e,t);var n=Xo;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+vi(i)+'"][href="'+vi(e)+'"]',a=s;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":a=Wo(e)}if(!Mi.has(a)&&(e=Se({rel:"modulepreload",href:e},t),Mi.set(a,e),n.querySelector(s)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(wc(a)))return}i=n.createElement("link"),cn(i,"link",e),$e(i),n.head.appendChild(i)}}}function aw(e,t,n){Is.S(e,t,n);var i=Xo;if(i&&e){var s=go(i).hoistableStyles,a=Io(e);t=t||"default";var r=s.get(a);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Ac(a)))o.loading=5;else{e=Se({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Mi.get(a))&&Wg(e,n);var l=r=i.createElement("link");$e(l),cn(l,"link",e),l._p=new Promise(function(c,f){l.onload=c,l.onerror=f}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Qu(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},s.set(a,r)}}}function rw(e,t){Is.X(e,t);var n=Xo;if(n&&e){var i=go(n).hoistableScripts,s=Wo(e),a=i.get(s);a||(a=n.querySelector(wc(s)),a||(e=Se({src:e,async:!0},t),(t=Mi.get(s))&&qg(e,t),a=n.createElement("script"),$e(a),cn(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function ow(e,t){Is.M(e,t);var n=Xo;if(n&&e){var i=go(n).hoistableScripts,s=Wo(e),a=i.get(s);a||(a=n.querySelector(wc(s)),a||(e=Se({src:e,async:!0,type:"module"},t),(t=Mi.get(s))&&qg(e,t),a=n.createElement("script"),$e(a),cn(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function Dy(e,t,n,i){var s=(s=ua.current)?fc(s):null;if(!s)throw Error(X(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(n=Io(n.href),t=go(s).hoistableStyles,i=t.get(n),i||(i={type:"style",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Io(n.href);var a=go(s).hoistableStyles,r=a.get(e);if(r||(s=s.ownerDocument||s,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},a.set(e,r),(a=s.querySelector(Ac(e)))?a._p||(r.instance=a,r.state.loading=5):(a=Mi.get(e),a||(a={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Mi.set(e,a)),lw(s,e,a,r.state))),t&&i===null)throw Error(X(528,""));return r}if(t&&i!==null)throw Error(X(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(n=Wo(n),t=go(s).hoistableScripts,i=t.get(n),i||(i={type:"script",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(X(444,e))}}function Io(e){return'href="'+vi(e)+'"'}function Ac(e){return'link[rel="stylesheet"]['+e+"]"}function UM(e){return Se({},e,{"data-precedence":e.precedence,precedence:null})}function lw(e,t,n,i){if(t=e.querySelector('link[rel="preload"][as="style"]['+t+"]")){if(t[rh]!==!0){i.loading=1;return}}else t=e.createElement("link"),t[rh]=!0,t.onload=t.onerror=ax.bind(null,t),cn(t,"link",n),$e(t),e.head.appendChild(t);i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2})}function Wo(e){return'[src="'+vi(e)+'"]'}function wc(e){return"script[async]"+e}function Uy(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+vi(n.href)+'"]');if(i)return t.instance=i,$e(i),i;var s=Se({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),$e(i),cn(i,"style",s),Qu(i,n.precedence,e),t.instance=i;case"stylesheet":s=Io(n.href);var a=e.querySelector(Ac(s));if(a)return t.state.loading|=4,t.instance=a,$e(a),a;i=UM(n),(s=Mi.get(s))&&Wg(i,s),a=(e.ownerDocument||e).createElement("link"),$e(a);var r=a;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),cn(a,"link",i),t.state.loading|=4,Qu(a,n.precedence,e),t.instance=a;case"script":return a=Wo(n.src),(s=e.querySelector(wc(a)))?(t.instance=s,$e(s),s):(i=n,(s=Mi.get(a))&&(i=Se({},n),qg(i,s)),e=e.ownerDocument||e,s=e.createElement("script"),$e(s),cn(s,"link",i),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(X(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,Qu(i,n.precedence,e));return t.instance}function Qu(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=i.length?i[i.length-1]:null,a=s,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)a=o;else if(a!==s)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Wg(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function qg(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var ju=null;function Ny(e,t,n){if(ju===null){var i=new Map,s=ju=new Map;s.set(n,i)}else s=ju,i=s.get(n),i||(i=new Map,s.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),s=0;s<n.length;s++){var a=n[s];if(!(a[xc]||a[an]||e==="link"&&a.getAttribute("rel")==="stylesheet")&&a.namespaceURI!=="http://www.w3.org/2000/svg"){var r=a.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(a):i.set(r,[a])}}return i}function Zm(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function cw(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Ly(e,t){return e==="img"&&t.src!=null&&t.src!==""&&t.onLoad==null&&t.loading!=="lazy"}function NM(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function LM(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function Oy(e,t){typeof t.decode=="function"&&(e.imgCount++,t.complete||(e.imgBytes+=LM(t),e.suspenseyImages.push(t)),e=fw.bind(e),t.decode().then(e,e))}function uw(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var s=Io(i.href),a=t.querySelector(Ac(s));if(a){t=a._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=dc.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,$e(a);return}a=t.ownerDocument||t,i=UM(i),(s=Mi.get(s))&&Wg(i,s),a=a.createElement("link"),$e(a);var r=a;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),cn(a,"link",i),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=dc.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var $u=0;function hw(e,t){return e.stylesheets&&e.count===0&&th(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&th(e,e.stylesheets),e.unsuspend){var a=e.unsuspend;e.unsuspend=null,a()}},6e4+t);0<e.imgBytes&&$u===0&&($u=62500*RA());var s=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&th(e,e.stylesheets),e.unsuspend)){var a=e.unsuspend;e.unsuspend=null,a()}},(e.imgBytes>$u?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(s)}}:null}function OM(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)th(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function dc(){this.count--,OM(this)}function fw(){this.imgCount--,OM(this)}var Rh=null;function th(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Rh=new Map,t.forEach(dw,e),Rh=null,dc.call(e))}function dw(e,t){if(!(t.state.loading&4)){var n=Rh.get(e);if(n)var i=n.get(null);else{n=new Map,Rh.set(e,n);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),a=0;a<s.length;a++){var r=s[a];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}s=t.instance,r=s.getAttribute("data-precedence"),a=n.get(r)||i,a===i&&n.set(null,s),n.set(r,s),this.count++,i=dc.bind(this),s.addEventListener("load",i),s.addEventListener("error",i),a?a.parentNode.insertBefore(s,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var Po={$$typeof:$i,Provider:null,Consumer:null,_currentValue:er,_currentValue2:er,_threadCount:0};function pw(e,t,n,i,s,a,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=dp(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=dp(0),this.hiddenUpdates=dp(null),this.identifierPrefix=i,this.onUncaughtError=s,this.onCaughtError=a,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.transitionTypes=null,this.incompleteTransitions=new Map}function IM(e,t,n,i,s,a,r,o,l,c,f,d){return e=new pw(e,t,n,r,l,c,f,d,o),t=1,a===!0&&(t|=24),a=Pn(3,null,null,t),e.current=a,a.stateNode=e,t=fg(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:i,isDehydrated:n,cache:t},mg(a),e}function PM(e){return e?(e=ho,e):ho}function BM(e,t,n,i,s,a){s=PM(s),i.context===null?i.context=s:i.pendingContext=s,i=fa(t),i.payload={element:n},a=a===void 0?null:a,a!==null&&(i.callback=a),n=da(e,i,t),n!==null&&(Bn(n,e,t),Wl(n,e,t))}function Iy(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Yg(e,t){Iy(e,t),(e=e.alternate)&&Iy(e,t)}function zM(e){if(e.tag===13||e.tag===31){var t=_r(e,67108864);t!==null&&Bn(t,e,67108864),Yg(e,67108864)}}function Py(e){if(e.tag===13||e.tag===31){var t=ti();t=tg(t);var n=_r(e,t);n!==null&&Bn(n,e,t),Yg(e,t)}}var Bo=!0;function mw(e,t,n,i){var s=Ot.T;Ot.T=null;var a=se.p;try{se.p=2,Zg(e,t,n,i)}finally{se.p=a,Ot.T=s}}function gw(e,t,n,i){var s=Ot.T;Ot.T=null;var a=se.p;try{se.p=8,Zg(e,t,n,i)}finally{se.p=a,Ot.T=s}}function Zg(e,t,n,i){if(Bo){var s=Jm(i);if(s===null)Pp(e,t,i,Dh,n),By(e,i);else if(vw(s,e,t,n,i))i.stopPropagation();else if(By(e,i),t&4&&-1<_w.indexOf(e)){for(;s!==null;){var a=Ho(s);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var r=Ka(a.pendingLanes);if(r!==0){var o=a;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-$n(r);o.entanglements[1]|=l,r&=~l}os(a),(ie&6)===0&&(Eh=Qn()+500,Tc(0,!1))}}break;case 31:case 13:o=_r(a,2),o!==null&&Bn(o,a,2),qh(),Yg(a,2)}if(a=Jm(i),a===null&&Pp(e,t,i,Dh,n),a===s)break;s=a}s!==null&&i.stopPropagation()}else Pp(e,t,i,null,n)}}function Jm(e){return e=ig(e),Jg(e)}var Dh=null;function Jg(e){if(Dh=null,e=$a(e),e!==null){var t=gc(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=ky(t),e!==null)return e;e=null}else if(n===31){if(e=Xy(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Dh=e,null}function FM(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(UE()){case Ky:return 2;case Qy:return 8;case ah:case NE:return 32;case jy:return 268435456;default:return 32}default:return 32}}var Km=!1,_a=null,va=null,ya=null,pc=new Map,mc=new Map,ia=[],_w="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function By(e,t){switch(e){case"focusin":case"focusout":_a=null;break;case"dragenter":case"dragleave":va=null;break;case"mouseover":case"mouseout":ya=null;break;case"pointerover":case"pointerout":pc.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":mc.delete(t.pointerId)}}function Ol(e,t,n,i,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:a,targetContainers:[s]},t!==null&&(t=Ho(t),t!==null&&zM(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function vw(e,t,n,i,s){switch(t){case"focusin":return _a=Ol(_a,e,t,n,i,s),!0;case"dragenter":return va=Ol(va,e,t,n,i,s),!0;case"mouseover":return ya=Ol(ya,e,t,n,i,s),!0;case"pointerover":var a=s.pointerId;return pc.set(a,Ol(pc.get(a)||null,e,t,n,i,s)),!0;case"gotpointercapture":return a=s.pointerId,mc.set(a,Ol(mc.get(a)||null,e,t,n,i,s)),!0}return!1}function HM(e){var t=$a(e.target);if(t!==null){var n=gc(t);if(n!==null){if(t=n.tag,t===13){if(t=ky(n),t!==null){e.blockedOn=t,cv(e.priority,function(){Py(n)});return}}else if(t===31){if(t=Xy(n),t!==null){e.blockedOn=t,cv(e.priority,function(){Py(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function eh(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Jm(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);$p=i,n.target.dispatchEvent(i),$p=null}else return t=Ho(n),t!==null&&zM(t),e.blockedOn=n,!1;t.shift()}return!0}function zy(e,t,n){eh(e)&&n.delete(t)}function yw(){Km=!1,_a!==null&&eh(_a)&&(_a=null),va!==null&&eh(va)&&(va=null),ya!==null&&eh(ya)&&(ya=null),pc.forEach(zy),mc.forEach(zy)}function Iu(e,t){e.blockedOn===t&&(e.blockedOn=null,Km||(Km=!0,Ye.unstable_scheduleCallback(Ye.unstable_NormalPriority,yw)))}var Pu=null;function Fy(e){Pu!==e&&(Pu=e,Ye.unstable_scheduleCallback(Ye.unstable_NormalPriority,function(){Pu===e&&(Pu=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],s=e[t+2];if(typeof i!="function"){if(Jg(i||n)===null)continue;break}var a=Ho(n);a!==null&&(e.splice(t,3),t-=3,mm(a,{pending:!0,data:s,method:n.method,action:i},i,s))}}))}function zo(e){function t(l){return Iu(l,e)}_a!==null&&Iu(_a,e),va!==null&&Iu(va,e),ya!==null&&Iu(ya,e),pc.forEach(t),mc.forEach(t);for(var n=0;n<ia.length;n++){var i=ia[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<ia.length&&(n=ia[0],n.blockedOn===null);)HM(n),n.blockedOn===null&&ia.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var s=n[i],a=n[i+1],r=s[Fn]||null;if(typeof a=="function")r||Fy(n);else if(r){var o=null;if(a&&a.hasAttribute("formAction")){if(s=a,r=a[Fn]||null)o=r.formAction;else if(Jg(s)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),Fy(n)}}}function VM(){function e(a){a.canIntercept&&a.info==="react-transition"&&a.intercept({handler:function(){return new Promise(function(r){return s=r})},focusReset:"manual",scroll:"manual"})}function t(){s!==null&&(s(),s=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var a=navigation.currentEntry;a&&a.url!=null&&navigation.navigate(a.url,{state:a.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,s=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),s!==null&&(s(),s=null)}}}function Kg(e){this._internalRoot=e}Jh.prototype.render=Kg.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(X(409));var n=t.current,i=ti();BM(n,i,e,t,null,null)};Jh.prototype.unmount=Kg.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;BM(e.current,2,null,e,null,null),qh(),t[Fo]=null}};function Jh(e){this._internalRoot=e}Jh.prototype.unstable_scheduleHydration=function(e){if(e){var t=sx();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ia.length&&t!==0&&t<ia[n].priority;n++);ia.splice(n,0,e),n===0&&HM(e)}};var Hy=Vy.version;if(Hy!=="19.3.1")throw Error(X(527,Hy,"19.3.1"));se.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(X(188)):(e=Object.keys(e).join(","),Error(X(268,e)));return e=xE(t),e=e!==null?Wy(e):null,e=e===null?null:e.stateNode,e};var xw={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:Ot,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Il=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Il.isDisabled&&Il.supportsFiber))try{_c=Il.inject(xw),jn=Il}catch{}var Il;Kh.createRoot=function(e,t){if(!Gy(e))throw Error(X(299));var n=!1,i="",s=SS,a=MS,r=bS;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=IM(e,1,!1,null,null,n,i,null,s,a,r,VM),e[Fo]=t.current,Vg(e),new Kg(t)};Kh.hydrateRoot=function(e,t,n){if(!Gy(e))throw Error(X(299));var i=!1,s="",a=SS,r=MS,o=bS,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(a=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=IM(e,1,!0,t,n??null,i,s,l,a,r,o,VM),t.context=PM(null),n=t.current,i=ti(),i=tg(i),s=fa(i),s.callback=null,da(n,s,i),n=i,t.current.lanes=n,yc(t,n),os(t),e[Fo]=t.current,Vg(e),new Jh(t)};Kh.version="19.3.1"});var WM=qi((eU,XM)=>{"use strict";function kM(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(kM)}catch(e){console.error(e)}}kM(),XM.exports=GM()});var Ub=qi(zd=>{"use strict";var RD=Symbol.for("react.transitional.element"),DD=Symbol.for("react.fragment");function Db(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var s in t)s!=="key"&&(n[s]=t[s])}else n=t;return t=n.ref,{$$typeof:RD,type:e,key:i,ref:t!==void 0?t:null,props:n}}zd.Fragment=DD;zd.jsx=Db;zd.jsxs=Db});var Fr=qi((FO,Nb)=>{"use strict";Nb.exports=Ub()});var Gb=Ni(Zr()),kb=Ni(tp()),Xb=Ni(WM());var nu=Ni(Zr());var c1=0,A0=1,u1=2;var w0=1,h1=2,fs=3,Gs=0,wn=1,ds=2,Ws=0,Tr=1,C0=2,R0=3,D0=4,f1=5,Ia=100,d1=101,p1=102,m1=103,g1=104,_1=200,v1=201,y1=202,x1=203,_f=204,vf=205,S1=206,M1=207,b1=208,E1=209,T1=210,A1=211,w1=212,C1=213,R1=214,Gf=0,kf=1,Xf=2,Ar=3,Wf=4,qf=5,Yf=6,Zf=7,U0=0,D1=1,U1=2,qs=0,N1=1,L1=2,O1=3,I1=4,P1=5,B1=6,z1=7;var N0=300,Nr=301,Lr=302,Jf=303,Kf=304,Zc=306,yf=1e3,Oa=1001,xf=1002,Ei=1003,F1=1004;var Jc=1005;var ki=1006,Qf=1007;var Ha=1008;var ps=1009,L0=1010,O0=1011,hl=1012,jf=1013,Va=1014,ms=1015,fl=1016,$f=1017,td=1018,dl=1020,I0=35902,P0=35899,B0=1021,z0=1022,Ai=1023,al=1026,pl=1027,F0=1028,ed=1029,H0=1030,nd=1031;var id=1033,Kc=33776,Qc=33777,jc=33778,$c=33779,sd=35840,ad=35841,rd=35842,od=35843,ld=36196,cd=37492,ud=37496,hd=37808,fd=37809,dd=37810,pd=37811,md=37812,gd=37813,_d=37814,vd=37815,yd=37816,xd=37817,Sd=37818,Md=37819,bd=37820,Ed=37821,Td=36492,Ad=36494,wd=36495,Cd=36283,Rd=36284,Dd=36285,Ud=36286;var Lc=2300,Sf=2301,gf=2302,x0=2400,S0=2401,M0=2402;var H1=3200,V1=3201;var G1=0,k1=1,Ys="",ai="srgb",wr="srgb-linear",Oc="linear",de="srgb";var br=7680;var b0=519,X1=512,W1=513,q1=514,V0=515,Y1=516,Z1=517,J1=518,K1=519,E0=35044;var G0="300 es",Gi=2e3,Ic=2001;var ks=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let a=s.indexOf(n);a!==-1&&s.splice(a,1)}}dispatchEvent(t){let n=this._listeners;if(n===void 0)return;let i=n[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,t);t.target=null}}},_n=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Qg=Math.PI/180,Mf=180/Math.PI;function tu(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(_n[e&255]+_n[e>>8&255]+_n[e>>16&255]+_n[e>>24&255]+"-"+_n[t&255]+_n[t>>8&255]+"-"+_n[t>>16&15|64]+_n[t>>24&255]+"-"+_n[n&63|128]+_n[n>>8&255]+"-"+_n[n>>16&255]+_n[n>>24&255]+_n[i&255]+_n[i>>8&255]+_n[i>>16&255]+_n[i>>24&255]).toLowerCase()}function Kt(e,t,n){return Math.max(t,Math.min(n,e))}function Sw(e,t){return(e%t+t)%t}function jg(e,t,n){return(1-n)*e+n*t}function Cc(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function Hn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}var ae=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Kt(this.x,t.x,n.x),this.y=Kt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=Kt(this.x,t,n),this.y=Kt(this.y,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Kt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(Kt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),s=Math.sin(n),a=this.x-t.x,r=this.y-t.y;return this.x=a*i-r*s+t.x,this.y=a*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Xs=class{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,a,r,o){let l=i[s+0],c=i[s+1],f=i[s+2],d=i[s+3],h=a[r+0],p=a[r+1],_=a[r+2],M=a[r+3];if(o===0){t[n+0]=l,t[n+1]=c,t[n+2]=f,t[n+3]=d;return}if(o===1){t[n+0]=h,t[n+1]=p,t[n+2]=_,t[n+3]=M;return}if(d!==M||l!==h||c!==p||f!==_){let m=1-o,u=l*h+c*p+f*_+d*M,g=u>=0?1:-1,v=1-u*u;if(v>Number.EPSILON){let T=Math.sqrt(v),C=Math.atan2(T,u*g);m=Math.sin(m*C)/T,o=Math.sin(o*C)/T}let y=o*g;if(l=l*m+h*y,c=c*m+p*y,f=f*m+_*y,d=d*m+M*y,m===1-o){let T=1/Math.sqrt(l*l+c*c+f*f+d*d);l*=T,c*=T,f*=T,d*=T}}t[n]=l,t[n+1]=c,t[n+2]=f,t[n+3]=d}static multiplyQuaternionsFlat(t,n,i,s,a,r){let o=i[s],l=i[s+1],c=i[s+2],f=i[s+3],d=a[r],h=a[r+1],p=a[r+2],_=a[r+3];return t[n]=o*_+f*d+l*p-c*h,t[n+1]=l*_+f*h+c*d-o*p,t[n+2]=c*_+f*p+o*h-l*d,t[n+3]=f*_-o*d-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,s=t._y,a=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(s/2),d=o(a/2),h=l(i/2),p=l(s/2),_=l(a/2);switch(r){case"XYZ":this._x=h*f*d+c*p*_,this._y=c*p*d-h*f*_,this._z=c*f*_+h*p*d,this._w=c*f*d-h*p*_;break;case"YXZ":this._x=h*f*d+c*p*_,this._y=c*p*d-h*f*_,this._z=c*f*_-h*p*d,this._w=c*f*d+h*p*_;break;case"ZXY":this._x=h*f*d-c*p*_,this._y=c*p*d+h*f*_,this._z=c*f*_+h*p*d,this._w=c*f*d-h*p*_;break;case"ZYX":this._x=h*f*d-c*p*_,this._y=c*p*d+h*f*_,this._z=c*f*_-h*p*d,this._w=c*f*d+h*p*_;break;case"YZX":this._x=h*f*d+c*p*_,this._y=c*p*d+h*f*_,this._z=c*f*_-h*p*d,this._w=c*f*d-h*p*_;break;case"XZY":this._x=h*f*d-c*p*_,this._y=c*p*d-h*f*_,this._z=c*f*_+h*p*d,this._w=c*f*d+h*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],s=n[4],a=n[8],r=n[1],o=n[5],l=n[9],c=n[2],f=n[6],d=n[10],h=i+o+d;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(f-l)*p,this._y=(a-c)*p,this._z=(r-s)*p}else if(i>o&&i>d){let p=2*Math.sqrt(1+i-o-d);this._w=(f-l)/p,this._x=.25*p,this._y=(s+r)/p,this._z=(a+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-i-d);this._w=(a-c)/p,this._x=(s+r)/p,this._y=.25*p,this._z=(l+f)/p}else{let p=2*Math.sqrt(1+d-i-o);this._w=(r-s)/p,this._x=(a+c)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Kt(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+r*o+s*c-a*l,this._y=s*f+r*l+a*o-i*c,this._z=a*f+r*c+i*l-s*o,this._w=r*f-i*o-s*l-a*c,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);let i=this._x,s=this._y,a=this._z,r=this._w,o=r*t._w+i*t._x+s*t._y+a*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=r,this._x=i,this._y=s,this._z=a,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-n;return this._w=p*r+n*this._w,this._x=p*i+n*this._x,this._y=p*s+n*this._y,this._z=p*a+n*this._z,this.normalize(),this}let c=Math.sqrt(l),f=Math.atan2(c,o),d=Math.sin((1-n)*f)/c,h=Math.sin(n*f)/c;return this._w=r*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=a*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(n),a*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},z=class e{constructor(t=0,n=0,i=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(qM.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(qM.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6]*s,this.y=a[1]*n+a[4]*i+a[7]*s,this.z=a[2]*n+a[5]*i+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=t.elements,r=1/(a[3]*n+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*n+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*n+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(t){let n=this.x,i=this.y,s=this.z,a=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*s-o*i),f=2*(o*n-a*s),d=2*(a*i-r*n);return this.x=n+l*c+r*d-o*f,this.y=i+l*f+o*c-a*d,this.z=s+l*d+a*f-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s,this.y=a[1]*n+a[5]*i+a[9]*s,this.z=a[2]*n+a[6]*i+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Kt(this.x,t.x,n.x),this.y=Kt(this.y,t.y,n.y),this.z=Kt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=Kt(this.x,t,n),this.y=Kt(this.y,t,n),this.z=Kt(this.z,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Kt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,s=t.y,a=t.z,r=n.x,o=n.y,l=n.z;return this.x=s*l-a*o,this.y=a*r-i*l,this.z=i*o-s*r,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return $g.copy(this).projectOnVector(t),this.sub($g)}reflect(t){return this.sub($g.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(Kt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},$g=new z,qM=new Xs,Vt=class e{constructor(t,n,i,s,a,r,o,l,c){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c)}set(t,n,i,s,a,r,o,l,c){let f=this.elements;return f[0]=t,f[1]=s,f[2]=o,f[3]=n,f[4]=a,f[5]=l,f[6]=i,f[7]=r,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],f=i[4],d=i[7],h=i[2],p=i[5],_=i[8],M=s[0],m=s[3],u=s[6],g=s[1],v=s[4],y=s[7],T=s[2],C=s[5],w=s[8];return a[0]=r*M+o*g+l*T,a[3]=r*m+o*v+l*C,a[6]=r*u+o*y+l*w,a[1]=c*M+f*g+d*T,a[4]=c*m+f*v+d*C,a[7]=c*u+f*y+d*w,a[2]=h*M+p*g+_*T,a[5]=h*m+p*v+_*C,a[8]=h*u+p*y+_*w,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],f=t[8];return n*r*f-n*o*c-i*a*f+i*o*l+s*a*c-s*r*l}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],f=t[8],d=f*r-o*c,h=o*l-f*a,p=c*a-r*l,_=n*d+i*h+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/_;return t[0]=d*M,t[1]=(s*c-f*i)*M,t[2]=(o*i-s*r)*M,t[3]=h*M,t[4]=(f*n-s*l)*M,t[5]=(s*a-o*n)*M,t[6]=p*M,t[7]=(i*l-c*n)*M,t[8]=(r*n-i*a)*M,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,a,r,o){let l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-s*c,s*l,-s*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(t0.makeScale(t,n)),this}rotate(t){return this.premultiply(t0.makeRotation(-t)),this}translate(t,n){return this.premultiply(t0.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},t0=new Vt;function k0(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Pc(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function Q1(){let e=Pc("canvas");return e.style.display="block",e}var YM={};function rl(e){e in YM||(YM[e]=!0,console.warn(e))}function j1(e,t,n){return new Promise(function(i,s){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}var ZM=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),JM=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mw(){let e={enabled:!0,workingColorSpace:wr,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===de&&(s.r=Vs(s.r),s.g=Vs(s.g),s.b=Vs(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===de&&(s.r=sl(s.r),s.g=sl(s.g),s.b=sl(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ys?Oc:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return rl("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return rl("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,a)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[wr]:{primaries:t,whitePoint:i,transfer:Oc,toXYZ:ZM,fromXYZ:JM,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ai},outputColorSpaceConfig:{drawingBufferColorSpace:ai}},[ai]:{primaries:t,whitePoint:i,transfer:de,toXYZ:ZM,fromXYZ:JM,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ai}}}),e}var $t=Mw();function Vs(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function sl(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var qo,bf=class{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{qo===void 0&&(qo=Pc("canvas")),qo.width=t.width,qo.height=t.height;let s=qo.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=qo}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=Pc("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=Vs(a[r]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Vs(n[i]/255)*255):n[i]=Vs(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},bw=0,ol=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bw++}),this.uuid=tu(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(e0(s[r].image)):a.push(e0(s[r]))}else a=e0(s);i.url=a}return n||(t.images[this.uuid]=i),i}};function e0(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?bf.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ew=0,n0=new z,oi=class e extends ks{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=Oa,s=Oa,a=ki,r=Ha,o=Ai,l=ps,c=e.DEFAULT_ANISOTROPY,f=Ys){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ew++}),this.uuid=tu(),this.name="",this.source=new ol(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(n0).x}get height(){return this.source.getSize(n0).y}get depth(){return this.source.getSize(n0).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let n in t){let i=t[n];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==N0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case yf:t.x=t.x-Math.floor(t.x);break;case Oa:t.x=t.x<0?0:1;break;case xf:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case yf:t.y=t.y-Math.floor(t.y);break;case Oa:t.y=t.y<0?0:1;break;case xf:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};oi.DEFAULT_IMAGE=null;oi.DEFAULT_MAPPING=N0;oi.DEFAULT_ANISOTROPY=1;var Pe=class e{constructor(t=0,n=0,i=0,s=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*n+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*n+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*n+r[7]*i+r[11]*s+r[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,a,l=t.elements,c=l[0],f=l[4],d=l[8],h=l[1],p=l[5],_=l[9],M=l[2],m=l[6],u=l[10];if(Math.abs(f-h)<.01&&Math.abs(d-M)<.01&&Math.abs(_-m)<.01){if(Math.abs(f+h)<.1&&Math.abs(d+M)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let v=(c+1)/2,y=(p+1)/2,T=(u+1)/2,C=(f+h)/4,w=(d+M)/4,U=(_+m)/4;return v>y&&v>T?v<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(v),s=C/i,a=w/i):y>T?y<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(y),i=C/s,a=U/s):T<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(T),i=w/a,s=U/a),this.set(i,s,a,n),this}let g=Math.sqrt((m-_)*(m-_)+(d-M)*(d-M)+(h-f)*(h-f));return Math.abs(g)<.001&&(g=1),this.x=(m-_)/g,this.y=(d-M)/g,this.z=(h-f)/g,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Kt(this.x,t.x,n.x),this.y=Kt(this.y,t.y,n.y),this.z=Kt(this.z,t.z,n.z),this.w=Kt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=Kt(this.x,t,n),this.y=Kt(this.y,t,n),this.z=Kt(this.z,t,n),this.w=Kt(this.w,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Kt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ef=class extends ks{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ki,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Pe(0,0,t,n),this.scissorTest=!1,this.viewport=new Pe(0,0,t,n);let s={width:t,height:n,depth:i.depth},a=new oi(s);this.textures=[];let r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){let n={minFilter:ki,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let s=Object.assign({},t.textures[n].image);this.textures[n].source=new ol(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},us=class extends Ef{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},Bc=class extends oi{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=Ei,this.minFilter=Ei,this.wrapR=Oa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Tf=class extends oi{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=Ei,this.minFilter=Ei,this.wrapR=Oa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Pa=class{constructor(t=new z(1/0,1/0,1/0),n=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(Fi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(Fi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=Fi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let a=i.getAttribute("position");if(n===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,Fi):Fi.fromBufferAttribute(a,r),Fi.applyMatrix4(t.matrixWorld),this.expandByPoint(Fi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Qh.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Qh.copy(i.boundingBox)),Qh.applyMatrix4(t.matrixWorld),this.union(Qh)}let s=t.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Fi),Fi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Rc),jh.subVectors(this.max,Rc),Yo.subVectors(t.a,Rc),Zo.subVectors(t.b,Rc),Jo.subVectors(t.c,Rc),wa.subVectors(Zo,Yo),Ca.subVectors(Jo,Zo),yr.subVectors(Yo,Jo);let n=[0,-wa.z,wa.y,0,-Ca.z,Ca.y,0,-yr.z,yr.y,wa.z,0,-wa.x,Ca.z,0,-Ca.x,yr.z,0,-yr.x,-wa.y,wa.x,0,-Ca.y,Ca.x,0,-yr.y,yr.x,0];return!i0(n,Yo,Zo,Jo,jh)||(n=[1,0,0,0,1,0,0,0,1],!i0(n,Yo,Zo,Jo,jh))?!1:($h.crossVectors(wa,Ca),n=[$h.x,$h.y,$h.z],i0(n,Yo,Zo,Jo,jh))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Fi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Fi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ps[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ps[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ps[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ps[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ps[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ps[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ps[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ps[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ps),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ps=[new z,new z,new z,new z,new z,new z,new z,new z],Fi=new z,Qh=new Pa,Yo=new z,Zo=new z,Jo=new z,wa=new z,Ca=new z,yr=new z,Rc=new z,jh=new z,$h=new z,xr=new z;function i0(e,t,n,i,s){for(let a=0,r=e.length-3;a<=r;a+=3){xr.fromArray(e,a);let o=s.x*Math.abs(xr.x)+s.y*Math.abs(xr.y)+s.z*Math.abs(xr.z),l=t.dot(xr),c=n.dot(xr),f=i.dot(xr);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}var Tw=new Pa,Dc=new z,s0=new z,ll=class{constructor(t=new z,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):Tw.setFromPoints(t).getCenter(i);let s=0;for(let a=0,r=t.length;a<r;a++)s=Math.max(s,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Dc.subVectors(t,this.center);let n=Dc.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(Dc,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(s0.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Dc.copy(t.center).add(s0)),this.expandByPoint(Dc.copy(t.center).sub(s0))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Bs=new z,a0=new z,tf=new z,Ra=new z,r0=new z,ef=new z,o0=new z,Af=class{constructor(t=new z,n=new z(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Bs)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=Bs.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Bs.copy(this.origin).addScaledVector(this.direction,n),Bs.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){a0.copy(t).add(n).multiplyScalar(.5),tf.copy(n).sub(t).normalize(),Ra.copy(this.origin).sub(a0);let a=t.distanceTo(n)*.5,r=-this.direction.dot(tf),o=Ra.dot(this.direction),l=-Ra.dot(tf),c=Ra.lengthSq(),f=Math.abs(1-r*r),d,h,p,_;if(f>0)if(d=r*l-o,h=r*o-l,_=a*f,d>=0)if(h>=-_)if(h<=_){let M=1/f;d*=M,h*=M,p=d*(d+r*h+2*o)+h*(r*d+h+2*l)+c}else h=a,d=Math.max(0,-(r*h+o)),p=-d*d+h*(h+2*l)+c;else h=-a,d=Math.max(0,-(r*h+o)),p=-d*d+h*(h+2*l)+c;else h<=-_?(d=Math.max(0,-(-r*a+o)),h=d>0?-a:Math.min(Math.max(-a,-l),a),p=-d*d+h*(h+2*l)+c):h<=_?(d=0,h=Math.min(Math.max(-a,-l),a),p=h*(h+2*l)+c):(d=Math.max(0,-(r*a+o)),h=d>0?a:Math.min(Math.max(-a,-l),a),p=-d*d+h*(h+2*l)+c);else h=r>0?-a:a,d=Math.max(0,-(r*h+o)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(a0).addScaledVector(tf,h),p}intersectSphere(t,n){Bs.subVectors(t.center,this.origin);let i=Bs.dot(this.direction),s=Bs.dot(Bs)-i*i,a=t.radius*t.radius;if(s>a)return null;let r=Math.sqrt(a-s),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,a,r,o,l,c=1/this.direction.x,f=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),f>=0?(a=(t.min.y-h.y)*f,r=(t.max.y-h.y)*f):(a=(t.max.y-h.y)*f,r=(t.min.y-h.y)*f),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),d>=0?(o=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(o=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,Bs)!==null}intersectTriangle(t,n,i,s,a){r0.subVectors(n,t),ef.subVectors(i,t),o0.crossVectors(r0,ef);let r=this.direction.dot(o0),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Ra.subVectors(this.origin,t);let l=o*this.direction.dot(ef.crossVectors(Ra,ef));if(l<0)return null;let c=o*this.direction.dot(r0.cross(Ra));if(c<0||l+c>r)return null;let f=-o*Ra.dot(o0);return f<0?null:this.at(f/r,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ze=class e{constructor(t,n,i,s,a,r,o,l,c,f,d,h,p,_,M,m){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c,f,d,h,p,_,M,m)}set(t,n,i,s,a,r,o,l,c,f,d,h,p,_,M,m){let u=this.elements;return u[0]=t,u[4]=n,u[8]=i,u[12]=s,u[1]=a,u[5]=r,u[9]=o,u[13]=l,u[2]=c,u[6]=f,u[10]=d,u[14]=h,u[3]=p,u[7]=_,u[11]=M,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){let n=this.elements,i=t.elements,s=1/Ko.setFromMatrixColumn(t,0).length(),a=1/Ko.setFromMatrixColumn(t,1).length(),r=1/Ko.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,s=t.y,a=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),f=Math.cos(a),d=Math.sin(a);if(t.order==="XYZ"){let h=r*f,p=r*d,_=o*f,M=o*d;n[0]=l*f,n[4]=-l*d,n[8]=c,n[1]=p+_*c,n[5]=h-M*c,n[9]=-o*l,n[2]=M-h*c,n[6]=_+p*c,n[10]=r*l}else if(t.order==="YXZ"){let h=l*f,p=l*d,_=c*f,M=c*d;n[0]=h+M*o,n[4]=_*o-p,n[8]=r*c,n[1]=r*d,n[5]=r*f,n[9]=-o,n[2]=p*o-_,n[6]=M+h*o,n[10]=r*l}else if(t.order==="ZXY"){let h=l*f,p=l*d,_=c*f,M=c*d;n[0]=h-M*o,n[4]=-r*d,n[8]=_+p*o,n[1]=p+_*o,n[5]=r*f,n[9]=M-h*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){let h=r*f,p=r*d,_=o*f,M=o*d;n[0]=l*f,n[4]=_*c-p,n[8]=h*c+M,n[1]=l*d,n[5]=M*c+h,n[9]=p*c-_,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){let h=r*l,p=r*c,_=o*l,M=o*c;n[0]=l*f,n[4]=M-h*d,n[8]=_*d+p,n[1]=d,n[5]=r*f,n[9]=-o*f,n[2]=-c*f,n[6]=p*d+_,n[10]=h-M*d}else if(t.order==="XZY"){let h=r*l,p=r*c,_=o*l,M=o*c;n[0]=l*f,n[4]=-d,n[8]=c*f,n[1]=h*d+M,n[5]=r*f,n[9]=p*d-_,n[2]=_*d-p,n[6]=o*f,n[10]=M*d+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Aw,t,ww)}lookAt(t,n,i){let s=this.elements;return ii.subVectors(t,n),ii.lengthSq()===0&&(ii.z=1),ii.normalize(),Da.crossVectors(i,ii),Da.lengthSq()===0&&(Math.abs(i.z)===1?ii.x+=1e-4:ii.z+=1e-4,ii.normalize(),Da.crossVectors(i,ii)),Da.normalize(),nf.crossVectors(ii,Da),s[0]=Da.x,s[4]=nf.x,s[8]=ii.x,s[1]=Da.y,s[5]=nf.y,s[9]=ii.y,s[2]=Da.z,s[6]=nf.z,s[10]=ii.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],f=i[1],d=i[5],h=i[9],p=i[13],_=i[2],M=i[6],m=i[10],u=i[14],g=i[3],v=i[7],y=i[11],T=i[15],C=s[0],w=s[4],U=s[8],E=s[12],b=s[1],O=s[5],F=s[9],k=s[13],q=s[2],J=s[6],W=s[10],nt=s[14],H=s[3],ct=s[7],ft=s[11],Et=s[15];return a[0]=r*C+o*b+l*q+c*H,a[4]=r*w+o*O+l*J+c*ct,a[8]=r*U+o*F+l*W+c*ft,a[12]=r*E+o*k+l*nt+c*Et,a[1]=f*C+d*b+h*q+p*H,a[5]=f*w+d*O+h*J+p*ct,a[9]=f*U+d*F+h*W+p*ft,a[13]=f*E+d*k+h*nt+p*Et,a[2]=_*C+M*b+m*q+u*H,a[6]=_*w+M*O+m*J+u*ct,a[10]=_*U+M*F+m*W+u*ft,a[14]=_*E+M*k+m*nt+u*Et,a[3]=g*C+v*b+y*q+T*H,a[7]=g*w+v*O+y*J+T*ct,a[11]=g*U+v*F+y*W+T*ft,a[15]=g*E+v*k+y*nt+T*Et,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],s=t[8],a=t[12],r=t[1],o=t[5],l=t[9],c=t[13],f=t[2],d=t[6],h=t[10],p=t[14],_=t[3],M=t[7],m=t[11],u=t[15];return _*(+a*l*d-s*c*d-a*o*h+i*c*h+s*o*p-i*l*p)+M*(+n*l*p-n*c*h+a*r*h-s*r*p+s*c*f-a*l*f)+m*(+n*c*d-n*o*p-a*r*d+i*r*p+a*o*f-i*c*f)+u*(-s*o*f-n*l*d+n*o*h+s*r*d-i*r*h+i*l*f)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],f=t[8],d=t[9],h=t[10],p=t[11],_=t[12],M=t[13],m=t[14],u=t[15],g=d*m*c-M*h*c+M*l*p-o*m*p-d*l*u+o*h*u,v=_*h*c-f*m*c-_*l*p+r*m*p+f*l*u-r*h*u,y=f*M*c-_*d*c+_*o*p-r*M*p-f*o*u+r*d*u,T=_*d*l-f*M*l-_*o*h+r*M*h+f*o*m-r*d*m,C=n*g+i*v+s*y+a*T;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/C;return t[0]=g*w,t[1]=(M*h*a-d*m*a-M*s*p+i*m*p+d*s*u-i*h*u)*w,t[2]=(o*m*a-M*l*a+M*s*c-i*m*c-o*s*u+i*l*u)*w,t[3]=(d*l*a-o*h*a-d*s*c+i*h*c+o*s*p-i*l*p)*w,t[4]=v*w,t[5]=(f*m*a-_*h*a+_*s*p-n*m*p-f*s*u+n*h*u)*w,t[6]=(_*l*a-r*m*a-_*s*c+n*m*c+r*s*u-n*l*u)*w,t[7]=(r*h*a-f*l*a+f*s*c-n*h*c-r*s*p+n*l*p)*w,t[8]=y*w,t[9]=(_*d*a-f*M*a-_*i*p+n*M*p+f*i*u-n*d*u)*w,t[10]=(r*M*a-_*o*a+_*i*c-n*M*c-r*i*u+n*o*u)*w,t[11]=(f*o*a-r*d*a-f*i*c+n*d*c+r*i*p-n*o*p)*w,t[12]=T*w,t[13]=(f*M*s-_*d*s+_*i*h-n*M*h-f*i*m+n*d*m)*w,t[14]=(_*o*s-r*M*s-_*i*l+n*M*l+r*i*m-n*o*m)*w,t[15]=(r*d*s-f*o*s+f*i*l-n*d*l-r*i*h+n*o*h)*w,this}scale(t){let n=this.elements,i=t.x,s=t.y,a=t.z;return n[0]*=i,n[4]*=s,n[8]*=a,n[1]*=i,n[5]*=s,n[9]*=a,n[2]*=i,n[6]*=s,n[10]*=a,n[3]*=i,n[7]*=s,n[11]*=a,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),s=Math.sin(n),a=1-i,r=t.x,o=t.y,l=t.z,c=a*r,f=a*o;return this.set(c*r+i,c*o-s*l,c*l+s*o,0,c*o+s*l,f*o+i,f*l-s*r,0,c*l-s*o,f*l+s*r,a*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,a,r){return this.set(1,i,a,0,t,1,r,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){let s=this.elements,a=n._x,r=n._y,o=n._z,l=n._w,c=a+a,f=r+r,d=o+o,h=a*c,p=a*f,_=a*d,M=r*f,m=r*d,u=o*d,g=l*c,v=l*f,y=l*d,T=i.x,C=i.y,w=i.z;return s[0]=(1-(M+u))*T,s[1]=(p+y)*T,s[2]=(_-v)*T,s[3]=0,s[4]=(p-y)*C,s[5]=(1-(h+u))*C,s[6]=(m+g)*C,s[7]=0,s[8]=(_+v)*w,s[9]=(m-g)*w,s[10]=(1-(h+M))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){let s=this.elements,a=Ko.set(s[0],s[1],s[2]).length(),r=Ko.set(s[4],s[5],s[6]).length(),o=Ko.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),t.x=s[12],t.y=s[13],t.z=s[14],Hi.copy(this);let c=1/a,f=1/r,d=1/o;return Hi.elements[0]*=c,Hi.elements[1]*=c,Hi.elements[2]*=c,Hi.elements[4]*=f,Hi.elements[5]*=f,Hi.elements[6]*=f,Hi.elements[8]*=d,Hi.elements[9]*=d,Hi.elements[10]*=d,n.setFromRotationMatrix(Hi),i.x=a,i.y=r,i.z=o,this}makePerspective(t,n,i,s,a,r,o=Gi,l=!1){let c=this.elements,f=2*a/(n-t),d=2*a/(i-s),h=(n+t)/(n-t),p=(i+s)/(i-s),_,M;if(l)_=a/(r-a),M=r*a/(r-a);else if(o===Gi)_=-(r+a)/(r-a),M=-2*r*a/(r-a);else if(o===Ic)_=-r/(r-a),M=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,s,a,r,o=Gi,l=!1){let c=this.elements,f=2/(n-t),d=2/(i-s),h=-(n+t)/(n-t),p=-(i+s)/(i-s),_,M;if(l)_=1/(r-a),M=r/(r-a);else if(o===Gi)_=-2/(r-a),M=-(r+a)/(r-a);else if(o===Ic)_=-1/(r-a),M=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}},Ko=new z,Hi=new Ze,Aw=new z(0,0,0),ww=new z(1,1,1),Da=new z,nf=new z,ii=new z,KM=new Ze,QM=new Xs,hs=class e{constructor(t=0,n=0,i=0,s=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let s=t.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],f=s[9],d=s[2],h=s[6],p=s[10];switch(n){case"XYZ":this._y=Math.asin(Kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Kt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(Kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Kt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Kt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-f,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return KM.makeRotationFromQuaternion(t),this.setFromRotationMatrix(KM,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return QM.setFromEuler(this),this.setFromQuaternion(QM,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};hs.DEFAULT_ORDER="XYZ";var zc=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Cw=0,jM=new z,Qo=new Xs,zs=new Ze,sf=new z,Uc=new z,Rw=new z,Dw=new Xs,$M=new z(1,0,0),t1=new z(0,1,0),e1=new z(0,0,1),n1={type:"added"},Uw={type:"removed"},jo={type:"childadded",child:null},l0={type:"childremoved",child:null},Ti=class e extends ks{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cw++}),this.uuid=tu(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new z,n=new hs,i=new Xs,s=new z(1,1,1);function a(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ze},normalMatrix:{value:new Vt}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Qo.setFromAxisAngle(t,n),this.quaternion.multiply(Qo),this}rotateOnWorldAxis(t,n){return Qo.setFromAxisAngle(t,n),this.quaternion.premultiply(Qo),this}rotateX(t){return this.rotateOnAxis($M,t)}rotateY(t){return this.rotateOnAxis(t1,t)}rotateZ(t){return this.rotateOnAxis(e1,t)}translateOnAxis(t,n){return jM.copy(t).applyQuaternion(this.quaternion),this.position.add(jM.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis($M,t)}translateY(t){return this.translateOnAxis(t1,t)}translateZ(t){return this.translateOnAxis(e1,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(zs.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?sf.copy(t):sf.set(t,n,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Uc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zs.lookAt(Uc,sf,this.up):zs.lookAt(sf,Uc,this.up),this.quaternion.setFromRotationMatrix(zs),s&&(zs.extractRotation(s.matrixWorld),Qo.setFromRotationMatrix(zs),this.quaternion.premultiply(Qo.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(n1),jo.child=t,this.dispatchEvent(jo),jo.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(Uw),l0.child=t,this.dispatchEvent(l0),l0.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),zs.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),zs.multiply(t.parent.matrixWorld)),t.applyMatrix4(zs),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(n1),jo.child=t,this.dispatchEvent(jo),jo.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){let r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Uc,t,Rw),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Uc,Dw,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){let d=l[c];a(t.shapes,d)}else a(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(t.materials,this.material[l]));s.material=o}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(a(t.animations,l))}}if(n){let o=r(t.geometries),l=r(t.materials),c=r(t.textures),f=r(t.images),d=r(t.shapes),h=r(t.skeletons),p=r(t.animations),_=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=s,i;function r(o){let l=[];for(let c in o){let f=o[c];delete f.metadata,l.push(f)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Ti.DEFAULT_UP=new z(0,1,0);Ti.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ti.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Vi=new z,Fs=new z,c0=new z,Hs=new z,$o=new z,tl=new z,i1=new z,u0=new z,h0=new z,f0=new z,d0=new Pe,p0=new Pe,m0=new Pe,La=class e{constructor(t=new z,n=new z,i=new z){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),Vi.subVectors(t,n),s.cross(Vi);let a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,n,i,s,a){Vi.subVectors(s,n),Fs.subVectors(i,n),c0.subVectors(t,n);let r=Vi.dot(Vi),o=Vi.dot(Fs),l=Vi.dot(c0),c=Fs.dot(Fs),f=Fs.dot(c0),d=r*c-o*o;if(d===0)return a.set(0,0,0),null;let h=1/d,p=(c*l-o*f)*h,_=(r*f-o*l)*h;return a.set(1-p-_,_,p)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,Hs)===null?!1:Hs.x>=0&&Hs.y>=0&&Hs.x+Hs.y<=1}static getInterpolation(t,n,i,s,a,r,o,l){return this.getBarycoord(t,n,i,s,Hs)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Hs.x),l.addScaledVector(r,Hs.y),l.addScaledVector(o,Hs.z),l)}static getInterpolatedAttribute(t,n,i,s,a,r){return d0.setScalar(0),p0.setScalar(0),m0.setScalar(0),d0.fromBufferAttribute(t,n),p0.fromBufferAttribute(t,i),m0.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(d0,a.x),r.addScaledVector(p0,a.y),r.addScaledVector(m0,a.z),r}static isFrontFacing(t,n,i,s){return Vi.subVectors(i,n),Fs.subVectors(t,n),Vi.cross(Fs).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Vi.subVectors(this.c,this.b),Fs.subVectors(this.a,this.b),Vi.cross(Fs).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,a){return e.getInterpolation(t,this.a,this.b,this.c,n,i,s,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,s=this.b,a=this.c,r,o;$o.subVectors(s,i),tl.subVectors(a,i),u0.subVectors(t,i);let l=$o.dot(u0),c=tl.dot(u0);if(l<=0&&c<=0)return n.copy(i);h0.subVectors(t,s);let f=$o.dot(h0),d=tl.dot(h0);if(f>=0&&d<=f)return n.copy(s);let h=l*d-f*c;if(h<=0&&l>=0&&f<=0)return r=l/(l-f),n.copy(i).addScaledVector($o,r);f0.subVectors(t,a);let p=$o.dot(f0),_=tl.dot(f0);if(_>=0&&p<=_)return n.copy(a);let M=p*c-l*_;if(M<=0&&c>=0&&_<=0)return o=c/(c-_),n.copy(i).addScaledVector(tl,o);let m=f*_-p*d;if(m<=0&&d-f>=0&&p-_>=0)return i1.subVectors(a,s),o=(d-f)/(d-f+(p-_)),n.copy(s).addScaledVector(i1,o);let u=1/(m+M+h);return r=M*u,o=h*u,n.copy(i).addScaledVector($o,r).addScaledVector(tl,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},$1={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ua={h:0,s:0,l:0},af={h:0,s:0,l:0};function g0(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var re=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=ai){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=$t.workingColorSpace){return this.r=t,this.g=n,this.b=i,$t.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=$t.workingColorSpace){if(t=Sw(t,1),n=Kt(n,0,1),i=Kt(i,0,1),n===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+n):i+n-i*n,r=2*i-a;this.r=g0(r,a,t+1/3),this.g=g0(r,a,t),this.b=g0(r,a,t-1/3)}return $t.colorSpaceToWorking(this,s),this}setStyle(t,n=ai){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a,r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(a,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=ai){let i=$1[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Vs(t.r),this.g=Vs(t.g),this.b=Vs(t.b),this}copyLinearToSRGB(t){return this.r=sl(t.r),this.g=sl(t.g),this.b=sl(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ai){return $t.workingToColorSpace(vn.copy(this),t),Math.round(Kt(vn.r*255,0,255))*65536+Math.round(Kt(vn.g*255,0,255))*256+Math.round(Kt(vn.b*255,0,255))}getHexString(t=ai){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=$t.workingColorSpace){$t.workingToColorSpace(vn.copy(this),n);let i=vn.r,s=vn.g,a=vn.b,r=Math.max(i,s,a),o=Math.min(i,s,a),l,c,f=(o+r)/2;if(o===r)l=0,c=0;else{let d=r-o;switch(c=f<=.5?d/(r+o):d/(2-r-o),r){case i:l=(s-a)/d+(s<a?6:0);break;case s:l=(a-i)/d+2;break;case a:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=f,t}getRGB(t,n=$t.workingColorSpace){return $t.workingToColorSpace(vn.copy(this),n),t.r=vn.r,t.g=vn.g,t.b=vn.b,t}getStyle(t=ai){$t.workingToColorSpace(vn.copy(this),t);let n=vn.r,i=vn.g,s=vn.b;return t!==ai?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(Ua),this.setHSL(Ua.h+t,Ua.s+n,Ua.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(Ua),t.getHSL(af);let i=jg(Ua.h,af.h,n),s=jg(Ua.s,af.s,n),a=jg(Ua.l,af.l,n);return this.setHSL(i,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,s=this.b,a=t.elements;return this.r=a[0]*n+a[3]*i+a[6]*s,this.g=a[1]*n+a[4]*i+a[7]*s,this.b=a[2]*n+a[5]*i+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},vn=new re;re.NAMES=$1;var Nw=0,Cr=class extends ks{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nw++}),this.uuid=tu(),this.name="",this.type="Material",this.blending=Tr,this.side=Gs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_f,this.blendDst=vf,this.blendEquation=Ia,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new re(0,0,0),this.blendAlpha=0,this.depthFunc=Ar,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=b0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=br,this.stencilZFail=br,this.stencilZPass=br,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Tr&&(i.blending=this.blending),this.side!==Gs&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==_f&&(i.blendSrc=this.blendSrc),this.blendDst!==vf&&(i.blendDst=this.blendDst),this.blendEquation!==Ia&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ar&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==b0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==br&&(i.stencilFail=this.stencilFail),this.stencilZFail!==br&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==br&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){let r=[];for(let o in a){let l=a[o];delete l.metadata,r.push(l)}return r}if(n){let a=s(t.textures),r=s(t.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let s=n.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Fc=class extends Cr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hs,this.combine=U0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ge=new z,rf=new ae,Lw=0,ri=class{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Lw++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=E0,this.updateRanges=[],this.gpuType=ms,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)rf.fromBufferAttribute(this,n),rf.applyMatrix3(t),this.setXY(n,rf.x,rf.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ge.fromBufferAttribute(this,n),Ge.applyMatrix3(t),this.setXYZ(n,Ge.x,Ge.y,Ge.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Ge.fromBufferAttribute(this,n),Ge.applyMatrix4(t),this.setXYZ(n,Ge.x,Ge.y,Ge.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Ge.fromBufferAttribute(this,n),Ge.applyNormalMatrix(t),this.setXYZ(n,Ge.x,Ge.y,Ge.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Ge.fromBufferAttribute(this,n),Ge.transformDirection(t),this.setXYZ(n,Ge.x,Ge.y,Ge.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=Cc(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=Hn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Cc(n,this.array)),n}setX(t,n){return this.normalized&&(n=Hn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Cc(n,this.array)),n}setY(t,n){return this.normalized&&(n=Hn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Cc(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Hn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Cc(n,this.array)),n}setW(t,n){return this.normalized&&(n=Hn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=Hn(n,this.array),i=Hn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=Hn(n,this.array),i=Hn(i,this.array),s=Hn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,a){return t*=this.itemSize,this.normalized&&(n=Hn(n,this.array),i=Hn(i,this.array),s=Hn(s,this.array),a=Hn(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==E0&&(t.usage=this.usage),t}};var Hc=class extends ri{constructor(t,n,i){super(new Uint16Array(t),n,i)}};var Vc=class extends ri{constructor(t,n,i){super(new Uint32Array(t),n,i)}};var cs=class extends ri{constructor(t,n,i){super(new Float32Array(t),n,i)}},Ow=0,bi=new Ze,_0=new Ti,el=new z,si=new Pa,Nc=new Pa,en=new z,Ba=class e extends ks{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ow++}),this.uuid=tu(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(k0(t)?Vc:Hc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new Vt().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return bi.makeRotationFromQuaternion(t),this.applyMatrix4(bi),this}rotateX(t){return bi.makeRotationX(t),this.applyMatrix4(bi),this}rotateY(t){return bi.makeRotationY(t),this.applyMatrix4(bi),this}rotateZ(t){return bi.makeRotationZ(t),this.applyMatrix4(bi),this}translate(t,n,i){return bi.makeTranslation(t,n,i),this.applyMatrix4(bi),this}scale(t,n,i){return bi.makeScale(t,n,i),this.applyMatrix4(bi),this}lookAt(t){return _0.lookAt(t),_0.updateMatrix(),this.applyMatrix4(_0.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(el).negate(),this.translate(el.x,el.y,el.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let s=0,a=t.length;s<a;s++){let r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new cs(i,3))}else{let i=Math.min(t.length,n.count);for(let s=0;s<i;s++){let a=t[s];n.setXYZ(s,a.x,a.y,a.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pa);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){let a=n[i];si.setFromBufferAttribute(a),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,si.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,si.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(si.min),this.boundingBox.expandByPoint(si.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ll);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){let i=this.boundingSphere.center;if(si.setFromBufferAttribute(t),n)for(let a=0,r=n.length;a<r;a++){let o=n[a];Nc.setFromBufferAttribute(o),this.morphTargetsRelative?(en.addVectors(si.min,Nc.min),si.expandByPoint(en),en.addVectors(si.max,Nc.max),si.expandByPoint(en)):(si.expandByPoint(Nc.min),si.expandByPoint(Nc.max))}si.getCenter(i);let s=0;for(let a=0,r=t.count;a<r;a++)en.fromBufferAttribute(t,a),s=Math.max(s,i.distanceToSquared(en));if(n)for(let a=0,r=n.length;a<r;a++){let o=n[a],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)en.fromBufferAttribute(o,c),l&&(el.fromBufferAttribute(t,c),en.add(el)),s=Math.max(s,i.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,s=n.normal,a=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ri(new Float32Array(4*i.count),4));let r=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<i.count;U++)o[U]=new z,l[U]=new z;let c=new z,f=new z,d=new z,h=new ae,p=new ae,_=new ae,M=new z,m=new z;function u(U,E,b){c.fromBufferAttribute(i,U),f.fromBufferAttribute(i,E),d.fromBufferAttribute(i,b),h.fromBufferAttribute(a,U),p.fromBufferAttribute(a,E),_.fromBufferAttribute(a,b),f.sub(c),d.sub(c),p.sub(h),_.sub(h);let O=1/(p.x*_.y-_.x*p.y);isFinite(O)&&(M.copy(f).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(O),m.copy(d).multiplyScalar(p.x).addScaledVector(f,-_.x).multiplyScalar(O),o[U].add(M),o[E].add(M),o[b].add(M),l[U].add(m),l[E].add(m),l[b].add(m))}let g=this.groups;g.length===0&&(g=[{start:0,count:t.count}]);for(let U=0,E=g.length;U<E;++U){let b=g[U],O=b.start,F=b.count;for(let k=O,q=O+F;k<q;k+=3)u(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let v=new z,y=new z,T=new z,C=new z;function w(U){T.fromBufferAttribute(s,U),C.copy(T);let E=o[U];v.copy(E),v.sub(T.multiplyScalar(T.dot(E))).normalize(),y.crossVectors(C,E);let O=y.dot(l[U])<0?-1:1;r.setXYZW(U,v.x,v.y,v.z,O)}for(let U=0,E=g.length;U<E;++U){let b=g[U],O=b.start,F=b.count;for(let k=O,q=O+F;k<q;k+=3)w(t.getX(k+0)),w(t.getX(k+1)),w(t.getX(k+2))}}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ri(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);let s=new z,a=new z,r=new z,o=new z,l=new z,c=new z,f=new z,d=new z;if(t)for(let h=0,p=t.count;h<p;h+=3){let _=t.getX(h+0),M=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(n,_),a.fromBufferAttribute(n,M),r.fromBufferAttribute(n,m),f.subVectors(r,a),d.subVectors(s,a),f.cross(d),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,m),o.add(f),l.add(f),c.add(f),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=n.count;h<p;h+=3)s.fromBufferAttribute(n,h+0),a.fromBufferAttribute(n,h+1),r.fromBufferAttribute(n,h+2),f.subVectors(r,a),d.subVectors(s,a),f.cross(d),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)en.fromBufferAttribute(t,n),en.normalize(),t.setXYZ(n,en.x,en.y,en.z)}toNonIndexed(){function t(o,l){let c=o.array,f=o.itemSize,d=o.normalized,h=new c.constructor(l.length*f),p=0,_=0;for(let M=0,m=l.length;M<m;M++){o.isInterleavedBufferAttribute?p=l[M]*o.data.stride+o.offset:p=l[M]*f;for(let u=0;u<f;u++)h[_++]=c[p++]}return new ri(h,f,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);n.setAttribute(o,c)}let a=this.morphAttributes;for(let o in a){let l=[],c=a[o];for(let f=0,d=c.length;f<d;f++){let h=c[f],p=t(h,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,l=r.length;o<l;o++){let c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},a=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],f=[];for(let d=0,h=c.length;d<h;d++){let p=c[d];f.push(p.toJSON(t.data))}f.length>0&&(s[l]=f,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let f=s[c];this.setAttribute(c,f.clone(n))}let a=t.morphAttributes;for(let c in a){let f=[],d=a[c];for(let h=0,p=d.length;h<p;h++)f.push(d[h].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let c=0,f=r.length;c<f;c++){let d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},s1=new Ze,Sr=new Af,of=new ll,a1=new z,lf=new z,cf=new z,uf=new z,v0=new z,hf=new z,r1=new z,ff=new z,Gn=class extends Ti{constructor(t=new Ba,n=new Fc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){let o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,n){let i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(a&&o){hf.set(0,0,0);for(let l=0,c=a.length;l<c;l++){let f=o[l],d=a[l];f!==0&&(v0.fromBufferAttribute(d,t),r?hf.addScaledVector(v0,f):hf.addScaledVector(v0.sub(n),f))}n.add(hf)}return n}raycast(t,n){let i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),of.copy(i.boundingSphere),of.applyMatrix4(a),Sr.copy(t.ray).recast(t.near),!(of.containsPoint(Sr.origin)===!1&&(Sr.intersectSphere(of,a1)===null||Sr.origin.distanceToSquared(a1)>(t.far-t.near)**2))&&(s1.copy(a).invert(),Sr.copy(t.ray).applyMatrix4(s1),!(i.boundingBox!==null&&Sr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Sr)))}_computeIntersections(t,n,i){let s,a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,f=a.attributes.uv1,d=a.attributes.normal,h=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(r))for(let _=0,M=h.length;_<M;_++){let m=h[_],u=r[m.materialIndex],g=Math.max(m.start,p.start),v=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=g,T=v;y<T;y+=3){let C=o.getX(y),w=o.getX(y+1),U=o.getX(y+2);s=df(this,u,t,i,c,f,d,C,w,U),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{let _=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let m=_,u=M;m<u;m+=3){let g=o.getX(m),v=o.getX(m+1),y=o.getX(m+2);s=df(this,r,t,i,c,f,d,g,v,y),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let _=0,M=h.length;_<M;_++){let m=h[_],u=r[m.materialIndex],g=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=g,T=v;y<T;y+=3){let C=y,w=y+1,U=y+2;s=df(this,u,t,i,c,f,d,C,w,U),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{let _=Math.max(0,p.start),M=Math.min(l.count,p.start+p.count);for(let m=_,u=M;m<u;m+=3){let g=m,v=m+1,y=m+2;s=df(this,r,t,i,c,f,d,g,v,y),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}}};function Iw(e,t,n,i,s,a,r,o){let l;if(t.side===wn?l=i.intersectTriangle(r,a,s,!0,o):l=i.intersectTriangle(s,a,r,t.side===Gs,o),l===null)return null;ff.copy(o),ff.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(ff);return c<n.near||c>n.far?null:{distance:c,point:ff.clone(),object:e}}function df(e,t,n,i,s,a,r,o,l,c){e.getVertexPosition(o,lf),e.getVertexPosition(l,cf),e.getVertexPosition(c,uf);let f=Iw(e,t,n,i,lf,cf,uf,r1);if(f){let d=new z;La.getBarycoord(r1,lf,cf,uf,d),s&&(f.uv=La.getInterpolatedAttribute(s,o,l,c,d,new ae)),a&&(f.uv1=La.getInterpolatedAttribute(a,o,l,c,d,new ae)),r&&(f.normal=La.getInterpolatedAttribute(r,o,l,c,d,new z),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new z,materialIndex:0};La.getNormal(lf,cf,uf,h.normal),f.face=h,f.barycoord=d}return f}var cl=class e extends Ba{constructor(t=1,n=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};let o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);let l=[],c=[],f=[],d=[],h=0,p=0;_("z","y","x",-1,-1,i,n,t,r,a,0),_("z","y","x",1,-1,i,n,-t,r,a,1),_("x","z","y",1,1,t,i,n,s,r,2),_("x","z","y",1,-1,t,i,-n,s,r,3),_("x","y","z",1,-1,t,n,i,s,a,4),_("x","y","z",-1,-1,t,n,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new cs(c,3)),this.setAttribute("normal",new cs(f,3)),this.setAttribute("uv",new cs(d,2));function _(M,m,u,g,v,y,T,C,w,U,E){let b=y/w,O=T/U,F=y/2,k=T/2,q=C/2,J=w+1,W=U+1,nt=0,H=0,ct=new z;for(let ft=0;ft<W;ft++){let Et=ft*O-k;for(let Gt=0;Gt<J;Gt++){let le=Gt*b-F;ct[M]=le*g,ct[m]=Et*v,ct[u]=q,c.push(ct.x,ct.y,ct.z),ct[M]=0,ct[m]=0,ct[u]=C>0?1:-1,f.push(ct.x,ct.y,ct.z),d.push(Gt/w),d.push(1-ft/U),nt+=1}}for(let ft=0;ft<U;ft++)for(let Et=0;Et<w;Et++){let Gt=h+Et+J*ft,le=h+Et+J*(ft+1),pe=h+(Et+1)+J*(ft+1),Jt=h+(Et+1)+J*ft;l.push(Gt,le,Jt),l.push(le,pe,Jt),H+=6}o.addGroup(p,H,E),p+=H,h+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Or(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let s=e[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone():Array.isArray(s)?t[n][i]=s.slice():t[n][i]=s}}return t}function yn(e){let t={};for(let n=0;n<e.length;n++){let i=Or(e[n]);for(let s in i)t[s]=i[s]}return t}function Pw(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function X0(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}var tb={clone:Or,merge:yn},Bw=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zw=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,li=class extends Cr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bw,this.fragmentShader=zw,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Or(t.uniforms),this.uniformsGroups=Pw(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let s in this.uniforms){let r=this.uniforms[s].value;r&&r.isTexture?n.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[s]={type:"m4",value:r.toArray()}:n.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}},Rr=class extends Ti{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=Gi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Na=new z,o1=new ae,l1=new ae,Vn=class extends Rr{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=Mf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Qg*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Mf*2*Math.atan(Math.tan(Qg*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){Na.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Na.x,Na.y).multiplyScalar(-t/Na.z),Na.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Na.x,Na.y).multiplyScalar(-t/Na.z)}getViewSize(t,n){return this.getViewBounds(t,o1,l1),n.subVectors(l1,o1)}setViewOffset(t,n,i,s,a,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(Qg*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,a=-.5*s,r=this.view;if(this.view!==null&&this.view.enabled){let l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,n-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}let o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}},nl=-90,il=1,wf=class extends Ti{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Vn(nl,il,t,n);s.layers=this.layers,this.add(s);let a=new Vn(nl,il,t,n);a.layers=this.layers,this.add(a);let r=new Vn(nl,il,t,n);r.layers=this.layers,this.add(r);let o=new Vn(nl,il,t,n);o.layers=this.layers,this.add(o);let l=new Vn(nl,il,t,n);l.layers=this.layers,this.add(l);let c=new Vn(nl,il,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,s,a,r,o,l]=n;for(let c of n)this.remove(c);if(t===Gi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ic)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[a,r,o,l,c,f]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(n,a),t.setRenderTarget(i,1,s),t.render(n,r),t.setRenderTarget(i,2,s),t.render(n,o),t.setRenderTarget(i,3,s),t.render(n,l),t.setRenderTarget(i,4,s),t.render(n,c),i.texture.generateMipmaps=M,t.setRenderTarget(i,5,s),t.render(n,f),t.setRenderTarget(d,h,p),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}},Gc=class extends oi{constructor(t=[],n=Nr,i,s,a,r,o,l,c,f){super(t,n,i,s,a,r,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Cf=class extends us{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Gc(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new cl(5,5,5),a=new li({name:"CubemapFromEquirect",uniforms:Or(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:wn,blending:Ws});a.uniforms.tEquirect.value=n;let r=new Gn(s,a),o=n.minFilter;return n.minFilter===Ha&&(n.minFilter=ki),new wf(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){let a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,s);t.setRenderTarget(a)}},Er=class extends Ti{constructor(){super(),this.isGroup=!0,this.type="Group"}},Fw={type:"move"},ul=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Er,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Er,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Er,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,a=null,r=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(let M of t.hand.values()){let m=n.getJointPose(M,i),u=this._getHandJoint(c,M);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}let f=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=f.position.distanceTo(d.position),p=.02,_=.005;c.inputState.pinching&&h>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(a=n.getPose(t.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Fw)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new Er;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}};var kc=class extends Ti{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hs,this.environmentIntensity=1,this.environmentRotation=new hs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}};var y0=new z,Hw=new z,Vw=new Vt,ls=class{constructor(t=new z(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let s=y0.subVectors(i,n).cross(Hw.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){let i=t.delta(y0),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:n.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||Vw.getNormalMatrix(t),s=this.coplanarPoint(y0).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Mr=new ll,Gw=new ae(.5,.5),pf=new z,Xc=class{constructor(t=new ls,n=new ls,i=new ls,s=new ls,a=new ls,r=new ls){this.planes=[t,n,i,s,a,r]}set(t,n,i,s,a,r){let o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Gi,i=!1){let s=this.planes,a=t.elements,r=a[0],o=a[1],l=a[2],c=a[3],f=a[4],d=a[5],h=a[6],p=a[7],_=a[8],M=a[9],m=a[10],u=a[11],g=a[12],v=a[13],y=a[14],T=a[15];if(s[0].setComponents(c-r,p-f,u-_,T-g).normalize(),s[1].setComponents(c+r,p+f,u+_,T+g).normalize(),s[2].setComponents(c+o,p+d,u+M,T+v).normalize(),s[3].setComponents(c-o,p-d,u-M,T-v).normalize(),i)s[4].setComponents(l,h,m,y).normalize(),s[5].setComponents(c-l,p-h,u-m,T-y).normalize();else if(s[4].setComponents(c-l,p-h,u-m,T-y).normalize(),n===Gi)s[5].setComponents(c+l,p+h,u+m,T+y).normalize();else if(n===Ic)s[5].setComponents(l,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Mr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Mr.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Mr)}intersectsSprite(t){Mr.center.set(0,0,0);let n=Gw.distanceTo(t.center);return Mr.radius=.7071067811865476+n,Mr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Mr)}intersectsSphere(t){let n=this.planes,i=t.center,s=-t.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let s=n[i];if(pf.x=s.normal.x>0?t.max.x:t.min.x,pf.y=s.normal.y>0?t.max.y:t.min.y,pf.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(pf)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Wc=class extends oi{constructor(t,n,i=Va,s,a,r,o=Ei,l=Ei,c,f=al,d=1){if(f!==al&&f!==pl)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:n,depth:d};super(h,s,a,r,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ol(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},qc=class extends oi{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var Dr=class e extends Ba{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};let a=t/2,r=n/2,o=Math.floor(i),l=Math.floor(s),c=o+1,f=l+1,d=t/o,h=n/l,p=[],_=[],M=[],m=[];for(let u=0;u<f;u++){let g=u*h-r;for(let v=0;v<c;v++){let y=v*d-a;_.push(y,-g,0),M.push(0,0,1),m.push(v/o),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let g=0;g<o;g++){let v=g+c*u,y=g+c*(u+1),T=g+1+c*(u+1),C=g+1+c*u;p.push(v,y,C),p.push(y,T,C)}this.setIndex(p),this.setAttribute("position",new cs(_,3)),this.setAttribute("normal",new cs(M,3)),this.setAttribute("uv",new cs(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};var Rf=class extends Cr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=H1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Df=class extends Cr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function mf(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function kw(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var Ur=class{constructor(t,n,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,s=n[i],a=n[i-1];t:{e:{let r;n:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<a)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(a=s,s=n[++i],t<s)break e}r=n.length;break n}if(!(t>=a)){let o=n[1];t<o&&(i=2,a=o);for(let l=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=a,a=n[--i-1],t>=a)break e}r=i,i=0;break n}break t}for(;i<r;){let o=i+r>>>1;t<n[o]?r=o:i=o+1}if(s=n[i],a=n[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,s)}return this.interpolate_(i,a,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,s=this.valueSize,a=t*s;for(let r=0;r!==s;++r)n[r]=i[a+r];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Uf=class extends Ur{constructor(t,n,i,s){super(t,n,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:x0,endingEnd:x0}}intervalChanged_(t,n,i){let s=this.parameterPositions,a=t-2,r=t+1,o=s[a],l=s[r];if(o===void 0)switch(this.getSettings_().endingStart){case S0:a=t,o=2*n-i;break;case M0:a=s.length-2,o=n+s[a]-s[a+1];break;default:a=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case S0:r=t,l=2*i-n;break;case M0:r=1,l=i+s[1]-s[0];break;default:r=t-1,l=n}let c=(i-n)*.5,f=this.valueSize;this._weightPrev=c/(n-o),this._weightNext=c/(l-i),this._offsetPrev=a*f,this._offsetNext=r*f}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,f=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,p=this._weightNext,_=(i-n)/(s-n),M=_*_,m=M*_,u=-h*m+2*h*M-h*_,g=(1+h)*m+(-1.5-2*h)*M+(-.5+h)*_+1,v=(-1-p)*m+(1.5+p)*M+.5*_,y=p*m-p*M;for(let T=0;T!==o;++T)a[T]=u*r[f+T]+g*r[c+T]+v*r[l+T]+y*r[d+T];return a}},Nf=class extends Ur{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,f=(i-n)/(s-n),d=1-f;for(let h=0;h!==o;++h)a[h]=r[c+h]*d+r[l+h]*f;return a}},Lf=class extends Ur{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},ci=class{constructor(t,n,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=mf(n,this.TimeBufferType),this.values=mf(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:mf(t.times,Array),values:mf(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Lf(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Nf(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Uf(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let n;switch(t){case Lc:n=this.InterpolantFactoryMethodDiscrete;break;case Sf:n=this.InterpolantFactoryMethodLinear;break;case gf:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Lc;case this.InterpolantFactoryMethodLinear:return Sf;case this.InterpolantFactoryMethodSmooth:return gf}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]*=t}return this}trim(t,n){let i=this.times,s=i.length,a=0,r=s-1;for(;a!==s&&i[a]<t;)++a;for(;r!==-1&&i[r]>n;)--r;if(++r,a!==0||r!==s){a>=r&&(r=Math.max(r,1),a=r-1);let o=this.getValueSize();this.times=i.slice(a,r),this.values=this.values.slice(a*o,r*o)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,a=i.length;a===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let o=0;o!==a;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(r!==null&&r>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,r),t=!1;break}r=l}if(s!==void 0&&kw(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===gf,a=t.length-1,r=1;for(let o=1;o<a;++o){let l=!1,c=t[o],f=t[o+1];if(c!==f&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*i,h=d-i,p=d+i;for(let _=0;_!==i;++_){let M=n[d+_];if(M!==n[h+_]||M!==n[p+_]){l=!0;break}}}if(l){if(o!==r){t[r]=t[o];let d=o*i,h=r*i;for(let p=0;p!==i;++p)n[h+p]=n[d+p]}++r}}if(a>0){t[r]=t[a];for(let o=a*i,l=r*i,c=0;c!==i;++c)n[l+c]=n[o+c];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=n.slice(0,r*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,s=new i(this.name,t,n);return s.createInterpolant=this.createInterpolant,s}};ci.prototype.ValueTypeName="";ci.prototype.TimeBufferType=Float32Array;ci.prototype.ValueBufferType=Float32Array;ci.prototype.DefaultInterpolation=Sf;var za=class extends ci{constructor(t,n,i){super(t,n,i)}};za.prototype.ValueTypeName="bool";za.prototype.ValueBufferType=Array;za.prototype.DefaultInterpolation=Lc;za.prototype.InterpolantFactoryMethodLinear=void 0;za.prototype.InterpolantFactoryMethodSmooth=void 0;var Of=class extends ci{constructor(t,n,i,s){super(t,n,i,s)}};Of.prototype.ValueTypeName="color";var If=class extends ci{constructor(t,n,i,s){super(t,n,i,s)}};If.prototype.ValueTypeName="number";var Pf=class extends Ur{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-n)/(s-n),c=t*o;for(let f=c+o;c!==f;c+=4)Xs.slerpFlat(a,0,r,c-o,r,c,l);return a}},Yc=class extends ci{constructor(t,n,i,s){super(t,n,i,s)}InterpolantFactoryMethodLinear(t){return new Pf(this.times,this.values,this.getValueSize(),t)}};Yc.prototype.ValueTypeName="quaternion";Yc.prototype.InterpolantFactoryMethodSmooth=void 0;var Fa=class extends ci{constructor(t,n,i){super(t,n,i)}};Fa.prototype.ValueTypeName="string";Fa.prototype.ValueBufferType=Array;Fa.prototype.DefaultInterpolation=Lc;Fa.prototype.InterpolantFactoryMethodLinear=void 0;Fa.prototype.InterpolantFactoryMethodSmooth=void 0;var Bf=class extends ci{constructor(t,n,i,s){super(t,n,i,s)}};Bf.prototype.ValueTypeName="vector";var zf=class{constructor(t,n,i){let s=this,a=!1,r=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this.abortController=new AbortController,this.itemStart=function(f){o++,a===!1&&s.onStart!==void 0&&s.onStart(f,r,o),a=!0},this.itemEnd=function(f){r++,s.onProgress!==void 0&&s.onProgress(f,r,o),r===o&&(a=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(f){s.onError!==void 0&&s.onError(f)},this.resolveURL=function(f){return l?l(f):f},this.setURLModifier=function(f){return l=f,this},this.addHandler=function(f,d){return c.push(f,d),this},this.removeHandler=function(f){let d=c.indexOf(f);return d!==-1&&c.splice(d,2),this},this.getHandler=function(f){for(let d=0,h=c.length;d<h;d+=2){let p=c[d],_=c[d+1];if(p.global&&(p.lastIndex=0),p.test(f))return _}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},eb=new zf,Ff=class{constructor(t){this.manager=t!==void 0?t:eb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,n){let i=this;return new Promise(function(s,a){i.load(t,s,n,a)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ff.DEFAULT_MATERIAL_NAME="__DEFAULT";var Hf=class extends Rr{constructor(t=-1,n=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,a=i-t,r=i+t,o=s+n,l=s-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}};var Vf=class extends Vn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var W0="\\[\\]\\.:\\/",Xw=new RegExp("["+W0+"]","g"),q0="[^"+W0+"]",Ww="[^"+W0.replace("\\.","")+"]",qw=/((?:WC+[\/:])*)/.source.replace("WC",q0),Yw=/(WCOD+)?/.source.replace("WCOD",Ww),Zw=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",q0),Jw=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",q0),Kw=new RegExp("^"+qw+Yw+Zw+Jw+"$"),Qw=["material","materials","bones","map"],T0=class{constructor(t,n,i){let s=i||Re.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,s)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,a=i.length;s!==a;++s)i[s].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},Re=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Xw,"")}static parseTrackName(t){let n=Kw.exec(t);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let a=i.nodeName.substring(s+1);Qw.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(a){for(let r=0;r<a.length;r++){let o=a[r];if(o.name===n||o.uuid===n)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)t[n++]=i[s]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,s=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let f=0;f<t.length;f++)if(t[f].name===c){c=f;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let r=t[s];if(r===void 0){let c=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(a!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=a}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Re.Composite=T0;Re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Re.prototype.GetterByBindingType=[Re.prototype._getValue_direct,Re.prototype._getValue_array,Re.prototype._getValue_arrayElement,Re.prototype._getValue_toArray];Re.prototype.SetterByBindingTypeAndVersioning=[[Re.prototype._setValue_direct,Re.prototype._setValue_direct_setNeedsUpdate,Re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_array,Re.prototype._setValue_array_setNeedsUpdate,Re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_arrayElement,Re.prototype._setValue_arrayElement_setNeedsUpdate,Re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_fromArray,Re.prototype._setValue_fromArray_setNeedsUpdate,Re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var nU=new Float32Array(1);function Y0(e,t,n,i){let s=jw(i);switch(n){case B0:return e*t;case F0:return e*t/s.components*s.byteLength;case ed:return e*t/s.components*s.byteLength;case H0:return e*t*2/s.components*s.byteLength;case nd:return e*t*2/s.components*s.byteLength;case z0:return e*t*3/s.components*s.byteLength;case Ai:return e*t*4/s.components*s.byteLength;case id:return e*t*4/s.components*s.byteLength;case Kc:case Qc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case jc:case $c:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ad:case od:return Math.max(e,16)*Math.max(t,8)/4;case sd:case rd:return Math.max(e,8)*Math.max(t,8)/2;case ld:case cd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ud:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case hd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case fd:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case dd:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case pd:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case md:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case gd:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case _d:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case vd:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case yd:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case xd:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Sd:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Md:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case bd:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Ed:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Td:case Ad:case wd:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Cd:case Rd:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Dd:case Ud:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function jw(e){switch(e){case ps:case L0:return{byteLength:1,components:1};case hl:case O0:case fl:return{byteLength:2,components:1};case $f:case td:return{byteLength:2,components:4};case Va:case jf:case ms:return{byteLength:4,components:1};case I0:case P0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Tb(){let e=null,t=!1,n=null,i=null;function s(a,r){n(a,r),i=e.requestAnimationFrame(s)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){n=a},setContext:function(a){e=a}}}function tC(e){let t=new WeakMap;function n(o,l){let c=o.array,f=o.usage,d=c.byteLength,h=e.createBuffer();e.bindBuffer(l,h),e.bufferData(l,c,f),o.onUploadCallback();let p;if(c instanceof Float32Array)p=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=e.SHORT;else if(c instanceof Uint32Array)p=e.UNSIGNED_INT;else if(c instanceof Int32Array)p=e.INT;else if(c instanceof Int8Array)p=e.BYTE;else if(c instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let f=l.array,d=l.updateRanges;if(e.bindBuffer(c,o),d.length===0)e.bufferSubData(c,0,f);else{d.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<d.length;p++){let _=d[h],M=d[p];M.start<=_.start+_.count+1?_.count=Math.max(_.count,M.start+M.count-_.start):(++h,d[h]=M)}d.length=h+1;for(let p=0,_=d.length;p<_;p++){let M=d[p];e.bufferSubData(c,M.start*f.BYTES_PER_ELEMENT,f,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let f=t.get(o);(!f||f.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}var eC=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nC=`#ifdef USE_ALPHAHASH
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
#endif`,iC=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sC=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,aC=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rC=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,oC=`#ifdef USE_AOMAP
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
#endif`,lC=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cC=`#ifdef USE_BATCHING
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
#endif`,uC=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hC=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fC=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dC=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,pC=`#ifdef USE_IRIDESCENCE
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
#endif`,mC=`#ifdef USE_BUMPMAP
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
#endif`,gC=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,_C=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yC=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xC=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,SC=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,MC=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,bC=`#if defined( USE_COLOR_ALPHA )
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
#endif`,EC=`#define PI 3.141592653589793
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
} // validated`,TC=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,AC=`vec3 transformedNormal = objectNormal;
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
#endif`,wC=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,CC=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,RC=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,DC=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,UC="gl_FragColor = linearToOutputTexel( gl_FragColor );",NC=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,LC=`#ifdef USE_ENVMAP
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
#endif`,OC=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,IC=`#ifdef USE_ENVMAP
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
#endif`,PC=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,BC=`#ifdef USE_ENVMAP
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
#endif`,zC=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,FC=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,HC=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,VC=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,GC=`#ifdef USE_GRADIENTMAP
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
}`,kC=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,XC=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,WC=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qC=`uniform bool receiveShadow;
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
#endif`,YC=`#ifdef USE_ENVMAP
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
#endif`,ZC=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,JC=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,KC=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,QC=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jC=`PhysicalMaterial material;
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
#endif`,$C=`struct PhysicalMaterial {
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
}`,tR=`
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
#endif`,eR=`#if defined( RE_IndirectDiffuse )
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
#endif`,nR=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,iR=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sR=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,aR=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rR=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,oR=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lR=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cR=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,uR=`#if defined( USE_POINTS_UV )
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
#endif`,hR=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fR=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dR=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pR=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mR=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gR=`#ifdef USE_MORPHTARGETS
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
#endif`,_R=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vR=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,yR=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,xR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,SR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,MR=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bR=`#ifdef USE_NORMALMAP
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
#endif`,ER=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,TR=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,AR=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wR=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,CR=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,RR=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,DR=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,UR=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,NR=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,LR=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,OR=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,IR=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,PR=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,BR=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zR=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,FR=`float getShadowMask() {
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
}`,HR=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,VR=`#ifdef USE_SKINNING
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
#endif`,GR=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kR=`#ifdef USE_SKINNING
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
#endif`,XR=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,WR=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qR=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,YR=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ZR=`#ifdef USE_TRANSMISSION
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
#endif`,JR=`#ifdef USE_TRANSMISSION
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
#endif`,KR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,QR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$R=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,t2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,e2=`uniform sampler2D t2D;
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
}`,n2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,i2=`#ifdef ENVMAP_TYPE_CUBE
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
}`,s2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,a2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r2=`#include <common>
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
}`,o2=`#if DEPTH_PACKING == 3200
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
}`,l2=`#define DISTANCE
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
}`,c2=`#define DISTANCE
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
}`,u2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,h2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f2=`uniform float scale;
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
}`,d2=`uniform vec3 diffuse;
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
}`,p2=`#include <common>
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
}`,m2=`uniform vec3 diffuse;
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
}`,g2=`#define LAMBERT
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
}`,_2=`#define LAMBERT
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
}`,v2=`#define MATCAP
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
}`,y2=`#define MATCAP
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
}`,x2=`#define NORMAL
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
}`,S2=`#define NORMAL
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
}`,M2=`#define PHONG
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
}`,b2=`#define PHONG
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
}`,E2=`#define STANDARD
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
}`,T2=`#define STANDARD
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
}`,A2=`#define TOON
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
}`,w2=`#define TOON
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
}`,C2=`uniform float size;
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
}`,R2=`uniform vec3 diffuse;
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
}`,D2=`#include <common>
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
}`,U2=`uniform vec3 color;
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
}`,N2=`uniform float rotation;
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
}`,L2=`uniform vec3 diffuse;
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
}`,kt={alphahash_fragment:eC,alphahash_pars_fragment:nC,alphamap_fragment:iC,alphamap_pars_fragment:sC,alphatest_fragment:aC,alphatest_pars_fragment:rC,aomap_fragment:oC,aomap_pars_fragment:lC,batching_pars_vertex:cC,batching_vertex:uC,begin_vertex:hC,beginnormal_vertex:fC,bsdfs:dC,iridescence_fragment:pC,bumpmap_pars_fragment:mC,clipping_planes_fragment:gC,clipping_planes_pars_fragment:_C,clipping_planes_pars_vertex:vC,clipping_planes_vertex:yC,color_fragment:xC,color_pars_fragment:SC,color_pars_vertex:MC,color_vertex:bC,common:EC,cube_uv_reflection_fragment:TC,defaultnormal_vertex:AC,displacementmap_pars_vertex:wC,displacementmap_vertex:CC,emissivemap_fragment:RC,emissivemap_pars_fragment:DC,colorspace_fragment:UC,colorspace_pars_fragment:NC,envmap_fragment:LC,envmap_common_pars_fragment:OC,envmap_pars_fragment:IC,envmap_pars_vertex:PC,envmap_physical_pars_fragment:YC,envmap_vertex:BC,fog_vertex:zC,fog_pars_vertex:FC,fog_fragment:HC,fog_pars_fragment:VC,gradientmap_pars_fragment:GC,lightmap_pars_fragment:kC,lights_lambert_fragment:XC,lights_lambert_pars_fragment:WC,lights_pars_begin:qC,lights_toon_fragment:ZC,lights_toon_pars_fragment:JC,lights_phong_fragment:KC,lights_phong_pars_fragment:QC,lights_physical_fragment:jC,lights_physical_pars_fragment:$C,lights_fragment_begin:tR,lights_fragment_maps:eR,lights_fragment_end:nR,logdepthbuf_fragment:iR,logdepthbuf_pars_fragment:sR,logdepthbuf_pars_vertex:aR,logdepthbuf_vertex:rR,map_fragment:oR,map_pars_fragment:lR,map_particle_fragment:cR,map_particle_pars_fragment:uR,metalnessmap_fragment:hR,metalnessmap_pars_fragment:fR,morphinstance_vertex:dR,morphcolor_vertex:pR,morphnormal_vertex:mR,morphtarget_pars_vertex:gR,morphtarget_vertex:_R,normal_fragment_begin:vR,normal_fragment_maps:yR,normal_pars_fragment:xR,normal_pars_vertex:SR,normal_vertex:MR,normalmap_pars_fragment:bR,clearcoat_normal_fragment_begin:ER,clearcoat_normal_fragment_maps:TR,clearcoat_pars_fragment:AR,iridescence_pars_fragment:wR,opaque_fragment:CR,packing:RR,premultiplied_alpha_fragment:DR,project_vertex:UR,dithering_fragment:NR,dithering_pars_fragment:LR,roughnessmap_fragment:OR,roughnessmap_pars_fragment:IR,shadowmap_pars_fragment:PR,shadowmap_pars_vertex:BR,shadowmap_vertex:zR,shadowmask_pars_fragment:FR,skinbase_vertex:HR,skinning_pars_vertex:VR,skinning_vertex:GR,skinnormal_vertex:kR,specularmap_fragment:XR,specularmap_pars_fragment:WR,tonemapping_fragment:qR,tonemapping_pars_fragment:YR,transmission_fragment:ZR,transmission_pars_fragment:JR,uv_pars_fragment:KR,uv_pars_vertex:QR,uv_vertex:jR,worldpos_vertex:$R,background_vert:t2,background_frag:e2,backgroundCube_vert:n2,backgroundCube_frag:i2,cube_vert:s2,cube_frag:a2,depth_vert:r2,depth_frag:o2,distanceRGBA_vert:l2,distanceRGBA_frag:c2,equirect_vert:u2,equirect_frag:h2,linedashed_vert:f2,linedashed_frag:d2,meshbasic_vert:p2,meshbasic_frag:m2,meshlambert_vert:g2,meshlambert_frag:_2,meshmatcap_vert:v2,meshmatcap_frag:y2,meshnormal_vert:x2,meshnormal_frag:S2,meshphong_vert:M2,meshphong_frag:b2,meshphysical_vert:E2,meshphysical_frag:T2,meshtoon_vert:A2,meshtoon_frag:w2,points_vert:C2,points_frag:R2,shadow_vert:D2,shadow_frag:U2,sprite_vert:N2,sprite_frag:L2},ht={common:{diffuse:{value:new re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new re(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},gs={basic:{uniforms:yn([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:yn([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new re(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:yn([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new re(0)},specular:{value:new re(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:yn([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:yn([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new re(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:yn([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:yn([ht.points,ht.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:yn([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:yn([ht.common,ht.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:yn([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:yn([ht.sprite,ht.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:yn([ht.common,ht.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:yn([ht.lights,ht.fog,{color:{value:new re(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};gs.physical={uniforms:yn([gs.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new re(0)},specularColor:{value:new re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};var Nd={r:0,b:0,g:0},Ir=new hs,O2=new Ze;function I2(e,t,n,i,s,a,r){let o=new re(0),l=a===!0?0:1,c,f,d=null,h=0,p=null;function _(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?n:t).get(y)),y}function M(v){let y=!1,T=_(v);T===null?u(o,l):T&&T.isColor&&(u(T,1),y=!0);let C=e.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(e.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function m(v,y){let T=_(y);T&&(T.isCubeTexture||T.mapping===Zc)?(f===void 0&&(f=new Gn(new cl(1,1,1),new li({name:"BackgroundCubeMaterial",uniforms:Or(gs.backgroundCube.uniforms),vertexShader:gs.backgroundCube.vertexShader,fragmentShader:gs.backgroundCube.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(C,w,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(f)),Ir.copy(y.backgroundRotation),Ir.x*=-1,Ir.y*=-1,Ir.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ir.y*=-1,Ir.z*=-1),f.material.uniforms.envMap.value=T,f.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(O2.makeRotationFromEuler(Ir)),f.material.toneMapped=$t.getTransfer(T.colorSpace)!==de,(d!==T||h!==T.version||p!==e.toneMapping)&&(f.material.needsUpdate=!0,d=T,h=T.version,p=e.toneMapping),f.layers.enableAll(),v.unshift(f,f.geometry,f.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Gn(new Dr(2,2),new li({name:"BackgroundMaterial",uniforms:Or(gs.background.uniforms),vertexShader:gs.background.vertexShader,fragmentShader:gs.background.fragmentShader,side:Gs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=$t.getTransfer(T.colorSpace)!==de,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||h!==T.version||p!==e.toneMapping)&&(c.material.needsUpdate=!0,d=T,h=T.version,p=e.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function u(v,y){v.getRGB(Nd,X0(e)),i.buffers.color.setClear(Nd.r,Nd.g,Nd.b,y,r)}function g(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,y=1){o.set(v),l=y,u(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,u(o,l)},render:M,addToRenderList:m,dispose:g}}function P2(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=h(null),a=s,r=!1;function o(b,O,F,k,q){let J=!1,W=d(k,F,O);a!==W&&(a=W,c(a.object)),J=p(b,k,F,q),J&&_(b,k,F,q),q!==null&&t.update(q,e.ELEMENT_ARRAY_BUFFER),(J||r)&&(r=!1,y(b,O,F,k),q!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function l(){return e.createVertexArray()}function c(b){return e.bindVertexArray(b)}function f(b){return e.deleteVertexArray(b)}function d(b,O,F){let k=F.wireframe===!0,q=i[b.id];q===void 0&&(q={},i[b.id]=q);let J=q[O.id];J===void 0&&(J={},q[O.id]=J);let W=J[k];return W===void 0&&(W=h(l()),J[k]=W),W}function h(b){let O=[],F=[],k=[];for(let q=0;q<n;q++)O[q]=0,F[q]=0,k[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:F,attributeDivisors:k,object:b,attributes:{},index:null}}function p(b,O,F,k){let q=a.attributes,J=O.attributes,W=0,nt=F.getAttributes();for(let H in nt)if(nt[H].location>=0){let ft=q[H],Et=J[H];if(Et===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(Et=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(Et=b.instanceColor)),ft===void 0||ft.attribute!==Et||Et&&ft.data!==Et.data)return!0;W++}return a.attributesNum!==W||a.index!==k}function _(b,O,F,k){let q={},J=O.attributes,W=0,nt=F.getAttributes();for(let H in nt)if(nt[H].location>=0){let ft=J[H];ft===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(ft=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(ft=b.instanceColor));let Et={};Et.attribute=ft,ft&&ft.data&&(Et.data=ft.data),q[H]=Et,W++}a.attributes=q,a.attributesNum=W,a.index=k}function M(){let b=a.newAttributes;for(let O=0,F=b.length;O<F;O++)b[O]=0}function m(b){u(b,0)}function u(b,O){let F=a.newAttributes,k=a.enabledAttributes,q=a.attributeDivisors;F[b]=1,k[b]===0&&(e.enableVertexAttribArray(b),k[b]=1),q[b]!==O&&(e.vertexAttribDivisor(b,O),q[b]=O)}function g(){let b=a.newAttributes,O=a.enabledAttributes;for(let F=0,k=O.length;F<k;F++)O[F]!==b[F]&&(e.disableVertexAttribArray(F),O[F]=0)}function v(b,O,F,k,q,J,W){W===!0?e.vertexAttribIPointer(b,O,F,q,J):e.vertexAttribPointer(b,O,F,k,q,J)}function y(b,O,F,k){M();let q=k.attributes,J=F.getAttributes(),W=O.defaultAttributeValues;for(let nt in J){let H=J[nt];if(H.location>=0){let ct=q[nt];if(ct===void 0&&(nt==="instanceMatrix"&&b.instanceMatrix&&(ct=b.instanceMatrix),nt==="instanceColor"&&b.instanceColor&&(ct=b.instanceColor)),ct!==void 0){let ft=ct.normalized,Et=ct.itemSize,Gt=t.get(ct);if(Gt===void 0)continue;let le=Gt.buffer,pe=Gt.type,Jt=Gt.bytesPerElement,Y=pe===e.INT||pe===e.UNSIGNED_INT||ct.gpuType===jf;if(ct.isInterleavedBufferAttribute){let $=ct.data,gt=$.stride,Nt=ct.offset;if($.isInstancedInterleavedBuffer){for(let Mt=0;Mt<H.locationSize;Mt++)u(H.location+Mt,$.meshPerAttribute);b.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Mt=0;Mt<H.locationSize;Mt++)m(H.location+Mt);e.bindBuffer(e.ARRAY_BUFFER,le);for(let Mt=0;Mt<H.locationSize;Mt++)v(H.location+Mt,Et/H.locationSize,pe,ft,gt*Jt,(Nt+Et/H.locationSize*Mt)*Jt,Y)}else{if(ct.isInstancedBufferAttribute){for(let $=0;$<H.locationSize;$++)u(H.location+$,ct.meshPerAttribute);b.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let $=0;$<H.locationSize;$++)m(H.location+$);e.bindBuffer(e.ARRAY_BUFFER,le);for(let $=0;$<H.locationSize;$++)v(H.location+$,Et/H.locationSize,pe,ft,Et*Jt,Et/H.locationSize*$*Jt,Y)}}else if(W!==void 0){let ft=W[nt];if(ft!==void 0)switch(ft.length){case 2:e.vertexAttrib2fv(H.location,ft);break;case 3:e.vertexAttrib3fv(H.location,ft);break;case 4:e.vertexAttrib4fv(H.location,ft);break;default:e.vertexAttrib1fv(H.location,ft)}}}}g()}function T(){U();for(let b in i){let O=i[b];for(let F in O){let k=O[F];for(let q in k)f(k[q].object),delete k[q];delete O[F]}delete i[b]}}function C(b){if(i[b.id]===void 0)return;let O=i[b.id];for(let F in O){let k=O[F];for(let q in k)f(k[q].object),delete k[q];delete O[F]}delete i[b.id]}function w(b){for(let O in i){let F=i[O];if(F[b.id]===void 0)continue;let k=F[b.id];for(let q in k)f(k[q].object),delete k[q];delete F[b.id]}}function U(){E(),r=!0,a!==s&&(a=s,c(a.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:E,dispose:T,releaseStatesOfGeometry:C,releaseStatesOfProgram:w,initAttributes:M,enableAttribute:m,disableUnusedAttributes:g}}function B2(e,t,n){let i;function s(c){i=c}function a(c,f){e.drawArrays(i,c,f),n.update(f,i,1)}function r(c,f,d){d!==0&&(e.drawArraysInstanced(i,c,f,d),n.update(f,i,d))}function o(c,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,f,0,d);let p=0;for(let _=0;_<d;_++)p+=f[_];n.update(p,i,1)}function l(c,f,d,h){if(d===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<c.length;_++)r(c[_],f[_],h[_]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,f,0,h,0,d);let _=0;for(let M=0;M<d;M++)_+=f[M]*h[M];n.update(_,i,1)}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function z2(e,t,n,i){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(w){return!(w!==Ai&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){let U=w===fl&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==ps&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==ms&&!U)}function l(w){if(w==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",f=l(c);f!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);let d=n.logarithmicDepthBuffer===!0,h=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),_=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),u=e.getParameter(e.MAX_VERTEX_ATTRIBS),g=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),v=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),T=_>0,C=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:g,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:T,maxSamples:C}}function F2(e){let t=this,n=null,i=0,s=!1,a=!1,r=new ls,o=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let p=d.length!==0||h||i!==0||s;return s=h,i=d.length,p},this.beginShadows=function(){a=!0,f(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,h){n=f(d,h,0)},this.setState=function(d,h,p){let _=d.clippingPlanes,M=d.clipIntersection,m=d.clipShadows,u=e.get(d);if(!s||_===null||_.length===0||a&&!m)a?f(null):c();else{let g=a?0:i,v=g*4,y=u.clippingState||null;l.value=y,y=f(_,h,v,p);for(let T=0;T!==v;++T)y[T]=n[T];u.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function f(d,h,p,_){let M=d!==null?d.length:0,m=null;if(M!==0){if(m=l.value,_!==!0||m===null){let u=p+M*4,g=h.matrixWorldInverse;o.getNormalMatrix(g),(m===null||m.length<u)&&(m=new Float32Array(u));for(let v=0,y=p;v!==M;++v,y+=4)r.copy(d[v]).applyMatrix4(g,o),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,m}}function H2(e){let t=new WeakMap;function n(r,o){return o===Jf?r.mapping=Nr:o===Kf&&(r.mapping=Lr),r}function i(r){if(r&&r.isTexture){let o=r.mapping;if(o===Jf||o===Kf)if(t.has(r)){let l=t.get(r).texture;return n(l,r.mapping)}else{let l=r.image;if(l&&l.height>0){let c=new Cf(l.height);return c.fromEquirectangularTexture(e,r),t.set(r,c),r.addEventListener("dispose",s),n(c.texture,r.mapping)}else return null}}return r}function s(r){let o=r.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function a(){t=new WeakMap}return{get:i,dispose:a}}var gl=4,nb=[.125,.215,.35,.446,.526,.582],zr=20,Z0=new Hf,ib=new re,J0=null,K0=0,Q0=0,j0=!1,Br=(1+Math.sqrt(5))/2,ml=1/Br,sb=[new z(-Br,ml,0),new z(Br,ml,0),new z(-ml,0,Br),new z(ml,0,Br),new z(0,Br,-ml),new z(0,Br,ml),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)],V2=new z,Id=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,s=100,a={}){let{size:r=256,position:o=V2}=a;J0=this._renderer.getRenderTarget(),K0=this._renderer.getActiveCubeFace(),Q0=this._renderer.getActiveMipmapLevel(),j0=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ob(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rb(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(J0,K0,Q0),this._renderer.xr.enabled=j0,t.scissorTest=!1,Ld(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Nr||t.mapping===Lr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),J0=this._renderer.getRenderTarget(),K0=this._renderer.getActiveCubeFace(),Q0=this._renderer.getActiveMipmapLevel(),j0=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:ki,minFilter:ki,generateMipmaps:!1,type:fl,format:Ai,colorSpace:wr,depthBuffer:!1},s=ab(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ab(t,n,i);let{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=G2(a)),this._blurMaterial=k2(a,t,n)}return s}_compileMaterial(t){let n=new Gn(this._lodPlanes[0],t);this._renderer.compile(n,Z0)}_sceneToCubeUV(t,n,i,s,a){let l=new Vn(90,1,n,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(ib),d.toneMapping=qs,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));let M=new Fc({name:"PMREM.Background",side:wn,depthWrite:!1,depthTest:!1}),m=new Gn(new cl,M),u=!1,g=t.background;g?g.isColor&&(M.color.copy(g),t.background=null,u=!0):(M.color.copy(ib),u=!0);for(let v=0;v<6;v++){let y=v%3;y===0?(l.up.set(0,c[v],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+f[v],a.y,a.z)):y===1?(l.up.set(0,0,c[v]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+f[v],a.z)):(l.up.set(0,c[v],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+f[v]));let T=this._cubeSize;Ld(s,y*T,v>2?T:0,T,T),d.setRenderTarget(s),u&&d.render(m,l),d.render(t,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=h,t.background=g}_textureToCubeUV(t,n){let i=this._renderer,s=t.mapping===Nr||t.mapping===Lr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ob()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rb());let a=s?this._cubemapMaterial:this._equirectMaterial,r=new Gn(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=t;let l=this._cubeSize;Ld(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,Z0)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let s=this._lodPlanes.length;for(let a=1;a<s;a++){let r=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=sb[(s-a-1)%sb.length];this._blur(t,a-1,a,r,o)}n.autoClear=i}_blur(t,n,i,s,a){let r=this._pingPongRenderTarget;this._halfBlur(t,r,n,i,s,"latitudinal",a),this._halfBlur(r,t,i,i,s,"longitudinal",a)}_halfBlur(t,n,i,s,a,r,o){let l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let f=3,d=new Gn(this._lodPlanes[s],c),h=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*zr-1),M=a/_,m=isFinite(a)?1+Math.floor(f*M):zr;m>zr&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${zr}`);let u=[],g=0;for(let w=0;w<zr;++w){let U=w/M,E=Math.exp(-U*U/2);u.push(E),w===0?g+=E:w<m&&(g+=2*E)}for(let w=0;w<u.length;w++)u[w]=u[w]/g;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=u,h.latitudinal.value=r==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:v}=this;h.dTheta.value=_,h.mipInt.value=v-i;let y=this._sizeLods[s],T=3*y*(s>v-gl?s-v+gl:0),C=4*(this._cubeSize-y);Ld(n,T,C,3*y,2*y),l.setRenderTarget(n),l.render(d,Z0)}};function G2(e){let t=[],n=[],i=[],s=e,a=e-gl+1+nb.length;for(let r=0;r<a;r++){let o=Math.pow(2,s);n.push(o);let l=1/o;r>e-gl?l=nb[r-e+gl-1]:r===0&&(l=0),i.push(l);let c=1/(o-2),f=-c,d=1+c,h=[f,f,d,f,d,d,f,f,d,d,f,d],p=6,_=6,M=3,m=2,u=1,g=new Float32Array(M*_*p),v=new Float32Array(m*_*p),y=new Float32Array(u*_*p);for(let C=0;C<p;C++){let w=C%3*2/3-1,U=C>2?0:-1,E=[w,U,0,w+2/3,U,0,w+2/3,U+1,0,w,U,0,w+2/3,U+1,0,w,U+1,0];g.set(E,M*_*C),v.set(h,m*_*C);let b=[C,C,C,C,C,C];y.set(b,u*_*C)}let T=new Ba;T.setAttribute("position",new ri(g,M)),T.setAttribute("uv",new ri(v,m)),T.setAttribute("faceIndex",new ri(y,u)),t.push(T),s>gl&&s--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function ab(e,t,n){let i=new us(e,t,n);return i.texture.mapping=Zc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ld(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function k2(e,t,n){let i=new Float32Array(zr),s=new z(0,1,0);return new li({name:"SphericalGaussianBlur",defines:{n:zr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:l_(),fragmentShader:`

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
		`,blending:Ws,depthTest:!1,depthWrite:!1})}function rb(){return new li({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:l_(),fragmentShader:`

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
		`,blending:Ws,depthTest:!1,depthWrite:!1})}function ob(){return new li({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:l_(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ws,depthTest:!1,depthWrite:!1})}function l_(){return`

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
	`}function X2(e){let t=new WeakMap,n=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===Jf||l===Kf,f=l===Nr||l===Lr;if(c||f){let d=t.get(o),h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return n===null&&(n=new Id(e)),d=c?n.fromEquirectangular(o,d):n.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{let p=o.image;return c&&p&&p.height>0||f&&p&&s(p)?(n===null&&(n=new Id(e)),d=c?n.fromEquirectangular(o):n.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",a),d.texture):null}}}return o}function s(o){let l=0,c=6;for(let f=0;f<c;f++)o[f]!==void 0&&l++;return l===c}function a(o){let l=o.target;l.removeEventListener("dispose",a);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:r}}function W2(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=e.getExtension(i)}return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);return s===null&&rl("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function q2(e,t,n,i){let s={},a=new WeakMap;function r(d){let h=d.target;h.index!==null&&t.remove(h.index);for(let _ in h.attributes)t.remove(h.attributes[_]);h.removeEventListener("dispose",r),delete s[h.id];let p=a.get(h);p&&(t.remove(p),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",r),s[h.id]=!0,n.memory.geometries++),h}function l(d){let h=d.attributes;for(let p in h)t.update(h[p],e.ARRAY_BUFFER)}function c(d){let h=[],p=d.index,_=d.attributes.position,M=0;if(p!==null){let g=p.array;M=p.version;for(let v=0,y=g.length;v<y;v+=3){let T=g[v+0],C=g[v+1],w=g[v+2];h.push(T,C,C,w,w,T)}}else if(_!==void 0){let g=_.array;M=_.version;for(let v=0,y=g.length/3-1;v<y;v+=3){let T=v+0,C=v+1,w=v+2;h.push(T,C,C,w,w,T)}}else return;let m=new(k0(h)?Vc:Hc)(h,1);m.version=M;let u=a.get(d);u&&t.remove(u),a.set(d,m)}function f(d){let h=a.get(d);if(h){let p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return a.get(d)}return{get:o,update:l,getWireframeAttribute:f}}function Y2(e,t,n){let i;function s(h){i=h}let a,r;function o(h){a=h.type,r=h.bytesPerElement}function l(h,p){e.drawElements(i,p,a,h*r),n.update(p,i,1)}function c(h,p,_){_!==0&&(e.drawElementsInstanced(i,p,a,h*r,_),n.update(p,i,_))}function f(h,p,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,a,h,0,_);let m=0;for(let u=0;u<_;u++)m+=p[u];n.update(m,i,1)}function d(h,p,_,M){if(_===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<h.length;u++)c(h[u]/r,p[u],M[u]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,a,h,0,M,0,_);let u=0;for(let g=0;g<_;g++)u+=p[g]*M[g];n.update(u,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=d}function Z2(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(a/3);break;case e.LINES:n.lines+=o*(a/2);break;case e.LINE_STRIP:n.lines+=o*(a-1);break;case e.LINE_LOOP:n.lines+=o*a;break;case e.POINTS:n.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function J2(e,t,n){let i=new WeakMap,s=new Pe;function a(r,o,l){let c=r.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=f!==void 0?f.length:0,h=i.get(o);if(h===void 0||h.count!==d){let E=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();let p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],g=o.morphAttributes.color||[],v=0;p===!0&&(v=1),_===!0&&(v=2),M===!0&&(v=3);let y=o.attributes.position.count*v,T=1;y>t.maxTextureSize&&(T=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let C=new Float32Array(y*T*4*d),w=new Bc(C,y,T,d);w.type=ms,w.needsUpdate=!0;let U=v*4;for(let b=0;b<d;b++){let O=m[b],F=u[b],k=g[b],q=y*T*4*b;for(let J=0;J<O.count;J++){let W=J*U;p===!0&&(s.fromBufferAttribute(O,J),C[q+W+0]=s.x,C[q+W+1]=s.y,C[q+W+2]=s.z,C[q+W+3]=0),_===!0&&(s.fromBufferAttribute(F,J),C[q+W+4]=s.x,C[q+W+5]=s.y,C[q+W+6]=s.z,C[q+W+7]=0),M===!0&&(s.fromBufferAttribute(k,J),C[q+W+8]=s.x,C[q+W+9]=s.y,C[q+W+10]=s.z,C[q+W+11]=k.itemSize===4?s.w:1)}}h={count:d,texture:w,size:new ae(y,T)},i.set(o,h),o.addEventListener("dispose",E)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let p=0;for(let M=0;M<c.length;M++)p+=c[M];let _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(e,"morphTargetBaseInfluence",_),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",h.size)}return{update:a}}function K2(e,t,n,i){let s=new WeakMap;function a(l){let c=i.render.frame,f=l.geometry,d=t.get(l,f);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(n.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,e.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function r(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:a,dispose:r}}var Ab=new oi,lb=new Wc(1,1),wb=new Bc,Cb=new Tf,Rb=new Gc,cb=[],ub=[],hb=new Float32Array(16),fb=new Float32Array(9),db=new Float32Array(4);function vl(e,t,n){let i=e[0];if(i<=0||i>0)return e;let s=t*n,a=cb[s];if(a===void 0&&(a=new Float32Array(s),cb[s]=a),t!==0){i.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(a,o)}return a}function Je(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Ke(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Bd(e,t){let n=ub[t];n===void 0&&(n=new Int32Array(t),ub[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function Q2(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function j2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Je(n,t))return;e.uniform2fv(this.addr,t),Ke(n,t)}}function $2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Je(n,t))return;e.uniform3fv(this.addr,t),Ke(n,t)}}function t3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Je(n,t))return;e.uniform4fv(this.addr,t),Ke(n,t)}}function e3(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Je(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ke(n,t)}else{if(Je(n,i))return;db.set(i),e.uniformMatrix2fv(this.addr,!1,db),Ke(n,i)}}function n3(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Je(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ke(n,t)}else{if(Je(n,i))return;fb.set(i),e.uniformMatrix3fv(this.addr,!1,fb),Ke(n,i)}}function i3(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Je(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ke(n,t)}else{if(Je(n,i))return;hb.set(i),e.uniformMatrix4fv(this.addr,!1,hb),Ke(n,i)}}function s3(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function a3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Je(n,t))return;e.uniform2iv(this.addr,t),Ke(n,t)}}function r3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Je(n,t))return;e.uniform3iv(this.addr,t),Ke(n,t)}}function o3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Je(n,t))return;e.uniform4iv(this.addr,t),Ke(n,t)}}function l3(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function c3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Je(n,t))return;e.uniform2uiv(this.addr,t),Ke(n,t)}}function u3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Je(n,t))return;e.uniform3uiv(this.addr,t),Ke(n,t)}}function h3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Je(n,t))return;e.uniform4uiv(this.addr,t),Ke(n,t)}}function f3(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let a;this.type===e.SAMPLER_2D_SHADOW?(lb.compareFunction=V0,a=lb):a=Ab,n.setTexture2D(t||a,s)}function d3(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||Cb,s)}function p3(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||Rb,s)}function m3(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||wb,s)}function g3(e){switch(e){case 5126:return Q2;case 35664:return j2;case 35665:return $2;case 35666:return t3;case 35674:return e3;case 35675:return n3;case 35676:return i3;case 5124:case 35670:return s3;case 35667:case 35671:return a3;case 35668:case 35672:return r3;case 35669:case 35673:return o3;case 5125:return l3;case 36294:return c3;case 36295:return u3;case 36296:return h3;case 35678:case 36198:case 36298:case 36306:case 35682:return f3;case 35679:case 36299:case 36307:return d3;case 35680:case 36300:case 36308:case 36293:return p3;case 36289:case 36303:case 36311:case 36292:return m3}}function _3(e,t){e.uniform1fv(this.addr,t)}function v3(e,t){let n=vl(t,this.size,2);e.uniform2fv(this.addr,n)}function y3(e,t){let n=vl(t,this.size,3);e.uniform3fv(this.addr,n)}function x3(e,t){let n=vl(t,this.size,4);e.uniform4fv(this.addr,n)}function S3(e,t){let n=vl(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function M3(e,t){let n=vl(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function b3(e,t){let n=vl(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function E3(e,t){e.uniform1iv(this.addr,t)}function T3(e,t){e.uniform2iv(this.addr,t)}function A3(e,t){e.uniform3iv(this.addr,t)}function w3(e,t){e.uniform4iv(this.addr,t)}function C3(e,t){e.uniform1uiv(this.addr,t)}function R3(e,t){e.uniform2uiv(this.addr,t)}function D3(e,t){e.uniform3uiv(this.addr,t)}function U3(e,t){e.uniform4uiv(this.addr,t)}function N3(e,t,n){let i=this.cache,s=t.length,a=Bd(n,s);Je(i,a)||(e.uniform1iv(this.addr,a),Ke(i,a));for(let r=0;r!==s;++r)n.setTexture2D(t[r]||Ab,a[r])}function L3(e,t,n){let i=this.cache,s=t.length,a=Bd(n,s);Je(i,a)||(e.uniform1iv(this.addr,a),Ke(i,a));for(let r=0;r!==s;++r)n.setTexture3D(t[r]||Cb,a[r])}function O3(e,t,n){let i=this.cache,s=t.length,a=Bd(n,s);Je(i,a)||(e.uniform1iv(this.addr,a),Ke(i,a));for(let r=0;r!==s;++r)n.setTextureCube(t[r]||Rb,a[r])}function I3(e,t,n){let i=this.cache,s=t.length,a=Bd(n,s);Je(i,a)||(e.uniform1iv(this.addr,a),Ke(i,a));for(let r=0;r!==s;++r)n.setTexture2DArray(t[r]||wb,a[r])}function P3(e){switch(e){case 5126:return _3;case 35664:return v3;case 35665:return y3;case 35666:return x3;case 35674:return S3;case 35675:return M3;case 35676:return b3;case 5124:case 35670:return E3;case 35667:case 35671:return T3;case 35668:case 35672:return A3;case 35669:case 35673:return w3;case 5125:return C3;case 36294:return R3;case 36295:return D3;case 36296:return U3;case 35678:case 36198:case 36298:case 36306:case 35682:return N3;case 35679:case 36299:case 36307:return L3;case 35680:case 36300:case 36308:case 36293:return O3;case 36289:case 36303:case 36311:case 36292:return I3}}var t_=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=g3(n.type)}},e_=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=P3(n.type)}},n_=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let s=this.seq;for(let a=0,r=s.length;a!==r;++a){let o=s[a];o.setValue(t,n[o.id],i)}}},$0=/(\w+)(\])?(\[|\.)?/g;function pb(e,t){e.seq.push(t),e.map[t.id]=t}function B3(e,t,n){let i=e.name,s=i.length;for($0.lastIndex=0;;){let a=$0.exec(i),r=$0.lastIndex,o=a[1],l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){pb(n,c===void 0?new t_(o,e,t):new e_(o,e,t));break}else{let d=n.map[o];d===void 0&&(d=new n_(o),pb(n,d)),n=d}}}var _l=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let a=t.getActiveUniform(n,s),r=t.getUniformLocation(n,a.name);B3(a,r,this)}}setValue(t,n,i,s){let a=this.map[n];a!==void 0&&a.setValue(t,i,s)}setOptional(t,n,i){let s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let a=0,r=n.length;a!==r;++a){let o=n[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,n){let i=[];for(let s=0,a=t.length;s!==a;++s){let r=t[s];r.id in n&&i.push(r)}return i}};function mb(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var z3=37297,F3=0;function H3(e,t){let n=e.split(`
`),i=[],s=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let r=s;r<a;r++){let o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}var gb=new Vt;function V3(e){$t._getMatrix(gb,$t.workingColorSpace,e);let t=`mat3( ${gb.elements.map(n=>n.toFixed(4))} )`;switch($t.getTransfer(e)){case Oc:return[t,"LinearTransferOETF"];case de:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function _b(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";let r=/ERROR: 0:(\d+)/.exec(a);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+a+`

`+H3(e.getShaderSource(t),o)}else return a}function G3(e,t){let n=V3(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function k3(e,t){let n;switch(t){case N1:n="Linear";break;case L1:n="Reinhard";break;case O1:n="Cineon";break;case I1:n="ACESFilmic";break;case B1:n="AgX";break;case z1:n="Neutral";break;case P1:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var Od=new z;function X3(){$t.getLuminanceCoefficients(Od);let e=Od.x.toFixed(4),t=Od.y.toFixed(4),n=Od.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function W3(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(eu).join(`
`)}function q3(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function Y3(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let a=e.getActiveAttrib(t,s),r=a.name,o=1;a.type===e.FLOAT_MAT2&&(o=2),a.type===e.FLOAT_MAT3&&(o=3),a.type===e.FLOAT_MAT4&&(o=4),n[r]={type:a.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function eu(e){return e!==""}function vb(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function yb(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Z3=/^[ \t]*#include +<([\w\d./]+)>/gm;function i_(e){return e.replace(Z3,K3)}var J3=new Map;function K3(e,t){let n=kt[t];if(n===void 0){let i=J3.get(t);if(i!==void 0)n=kt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return i_(n)}var Q3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xb(e){return e.replace(Q3,j3)}function j3(e,t,n,i){let s="";for(let a=parseInt(t);a<parseInt(n);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function Sb(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}function $3(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===w0?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===h1?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===fs&&(t="SHADOWMAP_TYPE_VSM"),t}function tD(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case Nr:case Lr:t="ENVMAP_TYPE_CUBE";break;case Zc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function eD(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case Lr:t="ENVMAP_MODE_REFRACTION";break}return t}function nD(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case U0:t="ENVMAP_BLENDING_MULTIPLY";break;case D1:t="ENVMAP_BLENDING_MIX";break;case U1:t="ENVMAP_BLENDING_ADD";break}return t}function iD(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function sD(e,t,n,i){let s=e.getContext(),a=n.defines,r=n.vertexShader,o=n.fragmentShader,l=$3(n),c=tD(n),f=eD(n),d=nD(n),h=iD(n),p=W3(n),_=q3(a),M=s.createProgram(),m,u,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(eu).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(eu).join(`
`),u.length>0&&(u+=`
`)):(m=[Sb(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(eu).join(`
`),u=[Sb(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==qs?"#define TONE_MAPPING":"",n.toneMapping!==qs?kt.tonemapping_pars_fragment:"",n.toneMapping!==qs?k3("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,G3("linearToOutputTexel",n.outputColorSpace),X3(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(eu).join(`
`)),r=i_(r),r=vb(r,n),r=yb(r,n),o=i_(o),o=vb(o,n),o=yb(o,n),r=xb(r),o=xb(o),n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",n.glslVersion===G0?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===G0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);let v=g+m+r,y=g+u+o,T=mb(s,s.VERTEX_SHADER,v),C=mb(s,s.FRAGMENT_SHADER,y);s.attachShader(M,T),s.attachShader(M,C),n.index0AttributeName!==void 0?s.bindAttribLocation(M,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function w(O){if(e.debug.checkShaderErrors){let F=s.getProgramInfoLog(M)||"",k=s.getShaderInfoLog(T)||"",q=s.getShaderInfoLog(C)||"",J=F.trim(),W=k.trim(),nt=q.trim(),H=!0,ct=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(H=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,M,T,C);else{let ft=_b(s,T,"vertex"),Et=_b(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+J+`
`+ft+`
`+Et)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(W===""||nt==="")&&(ct=!1);ct&&(O.diagnostics={runnable:H,programLog:J,vertexShader:{log:W,prefix:m},fragmentShader:{log:nt,prefix:u}})}s.deleteShader(T),s.deleteShader(C),U=new _l(s,M),E=Y3(s,M)}let U;this.getUniforms=function(){return U===void 0&&w(this),U};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let b=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(M,z3)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=F3++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=T,this.fragmentShader=C,this}var aD=0,s_=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let n=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(n),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new a_(t),n.set(t,i)),i}},a_=class{constructor(t){this.id=aD++,this.code=t,this.usedTimes=0}};function rD(e,t,n,i,s,a,r){let o=new zc,l=new s_,c=new Set,f=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures,p=s.precision,_={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,b,O,F,k){let q=F.fog,J=k.geometry,W=E.isMeshStandardMaterial?F.environment:null,nt=(E.isMeshStandardMaterial?n:t).get(E.envMap||W),H=nt&&nt.mapping===Zc?nt.image.height:null,ct=_[E.type];E.precision!==null&&(p=s.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));let ft=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Et=ft!==void 0?ft.length:0,Gt=0;J.morphAttributes.position!==void 0&&(Gt=1),J.morphAttributes.normal!==void 0&&(Gt=2),J.morphAttributes.color!==void 0&&(Gt=3);let le,pe,Jt,Y;if(ct){let jt=gs[ct];le=jt.vertexShader,pe=jt.fragmentShader}else le=E.vertexShader,pe=E.fragmentShader,l.update(E),Jt=l.getVertexShaderID(E),Y=l.getFragmentShaderID(E);let $=e.getRenderTarget(),gt=e.state.buffers.depth.getReversed(),Nt=k.isInstancedMesh===!0,Mt=k.isBatchedMesh===!0,Wt=!!E.map,Xe=!!E.matcap,R=!!nt,ve=!!E.aoMap,It=!!E.lightMap,wt=!!E.bumpMap,St=!!E.normalMap,me=!!E.displacementMap,mt=!!E.emissiveMap,Pt=!!E.metalnessMap,De=!!E.roughnessMap,ge=E.anisotropy>0,A=E.clearcoat>0,S=E.dispersion>0,B=E.iridescence>0,G=E.sheen>0,K=E.transmission>0,V=ge&&!!E.anisotropyMap,Tt=A&&!!E.clearcoatMap,at=A&&!!E.clearcoatNormalMap,_t=A&&!!E.clearcoatRoughnessMap,vt=B&&!!E.iridescenceMap,Q=B&&!!E.iridescenceThicknessMap,rt=G&&!!E.sheenColorMap,Ct=G&&!!E.sheenRoughnessMap,yt=!!E.specularMap,ot=!!E.specularColorMap,Dt=!!E.specularIntensityMap,N=K&&!!E.transmissionMap,it=K&&!!E.thicknessMap,st=!!E.gradientMap,pt=!!E.alphaMap,tt=E.alphaTest>0,Z=!!E.alphaHash,xt=!!E.extensions,Lt=qs;E.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Lt=e.toneMapping);let te={shaderID:ct,shaderType:E.type,shaderName:E.name,vertexShader:le,fragmentShader:pe,defines:E.defines,customVertexShaderID:Jt,customFragmentShaderID:Y,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Mt,batchingColor:Mt&&k._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&k.instanceColor!==null,instancingMorph:Nt&&k.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:$===null?e.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:wr,alphaToCoverage:!!E.alphaToCoverage,map:Wt,matcap:Xe,envMap:R,envMapMode:R&&nt.mapping,envMapCubeUVHeight:H,aoMap:ve,lightMap:It,bumpMap:wt,normalMap:St,displacementMap:h&&me,emissiveMap:mt,normalMapObjectSpace:St&&E.normalMapType===k1,normalMapTangentSpace:St&&E.normalMapType===G1,metalnessMap:Pt,roughnessMap:De,anisotropy:ge,anisotropyMap:V,clearcoat:A,clearcoatMap:Tt,clearcoatNormalMap:at,clearcoatRoughnessMap:_t,dispersion:S,iridescence:B,iridescenceMap:vt,iridescenceThicknessMap:Q,sheen:G,sheenColorMap:rt,sheenRoughnessMap:Ct,specularMap:yt,specularColorMap:ot,specularIntensityMap:Dt,transmission:K,transmissionMap:N,thicknessMap:it,gradientMap:st,opaque:E.transparent===!1&&E.blending===Tr&&E.alphaToCoverage===!1,alphaMap:pt,alphaTest:tt,alphaHash:Z,combine:E.combine,mapUv:Wt&&M(E.map.channel),aoMapUv:ve&&M(E.aoMap.channel),lightMapUv:It&&M(E.lightMap.channel),bumpMapUv:wt&&M(E.bumpMap.channel),normalMapUv:St&&M(E.normalMap.channel),displacementMapUv:me&&M(E.displacementMap.channel),emissiveMapUv:mt&&M(E.emissiveMap.channel),metalnessMapUv:Pt&&M(E.metalnessMap.channel),roughnessMapUv:De&&M(E.roughnessMap.channel),anisotropyMapUv:V&&M(E.anisotropyMap.channel),clearcoatMapUv:Tt&&M(E.clearcoatMap.channel),clearcoatNormalMapUv:at&&M(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&M(E.clearcoatRoughnessMap.channel),iridescenceMapUv:vt&&M(E.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&M(E.iridescenceThicknessMap.channel),sheenColorMapUv:rt&&M(E.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&M(E.sheenRoughnessMap.channel),specularMapUv:yt&&M(E.specularMap.channel),specularColorMapUv:ot&&M(E.specularColorMap.channel),specularIntensityMapUv:Dt&&M(E.specularIntensityMap.channel),transmissionMapUv:N&&M(E.transmissionMap.channel),thicknessMapUv:it&&M(E.thicknessMap.channel),alphaMapUv:pt&&M(E.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(St||ge),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!J.attributes.uv&&(Wt||pt),fog:!!q,useFog:E.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:gt,skinning:k.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:Gt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:E.dithering,shadowMapEnabled:e.shadowMap.enabled&&O.length>0,shadowMapType:e.shadowMap.type,toneMapping:Lt,decodeVideoTexture:Wt&&E.map.isVideoTexture===!0&&$t.getTransfer(E.map.colorSpace)===de,decodeVideoTextureEmissive:mt&&E.emissiveMap.isVideoTexture===!0&&$t.getTransfer(E.emissiveMap.colorSpace)===de,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===ds,flipSided:E.side===wn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:xt&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xt&&E.extensions.multiDraw===!0||Mt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return te.vertexUv1s=c.has(1),te.vertexUv2s=c.has(2),te.vertexUv3s=c.has(3),c.clear(),te}function u(E){let b=[];if(E.shaderID?b.push(E.shaderID):(b.push(E.customVertexShaderID),b.push(E.customFragmentShaderID)),E.defines!==void 0)for(let O in E.defines)b.push(O),b.push(E.defines[O]);return E.isRawShaderMaterial===!1&&(g(b,E),v(b,E),b.push(e.outputColorSpace)),b.push(E.customProgramCacheKey),b.join()}function g(E,b){E.push(b.precision),E.push(b.outputColorSpace),E.push(b.envMapMode),E.push(b.envMapCubeUVHeight),E.push(b.mapUv),E.push(b.alphaMapUv),E.push(b.lightMapUv),E.push(b.aoMapUv),E.push(b.bumpMapUv),E.push(b.normalMapUv),E.push(b.displacementMapUv),E.push(b.emissiveMapUv),E.push(b.metalnessMapUv),E.push(b.roughnessMapUv),E.push(b.anisotropyMapUv),E.push(b.clearcoatMapUv),E.push(b.clearcoatNormalMapUv),E.push(b.clearcoatRoughnessMapUv),E.push(b.iridescenceMapUv),E.push(b.iridescenceThicknessMapUv),E.push(b.sheenColorMapUv),E.push(b.sheenRoughnessMapUv),E.push(b.specularMapUv),E.push(b.specularColorMapUv),E.push(b.specularIntensityMapUv),E.push(b.transmissionMapUv),E.push(b.thicknessMapUv),E.push(b.combine),E.push(b.fogExp2),E.push(b.sizeAttenuation),E.push(b.morphTargetsCount),E.push(b.morphAttributeCount),E.push(b.numDirLights),E.push(b.numPointLights),E.push(b.numSpotLights),E.push(b.numSpotLightMaps),E.push(b.numHemiLights),E.push(b.numRectAreaLights),E.push(b.numDirLightShadows),E.push(b.numPointLightShadows),E.push(b.numSpotLightShadows),E.push(b.numSpotLightShadowsWithMaps),E.push(b.numLightProbes),E.push(b.shadowMapType),E.push(b.toneMapping),E.push(b.numClippingPlanes),E.push(b.numClipIntersection),E.push(b.depthPacking)}function v(E,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),b.gradientMap&&o.enable(22),E.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),E.push(o.mask)}function y(E){let b=_[E.type],O;if(b){let F=gs[b];O=tb.clone(F.uniforms)}else O=E.uniforms;return O}function T(E,b){let O;for(let F=0,k=f.length;F<k;F++){let q=f[F];if(q.cacheKey===b){O=q,++O.usedTimes;break}}return O===void 0&&(O=new sD(e,b,E,a),f.push(O)),O}function C(E){if(--E.usedTimes===0){let b=f.indexOf(E);f[b]=f[f.length-1],f.pop(),E.destroy()}}function w(E){l.remove(E)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:y,acquireProgram:T,releaseProgram:C,releaseShaderCache:w,programs:f,dispose:U}}function oD(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function s(r,o,l){e.get(r)[o]=l}function a(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:a}}function lD(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function Mb(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function bb(){let e=[],t=0,n=[],i=[],s=[];function a(){t=0,n.length=0,i.length=0,s.length=0}function r(d,h,p,_,M,m){let u=e[t];return u===void 0?(u={id:d.id,object:d,geometry:h,material:p,groupOrder:_,renderOrder:d.renderOrder,z:M,group:m},e[t]=u):(u.id=d.id,u.object=d,u.geometry=h,u.material=p,u.groupOrder=_,u.renderOrder=d.renderOrder,u.z=M,u.group=m),t++,u}function o(d,h,p,_,M,m){let u=r(d,h,p,_,M,m);p.transmission>0?i.push(u):p.transparent===!0?s.push(u):n.push(u)}function l(d,h,p,_,M,m){let u=r(d,h,p,_,M,m);p.transmission>0?i.unshift(u):p.transparent===!0?s.unshift(u):n.unshift(u)}function c(d,h){n.length>1&&n.sort(d||lD),i.length>1&&i.sort(h||Mb),s.length>1&&s.sort(h||Mb)}function f(){for(let d=t,h=e.length;d<h;d++){let p=e[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:s,init:a,push:o,unshift:l,finish:f,sort:c}}function cD(){let e=new WeakMap;function t(i,s){let a=e.get(i),r;return a===void 0?(r=new bb,e.set(i,[r])):s>=a.length?(r=new bb,a.push(r)):r=a[s],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function uD(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new z,color:new re};break;case"SpotLight":n={position:new z,direction:new z,color:new re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new z,color:new re,distance:0,decay:0};break;case"HemisphereLight":n={direction:new z,skyColor:new re,groundColor:new re};break;case"RectAreaLight":n={color:new re,position:new z,halfWidth:new z,halfHeight:new z};break}return e[t.id]=n,n}}}function hD(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var fD=0;function dD(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function pD(e){let t=new uD,n=hD(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);let s=new z,a=new Ze,r=new Ze;function o(c){let f=0,d=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,_=0,M=0,m=0,u=0,g=0,v=0,y=0,T=0,C=0,w=0;c.sort(dD);for(let E=0,b=c.length;E<b;E++){let O=c[E],F=O.color,k=O.intensity,q=O.distance,J=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)f+=F.r*k,d+=F.g*k,h+=F.b*k;else if(O.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(O.sh.coefficients[W],k);w++}else if(O.isDirectionalLight){let W=t.get(O);if(W.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let nt=O.shadow,H=n.get(O);H.shadowIntensity=nt.intensity,H.shadowBias=nt.bias,H.shadowNormalBias=nt.normalBias,H.shadowRadius=nt.radius,H.shadowMapSize=nt.mapSize,i.directionalShadow[p]=H,i.directionalShadowMap[p]=J,i.directionalShadowMatrix[p]=O.shadow.matrix,g++}i.directional[p]=W,p++}else if(O.isSpotLight){let W=t.get(O);W.position.setFromMatrixPosition(O.matrixWorld),W.color.copy(F).multiplyScalar(k),W.distance=q,W.coneCos=Math.cos(O.angle),W.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),W.decay=O.decay,i.spot[M]=W;let nt=O.shadow;if(O.map&&(i.spotLightMap[T]=O.map,T++,nt.updateMatrices(O),O.castShadow&&C++),i.spotLightMatrix[M]=nt.matrix,O.castShadow){let H=n.get(O);H.shadowIntensity=nt.intensity,H.shadowBias=nt.bias,H.shadowNormalBias=nt.normalBias,H.shadowRadius=nt.radius,H.shadowMapSize=nt.mapSize,i.spotShadow[M]=H,i.spotShadowMap[M]=J,y++}M++}else if(O.isRectAreaLight){let W=t.get(O);W.color.copy(F).multiplyScalar(k),W.halfWidth.set(O.width*.5,0,0),W.halfHeight.set(0,O.height*.5,0),i.rectArea[m]=W,m++}else if(O.isPointLight){let W=t.get(O);if(W.color.copy(O.color).multiplyScalar(O.intensity),W.distance=O.distance,W.decay=O.decay,O.castShadow){let nt=O.shadow,H=n.get(O);H.shadowIntensity=nt.intensity,H.shadowBias=nt.bias,H.shadowNormalBias=nt.normalBias,H.shadowRadius=nt.radius,H.shadowMapSize=nt.mapSize,H.shadowCameraNear=nt.camera.near,H.shadowCameraFar=nt.camera.far,i.pointShadow[_]=H,i.pointShadowMap[_]=J,i.pointShadowMatrix[_]=O.shadow.matrix,v++}i.point[_]=W,_++}else if(O.isHemisphereLight){let W=t.get(O);W.skyColor.copy(O.color).multiplyScalar(k),W.groundColor.copy(O.groundColor).multiplyScalar(k),i.hemi[u]=W,u++}}m>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ht.LTC_FLOAT_1,i.rectAreaLTC2=ht.LTC_FLOAT_2):(i.rectAreaLTC1=ht.LTC_HALF_1,i.rectAreaLTC2=ht.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=h;let U=i.hash;(U.directionalLength!==p||U.pointLength!==_||U.spotLength!==M||U.rectAreaLength!==m||U.hemiLength!==u||U.numDirectionalShadows!==g||U.numPointShadows!==v||U.numSpotShadows!==y||U.numSpotMaps!==T||U.numLightProbes!==w)&&(i.directional.length=p,i.spot.length=M,i.rectArea.length=m,i.point.length=_,i.hemi.length=u,i.directionalShadow.length=g,i.directionalShadowMap.length=g,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=g,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=y+T-C,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=w,U.directionalLength=p,U.pointLength=_,U.spotLength=M,U.rectAreaLength=m,U.hemiLength=u,U.numDirectionalShadows=g,U.numPointShadows=v,U.numSpotShadows=y,U.numSpotMaps=T,U.numLightProbes=w,i.version=fD++)}function l(c,f){let d=0,h=0,p=0,_=0,M=0,m=f.matrixWorldInverse;for(let u=0,g=c.length;u<g;u++){let v=c[u];if(v.isDirectionalLight){let y=i.directional[d];y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(v.isSpotLight){let y=i.spot[p];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(v.isRectAreaLight){let y=i.rectArea[_];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),r.identity(),a.copy(v.matrixWorld),a.premultiply(m),r.extractRotation(a),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),_++}else if(v.isPointLight){let y=i.point[h];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),h++}else if(v.isHemisphereLight){let y=i.hemi[M];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(m),M++}}}return{setup:o,setupView:l,state:i}}function Eb(e){let t=new pD(e),n=[],i=[];function s(f){c.camera=f,n.length=0,i.length=0}function a(f){n.push(f)}function r(f){i.push(f)}function o(){t.setup(n)}function l(f){t.setupView(n,f)}let c={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:r}}function mD(e){let t=new WeakMap;function n(s,a=0){let r=t.get(s),o;return r===void 0?(o=new Eb(e),t.set(s,[o])):a>=r.length?(o=new Eb(e),r.push(o)):o=r[a],o}function i(){t=new WeakMap}return{get:n,dispose:i}}var gD=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_D=`uniform sampler2D shadow_pass;
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
}`;function vD(e,t,n){let i=new Xc,s=new ae,a=new ae,r=new Pe,o=new Rf({depthPacking:V1}),l=new Df,c={},f=n.maxTextureSize,d={[Gs]:wn,[wn]:Gs,[ds]:ds},h=new li({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:gD,fragmentShader:_D}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let _=new Ba;_.setAttribute("position",new ri(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let M=new Gn(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=w0;let u=this.type;this.render=function(C,w,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let E=e.getRenderTarget(),b=e.getActiveCubeFace(),O=e.getActiveMipmapLevel(),F=e.state;F.setBlending(Ws),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let k=u!==fs&&this.type===fs,q=u===fs&&this.type!==fs;for(let J=0,W=C.length;J<W;J++){let nt=C[J],H=nt.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let ct=H.getFrameExtents();if(s.multiply(ct),a.copy(H.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(a.x=Math.floor(f/ct.x),s.x=a.x*ct.x,H.mapSize.x=a.x),s.y>f&&(a.y=Math.floor(f/ct.y),s.y=a.y*ct.y,H.mapSize.y=a.y)),H.map===null||k===!0||q===!0){let Et=this.type!==fs?{minFilter:Ei,magFilter:Ei}:{};H.map!==null&&H.map.dispose(),H.map=new us(s.x,s.y,Et),H.map.texture.name=nt.name+".shadowMap",H.camera.updateProjectionMatrix()}e.setRenderTarget(H.map),e.clear();let ft=H.getViewportCount();for(let Et=0;Et<ft;Et++){let Gt=H.getViewport(Et);r.set(a.x*Gt.x,a.y*Gt.y,a.x*Gt.z,a.y*Gt.w),F.viewport(r),H.updateMatrices(nt,Et),i=H.getFrustum(),y(w,U,H.camera,nt,this.type)}H.isPointLightShadow!==!0&&this.type===fs&&g(H,U),H.needsUpdate=!1}u=this.type,m.needsUpdate=!1,e.setRenderTarget(E,b,O)};function g(C,w){let U=t.update(M);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new us(s.x,s.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,e.setRenderTarget(C.mapPass),e.clear(),e.renderBufferDirect(w,null,U,h,M,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,e.setRenderTarget(C.map),e.clear(),e.renderBufferDirect(w,null,U,p,M,null)}function v(C,w,U,E){let b=null,O=U.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(O!==void 0)b=O;else if(b=U.isPointLight===!0?l:o,e.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let F=b.uuid,k=w.uuid,q=c[F];q===void 0&&(q={},c[F]=q);let J=q[k];J===void 0&&(J=b.clone(),q[k]=J,w.addEventListener("dispose",T)),b=J}if(b.visible=w.visible,b.wireframe=w.wireframe,E===fs?b.side=w.shadowSide!==null?w.shadowSide:w.side:b.side=w.shadowSide!==null?w.shadowSide:d[w.side],b.alphaMap=w.alphaMap,b.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,b.map=w.map,b.clipShadows=w.clipShadows,b.clippingPlanes=w.clippingPlanes,b.clipIntersection=w.clipIntersection,b.displacementMap=w.displacementMap,b.displacementScale=w.displacementScale,b.displacementBias=w.displacementBias,b.wireframeLinewidth=w.wireframeLinewidth,b.linewidth=w.linewidth,U.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let F=e.properties.get(b);F.light=U}return b}function y(C,w,U,E,b){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&b===fs)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,C.matrixWorld);let k=t.update(C),q=C.material;if(Array.isArray(q)){let J=k.groups;for(let W=0,nt=J.length;W<nt;W++){let H=J[W],ct=q[H.materialIndex];if(ct&&ct.visible){let ft=v(C,ct,E,b);C.onBeforeShadow(e,C,w,U,k,ft,H),e.renderBufferDirect(U,null,k,ft,C,H),C.onAfterShadow(e,C,w,U,k,ft,H)}}}else if(q.visible){let J=v(C,q,E,b);C.onBeforeShadow(e,C,w,U,k,J,null),e.renderBufferDirect(U,null,k,J,C,null),C.onAfterShadow(e,C,w,U,k,J,null)}}let F=C.children;for(let k=0,q=F.length;k<q;k++)y(F[k],w,U,E,b)}function T(C){C.target.removeEventListener("dispose",T);for(let U in c){let E=c[U],b=C.target.uuid;b in E&&(E[b].dispose(),delete E[b])}}}var yD={[Gf]:kf,[Xf]:Yf,[Wf]:Zf,[Ar]:qf,[kf]:Gf,[Yf]:Xf,[Zf]:Wf,[qf]:Ar};function xD(e,t){function n(){let N=!1,it=new Pe,st=null,pt=new Pe(0,0,0,0);return{setMask:function(tt){st!==tt&&!N&&(e.colorMask(tt,tt,tt,tt),st=tt)},setLocked:function(tt){N=tt},setClear:function(tt,Z,xt,Lt,te){te===!0&&(tt*=Lt,Z*=Lt,xt*=Lt),it.set(tt,Z,xt,Lt),pt.equals(it)===!1&&(e.clearColor(tt,Z,xt,Lt),pt.copy(it))},reset:function(){N=!1,st=null,pt.set(-1,0,0,0)}}}function i(){let N=!1,it=!1,st=null,pt=null,tt=null;return{setReversed:function(Z){if(it!==Z){let xt=t.get("EXT_clip_control");Z?xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.ZERO_TO_ONE_EXT):xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.NEGATIVE_ONE_TO_ONE_EXT),it=Z;let Lt=tt;tt=null,this.setClear(Lt)}},getReversed:function(){return it},setTest:function(Z){Z?$(e.DEPTH_TEST):gt(e.DEPTH_TEST)},setMask:function(Z){st!==Z&&!N&&(e.depthMask(Z),st=Z)},setFunc:function(Z){if(it&&(Z=yD[Z]),pt!==Z){switch(Z){case Gf:e.depthFunc(e.NEVER);break;case kf:e.depthFunc(e.ALWAYS);break;case Xf:e.depthFunc(e.LESS);break;case Ar:e.depthFunc(e.LEQUAL);break;case Wf:e.depthFunc(e.EQUAL);break;case qf:e.depthFunc(e.GEQUAL);break;case Yf:e.depthFunc(e.GREATER);break;case Zf:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}pt=Z}},setLocked:function(Z){N=Z},setClear:function(Z){tt!==Z&&(it&&(Z=1-Z),e.clearDepth(Z),tt=Z)},reset:function(){N=!1,st=null,pt=null,tt=null,it=!1}}}function s(){let N=!1,it=null,st=null,pt=null,tt=null,Z=null,xt=null,Lt=null,te=null;return{setTest:function(jt){N||(jt?$(e.STENCIL_TEST):gt(e.STENCIL_TEST))},setMask:function(jt){it!==jt&&!N&&(e.stencilMask(jt),it=jt)},setFunc:function(jt,Rn,kn){(st!==jt||pt!==Rn||tt!==kn)&&(e.stencilFunc(jt,Rn,kn),st=jt,pt=Rn,tt=kn)},setOp:function(jt,Rn,kn){(Z!==jt||xt!==Rn||Lt!==kn)&&(e.stencilOp(jt,Rn,kn),Z=jt,xt=Rn,Lt=kn)},setLocked:function(jt){N=jt},setClear:function(jt){te!==jt&&(e.clearStencil(jt),te=jt)},reset:function(){N=!1,it=null,st=null,pt=null,tt=null,Z=null,xt=null,Lt=null,te=null}}}let a=new n,r=new i,o=new s,l=new WeakMap,c=new WeakMap,f={},d={},h=new WeakMap,p=[],_=null,M=!1,m=null,u=null,g=null,v=null,y=null,T=null,C=null,w=new re(0,0,0),U=0,E=!1,b=null,O=null,F=null,k=null,q=null,J=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,nt=0,H=e.getParameter(e.VERSION);H.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(H)[1]),W=nt>=1):H.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),W=nt>=2);let ct=null,ft={},Et=e.getParameter(e.SCISSOR_BOX),Gt=e.getParameter(e.VIEWPORT),le=new Pe().fromArray(Et),pe=new Pe().fromArray(Gt);function Jt(N,it,st,pt){let tt=new Uint8Array(4),Z=e.createTexture();e.bindTexture(N,Z),e.texParameteri(N,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(N,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let xt=0;xt<st;xt++)N===e.TEXTURE_3D||N===e.TEXTURE_2D_ARRAY?e.texImage3D(it,0,e.RGBA,1,1,pt,0,e.RGBA,e.UNSIGNED_BYTE,tt):e.texImage2D(it+xt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,tt);return Z}let Y={};Y[e.TEXTURE_2D]=Jt(e.TEXTURE_2D,e.TEXTURE_2D,1),Y[e.TEXTURE_CUBE_MAP]=Jt(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[e.TEXTURE_2D_ARRAY]=Jt(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Y[e.TEXTURE_3D]=Jt(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),$(e.DEPTH_TEST),r.setFunc(Ar),wt(!1),St(A0),$(e.CULL_FACE),ve(Ws);function $(N){f[N]!==!0&&(e.enable(N),f[N]=!0)}function gt(N){f[N]!==!1&&(e.disable(N),f[N]=!1)}function Nt(N,it){return d[N]!==it?(e.bindFramebuffer(N,it),d[N]=it,N===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=it),N===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=it),!0):!1}function Mt(N,it){let st=p,pt=!1;if(N){st=h.get(it),st===void 0&&(st=[],h.set(it,st));let tt=N.textures;if(st.length!==tt.length||st[0]!==e.COLOR_ATTACHMENT0){for(let Z=0,xt=tt.length;Z<xt;Z++)st[Z]=e.COLOR_ATTACHMENT0+Z;st.length=tt.length,pt=!0}}else st[0]!==e.BACK&&(st[0]=e.BACK,pt=!0);pt&&e.drawBuffers(st)}function Wt(N){return _!==N?(e.useProgram(N),_=N,!0):!1}let Xe={[Ia]:e.FUNC_ADD,[d1]:e.FUNC_SUBTRACT,[p1]:e.FUNC_REVERSE_SUBTRACT};Xe[m1]=e.MIN,Xe[g1]=e.MAX;let R={[_1]:e.ZERO,[v1]:e.ONE,[y1]:e.SRC_COLOR,[_f]:e.SRC_ALPHA,[T1]:e.SRC_ALPHA_SATURATE,[b1]:e.DST_COLOR,[S1]:e.DST_ALPHA,[x1]:e.ONE_MINUS_SRC_COLOR,[vf]:e.ONE_MINUS_SRC_ALPHA,[E1]:e.ONE_MINUS_DST_COLOR,[M1]:e.ONE_MINUS_DST_ALPHA,[A1]:e.CONSTANT_COLOR,[w1]:e.ONE_MINUS_CONSTANT_COLOR,[C1]:e.CONSTANT_ALPHA,[R1]:e.ONE_MINUS_CONSTANT_ALPHA};function ve(N,it,st,pt,tt,Z,xt,Lt,te,jt){if(N===Ws){M===!0&&(gt(e.BLEND),M=!1);return}if(M===!1&&($(e.BLEND),M=!0),N!==f1){if(N!==m||jt!==E){if((u!==Ia||y!==Ia)&&(e.blendEquation(e.FUNC_ADD),u=Ia,y=Ia),jt)switch(N){case Tr:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case C0:e.blendFunc(e.ONE,e.ONE);break;case R0:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case D0:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Tr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case C0:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case R0:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case D0:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}g=null,v=null,T=null,C=null,w.set(0,0,0),U=0,m=N,E=jt}return}tt=tt||it,Z=Z||st,xt=xt||pt,(it!==u||tt!==y)&&(e.blendEquationSeparate(Xe[it],Xe[tt]),u=it,y=tt),(st!==g||pt!==v||Z!==T||xt!==C)&&(e.blendFuncSeparate(R[st],R[pt],R[Z],R[xt]),g=st,v=pt,T=Z,C=xt),(Lt.equals(w)===!1||te!==U)&&(e.blendColor(Lt.r,Lt.g,Lt.b,te),w.copy(Lt),U=te),m=N,E=!1}function It(N,it){N.side===ds?gt(e.CULL_FACE):$(e.CULL_FACE);let st=N.side===wn;it&&(st=!st),wt(st),N.blending===Tr&&N.transparent===!1?ve(Ws):ve(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),r.setFunc(N.depthFunc),r.setTest(N.depthTest),r.setMask(N.depthWrite),a.setMask(N.colorWrite);let pt=N.stencilWrite;o.setTest(pt),pt&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),mt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?$(e.SAMPLE_ALPHA_TO_COVERAGE):gt(e.SAMPLE_ALPHA_TO_COVERAGE)}function wt(N){b!==N&&(N?e.frontFace(e.CW):e.frontFace(e.CCW),b=N)}function St(N){N!==c1?($(e.CULL_FACE),N!==O&&(N===A0?e.cullFace(e.BACK):N===u1?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):gt(e.CULL_FACE),O=N}function me(N){N!==F&&(W&&e.lineWidth(N),F=N)}function mt(N,it,st){N?($(e.POLYGON_OFFSET_FILL),(k!==it||q!==st)&&(e.polygonOffset(it,st),k=it,q=st)):gt(e.POLYGON_OFFSET_FILL)}function Pt(N){N?$(e.SCISSOR_TEST):gt(e.SCISSOR_TEST)}function De(N){N===void 0&&(N=e.TEXTURE0+J-1),ct!==N&&(e.activeTexture(N),ct=N)}function ge(N,it,st){st===void 0&&(ct===null?st=e.TEXTURE0+J-1:st=ct);let pt=ft[st];pt===void 0&&(pt={type:void 0,texture:void 0},ft[st]=pt),(pt.type!==N||pt.texture!==it)&&(ct!==st&&(e.activeTexture(st),ct=st),e.bindTexture(N,it||Y[N]),pt.type=N,pt.texture=it)}function A(){let N=ft[ct];N!==void 0&&N.type!==void 0&&(e.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function S(){try{e.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function B(){try{e.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function G(){try{e.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function K(){try{e.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function V(){try{e.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Tt(){try{e.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function at(){try{e.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _t(){try{e.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function vt(){try{e.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Q(){try{e.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function rt(N){le.equals(N)===!1&&(e.scissor(N.x,N.y,N.z,N.w),le.copy(N))}function Ct(N){pe.equals(N)===!1&&(e.viewport(N.x,N.y,N.z,N.w),pe.copy(N))}function yt(N,it){let st=c.get(it);st===void 0&&(st=new WeakMap,c.set(it,st));let pt=st.get(N);pt===void 0&&(pt=e.getUniformBlockIndex(it,N.name),st.set(N,pt))}function ot(N,it){let pt=c.get(it).get(N);l.get(it)!==pt&&(e.uniformBlockBinding(it,pt,N.__bindingPointIndex),l.set(it,pt))}function Dt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),f={},ct=null,ft={},d={},h=new WeakMap,p=[],_=null,M=!1,m=null,u=null,g=null,v=null,y=null,T=null,C=null,w=new re(0,0,0),U=0,E=!1,b=null,O=null,F=null,k=null,q=null,le.set(0,0,e.canvas.width,e.canvas.height),pe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:$,disable:gt,bindFramebuffer:Nt,drawBuffers:Mt,useProgram:Wt,setBlending:ve,setMaterial:It,setFlipSided:wt,setCullFace:St,setLineWidth:me,setPolygonOffset:mt,setScissorTest:Pt,activeTexture:De,bindTexture:ge,unbindTexture:A,compressedTexImage2D:S,compressedTexImage3D:B,texImage2D:vt,texImage3D:Q,updateUBOMapping:yt,uniformBlockBinding:ot,texStorage2D:at,texStorage3D:_t,texSubImage2D:G,texSubImage3D:K,compressedTexSubImage2D:V,compressedTexSubImage3D:Tt,scissor:rt,viewport:Ct,reset:Dt}}function SD(e,t,n,i,s,a,r){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ae,f=new WeakMap,d,h=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,S){return p?new OffscreenCanvas(A,S):Pc("canvas")}function M(A,S,B){let G=1,K=ge(A);if((K.width>B||K.height>B)&&(G=B/Math.max(K.width,K.height)),G<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let V=Math.floor(G*K.width),Tt=Math.floor(G*K.height);d===void 0&&(d=_(V,Tt));let at=S?_(V,Tt):d;return at.width=V,at.height=Tt,at.getContext("2d").drawImage(A,0,0,V,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+V+"x"+Tt+")."),at}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),A;return A}function m(A){return A.generateMipmaps}function u(A){e.generateMipmap(A)}function g(A){return A.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?e.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function v(A,S,B,G,K=!1){if(A!==null){if(e[A]!==void 0)return e[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let V=S;if(S===e.RED&&(B===e.FLOAT&&(V=e.R32F),B===e.HALF_FLOAT&&(V=e.R16F),B===e.UNSIGNED_BYTE&&(V=e.R8)),S===e.RED_INTEGER&&(B===e.UNSIGNED_BYTE&&(V=e.R8UI),B===e.UNSIGNED_SHORT&&(V=e.R16UI),B===e.UNSIGNED_INT&&(V=e.R32UI),B===e.BYTE&&(V=e.R8I),B===e.SHORT&&(V=e.R16I),B===e.INT&&(V=e.R32I)),S===e.RG&&(B===e.FLOAT&&(V=e.RG32F),B===e.HALF_FLOAT&&(V=e.RG16F),B===e.UNSIGNED_BYTE&&(V=e.RG8)),S===e.RG_INTEGER&&(B===e.UNSIGNED_BYTE&&(V=e.RG8UI),B===e.UNSIGNED_SHORT&&(V=e.RG16UI),B===e.UNSIGNED_INT&&(V=e.RG32UI),B===e.BYTE&&(V=e.RG8I),B===e.SHORT&&(V=e.RG16I),B===e.INT&&(V=e.RG32I)),S===e.RGB_INTEGER&&(B===e.UNSIGNED_BYTE&&(V=e.RGB8UI),B===e.UNSIGNED_SHORT&&(V=e.RGB16UI),B===e.UNSIGNED_INT&&(V=e.RGB32UI),B===e.BYTE&&(V=e.RGB8I),B===e.SHORT&&(V=e.RGB16I),B===e.INT&&(V=e.RGB32I)),S===e.RGBA_INTEGER&&(B===e.UNSIGNED_BYTE&&(V=e.RGBA8UI),B===e.UNSIGNED_SHORT&&(V=e.RGBA16UI),B===e.UNSIGNED_INT&&(V=e.RGBA32UI),B===e.BYTE&&(V=e.RGBA8I),B===e.SHORT&&(V=e.RGBA16I),B===e.INT&&(V=e.RGBA32I)),S===e.RGB&&(B===e.UNSIGNED_INT_5_9_9_9_REV&&(V=e.RGB9_E5),B===e.UNSIGNED_INT_10F_11F_11F_REV&&(V=e.R11F_G11F_B10F)),S===e.RGBA){let Tt=K?Oc:$t.getTransfer(G);B===e.FLOAT&&(V=e.RGBA32F),B===e.HALF_FLOAT&&(V=e.RGBA16F),B===e.UNSIGNED_BYTE&&(V=Tt===de?e.SRGB8_ALPHA8:e.RGBA8),B===e.UNSIGNED_SHORT_4_4_4_4&&(V=e.RGBA4),B===e.UNSIGNED_SHORT_5_5_5_1&&(V=e.RGB5_A1)}return(V===e.R16F||V===e.R32F||V===e.RG16F||V===e.RG32F||V===e.RGBA16F||V===e.RGBA32F)&&t.get("EXT_color_buffer_float"),V}function y(A,S){let B;return A?S===null||S===Va||S===dl?B=e.DEPTH24_STENCIL8:S===ms?B=e.DEPTH32F_STENCIL8:S===hl&&(B=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Va||S===dl?B=e.DEPTH_COMPONENT24:S===ms?B=e.DEPTH_COMPONENT32F:S===hl&&(B=e.DEPTH_COMPONENT16),B}function T(A,S){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ei&&A.minFilter!==ki?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function C(A){let S=A.target;S.removeEventListener("dispose",C),U(S),S.isVideoTexture&&f.delete(S)}function w(A){let S=A.target;S.removeEventListener("dispose",w),b(S)}function U(A){let S=i.get(A);if(S.__webglInit===void 0)return;let B=A.source,G=h.get(B);if(G){let K=G[S.__cacheKey];K.usedTimes--,K.usedTimes===0&&E(A),Object.keys(G).length===0&&h.delete(B)}i.remove(A)}function E(A){let S=i.get(A);e.deleteTexture(S.__webglTexture);let B=A.source,G=h.get(B);delete G[S.__cacheKey],r.memory.textures--}function b(A){let S=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(S.__webglFramebuffer[G]))for(let K=0;K<S.__webglFramebuffer[G].length;K++)e.deleteFramebuffer(S.__webglFramebuffer[G][K]);else e.deleteFramebuffer(S.__webglFramebuffer[G]);S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer[G])}else{if(Array.isArray(S.__webglFramebuffer))for(let G=0;G<S.__webglFramebuffer.length;G++)e.deleteFramebuffer(S.__webglFramebuffer[G]);else e.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&e.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let G=0;G<S.__webglColorRenderbuffer.length;G++)S.__webglColorRenderbuffer[G]&&e.deleteRenderbuffer(S.__webglColorRenderbuffer[G]);S.__webglDepthRenderbuffer&&e.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let B=A.textures;for(let G=0,K=B.length;G<K;G++){let V=i.get(B[G]);V.__webglTexture&&(e.deleteTexture(V.__webglTexture),r.memory.textures--),i.remove(B[G])}i.remove(A)}let O=0;function F(){O=0}function k(){let A=O;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),O+=1,A}function q(A){let S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function J(A,S){let B=i.get(A);if(A.isVideoTexture&&Pt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&B.__version!==A.version){let G=A.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(B,A,S);return}}else A.isExternalTexture&&(B.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,B.__webglTexture,e.TEXTURE0+S)}function W(A,S){let B=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){Y(B,A,S);return}n.bindTexture(e.TEXTURE_2D_ARRAY,B.__webglTexture,e.TEXTURE0+S)}function nt(A,S){let B=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){Y(B,A,S);return}n.bindTexture(e.TEXTURE_3D,B.__webglTexture,e.TEXTURE0+S)}function H(A,S){let B=i.get(A);if(A.version>0&&B.__version!==A.version){$(B,A,S);return}n.bindTexture(e.TEXTURE_CUBE_MAP,B.__webglTexture,e.TEXTURE0+S)}let ct={[yf]:e.REPEAT,[Oa]:e.CLAMP_TO_EDGE,[xf]:e.MIRRORED_REPEAT},ft={[Ei]:e.NEAREST,[F1]:e.NEAREST_MIPMAP_NEAREST,[Jc]:e.NEAREST_MIPMAP_LINEAR,[ki]:e.LINEAR,[Qf]:e.LINEAR_MIPMAP_NEAREST,[Ha]:e.LINEAR_MIPMAP_LINEAR},Et={[X1]:e.NEVER,[K1]:e.ALWAYS,[W1]:e.LESS,[V0]:e.LEQUAL,[q1]:e.EQUAL,[J1]:e.GEQUAL,[Y1]:e.GREATER,[Z1]:e.NOTEQUAL};function Gt(A,S){if(S.type===ms&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===ki||S.magFilter===Qf||S.magFilter===Jc||S.magFilter===Ha||S.minFilter===ki||S.minFilter===Qf||S.minFilter===Jc||S.minFilter===Ha)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(A,e.TEXTURE_WRAP_S,ct[S.wrapS]),e.texParameteri(A,e.TEXTURE_WRAP_T,ct[S.wrapT]),(A===e.TEXTURE_3D||A===e.TEXTURE_2D_ARRAY)&&e.texParameteri(A,e.TEXTURE_WRAP_R,ct[S.wrapR]),e.texParameteri(A,e.TEXTURE_MAG_FILTER,ft[S.magFilter]),e.texParameteri(A,e.TEXTURE_MIN_FILTER,ft[S.minFilter]),S.compareFunction&&(e.texParameteri(A,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(A,e.TEXTURE_COMPARE_FUNC,Et[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ei||S.minFilter!==Jc&&S.minFilter!==Ha||S.type===ms&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");e.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function le(A,S){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",C));let G=S.source,K=h.get(G);K===void 0&&(K={},h.set(G,K));let V=q(S);if(V!==A.__cacheKey){K[V]===void 0&&(K[V]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,B=!0),K[V].usedTimes++;let Tt=K[A.__cacheKey];Tt!==void 0&&(K[A.__cacheKey].usedTimes--,Tt.usedTimes===0&&E(S)),A.__cacheKey=V,A.__webglTexture=K[V].texture}return B}function pe(A,S,B){return Math.floor(Math.floor(A/B)/S)}function Jt(A,S,B,G){let V=A.updateRanges;if(V.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,S.width,S.height,B,G,S.data);else{V.sort((Q,rt)=>Q.start-rt.start);let Tt=0;for(let Q=1;Q<V.length;Q++){let rt=V[Tt],Ct=V[Q],yt=rt.start+rt.count,ot=pe(Ct.start,S.width,4),Dt=pe(rt.start,S.width,4);Ct.start<=yt+1&&ot===Dt&&pe(Ct.start+Ct.count-1,S.width,4)===ot?rt.count=Math.max(rt.count,Ct.start+Ct.count-rt.start):(++Tt,V[Tt]=Ct)}V.length=Tt+1;let at=e.getParameter(e.UNPACK_ROW_LENGTH),_t=e.getParameter(e.UNPACK_SKIP_PIXELS),vt=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,S.width);for(let Q=0,rt=V.length;Q<rt;Q++){let Ct=V[Q],yt=Math.floor(Ct.start/4),ot=Math.ceil(Ct.count/4),Dt=yt%S.width,N=Math.floor(yt/S.width),it=ot,st=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Dt),e.pixelStorei(e.UNPACK_SKIP_ROWS,N),n.texSubImage2D(e.TEXTURE_2D,0,Dt,N,it,st,B,G,S.data)}A.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,at),e.pixelStorei(e.UNPACK_SKIP_PIXELS,_t),e.pixelStorei(e.UNPACK_SKIP_ROWS,vt)}}function Y(A,S,B){let G=e.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(G=e.TEXTURE_2D_ARRAY),S.isData3DTexture&&(G=e.TEXTURE_3D);let K=le(A,S),V=S.source;n.bindTexture(G,A.__webglTexture,e.TEXTURE0+B);let Tt=i.get(V);if(V.version!==Tt.__version||K===!0){n.activeTexture(e.TEXTURE0+B);let at=$t.getPrimaries($t.workingColorSpace),_t=S.colorSpace===Ys?null:$t.getPrimaries(S.colorSpace),vt=S.colorSpace===Ys||at===_t?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let Q=M(S.image,!1,s.maxTextureSize);Q=De(S,Q);let rt=a.convert(S.format,S.colorSpace),Ct=a.convert(S.type),yt=v(S.internalFormat,rt,Ct,S.colorSpace,S.isVideoTexture);Gt(G,S);let ot,Dt=S.mipmaps,N=S.isVideoTexture!==!0,it=Tt.__version===void 0||K===!0,st=V.dataReady,pt=T(S,Q);if(S.isDepthTexture)yt=y(S.format===pl,S.type),it&&(N?n.texStorage2D(e.TEXTURE_2D,1,yt,Q.width,Q.height):n.texImage2D(e.TEXTURE_2D,0,yt,Q.width,Q.height,0,rt,Ct,null));else if(S.isDataTexture)if(Dt.length>0){N&&it&&n.texStorage2D(e.TEXTURE_2D,pt,yt,Dt[0].width,Dt[0].height);for(let tt=0,Z=Dt.length;tt<Z;tt++)ot=Dt[tt],N?st&&n.texSubImage2D(e.TEXTURE_2D,tt,0,0,ot.width,ot.height,rt,Ct,ot.data):n.texImage2D(e.TEXTURE_2D,tt,yt,ot.width,ot.height,0,rt,Ct,ot.data);S.generateMipmaps=!1}else N?(it&&n.texStorage2D(e.TEXTURE_2D,pt,yt,Q.width,Q.height),st&&Jt(S,Q,rt,Ct)):n.texImage2D(e.TEXTURE_2D,0,yt,Q.width,Q.height,0,rt,Ct,Q.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){N&&it&&n.texStorage3D(e.TEXTURE_2D_ARRAY,pt,yt,Dt[0].width,Dt[0].height,Q.depth);for(let tt=0,Z=Dt.length;tt<Z;tt++)if(ot=Dt[tt],S.format!==Ai)if(rt!==null)if(N){if(st)if(S.layerUpdates.size>0){let xt=Y0(ot.width,ot.height,S.format,S.type);for(let Lt of S.layerUpdates){let te=ot.data.subarray(Lt*xt/ot.data.BYTES_PER_ELEMENT,(Lt+1)*xt/ot.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,tt,0,0,Lt,ot.width,ot.height,1,rt,te)}S.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,tt,0,0,0,ot.width,ot.height,Q.depth,rt,ot.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,tt,yt,ot.width,ot.height,Q.depth,0,ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?st&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,tt,0,0,0,ot.width,ot.height,Q.depth,rt,Ct,ot.data):n.texImage3D(e.TEXTURE_2D_ARRAY,tt,yt,ot.width,ot.height,Q.depth,0,rt,Ct,ot.data)}else{N&&it&&n.texStorage2D(e.TEXTURE_2D,pt,yt,Dt[0].width,Dt[0].height);for(let tt=0,Z=Dt.length;tt<Z;tt++)ot=Dt[tt],S.format!==Ai?rt!==null?N?st&&n.compressedTexSubImage2D(e.TEXTURE_2D,tt,0,0,ot.width,ot.height,rt,ot.data):n.compressedTexImage2D(e.TEXTURE_2D,tt,yt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?st&&n.texSubImage2D(e.TEXTURE_2D,tt,0,0,ot.width,ot.height,rt,Ct,ot.data):n.texImage2D(e.TEXTURE_2D,tt,yt,ot.width,ot.height,0,rt,Ct,ot.data)}else if(S.isDataArrayTexture)if(N){if(it&&n.texStorage3D(e.TEXTURE_2D_ARRAY,pt,yt,Q.width,Q.height,Q.depth),st)if(S.layerUpdates.size>0){let tt=Y0(Q.width,Q.height,S.format,S.type);for(let Z of S.layerUpdates){let xt=Q.data.subarray(Z*tt/Q.data.BYTES_PER_ELEMENT,(Z+1)*tt/Q.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,Z,Q.width,Q.height,1,rt,Ct,xt)}S.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,rt,Ct,Q.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,yt,Q.width,Q.height,Q.depth,0,rt,Ct,Q.data);else if(S.isData3DTexture)N?(it&&n.texStorage3D(e.TEXTURE_3D,pt,yt,Q.width,Q.height,Q.depth),st&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,rt,Ct,Q.data)):n.texImage3D(e.TEXTURE_3D,0,yt,Q.width,Q.height,Q.depth,0,rt,Ct,Q.data);else if(S.isFramebufferTexture){if(it)if(N)n.texStorage2D(e.TEXTURE_2D,pt,yt,Q.width,Q.height);else{let tt=Q.width,Z=Q.height;for(let xt=0;xt<pt;xt++)n.texImage2D(e.TEXTURE_2D,xt,yt,tt,Z,0,rt,Ct,null),tt>>=1,Z>>=1}}else if(Dt.length>0){if(N&&it){let tt=ge(Dt[0]);n.texStorage2D(e.TEXTURE_2D,pt,yt,tt.width,tt.height)}for(let tt=0,Z=Dt.length;tt<Z;tt++)ot=Dt[tt],N?st&&n.texSubImage2D(e.TEXTURE_2D,tt,0,0,rt,Ct,ot):n.texImage2D(e.TEXTURE_2D,tt,yt,rt,Ct,ot);S.generateMipmaps=!1}else if(N){if(it){let tt=ge(Q);n.texStorage2D(e.TEXTURE_2D,pt,yt,tt.width,tt.height)}st&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,rt,Ct,Q)}else n.texImage2D(e.TEXTURE_2D,0,yt,rt,Ct,Q);m(S)&&u(G),Tt.__version=V.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function $(A,S,B){if(S.image.length!==6)return;let G=le(A,S),K=S.source;n.bindTexture(e.TEXTURE_CUBE_MAP,A.__webglTexture,e.TEXTURE0+B);let V=i.get(K);if(K.version!==V.__version||G===!0){n.activeTexture(e.TEXTURE0+B);let Tt=$t.getPrimaries($t.workingColorSpace),at=S.colorSpace===Ys?null:$t.getPrimaries(S.colorSpace),_t=S.colorSpace===Ys||Tt===at?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);let vt=S.isCompressedTexture||S.image[0].isCompressedTexture,Q=S.image[0]&&S.image[0].isDataTexture,rt=[];for(let Z=0;Z<6;Z++)!vt&&!Q?rt[Z]=M(S.image[Z],!0,s.maxCubemapSize):rt[Z]=Q?S.image[Z].image:S.image[Z],rt[Z]=De(S,rt[Z]);let Ct=rt[0],yt=a.convert(S.format,S.colorSpace),ot=a.convert(S.type),Dt=v(S.internalFormat,yt,ot,S.colorSpace),N=S.isVideoTexture!==!0,it=V.__version===void 0||G===!0,st=K.dataReady,pt=T(S,Ct);Gt(e.TEXTURE_CUBE_MAP,S);let tt;if(vt){N&&it&&n.texStorage2D(e.TEXTURE_CUBE_MAP,pt,Dt,Ct.width,Ct.height);for(let Z=0;Z<6;Z++){tt=rt[Z].mipmaps;for(let xt=0;xt<tt.length;xt++){let Lt=tt[xt];S.format!==Ai?yt!==null?N?st&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt,0,0,Lt.width,Lt.height,yt,Lt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt,Dt,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?st&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt,0,0,Lt.width,Lt.height,yt,ot,Lt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt,Dt,Lt.width,Lt.height,0,yt,ot,Lt.data)}}}else{if(tt=S.mipmaps,N&&it){tt.length>0&&pt++;let Z=ge(rt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,pt,Dt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(Q){N?st&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,rt[Z].width,rt[Z].height,yt,ot,rt[Z].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Dt,rt[Z].width,rt[Z].height,0,yt,ot,rt[Z].data);for(let xt=0;xt<tt.length;xt++){let te=tt[xt].image[Z].image;N?st&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt+1,0,0,te.width,te.height,yt,ot,te.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt+1,Dt,te.width,te.height,0,yt,ot,te.data)}}else{N?st&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,yt,ot,rt[Z]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Dt,yt,ot,rt[Z]);for(let xt=0;xt<tt.length;xt++){let Lt=tt[xt];N?st&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt+1,0,0,yt,ot,Lt.image[Z]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt+1,Dt,yt,ot,Lt.image[Z])}}}m(S)&&u(e.TEXTURE_CUBE_MAP),V.__version=K.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function gt(A,S,B,G,K,V){let Tt=a.convert(B.format,B.colorSpace),at=a.convert(B.type),_t=v(B.internalFormat,Tt,at,B.colorSpace),vt=i.get(S),Q=i.get(B);if(Q.__renderTarget=S,!vt.__hasExternalTextures){let rt=Math.max(1,S.width>>V),Ct=Math.max(1,S.height>>V);K===e.TEXTURE_3D||K===e.TEXTURE_2D_ARRAY?n.texImage3D(K,V,_t,rt,Ct,S.depth,0,Tt,at,null):n.texImage2D(K,V,_t,rt,Ct,0,Tt,at,null)}n.bindFramebuffer(e.FRAMEBUFFER,A),mt(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,G,K,Q.__webglTexture,0,me(S)):(K===e.TEXTURE_2D||K>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,G,K,Q.__webglTexture,V),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Nt(A,S,B){if(e.bindRenderbuffer(e.RENDERBUFFER,A),S.depthBuffer){let G=S.depthTexture,K=G&&G.isDepthTexture?G.type:null,V=y(S.stencilBuffer,K),Tt=S.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,at=me(S);mt(S)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,at,V,S.width,S.height):B?e.renderbufferStorageMultisample(e.RENDERBUFFER,at,V,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,V,S.width,S.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Tt,e.RENDERBUFFER,A)}else{let G=S.textures;for(let K=0;K<G.length;K++){let V=G[K],Tt=a.convert(V.format,V.colorSpace),at=a.convert(V.type),_t=v(V.internalFormat,Tt,at,V.colorSpace),vt=me(S);B&&mt(S)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,vt,_t,S.width,S.height):mt(S)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,vt,_t,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,_t,S.width,S.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Mt(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let G=i.get(S.depthTexture);G.__renderTarget=S,(!G.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),J(S.depthTexture,0);let K=G.__webglTexture,V=me(S);if(S.depthTexture.format===al)mt(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0,V):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0);else if(S.depthTexture.format===pl)mt(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0,V):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Wt(A){let S=i.get(A),B=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){let G=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),G){let K=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,G.removeEventListener("dispose",K)};G.addEventListener("dispose",K),S.__depthDisposeCallback=K}S.__boundDepthTexture=G}if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");let G=A.texture.mipmaps;G&&G.length>0?Mt(S.__webglFramebuffer[0],A):Mt(S.__webglFramebuffer,A)}else if(B){S.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer[G]),S.__webglDepthbuffer[G]===void 0)S.__webglDepthbuffer[G]=e.createRenderbuffer(),Nt(S.__webglDepthbuffer[G],A,!1);else{let K=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,V=S.__webglDepthbuffer[G];e.bindRenderbuffer(e.RENDERBUFFER,V),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,V)}}else{let G=A.texture.mipmaps;if(G&&G.length>0?n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=e.createRenderbuffer(),Nt(S.__webglDepthbuffer,A,!1);else{let K=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,V=S.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,V),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,V)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Xe(A,S,B){let G=i.get(A);S!==void 0&&gt(G.__webglFramebuffer,A,A.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),B!==void 0&&Wt(A)}function R(A){let S=A.texture,B=i.get(A),G=i.get(S);A.addEventListener("dispose",w);let K=A.textures,V=A.isWebGLCubeRenderTarget===!0,Tt=K.length>1;if(Tt||(G.__webglTexture===void 0&&(G.__webglTexture=e.createTexture()),G.__version=S.version,r.memory.textures++),V){B.__webglFramebuffer=[];for(let at=0;at<6;at++)if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[at]=[];for(let _t=0;_t<S.mipmaps.length;_t++)B.__webglFramebuffer[at][_t]=e.createFramebuffer()}else B.__webglFramebuffer[at]=e.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let at=0;at<S.mipmaps.length;at++)B.__webglFramebuffer[at]=e.createFramebuffer()}else B.__webglFramebuffer=e.createFramebuffer();if(Tt)for(let at=0,_t=K.length;at<_t;at++){let vt=i.get(K[at]);vt.__webglTexture===void 0&&(vt.__webglTexture=e.createTexture(),r.memory.textures++)}if(A.samples>0&&mt(A)===!1){B.__webglMultisampledFramebuffer=e.createFramebuffer(),B.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let at=0;at<K.length;at++){let _t=K[at];B.__webglColorRenderbuffer[at]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,B.__webglColorRenderbuffer[at]);let vt=a.convert(_t.format,_t.colorSpace),Q=a.convert(_t.type),rt=v(_t.internalFormat,vt,Q,_t.colorSpace,A.isXRRenderTarget===!0),Ct=me(A);e.renderbufferStorageMultisample(e.RENDERBUFFER,Ct,rt,A.width,A.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+at,e.RENDERBUFFER,B.__webglColorRenderbuffer[at])}e.bindRenderbuffer(e.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=e.createRenderbuffer(),Nt(B.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(V){n.bindTexture(e.TEXTURE_CUBE_MAP,G.__webglTexture),Gt(e.TEXTURE_CUBE_MAP,S);for(let at=0;at<6;at++)if(S.mipmaps&&S.mipmaps.length>0)for(let _t=0;_t<S.mipmaps.length;_t++)gt(B.__webglFramebuffer[at][_t],A,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+at,_t);else gt(B.__webglFramebuffer[at],A,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);m(S)&&u(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Tt){for(let at=0,_t=K.length;at<_t;at++){let vt=K[at],Q=i.get(vt),rt=e.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(rt=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(rt,Q.__webglTexture),Gt(rt,vt),gt(B.__webglFramebuffer,A,vt,e.COLOR_ATTACHMENT0+at,rt,0),m(vt)&&u(rt)}n.unbindTexture()}else{let at=e.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(at=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(at,G.__webglTexture),Gt(at,S),S.mipmaps&&S.mipmaps.length>0)for(let _t=0;_t<S.mipmaps.length;_t++)gt(B.__webglFramebuffer[_t],A,S,e.COLOR_ATTACHMENT0,at,_t);else gt(B.__webglFramebuffer,A,S,e.COLOR_ATTACHMENT0,at,0);m(S)&&u(at),n.unbindTexture()}A.depthBuffer&&Wt(A)}function ve(A){let S=A.textures;for(let B=0,G=S.length;B<G;B++){let K=S[B];if(m(K)){let V=g(A),Tt=i.get(K).__webglTexture;n.bindTexture(V,Tt),u(V),n.unbindTexture()}}}let It=[],wt=[];function St(A){if(A.samples>0){if(mt(A)===!1){let S=A.textures,B=A.width,G=A.height,K=e.COLOR_BUFFER_BIT,V=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Tt=i.get(A),at=S.length>1;if(at)for(let vt=0;vt<S.length;vt++)n.bindFramebuffer(e.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+vt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,Tt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+vt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer);let _t=A.texture.mipmaps;_t&&_t.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let vt=0;vt<S.length;vt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(K|=e.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(K|=e.STENCIL_BUFFER_BIT)),at){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Tt.__webglColorRenderbuffer[vt]);let Q=i.get(S[vt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Q,0)}e.blitFramebuffer(0,0,B,G,0,0,B,G,K,e.NEAREST),l===!0&&(It.length=0,wt.length=0,It.push(e.COLOR_ATTACHMENT0+vt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(It.push(V),wt.push(V),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,wt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,It))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),at)for(let vt=0;vt<S.length;vt++){n.bindFramebuffer(e.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+vt,e.RENDERBUFFER,Tt.__webglColorRenderbuffer[vt]);let Q=i.get(S[vt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,Tt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+vt,e.TEXTURE_2D,Q,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){let S=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[S])}}}function me(A){return Math.min(s.maxSamples,A.samples)}function mt(A){let S=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Pt(A){let S=r.render.frame;f.get(A)!==S&&(f.set(A,S),A.update())}function De(A,S){let B=A.colorSpace,G=A.format,K=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==wr&&B!==Ys&&($t.getTransfer(B)===de?(G!==Ai||K!==ps)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),S}function ge(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=F,this.setTexture2D=J,this.setTexture2DArray=W,this.setTexture3D=nt,this.setTextureCube=H,this.rebindTextures=Xe,this.setupRenderTarget=R,this.updateRenderTargetMipmap=ve,this.updateMultisampleRenderTarget=St,this.setupDepthRenderbuffer=Wt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=mt}function MD(e,t){function n(i,s=Ys){let a,r=$t.getTransfer(s);if(i===ps)return e.UNSIGNED_BYTE;if(i===$f)return e.UNSIGNED_SHORT_4_4_4_4;if(i===td)return e.UNSIGNED_SHORT_5_5_5_1;if(i===I0)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===P0)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===L0)return e.BYTE;if(i===O0)return e.SHORT;if(i===hl)return e.UNSIGNED_SHORT;if(i===jf)return e.INT;if(i===Va)return e.UNSIGNED_INT;if(i===ms)return e.FLOAT;if(i===fl)return e.HALF_FLOAT;if(i===B0)return e.ALPHA;if(i===z0)return e.RGB;if(i===Ai)return e.RGBA;if(i===al)return e.DEPTH_COMPONENT;if(i===pl)return e.DEPTH_STENCIL;if(i===F0)return e.RED;if(i===ed)return e.RED_INTEGER;if(i===H0)return e.RG;if(i===nd)return e.RG_INTEGER;if(i===id)return e.RGBA_INTEGER;if(i===Kc||i===Qc||i===jc||i===$c)if(r===de)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Kc)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Qc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===jc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===$c)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Kc)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Qc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===jc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===$c)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===sd||i===ad||i===rd||i===od)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===sd)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ad)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===rd)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===od)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ld||i===cd||i===ud)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===ld||i===cd)return r===de?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===ud)return r===de?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===hd||i===fd||i===dd||i===pd||i===md||i===gd||i===_d||i===vd||i===yd||i===xd||i===Sd||i===Md||i===bd||i===Ed)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===hd)return r===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fd)return r===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===dd)return r===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===pd)return r===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===md)return r===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===gd)return r===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_d)return r===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===vd)return r===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===yd)return r===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===xd)return r===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Sd)return r===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Md)return r===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===bd)return r===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ed)return r===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Td||i===Ad||i===wd)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===Td)return r===de?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ad)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===wd)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Cd||i===Rd||i===Dd||i===Ud)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===Cd)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Rd)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Dd)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ud)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===dl?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}var bD=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ED=`
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

}`,r_=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){let i=new qc(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new li({vertexShader:bD,fragmentShader:ED,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Gn(new Dr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},o_=class extends ks{constructor(t,n){super();let i=this,s=null,a=1,r=null,o="local-floor",l=1,c=null,f=null,d=null,h=null,p=null,_=null,M=typeof XRWebGLBinding<"u",m=new r_,u={},g=n.getContextAttributes(),v=null,y=null,T=[],C=[],w=new ae,U=null,E=new Vn;E.viewport=new Pe;let b=new Vn;b.viewport=new Pe;let O=[E,b],F=new Vf,k=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let $=T[Y];return $===void 0&&($=new ul,T[Y]=$),$.getTargetRaySpace()},this.getControllerGrip=function(Y){let $=T[Y];return $===void 0&&($=new ul,T[Y]=$),$.getGripSpace()},this.getHand=function(Y){let $=T[Y];return $===void 0&&($=new ul,T[Y]=$),$.getHandSpace()};function J(Y){let $=C.indexOf(Y.inputSource);if($===-1)return;let gt=T[$];gt!==void 0&&(gt.update(Y.inputSource,Y.frame,c||r),gt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function W(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",nt);for(let Y=0;Y<T.length;Y++){let $=C[Y];$!==null&&(C[Y]=null,T[Y].disconnect($))}k=null,q=null,m.reset();for(let Y in u)delete u[Y];t.setRenderTarget(v),p=null,h=null,d=null,s=null,y=null,Jt.stop(),i.isPresenting=!1,t.setPixelRatio(U),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&M&&(d=new XRWebGLBinding(s,n)),d},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",W),s.addEventListener("inputsourceschange",nt),g.xrCompatible!==!0&&await n.makeXRCompatible(),U=t.getPixelRatio(),t.getSize(w),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let gt=null,Nt=null,Mt=null;g.depth&&(Mt=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,gt=g.stencil?pl:al,Nt=g.stencil?dl:Va);let Wt={colorFormat:n.RGBA8,depthFormat:Mt,scaleFactor:a};d=this.getBinding(),h=d.createProjectionLayer(Wt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new us(h.textureWidth,h.textureHeight,{format:Ai,type:ps,depthTexture:new Wc(h.textureWidth,h.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,gt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let gt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(s,n,gt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new us(p.framebufferWidth,p.framebufferHeight,{format:Ai,type:ps,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),Jt.setContext(s),Jt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function nt(Y){for(let $=0;$<Y.removed.length;$++){let gt=Y.removed[$],Nt=C.indexOf(gt);Nt>=0&&(C[Nt]=null,T[Nt].disconnect(gt))}for(let $=0;$<Y.added.length;$++){let gt=Y.added[$],Nt=C.indexOf(gt);if(Nt===-1){for(let Wt=0;Wt<T.length;Wt++)if(Wt>=C.length){C.push(gt),Nt=Wt;break}else if(C[Wt]===null){C[Wt]=gt,Nt=Wt;break}if(Nt===-1)break}let Mt=T[Nt];Mt&&Mt.connect(gt)}}let H=new z,ct=new z;function ft(Y,$,gt){H.setFromMatrixPosition($.matrixWorld),ct.setFromMatrixPosition(gt.matrixWorld);let Nt=H.distanceTo(ct),Mt=$.projectionMatrix.elements,Wt=gt.projectionMatrix.elements,Xe=Mt[14]/(Mt[10]-1),R=Mt[14]/(Mt[10]+1),ve=(Mt[9]+1)/Mt[5],It=(Mt[9]-1)/Mt[5],wt=(Mt[8]-1)/Mt[0],St=(Wt[8]+1)/Wt[0],me=Xe*wt,mt=Xe*St,Pt=Nt/(-wt+St),De=Pt*-wt;if($.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(De),Y.translateZ(Pt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Mt[10]===-1)Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let ge=Xe+Pt,A=R+Pt,S=me-De,B=mt+(Nt-De),G=ve*R/A*ge,K=It*R/A*ge;Y.projectionMatrix.makePerspective(S,B,G,K,ge,A),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Et(Y,$){$===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices($.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let $=Y.near,gt=Y.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(gt=m.depthFar)),F.near=b.near=E.near=$,F.far=b.far=E.far=gt,(k!==F.near||q!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),k=F.near,q=F.far),F.layers.mask=Y.layers.mask|6,E.layers.mask=F.layers.mask&3,b.layers.mask=F.layers.mask&5;let Nt=Y.parent,Mt=F.cameras;Et(F,Nt);for(let Wt=0;Wt<Mt.length;Wt++)Et(Mt[Wt],Nt);Mt.length===2?ft(F,E,b):F.projectionMatrix.copy(E.projectionMatrix),Gt(Y,F,Nt)};function Gt(Y,$,gt){gt===null?Y.matrix.copy($.matrixWorld):(Y.matrix.copy(gt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply($.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Mf*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(Y){return u[Y]};let le=null;function pe(Y,$){if(f=$.getViewerPose(c||r),_=$,f!==null){let gt=f.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let Nt=!1;gt.length!==F.cameras.length&&(F.cameras.length=0,Nt=!0);for(let R=0;R<gt.length;R++){let ve=gt[R],It=null;if(p!==null)It=p.getViewport(ve);else{let St=d.getViewSubImage(h,ve);It=St.viewport,R===0&&(t.setRenderTargetTextures(y,St.colorTexture,St.depthStencilTexture),t.setRenderTarget(y))}let wt=O[R];wt===void 0&&(wt=new Vn,wt.layers.enable(R),wt.viewport=new Pe,O[R]=wt),wt.matrix.fromArray(ve.transform.matrix),wt.matrix.decompose(wt.position,wt.quaternion,wt.scale),wt.projectionMatrix.fromArray(ve.projectionMatrix),wt.projectionMatrixInverse.copy(wt.projectionMatrix).invert(),wt.viewport.set(It.x,It.y,It.width,It.height),R===0&&(F.matrix.copy(wt.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Nt===!0&&F.cameras.push(wt)}let Mt=s.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){d=i.getBinding();let R=d.getDepthInformation(gt[0]);R&&R.isValid&&R.texture&&m.init(R,s.renderState)}if(Mt&&Mt.includes("camera-access")&&M){t.state.unbindTexture(),d=i.getBinding();for(let R=0;R<gt.length;R++){let ve=gt[R].camera;if(ve){let It=u[ve];It||(It=new qc,u[ve]=It);let wt=d.getCameraImage(ve);It.sourceTexture=wt}}}}for(let gt=0;gt<T.length;gt++){let Nt=C[gt],Mt=T[gt];Nt!==null&&Mt!==void 0&&Mt.update(Nt,$,c||r)}le&&le(Y,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),_=null}let Jt=new Tb;Jt.setAnimationLoop(pe),this.setAnimationLoop=function(Y){le=Y},this.dispose=function(){}}},Pr=new hs,TD=new Ze;function AD(e,t){function n(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,X0(e)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function s(m,u,g,v,y){u.isMeshBasicMaterial||u.isMeshLambertMaterial?a(m,u):u.isMeshToonMaterial?(a(m,u),d(m,u)):u.isMeshPhongMaterial?(a(m,u),f(m,u)):u.isMeshStandardMaterial?(a(m,u),h(m,u),u.isMeshPhysicalMaterial&&p(m,u,y)):u.isMeshMatcapMaterial?(a(m,u),_(m,u)):u.isMeshDepthMaterial?a(m,u):u.isMeshDistanceMaterial?(a(m,u),M(m,u)):u.isMeshNormalMaterial?a(m,u):u.isLineBasicMaterial?(r(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?l(m,u,g,v):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function a(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,n(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===wn&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,n(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===wn&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,n(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,n(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);let g=t.get(u),v=g.envMap,y=g.envMapRotation;v&&(m.envMap.value=v,Pr.copy(y),Pr.x*=-1,Pr.y*=-1,Pr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Pr.y*=-1,Pr.z*=-1),m.envMapRotation.value.setFromMatrix4(TD.makeRotationFromEuler(Pr)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,m.aoMapTransform))}function r(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,g,v){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*g,m.scale.value=v*.5,u.map&&(m.map.value=u.map,n(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function f(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function d(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function h(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,g){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===wn&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=g.texture,m.transmissionSamplerSize.value.set(g.width,g.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,u){u.matcap&&(m.matcap.value=u.matcap)}function M(m,u){let g=t.get(u).light;m.referencePosition.value.setFromMatrixPosition(g.matrixWorld),m.nearDistance.value=g.shadow.camera.near,m.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function wD(e,t,n,i){let s={},a={},r=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(g,v){let y=v.program;i.uniformBlockBinding(g,y)}function c(g,v){let y=s[g.id];y===void 0&&(_(g),y=f(g),s[g.id]=y,g.addEventListener("dispose",m));let T=v.program;i.updateUBOMapping(g,T);let C=t.render.frame;a[g.id]!==C&&(h(g),a[g.id]=C)}function f(g){let v=d();g.__bindingPointIndex=v;let y=e.createBuffer(),T=g.__size,C=g.usage;return e.bindBuffer(e.UNIFORM_BUFFER,y),e.bufferData(e.UNIFORM_BUFFER,T,C),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,v,y),y}function d(){for(let g=0;g<o;g++)if(r.indexOf(g)===-1)return r.push(g),g;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(g){let v=s[g.id],y=g.uniforms,T=g.__cache;e.bindBuffer(e.UNIFORM_BUFFER,v);for(let C=0,w=y.length;C<w;C++){let U=Array.isArray(y[C])?y[C]:[y[C]];for(let E=0,b=U.length;E<b;E++){let O=U[E];if(p(O,C,E,T)===!0){let F=O.__offset,k=Array.isArray(O.value)?O.value:[O.value],q=0;for(let J=0;J<k.length;J++){let W=k[J],nt=M(W);typeof W=="number"||typeof W=="boolean"?(O.__data[0]=W,e.bufferSubData(e.UNIFORM_BUFFER,F+q,O.__data)):W.isMatrix3?(O.__data[0]=W.elements[0],O.__data[1]=W.elements[1],O.__data[2]=W.elements[2],O.__data[3]=0,O.__data[4]=W.elements[3],O.__data[5]=W.elements[4],O.__data[6]=W.elements[5],O.__data[7]=0,O.__data[8]=W.elements[6],O.__data[9]=W.elements[7],O.__data[10]=W.elements[8],O.__data[11]=0):(W.toArray(O.__data,q),q+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,F,O.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(g,v,y,T){let C=g.value,w=v+"_"+y;if(T[w]===void 0)return typeof C=="number"||typeof C=="boolean"?T[w]=C:T[w]=C.clone(),!0;{let U=T[w];if(typeof C=="number"||typeof C=="boolean"){if(U!==C)return T[w]=C,!0}else if(U.equals(C)===!1)return U.copy(C),!0}return!1}function _(g){let v=g.uniforms,y=0,T=16;for(let w=0,U=v.length;w<U;w++){let E=Array.isArray(v[w])?v[w]:[v[w]];for(let b=0,O=E.length;b<O;b++){let F=E[b],k=Array.isArray(F.value)?F.value:[F.value];for(let q=0,J=k.length;q<J;q++){let W=k[q],nt=M(W),H=y%T,ct=H%nt.boundary,ft=H+ct;y+=ct,ft!==0&&T-ft<nt.storage&&(y+=T-ft),F.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=nt.storage}}}let C=y%T;return C>0&&(y+=T-C),g.__size=y,g.__cache={},this}function M(g){let v={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(v.boundary=4,v.storage=4):g.isVector2?(v.boundary=8,v.storage=8):g.isVector3||g.isColor?(v.boundary=16,v.storage=12):g.isVector4?(v.boundary=16,v.storage=16):g.isMatrix3?(v.boundary=48,v.storage=48):g.isMatrix4?(v.boundary=64,v.storage=64):g.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",g),v}function m(g){let v=g.target;v.removeEventListener("dispose",m);let y=r.indexOf(v.__bindingPointIndex);r.splice(y,1),e.deleteBuffer(s[v.id]),delete s[v.id],delete a[v.id]}function u(){for(let g in s)e.deleteBuffer(s[g]);r=[],s={},a={}}return{bind:l,update:c,dispose:u}}var Pd=class{constructor(t={}){let{canvas:n=Q1(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=r;let _=new Uint32Array(4),M=new Int32Array(4),m=null,u=null,g=[],v=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,T=!1;this._outputColorSpace=ai;let C=0,w=0,U=null,E=-1,b=null,O=new Pe,F=new Pe,k=null,q=new re(0),J=0,W=n.width,nt=n.height,H=1,ct=null,ft=null,Et=new Pe(0,0,W,nt),Gt=new Pe(0,0,W,nt),le=!1,pe=new Xc,Jt=!1,Y=!1,$=new Ze,gt=new z,Nt=new Pe,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Wt=!1;function Xe(){return U===null?H:1}let R=i;function ve(x,D){return n.getContext(x,D)}try{let x={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${"180"}`),n.addEventListener("webglcontextlost",st,!1),n.addEventListener("webglcontextrestored",pt,!1),n.addEventListener("webglcontextcreationerror",tt,!1),R===null){let D="webgl2";if(R=ve(D,x),R===null)throw ve(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let It,wt,St,me,mt,Pt,De,ge,A,S,B,G,K,V,Tt,at,_t,vt,Q,rt,Ct,yt,ot,Dt;function N(){It=new W2(R),It.init(),yt=new MD(R,It),wt=new z2(R,It,t,yt),St=new xD(R,It),wt.reversedDepthBuffer&&h&&St.buffers.depth.setReversed(!0),me=new Z2(R),mt=new oD,Pt=new SD(R,It,St,mt,wt,yt,me),De=new H2(y),ge=new X2(y),A=new tC(R),ot=new P2(R,A),S=new q2(R,A,me,ot),B=new K2(R,S,A,me),Q=new J2(R,wt,Pt),at=new F2(mt),G=new rD(y,De,ge,It,wt,ot,at),K=new AD(y,mt),V=new cD,Tt=new mD(It),vt=new I2(y,De,ge,St,B,p,l),_t=new vD(y,B,wt),Dt=new wD(R,me,wt,St),rt=new B2(R,It,me),Ct=new Y2(R,It,me),me.programs=G.programs,y.capabilities=wt,y.extensions=It,y.properties=mt,y.renderLists=V,y.shadowMap=_t,y.state=St,y.info=me}N();let it=new o_(y,R);this.xr=it,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let x=It.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=It.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(x){x!==void 0&&(H=x,this.setSize(W,nt,!1))},this.getSize=function(x){return x.set(W,nt)},this.setSize=function(x,D,P=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=x,nt=D,n.width=Math.floor(x*H),n.height=Math.floor(D*H),P===!0&&(n.style.width=x+"px",n.style.height=D+"px"),this.setViewport(0,0,x,D)},this.getDrawingBufferSize=function(x){return x.set(W*H,nt*H).floor()},this.setDrawingBufferSize=function(x,D,P){W=x,nt=D,H=P,n.width=Math.floor(x*P),n.height=Math.floor(D*P),this.setViewport(0,0,x,D)},this.getCurrentViewport=function(x){return x.copy(O)},this.getViewport=function(x){return x.copy(Et)},this.setViewport=function(x,D,P,I){x.isVector4?Et.set(x.x,x.y,x.z,x.w):Et.set(x,D,P,I),St.viewport(O.copy(Et).multiplyScalar(H).round())},this.getScissor=function(x){return x.copy(Gt)},this.setScissor=function(x,D,P,I){x.isVector4?Gt.set(x.x,x.y,x.z,x.w):Gt.set(x,D,P,I),St.scissor(F.copy(Gt).multiplyScalar(H).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(x){St.setScissorTest(le=x)},this.setOpaqueSort=function(x){ct=x},this.setTransparentSort=function(x){ft=x},this.getClearColor=function(x){return x.copy(vt.getClearColor())},this.setClearColor=function(){vt.setClearColor(...arguments)},this.getClearAlpha=function(){return vt.getClearAlpha()},this.setClearAlpha=function(){vt.setClearAlpha(...arguments)},this.clear=function(x=!0,D=!0,P=!0){let I=0;if(x){let L=!1;if(U!==null){let j=U.texture.format;L=j===id||j===nd||j===ed}if(L){let j=U.texture.type,et=j===ps||j===Va||j===hl||j===dl||j===$f||j===td,lt=vt.getClearColor(),ut=vt.getClearAlpha(),bt=lt.r,Rt=lt.g,dt=lt.b;et?(_[0]=bt,_[1]=Rt,_[2]=dt,_[3]=ut,R.clearBufferuiv(R.COLOR,0,_)):(M[0]=bt,M[1]=Rt,M[2]=dt,M[3]=ut,R.clearBufferiv(R.COLOR,0,M))}else I|=R.COLOR_BUFFER_BIT}D&&(I|=R.DEPTH_BUFFER_BIT),P&&(I|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(I)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",st,!1),n.removeEventListener("webglcontextrestored",pt,!1),n.removeEventListener("webglcontextcreationerror",tt,!1),vt.dispose(),V.dispose(),Tt.dispose(),mt.dispose(),De.dispose(),ge.dispose(),B.dispose(),ot.dispose(),Dt.dispose(),G.dispose(),it.dispose(),it.removeEventListener("sessionstart",kn),it.removeEventListener("sessionend",iu),Dn.stop()};function st(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let x=me.autoReset,D=_t.enabled,P=_t.autoUpdate,I=_t.needsUpdate,L=_t.type;N(),me.autoReset=x,_t.enabled=D,_t.autoUpdate=P,_t.needsUpdate=I,_t.type=L}function tt(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Z(x){let D=x.target;D.removeEventListener("dispose",Z),xt(D)}function xt(x){Lt(x),mt.remove(x)}function Lt(x){let D=mt.get(x).programs;D!==void 0&&(D.forEach(function(P){G.releaseProgram(P)}),x.isShaderMaterial&&G.releaseShaderCache(x))}this.renderBufferDirect=function(x,D,P,I,L,j){D===null&&(D=Mt);let et=L.isMesh&&L.matrixWorld.determinant()<0,lt=su(x,D,P,I,L);St.setMaterial(I,et);let ut=P.index,bt=1;if(I.wireframe===!0){if(ut=S.getWireframeAttribute(P),ut===void 0)return;bt=2}let Rt=P.drawRange,dt=P.attributes.position,Ft=Rt.start*bt,ee=(Rt.start+Rt.count)*bt;j!==null&&(Ft=Math.max(Ft,j.start*bt),ee=Math.min(ee,(j.start+j.count)*bt)),ut!==null?(Ft=Math.max(Ft,0),ee=Math.min(ee,ut.count)):dt!=null&&(Ft=Math.max(Ft,0),ee=Math.min(ee,dt.count));let Me=ee-Ft;if(Me<0||Me===1/0)return;ot.setup(L,I,lt,P,ut);let ye,ce=rt;if(ut!==null&&(ye=A.get(ut),ce=Ct,ce.setIndex(ye)),L.isMesh)I.wireframe===!0?(St.setLineWidth(I.wireframeLinewidth*Xe()),ce.setMode(R.LINES)):ce.setMode(R.TRIANGLES);else if(L.isLine){let Ut=I.linewidth;Ut===void 0&&(Ut=1),St.setLineWidth(Ut*Xe()),L.isLineSegments?ce.setMode(R.LINES):L.isLineLoop?ce.setMode(R.LINE_LOOP):ce.setMode(R.LINE_STRIP)}else L.isPoints?ce.setMode(R.POINTS):L.isSprite&&ce.setMode(R.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)rl("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ce.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(It.get("WEBGL_multi_draw"))ce.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else{let Ut=L._multiDrawStarts,we=L._multiDrawCounts,Qt=L._multiDrawCount,xn=ut?A.get(ut).bytesPerElement:1,Js=mt.get(I).currentProgram.getUniforms();for(let Sn=0;Sn<Qt;Sn++)Js.setValue(R,"_gl_DrawID",Sn),ce.render(Ut[Sn]/xn,we[Sn])}else if(L.isInstancedMesh)ce.renderInstances(Ft,Me,L.count);else if(P.isInstancedBufferGeometry){let Ut=P._maxInstanceCount!==void 0?P._maxInstanceCount:1/0,we=Math.min(P.instanceCount,Ut);ce.renderInstances(Ft,Me,we)}else ce.render(Ft,Me)};function te(x,D,P){x.transparent===!0&&x.side===ds&&x.forceSinglePass===!1?(x.side=wn,x.needsUpdate=!0,Xa(x,D,P),x.side=Gs,x.needsUpdate=!0,Xa(x,D,P),x.side=ds):Xa(x,D,P)}this.compile=function(x,D,P=null){P===null&&(P=x),u=Tt.get(P),u.init(D),v.push(u),P.traverseVisible(function(L){L.isLight&&L.layers.test(D.layers)&&(u.pushLight(L),L.castShadow&&u.pushShadow(L))}),x!==P&&x.traverseVisible(function(L){L.isLight&&L.layers.test(D.layers)&&(u.pushLight(L),L.castShadow&&u.pushShadow(L))}),u.setupLights();let I=new Set;return x.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;let j=L.material;if(j)if(Array.isArray(j))for(let et=0;et<j.length;et++){let lt=j[et];te(lt,P,L),I.add(lt)}else te(j,P,L),I.add(j)}),u=v.pop(),I},this.compileAsync=function(x,D,P=null){let I=this.compile(x,D,P);return new Promise(L=>{function j(){if(I.forEach(function(et){mt.get(et).currentProgram.isReady()&&I.delete(et)}),I.size===0){L(x);return}setTimeout(j,10)}It.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let jt=null;function Rn(x){jt&&jt(x)}function kn(){Dn.stop()}function iu(){Dn.start()}let Dn=new Tb;Dn.setAnimationLoop(Rn),typeof self<"u"&&Dn.setContext(self),this.setAnimationLoop=function(x){jt=x,it.setAnimationLoop(x),x===null?Dn.stop():Dn.start()},it.addEventListener("sessionstart",kn),it.addEventListener("sessionend",iu),this.render=function(x,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(D),D=it.getCamera()),x.isScene===!0&&x.onBeforeRender(y,x,D,U),u=Tt.get(x,v.length),u.init(D),v.push(u),$.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),pe.setFromProjectionMatrix($,Gi,D.reversedDepth),Y=this.localClippingEnabled,Jt=at.init(this.clippingPlanes,Y),m=V.get(x,g.length),m.init(),g.push(m),it.enabled===!0&&it.isPresenting===!0){let j=y.xr.getDepthSensingMesh();j!==null&&Ml(j,D,-1/0,y.sortObjects)}Ml(x,D,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ct,ft),Wt=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Wt&&vt.addToRenderList(m,x),this.info.render.frame++,Jt===!0&&at.beginShadows();let P=u.state.shadowsArray;_t.render(P,x,D),Jt===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();let I=m.opaque,L=m.transmissive;if(u.setupLights(),D.isArrayCamera){let j=D.cameras;if(L.length>0)for(let et=0,lt=j.length;et<lt;et++){let ut=j[et];Ga(I,L,x,ut)}Wt&&vt.render(x);for(let et=0,lt=j.length;et<lt;et++){let ut=j[et];bl(m,x,ut,ut.viewport)}}else L.length>0&&Ga(I,L,x,D),Wt&&vt.render(x),bl(m,x,D);U!==null&&w===0&&(Pt.updateMultisampleRenderTarget(U),Pt.updateRenderTargetMipmap(U)),x.isScene===!0&&x.onAfterRender(y,x,D),ot.resetDefaultState(),E=-1,b=null,v.pop(),v.length>0?(u=v[v.length-1],Jt===!0&&at.setGlobalState(y.clippingPlanes,u.state.camera)):u=null,g.pop(),g.length>0?m=g[g.length-1]:m=null};function Ml(x,D,P,I){if(x.visible===!1)return;if(x.layers.test(D.layers)){if(x.isGroup)P=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(D);else if(x.isLight)u.pushLight(x),x.castShadow&&u.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||pe.intersectsSprite(x)){I&&Nt.setFromMatrixPosition(x.matrixWorld).applyMatrix4($);let et=B.update(x),lt=x.material;lt.visible&&m.push(x,et,lt,P,Nt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||pe.intersectsObject(x))){let et=B.update(x),lt=x.material;if(I&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Nt.copy(x.boundingSphere.center)):(et.boundingSphere===null&&et.computeBoundingSphere(),Nt.copy(et.boundingSphere.center)),Nt.applyMatrix4(x.matrixWorld).applyMatrix4($)),Array.isArray(lt)){let ut=et.groups;for(let bt=0,Rt=ut.length;bt<Rt;bt++){let dt=ut[bt],Ft=lt[dt.materialIndex];Ft&&Ft.visible&&m.push(x,et,Ft,P,Nt.z,dt)}}else lt.visible&&m.push(x,et,lt,P,Nt.z,null)}}let j=x.children;for(let et=0,lt=j.length;et<lt;et++)Ml(j[et],D,P,I)}function bl(x,D,P,I){let L=x.opaque,j=x.transmissive,et=x.transparent;u.setupLightsView(P),Jt===!0&&at.setGlobalState(y.clippingPlanes,P),I&&St.viewport(O.copy(I)),L.length>0&&ka(L,D,P),j.length>0&&ka(j,D,P),et.length>0&&ka(et,D,P),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function Ga(x,D,P,I){if((P.isScene===!0?P.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[I.id]===void 0&&(u.state.transmissionRenderTarget[I.id]=new us(1,1,{generateMipmaps:!0,type:It.has("EXT_color_buffer_half_float")||It.has("EXT_color_buffer_float")?fl:ps,minFilter:Ha,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));let j=u.state.transmissionRenderTarget[I.id],et=I.viewport||O;j.setSize(et.z*y.transmissionResolutionScale,et.w*y.transmissionResolutionScale);let lt=y.getRenderTarget(),ut=y.getActiveCubeFace(),bt=y.getActiveMipmapLevel();y.setRenderTarget(j),y.getClearColor(q),J=y.getClearAlpha(),J<1&&y.setClearColor(16777215,.5),y.clear(),Wt&&vt.render(P);let Rt=y.toneMapping;y.toneMapping=qs;let dt=I.viewport;if(I.viewport!==void 0&&(I.viewport=void 0),u.setupLightsView(I),Jt===!0&&at.setGlobalState(y.clippingPlanes,I),ka(x,P,I),Pt.updateMultisampleRenderTarget(j),Pt.updateRenderTargetMipmap(j),It.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let ee=0,Me=D.length;ee<Me;ee++){let ye=D[ee],ce=ye.object,Ut=ye.geometry,we=ye.material,Qt=ye.group;if(we.side===ds&&ce.layers.test(I.layers)){let xn=we.side;we.side=wn,we.needsUpdate=!0,Gr(ce,P,I,Ut,we,Qt),we.side=xn,we.needsUpdate=!0,Ft=!0}}Ft===!0&&(Pt.updateMultisampleRenderTarget(j),Pt.updateRenderTargetMipmap(j))}y.setRenderTarget(lt,ut,bt),y.setClearColor(q,J),dt!==void 0&&(I.viewport=dt),y.toneMapping=Rt}function ka(x,D,P){let I=D.isScene===!0?D.overrideMaterial:null;for(let L=0,j=x.length;L<j;L++){let et=x[L],lt=et.object,ut=et.geometry,bt=et.group,Rt=et.material;Rt.allowOverride===!0&&I!==null&&(Rt=I),lt.layers.test(P.layers)&&Gr(lt,D,P,ut,Rt,bt)}}function Gr(x,D,P,I,L,j){x.onBeforeRender(y,D,P,I,L,j),x.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),L.onBeforeRender(y,D,P,I,x,j),L.transparent===!0&&L.side===ds&&L.forceSinglePass===!1?(L.side=wn,L.needsUpdate=!0,y.renderBufferDirect(P,D,I,L,x,j),L.side=Gs,L.needsUpdate=!0,y.renderBufferDirect(P,D,I,L,x,j),L.side=ds):y.renderBufferDirect(P,D,I,L,x,j),x.onAfterRender(y,D,P,I,L,j)}function Xa(x,D,P){D.isScene!==!0&&(D=Mt);let I=mt.get(x),L=u.state.lights,j=u.state.shadowsArray,et=L.state.version,lt=G.getParameters(x,L.state,j,D,P),ut=G.getProgramCacheKey(lt),bt=I.programs;I.environment=x.isMeshStandardMaterial?D.environment:null,I.fog=D.fog,I.envMap=(x.isMeshStandardMaterial?ge:De).get(x.envMap||I.environment),I.envMapRotation=I.environment!==null&&x.envMap===null?D.environmentRotation:x.envMapRotation,bt===void 0&&(x.addEventListener("dispose",Z),bt=new Map,I.programs=bt);let Rt=bt.get(ut);if(Rt!==void 0){if(I.currentProgram===Rt&&I.lightsStateVersion===et)return Ri(x,lt),Rt}else lt.uniforms=G.getUniforms(x),x.onBeforeCompile(lt,y),Rt=G.acquireProgram(lt,ut),bt.set(ut,Rt),I.uniforms=lt.uniforms;let dt=I.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(dt.clippingPlanes=at.uniform),Ri(x,lt),I.needsLights=ru(x),I.lightsStateVersion=et,I.needsLights&&(dt.ambientLightColor.value=L.state.ambient,dt.lightProbe.value=L.state.probe,dt.directionalLights.value=L.state.directional,dt.directionalLightShadows.value=L.state.directionalShadow,dt.spotLights.value=L.state.spot,dt.spotLightShadows.value=L.state.spotShadow,dt.rectAreaLights.value=L.state.rectArea,dt.ltc_1.value=L.state.rectAreaLTC1,dt.ltc_2.value=L.state.rectAreaLTC2,dt.pointLights.value=L.state.point,dt.pointLightShadows.value=L.state.pointShadow,dt.hemisphereLights.value=L.state.hemi,dt.directionalShadowMap.value=L.state.directionalShadowMap,dt.directionalShadowMatrix.value=L.state.directionalShadowMatrix,dt.spotShadowMap.value=L.state.spotShadowMap,dt.spotLightMatrix.value=L.state.spotLightMatrix,dt.spotLightMap.value=L.state.spotLightMap,dt.pointShadowMap.value=L.state.pointShadowMap,dt.pointShadowMatrix.value=L.state.pointShadowMatrix),I.currentProgram=Rt,I.uniformsList=null,Rt}function Wa(x){if(x.uniformsList===null){let D=x.currentProgram.getUniforms();x.uniformsList=_l.seqWithValue(D.seq,x.uniforms)}return x.uniformsList}function Ri(x,D){let P=mt.get(x);P.outputColorSpace=D.outputColorSpace,P.batching=D.batching,P.batchingColor=D.batchingColor,P.instancing=D.instancing,P.instancingColor=D.instancingColor,P.instancingMorph=D.instancingMorph,P.skinning=D.skinning,P.morphTargets=D.morphTargets,P.morphNormals=D.morphNormals,P.morphColors=D.morphColors,P.morphTargetsCount=D.morphTargetsCount,P.numClippingPlanes=D.numClippingPlanes,P.numIntersection=D.numClipIntersection,P.vertexAlphas=D.vertexAlphas,P.vertexTangents=D.vertexTangents,P.toneMapping=D.toneMapping}function su(x,D,P,I,L){D.isScene!==!0&&(D=Mt),Pt.resetTextureUnits();let j=D.fog,et=I.isMeshStandardMaterial?D.environment:null,lt=U===null?y.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:wr,ut=(I.isMeshStandardMaterial?ge:De).get(I.envMap||et),bt=I.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,Rt=!!P.attributes.tangent&&(!!I.normalMap||I.anisotropy>0),dt=!!P.morphAttributes.position,Ft=!!P.morphAttributes.normal,ee=!!P.morphAttributes.color,Me=qs;I.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Me=y.toneMapping);let ye=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,ce=ye!==void 0?ye.length:0,Ut=mt.get(I),we=u.state.lights;if(Jt===!0&&(Y===!0||x!==b)){let nn=x===b&&I.id===E;at.setState(I,x,nn)}let Qt=!1;I.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==we.state.version||Ut.outputColorSpace!==lt||L.isBatchedMesh&&Ut.batching===!1||!L.isBatchedMesh&&Ut.batching===!0||L.isBatchedMesh&&Ut.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&Ut.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&Ut.instancing===!1||!L.isInstancedMesh&&Ut.instancing===!0||L.isSkinnedMesh&&Ut.skinning===!1||!L.isSkinnedMesh&&Ut.skinning===!0||L.isInstancedMesh&&Ut.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&Ut.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&Ut.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&Ut.instancingMorph===!1&&L.morphTexture!==null||Ut.envMap!==ut||I.fog===!0&&Ut.fog!==j||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==at.numPlanes||Ut.numIntersection!==at.numIntersection)||Ut.vertexAlphas!==bt||Ut.vertexTangents!==Rt||Ut.morphTargets!==dt||Ut.morphNormals!==Ft||Ut.morphColors!==ee||Ut.toneMapping!==Me||Ut.morphTargetsCount!==ce)&&(Qt=!0):(Qt=!0,Ut.__version=I.version);let xn=Ut.currentProgram;Qt===!0&&(xn=Xa(I,D,L));let Js=!1,Sn=!1,qa=!1,Ce=xn.getUniforms(),Un=Ut.uniforms;if(St.useProgram(xn.program)&&(Js=!0,Sn=!0,qa=!0),I.id!==E&&(E=I.id,Sn=!0),Js||b!==x){St.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),Ce.setValue(R,"projectionMatrix",x.projectionMatrix),Ce.setValue(R,"viewMatrix",x.matrixWorldInverse);let hn=Ce.map.cameraPosition;hn!==void 0&&hn.setValue(R,gt.setFromMatrixPosition(x.matrixWorld)),wt.logarithmicDepthBuffer&&Ce.setValue(R,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(I.isMeshPhongMaterial||I.isMeshToonMaterial||I.isMeshLambertMaterial||I.isMeshBasicMaterial||I.isMeshStandardMaterial||I.isShaderMaterial)&&Ce.setValue(R,"isOrthographic",x.isOrthographicCamera===!0),b!==x&&(b=x,Sn=!0,qa=!0)}if(L.isSkinnedMesh){Ce.setOptional(R,L,"bindMatrix"),Ce.setOptional(R,L,"bindMatrixInverse");let nn=L.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),Ce.setValue(R,"boneTexture",nn.boneTexture,Pt))}L.isBatchedMesh&&(Ce.setOptional(R,L,"batchingTexture"),Ce.setValue(R,"batchingTexture",L._matricesTexture,Pt),Ce.setOptional(R,L,"batchingIdTexture"),Ce.setValue(R,"batchingIdTexture",L._indirectTexture,Pt),Ce.setOptional(R,L,"batchingColorTexture"),L._colorsTexture!==null&&Ce.setValue(R,"batchingColorTexture",L._colorsTexture,Pt));let Nn=P.morphAttributes;if((Nn.position!==void 0||Nn.normal!==void 0||Nn.color!==void 0)&&Q.update(L,P,xn),(Sn||Ut.receiveShadow!==L.receiveShadow)&&(Ut.receiveShadow=L.receiveShadow,Ce.setValue(R,"receiveShadow",L.receiveShadow)),I.isMeshGouraudMaterial&&I.envMap!==null&&(Un.envMap.value=ut,Un.flipEnvMap.value=ut.isCubeTexture&&ut.isRenderTargetTexture===!1?-1:1),I.isMeshStandardMaterial&&I.envMap===null&&D.environment!==null&&(Un.envMapIntensity.value=D.environmentIntensity),Sn&&(Ce.setValue(R,"toneMappingExposure",y.toneMappingExposure),Ut.needsLights&&au(Un,qa),j&&I.fog===!0&&K.refreshFogUniforms(Un,j),K.refreshMaterialUniforms(Un,I,H,nt,u.state.transmissionRenderTarget[x.id]),_l.upload(R,Wa(Ut),Un,Pt)),I.isShaderMaterial&&I.uniformsNeedUpdate===!0&&(_l.upload(R,Wa(Ut),Un,Pt),I.uniformsNeedUpdate=!1),I.isSpriteMaterial&&Ce.setValue(R,"center",L.center),Ce.setValue(R,"modelViewMatrix",L.modelViewMatrix),Ce.setValue(R,"normalMatrix",L.normalMatrix),Ce.setValue(R,"modelMatrix",L.matrixWorld),I.isShaderMaterial||I.isRawShaderMaterial){let nn=I.uniformsGroups;for(let hn=0,El=nn.length;hn<El;hn++){let zt=nn[hn];Dt.update(zt,xn),Dt.bind(zt,xn)}}return xn}function au(x,D){x.ambientLightColor.needsUpdate=D,x.lightProbe.needsUpdate=D,x.directionalLights.needsUpdate=D,x.directionalLightShadows.needsUpdate=D,x.pointLights.needsUpdate=D,x.pointLightShadows.needsUpdate=D,x.spotLights.needsUpdate=D,x.spotLightShadows.needsUpdate=D,x.rectAreaLights.needsUpdate=D,x.hemisphereLights.needsUpdate=D}function ru(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(x,D,P){let I=mt.get(x);I.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,I.__autoAllocateDepthBuffer===!1&&(I.__useRenderToTexture=!1),mt.get(x.texture).__webglTexture=D,mt.get(x.depthTexture).__webglTexture=I.__autoAllocateDepthBuffer?void 0:P,I.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,D){let P=mt.get(x);P.__webglFramebuffer=D,P.__useDefaultFramebuffer=D===void 0};let ou=R.createFramebuffer();this.setRenderTarget=function(x,D=0,P=0){U=x,C=D,w=P;let I=!0,L=null,j=!1,et=!1;if(x){let ut=mt.get(x);if(ut.__useDefaultFramebuffer!==void 0)St.bindFramebuffer(R.FRAMEBUFFER,null),I=!1;else if(ut.__webglFramebuffer===void 0)Pt.setupRenderTarget(x);else if(ut.__hasExternalTextures)Pt.rebindTextures(x,mt.get(x.texture).__webglTexture,mt.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let dt=x.depthTexture;if(ut.__boundDepthTexture!==dt){if(dt!==null&&mt.has(dt)&&(x.width!==dt.image.width||x.height!==dt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Pt.setupDepthRenderbuffer(x)}}let bt=x.texture;(bt.isData3DTexture||bt.isDataArrayTexture||bt.isCompressedArrayTexture)&&(et=!0);let Rt=mt.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Rt[D])?L=Rt[D][P]:L=Rt[D],j=!0):x.samples>0&&Pt.useMultisampledRTT(x)===!1?L=mt.get(x).__webglMultisampledFramebuffer:Array.isArray(Rt)?L=Rt[P]:L=Rt,O.copy(x.viewport),F.copy(x.scissor),k=x.scissorTest}else O.copy(Et).multiplyScalar(H).floor(),F.copy(Gt).multiplyScalar(H).floor(),k=le;if(P!==0&&(L=ou),St.bindFramebuffer(R.FRAMEBUFFER,L)&&I&&St.drawBuffers(x,L),St.viewport(O),St.scissor(F),St.setScissorTest(k),j){let ut=mt.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+D,ut.__webglTexture,P)}else if(et){let ut=D;for(let bt=0;bt<x.textures.length;bt++){let Rt=mt.get(x.textures[bt]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+bt,Rt.__webglTexture,P,ut)}}else if(x!==null&&P!==0){let ut=mt.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,ut.__webglTexture,P)}E=-1},this.readRenderTargetPixels=function(x,D,P,I,L,j,et,lt=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ut=mt.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&et!==void 0&&(ut=ut[et]),ut){St.bindFramebuffer(R.FRAMEBUFFER,ut);try{let bt=x.textures[lt],Rt=bt.format,dt=bt.type;if(!wt.textureFormatReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!wt.textureTypeReadable(dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=x.width-I&&P>=0&&P<=x.height-L&&(x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+lt),R.readPixels(D,P,I,L,yt.convert(Rt),yt.convert(dt),j))}finally{let bt=U!==null?mt.get(U).__webglFramebuffer:null;St.bindFramebuffer(R.FRAMEBUFFER,bt)}}},this.readRenderTargetPixelsAsync=async function(x,D,P,I,L,j,et,lt=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ut=mt.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&et!==void 0&&(ut=ut[et]),ut)if(D>=0&&D<=x.width-I&&P>=0&&P<=x.height-L){St.bindFramebuffer(R.FRAMEBUFFER,ut);let bt=x.textures[lt],Rt=bt.format,dt=bt.type;if(!wt.textureFormatReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!wt.textureTypeReadable(dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ft=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Ft),R.bufferData(R.PIXEL_PACK_BUFFER,j.byteLength,R.STREAM_READ),x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+lt),R.readPixels(D,P,I,L,yt.convert(Rt),yt.convert(dt),0);let ee=U!==null?mt.get(U).__webglFramebuffer:null;St.bindFramebuffer(R.FRAMEBUFFER,ee);let Me=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await j1(R,Me,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Ft),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,j),R.deleteBuffer(Ft),R.deleteSync(Me),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,D=null,P=0){let I=Math.pow(2,-P),L=Math.floor(x.image.width*I),j=Math.floor(x.image.height*I),et=D!==null?D.x:0,lt=D!==null?D.y:0;Pt.setTexture2D(x,0),R.copyTexSubImage2D(R.TEXTURE_2D,P,0,0,et,lt,L,j),St.unbindTexture()};let lu=R.createFramebuffer(),At=R.createFramebuffer();this.copyTextureToTexture=function(x,D,P=null,I=null,L=0,j=null){j===null&&(L!==0?(rl("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=L,L=0):j=0);let et,lt,ut,bt,Rt,dt,Ft,ee,Me,ye=x.isCompressedTexture?x.mipmaps[j]:x.image;if(P!==null)et=P.max.x-P.min.x,lt=P.max.y-P.min.y,ut=P.isBox3?P.max.z-P.min.z:1,bt=P.min.x,Rt=P.min.y,dt=P.isBox3?P.min.z:0;else{let Nn=Math.pow(2,-L);et=Math.floor(ye.width*Nn),lt=Math.floor(ye.height*Nn),x.isDataArrayTexture?ut=ye.depth:x.isData3DTexture?ut=Math.floor(ye.depth*Nn):ut=1,bt=0,Rt=0,dt=0}I!==null?(Ft=I.x,ee=I.y,Me=I.z):(Ft=0,ee=0,Me=0);let ce=yt.convert(D.format),Ut=yt.convert(D.type),we;D.isData3DTexture?(Pt.setTexture3D(D,0),we=R.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Pt.setTexture2DArray(D,0),we=R.TEXTURE_2D_ARRAY):(Pt.setTexture2D(D,0),we=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,D.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,D.unpackAlignment);let Qt=R.getParameter(R.UNPACK_ROW_LENGTH),xn=R.getParameter(R.UNPACK_IMAGE_HEIGHT),Js=R.getParameter(R.UNPACK_SKIP_PIXELS),Sn=R.getParameter(R.UNPACK_SKIP_ROWS),qa=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,ye.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ye.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,bt),R.pixelStorei(R.UNPACK_SKIP_ROWS,Rt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,dt);let Ce=x.isDataArrayTexture||x.isData3DTexture,Un=D.isDataArrayTexture||D.isData3DTexture;if(x.isDepthTexture){let Nn=mt.get(x),nn=mt.get(D),hn=mt.get(Nn.__renderTarget),El=mt.get(nn.__renderTarget);St.bindFramebuffer(R.READ_FRAMEBUFFER,hn.__webglFramebuffer),St.bindFramebuffer(R.DRAW_FRAMEBUFFER,El.__webglFramebuffer);for(let zt=0;zt<ut;zt++)Ce&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,mt.get(x).__webglTexture,L,dt+zt),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,mt.get(D).__webglTexture,j,Me+zt)),R.blitFramebuffer(bt,Rt,et,lt,Ft,ee,et,lt,R.DEPTH_BUFFER_BIT,R.NEAREST);St.bindFramebuffer(R.READ_FRAMEBUFFER,null),St.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(L!==0||x.isRenderTargetTexture||mt.has(x)){let Nn=mt.get(x),nn=mt.get(D);St.bindFramebuffer(R.READ_FRAMEBUFFER,lu),St.bindFramebuffer(R.DRAW_FRAMEBUFFER,At);for(let hn=0;hn<ut;hn++)Ce?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Nn.__webglTexture,L,dt+hn):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Nn.__webglTexture,L),Un?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,nn.__webglTexture,j,Me+hn):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,nn.__webglTexture,j),L!==0?R.blitFramebuffer(bt,Rt,et,lt,Ft,ee,et,lt,R.COLOR_BUFFER_BIT,R.NEAREST):Un?R.copyTexSubImage3D(we,j,Ft,ee,Me+hn,bt,Rt,et,lt):R.copyTexSubImage2D(we,j,Ft,ee,bt,Rt,et,lt);St.bindFramebuffer(R.READ_FRAMEBUFFER,null),St.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Un?x.isDataTexture||x.isData3DTexture?R.texSubImage3D(we,j,Ft,ee,Me,et,lt,ut,ce,Ut,ye.data):D.isCompressedArrayTexture?R.compressedTexSubImage3D(we,j,Ft,ee,Me,et,lt,ut,ce,ye.data):R.texSubImage3D(we,j,Ft,ee,Me,et,lt,ut,ce,Ut,ye):x.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,j,Ft,ee,et,lt,ce,Ut,ye.data):x.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,j,Ft,ee,ye.width,ye.height,ce,ye.data):R.texSubImage2D(R.TEXTURE_2D,j,Ft,ee,et,lt,ce,Ut,ye);R.pixelStorei(R.UNPACK_ROW_LENGTH,Qt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,xn),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Js),R.pixelStorei(R.UNPACK_SKIP_ROWS,Sn),R.pixelStorei(R.UNPACK_SKIP_IMAGES,qa),j===0&&D.generateMipmaps&&R.generateMipmap(we),St.unbindTexture()},this.initRenderTarget=function(x){mt.get(x).__webglFramebuffer===void 0&&Pt.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Pt.setTextureCube(x,0):x.isData3DTexture?Pt.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Pt.setTexture2DArray(x,0):Pt.setTexture2D(x,0),St.unbindTexture()},this.resetState=function(){C=0,w=0,U=null,St.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),n.unpackColorSpace=$t._getUnpackColorSpace()}};var Ob=Ni(Fr());function Lb(){let e=(0,nu.useRef)(null),t=(0,nu.useRef)(null);return(0,nu.useEffect)(()=>{if(!e.current||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let n=e.current,i=`
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
    `,a=new Rr;a.position.z=1;let r=new kc,o=new Dr(2,2),l={time:{type:"f",value:1},resolution:{type:"v2",value:new ae}},c=new li({uniforms:l,vertexShader:i,fragmentShader:s}),f=new Gn(o,c);r.add(f);let d;try{d=new Pd({antialias:!0})}catch{o.dispose(),c.dispose();return}d.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.appendChild(d.domElement);let h=()=>{let M=n.clientWidth,m=n.clientHeight;d.setSize(M,m),l.resolution.value.x=d.domElement.width,l.resolution.value.y=d.domElement.height};h();let p=new ResizeObserver(h);p.observe(n);let _=()=>{let M=requestAnimationFrame(_);l.time.value+=.05,d.render(r,a),t.current&&(t.current.animationId=M)};return t.current={camera:a,scene:r,renderer:d,uniforms:l,animationId:0},_(),()=>{p.disconnect(),t.current&&(cancelAnimationFrame(t.current.animationId),n&&t.current.renderer.domElement&&t.current.renderer.domElement.remove(),t.current.renderer.dispose(),o.dispose(),c.dispose(),t.current=null)}},[]),(0,Ob.jsx)("div",{ref:e,"aria-hidden":"true",className:"absolute inset-0 h-full w-full",style:{background:"transparent",overflow:"hidden"}})}var Zs=Ni(Zr()),Vr=Ni(Fr()),Cn=7e3,wi=19,ke=1/60,Ci=32,Fb=Math.PI*2,_s=6,Ib=3,UD=[34,230,255],ND=[138,92,255],LD=[255,61,154],OD=[234,252,255],ID=[.2,.32,.48],PD=[.7,.9,1.2],BD=1.3,zD=1.4,Pb=1-Math.exp(-ke/.12),FD=1-Math.exp(-ke*8),Bb=1-Math.exp(-ke*18),zb=1-Math.exp(-ke*10),HD=1-Math.exp(-ke/.06),VD=1-Math.exp(-ke/.2),GD=.03*ke,kD=Math.exp(-ke/.45),XD=Math.exp(-ke/1.1);function Hr(e,t,n){return e<t?t:e>n?n:e}function WD(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function Fd(e,t){if(!e)return t;let n=e.trim().replace(/^#/,"");if(n.length===3&&(n=n.charAt(0)+n.charAt(0)+n.charAt(1)+n.charAt(1)+n.charAt(2)+n.charAt(2)),!/^[0-9a-fA-F]{6}$/.test(n))return t;let i=parseInt(n,16);return[i>>16&255,i>>8&255,i&255]}function c_(e,t,n,i,s){let a=Fb/e;return{kx:a*Math.cos(t),ky:a*Math.sin(t),om:n,ph:i,au:s*Math.sin(t),av:-s*Math.cos(t)}}var yl=c_(380,.35,.18,.7,16),xl=c_(620,1.9,.27,2.1,13),Sl=c_(900,3.4,.35,4.2,10);function u_(e){let t=(0,Zs.useRef)(null),n=(0,Zs.useRef)(null),i=(0,Zs.useRef)(null),s=(0,Zs.useRef)(e),a=(0,Zs.useRef)(null);s.current=e,(0,Zs.useEffect)(()=>{let c=t.current,f=n.current,d=i.current;if(!c||!f||!d)return;let h=f.getContext("2d"),p=d.getContext("2d");if(!h||!p)return;let _=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,M=WD(7),m=!1,u=!1,g=!1,v=0,y=0,T=1,C=1,w=1,U=new Float32Array(Cn),E=new Float32Array(Cn),b=new Float32Array(Cn),O=new Float32Array(Cn),F=new Float32Array(Cn),k=new Float32Array(Cn),q=new Float32Array(Cn),J=new Float32Array(Cn),W=new Uint8Array(Cn),nt=new Float32Array(Cn*wi),H=new Float32Array(Cn*wi),ct=0,ft=[];for(let At=0;At<6;At++)ft.push(new Int32Array(Cn));let Et=new Int32Array(6),Gt=new Array(6*_s).fill(""),le=new Float32Array(6*_s),pe=["",""],Jt=null,Y=new Float32Array(Ci),$=new Float32Array(Ci),gt=new Float32Array(Ci),Nt=new Float32Array(Ci),Mt=new Uint8Array(Ci),Wt=new Float32Array(Ci),Xe=new Float32Array(Ci),R=new Float32Array(Ci),ve=new Float32Array(Ci),It=new Float32Array(Ci),wt=0,St=0,me=1,mt=0,Pt=0,De=0,ge=0,A=0,S=1,B=!1,G=0,K=0,V=0,Tt=1.2,at=0,_t=0,vt=0,Q=0,rt=0,Ct=0,yt=0,ot=0,Dt=0,N=0,it=64,st=0,pt=0,tt=0,Z=16.7,xt=4,Lt=0,te=0,jt=()=>{let At=getComputedStyle(c),x=s.current.palette,D=Fd(x?.calm??At.getPropertyValue("--dr-calm"),UD),P=Fd(x?.mid??At.getPropertyValue("--dr-mid"),ND),I=Fd(x?.hot??At.getPropertyValue("--dr-hot"),LD),L=Fd(At.getPropertyValue("--dr-core"),OD),j=[D,P,I];for(let lt=0;lt<6;lt++){let ut=lt<3?0:1,bt=lt%3,Rt=j[bt];for(let dt=0;dt<_s;dt++){let Ft=Math.pow(1-(dt+.5)/_s,1.5),ee=Math.min(.95,ID[bt]*(ut===0?.55:1)*Ft*BD);Gt[lt*_s+dt]=`rgba(${Rt[0]},${Rt[1]},${Rt[2]},${ee.toFixed(3)})`;let Me=PD[bt]*(ut===0?.75:1)*(1-.45*dt/_s);le[lt*_s+dt]=Hr(Me,.6,1.3)}}pe[0]=`rgba(${L[0]},${L[1]},${L[2]},0.5)`,pe[1]=`rgba(${L[0]},${L[1]},${L[2]},0.85)`;let et=h.createRadialGradient(0,0,0,0,0,1);et.addColorStop(0,`rgba(${I[0]},${I[1]},${I[2]},1)`),et.addColorStop(.45,`rgba(${I[0]},${I[1]},${I[2]},0.32)`),et.addColorStop(1,`rgba(${I[0]},${I[1]},${I[2]},0)`),Jt=et},Rn=(At,x)=>{let D,P;x?(D=M()*v,P=M()*y):(D=-40+M()*(v+80),P=-40-M()*80);let I=.35+.65*M(),L=70+90*I*I,j=Hr(s.current.flowSpeed??1,.05,5);F[At]=I,k[At]=L,W[At]=9+Math.floor(M()*11),U[At]=D,E[At]=P,b[At]=0,O[At]=L*j,q[At]=1,J[At]=0;let et=At*wi;for(let lt=0;lt<wi;lt++)nt[et+lt]=D,H[et+lt]=P},kn=()=>{for(let At=0;At<Cn;At++)Rn(At,!0)},iu=(At,x)=>{let D=Hr(Math.round(At),1,Cn);for(let P=ge;P<D;P++)Rn(P,x);ge=D},Dn=At=>{let x=Hr(Math.round(v*y/520),1200,5200),D=s.current.count;A=Hr(Math.round(D!==void 0?D:x),1,Cn),iu(A*S,At)},Ml=(At,x)=>{let D=ot/x,P=Dt/x,I=me;me=-me;let L=St;St=(St+1)%Ci,Y[L]=Q-D*.6*At-P*I*.7*At,$[L]=rt-P*.6*At+D*I*.7*At,gt[L]=Hr(I*Math.min(x,1200)*At*1.5,-105e3,105e3),Nt[L]=0,Mt[L]=1},bl=()=>{let At=s.current,x=Hr(At.flowSpeed??1,.05,5),D=At.obstacleRadius??64,P=At.autopilot??!0;ct=(ct+1)%wi,Pt+=ke,g&&(De+=ke);let I=!_&&P&&!B&&g&&De-V>=Tt,L=B?2:I?1:0;L===1?(_t=v*(.5+.32*Math.sin(.37*De)),vt=y*(.5+.28*Math.sin(.53*De+1.2))):L===2&&(_t=G,vt=K);let j=L!==0&&at===0&&N<.05;at=L,j?(Q=_t,rt=vt,Ct=Q,yt=rt,ot=0,Dt=0):(Ct=Q,yt=rt,Q+=(_t-Q)*Bb,rt+=(vt-rt)*Bb,ot+=((Q-Ct)/ke-ot)*zb,Dt+=((rt-yt)/ke-Dt)*zb),N+=((L!==0?1:0)-N)*(L!==0?HD:VD);let et=N,lt=Math.sqrt(ot*ot+Dt*Dt),ut=D+Math.min(lt*.025,36);if(it=ut,et>.3&&lt>60){let zt=Q-Ct,Xn=rt-yt;mt+=Math.sqrt(zt*zt+Xn*Xn);let ui=0;for(;mt>=28&&ui<4;)mt-=28,ui++,Ml(ut,lt);mt>=28&&(mt=0)}else mt=0;wt=0;let bt=.5*115*x*ke;for(let zt=0;zt<Ci;zt++){if(Mt[zt]===0)continue;let Xn=Nt[zt]+ke;if(Xn>2.4){Mt[zt]=0;continue}Nt[zt]=Xn,gt[zt]*=XD,$[zt]+=bt;let ui=676+90*Xn;Wt[wt]=Y[zt],Xe[wt]=$[zt],R[wt]=gt[zt]/Fb,ve[wt]=ui,It[wt]=36*ui,wt++}let Rt=yl.om*Pt+yl.ph,dt=xl.om*Pt+xl.ph,Ft=Sl.om*Pt+Sl.ph,ee=yl.kx,Me=yl.ky,ye=xl.kx,ce=xl.ky,Ut=Sl.kx,we=Sl.ky,Qt=yl.au,xn=yl.av,Js=xl.au,Sn=xl.av,qa=Sl.au,Ce=Sl.av,Un=et>.002,Nn=et>.05,nn=Math.min(1,et*1.5),hn=y+40,El=v+120;for(let zt=0;zt<ge;zt++){let Xn=U[zt],ui=E[zt],Hd=F[zt],Vd=k[zt]*x,h_=Math.cos(ee*Xn+Me*ui+Rt),f_=Math.cos(ye*Xn+ce*ui+dt),d_=Math.cos(Ut*Xn+we*ui+Ft),Gd=(Qt*h_+Js*f_+qa*d_)*Hd,kd=Vd+(xn*h_+Sn*f_+Ce*d_)*Hd,p_=.55+.45*Hd,Di=ut*p_,cu=Xn-Q,uu=ui-rt,m_=0,g_=0,__=0;if(Un){let Be=cu*cu+uu*uu,hi=-ot,fi=Vd-Dt,fn=Math.sqrt(hi*hi+fi*fi);if(fn>.001){if(fn>900){let Ya=900/fn;hi*=Ya,fi*=Ya,fn=900}let Wi=hi/fn,Ui=fi/fn,dn=cu*Wi+uu*Ui,Wn=-cu*Ui+uu*Wi;if(dn>0&&dn<12*Di){let Ya=.9*Di+.2*dn,Tl=Wn/Ya;__=.55*Math.exp(-dn/(3*Di))*Math.exp(-Tl*Tl)}let Wr=9*Di;if(Be<Wr*Wr){let Ya=Math.max(dn*dn+Wn*Wn,Di*Di*.64),Tl=Di*Di/(Ya*Ya),b_=-fn*Tl*(dn*dn-Wn*Wn),E_=-fn*Tl*2*dn*Wn,Xd=1,Wd=5*Di;if(Be>Wd*Wd){let qd=(Math.sqrt(Be)-Wd)/(4*Di);Xd=1-qd*qd*(3-2*qd)}m_=(b_*Wi-E_*Ui)*Xd,g_=(b_*Ui+E_*Wi)*Xd}}}let v_=0,y_=0;for(let Be=0;Be<wt;Be++){let hi=Xn-Wt[Be],fi=ui-Xe[Be],fn=hi*hi+fi*fi+.001,Wi=It[Be];if(fn<Wi){let Ui=R[Be]*(1-Math.exp(-fn/ve[Be]))/fn,dn=1-fn/Wi,Wn=Ui*dn*dn*p_;v_+=-fi*Wn,y_+=hi*Wn}}let x_=1-__*et;Gd=Gd*x_+m_*et+v_,kd=kd*x_+g_*et+y_;let vs=b[zt]+(Gd-b[zt])*Pb,ys=O[zt]+(kd-O[zt])*Pb,S_=vs*vs+ys*ys;if(S_>81e4){let Be=900/Math.sqrt(S_);vs*=Be,ys*=Be}let kr=Xn+vs*ke,Xr=ui+ys*ke;if(Nn){let Be=Di*nn,hi=kr-Q,fi=Xr-rt,fn=hi*hi+fi*fi,Wi=.98*Be;if(fn<Wi*Wi){let Ui=Math.sqrt(fn),dn=Ui<.001?0:hi/Ui,Wn=Ui<.001?1:fi/Ui;kr=Q+dn*Be,Xr=rt+Wn*Be;let Wr=(vs-ot)*dn+(ys-Dt)*Wn;Wr<0&&(vs-=Wr*dn,ys-=Wr*Wn)}}if(b[zt]=vs,O[zt]=ys,U[zt]=kr,E[zt]=Xr,Xr>hn||kr<-120||kr>El||Xr<-600){Rn(zt,!1);continue}if(q[zt]+=(Math.sqrt(vs*vs+ys*ys)/Vd-q[zt])*FD,M()<GD)J[zt]=1;else{let Be=J[zt]*kD;J[zt]=Be<.01?0:Be}let M_=zt*wi+ct;nt[M_]=kr,H[M_]=Xr}},Ga=()=>{if(h.setTransform(T,0,0,T,0,0),h.clearRect(0,0,v,y),h.globalCompositeOperation="lighter",h.lineCap="round",h.lineJoin="round",N>.02&&Jt){let x=Math.sqrt(ot*ot+Dt*Dt),D=1.5*it;h.globalAlpha=Math.min(1,(.05+Math.min(x/4e3,.07))*N),h.setTransform(T*D,0,0,T*D,T*Q,T*rt),h.fillStyle=Jt,h.fillRect(-1,-1,2,2),h.globalAlpha=1,h.setTransform(T,0,0,T,0,0)}Et.fill(0);for(let x=0;x<ge;x++){let D=q[x],P=D<1.25?0:D<1.85?1:2;J[x]>.35&&P<2&&P++;let I=(F[x]<.62?0:3)+P;ft[I][Et[I]++]=x}for(let x=0;x<6;x++){let D=Et[x];if(D===0)continue;let P=ft[x];for(let I=0;I<_s;I++){let L=I*Ib,j=L+Ib;h.strokeStyle=Gt[x*_s+I],h.lineWidth=le[x*_s+I],h.beginPath();for(let et=0;et<D;et++){let lt=P[et],ut=W[lt]-1;if(L>=ut)continue;let bt=lt*wi,Rt=Math.min(j,ut),dt=(ct-L+wi)%wi;h.moveTo(nt[bt+dt],H[bt+dt]);for(let Ft=L;Ft<Rt;Ft++)dt=dt===0?wi-1:dt-1,h.lineTo(nt[bt+dt],H[bt+dt])}h.stroke()}}let At=ct===0?wi-1:ct-1;h.lineWidth=zD;for(let x=0;x<2;x++){h.strokeStyle=pe[x],h.beginPath();for(let D=1;D<3;D++){let P=x*3+D,I=Et[P],L=ft[P];for(let j=0;j<I;j++){let et=L[j];if(D===1&&J[et]<=.5)continue;let lt=et*wi;h.moveTo(nt[lt+ct],H[lt+ct]),h.lineTo(nt[lt+At],H[lt+At])}}h.stroke()}p.clearRect(0,0,C,w),p.drawImage(f,0,0,C,w)},ka=At=>{let x=Math.round(At/ke);for(let D=0;D<x;D++)bl()},Gr=()=>{kn(),ge=0,Dn(!0),B=!0,G=v*.4,K=y*.45,_t=G,vt=K,Q=Ct=G,rt=yt=K,ot=0,Dt=0,N=1,at=2,wt=0,Mt.fill(0),ka(3),Ga()},Xa=()=>{let At=c.getBoundingClientRect(),x=Math.max(1,At.width||window.innerWidth),D=Math.max(1,At.height||window.innerHeight),P=Math.min(window.devicePixelRatio||1,2);if(x*D*P*P>45e5&&(P=Math.sqrt(45e5/(x*D))),!(x===v&&D===y&&P===T)&&(v=x,y=D,T=P,f.width=Math.max(1,Math.round(v*T)),f.height=Math.max(1,Math.round(y*T)),C=Math.max(1,Math.ceil(v/4)),w=Math.max(1,Math.ceil(y/4)),d.width=C,d.height=w,p.imageSmoothingEnabled=!0,p.imageSmoothingQuality="medium",!!u)){if(_){Gr();return}for(let I=0;I<ge;I++)(U[I]<-120||U[I]>v+120||E[I]>y+40)&&Rn(I,!1);Dn(!0),Ga()}},Wa=At=>{let x=c.getBoundingClientRect();if(At.clientX<x.left||At.clientX>x.right||At.clientY<x.top||At.clientY>x.bottom){Ri();return}G=At.clientX-x.left,K=At.clientY-x.top,B=!0},Ri=()=>{B&&(B=!1,V=De,Tt=4)},su=At=>{At.pointerType!=="mouse"&&Ri()},au=At=>{if(m)return;let x=Math.max(0,At-pt);pt=At,tt+=Math.min(.05,x/1e3);let D=performance.now(),P=0;for(;tt>=ke&&P<3;)bl(),tt-=ke,P++;P===3&&(tt=0),P>0&&Ga();let I=performance.now()-D;x>0&&x<100&&(Z+=(x-Z)*.05,xt+=(I-xt)*.05),Z>20?(Lt++,te=0):Z<18.5&&xt<12?(te++,Lt=0):(Lt=0,te=0),Lt>=60&&S>.4?(S=Math.max(.4,S-.1),Lt=0,Dn(!1)):te>=180&&S<1&&(S=Math.min(1,S+.05),te=0,Dn(!1)),st=requestAnimationFrame(au)},ru=()=>{cancelAnimationFrame(st),pt=performance.now(),tt=0,st=requestAnimationFrame(au)},ou=()=>{document.hidden?(cancelAnimationFrame(st),st=0):g&&!m&&ru()};Xa(),jt(),kn(),Dn(!0),Q=Ct=_t=v*.5,rt=yt=vt=y*.5;let lu=new ResizeObserver(()=>Xa());return lu.observe(c),a.current={refresh:()=>{m||!u||(jt(),_?Gr():Dn(!1))}},_?(u=!0,Gr()):(ka(2.5),Ga(),u=!0,g=!0,window.addEventListener("pointermove",Wa,{passive:!0}),window.addEventListener("pointerdown",Wa,{passive:!0}),window.addEventListener("pointerup",su,{passive:!0}),window.addEventListener("pointercancel",Ri,{passive:!0}),window.addEventListener("blur",Ri),document.documentElement.addEventListener("pointerleave",Ri),document.addEventListener("visibilitychange",ou),ru()),()=>{m=!0,g=!1,cancelAnimationFrame(st),st=0,window.removeEventListener("pointermove",Wa),window.removeEventListener("pointerdown",Wa),window.removeEventListener("pointerup",su),window.removeEventListener("pointercancel",Ri),window.removeEventListener("blur",Ri),document.documentElement.removeEventListener("pointerleave",Ri),document.removeEventListener("visibilitychange",ou),lu.disconnect(),a.current=null,Jt=null}},[]);let r=e.palette;(0,Zs.useEffect)(()=>{a.current?.refresh()},[e.count,r?.calm,r?.mid,r?.hot]);let l="dr-root"+(e.fullscreen??!0?"":" dr-root--contained")+(e.className?" "+e.className:"");return(0,Vr.jsxs)("div",{ref:t,className:l,"aria-hidden":"true",children:[(0,Vr.jsx)("canvas",{ref:i,className:"dr-bloom"}),(0,Vr.jsx)("canvas",{ref:n,className:"dr-main"}),(0,Vr.jsx)("div",{className:"dr-vignette"}),(0,Vr.jsx)("div",{className:"dr-grain"})]})}var Xi=Ni(Fr()),Hb=element.querySelector("[data-shader-root]"),Vb=element.querySelector("[data-atmosphere-controls]");function qD(){let[e,t]=(0,Gb.useState)("rain");return(0,Xi.jsxs)(Xi.Fragment,{children:[e==="rain"&&(0,Xi.jsx)(u_,{fullscreen:!1,count:650,flowSpeed:.8,obstacleRadius:40}),e==="shader"&&(0,Xi.jsx)(Lb,{}),Vb&&(0,kb.createPortal)((0,Xi.jsxs)("div",{className:"atmosphere-picker",role:"group","aria-label":"Hero animation",children:[(0,Xi.jsx)("span",{children:"Atmosphere"}),["rain","shader","off"].map(n=>(0,Xi.jsx)("button",{type:"button","aria-pressed":e===n,onClick:()=>t(n),children:{rain:"Data Rain",shader:"Shader",off:"Off"}[n]},n))]}),Vb)]})}if(Hb){let e=(0,Xb.createRoot)(Hb);e.render((0,Xi.jsx)(qD,{}));let t=new MutationObserver(()=>{element.isConnected||(e.unmount(),t.disconnect())});t.observe(document.body,{childList:!0,subtree:!0})}})();
/*! Bundled license information:

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
