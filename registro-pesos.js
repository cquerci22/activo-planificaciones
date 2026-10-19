/* ACTIVO - Registro local de cargas. No envia datos a Supabase. */
(() => {
  'use strict';
  const KEY = 'activo_pesos_v1';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
  const save = data => { try { localStorage.setItem(KEY, JSON.stringify(data)); return true; } catch { return false; } };
  const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let clientId = '';
  let clientName = '';
  function exportRecords() {
    const records = [];
    const data = read();
    for (const [key, entries] of Object.entries(data)) {
      const [student,day,exercise] = key.split('|');
      if (student !== clientId || !Array.isArray(entries)) continue;
      for (const entry of entries) records.push({day_of_week:day,exercise_name:exercise,set_number:entry.set,weight_kg:entry.kg,reps:entry.reps,performed_at:entry.at});
    }
    if (!records.length) { alert('Todavía no hay pesos registrados.'); return; }
    const file = new Blob([JSON.stringify({format:'activo-pesos-v1',student_name:clientName,client_id:clientId,records},null,2)],{type:'application/json'});
    const url = URL.createObjectURL(file);
    const a = document.createElement('a'); a.href=url; a.download='activo-pesos-'+clientName.replace(/[^a-z0-9]/gi,'-')+'.json'; a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  const style = document.createElement('style');
  style.textContent = '.aft-weight{margin:12px 0;padding:12px;border:1px solid #52616d;border-radius:12px;background:rgba(80,95,120,.09)}.aft-weight-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:7px 0}.aft-weight input{width:85px;max-width:30%;padding:8px;border-radius:7px}.aft-weight button{padding:8px 12px}.aft-weight small{display:block;opacity:.8}.aft-weight-status{font-size:.85em;margin-top:6px}';
  document.head.appendChild(style);
  function attach() {
    const root = document.getElementById('publicPlan');
    if (!root || root.classList.contains('hidden')) return;
    const name = root.querySelector('.public-plan-header h2')?.textContent?.trim();
    if (!name) return;
    clientName = name;
    clientId = (window.publicClients || []).find(x => x.name === name)?.id || name;
    if (!root.querySelector('.aft-export')) {
      const btn=document.createElement('button'); btn.type='button'; btn.className='aft-export';
      btn.textContent='📤 Exportar mis pesos para el profesor'; btn.addEventListener('click',exportRecords);
      root.querySelector('.public-plan-header')?.appendChild(btn);
    }
    root.querySelectorAll('.public-ex').forEach((ex, index) => {
      if (ex.querySelector('.aft-weight')) return;
      const exercise = ex.querySelector('b')?.textContent?.trim();
      if (!exercise) return;
      const day = ex.closest('[data-public-panel]')?.getAttribute('data-public-panel') || '';
      const key = [clientId,day,exercise,index].join('|');
      const logs = read()[key] || [];
      const last = logs.at(-1);
      const panel = document.createElement('div');
      panel.className = 'aft-weight';
      panel.innerHTML = '<strong>🏋️ Mi registro de cargas</strong><small>Guardado solo en este dispositivo, sin sincronización.</small><div class="aft-weight-row"><label>Serie <input class="aft-set" type="number" min="1" max="30" value="1"></label><label>Kg <input class="aft-kg" type="number" min="0" max="1500" step="0.5" placeholder="Kg"></label><label>Reps <input class="aft-reps" type="number" min="0" max="1000" placeholder="Reps"></label></div><button type="button" class="aft-save">Guardar serie</button><div class="aft-weight-status" aria-live="polite"></div><details><summary>Ver historial</summary><div class="aft-history"></div></details>';
      const status = panel.querySelector('.aft-weight-status');
      const history = panel.querySelector('.aft-history');
      const render = () => {
        const entries = read()[key] || [];
        history.innerHTML = entries.length ? entries.slice(-15).reverse().map(x => '<div>'+esc(new Date(x.at).toLocaleDateString('es-AR'))+' · Serie '+esc(x.set)+' · '+esc(x.kg)+' kg'+(x.reps!==''?' · '+esc(x.reps)+' reps':'')+'</div>').join('') : '<small>Sin registros todavía.</small>';
      };
      if (last) panel.querySelector('.aft-kg').value = last.kg;
      panel.querySelector('.aft-save').addEventListener('click', () => {
        const set = Number(panel.querySelector('.aft-set').value);
        const kg = Number(panel.querySelector('.aft-kg').value);
        const raw = panel.querySelector('.aft-kg').value;
        const reps = panel.querySelector('.aft-reps').value;
        if (!Number.isInteger(set) || set<1 || set>30 || raw==='' || !Number.isFinite(kg) || kg<0 || kg>1500 || (reps!=='' && (!Number.isInteger(Number(reps)) || Number(reps)<0 || Number(reps)>1000))) {
          status.textContent='Revisá los valores de serie, kilos y repeticiones.'; return;
        }
        const data = read();
        (data[key] ||= []).push({set,kg,reps,at:new Date().toISOString()});
        if (!save(data)) { status.textContent='No se pudo guardar en este dispositivo.'; return; }
        status.textContent='✓ Serie guardada en este dispositivo';
        render();
      });
      ex.appendChild(panel);
      render();
    });
  }
  const observer = new MutationObserver(() => { attach(); });
  window.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('publicPlan');
    if (root) observer.observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
    attach();
  });
})();
