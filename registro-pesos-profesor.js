/* ACTIVO - Importación de pesos por profesores autenticados. */
(() => {
 'use strict';
 const escape = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 async function init() {
  const admin=document.getElementById('admin'); if(!admin) return;
  const box=document.createElement('div');box.className='card';
  box.innerHTML='<h3>🏋️ Registro de pesos</h3><p>Importá el archivo que te envía el alumno. Los datos se guardan en Supabase.</p><label>Alumno <select id="aft-import-client"><option value="">Seleccioná un alumno</option></select></label><label>Archivo de pesos <input type="file" id="aft-import-file" accept=".json,application/json"></label><button id="aft-import-btn" type="button">Importar pesos</button><button id="aft-history-btn" type="button">Consultar evolución</button><div id="aft-import-message" role="status"></div><div id="aft-teacher-history"></div>';
  admin.appendChild(box);
  const $=id=>box.querySelector('#'+id);
  async function refresh() {
   const {data:{user}}=await sb.auth.getUser();if(!user)return;
   const {data,error}=await sb.from('clients').select('id,name').eq('created_by',user.id).order('name');
   if(error){$('aft-import-message').textContent=error.message;return;}
   $('aft-import-client').innerHTML='<option value="">Seleccioná un alumno</option>'+(data||[]).map(x=>'<option value="'+escape(x.id)+'">'+escape(x.name)+'</option>').join('');
  }
  const obs=new MutationObserver(()=>{if(!admin.classList.contains('hidden'))refresh();});
  obs.observe(admin,{attributes:true,attributeFilter:['class']});
  $('aft-import-btn').addEventListener('click',async()=>{
   const id=$('aft-import-client').value,file=$('aft-import-file').files[0],msg=$('aft-import-message');
   if(!id||!file){msg.textContent='Seleccioná un alumno y un archivo.';return;}
   if(file.size>1000000){msg.textContent='Archivo demasiado grande.';return;}
   try{
    const payload=JSON.parse(await file.text());
    if(payload.format!=='activo-pesos-v1'||payload.client_id!==id||!Array.isArray(payload.records)||payload.records.length>500){throw Error('Archivo inválido o demasiado grande.');}
    const rows=payload.records.map(x=>{
      const set=Number(x.set_number),kg=Number(x.weight_kg),reps=x.reps===''||x.reps==null?null:Number(x.reps),date=new Date(x.performed_at);
      if(!Number.isInteger(set)||set<1||set>30||!Number.isFinite(kg)||kg<0||kg>1500||(reps!==null&&(!Number.isInteger(reps)||reps<0||reps>1000))||isNaN(date.getTime())||String(x.exercise_name).length>200)throw Error('Hay registros con valores incorrectos.');
      return {client_id:id,day_of_week:String(x.day_of_week||'').slice(0,30),exercise_name:String(x.exercise_name),set_number:set,weight_kg:kg,reps,performed_at:date.toISOString()};
    });
    if(!rows.length)throw Error('El archivo no contiene registros.');
    if(!confirm('¿Importar '+rows.length+' registros de '+payload.student_name+' al alumno seleccionado?'))return;
    const {error}=await sb.from('exercise_weight_logs').upsert(rows,{onConflict:'client_id,exercise_name,performed_at,set_number',ignoreDuplicates:true});
    if(error)throw Error(error.message);
    msg.textContent='✓ '+rows.length+' registros guardados en Supabase.';
   }catch(e){msg.textContent='Error: '+e.message;}
  });
  $('aft-history-btn').addEventListener('click',async()=>{
   const id=$('aft-import-client').value;if(!id)return;
   const {data,error}=await sb.from('exercise_weight_logs').select('exercise_name,weight_kg,reps,set_number,performed_at').eq('client_id',id).order('performed_at',{ascending:false}).limit(100);
   const target=$('aft-teacher-history');
   if(error){target.textContent=error.message;return;}
   const records=data||[];
   if(!records.length){target.innerHTML='<p>Este alumno todavía no tiene registros importados.</p>';return;}
   const names=[...new Set(records.map(x=>x.exercise_name))].sort((a,b)=>a.localeCompare(b,'es'));
   target.innerHTML='<h4>📈 Evolución de fuerza</h4><label>Ejercicio <select id="aft-chart-exercise"></select></label><div id="aft-chart-container" style="margin:14px 0"></div><div id="aft-chart-list"></div>';
   const selector=target.querySelector('#aft-chart-exercise');
   names.forEach(name=>{const option=document.createElement('option');option.value=name;option.textContent=name;selector.appendChild(option);});
   const draw=()=>{
    const selected=records.filter(x=>x.exercise_name===selector.value).sort((a,b)=>new Date(a.performed_at)-new Date(b.performed_at));
    const grouped=new Map();
    selected.forEach(x=>{const day=String(x.performed_at).slice(0,10);grouped.set(day,Math.max(Number(x.weight_kg),grouped.get(day)||0));});
    const points=[...grouped].map(([date,kg])=>({date,kg}));
    const chart=target.querySelector('#aft-chart-container'),list=target.querySelector('#aft-chart-list');
    const min=Math.min(...points.map(p=>p.kg)),max=Math.max(...points.map(p=>p.kg));
    const low=Math.max(0,min-(max-min||10)*.2),high=max+(max-min||10)*.2;
    const coords=points.map((p,i)=>({x:55+(points.length===1?310:i*620/(points.length-1)),y:235-(p.kg-low)/(high-low)*185,...p}));
    const path=coords.map((p,i)=>(i?'L':'M')+p.x.toFixed(1)+' '+p.y.toFixed(1)).join(' ');
    chart.innerHTML='<svg viewBox="0 0 730 290" role="img" aria-label="Gráfico de evolución del peso máximo registrado por sesión" style="width:100%;max-width:760px;background:rgba(128,128,128,.07);border-radius:12px"><line x1="55" y1="235" x2="680" y2="235" stroke="currentColor" opacity=".3"/><line x1="55" y1="50" x2="55" y2="235" stroke="currentColor" opacity=".3"/><text x="10" y="45" fill="currentColor" font-size="14">'+high.toFixed(1)+' kg</text><text x="10" y="250" fill="currentColor" font-size="14">'+low.toFixed(1)+'</text><path d="'+path+'" fill="none" stroke="#e53935" stroke-width="4" stroke-linejoin="round"/>'+coords.map(p=>'<circle cx="'+p.x+'" cy="'+p.y+'" r="6" fill="#e53935"><title>'+escape(p.date)+' · '+p.kg+' kg</title></circle>').join('')+'<text x="55" y="275" fill="currentColor" font-size="13">'+escape(points[0].date)+'</text><text x="680" y="275" text-anchor="end" fill="currentColor" font-size="13">'+escape(points[points.length-1].date)+'</text></svg><p style="font-size:.85em;opacity:.8">Se muestra el mayor peso registrado en cada fecha (kg).</p>';
    list.innerHTML='<strong>Historial ('+selected.length+' series registradas)</strong>'+selected.slice().reverse().map(x=>'<div style="padding:5px 0;border-bottom:1px solid rgba(128,128,128,.2)">'+escape(new Date(x.performed_at).toLocaleDateString('es-AR'))+' · '+escape(x.weight_kg)+' kg · serie '+escape(x.set_number)+(x.reps!==null?' · '+escape(x.reps)+' reps':'')+'</div>').join('');
   };
   selector.addEventListener('change',draw);draw();
  });
  if(!admin.classList.contains('hidden'))refresh();
 }
 window.addEventListener('DOMContentLoaded',init);
})();