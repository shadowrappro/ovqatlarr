const customerList = document.querySelector(".customers-list");
const orderList = document.querySelector(".orders-list");
const mainCustomerName = document.querySelector(".main-headers .customer-name");
const mainCustomerId = document.getElementById("clientId");
const addCustomerForm = document.querySelector(".navbar-footer form");
const addOrderForm = document.querySelector(".main-footer form");

let customers = JSON.parse(localStorage.getItem("customers")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function renderCustomers() {
    customerList.innerHTML = "";
    customers.forEach((customer, index) => {
        const li = document.createElement("li");
        li.classList.add("customer-item");
        li.innerHTML = `
            <span class="customer-name">${customer.name}</span>
            <a href="#" class="customer-phone">${customer.phone}</a>
        `;
        li.addEventListener("click", () => selectCustomer(index));
        customerList.appendChild(li);
    });
}

function renderOrders(customerId) {
    orderList.innerHTML = "";
    const customerOrders = orders.filter(order => order.customerId === customerId);
    customerOrders.forEach(order => {
        const div = document.createElement("div");
        div.classList.add("order-item");
        div.innerHTML = `
            <img src="${order.image}" alt="Order Image">
            <div>
                <span>${order.name}</span>
                <span>$${order.price}</span>
            </div>
        `;
        orderList.appendChild(div);
    });
}

function selectCustomer(index) {
    const customer = customers[index];
    mainCustomerName.textContent = customer.name;
    mainCustomerId.textContent = index + 1;
    renderOrders(index + 1);
}

addCustomerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nameInput = this.querySelector("input[type='text']");
    const phoneInput = this.querySelector("input[type='tel']");
    
    if (nameInput.value && phoneInput.value) {
        customers.push({ name: nameInput.value, phone: phoneInput.value });
        localStorage.setItem("customers", JSON.stringify(customers));
        renderCustomers();
        nameInput.value = "";
        phoneInput.value = "";
    }
});

addOrderForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const orderNameInput = this.querySelector("input[type='text']");
    const orderPriceInput = this.querySelector("input[type='number']");
    
    const customerId = parseInt(mainCustomerId.textContent);
    if (orderNameInput.value && orderPriceInput.value && customerId) {
        orders.push({
            customerId: customerId,
            name: orderNameInput.value,
            price: orderPriceInput.value,
            image: "img/combo.jpeg" 
        });
        localStorage.setItem("orders", JSON.stringify(orders));
        renderOrders(customerId);
        orderNameInput.value = "";
        orderPriceInput.value = "";
    }
});

renderCustomers();

