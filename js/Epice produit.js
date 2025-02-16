// Initialisation du tableau du panier (depuis le localStorage si disponible)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fonction pour ajouter un produit au panier
function addToCart(productName, productPrice) {
    // Ajouter le produit au tableau du panier
    const product = { name: productName, price: productPrice };
    cart.push(product);

    // Stocker le panier mis à jour dans le localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Message de confirmation
    alert(productName + " a été ajouté au panier.");

    // Mettre à jour l'affichage et l'état du bouton "Terminer"
    updateCartDisplay();
    updateFinishButtonState();
}

// Fonction pour retirer un produit du panier
function removeFromCart(productName) {
    // Supprimer le premier produit qui correspond au nom donné
    const productIndex = cart.findIndex(product => product.name === productName);
    if (productIndex !== -1) {
        cart.splice(productIndex, 1); // Retirer l'article du tableau
        localStorage.setItem('cart', JSON.stringify(cart)); // Mettre à jour le localStorage

        // Message de confirmation
        alert(productName + " a été retiré du panier.");

        // Mettre à jour l'affichage et l'état du bouton "Terminer"
        updateCartDisplay();
        updateFinishButtonState();
    }
}

// Fonction pour activer/désactiver le bouton "Terminer"
function updateFinishButtonState() {
    const finishButton = document.getElementById("finish-button");
    if (cart.length > 0) {
        finishButton.disabled = false; // Activer le bouton si le panier n'est pas vide
    } else {
        finishButton.disabled = true; // Désactiver le bouton si le panier est vide
    }
}

// Fonction pour mettre à jour l'affichage du panier
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    if (cartItemsContainer && totalPriceElement) {
        // Vider l'affichage actuel
        cartItemsContainer.innerHTML = "";

        // Afficher chaque article dans le panier avec un bouton pour le retirer
        let totalPrice = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.className = "cart-item";
            itemElement.innerHTML = `
                <span>${item.name} - ${item.price} FCFA</span>
                <button class="remove-button" onclick="removeFromCart('${item.name}')">Retirer</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price;
        });

        // Mettre à jour le total
        totalPriceElement.textContent = totalPrice + " FCFA";
    }
}

// Charger l'état initial à l'ouverture de la page
document.addEventListener("DOMContentLoaded", () => {
    updateFinishButtonState();
    updateCartDisplay();
});



document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    
    // Vérifier si les éléments existent
    if (hamburger && menu) {
        hamburger.addEventListener("click", function () {
            menu.classList.toggle("visible"); // Afficher ou cacher le menu
        });
        
        // Fermer le menu si on clique en dehors (uniquement en mode mobile)
        document.addEventListener("click", function (event) {
            if (!menu.contains(event.target) && !hamburger.contains(event.target) && window.innerWidth <= 768) {
                menu.classList.remove("visible");
            }
        });
        
        // Assurer que le menu reste visible sur les grands écrans
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                menu.classList.add("visible");
            } else {
                menu.classList.remove("visible");
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const miniBtn = document.querySelector('.mini-btn');
    const domainList = document.querySelector('#domain-list');

    // Toggle l'affichage de la liste
    miniBtn.addEventListener('click', () => {
        domainList.classList.toggle('show');
    });

    // Cacher la liste si on clique ailleurs
    document.addEventListener('click', (e) => {
        if (!miniBtn.contains(e.target) && !domainList.contains(e.target)) {
            domainList.classList.remove('show');
        }
    });
});