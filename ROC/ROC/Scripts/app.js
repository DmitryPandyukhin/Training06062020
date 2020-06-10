Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'ROC',
    //тут СОЗДАЮТСЯ контроллеры
    controllers: [
        'SearchController',
        'ListController',
        'CitizenController',
        'CitizenController'
    ],
    views: [
        'SearchView'
    ],
    appFolder: 'scripts/app',
    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'wgWinSearch'
            }
        });
    }    

});