function ListController(model, view) {
  this._model = model;
  this._view = view;

  var _this = this;


  this._view.listItemClicked.attach(function (sender, args) {
    if(_this._model.weatherInfo.cityName != args.thisCity) {
      _this.getWeather(args);
    }
  });
}

ListController.prototype = {
  getWeather: function(args) {
    var that = this;
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + args.thisCity + ',uk&units=metric',
      success:function(data){
        that._model.setWeather(data);
      }
    });
  }
};