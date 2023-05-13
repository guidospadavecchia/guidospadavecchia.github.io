/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */

(function ($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */
	$(window).load(function () {

		// will first fade out the loading animation 
		$("#loader").fadeOut("slow", function () {

			// will fade out the whole DIV that covers the website.
			$("#preloader").delay(300).fadeOut("slow");

		});

	})


	/*---------------------------------------------------- */
	/* FitText Settings
	------------------------------------------------------ */
	setTimeout(function () {

		$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */
	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */
	$("#owl-slider").owlCarousel({
		navigation: false,
		pagination: true,
		itemsCustom: [
			[0, 1],
			[700, 2],
			[960, 3]
		],
		navigationText: false
	});


	/*----------------------------------------------------- */
	/* Alert Boxes
		------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function () {
		$(this).parent().fadeOut(500);
	});


	/*----------------------------------------------------- */
	/* Stat Counter
		------------------------------------------------------- */
	var statSection = $("#stats"),
		stats = $(".stat-count");

	statSection.waypoint({

		handler: function (direction) {

			if (direction === "down") {

				stats.each(function () {
					var $this = $(this);

					$({ Counter: 0 }).animate({ Counter: $this.text() }, {
						duration: 4000,
						easing: 'swing',
						step: function (curValue) {
							$this.text(Math.ceil(curValue));
						}
					});
				});

			}

			// trigger once only
			this.destroy();

		},

		offset: "90%"

	});


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded(function () {

		containerProjects.masonry({
			itemSelector: '.folio-item',
			resize: true
		});

	});

	/*---------------------------------------------------- */
	/*	Typewriter effect
	------------------------------------------------------ */
	var app = document.getElementById('helloworld');
	var consolePrefix = '> ';
	var text = app.innerText;
	var typewriter = new Typewriter(app, {
		loop: false,
		delay: 'natural',
		deleteSpeed: 'natural'
	});

	typewriter.typeString(consolePrefix)
		.pauseFor(1000)
		.typeString(text)
		.start()

	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
	$('.item-wrap a').magnificPopup({

		type: 'inline',
		fixedContentPos: false,
		removalDelay: 300,
		showCloseBtn: false,
		mainClass: 'mfp-fade'

	});

	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});


	/*-----------------------------------------------------*/
	/* Navigation Menu
------------------------------------------------------ */
	var toggleButton = $('.menu-toggle'),
		nav = $('.main-navigation');

	// toggle button
	toggleButton.on('click', function (e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

	// nav items
	nav.find('li a').on("click", function () {

		// update the toggle button 		
		toggleButton.toggleClass('is-clicked');
		// fadeout the navigation panel
		nav.fadeOut();

	});


	/*---------------------------------------------------- */
	/* Highlight the current section in the navigation bar
	------------------------------------------------------ */
	var sections = $("section"),
		navigation_links = $("#main-nav-wrap li a");

	sections.waypoint({

		handler: function (direction) {

			var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');

			navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},

		offset: '25%'
	});


	/*---------------------------------------------------- */
	/* Smooth Scrolling
	------------------------------------------------------ */
	$('.smoothscroll').on('click', function (e) {

		e.preventDefault();

		var target = this.hash,
			$target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 800, 'swing', function () {
			window.location.hash = target;
		});

	});

	/*---------------------------------------------------- */
	/* Copyright notice
	------------------------------------------------------ */
	$('#copyright-text').text('© Copyright ' + new Date().getFullYear());

	/*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */
	$('input, textarea, select').placeholder();


	/*----------------------------------------------------- */
	/* Back to top
	------------------------------------------------------- */
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

	// Show or hide the sticky footer button
	jQuery(window).scroll(function () {

		if (!($("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}
		}
	});

	/*----------------------------------------------------- */
	/* Custom code
	------------------------------------------------------- */
	let language = document.querySelector('meta[name="lang"]').content;
	let isSpanish = language === 'es';

	configureCvButton(isSpanish);
	replacePlaceholders(isSpanish);

	/** Alertify defaults */
	alertify.defaults.transition = "slide";
	alertify.defaults.theme.ok = "btn btn-primary";
	alertify.defaults.theme.cancel = "btn btn-danger alertify-btn-danger-override";
	alertify.defaults.theme.input = "form-control alertify-form-control-override";
	alertify.defaults.glossary.ok = isSpanish ? 'Aceptar' : 'OK';
	alertify.defaults.glossary.cancel = isSpanish ? 'Cancelar' : 'Cancel';
})(jQuery);

function configureCvButton(isSpanish) {
	const code = String.fromCharCode(103, 115, 57, 52, 99, 118); /* iniciales-AA-CV */
	const cvDriveIdEn = '1364uy6wi1BTImcbJj18oDYHdWMVRjPTE';
	const cvDriveIdEs = '1FJej9cUuKVwcJOUZI80j15rp2dVOqaSi';

	$("#cvDownload").click(function () {
		let scrollOffset = window.pageYOffset;
		let title = isSpanish ? 'Desbloquear Descarga' : 'Unlock Download';
		let message = isSpanish ? 'Por favor ingrese el código provisto:' : 'Please enter the provided code:';
		let errorMessage = isSpanish ? 'Código incorrecto' : 'Incorrect passphrase';
		let successMessage = isSpanish ? 'La descarga comenzará pronto' : 'Your download has started';

		let onOK = (_, value) => {
			alertify.set('notifier', 'position', 'top-center');
			if (value.toLowerCase() === code.toLowerCase()) {
				let documentId = isSpanish ? cvDriveIdEs : cvDriveIdEn;
				alertify.notify(successMessage, 'success', 3);
				window.open(`https://drive.google.com/uc?export=download&id=${documentId}`, '_self');
			}
			else {
				alertify.notify(errorMessage, 'error', 3);
			}
			window.scrollTo(0, scrollOffset);
		};
		let onCancel = () => {
			alertify.closeAll();
			window.scrollTo(0, scrollOffset);
		}
		alertify.prompt(title, message, '', onOK, onCancel).setting({
			movable: false,
			transition: 'zoom',
			maximizable: false,
			preventBodyShift: true,
			autoReset: false
		});
	});
}

function replacePlaceholders(isSpanish) {
	const now = moment();

	const getPlaceholderValueById = (id) => $(`#${id}`).text().replace('{', '').replace('}', '');
	const setValueById = (id, value) => $(`#${id}`).text(value);

	/** About - Years old */
	const setCurrentAge = () => {
		const id = 'birth-date-placeholder';
		const birthDate = getPlaceholderValueById(id);
		const momentBirthDate = moment(birthDate);
		const age = now.diff(momentBirthDate, 'years', false);
		setValueById(id, age);
	}

	/** Skills - Years of experience */
	const setYearsOfExperience = () => {
		const id = 'experience-years-from';
		const yearFrom = getPlaceholderValueById(id);
		const momentFrom = moment([yearFrom, 0]);
		const years = now.diff(momentFrom, 'years');
		setValueById(id, years);
	};

	/** Current job - Duration */
	const setCurrentJobDuration = () => {
		const id = 'current-job-start-date';
		const startDate = getPlaceholderValueById(id);
		const momentStartDate = moment(startDate);
		const diffDuration = moment.duration(now.diff(momentStartDate));
		const years = diffDuration.years();
		const months = diffDuration.months();
		const yearsText = years > 0 ? `${years} ${isSpanish ? 'año' : 'year'}` : `${years} ${isSpanish ? 'años' : 'years'}`;
		const monthsText = months > 0 ? `${months} ${isSpanish ? 'mes' : 'month'}` : `${years} ${isSpanish ? 'meses' : 'months'}`;
		const text = `${years > 0 ? `${yearsText} ` : ''}${months > 0 ? `${monthsText}` : ''}`;
		setValueById(id, text);
	};

	setCurrentAge();
	setYearsOfExperience();
	setCurrentJobDuration();
}