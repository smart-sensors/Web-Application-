class Sensor {
  constructor(name, type, readTopics, formatter) {
      this.formatter = formatter;
      this.name = name;
      this.type = type;
      this.topics = readTopics;
      this.data = [];
  }

  process() {
    return this.formatter(this.data);
  }

  update() {
    for (topic in this.topics) {
      this.data.push(/*MQTT READ OF TOPIC LINE*/);
    }
  }
}
