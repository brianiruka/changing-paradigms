(function(){"use strict";var t={7660:function(t,e,n){var i=n(7195),o=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("draggable-dot"),e("BellCurveChart",{attrs:{msg:"Bell"}})],1)},s=[],r=function(){var t=this;t._self._c;return t._m(0)},l=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"hello",staticStyle:{position:"absolute",top:"25%","z-index":"-99"}},[e("canvas",{attrs:{id:"myCanvas"}}),e("div",{staticClass:"label label1"},[t._v("Stage A")]),e("div",{staticClass:"label label2"},[t._v("Stage B")]),e("div",{staticClass:"label label3"},[t._v("Stage C")])])}],a={name:"HelloWorld",props:{msg:String},data(){return{c:null,ctx:null,activeDotIndex:-1}},mounted(){this.redrawBellCurve(),window.addEventListener("resize",(()=>{this.c.width=window.innerWidth,this.c.height=window.innerHeight,this.redrawBellCurve()}))},methods:{redrawBellCurve(){this.c=document.getElementById("myCanvas"),this.ctx=this.c.getContext("2d"),this.c.width=window.innerWidth,this.c.height=window.innerHeight/2;const t=this.c.width/2,e=this.c.width/12,n=2,i=30,o=70;this.ctx.beginPath();for(let l=0;l<this.c.width;l++){const i=this.c.height/2-Math.exp(-((l-t)**2)/(2*e**2))*(this.c.height/6)*n;0===l?this.ctx.moveTo(l,i):this.ctx.lineTo(l,i)}this.ctx.stroke();const s=this.c.width*i/100,r=this.c.width*o/100;this.ctx.strokeStyle="purple",this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.moveTo(s,0),this.ctx.lineTo(s,this.c.height),this.ctx.moveTo(r,0),this.ctx.lineTo(r,this.c.height),this.ctx.stroke()}}},d=a,u=n(1001),h=(0,u.Z)(d,r,l,!1,null,"0c382941",null),c=h.exports,g=function(){var t=this,e=t._self._c;return e("div",[e("button",{on:{click:t.addDot}},[t._v("Add a Dot")]),t.showLabelInput?e("input",{directives:[{name:"model",rawName:"v-model",value:t.labelInput,expression:"labelInput"}],attrs:{placeholder:"Enter label"},domProps:{value:t.labelInput},on:{blur:t.saveLabel,keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.saveLabel.apply(null,arguments)},input:function(e){e.target.composing||(t.labelInput=e.target.value)}}}):t._e(),t._l(t.dots,(function(n,i){return e("div",{key:i,staticClass:"draggable-dot",style:{left:n.x+"%",top:n.y+"%",backgroundColor:n.backgroundColor,display:n.userId==t.userId||n.public?"block":"none"},on:{mousedown:function(e){return t.startDrag(i,e)},dblclick:function(e){return t.startLabelEditing(i)}}},[e("div",{staticClass:"dot-label",staticStyle:{position:"absolute",bottom:"20px"}},[t._v(" "+t._s(n.label)+" ")])])}))],2)},p=[],v=(n(7658),n(4509));const b=(0,v.ZP)("http://localhost:3000");var f={data(){return{dots:[],dragging:!1,activeDotIndex:-1,showLabelInput:!1,labelInput:"",editingIndex:null,userId:null,draggingDotIndex:null,dotColor:null}},created(){this.userId=Math.random().toString(36).substr(2,9),this.dotColor=`rgb(${255*Math.random()}, ${255*Math.random()}, ${255*Math.random()})`,b.on("initDots",(t=>{console.log("init"),this.dots=[...t]})),b.on("addDot",(t=>{t.userId!==this.userId&&this.dots.push(t)})),b.on("save-label",(t=>{if(t.userId!==this.userId){let e=this.dots.find((e=>e.dotId===t.dotId));e.label=t.label}})),b.on("make-public",(t=>{if(t.userId!==this.userId){let e=this.dots.find((e=>e.dotId===t.dotId));e.public=t.public}})),b.on("drag",(t=>{if(t.userId!==this.userId){let e=this.dots.find((e=>e.dotId===t.dotId));e.x=t.x,e.y=t.y}}))},methods:{addDot(){const t=Math.floor(81*Math.random())+10,e={x:t,y:10,label:"",backgroundColor:this.dotColor,userId:this.userId,dotId:Math.random().toString(36).substr(2,9),public:!1};this.dots.push(e),b.emit("addDot",e)},startDrag(t){const e=this.dots[t];e.userId===this.userId&&(e.public||(e.public=!0,b.emit("make-public",e)),console.log("start drag"),this.dragging=!0,this.activeDotIndex=t,this.draggingDotIndex=t,this.onMouseMoveListener=t=>this.handleDrag(t),this.onMouseUpListener=()=>this.stopDrag(),window.addEventListener("mousemove",this.onMouseMoveListener),window.addEventListener("mouseup",this.onMouseUpListener))},handleDrag(t){if(console.log("dragging"),this.dragging&&-1!==this.activeDotIndex){const e=window.innerWidth,n=window.innerHeight,i=t.clientX/e*100,o=t.clientY/n*100;this.dots[this.activeDotIndex].x=i,this.dots[this.activeDotIndex].y=o}b.emit("drag",this.dots[this.activeDotIndex])},stopDrag(){this.dragging=!1,this.activeDotIndex=-1,console.log("stop drag"),window.removeEventListener("mousemove",this.onMouseMoveListener),window.removeEventListener("mouseup",this.onMouseUpListener)},startLabelEditing(t){const e=this.dots[t];e.userId===this.userId&&(this.editingIndex=t,this.labelInput=e.label,this.showLabelInput=!0)},saveLabel(){null!==this.editingIndex&&(this.dots[this.editingIndex].label=this.labelInput,this.showLabelInput=!1,b.emit("save-label",this.dots[this.editingIndex]),this.editingIndex=null)}}},m=f,I=(0,u.Z)(m,g,p,!1,null,"1366b81f",null),x=I.exports,w={name:"App",components:{BellCurveChart:c,DraggableDot:x}},y=w,C=(0,u.Z)(y,o,s,!1,null,null,null),D=C.exports;i.ZP.config.productionTip=!1,new i.ZP({render:t=>t(D)}).$mount("#app")}},e={};function n(i){var o=e[i];if(void 0!==o)return o.exports;var s=e[i]={exports:{}};return t[i].call(s.exports,s,s.exports,n),s.exports}n.m=t,function(){var t=[];n.O=function(e,i,o,s){if(!i){var r=1/0;for(u=0;u<t.length;u++){i=t[u][0],o=t[u][1],s=t[u][2];for(var l=!0,a=0;a<i.length;a++)(!1&s||r>=s)&&Object.keys(n.O).every((function(t){return n.O[t](i[a])}))?i.splice(a--,1):(l=!1,s<r&&(r=s));if(l){t.splice(u--,1);var d=o();void 0!==d&&(e=d)}}return e}s=s||0;for(var u=t.length;u>0&&t[u-1][2]>s;u--)t[u]=t[u-1];t[u]=[i,o,s]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,i){var o,s,r=i[0],l=i[1],a=i[2],d=0;if(r.some((function(e){return 0!==t[e]}))){for(o in l)n.o(l,o)&&(n.m[o]=l[o]);if(a)var u=a(n)}for(e&&e(i);d<r.length;d++)s=r[d],n.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return n.O(u)},i=self["webpackChunkchanging_paradigms"]=self["webpackChunkchanging_paradigms"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(7660)}));i=n.O(i)})();
//# sourceMappingURL=app.78a110ce.js.map