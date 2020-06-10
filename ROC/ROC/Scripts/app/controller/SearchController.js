Ext.define('ROC.controller.SearchController', {
    extend: 'Ext.app.Controller',

    views: [
        'SearchView',
    ],
    controllers: ['ListController'],

    init: function () {
        this.control({
            'wgWinSearch button[action=search]': {
                click: this.search
            }
        })
    },
    search: function (button) {        
        var win = button.up('window');        
        var LastName = win.down('textfield[id=idSearchLastName]');
        var FirstName = win.down('textfield[id=idSearchFirstName]');
        var MiddleName = win.down('textfield[id=idSearchMiddleName]');
        var BeginDate = win.down('textfield[id=idSearchBeginDate]');
        var EndDate = win.down('textfield[id=idSearchEndDate]');
        var myMask = new Ext.LoadMask(Ext.getBody(), { msg: "Выполняется поиск..." });
        myMask.show();

        var store = Ext.create('Ext.data.JsonStore', {
            pageSize: 50,            
            fields: [
                { name: 'Id' },
                { name: 'LastName' },
                { name: 'FirstName' },
                { name: 'MiddleName' },
                { name: 'DateOfBirth' }
            ],

            scope: this,
            remoteSort: true,
            proxy: {
                type: 'ajax',
                scope: this,
                url: 'Request/GetCitizens', 
                autoLoad: {
                    params: {
                        start: 0
                    }
                },
                extraParams: {
                    LastName: LastName.getValue(),
                    FirstName: FirstName.getValue(),
                    MiddleName: MiddleName.getValue(),
                    BeginDate: BeginDate.getValue(),
                    EndDate: EndDate.getValue()
                },
                reader: {
                    type: 'json',
                    root: 'Data'
                }
            }
        }); 

        grid = Ext.create('Ext.grid.Panel', {
            width: '100%',
            pageSize: 20,
            id: 'idGrid',
            store: store,
            columns: [
                {
                xtype: 'rownumberer'
                },
                {
                    dataIndex: 'id',
                    hidden: true
                },
                {
                    text: 'Фамилия',
                    dataIndex: 'LastName',
                    flex: 1
                },
                {
                    text: 'Имя',
                    dataIndex: 'FirstName',
                    flex: 1
                },
                {
                    text: 'Отчество',
                    dataIndex: 'MiddleName',
                    flex: 1
                },
                {
                    text: 'Дата рождения',
                    dataIndex: 'DateOfBirth',
                    flex: 1
                }                
            ],
            renderTo: Ext.getBody()
        });

        Ext.define('ListView2', {
            extend: 'ROC.view.ListView',
            id: 'idWinList2',
            alias: 'widget.wgWinList2',
            autoScroll: true,
            items: [grid],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: store,
                dock: 'bottom',
                displayInfo: true,
                beforePageText: 'Страница',
                afterPageText: 'из {0}',
                displayMsg: 'Анкеты {0} - {1} из {2}'
            }]
        });
        console.log(store);

        Ext.widget('wgWinList2');
        store.loadPage(1);

        myMask.hide();
    }
});
