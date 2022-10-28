/**
 * Author: Jose Manuel Martinez Deltell
 * Version: 1.0.0
 *  
 */

'use strict'

class Auth_Validation {

    _prefixID = 'auth_val_'; // prefijo de los ids por defecto
    _message_errID = `${this._prefixID}msg_err_`; // prefijo de los id de los mensajes, no se puede modificar

    IDs = {
        holder_UserId: `${this._prefixID}user`, // id del campo user name por defecto
        holder_PasswordId: `${this._prefixID}password`, // id del campo password por defecto
        holder_ConfirmPasswordId: `${this._prefixID}confirmPassword`, // id del campo confirm password por defecto
        holder_NameId: `${this._prefixID}name`, // id del campo Name por defecto
        holder_EmailId: `${this._prefixID}email`, // id del campo Email por defecto
        holder_BtnLoginId: `${this._prefixID}btnLogin`, // id del boton submit Login por defecto
        holder_BtnSigninId: `${this._prefixID}btnSignin`, // id del boton submit Signin por defecto
        holder_BtnUpdateUserId: `${this._prefixID}btnUpdateUser`, // id del boton submit Update user por defecto
        holder_BtnUpdateNameId: `${this._prefixID}btnUpdateName`, // id del boton submit Update name por defecto
        holder_BtnUpdateEmailId: `${this._prefixID}btnUpdateEmail`, // id del boton submit Update Email por defecto
        holder_BtnUpdatePasswordId: `${this._prefixID}btnUpdatePassword`, // id del boton submit Update password por defecto
    }
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

    constructor({
        IDs = this.IDs,
        allow_message = this.allow_message,
        UserConfig = this.UserConfig,
        PassConfig = this.PassConfig,
        ConfirmPassConfig = this.ConfirmPassConfig,
        NameConfig = this.NameConfig,
        EmailConfig = this.EmailConfig
    }) {
        this.IDs = {
            holder_UserId: IDs.holder_UserId,
            holder_PasswordId: IDs.holder_PasswordId,
            holder_ConfirmPasswordId: IDs.holder_ConfirmPasswordId,
            holder_NameId: IDs.holder_NameId,
            holder_EmailId: IDs.holder_EmailId,
            holder_BtnLoginId: IDs.holder_BtnLoginId,
            holder_BtnSigninId: IDs.holder_BtnSigninId,
            holder_BtnUpdateUserId: IDs.holder_BtnUpdateUserId,
            holder_BtnUpdateNameId: IDs.holder_BtnUpdateNameId,
            holder_BtnUpdatePasswordId: IDs.holder_BtnUpdatePasswordId,
        }

        this.allow_message = allow_message;

        this.UserConfig = {
            placeholder: UserConfig.placeholder,
            maxlength: UserConfig.maxlength,
            specialChar: UserConfig.specialChar,
        };

        this.PassConfig = {
            placeholder: PassConfig.placeholder,
            maxlength: PassConfig.maxlength,
            minlength: PassConfig.minlength,
            numbers: PassConfig.numbers,
            minNumbers: PassConfig.minNumbers,
            uppercase: PassConfig.uppercase,
            minUppercase: PassConfig.minUppercase,
            specialChar: PassConfig.specialChar,
            minSpecialChar: PassConfig.minSpecialChar,
        };

        this.NameConfig = {
            placeholder: NameConfig.placeholder,
            maxlength: NameConfig.maxlength,
            regex: NameConfig.regex
        };

        this.ConfirmPassConfig = {
            placeholder: ConfirmPassConfig.placeholder,
        };

        this.EmailConfig = {
            placeholder: EmailConfig.placeholder,
            regex: EmailConfig.regex
        };

        document.getElementById(this.IDs.holder_UserId) ? document.getElementById(this.IDs.holder_UserId).placeholder = this.UserConfig.placeholder : null;
        document.getElementById(this.IDs.holder_NameId) ? document.getElementById(this.IDs.holder_NameId).placeholder = this.NameConfig.placeholder : null;
        document.getElementById(this.IDs.holder_EmailId) ? document.getElementById(this.IDs.holder_EmailId).placeholder = this.EmailConfig.placeholder : null;
        document.getElementById(this.IDs.holder_PasswordId) ? document.getElementById(this.IDs.holder_PasswordId).placeholder = this.PassConfig.placeholder : null;
        document.getElementById(this.IDs.holder_ConfirmPasswordId) ? document.getElementById(this.IDs.holder_ConfirmPasswordId).placeholder = this.ConfirmPassConfig.placeholder : null;

        this._deny_paste();
        this._evt_action();
    }
    /**
     * no permite pegar en los campos de las contraseñas
     */
    _deny_paste() {
        [this.IDs.holder_PasswordId, this.IDs.holder_ConfirmPasswordId].forEach(elemento => {
            document.getElementById(elemento) ?
                document.getElementById(elemento).onpaste = (e) => {
                    e.preventDefault();
                } : null;
        });
    }

    /**
     * 
     * @param {message} mensaje que se mostrara 
     * @param {holder_Id} id donde estara ubicado el mensaje
     */
    _message_err(message, holder_id) {
        if (this.allow_message) {
            let elemento = document.getElementById(`${this._message_errID}${holder_id}`);
            if (!elemento) {
                elemento = document.createElement('div');
                elemento.id = `${this._message_errID}${holder_id}`;
                elemento.style.padding = '10px';
                document.getElementById(holder_id).insertAdjacentElement('afterend', elemento);
            }
            elemento.innerHTML = '';

            elemento.insertAdjacentHTML('afterbegin', `<span style="color:red;">${message}</span>`);
        }
    }

    /**
     *  Valida el Inicio sesion
     * @returns devuelve false si cumple con algunas restricciones
     */
    _login_auth_validation() {
        this._remove_element([this.IDs.holder_UserId, this.IDs.holder_PasswordId]);

        if (document.getElementById(this.IDs.holder_UserId).value === '' || document.getElementById(this.IDs.holder_PasswordId).value === '') {
            this._message_err(`Los campos no pueden estar vacíos.`, this.IDs.holder_PasswordId);
            return false;
        }
    }
    /**
     *  Valida el Registro de un usuario
     * @returns devuelve false si cumple con algunas restricciones
     */
    _signin_auth_validation() {
        this._remove_element([this.IDs.holder_NameId, this.IDs.holder_UserId, this.IDs.holder_PasswordId, this.IDs.holder_ConfirmPasswordId]);

        // All fields
        if (document.getElementById(this.IDs.holder_UserId).value === '' ||
            document.getElementById(this.IDs.holder_NameId).value === '' ||
            document.getElementById(this.IDs.holder_EmailId).value === '' ||
            document.getElementById(this.IDs.holder_PasswordId).value === '' ||
            document.getElementById(this.IDs.holder_ConfirmPasswordId).value === '') {
            this._message_err(`Los campos no pueden estar vacíos.`, this.IDs.holder_ConfirmPasswordId);
            return false;
        }

        this._validate_name();
        this._validate_user();
        this._validate_email();
        this._validate_password();
    }

    /**
     *  Valida la actualizacion del campo Nombre
     * @returns devuelve false si cumple con algunas restricciones
     */
    _update_Name_auth_validation() {
        this._remove_element([this.IDs.holder_NameId]);

        if (document.getElementById(this.IDs.holder_NameId).value === '') {
            this._message_err(`El campo no puede estar vacío.`, this.IDs.holder_NameId);
            return false;
        }

        this._validate_name();
    }

    /**
     *  Valida la actualizacion del campo Usuario
     * @returns devuelve false si cumple con algunas restricciones
     */
    _update_User_auth_validation() {
        this._remove_element([this.IDs.holder_UserId]);

        if (document.getElementById(this.IDs.holder_UserId).value === '') {
            this._message_err(`El campo no puede estar vacío.`, this.IDs.holder_UserId);
            return false;
        }

        this._validate_user();
    }

    /**
     *  Valida la actualizacion del campo Email
     * @returns devuelve false si cumple con algunas restricciones
     */
    _update_Email_auth_validation() {
        this._remove_element([this.IDs.holder_EmailId]);

        if (document.getElementById(this.IDs.holder_EmailId).value === '') {
            this._message_err(`El campo no puede estar vacío.`, this.IDs.holder_EmailId);
            return false;
        }

        this._validate_email();
    }

    /**
     *  Valida la actualizacion del campo Password
     * @returns devuelve false si cumple con algunas restricciones
     */
    _update_Password_auth_validation() {
        this._remove_element([this.IDs.holder_UserId]);

        if (document.getElementById(this.IDs.holder_PasswordId).value === '' || document.getElementById(this.IDs.holder_ConfirmPasswordId).value === '') {
            this._message_err(`Los campos no pueden estar vacíos.`, this.IDs.holder_ConfirmPasswordId);
            return false;
        }

        this._validate_password();
    }

    /**
     * Realiza la llamada a la funcion indicada cuando se pulsa el boton
     */
    _evt_action() {
        if (document.getElementById(this.IDs.holder_BtnLoginId)) document.getElementById(this.IDs.holder_BtnLoginId).addEventListener("click", (e) => { e.preventDefault(); this._login_auth_validation(); });
        if (document.getElementById(this.IDs.holder_BtnSigninId)) document.getElementById(this.IDs.holder_BtnSigninId).addEventListener("click", (e) => { e.preventDefault(); this._signin_auth_validation(); });
        if (document.getElementById(this.IDs.holder_BtnUpdateNameId)) document.getElementById(this.IDs.holder_BtnUpdateNameId).addEventListener("click", (e) => { e.preventDefault(); this._update_Name_auth_validation(); });
        if (document.getElementById(this.IDs.holder_BtnUpdateUserId)) document.getElementById(this.IDs.holder_BtnUpdateUserId).addEventListener("click", (e) => { e.preventDefault(); this._update_User_auth_validation(); });
        if (document.getElementById(this.IDs.holder_BtnUpdatePasswordId)) document.getElementById(this.IDs.holder_BtnUpdatePasswordId).addEventListener("click", (e) => { e.preventDefault(); this._update_User_auth_validation(); });
        if (document.getElementById(this.IDs.holder_BtnUpdateEmailId)) document.getElementById(this.IDs.holder_BtnUpdateEmailId).addEventListener("click", (e) => { e.preventDefault(); this._update_Email_auth_validation(); });
    }

    /**
     * Elimina el componente del mensaje de error
     * @param {array} array de Ids 
     */
    _remove_element(array) {
        array.forEach(elemento => {
            let e = document.getElementById(`${this._message_errID}${elemento}`);
            if (e) e.remove();
        })
    }

    /**
     *  Valida el campo Name
     * @returns devuelve false si cumple con algunas restricciones
     */
    _validate_name() {
        // Name
        if (document.getElementById(this.IDs.holder_NameId).value.length > this.NameConfig.maxlength) {
            this._message_err(`El nombre de usuario no puede tener más de ${this.NameConfig.maxlength} caracteres.`, this.IDs.holder_NameId);
            return false;
        }

        if (this.NameConfig.regex.test(document.getElementById(this.IDs.holder_NameId).value)) {
            this._message_err(`El nombre de usuario no puede tener números ni caracteres especiales.`, this.IDs.holder_NameId);
            return false;
        }
    }

    /**
     *  Valida el campo User
     * @returns devuelve false si cumple con algunas restricciones
     */
    _validate_user() {
        // User name
        if (document.getElementById(this.IDs.holder_UserId).value.length > this.UserConfig.maxlength) {
            this._message_err(`El nombre de usuario no puede tener más de ${this.UserConfig.maxlength} caracteres.`, this.IDs.holder_UserId);
            return false;
        }
        if (!this.UserConfig.specialChar && this.regex.test(document.getElementById(this.IDs.holder_UserId).value)) {
            this._message_err(`El nombre de usuario no puede contener caracteres especiales.`, this.IDs.holder_UserId);
            return false;
        }
    }

    /**
     *  Valida el campo Email
     * @returns devuelve false si cumple con algunas restricciones
     */
    _validate_email() {
       // email
        if (!this.EmailConfig.regex.test(document.getElementById(this.IDs.holder_EmailId).value)) {
            this._message_err(`El correo no esta bien formado.`, this.IDs.holder_EmailId);
            return false;
        }
    }

    /**
     *  Valida el campo Password
     * @returns devuelve false si cumple con algunas restricciones
     */
    _validate_password() {document
        // Equals Passwords
        if (document.getElementById(this.IDs.holder_PasswordId).value != document.getElementById(this.IDs.holder_ConfirmPasswordId).value) {
            this._message_err(`Las contraseñas tienen que ser iguales.`, this.IDs.holder_ConfirmPasswordId);
            return false;
        }

        // Password
        if (document.getElementById(this.IDs.holder_PasswordId).value.length > this.PassConfig.maxlength) {
            this._message_err(`La contraseña es demasiado larga.`, this.IDs.holder_ConfirmPasswordId);
            return false;
        }
        if (document.getElementById(this.IDs.holder_PasswordId).value.length < this.PassConfig.minlength) {
            this._message_err(`La contraseña debe tener mínimo ${this.PassConfig.minlength} caracteres.`, this.IDs.holder_ConfirmPasswordId);
            return false;
        }
        if (this.PassConfig.numbers && [...document.getElementById(this.IDs.holder_PasswordId).value.matchAll(/[0-9]/g)].length < this.PassConfig.minNumbers) {
            this._message_err(`La contraseña debe tener mínimo ${this.PassConfig.minNumbers} Número/s.`, this.IDs.holder_PasswordId);
            return false;
        }
        if (this.PassConfig.uppercase && [...document.getElementById(this.IDs.holder_PasswordId).value.matchAll(/[A-Z]/g)].length < this.PassConfig.minUppercase) {
            this._message_err(`La contraseña debe tener mínimo ${this.PassConfig.minUppercase} letra/s en Mayúscula.`, this.IDs.holder_PasswordId);
            return false;
        }
        if (this.PassConfig.specialChar && [...document.getElementById(this.IDs.holder_PasswordId).value.matchAll(this.regex)].length < this.PassConfig.minSpecialChar) {
            this._message_err(`La contraseña debe tener mínimo ${this.PassConfig.minSpecialChar} caracteres especiales.`, this.IDs.holder_PasswordId);
            return false;
        }
    }

}