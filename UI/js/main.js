/* 共通參數及變數 */
var Main = {
	BOSH_SERVICE: 'http://ccs.cs.ccu.edu.tw:5280/http-bind',
	connection: null,
	talk_to: null,
	jid: null,
  pending_subscriber: null
};


$(document).ready(function(){
  /* 前往註冊的按鈕*/
	$('#unregister').click(function(){
		  $('#registerpage').attr('aria-hidden', 'false');
   		$('#loginpage').attr('aria-hidden', 'true');
   		/*$('#registerpage').addClass('slide-up-in');
   		$('#loginpage').addClass('slide-down-out');
   		$('#registerpage').removeClass('slide-down-out');
   		$('#loginpage').removeClass('slide-up-in');*/
	});

//lollllllllllllll back need to modify

  /* 註冊頁面的返回鍵 */
	$('#register_back').click(function(){
		  $('#registerpage').attr('aria-hidden', 'true');
   		$('#loginpage').attr('aria-hidden', 'false');
   		/*$('#loginpage').removeClass('slide-down-out');
   		$('#registerpage').removeClass('slide-up-in');
   		$('#registerpage').addClass('slide-down-out');
   		$('#loginpage').addClass('slide-up-in');*/
	});

	$('#chat_back').click(function(){
    	$('#chatpage').attr('aria-hidden', 'true');
		$('#friendpage').attr('aria-hidden', 'false');
      /*$('#friendpage').removeClass('slide-down-out');
      $('#chatpage').removeClass('slide-up-in');
      $('#chatpage').addClass('slide-down-out');
      $('#friendpage').addClass('slide-up-in');*/
  });

	$('#friend_back').click(function(){
		$('#friendpage').attr('aria-hidden', 'true');
		$('#mainpage').attr('aria-hidden', 'false');
     /* $('#mainpage').removeClass('slide-down-out');
		$('#friendpage').removeClass('slide-up-in');
		$('#friendpage').addClass('slide-down-out');
		$('#mainpage').addClass('slide-up-in');*/
  });


	$('#friend_link').click(function(){
		$('#mainpage').attr('aria-hidden', 'true');
		$('#friendpage').attr('aria-hidden', 'false');
     /* $('#friendpage').removeClass('slide-down-out');
      $('#mainpage').removeClass('slide-up-in');
      $('#mainpage').addClass('slide-down-out');
      $('#friendpage').addClass('slide-up-in');*/
	});

	/*$('#friend_link').one("click", function(){
		Roster.start(); 		// 讀取好友列表
	});*/

  $('#chat_link').click(function(){
    $('#mainpage').attr('aria-hidden', 'true');
      $('#chatpage').attr('aria-hidden', 'false');
     /* $('#friendpage').removeClass('slide-down-out');
      $('#mainpage').removeClass('slide-up-in');
      $('#mainpage').addClass('slide-down-out');
      $('#friendpage').addClass('slide-up-in');*/
  });

	$('#addfriend').click(function(){
		$('#friendpage').attr('aria-hidden', 'true');
		$('#addpage').attr('aria-hidden', 'false');
		/*$('#friendpage').addClass('slide-down-out');
		$('#addpage').addClass('slide-up-in');*/
	});


	$('#register').click(function() {
		Register.start();
	});


	$('#login').click(function() {
		Login.start();
	});

	$('#friendlist').on("click", ".friend", function() {
		//alert('haha');
		Main.talk_to = $(this).text();
		Chat.start();	
		$('#chatpage header h1').text(Main.talk_to);
		$('#chatpage').attr('aria-hidden', 'false');
		$('#friendpage').attr('aria-hidden', 'true');
	});
	
	$('#go_friend').click(function(){
		$(this).closest('section').attr('aria-hidden', 'true');
		$('#friendpage').attr('aria-hidden', 'false');
	});

	$('#go_menu').click(function(){
    	$(this).closest('section').attr('aria-hidden', 'true');
    	$('#mainpage').attr('aria-hidden', 'false');
  	});

  $('#approve_dialog').dialog({
        autoOpen: false,
        draggable: false,
        modal: true,
        title: 'Subscription Request',
        buttons: {
            "Deny": function () {
                Main.connection.send($pres({to: Main.pending_subscriber, "type": "unsubscribed"}));
                Main.pending_subscriber = null;
                $(this).dialog('close');
            },

            "Approve": function () {
                Main.connection.send($pres({to: Main.pending_subscriber, "type": "subscribed"}));
                Main.connection.send($pres({to: Main.pending_subscriber, "type": "subscribe"}));
                Main.pending_subscriber = null;
                $(this).dialog('close');
            }
        }
    });
	/*$('#send').click(function(){
		text = $("textarea[name='userchat']").val();
		$("#chatcontact").append("<div class=\"chat\">" + text + "</div>");
		$("textarea[name='userchat']").val("");
	});*/
    
    /*var pickImage = document.querySelector(".icon-attachment");
    if (pickImage) { 
        pickImage.onclick = function () {
            var pick = new MozActivity({
                name: "pick",
                data: {
                    type: ["image/png", "image/jpg", "image/jpeg"]
                }
            });

            pick.onsuccess = function () {
                var img = document.createElement("img");
                img.src = window.URL.createObjectURL(this.result.blob);
                //var imagePresenter = document.querySelector("#chatcontact"); //image-presenter
                //img.style.height = 20%;
                //img.style.width = 40%
                //imagePresenter.appendChild(img);
                $("#chatcontact").append("<div class=\"pic\"><img src=" + img.src + "></div>");
                //imagePresenter.style.display = "block";
            };

            pick.onerror = function () {
                alert("Can't view the image!");
            };
        }
    }*/

    var pickAnything = document.querySelector(".icon-attachment");
    if (pickAnything) { 
        pickAnything.onclick = function () {
             var pickAny = new MozActivity({
                 name: "pick"
             });

            pickAny.onsuccess = function () {
                var img = document.createElement("img");
                if (this.result.blob.type.indexOf("image") != -1) {
                    img.src = window.URL.createObjectURL(this.result.blob);
                    $("#chatcontact").append("<div class=\"pic\"><img src=" + img.src + "></div>");
                }
            };

            pickAny.onerror = function () {
                console.log("An error occurred");
            };
        }
    }
});