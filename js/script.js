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
            type: 'lang',
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

  function loadFonts() {
    // Fonts declrations
    var openSans = new FontFace('Open Sans Hebrew',
        'url(https://fonts.gstatic.com/ea/opensanshebrew/v3/OpenSansHebrew-Regular.woff) format("woff")',
        { weight: '400' });
    var openSansBold = new FontFace('Open Sans Hebrew',
        'url(https://fonts.gstatic.com/ea/opensanshebrew/v3/OpenSansHebrew-Bold.woff) format("woff")',
        { weight: '700' });

    function loader(font) {
      font.load().then(function() {
                  console.log(font);
                  document.fonts.add(font);
                }).catch(function() {
                  console.log("font failed to load");
                });
    }
    loader(openSansBold); // for title
    loader(openSans); // for body
  }

  // Adding @font-face to <head> if browser not supporting
  // the CSS Font Loading API
  function loadFontsFallback() {
    var style = document.createElement('style');

    // Regular @font-face [minified]
    var openSans = "@font-face{font-family:'Open Sans Hebrew';font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/ea/opensanshebrew/v3/OpenSansHebrew-Regular.woff2) format('woff2'),url(https://fonts.gstatic.com/ea/opensanshebrew/v3/OpenSansHebrew-Regular.woff) format('woff'),url(https://fonts.gstatic.com/ea/opensanshebrew/v3/OpenSansHebrew-Regular.ttf) format('truetype')}";
    var openSansBold = "@font-face{font-family:'Open Sans Hebrew';font-style:normal;font-weight:700;src:url(https://fonts.gstatic.com/ea/opensanshebrew/v3/OpenSansHebrew-Bold.woff2) format('woff2'),url(https://fonts.gstatic.com/ea/opensanshebrew/v3/OpenSansHebrew-Bold.woff) format('woff'),url(https://fonts.gstatic.com/ea/opensanshebrew/v3/OpenSansHebrew-Bold.ttf) format('truetype')}";
    style.innerHTML = openSans + " " + openSansBold;

    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
  }

  function init() {
    view.attachListeners();

    // checks for CSS Font Loading API avaiability
    if ( document.fonts ) {
      loadFonts();
    } else {
      loadFontsFallback();
    }
  }

  var appAPI = {
    init: init,
  };

  return appAPI;
})();

app.init();
