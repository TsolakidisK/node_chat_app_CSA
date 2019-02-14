var moment = require('moment');

/**
 * Generiert eine Nachricht
 * @param {string} - from: Erhält vom client den User als string.
 * @param {string} - text: Erhält vom client die Nachricht als string,
 * @returns {string} - Nachricht inklusive Zeitstempel
 */
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

/**
 * Generiert die  Location
 * @param {string} - from: Erhält vom client den User als string.
 * @param {string} - latitude: Erhält vom client die latitude als string
 * @param {string} - longitude: Erhält vom client die longitude als string
 * @returns {string} - Nachricht inklusive Zeitstempel
 */
var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    };
};

module.exports = {generateMessage, generateLocationMessage};