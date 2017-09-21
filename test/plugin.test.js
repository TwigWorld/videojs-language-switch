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
    Player.prototype.languageSwitch,
    plugin,
    'videojs-language-switch plugin was registered'
  );

  this.player.languageSwitch(testData);

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  assert.ok(
    this.player.hasClass('vjs-language-switch'),
    'the plugin adds a class to the player'
  );

  assert.ok(
    this.player.contentEl().classList.contains('vjs-language-switch'),
    'the menu item has a class of vjs-language-switch'
  );
});

QUnit.test('should select default language menu item', function(assert) {
  assert.expect(2);

  this.player.languageSwitch(testData);

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  const menuItems = this.player.contentEl()
    .getElementsByClassName('vjs-language-switch-item vjs-selected');

  assert.equal(
    menuItems.length, 1,
    'there sould be only one selected item'
  );

  assert.equal(
    menuItems[0].innerHTML, 'English',
    'the menu item has correct language selected'
  );
});

QUnit.test('should select language menu item on click', function(assert) {
  assert.expect(1);

  this.player.languageSwitch(testData);

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  const notSelectedItem = this.player.contentEl()
    .getElementsByClassName('vjs-language-switch-item')[1];

  notSelectedItem.click();

  assert.ok(
    notSelectedItem.classList.contains('vjs-selected'),
    'clicked menu item should have selected class'
  );
});
