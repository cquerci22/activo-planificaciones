// ACTIVO | Control quincenal de planificaciones
(function () {
  const names = {
    '5d1005e9-ca80-49db-9ed6-8309ac9c16fd': 'Cristian',
    '873b7f5e-fa25-4451-a03f-26ee20af5b7d': 'Nicolás',
    '1f51bcf5-8092-436f-bbd2-09c35b1990b1': 'Rodrigo',
    'b03b6b12-46f1-44b5-842e-3931fe4ea875': 'Gerónimo'
  };
  const owner = '5d1005e9-ca80-49db-9ed6-8309ac9c16fd';
  const escape = v => String(v ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
  const age = r => r.ultima_actualizacion ?
    Math.max(0, Math.floor((Date.now() - Date.parse(r.ultima_actualizacion)) / 86400000)) : null;
  const late = r => !r.tiene_plan || age(r) === null || age(r) >= 14;
  let rows = [], userId = '';
  const style = document.createElement('style');
  style.textContent = `
  #controlQuincenal{margin:16px 0;padding:14px;background:#152239;border:1px solid #344968;border-radius:16px;color:#f8fafc}
  #controlQuincenal *{box-sizing:border-box}
  #controlQuincenal .control-toggle{width:100%;padding:15px;border:1px solid #5378aa;border-radius:12px;background:linear-gradient(120deg,#163b70,#245ba1);color:white;font-weight:800;font-size:16px;cursor:pointer;text-align:center}
  #controlQuincenal .control-body{padding-top:16px}
  #controlQuincenal .control-body[hidden],#controlQuincenal [hidden]{display:none!important}
  #controlQuincenal .control-metrics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:14px}
  #controlQuincenal .control-metric{padding:12px 5px;border-radius:11px;text-align:center;background:#24354c;border:1px solid #415675}
  #controlQuincenal .control-metric strong{display:block;font-size:25px;line-height:1.1}
  #controlQuincenal .control-metric small{display:block;font-size:11px;color:#d4deec;margin-top:5px}
  #controlQuincenal .control-metric.good{border-color:#198a5a;color:#8af0b3}
  #controlQuincenal .control-metric.bad{border-color:#c44752;color:#ffadb5}
  #controlQuincenal #controlPorProfesor{display:flex;gap:7px;flex-wrap:wrap;margin:12px 0}
  #controlQuincenal .control-pill{display:inline-block;border-radius:18px;padding:7px 10px;background:#253b58;font-size:12px;border:1px solid #415b7d}
  #controlQuincenal #controlFiltroWrap{display:block;margin:12px 0;font-weight:700}
  #controlQuincenal #controlFiltro{display:block;width:100%;margin-top:7px;padding:11px;border-radius:10px;background:#101b2d;color:#fff;border:1px solid #607693;font-size:15px}
  #controlQuincenal .control-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px;margin:9px 0;background:#1d2e47;border:1px solid #40516b;border-left:5px solid #20a269;border-radius:12px;min-width:0}
  #controlQuincenal .control-row.warning{border-left-color:#eab308}
  #controlQuincenal .control-row.late{border-left-color:#ef4444}
  #controlQuincenal .control-info{min-width:0;flex:1}
  #controlQuincenal .control-info strong{display:block;font-size:15px;overflow-wrap:anywhere;line-height:1.3}
  #controlQuincenal .control-info small{display:block;color:#b9c9df;margin-top:5px;font-size:12px;line-height:1.35}
  #controlQuincenal .control-days{min-width:72px;max-width:105px;flex-shrink:0;text-align:center;background:#153f30;border:1px solid #247e56;border-radius:10px;padding:7px 5px;color:#9ef0bd}
  #controlQuincenal .control-days.warning{background:#463914;border-color:#b68a20;color:#ffe08b}
  #controlQuincenal .control-days.late{background:#4d232d;border-color:#c44752;color:#ffb1b9}
  #controlQuincenal .control-days strong{display:block;font-size:23px;line-height:1.1}
  #controlQuincenal .control-days small{display:block;font-size:10px;line-height:1.3}
  #controlQuincenal #controlActualizar{width:100%;margin-top:12px}
  `;
  document.head.appendChild(style);
  function draw() {
    const root = document.getElementById('controlQuincenal');
    if (!root) return;
    const admin = userId === owner;
    const selected = root.querySelector('#controlFiltro')?.value || 'todos';
    const visible = rows.filter(r => !admin || selected === 'todos' || r.profesor_id === selected)
      .sort((a, b) => (age(b) ?? 99999) - (age(a) ?? 99999));
    const pending = rows.filter(late).length;
    const ok = rows.filter(r => !late(r)).length;
    root.querySelector('#controlResumen').innerHTML =
      '<div class="control-metrics"><div class="control-metric"><strong>' + rows.length +
      '</strong><small>Alumnos</small></div><div class="control-metric good"><strong>' + ok +
      '</strong><small>Al día</small></div><div class="control-metric bad"><strong>' + pending +
      '</strong><small>Pendientes</small></div></div>';
    root.querySelector('#controlFiltroWrap').hidden = !admin;
    root.querySelector('#controlPorProfesor').innerHTML = admin ?
      Object.entries(names).map(([id, name]) => '<span class="control-pill">' +
        escape(name) + ': ' + rows.filter(r => r.profesor_id === id).length +
        ' alumnos · ' + rows.filter(r => r.profesor_id === id && late(r)).length +
        ' pendientes</span>').join('') : '';
    root.querySelector('#controlListado').innerHTML = visible.map(r => {
      const d = age(r);
      const status = !r.tiene_plan || d === null || d >= 14 ? 'late' : d >= 11 ? 'warning' : 'good';
      const label = !r.tiene_plan ? 'Sin planificación' : d === null ? 'Sin fecha registrada' :
        status === 'late' ? 'Actualizar planificación' :
        status === 'warning' ? 'Próxima actualización' : 'Al día';
      const number = d === null ? '—' : String(d);
      return '<article class="control-row ' + status + '"><div class="control-info"><strong>' +
        escape(r.alumno) + '</strong><small>' +
        (admin ? 'Profesor: ' + escape(names[r.profesor_id] || 'Profesor') + '<br>' : '') +
        escape(label) + '</small></div><div class="control-days ' + status +
        '"><strong>' + number + '</strong><small>' +
        (d === null ? 'sin fecha' : 'días sin actualizar') + '</small></div></article>';
    }).join('') || '<p>No hay alumnos registrados.</p>';
  }
  async function refresh() {
    const root = document.getElementById('controlQuincenal');
    if (!root || document.getElementById('admin')?.classList.contains('hidden')) return;
    const { data: auth, error: authError } = await sb.auth.getUser();
    if (authError || !auth?.user) return;
    userId = auth.user.id;
    const { data, error } = await sb.rpc('activo_revision_resumen');
    if (error) {
      root.querySelector('#controlResumen').textContent = 'No se pudo cargar el seguimiento: ' + error.message;
      return;
    }
    rows = data || [];
    draw();
  }
  function init() {
    const admin = document.getElementById('admin');
    if (!admin || document.getElementById('controlQuincenal')) return;
    const root = document.createElement('section');
    root.id = 'controlQuincenal';
    root.className = 'card';
    root.innerHTML = '<button class="control-toggle" id="controlToggle" type="button" aria-expanded="false">📊 CONTROL DE PLANIFICACIONES ▾</button>' +
      '<div class="control-body" id="controlBody" hidden><p id="controlResumen">Cargando seguimiento…</p>' +
      '<div id="controlPorProfesor"></div>' +
      '<label id="controlFiltroWrap">Filtrar por profesor <select id="controlFiltro">' +
      '<option value="todos">Todos los profesores</option>' +
      Object.entries(names).map(([id, name]) =>
        '<option value="' + id + '">' + escape(name) + '</option>').join('') +
      '</select></label><div id="controlListado"></div>' +
      '<button id="controlActualizar" type="button">↻ Actualizar seguimiento</button>' +
      '<p><small>Recordatorios informativos: no bloquean el uso de la aplicación.</small></p></div>';
    root.querySelector('#controlToggle').addEventListener('click', () => {
      const body = root.querySelector('#controlBody');
      body.hidden = !body.hidden;
      root.querySelector('#controlToggle').setAttribute('aria-expanded', String(!body.hidden));
      root.querySelector('#controlToggle').textContent = body.hidden ?
        '📊 CONTROL DE PLANIFICACIONES ▾' : '📊 OCULTAR CONTROL DE PLANIFICACIONES ▴';
      if (!body.hidden) refresh();
    });
    admin.insertBefore(root, admin.children[1] || null);
    root.querySelector('#controlFiltro').addEventListener('change', draw);
    root.querySelector('#controlActualizar').addEventListener('click', refresh);
    new MutationObserver(() => {
      if (!admin.classList.contains('hidden')) refresh();
    }).observe(admin, { attributes: true, attributeFilter: ['class'] });
    document.getElementById('saveDay')?.addEventListener('click', () => setTimeout(refresh, 1500));
    if (!admin.classList.contains('hidden')) refresh();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
