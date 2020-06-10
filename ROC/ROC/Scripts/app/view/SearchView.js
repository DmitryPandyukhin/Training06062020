Ext.define('ROC.view.SearchView', {
    extend: 'Ext.window.Window',
    id: 'idWinSearch',
    alias: 'widget.wgWinSearch',
    autoShow: 'true',

    title: 'Условия поиска',
    width: 240,
    height: 350,
    layout:
    {
        type: 'vbox',
        align: 'left'
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'textfield',
                id: 'idSearchLastName',
                fieldLabel: 'Фамилия',
                name: 'LastName',
                labelAlign: 'top',
                margin: '5 5 5 5',
                width: 220
            },
            {
                xtype: 'textfield',
                id: 'idSearchFirstName',
                fieldLabel: 'Имя',                
                name: 'FirstName',
                labelAlign: 'top',
                margin: '5 5 5 5',
                width: 220
            },
            {
                xtype: 'textfield',
                id: 'idSearchMiddleName',
                fieldLabel: 'Отчество',
                name: 'MiddleName',
                labelAlign: 'top',
                margin: '5 5 5 5',
                width: 220
            },
            {
                xtype: 'datefield',
                id: 'idSearchBeginDate',
                fieldLabel: 'Начало периода даты рождения',
                name: 'BeginDate',
                labelAlign: 'top',
                margin: '5 5 5 5',
                format: 'd.m.Y',
                width: 220
            },
            {
                xtype: 'datefield',
                id: 'idSearchEndDate',
                fieldLabel: 'Окончание периода даты рождения',
                name: 'EndDate',
                labelAlign: 'top',
                margin: '5 5 5 5',
                format: 'd.m.Y',
                width: 220
            }
        ],
            this.buttons = [
                {
                    text: 'Поиск',
                    name: 'btSearch',
                    id: 'idSearch',
                    action: 'search'
                },
                {
                    text: 'Выход',
                    id: 'idSearchClose',
                    handler: function () {
                        this.up('.window').close();
                    }
                }]
        this.callParent(arguments);
    }
});