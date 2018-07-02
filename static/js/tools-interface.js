function req(arr) {
	return arr.join('/')
}

function handler(e, req) {
	e.preventDefault()
	$.ajax({
		dataType: 'json',
		url: req,
		success: res => {
			if ( $('.res').hasClass('slumber') ) {
				for (let i in res) {
					const $label = $('<label/>').attr('for', i).text(i);
					const $input = $('<input>').attr('type', 'text').attr('id', i).prop('readonly', true)
					$('.res').append($label, $input)
				}
				$('.res').show().removeClass('slumber')
			}
			for (let i in res) {
				$('#'+i).val(res[i])
			}
		}
	})
}

$('form.dicer').submit(e => {
	const $length = $('input[type="number"]').val()
	const $flavor = $('input[type="radio"]:checked').val()
	handler(e, req(['/tools/dicer', $flavor, $length]))
})

$('form.hasher').submit(e => {
	const victim = encodeURIComponent($('textarea').val().trim())
	if (victim.length > 0) {
		handler(e, req(['/tools/hasher', victim]))
	} else {
		e.preventDefault()
		$('.res').hide()
	}
})

$('.res').on('click', 'label, input, textarea', e => {
	$(e.currentTarget).select()
})
