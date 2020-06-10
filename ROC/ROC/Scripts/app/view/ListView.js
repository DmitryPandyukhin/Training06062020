Ext.define('ROC.view.ListView', {
    extend: 'Ext.window.Window',
    id: 'idWinList',
    alias: 'widget.wgWinList',
    autoShow: 'true',
    modal: true,

    title: 'Список анкет',
    width: 600,
    height: 400,
    layout:
    {
        type: 'vbox',
        align: 'left'
    },

    initComponent: function () {
        this.buttons = [
                {
                    name: 'btAdd',
                    id: 'idAdd',
                    text: 'Добавить',
                    action: 'add'
                },
                {
                    name: 'btEdit',
                    id: 'idEdit',
                    text: 'Изменить',
                    action: 'edit'
                },
                {
                    name: 'btDelete',
                    id: 'idDelete',
                    text: 'Удалить',
                    action: 'delete'
                },
                {
                    name: 'btPrint',
                    id: 'idPrint',
                    text: 'Печать',
                    action: 'print'
                },
                {
                    name: 'btClose',
                    id: 'idListClose',
                    text: 'Выход',
                    action: 'close'
                }
        ]
        this.callParent(arguments);
    }
});