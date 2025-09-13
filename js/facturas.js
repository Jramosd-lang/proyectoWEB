// facturas.js
function obtenerFacturas() {
  const facturas = localStorage.getItem('facturas');
  if (!facturas) return [];
  return JSON.parse(facturas);
}

document.addEventListener('DOMContentLoaded', function() {
  const tbody = document.querySelector('table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  const facturas = obtenerFacturas();
  facturas.forEach(factura => {
    const tr = document.createElement('tr');
    tr.classList = "hover:bg-[#ffffff10]";

    tr.innerHTML =`<td class="px-3 py-2 border border-[#ffffff10]">${factura.id}</td>
        <td class="px-3 py-2 border border-[#ffffff10]">${factura.fecha}</td>
        <td class="px-3 py-2 border border-[#ffffff10]">$${factura.total}</td>`;
    tbody.appendChild(tr);
  });
});
