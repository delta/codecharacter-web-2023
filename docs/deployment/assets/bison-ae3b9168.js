import{aT as e}from"./index-77b4db63.js";import{r as n}from"./c-6c432317.js";function t(e,n){for(var t=0;t<n.length;t++){const r=n[t];if("string"!=typeof r&&!Array.isArray(r))for(const n in r)if("default"!==n&&!(n in e)){const t=Object.getOwnPropertyDescriptor(r,n);t&&Object.defineProperty(e,n,t.get?t:{enumerable:!0,get:()=>r[n]})}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var r,a;var i=function(){if(a)return r;a=1;var e=n();function t(n){n.register(e),n.languages.bison=n.languages.extend("c",{}),n.languages.insertBefore("bison","comment",{bison:{pattern:/^[\s\S]*?%%[\s\S]*?%%/,inside:{c:{pattern:/%\{[\s\S]*?%\}|\{(?:\{[^}]*\}|[^{}])*\}/,inside:{delimiter:{pattern:/^%?\{|%?\}$/,alias:"punctuation"},"bison-variable":{pattern:/[$@](?:<[^\s>]+>)?[\w$]+/,alias:"variable",inside:{punctuation:/<|>/}},rest:n.languages.c}},comment:n.languages.c.comment,string:n.languages.c.string,property:/\S+(?=:)/,keyword:/%\w+/,number:{pattern:/(^|[^@])\b(?:0x[\da-f]+|\d+)/i,lookbehind:!0},punctuation:/%[%?]|[|:;\[\]<>]/}}})}return r=t,t.displayName="bison",t.aliases=[],r}();const o=t({__proto__:null,default:e(i)},[i]);export{o as b};
