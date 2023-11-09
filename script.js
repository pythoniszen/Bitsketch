const grid = document.querySelector('#grid');
let isMoving = false;
let eraseMode = false;
let brushColor = 'black';

const gridSizeSlider = document.querySelector('#grid-size');
gridSizeSlider.addEventListener('input', updateGridSize);

initializeSketchPad();

function initializeSketchPad() {
  gridSizeSlider.value = 16;
  updateGridSize();
  setupColorSelector();
  setupEraseButton();
  setupClearButton();
  setupGridButton();
}

function setupColorSelector() {
  const colorSelect = document.querySelector('#color-select');
  colorSelect.addEventListener('change', () => {
    brushColor = colorSelect.value;
  });
}

function setupEraseButton() {
  const eraseBtn = document.querySelector('#erase-btn');
  eraseBtn.addEventListener('click', () => {
    eraseMode = !eraseMode;
    eraseBtn.style.backgroundColor = eraseMode ? 'rgb(34, 233, 34)' : 'white';
  });
}

function setupClearButton() {
  const clearBtn = document.querySelector('#clear-btn');
  clearBtn.addEventListener('click', clearCells);
}

function setupGridButton() {
  let gridMode = true;
  const gridBtn = document.querySelector('#grid-btn');
  gridBtn.addEventListener('click', () => {
    gridMode = !gridMode;
    toggleGridLines(gridMode, gridBtn);
  });
}

function updateGridSize() {
  let newSize = gridSizeSlider.value;
  const gridSizeDisplay = document.querySelector('#grid-size-display');
  gridSizeDisplay.textContent = `${newSize}x${newSize}`;
  recreateGrid(newSize);
}

function recreateGrid(newSize) {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  grid.style.gridTemplateColumns = `repeat(${newSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${newSize}, 1fr)`;
  createCells(newSize);
}

function createCells(newSize) {
  for (let i = 0; i < newSize * newSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
  }
  addCellEventListeners();
}

function addCellEventListeners() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.addEventListener('mousedown', () => toggleCellColor(cell, true));
    cell.addEventListener('mousemove', () => toggleCellColor(cell));
    grid.addEventListener('mouseup', () => isMoving = false);
  });
}

function toggleCellColor(cell, click = false) {
  if (click) isMoving = true;
  if (isMoving) {
    cell.style.backgroundColor = eraseMode ? 'white' : brushColor;
  }
}

function clearCells() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.style.backgroundColor = 'white');
}

function toggleGridLines(gridMode, gridBtn) {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.style.border = gridMode ? '1px solid black' : 'none';
  });
  gridBtn.style.backgroundColor = gridMode ? 'rgb(34, 233, 34)' : 'white';
}
