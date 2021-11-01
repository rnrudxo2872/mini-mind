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
    this.chatIcon.innerHTML = "chat here";
  }

  render() {
    this.$target.appendChild(this.chatIcon);
  }
}
