// ambil semua elemen animasi
const animatedElements = document.querySelectorAll(
    ".hero h1, .hero p, .btn, .features h2, .features p, .feature-card, .pricing-section h2, .pricing-section p, .price-card"
);

// kasih hidden di awal
animatedElements.forEach((element) => {
    element.classList.add("hidden");
});

// observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

// observe semua element
animatedElements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(element);
});

// menu button
const menuBtn = document.getElementById("menuBtn");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        alert("Menu clicked!");
    });
}

// tombol beli
const buyButtons = document.querySelectorAll(".price-card button");

buyButtons.forEach((button) => {
    button.addEventListener("click", () => {
        alert("Redirecting to payment...");
    });
});

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 40) {
        navbar.style.background = "rgba(8, 20, 46, 0.97)";
        navbar.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
    } else {
        navbar.style.background = "rgba(8, 20, 46, 0.88)";
        navbar.style.boxShadow = "none";
    }
});

// dropdown menu
const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

menuBtn.addEventListener("click", () => {
    dropdownMenu.classList.toggle("active");
});

// close menu kalau klik luar
document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove("active");
    }
});