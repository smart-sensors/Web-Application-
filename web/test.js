let lut = new LUT(false); // CHANGE THIS TO LOOK FOR COOKIES
lut.add(
  "vmm",
  (x, y) => y * 1000
);
let sensor = new Sensor("test", "vmm", "test", lut.apply("vmm", [])); // Creates new sensor formatted as a VMM

mqtt.onMessageArrived = sensor.update;
mqtt.connect();

/*while true {
  console.log(sensor.process());
}*/
  //delay();

function delay(ms) {
  start = new Date().getTime();
  end = start;
  while(end < start + ms) {
    end = new Date().getTime();
  }
}
