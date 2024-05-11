document.addEventListener("DOMContentLoaded", function() {
    // URL del archivo JSON
    var jsonFile = "lista.json";

    // Obtener elementos del DOM
    var tableBody = document.querySelector("#productos_table tbody");
    var proveedorSelect = document.getElementById("proveedor");
    var categoriaSelect = document.getElementById("categoria");
    var filtrarBtn = document.getElementById("filtrarBtn");

    // Cargar el archivo JSON
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            // Llenar lista desplegable de proveedores
            var proveedores = new Set(data["Listado de Productos"].map(producto => producto.Proveedor));
            proveedores.forEach(proveedor => {
                var option = document.createElement("option");
                option.text = proveedor;
                proveedorSelect.add(option);
            });

            // Llenar lista desplegable de categorías
            var categorias = new Set(data["Listado de Productos"].map(producto => producto.Categoría));
            categorias.forEach(categoria => {
                var option = document.createElement("option");
                option.text = categoria;
                categoriaSelect.add(option);
            });

            // Mostrar todos los productos al cargar la página
            mostrarProductos(data["Listado de Productos"]);

            // Agregar evento al botón de filtrar
            filtrarBtn.addEventListener("click", function() {
                var proveedorSeleccionado = proveedorSelect.value;
                var categoriaSeleccionada = categoriaSelect.value;
                var productosFiltrados = data["Listado de Productos"].filter(function(producto) {
                    return (proveedorSeleccionado === "" || producto.Proveedor === proveedorSeleccionado) &&
                           (categoriaSeleccionada === "" || producto.Categoría === categoriaSeleccionada);
                });
                mostrarProductos(productosFiltrados);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    // Función para mostrar los productos en la tabla
    function mostrarProductos(productos) {
        tableBody.innerHTML = "";
        productos.forEach(function(producto) {
            var row = "<tr>";
            row += "<td>" + producto.IdProducto + "</td>";
            row += "<td>" + producto.NombreProducto + "</td>";
            row += "<td>" + producto.Proveedor + "</td>";
            row += "<td>" + producto.Categoría + "</td>";
            row += "<td>" + producto.CantidadPorUnidad + "</td>";
            row += "<td>" + producto.PrecioUnidad + "</td>";
            row += "<td>" + producto.UnidadesEnExistencia + "</td>";
            row += "<td>" + producto.UnidadesEnPedido + "</td>";
            row += "<td>" + producto.NivelNuevoPedido + "</td>";
            row += "<td>" + (producto.Suspendido ? "Sí" : "No") + "</td>";
            row += "</tr>";
            tableBody.innerHTML += row;
        });
    }
});
