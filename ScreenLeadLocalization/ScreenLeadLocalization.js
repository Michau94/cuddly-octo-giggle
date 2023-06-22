class ScreenLeadLocalization extends Screen{
	constructor(container){
		super(container,"./js/screens/ScreenLeadLocalization/ScreenLeadLocalization.html")
	}


	loadCompletion(){
		main.hideNav();
		super.loadCompletion();

		this.showPage(this.$(".breadcrumb[page=page1]")[0])

		this.hasPausedOrientationVideo = false;

		this.setupVideoControls();
	}

	finalize(){
		main.showNav();
		clearInterval(this.videoInterval);
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



	showPage(breadcrumbElem){
		var self = this;
		$("#part1").removeClass("hidden");
		$("#part2").addClass("hidden")

		var pageClass = ""
		var selectedIndex = 1000;
		this.$(".breadcrumb").each(function(i){
			if(this == breadcrumbElem){
				selectedIndex = i;
				$(this).addClass("selected");
				pageClass = $(this).attr("page")
			}else{
				$(this).removeClass("selected");
			}
			if(i == selectedIndex){
				$(this).removeClass("hidden");
				$(this).addClass("disabled");
			}else if(i < selectedIndex){
				$(this).removeClass("hidden");
				$(this).removeClass("disabled");
			}else{
				$(this).addClass("hidden");
				$(this).addClass("disabled");
			}
			if(selectedIndex == 0){
				$(".breadcrumbBar").addClass("hidden");
			}else{
				$(".breadcrumbBar").removeClass("hidden");
			}
		})
		this.$(".page:not(.page2):not(.page3):not(.page4):not(.page5)").each(function(){
			if($(this).hasClass(pageClass)){
				var page = this;
				$(page).find("video").each(function(){
					this.currentTime = 0;
					this.preloadVideo();
					$(this).unbind("ended");
					$(this).on("ended",() =>{
						self.showNextBreadcrumb();
						$(page).find(".indicator").removeClass("hidden")
						$(page).find(".videoOverlay").removeClass("hidden")
					})
					if(pageClass != "page1"){
						this.playWhenReady();
					}

					$(page).find(".indicator").each(function(){
						$(this).addClass("hidden")
					});
					$(page).find(".videoOverlay").each(function(){
						$(this).addClass("hidden")
					});
				})
				$(page).removeClass("hidden");
				setTimeout(()=>{
					$(page).css("opacity","1");
				},100)


				if(pageClass == "page7"){
// 					$(".breadcrumbBar").addClass("hidden");
// 					self.addTimeout(3000,() => {
// 						self.popScreen();
// 						self.parentScreen.loadCustomizeTherapy();
// 					})
					self.popScreen();	
					self.parentScreen.loadCustomizeTherapy();
				}else if(pageClass == "page1"){
					self.$("#video1")[0].play().then(() => {self.$("#video1")[0].pause()});
					self.$("#video1").unbind("ended");
					self.$("#video1").on("ended",() =>{
						self.addTimeout(500, () =>{
							self.showPage($(".breadcrumb[page=page2]")[0])
						})
					})
				}
			}else{
				$(this).addClass("hidden");
			}
		})

		this.$(".page.page2").each(function(){
			$(".page2 .indicator").each(function(){$(this).addClass("hidden");});
			$(".page2 .indicator1").removeClass("hidden");
			if($(this).hasClass(pageClass)){
				$(this).removeClass("hidden");
				setTimeout(()=>{
					$(this).css("opacity","1");
				},100)

			}else{
				$(this).addClass("hidden");
			}
			var page = this;
			$(page).find("video").each(function(){
				this.currentTime = 0;
				this.preloadVideo();
			})
		})
		this.$(".page.page3").each(function(){

			self.hasPausedOrientationVideo = false
			$(".page3 .indicator").each(function(){$(this).addClass("hidden");});
			$(".page3 .indicator1").removeClass("hidden");
			
			var page = this;
			$(page).find("video").each(function(){
				this.currentTime = 0;
				this.preloadVideo();
			})
			if($(this).hasClass(pageClass)){
				$(this).removeClass("hidden");
				setTimeout(()=>{
					$(this).css("opacity","1");
				},100)

				self.playVideo2();

			}else{
				$(this).addClass("hidden");
			}
		})
		this.$(".page.page4").each(function(){
			$(".page4 .indicator").removeClass("hidden");
			if($(this).hasClass(pageClass)){
				$(this).removeClass("hidden");
				setTimeout(()=>{
					$(this).css("opacity","1");
				},100)

			}else{
				$(this).addClass("hidden");
			}
			var page = this;
			$(page).find("video").each(function(){
				this.currentTime = 0;
				this.preloadVideo();
			})
		})
		this.$(".page.page5").each(function(){
			$(".page5 .indicator").removeClass("hidden");
			$(".page5 .indicator2").addClass("hidden");
			if($(this).hasClass(pageClass)){
				$(this).removeClass("hidden");
				setTimeout(()=>{
					$(this).css("opacity","1");
				},100)

			}else{
				$(this).addClass("hidden");
			}
			var page = this;
			$(page).find("video").each(function(){
				this.currentTime = 0;
				this.preloadVideo();
			})
		})

		this.subpageFlipped();
	}

	showNextBreadcrumb(){
		var found = false;
		this.$(".breadcrumb").each(function(){
			if(!$(this).hasClass("hidden") && !found){
				$(this).removeClass("disabled")
			}else if($(this).hasClass("hidden") && !found){
				found = true;
				$(this).removeClass("hidden")
			}
		})
	}


	playVideo1(){
		$(".page2 .indicator").each(function(){$(this).addClass("hidden");});
		$("#video1")[0].currentTime = 0;
		$("#video1")[0].preloadVideo();
		$("#video1")[0].playWhenReady();

		$("#video1").unbind("ended");
		$("#video1").on("ended",() =>{
						this.showNextBreadcrumb();
		    $("#video1").unbind("ended");
			$(".page2 .indicator2").removeClass("hidden");
		});
	}
	playVideo2(){
		$(".page3 .indicator").each(function(){$(this).addClass("hidden");});
		$("#video2")[0].currentTime = 0;
		$("#video2")[0].preloadVideo();
		$("#video2")[0].playWhenReady();

		$("#video2").unbind("ended");
		$("#video2").on("ended",() =>{
						this.showNextBreadcrumb();
		    $("#video2").unbind("ended");
			$(".page3 .indicator2").removeClass("hidden");
		});

		clearInterval(this.video2Interval);
		var video2 = $("#video2")[0];
		this.video2Interval= setInterval(()=>{
            if(video2.currentTime > 4 && video2.currentTime < 4.5 && this.hasPausedOrientationVideo == false){
            	
				this.hasPausedOrientationVideo = true;
            	video2.pause();
            	video2.currentTime = 4.5;
			    $(".page3 .indicator1").removeClass("hidden");
            }
		},100);
	}
	playVideo3(){
		$(".page4 .indicator").each(function(){$(this).addClass("hidden");});
		$("#video3")[0].currentTime = 0;
		$("#video3")[0].preloadVideo();
		$("#video3")[0].playWhenReady();

		$("#video3").unbind("ended");
		$("#video3").on("ended",() =>{
// 						this.showNextBreadcrumb();
			//$(".page4 .indicator2").removeClass("hidden");
			this.showPage($(".breadcrumb[page=page5]")[0])

		    $("#video3").unbind("ended");
		});
	}
	playVideo4(){
		$(".page5 .indicator").each(function(){$(this).addClass("hidden");});
		$("#video4")[0].currentTime = 0;
		$("#video4")[0].preloadVideo();
		$("#video4")[0].playWhenReady();

		$("#video4").unbind("ended");
		$("#video4").on("ended",() =>{
		    this.showNextBreadcrumb();
			$("#video4")[0].pause();
			$(".page5 .indicator2").removeClass("hidden");
			
		    $("#video4").unbind("ended");
			//this.showPage($(".breadcrumb[page=page6]")[0])
		});
	}


	setupVideoControls(){
		var self = this;
		clearInterval(this.videoInterval);
		var videos = this.$("video");
		var videoControls = this.$("#videoControls");
		this.videoInterval = setInterval(()=>{
			var visibleVid = null;
			for(var v = 0; v < videos.length; v++){
				var vid = videos[v];
				if(vid.offsetParent != null){
					visibleVid = vid;
					break;
				}
			}
			if(visibleVid != this.lastVisibleVid){
				$(visibleVid).unbind('fullscreenchange webkitfullscreenchange mozfullscreenchange');
				$(visibleVid).on('fullscreenchange webkitfullscreenchange mozfullscreenchange', function() {
					if(document.fullscreenElement === this){
						$(visibleVid).attr("controls","controls")
					}else{
						$(visibleVid).removeAttr("controls");
					}
				});
				$(visibleVid).removeAttr("controls");
			}
			this.lastVisibleVid = visibleVid;
			if(visibleVid!=null){
				var paused = visibleVid.paused || visibleVid.ended;
				if(paused){
					this.$("#videoControls .buttonPlayPause").addClass("paused");
				}else{
					this.$("#videoControls .buttonPlayPause").removeClass("paused");
				}

				var currentMin = Math.floor(visibleVid.currentTime / 60)
				var currentSecs = Math.floor(visibleVid.currentTime - (currentMin * 60));
				var currentTime = ("0"+currentMin).slice(-2) + ":" + ("0" + currentSecs).slice(-2);

				var durationMin = Math.floor(visibleVid.duration / 60)
				var durationSecs = Math.floor(visibleVid.duration - (durationMin * 60));
				var durationTime = ("0"+durationMin).slice(-2) + ":" + ("0" + durationSecs).slice(-2);

				this.$("#videoControls .time").html(currentTime + " / " + durationTime);

				var percent = Math.round(visibleVid.currentTime / visibleVid.duration * 100);

				this.$("#videoControls .progress").css("width",percent+"%");
				this.$("#videoControls .handle").css("left",percent+"%");

				videoControls.removeClass("hidden");
			}else{
				videoControls.addClass("hidden");
			}

		},10);

		$("#videoControls .slider").on("mousedown",(event)=>{
			this.mouseDown = true
			var x = event.originalEvent.offsetX;
			var percent = x / parseInt($(".slider").css("width"));
			this.lastVisibleVid.currentTime = percent * this.lastVisibleVid.duration;
			this.lastVisibleVid.pause();
		})
		$("#videoControls .slider").on("mousemove",(event)=>{
			if(this.mouseDown){
				var x = event.originalEvent.offsetX;
				var percent = x / parseInt($(".slider").css("width"));
				this.lastVisibleVid.currentTime = percent * this.lastVisibleVid.duration;
				this.lastVisibleVid.pause();
			}
		})
		$("#videoControls .slider").on("mouseup",(event)=>{
			this.mouseDown = false
			//this.lastVisibleVid.play();
		})
	}
	playPauseVideo(){
		if(this.lastVisibleVid!=null){
			if(this.lastVisibleVid.paused || this.lastVisibleVid.ended){
				this.lastVisibleVid.play();
			}else{
				this.lastVisibleVid.pause();
			}
		}
	}
	fullScreenVideo(){
		if(this.lastVisibleVid!=null){
			$(this.lastVisibleVid).attr("controls","controls")
			
			if (this.lastVisibleVid.requestFullscreen) {
			  this.lastVisibleVid.requestFullscreen();
			} else if (this.lastVisibleVid.mozRequestFullScreen) {
			  this.lastVisibleVid.mozRequestFullScreen();
			} else if (this.lastVisibleVid.webkitRequestFullscreen) {
			  this.lastVisibleVid.webkitRequestFullscreen();
			} else if (elethis.lastVisibleVidm.msRequestFullscreen) { 
			  this.lastVisibleVid.msRequestFullscreen();
			}
			
		}
	}
}