(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6142],{3905:(e,t,a)=>{"use strict";a.d(t,{Zo:()=>p,kt:()=>y});var n=a(7294);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,s=function(e,t){if(null==e)return{};var a,n,s={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}var i=n.createContext({}),m=function(e){var t=n.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},p=function(e){var t=m(e.components);return n.createElement(i.Provider,{value:t},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,s=e.mdxType,o=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=m(a),u=s,y=c["".concat(i,".").concat(u)]||c[u]||g[u]||o;return a?n.createElement(y,r(r({ref:t},p),{},{components:a})):n.createElement(y,r({ref:t},p))}));function y(e,t){var a=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=a.length,r=new Array(o);r[0]=u;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[c]="string"==typeof e?e:s,r[1]=l;for(var m=2;m<o;m++)r[m]=a[m];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},877:(e,t,a)=>{"use strict";a.r(t),a.d(t,{assets:()=>A,contentTitle:()=>L,default:()=>q,frontMatter:()=>F,metadata:()=>j,toc:()=>M});var n=a(7462),s=a(7294),o=a(3905),r=a(9960),l=a(6010),i=a(8975);const m="u8",p="u8Array",c="u16",g="u16Array",u="u32",y="u32Array",d="float",h="charArray",f="row_FyNU",b="naming_v8g1",k="investigation_kyFX",v="notLookedInto_be7Y",S="blankRow_JHuz",w={[h]:"char",[p]:"u8",[g]:"u16",[y]:"u32"};function x(e){const t=[];let a=0;return e.forEach(((e,n)=>{let{offset:o,type:m,name:p,length:c,shortDesc:g,tags:u,link:y}=e;if("class"===m)return n>0&&(t.push(s.createElement("tr",{key:`b${a}`,className:S},s.createElement("td",{colSpan:"9999"}))),a++),void t.push(s.createElement("tr",{key:p},s.createElement("td",{colSpan:"9999"},p)));let d=m;var h,x;w[m]&&(h=w[m],d=(x=c)>=10?`${h}[${(0,i.sprintf)("0x%x",x)}]`:`${h}[${x}]`),t.push(s.createElement("tr",{key:o,className:(0,l.Z)(f,{[k]:u&&u.includes("investigation"),[b]:u&&u.includes("naming"),[v]:u&&u.includes("notLookedInto")})},s.createElement("td",null,(0,i.sprintf)("0x%03x",o)),s.createElement("td",null,d),s.createElement("td",null,y?s.createElement(r.Z,{to:y},p):p),s.createElement("td",null,g)))})),t}const D=function(e){let{data:t}=e;return s.createElement("table",null,s.createElement("tbody",null,s.createElement("tr",null,s.createElement("th",{scope:"col"},"Offset"),s.createElement("th",{scope:"col"},"Type"),s.createElement("th",{scope:"col"},"Name"),s.createElement("th",{scope:"col"},"Description")),x(t)))},N="naming",E="investigation",C="notLookedInto",P={0:{type:c,name:"maxLife",shortDesc:"floor(val / 5) => maxHearts; val % 5 => X of 5 heart pieces",tags:[E]},2:{type:c,name:"life",shortDesc:"val / 4 => currentHearts (Ex: 4.25 hearts)"},4:{type:c,name:"rupees"},6:{type:c,name:"maxOil",shortDesc:"Max lantern oil. Always 0x5460 (confirm)",tags:[E]},8:{type:c,name:"oil",shortDesc:"Current lantern oil level"},10:{type:m,name:"???",shortDesc:"TODO: determine if padding",tags:[N,E]},11:{type:m,name:"itemSlot1",shortDesc:"X button on GameCube. itemSlot index, or 0xff for empty",tags:[N,E]},12:{type:m,name:"itemSlot2",shortDesc:"Y button on GameCube.",tags:[N,E]},13:{type:m,name:"itemSlot3",shortDesc:"Gets set to last smelled scent's itemId.",tags:[N,E]},14:{type:m,name:"itemSlot4",shortDesc:"Not used on GameCube.",tags:[N,E]},15:{type:m,name:"comboItemSlot1",shortDesc:"",tags:[N,E]},16:{type:m,name:"comboItemSlot2",shortDesc:"",tags:[N,E]},17:{type:m,name:"comboItemSlot3",shortDesc:"Not used on GameCube.",tags:[N,E]},18:{type:m,name:"comboItemSlot4",shortDesc:"Not used on GameCube.",tags:[N,E]},19:{type:m,name:"equipClothes",tags:[N]},20:{type:m,name:"equipSword",tags:[N]},21:{type:m,name:"equipIndex2",tags:[C]},22:{type:m,name:"equipIndex3",tags:[C]},23:{type:m,name:"equipIndex4",tags:[C]},24:{type:m,name:"equipIndex5",tags:[C]},25:{type:m,name:"wallet",shortDesc:"Display valid values here.",tags:[E]},26:{type:m,name:"maxMagic",tags:[C]},27:{type:m,name:"magic",tags:[C]},28:{type:m,name:"mMagicFlag",shortDesc:"Not looked into. Indicates have/not have, or maybe levels?",tags:[C]},29:{type:m,name:"unk_1d",tags:[C]},30:{type:m,name:"mTransformStatus",tags:[C]},31:{type:p,length:3,name:"unk_1f",tags:[C]},34:{type:p,length:6,name:"padding???",tags:[C]},40:{type:"s64",name:"timestamp",shortDesc:"OSTicks since 2000/01/01 00:00. Increases by 40,500,000 per second.",link:"/docs/save-file/quest-log/player/player-status-b#offset-0x028"},48:{type:m,name:"mTransformLevelFlag",tags:[C]},49:{type:m,name:"mDarkClearLevelFlag",tags:[C]},50:{type:m,name:"unk32",tags:[C]},51:{type:m,name:"unk33",tags:[C]},52:{type:d,name:"dayTime",shortDesc:'Might use "time" instead. dayTime came from a function I think.',tags:[N]},56:{type:c,name:"day",shortDesc:"day and not dayOfWeek? dayOfWeek is derived from day? Prefer day over date since it is a day count and not a date",tags:[N,E]},58:{type:p,length:6,name:"padding???",tags:[C]},64:{type:d,name:"horsePosX"},68:{type:d,name:"horsePosY"},72:{type:d,name:"horsePosZ"},76:{type:c,name:"horseAngleY",shortDesc:"Use s16 for angles?",tags:[E]},78:{type:h,length:8,name:"horseStageName"},86:{type:m,name:"horseEntranceId",shortDesc:"Naming for entrance id?",tags:[C]},87:{type:m,name:"horseRoomNo"},88:{type:h,length:8,name:"playerReturnPlaceStageName",tags:[N]},96:{type:m,name:"playerReturnPlaceEntranceNo",tags:[N]},97:{type:m,name:"playerReturnPlaceRoomNo"},98:{type:m,name:"unk62",tags:[C]},99:{type:m,name:"unk63",tags:[C]},100:{type:d,name:"lastFieldPlayerPosX"},104:{type:d,name:"lastFieldPlayerPosY"},108:{type:d,name:"lastFieldPlayerPosZ"},112:{type:c,name:"lastFieldPlayerAngleY"},114:{type:h,length:8,name:"lastFieldStageName"},122:{type:m,name:"lastFieldRoomNo"},123:{type:m,name:"lastFieldProvinceNo",tags:[N]},124:{type:m,name:"???",shortDesc:"Controls if update lastField info when changing stage. Also controls if FMap syncs with current pos or lastField pos.",tags:[E]},125:{type:m,name:"mRegion",shortDesc:"decomp seems wrong around here",tags:[C]},126:{type:m,name:"unk7e",tags:[C]},127:{type:m,name:"unk7f",tags:[C]},128:{type:d,name:"ooccooJrDestPlayerPosX",tags:[N]},132:{type:d,name:"ooccooJrDestPlayerPosY",tags:[N]},136:{type:d,name:"ooccooJrDestPlayerPosZ",tags:[N]},140:{type:c,name:"ooccooJrDestPlayerAngleY",tags:[N]},142:{type:h,length:8,name:"ooccooJrDestStageName",tags:[N]},150:{type:m,name:"ooccooJrDestEntranceNo",tags:[C]},151:{type:m,name:"ooccooJrDestRoomNo",tags:[C]},152:{type:m,name:"mWarpAcceptStage",shortDesc:"Type said to be `char`",tags:[C]},153:{type:p,length:3,name:"padding???",tags:[C]},156:{type:m,name:"itemSlotGaleBoomerang",tags:[N]},157:{type:m,name:"itemSlotLantern",tags:[N]},158:{type:m,name:"itemSlotSpinner",tags:[N]},159:{type:m,name:"itemSlotIronBoots",tags:[N]},160:{type:m,name:"itemSlotHerosBow",tags:[N]},161:{type:m,name:"itemSlotHawkeye",tags:[N]},162:{type:m,name:"itemSlotBallAndChain",tags:[N]},163:{type:m,name:"itemSlotUnused",shortDesc:"Pick a name",tags:[N,E]},164:{type:m,name:"itemSlotDominionRod",tags:[N]},165:{type:m,name:"itemSlotClawshot",tags:[N]},166:{type:m,name:"itemSlotDoubleClawshots",tags:[N]},167:{type:m,name:"itemSlotBottle1",tags:[N]},168:{type:m,name:"itemSlotBottle2",tags:[N]},169:{type:m,name:"itemSlotBottle3",tags:[N]},170:{type:m,name:"itemSlotBottle4",tags:[N]},171:{type:m,name:"itemSlotBombBag1",tags:[N]},172:{type:m,name:"itemSlotBombBag2",tags:[N]},173:{type:m,name:"itemSlotBombBag3",tags:[N]},174:{type:m,name:"itemSlotOoccoo",tags:[N]},175:{type:m,name:"itemSlotMemoSketch",tags:[N]},176:{type:m,name:"itemSlotFishingRod",tags:[N]},177:{type:m,name:"itemSlotTradeItem",tags:[N]},178:{type:m,name:"itemSlotAncientSkyBook",tags:[N]},179:{type:m,name:"itemSlotSlingshot",tags:[N]},180:{type:p,length:24,name:"itemWheelArray",tags:[N,E]},204:{type:y,length:8,name:"gotItemBits",shortDesc:"What on Contents page? Don't name this and only name inner bits?",tags:[N,E]},236:{type:m,name:"numArrows",tags:[N]},237:{type:m,name:"numBombsBag1",tags:[N]},238:{type:m,name:"numBombsBag2",tags:[N]},239:{type:m,name:"numBombsBag3",tags:[N]},240:{type:m,name:"numLarvaBottle1",shortDesc:"Generic name with larva in desc here?",tags:[N]},241:{type:m,name:"numLarvaBottle2",tags:[N]},242:{type:m,name:"numLarvaBottle3",tags:[N]},243:{type:m,name:"numLarvaBottle4",tags:[N]},244:{type:m,name:"numPumpkinSeeds",shortDesc:"Slingshot ammo; naming?",tags:[N]},245:{type:p,length:3,name:"padding???",tags:[C]},248:{type:m,name:"maxArrows",tags:[N]},249:{type:p,length:7,name:"moreMaxes???",shortDesc:"fill this out",tags:[C]},256:{type:p,length:8,name:"mItem",tags:[C]},264:{type:m,name:"unk108",tags:[C]},265:{type:m,name:"mCrystal",tags:[C]},266:{type:m,name:"mMirror",tags:[C]},267:{type:m,name:"unk110",tags:[C]},268:{type:m,name:"numPoeSouls",tags:[E]},269:{type:p,length:3,name:"padding???",tags:[C]},272:{type:p,length:3,name:"unknown",tags:[C]},275:{type:m,name:"unk113",tags:[C]},276:{type:p,length:4,name:"mLightDropNum",tags:[C]},280:{type:m,name:"mLightDropGetFlag",tags:[C]},281:{type:p,length:3,name:"unk119",tags:[C]},284:{type:y,length:2,name:"mLetterGetBitfields",tags:[C]},292:{type:y,length:2,name:"mLetterReadBitfields",tags:[C]},300:{type:p,length:64,name:"unk12c",shortDesc:"is this padding?",tags:[C]},364:{type:g,length:16,name:"mFishCount",tags:[C]},396:{type:p,length:16,name:"mMaxSize",tags:[C]},412:{type:p,length:4,naming:"padding???",tags:[C]},416:{type:u,name:"unk1a0",tags:[C]},420:{type:u,name:"unk1a4",tags:[C]},424:{type:"u64",name:"mTotalTime",tags:[C]},432:{type:c,name:"unk1b0",tags:[C]},434:{type:c,name:"mDeathCount",tags:[C]},436:{type:h,length:16,name:"mPlayerName",tags:[C]},452:{type:m,name:"unk1c4",tags:[C]},453:{type:h,length:16,name:"mHorseName",tags:[C]},469:{type:m,name:"unk1d5",tags:[C]},470:{type:m,name:"mClearCount",tags:[C]},471:{type:p,length:5,name:"unk1d7",tags:[C]},476:{type:p,length:4,name:"padding???",tags:[C]},480:{type:m,name:"unk1e0",tags:[C]},481:{type:m,name:"mSoundMode",tags:[C]},482:{type:m,name:"mAttentionType",tags:[C]},483:{type:m,name:"mVibration",tags:[C]},484:{type:m,name:"unk1e4",tags:[C]},485:{type:m,name:"unk1e5",tags:[C]},486:{type:c,name:"mCalibrateDist",tags:[C]},488:{type:m,name:"mCalValue",tags:[C]},489:{type:m,name:"mShortCut",tags:[C]},490:{type:m,name:"mCameraControl",tags:[C]},491:{type:m,name:"mPointer",tags:[C]},492:{type:p,length:4,name:"padding???",tags:[C]},496:{type:p,length:1024,name:"regionBitsNaming",shortDesc:"Naming. Figure out how to show as well. 0x20 array of 0x20 length each (0x18 + 0x2 padding/garbage)",tags:[N,E]},1520:{type:p,length:512,name:"tSomethingElse",shortDesc:"Naming. Figure out how to show as well. 0x40 array of 0x8 length each.",tags:[N,E]},2032:{type:p,length:256,name:"tEventBits",shortDesc:"Naming. Figure out how to show as well. 0x100 bytes of bits.",tags:[N,E]},2288:{type:p,length:80,name:"tPostEventBitsGarbage",shortDesc:"padding?",tags:[N,E]},2368:{type:p,length:24,name:"tMinigameStuff",shortDesc:"Not just straight bytes I think. Look into.",tags:[N,E]}};Object.keys(P).forEach((e=>{P[e].offset=Number(e)}));const I=[{name:"playerStatusA",start:0},{name:"playerStatusB",start:40},{name:"horsePlace",start:64},{name:"playerReturnPlace",start:88},{name:"playerFieldLastStayInfo",start:100},{name:"playerLastMarkInfo",start:128},{name:"playerItem",start:156},{name:"playerGetItem",start:204},{name:"playerItemRecord",start:236},{name:"playerItemMax",start:248},{name:"playerCollect",start:256},{name:"playerWolf",start:272},{name:"lightDrop",start:276},{name:"letterInfo",start:284},{name:"fishingInfo",start:364},{name:"playerInfo",start:416},{name:"playerConfig",start:480},{name:"tRegionStuff",start:496},{name:"t5f0Stuff",start:1520},{name:"tEventBitStuff",start:2032},{name:"tPostEventBitGarbage",start:2288},{name:"tMinigameStuff",start:2368}],O=[];let _=-1,B=-1;Object.keys(P).forEach((e=>{!function(e){let t=!1;for(;e>=B;)t=!0,_+=1,B=_+1>=I.length?Number.MAX_SAFE_INTEGER:I[_+1].start;if(t){const{name:e,length:t}=I[_];O.push({type:"class",name:e,length:t})}}(e),O.push(P[e])}));const T=function(){return s.createElement(D,{data:O})},F={sidebar_label:"Contents"},L="Quest Log Contents",j={unversionedId:"save-file/quest-log/contents",id:"save-file/quest-log/contents",title:"Quest Log Contents",description:"\u26a0\ufe0f The Quest Log section is in the early research stages.",source:"@site/docs/save-file/quest-log/contents.mdx",sourceDirName:"save-file/quest-log",slug:"/save-file/quest-log/contents",permalink:"/tp-docs/docs/save-file/quest-log/contents",draft:!1,editUrl:"https://github.com/icogn/tp-docs/edit/main/website/docs/save-file/quest-log/contents.mdx",tags:[],version:"current",frontMatter:{sidebar_label:"Contents"},sidebar:"saveFile",previous:{title:"Introduction",permalink:"/tp-docs/docs/save-file/quest-log/introduction"},next:{title:"Player Status A",permalink:"/tp-docs/docs/save-file/quest-log/player/player-status-a"}},A={},M=[],R={toc:M};function q(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,n.Z)({},R,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"quest-log-contents"},"Quest Log Contents"),(0,o.kt)("p",null,"\u26a0\ufe0f The Quest Log section is in the early research stages."),(0,o.kt)("p",null,"Here are some references you can use instead:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)(r.Z,{to:"https://docs.google.com/spreadsheets/d/19lL-hkuLMl9pmbeuQZj7CtjsLqkSADxu627LYiCCnnU/edit#gid=167913551",mdxType:"Link"},"Twilight Editor (Documentation)")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)(r.Z,{to:"https://docs.google.com/spreadsheets/d/1OvlqH_OG_svcLZfuSDBjCLHFivcsBGpOD25o-_6vblA/edit#gid=1361364641",mdxType:"Link"},"Region Flags (Area Nodes)"))),(0,o.kt)("p",null,(0,o.kt)("b",{style:{fontSize:20}},"Please don't open Github issues for anything with a colored row.")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"(This is really only public since it is easier than trying to hide it.)")),(0,o.kt)("p",null,"Naming:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Everything will be assigned a unique identifier which should make sense in a vacuum."),(0,o.kt)("li",{parentName:"ul"},"Explanations about the naming will be located on details pages for each section."),(0,o.kt)("li",{parentName:"ul"},"The names are in no way meant to match the decomp variable names.")),(0,o.kt)("p",null,"Notes:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Custom within-page search at the top maybe. What was the idea behind this?"),(0,o.kt)("li",{parentName:"ul"},"Column which displays absolute address in RAM based on selected game version, and ability to use a custom address.")),(0,o.kt)("p",null,"Row colors:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Red means I haven't really looked into it."),(0,o.kt)("li",{parentName:"ul"},"Purple means it still needs work/double-checking."),(0,o.kt)("li",{parentName:"ul"},"Blue means the name is still being decided."),(0,o.kt)("li",{parentName:"ul"},"No special color means I feel like I understand it pretty well (though the name can still change).")),(0,o.kt)("p",null,"I recommend viewing this page in dark mode at the moment."),(0,o.kt)(T,{mdxType:"QuestLogTable"}))}q.isMDXComponent=!0},8975:(e,t,a)=>{var n;!function(){"use strict";var s={not_string:/[^s]/,not_bool:/[^t]/,not_type:/[^T]/,not_primitive:/[^v]/,number:/[diefg]/,numeric_arg:/[bcdiefguxX]/,json:/[j]/,not_json:/[^j]/,text:/^[^\x25]+/,modulo:/^\x25{2}/,placeholder:/^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,key:/^([a-z_][a-z_\d]*)/i,key_access:/^\.([a-z_][a-z_\d]*)/i,index_access:/^\[(\d+)\]/,sign:/^[+-]/};function o(e){return l(m(e),arguments)}function r(e,t){return o.apply(null,[e].concat(t||[]))}function l(e,t){var a,n,r,l,i,m,p,c,g,u=1,y=e.length,d="";for(n=0;n<y;n++)if("string"==typeof e[n])d+=e[n];else if("object"==typeof e[n]){if((l=e[n]).keys)for(a=t[u],r=0;r<l.keys.length;r++){if(null==a)throw new Error(o('[sprintf] Cannot access property "%s" of undefined value "%s"',l.keys[r],l.keys[r-1]));a=a[l.keys[r]]}else a=l.param_no?t[l.param_no]:t[u++];if(s.not_type.test(l.type)&&s.not_primitive.test(l.type)&&a instanceof Function&&(a=a()),s.numeric_arg.test(l.type)&&"number"!=typeof a&&isNaN(a))throw new TypeError(o("[sprintf] expecting number but found %T",a));switch(s.number.test(l.type)&&(c=a>=0),l.type){case"b":a=parseInt(a,10).toString(2);break;case"c":a=String.fromCharCode(parseInt(a,10));break;case"d":case"i":a=parseInt(a,10);break;case"j":a=JSON.stringify(a,null,l.width?parseInt(l.width):0);break;case"e":a=l.precision?parseFloat(a).toExponential(l.precision):parseFloat(a).toExponential();break;case"f":a=l.precision?parseFloat(a).toFixed(l.precision):parseFloat(a);break;case"g":a=l.precision?String(Number(a.toPrecision(l.precision))):parseFloat(a);break;case"o":a=(parseInt(a,10)>>>0).toString(8);break;case"s":a=String(a),a=l.precision?a.substring(0,l.precision):a;break;case"t":a=String(!!a),a=l.precision?a.substring(0,l.precision):a;break;case"T":a=Object.prototype.toString.call(a).slice(8,-1).toLowerCase(),a=l.precision?a.substring(0,l.precision):a;break;case"u":a=parseInt(a,10)>>>0;break;case"v":a=a.valueOf(),a=l.precision?a.substring(0,l.precision):a;break;case"x":a=(parseInt(a,10)>>>0).toString(16);break;case"X":a=(parseInt(a,10)>>>0).toString(16).toUpperCase()}s.json.test(l.type)?d+=a:(!s.number.test(l.type)||c&&!l.sign?g="":(g=c?"+":"-",a=a.toString().replace(s.sign,"")),m=l.pad_char?"0"===l.pad_char?"0":l.pad_char.charAt(1):" ",p=l.width-(g+a).length,i=l.width&&p>0?m.repeat(p):"",d+=l.align?g+a+i:"0"===m?g+i+a:i+g+a)}return d}var i=Object.create(null);function m(e){if(i[e])return i[e];for(var t,a=e,n=[],o=0;a;){if(null!==(t=s.text.exec(a)))n.push(t[0]);else if(null!==(t=s.modulo.exec(a)))n.push("%");else{if(null===(t=s.placeholder.exec(a)))throw new SyntaxError("[sprintf] unexpected placeholder");if(t[2]){o|=1;var r=[],l=t[2],m=[];if(null===(m=s.key.exec(l)))throw new SyntaxError("[sprintf] failed to parse named argument key");for(r.push(m[1]);""!==(l=l.substring(m[0].length));)if(null!==(m=s.key_access.exec(l)))r.push(m[1]);else{if(null===(m=s.index_access.exec(l)))throw new SyntaxError("[sprintf] failed to parse named argument key");r.push(m[1])}t[2]=r}else o|=2;if(3===o)throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");n.push({placeholder:t[0],param_no:t[1],keys:t[2],sign:t[3],pad_char:t[4],align:t[5],width:t[6],precision:t[7],type:t[8]})}a=a.substring(t[0].length)}return i[e]=n}t.sprintf=o,t.vsprintf=r,"undefined"!=typeof window&&(window.sprintf=o,window.vsprintf=r,void 0===(n=function(){return{sprintf:o,vsprintf:r}}.call(t,a,t,e))||(e.exports=n))}()}}]);