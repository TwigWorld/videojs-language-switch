/* eslint no-console: 0 */

import document from 'global/document';
import QUnit from 'qunit';
import sinon from 'sinon';
import videojs from 'video.js';

import plugin from '../src/plugin';
import testData from './test-data.js';

const Player = videojs.getComponent('Player');

QUnit.test('the environment is sane', function(assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof sinon, 'object', 'sinon exists');
  assert.strictEqual(typeof videojs, 'function', 'videojs exists');
  assert.strictEqual(typeof plugin, 'function', 'plugin is a function');
});

QUnit.module('videojs-language-switch', {

  beforeEach() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = sinon.useFakeTimers();

    this.fixture = document.getElementById('qunit-fixture');
    this.video = document.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video);
  },

  afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
});

QUnit.test('registers itself with video.js', function(assert) {
  assert.expect(3);

  assert.strictEqual(
    typeof Player.prototype.languageSwitch,
    'function',
    'videojs-language-switch plugin was registered'
  );

  this.player.languageSwitch(testData);

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  assert.ok(
    this.player.contentEl().getElementsByClassName('vjs-language-switch'),
    'the menu item has a class of vjs-language-switch'
  );

  const languageSwitchItemsLenght = this.player.contentEl()
  .getElementsByClassName('vjs-language-switch').item(0)
  .getElementsByTagName('li').length;

  assert.ok(
    languageSwitchItemsLenght === 2,
      'menu should include 2 to items'
  );
});

QUnit.test('should select default language menu item', function(assert) {
  assert.expect(2);

  this.player.languageSwitch(testData);

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  const menuItems = this.player.contentEl()
    .getElementsByClassName('vjs-language-switch__item vjs-selected');

  assert.equal(
    menuItems.length, 1,
    'there sould be only one selected item'
  );

  const selectedLanguageText = menuItems.item(0)
  .getElementsByClassName('vjs-menu-item-text').item(0).innerHTML;

  assert.equal(
    selectedLanguageText, 'English',
    'the menu item has correct language selected'
  );
});

QUnit.test('should select language menu item on click', function(assert) {
  assert.expect(1);

  this.player.languageSwitch(testData);

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  const notSelectedItem = this.player.contentEl()
    .getElementsByClassName('vjs-language-switch__item')[1];

  notSelectedItem.click();

  assert.ok(
    notSelectedItem.classList.contains('vjs-selected'),
    'clicked menu item should have selected class'
  );
});

QUnit.test('should trigger \'changedlanguage\' event on language change',
  function(assert) {
    const done = assert.async();

    const selectedOptions = Object.assign(
      { sources: testData.languages[1].sources },
      { defaultSelection: false },
      { label: 'Portuguese' }
    );

    this.player.on('changedlanguage', function(event, payload) {
      assert.deepEqual(payload,
      selectedOptions, 'Passes languages as payload');
      done();
    });

    this.player.languageSwitch(testData);

    // Tick the clock forward enough to trigger the player to be "ready".
    this.clock.tick(10);

    const notSelectedItem = this.player.contentEl()
      .getElementsByClassName('vjs-language-switch__item')[1];

    notSelectedItem.click();
  });

QUnit.test('should add selected attribute to selected/played src', function(assert) {
  assert.expect(1);

  this.player.languageSwitch(testData);

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  const notSelectedItem = this.player.contentEl()
    .getElementsByClassName('vjs-language-switch__item')[1];

  notSelectedItem.click();

  const slelectedSource = this.player.currentSources()[0].selected;

  assert.ok(
    slelectedSource, true,
    'clicked menu item should add selected attribute'
  );
});

QUnit.test('add default icon class', function(assert) {
  assert.expect(1);

  this.player.languageSwitch(testData);

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  assert.ok(
    this.player.contentEl().getElementsByClassName('vjs-icon-placeholder icon-glob'),
    'the icon placeholder element has additional default class'
  );
});

QUnit.test('add custom icon class', function(assert) {
  assert.expect(1);

  const testDataWithIcon = Object.assign(
    testData,
    { buttonClass: 'icon-test' }
  );

  this.player.languageSwitch(testDataWithIcon);

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  assert.ok(
    this.player.contentEl().getElementsByClassName('vjs-icon-placeholder icon-test'),
    'the icon placeholder element has additional class'
  );
});

QUnit.test('place the plug in button in correct index in the control bar',
function(assert) {
  assert.expect(1);

  const testDataWithIcon = Object.assign(
    testData,
    { positionIndex: 12 }
  );

  this.player.languageSwitch(testDataWithIcon);

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  const languageSwitchButton = this.player.contentEl()
  .getElementsByClassName('vjs-language-switch')[0];
  const controlBar = languageSwitchButton.parentNode;
  const languageSwitchButtonIndex = Array.prototype.indexOf
  .call(controlBar.children, languageSwitchButton);

  assert.ok(
    languageSwitchButtonIndex === 12,
    'the language-select button has been placed in the provided position in control bar'
  );
});
