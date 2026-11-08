
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  })
);

document.getElementById("year").textContent = new Date().getFullYear();

const WEB3FORMS_ACCESS_KEY = "ed0b052b-c55a-4115-9682-52daa1e45324";

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  formNote.textContent = "Sending your enquiry...";
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  const formData = Object.fromEntries(new FormData(contactForm));

  formData.access_key = WEB3FORMS_ACCESS_KEY;
  formData.subject = `New VELTRIXA enquiry — ${formData.service}`;
  formData.from_name = "VELTRIXA Website";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      formNote.textContent = "Message sent successfully! Thank you for contacting VELTRIXA.";
      contactForm.reset();
    } else {
      formNote.textContent = result.message || "Unable to send your enquiry. Please try again.";
    }
  } catch (error) {
    formNote.textContent = "Something went wrong. Please try again.";
    console.error(error);
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Prepare enquiry <span>↗</span>';
  }
});
