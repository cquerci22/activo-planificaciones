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
  function draw() {
    const root = document.getElementById('controlQuincenal');
    if (!root) return;
    const admin = userId === owner;
    const selected = root.querySelector('#controlFiltro')?.value || 'todos';
    const visible = rows.filter(r => !admin || selected === 'todos' || r.profesor_id === selected)
      .sort((a, b) => (age(b) ?? 99999) - (age(a) ?? 99999));
    root.querySelector('#controlResumen').textContent =
      'Total de alumnos: ' + rows.length + ' · Pendientes: ' + rows.filter(late).length;
    root.querySelector('#controlFiltroWrap').hidden = !admin;
    root.querySelector('#controlPorProfesor').innerHTML = admin ?
      Object.entries(names).map(([id, name]) => '<span class="control-pill">' +
        escape(name) + ': ' + rows.filter(r => r.profesor_id === id).length +
        ' alumnos · ' + rows.filter(r => r.profesor_id === id && late(r)).length +
        ' pendientes</span>').join('') : '';
    root.querySelector('#controlListado').innerHTML = visible.map(r => {
      const d = age(r), pending = late(r);
      const state = !r.tiene_plan ? 'Sin planificación' :
        d === null ? 'Sin fecha' : d >= 14 ? 'Actualizar planificación' :
        d >= 11 ? 'Próxima actualización' : 'Al día';
      return '<div class="control-row"><div><strong>' + escape(r.alumno) +
        '</strong><small>' + (admin ? escape(names[r.profesor_id] || 'Profesor') + ' · ' : '') +
        (d === null ? 'Sin fecha registrada' : d + ' días desde la última actualización') +
        '</small></div><span class="' + (pending ? 'control-late' : 'control-ok') +
        '">' + escape(state) + '</span></div>';
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
    root.innerHTML = '<h3>📅 Control de planificaciones · 14 días</h3>' +
      '<p id="controlResumen">Cargando seguimiento…</p>' +
      '<div id="controlPorProfesor"></div>' +
      '<label id="controlFiltroWrap">Profesor <select id="controlFiltro">' +
      '<option value="todos">Todos los profesores</option>' +
      Object.entries(names).map(([id, name]) =>
        '<option value="' + id + '">' + escape(name) + '</option>').join('') +
      '</select></label><div id="controlListado"></div>' +
      '<button id="controlActualizar" type="button">↻ Actualizar seguimiento</button>' +
      '<p><small>Recordatorios informativos. No bloquean el uso de la aplicación.</small></p>';
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
