const button = document.getElementById("btn");
const colorBox = document.getElementById("colorBox");
const colorCode = document.getElementById("colorCode");

let rotation = 0;

button.addEventListener("click", () => {

    const letters = "0123456789ABCDEF";
    let color = "#";

    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }

    document.body.style.background = color;
    colorBox.style.background = color;
    colorCode.textContent = color;

   rotation += 180;
colorBox.style.transform = `rotate(${rotation}deg) scale(1.08)`;

setTimeout(() => {
    colorBox.style.transform = `rotate(${rotation}deg) scale(1)`;
}, 300);
});