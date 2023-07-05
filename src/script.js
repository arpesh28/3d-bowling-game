import Experience from "./Experience/Experience";
import gsap from "gsap";

const experience = new Experience(document.querySelector("canvas.webgl"));

//  Misc
const startBtn = document.getElementById("start");
const overlay = document.getElementById("banner");
startBtn.onclick = () => {
  gsap.fromTo(overlay, { opacity: 1 }, { opacity: 0, duration: 1 });
  gsap.fromTo(startBtn, { opacity: 1 }, { opacity: 0, duration: 0.1 });
  setTimeout(() => {
    experience.gameStart = true;
  }, 1000);
};
console.log(experience.canvas.style, startBtn);
