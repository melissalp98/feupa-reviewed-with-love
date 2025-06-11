const comentarioForm = document.getElementById("comentarioForm");
const comentariosSection = document.getElementById("comment-list");

comentarioForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const mensagem = document.getElementById("mensagem").value;
  if (nome && mensagem) {
    await addDoc(collection(db, "comentarios"), {
      nome,
      mensagem,
      data: new Date()
    });
    comentarioForm.reset();
  }
});

const q = query(collection(db, "comentarios"), orderBy("data", "desc"));

onSnapshot(q, (snapshot) => {
  comentariosSection.innerHTML = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "comentario";
    div.innerHTML = `<p>💬 “${data.mensagem}”</p><span>— ${data.nome}</span>`;
    comentariosSection.appendChild(div);
  });
});
