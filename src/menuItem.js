const MenuItem = videojs.getComponent('MenuItem');

class LanguageMenuItem extends MenuItem {
    constructor(player, options) {
        super(player, options);

        this.selectable = true;
        this.sources = options;
    }

    handleClick(event) {
        MenuItem.prototype.handleClick.call(this, event);

        player.trigger('changedlanguage', this.sources);

    }

}

MenuItem.registerComponent('LanguageMenuItem', LanguageMenuItem);

export default LanguageMenuItem;