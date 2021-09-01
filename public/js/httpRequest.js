

window.addEventListener('load', () => {
  const spinner = document.querySelector('.spinner');
  const weather_container = document.querySelector('.weather-container');
  const error = document.querySelector('.error');
  const weather_error = document.querySelector('.weather-error');
  const weather_response = document.querySelector('.weather-response');
  const weatherForm = document.querySelector('form');
  const weather_name = document.querySelector('.weather-name');
  const weather_img = document.querySelector('.weather-img');
  const weather_temp = document.querySelector('.weather-temp');
  const weather_date = document.querySelector('.weather-date');

  spinner.style.display = "block";  
  weather_container.style.display = "none"; 

// Default fetch to main page.
  fetch('http://localhost:3001/weather?city="Lisboa PT"')
  .then((response) => {
    response.json().then((data) => {
      weather_container.style.display = "flex"; 
      spinner.style.display = "none";  
       
      if(data.error){
        weather_response.style.display = "none";
        error.style.display = "flex";
        weather_error.innerHTML = data.error;
      }else{
        error.style.display = "none";
        weather_response.style.display = "flex";
        weather_name.innerHTML = `${data.name} - ${data.region}, ${data.country}`;
        weather_img.setAttribute('src', data.icons[0]);
        weather_temp.innerHTML = data.temperature;
        weather_date.innerHTML = data.localTime;
      }
    })
  });

// On Form Submit.
weatherForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const input = document.querySelector('input');
    const inputValue = input.value;

    fetch(`http://localhost:3001/weather?city=${inputValue}`)
      .then((response) => {
        response.json().then((data) => {
          if(data.error){
            weather_response.style.display = "none";
            error.style.display = "block";
            weather_error.innerHTML = data.error;
          }else{
            error.style.display = "none";
            weather_response.style.display = "flex";
            weather_name.innerHTML = `${data.name} - ${data.region}, ${data.country}`;
            weather_img.setAttribute('src', data.icons[0]);
            weather_temp.innerHTML = data.temperature;
            weather_date.innerHTML = data.localTime;
          }
          input.value = "";
        })
      });
});

}); // window Load
