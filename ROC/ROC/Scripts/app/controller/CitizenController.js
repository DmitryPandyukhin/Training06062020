Ext.define('ROC.controller.CitizenController', {
    extend: 'Ext.app.Controller',

    views: [
        'CitizenView'      
    ],
    init: function () {
        this.control(
            {
                'wgWinCitizenAdd button[action=closeAdd]':
                {
                    click: this.closeAdd
                },
                'wgWinCitizenEdit button[action=closeEdit]':
                {
                    click: this.closeEdit
                }
            }
        )
    },
    closeAdd: function (button) {
        //отправляем запрос базе данных на доавление новой записи
        var win = button.up('window');
        var LastName = win.down('textfield[id=idCitLastName]');
        var FirstName = win.down('textfield[id=idCitFirstName]');
        var MiddleName = win.down('textfield[id=idCitMiddleName]');
        var DateOfBirth = win.down('textfield[id=idCitDateOfBirth]');

        Ext.Msg.confirm("Сохранение", "Сохранить?", function (btn) {
            if (btn == 'yes') {
                if (LastName.getValue() == ""
                    || FirstName.getValue() == ""
                    || DateOfBirth.getValue() == null) {
                    if (LastName.getValue() == "")
                        alert("Фамилия должна быть заполнена");
                    if (FirstName.getValue() == "")
                        alert("Имя должно быть заполнена");
                    if (DateOfBirth.getValue() == null)
                        alert("Дата рождения должно быть заполнена");
                }
                else {
                    Ext.Ajax.request({
                        url: 'Request/SetCitizen',
                        method: 'Get',
                        params: {
                            LastName: LastName.getValue(),
                            FirstName: FirstName.getValue(),
                            MiddleName: MiddleName.getValue(),
                            DateOfBirth: DateOfBirth.getValue()
                        },
                        success: function (response, options) {
                            var JsonParse = JSON.parse(response.responseText);
                            var store = Ext.create('Ext.data.Store', {
                                fields: ['Id', 'LastName', 'FirstName', 'MiddleName', 'DateOfBirth'],
                                data: JsonParse
                            });
                            grid = Ext.getCmp('idGrid');
                            grid.store.add(store.data.items[0].data);
                        },
                        failure: function (jsonResp) {
                            console.log('request failure');
                        }
                    });
                    win.close();
                }
            }
            else {
                win.close();
            }
        });


    },
    closeEdit: function (button) {
        var win = button.up('window');
        var Id = win.down('textfield[id=idCitId]');
        var LastName = win.down('textfield[id=idCitLastName]');
        var FirstName = win.down('textfield[id=idCitFirstName]');
        var MiddleName = win.down('textfield[id=idCitMiddleName]');
        var DateOfBirth = win.down('textfield[id=idCitDateOfBirth]');
        DateValue = Ext.Date.format(DateOfBirth.getValue(), "d.m.Y")
        

        Ext.Msg.confirm("Сохранение", "Сохранить?", function (btn) {
            if (btn == 'yes') {
                if (LastName.getValue() == ""
                    || FirstName.getValue() == ""
                    || DateOfBirth.getValue() == null) {
                    if (LastName.getValue() == "")
                        alert("Фамилия должна быть заполнена");
                    if (FirstName.getValue() == "")
                        alert("Имя должно быть заполнена");
                    if (DateOfBirth.getValue() == null)
                        alert("Дата рождения должно быть заполнена");
                }
                else {
                    Ext.Ajax.request({
                        url: 'Request/UpdateCitizen',
                        method: 'Get',
                        params: {
                            Id: Id.getValue(),
                            LastName: LastName.getValue(),
                            FirstName: FirstName.getValue(),
                            MiddleName: MiddleName.getValue(),
                            DateOfBirth: DateValue
                        },
                        success: function (response, options) {
                            var JsonParse = JSON.parse(response.responseText);

                            grid = Ext.getCmp('idGrid');
                            record = grid.getSelectionModel().getSelection();
                            record[0].data.LastName = JsonParse[0].LastName;
                            record[0].data.FirstName = JsonParse[0].FirstName;
                            record[0].data.MiddleName = JsonParse[0].MiddleName;
                            record[0].data.DateOfBirth = JsonParse[0].DateOfBirth;
                            record[0].commit();
                        },
                        failure: function (jsonResp) {
                            console.log('request failure');
                        }
                    });
                    win.close();
                }
            }
            else {
                win.close();
            }
        });
    }
});