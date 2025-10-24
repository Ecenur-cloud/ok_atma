const arrow = document.getElementById("arrow");
const target = document.getElementById("target");
const scoreboard = document.getElementById("scoreboard");

let isArrowFlying = false;
let score = 0;

document.addEventListener("click", (e) => {
  if (isArrowFlying) return;

  isArrowFlying = true;

  const startX = 70;   // Okun başlangıç konumu (sol)
  const startY = 190;  // Okun başlangıç konumu (üst)

  const endX = e.clientX;
  const endY = e.clientY;

  const dx = endX - startX;
  const dy = endY - startY;

  const angle = Math.atan2(dy, dx); // Radyan cinsinden yön açısı
  const angleDeg = angle * 180 / Math.PI;

  let posX = startX;
  let posY = startY;

  arrow.style.transform = `rotate(${angleDeg}deg)`;

  const speed = 5;

  const interval = setInterval(() => {
    posX += Math.cos(angle) * speed;
    posY += Math.sin(angle) * speed;

    arrow.style.left = posX + "px";
    arrow.style.top = posY + "px";

    // Çarpışma kontrolü
    let arrowRect = arrow.getBoundingClientRect();
    let targetRect = target.getBoundingClientRect();

    if (
      arrowRect.left < targetRect.right &&
      arrowRect.right > targetRect.left &&
      arrowRect.top < targetRect.bottom &&
      arrowRect.bottom > targetRect.top
    ) {
      clearInterval(interval);
      score++;
      scoreboard.textContent = "Skor: " + score;
      resetArrow();
    }

    // Ekran dışına çıktıysa
    if (
      posX > window.innerWidth || posY > window.innerHeight ||
      posX < 0 || posY < 0
    ) {
      clearInterval(interval);
      resetArrow();
    }

  }, 10);
});

function resetArrow() {
  arrow.style.left = "70px";
  arrow.style.top = "190px";
  arrow.style.transform = "rotate(0deg)";
  document.getElementById("arrowPath").style.display = "block";
  isArrowFlying = false;
}

