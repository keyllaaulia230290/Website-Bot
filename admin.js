const ADMIN_PASSWORD = "ajrastore123";

const inputPassword = prompt("Enter admin password:");

if (inputPassword !== ADMIN_PASSWORD) {
    document.body.innerHTML = `
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            font-family:Arial;
            color:white;
            background:#08142e;
            font-size:24px;
        ">
            Access Denied
        </div>
    `;
    throw new Error("Unauthorized");
}

let orders = JSON.parse(localStorage.getItem("orders")) || {
    pending: [],
    processing: [],
    done: []
};

function saveOrders() {
    localStorage.setItem("orders", JSON.stringify(orders));
    renderAdmin();
}

function addOrder() {
    const id = document.getElementById("orderId").value;
    const text = document.getElementById("orderText").value;
    const status = document.getElementById("orderStatus").value;

    if (!id || !text) return;

    orders[status].push({
        id: Number(id),
        text: `#${id} - ${text}`
    });

    saveOrders();

    document.getElementById("orderId").value = "";
    document.getElementById("orderText").value = "";
}

function deleteOrder(status, index) {
    orders[status].splice(index, 1);
    saveOrders();
}

function moveOrder(oldStatus, index, newStatus) {
    const item = orders[oldStatus][index];

    orders[oldStatus].splice(index, 1);
    orders[newStatus].push(item);

    saveOrders();
}

function renderAdmin() {
    const adminList = document.getElementById("adminList");

    adminList.innerHTML = "";

    Object.keys(orders).forEach(status => {
        adminList.innerHTML += `
            <h3 style="margin:30px 0 12px">${status.toUpperCase()}</h3>
        `;

        orders[status].forEach((item, index) => {
            adminList.innerHTML += `
                <div class="queue-item">
                    ${item.text}

                    <button onclick="deleteOrder('${status}', ${index})">
                        Delete
                    </button>

                    ${
                        status !== "pending"
                            ? ""
                            : `<button onclick="moveOrder('pending', ${index}, 'processing')">
                                Start
                               </button>`
                    }

                    ${
                        status !== "processing"
                            ? ""
                            : `<button onclick="moveOrder('processing', ${index}, 'done')">
                                Done
                               </button>`
                    }
                </div>
            `;
        });
    });
}

function exportJSON() {
    const dataStr = JSON.stringify(orders, null, 2);

    const blob = new Blob([dataStr], {
        type: "application/json"
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "queue.json";
    a.click();
}

renderAdmin();