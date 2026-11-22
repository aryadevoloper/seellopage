const ADP=document.body.dataset.mode==='admin';let ok=false;
init(ADP?['admin','owner']:null).then(async m=>{if(!m)return;
$('cr').innerHTML=[1,2,3,4,5,6,7,8,9,10].map(n=>`<option value="${n}">${n} GB</option>`).join('')+'<option value="0">Unlimited</option>';
const s=await api('servers');$('sv').innerHTML=s.length?s.map(v=>`<option value="${v.id}">${v.name}</option>`).join(''):'<option value="">Belum ada server</option>';
$('sv').onchange=pick;if(s.length)pick();else say('st','Owner belum menambah server',1)});
async function pick(){ok=false;$('go').disabled=true;$('ce').innerHTML='';say('st','Mengecek server...');
try{await api('check',{id:$('sv').value});const e=await api('eggs?server='+$('sv').value);
$('ce').innerHTML=e.map(x=>`<option value="${x.id}">${x.name}</option>`).join('');ok=true;$('go').disabled=false;say('st','Server siap')}
catch(e){say('st',e.message,1)}}
async function create(){say('cm','Membuat...');$('go').disabled=true;
try{const j=await api('create',{server:$('sv').value,name:$('cn').value,password:$('cp').value,ram:$('cr').value,cpu:$('cc').value,egg:$('ce').value,adp:ADP});
say('cm','Berhasil!\nDomain: '+j.domain+'\nUsername: '+j.username+'\nPassword: '+j.password)}catch(e){say('cm',e.message,1)}$('go').disabled=!ok}
