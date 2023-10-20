var typewriter = {
  content: [
    "T'envio tot el meu suport",
    "Segueix lluitant, no et rendeixis",
    "Ets més fort del que penses",
    "La teva força és com un foc",
    "Fes-ho amb passió o no ho facis",
    "Cada dia és una nova oportunitat",
    "Ets capaç de conquerir el món",
    "Recorda: ets increïble tal com ets",
    "La vida és bella, gaudeix-la plenament",
    "La felicitat està en les petites coses",
    "No estàs sol, sempre hi ha algú per tu",
    "Cada dificultat és una oportunitat de créixer",
    "Estàs fent un gran progrés, segueix endavant",
    "El teu somriure il·umina el dia de molta gent",
    "Tu ets únic i especial",
    "Confia en tu mateix, ets formidable"
  ],
  part: 0,
  partIndex: 0,
  intervalVal: null,
  element: document.querySelector("#text"),
  cursor: document.querySelector("#cursor"),
  typingSpeed: 100,
  displayDuration: 3000,
  restartPageAfterCompletion: true, // Recargar la página al completar

  type: function () {
    var text = typewriter.content[typewriter.part].substring(0, typewriter.partIndex + 1);
    typewriter.element.innerHTML = text;
    typewriter.partIndex++;

    if (text === typewriter.content[typewriter.part]) {
      typewriter.cursor.style.display = 'none';
      clearInterval(typewriter.intervalVal);
      setTimeout(function () {
        typewriter.intervalVal = setInterval(typewriter.delete, 50);
      }, typewriter.displayDuration);

      if (typewriter.part === typewriter.content.length - 1) {
        if (typewriter.restartPageAfterCompletion) {
          setTimeout(function () {
            location.reload(); // Recargar la página
          }, typewriter.displayDuration);
        }
      }
    }
  },
  delete: function () {
    var text = typewriter.content[typewriter.part].substring(0, typewriter.partIndex - 1);
    typewriter.element.innerHTML = text;
    typewriter.partIndex--;

    if (text === '') {
      clearInterval(typewriter.intervalVal);
      typewriter.part = (typewriter.part === typewriter.content.length - 1) ? 0 : typewriter.part + 1;
      typewriter.partIndex = 0;

      setTimeout(function () {
        typewriter.cursor.style.display = 'inline-block';
        typewriter.intervalVal = setInterval(typewriter.type, typewriter.typingSpeed);
      }, 200);
    }
  }
};

typewriter.intervalVal = setInterval(typewriter.type, typewriter.typingSpeed);
  