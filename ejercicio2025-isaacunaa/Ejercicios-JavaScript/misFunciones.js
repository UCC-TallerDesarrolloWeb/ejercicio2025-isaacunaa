/**
 * ConversorUnidades
 * Convierte las unidades ingreasadas por el usuario
 * @method convertirUnidades
 * @param {string} id - unid_metro | unid_pie | unid_pulgada | unid_yarda
 * @param {number|string} valor
 */
function convertirUnidades(id, valor) {
  var metro, pulgada, pie, yarda;
  if (typeof valor === "string" && valor.includes(",")) {
    valor = valor.replace(",", ".");
  }
  if (isNaN(valor)) {
    alert("El valor ingresado no es correcto " + id);
    metro = pulgada = pie = yarda = "";
  } else {
    if (id == "unid_metro") {
      metro = valor;  pie = 3.28084 * valor;  pulgada = 39.3701 * valor;  yarda = 1.09361 * valor;
    } else if (id == "unid_pie") {
      pie = valor;  metro = 0.3048 * valor;  pulgada = 12 * valor;  yarda = 0.3333 * valor;
    } else if (id === "unid_pulgada") {
      pulgada = valor;  metro = 0.0254 * valor;  pie = 0.0833 * valor;  yarda = 0.0278 * valor;
    } else if (id === "unid_yarda") {
      yarda = valor;  metro = 0.9144 * valor;  pulgada = 36 * valor;  pie = 3 * valor;
    }
    document.lasUnidades.unid_metro.value   = Math.round(metro * 100) / 100;
    document.lasUnidades.unid_pulgada.value = Math.round(pulgada * 100) / 100;
    document.lasUnidades.unid_pie.value     = Math.round(pie * 100) / 100;
    document.lasUnidades.unid_yarda.value   = Math.round(yarda * 100) / 100;
  }
}

/**
 * grados_radianes
 * @method convertirGR
 */
let convertirGR = (id, valor) => {
  if (typeof valor === "string" && valor.includes(",")) {
    valor = valor.replace(",", ".");
  }
  if (id == "grados") {
    const rad = (Number(valor) * Math.PI) / 180;
    document.getElementById("radianes").value = rad;
  } else {
    const grd = (Number(valor) * 180) / Math.PI;
    document.getElementById("grados").value = grd;
  }
};

function mostrarOcultarDiv(valorMO) {
  const div = document.getElementById("divMO");
  if (!div) return;

  if (valorMO === "val_mostrar") {
    div.style.display = "block";
  } else if (valorMO === "val_ocultar") {
    div.style.display = "none";
  }
}

// Calculadora
let sumar = () => {
  const a = Number(document.getElementById("nums1").value);
  const b = Number(document.getElementById("nums2").value);
  document.getElementById("totalS").value = a + b;
};

let restar = () => {
  const a = Number(document.getElementById("nums1").value);
  const b = Number(document.getElementById("nums2").value);
  document.getElementById("totalR").value = a - b;
};

let multiplicar = () => {
  const a = Number(document.getElementById("nums1").value);
  const b = Number(document.getElementById("nums2").value);
  document.getElementById("totalM").value = a * b;
};

let dividir = () => {
  const a = Number(document.getElementById("nums1").value);
  const b = Number(document.getElementById("nums2").value);
  if (b === 0) {
    alert("No se puede dividir por cero");
    document.getElementById("totalD").value = "";
  } else {
    document.getElementById("totalD").value = a / b;
  }
};

let mostrarModal = () =>{
  document.getElementById("modal").style.display ="block";
};

let cerrarModal = () =>{
  document.getElementById("modal").style.display ="none";
};




