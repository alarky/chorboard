(function(e){function t(t){for(var o,r,i=t[0],s=t[1],u=t[2],b=0,d=[];b<i.length;b++)r=i[b],Object.prototype.hasOwnProperty.call(c,r)&&c[r]&&d.push(c[r][0]),c[r]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);v&&v(t);while(d.length)d.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,i=1;i<n.length;i++){var s=n[i];0!==c[s]&&(o=!1)}o&&(a.splice(t--,1),e=r(r.s=n[0]))}return e}var o={},c={app:0},a=[];function r(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var v=s;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"08eb":function(e,t,n){"use strict";n("2f90")},"2f90":function(e,t,n){},"3e40":function(e,t,n){"use strict";n("7146")},"6da7":function(e,t,n){},"6e08":function(e,t,n){"use strict";n("ee24")},7146:function(e,t,n){},"7e9b":function(e,t,n){},"82c9":function(e,t,n){"use strict";n("e1b2")},"96b9":function(e,t,n){"use strict";n("cdb2")},bff9:function(e,t,n){"use strict";n("7e9b")},c1c3:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("7a23"),c={class:"view-container"};function a(e,t,n,a,r,i){var s=Object(o["w"])("router-view");return Object(o["p"])(),Object(o["d"])("div",{class:"app",onMousedown:t[1]||(t[1]=function(){return e.mouseDown&&e.mouseDown.apply(e,arguments)}),onMouseup:t[2]||(t[2]=function(){return e.mouseUp&&e.mouseUp.apply(e,arguments)}),onMouseleave:t[3]||(t[3]=function(){return e.mouseUp&&e.mouseUp.apply(e,arguments)})},[Object(o["g"])("div",c,[Object(o["g"])(s)])],32)}var r=n("b85c"),i=(n("a4d3"),n("e01a"),n("d3b7"),n("b64b"),n("5502")),s=n("d4ec"),u=(n("ddb0"),function e(){var t=this;Object(s["a"])(this,e),this.inputs=[],this.outputs=[],this.noteOnHandler=function(e,t){console.log(e,t)},this.noteOffHandler=function(e,t){console.log(e,t)},navigator.requestMIDIAccess({sysex:!0}).then((function(e){var n=e.inputs.values(),o=e.outputs.values(),c=n.next();while(!c.done)t.inputs.push(c.value),c=n.next();var a=o.next();while(!a.done)t.outputs.push(a.value),a=o.next();var i,s=Object(r["a"])(t.inputs);try{for(s.s();!(i=s.n()).done;){var u=i.value;u.onmidimessage=function(e){switch(240&e.data[0]){case 144:t.noteOnHandler(e.data[1],e.data[2]);break;case 128:t.noteOffHandler(e.data[1],e.data[2]);break;default:console.log("other midi message: ",e.data);break}}}}catch(v){s.e(v)}finally{s.f()}}),(function(e){console.log(e)}))}),v=new u,b=v,d=n("bee2"),l=(n("b0c0"),n("99af"),{0:"C",1:"C#",2:"D",3:"D#",4:"E",5:"F",6:"F#",7:"G",8:"G#",9:"A",10:"A#",11:"B"}),f=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments.length>2&&void 0!==arguments[2]&&arguments[2];Object(s["a"])(this,e),this.number=0,this.velocity=0,this.name="",this.octave=0,this.isAuto=!1,this.number=t,this.velocity=n;var c=t%12;this.name=l[c],this.octave=(t-c)/12,this.isAuto=o}return Object(d["a"])(e,[{key:"asStr",get:function(){return"".concat(this.name).concat(this.octave)}},{key:"normalizedVelocity",get:function(){return this.velocity/127}}]),e}(),O=n("5530"),h=(n("07ac"),n("5e54")),j=function(){function e(){Object(s["a"])(this,e),this.synth=(new h["a"]).toDestination(),this.activeNotes={}}return Object(d["a"])(e,[{key:"update",value:function(e){for(var t=0,n=Object.values(e);t<n.length;t++){var o=n[t];if(!this.activeNotes[o.number]){var c=h["b"]();this.synth.triggerAttack(o.asStr,c,o.normalizedVelocity)}}for(var a=0,r=Object.values(this.activeNotes);a<r.length;a++){var i=r[a];if(!e[i.number]){var s=h["b"]();this.synth.triggerRelease(i.asStr,s)}}this.activeNotes=Object(O["a"])({},e)}}]),e}(),m=new j,p=m,g=Symbol(),y=Object(i["a"])({state:{mouseIsDown:!1,keyIsDown:{},activeOctave:4,activeNotes:{},chords:{},activeChords:{}},mutations:{mouseIsDown:function(e,t){var n=t.v;e.mouseIsDown=n},keyDown:function(e,t){var n=t.v;e.keyIsDown[n]=!0},keyUp:function(e,t){var n=t.v;e.keyIsDown[n]=!1},activeOctave:function(e,t){var n=t.v;e.activeOctave=n},addNote:function(e,t){var n=t.v;e.activeNotes[n.number]=n},delNote:function(e,t){var n=t.v;delete e.activeNotes[n]},addChord:function(e,t){var n=t.v;e.chords[n.id]=n},setChordBaseNote:function(e,t){var n=t.id,o=t.v;e.chords[n].baseNote=o},setChordType:function(e,t){var n=t.id,o=t.v;e.chords[n].chordType=o},rotateChord:function(e,t){var n=t.id,o=t.v;e.chords[n].rotate(o)},onChord:function(e,t){var n=t.v;e.activeChords[n]=e.chords[n],e.activeNotes={};for(var o=0,c=Object.keys(e.activeChords);o<c.length;o++){var a,i=c[o],s=Object(r["a"])(e.activeChords[i].notes);try{for(s.s();!(a=s.n()).done;){var u=a.value;e.activeNotes[u.number]=u}}catch(v){s.e(v)}finally{s.f()}}p.update(e.activeNotes)},offChord:function(e,t){var n=t.v;delete e.activeChords[n],e.activeNotes={};for(var o=0,c=Object.keys(e.activeChords);o<c.length;o++){var a,i=c[o],s=Object(r["a"])(e.activeChords[i].notes);try{for(s.s();!(a=s.n()).done;){var u=a.value;e.activeNotes[u.number]=u}}catch(v){s.e(v)}finally{s.f()}}p.update(e.activeNotes)}},actions:{},modules:{}});b.noteOnHandler=function(e,t){var n=(e-e%12)/12,o=n-y.state.activeOctave;if(o>2?y.commit("activeOctave",{v:n-2}):o<0&&y.commit("activeOctave",{v:n}),t>0){var c=new f(e,t);y.commit("addNote",{v:c})}else y.commit("delNote",{v:e})},b.noteOffHandler=function(e,t){y.commit("delNote",{v:e})};var N=function(){return Object(i["b"])(g)},w=Object(o["h"])({name:"App",setup:function(){var e=N(),t=Object(o["b"])((function(){return e.state.mouseIsDown})),n=function(){e.commit("mouseIsDown",{v:!0})},c=function(){e.commit("mouseIsDown",{v:!1})};return window.addEventListener("keydown",(function(t){e.commit("keyDown",{v:t.key})})),window.addEventListener("keyup",(function(t){e.commit("keyUp",{v:t.key})})),{state:e.state,mouseIsDown:t,mouseDown:n,mouseUp:c}}});n("08eb");w.render=a;var M=w,S=n("9483");Object(S["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var k=n("6c02"),C=Object(o["E"])("data-v-3733a324");Object(o["s"])("data-v-3733a324");var A={class:"header"},D=Object(o["g"])("div",{class:"title"},[Object(o["g"])("h1",null,"ChorBoard"),Object(o["f"])(" beta ")],-1),K={class:"controls"};Object(o["q"])();var F=C((function(e,t,n,c,a,r){var i=Object(o["w"])("ActiveOctave"),s=Object(o["w"])("ChordBoard"),u=Object(o["w"])("KeyBoard");return Object(o["p"])(),Object(o["d"])("div",null,[Object(o["g"])("div",A,[D,Object(o["g"])("div",K,[Object(o["g"])(i)])]),Object(o["g"])(s),Object(o["g"])(u)])})),I=Object(o["E"])("data-v-5c63e04b");Object(o["s"])("data-v-5c63e04b");var _={class:"keyboard"},E={class:"keys"},T={class:"black-keys"},B=Object(o["g"])("div",{class:"spacer"},null,-1),x=Object(o["g"])("div",{class:"spacer"},null,-1),U=Object(o["g"])("div",{class:"spacer"},null,-1),q={class:"white-keys"};Object(o["q"])();var P=I((function(e,t,n,c,a,r){var i=Object(o["w"])("Key");return Object(o["p"])(),Object(o["d"])("div",_,[Object(o["g"])("div",E,[Object(o["g"])("div",T,[Object(o["g"])(i,{number:1}),Object(o["g"])(i,{number:3}),B,Object(o["g"])(i,{number:6}),Object(o["g"])(i,{number:8}),Object(o["g"])(i,{number:10}),x,Object(o["g"])(i,{number:13}),Object(o["g"])(i,{number:15}),U,Object(o["g"])(i,{number:18}),Object(o["g"])(i,{number:20}),Object(o["g"])(i,{number:22})]),Object(o["g"])("div",q,[Object(o["g"])(i,{number:0}),Object(o["g"])(i,{number:2}),Object(o["g"])(i,{number:4}),Object(o["g"])(i,{number:5}),Object(o["g"])(i,{number:7}),Object(o["g"])(i,{number:9}),Object(o["g"])(i,{number:11}),Object(o["g"])(i,{number:12}),Object(o["g"])(i,{number:14}),Object(o["g"])(i,{number:16}),Object(o["g"])(i,{number:17}),Object(o["g"])(i,{number:19}),Object(o["g"])(i,{number:21}),Object(o["g"])(i,{number:23}),Object(o["g"])(i,{number:24})])])])})),H=Object(o["E"])("data-v-c37e29b4"),V=H((function(e,t,n,c,a,r){return Object(o["p"])(),Object(o["d"])("div",{class:["key",{black:e.isBlack,white:!e.isBlack,active:e.isActive,auto:e.isAuto}],onMousedown:t[1]||(t[1]=function(){return e.on&&e.on.apply(e,arguments)}),onMouseup:t[2]||(t[2]=function(){return e.off&&e.off.apply(e,arguments)}),onMouseout:t[3]||(t[3]=function(){return e.off&&e.off.apply(e,arguments)}),onMouseenter:t[4]||(t[4]=function(){return e.mouseEnter&&e.mouseEnter.apply(e,arguments)})},null,34)})),G=(n("a9e3"),n("caad"),Object(o["h"])({name:"Key",props:{number:{type:Number,default:0}},setup:function(e){var t=N(),n=Object(o["b"])((function(){return 12*t.state.activeOctave+e.number})),c=Object(o["b"])((function(){var e=t.state.activeNotes[n.value];return!!e&&!e.isAuto})),a=Object(o["b"])((function(){var e=t.state.activeNotes[n.value];return!!e&&e.isAuto})),r=function(){var e=new f(n.value,64);t.commit("addNote",{v:e})},i=function(){t.commit("delNote",{v:n.value})},s=function(){t.state.mouseIsDown&&r()},u=Object(o["b"])((function(){var e=n.value%12;return[1,3,6,8,10].includes(e)}));return{noteNumber:n,isActive:c,isAuto:a,on:r,off:i,mouseEnter:s,isBlack:u}}}));n("3e40");G.render=V,G.__scopeId="data-v-c37e29b4";var z=G,J=Object(o["h"])({name:"KeyBoard",components:{Key:z},setup:function(){return{}}});n("f478");J.render=P,J.__scopeId="data-v-5c63e04b";var L=J,R=Object(o["E"])("data-v-03606ee8");Object(o["s"])("data-v-03606ee8");var Q={class:"active-octave"},W=Object(o["g"])("div",{class:"label-container"},[Object(o["g"])("label",{for:"active-octave-input"},"OCTAVE")],-1);Object(o["q"])();var X=R((function(e,t,n,c,a,r){return Object(o["p"])(),Object(o["d"])("div",Q,[W,Object(o["g"])("div",null,[Object(o["D"])(Object(o["g"])("input",{type:"number",id:"active-octave-input","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.activeOctave=t}),min:"0",max:"9"},null,512),[[o["B"],e.activeOctave]])])])})),Y=Object(o["h"])({name:"ActiveOctave",setup:function(){var e=N(),t=Object(o["b"])({get:function(){return e.state.activeOctave},set:function(t){return e.commit("activeOctave",{v:Number(t)})}});return{activeOctave:t}}});n("bff9");Y.render=X,Y.__scopeId="data-v-03606ee8";var Z=Y,$=Object(o["E"])("data-v-721b6e13");Object(o["s"])("data-v-721b6e13");var ee={class:"chord-board"},te={class:"keys"},ne={class:"keys"};Object(o["q"])();var oe=$((function(e,t,n,c,a,r){var i=Object(o["w"])("ChordKey");return Object(o["p"])(),Object(o["d"])("div",ee,[Object(o["g"])("div",te,[Object(o["g"])(i,{onKey:"q",baseNoteName:"C",chordName:"Major"}),Object(o["g"])(i,{onKey:"w",baseNoteName:"D",chordName:"Minor"}),Object(o["g"])(i,{onKey:"e",baseNoteName:"E",chordName:"Minor"}),Object(o["g"])(i,{onKey:"r",baseNoteName:"F",chordName:"Major"}),Object(o["g"])(i,{onKey:"t",baseNoteName:"G",chordName:"Major"}),Object(o["g"])(i,{onKey:"y",baseNoteName:"A",chordName:"Minor"}),Object(o["g"])(i,{onKey:"u",baseNoteName:"B",chordName:"MinorFlatFive"})]),Object(o["g"])("div",ne,[Object(o["g"])(i,{onKey:"a",baseNoteName:"C",chordName:"MajorSeventh"}),Object(o["g"])(i,{onKey:"s",baseNoteName:"D",chordName:"MinorSeventh"}),Object(o["g"])(i,{onKey:"d",baseNoteName:"E",chordName:"MinorSeventh"}),Object(o["g"])(i,{onKey:"f",baseNoteName:"F",chordName:"MajorSeventh"}),Object(o["g"])(i,{onKey:"g",baseNoteName:"G",chordName:"Seventh"}),Object(o["g"])(i,{onKey:"h",baseNoteName:"A",chordName:"MinorSeventh"}),Object(o["g"])(i,{onKey:"j",baseNoteName:"B",chordName:"MinorSeventhFlatFive"})])])})),ce=Object(o["E"])("data-v-729f5a62");Object(o["s"])("data-v-729f5a62");var ae={class:"chord-key"},re={class:"chord-key-edit-row"},ie={class:"chord-key-edit-row space-top"},se={class:"on-note-selector"},ue={key:0},ve=Object(o["g"])("div",{class:"material-icons material-icons-outlined"}," rotate_left ",-1),be=Object(o["g"])("div",{class:"material-icons material-icons-outlined"}," rotate_right ",-1),de={class:"on-key"};Object(o["q"])();var le=ce((function(e,t,n,c,a,r){return Object(o["p"])(),Object(o["d"])("div",ae,[Object(o["g"])("div",re,[Object(o["D"])(Object(o["g"])("select",{class:"base-note-selector","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.baseNote=t})},[(Object(o["p"])(!0),Object(o["d"])(o["a"],null,Object(o["v"])(e.noteNames,(function(e){return Object(o["p"])(),Object(o["d"])("option",{key:e,value:e},Object(o["y"])(e),9,["value"])})),128))],512),[[o["A"],e.baseNote]]),Object(o["D"])(Object(o["g"])("select",{class:"chord-selector space-left","onUpdate:modelValue":t[2]||(t[2]=function(t){return e.chordType=t})},[(Object(o["p"])(!0),Object(o["d"])(o["a"],null,Object(o["v"])(e.chordCymbols,(function(e,t){return Object(o["p"])(),Object(o["d"])("option",{key:t,value:t},Object(o["y"])(e),9,["value"])})),128))],512),[[o["A"],e.chordType]])]),Object(o["g"])("div",ie,[Object(o["g"])("select",se,[e.rootNoteName?(Object(o["p"])(),Object(o["d"])("option",ue,"/"+Object(o["y"])(e.rootNoteName),1)):Object(o["e"])("",!0)]),Object(o["g"])("div",{onClick:t[3]||(t[3]=function(t){return e.rotate(-1)}),class:"rotate space-left"},[ve]),Object(o["g"])("div",{onClick:t[4]||(t[4]=function(t){return e.rotate(1)}),class:"rotate space-left"},[be])]),Object(o["g"])("div",{class:["chord-key-button",{active:e.state.isOn}],onMousedown:t[5]||(t[5]=function(){return e.on&&e.on.apply(e,arguments)}),onMouseup:t[6]||(t[6]=function(){return e.off&&e.off.apply(e,arguments)}),onMouseout:t[7]||(t[7]=function(){return e.off&&e.off.apply(e,arguments)}),onMouseenter:t[8]||(t[8]=function(){return e.mouseEnter&&e.mouseEnter.apply(e,arguments)})},[Object(o["g"])("div",de,[Object(o["g"])("div",null,Object(o["y"])(e.onKey.toUpperCase()),1)])],34)])})),fe=(n("fb6a"),n("d81d"),{None:[0],Major:[0,4,7],Minor:[0,3,7],MinorFlatFive:[0,3,6],SusFour:[0,5,7],SusTwo:[0,2,7],Augmented:[0,4,8],Seventh:[0,4,7,10],MajorSeventh:[0,4,7,11],MinorSeventh:[0,3,7,10],MinorSeventhFlatFive:[0,3,6,10],MinorMajorSeventh:[0,3,7,11],SeventhSusFour:[0,5,7,10],SeventhSusTwo:[0,2,7,10],MajorSeventhSusFour:[0,5,7,11],MajorSeventhSusTwo:[0,2,7,11],AugmentedSeventh:[0,4,8,10],AugmentedMajorSeventh:[0,4,8,11],DiminishedSeventh:[0,3,6,9],Sixth:[0,4,7,9],MinorSixth:[0,3,7,9]}),Oe={Major:"",Minor:"m",MinorFlatFive:"m(b5)",SusFour:"sus4",SusTwo:"sus2",Augmented:"aug",Seventh:"7",MajorSeventh:"M7",MinorSeventh:"m7",MinorSeventhFlatFive:"m7(b5)",MinorMajorSeventh:"mM7",SeventhSusFour:"7sus4",SeventhSusTwo:"7sus2",MajorSeventhSusFour:"M7sus4",MajorSeventhSusTwo:"M7sus2",AugmentedSeventh:"aug7",AugmentedMajorSeventh:"augM7",DiminishedSeventh:"dim7",Sixth:"6",MinorSixth:"m6"},he=function(){function e(t,n,o){Object(s["a"])(this,e),this.id=t,this.baseNote=n,this.chordType=o,this.rotation=0}return Object(d["a"])(e,[{key:"notes",get:function(){var e=this,t=fe[this.chordType].slice();if(this.rotation>0)for(var n=0;n<this.rotation;n++){var o=t.shift()||0;t.push(o+12)}else if(this.rotation<0)for(var c=0;c<-this.rotation;c++){var a=t.pop()||0;t.unshift(a-12)}var r=t.map((function(t){return new f(e.baseNote.number+t,e.baseNote.velocity)}));return r}},{key:"rotate",value:function(e){this.rotation+=e}}]),e}(),je=Object(o["h"])({name:"ChordKey",props:{onKey:{type:String,default:""},baseNoteName:{type:String,default:"C"},chordName:{type:String,default:"None"}},setup:function(e){var t=N(),n=Object(o["t"])({isOn:!1}),c=Object(o["b"])((function(){return Object.values(l).reverse()})),a=Object(o["b"])((function(){return Oe})),r=function(e){var n=12*t.state.activeOctave;for(var o in l){var c=Number(o);if(l[c]==e)return n+c}return 0},i=new he(e.onKey,new f(r(e.baseNoteName),64),e.chordName);t.commit("addChord",{v:i});var s=Object(o["b"])((function(){return t.state.chords[e.onKey]})),u=Object(o["b"])({get:function(){return s.value.baseNote.name},set:function(e){t.commit("setChordBaseNote",{id:s.value.id,v:new f(r(e),64)})}}),v=Object(o["b"])({get:function(){return s.value.chordType},set:function(e){t.commit("setChordType",{id:s.value.id,v:e})}}),b=Object(o["b"])((function(){if(0==s.value.rotation)return"";var e=s.value.notes[0].number%12;return l[e]})),d=function(){n.isOn||(n.isOn=!0,t.commit("onChord",{v:s.value.id}))},O=function(){n.isOn&&(n.isOn=!1,t.commit("offChord",{v:s.value.id}))},h=function(e){t.commit("rotateChord",{id:s.value.id,v:e})};Object(o["C"])(t.state.keyIsDown,(function(t){t[e.onKey]?d():t[e.onKey]||O()}),{deep:!0});var j=function(){t.state.mouseIsDown&&d()};return{state:n,noteNames:c,chordCymbols:a,chord:s,baseNote:u,chordType:v,rootNoteName:b,rotate:h,on:d,off:O,mouseEnter:j}}});n("82c9");je.render=le,je.__scopeId="data-v-729f5a62";var me=je,pe=Object(o["h"])({name:"ChordBoard",components:{ChordKey:me},setup:function(){N();return{}}});n("6e08");pe.render=oe,pe.__scopeId="data-v-721b6e13";var ge=pe,ye=Object(o["h"])({name:"Main",components:{ChordBoard:ge,KeyBoard:L,ActiveOctave:Z},setup:function(){N();return{}}});n("96b9");ye.render=F,ye.__scopeId="data-v-3733a324";var Ne=ye,we=[{path:"/",name:"Main",component:Ne}],Me=Object(k["a"])({history:Object(k["b"])("/"),routes:we}),Se=Me,ke=(n("c1c3"),Object(o["c"])(M));ke.use(y,g),ke.use(Se),ke.mount("#app")},cdb2:function(e,t,n){},e1b2:function(e,t,n){},ee24:function(e,t,n){},f478:function(e,t,n){"use strict";n("6da7")}});
//# sourceMappingURL=app.488facae.js.map