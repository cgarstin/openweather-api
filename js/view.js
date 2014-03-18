function ListView(model, elements) {
  this._model = model;
  this._elements = elements;

  this.listItemClicked = new Event(this);

  var _this = this;

    // attach model listeners
    this._model.weatherUpdated.attach(function () {
      _this.updateWeather();
    });

    // attach listeners to HTML controls
    this._elements.list.on('click', 'a', function (e) {
      e.preventDefault();
      _this.listItemClicked.notify({thisCity: $(this).text()});
    });
  }

  ListView.prototype = {
    show: function () {
      var list, items, key;

      list = this._elements.list;

      items = this._model.getItems();
      for (key in items) {
        if (items.hasOwnProperty(key)) {
          list.append($('<li><a href="#">' + items[key] + '</a></li>'));
        }
      }
    },

    updateWeather: function () {
      var iconPath = 'http://openweathermap.org/img/w/';
      $('.weatherResults .cityName').text(this._model.weatherInfo.cityName);
      $('.weatherResults .lat').text('Latitude: ' + this._model.weatherInfo.location.lat);
      $('.weatherResults .lat').text('Longitude: ' + this._model.weatherInfo.location.lng);
      $('.weatherResults .weatherConditions').text('Weather Conditions: ' + this._model.weatherInfo.weatherConditions.description);

      $('.weatherResults .temperature').text('Current temperature is: ' + this._model.weatherInfo.temperature.currentTemp);
      $('.weatherResults .minTemp').text('Today\'s low is: ' + this._model.weatherInfo.temperature.minTemp+',');
      $('.weatherResults .maxTemp').text('Today\'s high is: ' + this._model.weatherInfo.temperature.maxTemp);
      $('.weatherResults .weatherIcon').attr('src', iconPath+this._model.weatherInfo.weatherConditions.icon+'.png');
      $('.weatherResults .pressure').text('Atmospheric pressure: ' + this._model.weatherInfo.atmosphericPressure);
      $('.weatherResults .humidity').text('Humidity: ' + this._model.weatherInfo.humidity);
    }
  };