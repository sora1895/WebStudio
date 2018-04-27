;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height() - $('#fh5co-header').height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height() - $('#fh5co-header').height());
			});
		}

	};

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Main Menu Superfish
	var init = function() {
		$('#fh5co-header-section').empty();
		$('#fh5co-header-section').append($(`<div class="container">
		<div class="nav-header">
			<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle">
				<i></i>
			</a>
			<h1 id="fh5co-logo">
				<a href="index.html">StudioWeb</a>
			</h1>
			<!-- START #fh5co-menu-wrap -->
			<nav id="fh5co-menu-wrap" role="navigation">
				<ul class="sf-menu" id="fh5co-primary-menu">
					<li>
						<a class="active" href="index.html">Trang chủ</a>
					</li>
					<!--<li><a href="work.html">Tour</a></li>-->
					<li>
						<a href="studio-list.html" class="fh5co-sub-ddown">Studio</a>
						<ul id="list-studio" class="fh5co-sub-menu">
							<li>
								<a href="studio-main.html" onclick="studioId(3);">Studio A</a>
							</li>
							<li>
								<a href="studio-main.html" onclick="studioId(4);">Studio B</a>
							</li>
							<li>
								<a href="studio-main.html" onclick="studioId(5);">Studio C</a>
							</li>
						</ul>
					</li>
					<li>
						<a href="#" class="fh5co-sub-ddown">Album</a>
						<ul class="fh5co-sub-menu">
							<li>
								<a href="left-sidebar.html">Ảnh cưới</a>
							</li>
							<li>
								<a href="right-sidebar.html">Ảnh quảng cáo</a>
							</li>
							<li>
								<a href="#" class="fh5co-sub-ddown">Ảnh trẻ con</a>
								<ul class="fh5co-sub-menu">
									<li>
										<a href="http://freehtml5.co/preview/?item=build-free-html5-bootstrap-template" target="_blank">HIệu ứng đặc biệt</a>
									</li>
									<li>
										<a href="http://freehtml5.co/preview/?item=work-free-html5-template-bootstrap" target="_blank">Ảnh tự nhiên</a>
									</li>
									<!--<li><a href="http://freehtml5.co/preview/?item=light-free-html5-template-bootstrap" target="_blank">Light</a></li>
											<li><a href="http://freehtml5.co/preview/?item=relic-free-html5-template-using-bootstrap" target="_blank">Relic</a></li>
											<li><a href="http://freehtml5.co/preview/?item=display-free-html5-template-using-bootstrap" target="_blank">Display</a></li>
											<li><a href="http://freehtml5.co/preview/?item=sprint-free-html5-template-bootstrap" target="_blank">Sprint</a></li>-->
								</ul>
							</li>
							<li>
								<a href="#">Ảnh gia đình</a>
							</li>
							<li>
								<a href="#">Ảnh chân dung</a>
							</li>
							<li>
								<a href="#">Ảnh chụp tự do</a>
							</li>
						</ul>
					</li>
					<li>
						<a href="view-contract.html">Hợp Đồng</a>
					</li>

					<li>
						<a id="user" href="login.html">Đăng nhập</a>
						<ul id="user-option" class="fh5co-sub-menu">
								<li id="user-btn" hidden><a href="user.html">Quản lý nhân viên</a></li>
							<li id="stu-btn" hidden><a href="studio.html">Quản lý Studio</a></li>
							<li id="dis-btn" hidden><a href="dismanage.html">Quản lý tỉnh thành</a></li>
							<li id="edit-profile-btn" hidden><a href="edit-studio.html">Thông tin Studio</a></li>
							<li id="pack-btn" hidden><a href="package.html">Quản lý Gói hàng</a></li>
							<li id="pic-btn" hidden><a href="picture.html">Quản lý Ảnh</a></li>
							<li id="con-btn" hidden><a href="contract.html">Hợp đồng</a></li>
							<li id="change-btn" hidden><a href="changepass.html">Đổi mật khẩu</a></li>
							<li id="logout-btn" hidden><a id="logout" href="login.html">Đăng xuất</a></li>
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	</div>`));

		

		var admin = localStorage.getItem('Admin');
		var stuStr = localStorage.getItem('USER');
		if(admin!=0){
			$("#user").html('Admin');
				$("#user").attr('href', "user-page.html");
				$('#logout-btn').show();
				$('#user-btn').show();
                $('#stu-btn').show();
				$('#dis-btn').show();
				$('#change-btn').show();
		}
		else if(stuStr!=0){
			var stu = JSON.parse(stuStr)[0];
				$('#edit-profile-btn').show();
				$('#pic-btn').show();
				$('#con-btn').show();
				$('#pack-btn').show();
				console.log(stu)
				$("#user").html(stu.Studio_Name);
				$("#user").attr('href', "user-page.html");
				$('#logout-btn').show();
				$('#change-btn').show();
			
			
		}
		



		$('#logout-btn').click(function(){
			localStorage.setItem('UserStudioId',0);
			localStorage.setItem('USER',0);
			if(localStorage.getItem('Admin')!=0){
				localStorage.setItem('Admin',0)
			}


		})

		$.ajax({
			url: '/GetStudioByID?id='+localStorage.getItem('stuid'),
			method: 'post',
			contentType: 'application/json',
		}).always(function (res) {
			localStorage.setItem('coor',res.data[0].Studio_Coordinate)
		})
	}

	var mainMenu = function() {

		$('#fh5co-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	var sliderMain = function() {
		
	  	$('#fh5co-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	  	$('#fh5co-hero .flexslider .slides > li').css('height', $(window).height());	
	  	$(window).resize(function(){
	  		$('#fh5co-hero .flexslider .slides > li').css('height', $(window).height());	
	  	});

	};


	// Offcanvas and cloning of the main menu
	var offcanvas = function() {

		var $clone = $('#fh5co-menu-wrap').clone();
		$clone.attr({
			'id' : 'offcanvas-menu'
		});
		$clone.find('> ul').attr({
			'class' : '',
			'id' : ''
		});

		$('#fh5co-page').prepend($clone);

		// click the burger
		$('.js-fh5co-nav-toggle').on('click', function(){

			if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			} else {
				$('body').addClass('fh5co-offcanvas');
			}
			// $('body').toggleClass('fh5co-offcanvas');

		});

		$('#offcanvas-menu').css('height', $(window).height());

		$(window).resize(function(){
			var w = $(window);


			$('#offcanvas-menu').css('height', w.height());

			if ( w.width() > 769 ) {
				if ( $('body').hasClass('fh5co-offcanvas') ) {
					$('body').removeClass('fh5co-offcanvas');
				}
			}

		});	

	}

	

	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			}
	    }
		});
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};


	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};

	var gridAutoHeight = function() {
		if (!isiPhone() || !isiPad()) {
			$('.row-half').css('height', $('.col-half').outerHeight()/2);
		}
		$(window).resize(function(){
			if (!isiPhone() && !isiPad()) {
				$('.row-half').css('height', $('.col-half').outerHeight()/2);
			}
		});
	}

	var counter = function() {
		$('.js-counter').countTo({
			formatter: function (value, options) {
	      	return value.toFixed(options.decimals);
	    	}
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter-section').length > 0 ) {
			$('#fh5co-counter-section').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '90%' } );
		}
	};
	

	// Document on load.
	$(document).ready(function(){
		init();
		mainMenu();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		sliderMain();
		fullHeight();
		gridAutoHeight();
		parallax();
		counterWayPoint();
	})
	// $();


}());