/*
Name: 			View - Login
Written by: 	Okler Themes - (http://www.okler.net)
Version: 		2.0
*/

(function() {

	"use strict";

	var Login = {
		initialized: false,
		initialize: function() {
			if (this.initialized) return;
			this.initialized = true;
			this.build();
			this.events();
		},
		build: function() {this.validations();},
		events: function() {},
		validations: function() {
			$("#loginForm").validate({
				submitHandler: function(form) {
					// Loading State
					var submitButton = $(this.submitButton);
					submitButton.button("loading");
					// Ajax Submit
					$.ajax({
						type: "POST",
						url: global_site_url + "/user/myprofile/login",
						data: {
							"username": $("#loginForm #username").val(),
							"password": $("#loginForm #password").val(),
							"g-recaptcha-response": grecaptcha.getResponse(recaptcha_login)
						},
						dataType: "json",
						success: function (data) {
							if (data.response == "success") {
								$("#loginError").addClass("hidden");
								$("#loginSuccess").removeClass("hidden");
								$("#loginSuccess").html(data.text);
								$("#loginSuccessProgress").removeClass("hidden");                                
                                $("#loginSuccessProgress").css("-webkit-animation", "300ms");
                                $("#loginSuccessProgress").css("width", "100%");
                                setTimeout(
                                    function(){
                                        window.location= global_site_url + "/user/myprofile/dashboard";
                                    }, 3000);								
							} else {
								$("#loginError").removeClass("hidden");
								$("#loginError").html(data.text);
							}
						},
						complete: function () {
							submitButton.button("reset");
						}
					});
				},
				rules: {
					username: {
						required: true
					},
					password: {
						required: true						
					}
				},
				highlight: function (element) {
					$(element)
						.parent()
						.removeClass("has-success")
						.addClass("has-error");
				},
				success: function (element) {
					$(element)
						.parent()
						.removeClass("has-error")
						.addClass("has-success")
						.find("label.error")
						.remove();
				}
			});

		}

	};

	Login.initialize();

})();

(function() {

	"use strict";

	var ResetPass = {

		initialized: false,

		initialize: function() {

			if (this.initialized) return;
			this.initialized = true;

			this.build();
			this.events();

		},

		build: function() {

			this.validations();

		},

		events: function() {



		},

		validations: function() {

			$("#resetPassForm").validate({
				submitHandler: function(form) {

					// Loading State
					var submitButton = $(this.submitButton);
					submitButton.button("loading");

					// Ajax Submit
					$.ajax({
						type: "POST",
						url: global_base_url + "/password",
						data: {
							"email4reset": $("#resetPassForm #email4reset").val(),
							"g-recaptcha-response": grecaptcha.getResponse(recaptcha_password)
						},
						dataType: "json",
						success: function (data) {
							if (data.response == "success") {
								$("#resetPassError").addClass("hidden");
								$("#resetPassSuccess").removeClass("hidden");
								$("#resetPassSuccess").html(data.text);							
							} else {								
								$("#resetPassSuccess").addClass("hidden");
								$("#resetPassError").removeClass("hidden");
								$("#resetPassError").html(data.text);
							}
						},
						complete: function () {
							submitButton.button("reset");
						}
					});
				},
				rules: {
					email4reset: {
						required: true,
						email: true
					},
				},
				highlight: function (element) {
					$(element)
						.parent()
						.removeClass("has-success")
						.addClass("has-error");
				},
				success: function (element) {
					$(element)
						.parent()
						.removeClass("has-error")
						.addClass("has-success")
						.find("label.error")
						.remove();
				}
			});

		}

	};

	ResetPass.initialize();

})();