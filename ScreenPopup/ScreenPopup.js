class ScreenPopup extends Screen{
	constructor(data,container){
		super(container,"./js/screens/ScreenPopup/ScreenPopup.html")
		this.data = data;
	}


	loadCompletion(){
		super.loadCompletion();
		main.hideNav();

		this.$(".screen.screen_popup .content").html(this.data);
	}

	finalize(){
		main.showNav();
		super.finalize();
	}

	
	beginAnimateOn(){
		$(this.screenDiv).css({"opacity":"0","transform":"translate(0,100vh)"});
		$(this.screenDiv).addClass("easeTransition_4");
	}
	animateOn(){
		$(this.screenDiv).css({"opacity":"1","transform":"translate(0,0)"});
	}
	animateOff(){
		$(this.screenDiv).css({"opacity":"1","transform":"translate(0,100vh)"});
	}


}