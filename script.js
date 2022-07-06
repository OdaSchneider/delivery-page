let basket = [];
let price = [];
let amount = [];


function render() {
    menuPopular();
    menuStarter();
    menuSalad();
    menuPizza();
    menuPasta();
    menuAlforno();
    menuDessert();
    menuNonalc();
    menuAlc();
    renderBasket();
}


function menuPopular() {
    let menuPop = document.getElementById('popular');
    menuPop.innerHTML = '';
    for (let i = 0; i < popular.length; i++) {
        let dish = popular[i];
        menuPop.innerHTML += templateDish(dish);
    }
}


function menuStarter() {
    let menuStarter = document.getElementById('starter');
    menuStarter.innerHTML = '';
    for (let i = 0; i < starter.length; i++) {
        let dish = starter[i];
        menuStarter.innerHTML += templateDish(dish);
    }
}


function menuSalad() {
    let menuSalad = document.getElementById('salad');
    menuSalad.innerHTML = '';
    for (let i = 0; i < salad.length; i++) {
        let dish = salad[i];
        menuSalad.innerHTML += templateDish(dish);
    }
}


function menuPizza() {
    let menuPizza = document.getElementById('pizza');
    menuPizza.innerHTML = '';
    for (let i = 0; i < pizza.length; i++) {
        let dish = pizza[i];
        menuPizza.innerHTML += templateDish(dish);
    }
}


function menuPasta() {
    let menuPasta = document.getElementById('pasta');
    menuPasta.innerHTML = '';
    for (let i = 0; i < pasta.length; i++) {
        let dish = pasta[i];
        menuPasta.innerHTML += templateDish(dish);
    }
}


function menuAlforno() {
    let menuAlforno = document.getElementById('alforno');
    menuAlforno.innerHTML = '';
    for (let i = 0; i < alforno.length; i++) {
        let dish = alforno[i];
        menuAlforno.innerHTML += templateDish(dish);
    }
}


function menuDessert() {
    let menuDessert = document.getElementById('dessert');
    menuDessert.innerHTML = '';
    for (let i = 0; i < dessert.length; i++) {
        let dish = dessert[i];
        menuDessert.innerHTML += templateDish(dish);
    }
}


function menuNonalc() {
    let menuNonalc = document.getElementById('nonalc');
    menuNonalc.innerHTML = '';
    for (let i = 0; i < nonalcdrinks.length; i++) {
        let dish = nonalcdrinks[i];
        menuNonalc.innerHTML += templateDish(dish);
    }
}


function menuAlc() {
    let menuAlc = document.getElementById('alc');
    menuAlc.innerHTML = '';
    for (let i = 0; i < alcdrinks.length; i++) {
        let dish = alcdrinks[i];
        menuAlc.innerHTML += templateDish(dish);
    }
}


function templateDish(dish) {
    return `
    <div class='menu hide'>
        <div class='dishes'>
            <h4>${dish['name']}</h4>
            <p1>${dish['description']}</p1><br>
            <p2>${dish['price']} €</p2>
        </div>
        <button class='menuButton' onclick='addBasket("${dish['name']}", "${dish['price']}")'>
            <img src='images/icon/plus.ico'>
        </button>
    </div>`;
}


function renderBasket() {
    load();
    let purchase = document.getElementById('purchase');
    purchase.innerHTML = '';

    for (let i = 0; i < basket.length; i++) {
        let name = basket[i];
        let a = price[i];
        let q = amount[i];
        let toPay = Number(a.replace(",", ".")) * Number(q);
        purchase.innerHTML += templateBasket(name, toPay.toFixed(2).replace(".", ","), q, i);
    }
    startNoteBasket();
    showBill();
}


function templateBasket(name, toPay, q, i) {
    return `
    <div class="order">
        <h4>${name}</h4>
        <p id="sum">${toPay} €</p>
    </div>
    <div class="quantity">
        <button onclick="removeItem(${i})"><img src="images/icon/minus.ico"></button>
        <p id="amount">${q}</p>
        <button onclick="addItem(${i})"><img src="images/icon/plus.ico"></button>
    </div>
    `
}


function addBasket(name, toPay) {
    if (basket.includes(name)) {
        let i = basket.indexOf(name);
        amount[i]++;
    } else {
        let q = 1;

        basket.push(name);
        price.push(toPay);
        amount.push(q);
    }
    save();
}


function save() {
    let basketStorage = JSON.stringify(basket);
    localStorage.setItem('basket', basketStorage);

    let priceStorage = JSON.stringify(price);
    localStorage.setItem('price', priceStorage);

    let amountStorage = JSON.stringify(amount);
    localStorage.setItem('amount', amountStorage);
    load();
    renderBasket();
}


function load() {
    let basketStorage = localStorage.getItem('basket');
    if (basketStorage) {
        basket = JSON.parse(basketStorage);
    }

    let priceStorage = localStorage.getItem('price');
    if (priceStorage) {
        price = JSON.parse(priceStorage);
    }

    let amountStorage = localStorage.getItem('amount');
    if (amountStorage) {
        amount = JSON.parse(amountStorage);
    }
}


function removeItem(i) {
    if (amount[i] == 1) {
        deleteItem(i);
    } else {
        amount[i]--;
    }
    save();
}


function addItem(i) {
    amount[i]++;
    save();
}


function deleteItem(i) {
    basket.splice(i, 1);
    price.splice(i, 1);
    amount.splice(i, 1);
    save();
}


function openInfo() {
    let body = document.body;
    body.style.overflow = 'hidden';
    document.getElementById('info').classList.remove('d-none');
}


function closeInfo() {
    let body = document.body;
    body.style.overflow = 'unset';
    document.getElementById('info').classList.add('d-none');
}


function noAction(event) {
    event.stopPropagation();
}


function openInput() {
    document.getElementById('search').classList.remove('d-none');
}


function closeInput() {
    document.getElementById('input').value = '';
    document.getElementById('search').classList.add('d-none');
    let search = document.getElementsByClassName('hide');
    for (i = 0; i < search.length; i++) {
        search[i].style.display = '';
    }
}


function startNoteBasket() {
    if (basket.length < 1) {
        document.getElementById('startNote').classList.remove('d-none');
    } else {
        document.getElementById('startNote').classList.add('d-none');
    }
}

function showBill() {
    if (basket.length < 1) {
        document.getElementById('bill').classList.add('d-none');
    } else {
        document.getElementById('bill').classList.remove('d-none');
    }

    let sum = 0;
    let delivery = 2.50;

    for (let i = 0; i < price.length; i++) {
        let a = price[i];
        let b = amount[i];
        x = Number(a.replace(",", ".")) * Number(b);
        sum = sum + x;
    }

    let sumAsString = sum.toFixed(2);
    let total = sum + delivery;
    let totalAsString = total.toFixed(2);

    let bill = document.getElementById('bill');
    bill.innerHTML = '';

    bill.innerHTML = templateBill(sumAsString, totalAsString);
}

function templateBill(sum, total) {
    return `
    <div class="flexBill">
        <p1>Zwischensumme</p1>
        <p2>${sum.replace(".", ",")} €</p2>
    </div>
    <div class="flexBill">
        <p1>Lieferkosten</p1>
        <p2>2,50 €</p2>
    </div>
    <div class="flexBill">
        <b1>Gesamt</b1>
        <b2>${total.replace(".", ",")} €</b2>
    </div>
    <button class='orderButton' onclick='openOrderConfirmation()'>Bestellen für ${total.replace(".", ",")} €</button>`
}


function search() {
    let input = document.getElementById('input');
    let filter = input.value.toLocaleLowerCase();
    let search = document.getElementsByClassName('hide');

    for (i = 0; i < search.length; i++) {
        if (search[i].innerText.toLowerCase().includes(filter)) {
            search[i].style.display = '';
        } else {
            search[i].style.display = "none";
        }
    }
}


window.onscroll = function () {
    if (window.scrollY > 80) {
        document.getElementById('basket').style = 'top: 0px';
    }
    if (window.scrollY < 80) {
        let elementToMove = document.getElementById('basket');
        let scroll = 80 - scrollY;
        elementToMove.style.top = `${scroll}px`;
    }
}


function openOrderConfirmation() {
    let body = document.body;
    body.style.overflow = 'hidden';
    document.getElementById('orderConfirmation').classList.remove('d-none');
    document.getElementById('orderConfirmation').innerHTML = '';
    document.getElementById('orderConfirmation').innerHTML = `
    <div class='orderDialog' onclick='noAction'>
        Vielen Dank für deine Bestellung! Wir sind gleich bei dir
    </div>`;
}


function closeOrderConfirmation() {
    let body = document.body;
    body.style.overflow = 'unset';
    document.getElementById('orderConfirmation').classList.add('d-none');
}


function language() {
    alert('Derzeit steht nur Deutsch zur Verfügung. Wir arbeiten an weiteren Sprachen für dich.');
}