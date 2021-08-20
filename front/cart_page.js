//gère la page panier
document.addEventListener('DOMContentLoaded', () => {
    //quand la page est prête
    getProducts();
    //récupérer les article du localStorade
    cart.init();
    //charger les articles du panier
    showCart();
});