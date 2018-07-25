var mqtt;
var client_name_list = sessionStorage.getItem("client_name_list");
client_name_list = client_name_list.split(',');
var BLE_Name_list = []
var client_name_num;
var BLE_Name_list_num;
var contentflag = false;

function onMessageArrived(message){
  var BLE_Name_list = message.payloadString;
  BLE_Name_list = BLE_Name_list.substring(0,BLE_Name_list.length-1);
  BLE_Name_list = BLE_Name_list.split(' ');
  message_topic = message.destinationName;
  client_name = message_topic.substr(0, (message_topic.length-10));
  createTabcontent(client_name,BLE_Name_list);
  document.getElementById("default").click();
};

function onConnect(){
  console.log("Connected");
  var button_status = sessionStorage.getItem("button_type");
  switch(button_status){

    case "setup":
      var topic = sessionStorage.getItem("client_name");
      var setup = new Paho.MQTT.Message("setup");
      setup.destinationName = topic;
      mqtt.send(setup);
      window.location.href = 'http://128.10.3.51:5000/setup';
      break;

    case "homepage":
      var topic = sessionStorage.getItem("client_name");
      var homepage = new Paho.MQTT.Message("homepage");
      homepage.destinationName = topic;
      mqtt.send(homepage);
      window.location.href = 'http://128.10.3.51:5000/index.html';
      break;

    case "SavedDevice":
      var topic = sessionStorage.getItem("client_name");
      var saved_device = new Paho.MQTT.Message("saved_device");
      saved_device.destinationName = topic;
      mqtt.send(saved_device);
      window.location.href = 'http://128.10.3.51:5000/saved_setting';
      break;
  }
  var client_name_num;
  var client_name_list = sessionStorage.getItem("client_name_list");
  client_name_list = client_name_list.split(',');
  for (client_name_num = 0; client_name_num < client_name_list.length; client_name_num++){
    mqtt.subscribe(client_name_list[client_name_num]+"/Name_list");
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
  mqtt.onMessageArrived = onMessageArrived
  mqtt.connect(options);
};

function createButtons(client_name,client_name_num){
  var button = document.createElement("BUTTON");
  var client_name_text = document.createTextNode(client_name);
  if (client_name_num == 0){
    button.setAttribute("id","default");
  }
  button.appendChild(client_name_text);
  document.getElementById("tab").appendChild(button);
  button.className = "tablinks";
  button.onclick = function(event){
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if (tabcontent.length != 0){
      document.getElementById(client_name).style.display = "block";
      event.currentTarget.className += " active"
    }
  };
}

function createTabcontent(client_name,BLE_Name_list){
  var client_name_div = document.createElement("div");
  client_name_div.setAttribute("id",client_name);
  client_name_div.className = "tabcontent";
  if (client_name != BLE_Name_list){
    for (BLE_Name_list_num = 0; BLE_Name_list_num < BLE_Name_list.length; BLE_Name_list_num++){
      number = BLE_Name_list_num + 1;
      ble_name = document.createTextNode("("+number+")"+BLE_Name_list[BLE_Name_list_num]+"\n");
      sessionStorage.setItem(client_name+number,BLE_Name_list[BLE_Name_list_num]);
      client_name_div.appendChild(ble_name);
    }
  }
  else{
    client_text = document.createTextNode(BLE_Name_list);
    client_name_div.appendChild(client_text);
  }
  document.getElementById("content").appendChild(client_name_div);
};

window.onload = function(){
  MQTTconnect();

  for (client_name_num = 0; client_name_num < client_name_list.length; client_name_num++){
    createButtons(client_name_list[client_name_num],client_name_num);
  }
};
