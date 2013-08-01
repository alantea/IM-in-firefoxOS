var Login = {
	connection: null,

	start: function() {
		Login.connection = new Strophe.Connection(Main.BOSH_SERVICE);
		Login.connection.connect($('#login_name').get(0).value, $('#login_pwd').get(0).value, Login.onConnect);
	},

	log: function (msg) {
		$('#log').append('<div></div>').append(document.createTextNode(msg));
	},

	onConnect: function(status) {
		if (status == Strophe.Status.CONNECTING) {
			//log('Strophe is connecting.');
		}
		else if (status == Strophe.Status.CONNFAIL) {
			//Login.log('Strophe failed to connect.');
			//$('#connect').get(0).value = 'connect';
		}
		else if (status == Strophe.Status.AUTHFAIL) {
			//Login.log('Authentication attempt failed, Please check your jid and password');
			alert('AC/PWD error, please try again.');
		}
		else if (status == Strophe.Status.DISCONNECTING) {
			//Login.log('Strophe is disconnecting.');
		}
		else if (status == Strophe.Status.DISCONNECTED) {
			//Login.log('Strophe is disconnected.');
			//$('#connect').get(0).value = 'connect';
		}
		else if (status == Strophe.Status.CONNECTED) {
			//Login.log('Strophe is connected.');
			//Login.log('ECHOBOT: Send a message to ' + connection.jid + ' to talk to me.');
			$('#mainpage').attr('aria-hidden', 'false');
   			$('#loginpage').attr('aria-hidden', 'true');
			//connection.addHandler(onMessage, null, 'message', null, null,  null); 
			//connection.send($pres().tree());
		}
	}
};

/*function onMessage(msg) {
	var to = msg.getAttribute('to');
	var from = msg.getAttribute('from');
	var type = msg.getAttribute('type');
	var elems = msg.getElementsByTagName('body');

	if (type == "chat" && elems.length > 0) {
		var body = elems[0];

		log('ECHOBOT: I got a message from ' + from + ': ' + Strophe.getText(body));

		var reply = $msg({to: from, from: to, type: 'chat'}).cnode(Strophe.copyElement(body));
		connection.send(reply.tree());

		log('ECHOBOT: I sent ' + from + ': ' + Strophe.getText(body));
	}

    // we must return true to keep the handler alive.  
    // returning false would remove it after it finishes.
    return true;
}

$(document).ready(function () {
	connection = new Strophe.Connection(BOSH_SERVICE);

    // Uncomment the following lines to spy on the wire traffic.
    //connection.rawInput = function (data) { log('RECV: ' + data); };
    //connection.rawOutput = function (data) { log('SEND: ' + data); };

    // Uncomment the following line to see all the debug output.
    //Strophe.log = function (level, msg) { log('LOG: ' + msg); };


    $('#connect').bind('click', function () {
    	var button = $('#connect').get(0);
    	if (button.value == 'connect') {
    		button.value = 'disconnect';   

    		connection.connect($('#jid').get(0).value, $('#pass').get(0).value,	onConnect);
    	}
    	else {
    		button.value = 'connect';
    		connection.disconnect();
    	}
    });
});*/
