const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = '';

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener('click', () => {
    if (value == 'clear') {
      input = '';
      display_input.innerHTML = '';
      display_output.innerHTML = '';
    } else if (value == 'backspace') {
      input = input.slice(0, -1);
      display_input.innerHTML = CleanInput(input);
    } else if (value == '=') {
      let result = eval(PrepareInput(input));

      display_output.innerHTML = CleanOutput(result);
    } else if (value == 'brackets') {
      if (
        input.indexOf('(') == -1 ||
        (input.indexOf('(') != -1 &&
          input.indexOf(')') != -1 &&
          input.lastIndexOf('(') < input.lastIndexOf(')'))
      ) {
        input += '(';
      } else if (
        (input.indexOf('(') != -1 && input.indexOf(')') == -1) ||
        (input.indexOf('(') != -1 &&
          input.indexOf(')') != -1 &&
          input.lastIndexOf('(') > input.lastIndexOf(')'))
      ) {
        input += ')';
      }
      display_input.innerHTML = CleanInput(input);
    } else {
      if (ValidateInput(value)) {
        input += value;
        display_input.innerHTML = CleanInput(input);
      }
    }
  });
}

function CleanInput(input) {
  let input_array = input.split('');
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == '*') {
      input_array[i] = `<span class="opreator">x</span>`;
    } else if (input_array[i] == '/') {
      input_array[i] = `<span class="opreator">/</span>`;
    } else if (input_array[i] == '+') {
      input_array[i] = `<span class="opreator">+</span>`;
    } else if (input_array[i] == '-') {
      input_array[i] = `<span class="opreator">-</span>`;
    } else if (input_array[i] == '(') {
      input_array[i] = `<span class="brackets">(</span>`;
    } else if (input_array[i] == ')') {
      input_array[i] = `<span class="brackets">)</span>`;
    } else if (input_array[i] == '%') {
      input_array[i] = `<span class="percent">%</span>`;
    }
  }

  return input_array.join('');
}

function CleanOutput(output) {
  let output_string = output.toString();
  let decimal = output_string.split('.')[1];
  output_string = output_string.split('.')[0];

  let output_array = output_string.split('');

  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ',');
    }
  }

  if (decimal) {
    output_array.push('.');
    output_array.push(decimal);
  }

  return output_array.join('');
}

function ValidateInput(value) {
  let last_input = input.slice(-1);
  let operators = ['+', '-', '*', '/'];

  if (value == '.' && last_input == '.') {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function PrepareInput(input) {
  let input_array = input.split('');

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == '%') {
      input_array[i] = '/100';
    }
  }

  return input_array.join('');
}

/*
    Die Zeile const keys = document.querySelectorAll('.key'); wählt alle Elemente mit der Klasse "key" aus und speichert sie in der Variablen keys. Diese Elemente repräsentieren die Tasten des Taschenrechners.

    Die Zeilen const display_input = document.querySelector('.display .input'); und const display_output = document.querySelector('.display .output'); wählen die Eingabe- und Ausgabefelder des Taschenrechners aus und speichern sie in den Variablen display_input und display_output.

    Die Variable input wird initialisiert und dient dazu, den aktuellen Eingabewert des Taschenrechners zu speichern.

    Eine Schleife wird verwendet, um jedem Element in keys einen Klick-Eventlistener hinzuzufügen. Dieser Listener reagiert auf Klicks auf die Tasten des Taschenrechners.

    Der Wert (value) der angeklickten Taste wird über die dataset.key Eigenschaft abgerufen.

    In der Klick-Eventlistener-Funktion wird überprüft, welcher Wert angeklickt wurde. Abhängig vom Wert werden verschiedene Aktionen ausgeführt.

    Wenn der Wert "clear" ist, wird der input zurückgesetzt und die Anzeige-Felder (display_input und display_output) werden geleert.
    Wenn der Wert "backspace" ist, wird der letzte Buchstabe aus dem input entfernt und die Eingabe-Anzeige aktualisiert.
    Wenn der Wert "=" ist, wird der input vorbereitet (PrepareInput-Funktion) und mit eval berechnet. Das Ergebnis wird in der Ausgabe-Anzeige angezeigt (nachdem es mit der CleanOutput-Funktion aufbereitet wurde).
    Wenn der Wert "brackets" ist, wird überprüft, ob Klammern hinzugefügt oder entfernt werden sollen, basierend auf dem aktuellen Zustand des input. Die Eingabe-Anzeige wird aktualisiert.
    Ansonsten wird überprüft, ob der Wert eine gültige Eingabe ist (ValidateInput-Funktion). Wenn ja, wird der Wert zum input hinzugefügt und die Eingabe-Anzeige aktualisiert.

    Die Funktion CleanInput wird verwendet, um den input zu bereinigen und HTML-Tags hinzuzufügen, um Operatoren, Klammern und Prozentzeichen zu markieren.

    Die Funktion CleanOutput wird verwendet, um das Ergebnis zu bereinigen und es im gewünschten Format anzuzeigen (durch Hinzufügen von Tausendertrennzeichen und Dezimalpunkt).

    Die Funktion ValidateInput überprüft, ob ein Wert eine gültige Eingabe ist. Es wird überprüft, ob der letzte Eingabewert bereits ein Operator ist, und ob zwei Punkte nacheinander eingegeben wurden.

    Die Funktion PrepareInput bereitet den input für die Verwendung mit eval vor. Sie ersetzt das Prozentzeichen durch "/100", um die Prozentberechnung zu ermöglichen.
*/
