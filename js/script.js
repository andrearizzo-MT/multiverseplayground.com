//PARTICLE PHOTON GET REQUESTS
function getThePunisher(){

  $('.punisher').css('display', 'none');

  //PARTICLE PHOTON API SCHEMA
  var batteryVoltage = "https://api.particle.io/v1/devices/34003f001447353136383631/voltage?access_token=45b47fb7b84f6200ba7a9decf2788b1098394215"
  var batteryPercentage = "https://api.particle.io/v1/devices/34003f001447353136383631/percentage?access_token=45b47fb7b84f6200ba7a9decf2788b1098394215"
  //GET VOLTAGE REQUEST
  $.ajax({
    type: 'GET',
    url: batteryVoltage,
    success: function(voltage){
      console.log('success',voltage);

      //ASSIGNING PHOTON PARAMETERS TO HTML
      photonVoltage.innerHTML = voltage.result.toFixed(2) + " V";

      $.ajax({
        type: 'GET',
        url: batteryPercentage,
        success: function(percentage){
          console.log('success',percentage);

          //ASSIGNING PHOTON PARAMETERS TO HTML
          photonPercentage.innerHTML = percentage.result.toFixed(0) + " %";
          photonConnected.innerHTML = percentage.coreInfo.connected;

          $('.punisher').css('display', 'block');
        }
      })

    }
  })



}
