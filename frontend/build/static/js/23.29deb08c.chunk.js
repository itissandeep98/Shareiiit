(this.webpackJsonpshareiiitd=this.webpackJsonpshareiiitd||[]).push([[23],{345:function(e,n,t){"use strict";var r=t(510),i=t(367),a=t(2),c={position:"absolute",top:"40%",left:"50%",maxWidth:"60vh",maxHeight:"90vh",overflow:"auto",transform:"translate(-50%, -50%)",bgcolor:"background.paper",scrollbarWidth:"none",msOverflowStyle:"none"};n.a=function(e){var n=e.image,t=e.open,l=e.onClose;return Object(a.jsx)(r.a,{open:t,onClose:l,children:Object(a.jsx)(i.a,{sx:c,children:Object(a.jsx)("img",{src:n,alt:"image",className:"img-fluid"})})})}},523:function(e,n,t){"use strict";t.r(n);var r=t(37),i=t(321),a=t(322),c=t(323),l=t(38),s=t(219),o=t(151),u=t(456),d=t(454),j=t(384),b=t(449),h=t.n(b),v=t(17),m=t.n(v),p=t(39),f=t(5),O=t(40),x=t.n(O),g=t(41),k=t(84),w=function(){return{Authorization:"Token "+Object(k.a)()}},N=t(0),y=t(167),_=t(32),C=t(345),S=t(86),z=t(2);n.default=function(e){var n,t,b,v,O,k,E,H,I,J,T,A,P=e.match.params.user,W=Object(N.useState)(!1),D=Object(r.a)(W,2),F=D[0],K=D[1],M=Object(l.c)(),q=Object(N.useState)(null),B=Object(r.a)(q,2),G=B[0],L=B[1],Q=Object(N.useState)([]),R=Object(r.a)(Q,2),U=R[0],V=R[1];return Object(N.useEffect)((function(){M(function(e){return function(){var n=Object(p.a)(m.a.mark((function n(t){return m.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t({type:f.H}),n.next=3,x.a.get("".concat(g.a,"/api/users/").concat(e,"/"),{headers:w()}).then((function(e){var n=e.data;return t({type:f.J,data:n}),n})).catch((function(e){t({type:f.H,errmess:"Error in connection with Server"})}));case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()}(P)).then((function(e){L(e)})),M(function(e){return function(){var n=Object(p.a)(m.a.mark((function n(t){return m.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t({type:f.O}),n.next=3,x.a.get("".concat(g.a,"/api/posts"),{params:{category:"skill",username:e},headers:w()}).then((function(e){var n=e.data.results;return t({type:f.P,data:n}),n})).catch((function(e){t({type:f.N,errmess:"Error in connection with Server"})}));case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()}(P)).then((function(e){V(e)}))}),[M]),Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(C.a,{image:null!==(n=null===G||void 0===G||null===(t=G.profile)||void 0===t?void 0:t.image)&&void 0!==n?n:"/assets/images/user.png",open:F,onClose:function(){return K(!F)}}),Object(z.jsx)(i.a,{fluid:!0,className:"p-3 bg-light h-100",children:G&&Object(z.jsxs)(i.a,{className:"shadow my-3 py-4 rounded_lg bg-white align-items-center",children:[Object(z.jsx)(y.a,{head:"".concat(G.username," | ShareIIITD")}),Object(z.jsxs)(a.a,{className:" align-items-center",children:[Object(z.jsx)(c.a,{xs:12,md:3,className:"d-none d-md-block ",children:Object(z.jsx)(s.a,{onClick:function(){return K(!F)},src:null!==(b=null===(v=G.profile)||void 0===v?void 0:v.image)&&void 0!==b?b:"/assets/images/user.png"})}),Object(z.jsxs)(c.a,{children:[Object(z.jsxs)("h2",{className:"d-inline",children:[null===G||void 0===G?void 0:G.username,Object(z.jsx)("div",{className:"d-inline ml-2 d-md-none",children:Object(z.jsx)(s.a,{onClick:function(){return K(!F)},src:null!==(O=null===(k=G.profile)||void 0===k?void 0:k.image)&&void 0!==O?O:"/assets/images/user.png",avatar:!0})})]}),Object(z.jsxs)("div",{className:"float-right d-inline",children:[(null===G||void 0===G||null===(E=G.profile)||void 0===E?void 0:E.telegram_url)&&Object(z.jsx)("a",{href:null===G||void 0===G||null===(H=G.profile)||void 0===H?void 0:H.telegram_url,target:"_blank",rel:"noopener noreferrer",children:Object(z.jsx)(o.a,{name:"telegram",size:"big"})}),(null===G||void 0===G||null===(I=G.profile)||void 0===I?void 0:I.linkedin_url)&&Object(z.jsx)("a",{href:null===G||void 0===G||null===(J=G.profile)||void 0===J?void 0:J.linkedin_url,target:"_blank",rel:"noopener noreferrer",children:Object(z.jsx)(o.a,{name:"linkedin",size:"big"})}),(null===G||void 0===G||null===(T=G.profile)||void 0===T?void 0:T.phone_number)&&Object(z.jsx)("buton",{onClick:function(){var e;navigator.clipboard.writeText("".concat(null===G||void 0===G||null===(e=G.profile)||void 0===e?void 0:e.phone_number)),Object(S.a)("Phone Number Copied to Clipboard")},children:Object(z.jsx)("a",{children:Object(z.jsx)(o.a,{name:"phone",size:"big"})})})]}),Object(z.jsx)("hr",{}),Object(z.jsxs)(u.a,{children:[Object(z.jsxs)(d.a,{className:"text-capitalize",children:[null===G||void 0===G?void 0:G.first_name," ",null===G||void 0===G?void 0:G.last_name]}),Object(z.jsx)(d.a,{children:null===G||void 0===G||null===(A=G.profile)||void 0===A?void 0:A.bio})]}),U.length>0&&Object(z.jsxs)("div",{className:"text-center ",children:[Object(z.jsx)("h3",{children:"Knows About"}),Object(z.jsx)("div",{className:"d-flex flex-row align-items-center justify-content-center",children:null===U||void 0===U?void 0:U.map((function(e){return Object(z.jsx)(_.c,{to:"/skill/".concat(e.id),children:Object(z.jsx)(j.a,{label:e.skill.label,className:"m-1 btn ",icon:Object(z.jsx)(h.a,{})},Math.random())},e.id)}))})]})]})]})]})})]})}}}]);
//# sourceMappingURL=23.29deb08c.chunk.js.map