class ScreenCartesia3D extends Screen{
	constructor(container){
		super(container,"./js/screens/ScreenCartesia3D/ScreenCartesia3D.html")

	}

	loadCompletion(){
		super.loadCompletion();
		this.miccView = new MICCView(this.$("#MICCControl")[0]);
		this.competitorView = new CompetitorView(this.$("#competitorControl")[0]);
		
		var self = this;
		this.$("#targetAnatomySwitch").on("change",function(){
			var toggle = this;
			if(toggle.checked){
				self.$(".targetAnatomy").removeClass("hidden");
			}else{
				self.$(".targetAnatomy").addClass("hidden");
			}
		})

	}

	finalize(){
		this.miccView.destroy();
		this.competitorView.destroy();
		super.finalize();
	}
}