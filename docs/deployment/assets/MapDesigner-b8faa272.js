import{C as e,d as o,u as t,k as s,e as r,c as a,A as n,_ as i}from"./index-77b4db63.js";import{M as p}from"./MapDesigner-02777947.js";import{T as c}from"./TourProvider-7be1086a.js";import"./Modal-8e5076f0.js";import"./ThemeProvider-cc165be1.js";import"./setPrototypeOf-5f9718cf.js";import"./createWithBsPrefix-63fb65a8.js";import"./index-06bcf729.js";import"./divWithClassName-9a47a22b.js";import"./Container-652355f0.js";import"./Row-55a0cdb3.js";import"./Button-df935d27.js";const d=[{selector:"#tower-selection",content:"These are your tower defenses. You can drag and drop them to the map to place them."},{selector:"#tool-selection",content:"This is the tool selection panel. You can use these tools to edit the map."},{selector:"#coins",content:"This counter displays the coins you have to build your defenses."},{selector:"#Psuedo",content:"This is your Map Designer. You can drag and drop towers to place them on the map."}],l=()=>{const l=new e(o),m=t(s),u=r();return a(c,{setOpened:e=>{!1===e&&l.updateCurrentUser({name:m.name,country:m.country,college:m.college,updateTutorialLevel:"NEXT"}).then((()=>{u("/Leaderboard",{replace:!0})})).catch((e=>{e instanceof n&&i.error(e.message)}))},steps:d,children:a(p,{pageType:"MapDesigner"})})};export{l as default};
