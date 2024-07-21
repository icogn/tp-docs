"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4674],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>k});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var r=a.createContext({}),c=function(e){var t=a.useContext(r),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(r.Provider,{value:t},e.children)},h="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,r=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),h=c(n),d=o,k=h["".concat(r,".").concat(d)]||h[d]||u[d]||i;return n?a.createElement(k,l(l({ref:t},p),{},{components:n})):a.createElement(k,l({ref:t},p))}));function k(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,l=new Array(i);l[0]=d;var s={};for(var r in t)hasOwnProperty.call(t,r)&&(s[r]=t[r]);s.originalType=e,s[h]="string"==typeof e?e:o,l[1]=s;for(var c=2;c<i;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1262:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(7294),o=n(2389);function i(e){let{children:t,fallback:n}=e;return(0,o.Z)()?a.createElement(a.Fragment,null,t?.()):n??null}},6363:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>x,contentTitle:()=>v,default:()=>A,frontMatter:()=>N,metadata:()=>b,toc:()=>L});var a=n(7462),o=n(7294),i=n(3905),l=n(9960),s=n(1262);const r="videoWrapper_Bq3v",c="video_e2JA";function p(e){let{src:t,maxHeight:n=360}=e;const[a,i]=(0,o.useState)(null),l=(0,o.useRef)(null);let s;return null==l.current&&(l.current=window.innerWidth<576),a?s={maxWidth:a}:l.current||(s={height:n,maxWidth:16*n/9}),o.createElement("div",{className:r,style:s},o.createElement("video",{controls:!0,onLoadedMetadata:function(e){const{videoWidth:t,videoHeight:a}=e.target;i(n*t/a)},className:c},o.createElement("source",{src:t,type:"video/mp4"})))}function h(e){return o.createElement(s.Z,{fallback:o.createElement("p",null,"Loading...")},(()=>o.createElement(p,e)))}const u=n.p+"assets/medias/sprLockSoftlock-44f59ee9321fc9f429ea1b8de95982ba.mp4",d=n.p+"assets/medias/sprLockFrames-abc105174d86d63dbda1c2638c313a09.mp4",k=n.p+"assets/medias/sprLockFixStatus-04f62fc7b68c756267f08321ad67369e.mp4",m=n.p+"assets/medias/sprLockFixOpenToLand-6792467e5fd700c5375ee44fbb54956e.mp4",f=n.p+"assets/medias/sprLockFixFallAdjust-599aa72744fe938121b2cd1653ed69d5.mp4",g=n.p+"assets/medias/sprLockFixMatchSide-c03e45ea422c48e4dd44c2663080a137.mp4",y=n.p+"assets/medias/sprLockBounceBack-13008747a866b58beb2d992a201d101e.mp4",w=n.p+"assets/medias/sprLockFallFromHigh-f96a3d3916178eb1388d00c70fa92bba.mp4",N={},v="Snowpeak Ruins Lock Softlock",b={unversionedId:"technical-explanations/sprlocksoftlock",id:"technical-explanations/sprlocksoftlock",title:"Snowpeak Ruins Lock Softlock",description:"Only one of the four small key doors in Snowpeak Ruins can be unlocked from either side without",source:"@site/docs/technical-explanations/sprlocksoftlock.mdx",sourceDirName:"technical-explanations",slug:"/technical-explanations/sprlocksoftlock",permalink:"/tp-docs/docs/technical-explanations/sprlocksoftlock",draft:!1,editUrl:"https://github.com/icogn/tp-docs/edit/main/website/docs/technical-explanations/sprlocksoftlock.mdx",tags:[],version:"current",frontMatter:{},sidebar:"technicalExplanations",previous:{title:"Rando SeedInfo CLR0 Structure",permalink:"/tp-docs/docs/technical-explanations/rando-seedInfo-clr0"},next:{title:"Texture Recoloring",permalink:"/tp-docs/docs/technical-explanations/texture-recoloring"}},x={},L=[{value:"Why does this happen?",id:"why-does-this-happen",level:2},{value:"Lock Actions",id:"lock-actions",level:3},{value:"Lock Phases",id:"lock-phases",level:3},{value:"Phases 0 and -1",id:"phases-0-and--1",level:4},{value:"Door-Lock Communication",id:"door-lock-communication",level:3},{value:"Ways to fix it",id:"ways-to-fix-it",level:2},{value:"Force door opening",id:"force-door-opening",level:3},{value:"Skip to Land state",id:"skip-to-land-state",level:3},{value:"Force Fall duration",id:"force-fall-duration",level:3},{value:"Keep lock on player&#39;s side",id:"keep-lock-on-players-side",level:3},{value:"Other Thoughts",id:"other-thoughts",level:2},{value:"Naming",id:"naming",level:3},{value:"Videos",id:"videos",level:3},{value:"Speed Angle",id:"speed-angle",level:4},{value:"Lock works from any height on the door",id:"lock-works-from-any-height-on-the-door",level:4}],O={toc:L};function A(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},O,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"snowpeak-ruins-lock-softlock"},"Snowpeak Ruins Lock Softlock"),(0,i.kt)("p",null,"Only one of the four small key doors in Snowpeak Ruins can be unlocked from either side without\nissue.\nUnlocking any of the others from the side opposite the lock will cause the player to stand in front of the door forever."),(0,i.kt)(h,{src:u,mdxType:"DocVideo"}),(0,i.kt)("h2",{id:"why-does-this-happen"},"Why does this happen?"),(0,i.kt)("p",null,"In short, the lock falls through the floor instead of bouncing. This means it gets stuck partway through its unlock sequence, so it never communicates that the player can proceed through the door."),(0,i.kt)("h3",{id:"lock-actions"},"Lock Actions"),(0,i.kt)("p",null,"When the lock is in the camera's ",(0,i.kt)(l.Z,{to:"https://wikipedia.org/wiki/Viewing_frustum",mdxType:"Link"},"view frustum"),", it executes one Action per frame (in most cases)."),(0,i.kt)("p",null,"The lock's possible Actions are: Wait, Open, Fall, Land, and Shake."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"When the lock is created, it is put in Wait during which it sits there and does nothing."),(0,i.kt)("li",{parentName:"ul"},"If the player tries to unlock it without a key, it enters Shake before returning to Wait."),(0,i.kt)("li",{parentName:"ul"},"If the player unlocks it, its Action changes to Open, then Fall, then ends on Land.")),(0,i.kt)(h,{src:d,mdxType:"DocVideo"}),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"For the above video, plain text indicates the active Action at the start of the frame.\nItalic text indicates change during the execution of that frame.\nThe image behind the text is what is drawn as a result of that frame (ignoring the frame delay between calculation and seeing the result on the screen). Video shows 3 frames per second.")),(0,i.kt)("h3",{id:"lock-phases"},"Lock Phases"),(0,i.kt)("p",null,"Within each Action, the lock progresses through phases.",(0,i.kt)("br",null),"\nHere is a list of each Action and its phases:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Wait",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Lock sits in place. Changes to either Shake or Open."),(0,i.kt)("li",{parentName:"ul"},"Phases:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"1 - Lock sits in place. Changes to Shake if ",(0,i.kt)("inlineCode",{parentName:"li"},"status")," is set to 1, or\nchanges to Open if set to 2."))))),(0,i.kt)("li",{parentName:"ul"},"Open",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Lock is unlocking. Changes to Fall."),(0,i.kt)("li",{parentName:"ul"},"Phases:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"1 - Plays unlock animation. Changes to Fall once animation finishes."))))),(0,i.kt)("li",{parentName:"ul"},"Fall",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Lock falls straight down, hits ground, and bounces up and away from door.\nChanges to Land."),(0,i.kt)("li",{parentName:"ul"},"Phases:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"1 - Drops straight to ground. Ground collision starts phase 2."),(0,i.kt)("li",{parentName:"ul"},"2 - Bounces away from door. Ground collision changes to Land."))))),(0,i.kt)("li",{parentName:"ul"},"Land",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Lock tilts over to rest on the ground. The player proceeds through the door\nafter this finishes."),(0,i.kt)("li",{parentName:"ul"},"Phases:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"1 - Lock tilts toward ground. Phase ends once xRotation is greater than or\nequal to 0x4000 (flat with ground)."),(0,i.kt)("li",{parentName:"ul"},"-1 - Changes to this phase when phase 1 finishes. This is also when\n",(0,i.kt)("inlineCode",{parentName:"li"},"status")," is changed to 3 to communicate that the door can be opened."))))),(0,i.kt)("li",{parentName:"ul"},"Shake",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Lock shakes because the player tried to open the door without a key. Changes back\nto Wait."),(0,i.kt)("li",{parentName:"ul"},"Phases:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"1 - Wait as the player grabs the door knob. Runs for 30 frames."),(0,i.kt)("li",{parentName:"ul"},"2 - Lock bounces off door twice.")))))),(0,i.kt)("h4",{id:"phases-0-and--1"},"Phases 0 and -1"),(0,i.kt)("p",null,"Each Action also has a phase 0 for initialization and -1 for cleanup."),(0,i.kt)("p",null,"When swapping to a new Action, the current Action (if it exists) is run in phase -1, then the new Action is run in phase 0. When an Action runs in phase 0, it is responsible for updating the phase to a nonzero value."),(0,i.kt)("p",null,"For example, three Actions could execute during a single frame as follows:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Wait runs in phase 1. It determines ",(0,i.kt)("inlineCode",{parentName:"li"},"status")," is now 2, so it calls ",(0,i.kt)("inlineCode",{parentName:"li"},"setAction")," to Open."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"setAction")," runs Wait in phase -1."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"setAction")," runs Open in phase 0. Open in phase 0 changes the phase to 1 for the next frame.")),(0,i.kt)("p",null,"However, most frames only see a single Action execute."),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"All of the lock Actions do things in phase 0, but none of them do anything during phase -1.")),(0,i.kt)("h3",{id:"door-lock-communication"},"Door-Lock Communication"),(0,i.kt)("p",null,"The lock has a ",(0,i.kt)("inlineCode",{parentName:"p"},"status")," property which is used to communicate with the door."),(0,i.kt)("p",null,"Valid lock ",(0,i.kt)("inlineCode",{parentName:"p"},"status")," values are as follows:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"0 or ",(0,i.kt)("inlineCode",{parentName:"li"},"LOCKED"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Initializes to this value."))),(0,i.kt)("li",{parentName:"ul"},"1 or ",(0,i.kt)("inlineCode",{parentName:"li"},"UNLOCK_FAIL"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"The door instance sets ",(0,i.kt)("inlineCode",{parentName:"li"},"status")," to this when the player tries to unlock the door but has no key. Lock will change to Shake Action."))),(0,i.kt)("li",{parentName:"ul"},"2 or ",(0,i.kt)("inlineCode",{parentName:"li"},"UNLOCK_PASS"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"The door instance sets ",(0,i.kt)("inlineCode",{parentName:"li"},"status")," to this when the player tries to unlock the door and has a key. Lock will change to Open Action."))),(0,i.kt)("li",{parentName:"ul"},"3 or ",(0,i.kt)("inlineCode",{parentName:"li"},"UNLOCKED"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Lock sets ",(0,i.kt)("inlineCode",{parentName:"li"},"status")," to this value when the Land Action finishes.")))),(0,i.kt)("p",null,"The door instance sets ",(0,i.kt)("inlineCode",{parentName:"p"},"status")," to 2 when unlocking the door, then it checks each frame if ",(0,i.kt)("inlineCode",{parentName:"p"},"status")," has been changed to 3.\nWhen the check passes, the player is told to proceed through the door."),(0,i.kt)("p",null,"In the case of the softlock, the Land Action never finishes since the lock gets stuck in the Fall Action, so ",(0,i.kt)("inlineCode",{parentName:"p"},"status")," is never changed from 2 to 3."),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"The doors which watch the locks are instances of ",(0,i.kt)("inlineCode",{parentName:"p"},"d_a_door_shutter"),".\nThe locks are instances of ",(0,i.kt)("inlineCode",{parentName:"p"},"d_a_obj_Lv5Key"),".")),(0,i.kt)("h2",{id:"ways-to-fix-it"},"Ways to fix it"),(0,i.kt)("p",null,"Here are some ways to fix the softlock:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Set ",(0,i.kt)("inlineCode",{parentName:"li"},"status")," to 3 ourselves."),(0,i.kt)("li",{parentName:"ul"},"Tell the lock that the Land Action comes after Open (skips the problematic Fall Action)."),(0,i.kt)("li",{parentName:"ul"},"Force the lock to proceed through the Fall Action at the correct frame counts regardless of when it thinks it should change."),(0,i.kt)("li",{parentName:"ul"},"Ensure ground collision always occurs during the Fall Action.")),(0,i.kt)("h3",{id:"force-door-opening"},"Force door opening"),(0,i.kt)("p",null,"We can set ",(0,i.kt)("inlineCode",{parentName:"p"},"status")," to 3 as soon as the lock initializes its Open Action.\nWe don't really care what happens to it after this point as long as we make it through the door."),(0,i.kt)(h,{src:k,mdxType:"DocVideo"}),(0,i.kt)("p",null,"Disadvantages:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Door opens faster than it normally would."),(0,i.kt)("li",{parentName:"ul"},"Result is visually confusing.")),(0,i.kt)("h3",{id:"skip-to-land-state"},"Skip to Land state"),(0,i.kt)("p",null,"In order to change to the Fall Action after completing Open, the lock reads from an address which contains a pointer to the Fall function.\nWe can modify this address to instead point to Land which causes Open to skip Fall and go straight to Land."),(0,i.kt)(h,{src:m,mdxType:"DocVideo"}),(0,i.kt)("p",null,"Advantages:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Implementation is extremely simple.")),(0,i.kt)("p",null,"Disadvantages:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Door opens faster than it normally would."),(0,i.kt)("li",{parentName:"ul"},"Result is visually confusing.")),(0,i.kt)("h3",{id:"force-fall-duration"},"Force Fall duration"),(0,i.kt)("p",null,"The following are true for every instance of the lock when it behaves as intended:",(0,i.kt)("br",null)),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The first phase of Fall runs for exactly 3 frames."),(0,i.kt)("li",{parentName:"ul"},"The second phase of Fall runs for exactly 6 frames.")),(0,i.kt)("p",null,"The ground collision which normally triggers the phase and Action changes is unreliable (this is the cause of the softlock).\nSince we already know when the changes need to occur, we can ignore the ground checks and instead force the lock to progress at the right times."),(0,i.kt)(h,{src:f,mdxType:"DocVideo"}),(0,i.kt)("p",null,"Advantages:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Lock works exactly how you would expect as a player.")),(0,i.kt)("p",null,"Disadvantages:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Implementation is complex.")),(0,i.kt)("p",null,"This is an acceptable solution, but the next one is a little better."),(0,i.kt)("h3",{id:"keep-lock-on-players-side"},"Keep lock on player's side"),(0,i.kt)("p",null,"We can update the lock's Wait function keep the lock on the same side as the player.\nThe lock will always collide with the ground in this case, so the softlock is avoided."),(0,i.kt)(h,{src:g,mdxType:"DocVideo"}),(0,i.kt)("p",null,"Advantages:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Lock works exactly how you would expect as a player."),(0,i.kt)("li",{parentName:"ul"},"Implementation is simple."),(0,i.kt)("li",{parentName:"ul"},"Player can easily see whether a door is locked or unlocked.")),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"You might be thinking you can manipulate the camera to cause the lock to change to Open before Wait has a chance to put it on the correct side of the door.\nRemember that Wait is what says when to swap to Open, so such manipulation is not possible.")),(0,i.kt)("h2",{id:"other-thoughts"},"Other Thoughts"),(0,i.kt)("h3",{id:"naming"},"Naming"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},'"Action", "Wait", "Open", "Fall", "Land", and "Shake" are all actual function names.'),(0,i.kt)("li",{parentName:"ul"},'The terms "phase", "status", and the names for each status are made-up.')),(0,i.kt)("h3",{id:"videos"},"Videos"),(0,i.kt)("h4",{id:"speed-angle"},"Speed Angle"),(0,i.kt)("p",null,"If you change the lock's position to be on the same side of the door as the player but forget to change its speed angle, you can see the Fall Action make it to phase 2 but still fail to reach the Land Action."),(0,i.kt)(h,{src:y,mdxType:"DocVideo"}),(0,i.kt)("h4",{id:"lock-works-from-any-height-on-the-door"},"Lock works from any height on the door"),(0,i.kt)("p",null,"The lock's Fall Action may have been written to use ground collision so that the height at which the lock is placed on the door could be adjusted without having to change any code or animations."),(0,i.kt)(h,{src:w,mdxType:"DocVideo"}))}A.isMDXComponent=!0}}]);