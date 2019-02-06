

var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');




function pageButton1() {
    window.location.href = './page1.html';
}

function pageButton2() {
    window.location.href = './page2.html';
}

function pageButton3() {
    window.location.href = './page3.html';
}



button1.addEventListener('click', pageButton1);
button2.addEventListener('click', pageButton2);
button3.addEventListener('click', pageButton3);
