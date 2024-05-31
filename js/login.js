document.getElementById("login-form").addEventListener("submit", function(event){
    event.preventDefault();
    
    var email = document.getElementById("email").value;
    var password = document.getElementById("email").value;

    var emailError = document.getElementById("error-email");
    var passwordError = document.getElementById("error-password");

    if(email.trim() === "" && password.trim() === ""){
        emailError.textContent = "El email no puede estar vacio";
        passwordError.textContent = "El password no puede estar vacío";
        return;
    }

    if(email.trim() === ""){
        emailError.textContent = "El email no puede estar vacio";
        return;
    }
    
    if(password.trim() === ""){
        passwordError.textContent = "El password no puede estar vacío";
        return;
    }

    alert("El formulario se envio con exito");
})