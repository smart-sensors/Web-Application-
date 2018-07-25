var mqtt;
var i = 0;
var client_name_list = sessionStorage.getItem("client_name_list");
if (client_name_list == null){
  client_name_list = [];
}
else{
  client_name_list = client_name_list.split(",");
}

function onMessageArrived(message){
  document.getElementById("data").innerHTML = message.payloadString;
}

function onConnect(){
  var type = sessionStorage.getItem("type")
  console.log("Connected");
  var button_status = sessionStorage.getItem("button_type");
  switch(button_status){

    case "client_name_connect":
      var client_name_num;
      var client_flag = "False";
      for (client_name_num = 0; client_name_num < client_name_list.length; client_name_num++){
        if (client_name_list[client_name_num] == document.getElementById("client_name").value){
          client_flag = "True";
        }
      }
      if (client_flag == "False"){
        client_name_list.push(document.getElementById("client_name").value);
      }
      sessionStorage.setItem("client_name",document.getElementById("client_name").value);
      sessionStorage.setItem("client_name_list",client_name_list);
      window.alert("Connected to: "+document.getElementById("client_name").value);
      break;

    case "homepage":
      var topic = sessionStorage.getItem("client_name");
      var homepage = new Paho.MQTT.Message("homepage");
      homepage.destinationName = topic;
      mqtt.send(homepage);
      window.location.href = 'http://128.10.3.51:5000/index.html';
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
      saved_device.destinationName = topic;
      mqtt.send(saved_device);
      window.location.href = 'http://128.10.3.51:5000/saved_setting';
      break;

    case "subscribe":
      var select_ble_name = sessionStorage.getItem("selected_BLE_Device");
      var topic = sessionStorage.getItem("client_name");
      var subscribe = new Paho.MQTT.Message("subscribe");
      subscribe.destinationName = topic;
      mqtt.send(subscribe);

      var subscribe_topic = document.getElementById("subscribe_topic").value;
      var subscribe_topic_message = new Paho.MQTT.Message(subscribe_topic);
      subscribe_topic_message.destinationName = topic + "/subscribe_topic";
      mqtt.send(subscribe_topic_message);
      mqtt.subscribe(topic+"/"+select_ble_name);
      break;

    case "Saveslot":
      var userchoice = document.getElementById("saveslot").value;
      var topic = sessionStorage.getItem("client_name");
      var ble_name = sessionStorage.getItem(topic+userchoice);
      var ble_name_message = new Paho.MQTT.Message(ble_name);
      ble_name_message.destinationName = topic + "/DeviceName";
      mqtt.send(ble_name_message);
      window.alert("Selected BLE Device: "+ble_name);
      sessionStorage.setItem("selected_BLE_Device",ble_name);
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
  mqtt.onMessageArrived = onMessageArrived;
  mqtt.connect(options);
};

/*
function addmore(){
  clone = document.getElementById("dashboard").cloneNode(true);
  document.getElementById("add").appendChild(clone);
  i = i + 1;
  sessionStorage.setItem("type",i);
}
*/

window.onload = function(){
  MQTTconnect();
  document.getElementById("client_name").value = sessionStorage.getItem("client_name")
}
