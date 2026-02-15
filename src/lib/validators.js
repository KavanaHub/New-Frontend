export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function validateNPM(npm) {
    const re = /^\d+$/;
    return re.test(npm);
}

export function validateWhatsApp(number) {
    const re = /^(\+62|62|0)8[1-9][0-9]{7,10}$/;
    return re.test(number.replace(/[\s-]/g, ''));
}

export function validatePassword(password) {
    return {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        isValid: password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password),
    };
}

export function removeAcademicTitles(name) {
    if (!name) return '';
    return name
        .replace(/,?\s*(S\.Kom|M\.Kom|M\.T|S\.T|Dr\.|Prof\.|Ir\.|S\.Si|M\.Si|S\.Pd|M\.Pd|Ph\.D)\.?/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
}
