import Web3 from 'web3';
import configuration from '../build/contracts/Marketplace.json';
import 'bootstrap/dist/css/bootstrap.css';
import Water from './images/Water.png';
import Cheese from './images/Cheese.png';
import Milk from './images/Milk.png';
import Fillet from './images/Fillet.png';
import Tomato from './images/Tomato.png';
import Onion from './images/Onion.png';
import Beer from './images/Beer.png';


const createElementFromString = (string) => {
  const el = document.createElement('div');
  el.innerHTML = string;
  return el.firstChild;
};

const CONTRACT_ADDRESS =
  configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(
  Web3.givenProvider || 'http://127.0.0.1:7545'
);
const contract = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS
);

let account;

const accountEl = document.getElementById('account');
const productsEl = document.getElementById('products');       


const buyProduct = async (product,quantity) => {
  await contract.methods.buyProduct(product.id,quantity.value) 
    .send({ 
      from: account,
      value: product.price * quantity.value,
      to: contract.owner
    });
};

const refreshProducts = async () => {
  productsEl.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const product = await contract.methods.products(i).call();
    product.id = i;
    let prod;
    switch(product.name){
      case "Milk":
        prod = Milk;
        break;
      case "Water":
        prod = Water;
        break;
      case "Beer":
        prod = Beer;
        break;
      case "Fillet":
        prod = Fillet;
        break;
      case "Onion":
        prod = Onion;
        break;
      case "Tomato":
        prod = Tomato;
        break; 
      case "Cheese":
        prod = Cheese;
        break;             
    }
    if (product.in_stock > 0) {
      const prodEl = createElementFromString(
        `<div class="product card" style="width: 18rem;">
          <img src=${prod}" class="card-img-top" width="200" height="200" alt="...">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${
              product.price / 1e18
            } Eth        Only ${product.in_stock} Left!</p>
            <button class="btn btn-primary">Buy Product</button> <input type ="number" placeholder="Quant." min = "1" max = "${product.in_stock}"/>
          </div>
        </div>`
      );
      let button = prodEl.getElementsByTagName('button')[0];
      button.onclick = buyProduct.bind(null,product,prodEl.getElementsByTagName('input')[0]);
      productsEl.appendChild(prodEl);
    }
  }
};

const main = async () => {
  const accounts = await web3.eth.requestAccounts();
  account = accounts[0];
  accountEl.innerText = account;
  await refreshProducts();
};

main();