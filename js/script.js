var view = (function view() {
  var input = document.getElementById('input'),
      output = document.getElementById('output'),
      html;

  // Converts the input's value to Markdown
  // Returns the formatted html
  function setOutput(input) {
    html = converter.convert(input.value);
    output.innerHTML = html;
  }

  // Attaches Event Listeners
  function attachListeners() {

    // Refreshes the output on every key the user presses
    input.addEventListener('keyup', function() {
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

    // Converts the input to Markdown using showdown.js
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

  // var openSans = new FontFace('Open Sans Hebrew', "u")

  function init() {
    view.attachListeners();
  }

  var appAPI = {
    init: init,
  };

  return appAPI;
})();

app.init();

// TODO: make it load the font correctly
// right now it says the font loaded if though it doesn't exist
document.fonts.load("50px NotWorkingCorrectly")
              .then(function() {
                console.log("font loaded");
              })
              .catch(function() {
                console.log("font failed to load")
              });
