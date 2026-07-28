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
  // TREN INFERIOR
  ['Peso muerto convencional', 'Tren inferior', '4', '6-8', '120 s'],
  ['Peso muerto sumo', 'Tren inferior', '4', '6-10', '120 s'],
  ['Peso muerto con trap bar', 'Tren inferior', '4', '6-8', '120 s'],
  ['Peso muerto a una pierna', 'Tren inferior', '3', '8-10 por pierna', '75 s'],
  ['Buenos días con barra', 'Tren inferior', '3', '10-12', '75 s'],
  ['Sentadilla frontal', 'Tren inferior', '4', '6-10', '120 s'],
  ['Sentadilla sumo con mancuerna', 'Tren inferior', '3', '10-15', '60 s'],
  ['Sentadilla a cajón', 'Tren inferior', '4', '8-10', '90 s'],
  ['Sentadilla Hack', 'Tren inferior', '4', '8-12', '90 s'],
  ['Sentadilla en multipower', 'Tren inferior', '4', '8-12', '90 s'],
  ['Prensa inclinada unilateral', 'Tren inferior', '3', '10-12 por pierna', '75 s'],
  ['Extensión de cuádriceps', 'Tren inferior', '3', '12-15', '60 s'],
  ['Extensión de cuádriceps unilateral', 'Tren inferior', '3', '10-15 por pierna', '60 s'],
  ['Curl femoral acostado', 'Tren inferior', '3', '10-15', '60 s'],
  ['Curl femoral sentado', 'Tren inferior', '3', '10-15', '60 s'],
  ['Curl femoral unilateral', 'Tren inferior', '3', '10-12 por pierna', '60 s'],
  ['Puente de glúteos', 'Tren inferior', '4', '12-15', '60 s'],
  ['Hip thrust unilateral', 'Tren inferior', '3', '10-12 por pierna', '75 s'],
  ['Patada de glúteos en polea', 'Tren inferior', '3', '12-15 por pierna', '45 s'],
  ['Abducción de cadera en máquina', 'Tren inferior', '3', '15-20', '45 s'],
  ['Aducción de cadera en máquina', 'Tren inferior', '3', '15-20', '45 s'],
  ['Zancada hacia atrás', 'Tren inferior', '3', '10 por pierna', '60 s'],
  ['Zancada lateral', 'Tren inferior', '3', '10 por lado', '60 s'],
  ['Zancadas caminando', 'Tren inferior', '3', '12 pasos por pierna', '75 s'],
  ['Subida al banco con rodilla arriba', 'Tren inferior', '3', '10 por pierna', '60 s'],
  ['Elevación de talones de pie', 'Tren inferior', '4', '15-20', '45 s'],
  ['Elevación de talones sentado', 'Tren inferior', '4', '15-20', '45 s'],
  ['Elevación de talón unilateral', 'Tren inferior', '3', '12-15 por pierna', '45 s'],
  ['Caminata lateral con minibanda', 'Tren inferior', '3', '12 pasos por lado', '45 s'],
  ['Monster walk con minibanda', 'Tren inferior', '3', '12 pasos hacia cada dirección', '45 s'],

  // PECHO
  ['Press inclinado con barra', 'Tren superior', '4', '8-10', '90 s'],
  ['Press inclinado con mancuernas', 'Tren superior', '4', '8-12', '75 s'],
  ['Press plano con mancuernas', 'Tren superior', '4', '8-12', '75 s'],
  ['Press declinado con barra', 'Tren superior', '4', '8-10', '90 s'],
  ['Press de pecho en máquina', 'Tren superior', '3', '10-12', '75 s'],
  ['Aperturas con mancuernas', 'Tren superior', '3', '12-15', '60 s'],
  ['Aperturas en máquina', 'Tren superior', '3', '12-15', '60 s'],
  ['Cruce de poleas alto', 'Tren superior', '3', '12-15', '45 s'],
  ['Cruce de poleas medio', 'Tren superior', '3', '12-15', '45 s'],
  ['Cruce de poleas bajo', 'Tren superior', '3', '12-15', '45 s'],
  ['Flexiones de brazos', 'Tren superior', '3', '10-20', '60 s'],
  ['Flexiones inclinadas', 'Tren superior', '3', '10-15', '60 s'],
  ['Flexiones con manos cerradas', 'Tren superior', '3', '8-15', '60 s'],

  // ESPALDA
  ['Dominadas pronas', 'Tren superior', '4', '6-10', '90 s'],
  ['Dominadas supinas', 'Tren superior', '4', '6-10', '90 s'],
  ['Dominadas asistidas', 'Tren superior', '4', '8-12', '75 s'],
  ['Jalón al pecho agarre cerrado', 'Tren superior', '4', '10-12', '75 s'],
  ['Jalón al pecho agarre supino', 'Tren superior', '4', '10-12', '75 s'],
  ['Jalón unilateral en polea', 'Tren superior', '3', '10-12 por lado', '60 s'],
  ['Pullover en polea', 'Tren superior', '3', '12-15', '60 s'],
  ['Remo con mancuerna unilateral', 'Tren superior', '4', '8-12 por lado', '75 s'],
  ['Remo en máquina', 'Tren superior', '4', '10-12', '75 s'],
  ['Remo sentado en polea', 'Tren superior', '4', '10-12', '75 s'],
  ['Remo en polea agarre amplio', 'Tren superior', '3', '10-12', '75 s'],
  ['Remo pecho apoyado con mancuernas', 'Tren superior', '3', '10-12', '75 s'],
  ['Remo invertido', 'Tren superior', '3', '8-15', '60 s'],
  ['Face pull', 'Tren superior', '3', '12-15', '45 s'],
  ['Encogimientos con mancuernas', 'Tren superior', '3', '12-15', '60 s'],

  // HOMBROS
  ['Press Arnold', 'Tren superior', '4', '8-12', '75 s'],
  ['Press militar con mancuernas', 'Tren superior', '4', '8-12', '75 s'],
  ['Press de hombros en máquina', 'Tren superior', '3', '10-12', '75 s'],
  ['Elevación frontal con mancuernas', 'Tren superior', '3', '12-15', '45 s'],
  ['Elevación frontal con disco', 'Tren superior', '3', '12-15', '45 s'],
  ['Elevación lateral unilateral en polea', 'Tren superior', '3', '12-15 por lado', '45 s'],
  ['Pájaros con mancuernas', 'Tren superior', '3', '12-15', '45 s'],
  ['Pájaros en máquina', 'Tren superior', '3', '12-15', '45 s'],
  ['Remo al mentón con barra', 'Tren superior', '3', '10-12', '60 s'],
  ['Rotación externa con banda', 'Tren superior', '3', '12-15 por lado', '45 s'],

  // BÍCEPS
  ['Curl con barra recta', 'Tren superior', '3', '8-12', '60 s'],
  ['Curl con barra Z', 'Tren superior', '3', '8-12', '60 s'],
  ['Curl alternado con mancuernas', 'Tren superior', '3', '10-12 por brazo', '45 s'],
  ['Curl martillo', 'Tren superior', '3', '10-12', '45 s'],
  ['Curl inclinado con mancuernas', 'Tren superior', '3', '10-12', '60 s'],
  ['Curl concentrado', 'Tren superior', '3', '10-12 por brazo', '45 s'],
  ['Curl predicador', 'Tren superior', '3', '10-12', '60 s'],
  ['Curl en polea baja', 'Tren superior', '3', '12-15', '45 s'],
  ['Curl Bayesian en polea', 'Tren superior', '3', '10-15 por brazo', '45 s'],

  // TRÍCEPS
  ['Fondos en paralelas', 'Tren superior', '4', '6-12', '90 s'],
  ['Fondos asistidos', 'Tren superior', '3', '8-15', '75 s'],
  ['Press francés con barra Z', 'Tren superior', '3', '8-12', '60 s'],
  ['Press francés con mancuernas', 'Tren superior', '3', '10-12', '60 s'],
  ['Extensión de tríceps sobre la cabeza', 'Tren superior', '3', '10-15', '60 s'],
  ['Extensión de tríceps con cuerda', 'Tren superior', '3', '12-15', '45 s'],
  ['Extensión unilateral de tríceps en polea', 'Tren superior', '3', '12-15 por brazo', '45 s'],
  ['Patada de tríceps con mancuerna', 'Tren superior', '3', '12-15 por brazo', '45 s'],
  ['Press de banca agarre cerrado', 'Tren superior', '4', '8-10', '90 s'],

  // CORE
  ['Crunch abdominal', 'Core', '3', '15-20', '45 s'],
  ['Crunch en polea alta', 'Core', '3', '12-15', '45 s'],
  ['Crunch en máquina', 'Core', '3', '12-20', '45 s'],
  ['Elevación de piernas acostado', 'Core', '3', '10-15', '45 s'],
  ['Elevación de rodillas colgado', 'Core', '3', '8-15', '60 s'],
  ['Elevación de piernas colgado', 'Core', '3', '8-12', '60 s'],
  ['Rueda abdominal', 'Core', '3', '8-12', '60 s'],
  ['Bird dog', 'Core', '3', '10 por lado', '45 s'],
  ['Hollow hold', 'Core', '3', '20-40 s', '45 s'],
  ['Superman', 'Core', '3', '12-15', '45 s'],
  ['Russian twist', 'Core', '3', '16-20 totales', '45 s'],
  ['Mountain climbers', 'Core', '4', '30-40 s', '30 s'],
  ['Plancha con apoyo de antebrazos', 'Core', '3', '30-60 s', '45 s'],
  ['Plancha con toque de hombros', 'Core', '3', '10-15 por lado', '45 s'],
  ['Plancha con desplazamiento lateral', 'Core', '3', '8-10 por lado', '45 s'],
  ['Plancha Copenhagen', 'Core', '3', '20-30 s por lado', '60 s'],
  ['Pallof press de rodillas', 'Core', '3', '10-12 por lado', '45 s'],
  ['Caminata del granjero unilateral', 'Core', '3', '20-30 m por lado', '60 s'],

  // FUNCIONAL
  ['Clean con kettlebell', 'Funcional', '4', '8 por brazo', '60 s'],
  ['Snatch con kettlebell', 'Funcional', '4', '6-8 por brazo', '75 s'],
  ['Turkish get up', 'Funcional', '3', '3-5 por lado', '90 s'],
  ['Devil press', 'Funcional', '4', '8-10', '75 s'],
  ['Wall ball', 'Funcional', '4', '12-15', '45 s'],
  ['Lanzamiento de balón medicinal al suelo', 'Funcional', '4', '10-15', '45 s'],
  ['Lanzamiento de balón medicinal al frente', 'Funcional', '4', '8-12', '60 s'],
  ['Empuje de trineo', 'Funcional', '5', '15-25 m', '75 s'],
  ['Arrastre de trineo', 'Funcional', '5', '15-25 m', '75 s'],
  ['Gateo de oso', 'Funcional', '4', '15-20 m', '45 s'],
  ['Gateo lateral', 'Funcional', '3', '10-15 m por lado', '45 s'],
  ['Salto al cajón con descenso controlado', 'Funcional', '4', '5-8', '75 s'],
  ['Salto horizontal', 'Funcional', '4', '5-6', '75 s'],
  ['Salto lateral sobre línea', 'Funcional', '4', '20-30 s', '30 s'],
  ['Estocada con rotación de balón', 'Funcional', '3', '10 por lado', '60 s'],
  ['Thruster con mancuernas', 'Funcional', '4', '8-12', '75 s'],
  ['Renegade row', 'Funcional', '3', '8-10 por lado', '75 s'],
  ['Man maker', 'Funcional', '4', '6-8', '90 s'],
  ['Sandbag clean', 'Funcional', '4', '8-10', '75 s'],
  ['Carga de granjero', 'Funcional', '4', '20-40 m', '60 s'],

  // CARDIO
  ['Cinta caminata con inclinación', 'Cardio', '1', '15-30 min', ''],
  ['Cinta intervalos de carrera', 'Cardio', '8', '30 s rápido', '60 s suave'],
  ['Bicicleta intervalos', 'Cardio', '10', '30 s intenso', '60 s suave'],
  ['Air bike intervalos', 'Cardio', '10', '20 s intenso', '40 s suave'],
  ['Remo intervalos cortos', 'Cardio', '10', '30 s intenso', '30 s suave'],
  ['Remo intervalos largos', 'Cardio', '5', '2 min intenso', '1 min suave'],
  ['Soga doble salto', 'Cardio', '5', '30-45 s', '30 s'],
  ['Soga salto alternado', 'Cardio', '5', '1 min', '30 s'],
  ['Escalador en máquina', 'Cardio', '1', '10-20 min', ''],
  ['Circuito aeróbico continuo', 'Cardio', '1', '20-30 min', ''],

  // MOVILIDAD
  ['Movilidad de cadera 90-90', 'Movilidad', '2', '8 por lado', ''],
  ['Rotación interna de cadera', 'Movilidad', '2', '10 por lado', ''],
  ['Rotación externa de cadera', 'Movilidad', '2', '10 por lado', ''],
  ['Estiramiento de glúteos', 'Movilidad', '2', '30 s por lado', ''],
  ['Estiramiento de isquiotibiales', 'Movilidad', '2', '30 s por lado', ''],
  ['Estiramiento de cuádriceps', 'Movilidad', '2', '30 s por lado', ''],
  ['Estiramiento de aductores', 'Movilidad', '2', '30 s por lado', ''],
  ['Movilidad de tobillo contra pared', 'Movilidad', '2', '10 por lado', ''],
  ['Movilidad de hombros con banda', 'Movilidad', '2', '12-15', ''],
  ['Dislocaciones de hombro con banda', 'Movilidad', '2', '10-12', ''],
  ['Rotación externa de hombro con banda', 'Movilidad', '2', '12 por lado', ''],
  ['Rotación torácica en cuadrupedia', 'Movilidad', '2', '8 por lado', ''],
  ['Extensión torácica sobre foam roller', 'Movilidad', '2', '8-10', ''],
  ['Postura del niño', 'Movilidad', '2', '30-45 s', ''],
  ['Perro boca abajo', 'Movilidad', '2', '30-45 s', ''],
  ['Estocada con rotación torácica', 'Movilidad', '2', '6-8 por lado', ''],
  ['Sentadilla profunda asistida', 'Movilidad', '2', '30-45 s', '']
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
