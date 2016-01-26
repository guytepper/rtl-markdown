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
  // Enables to write left-to-right content between <%ltr%> & <%endltr%> tags
  showdown.extension('ltr', function() {
    var matches = [];
    return [
        {
            regex: /<%ltr%>([^]+?)<%endltr%>/gi,
            replace: function(s, match) {
                matches.push(match); // pushes original content
                var n = matches.length - 1;
                // returns unique value to be replaced with original content
                return '%PLACEHOLDER' + n + '%';
            }
        },
        {
            type: 'output',
            filter: function (text) {
                for (var i=0; i< matches.length; ++i) {
                    // generates the unique value
                    var pat = '%PLACEHOLDER' + i + '%';
                    // re renders content -- to refactor?
                    matches[i] = new showdown.Converter().makeHtml(matches[i]);
                    // wraps content to make it left-to-right
                    var content = '<div class="ltr">' + matches[i] + '</div>';
                    text = text.replace(new RegExp(pat, 'gi'), content);
                }

                // resets array
                matches = [];
                return text;
              }
            }
        ]
    });

  var markdown = new showdown.Converter({ extensions: ['ltr'] });


  // Converts the input to Markdown using showdown.js
  function convert(input) {
    html = markdown.makeHtml(input);
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
