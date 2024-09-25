/* abrir e fechar carrinho */
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
// abrir carrinho
cartIcon.onclick = () => {
    cart.classList.add("active");
}
// fechar carrinho
closeCart.onclick = () => {
    cart.classList.remove("active");
}

// adicionat ao carrinho

// carrinho funcional
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// funções
function ready(){
    // remover item do carrinho
    let removeCartButtons = document.getElementsByClassName('cart-remove');
    for(let i = 0; i < removeCartButtons.length; i++){
        let button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }
    // mudar quantidade
    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for(let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged)
    }
}

// remover item do carrinho
function removeCartItem(event){
    let butotnClicked = event.target;
    butotnClicked.parentElement.remove();
}

// quantityChanged

function quantityChanged(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}

// atualizar total
function updateTotal(){
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box')[0];
    let total = 0;
    for(let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace('KZ',''));
        let quantity = quantityElement.value;
        total += price * quantity;

        document.getElementsByClassName('total-price')[0].innerText = total + "KZ";
    }
}