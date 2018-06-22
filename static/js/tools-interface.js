function req(arr) {
	return arr.join('/')
}

function handler(e, req) {
	e.preventDefault();
	$.ajax({
		dataType: 'json',
		url: req,
		success: function(res) {
			if ( $('.res').hasClass('slumber') ) {
				for (var i in res) {
					$label = $('<label/>').attr('for', i).text(i);
					$input = $('<input>').attr('type', 'text').attr('id', i).prop('readonly', true);
					$('.res').append($label, $input);
				}
				$('.res').show().removeClass('slumber');
			}
			for (var i in res) {
				$('#'+i).val(res[i])
			}
		}
	})
}

$('form.dicer').submit(function(e) {
	var length = $('input[type="number"]').val();
	var flavor = $('input[type="radio"]:checked').val();
	handler(e, req(['/tools/dicer', flavor, length]));
});

$('form.hasher').submit(function(e) {
	var victim = encodeURIComponent($('textarea').val().trim());
	if (victim.length > 0) {
		handler(e, req(['/tools/hasher', victim]));
	} else {
		e.preventDefault();
		$('.res').hide();
	}
});

$('.res').on('click', 'label, input, textarea', function(){
	$(this).select();
});
