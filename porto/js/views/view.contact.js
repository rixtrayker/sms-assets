(function() {
	"use strict";
	var Contact = {
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
			$("#contactForm").validate({			
				rules: {
				    name:{
                        required: true				        
				    },
				    number:{
                        required: true,
                        digits: true				        
				    },
					email: {
						required: true,
						email: true
					},
					text: {
						required: true
					},
                    captcha:{
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
	Contact.initialize();
})();