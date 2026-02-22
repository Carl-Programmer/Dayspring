// Smooth scroll for navbar links
document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const target = document.getElementById(targetId);

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

// Button smooth scroll (Hero button)
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

/* Scroll Reveal Animation */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll("section, .card, .event").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});

// Hamburger toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close menu when clicking a link (mobile UX improvement)
document.querySelectorAll("#nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});



// =========================
// EMAILJS SETUP
// =========================

// Initialize EmailJS
(function(){
    emailjs.init("YOUR_PUBLIC_KEY"); // <-- Replace this
})();

// Modal controls
const modal = document.getElementById("contactModal");
const openBtn = document.getElementById("openForm");
const closeBtn = document.querySelector(".close");

openBtn.onclick = () => modal.style.display = "flex";
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
    if(e.target === modal){
        modal.style.display = "none";
    }
};

// Form submission
document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(() => {
        document.getElementById("successMessage").innerText =
            "Message sent successfully! We will contact you soon.";
        this.reset();
    }, (error) => {
        alert("Failed to send message. Please try again.");
        console.log(error);
    });
});

// =========================
// SMART AUTO-SLIDING EVENTS
// =========================
// =========================
// FINAL WORKING INFINITE SLIDER
// =========================

const slider = document.querySelector(".events");

if (slider) {

    const cards = Array.from(slider.children);

    cards.forEach(card => {
        const clone = card.cloneNode(true);

        // 🔥 Remove hidden class from clones
        clone.classList.remove("hidden");

        slider.appendChild(clone);
    });

    let speed = 0.5;
    let isPaused = false;

    function animate() {
        if (!isPaused) {
            slider.scrollLeft += speed;

            if (slider.scrollLeft >= slider.scrollWidth / 2) {
                slider.scrollLeft = 1;
            }
        }
        requestAnimationFrame(animate);
    }

    animate();

    slider.addEventListener("mouseenter", () => isPaused = true);
    slider.addEventListener("mouseleave", () => isPaused = false);
}