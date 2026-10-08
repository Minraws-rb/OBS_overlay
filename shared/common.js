const P=new URLSearchParams(location.search),q=(k,d)=>P.get(k)??d;
const C=Object.assign({},window.CFG);for(const[k,v]of P)if(k in C)C[k]=v;
const TH={slate:['#7aa2f7','#0e1117','#171c27'],sage:['#8fbf9f','#0f1311','#19211c'],amber:['#e0b56b','#121010','#201b17']}[C.theme]||[];
const R=document.documentElement.style;
R.setProperty('--accent',C.accent||TH[0]||'#7aa2f7');if(TH[1]){R.setProperty('--bg1',TH[1]);R.setProperty('--bg2',TH[2])}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const fmt=s=>{s=Math.max(0,Math.ceil(s));const h=s/3600|0;return(h?pad(h)+':':'')+pad(s/60%60|0)+':'+pad(s%60)};
const T0=Date.now()/1000;
function tick(){const m=q('mode','down'),e=Date.now()/1000-T0,min=+q('min',25),W=+q('work',25)*60,B=+q('brk',5)*60,AT=q('at');
 if(m=='up')return{t:e,f:null,l:q('label','ELAPSED')};
 if(m=='pomo'){const c=W+B,x=e%c,w=x<W;return{t:w?W-x:c-x,f:w?x/W:(x-W)/B,l:w?'FOCUS':'BREAK'}}
 return{t:AT?(new Date(AT)-Date.now())/1000:min*60-e,f:AT?null:e/(min*60),l:q('label','COUNTDOWN')}}
