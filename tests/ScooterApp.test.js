const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')
const Scooter = require('../src/Scooter'); // Import the Scooter class

const scooterApp = new ScooterApp()
// ScooterApp tests here

const mockUser = scooterApp.registerUser('TestUser', 'test123', 25);

// Mock scooter for testing
const mockScooter = scooterApp.createScooter('Station 1');

// register user
describe('registerUser method tests', () => {
  test('Should return instance of User', () => {
    const response = scooterApp.registerUser('Joe Bloggs', 'test123', 21)
    expect(response).toBeInstanceOf(User)
  })
})

// log in
describe('ScooterApp loginUser method tests', () => {
  let scooterApp;

  beforeEach(() => {
    scooterApp = new ScooterApp();
    scooterApp.registerUser('TestUser', 'test123', 25); // Register a test user
  });

  test('Should successfully log in a registered user', () => {
    scooterApp.loginUser('TestUser', 'test123');
    const loggedInUser = scooterApp.registeredUsers['TestUser'];
    expect(loggedInUser.loggedIn).toBe(true);
  });

  test('Should throw an error for incorrect username', () => {
    expect(() => {
      scooterApp.loginUser('InvalidUser', 'test123');
    }).toThrow("Username is incorrect");
  });

  test('Should throw an error for incorrect password', () => {
    expect(() => {
      scooterApp.loginUser('TestUser', 'invalidPassword');
    }).toThrow("Password is incorrect");
  });
});

// log out
describe('ScooterApp logoutUser method tests', () => {
  let scooterApp;

  beforeEach(() => {
    scooterApp = new ScooterApp();
    scooterApp.registerUser('TestUser', 'test123', 25); // Register a test user
  });

  test('Should successfully log out a logged-in user', () => {
    scooterApp.loginUser('TestUser', 'test123');
    scooterApp.logoutUser('TestUser');
    const loggedOutUser = scooterApp.registeredUsers['TestUser'];
    expect(loggedOutUser.loggedIn).toBe(false);
  });

  test('Should throw an error for logging out a non-logged-in user', () => {
    expect(() => {
      scooterApp.logoutUser('NonExistentUser');
    }).toThrow("No such user is logged in.");
  });
});


// rent scooter
describe('rentScooter method tests', () => {
  test('Should successfully rent a scooter to a user', () => {
    scooterApp.rentScooter(mockScooter, mockUser);
    expect(mockScooter.user).toBe(mockUser);
  });

  test('Should throw an error when attempting to rent an already rented scooter', () => {
    expect(() => {
      scooterApp.rentScooter(mockScooter, mockUser);
    }).toThrow("Scooter is already rented");
  });

  test('Should throw an error when attempting to rent a scooter not at any station', () => {
    const nonExistingScooter = new Scooter('Non-existing Station');
    expect(() => {
      scooterApp.rentScooter(nonExistingScooter, mockUser);
    }).toThrow("Scooter is not at any station.");
  });
});

// dock scooter

describe('dockScooter method tests', () => {
  test('Should successfully dock a scooter at a station', () => {
    scooterApp.dockScooter(mockScooter, 'Station 2');
    expect(mockScooter.station).toBe('Station 2');
  });

  test('Should throw an error when attempting to dock a scooter already at the station', () => {
    expect(() => {
      scooterApp.dockScooter(mockScooter, 'Station 2');
    }).toThrow("Scooter already at station");
  });

  test('Should throw an error when attempting to dock a scooter at a non-existing station', () => {
    expect(() => {
      scooterApp.dockScooter(mockScooter, 'Non-existing Station');
    }).toThrow("No such station");
  });
});
