// Add your real business email here before publishing.
const BUSINESS_EMAIL = "team.veltrixa.ind@gmail.com";

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!BUSINESS_EMAIL || !BUSINESS_EMAIL.includes("@")) {
    document.getElementById("formNote").textContent =
      "Please contact us by email if the enquiry form does not open your email application.";
    return;
  }
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`New VELTRIXA enquiry — ${data.get("service")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\n\nProject details:\n${data.get("message")}`
  );
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
});
