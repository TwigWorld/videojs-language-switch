# videojs-language-switch

Control for switching between video language versions

## Installation

```sh
npm install --save videojs-language-switch
```

The npm installation is preferred, but Bower works, too.

```sh
bower install  --save videojs-language-switch
```

## Usage

To include videojs-language-switch on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

Include an array of languages with sources. This plugin is created to work alongside other quality video controls so you can provide several resoulutions as well as types with each language.

The name property used for each language will be what appears within the menu item.


```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-language-switch.min.js"></script>
<script>
  var player = videojs('my-video');

  player.languageSwitch({
    languages: [
      {
        name: 'English',
        sources: [
          {
            src: 'http://bit.ly/2iJXRec',
            type: 'video/mp4',
            res: 'Medium'
          },
          {
            src: 'http://bit.ly/2jxmfwI',
            type: 'video/webm',
            res: 'Medium'
          }
        ]
      },
      {
        name: 'Portuguese',
        sources: [
          {
            src: 'http://bit.ly/2jVlmho',
            type: 'video/mp4',
            res: 'Medium'
          },
          {
            src: 'http://bit.ly/2jVlTzx',
            type: 'video/webm',
            res: 'Medium'
          }
        ]
      }
    ]
  });
</script>
```

You can provide an option for `buttonClass` which will add a CSS class to the button element so that you can style it as you wish.


```
  player.languageSwitch({
    languages: [
      ...
    ],
    buttonClass: 'icon-globe' // Default
  });
```

### Browserify

When using with Browserify, install videojs-language-switch via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-language-switch');

var player = videojs('my-video');

player.languageSwitch();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-language-switch'], function(videojs) {
  var player = videojs('my-video');

  player.languageSwitch();
});
```

## License

MIT. Copyright (c) Adam Oliver &lt;mail@adamoliver.net&gt;


[videojs]: http://videojs.com/
