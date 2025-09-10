
// Delegación de eventos para productos generados dinámicamente
const productosContainer = document.querySelector('.container-products');
if (productosContainer) {
	productosContainer.addEventListener('click', function(e) {
		const product = e.target.closest('.product');
		if (product) {
			const name = product.querySelector('p').textContent;
			const li = document.createElement('li');
			const divCantidad = document.createElement("div");
			const btnLess = document.createElement("button");
			const inputAmount = document.createElement("input");
			const btnAdd = document.createElement("button");
			// Añadir el nombre del producto
			btnLess.classList.add("btn-less");
			inputAmount.classList.add("product-li");		
			btnAdd.classList.add("btn-add");
			divCantidad.classList.add("flex");
			const span = document.createElement('span');
			span.textContent = name;
			divCantidad.appendChild(btnLess);
			divCantidad.appendChild(inputAmount);
			divCantidad.appendChild(btnAdd);
			li.appendChild(span);
			li.appendChild(divCantidad);
			// Estructura visual del li según el componente proporcionado
			li.className = 'flex gap-3 justify-between hover:bg-[#27272B] bg-[#00000020] py-2 px-5 rounded-md animation-all duration-300 cursor-pointer items-center';
			productList.appendChild(li);
		}
	});
}




// esta funcion se encarga de renderizar los productos en el contenedor
fetch('https://fakestoreapi.com/products/')
.then(res => res.json())
.then(productos => {
    const productosContainer = document.querySelector('.container-products');
    if (productosContainer) {
    	productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = "product flex flex-col hover:scale-[1.02] transition-transform duration-300 rounded-xl w-54 h-72 bg-[#00000030] border-b border-[#3B3A3F] border-[1px] overflow-hidden";
        div.innerHTML = `
    		<div class='w-full h-[70%] p-5 bg-[#1F1E23] flex justify-center items-center'>
            	<svg xmlns='http://www.w3.org/2000/svg' width='100px' height='100px' viewBox='0 0 24 24' fill='none' stroke='#656567' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m2 2 20 20'/><path d='M8.35 2.69A10 10 0 0 1 21.3 15.65'/><path d='M19.08 19.08A10 10 0 1 1 4.92 4.92'/></svg>
        	</div>
        <div class='flex flex-col w-52 h-[30%] gap-1 text-left p-4'>
            <p class='text-[#ffffff] text-overflow: ellipsis w-max-20 overflow-hidden'>${producto.title}</p>
            <span class='text-[#54B063]'>$${producto.price}</span>
        </div>
        `;
        productosContainer.appendChild(div);
    });
    }
});

const header = document.querySelector("header");
window.addEventListener("scroll", () => {
	if (window.scrollY > 0) {
		header.style.backgroundColor = "rgba(31,30,35,0.5)";
		header.classList.add("backdrop-blur-sm");
	} else {
		header.style.backgroundColor = "#1F1E23";
		header.classList.remove("backdrop-blur-sm");
	} 
});

const productList = document.querySelector(".product-list");
const products = document.querySelectorAll(".product");

products.forEach(product => {
	product.addEventListener("click", () => {
		console.log("prueba");
		const name = product.querySelector("p").textContent;
		const li = document.createElement("li");
		// Añadir el nombre del producto
		const span = document.createElement("span");
		span.textContent = name;
		li.appendChild(span);
	// Estructura visual del li según el componente proporcionado
	li.className = "product-li";
	// span nombre
	const spanName = document.createElement("span");
	spanName.className = "mr-auto w-fit";
	spanName.textContent = name;
	// div cantidad
	const divCantidad = document.createElement("div");
	divCantidad.className = "container-amount-product";
	// botón -
	const btnMenos = document.createElement("button");
	btnMenos.className = "btn-less";
	btnMenos.innerHTML = "<span>-</span>";
	// input cantidad
	const inputCantidad = document.createElement("input");
	inputCantidad.type = "number";
	inputCantidad.className = "amount-product";
	inputCantidad.value = 1;
	inputCantidad.min = 1;
	inputCantidad.max = 99;
	// botón +
	const btnMas = document.createElement("button");
	btnMas.className = "btn-add";
	btnMas.innerHTML = "<span>+</span>";
	// span precio
	const spanPrecio = document.createElement("span");
	spanPrecio.className = "text-[#e0e0e0] w-12";
	spanPrecio.textContent = product.querySelector("span").textContent;
	// armar hijos
	divCantidad.appendChild(btnMenos);
	divCantidad.appendChild(inputCantidad);
	divCantidad.appendChild(btnMas);
	li.innerHTML = "";
	li.appendChild(spanName);
	li.appendChild(divCantidad);
	li.appendChild(spanPrecio);
	productList.appendChild(li);
	});
});

const btnDelete = document.querySelector(".btn-delete-all");

btnDelete.addEventListener("click",() => {
	const div = document.querySelector(".product-list");
	div.replaceChildren();
})