// user input
//let username;
//document.getElementById("mySubmit").onclick = function(){
//username = document.getElementById("myText").value;
//document.getElementById("myH1").textContent = `Hello ${username}`;

// counter program

const decreasebtn = document.getElementById('decreasebtn');
const resetbtn = document.getElementById('resetbtn');
const increasebtn = document.getElementById('increasebtn');
const countLable = document.getElementById('countLable');

let count = 0 ;

increasebtn.onclick = function(){
    count++
    countLable.textContent = count ;

}

decreasebtn.onclick = function(){
    count--
    countLable.textContent = count ;

}

resetbtn.onclick = function(){
    count = 0;
    countLable.textContent = count ;

}