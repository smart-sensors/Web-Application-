/*
 * LUT contains a lookup table for functions, with methods to add a function and
 * to apply it to data. Usage:
 * 1. Make lut
 * 2. Create functions for a given device to interpret raw data
 *      -Example: Temp sensor with Vmin, Vmax scaling parameters
 *      **Functions MUST have signature: function f([], raw)
 * 3. Push function to lUT, this creates a TYPE of device (i.e. motion sensor)
 * 4. When a device needs to use the function, call apply() with the fixed parameter list
 * 5. LUT returns a partially-applied function corresponding to a specific device configuration
 */

class LUT {
  constructor(preload) {
    self.lut = [];
    if(preload) {
      for(let i in preload) {
        self.add(preload[i]);
      }
    }
  }
  /*push(label, f) {
    self.lut[label] = f;
  }*/
  apply(label, arg_list) {
    let f = self.lut[label];
    return (x) => f(arg_list, x);
  }
}

LUT.prototype.add = function(label, f) {
  self.lut[label] = f;
}


// TEST CODE
/*let lut = new LUT({
  "temp":temp_sensor
});

console.log(lut.apply("temp", [0, 100]));

function temp_sensor(limits, data) { // Dummy data, assumes 0-5V scale, 100 F max temp.
  let v_h = limits.pop();
  let v_l = limits.pop();

  return (data - v_l) / (v_h - v_l) * 100;
}


function voltmeter(dummy, data) { return data / 1000; }
*/
