const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const historyDiv = document.getElementById('history');

let currentInput = '';
let history = [];

// Update calculator display with current input or 0 if empty
function updateDisplay() {
  display.textContent = currentInput || '0';
}

// Add calculation expression and result to history and show last 2 entries
function appendToHistory(expression, result) {
  history.push(`${expression} = ${result}`);
  historyDiv.classList.remove('hide');
  const recent = history.slice(-2);
  historyDiv.innerHTML = recent.map(item => `<div>${item}</div>`).join('');
}

// Evaluate current expression, handle errors, update display and history
function calculate() {
  try {
    const expression = currentInput
      .replace(/×/g, '*')
      .replace(/÷/g, '/');
    const result = eval(expression);
    if (!isFinite(result)) throw new Error("Math Error");
    appendToHistory(currentInput, result);
    currentInput = result.toString();
    updateDisplay();
  } catch {
    currentInput = '';
    display.textContent = 'Error';
  }
}

// Add click event listeners to buttons and handle calculator input logic
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.id === 'clear') {
      // Clear all input and history, hide history display
      currentInput = '';
      history = [];
      updateDisplay();
      historyDiv.classList.add('hide');
      setTimeout(() => (historyDiv.innerHTML = ''), 400);
      return;
    }

    if (button.id === 'backspace') {
      // Remove last character from input
      currentInput = currentInput.slice(0, -1);
    } else if (value === '=') {
      // Calculate result on '=' press
      calculate();
      return;
    } else {
      // Append pressed button value to input
      currentInput += value;
    }

    updateDisplay();
  });
});

// Keyboard support for input and operations
document.addEventListener('keydown', (e) => {
  const validKeys = '0123456789/*-+.';
  if (validKeys.includes(e.key)) {
    currentInput += e.key;
    updateDisplay();
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  } else if (e.key === 'Escape') {
    // Clear input and history on Escape key
    currentInput = '';
    history = [];
    updateDisplay();
    historyDiv.classList.add('hide');
    setTimeout(() => (historyDiv.innerHTML = ''), 400);
  }
});
