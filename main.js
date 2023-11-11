const categoryList = document.querySelector('#category-list');
// console.log(categoryList);
const productsList = document.getElementById("products");

const openButton = document.querySelector("#open-btn");
// console.log(openButton)

const closeButton = document.querySelector("#close-btn");
// console.log(closeButton)

const modal = document.getElementById("modal");

const modalList = document.querySelector(".modal-list");

const totalPrice = document.getElementById("total-price")

function fetchCategories() {

    fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((data) =>
            data.slice(0, 5).map((categoryy) => {
                const { category, image } = categoryy;

                // console.log(name)
                // console.log(image)

                const categoryDiv = document.createElement("div");

                categoryDiv.classList.add("category");

                categoryDiv.innerHTML = ` <img src=${image} alt="" /> 
            <span>${category}</span>`;

                // console.log(categoryDiv)

                categoryList.appendChild(categoryDiv);


            }))
        .catch((error) => console.log(error));
}

fetchCategories();

function fetchProducts() {

    fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((data) =>
            data.map((product) => {

                // console.log(product);

                const { title, price, category, image, id } = product;

                const productDiv = document.createElement("div");

                productDiv.classList.add("product");

                productDiv.innerHTML = ` <img src=${image} alt="" />
                    <p>${title}</p>
                    <p>${category}</p>
                    <div class="product-action">
                        <p>${price}$</p>
                        <button onclick="addToBasket({id:${id},title:'${title}',price:${price},image:'${image}',amount:1})">Add to Basket</button>
                    </div>
                    `;

                productsList.appendChild(productDiv);
            })
        )
        .catch((error) => console.log("api error", error))
}

fetchProducts();

let basket = [];
let total = 0;

// Add to cart operations
function addToBasket(product) {

    // console.log(product);
    const idsiAyniEleman = basket.find(
        (elementInBasket) => elementInBasket.id === product.id
    );

    if (idsiAyniEleman) {
        idsiAyniEleman.amount++;
    } else {
        basket.push(product);
    }
}

function showBasketItems() {

    basket.map((basketProduct) => {

        const listItem = document.createElement("div");

        listItem.classList.add("list-item");

        const { image, title, price, amount, id, } = basketProduct;

        listItem.innerHTML = `
            
            <img
            src=${image}
            alt=""
            />
            <h4>${title}</h4>
            <h4 class="price">${price}₺</h4>
            <p>Amount: ${amount}</p>
            <button class="delete-btn"  onclick='deleteItem({id:${id},price:${price},amount:${amount}})'>Delete</button>
            `;

        modalList.appendChild(listItem);

        total += price * amount;

        // console.log(total);
    });
}


// Basket opening and closing operations
openButton.addEventListener('click', () => {

    showBasketItems();
    modal.classList.add("active");
    totalPrice.innerText = total;
});

closeButton.addEventListener('click', () => {

    modal.classList.remove("active");
    modalList.innerHTML = '';
    total = 0;
    console.log(modal);
});

modal.addEventListener('click', (event) => {
    // console.log(event.target)

    if (event.target.classList.contains("modal-wrapper")) {
        modal.classList.remove("active");
    }
    // modal.classList.add("active");
});

function deleteItem(willDeleteItem){

    basket = basket.filter(
        (eleman) => eleman.id !== willDeleteItem.id
    )

    total -= willDeleteItem.price;
    
    totalPrice.innerText = total;

}

modalList.addEventListener("click", (clickEventInformation) => {

    if(clickEventInformation.target.classList.contains("delete-btn")){

        clickEventInformation.target.parentElement.remove();
    }

    if(basket.length === 0){
        modal.classList.remove("active");
    }
})