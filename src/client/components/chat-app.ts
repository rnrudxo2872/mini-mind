import { io } from "socket.io-client";
import { MessageData } from "../interfaces/msginterface";

export class ChatApp extends HTMLElement {
  socket: any;
  form: HTMLFormElement;
  inputBox: HTMLInputElement;
  submitBtn: HTMLButtonElement;
  messageBox: HTMLDivElement;
  chatIcon: HTMLButtonElement;
  closeBtn: HTMLElement;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.messageBox = document.createElement("div");
    this.form = document.createElement("form");
    this.inputBox = document.createElement("input");
    this.submitBtn = document.createElement("button");
    this.closeBtn = document.createElement("span");

    this.chatIcon = document.createElement("button");

    this.socket = io();
    this.setSocket();
    this.setInitIcon();
    this.setElements();
    this.setStyle();
    this.setEvent();
  }

  setInitIcon() {
    this.chatIcon.innerHTML = "chat here";
  }

  setElements() {
    this.setMessageBox();
    this.setForm();
    this.setInputBox();
    this.setSubmitBtn();
    this.setCloseBtn();

    this.form.appendChild(this.inputBox);
    this.form.appendChild(this.submitBtn);
  }

  setCloseBtn() {
    this.closeBtn.className = "chat__close";
    this.closeBtn.innerText = "X";
  }

  setSubmitBtn() {
    this.submitBtn.innerText = "전송";
  }

  setInputBox() {
    this.inputBox.type = "text";
    this.inputBox.id = "insert-msg-box";
  }

  setForm() {
    this.form.id = "message-form";
  }

  setMessageBox() {
    this.messageBox.id = "message-box";
  }

  setStyle() {
    const linkFragment = new DocumentFragment();

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "/assets/components/css/chat-app.css";

    const IconLink = document.createElement("link");
    IconLink.rel = "stylesheet";
    IconLink.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";

    linkFragment.appendChild(styleLink);
    linkFragment.appendChild(IconLink);

    this.shadowRoot?.appendChild(linkFragment);
  }

  connectedCallback() {
    this.shadowRoot?.appendChild(this.chatIcon);
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

  switchOn() {
    const fragment = new DocumentFragment();

    fragment.appendChild(this.closeBtn);
    fragment.appendChild(this.messageBox);
    fragment.appendChild(this.form);

    this.shadowRoot?.append(fragment);
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

  handleClickIcon(this: ChatApp) {
    this.chatIcon.style.display = "none";
    this.switchOn();
  }

  setEvent() {
    this.form.addEventListener("submit", this.handleMsgSubmit.bind(this));
    this.chatIcon.addEventListener("click", this.handleClickIcon.bind(this));
  }
}
