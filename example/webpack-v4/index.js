import "@fortawesome/fontawesome-free/css/all.css";
import "./config/font-awesome.config";

const icon = document.createElement("i");
const cl = ["fas", "fa-heart", "fa-5x"];
for (let i in cl) {
  icon.classList.add(cl[i]);
}

document.querySelector(".icon").appendChild(icon);
