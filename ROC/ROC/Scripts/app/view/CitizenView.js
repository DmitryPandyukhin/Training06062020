Ext.define('ROC.view.CitizenView', {
    extend: 'Ext.window.Window',
    id: 'idWinCitizen',
    alias: 'widget.wgWinCitizen',
    autoShow: 'true',
    modal: true,

    title: 'Анкета гражданина',
    width: 220,
    height: 300,    
    layout:
    {
        type: 'vbox',
        align: 'left'
    },
    initComponent: function () {
        var store = Ext.create('Ext.data.Store', {
            fields: ['Id', 'LastName', 'FirstName', 'MiddleName', 'DateOfBirth']
        });
        this.store = store,
        this.items = [
            {
                xtype: 'textfield',
                id: 'idCitId',
                hidden: true
            },
            {
                xtype: 'textfield',
                id: 'idCitLastName',                
                fieldLabel: 'Фамилия',
                name: 'LastName',
                labelAlign: 'top',
                margin: '5 5 5 5',
                width: 200
            },
            {
                xtype: 'textfield',
                id: 'idCitFirstName',
                fieldLabel: 'Имя',
                name: 'Firstname',
                labelAlign: 'top',
                margin: '5 5 5 5',
                width: 200
            },
            {
                xtype: 'textfield',
                id: 'idCitMiddleName',
                fieldLabel: 'Отчество',
                name: 'MiddleName',
                labelAlign: 'top',
                margin: '5 5 5 5',
                width: 200
            },
            {
                xtype: 'datefield',
                id: 'idCitDateOfBirth',
                fieldLabel: 'Дата рождения',
                name: 'DateOfBirth',
                labelAlign: 'top',
                margin: '5 5 5 5',
                format: 'd.m.Y',
                width: 200
            },
        ],
        this.callParent(arguments);
    }
});