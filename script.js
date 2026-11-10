// Restaurant information and sample menus

const restaurants = [
    {
        name: "Salt 🧂 & Pepper 🌶",
        description: "Delicious local meals",
        menu: [
            {name: "Chicken and Chips", price: 65},
            {name: "Beef Burger", price: 55},
            {name: "Russian and Chips", price: 45},
            {name: "Grilled Chicken", price: 75}
        ]
    },
    {
        name: "Kwa Ace EKitcheni",
        description: "Traditional kitchen meals",
        menu: [
            {name: "Pap and Beef", price: 70},
            {name: "Pap and Chicken", price: 65},
            {name: "Chakalaka and Pap", price: 40},
            {name: "Beef Stew", price: 75}
        ]
    },
    {
        name: "Sasa Restaurant",
        description: "Fresh and tasty food",
        menu: [
            {name: "Chicken Platter", price: 85},
            {name: "Beef Burger", price: 60},
            {name: "Fish and Chips", price: 70},
            {name: "Wings and Chips", price: 65}
        ]
    },
    {
        name: "Spine Road Lifestyle",
        description: "Good food and lifestyle",
        menu: [
            {name: "Full Chicken", price: 150},
            {name: "Steak and Chips", price: 100},
            {name: "Pizza", price: 90},
            {name: "Chicken Wings", price: 70}
        ]
    },
    {
        name: "Sweet and Lovely",
        description: "Sweet treats and delicious food",
        menu: [
            {name: "Chocolate Cake", price: 35},
            {name: "Cupcakes", price: 20},
            {name: "Doughnuts", price: 15},
            {name: "Milkshake", price: 30}
        ]
    }
];

let cart = [];
let selectedRestaurant = "";

// Display restaurants

function displayRestaurants() {
    const container = document.getElementById("restaurant-list");

    container.innerHTML = "";

    restaurants.forEach((restaurant, index) => {
        container.innerHTML += `
            <div class="restaurant-card">
                <h3>${restaurant.name}</h3>
                <p>${restaurant.description}</p>
                <button onclick="showMenu(${index})">
                    View Menu
                </button>
            </div>
        `;
    });
}

// Display selected restaurant menu

function showMenu(index) {
    const restaurant = restaurants[index];

    selectedRestaurant = restaurant.name;

    document.getElementById("menu-title").innerText =
        restaurant.name + " - Menu";

    const container = document.getElementById("food-list");

    container.innerHTML = "";

    restaurant.menu.forEach((food, foodIndex) => {
        container.innerHTML += `
            <div class="food-card">
                <h3>${food.name}</h3>
                <p class="price">R${food.price.toFixed(2)}</p>
                <button onclick="addToCart(${index}, ${foodIndex})">
                    Add to Cart
                </button>
            </div>
        `;
    });

    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });
}

// Add food to cart

function addToCart(restaurantIndex, foodIndex) {
    const restaurant = restaurants[restaurantIndex];
    const food = restaurant.menu[foodIndex];

    const existing = cart.find(item =>
        item.name === food.name &&
        item.restaurant === restaurant.name
    );

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: food.name,
            price: food.price,
            restaurant: restaurant.name,
            quantity: 1
        });
    }

    displayCart();

    alert(food.name + " added to your cart!");
}

// Display cart

function displayCart() {
    const container = document.getElementById("cart-items");

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach((item, index) => {
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>${item.restaurant}</p>
                    <p>R${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>

                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    const total = cart.reduce((sum, item) =>
        sum + item.price * item.quantity, 0
    );

    document.getElementById("total").innerText =
        "Total: R" + total.toFixed(2);
}

// Remove food

function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}

// Place order through WhatsApp

function checkout() {
    if (cart.length === 0) {
        alert("Please add food to your cart first.");
        return;
    }

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    if (!name || !phone || !address) {
        alert("Please complete all delivery details.");
        return;
    }

    const total = cart.reduce((sum, item) =>
        sum + item.price * item.quantity, 0
    );

    let message = "NEW KHAYELITSHA EATS ORDER\n\n";

    message += "Customer: " + name + "\n";
    message += "Phone: " + phone + "\n";
    message += "Address: " + address + "\n\n";

    message += "ORDER DETAILS:\n";

    cart.forEach(item => {
        message +=
            item.restaurant + " - " +
            item.name + " x " +
            item.quantity + " = R" +
            (item.price * item.quantity).toFixed(2) + "\n";
    });

    message += "\nTOTAL: R" + total.toFixed(2);

    // Replace with your business WhatsApp number.
    // South African format: 27 followed by your number.
    const whatsappNumber = "27XXXXXXXXX";

    const whatsappURL =
        "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}

// Start website

displayRestaurants();
displayCart();
