document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, img: 'https://images.pexels.com/photos/720606/pexels-photo-720606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', name: 'Product Name', des: 'A brief description of the product.', price: 29.99 },
        { id: 2, img: 'https://images.pexels.com/photos/720606/pexels-photo-720606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', name: 'Product Name', des: 'A brief description of the product.', price: 19.99 },
        { id: 3, img: 'https://images.pexels.com/photos/720606/pexels-photo-720606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', name: 'Product Name', des: 'A brief description of the product.', price: 39.99 },
        { id: 4, img: 'https://images.pexels.com/photos/720606/pexels-photo-720606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', name: 'Product Name', des: 'A brief description of the product.', price: 49.99 }
    ]

    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const productList = document.getElementById('product-list')
    const cartItems = document.getElementById('cart-item')
    const emptyCartMessage = document.getElementById('empty-cart')
    const cartTotalMessage = document.getElementById('cart-total')
    const totalPriceDisplay = document.getElementById('total-price')
    const checkoutBtn = document.getElementById('checkout-btn')

    products.forEach((product) => {
        const productDiv = document.createElement('div')
        productDiv.classList.add('product')
        productDiv.innerHTML = `
            <img src='${product.img}'/>
            <h3>${product.name}</h3>
            <p class='description'>${product.des}</p>
            <p class='price'>$${product.price.toFixed(2)}</p>
            <button data-id='${product.id}'>Add to Cart</button>
        `
        productList.appendChild(productDiv)
    })

    productList.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON'){
            const productId = parseInt(e.target.getAttribute('data-id'))
            const product = products.find(p => p.id === productId)
            addToCart(product)
        }
    })

    function addToCart(product){
        cart.push(product)
        saveTasks()
        renderCart()
    }

    function renderCart(){
        cartItems.innerText = ''
        let totalPrice = 0
        if (cart.length > 0) {
            emptyCartMessage.classList.add('hidden')
            cartTotalMessage.classList.remove('hidden')
            cart.forEach((item, i) => {
                totalPrice += item.price
                const cartItem = document.createElement('div')
                cartItem.classList.add('product')
                cartItem.innerHTML = `
                    <img src='${item.img}'/>
                    <h3>${item.name}</h3>
                    <p class='price'>$${item.price.toFixed(2)}</p>
                    <button class='remove' data-id='${item.id}'>Remove</button>
                `
                cartItems.appendChild(cartItem)
                totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`
            })
        } else {
            emptyCartMessage.classList.remove('hidden')
            totalPriceDisplay.textContent = `$0.00`
        }
    }

    renderCart()

    cartItems.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const itemId = parseInt(e.target.getAttribute('data-id'))
            const item = cart.findIndex(i => i.id === itemId)
            removeFromCart(item)
        }
    })

    function removeFromCart(item){
        console.log(item);
        console.log(cart);
        cart.splice(item, 1)
        saveTasks()
        renderCart()
    }

    function saveTasks() {
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    checkoutBtn.addEventListener('click', () => {
        cart.length = 0
        localStorage.removeItem('cart')
        alert('Checkout Successfully')
        renderCart()
    })
})