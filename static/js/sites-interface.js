const a = {
	time: 512,
	get qtime () { return this.time / 4 },
	get fast () { return this.time / 16 }
}

const m = {
	basebox: 184,
	gutter: 10,
	get bigbox () { return this.basebox * 3 + this.gutter * 2 },
	get fullimg () { return this.bigbox - this.gutter * 4 }
}

$('#boxes')
	.show()
	.masonry({
		itemSelector: '.overbox',
		columnWidth: m.basebox,
		gutter: m.gutter,
		fitWidth: true,
		transitionDuration: a.time/1000+'s',
		stagger: a.fast
})

function refresh() {
	$('#boxes').masonry('layout')
}

function open($target) {
	// where $target is some .box
	const $closy = $target.next()
	const $obox = $target.parent()
	$obox.width(m.bigbox).height(m.bigbox).css('z-index', 100)
	$target.animate({width: m.bigbox+'px', height: m.bigbox+'px'}, a.time, () => {
		$closy.css('display','inline').animate({opacity: 1},a.qtime);
	}).addClass('open')
	$target.children('img.full').animate({opacity: 1, width: m.fullimg},  a.time)
	$target.children('img.thumb').animate({top: m.gutter+'px', left: m.gutter+'px', width: 0, opacity: 0}, a.qtime)
	$target.children('div.desc').animate({top: '435px', opacity: 1}, a.time)
	refresh()
}

function close() {
	// where target is some .box
	const $target = $('.open');
	if ($target.length) {
		const $closy = $target.next();
		const $obox = $target.parent();
		$obox.width(m.basebox).height(m.basebox).css('z-index', 'auto')
		$closy.css({'display': 'none', 'opacity': 0})
		$target.animate({width: m.basebox+'px', height: m.basebox+'px'},  a.time, () => {
			$target.removeClass('open')
		})
		$target.children('img.full').animate({opacity: 0, width: '160px'},  a.time)
		$target.children('img.thumb').animate({top: 0, left: 0, width: '160px', opacity: 1}, a.time)
		$target.children('div.desc').animate({top: '160px', opacity: 0}, a.time)
		refresh()
	}
}

$('.closy').click(() => {
	close()
})

$('.box').click(e => {
	const $this = $(e.currentTarget)
	if ( !$this.hasClass('open') ){
		close()
		open($this)
	}
})

/////////////////////
// Keyboard Circus //
/////////////////////

$(document).on('keydown', null, 'esc', () => {
	close()
})
