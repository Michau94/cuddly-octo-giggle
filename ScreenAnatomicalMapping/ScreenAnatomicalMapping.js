class ScreenAnatomicalMapping extends Screen{
	constructor(container){
		super(container,"./js/screens/ScreenAnatomicalMapping/ScreenAnatomicalMapping.html")
	}


	loadCompletion(){
		main.hideNav();
		super.loadCompletion();

		this.showPage(this.$(".breadcrumb[page=page1]")[0])
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
			}
		})
		this.$(".page:not(.page2)").each(function(){
			if($(this).hasClass(pageClass)){
				var page = this;
				$(page).find("video").each(function(){
					this.currentTime = 0;
					this.preloadVideo();
					$(this).unbind("ended");
					$(this).on("ended",() =>{
						$(page).find(".indicator").removeClass("hidden")
					})
					if(pageClass != "page1"){
						this.playWhenReady();
					}

					$(page).find(".indicator").each(function(){
						$(this).addClass("hidden")
					});
				})
				$(page).removeClass("hidden");
				setTimeout(()=>{
					$(page).css("opacity","1");
				},100)


				if(pageClass == "page3"){
					$(".breadcrumbBar").addClass("hidden");
// 					self.addTimeout(3000,() => {
// 						self.popScreen();
// 						self.parentScreen.loadLeadLocalization();
// 					})
					self.popScreen();	
					self.parentScreen.loadLeadLocalization();
				}else if(pageClass == "page1"){
// 					self.$("#video1")[0].pause();
// 					self.$("#video1").unbind("ended");
// 					self.$("#video1").on("ended",() =>{
// 						self.addTimeout(500, () =>{
// 							self.showPage($(".breadcrumb[page=page2]")[0])
// 						})
// 					})
				}
			}else{
				$(this).addClass("hidden");
			}
		})

		this.$(".page.page2").each(function(){

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


	playVideo(videoID){
		$(".page2 video").each(function(){
			var vid = this;
			if(vid.id == videoID){
				vid.currentTime = 0;
				$(vid).removeClass("hidden");
				vid.preloadVideo();
				vid.playWhenReady();
			}else{
				vid.pause();
				$(vid).addClass("hidden");
			}
		})
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