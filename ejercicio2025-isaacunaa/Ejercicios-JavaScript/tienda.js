// ---------- Datos ----------
const productos = [
  {
    nombre: "Cabezal Sparring",
    description: "Cabezal de Sparring.",
    categoria: "Protectores",
    marca: "Gran Marc",
    talle: ["1", "2", "3"],
    precio: 35000,
    web: "https://www.granmarctiendaonline.com.ar/productos/cabezal-cerrado/",
    imagen: "cabezal-cerrado.webp",
  },
  {
    nombre: "Dobok Dan",
    description: "Dobok aprobado para torneos internacionales.",
    categoria: "Dobok",
    marca: "Daedo",
    talle: ["1", "2", "3", "4", "5", "6", "7", "8"],
    precio: 115000,
    web: "https://www.daedo.com/products/taitf-10813",
    imagen: "dobok.webp",
  },
  {
    nombre: "Escudo de Potencia",
    description: "Escudo de potencia para entrenamientos.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 51700,
    web: "https://www.granmarctiendaonline.com.ar/productos/escudo-de-potencia-grande/",
    imagen: "escudo-potencia.webp",
  },
  {
    nombre: "Par de focos redondos",
    description: "Par de focos de 25cm x 25cm para hacer entrenamiento.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 15000,
    web: "https://www.granmarctiendaonline.com.ar/productos/foco-con-dedos/",
    imagen: "foco-con-dedos.webp",
  },
  {
    nombre: "Guantes 10 onzas",
    description:
      "Guantes de Sparring de 10 onzas habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["s/talle"],
    precio: 35000,
    web: "https://www.daedo.com/products/pritf-2020",
    imagen: "protectores-manos.webp",
  },
  {
    nombre: "Protectores Pie",
    description:
      "Protectores de Pie habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["XXS", "XS", "S", "M", "L", "XL"],
    precio: 35000,
    web: "https://www.daedo.com/collections/collection-itf-gloves/products/pritf-2022",
    imagen: "protectores-pie.webp",
  },
];

// ---- Render opcional (no rompe si no existe el contenedor) ----
let cargarProductos = () => {
  const cont = document.getElementById("mostrar-catalogo");
  if (!cont) return; // si no hay contenedor, no hago nada

  let contenido = "";
  productos.forEach((p, id) => {
    contenido += `
      <div>
        <img src="images/${p.imagen}" alt="${p.nombre}"/>
        <h3>${p.nombre}</h3>
        <p>Precio: $${p.precio}</p>
        <button type="button" onclick="mostrarModal(${id})">Ver detalle</button>
        <button type="button" onclick="agregarAlCarrito(${id})">Agregar al carrito</button>
      </div>`;
  });
  cont.innerHTML = contenido;
};

// ---- Modal de detalle (DINÁMICO) ----
let mostrarModal = (id) => {
  const p = productos[id];
  if (!p) return;

  const dlg = document.getElementById("modal");
  const t   = document.getElementById("titulo-producto");
  const d   = document.getElementById("descr-producto");
  const pr  = document.getElementById("precio-producto");
  const img = document.getElementById("img-producto");

  if (t)  t.textContent  = p.nombre;
  if (d)  d.textContent  = p.description;
  if (pr) pr.textContent = "Precio: $" + p.precio.toLocaleString("es-AR");
  if (img){ img.src = "images/" + p.imagen; img.alt = p.nombre; }

  if (dlg && typeof dlg.showModal === "function") dlg.showModal();
  else if (dlg) dlg.style.display = "block";
};

let cerrarModal = () => {
  const dlg = document.getElementById("modal");
  if (dlg && typeof dlg.close === "function") dlg.close();
  else if (dlg) dlg.style.display = "none";
};

// ---- Hacer accesibles desde el HTML (evita conflictos con otros JS) ----
window.cargarProductos = cargarProductos;
window.mostrarModal    = mostrarModal;
window.cerrarModal     = cerrarModal;

// ---- Carrito ----
let agregarAlCarrito = (id) => {
  let carritolist = localStorage.getItem("carrito"); // LEER (corregido)
  carritolist = carritolist ? JSON.parse(carritolist) : [];
  carritolist.push(id);
  localStorage.setItem("carrito", JSON.stringify(carritolist)); // GUARDAR
};

let cargarCarrito = () => {
  const cont = document.getElementById("mostrar-carrito");
  if (!cont) return;

  let carritolist = localStorage.getItem("carrito"); // LEER (corregido)
  if (!carritolist) {
    cont.innerHTML = `<div>Su carrito está vacío</div>`;
    return;
  }

  carritolist = JSON.parse(carritolist);
  if (!Array.isArray(carritolist) || carritolist.length === 0) {
    cont.innerHTML = `<div>Su carrito está vacío</div>`;
    return;
  }

  let contenido = "";
  carritolist.forEach((prodId, idx) => {
    const p = productos[prodId];
    if (!p) return;
    contenido += `
      <div>
        <h3>${p.nombre}</h3>
        <p>Precio: $${p.precio}</p>
        <button type="button" onclick="eliminarProducto(${idx})">Eliminar del Carrito</button>
      </div>`;
  });
  contenido += `<button type="button" onclick="vaciarCarrito()">Vaciar Carrito</button>`;
  cont.innerHTML = contenido;
};

let vaciarCarrito = () => {
  localStorage.removeItem("carrito");
  window.location.reload();
};

let eliminarProducto = (index) => {
  let carritolist = localStorage.getItem("carrito");
  if (!carritolist) return;
  carritolist = JSON.parse(carritolist);

  carritolist.splice(index, 1);

  if (carritolist.length > 0) {
    localStorage.setItem("carrito", JSON.stringify(carritolist));
  } else {
    localStorage.removeItem("carrito");
  }
  window.location.reload();
};

// ---- Exponer funciones al HTML ----
window.agregarAlCarrito = agregarAlCarrito;
window.cargarCarrito    = cargarCarrito;
window.vaciarCarrito    = vaciarCarrito;
window.eliminarProducto = eliminarProducto;








