/* ACTIVO: registro de cargas en Supabase sin login del alumno. */
(() => {
  'use strict';
  if (typeof enhancePublicWorkout !== 'function') return;
  const original = enhancePublicWorkout;
  enhancePublicWorkout = function(client, plans, exercises) {
    original(client, plans, exercises);
    document.querySelectorAll('.public-day-panel').forEach(panel => {
      const plan = (plans || []).find(p => p.day_of_week === panel.dataset.publicPanel);
      if (!plan) return;
      const list = (exercises || []).filter(e => e.plan_id === plan.id);
      panel.querySelectorAll('.public-ex').forEach((card, index) => {
        const ex = list[index];
        const btn = card.querySelector('.workout-save-weight');
        const input = card.querySelector('.workout-weight-label input');
        const status = card.querySelector('.workout-weight-feedback');
        if (!ex || !btn || !input || !status) return;
        btn.addEventListener('click', async () => {
          const raw = input.value.trim().replace(',', '.');
          const kg = Number(raw);
          if (!raw || !Number.isFinite(kg) || kg < 0 || kg > 1500) return;
          status.textContent = 'Guardado en celular. Sincronizando…';
          try {
            const { error } = await sb.from('aft_weight_sync').insert({
              client_id: client.id,
              exercise_name: ex.exercise_name,
              weight_kg: kg,
              performed_at: new Date().toISOString()
            });
            status.textContent = error ? 'Guardado en celular; no sincronizado' : '✓ Peso sincronizado';
          } catch (_) {
            status.textContent = 'Guardado en celular; sin conexión';
          }
        });
      });
    });
  };
})();