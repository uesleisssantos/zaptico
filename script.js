// Salvar usuário no localStorage
document.addEventListener("DOMContentLoaded", function () {
  const cadastroForm = document.getElementById("cadastroForm");
  const loginForm = document.getElementById("loginForm");

  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("cadastroEmail").value;
      const password = document.getElementById("cadastroPassword").value;
      localStorage.setItem("zapticoUser", JSON.stringify({ email, password }));
      alert("Usuário cadastrado com sucesso!");
      window.location.href = "index.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const user = JSON.parse(localStorage.getItem("zapticoUser"));

      if (user && email === user.email && password === user.password) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "painel.html";
      } else {
        alert("E-mail ou senha incorretos!");
      }
    });
  }

  // Verificar autenticação no painel
  if (window.location.pathname.includes("painel.html")) {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      window.location.href = "index.html";
    }
  }
});

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}
