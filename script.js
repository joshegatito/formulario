// Función para registrar un usuario
function registerUser() {
    // Obtener el valor del campo de nombre y apellido del formulario
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;

    // Obtener el valor del nivel seleccionado
    var level = document.getElementById("firstNameLevel").value;

    // Obtener los datos almacenados previamente en localStorage
    var storedData = localStorage.getItem('userData');

    // Convertir los datos almacenados a un objeto JavaScript, o crear un objeto vacío si no hay datos almacenados
    var userData = storedData ? JSON.parse(storedData) : {};

    // Verificar si ya existe un registro para este usuario en los datos almacenados
    if (userData[firstName]) {
        alert("Este usuario ya está registrado."); // Mostrar un mensaje de alerta si el usuario ya está registrado
    } else {
        // Agregar el nuevo registro al objeto userData, incluyendo el nivel seleccionado
        userData[firstName] = {
            lastName: lastName, // Almacena el apellido
            level: level // Almacena el nivel
        };

        // Guardar los datos actualizados en localStorage
        localStorage.setItem('userData', JSON.stringify(userData));

        alert("Usuario registrado exitosamente."); // Mostrar un mensaje de alerta indicando que el usuario ha sido registrado correctamente
    }
}

// Función para exportar a Excel
function exportToExcel() {
    // Solicitar la contraseña al usuario
    var password = prompt("Por favor, ingrese la contraseña para descargar los datos:");

    // Cifrar la contraseña ingresada utilizando SHA-256
    var encryptedPassword = CryptoJS.SHA256(password).toString();

    // Comparar la contraseña cifrada con una contraseña cifrada predefinida
    if (encryptedPassword === "6aab94797389820659e65252560493e15fd329d886af3fd50b85c18e5f123cf8") {
        // Contraseña cifrada predefinida (reemplazar con la contraseña cifrada deseada)
        
        // Obtener los datos almacenados en localStorage
        var userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) { // Verificar si hay datos almacenados para exportar
            // Inicializar una cadena CSV con una cabecera
            var csvContent = "Nombre,Apellido,Nivel\n"; // Encabezado del archivo CSV
            
            // Iterar sobre los datos almacenados y agregarlos al CSV
            for (var firstName in userData) {
                var userDataEntry = userData[firstName];
                csvContent += firstName + "," + userDataEntry.lastName + "," + userDataEntry.level + "\n"; // Concatenar los datos correctamente
            }

            // Crear un objeto WorkBook (libro de trabajo)
            var workbook = XLSX.utils.book_new();
            
            // Convertir la cadena CSV a una hoja de trabajo
            var worksheet = XLSX.utils.aoa_to_sheet(csvContent.split("\n").map(row => row.split(",")));
            
            // Agregar la hoja de trabajo al libro
            XLSX.utils.book_append_sheet(workbook, worksheet, "Registros");
            
            // Escribir el libro de trabajo en un archivo Excel y descargarlo
            XLSX.writeFile(workbook, "registros.xlsx");
        } else {
            // Mostrar un mensaje de alerta si no hay datos almacenados para exportar
            alert("No se encontraron datos para exportar.");
        }
    } else {
        // Mostrar un mensaje de error si la contraseña ingresada es incorrecta
        alert("Contraseña incorrecta. No tiene permiso para descargar los datos.");
    }
}
