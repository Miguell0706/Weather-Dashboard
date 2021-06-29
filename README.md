# Weather-Dashboard
The purpose of this homework assignment was to be able to code and launch an applciation that would gatther and display weather forecast.

## Work Criteria

This work criteria was taken from the homeowork assignment's READ.ME files
<br> <br/>

![Screenshot (1747)](https://user-images.githubusercontent.com/82692900/123725582-262fb000-d843-11eb-89e3-a27b0c544fb2.png)

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Functionality of the program 
 The program functions with the use of fetch APIs and utilizing their data to display weather forecast for the selected city onto the page. HTML,CSS and Javascripts were
 utilized in order to properly display the information to the user in a user friendly and eye pleasing way. The user has the option to look up a city using the search 
 or select past searches that are saved in the website on the lefthand side of the page.
 
 ### Javascript sample
 ```
 function getWeatherData(data) {
  var longitude = data.coord.lon;
  var latitude = data.coord.lat;
  var cityName = data.name;

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=imperial&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((info) => {
      render(cityName, info);
      console.log(info);
    });
}
```
![Screenshot (1745)](https://user-images.githubusercontent.com/82692900/123726218-6f343400-d844-11eb-9127-3df4d896fd92.png)
The javacsript above is one the blocks of code used to fetch information from the API to later be utilized to be appeneded to the webpage.

[Link to the website here!](https://miguell0706.github.io/Weather-Dashboard/)
