const socket = io()

let btn = document.getElementById('btn')
btn.onclick = function exec(){

    socket.emit('On Client')
}

socket.on('From Server to Client' , () => {
    var div = document.createElement('div');
    div.innerText = 'new event from server';
    console.log(div)
    document.body.appendChild(div)
})