const MenuItem = videojs.getComponent('MenuItem');

class LanguageMenuItem extends MenuItem {
    constructor(player, options) {
    super(player, options);

    console.log('item', options);

    MenuItem.call(this, player, options);

    options.selectable = true;

    this.src = options.src;
    }
}

export default LanguageMenuItem;


    //   constructor: function(player, options){
    //     options.selectable = true;
    //     // Sets this.player_, this.options_ and initializes the component
    //     MenuItem.call(this, player, options);
    //     this.src = options.src;

    //     player.on('resolutionchange', videojs.bind(this, this.update));
    //   }
    // } );
    // ResolutionMenuItem.prototype.handleClick = function(event){
    //   MenuItem.prototype.handleClick.call(this,event);
    //   this.player_.currentResolution(this.options_.label);
    // };
    // ResolutionMenuItem.prototype.update = function(){
    //   var selection = this.player_.currentResolution();
    //   this.selected(this.options_.label === selection.label);
    // };
    // MenuItem.registerComponent('ResolutionMenuItem', ResolutionMenuItem);
