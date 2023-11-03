EXPANDBANNER = {
	init: function init() {
		this.bannerAction();
		this.bannerClose();
		this.lottiePlayBubble();
		this.lottiePlay();
		this.volumeControl();
		this.playControl();
	},
	bannerAction: function bannerAction() {
		document.querySelectorAll('.button__expand-banner').forEach(function (button) {
			button.addEventListener('click', function () {
				var boxWrap = button.closest('.box__banner-expand');
				var bannerForward = boxWrap.querySelector('.box__banner-forward');
				var bannerBackward = boxWrap.querySelector('.box__banner-backward');
				boxWrap.classList.add('js-active');
				setTimeout(function () {
					boxWrap.classList.add('js-expand');
					bannerForward.setAttribute('aria-hidden', 'true');
					bannerBackward.setAttribute('aria-hidden', 'false');
				}, 300);
			});
		});
	},
	bannerClose: function bannerClose() {
		document.querySelectorAll('.button__close').forEach(function (button) {
			button.addEventListener('click', function () {
				var boxWrap = this.closest('.box__banner-expand');
				var bannerForward = boxWrap.querySelector('.box__banner-forward');
				var bannerBackward = boxWrap.querySelector('.box__banner-backward');
				boxWrap.classList.remove('js-active', 'js-expand');
				bannerForward.setAttribute('aria-hidden', 'false');
				bannerBackward.setAttribute('aria-hidden', 'true');
				boxWrap.focus();
			});
		});
	},
	lottiePlayBubble: function lottiePlayBubble() {
		document.querySelectorAll('.js-lottie--bubble').forEach(function (lottieplay) {
			var lottieAnimation = bodymovin.loadAnimation({
				container: lottieplay,
				renderer: 'svg',
				loop: false,
				autoplay: true,
				path: '//mockupdev.gmarket.co.kr/mobile/style/js/application/kr/lottie/DA-banner-bubble.json'
			});
			setTimeout(function () {
				var animationContainer = lottieplay;

				if (animationContainer) {
					animationContainer.classList.add('js-remove');
				}
			}, 5000);
		});
	},
	lottiePlay: function lottiePlay() {
		document.querySelectorAll('.js-lottie').forEach(function (lottieplay) {
			var lottieAnimation = bodymovin.loadAnimation({
				container: lottieplay,
				renderer: 'svg',
				loop: true,
				autoplay: true,
				path: '//mockupdev.gmarket.co.kr/mobile/style/js/application/kr/lottie/DA-banner.json'
			});
		});
	},
	volumeControl: function volumeControl() {
		document.querySelector('.button__volume-control').addEventListener('click', function () {
			var volumeActive = document.querySelector('.button__volume-control');
			var ariaPressed = volumeActive.getAttribute('aria-pressed');

			if (ariaPressed === 'true') {
				volumeActive.setAttribute('aria-pressed', 'false');
			} else {
				volumeActive.setAttribute('aria-pressed', 'true');
			}

			volumeActive.classList.toggle('js-volume-active');
		});
	},
	playControl: function playControl() {
		document.querySelector('.button__play-control').addEventListener('click', function () {
			var volumeActive = document.querySelector('.button__play-control');
			var ariaPressed = volumeActive.getAttribute('aria-pressed');

			if (ariaPressed === 'true') {
				volumeActive.setAttribute('aria-pressed', 'false');
			} else {
				volumeActive.setAttribute('aria-pressed', 'true');
			}

			volumeActive.classList.toggle('js-play-active');
		});
	}
};
$(function () {
	EXPANDBANNER.init();
});