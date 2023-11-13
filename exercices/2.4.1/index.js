const delayTime = 5;

let clicks = 0;
let startTime;
let timeReference;
const clickButton = document.getElementById("clickButton");

clickButton.addEventListener("mouseenter", () => {
  startTime = new Date().getTime();
  clicks = 0;
  clickButton.addEventListener("click", handleClick);
  timeReference = setTimeout(checkGameResult, 5000);
});

function handleClick() {
  clicks++;
  if (clicks === 10) {
    clearTimeout(timeReference);
    checkGameResult();
  }
}

function checkGameResult() {
  clickButton.removeEventListener("click", handleClick);
  const endTime = new Date().getTime();
  const elapsedTime = endTime - startTime;

  if (clicks === 10) {
    clickButton.innerHTML = `You win! You clicked 10 times within ${elapsedTime} ms`;
  } else {
    clickButton.innerHTML = "Game over, you did not click 10 times within 5s!";
  }
}
