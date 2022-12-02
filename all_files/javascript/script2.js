let total = document.getElementById("total_items");
let ShoppingCart = document.getElementById("total_table")

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("no_count");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
    if(basket.length !== 0) {
        return (ShoppingCart.innerHTML = basket
            .map((x) => {
                let {id, item} = x;
                let search = shopItemsData.find((y) => y.id === id) || [];
                return `
            <tr id="shopping_items">
                <td class="item_remove">
                    <i onclick="removeItem(${id})" class="fa-solid fa-circle-xmark"></i>
                    <img class="item_pic" src="${search.img}" alt="" />
                </td>
                <td class="item_title">${search.name}</td>
                <td class="item_price">$${search.price}.00</td>
                <td class="item_quantity">
                    <div class="quantity_change">
                        <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="fa-solid fa-plus"></i>                   
                    </div>
                </td>
                <td class="item_total">$${item * search.price}.00</td>
            </tr>
            `;
            })
            .join(""));
    } else {
        ShoppingCart.innerHTML = ``;
        total.innerHTML = `
        <i onclick="clearCart()" class="fa-solid fa-trash-can"></i>
        `;
    }
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
    if(basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        total.innerHTML = `
        <p class="basket_total">Basket Total &#160; &#160; &#160; &#160; $${amount}.00</p>
        <i onclick="clearCart()" class="fa-solid fa-trash-can"></i>
        `;
    } else return;
};

TotalAmount();
