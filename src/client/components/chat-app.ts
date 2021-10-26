import { io } from "socket.io-client";
import { MessageData } from "../interfaces/msginterface";

export class ChatApp extends HTMLElement {
  socket: any;
  form: HTMLFormElement;
  inputBox: HTMLInputElement;
  submitBtn: HTMLButtonElement;
  messageBox: HTMLDivElement;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.messageBox = document.createElement("div");
    this.form = document.createElement("form");
    this.inputBox = document.createElement("input");
    this.submitBtn = document.createElement("button");

    this.socket = io();
    this.setSocket();
    this.setElements();
    this.setStyle();
    this.setEvent();
  }

  setElements() {
    this.messageBox.id = "message-box";

    this.form.id = "message-form";

    this.inputBox.type = "text";
    this.inputBox.id = "insert-msg-box";

    this.submitBtn.innerText = "전송";

    this.form.appendChild(this.inputBox);
    this.form.appendChild(this.submitBtn);
  }

  setStyle() {
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "/assets/components/css/chat-app.css";

    this.shadowRoot?.appendChild(styleLink);
  }

  connectedCallback() {
    this.shadowRoot?.appendChild(this.messageBox);
    this.shadowRoot?.appendChild(this.form);
  }

  send(data: MessageData) {
    this.socket.emit("sendMsg", data);
    const element = this.getOtherMessage({ user: "나", msg: data.msg });
    this.messageBox.appendChild(element);
  }

  getOtherMessage(data: MessageData) {
    const { user, msg } = data;

    const messageContainer = document.createElement("div");
    messageContainer.className = "one-msg__container";

    const userElement = document.createElement("div");
    userElement.innerText = user;

    const messageElement = document.createElement("div");
    messageElement.innerText = msg;

    messageContainer.appendChild(userElement);
    messageContainer.appendChild(messageElement);

    return messageContainer;
  }

  setSocket() {
    this.socket.on("getMsg", (data: MessageData) => {
      const element = this.getOtherMessage(data);
      this.messageBox.appendChild(element);
    });
  }

  handleMsgSubmit(this: ChatApp, event: Event) {
    event.preventDefault();

    const data = {
      msg: this.inputBox.value,
      user: "unknown",
    };
    this.send(data);

    this.inputBox.value = "";
  }

  setEvent() {
    this.form.addEventListener("submit", this.handleMsgSubmit.bind(this));
  }
}
