const urlAPI = "https://fakestoreapi.com/products/";

function comprobarConexionAPI(url) {
  fetch(url)
    .then(response => {
      if (response.ok) {
        console.log("Conexión exitosa con el API.");
        return true;
      } else {
        console.error("Error en la conexión con el API:", response.status);
        return false;
      }
    })
    .catch(error => {
      console.error("No se pudo conectar con el API:", error);
      return false;
    });
}
// Devuelve la lista de facturas guardadas en localStorage


function obtenerFacturas() {
  const facturas = localStorage.getItem('facturas');
  if (!facturas) return [];
  return JSON.parse(facturas);
}
// Guardar factura localmente al hacer click en el botón facturar
const btnFacturar = document.querySelector('.btn-facturar');
if (btnFacturar) {
  btnFacturar.addEventListener('click', () => {
    // Genera un id único para la factura
    const id = Date.now().toString() + Math.floor(Math.random() * 10000).toString();
    const productLis = document.querySelectorAll('.product-li');
    const productosFactura = [];
    productLis.forEach(li => {
      const nombre = li.querySelector('.name-product-li')?.textContent || '';
      const precio = li.querySelector('span')?.textContent || '';
      const cantidad = li.querySelector('input.amount-product')?.value || '1';
      productosFactura.push({ nombre, precio, cantidad });
    });
    const fechaHora = new Date().toLocaleString();
    // Calcular el total
    let total = 0;
    productosFactura.forEach(p => {
      const precioNum = Number(p.precio.replace(/[^\d.-]/g, ''));
      total += precioNum * Number(p.cantidad);
    });
    const factura = {
      id,
      productos: productosFactura,
      fecha: fechaHora,
      total: total.toFixed(2)
    };
    let facturas = JSON.parse(localStorage.getItem('facturas') || '[]');
    facturas.push(factura);
    localStorage.setItem('facturas', JSON.stringify(facturas));
    alert('Factura guardada localmente.');
    handdlerDelete();
  });
}




// Ejemplo de uso:
comprobarConexionAPI("https://fakestoreapi.com/products/");

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


  
  const productList = document.querySelector(".product-list");
  const totalcost_p = document.getElementById("total-price");
  const product_li = document.getElementsByClassName("product");

  const totalcost = () => {
    const totalcost_p = document.getElementById("total-price");
    if (!totalcost_p) return;

    const product_li = document.querySelectorAll(".product-li"); // productos agregados dinámicamente
    let total_cost = 0;

    product_li.forEach(producto => {
      // Busca el span con el precio
      const priceEl = producto.querySelector("span");
      // Busca el input con la cantidad
      const quantityEl = producto.querySelector("input.amount-product");

      // Extrae el número del precio
      const price = priceEl ? Number(priceEl.textContent.replace(/[^\d.-]/g, '')) : 0;
      // Extrae la cantidad
      const quantity = quantityEl ? Number(quantityEl.value) : 1;

      total_cost += price * quantity;
    });

    totalcost_p.textContent = `$${total_cost.toFixed(2)}`;
  };

  // Actualiza el total cada vez que cambie la cantidad
  document.addEventListener("input", function(e) {
    if (e.target.classList.contains("amount-product")) {
      totalcost();
    }
  });



  
  const productosContainer = document.querySelector(".container-products");
// Espera a que los productos se hayan renderizado antes de asignar los eventos

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
        totalcost();
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
      btn_less.addEventListener("click",() => {
        if(input_quantity.value != 1){
        input_quantity.value = input_quantity.value - 1;
        totalcost();
        }else{
          li.remove();
          totalcost();
        }
      });
      btn_less.className = "btn-less";
      btn_less.textContent = "-";
      const input_quantity = document.createElement("input");
      input_quantity.type = "number";
      input_quantity.min = 1;
      input_quantity.max = 99;
      input_quantity.value = 1;
      input_quantity.className = "amount-product";
      const btn_add = document.createElement("button");
      btn_add.addEventListener("click",() => {
      if(input_quantity.value != 99){
        input_quantity.value = ++input_quantity.value;
        }
        totalcost();
      });
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
      totalcost();
    }
  });
}


// Borrar productos del carrito
const btnDelete = document.querySelector(".btn-delete-all");



const handdlerDelete = () =>{
  const div = document.querySelector(".product-list");
    if (div) div.replaceChildren();
    totalcost();
}






// const urlAPI = "https://fakestoreapi.com/products/";