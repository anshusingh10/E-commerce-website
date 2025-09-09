import PasswordValidator from 'password-validator';

var schema = new PasswordValidator();

schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                              // Must have least 1  uppercase letters
    .has().lowercase(1)                              // Must have at least 1 lowercase letters
    .has().digits(1)                                // Must have at least 1 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export default function FormValidator(e) {
    let { name, value } = e.target;
    switch (name) {
        case "name":
        case "username":
        case "color":
        case "icon":
            if (!value || value.length === 0) {
                return name + " Field is Mendatory";
            } else if (value.length < 3 || value.length > 50) {
                return name + " Field must be 3 to 50 character long";
            } else {
                return "";
            }
        case "email":
            if (!value || value.length === 0) {
                return name + " Field is Mendatory";
            } else if (value.length < 13 || value.length > 100) {
                return name + " Field length Must Be 13-100";
            } else {
                return "";
            }

            case "subject":
            if (!value || value.length === 0) {
                return name + " Field is Mendatory";
            } else {
                return "";
            }
        case "phone":
            if (!value || value.length === 0) {
                return name + " Field is Mendatory";
            } else if (value.length !== 10) {
                return name + " Field length Must Be 10 Digits,Don't use 0";
            } else if (!("9876".includes(value[0]))) {
                return "Phone Number ,It must start with 9,8,7 or 6";
            } else {
                return "";
            }

        case "password":
            if (!value || value.length === 0) {
                return name + " Field is Mendatory";
            } else if (!schema.validate(value))
                return "Invalid Password,Password must be 8-100 characters long,contain at least 1 uppercase letter,1 lowercase letter,1 digit and no spaces";
            else {
                return ""
            }
        case "size":
            if (!value || value.length === 0) {
                return name + " Field is Mendatory";
            } else if (value.length > 10) {
                return " Field must be upto 10 characters"
            } else {
                return "";
            }
        case "basePrice":
            if (!value || value.length === 0) {
                return name + " Field is Mendatory";
            } else if (value > 1) {
                return " Base Price must be greater than 0"
            } else {
                return "";
            }

        case "stockQuantity":
            if (!value || value.length === 0) {
                return name + " Field is Mendatory";
            } else if (value < 0) {
                return " Stock Quantity Must not be Negative"
            } else {
                return "";
            }
        case "discount":
            if (!value || value.length === 0) {
                return name + " Field is Mendatory";
            } else if (value < 0 || value > 100) {
                return "Discount mast be 0-100"
            } else {
                return "";
            }
        case "question":
            if (!value || value.length === 0) {
                return name + " Field is Mendatory";
            } else if (value.length < 3 || value.length > 50) {
                return name + " Field must be 10 character or more";
            } else {
                return "";
            }


        case "message ":
        case "description":
        case "answer":
            if (!value || value.length === 0) {
                return name + " Field is Mendatory";
            } else if (value.length < 50) {
                return name + " Field  length must be 50 character or more";
            } else {
                return "";
            }
        default:
            return "";
    }
}


