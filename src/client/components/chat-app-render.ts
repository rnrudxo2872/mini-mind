export class ChatAppRender {
  socket: any;
  messageBox: HTMLDivElement;
  form: HTMLFormElement;
  inputBox: HTMLInputElement;
  submitBtn: HTMLButtonElement;
  closeBtn: HTMLSpanElement;
  $target: HTMLElement;
  createRoomBtn: HTMLButtonElement;
  createRoomInput: HTMLInputElement;
  createRoomInputBtn: HTMLButtonElement;
  enteredRoom: boolean;
  rooms: { num: number; name: string }[];
  closeClick: () => void;
  welcomeSpeech: HTMLDivElement;
  welcomeSpeechContainer: HTMLDivElement;

  constructor({
    $target,
    socket,
    CloseClick,
  }: {
    $target: HTMLElement;
    socket: any;
    CloseClick: () => void;
  }) {
    this.$target = $target;
    this.rooms = [];
    this.socket = socket;
    this.enteredRoom = false;

    this.welcomeSpeechContainer = document.createElement("div");
    this.welcomeSpeech = document.createElement("h1");

    this.messageBox = document.createElement("div");
    this.form = document.createElement("form");
    this.inputBox = document.createElement("input");
    this.submitBtn = document.createElement("button");
    this.closeBtn = document.createElement("span");

    this.createRoomBtn = document.createElement("button");
    this.createRoomInput = document.createElement("input");
    this.createRoomInputBtn = document.createElement("button");

    this.setRoomBtn();
    this.getRooms();

    this.setElements();

    this.closeClick = CloseClick;
    this.setEvent();

    this.render();
  }

  setRoomBtn() {
    this.createRoomBtn.classList.add("chat__createBtn");
    this.createRoomBtn.innerText = "채팅방 만들기";

    this.createRoomInput.classList.add("chat__createInput");
    this.createRoomInput.classList.add("hide");

    this.createRoomInputBtn.classList.add("chat__createBtn");
    this.createRoomInputBtn.classList.add("hide");
    this.createRoomInputBtn.innerText = "만들기";
  }

  getRooms() {
    this.socket.emit("getRooms");
    this.socket.on("returnRooms", (rooms: []) => {
      this.rooms = rooms;
      this.render();
    });
  }

  createRoom() {
    this.socket.emit("createRoom");
  }

  setElements() {
    this.setWelcomeSpeech();

    this.setMessageBox();
    this.setForm();
    this.setInputBox();
    this.setSubmitBtn();
    this.setCloseBtn();

    this.form.appendChild(this.inputBox);
    this.form.appendChild(this.submitBtn);
  }

  setWelcomeSpeech() {
    this.welcomeSpeechContainer.classList.add("welcome-container");

    this.welcomeSpeech.classList.add("welcome__main");
    this.welcomeSpeech.innerText = `${this.socket.id}님 환영합니다!`;

    this.welcomeSpeechContainer.appendChild(this.welcomeSpeech);
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
    this.closeBtn.addEventListener("click", this.closeBtnHandler.bind(this));
    this.createRoomBtn.addEventListener(
      "click",
      this.createBtnClickHnadler.bind(this)
    );
    this.createRoomInputBtn.addEventListener(
      "click",
      this.submitCreateRoom.bind(this)
    );
    this.createRoomInput.addEventListener(
      "keydown",
      this.createRoomInputKeyHandler.bind(this)
    );
    // this.form.addEventListener("submit", this.handleMsgSubmit.bind(this));
  }

  closeBtnHandler() {
    this.$target.classList.add("hide");
    this.closeClick();
  }

  createBtnClickHnadler() {
    this.createRoomBtn.classList.add("hide");
    this.createRoomInput.classList.remove("hide");
    this.createRoomInputBtn.classList.remove("hide");
    this.createRoomInput.focus();
  }

  createRoomInputKeyHandler(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.submitCreateRoom();
    }
    if (event.key === "Escape") {
      this.switchCreateElement();
      this.createRoomInput.value = "";
    }
  }

  submitCreateRoom() {
    this.switchCreateElement();
    this.createOneRoom(this.createRoomInput.value);
    this.createRoomInput.value = "";

    this.render();
  }

  switchCreateElement() {
    this.createRoomBtn.classList.remove("hide");
    this.createRoomInput.classList.add("hide");
    this.createRoomInputBtn.classList.add("hide");
  }

  createOneRoom(name: string) {
    this.socket.emit("createRoom", { name });
    this.socket.emit("getRooms");
  }

  getOneRoomElement(room: any): HTMLDivElement {
    const container = document.createElement("div");
    container.className = "chat__room";

    const span = document.createElement("span");
    span.innerText = room.name;

    container.appendChild(span);
    return container;
  }

  setRoomElement(fragment: DocumentFragment) {
    if (this.rooms.length === 0) {
      this.setEmptyRoomElement(fragment);
      return;
    }

    this.rooms.forEach((room) => {
      const item = this.getOneRoomElement(room);
      fragment.appendChild(item);
    });
  }

  setEmptyRoomElement(fragment: DocumentFragment) {
    const emptyInfoSpan = document.createElement("span");
    emptyInfoSpan.innerText = "현재 만들어진 채팅방이 없습니다.";

    fragment.appendChild(emptyInfoSpan);
  }

  setBtns(fragment: DocumentFragment) {
    fragment.appendChild(this.createRoomBtn);
    fragment.appendChild(this.createRoomInput);
    fragment.appendChild(this.createRoomInputBtn);
  }

  render() {
    this.$target.innerHTML = "";
    const fragment = new DocumentFragment();

    fragment.appendChild(this.closeBtn);
    fragment.appendChild(this.welcomeSpeechContainer);

    if (this.enteredRoom) {
      fragment.appendChild(this.messageBox);
      fragment.appendChild(this.form);
    } else {
      this.setRoomElement(fragment);
      this.setBtns(fragment);
    }

    this.$target.appendChild(fragment);
  }
}
