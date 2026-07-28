const SUPABASE_URL = 'https://widdbffswksbugmbesja.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Lndqkrn26vuQDmwx72SqNA_ihZ-ZBLe';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const EXERCISE_LIBRARY = [
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
let selectedClientId = null;
let selectedDay = 'Lunes';
let draftExercises = [];
let currentPlanId = null;

const $ = id => document.getElementById(id);

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[character]);
}

function showMessage(text, type = 'ok') {
  const msg = $('msg');

  if (!msg) {
    return;
  }

  msg.innerHTML = `<div class="${type}">${escapeHtml(text)}</div>`;

  window.setTimeout(() => {
    msg.innerHTML = '';
  }, 3000);
}

async function showPublicMode() {
  $('admin').classList.add('hidden');
  $('public').classList.remove('hidden');
  $('adminTop').textContent = 'Panel del profesor';

  await loadPublicClients();
}

async function showAdminMode() {
  const { data, error } = await sb.auth.getSession();

  if (error) {
    alert(`No se pudo revisar la sesión: ${error.message}`);
    return;
  }

  const session = data.session;

  if (!session) {
    $('loginModal').classList.remove('hidden');
    return;
  }

  $('public').classList.add('hidden');
  $('admin').classList.remove('hidden');
  $('adminTop').textContent = 'Vista clientes';
  $('email').textContent = session.user.email || '';

  await loadClients();
}

async function loadClients() {
  const { data, error } = await sb
    .from('clients')
    .select('*')
    .order('name');

  if (error) {
    showMessage(error.message, 'error');
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
    container.innerHTML = '<small>No hay clientes cargados.</small>';
    return;
  }

  clients.forEach(client => {
    const item = document.createElement('div');

    item.className = 'client';

    item.innerHTML = `
      <div>
        <b>${escapeHtml(client.name)}</b>
        <small>
          ${escapeHtml(client.goal || '')}
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

    item.querySelector('.open').addEventListener('click', async () => {
      selectedClientId = client.id;
      selectedDay = 'Lunes';

      await loadSelectedDay();
      renderPlanner();
    });

    item.querySelector('.edit').addEventListener('click', () => {
      editClient(client);
    });

    item.querySelector('.del').addEventListener('click', () => {
      deleteClient(client);
    });

    container.appendChild(item);
  });
}

async function editClient(client) {
  $('name').value = client.name || '';
  $('goal').value = client.goal || '';
  $('active').checked = Boolean(client.active);
  $('editId').value = client.id;
  $('cancel').classList.remove('hidden');

  const { data, error } = await sb
    .from('client_private_notes')
    .select('notes')
    .eq('client_id', client.id)
    .maybeSingle();

  $('notes').value = error ? '' : (data?.notes || '');
}

function clearClientForm() {
  $('name').value = '';
  $('goal').value = '';
  $('notes').value = '';
  $('active').checked = true;
  $('editId').value = '';
  $('cancel').classList.add('hidden');
}

async function saveClient() {
  const name = $('name').value.trim();
  const goal = $('goal').value.trim();
  const active = $('active').checked;
  const notes = $('notes').value.trim();

  if (!name) {
    alert('Ingresá el nombre del alumno.');
    return;
  }

  let clientId = $('editId').value;

  if (clientId) {
    const { error } = await sb
      .from('clients')
      .update({
        name,
        goal,
        active,
        updated_at: new Date().toISOString()
      })
      .eq('id', clientId);

    if (error) {
      showMessage(error.message, 'error');
      return;
    }
  } else {
    const { data, error } = await sb
      .from('clients')
      .insert({
        name,
        goal,
        active
      })
      .select()
      .single();

    if (error) {
      showMessage(error.message, 'error');
      return;
    }

    clientId = data.id;
    selectedClientId = clientId;
  }

  const { data: oldNote, error: noteSearchError } = await sb
    .from('client_private_notes')
    .select('id')
    .eq('client_id', clientId)
    .maybeSingle();

  if (!noteSearchError) {
    if (oldNote) {
      await sb
        .from('client_private_notes')
        .update({ notes })
        .eq('id', oldNote.id);
    } else if (notes) {
      await sb
        .from('client_private_notes')
        .insert({
          client_id: clientId,
          notes
        });
    }
  }

  clearClientForm();
  await loadClients();

  showMessage('Cliente guardado correctamente.');
}

async function deleteClient(client) {
  const confirmed = confirm(`¿Eliminar a ${client.name}?`);

  if (!confirmed) {
    return;
  }

  const { error } = await sb
    .from('clients')
    .delete()
    .eq('id', client.id);

  if (error) {
    showMessage(error.message, 'error');
    return;
  }

  if (selectedClientId === client.id) {
    selectedClientId = null;
    draftExercises = [];
    currentPlanId = null;
  }

  await loadClients();

  showMessage('Cliente eliminado.');
}

async function loadSelectedDay() {
  draftExercises = [];
  currentPlanId = null;

  if (!selectedClientId) {
    return;
  }

  const { data: plan, error } = await sb
    .from('workout_plans')
    .select('*')
    .eq('client_id', selectedClientId)
    .eq('day_of_week', selectedDay)
    .maybeSingle();

  if (error) {
    showMessage(error.message, 'error');
    return;
  }

  if (!plan) {
    return;
  }

  currentPlanId = plan.id;

  const { data: exercises, error: exercisesError } = await sb
    .from('plan_exercises')
    .select('*')
    .eq('plan_id', plan.id)
    .order('exercise_order');

  if (exercisesError) {
    showMessage(exercisesError.message, 'error');
    return;
  }

  draftExercises = (exercises || []).map(exercise => ({
    name: exercise.exercise_name || '',
    sets: exercise.sets || '',
    reps: exercise.reps || '',
    load: exercise.load || '',
    rest: exercise.rest || '',
    notes: exercise.notes || ''
  }));
}

function renderPlanner() {
  const client = clients.find(item => item.id === selectedClientId);

  $('empty').classList.toggle('hidden', Boolean(client));
  $('planner').classList.toggle('hidden', !client);

  if (!client) {
    return;
  }

  $('clientTitle').textContent = client.name;
  $('clientGoal').textContent = client.goal || '';

  const daysContainer = $('days');

  daysContainer.innerHTML = '';

  DAYS.forEach(dayName => {
    const button = document.createElement('button');

    button.textContent = dayName;
    button.className =
      `day ${dayName === selectedDay ? 'active' : ''}`;

    button.addEventListener('click', async () => {
      selectedDay = dayName;

      await loadSelectedDay();
      renderPlanner();
    });

    daysContainer.appendChild(button);
  });

  renderExercises();
}

function renderExercises() {
  const container = $('exerciseList');

  container.innerHTML = '';

  if (!draftExercises.length) {
    container.innerHTML = '<small>Sin ejercicios.</small>';
    return;
  }

  draftExercises.forEach((exercise, index) => {
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
          <input class="name" value="${escapeHtml(exercise.name)}">
        </div>

        <div>
          <label>Series</label>
          <input class="sets" value="${escapeHtml(exercise.sets)}">
        </div>

        <div>
          <label>Repeticiones</label>
          <input class="reps" value="${escapeHtml(exercise.reps)}">
        </div>

        <div>
          <label>Carga</label>
          <input class="load" value="${escapeHtml(exercise.load)}">
        </div>

        <div>
          <label>Descanso</label>
          <input class="rest" value="${escapeHtml(exercise.rest)}">
        </div>

        <div>
          <label>Observaciones</label>
          <input class="notes" value="${escapeHtml(exercise.notes)}">
        </div>
      </div>
    `;

    ['name', 'sets', 'reps', 'load', 'rest', 'notes']
      .forEach(field => {
        item
          .querySelector(`.${field}`)
          .addEventListener('input', event => {
            exercise[field] = event.target.value;
          });
      });

    item.querySelector('.rm').addEventListener('click', () => {
      draftExercises.splice(index, 1);
      renderExercises();
    });

    container.appendChild(item);
  });
}

async function saveSelectedDay() {
  if (!selectedClientId) {
    alert('Seleccioná un alumno.');
    return;
  }

  if (!currentPlanId) {
    const { data, error } = await sb
      .from('workout_plans')
      .insert({
        client_id: selectedClientId,
        day_of_week: selectedDay,
        title: `Planificación ${selectedDay}`
      })
      .select()
      .single();

    if (error) {
      showMessage(error.message, 'error');
      return;
    }

    currentPlanId = data.id;
  }

  const { error: deleteError } = await sb
    .from('plan_exercises')
    .delete()
    .eq('plan_id', currentPlanId);

  if (deleteError) {
    showMessage(deleteError.message, 'error');
    return;
  }

  if (draftExercises.length) {
    const rows = draftExercises.map((exercise, index) => ({
      plan_id: currentPlanId,
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
      showMessage(error.message, 'error');
      return;
    }
  }

  showMessage(`${selectedDay} guardado correctamente.`);
}

function openLibrary() {
  if (!selectedClientId) {
    alert('Seleccioná un cliente.');
    return;
  }

  $('libraryModal').classList.remove('hidden');

  renderLibrary();
}

function renderLibrary() {
  const search = $('libSearch').value.toLowerCase().trim();
  const category = $('libCat').value;
  const container = $('library');

  container.innerHTML = '';

  EXERCISE_LIBRARY
    .filter(exercise => {
      const categoryMatches =
        !category || exercise[1] === category;

      const searchMatches =
        !search ||
        exercise.join(' ').toLowerCase().includes(search);

      return categoryMatches && searchMatches;
    })
    .forEach(exercise => {
      const item = document.createElement('div');

      item.className = 'lib';

      item.innerHTML = `
        <b>${escapeHtml(exercise[0])}</b>
        <small>${escapeHtml(exercise[1])}</small>

        <p>
          <small>
            ${escapeHtml(exercise[2])} series
            ·
            ${escapeHtml(exercise[3])}
            ·
            descanso ${escapeHtml(exercise[4] || '-')}
          </small>
        </p>

        <button>
          Agregar a ${escapeHtml(selectedDay)}
        </button>
      `;

      item.querySelector('button').addEventListener('click', () => {
        draftExercises.push({
          name: exercise[0],
          sets: exercise[2],
          reps: exercise[3],
          load: '',
          rest: exercise[4],
          notes: ''
        });

        renderExercises();

        alert('Agregado. Recordá guardar el día.');
      });

      container.appendChild(item);
    });
}

async function loadPublicClients() {
  const { data, error } = await sb
    .from('clients')
    .select('id,name,goal')
    .eq('active', true)
    .order('name');

  window.publicClients = data || [];

  if (error) {
    $('results').innerHTML =
      '<div class="error">No se pudieron cargar los clientes.</div>';

    return;
  }

  renderPublicResults();
}

function renderPublicResults() {
  const search = $('search').value.toLowerCase().trim();
  const container = $('results');

  container.innerHTML = '';

  const results = (window.publicClients || []).filter(client =>
    !search ||
    client.name.toLowerCase().includes(search)
  );

  if (!results.length) {
    if (search) {
      container.innerHTML =
        '<small>No se encontró ningún alumno.</small>';
    }

    return;
  }

  results.forEach(client => {
    const button = document.createElement('button');

    button.className = 'public-result';

    button.innerHTML = `
      <b>${escapeHtml(client.name)}</b>
      <small>${escapeHtml(client.goal || '')}</small>
    `;

    button.addEventListener('click', () => {
      showPublicPlan(client);
    });

    container.appendChild(button);
  });
}

async function showPublicPlan(client) {
  const { data: plans, error: plansError } = await sb
    .from('workout_plans')
    .select('id,day_of_week')
    .eq('client_id', client.id);

  if (plansError) {
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
    <h2>${escapeHtml(client.name)}</h2>
    <small>${escapeHtml(client.goal || '')}</small>
  `;

  DAYS.forEach(dayName => {
    const plan = (plans || []).find(
      item => item.day_of_week === dayName
    );

    const dayExercises = plan
      ? exercises.filter(
          exercise => exercise.plan_id === plan.id
        )
      : [];

    html += `
      <div class="plan-day">
        <h3>${escapeHtml(dayName)}</h3>
    `;

    if (dayExercises.length) {
      html += dayExercises
        .map(exercise => `
          <div class="public-ex">
            <b>${escapeHtml(exercise.exercise_name)}</b>

            <small>
              ${escapeHtml(exercise.sets || '-')} series
              ·
              ${escapeHtml(exercise.reps || '-')}
              ·
              carga ${escapeHtml(exercise.load || '-')}
              ·
              descanso ${escapeHtml(exercise.rest || '-')}
            </small>

            <div>${escapeHtml(exercise.notes || '')}</div>
          </div>
        `)
        .join('');
    } else {
      html += '<small>Sin ejercicios.</small>';
    }

    html += '</div>';
  });

  $('publicPlan').innerHTML = html;
  $('publicPlan').classList.remove('hidden');

  $('publicPlan').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

function addLibraryCategories() {
  const select = $('libCat');

  const categories = [
    ...new Set(
      EXERCISE_LIBRARY.map(exercise => exercise[1])
    )
  ];

  categories.forEach(category => {
    const option = document.createElement('option');

    option.value = category;
    option.textContent = category;

    select.appendChild(option);
  });
}

function bindEvents() {
  $('adminTop').addEventListener('click', async () => {
    const adminIsVisible =
      !$('admin').classList.contains('hidden');

    if (adminIsVisible) {
      await showPublicMode();
    } else {
      await showAdminMode();
    }
  });

  $('closeLogin').addEventListener('click', () => {
    $('loginModal').classList.add('hidden');
    $('loginErr').classList.add('hidden');
  });

  $('login').addEventListener('click', async () => {
    const email = $('loginEmail').value.trim();
    const password = $('loginPass').value;

    $('loginErr').classList.add('hidden');

    if (!email || !password) {
      $('loginErr').textContent =
        'Ingresá el correo y la contraseña.';

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
    $('loginPass').value = '';

    await showAdminMode();
  });

  $('logout').addEventListener('click', async () => {
    await sb.auth.signOut();
    await showPublicMode();
  });

  $('saveClient').addEventListener('click', saveClient);

  $('cancel').addEventListener('click', clearClientForm);

  $('manual').addEventListener('click', () => {
    draftExercises.push({
      name: '',
      sets: '',
      reps: '',
      load: '',
      rest: '',
      notes: ''
    });

    renderExercises();
  });

  $('saveDay').addEventListener(
    'click',
    saveSelectedDay
  );

  $('libraryBtn').addEventListener(
    'click',
    openLibrary
  );

  $('fromLib').addEventListener(
    'click',
    openLibrary
  );

  $('closeLib').addEventListener('click', () => {
    $('libraryModal').classList.add('hidden');
  });

  $('libSearch').addEventListener(
    'input',
    renderLibrary
  );

  $('libCat').addEventListener(
    'change',
    renderLibrary
  );

  $('search').addEventListener(
    'input',
    renderPublicResults
  );

  $('preview').addEventListener('click', async () => {
    const client = clients.find(
      item => item.id === selectedClientId
    );

    if (!client) {
      alert('Seleccioná un alumno.');
      return;
    }

    await showPublicMode();
    await showPublicPlan(client);
  });
}

async function startApp() {
  bindEvents();
  addLibraryCategories();

  await loadPublicClients();
}

document.addEventListener('DOMContentLoaded', startApp);
