const grid = document.querySelector('#grid');
let isMoving = false;
let eraseMode = false;
let brushColor = 'black';

script();

function script() {
    for (let i = 0; i < 256; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }

    const colorSelect = document.querySelector('#colorSelect');
    colorSelect.addEventListener('change', () => {
        brushColor = colorSelect.value;
    });

    let cells = document.querySelectorAll('.cell');

    const eraseModeButton = document.querySelector('#eraseBtn');
    eraseModeButton.addEventListener('click', () => {
      if (eraseMode === true) {
        eraseMode = false;
        eraseModeButton.style.backgroundColor = 'white';
      } else if (eraseMode === false) {
        eraseMode = true;
        eraseModeButton.style.backgroundColor = 'rgb(34, 233, 34)';
      }
    });
    
    const clearButton = document.querySelector('#clearBtn');
    clearButton.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.style.backgroundColor = 'white';
        });
    });

    let gridMode = true;
    const gridButton = document.querySelector('#gridBtn');
    const sketchPad = document.querySelector('#sketchPad');
    gridButton.addEventListener('click', () => {
        if (gridMode === true) {
            cells.forEach(cell => {
                cell.style.border = 'none';
                sketchPad.style.border = 'none';
                gridButton.style.backgroundColor = 'white';
            });
            gridMode = false;
        } else if (gridMode === false) {
            cells.forEach(cell => {
                cell.style.border = '1px solid black';
                sketchPad.style.border = '1px solid black';
                gridButton.style.backgroundColor = 'rgb(34, 233, 34)';
            });
            gridMode = true;
        }
    });
    
    //Function draws cells onto canvas and determines which color should be used
    cells.forEach(cell => {
        cell.addEventListener('mousedown', () => {
            if (eraseMode === false) {
                cell.style.backgroundColor = brushColor;
            } else {
                cell.style.backgroundColor = 'white';
            }
            isMoving = true;
        });

        cell.addEventListener('mousemove', () => {
            if (isMoving) {
                if (eraseMode === false) {
                    cell.style.backgroundColor = brushColor;
                } else {
                    cell.style.backgroundColor = 'white';
                }
            }
        });

        grid.addEventListener('mouseup', () => {
            isMoving = false;
        });
    });
}
