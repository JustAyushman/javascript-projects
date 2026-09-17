document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const nameInput = document.getElementById('nameInput');
    const greetBtn = document.getElementById('greetBtn');
    const boxes = document.querySelectorAll('.box');

    // Greet functionalities
    greetBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            header.textContent = 'Hello,' + name;
        } else {
            header.textContent = 'Hello';
        }
    });

    // Color Box functionalities
    boxes.forEach(box => {
        box.addEventListener('click', () => {

            const color = box.getAttribute('data-color');
           //make it fill on click
            box.style.backgroundColor = color;
            box.style.color = 'white';
            box.style.borderColor = color;
        });
    });
});
