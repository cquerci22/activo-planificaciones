/* ACTIVO · Mi Progreso v1: historial personal en este dispositivo.
   No expone ni consulta registros privados de otros alumnos. */
(() => {
  'use strict';
  const prefix='aft:mobile-progress:v1:';
  const $=(root,sel)=>root.querySelector(sel);
  const clean=s=>String(s||'').trim().replace(/\\s+/g,' ');
  const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
  const read=id=>{try{return JSON.parse(localStorage.getItem(prefix+id)||'[]')}catch{return []}};
  const save=(id,items)=>{try{localStorage.setItem(prefix+id,JSON.stringify(items.slice(-1500)));return true}catch{return false}};
  const fmt=n=>Number(n).toLocaleString('es-AR',{maximumFractionDigits:1});
  let active='';
  let current=null;
  const css=`
  .aft-prog-open{display:flex;align-items:center;justify-content:center;gap:9px;min-height:44px;padding:11px 16px;border:1px solid rgba(255,255,255,.18);border-radius:12px;background:linear-gradient(120deg,#a52029,#e43b43);color:#fff;font-weight:800;cursor:pointer;margin:12px 0;width:100%;box-shadow:0 8px 24px #d52a342a}
  .aft-last{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:8px 0 2px;font-size:.85rem;color:inherit;opacity:.87}
  .aft-last strong{color:#ff696e}
  .aft-prog{margin:18px 0;padding:18px;border-radius:20px;border:1px solid #ffffff22;background:linear-gradient(155deg,#242a35,#141920);color:#f3f5f8;box-shadow:0 15px 40px #0003}
  .aft-prog *{box-sizing:border-box}.aft-prog-head{display:flex;justify-content:space-between;gap:12px;align-items:center}.aft-prog-eyebrow{letter-spacing:.14em;font-size:10px;font-weight:900;color:#ff7579}.aft-prog h3{margin:4px 0;font-size:1.4rem;color:#fff}.aft-prog p{margin:6px 0;color:#bcc5d1;font-size:.88rem}
  .aft-prog-close{border:1px solid #ffffff30;border-radius:10px;background:#ffffff12;color:white;padding:7px 11px;cursor:pointer}
  .aft-prog-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:18px 0}
  .aft-prog-stat{background:#ffffff0b;border:1px solid #ffffff12;border-radius:13px;padding:12px 8px;min-width:0}
  .aft-prog-stat small{display:block;color:#b8c2cc;font-size:.69rem;line-height:1.3}.aft-prog-stat strong{display:block;margin-top:8px;font-size:1.1rem;color:#fff;overflow-wrap:anywhere}
  .aft-prog-select{width:100%;background:#10141c;border:1px solid #ffffff30;border-radius:11px;padding:12px;color:#fff;font:inherit;margin:8px 0 12px}
  .aft-prog-chart{background:#0b1018;border:1px solid #ffffff15;border-radius:14px;padding:10px 5px;overflow:hidden}
  .aft-prog-chart svg{width:100%;height:auto;display:block}.aft-prog-row{display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid #ffffff18;padding:10px 2px;font-size:.85rem}
  .aft-prog-row span{color:#b9c3ce}.aft-prog-empty{padding:30px 10px;text-align:center;color:#b9c3ce}
  .aft-prog-tiny{font-size:.74rem!important;color:#aeb8c2!important}
  @media(max-width:390px){.aft-prog{padding:12px}.aft-prog-stat{padding:9px 5px}.aft-prog-stat strong{font-size:.94rem}}
  `;
  const style=document.createElement('style');style.textContent=css;document.head.append(style);
  function chart(records){
    const byDay=new Map();
    records.forEach(r=>{const day=r.at.slice(0,10);byDay.set(day,Math.max(Number(r.kg),byDay.get(day)??0))});
    const points=[...byDay].sort((a,b)=>a[0].localeCompare(b[0]));
    if(!points.length)return '<div class="aft-prog-empty">Tus entrenamientos van a aparecer acá.</div>';
    const vals=points.map(p=>p[1]),lo=Math.max(0,Math.min(...vals)-5),hi=Math.max(...vals)+5;
    const coords=points.map((p,i)=>({x:35+(points.length===1?125:i*250/(points.length-1)),y:132-(p[1]-lo)/(hi-lo)*105,v:p[1]}));
    const line=coords.map((p,i)=>(i?'L':'M')+p.x.toFixed(1)+' '+p.y.toFixed(1)).join(' ');
    return '<svg viewBox="0 0 325 173" role="img" aria-label="Evolución del peso máximo registrado en cada fecha"><line x1="35" y1="132" x2="290" y2="132" stroke="#ffffff40"/><text x="4" y="31" font-size="10" fill="#b9c3ce">'+fmt(hi)+'</text><text x="4" y="133" font-size="10" fill="#b9c3ce">'+fmt(lo)+'</text><path d="'+line+'" fill="none" stroke="#ff4d55" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>'+coords.map(p=>'<circle cx="'+p.x+'" cy="'+p.y+'" r="4.2" fill="#ff6670"><title>'+fmt(p.v)+' kg</title></circle>').join('')+'<text x="35" y="159" font-size="10" fill="#b9c3ce">'+safe(points[0][0].slice(5))+'</text><text x="290" y="159" text-anchor="end" font-size="10" fill="#b9c3ce">'+safe(points.at(-1)[0].slice(5))+'</text></svg>';
  }
  function updatePanel(id,exercise){
    const box=document.getElementById('aft-progress-board');
    if(!box)return;
    const all=read(id),names=[...new Set(all.map(x=>x.exercise))].sort((a,b)=>a.localeCompare(b,'es'));
    const choice=exercise&&names.includes(exercise)?exercise:names.at(-1);
    const items=all.filter(x=>x.exercise===choice).sort((a,b)=>a.at.localeCompare(b.at));
    const best=items.length?Math.max(...items.map(x=>x.kg)):0,latest=items.at(-1);
    box.innerHTML='<div class="aft-prog-head"><div><div class="aft-prog-eyebrow">ACTIVO · TU ENTRENAMIENTO</div><h3>📈 Mi progreso</h3><p>Tus cargas, siempre a mano.</p></div><button class="aft-prog-close" type="button" aria-label="Cerrar progreso">✕</button></div>'
     +'<div class="aft-prog-stats"><div class="aft-prog-stat"><small>Última carga</small><strong>'+(latest?fmt(latest.kg)+' kg':'—')+'</strong></div><div class="aft-prog-stat"><small>Mejor marca</small><strong>'+(latest?fmt(best)+' kg':'—')+'</strong></div><div class="aft-prog-stat"><small>Registros</small><strong>'+items.length+'</strong></div></div>'
     +(names.length?'<label for="aft-prog-ex">Elegí el ejercicio</label><select class="aft-prog-select" id="aft-prog-ex">'+names.map(n=>'<option value="'+safe(n)+'"'+(n===choice?' selected':'')+'>'+safe(n)+'</option>').join('')+'</select>':'')
     +'<div class="aft-prog-chart">'+chart(items)+'</div><p class="aft-prog-tiny">Gráfico: mayor peso guardado por fecha. Los datos anteriores pueden no estar disponibles en este celular.</p>'
     +'<h4 style="margin:20px 0 7px;color:white">Últimas cargas</h4>'
     +(items.length?items.slice(-10).reverse().map(r=>'<div class="aft-prog-row"><span>'+safe(new Date(r.at).toLocaleDateString('es-AR'))+'</span><strong>'+fmt(r.kg)+' kg</strong></div>').join(''):'<div class="aft-prog-empty">Guardá una carga en tu rutina y la vas a ver acá.</div>')
     +'<p class="aft-prog-tiny">Historial personal guardado en este dispositivo. Las cargas nuevas también usan la sincronización existente de ACTIVO.</p>';
    $('.aft-prog-close',box).onclick=()=>{box.hidden=true};
    const selector=$ (box,'#aft-prog-ex');if(selector)selector.onchange=()=>updatePanel(id,selector.value);
  }
  function refresh(){
    const root=document.getElementById('publicPlan');
    if(!root||root.classList.contains('hidden'))return;
    const name=$ (root,'.public-plan-header h2')?.textContent?.trim();
    if(!name)return;
    const person=(window.publicClients||[]).find(x=>x.name===name);
    const id=String(person?.id||name);
    if(current!==id){current=id;active='';}
    const header=$(root,'.public-plan-header');
    if(header&&!$(root,'.aft-prog-open')){
      const button=document.createElement('button');button.type='button';button.className='aft-prog-open';button.textContent='📈 Mi progreso · Ver mis cargas';
      const board=document.createElement('section');board.id='aft-progress-board';board.className='aft-prog';board.hidden=true;
      button.onclick=()=>{board.hidden=!board.hidden;if(!board.hidden)updatePanel(id,active)};
      header.appendChild(button);header.after(board);
    }
    const legacy=(()=>{try{return JSON.parse(localStorage.getItem('activo:workout:v1:'+id+':weights')||'{}')}catch{return {}}})();
    root.querySelectorAll('.public-day-panel').forEach(panel=>{
      panel.querySelectorAll('.public-ex').forEach(card=>{
        const exercise=clean($(card,'b')?.textContent);if(!exercise)return;
        if(card.dataset.aftProgressBound===id)return;
        const saveBtn=$(card,'.workout-save-weight');const input=$(card,'.workout-weight-label input');
        if(!saveBtn||!input)return;
        card.dataset.aftProgressBound=id;
        const note=document.createElement('div');note.className='aft-last';
        const get=()=>read(id).filter(r=>r.exercise===exercise).sort((a,b)=>a.at.localeCompare(b.at));
        const last=get().at(-1);
        const legacyValue=legacy[Object.keys(legacy).find(k=>k.endsWith(':'+String(card.dataset.exerciseId||'')))] || '';
        const render=()=>{const previous=get().at(-1);note.innerHTML=previous?'Última carga: <strong>'+fmt(previous.kg)+' kg</strong> · '+safe(new Date(previous.at).toLocaleDateString('es-AR')):'Registrá tu primera carga para ver el historial';};
        if(last)input.value=last.kg;
        render();input.closest('.workout-weight-label')?.prepend(note);
        saveBtn.addEventListener('click',()=>{
          const raw=input.value.trim().replace(',','.');if(!raw)return;
          const kg=Number(raw);if(!Number.isFinite(kg)||kg<0||kg>1500)return;
          const logs=read(id);
          // Evita duplicados causados por doble toque inmediato.
          if(logs.at(-1)?.exercise===exercise&&logs.at(-1)?.kg===kg&&Date.now()-new Date(logs.at(-1).at).getTime()<1500)return;
          logs.push({exercise,kg,at:new Date().toISOString()});
          if(save(id,logs)){active=exercise;render();const b=document.getElementById('aft-progress-board');if(b&&!b.hidden)updatePanel(id,exercise);}
        });
      });
    });
  }
  let queued=false;
  const run=()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;refresh()})};
  window.addEventListener('DOMContentLoaded',()=>{
    const root=document.getElementById('publicPlan');if(root)new MutationObserver(run).observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
    refresh();
  });
})();
