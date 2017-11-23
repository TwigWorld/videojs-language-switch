import LanguageMenuItem from './menuItem.js';

const MenuButton = videojs.getComponent('MenuButton');

/**
 * Share button.
 */
class LanguageMenuButton extends MenuButton {
  constructor(player, options) {
    super(player, options);

    this.addClass('vjs-menu-button');
    this.addClass('vjs-language-switch');
    this.addClass('vjs-icon-cog');
    this.controlText(player.localize('Share'));
  }

  createItems() {

  const bo = {
          label: 'boo',
          src: 'boo',
          selected: false
        }

    console.log(new LanguageMenuItem(player, bo))

    return [{'hello': 'boooo'}];
  }

}

export default LanguageMenuButton;