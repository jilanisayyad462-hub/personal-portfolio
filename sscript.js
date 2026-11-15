// Enhance the navigation only when JavaScript is available.
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navbar = menuBtn.closest("nav");
const mobileLayout = window.matchMedia("(max-width: 768px)");

function setMenu(open, restoreFocus = false) {
    navLinks.classList.toggle("active", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menuBtn.textContent = open ? "✕" : "☰";
    if (restoreFocus) menuBtn.focus();
}

menuBtn.hidden = false;
document.documentElement.classList.add("js");
menuBtn.addEventListener("click", () => {
    setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
});

navbar.addEventListener("keydown", (event) => {
    if (!mobileLayout.matches || menuBtn.getAttribute("aria-expanded") !== "true") return;
    if (event.key === "Escape") {
        event.preventDefault();
        setMenu(false, true);
    } else if (event.key === "Tab") {
        const links = [...navLinks.querySelectorAll("a[href]")];
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === menuBtn) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            menuBtn.focus();
        }
    }
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        if (mobileLayout.matches) {
            setMenu(false);
            document.querySelector(link.hash)?.focus({ preventScroll: true });
        }
    });
});

document.addEventListener("click", (event) => {
    if (mobileLayout.matches && menuBtn.getAttribute("aria-expanded") === "true" && !navbar.contains(event.target)) {
        setMenu(false, true);
    }
});

mobileLayout.addEventListener("change", () => {
    const focusInLinks = navLinks.contains(document.activeElement);
    const focusOnButton = document.activeElement === menuBtn;
    setMenu(false);
    if (mobileLayout.matches && focusInLinks) menuBtn.focus();
    if (!mobileLayout.matches && focusOnButton) navLinks.querySelector("a").focus();
});

// AUTOMATIC COPYRIGHT YEAR
document.getElementById("year").textContent =
    new Date().getFullYear();

// CONTACT FORM
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    formStatus.textContent =
        "Thank you, " + name +
        "! Your form is working. Email sending is not connected yet.";

    contactForm.reset();

});
