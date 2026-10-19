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


  $('saveDay')
    .addEventListener(
      'click',
      saveSelectedDay
    );


  $('preview')
    .addEventListener(
      'click',
