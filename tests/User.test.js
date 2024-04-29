const User = require('../src/User')

const user = new User('Joe Bloggs', 'test123', 21)

// User tests here
describe('User property tests', () => {
  // test username
  test('username should be a string', () => {
    expect(typeof user.username).toBe('string')
  })
  test('password should be a string', () => {
    expect(typeof user.password).toBe('string');
  });

  // test age
  test('age should be a number', () => {
    expect(typeof user.age).toBe('number');
  });
})

describe('User login method tests', () => {
  test('should set loggedIn to true for correct password', () => {
    user.login('test123');
    expect(user.loggedIn).toBe(true);
  });

  test('should throw an error for incorrect password', () => {
    expect(() => {
      user.login('wrongPassword');
    }).toThrow('Incorrect password');
  });
});

// test logout
describe('User logout method tests', () => {
  test('should set loggedIn to false', () => {
    user.logout();
    expect(user.loggedIn).toBe(false);
  });
});
