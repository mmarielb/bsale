let productList = [];
let carrito = [];
let total = 0;

function add(productId, price) {
  const product = productList.find((p) => p.id === productId);
  product.discount--;

  console.log(productId, price);
  carrito.push(productId);
  total = total + price;
  document.getElementById("checkout").innerHTML = `Pagar $${total}`;
  displayProducts();
}

async function pay() {
  try {
    const productList = await (
      await fetch("/api/pay", {
        method: "post",
        body: JSON.stringify(carrito),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
  } catch {
    window.alert("Sin stock");
  }

  carrito = [];
  total = 0;
  await fetchProducts();
  document.getElementById("checkout").innerHTML = `Pagar $${total}`;
}

//-----
function displayProducts() {
  let productsHTML = "";
  productList.forEach((p) => {
    let buttonHTML = `<button class="button-add" onclick="add(${p.id}, ${p.price})">shopping_cart</button>`;

    if (p.discount <= 0) {
      buttonHTML = `<button disabled class="button-add disabled" onclick="add(${p.id}, ${p.price})">remove_shopping_cartk</button>`;
    }

    if (p.url_image === null || !p.url_image) {
      p.url_image =
        "https://st.depositphotos.com/1987177/3470/v/600/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg";
    }

    productsHTML += `<div class="product-container">
            <h3>${p.name}</h3>
            <img src="${p.url_image}" />
            <h1>$${p.price}</h1>
            ${buttonHTML}
        </div>`;
  });
  document.getElementById("page-content").innerHTML = productsHTML;
}

async function fetchProducts() {
  productList = await (await fetch("/api/products")).json();
  displayProducts();
}

window.onload = async () => {
  await fetchProducts();
};
