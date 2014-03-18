function ListModel(items) {
  this._items = items;

  this.weatherUpdated = new Event(this);

  this.weatherInfo = {
    cityName: '',
    location: {
      lat: '',
      lng: ''
    },
    weatherConditions: {
      description: '',
      icon: ''
    },
    temperature: {
      currentTemp: '',
      minTemp: '',
      maxTemp: ''
    },
    atmosphericPressure: '',
    humidity: ''
  }
}

ListModel.prototype = {
  getItems: function () {
    return [].concat(this._items);
  },
  setWeather: function (result) {
    this.weatherInfo.cityName = result.name;
    this.weatherInfo.location.lat = result.coord.lat;
    this.weatherInfo.location.lng = result.coord.lon;
    for(var i=0;i<result.weather.length;i++) {
      this.weatherInfo.weatherConditions.description = result.weather[i].description;
      this.weatherInfo.weatherConditions.icon = result.weather[i].icon;
    }
    this.weatherInfo.temperature.currentTemp = result.main.temp;
    this.weatherInfo.temperature.minTemp = result.main.temp_min;
    this.weatherInfo.temperature.maxTemp = result.main.temp_max;
    this.weatherInfo.atmosphericPressure = result.main.pressure;
    this.weatherInfo.humidity = result.main.humidity;

    this.weatherUpdated.notify();
  }
};