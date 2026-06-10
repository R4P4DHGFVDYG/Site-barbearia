const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const dialog = document.querySelector("[data-dialog]");
const dialogImage = document.querySelector("[data-dialog-image]");
const dialogClose = document.querySelector("[data-dialog-close]");
const galleryButtons = document.querySelectorAll("[data-full]");
const servicesTrack = document.querySelector("[data-services-track]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (servicesTrack) {
  Array.from(servicesTrack.children).forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    servicesTrack.appendChild(clone);
  });
}

const closeMenu = () => {
  header?.classList.remove("is-open");
  document.body.classList.remove("nav-open");
  navToggle?.setAttribute("aria-expanded", "false");
};

navToggle?.addEventListener("click", () => {
  const isOpen = header?.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", Boolean(isOpen));
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeMenu();
  }
});

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!dialog || !dialogImage) return;

    const image = button.querySelector("img");
    dialogImage.src = button.dataset.full || "";
    dialogImage.alt = image?.alt || "Imagem da Barbearia Leo Barbeiro";
    dialog.showModal();
    document.body.classList.add("dialog-open");
  });
});

const closeDialog = () => {
  dialog?.close();
  document.body.classList.remove("dialog-open");
};

dialogClose?.addEventListener("click", closeDialog);

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeDialog();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    document.body.classList.remove("dialog-open");
  }
});
