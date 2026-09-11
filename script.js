const loadingScreen = document.getElementById("loadingScreen");
const homeScreen = document.getElementById("homeScreen");
const progressBar = document.getElementById("progressBar");
const loadingText = document.getElementById("loadingText");

const toast = document.getElementById("toast");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const nameInput = document.getElementById("nameInput");
const closeModal = document.getElementById("closeModal");
const accountForm = document.getElementById("accountForm");

let progress = 0;
let finished = false;

function showHome() {
  if (finished) return;
  finished = true;

  progressBar.style.width = "100%";
  loadingText.textContent = "Rewards ready!";

  setTimeout(() => {
    loadingScreen.classList.remove("active");
    homeScreen.classList.add("active");
  }, 450);
}

// Loading sequence
const loadingTimer = setInterval(() => {
  progress += Math.random() * 8 + 3;

  if (progress >= 100) {
    progress = 100;
    clearInterval(loadingTimer);
    showHome();
  }

  progressBar.style.width = `${progress}%`;
}, 170);

// Toast helper
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

// Feature buttons
document.querySelectorAll(".hotspot[data-message]").forEach(button => {
  button.addEventListener("click", () => {
    showToast(`${button.dataset.message} selected`);
  });
});

// Modal
function openAccount(mode) {
  const login = mode === "login";

  modalTitle.textContent = login ? "Log In" : "Sign Up";
  modalSubtitle.textContent = login
    ? "Welcome back to Birhan Cash."
    : "Create your Birhan Cash account.";

  nameInput.style.display = login ? "none" : "block";
  nameInput.required = !login;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");

  setTimeout(() => {
    document.getElementById("emailInput").focus();
  }, 50);
}

document.getElementById("signupBtn").addEventListener("click", () => {
  openAccount("signup");
});

document.getElementById("loginBtn").addEventListener("click", () => {
  openAccount("login");
});

function closeAccount() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

closeModal.addEventListener("click", closeAccount);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeAccount();
});

accountForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const isLogin = modalTitle.textContent === "Log In";
  showToast(isLogin ? "Login form submitted" : "Signup form submitted");
  closeAccount();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeAccount();
});