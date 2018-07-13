var mqtt;
function onConnect(){
  console.log("Connected");
  var button_status = sessionStorage.getItem("button_type");
  switch(button_status){

    case "client_name_connect":
      var client_name = document.getElementById("client_name").value;
      sessionStorage.setItem("client_name",client_name);
      break;

    case "setup":
      var topic = sessionStorage.getItem("client_name");
      var setup = new Paho.MQTT.Message("setup");
      setup.destinationName = topic;
      mqtt.send(setup);
      window.location.href = 'http://128.10.3.51:5000/setup';
      break;

    case "SavedDevice":
      var topic = sessionStorage.getItem("client_name");
      var saved_device = new Paho.MQTT.Message("saved_device");
      break;
  }
};

function noConnect(){
  console.log("Connection Error");
}

function MQTTconnect(button_type){
  var tcp_address = sessionStorage.getItem("brokertcp");
  var port = parseInt(sessionStorage.getItem("port"));
  var button_status = sessionStorage.setItem("button_type",button_type);
  mqtt = new Paho.MQTT.Client(tcp_address, port ,"ClientID")
  var options = {
    onSuccess:onConnect,
    onFailure:noConnect
  };
  mqtt.connect(options);
};
MQTTconnect("none");
