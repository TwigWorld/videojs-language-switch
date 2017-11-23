import LanguageMenuItem from './menuItem.js';

const MenuButton = videojs.getComponent('MenuButton');

/**
 * Share button.
*/

class LanguageMenuButton extends MenuButton {
  constructor(player, options) {
    super(player, options);

     console.log('optionssdnkjnkjn', options);

    this.addClass('vjs-menu-button');
    this.addClass('vjs-language-switch');
    this.addClass('vjs-icon-cog');
    this.controlText(player.localize('Share'));

  }

}

export default LanguageMenuButton;