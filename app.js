const URL = 'https://widdbffswksbugmbesja.supabase.co';
const KEY = 'sb_publishable_Lndqkrn26vuQDmwx72SqNA_ihZ-ZBLe';

const sb = supabase.createClient(URL, KEY);

const D = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes'
];

const L = [
  ['Sentadilla libre', 'Tren inferior', '4', '8-10', '90 s'],
  ['Sentadilla goblet', 'Tren inferior', '3', '10-12', '60 s'],
  ['Prensa de piernas', 'Tren inferior', '4', '10-12', '90 s'],
  ['Peso muerto rumano', 'Tren inferior', '4', '8-10', '90 s'],
  ['Hip thrust', 'Tren inferior', '4', '10-12', '75 s'],
  ['Zancadas', 'Tren inferior', '3', '10 por pierna', '60 s'],
  ['Sentadilla búlgara', 'Tren inferior', '3', '8-10 por pierna', '75 s'],
  ['Press de banca', 'Tren superior', '4', '8-10', '90 s'],
  ['Remo con barra', 'Tren superior', '4', '8-10', '90 s'],
  ['Jalón al pecho', 'Tren superior', '4', '10-12', '75 s'],
  ['Press militar', 'Tren superior', '4', '8-10', '90 s'],
  ['Elevaciones laterales', 'Tren superior', '3', '12-15', '45 s'],
  ['Curl de bíceps', 'Tren superior', '3', '10-12', '45 s'],
  ['Tríceps en polea', 'Tren superior', '3', '12-15', '45 s'],
  ['Plancha frontal', 'Core', '3', '30-45 s', '45 s'],
  ['Plancha lateral', 'Core', '3', '25-40 s', '45 s'],
  ['Dead bug', 'Core', '3', '10 por lado', '45 s'],
  ['Pallof press', 'Core', '3', '10-12 por lado', '45 s'],
  ['Burpees', 'Funcional', '4', '8-12', '45 s'],
  ['Kettlebell swing', 'Funcional', '4', '15', '45 s'],
  ['Battle ropes', 'Funcional', '4', '30 s', '30 s'],
  ['Farmer walk', 'Funcional', '4', '20-30 m', '60 s'],
  ['Step up al cajón', 'Funcional', '3', '10 por pierna', '60 s'],
  ['Box jump', 'Funcional', '4', '5-8', '75 s'],
  ['Thruster', 'Funcional', '4', '8-10', '75 s'],
  ['Caminata en cinta', 'Cardio', '1', '15-30 min', ''],
  ['Bicicleta fija', 'Cardio', '1', '15-30 min', ''],
  ['Remo ergómetro', 'Cardio', '5', '1 min', '1 min'],
  ['Soga', 'Cardio', '5', '1 min', '30 s'],
  ['Movilidad de tobillo', 'Movilidad', '2', '10 por lado', ''],
  ['Rotación torácica', 'Movilidad', '2', '8 por lado', ''],
  ['Flexores de cadera', 'Movilidad', '2', '30 s por lado', ''],
  ['Cat-cow', 'Movilidad', '2', '10', '']
];

let clients = [];
let sel = null;
let day = 'Lunes';
let draft = [];
let planId = null;

const $ = id => document.getElementById(id);

const esc = value =>
  String(value || '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[character]);

function note(text, type = 'ok') {
  $('msg').innerHTML = `<div class="${type}">${esc(text)}</div>`;

  setTimeout(() => {
    $('msg').innerHTML = '';
  }, 3000);
}

async function publicMode() {
  $('admin').classList.add('hidden');
  $('public').classList.remove('hidden');
  $('adminTop').textContent = 'Panel del profesor';

  await loadPublic();
}

async function adminMode() {
  const {
    data: { session }
  } = await sb.auth.getSession();

  if (!session) {
    $('loginModal').classList.remove('hidden');
    return;
  }

  $('public').classList.add('hidden');
  $('admin').classList.remove('hidden');
  $('adminTop').textContent = 'Vista clientes';
  $('email').textContent = session.user.email;

  await loadClients();
}

$('adminTop').onclick = () => {
  if (!$('admin').classList.contains('hidden')) {
    publicMode();
  } else {
    adminMode();
  }
};

$('closeLogin').onclick = () => {
  $('loginModal').classList.add('hidden');
};

$('login').onclick = async () => {
  $('loginErr').classList.add('hidden');

  const email = $('loginEmail').value.trim();
  const password = $('loginPass').value;

  if (!email || !password) {
    $('loginErr').textContent = 'Ingresá el correo y la contraseña.';
    $('loginErr').classList.remove('hidden');
    return;
  }

  const { error } = await sb.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    $('loginErr').textContent = error.message;
    $('loginErr').classList.remove('hidden');
    return;
  }

  $('loginModal').classList.add('hidden');
  await adminMode();
};

$('logout').onclick = async () => {
  await sb.auth.signOut();
  await publicMode();
};

async function loadClients() {
  const { data, error } = await sb
    .from('clients')
    .select('*')
    .order('name');

  if (error) {
    note(error.message, 'error');
    return;
  }

  clients = data || [];

  renderClients();
  renderPlanner();
}

function renderClients() {
  const container = $('clients');

  container.innerHTML = '';

  if (!clients.length) {
    container.innerHTML = '<small>No hay clientes.</small>';
  }

  clients.forEach(client => {
    const item = document.createElement('div');

    item.className = 'client';

    item.innerHTML = `
      <div>
        <b>${esc(client.name)}</b>
        <small>
          ${esc(client.goal || '')}
          ·
          ${client.active ? 'Activo' : 'Inactivo'}
        </small>
      </div>

      <div class="row">
        <button class="open">Abrir</button>
        <button class="edit">Editar</button>
        <button class="del danger">Eliminar</button>
      </div>
    `;

    item.querySelector('.open').onclick = async () => {
      sel = client.id;
      day = 'Lunes';

      await loadDay();
      renderPlanner();
    };

    item.querySelector('.edit').onclick = () => {
      editClient(client);
    };

    item.querySelector('.del').onclick = () => {
      delClient(client);
    };

    container.appendChild(item);
  });
}

async function editClient(client) {
  $('name').value = client.name;
  $('goal').value = client.goal || '';
  $('active').checked = Boolean(client.active);
  $('editId').value = client.id;
  $('cancel').classList.remove('hidden');

  const { data } = await sb
    .from('client_private_notes')
    .select('notes')
    .eq('client_id', client.id)
    .maybeSingle();

  $('notes').value = data?.notes || '';
}

$('saveClient').onclick = async () => {
  const name = $('name').value.trim();

  if (!name) {
    alert('Ingresá el nombre del alumno.');
    return;
  }

  let id = $('editId').value;

  if (id) {
    const { error } = await sb
      .from('clients')
      .update({
        name,
        goal: $('goal').value.trim(),
        active: $('active').checked,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      note(error.message, 'error');
      return;
    }
  } else {
    const { data, error } = await sb
      .from('clients')
      .insert({
        name,
        goal: $('goal').value.trim(),
        active: $('active').checked
      })
      .select()
      .single();

    if (error) {
      note(error.message, 'error');
      return;
    }

    id = data.id;
    sel = id;
  }

  const notes = $('notes').value.trim();

  const { data: oldNote } = await sb
    .from('client_private_notes')
    .select('id')
    .eq('client_id', id)
    .maybeSingle();

  if (oldNote) {
    await sb
      .from('client_private_notes')
      .update({ notes })
      .eq('id', oldNote.id);
  } else if (notes) {
    await sb
      .from('client_private_notes')
      .insert({
        client_id: id,
        notes
      });
  }

  clearForm();
  await loadClients();
  note('Cliente guardado.');
};

function clearForm() {
  $('name').value = '';
  $('goal').value = '';
  $('notes').value = '';
  $('active').checked = true;
  $('editId').value = '';
  $('cancel').classList.add('hidden');
}

$('cancel').onclick = clearForm;

async function delClient(client) {
  const confirmation = confirm(`¿Eliminar a ${client.name}?`);

  if (!confirmation) {
    return;
  }

  const { error } = await sb
    .from('clients')
    .delete()
    .eq('id', client.id);

  if (error) {
    note(error.message, 'error');
    return;
  }

  if (sel === client.id) {
    sel = null;
  }

  await loadClients();
}

async function loadDay() {
  draft = [];
  planId = null;

  if (!sel) {
    return;
  }

  const { data: plan, error } = await sb
    .from('workout_plans')
    .select('*')
    .eq('client_id', sel)
    .eq('day_of_week', day)
    .maybeSingle();

  if (error) {
    note(error.message, 'error');
    return;
  }

  if (!plan) {
    return;
  }

  planId = plan.id;

  const { data: exercises, error: exerciseError } = await sb
    .from('plan_exercises')
    .select('*')
    .eq('plan_id', plan.id)
    .order('exercise_order');

  if (exerciseError) {
    note(exerciseError.message, 'error');
    return;
  }

  draft = (exercises || []).map(exercise => ({
    name: exercise.exercise_name,
    sets: exercise.sets || '',
    reps: exercise.reps || '',
    load: exercise.load || '',
    rest: exercise.rest || '',
    notes: exercise.notes || ''
  }));
}

function renderPlanner() {
  const client = clients.find(item => item.id === sel);

  $('empty').classList.toggle('hidden', Boolean(client));
  $('planner').classList.toggle('hidden', !client);

  if (!client) {
    return;
  }

  $('clientTitle').textContent = client.name;
  $('clientGoal').textContent = client.goal || '';

  const daysContainer = $('days');

  daysContainer.innerHTML = '';

  D.forEach(dayName => {
    const button = document.createElement('button');

    button.textContent = dayName;
    button.className = `day ${dayName === day ? 'active' : ''}`;

    button.onclick = async () => {
      day = dayName;

      await loadDay();
      renderPlanner();
    };

    daysContainer.appendChild(button);
  });

  renderExercises();
}

function renderExercises() {
  const container = $('exerciseList');

  container.innerHTML = '';

  if (!draft.length) {
    container.innerHTML = '<small>Sin ejercicios.</small>';
  }

  draft.forEach((exercise, index) => {
    const item = document.createElement('div');

    item.className = 'exercise';

    item.innerHTML = `
      <div class="row">
        <b>Ejercicio ${index + 1}</b>
        <button class="rm danger">Quitar</button>
      </div>

      <div class="cols">
        <div>
          <label>Ejercicio</label>
          <input class="name" value="${esc(exercise.name)}">
        </div>

        <div>
          <label>Series</label>
          <input class="sets" value="${esc(exercise.sets)}">
        </div>

        <div>
          <label>Repeticiones</label>
          <input class="reps" value="${esc(exercise.reps)}">
        </div>

        <div>
          <label>Carga</label>
          <input class="load" value="${esc(exercise.load)}">
        </div>

        <div>
          <label>Descanso</label>
          <input class="rest" value="${esc(exercise.rest)}">
        </div>

        <div>
          <label>Observaciones</label>
          <input class="notes" value="${esc(exercise.notes)}">
        </div>
      </div>
    `;

    ['name', 'sets', 'reps', 'load', 'rest', 'notes'].forEach(field => {
      item.querySelector(`.${field}`).oninput = function () {
        exercise[field] = this.value;
      };
    });

    item.querySelector('.rm').onclick = () => {
      draft.splice(index, 1);
      renderExercises();
    };

    container.appendChild(item);
  });
}

$('manual').onclick = () => {
  draft.push({
    name: '',
    sets: '',
    reps: '',
    load: '',
    rest: '',
    notes: ''
  });

  renderExercises();
};

$('saveDay').onclick = async () => {
  if (!sel) {
    alert('Seleccioná un alumno.');
    return;
  }

  if (!planId) {
    const { data, error } = await sb
      .from('workout_plans')
      .insert({
        client_id: sel,
        day_of_week: day,
        title: `Planificación ${day}`
      })
      .select()
      .single();

    if (error) {
      note(error.message, 'error');
      return;
    }

    planId = data.id;
  }

  const { error: deleteError } = await sb
    .from('plan_exercises')
    .delete()
    .eq('plan_id', planId);

  if (deleteError) {
    note(deleteError.message, 'error');
    return;
  }

  if (draft.length) {
    const rows = draft.map((exercise, index) => ({
      plan_id: planId,
      exercise_name: exercise.name || 'Ejercicio',
      sets: exercise.sets,
      reps: exercise.reps,
      load: exercise.load,
      rest: exercise.rest,
      notes: exercise.notes,
      exercise_order: index
    }));

    const { error } = await sb
      .from('plan_exercises')
      .insert(rows);

    if (error) {
      note(error.message, 'error');
      return;
    }
  }

  note(`${day} guardado.`);
};

function openLib() {
  if (!sel) {
    alert('Seleccioná un cliente.');
    return;
  }

  $('libraryModal').classList.remove('hidden');
  renderLib();
}

$('libraryBtn').onclick = openLib;
$('fromLib').onclick = openLib;

$('closeLib').onclick = () => {
  $('libraryModal').classList.add('hidden');
};

const categories = [...new Set(L.map(exercise => exercise[1]))];

categories.forEach(category => {
  $('libCat').insertAdjacentHTML(
    'beforeend',
    `<option>${category}</option>`
  );
});

$('libSearch').oninput = renderLib;
$('libCat').onchange = renderLib;

function renderLib() {
  const search = $('libSearch').value.toLowerCase();
  const category = $('libCat').value;
  const container = $('library');

  container.innerHTML = '';

  L
    .filter(exercise => {
      const categoryMatch = !category || exercise[1] === category;
      const searchMatch =
        !search ||
        exercise.join(' ').toLowerCase().includes(search);

      return categoryMatch && searchMatch;
    })
    .forEach(exercise => {
      const item = document.createElement('div');

      item.className = 'lib';

      item.innerHTML = `
        <b>${esc(exercise[0])}</b>
        <small>${esc(exercise[1])}</small>

        <p>
          <small>
            ${exercise[2]} series
            ·
            ${exercise[3]}
            ·
            descanso ${exercise[4] || '-'}
          </small>
        </p>

        <button>Agregar a ${day}</button>
      `;

      item.querySelector('button').onclick = () => {
        draft.push({
          name: exercise[0],
          sets: exercise[2],
          reps: exercise[3],
          load: '',
          rest: exercise[4],
          notes: ''
        });

        renderExercises();

        alert('Agregado. Recordá guardar el día.');
      };

      container.appendChild(item);
    });
}

async function loadPublic() {
  const { data, error } = await sb
    .from('clients')
    .select('id,name,goal')
    .eq('active', true)
    .order('name');

  window.pub = data || [];

  if (error) {
    $('results').innerHTML =
      '<div class="error">No se pudieron cargar los clientes.</div>';
    return;
  }

  renderResults();
}

function renderResults() {
  const search = $('search').value.toLowerCase();
  const container = $('results');

  container.innerHTML = '';

  const results = (window.pub || []).filter(client =>
    !search || client.name.toLowerCase().includes(search)
  );

  if (!results.length && search) {
    container.innerHTML = '<small>No se encontró ningún alumno.</small>';
    return;
  }

  results.forEach(client => {
    const button = document.createElement('button');

    button.className = 'public-result';

    button.innerHTML = `
      <b>${esc(client.name)}</b>
      <small>${esc(client.goal || '')}</small>
    `;

    button.onclick = () => {
      showPublic(client);
    };

    container.appendChild(button);
  });
}

$('search').oninput = renderResults;

async function showPublic(client) {
  const { data: plans, error: planError } = await sb
    .from('workout_plans')
    .select('id,day_of_week')
    .eq('client_id', client.id);

  if (planError) {
    $('publicPlan').innerHTML =
      '<div class="error">No se pudo cargar la planificación.</div>';
    $('publicPlan').classList.remove('hidden');
    return;
  }

  const planIds = (plans || []).map(plan => plan.id);

  let exercises = [];

  if (planIds.length) {
    const { data, error } = await sb
      .from('plan_exercises')
      .select('*')
      .in('plan_id', planIds)
      .order('exercise_order');

    if (error) {
      $('publicPlan').innerHTML =
        '<div class="error">No se pudieron cargar los ejercicios.</div>';
      $('publicPlan').classList.remove('hidden');
      return;
    }

    exercises = data || [];
  }

  let html = `
    <h2>${esc(client.name)}</h2>
    <small>${esc(client.goal || '')}</small>
  `;

  D.forEach(dayName => {
    const plan = (plans || []).find(
      item => item.day_of_week === dayName
    );

    const dayExercises = plan
      ? exercises.filter(exercise => exercise.plan_id === plan.id)
      : [];

    html += `
      <div class="plan-day">
        <h3>${dayName}</h3>
    `;

    if (dayExercises.length) {
      html += dayExercises.map(exercise => `
        <div class="public-ex">
          <b>${esc(exercise.exercise_name)}</b>

          <small>
            ${esc(exercise.sets || '-')} series
            ·
            ${esc(exercise.reps || '-')}
            ·
            carga ${esc(exercise.load || '-')}
            ·
            descanso ${esc(exercise.rest || '-')}
          </small>

          <div>${esc(exercise.notes || '')}</div>
        </div>
      `).join('');
    } else {
      html += '<small>Sin ejercicios.</small>';
    }

    html += '</div>';
  });

  $('publicPlan').innerHTML = html;
  $('publicPlan').classList.remove('hidden');
}

$('preview').onclick = async () => {
  const client = clients.find(item => item.id === sel);

  if (!client) {
    alert('Seleccioná un alumno.');
    return;
  }

  await publicMode();
  await showPublic(client);
};

loadPublic();
