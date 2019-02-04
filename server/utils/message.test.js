var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
   it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
   });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Konstantin';
        var latitude = 10;
        var longitude = 12;
        var url = 'https://www.google.com/maps?q=10,12';
        var message = generateMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});       
    });
});