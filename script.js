const grid = document.querySelector('#grid');
let isMoving = false;
let eraseMode = false;
let brushColor = 'black';

const gridSizeSlider = document.querySelector('#gridSize');
gridSizeSlider.addEventListener('input', updateGridSize);

script();

function script() {
    gridSizeSlider.value = 16;
    updateGridSize();

    const colorSelect = document.querySelector('#colorSelect');
    colorSelect.addEventListener('change', () => {
        brushColor = colorSelect.value;
    });

    const eraseModeButton = document.querySelector('#eraseBtn');
    eraseModeButton.addEventListener('click', () => {
        eraseMode = !eraseMode;
        eraseModeButton.style.backgroundColor = eraseMode ? 'rgb(34, 233, 34)' : 'white';
    });

    const clearButton = document.querySelector('#clearBtn');
    clearButton.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.style.backgroundColor = 'white';
        });
    });

    let gridMode = true;
    const gridButton = document.querySelector('#gridBtn');
    gridButton.addEventListener('click', () => {
        gridMode = !gridMode;
        cells.forEach(cell => {
            cell.style.border = gridMode ? '1px solid black' : 'none';
        });
        gridButton.style.backgroundColor = gridMode ? 'rgb(34, 233, 34)' : 'white';
    });
}

function updateGridSize() {
    let newSize = gridSizeSlider.value;

    const gridSizeDisplay = document.querySelector('#gridSizeDisplay');
    gridSizeDisplay.textContent = `${newSize}x${newSize}`;

    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    grid.style.gridTemplateColumns = `repeat(${newSize}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${newSize}, 1fr)`;

    for (let i = 0; i < newSize * newSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }

    cells = document.querySelectorAll('.cell');
    addCellEventListeners();
}

function addCellEventListeners() {
    cells.forEach(cell => {
        cell.addEventListener('mousedown', () => {
            cell.style.backgroundColor = eraseMode ? 'white' : brushColor;
            isMoving = true;
        });

        cell.addEventListener('mousemove', () => {
            if (isMoving) {
                cell.style.backgroundColor = eraseMode ? 'white' : brushColor;
            }
        });

        grid.addEventListener('mouseup', () => {
            isMoving = false;
        });
    });
}
