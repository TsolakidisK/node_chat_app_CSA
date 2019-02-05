var socket = io();

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

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

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