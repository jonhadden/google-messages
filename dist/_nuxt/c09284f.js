(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{268:function(t,o,e){var content=e(272);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(77).default)("dc5c79ba",content,!0,{sourceMap:!1})},271:function(t,o,e){"use strict";e(268)},272:function(t,o,e){var r=e(76)(!1);r.push([t.i,".password{background:purple;color:#fff;background:radial-gradient(circle,#673ab7 0,#522e92 100%);height:100vh;display:flex;justify-content:center}.password h1{line-height:1.25}.password h1 span{display:block;color:hsla(0,0%,100%,.2)}.password>div{margin-top:10%}.password form{display:grid}",""]),t.exports=r},273:function(t,o,e){"use strict";e.r(o);var r={data:function(){return{methodLoginValue:"",isAuthorised:!1}},computed:{redirectPath:function(){return this.$route.query.previousPath||this.localePath("/")}},mounted:function(){this.isAuthorised=this.$passwordProtect.isAuthorised()},methods:{loginUser:function(){this.$passwordProtect.authorise(this.methodLoginValue),this.isAuthorised=this.$passwordProtect.isAuthorised(),this.$router.push(this.redirectPath)},removeAuthorisation:function(){this.$passwordProtect.removeAuthorisation(),this.isAuthorised=this.$passwordProtect.isAuthorised()}}},n=(e(271),e(46)),component=Object(n.a)(r,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("section",{staticClass:"password"},[e("div",[t._m(0),t._v(" "),t.isAuthorised?e("div",[e("h2",[t._v("Looks like you're already logged in")]),t._v(" "),e("p",[t._v("Either logout or go to the password protected area")]),t._v(" "),e("button",{staticClass:"button",on:{click:t.removeAuthorisation}},[t._v("Log out")]),t._v(" "),e("a",{staticClass:"button",attrs:{href:"/"}},[t._v("Go to password protected area")])]):e("div",{staticClass:"form-container"},[e("form",[e("label",{attrs:{for:"prototypePassword"}},[t._v("Prototype Password")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.methodLoginValue,expression:"methodLoginValue"}],ref:"passwordField",staticClass:"inverse",attrs:{name:"prototypePassword",type:"password",placeholder:"Prototype Password"},domProps:{value:t.methodLoginValue},on:{input:function(o){o.target.composing||(t.methodLoginValue=o.target.value)}}}),t._v(" "),e("div",{staticClass:"actions"},[e("button",{staticClass:"button primary inverse",on:{click:function(o){return t.loginUser()}}},[t._v("\n            Login\n          ")])])])])])])}),[function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("h1",[e("span",[t._v("Welcome to ")]),t._v("Infinite Messages")])}],!1,null,null,null);o.default=component.exports}}]);