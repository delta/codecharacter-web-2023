import{aT as e}from"./index-77b4db63.js";function t(e,t){for(var r=0;r<t.length;r++){const n=t[r];if("string"!=typeof n&&!Array.isArray(n))for(const t in n)if("default"!==t&&!(t in e)){const r=Object.getOwnPropertyDescriptor(n,t);r&&Object.defineProperty(e,t,r.get?r:{enumerable:!0,get:()=>n[t]})}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var r,n;var o=function(){if(n)return r;function e(e){e.languages.erlang={comment:/%.+/,string:{pattern:/"(?:\\.|[^\\"\r\n])*"/,greedy:!0},"quoted-function":{pattern:/'(?:\\.|[^\\'\r\n])+'(?=\()/,alias:"function"},"quoted-atom":{pattern:/'(?:\\.|[^\\'\r\n])+'/,alias:"atom"},boolean:/\b(?:true|false)\b/,keyword:/\b(?:fun|when|case|of|end|if|receive|after|try|catch)\b/,number:[/\$\\?./,/\d+#[a-z0-9]+/i,/(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i],function:/\b[a-z][\w@]*(?=\()/,variable:{pattern:/(^|[^@])(?:\b|\?)[A-Z_][\w@]*/,lookbehind:!0},operator:[/[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:bnot|div|rem|band|bor|bxor|bsl|bsr|not|and|or|xor|orelse|andalso)\b/,{pattern:/(^|[^<])<(?!<)/,lookbehind:!0},{pattern:/(^|[^>])>(?!>)/,lookbehind:!0}],atom:/\b[a-z][\w@]*/,punctuation:/[()[\]{}:;,.#|]|<<|>>/}}return n=1,r=e,e.displayName="erlang",e.aliases=[],r}();const a=t({__proto__:null,default:e(o)},[o]);export{a as e};
