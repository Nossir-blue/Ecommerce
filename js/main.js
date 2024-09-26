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
    // adicionar ao carrinho
    let addCart = document.getElementsByClassName('add-cart');
    for(let i = 0; i < addCart.length; i++){
        let button = addCart[i];
        button.addEventListener('click', addCartClicked)
    }
}

// remover item do carrinho
function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// quantityChanged

function quantityChanged(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}

// função adicionar carro
function addCartClicked(event){
    let button = event.target;
    let shopProducts = button.parentEelement;
    let title = shopProducts.getElementsByClassName("product-title").innerText;
    let price = shopProducts.getElementsByClassName("price"),innerText;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg){
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(let i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert('Tu já tens este ítem adicionado no carrinho');
            return;
        }
    }
    let cartBoxContent = `<img src="${productImg}" alt="cart-box" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">
                                ${title}
                            </div>
                            <div class="cart-price">
                                ${price}KZ
                            </div>
                            <input type="number" name="" id="" value="1" class="cart-quantity">
                        </div>
                        <!-- remover item -->
                        <box-icon class="bx bx-trash-alt cart-remove" name='x'></box-icon>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

// atualizar total
function updateTotal(){
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    for(let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace('KZ',''));
        let quantity = quantityElement.value;
        total += price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = total + "KZ";
}