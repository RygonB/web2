let cpt = 0;
const counter = document.querySelector(".counter");
const message = document.querySelector(".message");


window.addEventListener("click", () => {
  cpt++;
  counter.textContent = cpt;
  if (cpt === 5) {
    message.textContent = "Bravo, bel échauffement";
  }else if (cpt >= 10){
    message.textContent = "Vous êtes passé maître en l'art du clic !";
  }
  
});
