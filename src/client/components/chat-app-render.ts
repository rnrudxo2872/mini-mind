export class ChatAppRender {
  messageBox: HTMLDivElement;
  form: HTMLFormElement;
  inputBox: HTMLInputElement;
  submitBtn: HTMLButtonElement;
  closeBtn: HTMLSpanElement;
  $target: HTMLElement;

  constructor({ $target }: { $target: HTMLElement }) {
    this.$target = $target;

    this.messageBox = document.createElement("div");
    this.form = document.createElement("form");
    this.inputBox = document.createElement("input");
    this.submitBtn = document.createElement("button");
    this.closeBtn = document.createElement("span");

    this.setElements();
    this.setEvent();
    this.render();
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

  setEvent() {
    // this.form.addEventListener("submit", this.handleMsgSubmit.bind(this));
  }

  render() {
    const fragment = new DocumentFragment();
    fragment.appendChild(this.closeBtn);
    fragment.appendChild(this.messageBox);
    fragment.appendChild(this.form);

    this.$target.appendChild(fragment);
  }
}
