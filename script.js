const grid = document.querySelector('#grid');

for (let i = 0; i < 256; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  grid.appendChild(cell);
}

let cells = document.querySelectorAll('.cell')
let isMoving = false;

cells.forEach(cell => {

    cell.addEventListener('mousedown', () => {
        cell.style.backgroundColor = 'black'
        isMoving = true;
    });

    cell.addEventListener('mousemove', () => {
        if (isMoving) {
            cell.style.backgroundColor = 'black'
        }
    });


    grid.addEventListener('mouseup', () => {
        isMoving = false;
    });
});

