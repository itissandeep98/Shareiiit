(this.webpackJsonpshareiiitd=this.webpackJsonpshareiiitd||[]).push([[23],{338:function(e,t,a){"use strict";a.d(t,"a",(function(){return h}));var o=a(1),c=a(0),n=a(8),l=(a(3),a(7)),r=a(323),i=a(25),d=a(58),b=a(45),s=a(298),u=a(324);function j(e){return Object(s.a)("MuiSvgIcon",e)}Object(u.a)("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);var p=a(2),O=["children","className","color","component","fontSize","htmlColor","titleAccess","viewBox"],m=Object(b.a)("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,"inherit"!==a.color&&t["color".concat(Object(i.a)(a.color))],t["fontSize".concat(Object(i.a)(a.fontSize))]]}})((function(e){var t,a,o=e.theme,c=e.ownerState;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:"currentColor",flexShrink:0,transition:o.transitions.create("fill",{duration:o.transitions.duration.shorter}),fontSize:{inherit:"inherit",small:o.typography.pxToRem(20),medium:o.typography.pxToRem(24),large:o.typography.pxToRem(35)}[c.fontSize],color:null!=(t=null==(a=o.palette[c.color])?void 0:a.main)?t:{action:o.palette.action.active,disabled:o.palette.action.disabled,inherit:void 0}[c.color]}})),v=c.forwardRef((function(e,t){var a=Object(d.a)({props:e,name:"MuiSvgIcon"}),c=a.children,b=a.className,s=a.color,u=void 0===s?"inherit":s,v=a.component,f=void 0===v?"svg":v,h=a.fontSize,g=void 0===h?"medium":h,y=a.htmlColor,S=a.titleAccess,C=a.viewBox,k=void 0===C?"0 0 24 24":C,x=Object(n.a)(a,O),I=Object(o.a)({},a,{color:u,component:f,fontSize:g,viewBox:k}),w=function(e){var t=e.color,a=e.fontSize,o=e.classes,c={root:["root","inherit"!==t&&"color".concat(Object(i.a)(t)),"fontSize".concat(Object(i.a)(a))]};return Object(r.a)(c,j,o)}(I);return Object(p.jsxs)(m,Object(o.a)({as:f,className:Object(l.a)(w.root,b),ownerState:I,focusable:"false",viewBox:k,color:y,"aria-hidden":!S||void 0,role:S?"img":void 0,ref:t},x,{children:[c,S?Object(p.jsx)("title",{children:S}):null]}))}));v.muiName="SvgIcon";var f=v;function h(e,t){var a=function(a,c){return Object(p.jsx)(f,Object(o.a)({"data-testid":"".concat(t,"Icon"),ref:c},a,{children:e}))};return a.muiName=f.muiName,c.memo(c.forwardRef(a))}},369:function(e,t,a){"use strict";var o=a(14),c=a(8),n=a(1),l=a(0),r=(a(3),a(7)),i=a(323),d=a(326),b=a(338),s=a(2),u=Object(b.a)(Object(s.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel"),j=a(148),p=a(25),O=a(334),m=a(58),v=a(45),f=a(298),h=a(324);function g(e){return Object(f.a)("MuiChip",e)}var y=Object(h.a)("MuiChip",["root","sizeSmall","sizeMedium","colorPrimary","colorSecondary","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","focusVisible"]),S=["avatar","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant"],C=Object(v.a)("div",{name:"MuiChip",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState,c=a.color,n=a.clickable,l=a.onDelete,r=a.size,i=a.variant;return[Object(o.a)({},"& .".concat(y.avatar),t.avatar),Object(o.a)({},"& .".concat(y.avatar),t["avatar".concat(Object(p.a)(r))]),Object(o.a)({},"& .".concat(y.avatar),t["avatarColor".concat(Object(p.a)(c))]),Object(o.a)({},"& .".concat(y.icon),t.icon),Object(o.a)({},"& .".concat(y.icon),t["icon".concat(Object(p.a)(r))]),Object(o.a)({},"& .".concat(y.icon),t["iconColor".concat(Object(p.a)(c))]),Object(o.a)({},"& .".concat(y.deleteIcon),t.deleteIcon),Object(o.a)({},"& .".concat(y.deleteIcon),t["deleteIcon".concat(Object(p.a)(r))]),Object(o.a)({},"& .".concat(y.deleteIcon),t["deleteIconColor".concat(Object(p.a)(c))]),Object(o.a)({},"& .".concat(y.deleteIcon),t["deleteIconOutlinedColor".concat(Object(p.a)(c))]),t.root,t["size".concat(Object(p.a)(r))],t["color".concat(Object(p.a)(c))],n&&t.clickable,n&&"default"!==c&&t["clickableColor".concat(Object(p.a)(c),")")],l&&t.deletable,l&&"default"!==c&&t["deletableColor".concat(Object(p.a)(c))],t[i],"outlined"===i&&t["outlined".concat(Object(p.a)(c))]]}})((function(e){var t,a=e.theme,c=e.ownerState,l=Object(d.a)(a.palette.text.primary,.26);return Object(n.a)((t={fontFamily:a.typography.fontFamily,fontSize:a.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:a.palette.text.primary,backgroundColor:a.palette.action.selected,borderRadius:16,whiteSpace:"nowrap",transition:a.transitions.create(["background-color","box-shadow"]),cursor:"default",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box"},Object(o.a)(t,"&.".concat(y.disabled),{opacity:a.palette.action.disabledOpacity,pointerEvents:"none"}),Object(o.a)(t,"& .".concat(y.avatar),{marginLeft:5,marginRight:-6,width:24,height:24,color:"light"===a.palette.mode?a.palette.grey[700]:a.palette.grey[300],fontSize:a.typography.pxToRem(12)}),Object(o.a)(t,"& .".concat(y.avatarColorPrimary),{color:a.palette.primary.contrastText,backgroundColor:a.palette.primary.dark}),Object(o.a)(t,"& .".concat(y.avatarColorSecondary),{color:a.palette.secondary.contrastText,backgroundColor:a.palette.secondary.dark}),Object(o.a)(t,"& .".concat(y.avatarSmall),{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:a.typography.pxToRem(10)}),Object(o.a)(t,"& .".concat(y.icon),Object(n.a)({color:"light"===a.palette.mode?a.palette.grey[700]:a.palette.grey[300],marginLeft:5,marginRight:-6},"small"===c.size&&{fontSize:18,marginLeft:4,marginRight:-4},"default"!==c.color&&{color:"inherit"})),Object(o.a)(t,"& .".concat(y.deleteIcon),Object(n.a)({WebkitTapHighlightColor:"transparent",color:l,fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:Object(d.a)(l,.4)}},"small"===c.size&&{fontSize:16,marginRight:4,marginLeft:-4},"default"!==c.color&&{color:Object(d.a)(a.palette[c.color].contrastText,.7),"&:hover, &:active":{color:a.palette[c.color].contrastText}})),t),"small"===c.size&&{height:24},"default"!==c.color&&{backgroundColor:a.palette[c.color].main,color:a.palette[c.color].contrastText},c.onDelete&&Object(o.a)({},"&.".concat(y.focusVisible),{backgroundColor:Object(d.a)(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)}),c.onDelete&&"default"!==c.color&&Object(o.a)({},"&.".concat(y.focusVisible),{backgroundColor:a.palette[c.color].dark}))}),(function(e){var t,a=e.theme,c=e.ownerState;return Object(n.a)({},c.clickable&&(t={userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:Object(d.a)(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity)}},Object(o.a)(t,"&.".concat(y.focusVisible),{backgroundColor:Object(d.a)(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)}),Object(o.a)(t,"&:active",{boxShadow:a.shadows[1]}),t),c.clickable&&"default"!==c.color&&Object(o.a)({},"&:hover, &.".concat(y.focusVisible),{backgroundColor:a.palette[c.color].dark}))}),(function(e){var t,a,c=e.theme,l=e.ownerState;return Object(n.a)({},"outlined"===l.variant&&(t={backgroundColor:"transparent",border:"1px solid ".concat("light"===c.palette.mode?c.palette.grey[400]:c.palette.grey[700])},Object(o.a)(t,"&.".concat(y.clickable,":hover"),{backgroundColor:c.palette.action.hover}),Object(o.a)(t,"&.".concat(y.focusVisible),{backgroundColor:c.palette.action.focus}),Object(o.a)(t,"& .".concat(y.avatar),{marginLeft:4}),Object(o.a)(t,"& .".concat(y.avatarSmall),{marginLeft:2}),Object(o.a)(t,"& .".concat(y.icon),{marginLeft:4}),Object(o.a)(t,"& .".concat(y.iconSmall),{marginLeft:2}),Object(o.a)(t,"& .".concat(y.deleteIcon),{marginRight:5}),Object(o.a)(t,"& .".concat(y.deleteIconSmall),{marginRight:3}),t),"outlined"===l.variant&&"default"!==l.color&&(a={color:c.palette[l.color].main,border:"1px solid ".concat(Object(d.a)(c.palette[l.color].main,.7))},Object(o.a)(a,"&.".concat(y.clickable,":hover"),{backgroundColor:Object(d.a)(c.palette[l.color].main,c.palette.action.hoverOpacity)}),Object(o.a)(a,"&.".concat(y.focusVisible),{backgroundColor:Object(d.a)(c.palette[l.color].main,c.palette.action.focusOpacity)}),Object(o.a)(a,"& .".concat(y.deleteIcon),{color:Object(d.a)(c.palette[l.color].main,.7),"&:hover, &:active":{color:c.palette[l.color].main}}),a))})),k=Object(v.a)("span",{name:"MuiChip",slot:"Label",overridesResolver:function(e,t){var a=e.ownerState.size;return[t.label,t["label".concat(Object(p.a)(a))]]}})((function(e){var t=e.ownerState;return Object(n.a)({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},"small"===t.size&&{paddingLeft:8,paddingRight:8})}));function x(e){return"Backspace"===e.key||"Delete"===e.key}var I=l.forwardRef((function(e,t){var a=Object(m.a)({props:e,name:"MuiChip"}),o=a.avatar,d=a.className,b=a.clickable,v=a.color,f=void 0===v?"default":v,h=a.component,y=a.deleteIcon,I=a.disabled,w=void 0!==I&&I,z=a.icon,R=a.label,N=a.onClick,M=a.onDelete,L=a.onKeyDown,T=a.onKeyUp,D=a.size,V=void 0===D?"medium":D,P=a.variant,E=void 0===P?"filled":P,K=Object(c.a)(a,S),B=l.useRef(null),A=Object(j.a)(B,t),F=function(e){e.stopPropagation(),M&&M(e)},U=!(!1===b||!N)||b,_="small"===V,H=U||M?O.a:h||"div",J=Object(n.a)({},a,{component:H,disabled:w,size:V,color:f,onDelete:!!M,clickable:U,variant:E}),W=function(e){var t=e.classes,a=e.disabled,o=e.size,c=e.color,n=e.onDelete,l=e.clickable,r=e.variant,d={root:["root",r,a&&"disabled","size".concat(Object(p.a)(o)),"color".concat(Object(p.a)(c)),l&&"clickable",l&&"clickableColor".concat(Object(p.a)(c)),n&&"deletable",n&&"deletableColor".concat(Object(p.a)(c)),"".concat(r).concat(Object(p.a)(c))],label:["label","label".concat(Object(p.a)(o))],avatar:["avatar","avatar".concat(Object(p.a)(o)),"avatarColor".concat(Object(p.a)(c))],icon:["icon","icon".concat(Object(p.a)(o)),"iconColor".concat(Object(p.a)(c))],deleteIcon:["deleteIcon","deleteIcon".concat(Object(p.a)(o)),"deleteIconColor".concat(Object(p.a)(c)),"deleteIconOutlinedColor".concat(Object(p.a)(c))]};return Object(i.a)(d,g,t)}(J),Y=H===O.a?Object(n.a)({component:h||"div",focusVisibleClassName:W.focusVisible},M&&{disableRipple:!0}):{},q=null;if(M){var G=Object(r.a)("default"!==f&&("outlined"===E?W["deleteIconOutlinedColor".concat(Object(p.a)(f))]:W["deleteIconColor".concat(Object(p.a)(f))]),_&&W.deleteIconSmall);q=y&&l.isValidElement(y)?l.cloneElement(y,{className:Object(r.a)(y.props.className,W.deleteIcon,G),onClick:F}):Object(s.jsx)(u,{className:Object(r.a)(W.deleteIcon,G),onClick:F})}var Q=null;o&&l.isValidElement(o)&&(Q=l.cloneElement(o,{className:Object(r.a)(W.avatar,o.props.className)}));var X=null;return z&&l.isValidElement(z)&&(X=l.cloneElement(z,{className:Object(r.a)(W.icon,z.props.className)})),Object(s.jsxs)(C,Object(n.a)({as:H,className:Object(r.a)(W.root,d),disabled:!(!U||!w)||void 0,onClick:N,onKeyDown:function(e){e.currentTarget===e.target&&x(e)&&e.preventDefault(),L&&L(e)},onKeyUp:function(e){e.currentTarget===e.target&&(M&&x(e)?M(e):"Escape"===e.key&&B.current&&B.current.blur()),T&&T(e)},ref:A,ownerState:J},Y,K,{children:[Q||X,Object(s.jsx)(k,{className:Object(r.a)(W.label),ownerState:J,children:R}),q]}))}));t.a=I},487:function(e,t,a){"use strict";a.r(t);var o=a(40),c=a(369),n=a(0),l=a(41),r=a(30),i=a(320),d=a(321),b=a(322),s=a(150),u=a(2);t.default=function(){var e=Object(l.c)(),t=Object(n.useState)(null),a=Object(o.a)(t,2),j=a[0],p=a[1];return Object(n.useEffect)((function(){e(Object(s.b)()).then((function(e){p(e)}))}),[]),Object(u.jsx)(i.a,{children:Object(u.jsx)(d.a,{children:Object(u.jsxs)(b.a,{className:"shadow mt-3 p-3 rounded_lg",children:[Object(u.jsx)("h3",{children:"Following List"}),j?Object(u.jsx)("div",{className:"text-break",children:null===j||void 0===j?void 0:j.map((function(e){var t,a;return Object(u.jsx)(c.a,{label:Object(u.jsxs)(r.c,{to:"/".concat(e.user.username),children:[null===(t=e.user)||void 0===t?void 0:t.first_name," ",null===(a=e.user)||void 0===a?void 0:a.last_name]}),size:"medium"},Math.random())}))}):Object(u.jsx)("p",{children:"You don't follow anyone yet"})]})})})}}}]);
//# sourceMappingURL=23.9477bca8.chunk.js.map