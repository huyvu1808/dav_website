var counter = 1;
setInterval(function() {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 3) {
       counter = 1;
    }
}, 4000);

const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav li a').forEach(link =>{
    if(link.href.includes(`${activePage}`)){
        link.classList.add('active')
    }
})

let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let {id, name, price, type, img} = x;
            let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=product_id_${id} class="products ${type}">
            <img src=${img} style="cursor: pointer;" class="product_pic">
            <p class="product_text">${name}</p>
            <p class="product_price" data-price="${price}">$${price}.00</p>
            <div class="quantity_change">
                <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                <i onclick="increment(${id})" class="fa-solid fa-plus"></i>                   
            </div>
        </div>
        `;
    }).join(""));
};

generateShop();

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
    //console.log(basket);
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
    //console.log(basket);

    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};


let calculation = () => {
    let cartIcon = document.getElementById("no_count");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
};

calculation();

$(document).ready(function(){
    $('.list').click(function(){
        const value = $(this).attr('data-filter');
        if (value == 'all') {
            $('.products').show('1000');
        } else {
            $('.products').not('.' + value).hide('1000');
            $('.products').filter('.' + value).show('1000');
        }
    })
})

function asc(){
    var gridItems = jQuery(".products");
    gridItems.sort(function(a, b){
        return (
            jQuery(".product_price", a).data("price") - jQuery(".product_price", b).data("price")
        );
    });
    jQuery(".all_products").append(gridItems);
}

function des(){
    var gridItems = jQuery(".products");
    gridItems.sort(function(a, b){
        return (
            jQuery(".product_price", b).data("price") - jQuery(".product_price", a).data("price")
        );
    });
    jQuery(".all_products").append(gridItems);
}

function main(){
    var sorting = jQuery("#select").val();
    if (sorting == "LowToHigh"){
        asc();
    } else if (sorting == "HighToLow"){
        des();
    } else {
        generateShop();
    }
}

jQuery("#select").change(function(){
    main();
});

function switchForm(className, e) {
	e.preventDefault();
	const allForm = document.querySelectorAll('form');
	const form = document.querySelector(`form.${className}`);

	allForm.forEach(item=> {
		item.classList.remove('active');
	})
	form.classList.add('active');
}
