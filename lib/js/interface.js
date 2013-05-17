var anitime = 700;
var hanitime = anitime / 2;
var border = 1;
var interpadding = 10;

var cwidth = basebox + interpadding + border * 2;
var parentbox = basebox + 2;
var bigbox = basebox * 3 + interpadding * 2 + border * 4;
var medbox = basebox * 2 + interpadding + border * 4;
var bigparentbox = bigbox + 2;
var medparentbox = medbox + 2;
var buttonaway = bigbox - basebox + border * 6;
var buttonawaymed = medbox - basebox + border * 6;
var buttonback = basebox - bigbox + border * 6;
var buttonbackmed = basebox - medbox + border * 6;

$(function(){
  $('#boxes').masonry({
	itemSelector : '.overbox',
	columnWidth : cwidth,
	isAnimated: true,
	isFitWidth: true,
	animationOptions: {
		duration: anitime
    }
  });
});

function closeOther(){
	$('#open').parent().width(parentbox).height(parentbox).css('z-index', 'auto');
	if( $('#open').children('div.desc').hasClass('meta') ){
		$('#open').next().css('right',buttonbackmed).animate({right:5,opacity:0},anitime,function(){
			$(this).css('display','none');
			});
	} else {
		$('#open').next().css('right',buttonback).animate({right:5,opacity:0},anitime,function(){
			$(this).css('display','none');
			});
	}
	$('#open img.full').animate({opacity:0,width:'160px'}, anitime);
	$('#open img.thumb').animate({top:0,left:0, width:'160px',opacity:1}, anitime);
	$('#open div.desc').animate({top:'160px', opacity:0}, anitime);
	$('#open').animate({width:basebox+'px',height:basebox+'px'}, anitime).removeAttr('id');
}

$('.closy').click(function(){
	$(this).parent().width(parentbox).height(parentbox).css('z-index', 'auto');
	$(this).prev().animate({width:basebox+'px',height:basebox+'px'}, anitime).removeAttr('id');
	if( $(this).prev().children('div.desc').hasClass('meta') ){
		$(this).css('right',buttonbackmed).animate({right:5,opacity:0},anitime,function(){
			$(this).css('display','none');
			});
	} else {
		$(this).css('right',buttonback).animate({right:5,opacity:0},anitime,function(){
			$(this).css('display','none');
			});
	}
	$(this).prev().children('img.full').animate({opacity:0,width:'160px'}, anitime);
	$(this).prev().children('img.thumb').animate({top:0,left:0,width:'160px',opacity:1}, anitime);
	$(this).prev().children('div.desc').animate({top:'160px', opacity:0}, anitime);
	$('#boxes').masonry('reload');
});

$('#head').click(function(){
	closeOther();
	$('#boxes').masonry('reload');
});

$('.box').click(function(){
	if ( $(this).attr('id') != 'open' ){
		closeOther();
		if( $('div.desc', this).hasClass('meta') ){
			$(this).parent().width(medparentbox).height(medparentbox).css('z-index', 100);
			$('div.desc', this).animate({top:'20px', opacity:1}, anitime);
			$(this).animate({width:medbox+'px',height:medbox+'px',borderColor:'#cbcbcb'}, anitime).attr("id","open");
			$(this).next().css({'right':buttonawaymed,'display':'inline'}).animate({right:5,opacity:0.5},anitime);
		} else {
			$(this).parent().width(bigparentbox).height(bigparentbox).css('z-index', 100);
			$('div.desc', this).animate({top:'450px', opacity:1}, anitime);
			$(this).animate({width:bigbox+'px',height:bigbox+'px',borderColor:'#cbcbcb'}, anitime).attr("id","open");
			$('img.full', this).animate({opacity:1,width:'540px'}, anitime);
			$(this).next().css({'right':buttonaway,'display':'inline'}).animate({right:5,opacity:0.5},anitime);
		}
		$('img.thumb', this).animate({top:'10px',left:'10px',width:0,opacity:0}, hanitime);
		$('#boxes').masonry('reload');
	}
});

$('.box').hover(
	function(){
		$(this).not('#open').animate({borderColor:'#f5f5f5'}, 300);
	},
	function(){
		$(this).not('#open').animate({borderColor:'#cbcbcb'}, 300);
});
