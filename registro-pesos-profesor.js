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
   target.innerHTML=error?'<p>'+escape(error.message)+'</p>':(data||[]).length?(data||[]).map(x=>'<div>'+escape(new Date(x.performed_at).toLocaleDateString('es-AR'))+' · '+escape(x.exercise_name)+' · serie '+escape(x.set_number)+' · '+escape(x.weight_kg)+' kg'+(x.reps!==null?' · '+escape(x.reps)+' reps':'')+'</div>').join(''):'<p>Sin registros.</p>';
  });
  if(!admin.classList.contains('hidden'))refresh();
 }
 window.addEventListener('DOMContentLoaded',init);
})();