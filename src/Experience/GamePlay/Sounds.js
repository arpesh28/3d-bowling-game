import ballSound1 from "/audios/ball1.mp3";
import ballSound2 from "/audios/ball2.mp3";
import strikeSound from "/audios/strike.mp3";
import gsap from "gsap";

export default class Sounds {
  constructor() {
    this.ballRolling1Sound = new Audio(ballSound1);
    this.ballRolling2Sound = new Audio(ballSound2);
    this.strikeSound = new Audio(strikeSound);
    this.isStrike = false;
  }
  playSound(sound) {
    switch (sound) {
      case "ballRolling":
        this.ballRolling2Sound.volume = 0.2;
        this.ballRolling2Sound.play();
        break;
      case "strike":
        this.strikeSound.play();
        this.isStrike = true;
        this.ballRolling2Sound.pause();
        this.strikeSound.volume = 0.15;
        this.ballRolling2Sound.currentTime = 0;
        break;
      default:
        break;
    }
  }
  handleCollision(event, ballBody, pinsBody) {
    const contact = event.contact;
    const bodyA = contact.bi;
    const bodyB = contact.bj;
    const strikeExist = pinsBody.includes(bodyB);
    if (!this.isStrike && bodyA === ballBody && strikeExist) {
      this.playSound("strike");
    }
  }
}
