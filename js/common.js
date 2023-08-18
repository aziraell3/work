var commonUI = (function(){
	var method = {};
	var obj = {};
	method.init = function(){
		method.setElement();
		method.uiFunc();
	};
	method.setElement = function(){
		obj.body = $('body');
		obj.container = $('#container');
	};
	method.uiFunc = function(){
		$(document).on('keydown', '[role=button]', function(e){
			if (e.keyCode === 32 || e.keyCode === 13) {// enter & space 
				e.preventDefault();
				$(this).trigger('click');
			}
		});
		$('.button-expand-close').on('click', function(){
			$('[aria-controls='+$(this).parents('[aria-hidden]').attr('id')+']').trigger('click');
		})
		$('[aria-expanded]').on('click', function(){
			($(this).is('[aria-expanded=true]'))
				? method.expandFunc($(this), false)
				: method.expandFunc($(this), true)
		})
	};
	method.expandFunc = function($this, $boolean){
		var $target = ($($this).is('[aria-controls]'))
			? $('#'+$($this).attr('aria-controls'))
			: $this.next();
		if ($boolean) {
			$($this).addClass('expend').attr('aria-expanded', true);
			$target.attr('aria-hidden', false).slideDown('fast');
		} else {
			$($this).removeClass('expend').attr('aria-expanded', false);
			$target.attr('aria-hidden', true).slideUp('fast');
		}
	}
	method.layerFuncInit = function(){
		$('[aria-haspopup=dialog][aria-controls]').on('click', function(e){
			e.preventDefault();
			var $target = $(this).attr('aria-controls');
			if ($('#'+$target).find('.dimmed').get(0) == undefined) {
				$('#'+$target).append('<div class="dimmed" role="none"></div>');
				method.layerFuncClose();
			}
			if ($('#'+$target).get(0) !== undefined) {
				if ($(this).is('.button-option-select')) {
					$(this).addClass('trigger-active');
				}
				method.layerFunc($target, true);
			}
		})
	};
	method.layerFuncClose = function(){
		$('.box-layer').on('click', '[data-dismiss=modal], .dimmed', function(e){
			e.preventDefault();
			var $target = $(this).parents('[role=dialog], [role=alertdialog]').attr('id');
			$('[aria-controls='+$target+']').removeClass('trigger-active');
			method.layerFunc($target, false);
		})
	};
	method.layerFunc = function($target, $boolean, $content, $confirm){
		$('.common-layer').attr('id', $target);
		if ($('#'+$target).get(0) !== undefined) {
			var $targetPopup = $('#'+$target);
			var $cont = $('#layerContent');
			var firstTabStop = 0;
			var lastTabStop = 0;
			if ($confirm) {
				$targetPopup.attr('role', 'dialog');
				if ($targetPopup.find('.button-cancel').length < 1) {
					$targetPopup.find('.box-button').append('<button class="button-cancel" data-dismiss="modal">취소</button>');
				}
			} else {
				$targetPopup.attr('role', 'alertdialog');
				$targetPopup.find('.box-button .button-cancel').remove();
			}
			if ($boolean) {
				if (!$targetPopup.is('.active')) {
					$targetPopup.addClass('active').attr({'aria-hidden':'false'});
				}
				var focusableElementsString = $targetPopup.find('a[href], area[href], input:not([disabled], [aria-hidden=true]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]');
				var firstTabStop = focusableElementsString[0];
				var lastTabStop = focusableElementsString[focusableElementsString.length - 1];
				//firstTabStop.focus();
				if ($('#'+$target).find('.dimmed').get(0) == undefined) {
					$('#'+$target).append('<div class="dimmed" role="none"></div>');
					method.layerFuncClose();
				}
				$cont.html($content);
				$targetPopup.bind('keydown', trapTabKey);
			} else {
				$cont.empty();
				$targetPopup.unbind('keydown', trapTabKey, false);
				$targetPopup.removeClass('active').attr({'aria-hidden':'true'});
				if ($('[aria-haspopup=dialog][aria-controls='+$target+']').length > 0) {
					$('[aria-haspopup=dialog][aria-controls='+$target+']').focus().removeClass('trigger-active');
				} else if($('.active').get(0) !== undefined) {
					$('.active').find('[data-dismiss=modal]').focus();
				} else {
					$('#container').attr('tabindex', '0').focus();
				}
			}
			method.fixedViewPort($boolean);
			function trapTabKey(e) {
				// Check for TAB key press
				if (e.keyCode === 9) {
					// SHIFT + TAB
					if (e.shiftKey) {
						if (document.activeElement === firstTabStop) {
							e.preventDefault();
							lastTabStop.focus();
						}
					// TAB
					} else {
						if (document.activeElement === lastTabStop) {
							e.preventDefault();
							firstTabStop.focus();
						}
					}
				}
				// ESCAPE
				if (e.keyCode === 27) {
					$targetPopup.find('[data-dismiss=modal], .dimmed').click();
				}
			}
		}
	};
	method.aspectMultiply = function($number){
		obj.aspectList.find('.txt_calc').each(function(){
			var $basicNum = $(this).attr('data-origin');
			$(this).text(parseInt($basicNum * $number / 10));
		});
	};
	method.aspectReset = function(){
		//세팅된 모든값 리셋
		obj.aspectOpen.removeClass('active selected latest').removeAttr('data-target');
		obj.aspectLayer.removeClass('active').removeAttr('data-sorting');
		obj.container.find('.inven').removeClass('active').find('.equ .text .detail, .equ .text .more').empty().removeClass('type-uni type-leg');
		obj.aspectButton.attr('aria-selected', false).removeAttr('data-select-parts');
		obj.aspectOpen.parent().removeAttr('data-parts data-ver'); //[data-*]
		obj.aspect.removeClass('active').removeAttr('data-gem-icon');
		obj.gemOpen.removeAttr('data-gem-icon'); //세팅된 보석 리셋
		method.wepChange(true); //주무기 보석 칸 리셋
		//$('.gems').removeClass('single-gem').parents('.equ').attr('data-multiply', '20');; //주무기 보석 칸 리셋
		//$('#wep2, #wep4').parents('.equ').attr('data-wep-type', 'sub');
		$('#container .inven .equ .button-option-select').removeClass('modify');
		$('.box-aspect').empty(); //위상 리셋
		$('#previewImg').empty(); //생성된 이미지 리셋
		$('.option-list').removeAttr('data-target').empty(); //옵션 리셋
		obj.delOpt.removeAttr('style') //옵션 삭제 버튼 숨김
		method.layerFunc('optionSelect', false); //옵션 레이어 닫기
		method.fixedViewPort(false);
	};
	method.fixedViewPort = function(fixedView){
		(fixedView) ? obj.body.addClass('scroll-lock header-flip') : obj.body.removeClass('scroll-lock header-flip');
	};
	return{
		init : method.init,
		scrollFunc : method.scrollFunc,
		layerFunc : method.layerFunc,
	}
})();
commonUI.init();