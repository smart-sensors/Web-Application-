/* NOTES:
    - MQTT -> try to read a topic
    - If topic has data, construct a sensor.
    - Give a formatter for the sensor -- simple lookup table?
*/



function a() {

}

function b() {

}

function sensor_read(s) {
  for(let i = 0; i < data.length; i++) {
    s.data.push(data[i]);
  }
}
