var Talk = {

	start: function () {
		Talk.connection = new Strophe.Connection(Main.BOSH_SERVICE);
		Talk.connection.connect('test2@ccs.cs.ccu.edu.tw', 'hello',	Talk.onConnect);
		$('#send').bind('click', function() { 
    		Talk.sendMessage($('#chatting').get(0).value); 
    		$("textarea[name='userchat']").val("");
    	});
	},

	log: function (msg) {
		$("#chatcontact").append("<div class=\"chat\">" + msg + "</div>");
		//$("#chatcontact").append("<div class=\"chat\"></div>").append(document.createTextNode(msg));
	},

	onConnect: function (status) {
		if (status == Strophe.Status.CONNECTING) {
			//log('Strophe is connecting.');
		}
		else if (status == Strophe.Status.CONNFAIL) {
			//log('Strophe failed to connect.');
		//$('#connect').get(0).value = 'connect';
		}
		else if (status == Strophe.Status.DISCONNECTING) {
			//log('Strophe is disconnecting.');
		}
		else if (status == Strophe.Status.DISCONNECTED) {
			//log('Strophe is disconnected.');
			//$('#connect').get(0).value = 'connect';
		}
		else if (status == Strophe.Status.CONNECTED) {
			//log('Strophe is connected.');
			//log('ECHOBOT: Send a message to ' + connection.jid + ' to talk to me.');
			//log('Console: login successfully!');

		
		Talk.connection.addHandler(Talk.onMessage, null, 'message', null, null, null); 
		Talk.connection.send($pres().tree());
		}
	},

	sendMessage: function(txt) {
		//var from = $('#jid').get(0).value;
		var from = "test2@ccs.cs.ccu.edu.tw";
		var reply = $msg({to: Talk.to_link, from: from, type: 'chat'}).cnode(Strophe.xmlElement('body', '', txt));
		Talk.connection.send(reply.tree());
		Talk.log('Console: sent message "' + txt + '" to ' + Talk.to_link + ' from ' + from);
	},

	onMessage: function(msg) {
		var to = msg.getAttribute('to');
		var from = msg.getAttribute('from');
		var type = msg.getAttribute('type');
		var elems = msg.getElementsByTagName('body');

		if (type == "chat" && elems.length > 0) {
			var body = elems[0];
			Talk.log(from + ':' + Strophe.getText(body));
		}
	    return true;
	}
};