function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour12: false });
  const date = now.toISOString().split('T')[0];
  document.getElementById("clock").textContent = time;
  document.getElementById("date").textContent = date;
  drawAnalogClock(now);
}

function drawAnalogClock(now) {
  const canvas = document.getElementById("analog-clock");
  const ctx = canvas.getContext("2d");
  const radius = canvas.width / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(radius, radius);

  // Clock face
  ctx.beginPath();
  ctx.arc(0, 0, radius - 5, 0, 2 * Math.PI);
  ctx.strokeStyle = getComputedStyle(document.body).color;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Hour marks
  ctx.strokeStyle = getComputedStyle(document.body).color;
  for (let i = 0; i < 12; i++) {
    ctx.rotate(Math.PI / 6);
    ctx.beginPath();
    ctx.moveTo(0, -radius + 10);
    ctx.lineTo(0, -radius + 20);
    ctx.stroke();
  }
  ctx.restore();
  ctx.save();
  ctx.translate(radius, radius);

  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hr = now.getHours() % 12;

  // Hour hand - Blue
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 4;
  ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 0.5);
  ctx.stroke();
  ctx.rotate(-(Math.PI / 6) * hr - (Math.PI / 360) * min);

  // Minute hand - Yellow
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 3;
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 0.7);
  ctx.stroke();
  ctx.rotate(-(Math.PI / 30) * min - (Math.PI / 1800) * sec);

  // Second hand - Red
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.rotate((Math.PI / 30) * sec);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 0.9);
  ctx.stroke();

  ctx.restore();
}

setInterval(updateClock, 1000);
updateClock();

const toggleButton = document.getElementById("theme-toggle");
const bodyElement = document.body;

toggleButton.addEventListener("click", () => {
  bodyElement.classList.toggle("dark-theme");
  bodyElement.classList.toggle("light-theme");
});

window.onload = () => {
  bodyElement.classList.add("light-theme");
};