const urlAPI = "https://fakestoreapi.com/products/";

// Renderizar productos desde la API

fetch(urlAPI)
  .then((res) => res.json())
  .then((productos) => {
    const productosContainer = document.querySelector(".container-products");
    if (productosContainer) {
      productos.forEach((producto) => {
        const div = document.createElement("div");
        div.id = `product-${producto.id}`;
        const url_image = producto.image ? producto.image : "../img/product.svg";
        div.className = "product";
        div.innerHTML = `
          <div class='w-full h-[70%] p-5 bg-[#313134] overflow-hidden flex justify-center items-center'>
            <img 
            class="w-30 h-40  transform transition-transform duration-300 hover:scale-110"
            ${url_image!= null ? `src="${url_image}"`: `src="../img/product.svg"` } />
          </div>
          <div class='flex flex-col bg-[#1F1E23] w-full h-[30%] gap-1 text-left p-4'>
            <p class='text-[#ffffff] truncate overflow-hidden text-ellipsis max-w-[200px]'>${producto.title}</p>
            <span class='text-[#54B063]'>$${producto.price}</span>
          </div>
        `;
        productosContainer.appendChild(div);
      });
    }
  });


// Espera a que los productos se hayan renderizado antes de asignar los eventos
const productosContainer = document.querySelector(".container-products");
const productList = document.querySelector(".product-list");

if (productosContainer && productList) {
  productosContainer.addEventListener("click", function (e) {
    const product = e.target.closest(".product");
    if (product) {
      const name = product.querySelector("p").textContent;
      const price = product.querySelector("span").textContent;
      const url_image = product.querySelector("img").src;
      const id_producto = product.id;

      const existingLi = productList.querySelector(`#producto-${id_producto}`);
      if (existingLi) {
        const input = existingLi.querySelector("input.amount-product");
        input.value = parseInt(input.value) + 1;
        return;
      }

      // Crear elementos del li
      
      const container_image = document.createElement("div");
      const image = document.createElement("img");
      container_image.classList = "container-image-product-li";
      image.classList = "image-product-li";
      image.src = url_image;


      container_image.appendChild(image); 

      

      const container_info = document.createElement("div");
      container_info.classList = "flex flex-col gap-1";

      const li = document.createElement("li");
      li.className = "product-li";

      const name_p = document.createElement("p");
      name_p.className = "name-product-li";
      name_p.textContent = name;

      const input_container = document.createElement("div");
      input_container.className = "container-amount-product";
      const btn_less = document.createElement("button");
      btn_less.className = "btn-less";
      btn_less.textContent = "-";
      const input_quantity = document.createElement("input");
      input_quantity.type = "number";
      input_quantity.min = 1;
      input_quantity.max = 99;
      input_quantity.value = 1;
      input_quantity.className = "amount-product";
      const btn_add = document.createElement("button");
      btn_add.className = "btn-add";
      btn_add.textContent = "+";
      input_container.appendChild(btn_less);
      input_container.appendChild(input_quantity);
      input_container.appendChild(btn_add);

      const price_span = document.createElement("span");
      price_span.textContent = price;

      container_info.appendChild(name_p);
      container_info.appendChild(price_span);
      li.id = `producto-${id_producto}`;
      li.appendChild(container_image);
      li.appendChild(container_info);
      li.appendChild(input_container);

      productList.appendChild(li);
    }
  });
}


// Borrar productos del carrito
const btnDelete = document.querySelector(".btn-delete-all");
if (btnDelete) {
  btnDelete.addEventListener("click", () => {
    const div = document.querySelector(".product-list");
    if (div) div.replaceChildren();
  });
}
