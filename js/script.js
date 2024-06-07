let todayName = document.getElementById("today_date_name");
let todayNumber = document.getElementById("today_date_number");
let todayMonth = document.getElementById("today_date_month");
let todayLocation = document.getElementById("today_location");
let todayConditionImg =document.getElementById("today_condition_img");
let todayTemp = document.getElementById("today_temp");
let todayConditionText = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind_direction");

//next day 
let nextDay = document.getElementsByClassName('next_day_name');
let nextMaxTemp = document.getElementsByClassName("next_max_temp");
let nextMinTemp = document.getElementsByClassName("next_min_temp");
let nextConditionImg = document.getElementsByClassName("next_condition_img");
let nextConditionText = document.getElementsByClassName("next_condition_text");

// search input
let searchInput = document.getElementById("search")


async function getWeather(city){
    let weatherResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7d06209052dd48eea93145458241001%20&q=${city}&days=3`);
    let weatherData = await weatherResponse.json();
    return weatherData
}

function displayData(data){
    let todayDate =new Date();
    todayMonth.innerHTML =todayDate.toLocaleDateString("en-us",{month:"long"})
    todayName.innerHTML = todayDate.toLocaleDateString("en-us",{weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c +"°C";
    todayConditionImg.setAttribute('src', data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+'%'
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection = data.current.wind_dir


}


function displayNextDays(data){
let forecastData = data.forecast.forecastday
console.log(forecastData)


for(i=0; i<forecastData.length; i++)
    {
        let nextDate = new Date(forecastData[i+1].date);
    nextDay[i].innerHTML = nextDate.toLocaleDateString("en-us",{weekday:"long"})
    nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c +"°C";
    nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c +"°C";
    nextConditionImg[i].setAttribute('src', forecastData[i+1].day.condition.icon)
    nextConditionText[i].innerHTML =  forecastData[i+1].day.condition.text
}
}


async function startApp(city="cairo"){
    let weatherData = await getWeather(city)
    console.log(weatherData)
    if(!weatherData.error){
        displayData(weatherData)
        displayNextDays(weatherData)
    }

}

startApp()


searchInput.addEventListener('input' ,function(){
    startApp(searchInput.value)
})