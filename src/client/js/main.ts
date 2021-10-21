import { io } from "socket.io-client";
import { MessageData } from "../interfaces/msginterface";

const insertBox = document.getElementById("insert-msg-box") as HTMLInputElement;
const messageForm = document.getElementById("message-form") as HTMLFormElement;
const messageBox = document.getElementById("message-box") as HTMLDivElement;

const socket = io();

function send(data: MessageData) {
  socket.emit("sendMsg", data);
  const element = getOtherMessage({ user: "나", msg: data.msg });
  messageBox.appendChild(element);
}

function getOtherMessage(data: MessageData) {
  const { user, msg } = data;

  const messageContainer = document.createElement("div");

  const userElement = document.createElement("div");
  userElement.innerText = user;

  const messageElement = document.createElement("div");
  messageElement.innerText = msg;

  messageContainer.appendChild(userElement);
  messageContainer.appendChild(messageElement);

  return messageContainer;
}

socket.on("getMsg", (data: MessageData) => {
  const element = getOtherMessage(data);
  messageBox.appendChild(element);
});

const handleMsgSubmit = (event: Event) => {
  event.preventDefault();

  const data = {
    msg: insertBox.value,
    user: "unknown",
  };
  send(data);

  insertBox.value = "";
};

messageForm.addEventListener("submit", handleMsgSubmit);
