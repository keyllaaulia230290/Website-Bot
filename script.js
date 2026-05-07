// ================= ANIMATION SCROLL =================
const animatedElements = document.querySelectorAll(
    ".hero h1, .hero p, .hero-buttons, .hero-badge, .features h2, .features p, .feature-card, .stats-section, .stat-card, .pricing-section h2, .pricing-section p, .price-card"
);

animatedElements.forEach((element) => {
    element.classList.add("hidden");
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }

    });
}, {
    threshold: 0.15
});

animatedElements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.03}s`;
    observer.observe(element);
});


// ================= NAVBAR EFFECT =================
window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 40) {

        navbar.style.background = "rgba(8, 20, 46, 0.97)";
        navbar.style.boxShadow = "0 8px 25px rgba(0,0,0,0.25)";
        navbar.style.backdropFilter = "blur(14px)";

    } else {

        navbar.style.background = "rgba(8, 20, 46, 0.88)";
        navbar.style.boxShadow = "none";

    }

});


// ================= MENU =================
const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

if (menuBtn && dropdownMenu) {

    menuBtn.addEventListener("click", () => {
        dropdownMenu.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {

        if (
            !menuBtn.contains(e.target) &&
            !dropdownMenu.contains(e.target)
        ) {
            dropdownMenu.classList.remove("active");
        }

    });

}


// ================= WHATSAPP BUTTON =================
document.querySelectorAll(".buy-btn").forEach((button) => {

    button.addEventListener("click", () => {

        const packageName = button.getAttribute("data-package");

        const message =
`Halo kak 👋
Saya mau order bot Lords Mobile paket ${packageName}.

Boleh minta info lebih lanjut?`;

        const waLink =
`https://wa.me/6285885385659?text=${encodeURIComponent(message)}`;

        window.open(waLink, "_blank");

    });

});


// ================= COUNTER =================
const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {

    const target = parseInt(counter.dataset.target);
    let current = 0;

    const increment = target / 180;

    const timer = setInterval(() => {

        current += increment;

        if (current < target) {

            let displayValue = Math.floor(current);

            // gems
            if (counter.classList.contains("gems-counter")) {

                counter.innerText =
                    displayValue.toLocaleString("id-ID") + "M";

            }

            // rss
            else if (target >= 1000) {

                counter.innerText =
                    displayValue.toLocaleString("id-ID") + "B";

            }

            // normal
            else {

                counter.innerText = displayValue;

            }

        } else {

            clearInterval(timer);

            // gems
            if (counter.classList.contains("gems-counter")) {

                counter.innerText =
                    target.toLocaleString("id-ID") + "M+";

            }

            // rss
            else if (target >= 1000) {

                counter.innerText =
                    target.toLocaleString("id-ID") + "B+";

            }

            // normal
            else {

                counter.innerText = target + "+";

            }

        }

    }, 30);

}


// ================= COUNTER OBSERVER =================
const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (
            entry.isIntersecting &&
            !entry.target.classList.contains("counted")
        ) {

            const counter =
                entry.target.querySelector(".counter");

            if (counter) {

                animateCounter(counter);

                entry.target.classList.add("counted");

            }

        }

    });

}, {
    threshold: 0.3
});

document.querySelectorAll(".stat-card").forEach((card) => {
    counterObserver.observe(card);
});