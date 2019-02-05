// Die 0 Representiert 1en Januar 1970 00:00:00 am
// Alles wird in Millisekunden gespeichert
// MDN Date hat uns geholfen

var moment = require('moment');

var Timestamp = moment().valueOf();
console.log(Timestamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('kk:mm'));