const swiper = new Swiper('.swiper', {
	loop: true,
	slidesPerView: 2,
	freeMode: true,
	effect: 'coverflow',
	spaceBetween: -100,
	centeredSlides: true,
	coverflowEffect: {
		rotate: 0,
		stretch: 100,
		depth: 30,
		modifier: 5,
		slideShadows: false
	}
})
