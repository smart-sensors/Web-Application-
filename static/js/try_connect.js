let mqtt;
function onConnect(){
  console.log("Connected");
  document.getElementById("status").innerHTML = "Connection Success";
  document.getElementById("status").style.color = "green";
  window.location.replace("index.html");

}

function noConnect(){
  console.log("Connection Error")
  document.getElementById("status").innerHTML = "Connection Error";
  document.getElementById("status").style.color = "red";
}

function MQTTconnect(){
  let tcp_address = document.getElementById("tcp_address").value;
  let port = parseInt(document.getElementById("port").value);
  let password = document.getElementById("password").value;
  let username = document.getElementById("username").value;
  mqtt = new Paho.MQTT.Client(tcp_address, port ,"ClientID");
  let options = {
    onSuccess:onConnect,
    onFailure:noConnect
  };
  sessionStorage.setItem("brokertcp", tcp_address);
  sessionStorage.setItem("port",port);
  mqtt.connect(options);
}
