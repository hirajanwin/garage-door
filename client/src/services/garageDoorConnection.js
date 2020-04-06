const garageDoorConnection = { instance: null };

garageDoorConnection.connect = function() {
  if (this.instance) {
    return;
  }

  this.instance = new WebSocket("ws://192.168.1.250:8081");

  //event listeners
  this.instance.onopen = () => {
    console.log("connected websocket");
  };

  this.instance.onclose = e => {
    console.log(`Socket is closed for ${e.reason}.`);
  };

  this.instance.onerror = err => {
    console.error("Socket encountered error: ", err.message, "Closing socket");
    this.instance.close();
  };
};

garageDoorConnection.disconnect = function() {
  this.instance.close();
  this.instance = null;
};

garageDoorConnection.send = function(message) {
  this.instance.send(message);
};

export default garageDoorConnection;
