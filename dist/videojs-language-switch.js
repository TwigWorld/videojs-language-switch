/**
 * videojs-language-switch
 * @version 0.0.4
 * @copyright 2017 Adam Oliver <mail@adamoliver.net>
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsLanguageSwitch = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Default options for the plugin.
var defaults = {
  buttonClass: 'vjs-icon-cog'
};

var containerDropdownElement = void 0;

/**
* show or hide the dropdown
*/
var onToggleDropdown = function onToggleDropdown() {
  if (containerDropdownElement.className.indexOf('show') === -1) {
    containerDropdownElement.className += ' show';
  } else {
    containerDropdownElement.className = containerDropdownElement.className.replace(' show', '');
  }
};

/**
* event on selected the language
*/
var onLanguageSelect = function onLanguageSelect(player, language, selected) {
  var items = player.el().getElementsByClassName('vjs-language-switch-item');

  Array.from(items).forEach(function (item) {
    item.classList.remove('vjs-selected');

    if (item.innerHTML === language.name) {
      item.classList.add('vjs-selected');
    }
  });

  var currentTime = player.currentTime();

  player.src(language.sources.map(function (src) {
    return { src: src.src, type: src.type, res: src.res };
  }));

  player.on('loadedmetadata', function () {
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
var onPlayerReady = function onPlayerReady(player, options) {
  containerDropdownElement = document.createElement('div');
  containerDropdownElement.className = 'vjs-menu';

  var containerElement = document.createElement('div');

  containerElement.className = 'vjs-menu-button vjs-menu-button-popup\n                                vjs-control vjs-button vjs-language-container';

  var menu = document.createElement('div');

  menu.className = 'vjs-menu';

  var ulElement = document.createElement('ul');

  ulElement.className = 'vjs-menu-content';

  options.languages.map(function (language) {
    var liElement = document.createElement('li');

    liElement.innerText = language.name;

    if (language.name === options.defaultLanguage) {
      liElement.className = 'vjs-menu-item vjs-selected vjs-language-switch-item';
    } else {
      liElement.className = 'vjs-menu-item vjs-language-switch-item';
    }

    liElement.addEventListener('click', function (el) {
      onLanguageSelect(player, language, el.target);
    });

    ulElement.appendChild(liElement);
  });

  var textElement = document.createElement('span');

  textElement.innerText = 'Language';
  textElement.className = 'vjs-control-text';

  var iconElement = document.createElement('span');

  iconElement.className = options.buttonClass;

  containerDropdownElement.appendChild(ulElement);

  containerElement.appendChild(containerDropdownElement);
  containerElement.appendChild(textElement);
  containerElement.appendChild(iconElement);

  player.controlBar.el().insertBefore(containerElement, player.controlBar.fullscreenToggle.el());

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
var languageSwitch = function languageSwitch(options) {
  var _this = this;

  this.ready(function () {
    onPlayerReady(_this, _video2.default.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
_video2.default.plugin('languageSwitch', languageSwitch);

// Include the version number.
languageSwitch.VERSION = '0.0.4';

exports.default = languageSwitch;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});