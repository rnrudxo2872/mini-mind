export class ChatApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.setStyle();
  }

  setStyle() {
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "/assets/component/style/chat-app.css";
  }

  connectedCallback() {
    const messageBox = document.createElement("div");
    messageBox.id = "message-box";

    const form = document.createElement("form");
    form.id = "message-form";

    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.id = "insert-msg-box";

    const submitBtn = document.createElement("button");
    submitBtn.innerText = "전송";

    form.appendChild(inputBox);
    form.appendChild(submitBtn);

    this.shadowRoot?.appendChild(messageBox);
    this.shadowRoot?.appendChild(form);
  }
}
