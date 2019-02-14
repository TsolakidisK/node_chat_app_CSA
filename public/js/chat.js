var socket = io();

/**
 * Autoscrolling Funktion
 */
function scroll(){
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

/**
 * Kommunikation mit server über das Schlüsselwort "connect"
 * falls der User bei Name oder Room einen leeren String eingibt mit hilfe von validation.js
 * @param {string} - Socket Schlüsselwort
 * @param {function} - Behandelt die Server antwort
 * @returns {boolean} - Man wird zur Startseite weitergeleitet oder man wird zum Chat verbunden
 */
socket.on('connect', () => {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No Error');
        }
    });
});

/**
 * Wird aufgerufen jedes mal wenn ein User den Raum verlässt
 * @param {string} - socket Schlüsselwort
 * @returns {string} - Consolenausgabe
 */
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});


/**
 * Sorgt dafür, dass die Liste "People" sich aktualisiert.
 * @param {string} - socket Schlüsselwort
 * @returns {string} - Aktualisierte Liste in Html Listenform
 */
socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});


/**
 * Empfängt Socket-Nachrichten mit dem Schlüssel "newMessage".
 * Erhält vom Server neue Nachricht eines Users und gibt diese im gestalteten Template an die HTML-Seite weiter.
 * Ausserdem wird Zeit formattiert.
 * @param {string} - socket Schlüsselwort
 * @returns {string} - Aktualisierte Ausgabe(Wer, Wann, Was).
 */
socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('kk:mm');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scroll();
});

/**
 * Empfängt Socket-Nachrichten mit dem Schlüssel "newMessageLocation".
 * Erhält vom Server neue Nachricht eines Users über seine Location gibt diese im gestalteten Template an die HTML-Seite weiter.
 * Ausserdem wird Zeit formattiert.
 * @param {string} - socket Schlüsselwort
 * @returns {string} - Aktualisierte Ausgabe(Wer, Wann, Was).
 */
socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('kk:mm');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scroll();
});

/**
 * Schickt eingebene Nachricht des Users an den Server.
 * e.preventDefault verhindert, dass leere Nachricht an den Server weitergeschickt wird.
 * @param {string} - HTML-ID des HTML-Inputs
 * @param {function} - .on schickt über 'submit' die Nachricht ab.
 */
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageBox.val()
    }, function () {
        messageBox.val('')
    });
});

/**
 * Handler für das Klicken aud den Location-Button.
 * Sendet dann über jQuery eine Anfrage an den Server den Standort abzufragen (über API).
 * Falls dies länger dauert, wird Ladenachricht angezeigt.
 * in getCurrentPosition wird Anschließend LocationMessage an den Server abgeschickt.
 * Falls keine Koordinaten ermittelt werden konnten, wird Fehlermeldung ausgegeben.
 * @param {string} - socket Schlüsselwort
 * @returns {string} - Aktualisierte Ausgabe(Wer, Wann, Was).
 */
var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser dude.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...'); //Falls die Abfrage länger dauert

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
        });
    }, function (){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});