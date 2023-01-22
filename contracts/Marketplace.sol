pragma solidity ^0.8.0;

contract Marketplace {
  address public owner = msg.sender;
  uint public test = 0;
  struct Product {
    string name;
    uint256 price;
    uint in_stock;
  }

    mapping (uint => Product) public products;

  constructor() {
    products[0] = Product("Water",1e17,10);
    products[1] = Product("Beer",1e17,10);
    products[2] = Product("Cheese",1e17,10);
    products[3] = Product("Fillet",1e17,10);
    products[4] = Product("Onion",1e17,10);
    products[5] = Product("Tomato",1e17,10);
    products[6] = Product("Milk",1e17,10);
  }

  function buyProduct(uint256 _index,uint quantity) external payable {
    require(_index < 7 && _index >= 0);
    require(msg.value >= products[_index].price);
    require(products[_index].in_stock >= quantity);
    products[_index].in_stock-=quantity;
  }

  function restockProduct(uint prod_id, uint quantity) external{
      require(prod_id < 7 && prod_id >= 0);
      products[prod_id].in_stock +=quantity;
  }

  function repriceProduct(uint prod_id, uint price) external{
      require(prod_id < 7 && prod_id >= 0);
      require(price > 0);
      products[prod_id].price = price*1e17;
  }
}