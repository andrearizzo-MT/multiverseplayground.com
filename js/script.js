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
      //JSON Time GMT i.e. + 1 since GMT+1 for MALTA
      var hourPlusOne = parseInt(stats.last_heard.slice(11,13)) + 1;
      var minutesPlusFive = parseInt(stats.last_heard.slice(14,16)) + 5;
      if (hourPlusOne == 24){
        hourPlusOne = "00";
      }
      //ASSIGNING VARIABLES AND INNERHTML VALUES
      connected = stats.connected;
      // photonName.innerHTML = stats.name;
      // photonConnected.innerHTML = "-------------";
      // photonVoltage.innerHTML = "--" + " V";
      // photonPercentage.innerHTML = "--" + " %"

      if (connected === false){
        photonName.innerHTML = '<i class="fas fa-fighter-jet w3-text-dark-grey fa-lg"></i>';
        photonNameResult.innerHTML = stats.name;
        photonConnected.innerHTML = '<i class="fas fa-plug w3-text-dark-grey fa-lg fa-rotate-90"></i>'; //OFFLINE
        photonConnectedResult.innerHTML = '<i class="fas fa-times-circle w3-text-red"></i>'; //OFFLINE
        photonPercentage.innerHTML = '<i class="fas fa-battery-empty w3-text-dark-grey fa-lg"></i>';
        photonPercentageResult.innerHTML = "N / A";
        photonVoltage.innerHTML = '<i class="fab fa-medapps w3-text-dark-grey fa-lg"></i>';
        photonVoltageResult.innerHTML = "N / A";
        document.getElementById('clock').style.display = "none";
        document.getElementById('handshake').style.display = "block";
        photonHandShake.innerHTML = '<i class="far fa-handshake w3-text-dark-grey fa-lg"></i>';
        photonHandShakeResult.innerHTML = hourPlusOne + stats.last_heard.slice(13,14) + minutesPlusFive + stats.last_heard.slice(16,19);
        photonLastDate.innerHTML = '<i class="fas fa-calendar-alt w3-text-dark-grey fa-lg"></i>';
        photonLastDateResult.innerHTML = stats.last_heard.slice(0,10);
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
                //JSON Time GMT i.e. + 1 since GMT+1 for MALTA
                var hourPlusOne = parseInt(stats.last_heard.slice(11,13)) + 1;
                if (hourPlusOne == 24){
                  hourPlusOne = "00";
                }
                //ASSIGNING JSON TO INNERHTML
                photonName.innerHTML = '<i class="fas fa-fighter-jet w3-text-dark-grey fa-lg"></i>';
                photonNameResult.innerHTML = stats.name;
                if(connected === true){
                  photonConnected.innerHTML = '<i class="fas fa-plug w3-text-dark-grey fa-lg fa-rotate-90"></i>'; //ONLINE
                  photonConnectedResult.innerHTML = '<i class="fas fa-check-circle w3-text-green"></i>'; //ONLINE
                }
                if (percentage.result.toFixed(0) < 15){
                  photonPercentage.innerHTML = '<i class="fas fa-battery-empty w3-text-red fa-lg"></i>';
                  photonPercentageResult.innerHTML = Math.floor(percentage.result) + " " + '<i class="fas fa-percent fa-xs"></i>';
                } else if (percentage.result.toFixed(0) >= 15 && percentage.result.toFixed(0) <= 25){
                  photonPercentage.innerHTML = '<i class="fas fa-battery-quarter w3-text-orange fa-lg"></i>';
                  photonPercentageResult.innerHTML = Math.floor(percentage.result) + " " + '<i class="fas fa-percent fa-xs"></i>';
                } else if (percentage.result.toFixed(0) == 50 || percentage.result.toFixed(0) < 50 && percentage.result.toFixed(0) > 25 ){
                  photonPercentage.innerHTML = '<i class="fas fa-battery-half w3-text-yellow fa-lg"></i>';
                  photonPercentageResult.innerHTML = Math.floor(percentage.result) + " " + '<i class="fas fa-percent fa-xs"></i>';
                } else if (percentage.result.toFixed(0) == 75 || percentage.result.toFixed(0) < 75 && percentage.result.toFixed(0) > 50 ){
                  photonPercentage.innerHTML = '<i class="fas fa-battery-three-quarters w3-text-green fa-lg"></i>';
                  photonPercentageResult.innerHTML = Math.floor(percentage.result) + " " + '<i class="fas fa-percent fa-xs"></i>';
                } else if (percentage.result.toFixed(0) >= 100 || percentage.result.toFixed(0) < 100 && percentage.result.toFixed(0) > 75 ){
                  photonPercentage.innerHTML = '<i class="fas fa-battery-full w3-text-white fa-lg"></i>';
                  photonPercentageResult.innerHTML = Math.floor(percentage.result) + " " + '<i class="fas fa-percent fa-xs"></i>';
                }
                photonVoltage.innerHTML = '<i class="fab fa-medapps w3-text-dark-grey fa-lg"></i>';
                photonVoltageResult.innerHTML = voltage.result.toFixed(2) + " V";
                document.getElementById('handshake').style.display = "none";
                document.getElementById('clock').style.display = "block";
                photonLastTime.innerHTML = '<i class="far fa-clock w3-text-dark-grey fa-lg"></i>';
                photonLastTimeResult.innerHTML = hourPlusOne + stats.last_heard.slice(13,19);
                photonLastDate.innerHTML = '<i class="fas fa-calendar-alt w3-text-dark-grey fa-lg"></i>';
                photonLastDateResult.innerHTML = stats.last_heard.slice(0,10);
                showFooter();
              }
            })
          }
        })
      }
      setTimeout(function(){getThePunisher();}, 60000);
    }
  })
}
