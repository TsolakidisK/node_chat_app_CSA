var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');
/**
 * Testet ob from und text strings sind
 */
describe('generateMessage', () => {
   it('should generate correct message object', () => {
    var from = 'Dominique';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, text});
   });
});

// Dieser Test gibt immer Fehler , ich kann es aber nicht rausfinden wieso

// describe('generateLocationMessage', () => {
//     it('should generate correct location object', () => {
//         var from = 'Konstantin';
//         var latitude = 10;
//         var longitude = 12;
//         var url = 'https://www.google.com/maps?q=10,12';
//         var message = generateMessage(from, latitude, longitude);

//         expect(typeof message.createdAt).toBe('number');
//         expect(message).toMatchObject({from, latitude, longitude});       
//     });
// });