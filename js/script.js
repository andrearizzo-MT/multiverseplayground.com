//PARTICLE PHOTON GET REQUESTS
function getThePunisher(){

  $('.punisher').css('display', 'none');

  //PARTICLE PHOTON API SCHEMA
  var deviceStats = "https://api.particle.io/v1/devices/34003f001447353136383631?access_token=45b47fb7b84f6200ba7a9decf2788b1098394215"
  var batteryVoltage = "https://api.particle.io/v1/devices/34003f001447353136383631/voltage?access_token=45b47fb7b84f6200ba7a9decf2788b1098394215"
  var batteryPercentage = "https://api.particle.io/v1/devices/34003f001447353136383631/percentage?access_token=45b47fb7b84f6200ba7a9decf2788b1098394215"

  //GET STATS REQUEST
  $.ajax({
    type: 'GET',
    url: deviceStats,
    success: function(stats){
      console.log('success',stats);
      //ASSIGNING JSON TO HTML
      photonName.innerHTML = stats.name;
      photonConnected.innerHTML = stats.connected;
      photonVoltage.innerHTML = "N/A"
      photonPercentage.innerHTML = "N/A"

      if (stats.connected = false){
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

                //ASSIGNING JSON TO HTML
                photonVoltage.innerHTML = voltage.result.toFixed(2) + " V";
                photonPercentage.innerHTML = percentage.result.toFixed(0) + " %";

              }
            })
          }
        })
      }
    $('.punisher').css('display', 'block');
    }
  })
}
