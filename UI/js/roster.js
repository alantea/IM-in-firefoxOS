var Roster = {
	start: function() {
		Main.connection.addHandler(Roster.onPresence, null, "presence");
		Main.connection.roster.init(Main.connection);			// 初始化 roster 連線
		Main.connection.roster.get(Roster.getContact); 			// 取得 roster
		$('#friendlist ul').empty();
	},

	getContact: function() {
		for( var i in Main.connection.roster.items ) {
			var jid = Strophe.getBareJidFromJid(Main.connection.roster.items[i].jid);
			/* 建立一個聯絡人 list item */
			// alert(jid);
			var contact = $("<li id='" + jid + "'>" +
                            "<div class='friend'>" + jid + "</div>" +
                            "</li>");
			Roster.insertContact(contact);
		}
	},

	insertContact: function(elem) {
		$('#friendlist ul').append(elem);
	},

	onPresence: function(presence) {
		var ptype = $(presence).attr('type');
        var from = $(presence).attr('from');

        if (ptype === 'subscribe') {
        	Main.pending_subscriber = from;
        	$('#approve-jid').text(Strophe.getBareJidFromJid(from));
            $('form[name="approve_dialog"]').removeClass("hidden");
        }

        return true;
	}
};