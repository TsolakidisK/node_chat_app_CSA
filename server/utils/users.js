// Das Beispiel haben wir gemacht um Classen in ES6 zu verstehen

// class Person  {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     geUserDescription () {
//         return `${this.name} is ${this.age} years old!`;
//     }
// }

// var me = new Person('Konstantin', 26);
// var description = me.geUserDescription();
// console.log(description);

// ES6 Classes +  Ad-Hock Functions for the users list etc.

/**
 * Die Klasse Users hat 4 Funktionen.
 */
class Users {
    constructor () {
        this.users = [];
    }
    /**
    * Fügt den User im Aktuellen Raum hinzu
    * @param {string} id - User id
    * @param {string} name - User name
    * @param {string} room - Room name
    * @returns {string} - Den namen des Users der gerade gejoined hat
    */
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    } 
    /**
    * Entfernt den User aus dem Aktuellen Raum
    * @param {string} id - User id
    * @returns {string} - Gibt den namen des users zurück der entfernt wurde
    */
    removeUser (id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    /**
    * Gibt den aktuellen user zurück anhand der ID
    * @param {string} id - User id
    * @returns {string} - Gibt den aktuellen user zurück anhand der ID
    */
    getUser (id) {
        return this.users.filter((user) => user.id === id)[0]
    }
    /**
    * Gibt die Liste eines Raums
    * @param {string} room - room namen
    * @returns {string} - Gibt eine Liste mit den aktuellen usern in einem Raum
    */
    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};