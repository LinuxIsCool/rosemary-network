'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('home', 'home.html', true),            
            new Route('welcome', 'welcome.html'),
            new Route('tothe', 'tothe.html'),
            new Route('newworld', 'newworld.html'),
        ]);
    }
    init();
}());
