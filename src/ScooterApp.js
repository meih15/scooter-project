const Scooter = require('./Scooter');
const User = require('./User');

class ScooterApp {

    constructor() {
        this.stations = {
            "Station 1": [],
            "Station 2": [],
            "Station 3": []
        };

        this.registeredUsers = {};
    }


    registerUser(username, password, age) {
        if (this.registeredUsers[username]) {
            throw new Error('User has already been registered');
        } 
        
        if (age < 18) {
            throw new Error('User is too young to register')
        }

        const user = new User(username, password, age);
        this.registeredUsers[username] = user;
        console.log(`User '${username}' has been registered.`);
        return user;

    }


    loginUser(username, password) {

        if (!this.registeredUsers[username]){
            throw new Error('Username is incorrect')
        }

        const user = this.registeredUsers[username]

        if(user.password !== password) {
            throw new Error('Password is incorrect')
        }

        user.login(password);
        console.log(`User ${username} has been logged in`)

    }


    logoutUser(username) {
        const user = this.registeredUsers[username];

        if (!user) {
            throw new Error("No such user is logged in.");
        }

        user.logout();
        console.log(`User '${username}' is logged out.`);
    }

    
    createScooter(station) {
        if (!this.stations[station]) throw new Error('No such station');

        const scooter = new Scooter(station)
        this.stations[station].push(scooter)
        console.log("Created new scooter")
        return scooter;
    }


    dockScooter(scooter, station) {
        if (!this.stations[station]) throw new Error("No such station");
        if (scooter.station === station) throw new Error("Scooter already at station");

        scooter.dock(station);
        this.stations[station].push(scooter);

        console.log("Scooter is docked");
        
    }


    rentScooter(scooter, user) {

        if (scooter.user) throw new Error("Scooter is already rented");

        const station = this.findScooterStation(scooter);

        if (!station) {
            throw new Error("Scooter is not at any station.");
        }

        const index = this.stations[station].indexOf(scooter);

        if (index === -1) {
            throw new Error("Scooter is not at any station.");
        }

        this.stations[station].splice(index, 1);

        scooter.rent(user);
        console.log("Scooter is rented")
    }

    findScooterStation(scooter) {

        for (const station of Object.keys(this.stations)) {

            if (this.stations[station].includes(scooter)) {
                return station;
            }
        }

        return null;
    }

    
    print() {
        console.log("Registered Users:");
        console.log(this.registeredUsers);
        
        console.log("Stations:");
        for (const station of Object.keys(this.stations)) {
            console.log(`${station}: ${this.stations[station].length} scooters`);
        }
    }

};

module.exports = ScooterApp