import videojs from 'video.js';

// Default options for the plugin.
const defaults = {
  buttonClass: 'vjs-icon-cog'
};

let containerDropdownElement;

/**
* show or hide the dropdown
*/
const onToggleDropdown = () => {
  if (containerDropdownElement.className.indexOf('show') === -1) {
    containerDropdownElement.className += ' show';
  } else {
    containerDropdownElement.className = containerDropdownElement.className
                                            .replace(' show', '');
  }
};

/**
* event on selected the language
*/
const onLanguageSelect = (player, language) => {

  let currentTime = player.currentTime();

  player.src(language.sources.map(function(src) {
    return {src: src.src, type: src.type, res: src.res};
  }));

  player.on('loadedmetadata', function() {
    player.currentTime(currentTime);
    player.play();
  });

  onToggleDropdown();
};

/**
 * Function to invoke when the player is ready.
 * @function onPlayerReady
 * @param    {Player} player
 * @param    {Object} [options={}]
 */
const onPlayerReady = (player, options) => {
  containerDropdownElement = document.createElement('div');
  containerDropdownElement.className = 'vjs-menu';

  let containerElement = document.createElement('div');

  containerElement.className = `vjs-menu-button vjs-menu-button-popup
                                vjs-control vjs-button vjs-language-container`;

  let menu = document.createElement('div');

  menu.className = 'vjs-menu';

  let ulElement = document.createElement('ul');

  ulElement.className = 'vjs-menu-content';

  options.languages.map(function(language) {
    let liElement = document.createElement('li');

    liElement.innerText = language.name;
    liElement.className = 'vjs-menu-item';

    liElement.addEventListener('click', function() {
      onLanguageSelect(player, language);
    });

    ulElement.appendChild(liElement);
  });

  let textElement = document.createElement('span');

  textElement.innerText = 'Language';
  textElement.className = 'vjs-control-text';

  let iconElement = document.createElement('span');

  iconElement.className = options.buttonClass;

  containerDropdownElement.appendChild(ulElement);

  containerElement.appendChild(containerDropdownElement);
  containerElement.appendChild(textElement);
  containerElement.appendChild(iconElement);

  player.controlBar.el().insertBefore(
    containerElement,
    player.controlBar.fullscreenToggle.el()
  );

  player.addClass('vjs-language-switch');
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a 'ready' state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for 'ready'!
 *
 * @function languageSwitch
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const languageSwitch = function(options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
videojs.plugin('languageSwitch', languageSwitch);

// Include the version number.
languageSwitch.VERSION = '__VERSION__';

export default languageSwitch;
