$(function () {
  
  var model = new ListModel(['London', 'Luton','Manchester','Birmingham']),
  view = new ListView(model, {
    'list': $('.citiesList')
  }),
  controller = new ListController(model, view);

  view.show();
});