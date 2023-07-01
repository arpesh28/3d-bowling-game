import Mouse from "./Mouse";
import Experience from "../Experience";

export default class GamePlay {
  constructor() {
    this.experience = new Experience();
    this.world = this.experience.world;
    this.mouse = new Mouse();
  }
  update() {}
}
