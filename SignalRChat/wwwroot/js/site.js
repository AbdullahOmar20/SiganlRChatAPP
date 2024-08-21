// // Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// // for details on configuring this project to bundle and minify static web assets.

// // Write your JavaScript code.
// user = prompt();
// //1- defining connection
// var con = new signalR.HubConnectionBuilder().withUrl("/chat").build();

// //2- creating proxy
// //var proxy = con.createHubProxy('/chat');

// document.getElementById("send").disabled = true;


// //3- starting
// con.start().then(function(){
//     document.getElementById("send").disabled = false;
// }).catch(function(err){
//     return console.log(err.tosttring());
// });

// //4- definging subscribe method
// con.on("ReceiveMessage", function (u, m) {
//     var li = document.createElement("li");
    
//     document.getElementById("List").appendChild(li);
//     li.textContent = '${u} : ${m}';
// });

// //5- calling server method
// document.getElementById("send").addEventListener("click", function (event) {
//     var message = document.getElementById("input").value;
//     con.invoke("sendMessage", user, message).catch(function (err) {
//         return console.error(err.toString());
//     });
//     event.preventDefault();
// })



"use strict";

 let connection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

//Disable the send button until connection is established.
document.getElementById("send").disabled = true;

connection.on("receiveMessage", function (user, message) {
    console.log("message sent");
    //const li = document.createElement("li");
    //document.getElementById("List").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
   // li.textContent = `${user} says ${message}`;
   const messages = document.getElementById("List");
    messages.innerHTML += `<li>${user} : ${message}</li>`;
    
});

connection.start().then(function () {
    document.getElementById("send").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("send").addEventListener("click", function (event) {
    var user = document.getElementById("user").value;
    var message = document.getElementById("input").value;
    connection.invoke("sendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});