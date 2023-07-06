const validateEmail = (email: string) => {
    const emailRe = /\S+@\S+\.\S+/;
    return emailRe.test(email);
};

const validatePassword = (password: string) => {
    const passwordRe = /.{8,}/;
    return passwordRe.test(password);
};

const validateFoundryLicense = (foundryLicense: string) => {
    const foundryLicenseRe =
        /[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}/;
    return foundryLicenseRe.test(foundryLicense);
};

export { validateEmail, validatePassword, validateFoundryLicense };
