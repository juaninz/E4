const inputPizza = document.querySelector(".inputSearch");
const inputBtn = document.querySelector(".inputBtn");
const menu = document.querySelector(".btn__container");
const item = document.querySelectorAll(".item");
const cartList = document.querySelector(".cartContainer");
const catalogo = document.querySelector(".catalogo");
const header = document.querySelector(".header");
const btnCompra = document.querySelectorAll(".btnCatalogo");
const search = document.querySelector(".search")
//Quitar elemento carrito

const btnBorrar = document.getElementById('borrarTodo')

// Contador del carrito y el total
const totalItems = document.getElementById('totalItems');
const totalProducts = document.getElementById('totalProducts');

// Div del carrito
const cart = document.getElementById('cart');
// Llamamos al navbar
const navbar = document.getElementById('navbar');

//llamamos elementos formulario
const nombre = document.getElementById('name');
const email = document.getElementById('email');
const form = document.getElementById('form');
const parrafo = document.getElementById('errores');
const phone = document.getElementById('phone');


//guardamos array en local storage
localStorage.setItem('Pizzas', JSON.stringify(Pizzas));

// Mostrar/Ocultar menu al scrollear
let ultimoScrollTop;

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  // console.log(`el scrolltop es ${scrollTop}`);
  // console.log(`el ultimo scroll es ${ultimoScrollTop}`);
  if (scrollTop > ultimoScrollTop) {
    navbar.style.top = '-200px';
  } else {
    navbar.style.top = '0';
  }
  ultimoScrollTop = scrollTop;
});

// Mostrar menu (toggle)
menu.addEventListener('click', () => {
  item.forEach((i) => i.classList.toggle('show'));
});

//Inicializamos varible que toma del localstorage
let catalogoPizzas = JSON.parse(localStorage.getItem('Pizzas')) || []

//Buscador
inputBtn.addEventListener("click", buscarPizza);

function buscarPizza(e) {
  e.preventDefault();
  const pizzaName = inputPizza.value;
  if (pizzaName === "") {
    showError("Por favor ingresa el nombre de la pizza !");
    return;
  }
  createHTML();
  inputPizza.value = "";
}

function showError(error) {
  const msgError = document.createElement("p");
  msgError.textContent = error;
  msgError.classList.add("error");
  cartList.appendChild(msgError);
  setTimeout(() => {
    msgError.remove();
  }, 2000);
}

function createHTML() {
  cartList.innerHTML = "";
  if (catalogoPizzas.some((pizza) => pizza.nombre.toUpperCase() == inputPizza.value.toUpperCase())) {
    catalogoPizzas.forEach((pizza) => {
      if (pizza.nombre.toUpperCase() === inputPizza.value.toUpperCase()) {
        const h2 = document.createElement("h2");
        const h3 = document.createElement("h3");
        const h4 = document.createElement("h4");
        const span = document.createElement("span");
        const img = document.createElement("img")
        cartList.classList.add("cartList2");
        img.src=`${pizza.img}`
        img.innerHTML = `${pizza.img}`;
        h2.innerHTML = `Nuestra Pizza ${pizza.nombre}`;
        h3.innerHTML = `Ingredientes: ${pizza.ingredientes}`;
        h4.innerHTML = `Precio: $ ${pizza.precio}`;
        span.innerHTML = `X`;
        cartList.appendChild(img);
        cartList.appendChild(h2);
        cartList.appendChild(h3);
        cartList.appendChild(h4);
        cartList.appendChild(span);
        span.classList.add("borrar");
        span.addEventListener("click", (e) => {
          const item = e.target.parentElement;
          cartList.innerHTML = "";
        });
      } else {
        return;
      }
    });
  } else {
    showError("No hay ninguna pizza listada con ese nombre!");
    return;
  }
}

// Iteramos el array de stock
catalogoPizzas.forEach((pizza) => {
  // Crear un div
  const div = document.createElement('div');
  //   A este div le vamos a asignar una clase
  div.classList.add('cardCatalogo');
  //   Le vamos a pasar el html con la info que necesitamos
  div.innerHTML = `
  <img class="imgCatalogo" src="${pizza.img}" alt="pizza" />
  <h2>${pizza.nombre}</h2>
  <h4>$${pizza.precio}</h4>
  <p> Ingredientes: ${pizza.ingredientes} </p>
  <a href="#"><button data-img="${pizza.img}" data-name="${pizza.nombre}" data-price="${pizza.precio}" data-count="1"
  class="btnCatalogo" data-id="${pizza.id}">
  Agregar
</button></a>
  `;

  //   Decirle que los divs que se van a crear van a estar renderizados en el contenedor de productos
  catalogo.appendChild(div);
});


//formulario

// Escuchador de eventos
form.addEventListener('submit', (e) => {
  // Prevenimos por defecto el comportamiento del submit
  e.preventDefault();

  //   Crear una variable para almacenar errores
  let error = '';
  //   Creaoms una variable de enviar para controlar si tenemos errores
  let enviar = false;
  // Creamos la variable de regexEmail para validar el email
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

  //   Validemos el nombre de usuario
  //   Si el nombre tiene menos de 6 caracteres, quiero que muestre un error
  if (nombre.value.length < 3) {
    error += `El nombre tiene menos de 3 caracteres <br>`;
    enviar = true;
  }

  //   Validemos el email
  //
  if (!regexEmail.test(email.value)) {
    error += `El email no es valido <br>`;
    enviar = true;
  }

  //   * Validamos el telefono
  if (!validatePhone(phone.value)) {
    error += `El telefono no es valido, debe tener 10 numeros <br>`;
    enviar = true;
  }

  //   Si enviar es true mostramos los errores
  if (enviar) {
    parrafo.classList.add('errores');
    parrafo.innerHTML = error;
  } else {
    parrafo.classList.add('ok');
    parrafo.innerHTML = 'Enviado';
  }
});


// Crear una funcion que valide el numero de telefono
const validatePhone = (phone) => {
  // Expresion regular para el telefono
  let re = /^\d{10}$/;
  //   Retorna true si la expresion coincide
  return re.test(phone);
};