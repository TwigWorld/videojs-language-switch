import LanguageMenuItem from './menuItem.js';

const MenuButton = videojs.getComponent('MenuButton');

/**
 * Share button.
*/

class LanguageMenuButton extends MenuButton {
  constructor(player, options) {

    player.availableLanguages = options.languages;

    super(player, options);

    this.addClass('vjs-language-switch');
    this.controlText(player.localize('Switch language'));
  }

  createItems() {
      let menuItems = [];

      menuItems = player.availableLanguages.map( language => {
        return new LanguageMenuItem(player, {
               sources: language.sources,
               label: language.name,
               selected: true
            });
      })

      return menuItems;
    }

    // update() {
    //   console.log('update');
    // }
}

export default LanguageMenuButton;