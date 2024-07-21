"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[882],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>p});var r=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,s=function(e,t){if(null==e)return{};var n,r,s={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},f="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,s=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),f=u(n),d=s,p=f["".concat(l,".").concat(d)]||f[d]||m[d]||o;return n?r.createElement(p,a(a({ref:t},c),{},{components:n})):r.createElement(p,a({ref:t},c))}));function p(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=n.length,a=new Array(o);a[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[f]="string"==typeof e?e:s,a[1]=i;for(var u=2;u<o;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6221:(e,t,n)=>{n.d(t,{Z:()=>q});var r=n(7294),s=n(6010);const o=40500000n,a=40500n,i=86400n,l=730485n,u=-1840700269n,c=-2004318071n,f=-1282606671n,m=1374389535n,d=[0,31,59,90,120,151,181,212,243,273,304,334],p=[0,31,60,91,121,152,182,213,244,274,305,335];function h(e){const t=BigInt("0x"+e),n={},r=t%o;let s=8n*r/324n;s%=1000n,n.microseconds=Number(s);let h=r/a;h%=1000n,n.milliseconds=Number(h);const g=(t-r)/o;!function(e,t){const n=e+6n,r=n-7n*(n+(u*n>>0x20n)>>2n);t.dayOfWeek=Number(r);const s=e*f>>0x20n,o=e+s;let a,i=o>>8n,l=365n*i;for(;;){let t;if(i>=1n){const e=(i-1n)*m>>0x20n;t=(i+3n>>2n)-(e>>5n)+(e>>7n)}else t=0n;if(a=l+t,a<=e)break;i-=1n,l-=365n}const c=Number(e-a);t.year=Number(i),t.dayOfYear=c;let h=!0,g=!1;if(4n*(i>>2n)===i){100n*(i*m>>0x20n>>5n)!==i&&(g=!0)}if(!g){400n*(i*m>>0x20n>>7n)!==i&&(h=!1)}let y;y=h?p:d;let b=12;for(;;){b-=1;if(c>=y[b])break}t.month=b;const v=y[b],k=c-v+1;t.day=k}(g/i+l,n);const y=g%i,b=y+(c*y>>0x20n)>>5n,v=b+(c*b>>0x20n)>>5n,k=60n*v;n.hours=Number(v);const x=60n*b,O=b-k;n.minutes=Number(O);const w=y-x;return n.seconds=Number(w),n}const g="outputText_F4so",y="error_nwlf",b="dateFormat_HHIs",v="swapButton_KciG",k=40500000n,x=86400n,O=3600n,w=60n,T=0x7fffffffffffffffn,S=1374389535n,B=/^(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2}):(\d{2})$/,I=/^(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.?)(\d{0,6})$/,N=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],P={1:"st",2:"nd",3:"rd"};function E(e,t){for(e=String(e);e.length<t;)e="0"+e;return e}function C(e){return E(e,2)}function D(e,t){if(t){e=(BigInt("0x"+e)*k).toString(16)}const{year:n,month:r,day:s,hours:o,minutes:a,seconds:i,milliseconds:l,microseconds:u,dayOfWeek:c,dayOfYear:f}=h(e),m=t?"":`.${E(l,3)}${E(u,3)}`;return`${n}/${C(r+1)}/${C(s)} ${C(o)}:${C(a)}:${C(i)}${m} (${N[c]})\nThis is the ${function(e){const t=String(e+1),n=t.charAt(t.length-1);return t+(P[n]||"th")}(f)} day of the year.`}const M=[0,31,59,90,120,151,181,212,243,273,304,334],j=[0,31,60,91,121,152,182,213,244,274,305,335];function $(e){let{year:t,month:n,day:r,hours:s,minutes:o,seconds:a,fractionalSeconds:i}=e,l=0n;return l+=function(e){let t;if((e-=2000n)>=1n){const n=(e-1n)*S>>0x20n;t=(e+3n>>2n)-(n>>5n)+(n>>7n)}else t=0n;return(365n*e+t)*x*k}(t),l+=function(e,t,n){let r,s=!0,o=!1;4n*(e>>2n)===e&&100n*(e*S>>0x20n>>5n)!==e&&(o=!0);o||400n*(e*S>>0x20n>>7n)!==e&&(s=!1);return r=s?j:M,(BigInt(r[t])+n-1n)*x*k}(t,n,r),l+=s*O*k,l+=o*w*k,l+=a*k,l+=324n*i/8n,l>T?-1n:l}function Y(e,t){if("string"!=typeof e||e.length<1)return{ignore:!0};let n,r,s,o,a,i,l=0n;if(t){const t=e.match(B);if(!t)return{error:"Input does not match the format: YYYY/MM/DD hh:mm:ss"};n=BigInt(t[1]),r=BigInt(t[2])-1n,s=BigInt(t[3]),o=BigInt(t[4]),a=BigInt(t[5]),i=BigInt(t[6])}else{const t=e.match(I);if(!t||0===t[7].length&&t[8].length>0)return{error:"Input does not match the format: YYYY/MM/DD hh:mm:ss.ssssss"};n=BigInt(t[1]),r=BigInt(t[2])-1n,s=BigInt(t[3]),o=BigInt(t[4]),a=BigInt(t[5]),i=BigInt(t[6]),l=BigInt(function(e,t){for(e=String(e);e.length<t;)e+="0";return e}(t[8],6))}if(n<2000n)return{error:"Minimum year is 2000."};if(r<0||r>11)return{error:"Month must be between 01 and 12."};if(s<1)return{error:"Day must be at least 01."};if(o>=24)return{error:"Hours must be between 00 and 23"};if(a>=60)return{error:"Minutes must be between 00 and 59"};if(i>=60)return{error:"Minutes must be between 00 and 59"};let u=$({year:n,month:r,day:s,hours:o,minutes:a,seconds:i,fractionalSeconds:l});return u<0?{error:"Pick an earlier time."}:t&&(u/=k,u>0xffffffffn)?{error:"Max time is 2136/02/07 06:28:15"}:{val:E(u.toString(16),t?8:16),error:""}}function L(e,t){return e?t?20:40:t?19:26}const q=function(e){let{sourceName:t,useSeconds:n}=e;const o=(0,r.useRef)(null),[a,i]=(0,r.useState)(!0),[l,u]=(0,r.useState)(""),[c,f]=(0,r.useState)(!1);return r.createElement("div",null,r.createElement("div",null,t?function(e,t){return t?`${e} to Time Converter`:`Time to ${e} Converter`}(t,a):"TimestampConverter"),r.createElement("input",{maxLength:L(a,n),ref:o}),r.createElement("button",{onClick:function(){if(o.current)if(a){const{val:e,error:t,ignore:r}=function(e,t){let n=e.replaceAll(/\s/g,"");if(0===n.toLowerCase().indexOf("0x")&&(n=n.substring(2)),n.length<1)return{ignore:!0};if(t&&n.length>8)return{error:"Expected 8 hex digits."};if(!/^[0-9a-f]*$/gi.test(n))return{error:"Invalid characters."};if(!t){if(n.length>16)return{error:"Expected 16 hex digits."};if(16===n.length&&/^[89a-f]/i.test(n))return{error:"Input must be positive."}}return{val:n,error:""}}(o.current.value,n);f(Boolean(t)),r?u(""):t?u(t):e&&e.length>0?u(D(e,n)):u("")}else{const{val:e,error:t,ignore:r}=Y(o.current.value,n);f(Boolean(t)),r?u(""):t?u(t):e&&e.length>0?u(e):u("")}}},"Convert"),!a&&r.createElement("div",{className:b},"YYYY/MM/DD hh:mm:ss"+(n?"":"[.s] (Up to 6 digits after seconds)")),r.createElement("div",{className:(0,s.Z)({[g]:!0,[y]:c}),style:{display:l?void 0:"none"}},l),r.createElement("button",{className:v,onClick:()=>{o.current&&(o.current.value=""),u(""),i(!a)}},"Swap"))}},2971:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>u,toc:()=>f});var r=n(7462),s=(n(7294),n(3905)),o=n(9960),a=n(6221);const i={sidebar_label:"Player Status B"},l="Player Status B",u={unversionedId:"save-file/quest-log/player/player-status-b",id:"save-file/quest-log/player/player-status-b",title:"Player Status B",description:"This is the content of Player Status B.",source:"@site/docs/save-file/quest-log/player/player-status-b.mdx",sourceDirName:"save-file/quest-log/player",slug:"/save-file/quest-log/player/player-status-b",permalink:"/tp-docs/docs/save-file/quest-log/player/player-status-b",draft:!1,editUrl:"https://github.com/icogn/tp-docs/edit/main/website/docs/save-file/quest-log/player/player-status-b.mdx",tags:[],version:"current",frontMatter:{sidebar_label:"Player Status B"},sidebar:"saveFile",previous:{title:"Player Status A",permalink:"/tp-docs/docs/save-file/quest-log/player/player-status-a"},next:{title:"Horse Place",permalink:"/tp-docs/docs/save-file/quest-log/player/horse-place"}},c={},f=[{value:"0x028 timestamp",id:"offset-0x028",level:2},{value:"Selecting the Default Quest Log",id:"selecting-the-default-quest-log",level:3},{value:"Naming",id:"naming",level:3}],m={toc:f};function d(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"player-status-b"},"Player Status B"),(0,s.kt)("p",null,"This is the content of Player Status B."),(0,s.kt)("h2",{id:"offset-0x028"},"0x028 timestamp"),(0,s.kt)("p",null,"This is the number of OSTicks since 2000/01/01 at 00:00."),(0,s.kt)(a.Z,{sourceName:"Timestamp",mdxType:"TimestampConverter"}),(0,s.kt)("br",null),"For more info about converting a timestamp to a human readable time, see ",(0,s.kt)(o.Z,{to:"/docs/technical-explanations/ostickstocalendartime",mdxType:"Link"},"OSTicksToCalendarTime"),".",(0,s.kt)("h3",{id:"selecting-the-default-quest-log"},"Selecting the Default Quest Log"),(0,s.kt)("p",null,"The default quest log on the file select screen is picked this way:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"From the set which includes Quest Log 1 and any other Quest Logs which pass their checksum test, pick the Quest Log which has the latest timestamp (compared at the seconds level)."),(0,s.kt)("li",{parentName:"ul"},"In the case of a tie, Quest Log 1 has the highest priority and Quest Log 3 has the lowest priority.")),(0,s.kt)("admonition",{type:"info"},(0,s.kt)("p",{parentName:"admonition"},'Quest Logs which fail their checksum test say "This Quest Log is corrupted."')),(0,s.kt)("h3",{id:"naming"},"Naming"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"The timestamp is passed to ",(0,s.kt)("inlineCode",{parentName:"li"},"OS::OSTicksToCalendarTime")," which is where the term OSTicks comes from.")))}d.isMDXComponent=!0}}]);