var Chat = {

	start: function() {
		Main.connection.addHandler(Chat.onMessage, null, 'message', null, null, null);
		$('#send').bind('click', function() { 
    		Chat.sendMessage($('#chatting').get(0).value); 
    		$("textarea[name='userchat']").val("");
    	});
	},

	log: function (msg) {
		$("#chatcontact").append("<div class=\"chat\">" + msg + "</div>");
		//$("#chatcontact").append("<div class=\"chat\"></div>").append(document.createTextNode(msg));
	},

	sendMessage: function(txt) {
		//var from = $('#jid').get(0).value;
		var from = Main.jid;
		var to = Main.talk_to;
		var reply = $msg({to: to, from: from, type: 'chat'}).cnode(Strophe.xmlElement('body', '', txt));
		Main.connection.send(reply.tree());
		//Chat.log('Console: sent message "' + txt + '" to ' + Talk.to_link + ' from ' + from);
		Chat.log('Me: ' + txt);
	},

	onMessage: function(msg) {
		var to = msg.getAttribute('to');
		var from = Strophe.getBareJidFromJid(msg.getAttribute('from'));
		var type = msg.getAttribute('type');
		var elems = msg.getElementsByTagName('body');

		if (type == "chat" && elems.length > 0) {
			var body = elems[0];
			Chat.log(from + ':' + Strophe.getText(body));
		}
	    return true;
	}
};