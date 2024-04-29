const Scooter = require('../src/Scooter');


// typeof scooter === object
describe('scooter object', () => {
  test('Scooter class should create Scooter instance', () => {
    const scooter = new Scooter()
    expect(scooter).toBeInstanceOf(Scooter)
  })
})

// Method tests
describe('scooter methods', () => {
  // tests here!

  // rent method
  test("rent", () => {
    const scooter = new Scooter();
    const user = { name: "User" };

    // Test renting when charge is above 20 and scooter is not broken
    scooter.charge = 50;
    scooter.isBroken = false;
    scooter.rent(user);
    expect(scooter.user).toBe(user);
    expect(scooter.station).toBeNull();

    // Test throwing error when charge is below 20
    scooter.charge = 10;
    expect(() => scooter.rent(user)).toThrow("Scooter needs to charge or scooter needs repair.");

    // Test throwing error when scooter is broken
    scooter.charge = 50; // charge is now sufficient
    scooter.isBroken = true;
    expect(() => scooter.rent(user)).toThrow("Scooter needs to charge or scooter needs repair.");
});

  // dock method
  test("dock", () => {
    const scooter = new Scooter();
    const station = "Station A";

    scooter.rent({ name: "User" }); // Simulate scooter being rented

    scooter.dock(station);

    expect(scooter.station).toBe(station);
    expect(scooter.user).toBeNull();
  });

  // requestRepair method
  jest.useFakeTimers();
  jest.setTimeout(10000);




  test("requestRepair", () => {
    const scooter = new Scooter();
    scooter.isBroken = true; // Simulate scooter being broken

    scooter.requestRepair();

    // Fast-forward time by 5 seconds
    jest.advanceTimersByTime(5000);

    // Make assertions after repair completion
    expect(scooter.isBroken).toBe(false);
});



  // charge method

  describe('Scooter recharge method tests', () => {
    test('should recharge the scooter battery to 100%', async () => {
      jest.useFakeTimers(); // Enable mock timers
  
      const scooter = new Scooter();
      scooter.charge = 50; // Simulate a partially charged battery
  
      const rechargePromise = scooter.recharge(); // Start the recharge process
  
      // Advance the timers by 2 seconds to simulate the recharge time
      jest.advanceTimersByTime(2000);
  
      await rechargePromise; // Wait for the recharge process to complete
  
      expect(scooter.charge).toBe(100); // Check if the charge is now at 100%
    });
  });

})
