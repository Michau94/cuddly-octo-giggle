class ScreenImageGuidedProgramming extends Screen{
	constructor(container){
		super(container,"./js/screens/ScreenImageGuidedProgramming/ScreenImageGuidedProgramming.html")
	}


	loadCompletion(){
		super.loadCompletion();

	}

	finalize(){
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

	loadImageFusion(){
		var newScreen = new ScreenImageFusion(main.container)
		newScreen.parentScreen = this;
		this.pushScreen(newScreen)
	}
	loadAnatomicalMapping(){
		var newScreen = new ScreenAnatomicalMapping(main.container)
		newScreen.parentScreen = this;
		this.pushScreen(newScreen)
	}
	loadLeadLocalization(){
		var newScreen = new ScreenLeadLocalization(main.container)
		newScreen.parentScreen = this;
		this.pushScreen(newScreen)
	}
	loadCustomizeTherapy(){
		this.showPage($(".tab[page=page3]")[0]);
	}


}