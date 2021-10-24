export class ChatApp extends HTMLElement {
  constructor() {
    super();
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

    this.appendChild(messageBox);
    this.appendChild(form);
  }
}
