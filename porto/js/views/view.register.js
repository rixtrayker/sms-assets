(function() {
	"use strict";
	var Register = {
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
			$("#registerForm").validate({				
				submitHandler: function(form) {
					// Loading State
					var submitButton = $(this.submitButton);
                    var tags = [];$("input:checked").each(function() {tags.push($(this).val());});                    
					submitButton.button("loading");
					// Ajax Submit
					$.ajax({
						type: "POST",
						url: global_base_url + "router/register",
						data: {
							"name": 	$("#registerForm #name").val(),
							"username": $("#registerForm #username").val(),
							"email": 	$("#registerForm #email").val(),
							"password": $("#registerForm #password").val(),
							"password2":$("#registerForm #password2").val(),
							"country": 	$("#registerForm #country").val(),
							"code": 	$("#registerForm #code").val(),
							"number": 	$("#registerForm #number").val(),
							"phone": 	$("#registerForm #phone").val(),
							"address": 	$("#registerForm #address").val(),
							"g-recaptcha-response": grecaptcha.getResponse(recaptcha_contact),
                            "tags":     tags							
						},
						dataType: "json",
						success: function (data) {
                            scrollTo(0,0);
							if (data.type == "success") {
								$("#RegisterError").addClass("hidden");
								$("#registerFormContainer").addClass("hidden");
								$("#RegisterSuccess").removeClass("hidden");
								$("#RegisterSuccess").html(data.text);
								$("#RegisterSuccessProgress").removeClass("hidden");								
							} else {
								$("#registerForm #submit").attr('disabled','disabled');
								$("#RegisterError").removeClass("hidden");
								$("#RegisterError").html(data.text);
								$("#captchaImgContainer").html(data.image);								
							}
						},
						complete: function () {
							submitButton.button("reset");
						}
					});
				},
				rules: {
					name:{required:true},
					username:{required:true},
					email:{required:true, email:true},
					password:{required:true},
					password2:{equalTo: "#registerForm #password"},
					country:{required:true},
					number:{required:true, mobile:true}
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
			$.validator.addMethod("mobile", function () {
				 return 	/^[0-9\ ]+$/.test($("#registerForm #number").val()) &&	$("#registerForm #number").val().length > 7;
			}, "");
		}
	};
	Register.initialize();
})();