export class ChatAppBtn {
  chatIcon: HTMLButtonElement;
  $target: HTMLElement;

  constructor({ $target }: { $target: HTMLElement }) {
    this.$target = $target;
    this.chatIcon = document.createElement("button");
    this.setInitIcon();
    this.render();
  }

  setInitIcon() {
    this.chatIcon.classList.add("chat-start__btn");

    const icon = document.createElement("img");
    icon.src = "/chat-icon/cowChat.png";

    this.chatIcon.appendChild(icon);
  }

  render() {
    this.$target.appendChild(this.chatIcon);
  }
}
