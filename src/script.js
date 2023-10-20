// List of sentences
var _CONTENT = [
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
  "El teu somriure il·lumina el dia de molta gent",
  "Tu ets únic i especial",
  "Confia en tu mateix, ets formidable"
];


// Current sentence being processed
var _PART = 0;

// Character number of the current sentence being processed 
var _PART_INDEX = 0;

// Holds the handle returned from setInterval
var _INTERVAL_VAL;

// Element that holds the text
var _ELEMENT = document.querySelector("#text");

// Cursor element 
var _CURSOR = document.querySelector("#cursor");

// Implements typing effect
function Type() { 
  // Get substring with 1 characater added
  var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
  _ELEMENT.innerHTML = text;
  _PART_INDEX++;

  // If full sentence has been displayed then start to delete the sentence after some time
  if(text === _CONTENT[_PART]) {
    // Hide the cursor
    _CURSOR.style.display = 'none';

    clearInterval(_INTERVAL_VAL);
    setTimeout(function() {
      _INTERVAL_VAL = setInterval(Delete, 50);
    }, 1000);
  }
}

// Implements deleting effect
function Delete() {
  // Get substring with 1 characater deleted
  var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
  _ELEMENT.innerHTML = text;
  _PART_INDEX--;

  // If sentence has been deleted then start to display the next sentence
  if(text === '') {
    clearInterval(_INTERVAL_VAL);

    // If current sentence was last then display the first one, else move to the next
    if(_PART == (_CONTENT.length - 1))
      _PART = 0;
    else
      _PART++;

    _PART_INDEX = 0;

    // Start to display the next sentence after some time
    setTimeout(function() {
      _CURSOR.style.display = 'inline-block';
      _INTERVAL_VAL = setInterval(Type, 100);
    }, 200);
  }
}

// Start the typing effect on load
_INTERVAL_VAL = setInterval(Type, 100);