(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8f3476e6"],{"0d43":function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container container-padding grid-md"},[e("div",{staticClass:"columns"},[e("div",{staticClass:"column col-6 col-sm-12"},[e("balance"),e("dashboard")],1),e("div",{staticClass:"column col-6 col-sm-12"},[e("tinterface")],1)])])},a=[],n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"section"},[e("div",{staticClass:"section-item section-item-filled"},[e("div",{staticClass:"toast mb"},[e("div",{staticClass:"mb05"},[t._v("Mining "),e("span",{staticClass:"text-primary"},[t._v("1 SVX")]),t._v(" Burns "),e("span",{staticClass:"text-warning text-semibold"},[t._v(t._s(t.miningCost)+" SOV")])]),e("ul",{staticClass:"text-sm"},[e("li",[t._v("Reward per action: "),e("span",{staticClass:"text-primary"},[t._v(t._s(t.miningRate))]),t._v(" SVX")]),e("li",[t._v("Reward per transaction: "),e("span",{staticClass:"text-primary"},[t._v(t._s(t.total.miningRate))]),t._v(" SVX")]),e("li",[t._v("Total Burn per ransaction: "),e("span",{staticClass:"text-error"},[t._v(t._s(t.total.burn))]),t._v(" SOV")]),e("li",[t._v("Bonus for staking SVX: "),e("span",{class:[t.bonus>=50?"text-success":"text-warning"]},[t._v(t._s(t.bonus)+"%")])])])]),e("div",{staticClass:"form-group mb05"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.targetMiningRate,expression:"targetMiningRate"}],staticClass:"form-input",attrs:{type:"number",min:"0",step:"0.01",required:""},domProps:{value:t.targetMiningRate},on:{input:function(s){s.target.composing||(t.targetMiningRate=s.target.value)}}}),e("label",[t._v("Mining rate")])]),e("div",{staticClass:"text-sm text-secondary mb"},[t._v(" Mine when single action reward is ≥ "+t._s(t.targetMiningRate)+" ")]),e("button",{staticClass:"btn btn-primary btn-block mb05",on:{click:t.submit}},[t._v(" Burn mine x"+t._s(t.range)+" ")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.range,expression:"range"}],staticClass:"slider mb",attrs:{type:"range",min:"1",max:"200",step:"1"},domProps:{value:t.range},on:{__r:function(s){t.range=s.target.value}}}),e("label",{staticClass:"form-switch flex-centered-vertical"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.isAuto,expression:"isAuto"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.isAuto)?t._i(t.isAuto,null)>-1:t.isAuto},on:{change:function(s){var e=t.isAuto,i=s.target,a=!!i.checked;if(Array.isArray(e)){var n=null,o=t._i(e,n);i.checked?o<0&&(t.isAuto=e.concat([n])):o>-1&&(t.isAuto=e.slice(0,o).concat(e.slice(o+1)))}else t.isAuto=a}}}),e("i",{staticClass:"form-icon"}),e("span",{staticClass:"text-secondary text-sm ml05"},[t._v("Auto mine")])])]),e("div",{staticClass:"text-sm text-secondary text-center"},[t._v("Bundled burn mining actions per transaction")])])},o=[],r=e("2f62"),l={data:()=>({targetMiningRate:0,quantity:150,range:1,isAuto:!1,miningRate:0,bonus:0,pollingIsAuto:null,polling:null}),computed:{...Object(r["b"])({eos:t=>t.blockchain.eos,scatter:t=>t.blockchain.scatter}),total(){return{miningRate:parseFloat((this.miningRate*this.range).toFixed(4))||0,burn:parseFloat((.014*this.quantity*this.range).toFixed(2))||0}},miningCost(){const t=(this.total.burn/this.total.miningRate).toFixed(4);return t==1/0?0:t}},watch:{scatter(t){t&&this.getData()},isAuto(t){if(t)return this.submit(),this.pollingIsAuto=setInterval(()=>this.submit(),5e3),this.$notice.info("Auto mine <b>start</b>"),!1;this.pollingIsAuto&&(clearInterval(this.pollingIsAuto),this.$notice.warning("Auto mine <b>stop</b>"))}},mounted(){this.polling=setInterval(()=>this.getData(),1e3)},methods:{getData(){const t=this.eos.getTableRows({json:"true",code:"svxmintofeos",scope:"svxmintofeos",table:"accounts"}),s=this.eos.getTableRows({json:"true",code:"svxmintofeos",scope:"SVX",table:"stat"}),e=this.eos.getTableRows({json:"true",code:"svxmintofeos",scope:this.scatter.name,table:"accounts"});Promise.all([t,s,e]).then(t=>{const s=parseFloat(t[0].rows[0].balance),e=parseFloat(t[1].rows[0].supply),i=parseFloat(t[2].rows[0].svxpower);let a=i/e*1e4;a=a>50?50:Math.floor(parseFloat(a).toFixed(2));let n=s/2e4*(1+a/100)*1;this.miningRate=parseFloat(n.toFixed(4)),this.miningBonus=a})},submit(){this.miningRate>this.targetMiningRate&&this.eos.transaction({actions:[{account:"sovmintofeos",name:"transfer",authorization:[{actor:this.scatter.name,permission:"active"}],data:{from:this.scatter.name,to:"sovdexrelays",quantity:this.$options.filters.eosAmountFormat(this.quantity,"SOV"),memo:"mine SVX"}}]}).then(()=>{console.log("[mine] Success"),this.isAuto||this.$notice.success("Mine success")}).catch(t=>console.error(t))}},beforeDestroy(){this.polling&&clearInterval(this.polling)}},c=l,u=(e("6511"),e("2877")),m=Object(u["a"])(c,n,o,!1,null,"4495aaf6",null),p=m.exports,g={components:{tinterface:p}},d=g,v=Object(u["a"])(d,i,a,!1,null,null,null);s["default"]=v.exports},6511:function(t,s,e){"use strict";var i=e("86b4"),a=e.n(i);a.a},"86b4":function(t,s,e){}}]);
//# sourceMappingURL=chunk-8f3476e6.js.map