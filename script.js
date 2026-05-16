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

let orders = {};
let currentTab = "pending";
let currentPage = 1;
const perPage = 10;

const queueList = document.getElementById("queueList");
const pageInfo = document.getElementById("pageInfo");
const searchInput = document.getElementById("searchInput");

async function loadQueue() {
    orders = JSON.parse(localStorage.getItem("orders")) || {
        pending: [],
        processing: [],
        done: []
    };

    updateStats();
    renderQueue();
}

function updateStats() {
    document.querySelector(".queue-stats").innerHTML = `
        <div class="stat-mini">Pending: ${orders.pending.length}</div>
        <div class="stat-mini">Processing: ${orders.processing.length}</div>
        <div class="stat-mini">Done: ${orders.done.length}</div>
        <div class="stat-mini">
            Total: ${
                orders.pending.length +
                orders.processing.length +
                orders.done.length
            }
        </div>
    `;
}

function renderQueue() {
    let data = orders[currentTab] || [];

    const keyword = searchInput.value.toLowerCase();

    if (keyword) {
        data = data.filter(item =>
            item.text.toLowerCase().includes(keyword)
        );
    }

    const totalPages = Math.ceil(data.length / perPage) || 1;

    if (currentPage > totalPages) currentPage = 1;

    const start = (currentPage - 1) * perPage;
    const paginated = data.slice(start, start + perPage);

    queueList.innerHTML = "";

    paginated.forEach(item => {
        queueList.innerHTML += `
            <div class="queue-item">${item.text}</div>
        `;
    });

    pageInfo.innerText = `${currentPage} / ${totalPages}`;
}

document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        currentTab = btn.dataset.tab;
        currentPage = 1;

        renderQueue();
    });
});

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderQueue();
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    currentPage++;
    renderQueue();
});

searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderQueue();
});

loadQueue();