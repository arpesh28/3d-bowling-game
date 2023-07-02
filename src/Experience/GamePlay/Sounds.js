import ballSound1 from "/audios/ball1.mp3";
import ballSound2 from "/audios/ball2.mp3";
import strikeSound from "/audios/strike.mp3";

export default class Sounds {
  constructor() {
    this.ballRolling1Sound = new Audio(ballSound1);
    this.ballRolling2Sound = new Audio(ballSound2);
    this.strikeSound = new Audio(strikeSound);
  }
  playSound(mouse, sound) {
    switch (sound) {
      case "ballRolling":
        this.ballRolling2Sound.volume = 0.2;
        this.ballRolling2Sound.play();
        break;
      case "strike":
        this.strikeSound.play();
        this.ballRolling2Sound.pause();
        this.ballRolling2Sound.currentTime = 0;
        break;
      default:
        break;
    }
  }
}
