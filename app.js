const SUPABASE_URL = 'https://widdbffswksbugmbesja.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Lndqkrn26vuQDmwx72SqNA_ihZ-ZBLe';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const EXERCISE_LIBRARY = [
  ['Sentadilla libre', 'Tren inferior', '4', '8-10', '90 s', 'img/ejercicios/sentadilla-libre.png'],
  ['Sentadilla goblet', 'Tren inferior', '3', '10-12', '60 s', 'img/ejercicios/sentadilla-goblet.png'],
  ['Sentadilla frontal', 'Tren inferior', '4', '6-10', '120 s', 'img/ejercicios/sentadilla-frontal.png'],
  ['Sentadilla sumo con mancuerna', 'Tren inferior', '3', '10-15', '60 s', 'img/ejercicios/sentadilla-sumo-con-mancuerna.png'],
  ['Sentadilla a cajón', 'Tren inferior', '4', '8-10', '90 s', 'img/ejercicios/sentadilla-a-cajon.png'],
  ['Sentadilla Hack', 'Tren inferior', '4', '8-12', '90 s', 'img/ejercicios/sentadilla-hack.png'],
  ['Sentadilla en multipower', 'Tren inferior', '4', '8-12', '90 s', 'img/ejercicios/sentadilla-en-multipower.png'],
  ['Prensa de piernas', 'Tren inferior', '4', '10-12', '90 s', 'img/ejercicios/prensa-de-piernas.png'],
  ['Prensa inclinada unilateral', 'Tren inferior', '3', '10-12 por pierna', '75 s', 'img/ejercicios/prensa-inclinada-unilateral.png'],
  ['Peso muerto convencional', 'Tren inferior', '4', '6-8', '120 s', 'img/ejercicios/peso-muerto-convencional.png'],

  ['Peso muerto sumo', 'Tren inferior', '4', '6-10', '120 s', 'img/ejercicios/peso-muerto-sumo.png'],
  ['Peso muerto con trap bar', 'Tren inferior', '4', '6-8', '120 s', 'img/ejercicios/peso-muerto-con-trap-bar.png'],
  ['Peso muerto rumano', 'Tren inferior', '4', '8-10', '90 s', 'img/ejercicios/peso-muerto-rumano.png'],
  ['Peso muerto a una pierna', 'Tren inferior', '3', '8-10 por pierna', '75 s', 'img/ejercicios/peso-muerto-a-una-pierna.png'],
  ['Buenos días con barra', 'Tren inferior', '3', '10-12', '75 s', 'img/ejercicios/buenos-dias-con-barra.png'],
  ['Hip thrust', 'Tren inferior', '4', '10-12', '75 s', 'img/ejercicios/hip-thrust.png'],
  ['Hip thrust unilateral', 'Tren inferior', '3', '10-12 por pierna', '75 s', 'img/ejercicios/hip-thrust-unilateral.png'],
  ['Puente de glúteos', 'Tren inferior', '4', '12-15', '60 s', 'img/ejercicios/puente-de-gluteos.png'],
  ['Zancadas', 'Tren inferior', '3', '10 por pierna', '60 s', 'img/ejercicios/zancadas.png'],
  ['Zancada hacia atrás', 'Tren inferior', '3', '10 por pierna', '60 s', 'img/ejercicios/zancada-hacia-atras.png'],
  ['Zancada lateral', 'Tren inferior', '3', '10 por lado', '60 s', 'img/ejercicios/zancada-lateral.png'],
  ['Zancadas caminando', 'Tren inferior', '3', '12 pasos por pierna', '75 s', 'img/ejercicios/zancadas-caminando.png'],
  ['Sentadilla búlgara', 'Tren inferior', '3', '8-10 por pierna', '75 s', 'img/ejercicios/sentadilla-bulgara.png'],
  ['Subida al banco', 'Tren inferior', '3', '10 por pierna', '60 s', 'img/ejercicios/subida-al-banco.png'],
  ['Subida al banco con rodilla arriba', 'Tren inferior', '3', '10 por pierna', '60 s', 'img/ejercicios/subida-al-banco-con-rodilla-arriba.png'],
  ['Extensión de cuádriceps', 'Tren inferior', '3', '12-15', '60 s', 'img/ejercicios/extension-de-cuadriceps.png'],
  ['Extensión de cuádriceps unilateral', 'Tren inferior', '3', '10-15 por pierna', '60 s', 'img/ejercicios/extension-de-cuadriceps-unilateral.png'],
  ['Curl femoral acostado', 'Tren inferior', '3', '10-15', '60 s', 'img/ejercicios/curl-femoral-acostado.png'],
  ['Curl femoral sentado', 'Tren inferior', '3', '10-15', '60 s', 'img/ejercicios/curl-femoral-sentado.png'],
  ['Curl femoral unilateral', 'Tren inferior', '3', '10-12 por pierna', '60 s', 'img/ejercicios/curl-femoral-unilateral.png'],
  ['Patada de glúteos en polea', 'Tren inferior', '3', '12-15 por pierna', '45 s', 'img/ejercicios/Patada de glúteos en polea.png'],
  ['Abducción de cadera en máquina', 'Tren inferior', '3', '15-20', '45 s', 'img/ejercicios/abduccion-de-cadera-en-maquina.png'],
  ['Aducción de cadera en máquina', 'Tren inferior', '3', '15-20', '45 s', 'img/ejercicios/aduccion-de-cadera-en-maquina.png'],
  ['Caminata lateral con minibanda', 'Tren inferior', '3', '12 pasos por lado', '45 s', 'img/ejercicios/caminata-lateral-con-minibanda.png'],
  ['Monster walk con minibanda', 'Tren inferior', '3', '12 pasos por dirección', '45 s', 'img/ejercicios/monster-walk-con-minibanda.png'],
  ['Elevación de talones de pie', 'Tren inferior', '4', '15-20', '45 s', 'img/ejercicios/elevacion-de-talones-de-pie.png'],
  ['Elevación de talones sentado', 'Tren inferior', '4', '15-20', '45 s', 'img/ejercicios/elevacion-de-talones-sentado.png'],
  ['Elevación de talón unilateral', 'Tren inferior', '3', '12-15 por pierna', '45 s', 'img/ejercicios/elevacion-de-talon-unilateral.png'],

  ['Press de banca', 'Tren superior', '4', '8-10', '90 s', 'img/ejercicios/press-de-banca.png'],
  ['Press plano con mancuernas', 'Tren superior', '4', '8-12', '75 s', 'img/ejercicios/press-plano-con-mancuernas.png'],
  ['Press inclinado con barra', 'Tren superior', '4', '8-10', '90 s', 'img/ejercicios/press-inclinado-con-barra.png'],
  ['Press inclinado con mancuernas', 'Tren superior', '4', '8-12', '75 s', 'img/ejercicios/press-inclinado-con-mancuernas.png'],
  ['Press declinado con barra', 'Tren superior', '4', '8-10', '90 s', 'img/ejercicios/press-declinado-con-barra.png'],
  ['Press de pecho en máquina', 'Tren superior', '3', '10-12', '75 s', 'img/ejercicios/press-de-pecho-en-maquina.png'],
  ['Aperturas con mancuernas', 'Tren superior', '3', '12-15', '60 s', 'img/ejercicios/aperturas-con-mancuernas.png'],
  ['Aperturas en máquina', 'Tren superior', '3', '12-15', '60 s', 'img/ejercicios/aperturas-en-maquina.png'],
  ['Cruce de poleas alto', 'Tren superior', '3', '12-15', '45 s', 'img/ejercicios/cruce-de-poleas-alto.png'],
  ['Cruce de poleas medio', 'Tren superior', '3', '12-15', '45 s', 'img/ejercicios/cruce-de-poleas-medio.png'],
  ['Cruce de poleas bajo', 'Tren superior', '3', '12-15', '45 s', 'img/ejercicios/cruce-de-poleas-bajo.png'],
  ['Flexiones de brazos', 'Tren superior', '3', '10-20', '60 s', 'img/ejercicios/flexiones-de-brazos.png'],
  ['Flexiones inclinadas', 'Tren superior', '3', '10-15', '60 s', 'img/ejercicios/flexiones-inclinadas.png'],
  ['Flexiones con manos cerradas', 'Tren superior', '3', '8-15', '60 s', 'img/ejercicios/flexiones-con-manos-cerradas.png'],

  ['Dominadas pronas', 'Tren superior', '4', '6-10', '90 s', 'img/ejercicios/dominadas-pronas.png'],
  ['Dominadas supinas', 'Tren superior', '4', '6-10', '90 s', 'img/ejercicios/dominadas-supinas.png'],
  ['Dominadas asistidas', 'Tren superior', '4', '8-12', '75 s', 'img/ejercicios/dominadas-asistidas.png'],
  ['Jalón al pecho', 'Tren superior', '4', '10-12', '75 s', 'img/ejercicios/jalon-al-pecho.png'],
  ['Jalón al pecho agarre cerrado', 'Tren superior', '4', '10-12', '75 s', 'img/ejercicios/jalon-al-pecho-agarre-cerrado.png'],
  ['Jalón al pecho agarre supino', 'Tren superior', '4', '10-12', '75 s', 'img/ejercicios/jalon-al-pecho-agarre-supino.png'],
  ['Jalón unilateral en polea', 'Tren superior', '3', '10-12 por lado', '60 s', 'img/ejercicios/jalon-unilateral-en-polea.png'],
  ['Pullover en polea', 'Tren superior', '3', '12-15', '60 s', 'img/ejercicios/pullover-en-polea.png'],
  ['Remo con barra', 'Tren superior', '4', '8-10', '90 s', 'img/ejercicios/remo-con-barra.png'],
  ['Remo con mancuerna unilateral', 'Tren superior', '4', '8-12 por lado', '75 s', 'img/ejercicios/remo-con-mancuerna-unilateral.png'],
  ['Remo en máquina', 'Tren superior', '4', '10-12', '75 s', 'img/ejercicios/remo-en-maquina.png'],
  ['Remo sentado en polea', 'Tren superior', '4', '10-12', '75 s', 'img/ejercicios/remo-sentado-en-polea.png'],
  ['Remo en polea agarre amplio', 'Tren superior', '3', '10-12', '75 s', 'img/ejercicios/remo-en-polea-agarre-amplio.png'],
  ['Remo pecho apoyado con mancuernas', 'Tren superior', '3', '10-12', '75 s', 'img/ejercicios/remo-pecho-apoyado-con-mancuernas.png'],
  ['Remo invertido', 'Tren superior', '3', '8-15', '60 s', 'img/ejercicios/remo-invertido.png'],
  ['Face pull', 'Tren superior', '3', '12-15', '45 s', 'img/ejercicios/face-pull.png'],
  ['Encogimientos con mancuernas', 'Tren superior', '3', '12-15', '60 s', 'img/ejercicios/encogimientos-con-mancuernas.png'],

  ['Press militar', 'Tren superior', '4', '8-10', '90 s', 'img/ejercicios/press-militar.png'],
  ['Press militar con mancuernas', 'Tren superior', '4', '8-10', '90 s', 'img/ejercicios/press-militar-con-mancuernas.png'],
  ['Press Arnold', 'Tren superior', '4', '8-10', '75 s', 'img/ejercicios/press-arnold.png'],
  ['Press de hombros en máquina', 'Tren superior', '4', '10-12', '75 s', 'img/ejercicios/press-de-hombros-en-maquina.png'],
  ['Elevaciones laterales', 'Tren superior', '3', '12-15', '45 s', 'img/ejercicios/elevaciones-laterales.png'],
  ['Elevación lateral unilateral en polea', 'Tren superior', '3', '12-15 por lado', '45 s', 'img/ejercicios/elevacion-lateral-unilateral-en-polea.png'],
  ['Elevación frontal con mancuernas', 'Tren superior', '3', '12-15', '45 s', 'img/ejercicios/elevacion-frontal-con-mancuernas.png'],
  ['Elevación frontal con disco', 'Tren superior', '3', '12-15', '45 s', 'img/ejercicios/elevacion-frontal-con-disco.png'],
  ['Pájaros con mancuernas', 'Tren superior', '3', '12-15', '45 s', 'img/ejercicios/pajaros-con-mancuernas.png'],
  ['Pájaros en máquina', 'Tren superior', '3', '12-15', '45 s', 'img/ejercicios/pajaros-en-maquina.png'],
  ['Remo al mentón con barra', 'Tren superior', '3', '10-12', '60 s', 'img/ejercicios/remo-al-menton-con-barra.png'],
  ['Rotación externa con banda', 'Tren superior', '3', '12-15 por lado', '45 s', 'img/ejercicios/tanda09-rotacion-externa-con-banda.png'],

  ['Curl de bíceps', 'Tren superior', '3', '10-12', '45 s', 'img/ejercicios/curl-de-biceps.png'],
  ['Curl con barra recta', 'Tren superior', '3', '8-12', '60 s', 'img/ejercicios/curl-con-barra-recta.png'],
  ['Curl con barra Z', 'Tren superior', '3', '8-12', '60 s', 'img/ejercicios/curl-con-barra-z.png'],
  ['Curl alternado con mancuernas', 'Tren superior', '3', '10-12 por brazo', '45 s', 'img/ejercicios/curl-alternado-con-mancuernas.png'],
  ['Curl martillo', 'Tren superior', '3', '10-12', '45 s', 'img/ejercicios/curl-martillo.png'],
  ['Curl inclinado con mancuernas', 'Tren superior', '3', '10-12', '60 s', 'img/ejercicios/curl-inclinado-con-mancuernas.png'],
  ['Curl concentrado', 'Tren superior', '3', '10-12 por brazo', '45 s', 'img/ejercicios/curl-concentrado.png'],
  ['Curl predicador', 'Tren superior', '3', '10-12', '60 s', 'img/ejercicios/curl-predicador.png'],
  ['Curl en polea baja', 'Tren superior', '3', '12-15', '45 s', 'img/ejercicios/curl-en-polea-baja.png'],
  ['Curl Bayesian en polea', 'Tren superior', '3', '10-15 por brazo', '45 s', 'img/ejercicios/curl-bayesian-en-polea.png'],

  ['Tríceps en polea', 'Tren superior', '3', '12-15', '45 s', 'img/ejercicios/Tríceps en polea.png'],
  ['Fondos en paralelas', 'Tren superior', '4', '6-12', '90 s', 'img/ejercicios/Fondos en paralelas.png'],
  ['Fondos asistidos', 'Tren superior', '3', '8-15', '75 s', 'img/ejercicios/Fondos asistidos.png'],
  ['Press francés con barra Z', 'Tren superior', '3', '8-12', '60 s', 'img/ejercicios/Press francés con barra Z.png'],
  ['Press francés con mancuernas', 'Tren superior', '3', '10-12', '60 s', 'img/ejercicios/Press francés con mancuernas.png'],
  ['Extensión de tríceps sobre la cabeza', 'Tren superior', '3', '10-15', '60 s', 'img/ejercicios/Extensión de tríceps sobre la cabeza.png'],
  ['Extensión de tríceps con cuerda', 'Tren superior', '3', '12-15', '45 s', 'img/ejercicios/Extensión de tríceps con cuerda.png'],
  ['Extensión unilateral de tríceps en polea', 'Tren superior', '3', '12-15 por brazo', '45 s', 'img/ejercicios/Extensión unilateral de tríceps en polea.png'],
  ['Patada de tríceps con mancuerna', 'Tren superior', '3', '12-15 por brazo', '45 s', 'img/ejercicios/Patada de tríceps con mancuerna.png'],
  ['Press de banca agarre cerrado', 'Tren superior', '4', '8-10', '90 s', 'img/ejercicios/Press de banca agarre cerrado.png'],

  ['Plancha frontal', 'Core', '3', '30-45 s', '45 s', 'img/ejercicios/tanda09-plancha-frontal.png'],
  ['Plancha lateral', 'Core', '3', '25-40 s', '45 s', 'img/ejercicios/tanda09-plancha-lateral.png'],
  ['Plancha con apoyo de antebrazos', 'Core', '3', '30-60 s', '45 s', 'img/ejercicios/tanda09-plancha-con-apoyo-de-antebrazos.png'],
  ['Plancha con toque de hombros', 'Core', '3', '10-15 por lado', '45 s', 'img/ejercicios/tanda04-plancha-con-toque-de-hombros.png'],
  ['Plancha con desplazamiento lateral', 'Core', '3', '8-10 por lado', '45 s', 'img/ejercicios/tanda04-plancha-con-desplazamiento-lateral.png'],
  ['Plancha Copenhagen', 'Core', '3', '20-30 s por lado', '60 s', 'img/ejercicios/tanda04-plancha-copenhagen.png'],
  ['Dead bug', 'Core', '3', '10 por lado', '45 s', 'img/ejercicios/tanda02-dead-bug.png'],
  ['Bird dog', 'Core', '3', '10 por lado', '45 s', 'img/ejercicios/Ejercicio bird-dog en cuadrupedia-6.png'],
  ['Pallof press', 'Core', '3', '10-12 por lado', '45 s', 'img/ejercicios/tanda04-pallof-press.png'],
  ['Pallof press de rodillas', 'Core', '3', '10-12 por lado', '45 s', 'img/ejercicios/tanda04-pallof-press-de-rodillas.png'],
  ['Crunch abdominal', 'Core', '3', '15-20', '45 s', 'img/ejercicios/tanda02-crunch-abdominal.png'],
  ['Crunch en polea alta', 'Core', '3', '12-15', '45 s', 'img/ejercicios/tanda02-crunch-en-polea-alta.png'],
  ['Crunch en máquina', 'Core', '3', '12-20', '45 s', 'img/ejercicios/tanda02-crunch-en-maquina.png'],
  ['Elevación de piernas acostado', 'Core', '3', '10-15', '45 s', 'img/ejercicios/tanda03-elevacion-de-piernas-acostado.png'],
  ['Elevación de rodillas colgado', 'Core', '3', '8-15', '60 s', 'img/ejercicios/tanda03-elevacion-de-rodillas-colgado.png'],
  ['Elevación de piernas colgado', 'Core', '3', '8-12', '60 s', 'img/ejercicios/tanda03-elevacion-de-piernas-colgado.png'],
  ['Rueda abdominal', 'Core', '3', '8-12', '60 s', 'img/ejercicios/tanda04-rueda-abdominal.png'],
  ['Hollow hold', 'Core', '3', '20-40 s', '45 s', 'img/ejercicios/tanda04-hollow-hold.png'],
  ['Superman', 'Core', '3', '12-15', '45 s', 'img/ejercicios/tanda04-superman.png'],
  ['Russian twist', 'Core', '3', '16-20 totales', '45 s', 'img/ejercicios/tanda04-russian-twist.png'],
  ['Mountain climbers', 'Core', '4', '30-40 s', '30 s', 'img/ejercicios/tanda04-mountain-climbers.png'],
  ['Caminata del granjero unilateral', 'Core', '3', '20-30 m por lado', '60 s', 'img/ejercicios/Paseo unilateral del granjero-9.png'],

  ['Burpees', 'Funcional', '4', '8-12', '45 s', 'img/ejercicios/Burpee en plancha, técnica correcta-8.png'],
  ['Kettlebell swing', 'Funcional', '4', '15', '45 s', 'img/ejercicios/tanda05-kettlebell-swing.png'],
  ['Clean con kettlebell', 'Funcional', '4', '8 por brazo', '60 s', 'img/ejercicios/tanda02-clean-con-kettlebell.png'],
  ['Snatch con kettlebell', 'Funcional', '4', '6-8 por brazo', '75 s', 'img/ejercicios/tanda05-snatch-con-kettlebell.png'],
  ['Turkish get up', 'Funcional', '3', '3-5 por lado', '90 s', 'img/ejercicios/tanda05-turkish-get-up.png'],
  ['Battle ropes', 'Funcional', '4', '30 s', '30 s', 'img/ejercicios/Ondas alternas con cuerdas de batalla-3.png'],
  ['Farmer walk', 'Funcional', '4', '20-30 m', '60 s', 'img/ejercicios/tanda05-farmer-walk.png'],
  ['Carga de granjero', 'Funcional', '4', '20-40 m', '60 s', 'img/ejercicios/tanda02-carga-de-granjero.png'],
  ['Step up al cajón', 'Funcional', '3', '10 por pierna', '60 s', 'img/ejercicios/tanda05-step-up-al-cajon.png'],
  ['Box jump', 'Funcional', '4', '5-8', '75 s', 'img/ejercicios/Aterrizaje estable en caja pliométrica-7.png'],
  ['Salto al cajón con descenso controlado', 'Funcional', '4', '5-8', '75 s', 'img/ejercicios/tanda05-salto-al-cajon-con-descenso-controlado.png'],
  ['Salto horizontal', 'Funcional', '4', '5-6', '75 s', 'img/ejercicios/tanda05-salto-horizontal.png'],
  ['Salto lateral sobre línea', 'Funcional', '4', '20-30 s', '30 s', 'img/ejercicios/tanda05-salto-lateral-sobre-linea.png'],
  ['Thruster', 'Funcional', '4', '8-10', '75 s', 'img/ejercicios/tanda05-thruster.png'],
  ['Thruster con mancuernas', 'Funcional', '4', '8-12', '75 s', 'img/ejercicios/tanda05-thruster-con-mancuernas.png'],
  ['Devil press', 'Funcional', '4', '8-10', '75 s', 'img/ejercicios/tanda03-devil-press.png'],
  ['Wall ball', 'Funcional', '4', '12-15', '45 s', 'img/ejercicios/tanda06-wall-ball.png'],
  ['Lanzamiento de balón medicinal al suelo', 'Funcional', '4', '10-15', '45 s', 'img/ejercicios/tanda06-lanzamiento-de-balon-medicinal-al-suelo.png'],
  ['Lanzamiento de balón medicinal al frente', 'Funcional', '4', '8-12', '60 s', 'img/ejercicios/tanda06-lanzamiento-de-balon-medicinal-al-frente.png'],
  ['Empuje de trineo', 'Funcional', '5', '15-25 m', '75 s', 'img/ejercicios/tanda03-empuje-de-trineo.png'],
  ['Arrastre de trineo', 'Funcional', '5', '15-25 m', '75 s', 'img/ejercicios/Arrastre de trineo en gimnasio-2.png'],
  ['Gateo de oso', 'Funcional', '4', '15-20 m', '45 s', 'img/ejercicios/tanda06-gateo-de-oso.png'],
  ['Gateo lateral', 'Funcional', '3', '10-15 m por lado', '45 s', 'img/ejercicios/tanda06-gateo-lateral.png'],
  ['Estocada con rotación de balón', 'Funcional', '3', '10 por lado', '60 s', 'img/ejercicios/tanda06-estocada-con-rotacion-de-balon.png'],
  ['Renegade row', 'Funcional', '3', '8-10 por lado', '75 s', 'img/ejercicios/tanda06-renegade-row.png'],
  ['Man maker', 'Funcional', '4', '6-8', '90 s', 'img/ejercicios/tanda06-man-maker.png'],
  ['Sandbag clean', 'Funcional', '4', '8-10', '75 s', 'img/ejercicios/tanda06-sandbag-clean.png'],

  ['Caminata en cinta', 'Cardio', '1', '15-30 min', '', 'img/ejercicios/Técnica de caminata en cinta-10.png'],
  ['Cinta caminata con inclinación', 'Cardio', '1', '15-30 min', '', 'img/ejercicios/tanda02-cinta-caminata-con-inclinacion.png'],
  ['Cinta intervalos de carrera', 'Cardio', '8', '30 s rápido', '60 s suave', 'img/ejercicios/tanda02-cinta-intervalos-de-carrera.png'],
  ['Bicicleta fija', 'Cardio', '1', '15-30 min', '', 'img/ejercicios/Técnica de ciclismo en bicicleta estática-4.png'],
  ['Bicicleta intervalos', 'Cardio', '10', '30 s intenso', '60 s suave', 'img/ejercicios/Intervalos intensos en bicicleta estática-5.png'],
  ['Air bike intervalos', 'Cardio', '10', '20 s intenso', '40 s suave', 'img/ejercicios/Intervalos en bicicleta de aire-1.png'],
  ['Remo ergómetro', 'Cardio', '5', '1 min', '1 min', 'img/ejercicios/tanda06-remo-ergometro.png'],
  ['Remo intervalos cortos', 'Cardio', '10', '30 s intenso', '30 s suave', 'img/ejercicios/tanda08-remo-intervalos-cortos.png'],
  ['Remo intervalos largos', 'Cardio', '5', '2 min intenso', '1 min suave', 'img/ejercicios/tanda08-remo-intervalos-largos.png'],
  ['Soga', 'Cardio', '5', '1 min', '30 s', 'img/ejercicios/tanda08-soga.png'],
  ['Soga doble salto', 'Cardio', '5', '30-45 s', '30 s', 'img/ejercicios/tanda08-soga-doble-salto.png'],
  ['Soga salto alternado', 'Cardio', '5', '1 min', '30 s', 'img/ejercicios/tanda09-soga-salto-alternado.png'],
  ['Escalador en máquina', 'Cardio', '1', '10-20 min', '', 'img/ejercicios/tanda03-escalador-en-maquina.png'],
  ['Circuito aeróbico continuo', 'Cardio', '1', '20-30 min', '', 'img/ejercicios/tanda02-circuito-aerobico-continuo.png'],

  ['Movilidad de tobillo', 'Movilidad', '2', '10 por lado', '', 'img/ejercicios/tanda07-movilidad-de-tobillo.png'],
  ['Movilidad de tobillo contra pared', 'Movilidad', '2', '10 por lado', '', 'img/ejercicios/tanda07-movilidad-de-tobillo-contra-pared.png'],
  ['Movilidad de cadera 90-90', 'Movilidad', '2', '8 por lado', '', 'img/ejercicios/tanda07-movilidad-de-cadera-90-90.png'],
  ['Rotación interna de cadera', 'Movilidad', '2', '10 por lado', '', 'img/ejercicios/tanda07-rotacion-interna-de-cadera.png'],
  ['Rotación externa de cadera', 'Movilidad', '2', '10 por lado', '', 'img/ejercicios/tanda07-rotacion-externa-de-cadera.png'],
  ['Flexores de cadera', 'Movilidad', '2', '30 s por lado', '', 'img/ejercicios/tanda07-flexores-de-cadera.png'],
  ['Estiramiento de glúteos', 'Movilidad', '2', '30 s por lado', '', 'img/ejercicios/tanda03-estiramiento-de-gluteos.png'],
  ['Estiramiento de isquiotibiales', 'Movilidad', '2', '30 s por lado', '', 'img/ejercicios/tanda07-estiramiento-de-isquiotibiales.png'],
  ['Estiramiento de cuádriceps', 'Movilidad', '2', '30 s por lado', '', 'img/ejercicios/tanda03-estiramiento-de-cuadriceps.png'],
  ['Estiramiento de aductores', 'Movilidad', '2', '30 s por lado', '', 'img/ejercicios/tanda03-estiramiento-de-aductores.png'],
  ['Movilidad de hombros con banda', 'Movilidad', '2', '12-15', '', 'img/ejercicios/tanda07-movilidad-de-hombros-con-banda.png'],
  ['Dislocaciones de hombro con banda', 'Movilidad', '2', '10-12', '', 'img/ejercicios/tanda03-dislocaciones-de-hombro-con-banda.png'],
  ['Rotación externa de hombro con banda', 'Movilidad', '2', '12 por lado', '', 'img/ejercicios/tanda07-rotacion-externa-de-hombro-con-banda.png'],
  ['Rotación torácica', 'Movilidad', '2', '8 por lado', '', 'img/ejercicios/tanda07-rotacion-toracica.png'],
  ['Rotación torácica en cuadrupedia', 'Movilidad', '2', '8 por lado', '', 'img/ejercicios/tanda08-rotacion-toracica-en-cuadrupedia.png'],
  ['Extensión torácica sobre foam roller', 'Movilidad', '2', '8-10', '', 'img/ejercicios/tanda08-extension-toracica-sobre-foam-roller.png'],
  ['Cat-cow', 'Movilidad', '2', '10', '', 'img/ejercicios/tanda02-cat-cow.png'],
  ['Postura del niño', 'Movilidad', '2', '30-45 s', '', 'img/ejercicios/tanda08-postura-del-nino.png'],
  ['Perro boca abajo', 'Movilidad', '2', '30-45 s', '', 'img/ejercicios/tanda08-perro-boca-abajo.png'],
  ['Estocada con rotación torácica', 'Movilidad', '2', '6-8 por lado', '', 'img/ejercicios/tanda08-estocada-con-rotacion-toracica.png'],
  ['Sentadilla profunda asistida', 'Movilidad', '2', '30-45 s', '', 'img/ejercicios/tanda08-sentadilla-profunda-asistida.png'],
];

let clients = [];
let selectedClientId = null;
let selectedDay = 'Lunes';
let draftExercises = [];
let currentPlanId = null;

const $ = id => document.getElementById(id);

function normalizeExerciseName(name) {
  return String(name || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

// Equivalencias confirmadas para nombres alternativos usados en las rutinas.
// No asignar una imagen de otro ejercicio cuando la demostracion no coincida.
const EXERCISE_IMAGE_ALIASES = {
  'remo con agarre neutro': 'Remo sentado en polea',
  'remo polea agarre neutro': 'Remo sentado en polea',
  'remo sentado agarre neutro': 'Remo sentado en polea',
  'remo en polea agarre neutro': 'Remo sentado en polea'
};

function getExerciseImage(name) {
  const normalized = normalizeExerciseName(name);
  const alias = EXERCISE_IMAGE_ALIASES[normalized];
  const match = EXERCISE_LIBRARY.find(exercise =>
    normalizeExerciseName(exercise[0]) === normalizeExerciseName(alias || name)
  );
  return match?.[5] || '';
}


/* Galería ACTIVO: fotos disponibles y fichas gráficas para las pendientes. */
function exerciseMediaHtml(name, imagePath, category = '') {
  const safeName = escapeHtml(name);
  const safePath = escapeHtml(imagePath || '');
  const safeCategory = escapeHtml(category || 'Entrenamiento');
  const icon = /movilidad|estiramiento/i.test(category) ? '↗'
    : /cardio|aeróbic/i.test(category) ? '♥'
    : /core|abdominal/i.test(category) ? '◎' : '✦';
  return `<div class="activo-exercise-media">
    ${imagePath
      ? `<img class="exercise-thumb" src="${safePath}" alt="${safeName}" loading="lazy" decoding="async">`
      : `<div class="activo-exercise-cover" role="img" aria-label="Ficha gráfica de ${safeName}, fotografía pendiente">
          <span class="activo-cover-icon" aria-hidden="true">${icon}</span>
          <span class="activo-cover-category">${safeCategory}</span>
          <strong>${safeName}</strong>
          <small>Imagen demostrativa pendiente</small>
        </div>`}
    <img class="activo-media-logo" src="img/logo-activo-nuevo.png" alt="ACTIVO" loading="lazy">
  </div>`;
}

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

  if (!msg) return;

  msg.innerHTML = `<div class="${type}">${escapeHtml(text)}</div>`;

  setTimeout(() => {
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
  const { data: userData, error: userError } = await sb.auth.getUser();

  if (userError || !userData.user) {
    showMessage('No se pudo identificar al profesor.', 'error');
    return;
  }

  const { data, error } = await sb
    .from('clients')
    .select('*')
    .eq('created_by', userData.user.id)
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

    item
      .querySelector('.open')
      .addEventListener('click', async () => {
        selectedClientId = client.id;
        selectedDay = 'Lunes';

        await loadSelectedDay();

        renderPlanner();
      });

    item
      .querySelector('.edit')
      .addEventListener('click', () => {
        editClient(client);
      });

    item
      .querySelector('.del')
      .addEventListener('click', () => {
        deleteClient(client);
      });

    container.appendChild(item);
  });
}

async function editClient(client) {
  const {
    data: userData,
    error: userError
  } = await sb.auth.getUser();

  if (
    userError ||
    !userData.user
  ) {
    showMessage(
      'No se pudo identificar al profesor.',
      'error'
    );

    return;
  }

  if (
    client.created_by !==
    userData.user.id
  ) {
    showMessage(
      'No tenés permiso para editar este alumno.',
      'error'
    );

    return;
  }

  $('name').value =
    client.name || '';

  $('goal').value =
    client.goal || '';

  $('active').checked =
    Boolean(client.active);

  $('editId').value =
    client.id;

  $('cancel')
    .classList
    .remove('hidden');

  const {
    data,
    error
  } = await sb
    .from('client_private_notes')
    .select('notes')
    .eq('client_id', client.id)
    .maybeSingle();

  $('notes').value =
    error
      ? ''
      : (data?.notes || '');
}

function clearClientForm() {
  $('name').value = '';
  $('goal').value = '';
  $('notes').value = '';

  $('active').checked = true;

  $('editId').value = '';

  $('cancel')
    .classList
    .add('hidden');
}

async function saveClient() {
  const name =
    $('name').value.trim();

  const goal =
    $('goal').value.trim();

  const active =
    $('active').checked;

  const notes =
    $('notes').value.trim();

  if (!name) {
    alert(
      'Ingresá el nombre del alumno.'
    );

    return;
  }

  const {
    data: userData,
    error: userError
  } = await sb.auth.getUser();

  if (
    userError ||
    !userData.user
  ) {
    showMessage(
      'No se pudo identificar al profesor.',
      'error'
    );

    return;
  }

  const professorId =
    userData.user.id;

  let clientId =
    $('editId').value;

  if (clientId) {
    const { error } = await sb
      .from('clients')
      .update({
        name,
        goal,
        active,
        updated_at:
          new Date().toISOString()
      })
      .eq('id', clientId)
      .eq(
        'created_by',
        professorId
      );

    if (error) {
      showMessage(
        error.message,
        'error'
      );

      return;
    }

  } else {
    const {
      data,
      error
    } = await sb
      .from('clients')
      .insert({
        name,
        goal,
        active,
        created_by:
          professorId
      })
      .select()
      .single();

    if (error) {
      showMessage(
        error.message,
        'error'
      );

      return;
    }

    clientId =
      data.id;

    selectedClientId =
      clientId;
  }

  const {
    data: oldNote,
    error: noteSearchError
  } = await sb
    .from('client_private_notes')
    .select('id')
    .eq(
      'client_id',
      clientId
    )
    .maybeSingle();

  if (!noteSearchError) {
    if (oldNote) {
      await sb
        .from('client_private_notes')
        .update({
          notes
        })
        .eq(
          'id',
          oldNote.id
        );

    } else if (notes) {
      await sb
        .from('client_private_notes')
        .insert({
          client_id:
            clientId,

          notes
        });
    }
  }

  clearClientForm();

  await loadClients();

  showMessage(
    'Cliente guardado correctamente.'
  );
}

async function deleteClient(client) {
  const confirmed =
    confirm(
      `¿Eliminar a ${client.name}?`
    );

  if (!confirmed) {
    return;
  }

  const {
    data: userData,
    error: userError
  } = await sb.auth.getUser();

  if (
    userError ||
    !userData.user
  ) {
    showMessage(
      'No se pudo identificar al profesor.',
      'error'
    );

    return;
  }

  const { error } = await sb
    .from('clients')
    .delete()
    .eq(
      'id',
      client.id
    )
    .eq(
      'created_by',
      userData.user.id
    );

  if (error) {
    showMessage(
      error.message,
      'error'
    );

    return;
  }

  if (
    selectedClientId ===
    client.id
  ) {
    selectedClientId =
      null;

    draftExercises =
      [];

    currentPlanId =
      null;
  }

  await loadClients();

  showMessage(
    'Cliente eliminado.'
  );
}

async function loadSelectedDay() {
  draftExercises = [];
  currentPlanId = null;

  if (!selectedClientId) {
    return;
  }

  const {
    data: plan,
    error
  } = await sb
    .from('workout_plans')
    .select('*')
    .eq(
      'client_id',
      selectedClientId
    )
    .eq(
      'day_of_week',
      selectedDay
    )
    .maybeSingle();

  if (error) {
    showMessage(
      error.message,
      'error'
    );

    return;
  }

  if (!plan) {
    return;
  }

  currentPlanId =
    plan.id;

  const {
    data: exercises,
    error: exercisesError
  } = await sb
    .from('plan_exercises')
    .select('*')
    .neq('notes', 'DUPLICADO - NO REALIZAR')
    .eq(
      'plan_id',
      plan.id
    )
    .order(
      'exercise_order'
    );

  if (exercisesError) {
    showMessage(
      exercisesError.message,
      'error'
    );

    return;
  }

  draftExercises =
    (exercises || [])
      .map(exercise => ({
        name:
          exercise.exercise_name || '',

        sets:
          exercise.sets || '',

        reps:
          exercise.reps || '',

        load:
          exercise.load || '',

        rest:
          exercise.rest || '',

        notes:
          exercise.notes || ''
      }));
}

function renderPlanner() {
  const client =
    clients.find(
      item =>
        item.id ===
        selectedClientId
    );

  $('empty')
    .classList
    .toggle(
      'hidden',
      Boolean(client)
    );

  $('planner')
    .classList
    .toggle(
      'hidden',
      !client
    );

  if (!client) {
    return;
  }

  $('clientTitle').textContent =
    client.name;

  $('clientGoal').textContent =
    client.goal || '';

  const daysContainer =
    $('days');

  daysContainer.innerHTML =
    '';

  DAYS.forEach(dayName => {
    const button =
      document.createElement(
        'button'
      );

    button.textContent =
      dayName;

    button.className =
      `day ${
        dayName === selectedDay
          ? 'active'
          : ''
      }`;

    button.addEventListener(
      'click',
      async () => {
        selectedDay =
          dayName;

        await loadSelectedDay();

        renderPlanner();
      }
    );

    daysContainer
      .appendChild(button);
  });

  renderExercises();
}

function renderExercises() {
  const container =
    $('exerciseList');

  container.innerHTML =
    '';

  if (!draftExercises.length) {
    container.innerHTML =
      '<small>Sin ejercicios.</small>';

    return;
  }

  draftExercises.forEach(
    (exercise, index) => {

      const item =
        document.createElement(
          'div'
        );

      item.className =
        'exercise';

      const exerciseImage =
        getExerciseImage(
          exercise.name
        );

      item.innerHTML = `
        <div class="row">

          <b>
            Ejercicio ${index + 1}
          </b>

          <button class="rm danger">
            Quitar
          </button>

        </div>

        ${exerciseMediaHtml(exercise.name, exerciseImage, EXERCISE_LIBRARY.find(item => normalizeExerciseName(item[0]) === normalizeExerciseName(exercise.name))?.[1] || "")}

        <div class="cols">

          <div>
            <label>
              Ejercicio
            </label>

            <input
              class="name"
              value="${escapeHtml(
                exercise.name
              )}"
            >
          </div>

          <div>
            <label>
              Series
            </label>

            <input
              class="sets"
              value="${escapeHtml(
                exercise.sets
              )}"
            >
          </div>

          <div>
            <label>
              Repeticiones
            </label>

            <input
              class="reps"
              value="${escapeHtml(
                exercise.reps
              )}"
            >
          </div>

          <div>
            <label>
              Carga
            </label>

            <input
              class="load"
              value="${escapeHtml(
                exercise.load
              )}"
            >
          </div>

          <div>
            <label>
              Descanso
            </label>

            <input
              class="rest"
              value="${escapeHtml(
                exercise.rest
              )}"
            >
          </div>

          <div>
            <label>
              Observaciones
            </label>

            <input
              class="notes"
              value="${escapeHtml(
                exercise.notes
              )}"
            >
          </div>

        </div>
      `;

      [
        'sets',
        'reps',
        'load',
        'rest',
        'notes'
      ].forEach(field => {

        item
          .querySelector(`.${field}`)
          .addEventListener(
            'input',
            event => {

              exercise[field] =
                event.target.value;

            }
          );

      });

      const nameInput =
        item.querySelector('.name');

      nameInput.addEventListener(
        'input',
        event => {

          exercise.name =
            event.target.value;

        }
      );

      nameInput.addEventListener(
        'change',
        () => {

          renderExercises();

        }
      );

      item
        .querySelector('.rm')
        .addEventListener(
          'click',
          () => {

            draftExercises.splice(
              index,
              1
            );

            renderExercises();

          }
        );

      container.appendChild(
        item
      );
    }
  );
}
async function saveSelectedDay() {
  if (!selectedClientId) {
    alert(
      'Seleccioná un alumno.'
    );

    return;
  }

  if (!currentPlanId) {
    const {
      data,
      error
    } = await sb
      .from('workout_plans')
      .insert({
        client_id:
          selectedClientId,

        day_of_week:
          selectedDay,

        title:
          `Planificación ${selectedDay}`
      })
      .select()
      .single();

    if (error) {
      showMessage(
        error.message,
        'error'
      );

      return;
    }

    currentPlanId =
      data.id;
  }

  const {
    error: deleteError
  } = await sb
    .from('plan_exercises')
    .delete()
    .eq(
      'plan_id',
      currentPlanId
    );

  if (deleteError) {
    showMessage(
      deleteError.message,
      'error'
    );

    return;
  }

  if (
    draftExercises.length
  ) {
    const rows =
      draftExercises.map(
        (exercise, index) => ({

          plan_id:
            currentPlanId,

          exercise_name:
            exercise.name ||
            'Ejercicio',

          sets:
            exercise.sets,

          reps:
            exercise.reps,

          load:
            exercise.load,

          rest:
            exercise.rest,

          notes:
            exercise.notes,

          exercise_order:
            index

        })
      );

    const {
      error
    } = await sb
      .from('plan_exercises')
      .insert(rows);

    if (error) {
      showMessage(
        error.message,
        'error'
      );

      return;
    }
  }

  showMessage(
    `${selectedDay} guardado correctamente.`
  );
}

/* Duplicación segura: prepara un borrador; nunca escribe en Supabase automáticamente. */
function duplicateSelectedPlan() {
  if (!selectedClientId || !draftExercises.length) {
    alert('Seleccioná una planificación con ejercicios para duplicar.');
    return;
  }
  const sourceId = selectedClientId;
  const sourceDay = selectedDay;
  const source = draftExercises.map(ex => ({ ...ex }));
  const existing = document.getElementById('activo-duplicate-dialog');
  if (existing) existing.remove();
  const dialog = document.createElement('div');
  dialog.id = 'activo-duplicate-dialog';
  dialog.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px';
  const box = document.createElement('div');
  box.style.cssText = 'background:#19232d;color:#fff;border-radius:16px;padding:22px;width:min(460px,100%);max-height:90vh;overflow:auto';
  const title = document.createElement('h3');
  title.textContent = 'Duplicar planificación';
  const note = document.createElement('p');
  note.textContent = 'Se copian todos los ejercicios, incluidos los básicos, con sus series y repeticiones. Podés editar los auxiliares antes de guardar.';
  const studentLabel = document.createElement('label');
  studentLabel.textContent = 'Alumno de destino';
  const student = document.createElement('select');
  student.style.cssText = 'display:block;width:100%;margin:8px 0 16px;padding:10px';
  clients.forEach(person => {
    const option = document.createElement('option');
    option.value = person.id;
    option.textContent = person.name;
    option.selected = person.id === sourceId;
    student.appendChild(option);
  });
  studentLabel.appendChild(student);
  const dayLabel = document.createElement('label');
  dayLabel.textContent = 'Día de destino';
  const daySelect = document.createElement('select');
  daySelect.style.cssText = 'display:block;width:100%;margin:8px 0 16px;padding:10px';
  DAYS.forEach(day => {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day;
    option.selected = day === sourceDay;
    daySelect.appendChild(option);
  });
  dayLabel.appendChild(daySelect);
  const actions = document.createElement('div');
  actions.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap';
  const cancel = document.createElement('button');
  cancel.type = 'button';
  cancel.textContent = 'Cancelar';
  cancel.onclick = () => dialog.remove();
  const copy = document.createElement('button');
  copy.type = 'button';
  copy.textContent = 'Crear copia editable';
  copy.className = 'success';
  copy.onclick = async () => {
    const targetId = student.value;
    const targetDay = daySelect.value;
    if (!targetId || !DAYS.includes(targetDay)) return;
    copy.disabled = true;
    const { data: destination, error } = await sb.from('workout_plans')
      .select('id').eq('client_id', targetId).eq('day_of_week', targetDay).maybeSingle();
    if (error) {
      alert('No se pudo verificar el destino: ' + error.message);
      copy.disabled = false;
      return;
    }
    if (destination && !confirm('El destino ya tiene una rutina. La copia quedará solo en el editor hasta que presiones Guardar este día. Al guardar, reemplazarás los ejercicios de ese día. ¿Continuar?')) {
      copy.disabled = false;
      return;
    }
    selectedClientId = targetId;
    selectedDay = targetDay;
    currentPlanId = destination ? destination.id : null;
    draftExercises = source.map(ex => ({ ...ex }));
    dialog.remove();
    renderPlanner();
    showMessage('Copia lista para editar. Los ejercicios básicos se conservaron. Revisá los auxiliares y presioná Guardar este día cuando estés conforme.');
  };
  actions.append(cancel, copy);
  box.append(title, note, studentLabel, dayLabel, actions);
  dialog.appendChild(box);
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.remove(); });
  document.body.appendChild(dialog);
}

function openLibrary() {
  if (!selectedClientId) {
    alert(
      'Seleccioná un cliente.'
    );

    return;
  }

  $('libraryModal')
    .classList
    .remove('hidden');

  renderLibrary();
}


function renderLibrary() {
  const search =
    $('libSearch')
      .value
      .toLowerCase()
      .trim();

  const category =
    $('libCat').value;

  const container =
    $('library');

  container.innerHTML =
    '';

  EXERCISE_LIBRARY
    .filter(exercise => {

      const categoryMatches =
        !category ||
        exercise[1] === category;

      const searchMatches =
        !search ||
        exercise
          .join(' ')
          .toLowerCase()
          .includes(search);

      return (
        categoryMatches &&
        searchMatches
      );

    })
    .forEach(exercise => {

      const item =
        document.createElement(
          'div'
        );

      const imagePath =
        exercise[5] || '';

      item.className =
        'lib';

      item.innerHTML = `

        ${exerciseMediaHtml(exercise[0], imagePath, exercise[1])}

        <b>
          ${escapeHtml(
            exercise[0]
          )}
        </b>

        <small>
          ${escapeHtml(
            exercise[1]
          )}
        </small>

        <p>
          <small>

            ${escapeHtml(
              exercise[2]
            )}
            series

            ·

            ${escapeHtml(
              exercise[3]
            )}

            ·

            descanso
            ${escapeHtml(
              exercise[4] || '-'
            )}

          </small>
        </p>

        <button>
          Agregar a
          ${escapeHtml(
            selectedDay
          )}
        </button>

      `;

      item
        .querySelector(
          'button'
        )
        .addEventListener(
          'click',
          () => {

            draftExercises.push({

              name:
                exercise[0],

              sets:
                exercise[2],

              reps:
                exercise[3],

              load:
                '',

              rest:
                exercise[4],

              notes:
                ''

            });

            renderExercises();

            alert(
              'Agregado. Recordá guardar el día.'
            );

          }
        );

      container.appendChild(
        item
      );

    });
}


/* ========================================
   VISTA PÚBLICA DE LOS ALUMNOS
======================================== */

async function loadPublicClients() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const profe =
    (params.get('profe') || '')
      .toLowerCase()
      .trim();

  const PROFESSORS = {

    cristian:
      '5d1005e9-ca80-49db-9ed6-8309ac9c16fd',

    jero:
      'b03b6b12-46f1-44b5-842e-3931fe4ea875',

    nico:
      '873b7f5e-fa25-4451-a03f-26ee20af5b7d',

    rodri:
      '1f51bcf5-8092-436f-bbd2-09c35b1990b1'

  };

  const professorId =
    PROFESSORS[profe];

  if (!professorId) {

    window.publicClients =
      [];

    $('results').innerHTML =
      '<div class="error">' +
      'Este enlace no corresponde a ningún profesor.' +
      '</div>';

    return;
  }

  const {
    data,
    error
  } = await sb
    .from('clients')
    .select(
      'id,name,goal'
    )
    .eq(
      'active',
      true
    )
    .eq(
      'created_by',
      professorId
    )
    .order(
      'name'
    );

  window.publicClients =
    data || [];

  if (error) {

    $('results').innerHTML =
      '<div class="error">' +
      'No se pudieron cargar los alumnos.' +
      '</div>';

    return;
  }

  renderPublicResults();
}


function renderPublicResults() {

  const search =
    $('search')
      .value
      .toLowerCase()
      .trim();

  const container =
    $('results');

  container.innerHTML =
    '';

  const results =
    (window.publicClients || [])
      .filter(client =>

        !search ||

        client.name
          .toLowerCase()
          .includes(search)

      );

  if (!results.length) {

    if (search) {

      container.innerHTML =
        '<small>' +
        'No se encontró ningún alumno.' +
        '</small>';

    }

    return;
  }

  results.forEach(client => {

    const button =
      document.createElement(
        'button'
      );

    button.className =
      'public-result';

    button.innerHTML = `

      <b>
        ${escapeHtml(
          client.name
        )}
      </b>

      <small>
        ${escapeHtml(
          client.goal || ''
        )}
      </small>

    `;

    button.addEventListener(
      'click',
      () => {

        showPublicPlan(
          client
        );

      }
    );

    container.appendChild(
      button
    );

  });
}


/* ========================================
   CONVERTIR DESCANSO A SEGUNDOS
======================================== */

function parseRestSeconds(value) {

  const text =
    String(value || '')
      .toLowerCase()
      .trim();

  if (!text) {
    return null;
  }

  const minuteMatch =
    text.match(
      /(\d+(?:[.,]\d+)?)\s*min/
    );

  if (minuteMatch) {

    return Math.round(

      parseFloat(
        minuteMatch[1]
          .replace(',', '.')
      ) * 60

    );

  }

  const secondMatch =
    text.match(
      /(\d+)\s*s/
    );

  if (secondMatch) {

    return Number(
      secondMatch[1]
    );

  }

  const plainNumber =
    text.match(
      /^\d+$/
    );

  if (plainNumber) {

    return Number(
      plainNumber[0]
    );

  }

  return null;
}


/* ========================================
   REGISTRO LOCAL DEL ENTRENAMIENTO
   No modifica las rutinas en Supabase.
======================================== */

function workoutLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function readWorkoutRecord(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}') || {};
  } catch (error) {
    return {};
  }
}

function writeWorkoutRecord(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

function enhancePublicWorkout(client, plans, exercises) {
  const today = workoutLocalDate();
  const clientKey = 'activo:workout:v1:' + client.id;
  const weightsKey = clientKey + ':weights';
  const weights = readWorkoutRecord(weightsKey);

  DAYS.forEach(dayName => {
    const panel = Array.from(
      document.querySelectorAll('.public-day-panel')
    ).find(item => item.dataset.publicPanel === dayName);

    const plan = (plans || []).find(
      item => item.day_of_week === dayName
    );

    if (!panel || !plan) return;

    const dayExercises = exercises.filter(
      item => item.plan_id === plan.id
    );
    const cards = Array.from(panel.querySelectorAll('.public-ex'));

    if (!dayExercises.length || cards.length !== dayExercises.length) {
      return;
    }

    const completedKey = clientKey + ':completed:' + plan.id + ':' + today;
    const completed = readWorkoutRecord(completedKey);

    const progress = document.createElement('div');
    progress.className = 'workout-progress';
    const heading = document.createElement('div');
    heading.className = 'workout-progress-heading';
    const count = document.createElement('strong');
    const caption = document.createElement('small');
    caption.textContent = 'Entrenamiento de hoy';
    heading.append(caption, count);

    const track = document.createElement('div');
    track.className = 'workout-progress-track';
    const fill = document.createElement('div');
    fill.className = 'workout-progress-fill';
    track.appendChild(fill);
    progress.append(heading, track);
    panel.insertBefore(progress, cards[0]);

    function updateProgress() {
      const done = dayExercises.filter(
        (exercise, index) =>
          completed[String(exercise.id || index)] === true
      ).length;
      count.textContent = done + ' de ' + dayExercises.length + ' completados';
      fill.style.width = (done / dayExercises.length * 100) + '%';
      progress.classList.toggle('complete', done === dayExercises.length);
    }

    dayExercises.forEach((exercise, index) => {
      const card = cards[index];
      const exerciseKey = String(exercise.id || index);
      const weightKey = String(plan.id) + ':' + exerciseKey;

      const tools = document.createElement('div');
      tools.className = 'workout-exercise-tools';

      const completeLabel = document.createElement('label');
      completeLabel.className = 'workout-complete-label';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = completed[exerciseKey] === true;
      const completeText = document.createElement('span');
      completeText.textContent = 'Ejercicio completado';
      completeLabel.append(checkbox, completeText);
      card.classList.toggle('workout-done', checkbox.checked);

      checkbox.addEventListener('change', () => {
        completed[exerciseKey] = checkbox.checked;
        if (!writeWorkoutRecord(completedKey, completed)) {
          alert('No se pudo guardar el avance en este navegador.');
        }
        card.classList.toggle('workout-done', checkbox.checked);
        updateProgress();
      });

      const weightLabel = document.createElement('label');
      weightLabel.className = 'workout-weight-label';
      const weightText = document.createElement('span');
      weightText.textContent = 'Peso utilizado (kg)';
      const input = document.createElement('input');
      input.type = 'number';
      input.min = '0';
      input.max = '9999';
      input.step = '0.5';
      input.inputMode = 'decimal';
      input.placeholder = 'Ej.: 40';
      input.setAttribute('aria-label', 'Peso utilizado en ' + exercise.exercise_name);
      if (Object.prototype.hasOwnProperty.call(weights, weightKey)) {
        input.value = weights[weightKey];
      }
      weightLabel.append(weightText, input);
      const saveButton = document.createElement('button');
      saveButton.type = 'button';
      saveButton.className = 'workout-save-weight';
      saveButton.textContent = '💾 Guardar peso';
      const feedback = document.createElement('small');
      feedback.className = 'workout-weight-feedback';
      feedback.setAttribute('role', 'status');
      const saveWeight = () => {
        const raw = input.value.trim().replace(',', '.');
        const value = Number(raw);
        if (raw && (!Number.isFinite(value) || value < 0 || value > 9999)) {
          feedback.textContent = 'Ingresá un peso válido entre 0 y 9999 kg.';
          return;
        }
        const updated = { ...weights };
        if (raw === '') delete updated[weightKey];
        else updated[weightKey] = String(value);
        if (!writeWorkoutRecord(weightsKey, updated)) {
          feedback.textContent = 'No se pudo guardar el peso en este navegador.';
          return;
        }
        Object.keys(weights).forEach(key => delete weights[key]);
        Object.assign(weights, updated);
        input.value = raw === '' ? '' : String(value);
        feedback.textContent = raw === '' ? '✓ Peso eliminado' : '✓ Peso guardado: ' + value + ' kg';
      };
      saveButton.addEventListener('click', saveWeight);
      input.addEventListener('input', () => { feedback.textContent = 'Sin guardar'; });
      weightLabel.append(saveButton, feedback);

      tools.append(completeLabel, weightLabel);
      card.appendChild(tools);
    });

    updateProgress();
  });
}

/* Registro local ACTIVO: estilos aislados de la vista alumno */
function installWorkoutStyles() {
  if (document.getElementById('activo-workout-styles')) return;
  const style = document.createElement('style');
  style.id = 'activo-workout-styles';
  style.textContent = [
    '.workout-progress{margin:12px 0 18px;padding:14px;border:1px solid rgba(128,128,128,.25);border-radius:14px;background:rgba(128,128,128,.08)}',
    '.workout-progress-heading{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:10px}',
    '.workout-progress-heading small{opacity:.75}',
    '.workout-progress-track{height:9px;border-radius:99px;overflow:hidden;background:rgba(128,128,128,.22)}',
    '.workout-progress-fill{height:100%;width:0;background:#e53935;border-radius:99px;transition:width .2s}',
    '.workout-progress.complete .workout-progress-fill{background:#26a269}',
    '.workout-exercise-tools{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-top:14px;padding-top:12px;border-top:1px solid rgba(128,128,128,.2)}',
    '.workout-complete-label{display:flex;align-items:center;gap:9px;font-size:.9rem;font-weight:600;cursor:pointer}',
    '.workout-complete-label input{width:19px;height:19px;accent-color:#26a269}',
    '.workout-weight-label{display:flex;align-items:center;gap:8px;font-size:.85rem}',
    '.workout-weight-label input{width:100px;max-width:40vw;padding:9px;border:1px solid #aaa;border-radius:9px;background:var(--card,#fff);color:inherit}',
    '.workout-save-weight{padding:9px 12px;border:0;border-radius:9px;background:#246b43;color:#fff;font-weight:700;cursor:pointer}',
    '.workout-weight-feedback{font-size:.78rem;min-width:90px}',
    '.workout-weight-label{flex-wrap:wrap}',
    '.public-ex.workout-done{outline:2px solid rgba(38,162,105,.35);outline-offset:-2px}',
    '@media(max-width:480px){.workout-exercise-tools{align-items:stretch}.workout-weight-label{justify-content:space-between;width:100%}}'
  ].join('');
  document.head.appendChild(style);
}

/* ========================================
   MOSTRAR PLANIFICACIÓN DEL ALUMNO
   NUEVO: DÍAS POR PESTAÑAS
======================================== */

async function showPublicPlan(client) {

  const {
    data: plans,
    error: plansError
  } = await sb
    .from('workout_plans')
    .select(
      'id,day_of_week'
    )
    .eq(
      'client_id',
      client.id
    );

  if (plansError) {

    $('publicPlan').innerHTML =
      '<div class="error">' +
      'No se pudo cargar la planificación.' +
      '</div>';

    $('publicPlan')
      .classList
      .remove('hidden');

    return;
  }

  const planIds =
    (plans || [])
      .map(
        plan =>
          plan.id
      );

  let exercises =
    [];

  if (planIds.length) {

    const {
      data,
      error
    } = await sb
      .from('plan_exercises')
      .select('*')
      .neq('notes', 'DUPLICADO - NO REALIZAR')
      .in(
        'plan_id',
        planIds
      )
      .order(
        'exercise_order'
      );

    if (error) {

      $('publicPlan').innerHTML =
        '<div class="error">' +
        'No se pudieron cargar los ejercicios.' +
        '</div>';

      $('publicPlan')
        .classList
        .remove('hidden');

      return;
    }

    exercises =
      data || [];

  }

  /* ========================================
     BUSCAR PRIMER DÍA QUE TENGA EJERCICIOS
  ======================================== */

  const daysWithExercises =
    DAYS.filter(
      dayName => {

        const plan =
          (plans || [])
            .find(
              item =>
                item.day_of_week ===
                dayName
            );

        if (!plan) {
          return false;
        }

        return exercises.some(
          exercise =>
            exercise.plan_id ===
            plan.id
        );

      }
    );

  const initialDay =
    daysWithExercises[0] ||
    DAYS[0];


  /* ========================================
     ENCABEZADO DEL ALUMNO
  ======================================== */

  let html = `

    <div class="public-plan-header">

      <h2>
        ${escapeHtml(
          client.name
        )}
      </h2>

      <small>
        ${escapeHtml(
          client.goal || ''
        )}
      </small>

    </div>


    <div class="public-day-tabs">

  `;


  /* ========================================
     BOTONES / PESTAÑAS DE LOS DÍAS
  ======================================== */

  DAYS.forEach(
    dayName => {

      const plan =
        (plans || [])
          .find(
            item =>
              item.day_of_week ===
              dayName
          );

      const hasExercises =
        plan
          ? exercises.some(
              exercise =>
                exercise.plan_id ===
                plan.id
            )
          : false;

      html += `

        <button
          type="button"
          class="public-day-tab
            ${
              dayName ===
              initialDay
                ? 'active'
                : ''
            }
            ${
              !hasExercises
                ? 'empty'
                : ''
            }
          "
          data-public-day="${escapeHtml(
            dayName
          )}"
        >

          ${escapeHtml(
            dayName
          )}

        </button>

      `;

    }
  );


  html += `

    </div>

    <div class="public-days-container">

  `;


  /* ========================================
     CONTENIDO DE CADA DÍA
  ======================================== */

  DAYS.forEach(
    dayName => {

      const plan =
        (plans || [])
          .find(
            item =>
              item.day_of_week ===
              dayName
          );

      const dayExercises =
        plan
          ? exercises.filter(
              exercise =>
                exercise.plan_id ===
                plan.id
            )
          : [];

      html += `

        <div
          class="plan-day public-day-panel ${
            dayName ===
            initialDay
              ? 'active'
              : ''
          }"
          data-public-panel="${escapeHtml(
            dayName
          )}"
        >

          <h3>
            ${escapeHtml(
              dayName
            )}
          </h3>

      `;


      if (
        dayExercises.length
      ) {

        html +=
          dayExercises
            .map(
              exercise => {

                const restSeconds =
                  parseRestSeconds(
                    exercise.rest
                  );

                const timerButton =
                  restSeconds
                    ? `

                      <button
                        type="button"
                        class="exercise-timer-btn"
                        data-rest-seconds="${restSeconds}"
                      >

                        ⏱ Descanso
                        ${escapeHtml(
                          exercise.rest
                        )}

                      </button>

                    `
                    : '';

                const exerciseImage =
                  getExerciseImage(
                    exercise.exercise_name
                  );

                return `

                  <div class="public-ex">

                    ${
                      exerciseImage
                        ? `
                          <img
                            src="${escapeHtml(
                              exerciseImage
                            )}"
                            alt="${escapeHtml(
                              exercise.exercise_name
                            )}"
                            class="public-ex-image"
                          >
                        `
                        : ''
                    }

                    <b>
                      ${escapeHtml(
                        exercise.exercise_name
                      )}
                    </b>

                    <small>

                      ${escapeHtml(
                        exercise.sets || '-'
                      )}
                      series

                      ·

                      ${escapeHtml(
                        exercise.reps || '-'
                      )}

                      ·

                      carga
                      ${escapeHtml(
                        exercise.load || '-'
                      )}

                      ·

                      descanso
                      ${escapeHtml(
                        exercise.rest || '-'
                      )}

                    </small>

                    ${
                      exercise.notes
                        ? `
                          <div class="exercise-notes">

                            ${escapeHtml(
                              exercise.notes
                            )}

                          </div>
                        `
                        : ''
                    }

                    ${timerButton}

                  </div>

                `;

              }
            )
            .join('');

      } else {

        html += `

          <div class="empty-day-message">
            Sin ejercicios cargados para este día.
          </div>

        `;

      }


      html += `

        </div>

      `;

    }
  );


  html += `

    </div>

  `;


  $('publicPlan').innerHTML =
    html;

  installWorkoutStyles();
  enhancePublicWorkout(client, plans || [], exercises);

  $('publicPlan')
    .classList
    .remove('hidden');


  /* ========================================
     MOSTRAR CRONÓMETRO
  ======================================== */

  const studentTimer =
    document.getElementById(
      'studentTimer'
    );

  if (studentTimer) {

    studentTimer
      .classList
      .remove('hidden');

  }


  /* ========================================
     FUNCIONAMIENTO DE LAS PESTAÑAS
  ======================================== */

  document
    .querySelectorAll(
      '.public-day-tab'
    )
    .forEach(
      button => {

        button.addEventListener(
          'click',
          () => {

            const selectedPublicDay =
              button.dataset.publicDay;


            document
              .querySelectorAll(
                '.public-day-tab'
              )
              .forEach(
                tab => {

                  tab
                    .classList
                    .remove(
                      'active'
                    );

                }
              );


            button
              .classList
              .add(
                'active'
              );


            document
              .querySelectorAll(
                '.public-day-panel'
              )
              .forEach(
                panel => {

                  const isSelected =
                    panel.dataset.publicPanel ===
                    selectedPublicDay;

                  panel
                    .classList
                    .toggle(
                      'active',
                      isSelected
                    );

                }
              );

          }
        );

      }
    );


  /* ========================================
     LLEVAR AL INICIO DEL PLAN SOLO UNA VEZ
  ======================================== */

  $('publicPlan')
    .scrollIntoView({

      behavior:
        'smooth',

      block:
        'start'

    });

}
/* ========================================
   CATEGORÍAS DE LA BIBLIOTECA
======================================== */

function addLibraryCategories() {
  const select =
    $('libCat');

  if (!select) {
    return;
  }

  const categories = [
    ...new Set(
      EXERCISE_LIBRARY.map(
        exercise =>
          exercise[1]
      )
    )
  ];

  categories.forEach(
    category => {

      const option =
        document.createElement(
          'option'
        );

      option.value =
        category;

      option.textContent =
        category;

      select.appendChild(
        option
      );

    }
  );
}


/* ========================================
   AGREGAR EJERCICIO MANUAL
======================================== */

function addManualExercise() {

  if (!selectedClientId) {

    alert(
      'Seleccioná un cliente.'
    );

    return;
  }

  draftExercises.push({

    name:
      '',

    sets:
      '',

    reps:
      '',

    load:
      '',

    rest:
      '',

    notes:
      ''

  });

  renderExercises();
}


/* ========================================
   VISTA PREVIA DEL CLIENTE
======================================== */

async function previewClient() {

  const client =
    clients.find(
      item =>
        item.id ===
        selectedClientId
    );

  if (!client) {

    alert(
      'Seleccioná un cliente.'
    );

    return;
  }

  $('admin')
    .classList
    .add(
      'hidden'
    );

  $('public')
    .classList
    .remove(
      'hidden'
    );

  await showPublicPlan(
    client
  );
}


/* ========================================
   LOGIN
======================================== */

async function login() {

  const email =
    $('loginEmail')
      .value
      .trim();

  const password =
    $('loginPass')
      .value;

  const errorBox =
    $('loginErr');

  errorBox
    .classList
    .add(
      'hidden'
    );

  const {
    error
  } = await sb.auth.signInWithPassword({

    email,
    password

  });

  if (error) {

    errorBox.textContent =
      error.message;

    errorBox
      .classList
      .remove(
        'hidden'
      );

    return;
  }

  $('loginModal')
    .classList
    .add(
      'hidden'
    );

  await showAdminMode();
}


/* ========================================
   CERRAR SESIÓN
======================================== */

async function logout() {

  await sb.auth.signOut();

  selectedClientId =
    null;

  selectedDay =
    'Lunes';

  draftExercises =
    [];

  currentPlanId =
    null;

  await showPublicMode();
}


/* ========================================
   CRONÓMETRO DE DESCANSO PARA ALUMNOS
======================================== */

let restTimerSeconds =
  90;

let restTimerInitialSeconds =
  90;

let restTimerInterval =
  null;

let restTimerRunning =
  false;


/* ----------------------------------------
   FORMATEAR TIEMPO
----------------------------------------- */

function formatRestTimer(
  seconds
) {

  const minutes =
    Math.floor(
      seconds / 60
    );

  const remainingSeconds =
    seconds % 60;

  return (
    String(
      minutes
    )
      .padStart(
        2,
        '0'
      )
    +
    ':'
    +
    String(
      remainingSeconds
    )
      .padStart(
        2,
        '0'
      )
  );
}


/* ----------------------------------------
   ACTUALIZAR PANTALLA
----------------------------------------- */

function updateRestTimerDisplay() {

  const display =
    document.getElementById(
      'timerDisplay'
    );

  if (!display) {
    return;
  }

  display.textContent =
    formatRestTimer(
      restTimerSeconds
    );
}


/* ----------------------------------------
   ELEGIR TIEMPO
----------------------------------------- */

function setRestTimer(
  seconds,
  autoStart = false
) {

  clearInterval(
    restTimerInterval
  );

  restTimerInterval =
    null;

  restTimerRunning =
    false;

  restTimerSeconds =
    seconds;

  restTimerInitialSeconds =
    seconds;

  updateRestTimerDisplay();

  const timer =
    document.querySelector(
      '.rest-timer'
    );

  if (timer) {

    timer
      .classList
      .remove(
        'finished'
      );
  }

  const status =
    document.getElementById(
      'timerStatus'
    );

  if (status) {

    status.textContent =
      'Listo para iniciar';
  }

  document
    .querySelectorAll(
      '.timer-preset'
    )
    .forEach(
      button => {

        button
          .classList
          .toggle(

            'active',

            Number(
              button.dataset.seconds
            ) ===
            seconds

          );
      }
    );

  if (autoStart) {
    startRestTimer();
  }
}


/* ----------------------------------------
   INICIAR
----------------------------------------- */

function startRestTimer() {

  if (restTimerRunning) {
    return;
  }

  if (
    restTimerSeconds <=
    0
  ) {

    restTimerSeconds =
      restTimerInitialSeconds;

    updateRestTimerDisplay();
  }

  restTimerRunning =
    true;

  const timer =
    document.querySelector(
      '.rest-timer'
    );

  if (timer) {

    timer
      .classList
      .remove(
        'finished'
      );
  }

  const status =
    document.getElementById(
      'timerStatus'
    );

  if (status) {

    status.textContent =
      'Descanso en curso...';
  }

  restTimerInterval =
    setInterval(
      () => {

        restTimerSeconds -=
          1;

        if (
          restTimerSeconds <=
          0
        ) {

          restTimerSeconds =
            0;

          updateRestTimerDisplay();

          finishRestTimer();

          return;
        }

        updateRestTimerDisplay();

      },
      1000
    );
}


/* ----------------------------------------
   PAUSAR
----------------------------------------- */

function pauseRestTimer() {

  clearInterval(
    restTimerInterval
  );

  restTimerInterval =
    null;

  restTimerRunning =
    false;

  const status =
    document.getElementById(
      'timerStatus'
    );

  if (
    status &&
    restTimerSeconds > 0
  ) {

    status.textContent =
      'Cronómetro pausado';
  }
}


/* ----------------------------------------
   REINICIAR
----------------------------------------- */

function resetRestTimer() {

  clearInterval(
    restTimerInterval
  );

  restTimerInterval =
    null;

  restTimerRunning =
    false;

  restTimerSeconds =
    restTimerInitialSeconds;

  updateRestTimerDisplay();

  const timer =
    document.querySelector(
      '.rest-timer'
    );

  if (timer) {

    timer
      .classList
      .remove(
        'finished'
      );
  }

  const status =
    document.getElementById(
      'timerStatus'
    );

  if (status) {

    status.textContent =
      'Listo para iniciar';
  }
}


/* ----------------------------------------
   FINALIZAR
----------------------------------------- */

function finishRestTimer() {

  clearInterval(
    restTimerInterval
  );

  restTimerInterval =
    null;

  restTimerRunning =
    false;

  const timer =
    document.querySelector(
      '.rest-timer'
    );

  if (timer) {

    timer
      .classList
      .add(
        'finished'
      );
  }

  const status =
    document.getElementById(
      'timerStatus'
    );

  if (status) {

    status.textContent =
      '🔥 ¡Descanso terminado!';
  }

  if (
    'vibrate' in navigator
  ) {

    navigator.vibrate([
      250,
      150,
      250,
      150,
      400
    ]);
  }

  playRestTimerSound();
}


/* ----------------------------------------
   SONIDO AL TERMINAR
----------------------------------------- */

function playRestTimerSound() {

  try {

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContext) {
      return;
    }

    const audioContext =
      new AudioContext();

    const beep = (
      startTime,
      frequency
    ) => {

      const oscillator =
        audioContext
          .createOscillator();

      const gain =
        audioContext
          .createGain();

      oscillator.connect(
        gain
      );

      gain.connect(
        audioContext.destination
      );

      oscillator
        .frequency
        .value =
          frequency;

      oscillator.type =
        'sine';

      gain
        .gain
        .setValueAtTime(

          0.18,

          audioContext.currentTime +
          startTime

        );

      gain
        .gain
        .exponentialRampToValueAtTime(

          0.001,

          audioContext.currentTime +
          startTime +
          0.25

        );

      oscillator.start(

        audioContext.currentTime +
        startTime

      );

      oscillator.stop(

        audioContext.currentTime +
        startTime +
        0.25

      );
    };

    beep(
      0,
      750
    );

    beep(
      0.35,
      850
    );

    beep(
      0.70,
      1000
    );

  } catch (error) {

    console.log(
      'No se pudo reproducir el aviso del cronómetro.'
    );
  }
}


/* ========================================
   INICIALIZAR CRONÓMETRO
======================================== */

function initializeRestTimer() {

  const startButton =
    document.getElementById(
      'timerStart'
    );

  const pauseButton =
    document.getElementById(
      'timerPause'
    );

  const resetButton =
    document.getElementById(
      'timerReset'
    );

  if (
    !startButton ||
    !pauseButton ||
    !resetButton
  ) {
    return;
  }

  document
    .querySelectorAll(
      '.timer-preset'
    )
    .forEach(
      button => {

        button.addEventListener(
          'click',
          () => {

            setRestTimer(

              Number(
                button.dataset.seconds
              )

            );

          }
        );

      }
    );

  startButton
    .addEventListener(
      'click',
      startRestTimer
    );

  pauseButton
    .addEventListener(
      'click',
      pauseRestTimer
    );

  resetButton
    .addEventListener(
      'click',
      resetRestTimer
    );

  updateRestTimerDisplay();
}


/* ========================================
   BOTÓN DE DESCANSO DE CADA EJERCICIO
======================================== */

document.addEventListener(
  'click',
  event => {

    const button =
      event.target.closest(
        '[data-rest-seconds]'
      );

    if (!button) {
      return;
    }

    const seconds =
      Number(
        button.dataset.restSeconds
      );

    if (!seconds) {
      return;
    }

    setRestTimer(
      seconds,
      true
    );
  }
);


/* ========================================
   EVENTOS GENERALES DE LA APP
======================================== */

function setupEvents() {

  $('adminTop')
    .addEventListener(
      'click',
      async () => {

        if (
          !$('admin')
            .classList
            .contains(
              'hidden'
            )
        ) {

          await showPublicMode();

        } else {

          await showAdminMode();

        }

      }
    );


  $('closeLogin')
    .addEventListener(
      'click',
      () => {

        $('loginModal')
          .classList
          .add(
            'hidden'
          );

      }
    );


  $('login')
    .addEventListener(
      'click',
      login
    );


  $('loginPass')
    .addEventListener(
      'keydown',
      event => {

        if (
          event.key ===
          'Enter'
        ) {

          login();

        }

      }
    );


  $('logout')
    .addEventListener(
      'click',
      logout
    );


  $('saveClient')
    .addEventListener(
      'click',
      saveClient
    );


  $('cancel')
    .addEventListener(
      'click',
      clearClientForm
    );


  $('manual')
    .addEventListener(
      'click',
      addManualExercise
    );


  $('fromLib')
    .addEventListener(
      'click',
      openLibrary
    );


  $('duplicateDay').addEventListener('click', duplicateSelectedPlan);

  $('saveDay')
    .addEventListener(
      'click',
      saveSelectedDay
    );


  $('preview')
    .addEventListener(
      'click',
      previewClient
    );


  $('libraryBtn')
    .addEventListener(
      'click',
      openLibrary
    );


  $('closeLib')
    .addEventListener(
      'click',
      () => {

        $('libraryModal')
          .classList
          .add(
            'hidden'
          );

      }
    );


  $('libSearch')
    .addEventListener(
      'input',
      renderLibrary
    );


  $('libCat')
    .addEventListener(
      'change',
      renderLibrary
    );


  $('search')
    .addEventListener(
      'input',
      renderPublicResults
    );
}


/* ========================================
   INICIAR APLICACIÓN
======================================== */

async function startApp() {

  addLibraryCategories();

  setupEvents();

  initializeRestTimer();

  await showPublicMode();

  const {
    data
  } = await sb.auth.getSession();

  if (
    data?.session &&
    $('email')
  ) {

    $('email').textContent =
      data.session.user.email ||
      '';
  }
}


/* ========================================
   ARRANQUE
======================================== */

document.addEventListener(
  'DOMContentLoaded',
  startApp
);
