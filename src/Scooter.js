class Scooter {

  static nextSerial = 1;
  
  constructor(station){
      this.station = station;
      this.user = null;
      this.charge = 100;
      this.isBroken = false;
      this.serial = Scooter.nextSerial++
  }

  rent(user) {
      if (this.charge > 20 && !this.isBroken) {
          this.user = user;
          this.station = null;
      } else {
          throw new Error("Scooter needs to charge or scooter needs repair.");
      }
  }

  dock(station) {
      this.station = station;
      this.user = null;
  }

  async recharge() {
    console.log('Starting charge');

    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
    this.charge = 100;

    console.log('Charge complete');
  }


  requestRepair() {
    console.log('Repair requested');
    
    setTimeout(() => {
        this.isBroken = false;
        console.log('Repair completed');
    }, 5000); // repair in 5 seconds
  }


  
}

module.exports = Scooter;