
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const cadastroForm = document.getElementById("cadastroForm");

  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("cadastroEmail").value;
      const password = document.getElementById("cadastroPassword").value;
      localStorage.setItem("user", JSON.stringify({ email, password }));
      alert("Cadastro realizado com sucesso!");
      window.location.href = "index.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const saved = JSON.parse(localStorage.getItem("user"));

      if (saved && email === saved.email && password === saved.password) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "painel.html";
      } else {
        alert("E-mail ou senha inválidos.");
      }
    });
  }

  if (window.location.pathname.includes("painel.html") ||
      window.location.pathname.includes("contatos.html") ||
      window.location.pathname.includes("templates.html") ||
      window.location.pathname.includes("historico.html") ||
      window.location.pathname.includes("enviar.html")) {
    const logged = localStorage.getItem("loggedIn");
    if (!logged) {
      window.location.href = "index.html";
    }
  }

  if (window.location.pathname.includes("enviar.html")) {
    const form = document.getElementById("formEnvio");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const numero = document.getElementById("numero").value.replace(/\D/g, '');
      const mensagem = document.getElementById("mensagem").value;
      const data = new Date().toLocaleString();

      // Salvar no histórico
      const historico = JSON.parse(localStorage.getItem("historico") || "[]");
      historico.push({ numero, mensagem, data });
      localStorage.setItem("historico", JSON.stringify(historico));

      // Abrir WhatsApp Web
      const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
      window.open(link, '_blank');
    });
  }

  if (window.location.pathname.includes("historico.html")) {
    const lista = document.getElementById("listaHistorico");
    const historico = JSON.parse(localStorage.getItem("historico") || "[]");
    lista.innerHTML = "";
    historico.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.data}</strong><br>Para: ${item.numero}<br>Mensagem: ${item.mensagem}<hr>`;
      lista.appendChild(li);
    });
  }
});

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}
