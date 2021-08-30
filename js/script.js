var usuariosBD = [
  {
    id: 1,
    nombre: "Maria",
    apellido: "Rodriguez",
    email: "veronica@gmail.com",
    pass: "12345",
    tipo: "superusuario",
  },
  {
    id: 2,
    nombre: "Ricardo",
    apellido: "Hernandez",
    email: "ricardo@gmail.com",
    pass: "12345",
    tipo: "superusuario",
  },
  {
    id: 3,
    nombre: "Ivanna",
    apellido: "Nouel",
    email: "ivanna@gmail.com",
    pass: "12345",
    tipo: "operador",
  },
  {
    id: 4,
    nombre: "Grace",
    apellido: "Becker",
    email: "grace@gmail.com",
    pass: "12345",
    tipo: "operador",
  },
];

var productosBD = [
  {
    id: 1,
    nombre: "Falda Formal",
    precio: 200.5,
    url:
      "https://ae01.alicdn.com/kf/HTB1_fFpIXXXXXclXFXXq6xXFXXXN/Negro-faldas-de-oficina-para-mujer-ropa-de-trabajo-Ladies-Formal-m-s-el-tama-o.jpg",
  },
  {
    id: 2,
    nombre: "Jeans Azules",
    precio: 500.0,
    url:
      "https://http2.mlstatic.com/D_NQ_NP_664484-MLM29651431061_032019-W.jpg",
  },
  {
    id: 3,
    nombre: "Camisa Negra",
    precio: 300.0,
    url: "https://m.media-amazon.com/images/I/81ufvKya4XL._SR500,500_.jpg",
  },
  {
    id: 4,
    nombre: "Coleta",
    precio: 50.0,
    url: "https://urvan.eu/blog/wp-content/uploads/2017/07/10-coletas-6.jpg",
  },
  {
    id: 5,
    nombre: "Zapatos Vans",
    precio: 720.0,
    url:
      "https://vanscl.vteximg.com.br/arquivos/ids/540559-500-500/VN0A4BV4_VXR_1.jpg",
  },
  {
    id: 6,
    nombre: "Cartera",
    precio: 250.0,
    url:
      "https://i.pinimg.com/736x/e4/21/6a/e4216acef1f985a521fd4f03bc6a0aa2.jpg",
  },
];

var ventaBD = [
  { id_venta: 1, id_usuario: 1, fecha: "2020-11-04", total: 800.0 },
  { id_venta: 2, id_usuario: 4, fecha: "2020-11-04", total: 401.0 },
  { id_venta: 3, id_usuario: 2, fecha: "2020-11-04", total: 1200.0 },
  { id_venta: 4, id_usuario: 1, fecha: "2020-11-04", total: 800.0 },
  { id_venta: 5, id_usuario: 2, fecha: "2020-11-04", total: 2020.0 },
];

// insert into venta (id_usuario,fecha,monto) values
// (1,'2020-04-19',800.00),
// (4,'2020-03-20',200.50);

var venta_productoBD = [
  { id_venta: 1, id_producto: 2, cantidad: 1 },
  { id_venta: 1, id_producto: 3, cantidad: 1 },
  { id_venta: 2, id_producto: 1, cantidad: 2 },
  { id_venta: 1, id_producto: 4, cantidad: 1 },
  { id_venta: 1, id_producto: 5, cantidad: 1 },
  { id_venta: 2, id_producto: 6, cantidad: 5 },
  { id_venta: 1, id_producto: 2, cantidad: 2 },
  { id_venta: 1, id_producto: 3, cantidad: 4 },
  { id_venta: 2, id_producto: 1, cantidad: 5 },
  { id_venta: 1, id_producto: 4, cantidad: 6 },
  { id_venta: 1, id_producto: 5, cantidad: 7 },
  { id_venta: 2, id_producto: 6, cantidad: 1 },
];

// insert into venta_producto (id_venta,id_producto,cantidad) values
// (1,2,7),
// (1,3,8),
// (2,1,9);

var myObjeto = { nombre: "Ricardo", correo: "ricardo@gmail.com" };

var activeUser = usuariosBD[1];

var productsoncart = [];

// Funcion para elegir la pagina que se carga;
function UserTypeLoad(page) {
  document.getElementById("usertypeheading").innerHTML = activeUser.tipo;

  document.getElementById(
    "usernametxt"
  ).innerText = `${activeUser.nombre} ${activeUser.apellido}`;

  let navitems = [];

  switch (activeUser.tipo) {
    case "operador":
      navitems = document.getElementsByClassName("op");
      break;
    case "administrador":
      navitems = document.getElementsByClassName("admin");
      break;
    case "superusuario":
      navitems = document.getElementsByClassName("su");
      break;
  }

  for (let i = 0; i < navitems.length; i++) {
    navitems[i].style.display = "list-item";
  }

  switch (page) {
    case "product":
      LoadProducts();
      break;
    case "manage-products":
      LoadEditProducts();
      break;
    case "manage-users":
      LoadEditUsers();
      break;
    case "reports":
      $("#datepicker").datepicker({ format: "yyyy-mm-dd" });
      break;
    case "graphs":
      LoadChart();
      break;
  }
}

// FUNCIONES PARA PAGINA DE PRODUCTOS
function LoadProducts() {
  let lista = document.getElementById("products").innerHTML;

  for (let i = 0; i < productosBD.length; i++) {
    lista += `<div class="col-12 col-sm-6 col-lg-4">
        <div class="card" style="width: auto;">
          <img class="card-img-top" src="${productosBD[i].url}" />
          <div class="card-body">
            <h5 class="card-title">${productosBD[i].nombre}</h5>
            <p class="card-text">$${productosBD[i].precio}</p>
            <button id="idproduct${i}" class="btn btn-primary addcartbtn" onclick = AddToCart(${i})>Add to cart</button>
          </div>
        </div>
      </div>`;
  }

  document.getElementById("products").innerHTML = lista;
}

function AddToCart(id) {
  document.getElementById(`idproduct${id}`).disabled = true;
  document.getElementById(
    "product-details"
  ).innerHTML += `<tr id="product-row${id}" class = "added-products">
  <td>${productosBD[id].nombre}</td>
  <td id = "u-price${id}">${productosBD[id].precio}</td>
  <td id="input${id}">
    <input id = "qty${id}" class="qtyinput" type="number" min="1" value="1" onchange= "ChangeValueInput(${id})"/>
  </td>
  <td id = "price${id}" class= "prices">${productosBD[id].precio}</td>
  <td><i class="fas fa-times-circle rmv-btn" onclick="RemoveFromCart(${id})"></i></td>
</tr>`;

  productsoncart.push({ id: id + 1, qty: 1 }); //se le suma 1 por id de bd
  //console.log("anadir", productsoncart);
  CalculateTotal();
}

function ChangeValueInput(id) {
  var input = document.getElementById(`qty${id}`).value;
  document.getElementById(
    `input${id}`
  ).innerHTML = `<input id = "qty${id}" class="qtyinput" type="number" min="1" value="${input}" onchange= "ChangeValueInput(${id})"/>`;

  let price = document.getElementById(`u-price${id}`).innerHTML;
  document.getElementById(`price${id}`).innerHTML = parseFloat(price) * input;

  for (let i = 0; i < productsoncart.length; i++) {
    //console.log(productsoncart[i].id, id);
    if (productsoncart[i].id === id + 1) {
      productsoncart[i].qty = parseInt(input);
    }
  }
  //console.log("cambiar 2", productsoncart);
  CalculateTotal();
}

var carttotal = 0;

function CalculateTotal() {
  var qty = document.getElementsByClassName("qtyinput");
  var prices = document.getElementsByClassName("prices");

  let total = 0;

  for (let i = 0; i < qty.length; i++) {
    total += parseFloat(prices[i].innerText);
  }

  if (total > 0) {
    document.getElementById("buy-btn").disabled = false;
  } else {
    document.getElementById("buy-btn").disabled = true;
  }

  carttotal = total;

  document.getElementById("shopping-total").innerHTML = total;
  //console.log(total);
}

function getDate() {
  let d = new Date();
  let date = d.getFullYear() + "-";

  if (d.getMonth() + 1 < 10) {
    date += "0" + (d.getMonth() + 1) + "-";
  } else {
    date += d.getMonth() + 1 + "-";
  }

  if (d.getDate() < 10) {
    date += "0" + d.getDate();
  } else {
    date += d.getDate();
  }

  return date;
}

function BuyCart() {
  let date = getDate();
  let ventaid = ventaBD.length + 1; // no creo que sea necesario si es auto incremental *

  ventaBD.push({
    id_venta: ventaid, // tambien *
    id_usuario: activeUser.id,
    fecha: date,
    total: carttotal,
  });

  for (let i = 0; i < productsoncart.length; i++) {
    let p_id = productsoncart[i].id;
    let qty = productsoncart[i].qty;
    venta_productoBD.push({
      id_venta: ventaid,
      id_producto: p_id,
      cantidad: qty,
    });
  }

  //console.log("buy");
  ResetPage();
}

function ResetPage() {
  productsoncart = [];
  carttotal = 0;
  for (let i = 0; i < productosBD.length; i++) {
    document.getElementById(`idproduct${i}`).disabled = false;
  }
  document.getElementById("buy-btn").disabled = true;
  document.getElementById("shopping-total").innerHTML = carttotal;
  document.getElementById("product-details").innerHTML = "";
}

function RemoveFromCart(id) {
  document.getElementById(`idproduct${id}`).disabled = false;
  document
    .getElementById(`product-row${id}`)
    .parentNode.removeChild(document.getElementById(`product-row${id}`));

  for (let i = 0; i < productsoncart.length; i++) {
    //console.log(productsoncart[i].id, id + 1);
    if (productsoncart[i].id === id + 1) {
      //se suma 1 por id de bd
      productsoncart.splice(i, 1);
    }
  }

  //console.log("remove", productsoncart);
  CalculateTotal();
}

// FUNCIONES PARA PAGINA DE MANAGE PRODUCTS
function LoadEditProducts() {
  var table = document.getElementById("productsTableBody");
  for (let i = 0; i < productosBD.length; i++) {
    var row = table.insertRow(-1);
    var cell_id = row.insertCell(0);
    var cell_name = row.insertCell(1);
    var cell_price = row.insertCell(2);
    // var cell_url = row.insertCell(3);
    var cell_rmv = row.insertCell(3);
    var cell_edit = row.insertCell(4);
    row.id = `product-row${productosBD[i].id}`;
    cell_id.innerHTML = `<p>${productosBD[i].id}</p>`;
    cell_name.innerHTML = `<p>${productosBD[i].nombre}</p>`;
    cell_price.innerHTML = `<p>${productosBD[i].precio}</p>`;
    // cell_url.innerHTML = `<p>${productosBD[i].url}</p>`;
    // cell_url.className = "urls";
    cell_rmv.innerHTML = `<a onclick = "RemoveProduct(${productosBD[i].id})"><i class="fas fa-minus-square rmvbtn"></i></a>`;
    cell_edit.innerHTML = `<a data-toggle="modal" data-target="#EditProductModal" onclick = "OpenEditModal(${productosBD[i].id})"><i class="fas fa-edit editbtn"></i></a>`;

    // var RemoveHandler = function (row) {
    //   return function () {
    //     var cell = row.getElementsByTagName("td")[0];
    //     var id = cell.innerHTML;
    //     RemoveFromProductsTable(id);
    //   };
    // };

    // cell_id.onclick = RemoveHandler(row);
  }
}

function RemoveProduct(id) {
  console.log(id);
  document
    .getElementById(`product-row${id}`)
    .parentNode.removeChild(document.getElementById(`product-row${id}`));
  for (let i = 0; i < productosBD.length; i++) {
    if (id === productosBD[i].id) {
      productosBD.splice(i, 1);
    }
  }
}

function getProduct(id) {
  for (let i = 0; i < productosBD.length; i++) {
    console.log(productosBD[i].id, id);
    if (productosBD[i].id === id) {
      return productosBD[i];
    }
  }
}

function OpenEditModal(id) {
  document.getElementById(
    "editModalLabel"
  ).innerHTML = `Editing Product Id: <span id="idEdited">${id}</span>`;

  product = getProduct(id);

  document.getElementById("editName").value = product.nombre;
  document.getElementById("editPrice").value = product.precio;
  document.getElementById("editUrl").value = product.url;
  console.log(id + " was edited");
}

function EditProduct() {
  let id = document.getElementById("idEdited").innerHTML;
  let name = document.getElementById("editName").value;
  let price = document.getElementById("editPrice").value;
  let url = document.getElementById("editUrl").value;

  id = parseInt(id);
  for (let i = 0; i < productosBD.length; i++) {
    if (productosBD[i].id === id) {
      productosBD[i] = { id: id, nombre: name, precio: price, url: url };
      console.log("aqui");
    }
  }
  $("#EditProductModal").modal("hide");

  document.getElementById("productsTableBody").innerHTML = "";

  LoadEditProducts();
}

function AddNewProduct() {
  let id = 0;
  if (productosBD.length > 0) {
    id = productosBD[productosBD.length - 1].id + 1;
  } else {
    id = 1;
  }
  let name = document.getElementById("newName").value;
  let price = document.getElementById("newPrice").value;
  let url = document.getElementById("newUrl").value;

  console.log(id, name, price, url);

  productosBD.push({ id: id, nombre: name, precio: price, url: url });

  $("#AddNewProductModal").modal("hide");

  document.getElementById("productsTableBody").innerHTML = "";

  LoadEditProducts();
}

//FUNCIONES PARA PAGINA MANAGE-USERS
function LoadEditUsers() {
  var table = document.getElementById("usersTableBody");
  for (let i = 0; i < usuariosBD.length; i++) {
    var row = table.insertRow(-1);
    var cell_id = row.insertCell(0);
    var cell_fname = row.insertCell(1);
    var cell_lname = row.insertCell(2);
    var cell_email = row.insertCell(3);
    var cell_pass = row.insertCell(4);
    var cell_type = row.insertCell(5);
    var cell_rmv = row.insertCell(6);
    var cell_edit = row.insertCell(7);
    row.id = `user-row${usuariosBD[i].id}`;
    cell_id.innerHTML = `<p>${usuariosBD[i].id}</p>`;
    cell_fname.innerHTML = `<p>${usuariosBD[i].nombre}</p>`;
    cell_lname.innerHTML = `<p>${usuariosBD[i].apellido}</p>`;
    cell_email.innerHTML = `<p>${usuariosBD[i].email}</p>`;
    cell_pass.innerHTML = `<p>${usuariosBD[i].pass}</p>`;
    cell_type.innerHTML = `<p>${usuariosBD[i].tipo}</p>`;
    cell_rmv.innerHTML = `<a onclick = "RemoveUser(${usuariosBD[i].id})"><i class="fas fa-minus-square rmvbtn"></i></a>`;
    cell_edit.innerHTML = `<a data-toggle="modal" data-target="#EditUserModal" onclick = "OpenEditUsersModal(${usuariosBD[i].id})"><i class="fas fa-edit editbtn"></i></a>`;
  }
}

function getUser(id) {
  for (let i = 0; i < usuariosBD.length; i++) {
    if (usuariosBD[i].id === id) {
      return usuariosBD[i];
    }
  }
}

function OpenEditUsersModal(id) {
  document.getElementById(
    "editUserModalLabel"
  ).innerHTML = `Editing User Id: <span id="userEdited">${id}</span>`;

  user = getUser(id);

  document.getElementById("editFName").value = user.nombre;
  document.getElementById("editLName").value = user.apellido;
  document.getElementById("editEmail").value = user.email;
  document.getElementById("editPassword").value = user.pass;

  // console.log(user);

  let options = document.getElementById("editTypeSelect").options; //[1].selected = true;

  for (let i = 0; i < options.length; i++) {
    if (user.tipo === options[i].value) {
      // console.log("aqui", user.tipo, options[i].value);
      document.getElementById("editTypeSelect").options[i].selected = true;
    }
  }

  // console.log(id + " was edited");
}

function EditUser() {
  let id = document.getElementById("userEdited").innerHTML;
  let fname = document.getElementById("editFName").value;
  let lname = document.getElementById("editLName").value;
  let email = document.getElementById("editEmail").value;
  let pass = document.getElementById("editPassword").value;
  let type = document.getElementById("editTypeSelect").value;

  id = parseInt(id);
  for (let i = 0; i < usuariosBD.length; i++) {
    if (usuariosBD[i].id === id) {
      usuariosBD[i] = {
        id: id,
        nombre: fname,
        apellido: lname,
        email: email,
        pass: pass,
        tipo: type,
      };
      console.log("aqui", usuariosBD[i].id, id, i);
    }
  }
  $("#EditUserModal").modal("hide");

  document.getElementById("usersTableBody").innerHTML = "";

  LoadEditUsers();
}

function AddNewUser() {
  let id = 0;
  if (usuariosBD.length > 0) {
    id = usuariosBD[usuariosBD.length - 1].id + 1;
  } else {
    id = 1;
  }
  let fname = document.getElementById("newFName").value;
  let lname = document.getElementById("newLName").value;
  let email = document.getElementById("newEmail").value;
  let pass = document.getElementById("newPassword").value;
  let type = document.getElementById("inputTypeSelect").value;

  //console.log(id, name, price, url);

  usuariosBD.push({
    id: id,
    nombre: fname,
    apellido: lname,
    email: email,
    pass: pass,
    tipo: type,
  });

  $("#AddNewUserModal").modal("hide");

  document.getElementById("usersTableBody").innerHTML = "";

  LoadEditUsers();
}

function RemoveUser(id) {
  document
    .getElementById(`user-row${id}`)
    .parentNode.removeChild(document.getElementById(`user-row${id}`));
  for (let i = 0; i < usuariosBD.length; i++) {
    if (id === usuariosBD[i].id) {
      usuariosBD.splice(i, 1);
    }
  }
}

// FUNCIONES PARA PAGINA CASH-CLOSING (CORTE DE CAJA)

function RealizarCorte() {
  let date = getDate();
  let count = 0;
  let usuario = "";
  for (let i = 0; i < ventaBD.length; i++) {
    for (let j = 0; j < usuariosBD.length; j++) {
      if (ventaBD[i].id_usuario === usuariosBD[j].id) {
        usuario = usuariosBD[j].nombre + " " + usuariosBD[j].apellido;
      }
    }
    if (ventaBD[i].fecha === date) {
      count++;
      document.getElementById(
        "tabla-corte-body"
      ).innerHTML += `<tr><td>${ventaBD[i].fecha}</td><td>${ventaBD[i].id_venta}</td><td>${ventaBD[i].id_usuario}</td><td>${usuario}</td><td>$${ventaBD[i].total}</td></tr>`;
    }
  }

  if (count === 0) {
    document.getElementById("div-tablacorte").style.display = "none";
    document.getElementById("none-alert").style.display = "block";
    document.getElementById("btn-realizar-corte").disabled = false;
  } else {
    document.getElementById("div-tablacorte").style.display = "block";
    document.getElementById("none-alert").style.display = "none";
    document.getElementById("btn-realizar-corte").disabled = true;
  }
}

//FUNCIONES PARA LA PAGINA DE REPORTS
var data = [];

function VerReporte() {
  data = [];
  document.getElementById("tabla-reportes-body").innerHTML = "";
  let count = 0;
  let usuario = "";
  let date = document.getElementById("datepicker").value;

  for (let i = 0; i < ventaBD.length; i++) {
    for (let j = 0; j < usuariosBD.length; j++) {
      if (ventaBD[i].id_usuario === usuariosBD[j].id) {
        usuario = usuariosBD[j].nombre + " " + usuariosBD[j].apellido;
      }
    }
    if (ventaBD[i].fecha === date) {
      count++;
      document.getElementById(
        "tabla-reportes-body"
      ).innerHTML += `<tr><td>${ventaBD[i].fecha}</td><td>${ventaBD[i].id_venta}</td><td>${ventaBD[i].id_usuario}</td><td>${usuario}</td><td>$${ventaBD[i].total}</td></tr>`;
      data.push([
        ventaBD[i].fecha,
        ventaBD[i].id_venta,
        ventaBD[i].id_usuario,
        usuario,
        ventaBD[i].total,
      ]);
    }
  }

  if (count === 0) {
    document.getElementById("div-tabla-reportes").style.display = "none";
    document.getElementById("empty-alert").style.display = "block";
  } else {
    document.getElementById("div-tabla-reportes").style.display = "block";
    document.getElementById("empty-alert").style.display = "none";
  }
}

function DownloadCSV() {
  if (data.length === 0) {
    alert("Hubo un error");
  } else {
    var csv = "Fecha,ID_Venta,ID_Usuario,Nombre_Usuario,Total\n";
    data.forEach(function (row) {
      csv += row.join(",");
      csv += "\n";
    });

    let d = data[0][0];
    console.log(d);
    console.log(csv);
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = `Reporte-${d}.csv`;
    hiddenElement.click();
  }
}

// FUNCIONES PARA LA PAGINA DE GRAPHS

function getBest5() {
  let productos_vendidos = [];
  for (let i = 0; i < productosBD.length; i++) {
    let t = 0;
    for (let j = 0; j < venta_productoBD.length; j++) {
      // console.log("aqui", productosBD[i].id, venta_productoBD[j].id_producto);
      if (productosBD[i].id === venta_productoBD[j].id_producto) {
        t += venta_productoBD[j].cantidad;
      }
    }
    productos_vendidos.push({
      p_id: productosBD[i].id,
      name: productosBD[i].nombre,
      qty: t,
    });
  }

  var mayor_menor = [];

  var names = [];
  var qty = [];

  for (let i = 0; i < 5; i++) {
    var max = productos_vendidos.reduce(function (prev, current) {
      return prev.qty > current.qty ? prev : current;
    });
    mayor_menor.push(max);
    names.push(max.name);
    qty.push(max.qty);
    for (let j = 0; j < productos_vendidos.length; j++) {
      if (max.p_id === productos_vendidos[j].p_id) {
        productos_vendidos.splice(j, 1);
      }
    }
  }

  console.log(mayor_menor);
  return [names, qty];
}

function LoadChart() {
  var labels = getBest5();
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels[0],
      datasets: [
        {
          label: "#Sells per product",
          data: labels[1],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
