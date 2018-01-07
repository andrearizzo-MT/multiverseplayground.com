//HIDE FOOTER
function hideFooter() {
    var x = document.getElementById("footerStats");
        x.style.display = "none";
}

function showFooter() {
    var x = document.getElementById("footerStats");
        x.style.display = "block";
}

//PARTICLE PHOTON GET REQUESTS
function getThePunisher(){

  //PARTICLE PHOTON API SCHEMA
  var deviceStats = "https://api.particle.io/v1/devices/34003f001447353136383631?access_token=45b47fb7b84f6200ba7a9decf2788b1098394215"
  var batteryVoltage = "https://api.particle.io/v1/devices/34003f001447353136383631/voltage?access_token=45b47fb7b84f6200ba7a9decf2788b1098394215"
  var batteryPercentage = "https://api.particle.io/v1/devices/34003f001447353136383631/percentage?access_token=45b47fb7b84f6200ba7a9decf2788b1098394215"
  var connected = ""

  //GET STATS REQUEST
  $.ajax({
    type: 'GET',
    url: deviceStats,
    success: function(stats){
      console.log('success',stats);

      //ASSIGNING VARIABLES AND INNERHTML VALUES
      connected = stats.connected;
      // photonName.innerHTML = stats.name;
      // photonConnected.innerHTML = "-------------";
      // photonVoltage.innerHTML = "--" + " V";
      // photonPercentage.innerHTML = "--" + " %"

      if (connected = false){
        photonName.innerHTML = stats.name;
        photonConnected.innerHTML = "OFFLINE " + '<i class="fas fa-times-circle"></i>';
        photonVoltage.innerHTML = "--" + "V";
        photonPercentage.innerHTML = "--" + "%"
        exit();
      } else {
        //GET VOLTAGE REQUEST
        $.ajax({
          type: 'GET',
          url: batteryVoltage,
          success: function(voltage){
            console.log('success',voltage);
            //GET PERCENTAGE REQUEST
            $.ajax({
              type: 'GET',
              url: batteryPercentage,
              success: function(percentage){
                console.log('success',percentage);

                //ASSIGNING JSON TO INNERHTML
                if(connected = true){
                  photonConnected.innerHTML = "ONLINE " + '<i class="fas fa-check-circle"></i>';
                }
                photonName.innerHTML = stats.name;
                photonVoltage.innerHTML = voltage.result.toFixed(1) + "V";
                photonPercentage.innerHTML = percentage.result.toFixed(1) + "%";
                showFooter();
              }
            })
          }
        })
      }
      setTimeout(function(){getThePunisher();}, 10000);
    }
  })
}
