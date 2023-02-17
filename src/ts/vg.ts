/* Skulle absolut kunna göra mer på dessa funktioner. 
Speciellt på den 3e som jag inte hunnit färdig med 
egentligen men tiden runnit ut så det får duga. 
Den skulle behöva brytas ut i många fler seperata funktioner.
 */


/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum Sort {
  PRICE_ASCENDING = "Stigande pris",
  PRICE_DECENDING = "Sjunkande pris",
  NAME_ALPHABETIC = "Alfabetisk ordning",
  NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string[],
    public price: number,
    public description: string
  ) {}
}

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  let copiedList = [...products];
  let sortedList: Product[] = [];
  
  switch (sort) {
    case Sort.PRICE_ASCENDING:
      sortedList = sortList("Price", copiedList).reverse();
      break;

    case Sort.PRICE_DECENDING:
      sortedList = sortList("Price", copiedList);
      break;

    case Sort.NAME_ALPHABETIC:
      sortedList = sortList("Name", copiedList);
      break;

    case Sort.NAME_ALPHABETIC_REVERSE:
      sortedList = sortList("Name", copiedList).reverse();
      break;

    default:
      sortedList = copiedList;
      break;
  }
  return sortedList;
}

function sortList(whichAttribute: string, products: Product[]): Product[] {
  return products.sort((p1, p2) => {
    if (whichAttribute === "Price") {
      if (p1.price < p2.price) {
        return 1;
      } else if (p1.price > p2.price) {
        return -1;
      }
      return 0;
    } else {
      if (p1.name < p2.name) {
        return 1;
      } else if (p1.name > p2.name) {
        return -1;
      }
      return 0;
    }
  });
}

/*
  2. Refaktorera funktionen createProductHtml :)
  */
class Cart {
  addToCart(i: number) {}
}
export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");

export function createProductHtml() {

  let quantity = cartList.reduce((previous: number, current: number) => previous + current);

  let floatingCart = document.getElementById("floatingcartnumber") as HTMLElement;
  floatingCart.innerHTML = `${quantity}`;

  for (let i = 0; i < productList.length; i++) {
    let dogProduct: HTMLDivElement = document.createElement("div");
    let dogImgContainer: HTMLDivElement = document.createElement("div");
    dogImgContainer.className = "dogimgcontainer";
    dogProduct.appendChild(dogImgContainer);
    let dogImg: HTMLImageElement = document.createElement("img");

    dogImg.src = productList[i].picture;
    dogImg.alt = productList[i].pictureAlt;

    dogImgContainer.appendChild(dogImg);
    let cartSymbolContainer: HTMLDivElement = document.createElement("div");
    cartSymbolContainer.className = "cartSymbolContainer";
    dogImgContainer.appendChild(cartSymbolContainer);

    let cartSymbol: HTMLElement = document.createElement("i");
    cartSymbol.className = "bi bi-bag-plus";
    cartSymbolContainer.appendChild(cartSymbol);

    let name: HTMLHeadingElement = document.createElement("h5");
    name.innerHTML = productList[i].name;
    dogProduct.appendChild(name);

    let price: HTMLHeadingElement = document.createElement("p");
    price.innerHTML = `$${productList[i].price}`;
    dogProduct.appendChild(price);

    let info: HTMLHeadingElement = document.createElement("p");
    info.innerHTML = productList[i].info;
    dogProduct.appendChild(info);

    productList[i].productSpec = false;

    attachEventListeners(dogImg, cartSymbolContainer, i, cartSymbol);

    switch (productList[i].category) {
      case 'sassy':
        let cat1: HTMLElement = document.getElementById("sassy") as HTMLElement;
        dogProduct.className = "dogproduct";
        cat1.appendChild(dogProduct);
        break;

      case 'kriminella':
        let cat2: HTMLElement = document.getElementById("kriminella") as HTMLElement;
        dogProduct.className = "dogproduct";
        cat2.appendChild(dogProduct);
        break;

      case 'singlar':
        let cat3: HTMLElement = document.getElementById("singlar") as HTMLElement;
        dogProduct.className = "dogproduct";
        cat3.appendChild(dogProduct);

      case 'puppy':
        let cat4: HTMLElement = document.getElementById("puppy") as HTMLElement;
        dogProduct.className = "dogproduct";
        cat4.appendChild(dogProduct);
        break;

      case 'oldies':
        let cat5: HTMLElement = document.getElementById("oldies") as HTMLElement;
        dogProduct.className = "dogproduct";
        cat5.appendChild(dogProduct);
        break;

      default:
        break;
    }
  }
  let listAsText = JSON.stringify(productList);
  localStorage.setItem("savedList", listAsText);
  sessionStorage.clear();
}

function attachEventListeners(dogImg: HTMLImageElement, cartSymbolContainer: HTMLDivElement, i: number, cartSymbol: HTMLElement) {
  dogImg.addEventListener("mouseover", () => {
    cartSymbolContainer.classList.add("hover");
    dogImg.classList.add("hover");
  });

  dogImg.addEventListener("mouseout", () => {
    dogImg.classList.remove("hover");
    cartSymbolContainer.classList.remove("hover");
  });

  dogImg.addEventListener("click", () => {
    productList[i].productSpec = !productList[i].productSpec;
    window.location.href = "product-spec.html#backArrow";
    let listAsText = JSON.stringify(productList);
    localStorage.setItem("savedList", listAsText);
  });

  cartSymbol.addEventListener("click", () => {
    let cart = new Cart();
    cart.addToCart(i);
  });
}

/*
  3. Refaktorera funktionen getfromstorage
  */
export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

function getFromStorage() {
  let cartArray: CartProduct[] = JSON.parse(localStorage.getItem("cartArray") || "");

  let getAmountContainerElement = document.getElementById("amount-checkout-container2") as HTMLDivElement;
  let amountText: HTMLTableCellElement = document.createElement("th");
  getAmountContainerElement.appendChild(amountText);
  amountText.innerHTML = "amount:";

  let getTitleContainerElement = document.getElementById("title-container") as HTMLTableRowElement;
  getTitleContainerElement.innerHTML = "<strong>products:</strong>";

  let getProductQuantityElement = document.getElementById("product-quantity") as HTMLTableRowElement;
  let quantityText: HTMLTableCellElement = document.createElement("th");
  getProductQuantityElement.appendChild(quantityText);
  quantityText.innerHTML = "change quantity:";

  let getCheckoutTotalSumElement = document.getElementById("title-total") as HTMLTableCellElement;
  let totalText: HTMLTableCellElement = document.createElement("th");
  getCheckoutTotalSumElement.appendChild(totalText);
  totalText.innerHTML = "total:";

  for (let i: number = 0; i < cartArray.length; i++) {
    let product: HTMLTableCellElement = document.createElement("th");
    getTitleContainerElement.appendChild(product);
    product.innerHTML = cartArray[i].name;
    product.className = "product";

    let amount: HTMLTableCellElement = document.createElement("th");
    getAmountContainerElement.appendChild(amount);
    amount.innerHTML = `x${cartArray[i].amount}`;
    amount.className = "amount";

    let changeAmount: HTMLTableCellElement = document.createElement("th");
    getProductQuantityElement.appendChild(changeAmount);
    changeAmount.className = "change_amount";

    let addIcon: HTMLSpanElement = document.createElement("i");
    let addAmountBtn: HTMLButtonElement = document.createElement("button");
    addAmountBtn.appendChild(addIcon);
    changeAmount.appendChild(addAmountBtn);
    addIcon.className = "fas fa-plus";
    addAmountBtn.className = "plusbtn";

    let subtractIcon: HTMLSpanElement = document.createElement("i");
    let subtractAmountBtn: HTMLButtonElement = document.createElement("button");
    subtractAmountBtn.appendChild(subtractIcon);
    changeAmount.appendChild(subtractAmountBtn);
    subtractIcon.className = "fas fa-minus";
    subtractAmountBtn.className = "minusbtn";
  }

  let addition: number = 0;

  for (let i = 0; i < cartArray.length; i++) {
    addition += cartArray[i].price *= cartArray[i].amount;
  }

  let totalSumPrice: HTMLTableCellElement = document.createElement("th");
  getCheckoutTotalSumElement.appendChild(totalSumPrice);
  totalSumPrice.innerHTML = `${addition}$`;
  totalSumPrice.id = "totalincenter";
}
