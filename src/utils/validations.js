import { COUNTRY_CODES } from '../config/constants';


export function validateForm(data) {
    const errors = {};

    if (!data.fullname || data.fullname.trim().length < 5) {
        errors.fullname = 'Le nom  doit contenir au moins 5 caractères';
    }

    if (!data.username || data.username.trim().length < 3) {
        errors.username = 'Le username doit contenir au moins 3 caractères';
    } else if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
        errors.username = 'Le username ne doit contenir que des lettres, chiffres et underscore';
    }

    const validCountries = ['SN', 'ML', 'CI', 'GN'];
    if (!data.country || !validCountries.includes(data.country)) {
        errors.country = 'Veuillez sélectionner un pays valide';
    }

      const phoneRegex = /^\+(221|223|224|225)\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
        errors.phone = 'Format de téléphone invalide (ex: +XXX XX XXX XX XX)';
    } else {
        const countryCode = data.phone.substring(0, 4); 
        const expectedCode = COUNTRY_CODES[data.country];
        if (countryCode !== expectedCode) {
            errors.phone = `L'indicatif téléphonique ne correspond pas au pays sélectionné (${expectedCode})`;
        }
    }
   

    if (!data.password || data.password.length < 4) {
        errors.password = 'Le mot de passe doit contenir au moins 4 caractères';
    }

    if (Object.keys(errors).length > 0) {
        throw new Error(JSON.stringify(errors));
    }

    return true;
}


export function validateLogin(data) {
    const errors = {};

   
    if (!data.phone || data.phone.trim().length === 0) {
        errors.phone = 'Veuillez entrer votre numéro de téléphone';
    }

    if (!data.password || data.password.length === 0) {
        errors.password = 'Veuillez entrer un mot de passe';
    }

    if (Object.keys(errors).length > 0) {
        throw new Error(JSON.stringify(errors));
    }

    return true;
}