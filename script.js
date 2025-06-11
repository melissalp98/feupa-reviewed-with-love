// Firebase config + inicialização (seu setup)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "API_KEY_AQUI",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("comentarioForm");
const comentariosSection = document.getElementById("comment-list");

// Envio do comentário pro Firestore
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("nome").value.trim();
  const message = document.getElementById("mensagem").value.trim();

  if (!name || !message) {
    alert("Preencha nome e mensagem, por favor!");
    return;
  }

  try {
    await addDoc(collection(db, "comentarios"), {
      nome: name,
      mensagem: message,
      timestamp: new Date()
    });
    form.reset();
  } catch (error) {
    alert("Erro ao enviar comentário. Tenta de novo!");
    console.error("Erro no Firestore:", error);
  }
});

// Escuta os comentários em tempo real e atualiza a UI
const q = query(collection(db, "comentarios"), orderBy("timestamp", "desc"));

onSnapshot(q, (snapshot) => {
  comentariosSection.innerHTML = "";
  snapshot.forEach((doc) => {
    const { nome, mensagem } = doc.data();
    const newComment = document.createElement("div");
    newComment.classList.add("comentario");
    newComment.innerHTML = `<p>⭐️⭐️⭐️⭐️⭐️ — "${mensagem}" — <strong>${nome}</strong></p>`;
    comentariosSection.appendChild(newComment);
  });
});

// CARROSSEL (seu irmão fez só o hover, vou deixar isso e vc pode melhorar depois)
const carrosselImgs = document.querySelectorAll(".carrossel-container img");
carrosselImgs.forEach(img => {
  img.addEventListener("mouseenter", () => {
    img.style.transform = "scale(1.1)";
  });
  img.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
  });
});

// BOTÃO DE MÚSICA (do seu irmão, ativando/desativando música)
const playBtn = document.getElementById("play-music-btn");
const audio = new Audio("audio/cancao.mp3");
audio.loop = true;
let tocando = false;

playBtn.addEventListener("click", () => {
  if (tocando) {
    audio.pause();
    tocando = false;
    playBtn.textContent = "🎵";
  } else {
    audio.play();
    tocando = true;
    playBtn.textContent = "🔈";
  }
});
