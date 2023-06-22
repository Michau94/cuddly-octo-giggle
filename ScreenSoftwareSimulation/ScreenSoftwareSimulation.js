class ScreenSoftwareSimulation extends Screen{
	constructor(container){
		super(container,"./js/screens/ScreenSoftwareSimulation/ScreenSoftwareSimulation.html")

		this.currentStep = 0
		this.sequenceIndex = 0
		
		var allImages = simulationImageNames(249,297);
		$(allImages).each(function(){
			main.preloadImageNamed(this,"#preloaded_images_temp")
		})
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

	loadCompletion(){
		main.hideNav();
		this.loadCurrentStep()

		this.resize();
	}

	finalize(){
		main.showNav();
		super.finalize();
	}

	loadCurrentStep(){
		var step = simulationSteps[this.currentStep];

		console.log(step.frame);

		var url = "url("+simulationImageName(step.frame)+")"
 		var screen = $("#softwareSimScreen")[0]
		$(screen).css("background-image",url)

		this.$(".softwareButton").each(function(){
			$(this).removeClass("enabled");
		})

		var self = this
		setTimeout(function(){
			if(step.nextButtonID!=""){
				self.$("#"+step.nextButtonID).addClass("enabled");
			}
			if(step.prevButtonID!=""){
				self.$("#"+step.prevButtonID).addClass("enabled");
			}
			for(var i in step.addlButtons){
				self.$("#"+step.addlButtons[i].id).addClass("enabled");
			}
		},100);

	}


	buttonPressed(id){
		var step = simulationSteps[this.currentStep];
		if(step.nextButtonID == id){
			this.currentStep++;
			this.loadCurrentStep();
		}else if(step.prevButtonID == id){
			this.currentStep--;
			this.loadCurrentStep();
		}else{
			for(var i in step.addlButtons){
				if(step.addlButtons[i].id == id){
					this.currentStep = findStepIndexByFrame(step.addlButtons[i].frame)
					this.loadCurrentStep();
					return;	
				}
			}


			this.$("#overlayBackground").removeClass("hidden");
			this.$("#overlayText").html("This button is not available in this simulation. Use the hilighted buttons to navigate through.");
			var indicator = $("#"+id)[0];
			this.$("#overlayText").css({left:$(indicator).css("left"),top:$(indicator).css("top")});
			this.$("#overlayText").removeClass("hidden");

		}
	}


	resize(){
		super.resize();

		var scaled = this.$(".softwareSimulation")[0];
		var r = 2048/$(scaled).width()
		if(r > (1536-60)/$(scaled).height()){
			r=(2048-60)/$(scaled).height();
		}

		$(scaled).css("transform","translateX(-50%) scale("+r+")")
	}


	
	buttonONPressed(){
		this.buttonPressed("buttonOn")
	}
	buttonAmpUpPressed(){
		this.buttonPressed("buttonAmpUp")
	}
	buttonAmpDownPressed(){
		this.buttonPressed("buttonAmpDown")
	}
	buttonRotateLeftPressed(){
		this.buttonPressed("buttonRotateLeft")
	}
	buttonRotateRightPressed(){
		this.buttonPressed("buttonRotateRight")
	}
	buttonPos1Pressed(){
		this.buttonPressed("buttonPos1")
	}
	buttonPos2Pressed(){
		this.buttonPressed("buttonPos2")
	}
	buttonPos3Pressed(){
		this.buttonPressed("buttonPos3")
	}
	buttonPos4Pressed(){
		this.buttonPressed("buttonPos4")
	}
	buttonPos5Pressed(){
		this.buttonPressed("buttonPos5")
	}
	buttonLevelDownPressed(){
		this.buttonPressed("buttonLevelDown")
	}
	buttonLevelUpPressed(){
		this.buttonPressed("buttonLevelUp")
	}
	buttonFocusDownPressed(){
		this.buttonPressed("buttonFocusDown")
	}
	buttonFocusUpPressed(){
		this.buttonPressed("buttonFocusUp")
	}
	buttonStepSize1Pressed(){
		this.buttonPressed("buttonStepSize1")
	}
	buttonStepSize5Pressed(){
		this.buttonPressed("buttonStepSize5")
	}

	buttonNextPressed(){
		this.sequenceIndex = 0;
		this.currentStep++;
		this.loadCurrentStep()
	}

	hideOverlay(){
		this.$("#overlayBackground").addClass("hidden");
		this.$("#overlayText").addClass("hidden");
	
		this.$(".indicator").each(function(){
			$(this).addClass("hidden");
		})
	}
}

var simulationSteps = [
	{
		frame:249,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"",
		addlButtons:[],
	},
	{
		frame:250,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:251,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:252,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:253,
		nextButtonID:"buttonLevelUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:254,
		nextButtonID:"buttonLevelUp",
		prevButtonID:"buttonLevelDown",
		addlButtons:[],
	},
	{
		frame:255,
		nextButtonID:"buttonLevelUp",
		prevButtonID:"buttonLevelDown",
		addlButtons:[],
	},
	{
		frame:256,
		nextButtonID:"buttonLevelUp",
		prevButtonID:"buttonLevelDown",
		addlButtons:[
			{
				id:"buttonFocusUp",
				frame:262
			}
		],
	},
	{
		frame:257,
		nextButtonID:"buttonLevelUp",
		prevButtonID:"buttonLevelDown",
		addlButtons:[],
	},
	{
		frame:258,
		nextButtonID:"buttonLevelUp",
		prevButtonID:"buttonLevelDown",
		addlButtons:[],
	},
	{
		frame:259,
		nextButtonID:"",
		prevButtonID:"buttonLevelDown",
		addlButtons:[],
	},
	{
		frame:260,
		nextButtonID:"buttonLevelUp",
		prevButtonID:"buttonLevelDown",
		addlButtons:[],
	},
	{
		frame:261,
		nextButtonID:"",
		prevButtonID:"buttonLevelDown",
		addlButtons:[],
	},
	{
		frame:262,
		nextButtonID:"buttonFocusUp",
		prevButtonID:"",
		addlButtons:[
			{
				id:"buttonFocusDown",
				frame:257
			}
		],
	},
	{
		frame:263,
		nextButtonID:"buttonFocusUp",
		prevButtonID:"buttonFocusDown",
		addlButtons:[],
	},
	{
		frame:264,
		nextButtonID:"buttonFocusUp",
		prevButtonID:"buttonFocusDown",
		addlButtons:[],
	},
	{
		frame:265,
		nextButtonID:"buttonFocusUp",
		prevButtonID:"buttonFocusDown",
		addlButtons:[],
	},
	{
		frame:266,
		nextButtonID:"buttonFocusUp",
		prevButtonID:"buttonFocusDown",
		addlButtons:[

// 			{
// 				id:"buttonPos2",
// 				frame:195
// 			},
// 			{
// 				id:"buttonPos3",
// 				frame:198
// 			},
// 			{
// 				id:"buttonPos4",
// 				frame:201
// 			},
// 			{
// 				id:"buttonPos5",
// 				frame:204
// 			},

		],
	},
	{
		frame:267,
		nextButtonID:"buttonFocusUp",
		prevButtonID:"buttonFocusDown",
		addlButtons:[
// 			{
// 				id:"buttonPos2",
// 				frame:195
// 			},
// 			{
// 				id:"buttonPos3",
// 				frame:198
// 			},
// 			{
// 				id:"buttonPos4",
// 				frame:201
// 			},
// 			{
// 				id:"buttonPos5",
// 				frame:204
// 			},
		],
	},
	{
		frame:268,
		nextButtonID:"buttonFocusUp",
		prevButtonID:"buttonFocusDown",
		addlButtons:[
// 			{
// 				id:"buttonPos2",
// 				frame:195
// 			},
// 			{
// 				id:"buttonPos3",
// 				frame:198
// 			},
// 			{
// 				id:"buttonPos4",
// 				frame:201
// 			},
// 			{
// 				id:"buttonPos5",
// 				frame:204
// 			},
		],
	},
	{
		frame:269,
		nextButtonID:"buttonFocusUp",
		prevButtonID:"buttonFocusDown",
		addlButtons:[
// 			{
// 				id:"buttonPos2",
// 				frame:195
// 			},
// 			{
// 				id:"buttonPos3",
// 				frame:198
// 			},
// 			{
// 				id:"buttonPos4",
// 				frame:201
// 			},
// 			{
// 				id:"buttonPos5",
// 				frame:204
// 			},
		],
	},
	{
		frame:270,
		nextButtonID:"buttonRotateRight",
		prevButtonID:"buttonFocusDown",
		addlButtons:[
			{
				id:"buttonRotateLeft",
				frame:281
			},
// 			{
// 				id:"buttonPos2",
// 				frame:195
// 			},
// 			{
// 				id:"buttonPos3",
// 				frame:198
// 			},
// 			{
// 				id:"buttonPos4",
// 				frame:201
// 			},
// 			{
// 				id:"buttonPos5",
// 				frame:204
// 			},
		],
	},
	{
		frame:271,
		nextButtonID:"buttonRotateRight",
		prevButtonID:"buttonRotateLeft",
		addlButtons:[
// 			{
// 				id:"buttonPos2",
// 				frame:195
// 			},
// 			{
// 				id:"buttonPos3",
// 				frame:198
// 			},
// 			{
// 				id:"buttonPos4",
// 				frame:201
// 			},
// 			{
// 				id:"buttonPos5",
// 				frame:204
// 			},
		],
	},
	{
		frame:272,
		nextButtonID:"buttonRotateRight",
		prevButtonID:"buttonRotateLeft",
		addlButtons:[
// 			{
// 				id:"buttonPos2",
// 				frame:195
// 			},
// 			{
// 				id:"buttonPos3",
// 				frame:198
// 			},
// 			{
// 				id:"buttonPos4",
// 				frame:201
// 			},
// 			{
// 				id:"buttonPos5",
// 				frame:204
// 			},
		],
	},
	{
		frame:273,
		nextButtonID:"buttonRotateRight",
		prevButtonID:"buttonRotateLeft",
		addlButtons:[
// 			{
// 				id:"buttonPos2",
// 				frame:195
// 			},
// 			{
// 				id:"buttonPos3",
// 				frame:198
// 			},
// 			{
// 				id:"buttonPos4",
// 				frame:201
// 			},
// 			{
// 				id:"buttonPos5",
// 				frame:204
// 			},
		],
	},
	{
		frame:274,
		nextButtonID:"buttonRotateRight",
		prevButtonID:"buttonRotateLeft",
		addlButtons:[
// 			{
// 				id:"buttonPos2",
// 				frame:195
// 			},
// 			{
// 				id:"buttonPos3",
// 				frame:198
// 			},
// 			{
// 				id:"buttonPos4",
// 				frame:201
// 			},
// 			{
// 				id:"buttonPos5",
// 				frame:204
// 			},
		],
	},
	{
		frame:275,
		nextButtonID:"buttonRotateRight",
		prevButtonID:"buttonRotateLeft",
		addlButtons:[
// 			{
// 				id:"buttonAmpUp",
// 				frame:211
// 			},

// 			{
// 				id:"buttonPos2",
// 				frame:195
// 			},
// 			{
// 				id:"buttonPos3",
// 				frame:198
// 			},
// 			{
// 				id:"buttonPos4",
// 				frame:201
// 			},
// 			{
// 				id:"buttonPos5",
// 				frame:204
// 			},
		
		],
	},
	{
		frame:276,
		nextButtonID:"buttonRotateRight",
		prevButtonID:"buttonRotateLeft",
		addlButtons:[
// 			{
// 				id:"buttonPos2",
// 				frame:195
// 			},
// 			{
// 				id:"buttonPos3",
// 				frame:198
// 			},
// 			{
// 				id:"buttonPos4",
// 				frame:201
// 			},
// 			{
// 				id:"buttonPos5",
// 				frame:204
// 			},
		],
	},
	{
		frame:277,
		nextButtonID:"buttonRotateRight",
		prevButtonID:"buttonRotateLeft",
		addlButtons:[

// 			{
// 				id:"buttonPos2",
// 				frame:195
// 			},
// 			{
// 				id:"buttonPos3",
// 				frame:198
// 			},
// 			{
// 				id:"buttonPos4",
// 				frame:201
// 			},
// 			{
// 				id:"buttonPos5",
// 				frame:204
// 			},
		
		],
	},
	{
		frame:278,
		nextButtonID:"buttonRotateRight",
		prevButtonID:"buttonRotateLeft",
		addlButtons:[],
	},
	{
		frame:279,
		nextButtonID:"buttonRotateRight",
		prevButtonID:"buttonRotateLeft",
		addlButtons:[
			{
				id:"buttonStepSize1",
				frame:297
			},
		],
	},
	{
		frame:280,
		nextButtonID:"buttonRotateRight",
		prevButtonID:"buttonRotateLeft",
		addlButtons:[],
	},
	{
		frame:281,
		nextButtonID:"",
		prevButtonID:"buttonRotateLeft",
		addlButtons:[
			{
				id:"buttonRotateRight",
				frame:270
			},
		],
	},
	{
		frame:297,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"",
		addlButtons:[
			{
				id:"buttonStepSize5",
				frame:279
			},
		],
	},
	{
		frame:284,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:285,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:286,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:287,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:288,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:289,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:290,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:291,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:292,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:293,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:294,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:295,
		nextButtonID:"buttonAmpUp",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
	{
		frame:296,
		nextButtonID:"",
		prevButtonID:"buttonAmpDown",
		addlButtons:[],
	},
]

function findStepByFrame(frame){
	for(var i = 0; i < simulationSteps.length; i++){
		if(simulationSteps[i].frame == frame){
			return simulationSteps[i]
		}
	}
	return null;
}
function findStepIndexByFrame(frame){
	for(var i = 0; i < simulationSteps.length; i++){
		if(simulationSteps[i].frame == frame){
			return i
		}
	}
	return 0;
}



function simulationImageNames(startFrame, endFrame){
	var ret = []
	for(var i = startFrame; i <= endFrame; i++){
		var url = `./images/sequence3/Screenshot%20(${i}).jpeg`
		url = url.replace("(", "%28");
		url = url.replace(")", "%29");
		ret.push(url)
	}
	return ret;
}
function simulationImageName(frame){
	var url = `./images/sequence3/Screenshot%20(${frame}).jpeg`
	url = url.replace("(", "%28");
	url = url.replace(")", "%29");
	return url;
}