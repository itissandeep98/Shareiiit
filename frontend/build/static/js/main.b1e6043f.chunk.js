(this.webpackJsonpshareiiitd=this.webpackJsonpshareiiitd||[]).push([[4],{167:function(e,t,n){"use strict";var r=n(214),c=n(3);t.a=function(e){var t=e.head,n=e.description,a=e.url;return Object(c.jsxs)(r.a,{children:[Object(c.jsx)("title",{children:null!==t&&void 0!==t?t:"ShareIIITD"}),Object(c.jsx)("meta",{name:"description",content:n}),Object(c.jsx)("meta",{name:"twitter:description",content:n}),Object(c.jsx)("meta",{property:"og:description",content:n}),Object(c.jsx)("meta",{property:"og:url",content:null!==a&&void 0!==a?a:"https://shareiiitd.tk"}),Object(c.jsx)("meta",{name:"twitter:site",content:null!==a&&void 0!==a?a:"https://shareiiitd.tk"})]})}},174:function(e,t,n){"use strict";n.d(t,"a",(function(){return j})),n.d(t,"b",(function(){return f})),n.d(t,"c",(function(){return O}));var r=n(17),c=n.n(r),a=n(39),i=n(6),o=n(40),u=n.n(o),s=n(41),l=n(82),d=n(84),b=function(){return{Authorization:"Token "+Object(l.a)(),"Content-Type":"application/json"}},j=function(){return function(){var e=Object(a.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:i.Ab}),e.next=3,u.a.get("".concat(s.a,"/api/profile/"),{headers:b()}).then((function(e){t({type:i.Bb,data:e.data})})).catch((function(e){t({type:i.zb,errmess:"Error in connection with Server"})}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},f=function(){return function(){var e=Object(a.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:i.C}),e.next=3,u.a.get("".concat(s.a,"/api/osadetails/"),{headers:b()}).then((function(e){t({type:i.D,data:e.data})})).catch((function(e){t({type:i.B,errmess:"Error in connection with Server"})}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},O=function(e){return function(){var t=Object(a.a)(c.a.mark((function t(n){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:i.Db}),t.next=3,u.a.patch("".concat(s.a,"/api/profile/"),e,{headers:b()}).then((function(e){return n({type:i.Eb,data:e.data}),Object(d.a)("Updated Succesfully","success"),e.data})).catch((function(e){Object(d.a)("Update failed","error"),n({type:i.Cb,errmess:e.response})}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}},181:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return j})),n.d(t,"c",(function(){return f}));var r=n(17),c=n.n(r),a=n(39),i=n(40),o=n.n(i),u=n(82),s=n(84),l=n(6),d=n(41),b=function(e){return function(){var t=Object(a.a)(c.a.mark((function t(n){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:l.k}),t.next=3,o.a.post("".concat(d.a,"/api/login/"),e).then((function(e){n({type:l.l,key:e.data.token})})).catch((function(e){var t,r,c,a;(Object(s.a)("Invalid Username or Password","error"),null===e||void 0===e||null===(t=e.response)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.error)?n({type:l.j,errmess:null===e||void 0===e||null===(c=e.response)||void 0===c||null===(a=c.data)||void 0===a?void 0:a.error}):n({type:l.j,errmess:"Error in connection with Server"})}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},j=function(e){return function(){var t=Object(a.a)(c.a.mark((function t(n){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:l.k}),t.next=3,o.a.post("".concat(d.a,"/api/login/"),{},{headers:{"osa-token":e}}).then((function(e){n({type:l.l,key:e.data.token})})).catch((function(e){var t,r,c,a;(Object(s.a)("Unable to login using OSA","error"),null===e||void 0===e||null===(t=e.response)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.error)?n({type:l.j,errmess:null===e||void 0===e||null===(c=e.response)||void 0===c||null===(a=c.data)||void 0===a?void 0:a.error}):n({type:l.j,errmess:"Error in connection with Server"})}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},f=function(){return function(){var e=Object(a.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:l.n}),e.next=3,o.a.post("".concat(d.a,"/api/logout/"),{},{headers:{Authorization:"Token "+Object(u.a)()}}).then((function(e){t({type:l.o})})).catch((function(e){t({type:l.m,errmess:"Error in connection with Server"})}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}},220:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(35),a=n(332),i=n(151),o=n(17),u=n.n(o),s=n(39),l=n(6),d=n(40),b=n.n(d),j=n(41),f=n(82),O=function(){return{Authorization:"Token "+Object(f.a)()}},E=function(){return function(){var e=Object(s.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:l.w}),e.next=3,b.a.get("".concat(j.a,"/api/notifications/"),{headers:O()}).then((function(e){return t({type:l.x,data:e.data.results}),e.data.results})).catch((function(e){t({type:l.v,errmess:"Error in connection with Server"})}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},S=n(30),p=n(4),h=n(319),_=n(320),m=n(321),v=n(335),T=n(164),L=n.n(T),x=n(3);function g(e){var t=e.notification,n=e.unread,r=e.read;return Object(x.jsx)(h.a,{className:"text-dark py-2",children:Object(x.jsx)(_.a,{children:Object(x.jsx)(m.a,{children:0===(null===t||void 0===t?void 0:t.length)?Object(x.jsx)("small",{className:"text-muted",children:"There is no new notification for you"}):Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("h3",{children:"Notifications"}),Object(x.jsx)("hr",{}),(null===n||void 0===n?void 0:n.length)>0&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("h4",{children:"Unread"}),Object(x.jsx)("hr",{}),Object(x.jsx)("ul",{children:null===n||void 0===n?void 0:n.map((function(e){return Object(x.jsx)(C,Object(p.a)({},e))}))})]}),(null===r||void 0===r?void 0:r.length)>0&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("h4",{children:"Read"}),Object(x.jsx)("hr",{}),Object(x.jsx)("ul",{children:null===r||void 0===r?void 0:r.map((function(e){return Object(x.jsx)(C,Object(p.a)({},e))}))})]})]})})})})}var C=function(e){var t=e.id,n=e.post,r=(e.category,e.read),a=e.text,o=e.timestamp,d=Object(c.c)();return Object(x.jsx)("li",{children:Object(x.jsxs)(_.a,{children:[Object(x.jsxs)(m.a,{className:"text-break text-wrap",children:[Object(x.jsx)(S.c,{to:"/posts/".concat(n.category,"/").concat(n.id),children:a}),Object(x.jsx)("br",{}),Object(x.jsx)("small",{children:L()(o).fromNow()})]}),!r&&Object(x.jsx)(m.a,{xs:2,className:"",children:Object(x.jsx)(v.a,{size:"small",onClick:function(e){e.preventDefault(),d(function(e){return function(){var t=Object(s.a)(u.a.mark((function t(n){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:l.z}),t.next=3,b.a.patch("".concat(j.a,"/api/notifications/").concat(e,"/"),{read:!0},{headers:O()}).then((function(e){n({type:l.A})})).catch((function(e){n({type:l.y,errmess:"Error in connection with Server"})}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(t)).then((function(){d(E())}))},children:Object(x.jsx)(i.a,{name:"check"})})})]})})};t.default=Object(c.b)((function(e){return{notification:e.notification.details}}))((function(e){var t=e.notification,n=e.page,o=Object(c.c)();Object(r.useEffect)((function(){o(E())}),[]);var u=null===t||void 0===t?void 0:t.filter((function(e){return!e.read})),s=null===t||void 0===t?void 0:t.filter((function(e){return e.read}));return Object(x.jsx)(x.Fragment,{children:n?Object(x.jsx)(g,{notification:t,read:s,unread:u}):Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(S.c,{className:"nav-link p-3 cust_link d-md-none",to:"/notification",children:"Notifications"}),Object(x.jsx)("a",{className:"nav-link p-3 d-none d-md-block",children:Object(x.jsx)(a.a,{item:!0,direction:"left",icon:Object(x.jsxs)(i.a.Group,{size:"large",children:[Object(x.jsx)(i.a,{name:"bell"}),(null===u||void 0===u?void 0:u.length)>0&&Object(x.jsx)(i.a,{corner:"top left",name:"circle",color:"red"})]}),children:Object(x.jsx)(a.a.Menu,{children:Object(x.jsx)(g,{notification:t,read:s,unread:u})})})})]})})}))},243:function(e,t,n){},253:function(e,t,n){},296:function(e,t,n){"use strict";n.r(t);var r=n(36),c=n.n(r),a=n(0),i=n.n(a),o=(n(243),n(169)),u=n(4),s=n(18),l=n(35),d=n(3),b=function(e,t){return i.a.Children.map(t,(function(t,n){return i.a.cloneElement(t,Object(u.a)(Object(u.a)({},e),{},{index:n}))}))},j=Object(l.b)((function(e,t){var n;return{logged_in:null===(n=e.auth)||void 0===n?void 0:n.key}}),null,null,{pure:!1})((function(e){return e.render?e.render({match:e.computedMatch}):Object(d.jsx)(s.b,Object(u.a)(Object(u.a)({},e.routeProps),{},{render:function(t){return e.logged_in&&e.restricted?Object(d.jsx)(s.a,{to:"/feed"}):Object(d.jsx)("div",{children:b(t,e.children)})}}))})),f=function(e,t){return i.a.Children.map(t,(function(t,n){return i.a.cloneElement(t,Object(u.a)(Object(u.a)({},e),{},{index:n}))}))},O=Object(l.b)((function(e,t){var n;return{logged_in:null===e||void 0===e||null===(n=e.auth)||void 0===n?void 0:n.key,routeProps:{exact:t.exact,path:t.path,component:t.component}}}),null,null,{pure:!1})((function(e){return Object(d.jsx)(s.b,Object(u.a)(Object(u.a)({},e.routeProps),{},{render:function(t){return e.logged_in?e.render?e.render({match:e.computedMatch}):Object(d.jsx)(d.Fragment,{children:f(t,e.children)}):Object(d.jsx)(s.a,{to:{pathname:"/",state:{from:e.computedMatch.url}}})}}))})),E=n(318);var S=function(){return Object(d.jsx)(E.a,{size:"lg",style:{position:"fixed",left:"50%",top:"50%"}})},p=n(44),h=n(30),_=n(319),m=n(320),v=n(327),T=n(328),L=n(329),x=n(330),g=n(331),C=(n(253),n(219)),I=n(181),y=n(174),A=n(220);var U=Object(s.i)((function(){var e=Object(l.c)(),t=Object(a.useState)(!1),n=Object(p.a)(t,2),r=n[0],c=n[1];return Object(a.useEffect)((function(){e(Object(y.a)())}),[e]),Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(_.a,{children:Object(d.jsxs)(m.a,{className:"d-flex flex-row justify-content-between align-items-center",children:[Object(d.jsx)("div",{children:Object(d.jsx)(C.a,{src:"/assets/images/iiitd2.png",alt:"IIIT-Delhi"})}),Object(d.jsx)(C.a,{src:"/assets/images/logo.png",alt:"resource sharing app",size:"medium",className:"d-none d-lg-block"})]})}),Object(d.jsx)(v.a,{dark:!0,expand:"md",className:"p-0 sticky-top",children:Object(d.jsxs)(_.a,{children:[Object(d.jsx)(T.a,{onClick:function(){c(!r)}}),Object(d.jsxs)(L.a,{isOpen:r,navbar:!0,className:"p-0",children:[Object(d.jsxs)(x.a,{navbar:!0,children:[Object(d.jsx)(g.a,{children:Object(d.jsx)(h.c,{className:"nav-link p-3 cust_link",to:"/feed",children:"Feed"})}),Object(d.jsx)(g.a,{children:Object(d.jsx)(h.c,{className:"nav-link p-3 cust_link",to:"/technical",children:"Skills"})}),Object(d.jsx)(g.a,{children:Object(d.jsx)(h.c,{className:"nav-link p-3 cust_link",to:"/profile",children:"Profile"})})]}),Object(d.jsxs)(x.a,{className:"ml-auto",navbar:!0,children:[Object(d.jsx)(g.a,{children:Object(d.jsxs)("a",{className:"nav-link p-3 ",href:"https://forms.gle/Fh641DgMdrveindm9",target:"_blank",rel:"noopener noreferrer",children:[Object(d.jsx)("p",{className:"d-md-none",children:"Feedback"}),Object(d.jsx)("span",{className:"fa fa-comment fa-lg d-none d-md-inline-block"})]})}),Object(d.jsx)(g.a,{children:Object(d.jsx)(A.default,{})}),Object(d.jsx)(g.a,{children:Object(d.jsx)(h.c,{className:"nav-link p-3",to:"#",onClick:function(t){t.preventDefault(),e(Object(I.c)())},children:"Logout"})})]})]})]})})]})})),F=n(167),D=["children","layout"],k=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(7)]).then(n.bind(null,509))})),P=Object(a.lazy)((function(){return Promise.resolve().then(n.bind(null,220))})),R=Object(a.lazy)((function(){return Promise.all([n.e(21),n.e(22)]).then(n.bind(null,522))})),w=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(8),n.e(19)]).then(n.bind(null,512))})),H=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(18),n.e(23)]).then(n.bind(null,523))})),N=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(17)]).then(n.bind(null,500))})),K=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(9)]).then(n.bind(null,513))})),Q=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(12),n.e(13)]).then(n.bind(null,517))})),z=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(10)]).then(n.bind(null,515))})),G=Object(a.lazy)((function(){return Promise.all([n.e(24),n.e(20)]).then(n.bind(null,510))})),M=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(15)]).then(n.bind(null,501))})),B=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(14)]).then(n.bind(null,502))})),W=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(16)]).then(n.bind(null,503))})),V=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(11)]).then(n.bind(null,520))}));function J(e){var t=e.children,n=e.layout,r=Object(o.a)(e,D);return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)("div",{children:[n&&Object(d.jsx)(U,{}),Object(d.jsx)(a.Suspense,{fallback:Object(d.jsx)(S,{}),children:i.a.cloneElement(t,Object(u.a)({},r))})]}),n&&Object(d.jsxs)("footer",{className:"text-center bg-dark p-3 text-white",children:["Copyright \xa9 2021 IIITD | All rights reserved | Built by"," ",Object(d.jsx)("a",{href:"https://github.com/itissandeep98",target:"_blank",children:"Sandeep"})," ","and"," ",Object(d.jsx)("a",{href:"https://github.com/gupta-anmol",target:"_blank",children:"Anmol"})]})]})}var X=function(){var e=[{path:"/profile/myposts",private:!0,layout:!0,render:function(){return Object(d.jsx)(K,{})}},{path:"/profile/myactivity",private:!0,layout:!0,render:function(){return Object(d.jsx)(Q,{})}},{path:"/profile",private:!0,layout:!0,render:function(){return Object(d.jsx)(w,{})}},{path:"/feed",private:!0,layout:!0,render:function(){return Object(d.jsx)(k,{})}},{path:"/notification",private:!0,layout:!0,render:function(){return Object(d.jsx)(P,{page:!0})}},{path:"/technical",private:!0,layout:!0,render:function(){return Object(d.jsx)(z,{})}},{path:"/login",private:!1,restricted:!0,layout:!1,render:function(){return Object(d.jsx)(R,{})}},{path:"/posts/group/:postId",private:!0,layout:!0,render:function(e){return Object(d.jsx)(M,Object(u.a)({},e),e.match.params.postId)}},{path:"/posts/electronic/:postId",private:!0,layout:!0,render:function(e){return Object(d.jsx)(B,Object(u.a)({},e),e.match.params.postId)}},{path:"/posts/other/:postId",private:!0,layout:!0,render:function(e){return Object(d.jsx)(W,Object(u.a)({},e),e.match.params.postId)}},{path:"/posts/book/:postId",private:!0,layout:!0,render:function(e){return Object(d.jsx)(N,Object(u.a)({},e),e.match.params.postId)}},{path:"/posts/:postId",private:!0,layout:!0,render:function(e){return Object(d.jsx)(N,Object(u.a)({},e),e.match.params.postId)}},{path:"/skill/:id",private:!0,layout:!0,render:function(e){return Object(d.jsx)(V,Object(u.a)({},e),e.match.params.id)}},{path:"/:user",private:!0,layout:!0,render:function(e){return Object(d.jsx)(H,Object(u.a)({},e),e.match.params.username)}},{path:"/",private:!1,restricted:!0,layout:!1,render:function(){return Object(d.jsx)(G,{})}}];return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(F.a,{}),Object(d.jsxs)(s.d,{children:[e.map((function(e,t){return e.private?Object(d.jsx)(O,{restricted:e.restricted,exact:!0,path:e.path,children:Object(d.jsx)(J,{layout:e.layout,children:Object(d.jsx)(e.render,{})})},t):Object(d.jsx)(j,{restricted:e.restricted,exact:!0,path:e.path,children:Object(d.jsx)(J,{layout:e.layout,children:Object(d.jsx)(e.render,{})})},t)})),Object(d.jsx)(s.a,{to:"/"})]})]})};var q=function(){return Object(d.jsx)(h.a,{basename:"",children:Object(d.jsx)("div",{className:"App d-flex justify-content-between flex-column",children:Object(d.jsx)(X,{})})})},Z=function(e){e&&e instanceof Function&&n.e(25).then(n.bind(null,504)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),r(e),c(e),a(e),i(e)}))},Y=(n(293),n(294),n(295),n(79)),$=n(217),ee=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function te(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var ne=Y.a;c.a.render(Object(d.jsx)(l.a,{store:ne,children:Object(d.jsx)($.a,{loading:null,persistor:Y.b,children:Object(d.jsx)(i.a.StrictMode,{children:Object(d.jsx)(q,{})})})}),document.getElementById("root")),Z(),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");ee?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):te(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):te(t,e)}))}}()},41:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r="http://share.osa.iiitd.edu.in"},6:function(e,t,n){"use strict";n.d(t,"k",(function(){return r})),n.d(t,"l",(function(){return c})),n.d(t,"j",(function(){return a})),n.d(t,"ab",(function(){return i})),n.d(t,"bb",(function(){return o})),n.d(t,"Z",(function(){return u})),n.d(t,"n",(function(){return s})),n.d(t,"o",(function(){return l})),n.d(t,"m",(function(){return d})),n.d(t,"Ab",(function(){return b})),n.d(t,"Bb",(function(){return j})),n.d(t,"zb",(function(){return f})),n.d(t,"C",(function(){return O})),n.d(t,"D",(function(){return E})),n.d(t,"B",(function(){return S})),n.d(t,"Db",(function(){return p})),n.d(t,"Eb",(function(){return h})),n.d(t,"Cb",(function(){return _})),n.d(t,"F",(function(){return m})),n.d(t,"G",(function(){return v})),n.d(t,"E",(function(){return T})),n.d(t,"U",(function(){return L})),n.d(t,"V",(function(){return x})),n.d(t,"T",(function(){return g})),n.d(t,"R",(function(){return C})),n.d(t,"S",(function(){return I})),n.d(t,"Q",(function(){return y})),n.d(t,"L",(function(){return A})),n.d(t,"M",(function(){return U})),n.d(t,"K",(function(){return F})),n.d(t,"Gb",(function(){return D})),n.d(t,"Hb",(function(){return k})),n.d(t,"Fb",(function(){return P})),n.d(t,"e",(function(){return R})),n.d(t,"f",(function(){return w})),n.d(t,"d",(function(){return H})),n.d(t,"h",(function(){return N})),n.d(t,"i",(function(){return K})),n.d(t,"g",(function(){return Q})),n.d(t,"Mb",(function(){return z})),n.d(t,"Nb",(function(){return G})),n.d(t,"Lb",(function(){return M})),n.d(t,"b",(function(){return B})),n.d(t,"c",(function(){return W})),n.d(t,"a",(function(){return V})),n.d(t,"db",(function(){return J})),n.d(t,"eb",(function(){return X})),n.d(t,"cb",(function(){return q})),n.d(t,"q",(function(){return Z})),n.d(t,"r",(function(){return Y})),n.d(t,"p",(function(){return $})),n.d(t,"t",(function(){return ee})),n.d(t,"u",(function(){return te})),n.d(t,"s",(function(){return ne})),n.d(t,"w",(function(){return re})),n.d(t,"x",(function(){return ce})),n.d(t,"v",(function(){return ae})),n.d(t,"z",(function(){return ie})),n.d(t,"A",(function(){return oe})),n.d(t,"y",(function(){return ue})),n.d(t,"O",(function(){return se})),n.d(t,"P",(function(){return le})),n.d(t,"N",(function(){return de})),n.d(t,"fb",(function(){return be})),n.d(t,"gb",(function(){return je})),n.d(t,"ob",(function(){return fe})),n.d(t,"pb",(function(){return Oe})),n.d(t,"nb",(function(){return Ee})),n.d(t,"ib",(function(){return Se})),n.d(t,"jb",(function(){return pe})),n.d(t,"hb",(function(){return he})),n.d(t,"lb",(function(){return _e})),n.d(t,"mb",(function(){return me})),n.d(t,"kb",(function(){return ve})),n.d(t,"Jb",(function(){return Te})),n.d(t,"Kb",(function(){return Le})),n.d(t,"Ib",(function(){return xe})),n.d(t,"xb",(function(){return ge})),n.d(t,"yb",(function(){return Ce})),n.d(t,"wb",(function(){return Ie})),n.d(t,"rb",(function(){return ye})),n.d(t,"sb",(function(){return Ae})),n.d(t,"qb",(function(){return Ue})),n.d(t,"ub",(function(){return Fe})),n.d(t,"vb",(function(){return De})),n.d(t,"tb",(function(){return ke})),n.d(t,"I",(function(){return Pe})),n.d(t,"J",(function(){return Re})),n.d(t,"H",(function(){return we})),n.d(t,"X",(function(){return He})),n.d(t,"Y",(function(){return Ne})),n.d(t,"W",(function(){return Ke}));var r="LOGIN_REQUEST",c="LOGIN_SUCCESS",a="LOGIN_FAILED",i="REGISTER_REQUEST",o="REGISTER_SUCCESS",u="REGISTER_FAILED",s="LOGOUT_REQUEST",l="LOGOUT_SUCCESS",d="LOGOUT_FAILED",b="USER_DETAILS_FETCH_REQUEST",j="USER_DETAILS_FETCH_SUCCESS",f="USER_DETAILS_FETCH_FAILED",O="OSA_USER_DETAILS_FETCH_REQUEST",E="OSA_USER_DETAILS_FETCH_SUCCESS",S="OSA_USER_DETAILS_FETCH_FAILED",p="USER_DETAILS_UPDATE_REQUEST",h="USER_DETAILS_UPDATE_SUCCESS",_="USER_DETAILS_UPDATE_FAILED",m="PEOPLE_DETAILS_FETCH_REQUEST",v="PEOPLE_DETAILS_FETCH_SUCCESS",T="PEOPLE_DETAILS_FETCH_FAILED",L="POST_FETCH_REQUEST",x="POST_FETCH_SUCCESS",g="POST_FETCH_FAILED",C="POST_DETAILS_FETCH_REQUEST",I="POST_DETAILS_FETCH_SUCCESS",y="POST_DETAILS_FETCH_FAILED",A="POST_CREATE_REQUEST",U="POST_CREATE_SUCCESS",F="POST_CREATE_FAILED",D="USER_POST_FETCH_REQUEST",k="USER_POST_FETCH_SUCCESS",P="USER_POST_FETCH_FAILED",R="LIKE_ADD_REQUEST",w="LIKE_ADD_SUCCESS",H="LIKE_ADD_FAILED",N="LIKE_DELETE_REQUEST",K="LIKE_DELETE_SUCCESS",Q="LIKE_DELETE_FAILED",z="VOTED_POST_FETCH_REQUEST",G="VOTED_POST_FETCH_SUCCESS",M="VOTED_POST_FETCH_FAILED",B="BOOK_SEARCH_REQUEST",W="BOOK_SEARCH_SUCCESS",V="BOOK_SEARCH_FAILED",J="SEARCH_REQUEST",X="SEARCH_SUCCESS",q="SEARCH_FAILED",Z="MESSAGE_CREATE_REQUEST",Y="MESSAGE_CREATE_SUCCESS",$="MESSAGE_CREATE_FAILED",ee="MESSAGE_FETCH_REQUEST",te="MESSAGE_FETCH_SUCCESS",ne="MESSAGE_FETCH_FAILED",re="NOTIFICATION_FETCH_REQUEST",ce="NOTIFICATION_FETCH_SUCCESS",ae="NOTIFICATION_FETCH_FAILED",ie="NOTIFICATION_UPDATE_REQUEST",oe="NOTIFICATION_UPDATE_SUCCESS",ue="NOTIFICATION_UPDATE_FAILED",se="POST_DELETE_REQUEST",le="POST_DELETE_SUCCESS",de="POST_DELETE_FAILED",be="SKILL_CREATE_REQUEST",je="SKILL_CREATE_SUCCESS",fe="SKILL_POSTS_FETCH_REQUEST",Oe="SKILL_POSTS_FETCH_SUCCESS",Ee="SKILL_POSTS_FETCH_FAILED",Se="SKILL_LIST_FETCH_REQUEST",pe="SKILL_LIST_FETCH_SUCCESS",he="SKILL_LIST_FETCH_FAILED",_e="SKILL_LIST_SEARCH_REQUEST",me="SKILL_LIST_SEARCH_SUCCESS",ve="SKILL_LIST_SEARCH_FAILED",Te="USER_SKILLS_FETCH_REQUEST",Le="USER_SKILLS_FETCH_SUCCESS",xe="USER_SKILLS_FETCH_FAILED",ge="UPLOAD_REQUEST",Ce="UPLOAD_SUCCESS",Ie="UPLOAD_FAILED",ye="SKILL_POST_DELETE_REQUEST",Ae="SKILL_POST_DELETE_SUCCESS",Ue="SKILL_POST_DELETE_FAILED",Fe="SKILL_SEARCH_REQUEST",De="SKILL_SEARCH_SUCCESS",ke="SKILL_SEARCH_FAILED",Pe="PEOPLE_SKILLS_FETCH_REQUEST",Re="PEOPLE_SKILLS_FETCH_SUCCESS",we="PEOPLE_SKILLS_FETCH_FAILED",He="POST_UPDATE_REQUEST",Ne="POST_UPDATE_SUCCESS",Ke="POST_UPDATE_FAILED"},79:function(e,t,n){"use strict";n.d(t,"a",(function(){return v})),n.d(t,"b",(function(){return T}));var r=n(51),c=n(209),a=(n(274),n(4)),i=n(6),o={isLoading:!1},u=n(16),s={isLoading:!1,all:[]},l={isLoading:!1},d=n(207),b=n.n(d),j=n(157),f=n(208),O={isLoading:!1},E={isLoading:!1},S={key:"root",storage:b.a,transforms:[Object(f.encryptTransform)({secretKey:"fas56asfsdmnasdaf64asda6a8s6a54sd98"})]},p=Object(r.b)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case i.k:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,isLoading:!0});case i.l:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,key:t.key,isLoading:!1});case i.j:return Object(a.a)(Object(a.a)({},e),{},{errmess:t.errmess,key:null,isLoading:!1});case i.bb:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,key:t.key,isLoading:!1});case i.Z:return Object(a.a)(Object(a.a)({},e),{},{errmess:t.errmess,key:null,isLoading:!1});case i.o:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,key:null,isLoading:!1});default:return e}},posts:function(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,r=arguments.length>1?arguments[1]:void 0;switch(r.type){case i.U:return Object(a.a)(Object(a.a)({},n),{},{errmess:null,isLoading:!0});case i.V:return Object(a.a)(Object(a.a)({},n),{},(e={errmess:null},Object(u.a)(e,r.category,r.data),Object(u.a)(e,"isLoading",!1),e));case i.T:return Object(a.a)(Object(a.a)({},n),{},(t={errmess:r.errmess},Object(u.a)(t,r.category,null),Object(u.a)(t,"isLoading",!1),t));default:return n}},skill:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case i.ob:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,isLoading:!0});case i.pb:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,skills:t.data,isLoading:!1});case i.nb:return Object(a.a)(Object(a.a)({},e),{},{errmess:t.errmess,skills:null,isLoading:!1});default:return e}},user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case i.Ab:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,isLoading:!0});case i.Bb:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,details:t.data,isLoading:!1});case i.zb:return Object(a.a)(Object(a.a)({},e),{},{errmess:t.errmess,isLoading:!1});case i.C:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,isLoading:!0});case i.D:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,osadetails:t.data,isLoading:!1});case i.B:return Object(a.a)(Object(a.a)({},e),{},{errmess:t.errmess,isLoading:!1});case i.Gb:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,isLoading:!0});case i.Hb:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,books:t.data,isLoading:!1});case i.Fb:return Object(a.a)(Object(a.a)({},e),{},{errmess:t.errmess,books:null,isLoading:!1});case i.Mb:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,isLoading:!0});case i.Nb:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,voted:t.data,isLoading:!1});case i.Lb:return Object(a.a)(Object(a.a)({},e),{},{errmess:t.errmess,voted:null,isLoading:!1});case i.Jb:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,isLoading:!0});case i.Kb:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,skills:t.data,isLoading:!1});case i.Ib:return Object(a.a)(Object(a.a)({},e),{},{errmess:t.errmess,skills:null,isLoading:!1});default:return e}},people:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case i.F:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,isLoading:!0});case i.G:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,details:t.data,isLoading:!1});case i.E:return Object(a.a)(Object(a.a)({},e),{},{errmess:t.errmess,details:null,isLoading:!1});default:return e}},notification:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case i.w:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,isLoading:!0});case i.x:return Object(a.a)(Object(a.a)({},e),{},{errmess:null,details:t.data,isLoading:!1});case i.v:return Object(a.a)(Object(a.a)({},e),{},{errmess:t.errmess,details:null,isLoading:!1});default:return e}}}),h=Object(j.persistReducer)(S,p),_=n(122),m=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||r.c,v=Object(r.d)(h,m(Object(r.a)(c.a))),T=Object(_.a)(v)},82:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(79),c=function(){var e,t;return null===r.a||void 0===r.a||null===(e=r.a.getState())||void 0===e||null===(t=e.auth)||void 0===t?void 0:t.key}},84:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n(283);var r=n(80),c={position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0},a=function(e,t){r.a.configure(),"error"===t?r.a.error(e,c):"warning"===t?r.a.warning(e,c):"success"===t?r.a.success(e,c):"info"===t?r.a.info(e,c):Object(r.a)(e,c)}}},[[296,5,6]]]);
//# sourceMappingURL=main.b1e6043f.chunk.js.map