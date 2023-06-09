const grid = document.querySelector('#grid');
let isMoving = false;
let eraseMode = false;

script();

function script() {
    for (let i = 0; i < 256; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }

    let cells = document.querySelectorAll('.cell');

    const eraseModeButton = document.querySelector('#eraseBtn');
    eraseModeButton.addEventListener('click', () => {
      if (eraseMode === true) {
        eraseMode = false;
        eraseModeButton.style.backgroundColor = '';
      } else if (eraseMode === false) {
        eraseMode = true;
        eraseModeButton.style.backgroundColor = 'rgb(34, 233, 34)';
      }
    });
    

    cells.forEach(cell => {
        cell.addEventListener('mousedown', () => {
            if (eraseMode === false) {
                cell.style.backgroundColor = 'black';
            } else {
                cell.style.backgroundColor = 'white';
            }
            isMoving = true;
        });

        cell.addEventListener('mousemove', () => {
            if (isMoving) {
                if (eraseMode === false) {
                    cell.style.backgroundColor = 'black';
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
