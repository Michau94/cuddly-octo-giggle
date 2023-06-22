class ScreenClinicalOverview extends Screen{
	constructor(container){
		super(container,"./js/screens/ScreenClinicalOverview/ScreenClinicalOverview.html")
	}



	loadCompletion(){
		super.loadCompletion();
		var self = this;
		
		self.$(".buttonEmail").on("click",function(event){
			self.emailClicked(event,this)
		})
	}


	displayLink(elem){
		var url = $(elem).find(".link").text();
		main.showUrl(url);
	}


	emailClicked(event,elem){
		event.preventDefault();
		event.stopPropagation();


		var url = $($(elem).parent()).find(".link").text();
		
		this.link = url;

		main.showEmailPopup();

	}

	completeEmail(){
		var email = $("#email").val();
		main.sendEmail(email,this.link);
	
	}
}