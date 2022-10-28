# Auth Validation
Librería JS para validación, de autentificación de Inicio sesión, Registro y Actualización de los datos.

Actual Version: 1.0.0

## Como Instalar
 
### CDN - jsDelivr

- Version
```
<script src="https://cdn.jsdelivr.net/gh/Jose9jmmd/auth_validation@1.0.0/src/auth-validation.js"></script>
```
- Latest
```
<script src="https://cdn.jsdelivr.net/gh/Jose9jmmd/auth_validation@latest/src/auth-validation.js"></script>
```

## Como Funciona

Instaciamos la clase y ya estara en funcionamiento.

```
const auth = new Auth_Validation({});
```

### IDs

Cada campo o input tiene un ID por defecto, si no son de su agrado son modificables.

- *Usuario* = auth_val_user
- *Nombre* = auth_val_name
- *Email* = auth_val_email
- *Contraseña* = auth_val_password
- *Confirmar Contraseña* = auth_val_confirmPassword

Tambien existen IDs para cada boton, que tambien se pueden modificar.

- *Boton Iniciar Sesion* = auth_val_btnLogin
- *Boton Registrarse* = auth_val_btnSignin
- *Boton Actualizar Usuario* = auth_val_btnUser
- *Boton Actualizar Nombre* = auth_val_btnName
- *Boton Actualizar Email* = auth_val_btnEmail
- *Boton Actualizar Contraseña* = auth_val_btnPassword

Para poder modificar cada ID, en el momento que instaciamos la clase añadimos algo tal que asi:

```
const auth = new Auth_Validation(
    IDs = {
        holder_UserId: 'user', 
        holder_PasswordId: 'password', 
        holder_ConfirmPasswordId: 'confirmPassword', 
        holder_NameId: 'name', 
        holder_EmailId: 'email', 
        holder_BtnLoginId: 'btnLogin', 
        holder_BtnSigninId: 'btnSignin', 
        holder_BtnUpdateUserId: 'btnUpdateUser', 
        holder_BtnUpdateNameId: 'btnUpdateName',
        holder_BtnUpdateEmailId: 'btnUpdateEmail', 
        holder_BtnUpdatePasswordId: 'btnUpdatePassword',
    }
);
```

### Configuración

Ademas de esto se pueden realizar otras modificaciones sobre su configuración de cada campo.
Para modicarlos se tendria que realizar una accion como la anterior.

Las configuracion esta construidad de la siguiente manera, si desea modificarse, se debe realizar cuando se instancia la clase, de una forma similar como la anterior.

```
// cofiguraciones

    allow_message = true; // Permite mostrar mensaje de error Default true 

    regex = /\d|\W|[-,_]/g; // expresion regular, busca numero y caracteres especiales, incluidos los espacios, guiones y barras bajas

    UserConfig = {
        placeholder: 'Escribir Nombre Usuario', // texto por defecto del campo
        maxlength: 30, // numero maximo que no puede superar el nombre de usuario
        specialChar: true, // el nombre de usuario puede o no contener caracteres especiales Default false
    };

    NameConfig = {
        placeholder: 'Escribir Nombre', // texto por defecto del campo
        maxlength: 30, // numero maximo que no puede superar el nombre de usuario
        regex: /[0-9]|[º,!,|,",@,·,#,$,~,%,&,¬,/,(,),=,?,¿,¡,€,',^,*,+,¨,_,-,:,;,.,<,>,\{,\},\],\[,\,]/g, // expresion regular, solo se permite letras y espacios
    };

    PassConfig = {
        placeholder: 'Escribir Contraseña', // texto por defecto del campo
        maxlength: 16, // numero maximo de caracteres de la contraseña Defalut 16
        minlength: 8, // numero mínimo de caracteres de la contraseña Default 8
        numbers: true, // la contraseña debe contener numeros Default true
        minNumbers: 1, // mínimo de numeros que tiene que tener la contraseña
        uppercase: true, // la contraseña debe contener letras en mayuscula Default true
        minUppercase: 1, // numero mínimo de letras en mayusculas Default 1
        specialChar: true, // la contraseña debe contener caracteres especiales Default false
        minSpecialChar: 1, // numero mínimo de letras especiales que debe contener la contraseña Default 1, si specialChar falso, esto queda invalidado
    };

    ConfirmPassConfig = {
        placeholder: 'Escribir Confirmación Contraseña', // texto por defecto del campo
    }

    EmailConfig = {
        placeholder: 'Escribir E-mail', // texto por defecto del campo
        regex: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/, // expresion regular para validacion del email
    }
```

