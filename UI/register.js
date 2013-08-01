var BOSH_SERVICE = 'http://ccs.cs.ccu.edu.tw:5280/http-bind';
var connection = null;
var usr_acc = null;
var usr_pass = null;

function log(msg) 
{
	$('#reg_now').append('<div></div>').append(document.createTextNode(msg));
}

var onReg = function(status) {
	
    if (status === Strophe.Status.REGISTER) {
        connection.register.fields.username = usr_acc;
        connection.register.fields.password = usr_pass;
        connection.register.submit();
        log('registering...')
    }
    else if (status === Strophe.Status.REGISTERED) {
        log("registered!");
        connection.register.authenticate();
    }
    else if (status === Strophe.Status.CONNECTED) {
        log("logged in!");
    }
    else if (status === Strophe.Status.SBMTFAIL) {
    	log("submit failed!");
    	 if (connection.register.registered == true) 			// strophe_register.js 裡面提供的變數，用來判斷是否註冊過
    	 	log("account conflict");
		//connection.send($pres().tree());
    }

    else {
        // every other status a connection.connect would receive
    }

    
};

/*function onConnect(status)
{
	if (status == Strophe.Status.CONNECTING) {
		log('Strophe is connecting.');
	}
	else if (status == Strophe.Status.CONNFAIL) {
		log('Strophe failed to connect.');
		$('#connect').get(0).value = 'connect';
	}
	else if (status == Strophe.Status.DISCONNECTING) {
		log('Strophe is disconnecting.');
	}
	else if (status == Strophe.Status.DISCONNECTED) {
		log('Strophe is disconnected.');
		$('#connect').get(0).value = 'connect';
	}
	else if (status == Strophe.Status.CONNECTED) {
		log('Strophe is connected.');
		log('Console: login successfully!');

		
		connection.addHandler(onMessage, null, 'message', null, null, null); 
		connection.send($pres().tree());
	}
}*/
/*function onMessage(msg) {
	var to = msg.getAttribute('to');
	var from = msg.getAttribute('from');
	var type = msg.getAttribute('type');
	var elems = msg.getElementsByTagName('body');

	if (type == "chat" && elems.length > 0) {
		var body = elems[0];
		log(from + ':' + Strophe.getText(body));
	}

    // we must return true to keep the handler alive.  
    // returning false would remove it after it finishes.
    return true;
}*/

$(document).ready(function () {
	connection = new Strophe.Connection(BOSH_SERVICE);
    // Uncomment the following lines to spy on the wire traffic.
    //connection.rawInput = function (data) { log('RECV: ' + data); };
    //connection.rawOutput = function (data) { log('SEND: ' + data); };

    // Uncomment the following line to see all the debug output.
    //Strophe.log = function (level, msg) { log('LOG: ' + msg); };


    $('#register').bind('click', function() {
    	if ($('#psw1').get(0).value !== $('#psw2').get(0).value)
    		alert('passwords are not identical.');
    	else
    	{
    		usr_acc = $('#account').get(0).value;
    		usr_pass = $('#psw1').get(0).value;
    		connection.register.connect("ccs.cs.ccu.edu.tw", onReg);
    	}
    });

    /*$('#connect').bind('click', function () {

    	var button = $('#connect').get(0);
    	if (button.value == 'connect') {
    		button.value = 'disconnect';
    		 //, wait, hold);
    		//$('#jid').get(0).value = 'justtest@ccs.cs.ccu.edu.tw';
    		//$('#pass').get(0).value = 'test';
    		connection.connect($('#jid').get(0).value, $('#pass').get(0).value, onConnect);
    	}
    	else {
    		button.value = 'connect';
    		connection.disconnect();
    	}
    });*/
});
