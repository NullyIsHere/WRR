var typewriter = {
  content: [
    "Mira cap al futur amb esperança i determinació.",
    "Anima't a seguir endavant cada dia.",
    "Recull forces i mantén la calma en tot moment.",
    "Troba la teva pròpia inspiració i enfoca't en els teus objectius.",
    "Imagina les possibilitats infinites que tens davant teu.",
    "No et rendeixis davant dels desafiaments de la vida.",
    "Aprofita totes les oportunitats que et vinguin.",

  ],
  part: 0,
  partIndex: 0,
  element: document.querySelector("#text"),
  cursor: document.querySelector("#cursor"),
  typingSpeed: 100,
  displayDuration: 3000,
  restartPageAfterCompletion: true, // Recargar la página al completar
  intervalVal: null,

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
  },

  // Add a function to get the announcement from the backend
  getAnnouncement: function () {
    var announcementContainer = document.querySelector("#last-announcement");

    // Make an AJAX request to get the announcement
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/get_announcement", true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var announcement = response.announcement;
        announcementContainer.innerHTML = announcement;
      }
    };

    xhr.send();
  },
};

// Call the getAnnouncement function to fetch the announcement initially
typewriter.getAnnouncement();

// Set an interval to update the announcement and the typewriter every 5 seconds
setInterval(function () {
  typewriter.getAnnouncement();
}, 5000);

// Initialize the typewriter
typewriter.intervalVal = setInterval(typewriter.type, typewriter.typingSpeed);