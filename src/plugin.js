import videojs from 'video.js';

// Default options for the plugin.
const defaults = {
  buttonClass: 'icon-globe'
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
  containerDropdownElement.className = 'vjs-language-dropdown';

  let containerElement = document.createElement('div');

  containerElement.className = 'vjs-language-container';

  let buttonElement = document.createElement('button');

  buttonElement.className = `vjs-language-link ${options.buttonClass}`;
  buttonElement.onclick = onToggleDropdown;
  buttonElement.innerText = 'Language';

  let ulElement = document.createElement('ul');

  options.languages.map(function(language) {
    let liElement = document.createElement('li');

    let linkElement = document.createElement('a');

    linkElement.innerText = language.name;
    linkElement.setAttribute('href', '#');
    linkElement.addEventListener('click', function() {
      event.preventDefault();
      onLanguageSelect(player, language);
    });

    liElement.appendChild(linkElement);
    ulElement.appendChild(liElement);
  });

  containerDropdownElement.appendChild(ulElement);
  containerElement.appendChild(containerDropdownElement);
  containerElement.appendChild(buttonElement);

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
