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
