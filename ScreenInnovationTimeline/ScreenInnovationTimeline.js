class ScreenInnovationTimeline extends Screen{
	constructor(container){
		super(container,"./js/screens/ScreenInnovationTimeline/ScreenInnovationTimeline.html")
	}


	loadCompletion(){
		super.loadCompletion();
		var self = this;
// 		this.$(".scrollingArea").on("scroll",function(){
// 			//console.log(this.scrollLeft)
// 			var max=491;
// 			var r = Math.min(max,this.scrollLeft) / max;
// 			self.$(".shapeHolder").css({
// 				"transform":"translate(-"+(r*350)+"px, -"+(r*400)+"px)",
// 				"opacity":1-(r*0.75)
// 			})

// 		})
		
		self.$(".shapeHolder").css({
			"transform":"translate(-"+(1*350)+"px, -"+(1*400)+"px)",
			"opacity":1-(1*0.75)
		})
	}



	scrollTo(elem){
		var which = $(elem).attr("which");

		var scrollToElem = elem;

		$(".year").each(function(){
			if(this == elem){
				$(this).addClass("selected");
			}else{
				$(this).removeClass("selected");
			}
		})


		$(".yearArea").each(function(){
			if($(this).hasClass(which)){
				scrollToElem = this
				$(this).removeClass("hidden");
			}else{
				$(this).addClass("hidden");
			}
		})

		scrollToElem.scrollIntoView({
		  behavior: "smooth",
		  block: "center",
		  inline: "center",
		});
// 		var scrollLeft =  2*($(scrollToElem).offset().left + $(scrollToElem).width()/2)
		
// 		if(this.$(".scrollingArea")[0].scrollLeft < scrollLeft){
// 			scrollLeft -= 512
// 		}else{
// 			scrollLeft += 512
// 		}
		
// 		$('.scrollingArea').animate({
// 			scrollLeft: scrollLeft
// 		}, 400);
	}
}