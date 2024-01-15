export function checkDigitsOnly(str) {

    for (let i = 0; i < str.length; i++) {
        if (isNaN(parseInt(str[i]))) {
            return false;
        }
    }

    return true;
}