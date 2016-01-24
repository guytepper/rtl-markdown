var view = (function view() {
  var input = document.getElementById('input').value,
      output = document.getElementById('output'),
      html;

  function setOutput(input) {
    html = converter.convert(input);
    output.innerHTML = html;
  }

  var viewAPI = {
    setOutput: setOutput,
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

var app = (function())
