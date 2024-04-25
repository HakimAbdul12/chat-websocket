const socket = io();
const clientsTotal = document.getElementById("clients-total");

const messageContainer = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

socket.on("clients-total", (data) => {
  clientsTotal.innerText = `Total clients: ${data}`;
});

function sendMessage() {
  console.log(messageInput.value);
  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dataTime: new Date(),
  };
  socket.emit("message", data);
  addMessageToUi(true, data)
  messageInput.value = "";
}

socket.on("chat-message", (data) => {
  console.log(data);
  addMessageToUi(false, data)
});

function addMessageToUi(isOwn, data) {
  const element = `
        <li class="${isOwn? "message-right": "message-left"}">
            <p class="message">
                ${data.message}
                <span>${data.name} 🔯 ${moment(data.dataTime).fromNow()}</span>
            </p>
        </li>
    `;
    messageContainer.innerHTML += element;
    scrollTobottom();
}

//this function automatically scroll you to the bottom when a message comes
function scrollTobottom(){
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
}