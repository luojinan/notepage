import{d as _,a5 as u,o as e,c as t,H as i,I as l,k as h,t as n,e as p}from"./framework.b450deef.js";const g={class:"grid grid-cols-2 gap-2 list mt-4"},m={class:"test p-l-4 min-h-20 b-solid b-transparent hover:b-indigo b-rd-2 b-1"},v={class:"color-indigo"},k={key:0},b=["onClick"],f=_({__name:"IndexPage",props:{list:null},setup(c){const a=u(),d=r=>{a.go(`./notepage/${r.path}`)};return(r,x)=>(e(),t("div",g,[(e(!0),t(i,null,l(c.list,s=>(e(),t("div",m,[h("h3",v,n(s.title),1),s.childs&&s.childs.length>0?(e(),t("ul",k,[(e(!0),t(i,null,l(s.childs,o=>(e(),t("li",{class:"hover:color-indigo hover:underline cursor-pointer",onClick:y=>d(o)},n(o.emoji)+" "+n(o.title),9,b))),256))])):p("",!0)]))),256))]))}});export{f as _};
