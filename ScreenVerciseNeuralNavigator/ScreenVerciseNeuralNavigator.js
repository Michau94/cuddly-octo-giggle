class ScreenVerciseNeuralNavigator extends Screen{
	constructor(container){
		super(container,"./js/screens/ScreenVerciseNeuralNavigator/ScreenVerciseNeuralNavigator.html")
	}

	
	loadCompletion(){
		super.loadCompletion();
	}

	playVolkmann(){
		$("#videoVolkmanBeamsearch")[0].play();
		$(".volkmanPlayButton").addClass("hidden");
	}

	subpageFlipped(){
		$("#videoVolkmanBeamsearch")[0].pause();
		$("#videoVolkmanBeamsearch")[0].currentTime = 0;
		$(".volkmanPlayButton").removeClass("hidden");
	}
}
