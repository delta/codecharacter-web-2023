import{r as e,c as a,j as t,u as r,k as s,ap as n,d as c,A as l,_ as i,F as o,aP as d,aQ as h,aR as m,Z as u,$ as p,C as _,e as g}from"./index-77b4db63.js";import{g as N}from"./Avatar-86792f54.js";import{u as b,c as A}from"./ThemeProvider-cc165be1.js";import{M as f}from"./Modal-8e5076f0.js";import{B as v}from"./Button-df935d27.js";import{D as y}from"./Dropdown-cc4dc290.js";import{u as C,T}from"./TourProvider-7be1086a.js";import"./setPrototypeOf-5f9718cf.js";import"./createWithBsPrefix-63fb65a8.js";import"./index-06bcf729.js";import"./divWithClassName-9a47a22b.js";import"./extends-64d70faf.js";import"./react-lifecycles-compat.es-642e4ba5.js";const k=e.forwardRef((({bsPrefix:e,className:t,striped:r,bordered:s,borderless:n,hover:c,size:l,variant:i,responsive:o,...d},h)=>{const m=b(e,"table"),u=A(t,m,i&&`${m}-${i}`,l&&`${m}-${l}`,r&&`${m}-${"string"==typeof r?`striped-${r}`:"striped"}`,s&&`${m}-bordered`,n&&`${m}-borderless`,c&&`${m}-hover`),p=a("table",{...d,className:u,ref:h});if(o){let e=`${m}-responsive`;return"string"==typeof o&&(e=`${e}-${o}`),a("div",{className:e,children:p})}return p})),w={header:"_header_1rpg2_1",header__icon:"_header__icon_1rpg2_14",header__title:"_header__title_1rpg2_20",mainleaderboard:"_mainleaderboard_1rpg2_27",ranklist:"_ranklist_1rpg2_33",list:"_list_1rpg2_42",item:"_item_1rpg2_53",tier3:"_tier3_1rpg2_62",tier2:"_tier2_1rpg2_68",tier1:"_tier1_1rpg2_74",tier0:"_tier0_1rpg2_80",currentUserItem:"_currentUserItem_1rpg2_86",tierheader:"_tierheader_1rpg2_93",pos:"_pos_1rpg2_97",pic:"_pic_1rpg2_105",name:"_name_1rpg2_113",score:"_score_1rpg2_126",tableHeader:"_tableHeader_1rpg2_155",attackButton:"_attackButton_1rpg2_167",attackImg:"_attackImg_1rpg2_181",paginationouter:"_paginationouter_1rpg2_186",pagination:"_pagination_1rpg2_186",menuText:"_menuText_1rpg2_206",menuBackground:"_menuBackground_1rpg2_211",matchHeader:"_matchHeader_1rpg2_215",headerText:"_headerText_1rpg2_222",matchBody:"_matchBody_1rpg2_230",matchFooter:"_matchFooter_1rpg2_240",matchModalBtn:"_matchModalBtn_1rpg2_245",content:"_content_1rpg2_257",button:"_button_1rpg2_261",menu:"_menu_1rpg2_206","dropdown-toggle":"_dropdown-toggle_1rpg2_286"};function S(){const[h,m]=e.useState(0),[u,p]=e.useState([]),[_,g]=e.useState([]),[b,A]=e.useState(!1),f=r(s).username;function v(){let e=!1;return 0==_.length&&(e=!0),e}e.useEffect((()=>{y(h)}),[h]),e.useEffect((()=>{v()}),[_]);const y=e=>{A(!1);const a=new n(c);a.getDailyChallengeLeaderBoard(e,8).then((e=>{p(e),A(!0)})).catch((e=>{e instanceof l&&i.error(e.message)})),a.getDailyChallengeLeaderBoard(e+1,8).then((e=>{g(e)})).catch((e=>{e instanceof l&&i.error(e.message)}))};return t(o,{children:[a(o,{children:b?a(o,{children:a("div",{className:w.list,children:t(k,{hover:!0,className:w.list,responsive:!0,children:[a("thead",{children:t("tr",{className:w.tableHeader,children:[a("th",{className:w.tableHeader,children:"RANK"}),a("th",{className:w.tableHeader,children:"USERNAME"}),a("th",{className:w.tableHeader,children:"SCORE"})]})}),a("tbody",{children:u&&u.map((e=>t("tr",{className:w.item+" "+(f===e.userName?w.currentUserItem:""),children:[a("td",{className:w.pos,children:u.indexOf(e)+1+8*h}),a("td",{className:w.name,children:t("div",{children:[a("img",{className:w.pic,src:N(e.avatarId).url})," "+e.userName.substring(0,10)]})}),a("td",{className:w.score,children:e.score})]},e.userName)))})]})})}):a(d,{})}),t("nav",{className:w.paginationouter,children:[a("button",{type:"button",className:w.button,onClick:()=>{0!==h&&m((e=>e-1))},children:"<"}),a("button",{type:"button",className:w.button,onClick:()=>{v()?i("You're at the last page"):m((e=>e+1))},children:">"}),a("button",{type:"button",className:w.button,onClick:()=>{y(0),m(0)},children:"Refresh"})]})]})}function B(){return t("div",{className:w.body,children:[a("div",{className:w.header,children:a("h1",{className:w.header__title,children:a("span",{children:"Daily Challenge Leaderboard"})})}),a("div",{className:w.ranklist,children:a(S,{})})]})}const I="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAhCAYAAACxzQkrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ5SURBVHgBvZfdbdswEMdPRP0uA/54bLqBO0HrCZpMUHuCuhPUmaDtBHEnaDaIN0gygfPmT8B+N2Dn/gHlUDRJHSkkf0CAJPLufiLvTlJGhjabzeXhcPhNZT01Go2rZrO5oxrabrf5fr//z6cX5n2l1M9Wq3VbXH8wBxkmtw1wzY7u2GE/FUrD3PFpzx7TMV8BSaaehsopUiEYl6RASVCxMLFAUVBSGM6hnReo0+lMjsfjP6oJJYVBLDOhocw1cblcTrIs+05hPXD1nSV6DEy32x3Y9zOfQQpUXRjIm0MwiN0+gLHNIyXCQBlVKGWlfDZVMCKgUIAYKAmMGMgVIAZKChMFlAq1Wq0GaCckVBRQKlSMooHeGioJ6C2hSn0I/YT3/Idroh67KXpOSp+yhfyyx5QZUHfZP+v1+pcNo8cGZoA6UDrGjT12AjJbPgcZF1CO10GvLhR8I4Y5Vkw85RCWD8SmF86RMRtekvvdNOVy7hcX0pziOVP2ObLuD4vWUEpqF1SFJuxoGAlFPhjo7HsIE0goftLSAwm3zwsDOcteslKh14FwpYauDu78/GBnHykRBpKslC/G2QpZFeDSAz/ZZxKIV/qeAh9rKJp2u31t3lORMFDP7lMu6TlVX45j25cSwkz42IUc2TCWL9j+JQGU8jgwDa51afdJAOWB6bOPEXxVQanFYjEKwXCCvoyxQzS1K3Ocf4M/2Tb2PdjAFufwFYICi2KDL1UwhTgBp6T7lK/SrAobahtz3AvFP43fMq4EJB7eJXkIxhQv71c7UOwc7lVjXgxzy1+29mTMYFs+jphI7yTEQkwdu1yRs9ksn8/nF/TOQlwcxfUzgG9tQKw/RCgAAAAASUVORK5CYII=";function x(){const[n,_]=e.useState(0),[g,b]=e.useState([]),[A,C]=e.useState([]),[T,S]=e.useState(!1),[B,x]=e.useState(!1),[H,M]=e.useState(""),[R,U]=e.useState(void 0),j=()=>x(!1),D=r(s).username;function E(){let e=!1;return 0==A.length&&(e=!0),e}e.useEffect((()=>{O(n,R)}),[n]),e.useEffect((()=>{E()}),[A]);const O=(e,a)=>{S(!1);const t=new h(c);t.getLeaderboard(e,8,a).then((e=>{b(e),S(!0)})).catch((e=>{e instanceof l&&i.error(e.message)})),t.getLeaderboard(e+1,8,a).then((e=>{C(e),S(!0)})).catch((e=>{e instanceof l&&i.error(e.message)}))};return t(o,{children:[a(o,{children:T?a(o,{children:t("div",{className:w.list,children:[t(f,{show:B,onHide:j,contentClassName:w.content,children:[t(f.Header,{className:w.matchHeader,children:[a(f.Title,{className:w.headerText,children:"Start a new match"}),a("button",{type:"button",className:"btn-close btn-close-white","aria-label":"Close",onClick:j})]}),t(f.Body,{className:w.matchBody,children:["Do you want to start a match against ",H,"?"]}),a(f.Footer,{className:w.matchFooter,children:a(v,{className:w.matchModalBtn,variant:"outline-light",size:"lg",onClick:()=>async function(){new u(c).createMatch({mode:p.Manual,opponentUsername:H,codeRevisionId:void 0,mapRevisionId:void 0}).catch((e=>{e instanceof l&&i.error(e.message)})),x(!1)}(),children:"Start match"})})]}),t(k,{hover:!0,className:w.list,responsive:!0,children:[a("thead",{children:t("tr",{className:w.tableHeader,children:[a("th",{className:w.tableHeader,children:"RANK"}),a("th",{className:w.tableHeader,children:"USERNAME"}),a("th",{className:w.tableHeader,children:"RATINGS"}),a("th",{className:w.tableHeader}),a("th",{className:w.tableHeader,children:"WON"}),a("th",{className:w.tableHeader,children:"LOST"}),a("th",{className:w.tableHeader,children:"TIED"})]})}),a("tbody",{children:g&&g.map((e=>t("tr",{className:w.item+" "+(D===e.user.username?w.currentUserItem:""),children:[a("td",{className:w.pos,children:g.indexOf(e)+1+8*n}),a("td",{className:w.name,children:t("div",{children:[a("img",{className:w.pic,src:N(e.user.avatarId).url})," "+e.user.username.substring(0,10)]})}),a("td",{className:w.score,children:e.stats.rating.toFixed(3)}),D===e.user.username?a("td",{className:w.score,children:"---"}):a("td",{className:w.attackButton,onClick:()=>{return a=e.user.username,M(a),void x(!0);var a},children:a("img",{className:w.attackImg,src:I})}),a("td",{className:w.score,children:e.stats.wins}),a("td",{className:w.score,children:e.stats.losses}),a("td",{className:w.score,children:e.stats.ties})]},e.user.username)))})]})]})}):a(d,{})}),t("nav",{className:w.paginationouter,children:[a("button",{type:"button",className:w.button,onClick:()=>{0!==n&&_((e=>e-1))},children:"<"}),a("button",{type:"button",className:w.button,onClick:()=>{E()?i("You're at the last page"):_((e=>e+1))},children:">"}),a("button",{type:"button",className:w.button,onClick:()=>{O(0,R),_(0)},id:"refresh",children:"Refresh"}),t(y,{id:"tiers",children:[a(y.Toggle,{variant:"dark",className:w.button,children:(null==R?void 0:R.toString())||"All Tiers"}),t(y.Menu,{className:w.menuBackground,children:[a(y.Item,{className:w.menuText,onClick:()=>{U(void 0),O(0)},children:"All Tiers"}),a(y.Item,{className:w.menuText,onClick:()=>{U(m.Tier1),O(0,m.Tier1)},children:"Tier 1"}),a(y.Item,{className:w.menuText,onClick:()=>{U(m.Tier2),O(0,m.Tier2)},children:"Tier 2"})]})]})]})]})}function H(){return t("div",{className:w.body,children:[a("div",{className:w.header,children:a("h1",{className:w.header__title,children:a("span",{children:"Match Leaderboard"})})}),a("div",{className:w.ranklist,children:a(x,{})})]})}function M(){const[r,s]=e.useState(!1);e.useState("Daily Challenge Leaderboard");const{setIsOpen:n}=C(),l=new _(c);return e.useEffect((()=>{setTimeout((()=>{l.getCurrentUser().then((e=>{!1===e.isTutorialComplete&&3==e.tutorialLevel&&n(!0)}))}),200)}),[]),t("div",{className:w.mainleaderboard,id:"LeaderBoard",children:[a(r?B:H,{}),a(o,{})]})}const R=[{selector:"#LeaderBoard",content:"This is the Leaderboard, you can rank up by winning more games. You can also view your daily challenge ranking by clicking on the daily challenge leaderboard button."},{selector:"#refresh",content:"Click here to refresh the leaderboard."},{selector:"#tiers",content:"Switch to filter players by tier."}],U=()=>{const e=new _(c),t=r(s),n=g();return a(T,{setOpened:a=>{!1===a&&e.updateCurrentUser({name:t.name,country:t.country,college:t.college,updateTutorialLevel:"NEXT"}).then((()=>{n("/history",{replace:!0})})).catch((e=>{e instanceof l&&i.error(e.message)}))},steps:R,children:a(M,{})})};export{U as default};
