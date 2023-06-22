class ScreenMain extends Screen{
	constructor(container){
		super(container,"./js/screens/ScreenMain/ScreenMain.html")
	}
	loadCompletion(){
		super.loadCompletion();
		
		main.hideNav();
	}
	finalize(){
		super.finalize();
		
		main.showNav();
	}
}