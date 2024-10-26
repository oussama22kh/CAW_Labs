let isStarted = false;
let isEnd = false;
const startButton = document.getElementById("start");

const endButton = document.getElementById("end");

const maze = document.getElementById("maze");

maze.addEventListener("mouseleave", (e) => {
  if (isStarted) {
    userIsCheating();
  }
});

const userIsCheating = () => {
  const text = document.getElementById("status");
  text.innerHTML = "You lose by cheating";
  text.style.color = "red";

  isStarted = false;

  setTimeout(() => {
    text.innerHTML = 'Move your mouse over the "S" to begin.';
    text.style.color = "black";
  }, 2000);
};
const userLose = () => {
  const text = document.getElementById("status");
  text.innerHTML = "You lose";
  text.style.color = "red";
  isStarted = false;
  setTimeout(() => {
    text.innerHTML = 'Move your mouse over the "S" to begin.';
    text.style.color = "black";
  }, 2000);
};

const userWin = () => {
  const text = document.getElementById("status");
  text.style.color = "green";
  text.innerHTML = "You win";

  isStarted = false;
  isEnd = true;
  setTimeout(() => {
    text.innerHTML = 'Move your mouse over the "S" to begin.';
    text.style.color = "black";
  }, 2000);
};
startButton.addEventListener("click", (e) => {
  isStarted = true;
});

endButton.addEventListener("mouseover", (e) => {
  if (isStarted) {
    userWin();
  }
});

const boundaries = document.getElementsByClassName("boundary");
Array.from(boundaries).map((boundary) => {
  boundary.addEventListener(
    "mouseover",
    function (event) {
      if (isStarted) {
        document.querySelectorAll(".boundary").forEach((boundary) => {
          boundary.style.background = "red";
        });
        userLose();
      }
      
      console.log(event);
      setTimeout(function () {
        event.target.style.color = "";
      }, 500);
    },
    false
  );
  boundary.addEventListener(
    "mouseleave",
    function (event) {

      Array.from(boundaries).forEach((boundary) => {
        boundary.style.background = "#eeeeee";
      });
      event.target.style.color = "orange";
      console.log(event);
      // on réinitialise la couleur après quelques instants
      setTimeout(function () {
        event.target.style.color = "";
      }, 500);
    },
    false
  );
});
