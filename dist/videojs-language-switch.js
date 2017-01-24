/**
 * videojs-language-switch
 * @version 0.0.1
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
  buttonClass: 'icon-globe'
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
var onLanguageSelect = function onLanguageSelect(player, language) {

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
  containerDropdownElement.className = 'vjs-language-dropdown';

  var containerElement = document.createElement('div');

  containerElement.className = 'vjs-language-container';

  var buttonElement = document.createElement('button');

  buttonElement.className = 'vjs-language-link ' + options.buttonClass;
  buttonElement.onclick = onToggleDropdown;
  buttonElement.innerText = 'Language';

  var ulElement = document.createElement('ul');

  options.languages.map(function (language) {
    var liElement = document.createElement('li');

    var linkElement = document.createElement('a');

    linkElement.innerText = language.name;
    linkElement.setAttribute('href', '#');
    linkElement.addEventListener('click', function () {
      event.preventDefault();
      onLanguageSelect(player, language);
    });

    liElement.appendChild(linkElement);
    ulElement.appendChild(liElement);
  });

  containerDropdownElement.appendChild(ulElement);
  containerElement.appendChild(containerDropdownElement);
  containerElement.appendChild(buttonElement);

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
languageSwitch.VERSION = '0.0.1';

exports.default = languageSwitch;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});