const form = document.getElementById("comment-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.querySelector("input").value;
  const message = form.querySelector("textarea").value;

  const newComment = document.createElement("p");
  newComment.textContent = `⭐️⭐️⭐️⭐️⭐️ — "${message}" — ${name}`;

  document.querySelector(".comment-list").appendChild(newComment);

  form.reset();
});
function soltarConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#e91e63', '#ff4081', '#f8bbd0', '#c2185b'];

  (function frame() {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return;

    const confettiCount = 5;
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '0px';
      confetti.style.opacity = '1';
      confetti.style.borderRadius = '50%';
      confetti.style.zIndex = '9999';
      confetti.style.pointerEvents = 'none';
      document.body.appendChild(confetti);

      let top = 0;
      const fallSpeed = Math.random() * 3 + 2;

      const fall = setInterval(() => {
        top += fallSpeed;
        confetti.style.top = top + 'px';
        confetti.style.opacity = 1 - top / window.innerHeight;
        if (top > window.innerHeight) {
          clearInterval(fall);
          confetti.remove();
        }
      }, 16);
    }
    requestAnimationFrame(frame);
  })();
}

// Exemplo de uso:
// soltarConfetti();
