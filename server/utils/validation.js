/**
 * isRealString Funktion dient dazu, die Nutzereingaben dahingehend zu untersuchen ob es sich um keine leeren Strings handelt oder der String nicht nur aus Leerzeichen besteht
 * @param {string} - String der zum Überprüfen ist
 * @returns {boolean} - True falls echter String
 */
var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isRealString};

