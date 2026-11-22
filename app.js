// GANTI dengan alamat API kamu (wajib https)
const API_URL='https://sag0tah7ot0g-production-ugmypw40.us-central1.suga.run';
const $=id=>document.getElementById(id);let T=localStorage.token,ME;
const h=t=>String(t??'').replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
async function api(p,b){const r=await fetch(API_URL+'/api/'+p,{method:b?'POST':'GET',headers:{'Content-Type':'application/json',Authorization:'Bearer '+T},body:b&&JSON.stringify(b)});
const j=await r.json();if(r.status===401&&!/login|register/.test(location.pathname))location='login.html';if(!r.ok)throw new Error(j.error);return j}
const say=(id,t,e)=>{$(id).textContent=t;$(id).className='msg '+(e?'err':'ok')};
const hm=t=>new Date(t).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
function logout(){localStorage.removeItem('token');location='login.html'}
const ROLE={user:'User',admin:'Admin',owner:'Owner'};
function plus(e){e.preventDefault();const s=document.createElement('div');s.className='sheet';
s.innerHTML='<div class="sheet-bg"></div><div class="sheet-box"><a class="opt" href="create.html"><i class="fa-solid fa-server"></i><div><b>Buat Panel</b><span>Panel biasa untuk bot atau game</span></div></a><a class="opt" href="admin.html"><i class="fa-solid fa-user-shield"></i><div><b>Buat Admin Panel</b><span>Akun dengan akses admin</span></div></a></div>';
s.onclick=ev=>{if(!ev.target.closest('.opt'))s.remove()};document.body.append(s)}
async function init(roles){try{ME=await api('me')}catch{return location='login.html'}
if(roles&&!roles.includes(ME.role))return location='home.html';
const p=location.pathname,multi=ME.role!=='user',on=u=>p.endsWith(u)?' on':'';
const L=[['home.html','fa-house','Home',on('home.html')],
multi?['#','fa-plus','Buat',' plus'+(/create|admin\.html/.test(p)?' on':''),'plus(event)']:['create.html','fa-plus','Buat Panel',' plus'+on('create.html')],
['chat.html','fa-comments','Chat',on('chat.html')]];
if(ME.role==='owner')L.push(['setting.html','fa-gear','Pengaturan',on('setting.html')]);
if($('top'))$('top').innerHTML=`<div class="bar-in"><a class="brand" href="home.html"><span class="logo"><i class="fa-solid fa-server"></i></span><span>Seello<small class="badge">${ROLE[ME.role]}</small></span></a><a class="iconbtn" href="profile.html" aria-label="Profil"><i class="fa-solid fa-circle-user"></i></a></div>`;
if($('bot'))$('bot').innerHTML='<div class="bar-in tabs">'+L.map(([u,i,t,c,f])=>`<a href="${u}" class="${c.trim()}" aria-label="${t}" ${f?`onclick="${f}"`:''}><i class="fa-solid ${i}"></i></a>`).join('')+'</div>';
return ME}
