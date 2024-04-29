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

  
}

module.exports = Scooter;