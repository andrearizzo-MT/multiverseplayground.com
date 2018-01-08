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
      //ASSIGNING VARIABLES AND INNERHTML VALUES
      connected = stats.connected;
      // photonName.innerHTML = stats.name;
      // photonConnected.innerHTML = "-------------";
      // photonVoltage.innerHTML = "--" + " V";
      // photonPercentage.innerHTML = "--" + " %"

      if (connected === false){
        photonPercentage.innerHTML = '<i class="fas fa-battery-empty w3-text-dark-grey fa-lg"></i>&nbsp;&nbsp;' + "n/a";
        photonName.innerHTML = '<i class="fas fa-fighter-jet w3-text-dark-grey fa-lg"></i>&nbsp;&nbsp;' + stats.name;
        photonConnected.innerHTML = '<i class="fas fa-plug w3-text-dark-grey fa-lg fa-rotate-90"></i>&nbsp;&nbsp;&nbsp;' + '<i class="fas fa-times-circle w3-text-red"></i>'; //OFFLINE
        photonLastTime.innerHTML = '<i class="far fa-clock w3-text-dark-grey fa-lg"></i>&nbsp;&nbsp;' + hourPlusOne + stats.last_heard.slice(13,19);
        photonLastDate.innerHTML = '<i class="fas fa-calendar-alt w3-text-dark-grey fa-lg"></i>&nbsp;&nbsp;' + stats.last_heard.slice(0,10);
        photonVoltage.innerHTML = '<i class="fab fa-medapps w3-text-dark-grey fa-lg"></i>&nbsp;&nbsp;&nbsp;' + "n/a";
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

                //ASSIGNING JSON TO INNERHTML
                if (percentage.result.toFixed(0) < 15){
                  photonPercentage.innerHTML = '<i class="fas fa-battery-empty w3-text-red fa-lg"></i>&nbsp;&nbsp;' + percentage.result.toFixed(0) + '<i class="fas fa-percent"></i>';
                } else if (percentage.result.toFixed(0) >= 15 && percentage.result.toFixed(0) <= 25){
                  photonPercentage.innerHTML = '<i class="fas fa-battery-quarter w3-text-orange fa-lg"></i>&nbsp;&nbsp;' + percentage.result.toFixed(0) + "%";
                } else if (percentage.result.toFixed(0) == 50 || percentage.result.toFixed(0) < 50 && percentage.result.toFixed(0) > 25 ){
                  photonPercentage.innerHTML = '<i class="fas fa-battery-half w3-text-yellow fa-lg"></i>&nbsp;&nbsp;' + percentage.result.toFixed(0) + "%";
                } else if (percentage.result.toFixed(0) == 75 || percentage.result.toFixed(0) < 75 && percentage.result.toFixed(0) > 50 ){
                  photonPercentage.innerHTML = '<i class="fas fa-battery-three-quarters w3-text-green fa-lg"></i>&nbsp;&nbsp;' + percentage.result.toFixed(0) + "%";
                } else if (percentage.result.toFixed(0) == 100 || percentage.result.toFixed(0) < 100 && percentage.result.toFixed(0) > 75 ){
                  photonPercentage.innerHTML = '<i class="fas fa-battery-full w3-text-white fa-lg"></i>&nbsp;&nbsp;' + percentage.result.toFixed(0) + '<i class="fas fa-percent fa-xs"></i>';
                }
                photonName.innerHTML = '<i class="fas fa-fighter-jet w3-text-dark-grey fa-lg"></i>&nbsp;&nbsp;' + stats.name;
                if(connected === true){
                  photonConnected.innerHTML = '<i class="fas fa-plug w3-text-dark-grey fa-lg fa-rotate-90"></i>&nbsp;&nbsp;&nbsp;' + '<i class="fas fa-check-circle w3-text-green fa-lg"></i>'; //ONLINE
                }
                photonLastTime.innerHTML = '<i class="far fa-clock w3-text-dark-grey fa-lg"></i>&nbsp;&nbsp;' + hourPlusOne + stats.last_heard.slice(13,19);
                photonLastDate.innerHTML = '<i class="fas fa-calendar-alt w3-text-dark-grey fa-lg"></i>&nbsp;&nbsp;' + stats.last_heard.slice(0,10);
                photonVoltage.innerHTML = '<i class="fab fa-medapps w3-text-dark-grey fa-lg"></i>&nbsp;&nbsp;&nbsp;' + voltage.result.toFixed(2) + "V";
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
