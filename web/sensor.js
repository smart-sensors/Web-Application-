class Sensor {
  constructor(name, type, readTopics, formatter) {
      this.formatter = formatter;
      this.name = name;
      this.type = type;
      this.topics = readTopics;
      this.data = [];
  }

  process() {
    return this.data;
    //return this.formatter(this.data[0]);
  }

  update(payload) {
    if(payload !== undefined) {
      this.data.push(payload.payloadString);
    }
    /*for (topic in this.topics) {
      this.data.push(message);
    }*/
  }
}
