var magIsPolling = false;
var avg = {
  "x": -1862,
  "y": 2920,
  "z": 1762
};

function calculateRotation(x, y) {
  var normalizedX = x - avg.x;
  var normalizedY = y - avg.y;
  return ((Math.atan2(normalizedY, normalizedX)*180)/Math.PI);
}

// watch for button press event
setWatch(function(){

  //toggle magnetometer polling
  if(magIsPolling) {

    magIsPolling = false;
    Puck.magOff();
    digitalWrite(LED1,0);
    console.log("Mag Off");

  } else {

    magIsPolling = true;
    Puck.magOn();
    console.log("Mag On");
    Puck.on('mag', function(xyz) {
      var currentRotation = calculateRotation(xyz.x, xyz.y);
      console.log(currentRotation);
      if(Math.abs(currentRotation) >= 175 && Math.abs(currentRotation) <= 180) {
        console.log("NORTH");
        digitalWrite(LED1,1);
      } else {
        digitalWrite(LED1,0);
      }
    });

  }

}, BTN, {edge:"rising", debounce:50, repeat: true});