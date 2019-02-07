const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Dominik',
            room: 'CSA Modul'
        }, {
            id: '2',
            name: 'Konstantin',
            room: 'Chat App'
        }, {
            id: '3',
            name: 'Rieger',
            room: 'CSA Modul'
        }];
    });

    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: '1212',
            name: 'Tsolas',
            room: 'Private'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();  // ToNotExist funktioniert in diesem Fall nicht
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find a suer', () => {
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toBeFalsy();    // ToNotExist funktioniert in diesem Fall nicht
    });

    it('should return names for CSA Modul', () => {
        var userList = users.getUserList('CSA Modul');

        expect(userList).toEqual(['Dominik', 'Rieger']);
    });

    it('should return names for Chat App', () => {
        var userList = users.getUserList('Chat App');

        expect(userList).toEqual(['Konstantin']);
    });
});