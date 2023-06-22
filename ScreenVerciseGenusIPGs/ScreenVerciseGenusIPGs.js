class ScreenVerciseGenusIPGs extends Screen{
	constructor(container){
		super(container,"./js/screens/ScreenVerciseGenusIPGs/ScreenVerciseGenusIPGs.html")
	}
	loadCompletion(){
		super.loadCompletion();
		
		var self = this;
		this.$(".page.page9 input[type=checkbox]").on("change",function(){
			self.updateCompetitiveComparison()
		})

		self.updateCompetitiveComparison();

		this.batteryLongevityView = new BatteryLongevityView(this.$("#batteryLongevityView")[0]);

		
		this.$("#compareToggle").on("change",function(){
			var toggle = this;
			if(toggle.checked){
				self.$("#ipgsContainer").addClass("hidden");
				self.$("#leadsContainer").removeClass("hidden");
			}else{
				self.$("#ipgsContainer").removeClass("hidden");
				self.$("#leadsContainer").addClass("hidden");
			}
		})

		
	}

	finalize(){
		super.finalize()
	}


	updateCompetitiveComparison(){
		var self = this;
		this.$(".page.page9 input[type=checkbox]").each(function(){
			var product = $(this).attr("product")
			if(this.checked){
				self.$(".compareCol."+product).removeClass("hidden");
			}else{
				self.$(".compareCol."+product).addClass("hidden");
			}
		})
	}
}