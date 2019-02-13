// ES6 Classes +  Ad-Hock Functions for the users list etc.

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

class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUser (id) {
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};