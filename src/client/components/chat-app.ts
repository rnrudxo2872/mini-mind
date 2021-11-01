import { io } from "socket.io-client";
import { MessageData } from "../interfaces/msginterface";
import { ChatAppBtn } from "./chat-app-btn";
import { ChatAppRender } from "./chat-app-render";

export class ChatApp extends HTMLElement {
  socket: any;
  chatBtn: HTMLDivElement;
  chatRend: HTMLDivElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.chatBtn = document.createElement("div");
    this.setChatBtn();

    this.chatRend = document.createElement("div");
    this.setChatRend();

    this.socket = io();
    this.setSocket();
    this.setStyle();
    this.setEvent();

    this.render();
  }

  setChatBtn() {
    this.chatBtn.classList.add("chat-btn");
    new ChatAppBtn({ $target: this.chatBtn });
  }

  setChatRend() {
    this.chatRend.classList.add("chat-render");
    this.chatRend.classList.add("hide");
    new ChatAppRender({ $target: this.chatRend });
  }

  setStyle() {
    const linkFragment = new DocumentFragment();

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "/assets/components/css/chat-app.css";

    linkFragment.appendChild(styleLink);

    this.shadowRoot?.appendChild(linkFragment);
  }

  connectedCallback() {
    // this.shadowRoot?.appendChild(this.chatIcon);
  }

  send(data: MessageData) {
    // this.socket.emit("sendMsg", data);
    // const element = this.getOtherMessage({ user: "나", msg: data.msg });
    // this.messageBox.appendChild(element);
  }

  getOtherMessage(data: MessageData) {
    // const { user, msg } = data;
    // const messageContainer = document.createElement("div");
    // messageContainer.className = "one-msg__container";
    // const userElement = document.createElement("div");
    // userElement.innerText = user;
    // const messageElement = document.createElement("div");
    // messageElement.innerText = msg;
    // messageContainer.appendChild(userElement);
    // messageContainer.appendChild(messageElement);
    // return messageContainer;
  }

  setSocket() {
    // this.socket.on("getMsg", (data: MessageData) => {
    //   const element = this.getOtherMessage(data);
    //   this.messageBox.appendChild(element);
    // });
  }

  handleMsgSubmit(this: ChatApp, event: Event) {
    // event.preventDefault();
    // const data = {
    //   msg: this.inputBox.value,
    //   user: "unknown",
    // };
    // this.send(data);
    // this.inputBox.value = "";
  }

  handleStartChat(this: ChatApp) {
    this.chatBtn.classList.add("hide");
    this.chatRend.classList.remove("hide");
  }

  handleClickCloseBtn(this: ChatApp) {
    // this.switchOff()
  }

  setEvent() {
    this.chatBtn.addEventListener("click", this.handleStartChat.bind(this));
  }

  render() {
    const fragment = new DocumentFragment();
    // fragment.appendChild(this.chatIcon);
    fragment.appendChild(this.chatBtn);
    fragment.appendChild(this.chatRend);

    this.shadowRoot?.appendChild(fragment);
  }
}
