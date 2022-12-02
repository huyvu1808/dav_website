let total = document.getElementById("total_products");
let ShoppingCart = document.getElementById("display_table")

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
            <tr id="shop_products">
                <td class="product_display">
                    <img class="item_pic" src="${search.img}" alt="" />
                    <p class="text_display">${search.name} 	&#160;<small class="x">x</small>${item}
                </td>
                <td class="total_display">$${item * search.price}.00</td>
            </tr>
            `;
            })
            .join(""));
    } else {
        ShoppingCart.innerHTML = ``;
        total.innerHTML = `
        `;
    }
};

generateCartItems();

let TotalAmount = () => {
    if(basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        total.innerHTML = `
        <p class="basket_total_title">Total</p>
        <p class="basket_total_price">$${amount}.00</p>
        `;
    } else return;
};

TotalAmount();

function validate() {
    var zip = document.getElementById("zip").value;
	var creditcard1 = document.getElementById("creditcard1").value;
	var cardholder = document.getElementById("cardholder").value;
	var creditcard = document.getElementById("creditcard").value;
	var year = document.getElementById("year").value;
	var cvv = document.getElementById("cvv").value;
    var contact = document.getElementById("contact").value;


	let errMsg = "";
	var result = true;
	var number = /^\d+$/;
    var check;
	if ( !(check = cardholder.match(/[A-Z]/g)))
		errMsg += "Name on card must be written in uppercase letters.\n";
	if ( !(check = creditcard1.match(/^\d+$/)) || check.length < 15)
		errMsg += "Credit card must contain at least 15 numbers.\n";
	if ( !(check = creditcard.match(/^\d+$/)) || check.length < 16)
		errMsg += "Credit card must contain at least 16 numbers.\n";
	if ( !(check = zip.match(/^\d+$/)) || check.length < 4)
		errMsg += "Postcode or zip must contain at least 4 numbers.\n";
    if ( ! creditcard1.match (number)) {
        errMsg += "Credit card must be a number.\n";        
    }
    if ( ! creditcard.match (number)) {            
        errMsg += "Credit card must be a number.\n";
    }
    if ( ! cvv.match (number)) {
        errMsg += "CVV must be a number.\n";
    }
    if ( ! contact.match (number)) {
        errMsg += "Number of people must be a number.\n";
    }
    if ( ! zip.match (number)) {
        errMsg += "Postcode and zipcode must be a number.\n";
    }
    if ( ! year.match (number)) {
        errMsg += "Year must be a number.\n";
    }
    if ( !age.match (number)){
        errMsg += "Age must be a number.\n";
    }
    if (errMsg != "") {
        alert (errMsg);
        result = false;
    }
    return result;
}    

function init () {
    var regForm = document.getElementById("regform");
    regForm.onsubmit = validate;
}
  
window.onload = init;
  
function Show() {
    document.getElementById("cards_info").style.visibility = 'visible';
    document.getElementById("textinput5").style.visibility = 'visible';
    document.getElementById("textinput4").style.visibility = 'hidden';
}
  
function Show1() {
    document.getElementById("cards_info").style.visibility = 'visible';
    document.getElementById("textinput4").style.visibility = 'visible';
    document.getElementById("textinput5").style.visibility = 'hidden';
}
  
function Pay() {
    if (document.getElementById('onl').checked) {
        document.getElementById("payment_detail").style.visibility = 'visible';
    } else {
        document.getElementById("payment_detail").style.visibility = 'hidden';
        document.getElementById("cards_info").style.visibility = 'hidden';
        document.getElementById("textinput4").style.visibility = 'hidden';
        document.getElementById("textinput5").style.visibility = 'hidden';
    }
}
  
function Check() {
    if (document.getElementById('delivery').checked) {
        document.getElementById("shipping_method").style.visibility = 'visible';
    } else {
        document.getElementById("shipping_method").style.visibility = 'hidden';
    }
}
  
function addressFunction() {
    if (document.getElementById("same").checked && document.getElementById("deli").value == "") {
        alert("Please enter your delivery address first");
    } else if (document.getElementById("same").checked) {
        document.getElementById("bill").value =
        document.getElementById("deli").value;
    } else {
        document.getElementById("bill").value = "";
    }
}