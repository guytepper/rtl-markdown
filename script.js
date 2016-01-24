var view = (function view() {
  var input = document.getElementById('input'),
      output = document.getElementById('output'),
      html;

  function setOutput(input) {
    html = converter.convert(input.value);
    output.innerHTML = html;
  }

  function attachListeners() {
    input.addEventListener('keyup', function() {
      console.log('Key up.');
      setOutput(input);
    })
  }

  var viewAPI = {
    setOutput: setOutput,
    attachListeners: attachListeners,
  };

  return viewAPI;

})();

var converter = (function converter(showdown) {
    var showdown = new showdown.Converter();

    function convert(input) {
      html = showdown.makeHtml(input);
      return html;
    }

    var converterAPI = {
      convert: convert,
    };

    return converterAPI;

})(showdown);

var app = (function() {
  function init() {
    view.attachListeners();
  }

  var appAPI = {
    init: init,
  };

  return appAPI;
})();

app.init();
