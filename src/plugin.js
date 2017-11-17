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
const onLanguageSelect = (player, language, selected) => {
  const items = player.el().getElementsByClassName('vjs-language-switch-item');

  Array.from(items).forEach((item) => {
    item.classList.remove('vjs-selected');

    if (item.innerHTML === language.name) {
      item.classList.add('vjs-selected');
    }
  });

  let currentTime = player.currentTime();

  const selectedCurrentSource = player.currentSources().filter((src) => {
    if (src.selected) {
      return src.selected === true;
    }
    return;
  });

  if (selectedCurrentSource.length) {
    const currenSelectedType = selectedCurrentSource[0].type;
    const currenSelectedQuality = selectedCurrentSource[0].label;

    /* move selected src to the first place in the array */
    /* because that the one which will be automaticaly played by the player */
    const orderedSouces = language.sources;

    language.sources.map((src, index) => {
      if (src.label === currenSelectedQuality && src.type === currenSelectedType) {
        const selectedSrc = orderedSouces.splice(index, 1);

        orderedSouces.unshift(selectedSrc[0]);
      }
    });
  }

  player.src(language.sources.map(function(src, index) {
    const defaultSrcData =
    { src: src.src, type: src.type, res: src.res, label: src.label };

    if (!selectedCurrentSource.length && index === 0) {
      return Object.assign(defaultSrcData, { selected: true });
    }

    return defaultSrcData;
  }));

  player.trigger('changedlanguage', language.sources);

  player.on('loadedmetadata', function() {
    player.currentTime(currentTime);
    player.play();
  });

  containerDropdownElement.classList.remove('show');
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

  document.addEventListener('touchend', function(el) {
    el.stopPropagation();
    if (el.target.classList.contains('vjs-language-switch-button')) {
      onToggleDropdown();
    } else {
      containerDropdownElement.classList.remove('show');
    }
  });

  ulElement.className = 'vjs-menu-content';

  options.languages.map(function(language) {
    let liElement = document.createElement('li');

    liElement.innerText = language.name;

    if (language.name === options.defaultLanguage) {
      liElement.className = 'vjs-menu-item vjs-selected vjs-language-switch-item';
    } else {
      liElement.className = 'vjs-menu-item vjs-language-switch-item';
    }

    liElement.addEventListener('click', function(el) {
      onLanguageSelect(player, language, el.target);
    });

    liElement.addEventListener('touchstart', function(el) {
      onLanguageSelect(player, language, el.target);
    });

    ulElement.appendChild(liElement);
  });

  let textElement = document.createElement('span');

  textElement.innerText = 'Language';
  textElement.className = 'vjs-control-text';

  let iconElement = document.createElement('span');

  const defaultBtnClass = 'vjs-language-switch-button ';

  iconElement.className = defaultBtnClass.concat(options.buttonClass);

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
videojs.registerPlugin('languageSwitch', languageSwitch);

// Include the version number.
languageSwitch.VERSION = '__VERSION__';

export default languageSwitch;
