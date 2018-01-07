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

      if (connected === false){
        photonName.innerHTML = stats.name;
        photonConnected.innerHTML = '<i class="fas fa-times-circle w3-text-red"></i>' + " OFFLINE";
        photonLastPing.innerHTML = stats.last_heard.slice(0,10) + " " + '<i class="fas fa-space-shuttle w3-text-light-green"></i>' + " " + stats.last_heard.slice(11,19);
        photonVoltage.innerHTML = "n/a";
        photonPercentage.innerHTML = "n/a";
        showFooter();
      } else if (connected === true) {
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
                if(connected === true){
                  photonConnected.innerHTML = '<i class="fas fa-check-circle w3-text-green"></i>' + " ONLINE";
                }
                photonName.innerHTML = stats.name;
                photonLastPing.innerHTML = stats.last_heard.slice(0,10) + " " + '<i class="fas fa-space-shuttle w3-text-light-green"></i>' + " " + stats.last_heard.slice(11,19);
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
