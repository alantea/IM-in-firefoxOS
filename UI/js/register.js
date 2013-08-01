var Register = {
    
    connection: null,
    /* 開始執行註冊 */
    start: function() {
        if ($('#psw1').get(0).value !== $('#psw2').get(0).value)
            alert('passwords are not identical.');
        else
        {
            Register.connection = new Strophe.Connection(Main.BOSH_SERVICE);
            Register.connection.register.connect("ccs.cs.ccu.edu.tw", Register.onReg);
        }
    },

    /* 顯示 log */
    log: function(msg) {
        $('#reg_now').append('<div></div>').append(document.createTextNode(msg));
    },

    /* 註冊狀態 */
    onReg: function(status) {
        if (status === Strophe.Status.REGISTER) {
            Register.connection.register.fields.username = $('#account').get(0).value;
            Register.connection.register.fields.password = $('#psw1').get(0).value;
            Register.connection.register.submit();
            Register.log('registering...');
        }
        else if (status === Strophe.Status.REGISTERED) {
            Register.log("registered!");
            Register.connection.register.authenticate();
        }
        else if (status === Strophe.Status.CONNECTED) {
            Register.log("logged in!");
        }
        else if (status === Strophe.Status.SBMTFAIL) {
            Register.log("submit failed!");
             if (connection.register.registered == true)            // strophe_register.js 裡面提供的變數，用來判斷是否註冊過
                Register.log("account already exists");
            //connection.send($pres().tree());
        }
    }
};
