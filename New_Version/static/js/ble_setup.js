var mqtt;
var saveslot = 0;

function onMessageArrived(message){
  document.getElementById("BLE_Status").innerHTML = message.payloadString;
  var status = message.payloadString;
  if (status == "Successfully Connected"){
    document.getElementById("BLE_Status").style.color = "green";
  }
  else if (status == "Connection Error"){
    document.getElementById("BLE_Status").style.color = "red";
  }
}

function onConnect(){
  console.log("Connected");
  var button_status = sessionStorage.getItem("button_type");
  console.log(button_status);
  switch(button_status){

    case "setup":
      var topic = localStorage.getItem("client_name");
      var setup = new Paho.MQTT.Message("setup");
      setup.destinationName = topic;
      mqtt.send(setup);
      window.location.href = 'http://128.10.3.51:5000/setup';
      break;

    case "SavedDevice":
      var topic = sessionStorage.getItem("client_name");
      var saved_device = new Paho.MQTT.Message("saved_device");
      saved_device.destinationName = topic;
      mqtt.send(saved_device);
      window.location.href = 'http://128.10.3.51:5000/saved_setting';
      break;

    case "homepage":
      var topic = sessionStorage.getItem("client_name");
      var homepage = new Paho.MQTT.Message("homepage");
      homepage.destinationName = topic;
      mqtt.send(homepage);
      window.location.href = 'http://128.10.3.51:5000/index.html';
      break;

    case "BLE_connect":
      //Let Raspberry Pi know that it is trying to connect to BLE Device
      var topic = sessionStorage.getItem("client_name");
      var ble_connect = new Paho.MQTT.Message("ble_connect");
      ble_connect.destinationName = topic+"/setup";
      mqtt.send(ble_connect);

      //Send BLE Device name to Raspberry Pi
      var BLE_Device_name = document.getElementById("BLE_Device_name").value;
      var BLE_Device_name_message = new Paho.MQTT.Message(BLE_Device_name);
      BLE_Device_name_message.destinationName = topic + "/setup/DeviceName";
      mqtt.send(BLE_Device_name_message);
      console.log("publised to: "+topic+"/setup/DeviceName");
      document.getElementById("BLE_Status").innerHTML = "Scanning...";

      mqtt.subscribe(topic+"/"+BLE_Device_name+"/BLE_Status");
      console.log(topic+BLE_Device_name+"/BLE_Status");

      //Store BLE Device Name
      break;

    case "BLE_Disconnect":
      var topic = sessionStorage.getItem("client_name");
      var ble_disconnect = new Paho.MQTT.Message("ble_disconnect");
      ble_disconnect.destinationName = topic+"/setup";
      mqtt.send(ble_disconnect);

      break
  }
}

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
  mqtt.onMessageArrived = onMessageArrived
  mqtt.connect(options);
};
MQTTconnect("none");
