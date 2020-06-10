Ext.define('ROC.controller.ListController', {
    extend: 'Ext.app.Controller',

    views: [
        'ListView'    
    ],
    controllers: ['CitizenController'],

    init: function () {
        this.control({
            'wgWinList button[action=add]': {
                click: this.add
            },
            'wgWinList button[action=edit]': {
                click: this.edit
            },
            'wgWinList button[action=delete]': {
                click: this.delete
            },
            'wgWinList button[action=print]': {
                click: this.print
            },
            'wgWinList button[action=close]': {
                click: this.close
            }
        })
    },
    add: function () {
        Ext.define('CitizenViewAdd', {
            extend: 'ROC.view.CitizenView',
            id: 'idWinCitizenAdd',
            alias: 'widget.wgWinCitizenAdd',
            buttons : [
                {
                    name: 'btCloseAdd',
                    id: 'idCitCloseAdd',
                    text: 'Выход',
                    action: 'closeAdd'
                }
            ]            
        });
        Ext.widget('wgWinCitizenAdd');
    },
    edit: function () {          
        Ext.define('CitizenViewEdit', {
            extend: 'ROC.view.CitizenView',            
            id: 'idWinCitizenEdit',
            alias: 'widget.wgWinCitizenEdit',
            buttons: [
                {
                    name: 'btCloseEdit',
                    id: 'idCitCloseEdit',
                    text: 'Выход',
                    action: 'closeEdit'
                }
            ]
        });        
        grid = Ext.getCmp('idGrid');
        row = grid.getSelectionModel().getSelection();        

        if (row.length > 0) {
            win = Ext.widget('wgWinCitizenEdit');
            win.down('textfield[id=idCitLastName]').setValue(row[0].data.LastName.trim());
            win.down('textfield[id=idCitFirstName]').setValue(row[0].data.FirstName.trim());
            if (row[0].data.MiddleName.length > 0)
                win.down('textfield[id=idCitMiddleName]').setValue(row[0].data.MiddleName.trim());
            win.down('textfield[id=idCitDateOfBirth]').setValue(row[0].data.DateOfBirth);
            win.down('textfield[id=idCitId]').setValue(row[0].data.Id);
        }
        else {
            alert("Не выбрано ни одной записи");
        }
    },
    delete: function () {
        Ext.Msg.confirm("Сохранение", "Удалить?", function (btn) {
            if (btn == 'yes') {
                grid = Ext.getCmp('idGrid');
                row = grid.getSelectionModel().getSelection();
                Ext.Ajax.request({
                    url: 'Request/DeleteCitizen',
                    method: 'Get',
                    params: {
                        Id: row[0].data.Id
                    },
                    success: function (response, options) {
                        var JsonParse = JSON.parse(response.responseText)
                        if (JsonParse = "true") {
                            grid.store.remove(row);
                        }
                    },
                    failure: function (jsonResp) {
                        console.log('request failure');
                    }
                });
            }
        });
    },
    print: function () {
        var myMask = new Ext.LoadMask(Ext.getBody(), { msg: "Выполняется формирование отчета..." });
        myMask.show();
        grid = Ext.getCmp('idGrid');
        var data = [];
        grid.store.each(function (item) {
            data.push(item.data);
        });
        var json = Ext.encode(data);
        
        Ext.Ajax.request({
            url: 'Request/PrintCitizen',
            params: { jsonString: json },
            
            success: function (response, action) {
                var JsonParse = JSON.parse(response.responseText);
                var blobUrl = _createBlobUrlFromBase64(JsonParse, 'application/pdf');
                Ext.create('Ext.window.Window', {
                    title: 'Отчет',
                    height: 700,
                    width: 500,
                    plain: true,
                    constrain: true,
                    modal: true,
                    html: '<iframe style="display: block;" width="100%" height="100%" src="' + blobUrl + '" type="application/pdf">' +
                        '</iframe>'
                }).show();
            },
            failure: function (jsonResp) {
                console.log('request failure');
            }
        });
        myMask.hide();
    },
    close: function (button) {
        var win = button.up('window');
        win.close();
    }    
});

var _createBlobUrlFromBase64 = function (b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;

    var byteCharacters = atob(b64Data);//декодирует строку в ACSII
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    var blobUrl = URL.createObjectURL(blob);
    return blobUrl;
};
