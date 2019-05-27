(function(e){function t(t){for(var r,o,s=t[0],c=t[1],l=t[2],h=0,p=[];h<s.length;h++)o=s[h],i[o]&&p.push(i[o][0]),i[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);u&&u(t);while(p.length)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,s=1;s<n.length;s++){var c=n[s];0!==i[c]&&(r=!1)}r&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},i={app:0},a=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),i=n.n(r);i.a},"1af8":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("h2",[e._v("PR Monitor")]),n("p",[n("span",[e._v("https://github.com/")]),n("input",{attrs:{type:"text"},domProps:{value:e.config.githubConfig.owner},on:{change:e.onGithubOwnerChange}}),n("span",[e._v("/")]),n("input",{attrs:{type:"text"},domProps:{value:e.config.githubConfig.repo},on:{change:e.onGithubRepoChange}})]),n("MonitorTable",{attrs:{id:"monitor-table",hideQA:e.hideQA,hideSW:e.hideSW}}),n("p",[n("span",{staticClass:"config-param-title"},[e._v("Hide QA: ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.hideQA,expression:"hideQA"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.hideQA)?e._i(e.hideQA,null)>-1:e.hideQA},on:{change:function(t){var n=e.hideQA,r=t.target,i=!!r.checked;if(Array.isArray(n)){var a=null,o=e._i(n,a);r.checked?o<0&&(e.hideQA=n.concat([a])):o>-1&&(e.hideQA=n.slice(0,o).concat(n.slice(o+1)))}else e.hideQA=i}}}),n("span",{staticClass:"config-param-title"},[e._v("Hide SW: ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.hideSW,expression:"hideSW"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.hideSW)?e._i(e.hideSW,null)>-1:e.hideSW},on:{change:function(t){var n=e.hideSW,r=t.target,i=!!r.checked;if(Array.isArray(n)){var a=null,o=e._i(n,a);r.checked?o<0&&(e.hideSW=n.concat([a])):o>-1&&(e.hideSW=n.slice(0,o).concat(n.slice(o+1)))}else e.hideSW=i}}}),n("span",{staticClass:"config-param-title"},[e._v("username: ")]),n("input",{attrs:{type:"text"},domProps:{value:e.config.githubConfig.username},on:{change:e.onGithubUsernameChange}}),n("span",{staticClass:"config-param-title"},[e._v("page reload in sec: ")]),n("input",{staticStyle:{width:"50px"},attrs:{type:"text"},domProps:{value:parseInt(e.config.pageReloadInMs/1e3)},on:{change:e.onPageReloadChanged}}),n("span",{staticClass:"config-param-title"},[e._v("access_token: ")]),n("input",{staticStyle:{width:"300px"},attrs:{type:"text"},domProps:{value:e.config.githubConfig.apiAccessToken},on:{change:e.onAccessTokenChanged}})])],1)},a=[],o=n("cebc"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("table",{staticClass:"the-table",attrs:{border:"1"}},[e._m(0),n("tbody",e._l(e.filteredPrList,function(t,r){return n("PRRow",{key:r,attrs:{prData:t,index:r,hideQA:e.hideQA,hideSW:e.hideSW}})}),1)])])},c=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("thead",[n("th",[e._v("#")]),n("th",[e._v("\n        QA\n        "),n("br"),e._v("SW\n      ")]),n("th",{attrs:{title:"Ready to be merged. All checkers succeeded and has enough approvers"}},[e._v("Ready")]),n("th",[e._v("Owner")]),n("th",[e._v("Title")]),n("th",[e._v("Approvers")]),n("th",[e._v("Checkers")]),n("th",[e._v("Mergeable")]),n("th",[e._v("\n        Has Enough\n        "),n("br"),e._v("Approvers\n      ")])])}],l=(n("7f7f"),n("ac6a"),n("2f62")),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("tr",{staticClass:"pr-row",class:{"has-enough-approvers":e.isReadyToBeMerged,"dont-have-enough-approvers":!e.isReadyToBeMerged}},[n("td",[n("a",{attrs:{href:"https://github.com/"+e.config.githubConfig.owner+"/"+e.config.githubConfig.repo+"/pull/"+e.prData.number,target:"_blank"}},[e._v(e._s(e.prData.number))])]),n("td",[e._v(e._s(e.owner.role))]),n("td",{class:{blink_me:e.isReadyToBeMerged}},[e._v(e._s(e.isReadyToBeMerged?"✅":"❌"))]),n("td",{attrs:{title:e.prData.user.login}},[e._v(e._s(e.owner.name))]),n("td",[n("a",{attrs:{href:"https://github.com/"+e.config.githubConfig.owner+"/"+e.config.githubConfig.repo+"/pull/"+e.prData.number,target:"_blank"}},[e._v(e._s(e.prData.title))])]),n("td",[e.didIApprove?e._e():n("span",{staticClass:"blink_me",attrs:{title:"I did not approve yet"}},[e._v("❗️")]),e._l(e.approverList,function(t,r){return n("span",{key:t.login,attrs:{title:t.login}},[e._v(e._s(t.name+(e.approverList.length-1===r?"":", ")))])})],2),n("td",{staticStyle:{"padding-top":"5px"}},[n("table",{staticStyle:{"border-width":"0px"}},[n("tr",{staticStyle:{border:"1px none #dfe2e5"}},[e._l(e.prData.checkerStatuses,function(t,r){return[n("td",{key:r+"_avatar",class:{blink_me:"success"!==t.state},staticStyle:{padding:"0px","padding-left":"5px","padding-top":"10px",width:"20px",display:"inline-block",border:"1px none #dfe2e5"}},[n("a",{key:r+"_url",attrs:{href:t.target_url,target:"_blank",title:t.context+": "+t.description}},[n("img",{staticStyle:{display:"block"},attrs:{height:"20",src:t.avatar_url}})])]),n("td",{key:r+"_status",class:{blink_me:"success"!==t.state},staticStyle:{padding:"0px","padding-top":"10px",height:"26px","padding-right":"5px",border:"1px none #dfe2e5"}},[n("span",{staticStyle:{"font-size":"10px"}},[e._v(e._s("success"===t.state?"✅":"❌"))])])]})],2)])]),n("td",[e._v(e._s(e.prData.mergeable&&"clean"===e.prData.mergeable_state?"✅":e.prData.mergeable_state))]),n("td",[e._v(e._s(e.didPRGetRequiredApproves?"✅":"❌"))])])},h=[],p=(n("c5f6"),[{login:"acsly",name:"Ahmet Can",role:"SW"},{login:"ahmetceylan",name:"Ahmet Ceylan",role:"SW"},{login:"AlicanBayir",name:"Alican",role:"SW"},{login:"alpaykuru",name:"Alpay",role:"SW"},{login:"aylino",name:"Gökçe",role:"QA"},{login:"brendtumi",name:"Tümay",role:"SW"},{login:"efegure",name:"Efe",role:"SW"},{login:"ercang",name:"Ercan",role:"SW"},{login:"esracaglar",name:"Esra",role:"QA"},{login:"hakansakalli",name:"Hakan Sakallı",role:"QA"},{login:"iremdamla",name:"İrem",role:"QA"},{login:"legionairre",name:"Güçlü",role:"SW"},{login:"mchtctn",name:"Mücahit",role:"QA"},{login:"mkapi",name:"Metin",role:"SW"},{login:"mylmz10",name:"Muammer",role:"SW"},{login:"osmanertem",name:"Osman",role:"SW"},{login:"ozanbatuhanceylan",name:"Ozan",role:"SW"},{login:"oznurbayram",name:"Öznur",role:"SW"},{login:"saricaahmet",name:"Ahmet Sarıca",role:"SW"},{login:"Serhatkemal",name:"Serhat",role:"SW"},{login:"temelt",name:"Taner",role:"SW"},{login:"theutku",name:"Utku",role:"SW"},{login:"volkanakbayir",name:"Volkan",role:"SW"},{login:"wwdd1",name:"Mehmet",role:"SW"},{login:"yasinvural",name:"Yasin",role:"SW"},{login:"yerol",name:"Yiğit",role:"SW"},{login:"zhunor",name:"Orhun",role:"SW"}]),f=2;function g(e){for(var t=0;t<p.length;t++)if(p[t].login===e)return p[t];return{login:e,name:e,role:"SW"}}function d(e){return e.length>=f}var m={name:"PRRow",props:{prData:Object,index:Number},mounted:function(){},updated:function(){},computed:Object(o["a"])({},Object(l["b"])(["reviewersByPrID","prList","config"]),{isReadyToBeMerged:function(){return this.hasAllCheckersPassed&&this.didPRGetRequiredApproves&&this.prData.mergeable&&"clean"===this.prData.mergeable_state},hasAllCheckersPassed:function(){var e=!0;return this.prData.checkerStatuses&&this.prData.checkerStatuses.forEach(function(t){e&="success"===t.state}),e},approverList:function(){var e=this.prData.number+"";if(!this.reviewersByPrID[e])return[];var t=[];for(var n in this.reviewersByPrID[e])"APPROVED"===this.reviewersByPrID[e][n].state&&t.push({login:this.reviewersByPrID[e][n].user.login,name:g(this.reviewersByPrID[e][n].user.login).name});return t},didIApprove:function(){var e=this;return this.approverList.filter(function(t){return t.login===e.config.githubConfig.username}).length>0},didPRGetRequiredApproves:function(){return d(this.approverList)},owner:function(){return g(this.prData.user.login)}}),methods:{getApproversOfAPr:function(e){if(!this.reviewersByPrID[e])return[];var t=[];for(var n in this.reviewersByPrID[e])"APPROVED"===n.state&&t.push(n);return t}}},v=m,b=(n("771a"),n("2877")),S=Object(b["a"])(v,u,h,!1,null,null,null),_=S.exports,y=n("5118"),P={name:"MonitorTable",props:["hideQA","hideSW"],data:function(){return{windowTitle:"pr-monitor"}},updated:function(){this.windowTitle="("+this.filteredPrList.length+")"+(this.isThereAnyReadyPR?"Ⓜ️":"")+(this.isMyReviewNeeded?"❗️ ":"")+"pr-monitor"},mounted:function(){var e=this;Object(y["setInterval"])(function(){"pr-monitor"==document.title?document.title=e.windowTitle:document.title="pr-monitor"},1e3)},computed:Object(o["a"])({},Object(l["b"])(["reviewersByPrID","prList","config"]),{filteredPrList:function(){var e=this;return this.prList.filter(function(t){var n=g(t.user.login);return!("SW"===n.role&&e.hideSW)&&!("QA"===n.role&&e.hideQA)})},isMyReviewNeeded:function(){var e=this,t=!1;return this.filteredPrList.forEach(function(n){e.didIApprove(n)||(t=!0)}),t},isThereAnyReadyPR:function(){var e=this,t=!1;return this.filteredPrList.forEach(function(n){e.hasAllCheckersPassed(n)&&e.didPRGetRequiredApproves(n)&&n.mergeable&&"clean"===n.mergeable_state&&(t=!0)}),t}}),methods:{didPRGetRequiredApproves:function(e){var t=this.getApproverList(e);return!!t&&d(t)},hasAllCheckersPassed:function(e){var t=!0;return e.checkerStatuses&&e.checkerStatuses.forEach(function(e){t=t&&"success"===e.state}),t},didIApprove:function(e){var t=this,n=this.getApproverList(e);return!!n&&n.filter(function(e){return e.login===t.config.githubConfig.username}).length>0},getApproverList:function(e){var t=e.number+"";if(!this.reviewersByPrID[t])return[];var n=[];for(var r in this.reviewersByPrID[t])"APPROVED"===this.reviewersByPrID[t][r].state&&n.push({login:this.reviewersByPrID[t][r].user.login,name:g(this.reviewersByPrID[t][r].user.login).name});return n}},components:{PRRow:_}},A=P,R=(n("a47d"),Object(b["a"])(A,s,c,!1,null,null,null)),k=R.exports,w={name:"app",data:function(){return{titleInterval:void 0,hideQA:"true"===localStorage["hideQA"],hideSW:"true"===localStorage["hideSW"]}},components:{MonitorTable:k},mounted:function(){var e=this;Object(y["setInterval"])(function(){e.$store.dispatch("fetchPRList")},parseInt(this.config.pageReloadInMs))},computed:Object(o["a"])({},Object(l["b"])(["config"])),methods:{onAccessTokenChanged:function(e){var t=JSON.parse(localStorage["config"]);t.githubConfig.apiAccessToken=e.srcElement.value,localStorage["config"]=JSON.stringify(t),location.reload()},onGithubOwnerChange:function(e){var t=JSON.parse(localStorage["config"]);t.githubConfig.owner=e.srcElement.value,localStorage["config"]=JSON.stringify(t),location.reload()},onGithubRepoChange:function(e){var t=JSON.parse(localStorage["config"]);t.githubConfig.repo=e.srcElement.value,localStorage["config"]=JSON.stringify(t),location.reload()},onGithubUsernameChange:function(e){var t=JSON.parse(localStorage["config"]);t.githubConfig.username=e.srcElement.value,localStorage["config"]=JSON.stringify(t),location.reload()},onPageReloadChanged:function(e){var t=JSON.parse(localStorage["config"]);t.pageReloadInMs=1e3*parseInt(e.srcElement.value),localStorage["config"]=JSON.stringify(t),location.reload()}},watch:{hideQA:function(){console.log(this.hideQA),localStorage["hideQA"]=this.hideQA},hideSW:function(){localStorage["hideSW"]=this.hideSW}}},C=w,O=(n("034f"),Object(b["a"])(C,i,a,!1,null,null,null)),D=O.exports,W=(n("96cf"),n("3b8d"));r["a"].use(l["a"]);var L=new l["a"].Store({state:{prList:[],reviewersByPrID:{},config:{}},getters:{getPrList:function(e){return e.prList}},actions:{init:function(e){var t=e.commit,n=e.dispatch;t("INIT_CONFIG"),n("fetchPRList")},fetchPRList:function(e){var t=e.commit,n=e.dispatch,r=e.state;fetch("https://api.github.com/repos/".concat(r.config.githubConfig.owner,"/").concat(r.config.githubConfig.repo,"/pulls?access_token=").concat(r.config.githubConfig.apiAccessToken)).then(function(e){return e.json()}).then(function(e){console.log("fetchPRList",e),t("PROCESS_NEW_PR_LIST",e),e.forEach(function(e){n("fetchPRReviewStatus",e.number),n("fetchPRDetails",e.number),n("fetchCheckerStatuses",{checkStatusQueryURL:e.statuses_url,prNumber:e.number})})}).catch(function(e){return console.error(e)})},fetchPRReviewStatus:function(e,t){var n=e.commit,r=e.dispatch,i=e.state,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;fetch("https://api.github.com/repos/".concat(i.config.githubConfig.owner,"/").concat(i.config.githubConfig.repo,"/pulls/").concat(t,"/reviews?access_token=").concat(i.config.githubConfig.apiAccessToken,"&page=").concat(a)).then(function(e){return e.json()}).then(function(e){e&&30===e.length&&r("fetchPRReviewStatus",t,++a),n("PROCESS_PR_REVIEW_STATUS",{jsonData:e,prNumber:t})}).catch(function(e){return console.error(e)})},fetchPRDetails:function(e,t){var n=e.commit,r=e.state;fetch("https://api.github.com/repos/".concat(r.config.githubConfig.owner,"/").concat(r.config.githubConfig.repo,"/pulls/").concat(t,"?access_token=").concat(r.config.githubConfig.apiAccessToken)).then(function(e){return e.json()}).then(function(e){n("PROCESS_PR_DETAILS",{jsonData:e})}).catch(function(e){return console.error(e)})},fetchCheckerStatuses:function(){var e=Object(W["a"])(regeneratorRuntime.mark(function e(t,n){var r,i,a,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:r=t.commit,i=t.state,a=n.checkStatusQueryURL,o=n.prNumber,fetch(a+"?access_token=".concat(i.config.githubConfig.apiAccessToken)).then(function(e){return e.json()}).then(function(e){r("PROCESS_CHECKER_STATUS",{jsonData:e,prNumber:o})}).catch(function(e){return console.error(e)});case 3:case"end":return e.stop()}},e)}));function t(t,n){return e.apply(this,arguments)}return t}()},mutations:{CLEAR_PR_LIST:function(e){e.prList=[],e.reviewersByPrID={}},INIT_CONFIG:function(e){var t=JSON.stringify({pageReloadInMs:6e4,githubConfig:{username:"osmanertem",apiAccessToken:"",owner:"vuexp",repo:"vuexp"}});"undefined"!==typeof localStorage&&localStorage["config"]?e.config=JSON.parse(localStorage["config"]):e.config=t},UPDATE_CONFIG:function(e,t){var n=t.newConfig;e.config=n},PROCESS_CHECKER_STATUS:function(e,t){var n=t.jsonData,i=t.prNumber,a=n.filter(function(e){return"pending"!==e.state}),o=[];a.forEach(function(e){0===o.filter(function(t){return t.context===e.context}).length&&o.push(e)});for(var s=0;s<e.prList.length;s++)if(e.prList[s].number==i){r["a"].set(e.prList[s],"checkerStatuses",o);break}},PROCESS_PR_DETAILS:function(e,t){for(var n=t.jsonData,i=0;i<e.prList.length;i++)if(e.prList[i].number==n.number){r["a"].set(e.prList[i],"mergeable",n.mergeable),r["a"].set(e.prList[i],"mergeable_state",n.mergeable_state);break}},PROCESS_PR_REVIEW_STATUS:function(e,t){var n=t.jsonData,i=t.prNumber;i+="",n.forEach(function(t){e.reviewersByPrID[i]||r["a"].set(e.reviewersByPrID,i,{}),r["a"].set(e.reviewersByPrID[i],t.user.login,t)})},PROCESS_NEW_PR_LIST:function(e,t){if(t.length===e.prList.length)for(var n=0;n<t.length;n++){for(var i=!1,a=0;a<e.prList.length;a++)if(t[n].number==e.prList[a].number){t[n].mergeable=e.prList[a].mergeable,t[n].mergeable_state=e.prList[a].mergeable_state,t[n].checkerStatuses=e.prList[a].checkerStatuses,r["a"].set(e.prList,a,t[n]),i=!0;break}i||r["a"].set(e.prList,e.prList.length,t[n])}else e.prList=t},increment:function(e){e.count++}}});r["a"].config.productionTip=!1,L.dispatch("init"),new r["a"]({store:L,render:function(e){return e(D)}}).$mount("#app")},"64a9":function(e,t,n){},"771a":function(e,t,n){"use strict";var r=n("f5ec"),i=n.n(r);i.a},a47d:function(e,t,n){"use strict";var r=n("1af8"),i=n.n(r);i.a},f5ec:function(e,t,n){}});
//# sourceMappingURL=app.13211ce3.js.map