const generate = require('videojs-generate-karma-config');

module.exports = function(config) {

  // see https://github.com/videojs/videojs-generate-karma-config
  // for options
  const options = {
    browsers(aboutToRun) {
      // Safari launching via AppleScript is unreliable locally; restrict to Chrome.
      return aboutToRun.filter((b) => !(/(Safari|Firefox)/).test(b));
    }
  };

  config = generate(config, options);

  // any other custom stuff not supported by options here!
};
