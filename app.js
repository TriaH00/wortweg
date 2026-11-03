'use strict';
/* Wortweg v4 · PWA statica: nessun server, nessun account. Servizi gratuiti: LanguageTool (correzione), MyMemory (traduzione), riconoscimento vocale del browser. */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rint=n=>Math.floor(Math.random()*n), rnd=a=>a[rint(a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rint(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const dk=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=()=>dk(new Date());
const ART={m:'der',f:'die',n:'das',pl:'die'};
const IC={
 today:'<path d="M3 10h18M8 3v4M16 3v4"/><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 14h3v3H8z"/>',
 read:'<path d="M2 5c3-1.5 6.5-1.5 10 1 3.5-2.5 7-2.5 10-1v14c-3-1.5-6.5-1.5-10 1-3.5-2.5-7-2.5-10-1z"/><path d="M12 6v14"/>',
 words:'<path d="M4 7V5h16v2M9 19h6M12 5v14"/>',
 practice:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',
 book:'<path d="M4 4.5A2.5 2.5 0 016.5 2H20v17H6.5A2.5 2.5 0 004 21.5z"/><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>',
 shadow:'<path d="M3 12h2l2-6 3 12 3-9 2 6 2-3h4"/>',
 logic:'<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 7.5l3 8.3M16 7.5l-3 8.3M8.5 6h7"/>',
 talk:'<path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/>',
 play:'<path d="M7 4.5v15l12-7.5z" fill="currentColor" stroke="none"/>',
 pause:'<path d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z" fill="currentColor" stroke="none"/>',
 spk:'<path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12"/>',
 star:'<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
 starF:'<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" fill="currentColor"/>',
 tr:'<path d="M4 5h9M8.5 3v2M6 5c.5 3 2.5 5.5 5 7M11 5c-.8 3.5-3 6.5-6.5 8.5M13 21l4-9 4 9M14.5 18h5"/>',
 back:'<path d="M15 18l-6-6 6-6"/>', fwd:'<path d="M9 18l6-6-6-6"/>',
 x:'<path d="M6 6l12 12M18 6L6 18"/>',
 moon:'<path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"/>',
 next:'<path d="M6 4.5v15l10-7.5zM18 5v14"/>', prev:'<path d="M18 4.5v15L8 12zM6 5v14"/>',
 check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
 head:'<path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1v-6h3zM3 19a2 2 0 002 2h1v-6H3z"/>',
 review:'<path d="M20 12a8 8 0 11-2.34-5.66"/><path d="M20 4v5h-5"/>',
 pen:'<path d="M4 20l4-1 11-11-3-3L5 16l-1 4z"/>',
 ear:'<path d="M7 9a5 5 0 0110 0c0 3-3 4-3 7a3 3 0 01-6 0"/><path d="M10 9a2 2 0 014 0"/>',
 mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>',
 rec:'<circle cx="12" cy="12" r="6" fill="currentColor"/>',
 stop:'<rect x="7" y="7" width="10" height="10" rx="1.5" fill="currentColor"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
 paste:'<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6"/>',
 hash:'<path d="M5 9h14M5 15h14M10 3L8 21M16 3l-2 18"/>',
 trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
 copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h3"/>',
 plus:'<path d="M12 5v14M5 12h14"/>', down:'<path d="M12 4v12M6 11l6 6 6-6M5 20h14"/>',
 gap:'<path d="M3 12h4M17 12h4"/><rect x="9" y="8" width="6" height="8" rx="1"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/>',
 install:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M12 7v7M9 11l3 3 3-3"/>'
};
const ic=(n,c='i')=>`<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]}</svg>`;
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;$('#toasts').appendChild(t);setTimeout(()=>t.remove(),3200)}
function modal(html,bind){$('#mbox').innerHTML=html;$('#modal').hidden=false;bind&&bind($('#mbox'));const f=$('#mbox input:not([type=checkbox]),#mbox textarea')||$('#mbox .btn.pri')||$('#mbox button');f&&f.focus()}
function closeModal(){$('#modal').hidden=true}
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
const fmtMin=s=>{const m=Math.round(s/60);return m<60?m+' min':Math.floor(m/60)+' h '+(m%60)+' min'};
const online=()=>navigator.onLine!==false;

/* ================= DIZIONARIO ================= */
const V=D.V, KEY={}, LOWK={};
V.forEach((v,i)=>{KEY[v[0]]=i;const l=v[0].toLowerCase();if(!(l in LOWK))LOWK[l]=i});
const disp=i=>{const v=V[i];return ART[v[2]]?ART[v[2]]+' '+v[0]:v[0]};
const CORE=V.map((v,i)=>i).filter(i=>'fvna'.includes(V[i][3])).sort((a,b)=>V[b][4]-V[a][4]);
const RANK={};CORE.forEach((i,r)=>RANK[i]=r+1);
const UML={'ä':'a','ö':'o','ü':'u'};
const TOKRE=/[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß'\-]*/g;
function lemmaIdx(t){
  if(t in KEY)return KEY[t];const low=t.toLowerCase();
  if(D.F[low]&&D.F[low] in KEY)return KEY[D.F[low]];
  const cap=t[0]!==t[0].toLowerCase();
  const c=[low];for(const s of ['en','n','e','er','es','em','s','st','t','et','est','te','ten','tet','test','ern'])if(low.endsWith(s)&&low.length-s.length>=2){const b=low.slice(0,-s.length);c.push(b,b+'en',b+'n',b+'e')}
  if(low.startsWith('ge')&&(low.endsWith('t')||low.endsWith('en'))){const b=low.endsWith('t')?low.slice(2,-1):low.slice(2,-2);c.push(b+'en',b+'n')}
  for(const strict of [true,false])for(const x of c){const x2=[...x].map(ch=>UML[ch]||ch).join('');for(const y of [x,x[0].toUpperCase()+x.slice(1),x2[0].toUpperCase()+x2.slice(1)]){let r=KEY[y];if(r===undefined&&y.toLowerCase() in LOWK)r=LOWK[y.toLowerCase()];if(r!==undefined&&(!strict||(V[r][0][0]!==V[r][0][0].toLowerCase())===cap))return r}}
  return -1;
}
const toks=s=>s.match(TOKRE)||[];
const STORY={};D.S.forEach(s=>STORY[s.id]=s);
const isDlg=t=>!!t.vo;
const ONES=['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn'];
const TENS=['','','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig'];
function numDe(n){if(n<20)return ONES[n];if(n<100){const t=Math.floor(n/10),u=n%10;return (u?(u===1?'ein':ONES[u])+'und':'')+TENS[t]}if(n<1000){const h=Math.floor(n/100),r=n%100;return (h===1?'ein':ONES[h])+'hundert'+(r?numDe(r):'')}if(n<1e6){const t=Math.floor(n/1000),r=n%1000;return (t===1?'ein':numDe(t))+'tausend'+(r?numDe(r):'')}return String(n)}

/* ================= STATO ================= */
const LSK='wortweg-v4';
const DEF=()=>({v:5,art:{},vb:{},w:{},ph:[],min:{},done:{},custom:[],newDay:{},hist:{},man:{},dlg:{},onb:false,
  set:{imm:45,rev:15,sha:10,pas:20,out:10,newPerDay:20,rate:1,voiceMode:'neural',voiceURI:'',showTr:false,listenFirst:false,ntts:true,level:'A1'},updated:0});
function merge(b,o){for(const k in o){const v=o[k];if(v&&typeof v==='object'&&!Array.isArray(v)&&b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k]))merge(b[k],v);else b[k]=v}return b}
let S=DEF();try{const r=localStorage.getItem(LSK)||localStorage.getItem('wortweg-v2');if(r){S=merge(DEF(),JSON.parse(r));if((S.v||0)<5){S.set.ntts=true;S.v=5}}}catch(e){}
let saveT=null;
function save(){S.updated=Date.now();clearTimeout(saveT);saveT=setTimeout(()=>{try{localStorage.setItem(LSK,JSON.stringify(S))}catch(e){toast('Spazio pieno: esporta un backup dalle impostazioni')}},300)}
addEventListener('pagehide',()=>{try{localStorage.setItem(LSK,JSON.stringify(S))}catch(e){}});
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
const dayMin=(d=today())=>S.min[d]||(S.min[d]={imm:0,rev:0,sha:0,pas:0,out:0});
function ws(i){if(i<0)return 0;if(V[i][3]==='name')return 4;const e=S.w[V[i][0]];return e?e.s:0}
const DAY=864e5, INT=[0.4,1,3,7,14,30,60];
function setWord(i,s,ctx){const k=V[i][0];if(s===0){delete S.w[k]}else{const e=S.w[k]||(S.w[k]={s:0,b:0,d:0});const was=e.s;e.s=s;if(ctx&&!e.c)e.c=ctx;if(s>=1&&s<=3&&!(was>=1&&was<=3)){e.b=0;e.d=Date.now()+INT[0]*DAY}if(!e.t)e.t=Date.now()}save()}
const known=i=>{const s=ws(i);return s===4||s===-1};
function compOf(sents){let t=0,k=0;for(const s of sents)for(const i of s[2]){t++;const st=ws(i);k+=st===4||st===-1?1:st===3?.7:st===2?.5:st===1?.3:0}return t?k/t:0}
const compLabel=c=>c>=.9?['Facile','ok']:c>=.68?['Ideale','acc']:c>=.5?['Impegnativo','warn']:['Difficile','bad'];
function dueWords(){const n=Date.now();return Object.entries(S.w).filter(([k,e])=>e.s>=1&&e.s<=3&&e.d<=n&&k in KEY).map(([k])=>KEY[k])}
const duePh=()=>S.ph.filter(p=>p.d<=Date.now());
const allTexts=()=>[...D.S,...S.custom];
const getText=id=>STORY[id]||S.custom.find(t=>t.id===id);
const knownCount=()=>CORE.filter(known).length;
function addPhrase(de,it,src){if(S.ph.some(p=>p.de===de))return false;S.ph.push({id:Date.now().toString(36)+rint(1e4),de,it:it||'',src:src||'',a:today(),b:0,d:Date.now()+0.8*DAY});return true}

/* ================= AUDIO ================= */
let deVoice=null,DE_VOICES=[];
const VR=v=>{const n=v.name;let s=0;if(/^de[-_]DE/i.test(v.lang))s+=5;else if(/^de/i.test(v.lang))s+=2;else return -1;if(/natural|neural/i.test(n))s+=40;if(/premium/i.test(n))s+=35;if(/enhanced|erweitert/i.test(n))s+=30;if(/online/i.test(n))s+=20;if(/google/i.test(n))s+=15;if(/hedda|stefan|desktop|espeak/i.test(n))s-=10;return s};
function loadVoices(){try{DE_VOICES=speechSynthesis.getVoices().filter(v=>VR(v)>=0).sort((a,b)=>VR(b)-VR(a));deVoice=DE_VOICES.find(v=>v.voiceURI===S.set.voiceURI)||DE_VOICES[0]||null}catch(e){}}
if('speechSynthesis' in window){loadVoices();try{speechSynthesis.onvoiceschanged=loadVoices}catch(e){}}
const AUD={el:new Audio(),tok:0,res:null,playing:false};AUD.el.preload='auto';
const clipKey=t=>S.set.voiceMode!=='browser'&&D.A[t]?D.A[t]:null;
const slowKey=t=>S.set.voiceMode!=='browser'&&D.AS&&D.AS[t]?D.AS[t]:null;
const clipUrl=id=>`audio/${id}.mp3`;
function stopAudio(){AUD.tok++;try{AUD.el.pause();AUD.el.onended=null;AUD.el.onerror=null}catch(e){}try{speechSynthesis.cancel()}catch(e){}AUD.playing=false;const r=AUD.res;AUD.res=null;r&&r(false)}
function playUrl(u,rate,tok){return new Promise(res=>{if(tok!==AUD.tok)return res(false);const a=AUD.el;a.src=u;a.preservesPitch=true;a.playbackRate=rate;const fin=ok=>{a.onended=a.onerror=null;res(ok)};a.onended=()=>fin(true);a.onerror=()=>fin('err');AUD.playing=true;a.play().catch(()=>fin('err'))})}
function deviceSpeak(text,rate,done){if(!('speechSynthesis' in window))return done(true);try{const u=new SpeechSynthesisUtterance(text);u.lang='de-DE';if(deVoice)u.voice=deVoice;u.rate=Math.min(1.3,rate);let fin=false;const f=()=>{if(!fin){fin=true;done(true)}};u.onend=f;u.onerror=f;setTimeout(f,1500+text.length*110/rate);AUD.playing=true;speechSynthesis.speak(u)}catch(e){done(true)}}
function speakP(text,o={}){text=String(text||'').trim();if(!o.passive&&PASS.on)passivePause();stopAudio();const tok=AUD.tok;
  return new Promise(async res=>{AUD.res=res;const done=ok=>{if(AUD.res===res){AUD.res=null;AUD.playing=false}res(ok!==false)};
    const rate=(o.rate||1)*S.set.rate;if(!text)return done(true);
    let key=clipKey(text),r2=rate;if(o.slow){const sk=slowKey(text);if(sk){key=sk;r2=S.set.rate}}
    if(key){const ok=await playUrl(clipUrl(key),r2,tok);if(tok!==AUD.tok)return;if(ok!=='err')return done(ok)}
    if(S.set.ntts&&S.set.voiceMode!=='browser'&&NT.st==='ready'){try{for(const part of splitSent(text)){if(tok!==AUD.tok)return;const u=await ntSynth(part);if(tok!==AUD.tok)return;await playUrl(u,rate,tok)}if(tok!==AUD.tok)return;return done(true)}catch(e){if(tok!==AUD.tok)return}}
    deviceSpeak(text,rate,done)});
}
const speak=(t,slow)=>speakP(t,{rate:slow?.72:1,slow:!!slow});
const playBtn=(t,cls='')=>`<button class="play ${cls}" data-say="${esc(t)}" aria-label="Ascolta">${ic('spk')}</button>`;
const slowBtn=t=>`<button class="play slow" data-say="${esc(t)}" data-slow="1" aria-label="Ascolta lentamente">0.7×</button>`;
document.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(b){e.preventDefault();e.stopPropagation();speak(b.dataset.say,!!b.dataset.slow)}},true);
const splitSent=t=>(t.replace(/\s+/g,' ').match(/[^.!?…]+[.!?…]+["»“”']?\s*|[^.!?…]+$/g)||[t]).map(x=>x.trim()).filter(Boolean);

/* ===== voce neurale nel browser per i testi tuoi (facoltativa) ===== */
const NT={st:'idle',p:null,sess:null,ph:null,cfg:null,lines:null,cache:new Map(),q:Promise.resolve(),prog:0};
const NT_PARTS=['model-0.bin','model-1.bin','model-2.bin','model-3.bin'],NT_SIZE=63149190,NT_KEY='thorsten-medium-1';
function idb(){return new Promise((res,rej)=>{try{const r=indexedDB.open('wortweg-tts',1);r.onupgradeneeded=()=>r.result.createObjectStore('f');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}catch(e){rej(e)}})}
async function idbGet(k){try{const db=await idb();return await new Promise(r=>{const q=db.transaction('f').objectStore('f').get(k);q.onsuccess=()=>r(q.result||null);q.onerror=()=>r(null)})}catch(e){return null}}
async function idbPut(k,v){try{const db=await idb();await new Promise(r=>{const t=db.transaction('f','readwrite');t.objectStore('f').put(v,k);t.oncomplete=r;t.onerror=r})}catch(e){}}
function loadScript(src){return new Promise((r,j)=>{const s=document.createElement('script');s.src=src;s.onload=r;s.onerror=j;document.head.appendChild(s)})}
function ntBar(){const b=$('#ntbar');if(NT.st==='loading'){b.hidden=false;b.innerHTML=`<b>Scarico la voce neurale</b><div class="bar"><i style="width:${Math.round(NT.prog*100)}%"></i></div><span class="muted tnum">${Math.round(NT.prog*100)}% · circa 95 MB, solo la prima volta</span>`}else if(NT.st==='ready'&&!b.hidden){b.innerHTML='<b>Voce neurale pronta</b><span class="muted">I testi che incolli ora usano Thorsten.</span>';setTimeout(()=>b.hidden=true,3000)}else if(NT.st==='error'){b.hidden=false;b.innerHTML='<b>Voce neurale non disponibile</b><span class="muted">Uso la voce del dispositivo.</span>';setTimeout(()=>b.hidden=true,4000)}}
function ntInit(){if(NT.p)return NT.p;if(typeof WebAssembly!=='object'){NT.st='error';return Promise.reject()}
  NT.st='loading';NT.prog=0;ntBar();
  NT.p=(async()=>{const base=new URL('tts/',location.href).href;
    await loadScript(base+'ort.wasm.min.js');ort.env.wasm.wasmPaths=base;ort.env.wasm.numThreads=1;
    let bytes=await idbGet(NT_KEY);
    if(!bytes||bytes.byteLength!==NT_SIZE){const buf=new Uint8Array(NT_SIZE);let off=0;
      for(const f of NT_PARTS){const r=await fetch(base+f);if(!r.ok)throw new Error('model');const rd=r.body.getReader();for(;;){const {done,value}=await rd.read();if(done)break;buf.set(value,off);off+=value.length;NT.prog=off/NT_SIZE*.85;ntBar()}}
      if(off!==NT_SIZE)throw new Error('size');bytes=buf.buffer;idbPut(NT_KEY,bytes)}
    NT.prog=.9;ntBar();
    NT.sess=await ort.InferenceSession.create(new Uint8Array(bytes),{executionProviders:['wasm']});
    NT.cfg=await (await fetch(base+'voice.json')).json();
    const mod=await import(base+'phon.js');
    NT.ph=await mod.createPiperPhonemize({print:l=>{try{const j=JSON.parse(l);if(NT.lines)NT.lines.push(...j.phoneme_ids)}catch(e){}},printErr:()=>{},locateFile:f=>base+(f.endsWith('.wasm')?'phon.wasm':f.endsWith('.data')?'phon-data.bin':f)});
    NT.st='ready';NT.prog=1;ntBar();
  })().catch(e=>{console.warn('NT',e);NT.st='error';NT.p=null;ntBar();throw e});return NT.p}
function wavUrl(f,sr){const n=f.length,b=new DataView(new ArrayBuffer(44+n*2));const W=(o,s)=>{for(let i=0;i<s.length;i++)b.setUint8(o+i,s.charCodeAt(i))};W(0,'RIFF');b.setUint32(4,36+n*2,true);W(8,'WAVE');W(12,'fmt ');b.setUint32(16,16,true);b.setUint16(20,1,true);b.setUint16(22,1,true);b.setUint32(24,sr,true);b.setUint32(28,sr*2,true);b.setUint16(32,2,true);b.setUint16(34,16,true);W(36,'data');b.setUint32(40,n*2,true);let mx=0;for(let i=0;i<n;i++)mx=Math.max(mx,Math.abs(f[i]));const g=mx>0?.89/mx:1;for(let i=0;i<n;i++)b.setInt16(44+i*2,Math.max(-1,Math.min(1,f[i]*g))*32767,true);return URL.createObjectURL(new Blob([b],{type:'audio/wav'}))}
function ntSynth(text){if(NT.cache.has(text))return NT.cache.get(text);
  const job=NT.q.then(async()=>{await ntInit();NT.lines=[];NT.ph.callMain(['-l',NT.cfg.espeak.voice,'--input',JSON.stringify([{text}]),'--espeak_data','/espeak-ng-data']);const ids=NT.lines;NT.lines=null;if(!ids.length)throw new Error('phon');
    const r=await NT.sess.run({input:new ort.Tensor('int64',BigInt64Array.from(ids.map(BigInt)),[1,ids.length]),input_lengths:new ort.Tensor('int64',BigInt64Array.from([BigInt(ids.length)]),[1]),scales:new ort.Tensor('float32',Float32Array.from([0.45,1.05,0.6]),[3])});
    return wavUrl(r.output.data,NT.cfg.audio.sample_rate)});
  NT.q=job.catch(()=>{});NT.cache.set(text,job);job.catch(()=>NT.cache.delete(text));return job}
function ntPrefetch(text){if(S.set.ntts&&NT.st==='ready'&&!clipKey(text))splitSent(text).forEach(p=>ntSynth(p).catch(()=>{}))}

/* ================= SERVIZI GRATUITI ================= */
const LT_CAT={TYPOS:'Ortografia',GRAMMAR:'Grammatica',CASING:'Maiuscole/minuscole',PUNCTUATION:'Punteggiatura',CONFUSED_WORDS:'Parola confusa',COMPOUNDING:'Parole composte',REDUNDANCY:'Ripetizione',STYLE:'Stile',TYPOGRAPHY:'Tipografia',COLLOCATIONS:'Combinazione di parole',IDIOMS:'Modo di dire',MISC:'Varie',SEMANTICS:'Significato',CORRESPONDENCE:'Lettere'};
async function ltCheck(text){if(!online())throw new Error('offline');const r=await fetch('https://api.languagetool.org/v2/check',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({text,language:'de-DE',motherTongue:'it',level:'default'})});if(!r.ok)throw new Error('lt '+r.status);const j=await r.json();return j.matches||[]}
function ltApply(text,ms){let out=text;[...ms].sort((a,b)=>b.offset-a.offset).forEach(m=>{if(m.replacements&&m.replacements[0])out=out.slice(0,m.offset)+m.replacements[0].value+out.slice(m.offset+m.length)});return out}
function ltMark(text,ms){let o='',last=0;[...ms].sort((a,b)=>a.offset-b.offset).forEach((m,k)=>{if(m.offset<last)return;o+=esc(text.slice(last,m.offset))+`<mark class="lt" title="${esc(m.message)}">${esc(text.slice(m.offset,m.offset+m.length))}</mark><sup class="tiny">${k+1}</sup>`;last=m.offset+m.length});return o+esc(text.slice(last))}
function ltList(text,ms){return ms.length?`<ol class="ltl">${ms.map(m=>`<li><b>${esc(LT_CAT[m.rule&&m.rule.category&&m.rule.category.id]||'Suggerimento')}:</b> «${esc(text.slice(m.offset,m.offset+m.length))}» ${m.replacements&&m.replacements.length?`→ <b class="okc">${esc(m.replacements.slice(0,3).map(r=>r.value).join(' / '))}</b>`:''}<div class="tiny muted">${esc(m.message)}</div></li>`).join('')}</ol>`:''}
const TRC=new Map();
async function translate(text,pair='de|it'){const k=pair+text;if(TRC.has(k))return TRC.get(k);if(!online())throw new Error('offline');const r=await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0,480))}&langpair=${pair}`);if(!r.ok)throw new Error('mm');const j=await r.json();const t=j&&j.responseData&&j.responseData.translatedText;if(!t||/MYMEMORY WARNING|QUERY LENGTH/i.test(t))throw new Error('limit');TRC.set(k,t);return t}
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
function listenOnce(){return new Promise((res,rej)=>{if(!SR)return rej(new Error('nosr'));const r=new SR();r.lang='de-DE';r.interimResults=false;r.maxAlternatives=3;let got=false;r.onresult=e=>{got=true;res([...e.results[0]].map(a=>a.transcript))};r.onerror=e=>{if(!got)rej(e.error||e)};r.onend=()=>{if(!got)rej(new Error('nospeech'))};try{r.start()}catch(e){rej(e)}})}

/* ================= TEMPO ================= */
let ACT={kind:null,last:0};
['pointerdown','keydown','scroll','wheel','input'].forEach(ev=>addEventListener(ev,()=>{ACT.last=Date.now()},{passive:true}));
setInterval(()=>{const m=dayMin();let ch=false;
  if(PASS.on){m.pas+=5;ch=true}
  else if(ACT.kind&&!document.hidden&&(Date.now()-ACT.last<90000||AUD.playing)){m[ACT.kind]+=5;ch=true}
  if(ch){save();if(PASS.on)updateMini()}},5000);
setInterval(updNext,30000);

/* ================= PIANO DEL GIORNO ================= */
function bestText(){let best=null,bd=9;for(const t of D.S){if(S.done[t.id])continue;const c=compOf(t.s);const d=c>=.6&&c<=.93?Math.abs(c-.78):1+Math.abs(c-.78);if(d<bd){bd=d;best=t}}return best||D.S[0]}
function nextChapter(){return D.M.find(c=>!S.man[c.id])}
function plan(){const d=today(),m=dayMin(),s=S.set,due=dueWords().length+duePh().length,bt=bestText(),nd=S.newDay[d]||0,ph=S.ph.filter(p=>p.a===d).length,nc=nextChapter();
  const P=[
   {k:'rev',ic:'review',t:'Ripasso',d:due?`${due} frasi e parole in scadenza`:'Niente in scadenza',done:due===0,href:'#ripasso',p:due?0:1},
   {k:'sha',ic:'shadow',t:'Shadowing',d:`${fmtMin(m.sha)} di ${s.sha} min · parla insieme alla voce`,done:m.sha>=s.sha*60,href:'#shadowing',p:m.sha/(s.sha*60)},
   {k:'new',ic:'words',t:'Parole nuove',d:`${nd} di ${s.newPerDay} · dentro una frase`,done:nd>=s.newPerDay,href:'#nuove',p:nd/s.newPerDay},
   {k:'imm',ic:'read',t:'Leggi e ascolta',d:`«${bt.t}» · ${fmtMin(m.imm)} di ${s.imm} min · frasi salvate ${ph}/5`,done:m.imm>=s.imm*60,href:'#testo-'+bt.id,p:m.imm/(s.imm*60)}];
  if(nc)P.push({k:'man',ic:'book',t:'Manuale',d:`Prossimo capitolo: ${nc.t}`,done:Object.values(S.man).includes(d),href:'#manuale-'+nc.id,p:Object.values(S.man).includes(d)?1:0});
  P.push({k:'out',ic:'talk',t:'Parla e scrivi',d:`${fmtMin(m.out)} di ${s.out} min · dialoghi, scrittura, pronuncia`,done:m.out>=s.out*60,href:'#parla',p:m.out/(s.out*60)},
   {k:'pas',ic:'head',t:'Ascolto passivo',d:`${fmtMin(m.pas)} di ${s.pas} min · in sottofondo o prima di dormire`,done:m.pas>=s.pas*60,href:'#oggi',act:'pas',p:m.pas/(s.pas*60)});
  return P}
const nextStep=()=>plan().find(x=>!x.done);
function updNext(){const n=nextStep(),b=$('#nextBtn');if(!b)return;if(!n){b.className='next done';b.href='#oggi';b.innerHTML=`${ic('check')} <span>Fatto oggi</span>`;b.onclick=null;return}b.className='next';b.href=n.act?'#oggi':n.href;b.innerHTML=`<small>Prossima tappa</small><span>${n.t}</span>`;b.onclick=n.act==='pas'?(e=>{e.preventDefault();passiveStart(null,0)}):null}

/* ================= ROUTER ================= */
const TABS=[['oggi','Oggi','today'],['leggi','Leggi','read'],['allenati','Allenati','practice'],['manuale','Manuale','book'],['parla','Parla','talk']];
const TABOF={testo:'leggi',parole:'allenati',pratica:'allenati',nuove:'allenati',ripasso:'allenati',shadowing:'allenati',dettato:'allenati',suoni:'allenati',pronuncia:'allenati',completa:'allenati',numeri:'allenati',articoli:'allenati',verbi:'allenati',casi:'allenati',ordina:'allenati',ascolta:'allenati',logica:'manuale',dialogo:'parla'};
const PRAT=[['ripasso','Ripasso','review'],['shadowing','Shadowing','shadow'],['pronuncia','Pronuncia','mic'],['dettato','Dettato','pen'],['completa','Completa','gap'],['numeri','Numeri','hash'],['suoni','Suoni','ear']];
function route(){const h=decodeURIComponent(location.hash.slice(1));const [v,...rest]=h.split('-');const ok=TABS.some(t=>t[0]===v)||v in TABOF;return {v:ok?v:'oggi',arg:rest.join('-')}}
addEventListener('hashchange',()=>{closeWord();render();scrollTo(0,0)});
function nav(){const v=route().v,r=TABOF[v]||v;const due=dueWords().length+duePh().length;const badge=k=>k==='allenati'&&due?`<span class="badge tnum">${due>99?'99+':due}</span>`:'';
  const h=TABS.map(([k,t,i])=>`<a href="#${k}" class="${k===r?'on':''}" ${k===r?'aria-current="page"':''}>${ic(i)}<span>${t}</span>${badge(k)}</a>`).join('');
  $('#nav').innerHTML=h;$('#mobnav').innerHTML=h;updNext()}
const subnav=()=>'';
const OWNCRUMB=['testo','nuove','manuale','logica','dialogo'];
function crumbs(v){const c=$('#crumbs');const tab=TABOF[v];if(!tab||OWNCRUMB.includes(v)){c.innerHTML='';c.hidden=true;return}const T=TABS.find(t=>t[0]===tab);const ex=EXLIST.find(e=>e.k===v);c.hidden=false;c.innerHTML=`<a href="#${tab}">${ic('back')} ${T[1]}</a><span>/</span><span>${esc(ex?ex.t:v)}</span>`}
function render(){nav();ACT.kind=null;const {v,arg}=route();const m=$('#view');crumbs(v);if(v!=='shadowing')shStop();if(v!=='testo')readStop();recStop();
  ({oggi:vToday,leggi:vLib,testo:vReader,parole:vWords,nuove:vNew,pratica:vPratica,allenati:vPratica,articoli:vArt,verbi:vVerbs,casi:vCases,ordina:vOrder,ascolta:vListen,ripasso:vReview,shadowing:vShadow,dettato:vDict,suoni:vSounds,logica:vLogic,manuale:vManual,parla:vTalk,dialogo:vDialog,pronuncia:vPron,completa:vCloze,numeri:vNumbers})[v](m,arg)}

/* ================= OGGI ================= */
function ringSvg(v,max){const r=24,c=2*Math.PI*r,p=Math.max(0,Math.min(1,v/max));return `<svg class="ring" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="${r}" fill="none" stroke="var(--line2)" stroke-width="6"/>${p>0?`<circle cx="28" cy="28" r="${r}" fill="none" stroke="${p>=1?'var(--ok)':'var(--accent)'}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${c*p} ${c}" transform="rotate(-90 28 28)"/>`:''}<text x="28" y="32" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">${Math.round(p*100)}%</text></svg>`}
function blockProg(d){const m=S.min[d]||{imm:0,rev:0,sha:0,pas:0,out:0};const s=S.set;return [Math.min(1,m.imm/60/s.imm),Math.min(1,(m.rev+m.sha)/60/s.rev),Math.min(1,m.pas/60/s.pas)]}
function weekIO(){let i=0,o=0;for(let k=0;k<7;k++){const d=new Date();d.setDate(d.getDate()-k);const m=S.min[dk(d)];if(m){i+=m.imm+m.pas+m.rev;o+=m.out+m.sha}}return [i,o]}
function chart14(){const days=[...Array(14)].map((_,k)=>{const x=new Date();x.setDate(x.getDate()-(13-k));return x});const rows=days.map(d=>{const m=S.min[dk(d)]||{};return [(m.imm||0)/60,((m.rev||0)+(m.sha||0))/60,(m.pas||0)/60,(m.out||0)/60]});
  const max=Math.max(30,...rows.map(r=>r.reduce((a,b)=>a+b,0)));const W=640,H=170,pl=30,pb=22,bw=(W-pl-8)/14;const y=v=>H-pb-(v/max)*(H-pb-12);const cols=['var(--accent)','var(--das)','var(--pas)','var(--warn)'];
  const grid=[0,Math.round(max/2),Math.round(max)].map(v=>`<line x1="${pl}" x2="${W-8}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line2)"/><text x="${pl-6}" y="${y(v)+4}" text-anchor="end">${v}</text>`).join('');
  const bars=rows.map((r,i)=>{let acc=0;const x=pl+i*bw+bw*.18,w=bw*.64;return r.map((v,j)=>{if(!v)return '';const y1=y(acc+v),h=y(acc)-y1;acc+=v;return `<rect x="${x}" y="${y1}" width="${w}" height="${Math.max(1,h)}" fill="${cols[j]}" rx="2"/>`}).join('')+`<text x="${x+w/2}" y="${H-6}" text-anchor="middle" ${i===13?'style="font-weight:700;fill:var(--ink)"':''}>${['D','L','M','M','G','V','S'][days[i].getDay()]}</text>`}).join('');
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Minuti di studio degli ultimi 14 giorni">${grid}${bars}</svg><div class="row small muted" style="gap:14px"><span><b style="color:var(--accent)">■</b> immersione</span><span><b style="color:var(--das)">■</b> ripasso e shadowing</span><span><b style="color:var(--pas)">■</b> passivo</span><span><b style="color:var(--warn)">■</b> output</span></div>`}
function streak(){let n=0;for(let k=0;k<400;k++){const d=new Date();d.setDate(d.getDate()-k);const m=S.min[dk(d)];const tot=m?m.imm+m.rev+m.sha+m.pas+m.out:0;if(tot>=600)n++;else if(k>0)break}return n}
function vToday(m){ACT.kind=null;const d=today(),s=S.set,P=plan(),n=P.find(x=>!x.done);const kn=knownCount();S.hist[d]=kn;
  const lr=CORE.filter(i=>{const x=ws(i);return x>=1&&x<=3}).length;const left=Math.max(0,1000-kn),eta=new Date(Date.now()+Math.ceil(left/Math.max(5,s.newPerDay))*DAY);
  const [wi,wo]=weekIO(),tot=wi+wo,hr=new Date().getHours(),st=streak(),nd=P.filter(x=>x.done).length;
  const week=[...Array(7)].map((_,k)=>{const x=new Date();x.setDate(x.getDate()-(6-k));const pr=blockProg(dk(x));const f=(pr[0]+pr[1]+pr[2])/3;return `<div class="wd ${k===6?'today':''}"><i style="--f:${f}" class="${f>=1?'full':''}"></i><span>${['D','L','M','M','G','V','S'][x.getDay()]}</span></div>`}).join('');
  m.innerHTML=`<div class="today">
   <div class="tmain"><p class="greet">${hr<11?'Guten Morgen':hr<18?'Guten Tag':'Guten Abend'}. ${n?`Ti mancano ${P.length-nd} tappe su ${P.length}.`:'Hai finito il giro di oggi.'}</p>
   ${n?`<a class="sign" href="${n.act?'#oggi':n.href}" id="cta"><span class="sign-k">Prossima tappa</span><b>${esc(n.t)}</b><span class="sign-d">${esc(n.d)}</span></a>`:`<div class="sign done"><span class="sign-k">Fatto</span><b>Il piano di oggi è completo</b><span class="sign-d">Se hai tempo, leggi ancora: più input, più progressi.</span></div>`}
   <ol class="line" aria-label="Il piano di oggi">${P.map(x=>`<li class="stop ${x.done?'done':x===n?'cur':''}"><a href="${x.act?'#oggi':x.href}" data-k="${x.k}"><span class="dotp" aria-hidden="true">${x.done?ic('check'):''}</span><span class="stx"><b>${esc(x.t)}</b><span>${esc(x.d)}</span></span>${x.k==='pas'?`<button class="btn sec sm" id="nightB" aria-label="Ascolto prima di dormire">${ic('moon')} Notte</button>`:''}</a></li>`).join('')}</ol></div>
   <aside class="tside">
    <section class="card stack"><div class="between"><h2 class="h3">Questa settimana</h2>${st?`<span class="pill ok tnum">${st} ${st===1?'giorno':'giorni'} di fila</span>`:''}</div><div class="wk">${week}</div><p class="small muted" style="margin:0">Il cerchio si riempie con i tre blocchi del giorno: immersione, ripasso, ascolto passivo.</p></section>
    <section class="card stack"><h2 class="h3">Le 1000 parole più usate</h2><div class="row" style="align-items:baseline;gap:8px"><span class="big tnum">${kn}</span><span class="muted">conosciute, ${lr} in corso</span></div><div class="bar ${kn>=1000?'ok':''}"><i style="width:${Math.min(100,kn/10)}%"></i></div><p class="small muted" style="margin:0">Con mille parole capisci circa l'85% del parlato di ogni giorno. A ${s.newPerDay} al giorno ci arrivi verso il ${eta.toLocaleDateString('it-IT',{day:'numeric',month:'long'})}.</p></section>
    <details class="card"><summary><b>Statistiche</b> <span class="muted small">ultimi 14 giorni</span></summary><div class="stack" style="margin-top:12px">${chart14()}<div class="between small"><span>Input ${fmtMin(wi)}</span><span>Output ${fmtMin(wo)}</span></div><div class="split"><i class="in" style="width:${tot?100*wi/tot:80}%"></i><i class="out" style="width:${tot?100*wo/tot:20}%"></i></div><p class="small muted" style="margin:0">Obiettivo: circa 80% ascolto e lettura, 20% parlare e scrivere.</p></div></details>
   </aside></div>`;
  const nb=$('#nightB',m);if(nb)nb.onclick=e=>{e.preventDefault();e.stopPropagation();nightStart()};
  $$('[data-k="pas"]',m).forEach(a=>a.addEventListener('click',e=>{if(e.target.closest('#nightB'))return;e.preventDefault();passiveStart(null,0)}));
  const c=$('#cta',m);if(c&&n&&n.act==='pas')c.onclick=e=>{e.preventDefault();passiveStart(null,0)};save()}

/* ================= LEGGI ================= */
let LIBF='tutti';
function textCard(t,bt){const c=compOf(t.s),[lab,cl]=compLabel(c);const mins=Math.max(1,Math.round(t.s.reduce((a,s)=>a+s[0].split(' ').length,0)/90));return `<a class="tcard ${t===bt?'best':''}" href="#testo-${t.id}"><div class="between"><span class="row" style="gap:6px"><span class="lv ${t.lv}">${t.lv}</span>${isDlg(t)?'<span class="pill">dialogo</span>':''}</span><span class="row">${S.done[t.id]?`<span class="pill ok">${ic('check')} letto</span>`:''}${t===bt?'<span class="pill acc">consigliato</span>':''}</span></div><h3>${esc(t.t)}</h3><div class="ti">${esc(t.ti)} · ${esc(t.topic)} · ~${mins} min</div><div class="compbar"><span class="tnum">${Math.round(c*100)}%</span><div class="bar"><i style="width:${c*100}%;background:var(--${cl==='acc'?'accent':cl})"></i></div><span class="pill ${cl}">${lab}</span></div></a>`}
function vLib(m){ACT.kind=null;const bt=bestText();const F=[['tutti','Tutti'],['A1','A1'],['A2','A2'],['B1','B1'],['dlg','Dialoghi'],['miei','I miei testi'],['nuovi','Da leggere']];
  const filt=t=>LIBF==='tutti'||(LIBF==='dlg'?isDlg(t):LIBF==='miei'?!STORY[t.id]:LIBF==='nuovi'?!S.done[t.id]:t.lv===LIBF);
  const list=[...S.custom.slice().reverse(),...D.S].filter(filt);
  m.innerHTML=`<div class="vhead"><div><h1>Leggi & ascolta</h1><p>L'80% del tempo va qui. Scegli testi che capisci al 70–80%: la percentuale si aggiorna man mano che impari. Tocca le parole blu per tradurle.</p></div><div class="row"><button class="btn sec" id="impBtn">${ic('paste')} Incolla un testo</button><button class="btn sec" id="pasAll">${ic('head')} Ascolta in sottofondo</button></div></div>
  <a class="bigcta" href="#testo-${bt.id}" style="margin-bottom:16px"><div><span>Consigliato ora · ${Math.round(compOf(bt.s)*100)}% capito</span><b>${esc(bt.t)}</b><span>${esc(bt.ti)}</span></div>${ic('fwd')}</a>
  <div class="scrollx" style="margin-bottom:12px"><div class="seg" role="tablist">${F.map(([k,l])=>`<button class="${LIBF===k?'on':''}" data-f="${k}" role="tab" aria-selected="${LIBF===k}">${l}</button>`).join('')}</div></div>
  <div class="lib">${list.map(t=>textCard(t,bt)).join('')||'<p class="muted">Nessun testo qui.</p>'}</div>
  <div class="lvhead"><h2>Fuori da Wortweg</h2><span class="muted small">quando questi testi diventano facili</span></div>
  <div class="grid g3"><div class="card small"><b>Principiante</b><p class="muted">Conversazioni vere con sottotitoli in tedesco: <a href="https://www.youtube.com/@EasyGerman" target="_blank" rel="noopener">Easy German</a>. Il corso a puntate della DW: <a href="https://learngerman.dw.com/it/nicos-weg/c-36519687" target="_blank" rel="noopener">Nicos Weg</a>.</p></div><div class="card small"><b>Intermedio</b><p class="muted">Notizie lente della DW: <a href="https://www.dw.com/de/deutsch-lernen/nachrichten/s-8030" target="_blank" rel="noopener">Langsam gesprochene Nachrichten</a>. Incolla qui gli articoli che leggi con «Incolla un testo».</p></div><div class="card small"><b>Avanzato</b><p class="muted"><a href="https://www.tagesschau.de/multimedia/sendung/tagesschau_in_100_sekunden" target="_blank" rel="noopener">Tagesschau in 100 Sekunden</a>, podcast senza copione, film con sottotitoli in tedesco.</p></div></div>`;
  $$('[data-f]',m).forEach(b=>b.onclick=()=>{LIBF=b.dataset.f;vLib(m)});
  $('#impBtn',m).onclick=importDialog;$('#pasAll',m).onclick=()=>passiveStart(null,0)}
function importDialog(){modal(`<h2>Incolla un testo tedesco</h2><p class="muted small" style="margin:0">Una mail del padrone di casa, un articolo, un messaggio di un collega… Lo trasformo in un testo interattivo con parole cliccabili. La traduzione frase per frase la fa MyMemory (gratuito, serve internet, circa 5.000 caratteri al giorno).</p>
  <div><label class="small" for="iT"><b>Titolo</b> (facoltativo)</label><input class="field" id="iT" placeholder="es. Mail dalla Hausverwaltung"></div>
  <div><label class="small" for="iX"><b>Testo</b></label><textarea class="field" id="iX" rows="9" placeholder="Sehr geehrter Herr Rossi, …"></textarea></div>
  <label class="small row" style="gap:6px"><input type="checkbox" id="iTr" ${online()?'checked':''}> Traduci in italiano frase per frase</label>
  <p class="small" id="iE" role="status" style="margin:0"></p><div class="mbtns"><button class="btn ghost" id="mNo">Annulla</button><button class="btn pri" id="mGo">Crea il testo</button></div>`,b=>{
  $('#mNo',b).onclick=closeModal;$('#mGo',b).onclick=async()=>{const raw=$('#iX',b).value.trim();if(raw.length<10){$('#iE',b).textContent='Incolla almeno una frase.';return}
   const go=$('#mGo',b);go.disabled=true;const sents=splitSent(raw).slice(0,120);const tr=sents.map(()=>'');
   if($('#iTr',b).checked){let fail=0;for(let k=0;k<sents.length;k++){$('#iE',b).textContent=`Traduco ${k+1}/${sents.length}…`;try{tr[k]=await translate(sents[k])}catch(e){if(++fail>2){$('#iE',b).textContent='Traduzione non disponibile (limite giornaliero o offline): creo il testo senza.';await sleep(1200);break}}}}
   const t={id:'tu'+Date.now().toString(36),lv:'TU',t:$('#iT',b).value.trim()||sents[0].slice(0,40),ti:'testo incollato',topic:'il tuo testo',s:sents.map((de,k)=>[de,tr[k],toks(de).map(lemmaIdx)])};
   S.custom.push(t);if(S.custom.length>40)S.custom.shift();save();closeModal();location.hash='#testo-'+t.id}})}

/* ================= LETTORE ================= */
let RD=null;
function sentHtml(de,idx,si){let o='',last=0,k=0,mm;TOKRE.lastIndex=0;while((mm=TOKRE.exec(de))){o+=`<span class="tx">${esc(de.slice(last,mm.index))}</span>`;const i=idx[k++];const s=ws(i);o+=`<span class="w ${s===4||s===-1?'':'s'+s}" data-i="${i}" data-s="${si}" role="button" tabindex="-1">${esc(mm[0])}</span>`;last=mm.index+mm[0].length}return o+`<span class="tx">${esc(de.slice(last))}</span>`}
function vReader(m,id){const t=getText(id);if(!t){location.hash='#leggi';return}ACT.kind='imm';
  RD={t,cur:-1,run:0,playing:false,showTr:S.set.showTr,heard:new Set(),rate:1};
  const saved=new Set(S.ph.map(p=>p.de));const lf=S.set.listenFirst;
  const list=allTexts(),pos=list.indexOf(t),nxt=bestText()!==t?bestText():list[(pos+1)%list.length];
  m.innerHTML=`<div class="crumb"><a href="#leggi">${ic('back')} Leggi</a><span>/</span><span>${esc(t.t)}</span></div><div class="reader"><article class="paper"><div class="between"><span class="row" style="gap:6px"><span class="lv ${t.lv}">${t.lv}</span>${isDlg(t)?'<span class="pill">dialogo</span>':''}</span><label class="small row" style="gap:6px"><input type="checkbox" id="lfT" ${lf?'checked':''}> ${ic('ear')} Prima ascolta, poi leggi</label></div><h1>${esc(t.t)}</h1><div class="muted">${esc(t.ti)}</div>
   <div class="text" id="txt">${t.s.map((s,si)=>`<span class="sent ${lf?'hid':''}" data-si="${si}">${s[3]?`<span class="spk ${t.vo&&t.vo[s[3]]==='f'?'f':'m'}">${esc(s[3])}</span>`:''}${sentHtml(s[0],s[2],si)}<span class="sbtns"><button data-act="play" aria-label="Ascolta la frase">${ic('play')}</button><button data-act="star" class="${saved.has(s[0])?'on':''}" aria-label="Salva la frase">${ic(saved.has(s[0])?'starF':'star')}</button><button data-act="tr" aria-label="Mostra la traduzione">${ic('tr')}</button></span><span class="tr" ${RD.showTr?'':'hidden'}>${esc(s[1]||'(nessuna traduzione)')}</span></span>`).join(' ')}</div>
   <div class="stack" style="margin-top:28px;border-top:1px solid var(--line);padding-top:18px"><div class="row"><button class="btn pri" id="finBtn">${ic('check')} Ho finito questo testo</button><a class="btn sec" href="#completa-${t.id}">${ic('gap')} Completa il testo</a><span class="small muted" id="finInfo"></span></div>${nxt&&nxt!==t?`<a class="btn ghost" href="#testo-${nxt.id}" style="align-self:flex-start">Prossimo testo: ${esc(nxt.t)} ${ic('fwd')}</a>`:''}</div></article>
   <aside class="side"><div class="card stack"><div class="between"><h2 class="h3">Quanto capisci</h2><span class="big tnum" id="cmp"></span></div><div class="bar"><i id="cmpb"></i></div><p class="small muted" style="margin:0" id="cmpt"></p></div>
   <div class="card legend"><b class="small">Colori</b><div><span style="background:var(--new)"></span>nuova: tocca per vedere</div><div><span style="background:var(--l1)"></span>in apprendimento (1 · 2 · 3)</div><div><span></span>conosciuta</div><p class="tiny muted" style="margin:4px 0 0">Tasti: <b>spazio</b> ascolta tutto · <b>←/→</b> frase · <b>1–4</b> stato della parola aperta.</p></div>
   <div class="card stack small"><b>Dopo la lettura</b><a class="btn sec sm" href="#shadowing-${t.id}">${ic('shadow')} Shadowing</a><a class="btn sec sm" href="#pronuncia-${t.id}">${ic('mic')} Pronuncia</a><a class="btn sec sm" href="#dettato-${t.id}">${ic('pen')} Dettato</a><button class="btn sec sm" id="pasThis">${ic('head')} Riascolta in sottofondo</button>${!STORY[t.id]?`<button class="btn ghost sm" id="delT">${ic('trash')} Elimina questo testo</button>`:''}</div></aside></div>
   <div class="ctrl" id="ctrl"><button class="play" id="pPrev" aria-label="Frase precedente">${ic('prev')}</button><button class="btn pri" id="playAll">${ic('play')} Ascolta tutto</button><button class="play" id="pNext" aria-label="Frase successiva">${ic('next')}</button><select class="field" id="rate" aria-label="Velocità">${[.75,.9,1,1.15].map(r=>`<option value="${r}" ${r===1?'selected':''}>${r}×</option>`).join('')}</select><button class="btn ghost sm" id="trAll">${ic('tr')} <span>${RD.showTr?'Nascondi':'Traduzioni'}</span></button></div>`;
  updComp();
  $('#txt',m).addEventListener('click',e=>{const sEl=e.target.closest('.sent');const w=e.target.closest('.w');
    if(sEl&&sEl.classList.contains('hid')&&!e.target.closest('[data-act]')){readStop();playSent(+sEl.dataset.si);return}
    if(w){openWord(+w.dataset.i,w);return}
    const b=e.target.closest('[data-act]');if(!b)return;const si=+sEl.dataset.si,s=t.s[si];
    if(b.dataset.act==='play'){readStop();playSent(si)}
    if(b.dataset.act==='tr'){const tr=$('.tr',sEl);tr.hidden=!tr.hidden}
    if(b.dataset.act==='star'){const ex=S.ph.find(p=>p.de===s[0]);if(ex){S.ph=S.ph.filter(p=>p!==ex);b.classList.remove('on');b.innerHTML=ic('star');toast('Frase rimossa')}else{addPhrase(s[0],s[1],t.t);b.classList.add('on');b.innerHTML=ic('starF');const n=S.ph.filter(p=>p.a===today()).length;toast(n<=5?`Frase salvata (${n}/5 oggi)`:'Frase salvata')}save()}});
  $('#playAll',m).onclick=()=>RD.playing?readStop():readAll(Math.max(0,RD.cur));
  $('#pPrev',m).onclick=()=>{readStop();playSent(Math.max(0,RD.cur-1))};$('#pNext',m).onclick=()=>{readStop();playSent(Math.min(t.s.length-1,RD.cur+1))};
  $('#rate',m).onchange=e=>{RD.rate=+e.target.value};
  $('#trAll',m).onclick=e=>{RD.showTr=!RD.showTr;S.set.showTr=RD.showTr;save();$$('.tr',m).forEach(x=>x.hidden=!RD.showTr);$('span',e.currentTarget).textContent=RD.showTr?'Nascondi':'Traduzioni'};
  $('#lfT',m).onchange=e=>{S.set.listenFirst=e.target.checked;save();$$('.sent',m).forEach(x=>x.classList.toggle('hid',e.target.checked&&!RD.heard.has(+x.dataset.si)))};
  $('#pasThis',m).onclick=()=>passiveStart([t.id],0);$('#finBtn',m).onclick=finishText;
  const dl=$('#delT',m);if(dl)dl.onclick=()=>{S.custom=S.custom.filter(x=>x!==t);save();toast('Testo eliminato');location.hash='#leggi'};
  const left=new Set();t.s.forEach(s=>s[2].forEach(i=>{if(i>=0&&ws(i)===0)left.add(i)}));$('#finInfo',m).textContent=left.size?`Restano ${left.size} parole blu.`:'';
  if(!STORY[t.id]&&S.set.ntts)ntInit().then(()=>t.s.slice(0,3).forEach(s=>ntPrefetch(s[0]))).catch(()=>{})}
function updComp(){if(!RD)return;const c=compOf(RD.t.s),[l,cl]=compLabel(c);const e=$('#cmp');if(!e)return;e.textContent=Math.round(c*100)+'%';$('#cmpb').style.width=c*100+'%';$('#cmpb').style.background=`var(--${cl==='acc'?'accent':cl})`;
  $('#cmpt').textContent=c>=.9?'Facile: perfetto per shadowing e ripasso.':c>=.68?'Zona ideale: abbastanza per seguire, con abbastanza parole nuove da assorbire.':c>=.5?'Un po\' difficile: tieni le traduzioni a portata di mano.':'Difficile: torna a questo testo più avanti.'}
function setCur(si){$$('.sent').forEach(x=>x.classList.toggle('cur',+x.dataset.si===si));if(RD)RD.cur=si;const el=$(`.sent[data-si="${si}"]`);if(el){const r=el.getBoundingClientRect();if(r.top<90||r.bottom>innerHeight-110)el.scrollIntoView({block:'center',behavior:'smooth'})}}
async function playSent(si){if(!RD)return;setCur(si);const s=RD.t.s[si];if(RD.t.s[si+1])ntPrefetch(RD.t.s[si+1][0]);const ok=await speakP(s[0],{rate:RD.rate||1,slow:(RD.rate||1)<.85});if(ok&&RD){RD.heard.add(si);const el=$(`.sent[data-si="${si}"]`);if(el)el.classList.remove('hid')}return ok}
async function readAll(from){const run=++RD.run;RD.playing=true;$('#playAll').innerHTML=ic('pause')+' Pausa';
  for(let i=from;i<RD.t.s.length;i++){if(!RD||run!==RD.run)return;const ok=await playSent(i);if(!RD||run!==RD.run)return;if(!ok){readStop();return}await sleep(450)}readStop()}
function readStop(){if(!RD)return;RD.run++;if(RD.playing){RD.playing=false;stopAudio()}const b=$('#playAll');if(b)b.innerHTML=ic('play')+' Ascolta tutto'}
function finishText(){const t=RD.t;const blue=new Set();t.s.forEach(s=>s[2].forEach(i=>{if(i>=0&&ws(i)===0&&V[i][3]!=='name')blue.add(i)}));
  modal(`<h2>Fine del testo</h2><p class="muted" style="margin:0">${blue.size?`Restano <b>${blue.size}</b> parole blu che non hai toccato. Se le hai capite, segnale come conosciute: la percentuale degli altri testi sarà più precisa.`:'Hai già classificato tutte le parole del testo.'}</p>${blue.size?`<div class="chips" style="max-height:160px;overflow:auto">${[...blue].map(i=>`<span class="chipw">${esc(V[i][0])}</span>`).join('')}</div>`:''}<div class="mbtns"><button class="btn ghost" id="mNo">${blue.size?'Lasciale nuove':'Chiudi'}</button>${blue.size?'<button class="btn pri" id="mYes">Segna come conosciute</button>':''}</div>`,b=>{
   const fin=mark=>{if(mark)blue.forEach(i=>setWord(i,4));S.done[t.id]=(S.done[t.id]||0)+1;save();closeModal();toast('Testo completato');const n=bestText();location.hash=n&&n!==t?'#testo-'+n.id:'#leggi'};
   $('#mNo',b).onclick=()=>fin(false);const y=$('#mYes',b);if(y)y.onclick=()=>fin(true)})}

/* pannello parola */
let WP=null;
function openWord(i,el){$$('.w.sel').forEach(x=>x.classList.remove('sel'));if(el)el.classList.add('sel');const p=$('#wpanel');
  const form=el?el.textContent:'';const si=el?+el.dataset.s:-1;const ctx=RD&&si>=0?RD.t.s[si][0]:'';WP={i,el,ctx,form,si};
  const look=w=>`<div class="row small"><a href="https://www.dict.cc/?s=${encodeURIComponent(w)}" target="_blank" rel="noopener">dict.cc</a><a href="https://de.wiktionary.org/wiki/${encodeURIComponent(w)}" target="_blank" rel="noopener">Wiktionary</a><button class="btn ghost sm" id="wpTr">${ic('tr')} Traduci (MyMemory)</button></div><div class="ai" id="wpAns" hidden></div>`;
  if(i<0){p.innerHTML=`<div class="between"><div class="row" style="gap:8px">${playBtn(form)}<span class="lem">${esc(form)}</span></div><button class="iconbtn" id="wpX" aria-label="Chiudi">${ic('x')}</button></div><p class="small muted" style="margin:0">Non è nel dizionario di Wortweg.</p>${ctx&&RD.t.s[si][1]?`<div class="small"><b>Frase:</b> ${esc(RD.t.s[si][1])}</div>`:''}${look(form)}`}
  else{const v=V[i],s=ws(i);p.innerHTML=`<div class="between"><div class="row" style="gap:8px">${playBtn(disp(i))}<span class="lem">${v[2]&&ART[v[2]]?`<span class="art-${v[2]}">${ART[v[2]]}</span> `:''}${esc(v[0])}</span></div><button class="iconbtn" id="wpX" aria-label="Chiudi">${ic('x')}</button></div>
   <div style="font-size:17px">${esc(v[1])}</div>${form&&form.toLowerCase()!==v[0].toLowerCase()?`<div class="small muted">Nel testo: «${esc(form)}» · forma base «${esc(v[0])}»</div>`:''}${RANK[i]?`<div class="tiny muted">Parola n. ${RANK[i]} per frequenza</div>`:''}
   <div class="states" role="group" aria-label="Stato della parola">${[[0,'Nuova'],[1,'1'],[2,'2'],[3,'3'],[4,'✓'],[-1,'Ignora']].map(([k,l])=>`<button class="b${k} ${s===k?'on':''}" data-st="${k}" aria-pressed="${s===k}" title="${k===0?'Nuova':k===4?'La conosco':k===-1?'Ignora (nome, parola straniera)':'In apprendimento, livello '+k}">${l}</button>`).join('')}</div>
   ${ctx&&RD.t.s[si][1]?`<div class="small"><b>Frase:</b> ${esc(RD.t.s[si][1])}</div>`:''}${look(form||v[0])}`;
   $$('[data-st]',p).forEach(b=>b.onclick=()=>wordState(+b.dataset.st))}
  p.hidden=false;$('#wpX',p).onclick=closeWord;$('#wpTr',p).onclick=async()=>{const a=$('#wpAns',p);a.hidden=false;a.textContent='…';try{a.textContent=await translate(form||V[i][0])+(ctx?'\nFrase: '+await translate(ctx):'')}catch(e){a.textContent='Traduzione non disponibile (offline o limite giornaliero).'}};
  if(i>=0&&ws(i)===0)speak(disp(i))}
function wordState(st){if(!WP||WP.i<0)return;setWord(WP.i,st,WP.ctx);$$(`.w[data-i="${WP.i}"]`).forEach(x=>{x.className='w '+(st===4||st===-1?'':'s'+st)+(x===WP.el?' sel':'')});$$('[data-st]').forEach(b=>{b.classList.toggle('on',+b.dataset.st===st);b.setAttribute('aria-pressed',+b.dataset.st===st)});updComp()}
function closeWord(){$('#wpanel').hidden=true;$$('.w.sel').forEach(x=>x.classList.remove('sel'));WP=null}

/* ================= RIPASSO ================= */
let RV=null;
function vReview(m){ACT.kind='rev';const items=[...duePh().map(p=>({k:'p',p})),...dueWords().map(i=>({k:'w',i}))];
  if(!RV||RV.done){if(!items.length){RV=null;m.innerHTML=`${subnav('ripasso')}<div class="flash"><div class="fcard" style="align-items:flex-start"><div class="eyebrow">Ripasso</div><h2>Niente in scadenza adesso.</h2><p class="muted">Le frasi che salvi con la stella e le parole in apprendimento tornano qui a intervalli crescenti (1, 3, 7, 14, 30 giorni…).</p><div class="row"><a class="btn pri" href="#shadowing">${ic('shadow')} Shadowing</a><a class="btn sec" href="#parole-frasi">Le mie frasi</a><a class="btn ghost" href="#oggi">Oggi</a></div></div></div>`;return}
   RV={q:shuffle(items).slice(0,40),n:0,show:false}}
  drawReview(m)}
function drawReview(m=$('#view')){if(!RV)return;if(RV.n>=RV.q.length){const tot=RV.q.length;RV.done=true;m.innerHTML=`${subnav('ripasso')}<div class="flash"><div class="fcard" style="align-items:flex-start"><div class="eyebrow">Ripasso finito</div><h2>Fatto: ${tot} elementi ripassati.</h2><p class="muted">Ora 10 minuti di shadowing per completare il blocco 2.</p><div class="row"><a class="btn pri" href="#shadowing">${ic('shadow')} Shadowing</a><a class="btn sec" href="#oggi">Oggi</a></div></div></div>`;updNext();return}
  const it=RV.q[RV.n];let front,back,say;
  if(it.k==='p'){front=`<div class="eyebrow">Frase salvata · dilla in tedesco</div><div class="ctx">${esc(it.p.it||'(senza traduzione: ascolta e ripeti)')}</div><div class="tiny muted">da «${esc(it.p.src)}»</div>`;back=`<div class="ctx" style="font-weight:600">${esc(it.p.de)}</div>`;say=it.p.de}
  else{const vv=V[it.i],e=S.w[vv[0]]||{};const ctx=e.c||'';const re=new RegExp('('+vv[0].slice(0,Math.max(3,vv[0].length-2)).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'[\\wäöüß]*)','i');
   front=`<div class="eyebrow">Parola · cosa significa?</div><div class="row">${playBtn(disp(it.i))}<span class="w1">${esc(disp(it.i))}</span></div>${ctx?`<div class="ctx">${esc(ctx).replace(re,'<mark>$1</mark>')}</div>`:''}`;back=`<div style="font-size:20px"><b>${esc(vv[1])}</b></div>`;say=disp(it.i)}
  m.innerHTML=`${subnav('ripasso')}<div class="flash"><div class="between"><span class="small muted tnum">${RV.n+1} / ${RV.q.length}</span><a class="btn ghost sm" href="#oggi">Interrompi</a></div><div class="bar"><i style="width:${100*RV.n/RV.q.length}%"></i></div>
   <div class="fcard">${front}${RV.show?`<hr>${back}<div class="row">${playBtn(say)}${slowBtn(say)}</div>`:''}</div>
   ${RV.show?`<div class="grade"><button class="g1" data-g="1">Ancora<span>tasto 1</span></button><button data-g="2">Difficile<span>tasto 2</span></button><button data-g="3">Bene<span>tasto 3</span></button><button class="g4" data-g="4">Facile<span>tasto 4</span></button></div>`:`<button class="btn pri" id="rvShow">Mostra la risposta <span class="tiny" style="opacity:.7">(spazio)</span></button>`}
   <p class="tiny muted" style="text-align:center">Dilla ad alta voce prima di girare la carta.</p></div>`;
  const sb=$('#rvShow',m);if(sb){sb.onclick=()=>{RV.show=true;drawReview();speak(say)};sb.focus()}$$('[data-g]',m).forEach(b=>b.onclick=()=>gradeReview(+b.dataset.g))}
function gradeReview(g){const it=RV.q[RV.n];const sched=o=>{if(g===1){o.b=0;o.d=Date.now()+10*60000}else{o.b=Math.min(INT.length-1,o.b+(g===2?0:g===3?1:2));o.d=Date.now()+INT[o.b]*DAY*(g===2?.6:1)}};
  if(it.k==='p')sched(it.p);else{const e=S.w[V[it.i][0]];sched(e);if(g===1)e.s=1;else if(g>=3)e.s=Math.min(4,e.s+(g===4?2:1));if(e.s===4)toast(V[it.i][0]+' ora è conosciuta!')}
  save();RV.n++;RV.show=false;if(g===1)RV.q.push(it);drawReview()}

/* ================= PAROLE ================= */
let PW={q:'',f:'tutte',pq:''};
function vWords(m,arg){ACT.kind=null;const tab=arg==='komposita'?'komposita':arg==='frasi'?'frasi':'mille';
  const kn=knownCount(),lr=CORE.filter(i=>{const s=ws(i);return s>=1&&s<=3}).length,nd=S.newDay[today()]||0;
  m.innerHTML=`<div class="vhead"><div><h1>Parole</h1><p>Il cervello conserva le parole in reti di frasi e situazioni, non come un dizionario. Qui impari le più frequenti dentro le frasi, gestisci le frasi salvate e scopri il trucco delle parole composte.</p></div></div>
   <nav class="subnav"><a href="#parole" class="${tab==='mille'?'on':''}">${ic('words')} Le 1000 parole</a><a href="#parole-frasi" class="${tab==='frasi'?'on':''}">${ic('star')} Frasi salvate <span class="tnum">(${S.ph.length})</span></a><a href="#parole-komposita" class="${tab==='komposita'?'on':''}">${ic('logic')} Parole composte</a></nav><div id="pwb"></div>`;
  const B=$('#pwb',m);if(tab==='komposita')return vKomp(B);if(tab==='frasi')return vPhrases(B);
  const bands=[[1,100],[101,250],[251,500],[501,1000],[1001,CORE.length]];
  B.innerHTML=`<div class="grid g3"><div class="card stack"><div class="eyebrow">Oggi</div><div class="row" style="align-items:baseline"><span class="big tnum">${nd}</span><span class="muted">/ ${S.set.newPerDay} parole nuove</span></div><p class="small muted" style="margin:0">Ogni parola arriva con una frase vera da ascoltare.</p><a class="btn pri" href="#nuove">Impara le parole di oggi</a></div>
   <div class="card stack"><div class="eyebrow">Progresso</div><div class="row" style="align-items:baseline"><span class="big tnum">${kn}</span><span class="muted">conosciute · ${lr} in apprendimento</span></div><div class="stack" style="gap:6px">${bands.map(([a,b])=>{const ids=CORE.slice(a-1,b);const k=ids.filter(known).length;return `<div class="small"><div class="between"><span>${a}–${Math.min(b,CORE.length)}</span><span class="tnum muted">${k}/${ids.length}</span></div><div class="bar ${k===ids.length?'ok':''}"><i style="width:${100*k/ids.length}%"></i></div></div>`}).join('')}</div></div>
   <div class="card stack"><div class="eyebrow">Ripasso</div><div class="row" style="align-items:baseline"><span class="big tnum">${dueWords().length}</span><span class="muted">parole da ripassare</span></div><p class="small muted" style="margin:0">Tornano a intervalli crescenti finché non le conosci.</p><a class="btn sec" href="#ripasso">Ripassa</a></div></div>
   <div class="card" style="margin-top:14px"><div class="between" style="margin-bottom:10px"><h2 class="h3">Elenco per frequenza</h2><div class="row"><input class="field" id="wq" type="search" placeholder="Cerca in tedesco o in italiano" value="${esc(PW.q)}" style="width:240px" aria-label="Cerca parole"><select class="field" id="wf" aria-label="Filtra">${[['tutte','Tutte'],['nuove','Nuove'],['appr','In apprendimento'],['cono','Conosciute']].map(([k,l])=>`<option value="${k}" ${PW.f===k?'selected':''}>${l}</option>`).join('')}</select></div></div><div class="wlist" id="wl"></div></div>`;
  const draw=()=>{const q=PW.q.trim().toLowerCase();let ids=CORE.filter(i=>{const s=ws(i);if(PW.f==='nuove'&&s!==0)return false;if(PW.f==='appr'&&!(s>=1&&s<=3))return false;if(PW.f==='cono'&&!known(i))return false;return !q||V[i][0].toLowerCase().includes(q)||V[i][1].toLowerCase().includes(q)});const tot=ids.length;ids=ids.slice(0,300);
   $('#wl',B).innerHTML=ids.map(i=>{const s=ws(i);const lab=s===0?'nuova':s===4?'conosciuta':s===-1?'ignorata':'livello '+s;return `<div class="wrow">${playBtn(disp(i))}<span class="de">${V[i][2]&&ART[V[i][2]]?`<span class="art-${V[i][2]}">${ART[V[i][2]]}</span> `:''}${esc(V[i][0])}</span><span class="it">${esc(V[i][1])}</span><button class="stchip s${s<0?'k':s}" data-i="${i}" title="Cambia stato">${lab}</button><span class="rk tnum">n. ${RANK[i]}</span></div>`}).join('')+(tot>300?`<p class="small muted">Mostro 300 di ${tot}: usa la ricerca.</p>`:'')+(tot===0?'<p class="muted">Nessuna parola trovata.</p>':'');
   $$('.stchip',B).forEach(b=>b.onclick=()=>{const i=+b.dataset.i;const s=ws(i);setWord(i,s===0?1:s===4?0:4);draw()})};
  draw();$('#wq',B).oninput=e=>{PW.q=e.target.value;draw()};$('#wf',B).onchange=e=>{PW.f=e.target.value;draw()}}
function vPhrases(B){const draw=()=>{const q=PW.pq.toLowerCase();const L=S.ph.slice().reverse().filter(p=>!q||p.de.toLowerCase().includes(q)||(p.it||'').toLowerCase().includes(q));
  $('#phl',B).innerHTML=L.length?L.map(p=>`<div class="phrow">${playBtn(p.de)}<div><div class="de">${esc(p.de)}</div><div class="it">${esc(p.it)}</div><div class="tiny muted">${esc(p.src)} · ${p.d<=Date.now()?'<b>da ripassare</b>':'prossimo ripasso '+new Date(p.d).toLocaleDateString('it-IT',{day:'numeric',month:'short'})}</div></div><button class="iconbtn" data-del="${p.id}" aria-label="Elimina la frase">${ic('trash')}</button></div>`).join(''):'<p class="muted">Nessuna frase. Mentre leggi, tocca la stella accanto a una frase per salvarla: tornerà nel ripasso.</p>';
  $$('[data-del]',B).forEach(b=>b.onclick=()=>{S.ph=S.ph.filter(p=>p.id!==b.dataset.del);save();draw()})};
  B.innerHTML=`<div class="card stack"><div class="between"><input class="field" id="pq" type="search" placeholder="Cerca tra le frasi" value="${esc(PW.pq)}" style="width:240px" aria-label="Cerca frasi"><div class="row"><button class="btn sec sm" id="phAdd">${ic('plus')} Aggiungi</button><a class="btn sec sm" href="#ripasso">${ic('review')} Ripassa</a><a class="btn sec sm" href="#shadowing-frasi">${ic('shadow')} Shadowing</a><a class="btn sec sm" href="#pronuncia-frasi">${ic('mic')} Pronuncia</a><a class="btn sec sm" href="#dettato-frasi">${ic('pen')} Dettato</a><button class="btn sec sm" id="phCp">${ic('down')} Esporta per Anki</button></div></div><div id="phl"></div></div>`;
  draw();$('#pq',B).oninput=e=>{PW.pq=e.target.value;draw()};
  $('#phCp',B).onclick=()=>{const tsv=S.ph.map(p=>p.de.replace(/\t/g,' ')+'\t'+(p.it||'').replace(/\t/g,' ')).join('\n');download('wortweg-frasi-anki.txt',tsv,'text/plain');toast('File creato: in Anki usa File › Importa')};
  $('#phAdd',B).onclick=()=>modal(`<h2>Aggiungi una frase</h2><div><label class="small" for="aD"><b>Tedesco</b></label><input class="field" id="aD"></div><div><label class="small" for="aI"><b>Italiano</b></label><input class="field" id="aI"></div><div class="mbtns"><button class="btn ghost" id="mNo">Annulla</button><button class="btn pri" id="mGo">Salva</button></div>`,x=>{$('#mNo',x).onclick=closeModal;$('#mGo',x).onclick=()=>{const de=$('#aD',x).value.trim();if(!de)return;addPhrase(de,$('#aI',x).value.trim(),'aggiunta a mano');save();closeModal();draw()}})}
function download(name,text,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}

/* parole di oggi */
let NW=null;
function exampleFor(i){const e=D.EX[i];if(e){const st=D.S[e[0]];const s=st.s[e[1]];return {de:s[0],it:s[1],src:st.t}}const w=S.w[V[i][0]];if(w&&w.c)return {de:w.c,it:'',src:''};return null}
function vNew(m){ACT.kind='rev';if(!NW||NW.fin){const d=today(),done=S.newDay[d]||0,need=Math.max(0,S.set.newPerDay-done);
   const ids=CORE.filter(i=>ws(i)===0).slice(0,need||Math.min(10,S.set.newPerDay));
   if(!ids.length){m.innerHTML=`<div class="crumb"><a href="#allenati">${ic('back')} Allenati</a></div><div class="card"><h2>Hai classificato tutte le parole frequenti!</h2><p class="muted">Continua con testi più difficili.</p></div>`;return}NW={ids,n:0,learn:[]}}
  drawNew(m)}
function drawNew(m=$('#view')){if(!NW)return;const crumb=`<div class="crumb"><a href="#allenati">${ic('back')} Allenati</a><span>/</span><span>Parole nuove</span></div>`;
  if(NW.n>=NW.ids.length){NW.fin=true;const learn=NW.learn;const t=learn.length?D.S.map(x=>[x,x.s.reduce((a,s)=>a+s[2].filter(i=>learn.includes(i)).length,0)]).sort((a,b)=>b[1]-a[1])[0][0]:bestText();
   m.innerHTML=`${crumb}<div class="flash"><div class="fcard" style="align-items:flex-start"><div class="eyebrow">Parole di oggi</div><h2>${learn.length?`${learn.length} parole nuove in apprendimento.`:'Le conoscevi tutte!'}</h2><p class="muted">Ora incontrale in un testo vero: il testo qui sotto ne contiene di più.</p><div class="chips">${learn.map(i=>`<span class="chipw">${esc(disp(i))}</span>`).join('')}</div><div class="row"><a class="btn pri" href="#testo-${t.id}">${ic('read')} Leggi «${esc(t.t)}»</a><a class="btn ghost" href="#oggi">Oggi</a></div></div></div>`;updNext();return}
  const i=NW.ids[NW.n],ex=exampleFor(i);
  m.innerHTML=`${crumb}<div class="flash"><div class="between"><span class="small muted tnum">Parola ${NW.n+1} di ${NW.ids.length} · n. ${RANK[i]} per frequenza</span></div><div class="bar"><i style="width:${100*NW.n/NW.ids.length}%"></i></div>
   <div class="fcard"><div class="row">${playBtn(disp(i),'lg')}<span class="w1">${V[i][2]&&ART[V[i][2]]?`<span class="art-${V[i][2]}">${ART[V[i][2]]}</span> `:''}${esc(V[i][0])}</span></div><div style="font-size:20px">${esc(V[i][1])}</div>
   ${ex?`<div class="ctx">${esc(ex.de)}</div><div class="row">${playBtn(ex.de)}${slowBtn(ex.de)}<span class="small muted">${esc(ex.it)}${ex.src?` · da «${esc(ex.src)}»`:''}</span></div>`:'<p class="small muted">La incontrerai nei testi: tocca la parola quando la vedi.</p>'}</div>
   <div class="grid g2"><button class="btn sec" id="nwKnow">La conosco già <span class="tiny muted">(1)</span></button><button class="btn pri" id="nwLearn">Da imparare <span class="tiny" style="opacity:.75">(2)</span></button></div></div>`;
  setTimeout(()=>speak(disp(i)),150);
  const nx=st=>{setWord(i,st,ex?ex.de:'');if(st===1)NW.learn.push(i);S.newDay[today()]=(S.newDay[today()]||0)+1;save();NW.n++;drawNew()};
  $('#nwKnow',m).onclick=()=>nx(4);$('#nwLearn',m).onclick=()=>nx(1)}

/* composti */
let KQ=null;
function vKomp(B){const C=D.C;
  B.innerHTML=`<div class="card stack" style="margin-bottom:14px"><h2 class="h3">Il codice segreto del tedesco</h2><p class="muted" style="margin:0;max-width:70ch">Il tedesco crea parole nuove impilando parole che conosci già. <b>Fenster</b> (finestra) + <b>Bank</b> (panchina) = <b>Fensterbank</b> (davanzale). Il <b>genere</b> lo decide l'ultima parte, l'<b>accento</b> cade sulla prima.</p><div class="row"><button class="btn pri" id="kqGo">Allenati: indovina dai pezzi</button></div></div>
  <div id="kq"></div><div class="comp">${C.map((c,k)=>`<button class="cbox" data-k="${k}"><div class="parts">${c.parts.map(p=>`<b>${esc(p)}</b>`).join(' + ')}</div><div class="small muted">${esc(c.lit)}</div><div class="res" hidden>${c.g&&ART[c.g]?`<span class="art-${c.g}">${ART[c.g]}</span> `:''}${esc(c.w)}</div><div class="small" hidden>${esc(c.it)}</div></button>`).join('')}</div>`;
  $$('.cbox',B).forEach(b=>b.onclick=()=>{const c=C[+b.dataset.k];$$('[hidden]',b).forEach(x=>x.hidden=false);speak(ART[c.g]?ART[c.g]+' '+c.w:c.w)});
  $('#kqGo',B).onclick=()=>{KQ={q:shuffle(C).slice(0,10),n:0,ok:0};drawKQ()}}
function drawKQ(){const box=$('#kq');if(!box||!KQ)return;if(KQ.n>=KQ.q.length){box.innerHTML=`<div class="card" style="margin-bottom:14px"><h3>${KQ.ok}/${KQ.q.length} indovinate</h3><button class="btn sec sm" id="kqAgain">Ancora</button></div>`;$('#kqAgain').onclick=()=>{KQ={q:shuffle(D.C).slice(0,10),n:0,ok:0};drawKQ()};return}
  const c=KQ.q[KQ.n];const opts=shuffle([c,...shuffle(D.C.filter(x=>x!==c)).slice(0,3)]);
  box.innerHTML=`<div class="card stack" style="margin-bottom:14px"><div class="between"><span class="eyebrow">Domanda ${KQ.n+1} di ${KQ.q.length}</span><span class="tnum small muted">${KQ.ok} giuste</span></div><div class="row"><span class="w1" style="font-size:28px">${esc(c.w)}</span>${playBtn(ART[c.g]?ART[c.g]+' '+c.w:c.w)}</div><div class="small muted">${c.parts.map(esc).join(' + ')} · letteralmente: ${esc(c.lit)}</div><div class="opts">${opts.map((o,k)=>`<button class="opt" data-k="${k}">${esc(o.it)}</button>`).join('')}</div></div>`;
  $$('.opt',box).forEach(b=>b.onclick=()=>{const o=opts[+b.dataset.k];const ok=o===c;b.classList.add(ok?'right':'wrong');if(!ok)$$('.opt',box)[opts.indexOf(c)].classList.add('right');if(ok)KQ.ok++;$$('.opt',box).forEach(x=>x.disabled=true);setTimeout(()=>{KQ.n++;drawKQ()},ok?700:1500)})}

/* ================= PRATICA ================= */
function vPratica(m){ACT.kind=null;const due=dueWords().length+duePh().length,mm=dayMin(),nd=S.newDay[today()]||0;
  const st={ripasso:due?`${due} da ripassare`:'niente in scadenza',nuove:`${nd}/${S.set.newPerDay} oggi`,shadowing:`${fmtMin(mm.sha)} di ${S.set.sha} min`,
   articoli:artStat(),verbi:`${D.VB.length} verbi`,casi:'nominativo, accusativo, dativo',parole:`${knownCount()} conosciute`,'parole-frasi':`${S.ph.length} salvate`};
  m.innerHTML=`<div class="vhead"><div><h1>Allenati</h1><p>Ogni esercizio allena una cosa sola. Quelli del primo gruppo sono nel piano di ogni giorno, gli altri usali quando vuoi.</p></div></div>
  ${EXGROUPS.map(g=>`<section class="exg"><h2 class="h3">${g.t}</h2><div class="exlist">${EXLIST.filter(e=>e.g===g.k).map(e=>`<a class="exrow" href="#${e.k}"><span class="ico">${ic(e.i)}</span><span class="exm"><b>${e.t}</b><span>${e.d}</span></span><span class="exs">${esc(st[e.k]||'')}${e.k==='ripasso'&&due?' <span class="dot"></span>':''}</span>${ic('fwd')}</a>`).join('')}</div></section>`).join('')}`}
const EXGROUPS=[{k:'day',t:'Ogni giorno'},{k:'ear',t:'Ascolto e pronuncia'},{k:'gram',t:'Grammatica in pratica'},{k:'voc',t:'Vocabolario'}];
const EXLIST=[
 {k:'ripasso',g:'day',i:'review',t:'Ripasso',d:'Frasi salvate e parole in apprendimento, a intervalli crescenti'},
 {k:'nuove',g:'day',i:'plus',t:'Parole nuove',d:'Le parole più frequenti, ognuna dentro una frase vera'},
 {k:'shadowing',g:'day',i:'shadow',t:'Shadowing',d:'Parla insieme alla voce, poi registrati e confronta'},
 {k:'ascolta',g:'ear',i:'ear',t:'Ascolta e capisci',d:'Senti una frase e scegli cosa significa'},
 {k:'dettato',g:'ear',i:'pen',t:'Dettato',d:'Ascolta e scrivi quello che senti'},
 {k:'pronuncia',g:'ear',i:'mic',t:'Pronuncia',d:'Leggi ad alta voce: il browser ti dice cosa ha capito'},
 {k:'suoni',g:'ear',i:'spk',t:'Suoni difficili',d:'ü, ö, ch, ei/ie: distinguere e ripetere'},
 {k:'numeri',g:'ear',i:'hash',t:'Numeri',d:'Prezzi, orari, date: capirli al volo'},
 {k:'articoli',g:'gram',i:'tag',t:'der, die, das',d:'Il genere dei nomi più usati, con i trucchi delle terminazioni'},
 {k:'verbi',g:'gram',i:'verb',t:'Verbi',d:'Presente, passato prossimo e tabelle dei verbi più usati'},
 {k:'casi',g:'gram',i:'logic',t:'Casi',d:'Scegli l\'articolo giusto: der, den o dem?'},
 {k:'ordina',g:'gram',i:'order',t:'Ordina la frase',d:'Rimetti in ordine le parole: il verbo al posto giusto'},
 {k:'completa',g:'gram',i:'gap',t:'Completa il testo',d:'Riscrivi le parole mancanti di un testo'},
 {k:'parole',g:'voc',i:'words',t:'Le 1000 parole',d:'Elenco per frequenza, con il tuo stato per ogni parola'},
 {k:'parole-frasi',g:'voc',i:'star',t:'Frasi salvate',d:'Le frasi che hai salvato leggendo, esportabili in Anki'},
 {k:'parole-komposita',g:'voc',i:'logic',t:'Parole composte',d:'Fensterbank = Fenster + Bank: indovina dai pezzi'}];
Object.assign(IC,{tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',verb:'<path d="M4 6h10M4 12h16M4 18h7"/><path d="M17 4l3 3-3 3"/>',order:'<rect x="3" y="4" width="7" height="6" rx="1.5"/><rect x="14" y="4" width="7" height="6" rx="1.5"/><rect x="8" y="14" width="8" height="6" rx="1.5"/>'});

/* risultato condiviso per gli esercizi a domande */
function scoreBar(st,tot){return `<div class="between"><span class="small muted tnum">${Math.min(st.n+1,tot)} / ${tot}</span><span class="small tnum">${st.ok} giuste</span></div><div class="bar"><i style="width:${100*st.n/tot}%"></i></div>`}
function endCard(st,tot,again,extra=''){return `<div class="fcard" style="align-items:flex-start"><h2>${st.ok} su ${tot} giuste</h2><p class="muted" style="margin:0">${st.ok===tot?'Perfetto.':st.ok>=tot*.7?'Bene: rifallo domani e salirà ancora.':'Rifallo: le domande sbagliate tornano per prime.'}</p>${extra}<div class="row"><button class="btn pri" id="again">Ancora</button><a class="btn sec" href="#allenati">Altri esercizi</a></div></div>`}
const normA=x=>x.trim().toLowerCase().replace(/\s+/g,' ').replace(/[.!?]$/,'');

/* ===== der / die / das ===== */
const ART_RULES=[[/(ung|heit|keit|schaft|ion|tät|ik|ie|ei|ur|enz|anz)$/,'f','Le parole che finiscono in -ung, -heit, -keit, -schaft, -ion, -tät, -ik, -ie, -ei sono femminili.'],
 [/(chen|lein|ment|um|nis)$/,'n','-chen e -lein (diminutivi), -ment e -um sono quasi sempre neutri.'],
 [/(ling|ismus|or|ist|ant)$/,'m','-ling, -ismus, -or, -ist, -ant sono maschili.'],
 [/e$/,'f','Circa il 90% dei nomi in -e è femminile (con eccezioni come der Name, der Junge).']];
const ruleFor=w=>ART_RULES.find(r=>r[0].test(w.toLowerCase()));
let ARTP=null;const artPool=()=>ARTP||(ARTP=CORE.filter(i=>'mfn'.includes(V[i][2])&&V[i][3]==='n').slice(0,600));
function artStat(){const e=Object.values(S.art||{});return e.length?`${e.filter(x=>x[0]>x[1]).length} nomi sicuri`:'600 nomi più usati'}
let AQ=null;
function vArt(m){ACT.kind='rev';S.art=S.art||{};const pool=artPool();
  const score=i=>{const e=S.art[V[i][0]];return e?(e[1]*3-e[0])+(Date.now()-e[2])/DAY*.3:1+RANK[i]/400};
  const pick=shuffle(pool.filter(i=>known(i)||ws(i)>0)).concat(pool).filter((x,k,a)=>a.indexOf(x)===k);
  AQ={q:pick.sort((a,b)=>score(b)-score(a)).slice(0,15),n:0,ok:0};
  m.innerHTML=`<div class="vhead"><div><h1>der, die, das</h1><p>Il genere va imparato con la parola, ma le terminazioni aiutano molto. Rispondi d'istinto: dopo ogni risposta senti la parola con il suo articolo.</p></div></div><div class="flash" id="aq"></div>`;drawArt()}
function drawArt(){const box=$('#aq');if(!box||!AQ)return;const tot=AQ.q.length;
  if(AQ.n>=tot){box.innerHTML=endCard(AQ,tot);$('#again').onclick=()=>vArt($('#view'));return}
  const i=AQ.q[AQ.n],w=V[i][0],g=V[i][2];
  box.innerHTML=`${scoreBar(AQ,tot)}<div class="fcard center"><span class="w1 big-w">${esc(w)}</span><span class="muted">${esc(V[i][1])}</span></div><div class="gbtns big"><button class="m" data-g="m">der</button><button class="f" data-g="f">die</button><button class="n" data-g="n">das</button></div><div id="afb" class="small" role="status" style="min-height:44px"></div><p class="tiny muted" style="text-align:center">Tasti 1 · 2 · 3</p>`;
  const go=a=>{if(box.dataset.lock)return;box.dataset.lock=1;const ok=a===g;const e=S.art[w]||(S.art[w]=[0,0,0]);ok?e[0]++:e[1]++;e[2]=Date.now();if(ok)AQ.ok++;save();
   $$('[data-g]',box).forEach(b=>{b.disabled=true;if(b.dataset.g===g)b.classList.add('right');else if(b.dataset.g===a)b.classList.add('wrong')});
   const r=ruleFor(w);$('#afb',box).innerHTML=`<b class="art-${g}">${ART[g]}</b> ${esc(w)} ${playBtn(disp(i))}${r?`<div class="muted">${r[1]===g?'Regola: ':'Eccezione alla regola: '}${esc(r[2])}</div>`:''}`;speak(disp(i));
   setTimeout(()=>{delete box.dataset.lock;AQ.n++;drawArt()},ok?1100:2600)};
  $$('[data-g]',box).forEach(b=>b.onclick=()=>go(b.dataset.g));box.onkey=k=>{const g2={1:'m',2:'f',3:'n'}[k];if(g2)go(g2)}}

/* ===== verbi ===== */
const VB={mode:'pres',filt:'tutti',q:null};
const auxF=(aux,p)=>(aux==='sein'?['bin','bist','ist','sind','seid','sind']:['habe','hast','hat','haben','habt','haben'])[p];
function vbPool(){return D.VB.filter(v=>VB.filt==='tutti'||(VB.filt==='irr'?v[6]:VB.filt==='mod'?['können','müssen','wollen','sollen','dürfen'].includes(v[0]):!v[6]))}
function vVerbs(m,arg){ACT.kind='rev';if(arg)VB.mode=arg==='tabelle'?'tab':arg;
  m.innerHTML=`<div class="vhead"><div><h1>Verbi</h1><p>I ${D.VB.length} verbi che userai di più. Scrivi la forma giusta: dopo ogni risposta senti la forma corretta e vedi la tabella completa.</p></div></div>
  <div class="row" style="margin-bottom:14px"><div class="seg" role="tablist">${[['pres','Presente'],['perf','Passato (Perfekt)'],['tab','Tabelle']].map(([k,l])=>`<button data-md="${k}" class="${VB.mode===k?'on':''}">${l}</button>`).join('')}</div><select class="field" id="vbF" aria-label="Quali verbi">${[['tutti','Tutti i verbi'],['irr','Solo irregolari'],['reg','Solo regolari'],['mod','Solo modali']].map(([k,l])=>`<option value="${k}" ${VB.filt===k?'selected':''}>${l}</option>`).join('')}</select></div><div id="vb"></div>`;
  $$('[data-md]',m).forEach(b=>b.onclick=()=>{VB.mode=b.dataset.md;vVerbs(m)});$('#vbF',m).onchange=e=>{VB.filt=e.target.value;vVerbs(m)};
  if(VB.mode==='tab')return drawVerbTables($('#vb',m));
  const pool=vbPool(),sc=v=>{const e=(S.vb||{})[v[0]];return e?e[1]*3-e[0]+Math.random():2+Math.random()*2};
  VB.q={items:pool.slice().sort((a,b)=>sc(b)-sc(a)).slice(0,12).map(v=>({v,p:rint(6)})),n:0,ok:0};drawVerb()}
function verbTable(v){return `<table class="rules vt"><tr><th></th><th>Presente</th><th>Perfekt</th></tr>${PRONS.map((p,k)=>`<tr><td class="muted">${p}</td><td><button class="lnk" data-say="${esc(p+' '+v[2][k])}">${esc(v[2][k])}</button></td><td><button class="lnk" data-say="${esc(p+' '+auxF(v[4],k)+' '+v[5])}">${auxF(v[4],k)} ${esc(v[5])}</button></td></tr>`).join('')}</table><p class="small muted" style="margin:6px 0 0">Präteritum: <button class="lnk" data-say="ich ${esc(v[3])}">ich ${esc(v[3])}</button> · ausiliare <b>${v[4]}</b></p>`}
const PRONS=['ich','du','er/sie/es','wir','ihr','sie/Sie'],PRON1=['ich','du','er','wir','ihr','sie'];
function drawVerb(){const box=$('#vb');const Q=VB.q;const tot=Q.items.length;if(!box)return;
  if(Q.n>=tot){box.innerHTML=`<div class="flash">${endCard(Q,tot)}</div>`;$('#again').onclick=()=>vVerbs($('#view'));return}
  const {v,p}=Q.items[Q.n],perf=VB.mode==='perf';const ans=perf?auxF(v[4],p)+' '+v[5]:v[2][p];const say=PRON1[p]+' '+ans;
  box.innerHTML=`<div class="flash">${scoreBar(Q,tot)}<div class="fcard"><div class="muted">${perf?'Passato prossimo di':'Presente di'} <b class="read">${esc(v[0])}</b> · ${esc(v[1])}</div><div class="row" style="align-items:baseline;gap:10px"><span class="w1">${PRONS[p]}</span><input class="field read big-in" id="vIn" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Forma del verbo" placeholder="${perf?'habe … / bin …':'…'}"></div>${umlautBar()}<div id="vfb" role="status"></div></div><div class="row"><button class="btn pri" id="vChk">Controlla</button><button class="btn ghost" id="vSkip">Non lo so</button></div></div>`;
  const inp=$('#vIn',box);bindUml(box,inp);inp.focus();let done=false;
  const chk=give=>{if(done){Q.n++;drawVerb();return}const val=normA(inp.value);if(!val&&!give)return;done=true;const ok=!give&&val===normA(ans);const e=(S.vb=S.vb||{})[v[0]]||(S.vb[v[0]]=[0,0]);ok?e[0]++:e[1]++;if(ok)Q.ok++;save();
   inp.readOnly=true;inp.classList.add(ok?'right':'wrong');$('#vfb',box).innerHTML=`<p style="margin:8px 0"><b style="color:var(--${ok?'ok':'bad'})">${ok?'Giusto!':'La forma giusta è:'}</b> <span class="read" style="font-size:20px">${esc(say)}</span> ${playBtn(say)}</p>${verbTable(v)}`;speak(say);$('#vChk',box).textContent='Avanti';$('#vSkip',box).hidden=true};
  $('#vChk',box).onclick=()=>chk(false);$('#vSkip',box).onclick=()=>chk(true);inp.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();chk(false)}}}
function drawVerbTables(box){const L=vbPool();box.innerHTML=`<input class="field" id="vbS" type="search" placeholder="Cerca un verbo in tedesco o in italiano" style="max-width:340px;margin-bottom:12px" aria-label="Cerca verbo"><div class="vgrid" id="vbg"></div>`;
  const draw=q=>{q=q.toLowerCase();$('#vbg',box).innerHTML=L.filter(v=>!q||v[0].includes(q)||v[1].toLowerCase().includes(q)).map(v=>`<details class="card vcard"><summary><span class="read" style="font-size:19px;font-weight:600">${esc(v[0])}</span> <span class="muted small">${esc(v[1])}</span>${v[6]?' <span class="pill">irregolare</span>':''}</summary>${verbTable(v)}</details>`).join('')||'<p class="muted">Nessun verbo trovato.</p>'};
  draw('');$('#vbS',box).oninput=e=>draw(e.target.value)}

/* ===== casi ===== */
let CQ=null;const CASE_IT={nom:'nominativo',akk:'accusativo',dat:'dativo'};
const CASE_OPTS={'der/die/das':['der','die','das','den','dem'],'ein/eine':['ein','eine','einen','einem','einer'],'mein/meine':['mein','meine','meinen','meinem','meiner']};
function vCases(m){ACT.kind='rev';CQ={q:shuffle(D.CASES).slice(0,12),n:0,ok:0};
  m.innerHTML=`<div class="vhead"><div><h1>Casi</h1><p>Scegli l'articolo giusto. Chiediti due cose: il nome è maschile, femminile o neutro? E che ruolo ha nella frase (soggetto, oggetto, dopo «mit»…)?</p></div><a class="btn ghost sm" href="#manuale-casi">${ic('book')} Ripassa la tabella</a></div><div class="flash" id="cq"></div>`;drawCase()}
function drawCase(){const box=$('#cq');if(!box||!CQ)return;const tot=CQ.q.length;
  if(CQ.n>=tot){box.innerHTML=endCard(CQ,tot);$('#again').onclick=()=>vCases($('#view'));return}
  const c=CQ.q[CQ.n],cap=c.q.startsWith('___');const opts=CASE_OPTS[c.base].map(o=>cap?o[0].toUpperCase()+o.slice(1):o);
  box.innerHTML=`${scoreBar(CQ,tot)}<div class="fcard"><div class="read" style="font-size:26px;line-height:1.4">${esc(c.q).replace('___','<span class="blank">___</span>')}</div><div class="small muted"><b class="art-${c.g}">${esc(c.n)}</b> = ${esc(c.it)} · ${c.g==='m'?'maschile':c.g==='f'?'femminile':'neutro'}</div></div><div class="opts five">${opts.map(o=>`<button class="opt" data-o="${esc(o)}">${esc(o)}</button>`).join('')}</div><div id="cfb" class="small" role="status" style="min-height:48px"></div>`;
  $$('.opt',box).forEach(b=>b.onclick=()=>{const ok=b.dataset.o===c.a;if(ok)CQ.ok++;$$('.opt',box).forEach(x=>{x.disabled=true;if(x.dataset.o===c.a)x.classList.add('right')});if(!ok)b.classList.add('wrong');
   $('#cfb',box).innerHTML=`<div class="read" style="font-size:19px">${esc(c.s)} ${playBtn(c.s)}</div><div class="muted"><b>${CASE_IT[c.case]}</b>: ${esc(c.why)}.</div><button class="btn sec sm" id="cNext" style="margin-top:8px">Avanti</button>`;speak(c.s);$('#cNext',box).onclick=()=>{CQ.n++;drawCase()};$('#cNext',box).focus()})}

/* ===== ordina la frase ===== */
let OQ=null;
function orderPool(){const T=D.S.filter(t=>S.done[t.id]||compOf(t.s)>=.6);const src=(T.length>=3?T:D.S.filter(t=>t.lv==='A1'));return src.flatMap(t=>t.s.filter(s=>{const n=s[0].split(' ').length;return n>=4&&n<=10&&s[1]&&!/[«»"„“]/.test(s[0])}).map(s=>[s[0],s[1]]))}
function vOrder(m){ACT.kind='out';OQ={q:shuffle(orderPool()).slice(0,8),n:0,ok:0};
  m.innerHTML=`<div class="vhead"><div><h1>Ordina la frase</h1><p>Tocca le parole nell'ordine giusto. Ricorda: il verbo coniugato sta al secondo posto, la seconda parte del verbo (participio, infinito, prefisso) va in fondo.</p></div></div><div class="flash" id="oq"></div>`;drawOrder()}
function drawOrder(){const box=$('#oq');if(!box||!OQ)return;const tot=OQ.q.length;
  if(OQ.n>=tot){box.innerHTML=endCard(OQ,tot);$('#again').onclick=()=>vOrder($('#view'));return}
  const [de,it]=OQ.q[OQ.n];const punct=(de.match(/[.!?]$/)||[''])[0];const words=de.replace(/[.!?]$/,'').split(' ');
  let tiles=shuffle(words.map((w,k)=>({w,k})));if(tiles.every((t,k)=>t.k===k))tiles=tiles.reverse();const built=[];
  const draw=()=>{$('#ob',box).innerHTML=built.length?built.map((t,k)=>`<button class="tile on" data-b="${k}">${esc(t.w)}</button>`).join('')+`<span class="punct">${punct}</span>`:'<span class="muted small">Tocca le parole qui sotto</span>';
   $('#ot',box).innerHTML=tiles.map((t,k)=>`<button class="tile" data-t="${k}" ${built.includes(t)?'disabled':''}>${esc(t.w)}</button>`).join('');
   $$('[data-t]',box).forEach(b=>b.onclick=()=>{built.push(tiles[+b.dataset.t]);draw();if(built.length===words.length)check()});
   $$('[data-b]',box).forEach(b=>b.onclick=()=>{if(box.dataset.done)return;built.splice(+b.dataset.b,1);draw()})};
  box.innerHTML=`${scoreBar(OQ,tot)}<div class="fcard"><div class="muted">Come si dice in tedesco?</div><div style="font-size:19px">${esc(it)}</div><div class="obuilt" id="ob"></div></div><div class="tiles" id="ot"></div><div class="row"><button class="btn ghost" id="oHear">${ic('spk')} Aiuto: ascolta</button><button class="btn ghost" id="oReset">Ricomincia</button></div><div id="ofb" role="status"></div>`;
  draw();$('#oHear',box).onclick=()=>speak(de);$('#oReset',box).onclick=()=>{if(box.dataset.done)return;built.length=0;draw()};
  const check=()=>{box.dataset.done=1;const mine=built.map(t=>t.w).join(' ');const ok=mine===words.join(' ');if(ok)OQ.ok++;
   $('#ofb',box).innerHTML=`<div class="fcard ${ok?'okc':''}" style="gap:6px"><b style="color:var(--${ok?'ok':'bad'})">${ok?'Esatto!':'L\'originale è:'}</b><div class="read" style="font-size:20px">${esc(de)} ${playBtn(de)}</div>${ok?'':'<p class="tiny muted" style="margin:0">A volte in tedesco esiste più di un ordine corretto (per esempio con l\'avverbio di tempo all\'inizio). Se la tua frase aveva il verbo al secondo posto, poteva essere giusta anche lei.</p>'}<div class="row">${ok?'':'<button class="btn ghost sm" id="oMine">La mia era corretta lo stesso</button>'}<button class="btn pri sm" id="oNext">Avanti</button></div></div>`;
   speak(de);$('#oNext',box).onclick=()=>{delete box.dataset.done;OQ.n++;drawOrder()};const mb=$('#oMine',box);if(mb)mb.onclick=()=>{OQ.ok++;mb.disabled=true;mb.textContent='Contata come giusta'}}}

/* ===== ascolta e capisci ===== */
let LQ=null;
function vListen(m){ACT.kind='imm';const T=D.S.filter(t=>compOf(t.s)>=.5||S.done[t.id]);const src=(T.length>=3?T:D.S.filter(t=>t.lv==='A1'));
  const all=src.flatMap(t=>t.s.filter(s=>s[1]&&s[0].length>18).map(s=>[s[0],s[1],t.lv]));
  LQ={q:shuffle(all).slice(0,10),all,n:0,ok:0};
  m.innerHTML=`<div class="vhead"><div><h1>Ascolta e capisci</h1><p>Senti una frase senza vederla e scegli cosa significa. Puoi riascoltarla, anche lentamente, prima di rispondere.</p></div></div><div class="flash" id="lq"></div>`;drawListen()}
function drawListen(){const box=$('#lq');if(!box||!LQ)return;const tot=LQ.q.length;
  if(LQ.n>=tot){box.innerHTML=endCard(LQ,tot);$('#again').onclick=()=>vListen($('#view'));return}
  const [de,it]=LQ.q[LQ.n];const opts=shuffle([it,...shuffle(LQ.all.filter(x=>x[1]!==it)).slice(0,3).map(x=>x[1])]);
  box.innerHTML=`${scoreBar(LQ,tot)}<div class="fcard center"><div class="row">${playBtn(de,'lg')}${slowBtn(de)}</div><div id="lde" class="read" style="font-size:21px;min-height:30px" aria-live="polite"></div></div><div class="opts">${opts.map((o,k)=>`<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div><button class="btn sec" id="lNext" hidden>Avanti</button>`;
  setTimeout(()=>speak(de),250);
  $$('.opt',box).forEach(b=>b.onclick=()=>{const ok=opts[+b.dataset.k]===it;if(ok)LQ.ok++;$$('.opt',box).forEach((x,k)=>{x.disabled=true;if(opts[k]===it)x.classList.add('right')});if(!ok)b.classList.add('wrong');$('#lde',box).textContent=de;const n=$('#lNext',box);n.hidden=false;n.focus();n.onclick=()=>{LQ.n++;drawListen()}})}

/* fonti condivise */
function srcSents(id){if(id==='frasi')return S.ph.map(p=>[p.de,p.it]);if(id&&id.startsWith('m:')){const c=D.M.find(x=>x.id===id.slice(2));return c?c.ex.map(e=>[e[0],e[1]]):[]}const t=getText(id);return t?t.s.map(s=>[s[0],s[1]]):[]}
function srcSelect(id,cur){return `<select class="field" id="${id}" style="width:100%" aria-label="Materiale">${S.ph.length?`<option value="frasi" ${cur==='frasi'?'selected':''}>Le mie frasi salvate (${S.ph.length})</option>`:''}<optgroup label="Testi">${allTexts().map(t=>`<option value="${t.id}" ${t.id===cur?'selected':''}>${t.lv} · ${esc(t.t)}</option>`).join('')}</optgroup><optgroup label="Manuale">${D.M.map(c=>`<option value="m:${c.id}" ${'m:'+c.id===cur?'selected':''}>${esc(c.t)}</option>`).join('')}</optgroup></select>`}
const validSrc=s=>s&&(s==='frasi'?S.ph.length>0:s.startsWith('m:')?!!D.M.find(c=>'m:'+c.id===s):!!getText(s));
const defSrc=()=>(D.S.find(t=>S.done[t.id])||bestText()).id;

/* ================= SHADOWING (+ registra e confronta) ================= */
const SH={src:null,sents:[],i:0,rep:0,reps:3,speed:1,hide:true,showIt:false,playing:false,run:0};
function shStop(){SH.run++;if(SH.playing){SH.playing=false;stopAudio()}}
function vShadow(m,arg){ACT.kind='sha';
  if(validSrc(arg)&&arg!==SH.src){shStop();SH.src=arg;SH.i=0;SH.rep=0}
  if(!validSrc(SH.src))SH.src=defSrc();
  SH.sents=srcSents(SH.src);if(SH.i>=SH.sents.length)SH.i=0;const sm=dayMin().sha;
  m.innerHTML=`<div class="vhead"><div><h1>Shadowing</h1><p>Parla <b>insieme</b> alla voce, nello stesso momento, copiando suoni, ritmo e intonazione. Dieci minuti al giorno allenano bocca e orecchio. Usa «Registrati» per sentire la differenza.</p></div><div class="row">${ringSvg(sm/60,S.set.sha)}<div class="small"><b class="tnum">${fmtMin(sm)}</b><br><span class="muted">di ${S.set.sha} min oggi</span></div></div></div>${subnav('shadowing')}
  <div class="shad"><div class="stack"><div class="stage" id="stage"></div><div class="card" id="recBox"></div></div>
   <aside class="side"><div class="card stack"><h2 class="h3">Materiale</h2>${srcSelect('shSrc',SH.src)}<p class="tiny muted" style="margin:0">Meglio un testo che hai già letto: qui conta il suono.</p></div>
   <div class="card stack small"><h2 class="h3">Impostazioni</h2><div class="between"><label for="shReps">Ripetizioni per frase</label><select class="field" id="shReps">${[2,3,4,5].map(n=>`<option ${n===SH.reps?'selected':''}>${n}</option>`).join('')}</select></div><div class="between"><label for="shSp">Velocità</label><select class="field" id="shSp">${[.75,.85,1].map(n=>`<option value="${n}" ${n===SH.speed?'selected':''}>${n}×</option>`).join('')}</select></div><div class="between"><label for="shHide">Ultima ripetizione senza testo</label><input type="checkbox" id="shHide" ${SH.hide?'checked':''}></div><div class="between"><label for="shIt">Mostra la traduzione</label><input type="checkbox" id="shIt" ${SH.showIt?'checked':''}></div><p class="tiny muted" style="margin:0">Tasti: spazio avvia/pausa · ←/→ frase.</p></div>
   <div class="card small"><b>Come si fa</b><ol style="margin:6px 0 0;padding-left:18px;display:grid;gap:4px"><li><b>Ascolta</b> una volta, in silenzio.</li><li><b>Parla insieme</b> alla voce, ad alta voce.</li><li><b>Senza testo</b>: solo orecchio e bocca.</li><li>Registrati e confronta con l'originale.</li></ol></div></aside></div>`;
  drawStage();drawRec();
  $('#shSrc',m).onchange=e=>{shStop();SH.src=e.target.value;SH.i=0;SH.rep=0;vShadow(m)};
  $('#shReps',m).onchange=e=>{SH.reps=+e.target.value};$('#shSp',m).onchange=e=>{SH.speed=+e.target.value};
  $('#shHide',m).onchange=e=>{SH.hide=e.target.checked;drawStage()};$('#shIt',m).onchange=e=>{SH.showIt=e.target.checked;drawStage()}}
function shPhase(){return SH.rep===0?0:(SH.hide&&SH.rep===SH.reps-1&&SH.reps>2)?2:1}
function drawStage(){const st=$('#stage');if(!st)return;if(!SH.sents.length){st.innerHTML='<p class="muted">Nessuna frase qui.</p>';return}
  const [de,it]=SH.sents[SH.i],ph=shPhase();
  st.innerHTML=`<div class="between"><div class="phase"><span class="${ph===0?'on':''}">1 · Ascolta</span><span class="${ph===1?'on':''}">2 · Parla insieme</span>${SH.hide&&SH.reps>2?`<span class="${ph===2?'on':''}">3 · Senza testo</span>`:''}</div><span class="small muted tnum">frase ${SH.i+1}/${SH.sents.length} · ripetizione ${Math.min(SH.rep+1,SH.reps)}/${SH.reps}</span></div>
   <div class="shprog">${SH.sents.slice(0,80).map((_,k)=>`<i class="${k<SH.i?'done':k===SH.i?'cur':''}"></i>`).join('')}</div>
   <div class="shsent ${ph===2&&SH.playing?'blur':''}" aria-live="polite">${esc(de)}</div>${SH.showIt?`<div class="shtr">${esc(it)}</div>`:''}
   <div class="row" style="margin-top:auto"><button class="play" id="shPrev" aria-label="Frase precedente">${ic('prev')}</button><button class="btn pri" id="shPlay" style="min-width:150px">${SH.playing?ic('pause')+' Pausa':ic('play')+' '+(SH.i||SH.rep?'Riprendi':'Inizia')}</button><button class="play" id="shNext" aria-label="Frase successiva">${ic('next')}</button>${slowBtn(de)}<span class="small muted">${ph===0?'Ascolta senza parlare':ph===1?'Ora parla insieme alla voce':'Solo orecchio: niente testo'}</span></div>`;
  $('#shPlay').onclick=()=>{if(SH.playing){shStop();drawStage()}else{SH.playing=true;shLoop(++SH.run)}};
  $('#shPrev').onclick=()=>{shStop();SH.i=Math.max(0,SH.i-1);SH.rep=0;drawStage();drawRec()};$('#shNext').onclick=()=>{shStop();SH.i=Math.min(SH.sents.length-1,SH.i+1);SH.rep=0;drawStage();drawRec()}}
async function shLoop(run){ACT.kind='sha';while(SH.playing&&run===SH.run){drawStage();const [de]=SH.sents[SH.i];const ok=await speakP(de,{rate:SH.speed,slow:SH.speed<.9});if(!ok||run!==SH.run||!SH.playing){if(run===SH.run){SH.playing=false;drawStage()}return}
  await sleep(SH.rep===0?700:900);if(run!==SH.run)return;SH.rep++;if(SH.rep>=SH.reps){SH.rep=0;SH.i++;drawRec();if(SH.i>=SH.sents.length){SH.i=0;SH.playing=false;drawStage();toast('Fine del testo. Ricomincia o scegline un altro.');return}}}}
/* registra e confronta (MediaRecorder) */
const REC={mr:null,chunks:[],url:null};
function recStop(){try{if(REC.mr&&REC.mr.state==='recording')REC.mr.stop()}catch(e){}}
function drawRec(){const box=$('#recBox');if(!box)return;const [de]=SH.sents[SH.i]||[''];
  if(!navigator.mediaDevices||!window.MediaRecorder){box.innerHTML='<p class="small muted" style="margin:0">Questo browser non permette di registrare la voce.</p>';return}
  box.innerHTML=`<div class="between"><b>Registrati e confronta</b><span class="tiny muted">la registrazione resta sul tuo dispositivo</span></div><div class="row" style="margin-top:8px"><button class="btn sec" id="rcB">${ic('rec')} Registra</button><button class="btn ghost" id="rcO" ${REC.url?'':'disabled'}>${ic('spk')} Originale</button><button class="btn ghost" id="rcM" ${REC.url?'':'disabled'}>${ic('play')} La mia voce</button><button class="btn ghost" id="rcAB" ${REC.url?'':'disabled'}>Originale → mia</button></div>`;
  const rb=$('#rcB',box);rb.onclick=async()=>{if(REC.mr&&REC.mr.state==='recording'){REC.mr.stop();return}
   try{const st=await navigator.mediaDevices.getUserMedia({audio:true});shStop();REC.chunks=[];REC.mr=new MediaRecorder(st);REC.mr.ondataavailable=e=>REC.chunks.push(e.data);REC.mr.onstop=()=>{st.getTracks().forEach(t=>t.stop());if(REC.url)URL.revokeObjectURL(REC.url);REC.url=URL.createObjectURL(new Blob(REC.chunks,{type:REC.mr.mimeType||'audio/webm'}));drawRec()};REC.mr.start();rb.innerHTML=ic('stop')+' Ferma';rb.classList.add('bad')}catch(e){toast('Microfono non disponibile: controlla i permessi del browser')}};
  $('#rcO',box).onclick=()=>speak(de);const mine=()=>new Promise(r=>{stopAudio();const a=new Audio(REC.url);a.onended=r;a.onerror=r;a.play().catch(r)});$('#rcM',box).onclick=mine;$('#rcAB',box).onclick=async()=>{await speakP(de);await sleep(300);await mine()}}

/* ================= PRONUNCIA (riconoscimento vocale) ================= */
const PR={src:null,sents:[],i:0,ok:0,done:0};
const normW=s=>s.toLowerCase().replace(/ß/g,'ss').replace(/[.,!?;:"„“”«»()–—…]/g,' ').split(/\s+/).filter(Boolean);
function lcs(a,b){const n=a.length,m=b.length,d=[...Array(n+1)].map(()=>new Array(m+1).fill(0));for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)d[i][j]=a[i]===b[j]?d[i+1][j+1]+1:Math.max(d[i+1][j],d[i][j+1]);const keepA=new Set(),keepB=new Set();let i=0,j=0;while(i<n&&j<m){if(a[i]===b[j]){keepA.add(i);keepB.add(j);i++;j++}else if(d[i+1][j]>=d[i][j+1])i++;else j++}return {n:d[0][0],keepA,keepB}}
const NUMW={'1':'eins','2':'zwei','3':'drei','4':'vier','5':'fünf','6':'sechs','7':'sieben','8':'acht','9':'neun','10':'zehn','12':'zwölf','20':'zwanzig','30':'dreißig','100':'hundert'};
function diffHtml(target,heard){const a=normW(target),b=normW(heard).map(w=>NUMW[w]?NUMW[w].replace(/ß/g,'ss'):w);const r=lcs(a,b);let k=0;const words=target.split(/\s+/);return {html:words.map(w=>{const n=normW(w);if(!n.length)return esc(w);const cls=r.keepA.has(k)?'ok':'miss';k+=n.length;return `<span class="${cls}">${esc(w)}</span>`}).join(' '),score:a.length?r.n/a.length:0,extra:b.filter((_,j)=>!r.keepB.has(j))}}
function vPron(m,arg){ACT.kind='out';if(validSrc(arg)&&arg!==PR.src){PR.src=arg;PR.i=0}if(!validSrc(PR.src))PR.src=S.ph.length>=3?'frasi':defSrc();PR.sents=srcSents(PR.src);if(PR.i>=PR.sents.length)PR.i=0;
  m.innerHTML=`<div class="vhead"><div><h1>Pronuncia</h1><p>Ascolta la frase, poi premi il microfono e leggila ad alta voce. Il riconoscimento vocale del browser scrive quello che ha capito: le parole in verde sono arrivate chiare, quelle in rosso no. Se il tuo tedesco è comprensibile per lui, lo è anche per un tedesco.</p></div></div>${subnav('pronuncia')}
  <div class="shad"><div class="stage" id="pStage"></div><aside class="side"><div class="card stack"><h2 class="h3">Materiale</h2>${srcSelect('pSrc',PR.src)}</div><div class="card small stack">${SR?'<p style="margin:0">Il riconoscimento usa il servizio vocale del browser (in Chrome e Edge serve internet). La prima volta il browser ti chiede il permesso per il microfono.</p>':'<p style="margin:0"><b>Questo browser non ha il riconoscimento vocale.</b> Usa Chrome, Edge o Safari per il punteggio; qui puoi comunque registrarti e confrontarti.</p>'}<p class="tiny muted" style="margin:0">Consiglio: parla con calma, a volume normale, frase intera.</p></div></aside></div>`;
  $('#pSrc',m).onchange=e=>{PR.src=e.target.value;PR.i=0;vPron(m)};drawPron()}
function drawPron(){const st=$('#pStage');if(!st)return;if(!PR.sents.length){st.innerHTML='<p class="muted">Nessuna frase.</p>';return}const [de,it]=PR.sents[PR.i];
  st.innerHTML=`<div class="between"><span class="small muted tnum">frase ${PR.i+1}/${PR.sents.length}</span><span class="small tnum">${PR.done?`media ${Math.round(100*PR.ok/PR.done)}%`:''}</span></div><div class="shsent" id="pS">${esc(de)}</div><div class="shtr">${esc(it)}</div>
   <div class="row">${playBtn(de,'lg')}${slowBtn(de)}${SR?`<button class="btn pri" id="pMic">${ic('mic')} Parla</button>`:`<button class="btn pri" id="pRec">${ic('rec')} Registrati</button>`}<button class="btn ghost" id="pNext">Frase successiva ${ic('fwd')}</button></div><div id="pRes" role="status" class="stack"></div>`;
  $('#pNext',st).onclick=()=>{PR.i=(PR.i+1)%PR.sents.length;drawPron()};
  const mic=$('#pMic',st);if(mic)mic.onclick=async()=>{stopAudio();mic.disabled=true;mic.innerHTML=ic('mic')+' Ascolto…';mic.classList.add('bad');const res=$('#pRes',st);
   try{const alts=await listenOnce();let best=null;for(const h of alts){const d=diffHtml(de,h);if(!best||d.score>best.score)best={...d,h}}PR.done++;PR.ok+=best.score;ACT.last=Date.now();const p=Math.round(best.score*100);
    $('#pS',st).innerHTML=best.html;res.innerHTML=`<div class="row"><span class="big tnum" style="color:var(--${p>=90?'ok':p>=60?'warn':'bad'})">${p}%</span><span class="muted">${p>=90?'Ottimo, chiarissimo!':p>=60?'Buono. Riascolta le parole in rosso e riprova.':'Riascolta lentamente e riprova, parola per parola.'}</span></div><div class="small muted">Ho sentito: «${esc(best.h)}»</div>`}
   catch(e){const msg=String(e&&e.message||e);res.innerHTML=`<p class="small" style="color:var(--bad)">${/not-allowed|denied/i.test(msg)?'Il browser non ha il permesso del microfono.':/nospeech|no-speech/i.test(msg)?'Non ho sentito niente: riprova un po\' più vicino al microfono.':/network/i.test(msg)?'Il riconoscimento vocale richiede internet.':'Riconoscimento non riuscito, riprova.'}</p>`}
   mic.disabled=false;mic.classList.remove('bad');mic.innerHTML=ic('mic')+' Parla'};
  const rec=$('#pRec',st);if(rec){SH.sents=PR.sents;SH.i=PR.i;rec.onclick=()=>{const box=$('#pRes',st);box.id='recBox';drawRec()}}}

/* ================= DETTATO ================= */
const DT={src:null,sents:[],i:0,ok:0,done:0,checked:false};
function vDict(m,arg){ACT.kind='out';if(validSrc(arg)&&arg!==DT.src){DT.src=arg;DT.i=0;DT.ok=0;DT.done=0}
  if(!validSrc(DT.src)){DT.src=S.ph.length>=3?'frasi':defSrc();DT.i=0}
  DT.sents=srcSents(DT.src);if(DT.src==='frasi')DT.sents=shuffle(DT.sents);
  m.innerHTML=`<div class="vhead"><div><h1>Dettato</h1><p>Ascolta una frase e scrivila. Allena insieme orecchio e ortografia: capirai subito quali suoni ti sfuggono.</p></div></div>${subnav('dettato')}
   <div class="shad"><div class="stage" id="dStage"></div><aside class="side"><div class="card stack"><h2 class="h3">Materiale</h2>${srcSelect('dSrc',DT.src)}</div><div class="card small"><b>Consigli</b><ul style="margin:6px 0 0;padding-left:18px;display:grid;gap:4px"><li>Riascolta quante volte vuoi, anche lentamente.</li><li>Maiuscole e punteggiatura non contano.</li><li>Scrivi ä ö ü ß con i tasti sotto il campo.</li><li>Invio = controlla, Invio di nuovo = frase successiva.</li></ul></div></aside></div>`;
  $('#dSrc',m).onchange=e=>{DT.src=e.target.value;DT.i=0;DT.ok=0;DT.done=0;vDict(m)};drawDict()}
function drawDict(){const st=$('#dStage');if(!st)return;if(!DT.sents.length){st.innerHTML='<p class="muted">Nessuna frase disponibile.</p>';return}if(DT.i>=DT.sents.length)DT.i=0;const [de,it]=DT.sents[DT.i];DT.checked=false;
  st.innerHTML=`<div class="between"><span class="small muted tnum">frase ${DT.i+1}/${DT.sents.length}</span><span class="small tnum">${DT.done?`${DT.ok}/${DT.done} perfette`:''}</span></div><div class="row">${playBtn(de,'lg')}${slowBtn(de)}<span class="muted small">Ascolta e scrivi quello che senti</span></div>
   <textarea class="field read" id="dIn" rows="3" placeholder="Schreib, was du hörst…" aria-label="La tua trascrizione" autocomplete="off" spellcheck="false" autocapitalize="off"></textarea>${umlautBar()}<div id="dRes" role="status"></div><div class="row" style="margin-top:auto"><button class="btn pri" id="dChk">Controlla</button><button class="btn ghost" id="dSkip">Salta</button></div>`;
  const ta=$('#dIn',st);bindUml(st,ta);setTimeout(()=>{speak(de);ta.focus()},200);
  const check=()=>{if(DT.checked){DT.i++;drawDict();return}if(!normW(ta.value).length){ta.focus();return}const d=diffHtml(de,ta.value);DT.checked=true;DT.done++;const perfect=d.score===1&&!d.extra.length;if(perfect)DT.ok++;
   $('#dRes',st).innerHTML=`<div class="diff">${d.html}</div>${d.extra.length?`<div class="small">Parole in più o sbagliate: <s style="color:var(--bad)">${esc(d.extra.join(' '))}</s></div>`:''}<div class="small muted">${esc(it)}</div><div class="small" style="margin-top:6px"><b style="color:${perfect?'var(--ok)':'var(--warn)'}">${perfect?'Perfetto!':Math.round(100*d.score)+'% delle parole giuste.'}</b></div>`;
   $('#dChk',st).textContent='Frase successiva';ta.readOnly=true;save()};
  $('#dChk',st).onclick=check;$('#dSkip',st).onclick=()=>{DT.i++;drawDict()};ta.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();check()}}}

/* ================= COMPLETA IL TESTO (cloze) ================= */
const CZ={src:null};
function vCloze(m,arg){ACT.kind='rev';if(validSrc(arg))CZ.src=arg;if(!validSrc(CZ.src)||CZ.src==='frasi')CZ.src=defSrc();
  const sents=srcSents(CZ.src).slice(0,14);const t=getText(CZ.src);
  const gaps=[];const html=sents.map(([de],si)=>{let o='',last=0,mm;TOKRE.lastIndex=0;let k=0;while((mm=TOKRE.exec(de))){const w=mm[0];o+=esc(de.slice(last,mm.index));const isGap=w.length>=4&&(k%3===1)&&gaps.length<40;if(isGap){gaps.push(w);o+=`<input class="gap" data-g="${gaps.length-1}" size="${Math.max(4,w.length)}" autocomplete="off" spellcheck="false" autocapitalize="off" aria-label="Parola mancante ${gaps.length}">`}else o+=esc(w);last=mm.index+w.length;k++}return `<p>${o+esc(de.slice(last))} ${playBtn(de)}</p>`}).join('');
  m.innerHTML=`<div class="vhead"><div><h1>Completa il testo</h1><p>Riscrivi le parole mancanti. Ricordare attivamente una parola la fissa molto più che rileggerla. Puoi ascoltare ogni frase per aiutarti.</p></div></div>${subnav('completa')}
   <div class="shad"><div class="paper"><div class="text cloze">${html}</div><div class="row" style="margin-top:16px"><button class="btn pri" id="czC">Controlla</button><button class="btn ghost" id="czS">Mostra le soluzioni</button><span id="czR" class="small" role="status"></span></div></div>
   <aside class="side"><div class="card stack"><h2 class="h3">Testo</h2>${srcSelect('czSrc',CZ.src)}<p class="tiny muted" style="margin:0">Le maiuscole contano, gli umlaut anche.</p>${umlautBar()}</div></aside></div>`;
  let lastIn=null;$$('.gap',m).forEach(g=>g.onfocus=()=>{lastIn=g});$$('[data-ch]',m).forEach(b=>b.onclick=()=>{if(!lastIn)return;lastIn.value+=b.dataset.ch;lastIn.focus()});
  $('#czSrc',m).onchange=e=>{CZ.src=e.target.value;vCloze(m)};
  $('#czC',m).onclick=()=>{let ok=0;$$('.gap',m).forEach(g=>{const r=g.value.trim()===gaps[+g.dataset.g];g.classList.toggle('right',r);g.classList.toggle('wrong',!r&&!!g.value.trim());if(r)ok++});$('#czR',m).textContent=`${ok}/${gaps.length} giuste`;save()};
  $('#czS',m).onclick=()=>$$('.gap',m).forEach(g=>{if(g.value.trim()!==gaps[+g.dataset.g]){g.value=gaps[+g.dataset.g];g.classList.add('shown')}})}

/* ================= NUMERI ================= */
const NU={mode:'ascolta',max:100,n:0,ok:0,done:0,cur:0};
function vNumbers(m){ACT.kind='rev';
  m.innerHTML=`<div class="vhead"><div><h1>Numeri</h1><p>Prezzi, orari, numeri di telefono, indirizzi: i numeri arrivano veloci. Allenati finché li capisci al volo. Ricorda: 21 = <b>ein-und-zwanzig</b>, prima l'unità.</p></div></div>${subnav('numeri')}
  <div class="shad"><div class="stage" id="nStage"></div><aside class="side"><div class="card stack small"><h2 class="h3">Modalità</h2><div class="seg" role="tablist"><button data-m="ascolta" class="${NU.mode==='ascolta'?'on':''}">Ascolta → cifre</button><button data-m="scrivi" class="${NU.mode==='scrivi'?'on':''}">Cifre → parole</button></div><div class="between"><label for="nMax">Fino a</label><select class="field" id="nMax">${[20,100,1000].map(x=>`<option ${x===NU.max?'selected':''}>${x}</option>`).join('')}</select></div><a href="#manuale-numeri">Ripassa le regole nel manuale</a></div></aside></div>`;
  $$('[data-m]',m).forEach(b=>b.onclick=()=>{NU.mode=b.dataset.m;vNumbers(m)});$('#nMax',m).onchange=e=>{NU.max=+e.target.value;drawNum()};drawNum()}
function drawNum(){const st=$('#nStage');if(!st)return;const n=rint(NU.max+1);NU.cur=n;const w=n===1000?'tausend':numDe(n);const listen=NU.mode==='ascolta';
  st.innerHTML=`<div class="between"><span class="small muted">${listen?'Scrivi in cifre il numero che senti':'Scrivi il numero in lettere'}</span><span class="small tnum">${NU.done?`${NU.ok}/${NU.done}`:''}</span></div>${listen?`<div class="row">${playBtn(w,'lg')}${slowBtn(w)}</div>`:`<div class="big num tnum">${n}</div>`}
   <input class="field read" id="nIn" ${listen?'inputmode="numeric"':''} autocomplete="off" spellcheck="false" autocapitalize="off" aria-label="Risposta" style="font-size:22px">${listen?'':umlautBar()}<div id="nRes" role="status"></div><div class="row"><button class="btn pri" id="nChk">Controlla</button></div>`;
  const inp=$('#nIn',st);if(!listen)bindUml(st,inp);if(listen)setTimeout(()=>speak(w),200);inp.focus();let checked=false;
  const chk=()=>{if(checked){drawNum();return}const v=inp.value.trim().toLowerCase().replace(/\s+/g,'').replace(/ss/g,'ß');if(!v)return;const ok=listen?v===String(n):(v===w||v===w.replace(/^ein(hundert|tausend)/,'$1'));checked=true;NU.done++;if(ok)NU.ok++;
   $('#nRes',st).innerHTML=`<p style="margin:0"><b style="color:var(--${ok?'ok':'bad'})">${ok?'Giusto!':'No:'}</b> ${n} = <b>${esc(w)}</b> ${playBtn(w)}</p>`;$('#nChk',st).textContent='Avanti';if(!listen)speak(w)};
  $('#nChk',st).onclick=chk;inp.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();chk()}}}

/* ================= SUONI ================= */
let PQ=null;
function vSounds(m){ACT.kind='rev';const pairs=D.SO.flatMap(g=>g.pairs.map(p=>[...p,g.t]));
  m.innerHTML=`<div class="vhead"><div><h1>Suoni e coppie minime</h1><p>Alcuni suoni tedeschi non esistono in italiano. Prima impara a <b>sentire</b> la differenza, poi a ripeterla: tocca ogni parola, ascoltala e ripetila ad alta voce esagerando.</p></div></div>${subnav('suoni')}
   <div class="grid g2" style="align-items:start"><div class="card stack"><h2 class="h3">Quiz d'ascolto: quale senti?</h2><p class="small muted" style="margin:0">Senti una delle due parole: scegli quella giusta.</p><div id="pq"></div></div>
   <div class="card stack">${D.SO.map(g=>`<div class="sound"><b>${esc(g.t)}</b><div class="small muted">${esc(g.d)}</div><div class="chips">${g.w.map(w=>`<button class="chipw" data-say="${esc(w)}">${ic('spk')} ${esc(w)}</button>`).join('')}${g.pairs.map(([a,b])=>`<span class="chipw pairw"><button class="btn ghost sm" data-say="${esc(a)}">${esc(a)}</button>/<button class="btn ghost sm" data-say="${esc(b)}">${esc(b)}</button></span>`).join('')}</div></div>`).join('')}</div></div>`;
  PQ={pairs,n:0,ok:0};drawPQ()}
function drawPQ(){const box=$('#pq');if(!box||!PQ)return;const p=rnd(PQ.pairs),k=rint(2);const opts=shuffle([0,1]);
  box.innerHTML=`<div class="between"><span class="small muted">${esc(p[2])}</span><span class="small tnum">${PQ.ok}/${PQ.n}</span></div><button class="btn sec" id="pqP" style="align-self:flex-start">${ic('spk')} Riascolta</button><div class="pairq">${opts.map(j=>`<button data-j="${j}">${esc(p[j])}</button>`).join('')}</div><div class="small" id="pqM" role="status" style="min-height:20px"></div>`;
  setTimeout(()=>speak(p[k]),200);$('#pqP',box).onclick=()=>speak(p[k]);
  $$('.pairq button',box).forEach(b=>b.onclick=()=>{const j=+b.dataset.j,ok=j===k;PQ.n++;if(ok)PQ.ok++;b.classList.add(ok?'right':'wrong');$$('.pairq button',box).forEach(x=>{x.disabled=true;if(+x.dataset.j===k)x.classList.add('right')});$('#pqM',box).innerHTML=ok?'<b style="color:var(--ok)">Giusto.</b>':`<b style="color:var(--bad)">Era «${esc(p[k])}».</b> Ascolta le due di seguito.`;
   if(!ok)(async()=>{await speakP(p[0]);await sleep(400);await speakP(p[1])})();setTimeout(drawPQ,ok?900:3200)})}

/* ================= MANUALE ================= */
function vManual(m,arg){ACT.kind='imm';const ch=D.M.find(c=>c.id===arg);if(arg==='logica')return vLogic(m);if(!ch)return manualIndex(m);
  const k=D.M.indexOf(ch),prev=D.M[k-1],next=D.M[k+1];
  const tab=t=>`<div class="scrollx"><table class="rules">${t.map((r,i)=>`<tr>${r.map(c=>i===0?`<th>${c}</th>`:`<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
  let extra='';if(ch.id==='alfabeto')extra=`<div class="card stack"><h2 class="h3">Le lettere</h2><p class="small muted" style="margin:0">Tocca una lettera per sentire come si chiama: ti serve per fare lo spelling del tuo nome al telefono (Buchstabieren).</p><div class="letters">${D.LET.map(([L,s])=>`<button class="letter" data-say="${esc(s)}"><b>${L}</b><span>${esc(s)}</span></button>`).join('')}</div></div>`;
  if(ch.id==='numeri')extra=`<div class="card stack"><h2 class="h3">Prova subito</h2><p class="small muted" style="margin:0">Scrivi un numero qualsiasi da 0 a 999.999 e lo leggo in tedesco.</p><div class="row"><input class="field" id="numIn" inputmode="numeric" placeholder="es. 365" style="width:160px" aria-label="Numero"><b id="numOut" style="font-size:18px"></b><button class="play" id="numP" aria-label="Ascolta">${ic('spk')}</button></div><a class="btn sec" href="#numeri" style="align-self:flex-start">${ic('hash')} Allenamento numeri</a></div>`;
  m.innerHTML=`<div class="crumb"><a href="#manuale">${ic('back')} Manuale</a><span>/</span><span>${esc(ch.t)}</span></div>
  <div class="man"><article class="stack"><div class="card stack"><div class="between"><span class="lv">${esc(ch.lv)}</span>${S.man[ch.id]?`<span class="pill ok">${ic('check')} studiato</span>`:''}</div><h1>${esc(ch.t)}</h1><p class="lead">${ch.intro}</p></div>
   ${ch.sec.map(s=>`<section class="card stack"><h2 class="h3">${esc(s.h)}</h2>${s.p?`<p style="margin:0">${s.p}</p>`:''}${s.tab?tab(s.tab):''}</section>`).join('')}
   ${extra}
   <section class="card stack"><div class="between"><h2 class="h3">Esempi da ascoltare</h2><a class="btn ghost sm" href="#shadowing-m:${ch.id}">${ic('shadow')} Shadowing</a></div><div class="exl">${ch.ex.map(([de,it])=>`<div class="exr">${playBtn(de)}<div><div class="de">${esc(de)}</div><div class="small muted">${esc(it)}</div></div></div>`).join('')}</div></section>
   <section class="card stack"><h2 class="h3">Esercizi</h2><div id="mq" class="stack"></div><div class="row"><button class="btn pri" id="mDone">${ic('check')} Segna come studiato</button><span id="mScore" class="small" role="status"></span></div></section>
   <nav class="between">${prev?`<a class="btn ghost" href="#manuale-${prev.id}">${ic('back')} ${esc(prev.t)}</a>`:'<span></span>'}${next?`<a class="btn sec" href="#manuale-${next.id}">${esc(next.t)} ${ic('fwd')}</a>`:''}</nav></article>
   <aside class="side"><div class="card"><b class="small">Capitoli</b><ol class="toc">${D.M.map(c=>`<li><a href="#manuale-${c.id}" class="${c===ch?'on':''}">${S.man[c.id]?'✓ ':''}${esc(c.t)}</a></li>`).join('')}<li><a href="#manuale-logica">La logica del tedesco (interattivo)</a></li></ol></div></aside></div>`;
  const ni=$('#numIn',m);if(ni){const up=()=>{const v=parseInt(ni.value.replace(/\D/g,''),10);$('#numOut',m).textContent=isNaN(v)?'':numDe(Math.min(v,999999))};ni.oninput=up;$('#numP',m).onclick=()=>{const t=$('#numOut',m).textContent;if(t)speak(t)}}
  const q=$('#mq',m);let right=0,answered=0;const tot=ch.quiz.length;
  q.innerHTML=ch.quiz.map((x,k)=>x.t==='mc'?`<div class="demo" data-k="${k}"><b>${esc(x.q)}</b><div class="opts">${x.o.map((o,j)=>`<button class="opt" data-j="${j}">${esc(o)}</button>`).join('')}</div><div class="small fb" hidden></div></div>`:`<div class="demo" data-k="${k}"><label for="mf${k}"><b>${esc(x.q)}</b></label><div class="row"><input class="field read" id="mf${k}" style="max-width:280px" autocomplete="off" spellcheck="false" autocapitalize="off"><button class="btn sec sm">Controlla</button><span class="tiny muted">${esc(x.h||'')}</span></div><div class="small fb" hidden></div></div>`).join('');
  const fbk=(box,ok,x)=>{const f=$('.fb',box);f.hidden=false;f.innerHTML=(ok?'<b style="color:var(--ok)">Esatto.</b> ':'<b style="color:var(--bad)">Non proprio.</b> ')+esc(x.why||'');answered++;if(ok)right++;$('#mScore',m).textContent=`${right}/${tot} giuste`};
  $$('.demo[data-k]',q).forEach(box=>{const x=ch.quiz[+box.dataset.k];
   if(x.t==='mc')$$('.opt',box).forEach(o=>o.onclick=()=>{const j=+o.dataset.j;$$('.opt',box).forEach((y,k)=>{y.disabled=true;if(k===x.a)y.classList.add('right')});if(j!==x.a)o.classList.add('wrong');fbk(box,j===x.a,x)});
   else{const inp=$('input',box),b=$('button',box);const go=()=>{if(inp.readOnly)return;const v=inp.value.trim();if(!v)return;const ok=x.a.some(a=>a.toLowerCase()===v.toLowerCase());inp.readOnly=true;inp.classList.add(ok?'right':'wrong');if(!ok)inp.value=v+'  →  '+x.a[0];fbk(box,ok,x)};b.onclick=go;inp.onkeydown=e=>{if(e.key==='Enter')go()}}});
  $('#mDone',m).onclick=()=>{S.man[ch.id]=today();save();toast('Capitolo segnato come studiato');if(next)location.hash='#manuale-'+next.id;else render()}}
function manualIndex(m){const done=D.M.filter(c=>S.man[c.id]).length;
  m.innerHTML=`<div class="vhead"><div><h1>Manuale</h1><p>La grammatica spiegata in italiano, a piccoli pezzi, con tabelle, esempi da ascoltare ed esercizi corretti subito. Non serve impararla tutta a memoria: leggi un capitolo, poi ritrovalo nei testi.</p></div><span class="pill ${done===D.M.length?'ok':'acc'} tnum">${done}/${D.M.length} capitoli studiati</span></div>
   <div class="hub">${D.M.map((c,k)=>`<a class="hcard" href="#manuale-${c.id}"><span class="ico mono">${esc(c.ic)}</span><div class="between"><h3>${k+1}. ${esc(c.t)}</h3>${S.man[c.id]?`<span class="pill ok">${ic('check')}</span>`:''}</div><span class="lv" style="align-self:flex-start">${esc(c.lv)}</span><p>${c.intro.replace(/<[^>]+>/g,'').slice(0,110)}…</p></a>`).join('')}<a class="hcard" href="#manuale-logica"><span class="ico">${ic('logic')}</span><h3>La logica del tedesco</h3><span class="lv" style="align-self:flex-start">interattivo</span><p>Casi, posizione del verbo, generi e pronuncia spiegati come un sistema, con demo da provare.</p></a></div>`}

/* ================= LOGICA ================= */
function vLogic(m){ACT.kind='imm';
  m.innerHTML=`<div class="crumb"><a href="#manuale">${ic('back')} Manuale</a><span>/</span><span>La logica del tedesco</span></div><div class="vhead"><div><h1>La logica del tedesco</h1><p>Smetti di vedere il tedesco come un problema: è un sistema logico. Qui capisci come «pensa» la lingua, con esempi da ascoltare e da provare.</p></div></div><div class="lcards">${D.L.map((L,k)=>`<details class="lc" ${k===0?'open':''}><summary><span class="n">${k+1}</span><h3>${esc(L.title)}</h3></summary><div class="lbody" data-l="${k}"></div></details>`).join('')}</div>`;
  $$('.lbody',m).forEach(b=>drawLogic(b,D.L[+b.dataset.l]))}
function sayRow(list){return `<div class="stack" style="gap:6px">${list.map(e=>`<div class="row">${playBtn(e)}<span class="read" style="font-size:19px">${esc(e)}</span></div>`).join('')}</div>`}
function drawLogic(b,L){let h=`<p>${esc(L.lead)}</p>`;
  if(L.points)h+=`<ul>${L.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul>`;
  if(L.demo==='casi')h+=`<div class="demo"><div class="dsent" id="dcs"></div><div class="muted" id="dcm"></div><div class="row"><button class="btn sec sm" data-c="0">Der Hund beißt den Mann</button><button class="btn sec sm" data-c="1">Sposta: Den Mann …</button><button class="btn sec sm" data-c="2">Cambia gli articoli</button></div><div class="tiny muted"><span class="art-m">■</span> nominativo = chi fa l'azione · <span style="color:var(--akk)">■</span> accusativo = chi la subisce</div></div>`;
  if(L.demo==='v2')h+=`<div class="demo"><div class="small muted">Cosa metti al primo posto?</div><div class="row">${['Ich','Heute','Im Büro'].map((x,k)=>`<button class="btn sec sm" data-v="${k}">${x}</button>`).join('')}</div><div class="dsent" id="v2s"></div><div class="tiny muted">Il verbo evidenziato resta sempre in seconda posizione.</div></div>`;
  if(L.demo==='nebensatz')h+=`<div class="demo"><div class="row"><button class="btn sec sm" data-n="0">… denn …</button><button class="btn sec sm" data-n="1">… weil …</button></div><div class="dsent" id="nbs"></div><div class="small muted" id="nbm"></div></div>`;
  if(L.marks)h+=`<div class="demo">${L.ex.map((e,k)=>`<div class="row">${playBtn(e)}<span class="dsent" style="font-size:21px">${esc(e).replace(new RegExp('\\b('+L.marks[k].map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')\\b','g'),'<span class="vb">$1</span>')}</span></div>`).join('')}</div>`;
  else if(L.ex&&L.ex.length&&!L.demo&&!L.rules&&!L.link)h+=sayRow(L.ex);
  if(L.rules)h+=`<div class="scrollx"><table class="rules"><tr><th>${L.id==='pronuncia'?'Lettere':L.id==='casiprep'?'Caso':'Articolo'}</th><th>${L.id==='pronuncia'?'Come si dice':'Quando'}</th><th>Esempi</th></tr>${L.rules.map(r=>`<tr><td><b class="${r[0]==='die'?'art-f':r[0]==='der'?'art-m':r[0]==='das'?'art-n':''}">${esc(r[0])}</b></td><td>${esc(r[1])}</td><td>${r[2].split(/,\s*|\s\/\s/).map(x=>`<button class="btn ghost sm" data-say="${esc(x)}">${esc(x)}</button>`).join(' ')}</td></tr>`).join('')}</table></div>`;
  if(L.game)h+=`<div class="demo" id="gg"></div>`;
  if(L.link)h+=sayRow(L.ex)+`<a class="btn sec sm" href="#parole-komposita" style="align-self:flex-start">Apri il laboratorio delle parole composte</a>`;
  if(L.demo&&L.ex)h+=`<details><summary class="small muted" style="cursor:pointer">Ascolta tutti gli esempi</summary>${sayRow(L.ex)}</details>`;
  if(L.quiz)h+=L.quiz.map((q,k)=>`<div class="demo" data-q="${k}"><b>${esc(q.q)}</b><div class="opts">${q.o.map((o,j)=>`<button class="opt" data-j="${j}">${esc(o)}</button>`).join('')}</div><div class="small" hidden></div></div>`).join('');
  b.innerHTML=h;
  if(L.demo==='casi'){const S3=[[['Der Hund','nom'],['beißt',''],['den Mann','akk'],"Il cane morde l'uomo."],[['Den Mann','akk'],['beißt',''],['der Hund','nom'],"Stesso significato: il cane morde l'uomo. L'ha detto l'articolo, non l'ordine!"],[['Der Mann','nom'],['beißt',''],['den Hund','akk'],"Ora l'uomo morde il cane: sono cambiati gli articoli, non l'ordine."]];
   const put=(k,say)=>{const s=S3[k];$('#dcs',b).innerHTML=s.slice(0,3).map(([w,c])=>`<span class="${c}">${w}</span>`).join(' ')+'.';$('#dcm',b).textContent=s[3];if(say)speak(s.slice(0,3).map(x=>x[0]).join(' ')+'.')};$$('[data-c]',b).forEach(x=>x.onclick=()=>put(+x.dataset.c,true));put(0)}
  if(L.demo==='v2'){const SS=[['Ich','arbeite','heute im Büro.','Ich arbeite heute im Büro.'],['Heute','arbeite','ich im Büro.','Heute arbeite ich im Büro.'],['Im Büro','arbeite','ich heute.','Im Büro arbeite ich heute.']];
   const put=(k,say)=>{const s=SS[k];$('#v2s',b).innerHTML=`${s[0]} <span class="vb">${s[1]}</span> ${s[2]}`;if(say)speak(s[3])};$$('[data-v]',b).forEach(x=>x.onclick=()=>put(+x.dataset.v,true));put(0)}
  if(L.demo==='nebensatz'){const N=[['Ich lerne Deutsch, denn ich <span class="vb">arbeite</span> in Berlin.','Ich lerne Deutsch, denn ich arbeite in Berlin.','Con «denn» l\'ordine resta normale: verbo in seconda posizione.'],['Ich lerne Deutsch, weil ich in Berlin <span class="vb">arbeite</span>.','Ich lerne Deutsch, weil ich in Berlin arbeite.','Con «weil» il verbo scappa in fondo. Stesso significato.']];
   const put=(k,say)=>{$('#nbs',b).innerHTML=N[k][0];$('#nbm',b).textContent=N[k][2];if(say)speak(N[k][1])};$$('[data-n]',b).forEach(x=>x.onclick=()=>put(+x.dataset.n,true));put(0)}
  if(L.game){const G={q:shuffle(L.game),n:0,ok:0};const box=$('#gg',b);const draw=()=>{if(G.n>=G.q.length){box.innerHTML=`<b>${G.ok}/${G.q.length} giusti.</b><button class="btn sec sm" id="ggA" style="align-self:flex-start">Ancora</button>`;$('#ggA',box).onclick=()=>{G.q=shuffle(L.game);G.n=0;G.ok=0;draw()};return}const [w,g]=G.q[G.n];
    box.innerHTML=`<div class="between"><span class="small muted">Indovina dalla terminazione · ${G.n+1}/${G.q.length}</span><span class="small tnum muted">${G.ok} giusti</span></div><div class="dsent">${esc(w)}</div><div class="gbtns"><button class="m" data-g="m">der</button><button class="f" data-g="f">die</button><button class="n" data-g="n">das</button></div><div class="small" id="ggm"></div>`;
    $$('[data-g]',box).forEach(x=>x.onclick=()=>{const ok=x.dataset.g===g;if(ok)G.ok++;$('#ggm',box).innerHTML=`${ok?'Giusto':'No'}: <b class="art-${g}">${ART[g]}</b> ${esc(w)}`;speak(ART[g]+' '+w);$$('[data-g]',box).forEach(y=>y.disabled=true);setTimeout(()=>{G.n++;draw()},ok?800:1600)})};draw()}
  $$('[data-q]',b).forEach(qb=>{const q=L.quiz[+qb.dataset.q];$$('.opt',qb).forEach(o=>o.onclick=()=>{const j=+o.dataset.j;$$('.opt',qb).forEach((x,k)=>{x.disabled=true;if(k===q.a)x.classList.add('right')});if(j!==q.a)o.classList.add('wrong');const msg=$('.small',qb);msg.hidden=false;msg.innerHTML=(j===q.a?'<b style="color:var(--ok)">Esatto.</b> ':'<b style="color:var(--bad)">Non proprio.</b> ')+esc(q.why)})})}

/* ================= PARLA: dialoghi guidati + scrittura ================= */
const WRITE_PROMPTS=['Racconta la tua mattina di oggi.','Descrivi la casa o la stanza dove ti trovi.','Cosa hai fatto lo scorso fine settimana?','Presentati come faresti il primo giorno di lavoro.','Scrivi un messaggio a un collega per dire che arrivi in ritardo.','Descrivi il tuo lavoro a qualcuno che non lo conosce.','Cosa ti piace e cosa ti manca della vita in Germania (o di come la immagini)?','Racconta il tuo piatto preferito e come si prepara.','Scrivi al padrone di casa: in cucina qualcosa non funziona.','Quali sono i tuoi piani per il prossimo mese?','Scrivi una mail per prenotare un appuntamento dal medico.','Descrivi la tua città ideale.'];
function umlautBar(){return `<div class="umlauts" aria-label="Lettere tedesche">${['ä','ö','ü','ß','Ä','Ö','Ü'].map(c=>`<button type="button" data-ch="${c}" tabindex="-1">${c}</button>`).join('')}</div>`}
function bindUml(r,ta){$$('[data-ch]',r).forEach(b=>b.onclick=()=>{const s=ta.selectionStart??ta.value.length,e=ta.selectionEnd??s;ta.value=ta.value.slice(0,s)+b.dataset.ch+ta.value.slice(e);ta.focus();ta.selectionStart=ta.selectionEnd=s+1;ta.dispatchEvent(new Event('input'))})}
let PL={tab:'dialoghi'};
function vTalk(m,arg){ACT.kind='out';if(arg==='scrivi')PL.tab='scrivi';else if(arg==='dialoghi'||!arg)PL.tab=arg?'dialoghi':PL.tab;
  m.innerHTML=`<div class="vhead"><div><h1>Parla e scrivi</h1><p>Il 20% del tempo è output: produrre tedesco, sbagliare e venire corretti subito. Nei dialoghi guidati rispondi in situazioni reali; nella scrittura ti corregge LanguageTool.</p></div></div><nav class="subnav"><a href="#parla-dialoghi" class="${PL.tab==='dialoghi'?'on':''}">${ic('talk')} Dialoghi guidati</a><a href="#parla-scrivi" class="${PL.tab==='scrivi'?'on':''}">${ic('pen')} Scrittura</a><a href="#pronuncia">${ic('mic')} Pronuncia</a><a href="#shadowing">${ic('shadow')} Shadowing</a></nav><div id="plb"></div>`;
  const B=$('#plb',m);if(PL.tab==='scrivi')return vWrite(B);
  B.innerHTML=`<div class="hub">${D.G.map(g=>{const r=S.dlg[g.id];return `<a class="hcard" href="#dialogo-${g.id}"><div class="between"><span class="lv">${esc(g.lv)}</span>${r?`<span class="pill ok tnum">${r.best}/${g.turns.length}</span>`:''}</div><h3>${esc(g.t)}</h3><b class="small read">${esc(g.ti)}</b><p>${esc(g.desc)}</p></a>`}).join('')}</div>
   <p class="small muted" style="margin-top:14px">Ogni risposta viene controllata in due modi: le parole chiave del compito e la grammatica con LanguageTool (gratuito, serve internet; offline controllo solo le parole chiave). Puoi rispondere scrivendo o ${SR?'parlando con il microfono':'scrivendo (il microfono non è disponibile in questo browser)'}.</p>`}
let DG=null;
function vDialog(m,id){ACT.kind='out';const g=D.G.find(x=>x.id===id);if(!g){location.hash='#parla';return}
  if(!DG||DG.g!==g||DG.fin)DG={g,i:0,log:[],score:0};
  m.innerHTML=`<div class="crumb"><a href="#parla-dialoghi">${ic('back')} Dialoghi guidati</a><span>/</span><span>${esc(g.t)}</span></div><div class="shad"><div class="chat" id="dChat"><div class="msgs" id="dMsgs" aria-live="polite"></div><div class="compose" id="dComp"></div></div>
   <aside class="side"><div class="card stack small"><h2 class="h3 read">${esc(g.ti)}</h2><p style="margin:0">${esc(g.desc)}</p><div class="bar"><i id="dProg"></i></div><span class="muted tnum" id="dPt"></span></div><div class="card small"><b>Come funziona</b><ol style="margin:6px 0 0;padding-left:18px;display:grid;gap:4px"><li>Ascolta la battuta.</li><li>Leggi il compito in italiano e rispondi in tedesco.</li><li>Ricevi la correzione e una risposta modello da ascoltare.</li></ol></div></aside></div>`;
  drawDialog()}
function drawDialog(){const g=DG.g,box=$('#dMsgs'),comp=$('#dComp');if(!box)return;
  $('#dProg').style.width=100*DG.i/g.turns.length+'%';$('#dPt').textContent=`${DG.i}/${g.turns.length} battute`;
  box.innerHTML=DG.log.map(l=>l.r==='npc'?`<div class="msg ai"><span class="spk">${esc(g.who)}</span>${esc(l.t)}<div class="row" style="margin-top:6px">${playBtn(l.t)}${slowBtn(l.t)}</div><details><summary>Traduzione</summary>${esc(l.it)}</details></div>`:l.r==='me'?`<div class="msg me">${esc(l.t)}</div>`:`<div class="msg fbm ${l.ok?'good':''}">${l.html}</div>`).join('');
  if(DG.i>=g.turns.length){DG.fin=true;const best=Math.max(DG.score,(S.dlg[g.id]||{}).best||0);S.dlg[g.id]={best,last:today()};save();
   comp.innerHTML=`<div class="stack"><b>Dialogo completato: ${DG.score}/${g.turns.length} risposte buone.</b><div class="row"><button class="btn pri" id="dAgain">Rifallo</button><button class="btn sec" id="dSave">${ic('star')} Salva le risposte modello</button><a class="btn ghost" href="#parla-dialoghi">Altri dialoghi</a></div></div>`;
   $('#dAgain').onclick=()=>{DG={g,i:0,log:[],score:0};drawDialog()};$('#dSave').onclick=e=>{let n=0;g.turns.forEach(t=>{if(addPhrase(t.model[0],'',g.t))n++});save();e.currentTarget.disabled=true;toast(`${n} frasi aggiunte al ripasso`)};box.scrollTop=box.scrollHeight;return}
  const t=g.turns[DG.i];
  if(!DG.log.length||DG.log[DG.log.length-1].turn!==DG.i||DG.log[DG.log.length-1].r!=='npc'&&!DG.waitNext){DG.log.push({r:'npc',t:t.npc,it:t.it,turn:DG.i});return drawDialog()}
  if(DG.waitNext){comp.innerHTML=`<button class="btn pri" id="dNext">Continua ${ic('fwd')}</button>`;$('#dNext').onclick=()=>{DG.waitNext=false;DG.i++;drawDialog()};$('#dNext').focus();box.scrollTop=box.scrollHeight;return}
  comp.innerHTML=`<div class="task"><b>Il tuo compito:</b> ${esc(t.task)}</div>${umlautBar()}<textarea id="dIn" class="field read" rows="2" placeholder="Rispondi in tedesco… (Invio per mandare)" aria-label="La tua risposta" autocapitalize="sentences"></textarea><div class="between"><div class="row">${SR?`<button class="btn sec sm" id="dMic">${ic('mic')} Parla</button>`:''}<button class="btn ghost sm" id="dHint">Suggerimento</button><button class="btn ghost sm" id="dShow">Mostra la risposta</button></div><button class="btn pri" id="dSend">Invia</button></div><div class="small muted" id="dH"></div>`;
  box.scrollTop=box.scrollHeight;setTimeout(()=>speak(t.npc),200);
  const ta=$('#dIn');bindUml(comp,ta);ta.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();dSend()}};$('#dSend').onclick=dSend;
  $('#dHint').onclick=()=>{$('#dH').textContent='Inizia così: '+t.hint};$('#dShow').onclick=()=>{ta.value=t.model[0];ta.focus()};
  const mic=$('#dMic');if(mic)mic.onclick=async()=>{stopAudio();mic.disabled=true;mic.innerHTML=ic('mic')+' Ascolto…';try{const a=await listenOnce();ta.value=a[0];ta.focus()}catch(e){toast('Non ho capito, riprova o scrivi')}mic.disabled=false;mic.innerHTML=ic('mic')+' Parla'}}
const kwNorm=s=>' '+s.toLowerCase().replace(/ß/g,'ss').replace(/[.,!?;:"„“”«»()]/g,' ').replace(/\s+/g,' ')+' ';
async function dSend(){const ta=$('#dIn');const ans=ta.value.trim();if(!ans)return;const g=DG.g,t=g.turns[DG.i];ta.disabled=true;$('#dSend').disabled=true;
  DG.log.push({r:'me',t:ans});drawDialogMsgs();
  const n=kwNorm(ans);const miss=t.kw.filter(grp=>!grp.some(k=>{const kk=k.toLowerCase().replace(/ß/g,'ss');return n.includes(' '+kk)||n.includes(kk)}));
  let ms=null;try{ms=(await ltCheck(ans)).filter(x=>!(x.rule&&/^(DE_CASE|UPPERCASE_SENTENCE_START)$/.test(x.rule.id)&&ans.length<4))}catch(e){ms=null}
  const gramOk=!ms||!ms.length,ok=!miss.length&&gramOk;if(ok)DG.score++;
  const model=t.model.map(x=>`<div class="row">${playBtn(x)}<b class="read">${esc(x)}</b></div>`).join('');
  const html=`<b>${ok?'Perfetto!':!miss.length?'Il senso c\'è, ma attenzione alla forma:':'Quasi: manca qualcosa del compito.'}</b>${miss.length?`<div class="small">Mancano: ${miss.map(grp=>'«'+esc(grp[0])+'»').join(', ')}</div>`:''}${ms&&ms.length?`<div class="small">${ltMark(ans,ms)}</div>${ltList(ans,ms)}<div class="small">Corretta: <b>${esc(ltApply(ans,ms))}</b></div>`:''}${ms===null?'<div class="tiny muted">Grammatica non controllata (LanguageTool non raggiungibile).</div>':''}<div class="small muted" style="margin-top:6px">Risposte modello:</div>${model}`;
  DG.log.push({r:'fb',html,ok});DG.waitNext=true;drawDialog();speak(t.model[0])}
function drawDialogMsgs(){const box=$('#dMsgs');if(box){const d=document.createElement('div');d.className='msg me';d.textContent=DG.log[DG.log.length-1].t;box.appendChild(d);box.scrollTop=box.scrollHeight}}
function vWrite(B){const d=new Date();const pi=(d.getFullYear()*372+d.getMonth()*31+d.getDate())%WRITE_PROMPTS.length;const recent=S.ph.slice(-8);
  B.innerHTML=`<div class="grid g2" style="align-items:start"><div class="card stack"><div class="eyebrow">Consegna di oggi</div><h2 class="h3 read" style="font-size:22px">${esc(WRITE_PROMPTS[pi])}</h2><p class="small muted" style="margin:0">Scrivi da 3 a 6 frasi. Prova a usare almeno due frasi salvate. La correzione la fa LanguageTool, gratuito (serve internet).</p>${umlautBar()}<textarea class="field read" id="wIn" rows="8" placeholder="Schreib hier…" aria-label="Il tuo testo"></textarea><div class="row"><button class="btn pri" id="wGo">Correggi</button><button class="btn ghost" id="wTr">${ic('tr')} Traduci in italiano</button><button class="btn ghost" id="wSay">${ic('spk')} Ascolta</button></div></div>
   <div class="stack"><div class="card" id="wOut" hidden></div><div class="card stack"><h2 class="h3">Le tue frasi recenti</h2>${recent.length?recent.map(p=>`<div class="row" style="align-items:flex-start;flex-wrap:nowrap">${playBtn(p.de)}<div><div class="read">${esc(p.de)}</div><div class="small muted">${esc(p.it)}</div></div></div>`).join(''):'<p class="small muted">Salva frasi con la stella mentre leggi: compariranno qui.</p>'}</div></div></div>`;
  const ta=$('#wIn',B);bindUml(B,ta);ta.value=sessionStorage.getItem('ww-draft')||'';ta.oninput=()=>{try{sessionStorage.setItem('ww-draft',ta.value)}catch(e){}};
  $('#wSay',B).onclick=()=>{const t=ta.value.trim();if(t)speak(t)};
  $('#wTr',B).onclick=async e=>{const t=ta.value.trim();if(!t)return;const out=$('#wOut',B);out.hidden=false;out.innerHTML='<p class="muted">Traduco…</p>';try{const parts=splitSent(t);const tr=[];for(const p of parts)tr.push(await translate(p));out.innerHTML=`<h2 class="h3">Cosa capisce un lettore</h2><p>${esc(tr.join(' '))}</p><p class="tiny muted">Traduzione automatica di MyMemory: se il senso è diverso da quello che volevi dire, c'è qualcosa da sistemare.</p>`}catch(err){out.innerHTML='<p class="muted">Traduzione non disponibile (offline o limite giornaliero).</p>'}};
  $('#wGo',B).onclick=async e=>{const t=ta.value.trim();if(t.length<10){toast('Scrivi qualche frase prima');return}const b=e.currentTarget;b.disabled=true;b.textContent='Correggo…';const out=$('#wOut',B);
   try{const ms=await ltCheck(t);const fixed=ltApply(t,ms);out.hidden=false;
    out.innerHTML=`<h2 class="h3">${ms.length?`${ms.length} ${ms.length===1?'suggerimento':'suggerimenti'}`:'Nessun errore trovato!'}</h2>${ms.length?`<div class="read" style="font-size:18px;line-height:1.7">${ltMark(t,ms)}</div>${ltList(t,ms)}<h3 class="h3" style="margin-top:10px">Versione corretta</h3><div class="read" style="font-size:18px">${esc(fixed)}</div>`:'<p class="read">'+esc(t)+'</p>'}<div class="row" style="margin-top:8px">${playBtn(fixed)}<button class="btn sec sm" id="wSave">${ic('star')} Salva le frasi corrette</button></div><p class="tiny muted">LanguageTool trova errori di grammatica, ortografia e maiuscole, ma non giudica lo stile. Le spiegazioni sono in tedesco: ottimo esercizio di lettura!</p>`;
    $('#wSave',out).onclick=ev=>{let n=0;splitSent(fixed).forEach(s=>{if(s.length>8&&addPhrase(s,'','Scrittura'))n++});save();ev.currentTarget.disabled=true;toast(`${n} frasi aggiunte al ripasso`)}}
   catch(err){out.hidden=false;out.innerHTML=`<p style="color:var(--bad)">${!online()?'Sei offline: la correzione richiede internet.':'LanguageTool non risponde ora (limite: circa 20 controlli al minuto). Riprova tra poco.'}</p>`}
   b.disabled=false;b.textContent='Correggi'}}

/* ================= ASCOLTO PASSIVO ================= */
const PASS={on:false,paused:false,q:[],i:0,end:0,run:0,night:false};
function passiveStart(ids,minutes){let texts=ids?ids.map(getText).filter(Boolean):D.S.filter(t=>S.done[t.id]||compOf(t.s)>=.55);if(!texts.length)texts=D.S.filter(t=>t.lv==='A1');
  PASS.q=texts.flatMap(t=>t.s.map(s=>[s[0],t.t]));PASS.i=0;PASS.end=minutes?Date.now()+minutes*60000:0;PASS.on=true;PASS.paused=false;stopAudio();passiveLoop(++PASS.run);updateMini();mediaSession();toast(minutes?`Ascolto per ${minutes} minuti`:'Ascolto passivo avviato: continua anche se cambi pagina')}
async function passiveLoop(run){while(PASS.on&&run===PASS.run){if(PASS.end&&Date.now()>PASS.end){passiveStop();toast('Gute Nacht!');return}const [de]=PASS.q[PASS.i%PASS.q.length];updateMini();const ok=await speakP(de,{passive:true,rate:PASS.night?.9:1});if(!PASS.on||run!==PASS.run)return;await sleep(ok?1300:300);PASS.i++}}
function passivePause(){if(!PASS.on)return;PASS.on=false;PASS.paused=true;PASS.run++;updateMini()}
function passiveResume(){if(!PASS.q.length)return passiveStart(null,0);PASS.on=true;PASS.paused=false;stopAudio();passiveLoop(++PASS.run);updateMini()}
function passiveStop(){PASS.on=false;PASS.paused=false;PASS.run++;stopAudio();PASS.night=false;$('#night').hidden=true;updateMini()}
function mediaSession(){try{if(!('mediaSession' in navigator))return;navigator.mediaSession.metadata=new MediaMetadata({title:'Ascolto passivo',artist:'Wortweg',album:'Tedesco'});navigator.mediaSession.setActionHandler('pause',passivePause);navigator.mediaSession.setActionHandler('play',passiveResume);navigator.mediaSession.setActionHandler('stop',passiveStop)}catch(e){}}
function updateMini(){const mi=$('#mini');if(!PASS.on&&!PASS.paused){mi.hidden=true;return}mi.hidden=false;const cur=PASS.q[PASS.i%Math.max(1,PASS.q.length)]||['',''];const left=PASS.end?Math.max(0,Math.ceil((PASS.end-Date.now())/60000)):0;
  mi.innerHTML=`<button class="play" id="miP" aria-label="${PASS.on?'Pausa':'Riprendi'}">${ic(PASS.on?'pause':'play')}</button><div class="txt"><b>Ascolto passivo · ${fmtMin(dayMin().pas)} oggi${left?` · ${left} min rimasti`:''}</b><span>${esc(cur[0])}</span></div><button class="play" id="miX" aria-label="Ferma l'ascolto">${ic('x')}</button>`;
  $('#miP').onclick=()=>PASS.on?passivePause():passiveResume();$('#miX').onclick=passiveStop;
  if(PASS.night){const n=$('#night');const c=n.querySelector('.clock');if(c)c.textContent=left+' min';const s=n.querySelector('.s');if(s)s.textContent=cur[0]}}
function nightStart(){modal(`<h2>Ascolto prima di dormire</h2><p class="muted small" style="margin:0">15–20 minuti di tedesco già noto prima di addormentarti: alcune ricerche suggeriscono che il cervello consolida nel sonno quello che ascolti poco prima. Lo schermo si oscura e l'audio si ferma da solo.</p><div class="choice">${[15,20,30].map(n=>`<button data-n="${n}"><b>${n} minuti</b><span>${n===20?'consigliato':''}</span></button>`).join('')}</div><div class="mbtns"><button class="btn ghost" id="mNo">Annulla</button></div>`,b=>{$('#mNo',b).onclick=closeModal;$$('[data-n]',b).forEach(x=>x.onclick=()=>{closeModal();const kn=D.S.filter(t=>S.done[t.id]||compOf(t.s)>=.8).map(t=>t.id);passiveStart(kn.length?kn:null,+x.dataset.n);PASS.night=true;const n=$('#night');n.hidden=false;n.innerHTML=`<div class="clock">${x.dataset.n} min</div><div class="s"></div><button class="btn sec" id="nStop">Ferma</button>`;$('#nStop').onclick=passiveStop;updateMini();try{navigator.wakeLock&&navigator.wakeLock.request('screen')}catch(e){}})})}

/* ================= CERCA + SCORCIATOIE ================= */
const SECTIONS=[['#oggi','Oggi · il piano del giorno'],['#allenati','Allenati'],['#articoli','der, die, das'],['#verbi','Verbi'],['#verbi-tab','Tabelle dei verbi'],['#casi','Casi'],['#ordina','Ordina la frase'],['#ascolta','Ascolta e capisci'],['#leggi','Leggi & ascolta'],['#parole','Le 1000 parole'],['#nuove','Parole di oggi'],['#parole-frasi','Frasi salvate'],['#parole-komposita','Parole composte'],['#pratica','Pratica'],['#ripasso','Ripasso'],['#shadowing','Shadowing'],['#pronuncia','Pronuncia'],['#dettato','Dettato'],['#completa','Completa il testo'],['#numeri','Numeri'],['#suoni','Suoni e coppie minime'],['#manuale','Manuale'],['#manuale-logica','La logica del tedesco'],['#parla-dialoghi','Dialoghi guidati'],['#parla-scrivi','Scrittura con correzione'],...D.M.map(c=>['#manuale-'+c.id,'Manuale · '+c.t])];
function searchOpen(){modal(`<input class="field" id="sq" type="search" placeholder="Cerca testi, parole, frasi, capitoli…" aria-label="Cerca" autocomplete="off" style="font-size:17px"><div class="sres" id="sr" role="listbox"></div><div class="tiny muted">↑ ↓ per muoverti · Invio per aprire · Esc per chiudere</div>`,b=>{let sel=0,items=[];
  const run=()=>{const q=$('#sq',b).value.trim().toLowerCase();const out=[];
   out.push(...SECTIONS.filter(([h,t])=>!q||t.toLowerCase().includes(q)).slice(0,q?8:12).map(([h,t])=>({h,t,k:'Sezioni',icn:'fwd'})));
   if(q){out.push(...allTexts().filter(t=>(t.t+' '+t.ti+' '+t.topic).toLowerCase().includes(q)).slice(0,6).map(t=>({h:'#testo-'+t.id,t:t.t,d:t.ti+' · '+t.lv,k:'Testi',icn:'read'})));
    out.push(...V.map((v,i)=>i).filter(i=>V[i][3]!=='name'&&(V[i][0].toLowerCase().startsWith(q)||V[i][1].toLowerCase().split(/[;,]\s*/).some(x=>x.replace(/^(il|lo|la|l'|i|gli|le) /,'').startsWith(q)))).sort((a,b)=>(RANK[a]||9999)-(RANK[b]||9999)).slice(0,8).map(i=>({w:i,t:disp(i),d:V[i][1],k:'Parole',icn:'spk'})));
    out.push(...S.ph.filter(p=>p.de.toLowerCase().includes(q)||(p.it||'').toLowerCase().includes(q)).slice(0,5).map(p=>({h:'#parole-frasi',t:p.de,d:p.it,k:'Frasi salvate',icn:'star'})))}
   items=out;sel=Math.min(sel,Math.max(0,out.length-1));let lastK='';
   $('#sr',b).innerHTML=out.map((x,k)=>{const head=x.k!==lastK?`<div class="k">${x.k}</div>`:'';lastK=x.k;return head+`<button class="sr ${k===sel?'sel':''}" data-k="${k}" role="option" aria-selected="${k===sel}"><span>${ic(x.icn)}</span><span><span class="t">${esc(x.t)}</span>${x.d?`<br><span class="d">${esc(x.d)}</span>`:''}</span><span class="d">${x.w!==undefined?(ws(x.w)===4?'conosciuta':ws(x.w)>0?'in apprendimento':'nuova'):''}</span></button>`}).join('')||'<p class="muted small" style="padding:8px">Nessun risultato.</p>';
   $$('.sr',b).forEach(e=>e.onclick=()=>go(+e.dataset.k))};
  const go=k=>{const x=items[k];if(!x)return;if(x.w!==undefined){const i=x.w;speak(disp(i));closeModal();const e=exampleFor(i);modal(`<div class="row">${playBtn(disp(i),'lg')}<h2>${esc(disp(i))}</h2></div><p style="font-size:18px;margin:0">${esc(V[i][1])}</p>${RANK[i]?`<p class="small muted" style="margin:0">Parola n. ${RANK[i]} per frequenza</p>`:''}${e?`<div class="row">${playBtn(e.de)}<span class="read">${esc(e.de)}</span></div><div class="small muted">${esc(e.it)}</div>`:''}<div class="mbtns"><button class="btn sec" id="wL">Da imparare</button><button class="btn sec" id="wK">La conosco</button><button class="btn pri" id="mOk">Chiudi</button></div>`,z=>{$('#mOk',z).onclick=closeModal;$('#wL',z).onclick=()=>{setWord(i,1,e?e.de:'');toast('Aggiunta al ripasso');closeModal()};$('#wK',z).onclick=()=>{setWord(i,4);closeModal()}});return}closeModal();location.hash=x.h};
  $('#sq',b).oninput=()=>{sel=0;run()};$('#sq',b).onkeydown=e=>{if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(items.length-1,sel+1);run()}else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(0,sel-1);run()}else if(e.key==='Enter'){e.preventDefault();go(sel)}};run()})}
function helpOpen(){modal(`<h2>Scorciatoie da tastiera</h2><div class="kbdlist"><kbd>Ctrl K</kbd><span>Cerca testi, parole, frasi e capitoli</span><kbd>g</kbd><span>poi <b>o</b> Oggi · <b>l</b> Leggi · <b>a</b> Allenati · <b>m</b> Manuale · <b>t</b> Parla · <b>p</b> Parole · <b>r</b> Ripasso · <b>s</b> Shadowing</span><kbd>n</kbd><span>Vai al prossimo passo del piano</span><kbd>Spazio</kbd><span>Lettore: ascolta tutto / pausa · Shadowing: avvia/pausa · Ripasso: gira la carta</span><kbd>← →</kbd><span>Frase precedente / successiva</span><kbd>1 2 3 4</kbd><span>Stato della parola aperta, voto nel ripasso, scelta nelle parole nuove</span><kbd>Esc</kbd><span>Chiudi pannelli e finestre</span><kbd>?</kbd><span>Questa guida</span></div><div class="mbtns"><button class="btn pri" id="mOk">Ok</button></div>`,b=>{$('#mOk',b).onclick=closeModal})}
let gPrefix=0;
addEventListener('keydown',e=>{const inF=e.target.matches('input,textarea,select');
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();searchOpen();return}
  if(e.key==='Escape'){if(!$('#modal').hidden){closeModal();return}if(PASS.night){passiveStop();return}if(WP){closeWord();return}}
  if(inF||!$('#modal').hidden||e.ctrlKey||e.metaKey||e.altKey)return;
  const v=route().v;
  if(gPrefix&&Date.now()-gPrefix<1200){gPrefix=0;const map={o:'oggi',l:'leggi',a:'allenati',p:'parole',r:'ripasso',s:'shadowing',d:'dettato',t:'parla',m:'manuale'};if(map[e.key])location.hash='#'+map[e.key];return}
  if(e.key==='g'){gPrefix=Date.now();return}
  if(e.key==='?'){helpOpen();return}
  if(e.key==='n'){const n=nextStep();if(n){if(n.act==='pas')passiveStart(null,0);else location.hash=n.href}return}
  if(v==='testo'&&RD){if(WP&&WP.i>=0){if(/^[1-4]$/.test(e.key)){wordState(+e.key);return}if(e.key==='Enter'){wordState(4);return}}
    if(e.key===' '){e.preventDefault();$('#playAll')?.click()}else if(e.key==='ArrowRight'){readStop();playSent(Math.min(RD.t.s.length-1,RD.cur+1))}else if(e.key==='ArrowLeft'){readStop();playSent(Math.max(0,RD.cur-1))}}
  if(v==='shadowing'){if(e.key===' '){e.preventDefault();$('#shPlay')?.click()}if(e.key==='ArrowRight')$('#shNext')?.click();if(e.key==='ArrowLeft')$('#shPrev')?.click()}
  if(v==='ripasso'&&RV&&!RV.done){if(!RV.show&&(e.key===' '||e.key==='Enter')){e.preventDefault();$('#rvShow')?.click()}else if(RV.show&&/^[1-4]$/.test(e.key))gradeReview(+e.key)}
  if(v==='articoli'&&/^[123]$/.test(e.key)){const b=$('#aq');b&&b.onkey&&b.onkey(e.key)}
  if(v==='nuove'&&NW&&!NW.fin){if(e.key==='1')$('#nwKnow')?.click();if(e.key==='2')$('#nwLearn')?.click()}});

/* ================= IMPOSTAZIONI, BACKUP, OFFLINE, INSTALLA ================= */
let installEvt=null;
addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvt=e;$$('[data-act=install]').forEach(b=>b.hidden=false)});
addEventListener('appinstalled',()=>{$$('[data-act=install]').forEach(b=>b.hidden=true);toast('Wortweg installata!')});
const isStandalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone;
function installHelp(){if(installEvt){installEvt.prompt();installEvt.userChoice.finally(()=>{installEvt=null;$$('[data-act=install]').forEach(b=>b.hidden=true)});return}
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent);modal(`<h2>Installa Wortweg</h2>${isStandalone()?'<p>È già installata su questo dispositivo.</p>':ios?'<p>Su iPhone e iPad: apri questa pagina in <b>Safari</b>, tocca il pulsante <b>Condividi</b> (il quadrato con la freccia) e scegli <b>Aggiungi alla schermata Home</b>.</p>':'<p>In Chrome o Edge: apri il menu del browser (⋮) e scegli <b>Installa app</b> o <b>Aggiungi a schermata Home</b>. Su computer trovi anche l\'icona di installazione nella barra degli indirizzi.</p>'}<p class="small muted">Una volta installata si apre come un'app, a schermo intero, e funziona anche offline.</p><div class="mbtns"><button class="btn pri" id="mOk">Ok</button></div>`,b=>{$('#mOk',b).onclick=closeModal})}
async function offlineAll(btn){if(!('caches' in window)){toast('Il browser non supporta la cache offline');return}const ids=[...new Set([...Object.values(D.A),...Object.values(D.AS||{})])];const c=await caches.open('ww-media');let n=0,fail=0;btn.disabled=true;
  const batch=12;for(let k=0;k<ids.length;k+=batch){await Promise.all(ids.slice(k,k+batch).map(async id=>{const u=clipUrl(id);try{if(!(await c.match(u))){const r=await fetch(u);if(r.ok)await c.put(u,r);else fail++}}catch(e){fail++}n++}));btn.textContent=`Scarico… ${Math.round(100*n/ids.length)}%`}
  btn.textContent=fail?`Fatto (${fail} non scaricati)`:'Tutto l\'audio è offline ✓';S.offline=today();save()}
function settings(){const s=S.set;const sel=(id,vals,cur,suf)=>`<select class="field" id="${id}">${vals.map(v=>`<option value="${v}" ${v==cur?'selected':''}>${v}${suf}</option>`).join('')}</select>`;
  const ntState=NT.st==='ready'?'pronta':NT.st==='loading'?`download ${Math.round(NT.prog*100)}%`:NT.st==='error'?'non disponibile':'non scaricata';
  modal(`<h2>Impostazioni</h2>
   <div><b class="small">App</b>
   <div class="setrow"><span>Installa sul dispositivo<div class="tiny muted">Si apre come un'app e funziona offline</div></span><button class="btn sec sm" id="sInst">${ic('install')} Installa</button></div>
   <div class="setrow"><span>Audio offline<div class="tiny muted">Scarica tutte le ${Object.keys(D.A).length} clip (circa 25 MB) per usarle senza internet${S.offline?' · ultimo download '+S.offline:''}</div></span><button class="btn sec sm" id="sOff">${ic('down')} Scarica</button></div></div>
   <div><b class="small">Il tuo sistema giornaliero</b>
   <div class="setrow"><label for="s1">Immersione (lettura e ascolto)</label>${sel('s1',[20,30,45,60,90],s.imm,' min')}</div>
   <div class="setrow"><label for="s2">Ripasso + shadowing</label>${sel('s2',[10,15,20,30],s.rev,' min')}</div>
   <div class="setrow"><label for="s5">… di cui shadowing</label>${sel('s5',[5,10,15],s.sha,' min')}</div>
   <div class="setrow"><label for="s6">Parlare e scrivere</label>${sel('s6',[5,10,15,20],s.out,' min')}</div>
   <div class="setrow"><label for="s3">Ascolto passivo</label>${sel('s3',[15,20,30,60],s.pas,' min')}</div>
   <div class="setrow"><label for="s4">Parole nuove al giorno</label>${sel('s4',[10,15,20,30],s.newPerDay,'')}</div></div>
   <div><b class="small">Voce</b>
   <div class="setrow"><label for="sV">Testi del corso<div class="tiny muted">Thorsten, voce neurale: ogni audio è verificato da un riconoscitore vocale</div></label><select class="field" id="sV"><option value="neural" ${s.voiceMode!=='browser'?'selected':''}>Voce neurale</option><option value="browser" ${s.voiceMode==='browser'?'selected':''}>Voce del dispositivo</option></select></div>
   <div class="setrow"><label for="sN">Voce neurale anche per i testi incollati<div class="tiny muted">Gira nel browser · ${ntState} · circa 95 MB la prima volta</div></label><input type="checkbox" id="sN" ${s.ntts?'checked':''}></div>
   <div class="setrow"><label for="sVo">Voce del dispositivo (riserva)</label><div class="row"><select class="field" id="sVo" style="max-width:200px">${DE_VOICES.length?DE_VOICES.map(v=>`<option value="${esc(v.voiceURI)}" ${deVoice&&v.voiceURI===deVoice.voiceURI?'selected':''}>${esc(v.name)}</option>`).join(''):'<option>Nessuna voce tedesca</option>'}</select><button class="btn sec sm" id="sVt">Prova</button></div></div>
   <div class="setrow"><label for="sR">Velocità generale</label>${sel('sR',[.8,.9,1,1.1,1.2],s.rate,'×')}</div></div>
   <div><b class="small">Dati</b><p class="tiny muted" style="margin:2px 0">I progressi restano su questo dispositivo. Per passarli su un altro, esporta il file e importalo là.</p>
   <div class="setrow"><span>Livello di partenza</span><button class="btn sec sm" id="sOnb">Ricalibra</button></div>
   <div class="setrow"><span>Backup</span><div class="row"><button class="btn sec sm" id="sEx">${ic('down')} Esporta file</button><label class="btn sec sm" for="sImF">Importa file</label><input type="file" id="sImF" accept="application/json,.json" hidden></div></div>
   <div class="setrow"><span>Azzera tutto</span><button class="btn bad sm" id="sRs">Azzera</button></div></div>
   <p class="tiny muted">Servizi gratuiti usati: <a href="https://languagetool.org" target="_blank" rel="noopener">LanguageTool</a> per la correzione, <a href="https://mymemory.translated.net" target="_blank" rel="noopener">MyMemory</a> per la traduzione, il riconoscimento vocale del browser per la pronuncia. Voce: Thorsten (Piper, licenza CC0).</p>
   <div class="mbtns"><button class="btn pri" id="mOk">Fatto</button></div>`,b=>{
   const bindN=(id,k)=>$('#'+id,b).onchange=e=>{S.set[k]=+e.target.value;save()};bindN('s1','imm');bindN('s2','rev');bindN('s3','pas');bindN('s4','newPerDay');bindN('s5','sha');bindN('s6','out');bindN('sR','rate');
   $('#sInst',b).onclick=()=>{closeModal();installHelp()};$('#sOff',b).onclick=e=>offlineAll(e.currentTarget);
   $('#sV',b).onchange=e=>{S.set.voiceMode=e.target.value;save();speak('Guten Tag! Wie geht es Ihnen?')};$('#sVo',b).onchange=e=>{S.set.voiceURI=e.target.value;loadVoices();save()};
   $('#sN',b).onchange=e=>{S.set.ntts=e.target.checked;save();if(e.target.checked)ntInit().catch(()=>{})};
   $('#sVt',b).onclick=()=>deviceSpeak('Guten Tag! Das ist die Stimme Ihres Geräts.',1,()=>{});
   $('#sOnb',b).onclick=()=>{closeModal();onboarding()};
   $('#sEx',b).onclick=()=>{download(`wortweg-backup-${today()}.json`,JSON.stringify(S),'application/json');toast('Backup esportato')};
   $('#sImF',b).onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const o=JSON.parse(await f.text());if(!o||!o.w||!o.set)throw 0;S=merge(DEF(),o);S.v=4;save();closeModal();render();toast('Backup importato')}catch(err){toast('Questo file non è un backup di Wortweg')}};
   $('#sRs',b).onclick=()=>modal(`<h2>Azzerare tutto?</h2><p class="muted">Perderai parole, frasi salvate e minuti registrati. Esporta prima un backup se vuoi tenerli.</p><div class="mbtns"><button class="btn ghost" id="mNo">Annulla</button><button class="btn bad" id="mGo">Azzera</button></div>`,x=>{$('#mNo',x).onclick=closeModal;$('#mGo',x).onclick=()=>{S=DEF();save();closeModal();render();onboarding()}});
   $('#mOk',b).onclick=()=>{closeModal();render()}})}
function onboarding(){modal(`<div class="eyebrow">Benvenuto in Wortweg</div><h2>Tedesco con input, contesto e un sistema</h2><p class="muted small" style="margin:0">Niente account, niente abbonamenti, niente vite. In <b>Oggi</b> trovi un piano in pochi passi e il pulsante <b>Prossimo</b> ti porta sempre al passo successivo. Nel <b>Manuale</b> c'è tutta la grammatica di base. Per calcolare quanto capisci di ogni testo, dimmi da dove parti:</p>
  <div class="choice"><button data-l="0"><b>Da zero</b><span>Conosco poche parole o niente.</span></button><button data-l="150"><b>Le basi</b><span>Saluti, numeri, essere e avere. Segno come conosciute le 150 parole più frequenti.</span></button><button data-l="400"><b>Livello A1</b><span>Mi presento, faccio la spesa, capisco frasi brevi. Segno le 400 più frequenti.</span></button><button data-l="800"><b>Livello A2</b><span>Racconto al passato e me la cavo ogni giorno. Segno le 800 più frequenti.</span></button></div><p class="tiny muted" style="margin:0">Puoi correggere ogni parola quando vuoi. Hai un backup? Importalo dalle impostazioni (icona ingranaggio).</p>`,b=>{
  $$('[data-l]',b).forEach(x=>x.onclick=()=>{const n=+x.dataset.l;CORE.slice(0,n).forEach(i=>{if(ws(i)===0)S.w[V[i][0]]={s:4,b:0,d:0,t:Date.now()}});S.onb=true;S.set.level=n>=800?'A2':'A1';save();closeModal();render();toast(n?`${n} parole segnate come conosciute`:'Si parte!')})})}

/* ================= AVVIO ================= */
$$('[data-act]').forEach(b=>b.onclick=({search:searchOpen,help:helpOpen,settings,install:installHelp})[b.dataset.act]);
addEventListener('online',()=>$('#offl').hidden=true);addEventListener('offline',()=>$('#offl').hidden=false);$('#offl').hidden=online();
if('serviceWorker' in navigator&&location.protocol!=='file:'){navigator.serviceWorker.register('sw.js').then(reg=>{reg.addEventListener('updatefound',()=>{const w=reg.installing;w&&w.addEventListener('statechange',()=>{if(w.state==='installed'&&navigator.serviceWorker.controller){const t=$('#upd');t.hidden=false;t.onclick=()=>w.postMessage('skip')}})})}).catch(()=>{})}
if('serviceWorker' in navigator&&navigator.serviceWorker.controller){let rl=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!rl){rl=true;location.reload()}})}
render();if(!S.onb)onboarding();
