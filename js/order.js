const MENU_ITEMS = document.querySelectorAll('.menu .card');
const ORDER_TABLE = document.querySelector('#order-table tbody');
const TOTAL_TABLE = document.querySelector('#total-table tbody');
const SUBTOTAL_DISPLAY = document.querySelector('#subtotal');
const TAX_DISPLAY = document.querySelector('#tax-total');
const TOTAL_DISPLAY = document.querySelector('#total');
const SALES_TAX = 0.086;

let subtotal = 0;

const stringToNum = (str) => {
  return Number(str.replace(/[^0-9.]/g,""));
}

function addMenuItem(name, price) {
  updateTotal(price);
  price = '$' + price;
  let tr = document.createElement('tr');
  for (let arg of arguments) {
    let td = document.createElement('td');
    td.textContent = arg;
    tr.appendChild(td);
  }
  ORDER_TABLE.appendChild(tr);
}

const updateTotal = (price) => {
  subtotal += price;
  SUBTOTAL_DISPLAY.textContent = '$' + subtotal.toFixed(2);
  let taxTotal = (subtotal * SALES_TAX);
  TAX_DISPLAY.textContent = '$' + taxTotal.toFixed(2);
  let total = subtotal + taxTotal;
  TOTAL_DISPLAY.textContent = '$' + total.toFixed(2);
}

const validateFormOnSubmit = () => {
  if (!subtotal) {
    Materialize.toast('You must first select items to order!', 4000, 'red');
    return false;
  }

  let invalidParameters = [];
  let form = document.forms["order-data"];

  let name = form["name"].value;
  if (!name.length) {
    Materialize.toast('Please enter your name.', 4000, 'red');
    return false;
  }

  let phone = form["telephone"].value;
  console.log(phone);
  if (!phone.length || phone.match(/\d/g).length < 10) {
    Materialize.toast('Please enter your phone number with area code.', 4000, 'red');
    return false;
  }

  let address = form["address"].value;
  console.log(phone);
  if (!address.length) {
    Materialize.toast('Please enter your full address.', 4000, 'red');
    return false;
  }
  form["submit"].classList.add('disabled');
  Materialize.toast('Order submitted!', 4000, 'green',()=> {
    subtotal = 0;
    ORDER_TABLE.innerHTML = "";
    updateTotal(0);
    form["submit"].classList.remove('disabled');
  });

  return true;
}

window.onload = ()=> {

  for (let card of MENU_ITEMS) {
    let btn = card.querySelector('.card-action a');
    let name = card.querySelector('.card-title').textContent;
    let price = card.querySelector('.card-content p').textContent;
    price = stringToNum(price);
    btn.addEventListener('click',()=>{
      addMenuItem(name,price);
    });
  }
}
