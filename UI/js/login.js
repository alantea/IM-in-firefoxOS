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
			Main.connection = Login.connection;
			Main.jid = $('#login_name').get(0).value;
			Main.connection.send($pres().tree());
			Roster.start();
			Main.connection.addHandler(Roster.onPresence, null, "presence");
			$('#friendpage').attr('aria-hidden', 'false');
   			$('#loginpage').attr('aria-hidden', 'true');
		}
	}
};