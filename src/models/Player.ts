export class Player {
  public name: string;
  public type: "human" | "computer";

  constructor({ name, type }: { name: string; type: "human" | "computer" }) {
    this.name = name;
    this.type = type;
  }
}
