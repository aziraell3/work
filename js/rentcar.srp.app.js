/* Rentcar VIP */

RENTERCARSRPUI = {
    init: function() {
        this.setElement();
        this.toolTipLayer();
        this.filterFloating();
        this.catalogControl();
        this.filterEvent();
        this.alignInputChecking();
        this.detailAccordion();
        this.detailFareRange();
        this.detailYearRange();
        this.detailYearRangeSingle();
        this.dynamicfilter();
        this.detailInputChecking();
        this.mapResize();
        this.mapTouchEvent();
        this.mapMarkerControl();
        this.catalogPosition();
    },
    setElement: function() {
    },
    toolTipLayer : function(){
        document.querySelectorAll('.box__layer-tooltip .button__closed').forEach(function(element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                this.parentNode.classList.remove('active');
                this.parentNode.previousElementSibling.focus();
            });
        });

        document.querySelectorAll('.button__tooltip').forEach(function(element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                var ariaValue = (this.getAttribute('aria-expanded') === 'false') ? 'true' : 'false';
                if (this.closest(".box__tooltip-area")) {
                    this.setAttribute('aria-expanded', ariaValue);
                    this.classList.toggle('active');
                    this.closest(".box__tooltip-area").querySelector('.box__layer-tooltip').classList.toggle('active');
                } else {
                    this.setAttribute('aria-expanded', ariaValue);
                    this.classList.toggle('active');
                    this.nextElementSibling.classList.toggle('active');
                }
            });
        });
    },
    filterFloating : function(){
        document.addEventListener('scroll', function() {
            var mapEl = document.getElementById("box__map-frame");
            if (mapEl === null) {
                var scrollSpot = window.pageYOffset || document.documentElement.scrollTop;
                if (0 < scrollSpot) {
                    document.querySelector('.box__filter-wrap').classList.add('js-box__fixed');
                } else if (48 > scrollSpot) {
                    document.querySelector('.box__filter-wrap').classList.remove('js-box__fixed');
                }
            }
        })
    },
    catalogControl : function(){
        $(".link__catalog").on("click", function(){
            $('html').addClass('js-scroll--lock');
            $('#box__layer-srp-catalog').animate({"right":0}, 300);
            return false;
        });

        $("#box__layer-srp-catalog .js-button__back").on("click", function(){
            $('html').removeClass('js-scroll--lock');
            $('#box__layer-srp-catalog').animate({"right":"-100%"}, 300);
            if($('.box__catalog-top').hasClass('js-fixed') === true) {
                $('.box__catalog-top').removeClass('js-fixed');
            }
            return false;
        });
    },
    filterEvent : function(){
        var activeBtnEvent = function(target){
            $(document).on('click', target + ' .button', function(){
                var $this = $(this);
                var item = $this.parent();
                var activeClass = 'list-item--active';
                $(target + ' .list-item').removeClass(activeClass);
                $(target + ' .list-item .button').attr('aria-selected', 'false');
                item.addClass(activeClass);
                $this.attr('aria-selected', 'true');
            });
        }
        
        activeBtnEvent('.box__catagory-filter .list__catagory');
        
        $('.box__catagory-filter').each(function(){
            var naviBoxGroup = $(this);
            var scrollLeftEvent = function(naviBoxGroup){
                var naviBox = naviBoxGroup;
                var naviBoxInner = naviBox.find('.list__catagory');
                var tabUi = naviBoxInner.find('.list-item');
                var tabUiWidth = null;
    
                for (var i = 0; i < tabUi.length; i++) {
                tabUiWidth += tabUi.eq(i).outerWidth();
                }
    
                tabUi.click(function () {
                $(this).addClass('list-item--active').siblings().removeClass('list-item--active');
    
                var scrollValue = naviBoxInner.scrollLeft();
                var navigationScroll = naviBoxInner.width() < tabUiWidth;
                var navigationListActive = $(this);
                if(navigationScroll){
                    activeItemOffset = navigationListActive.offset().left + (navigationListActive.width()/2) - naviBoxInner.width()/2
                    naviBoxInner.stop().animate({scrollLeft: activeItemOffset + scrollValue}, 100);
                }
                });
            }
            scrollLeftEvent(naviBoxGroup);
        });
    },
    alignInputChecking : function(){ // used .box__layer-align
        var radioDefault = '.js-form__radio-default';
        
        $(document).on('click','.box__layer-align .js-button__cancel',function(){
            //initialize
            var $layer = $(this).parents('.box__layer-align');
            $layer.find(radioDefault).prop('checked',true);
        });
    },
    detailAccordion : function(){
        var accordion = ".button__accordion";

        document.querySelectorAll(accordion).forEach(function(element) {
            element.closest(".box__accordion-button").nextElementSibling.classList.add("box__accordion-contents--hidden");
            
            if (element.closest(".box__accordion-button").nextElementSibling.style.display === "block") {
                element.classList.add("button__accordion--active");
                element.setAttribute("aria-expanded", true);
            }
        });

        document.addEventListener("click", function(event) {
            if (event.target.matches(accordion)) {
                if (!event.target.classList.contains("button__accordion--active")) {
                    event.target.classList.add("button__accordion--active");
                    event.target.closest(".box__option-content").querySelector(".box__accordion-contents").style.display = "block";
                    event.target.setAttribute("aria-expanded", true);
                } else {
                    event.target.classList.remove("button__accordion--active");
                    event.target.closest(".box__option-content").querySelector(".box__accordion-contents").style.display = "none";
                    event.target.setAttribute("aria-expanded", false);
                }
            }
        });
    },
    detailFareRange : function(){
		var slider = document.getElementById('slider__rent-fare');
        var inputStart = document.getElementById('input-with-keypress-3');
        var inputEnd = document.getElementById('input-with-keypress-4');
        var rangeSelect = document.getElementById('text__select-fare');
        var inputs = [inputStart, inputEnd];
        noUiSlider.create(slider, {
            start: [0, 1000000],
            connect: true,
            range: {
                'min':0,
                'max': 3000000
            },
            snap: false,
        });
        slider.noUiSlider.on('update', function (values, handle) {
            inputs[handle].value = Math.floor(values[handle]).toLocaleString();
            rangeSelect.innerHTML = Math.floor(values[0]).toLocaleString() + '원~'+ Math.floor(values[1]).toLocaleString() + '원';
        });
        inputs.forEach(function (input, handle) {
                input.addEventListener('change', function () {
                slider.noUiSlider.setHandle(handle, this.value);
            });
            input.addEventListener('keydown', function (e) {
                var values = slider.noUiSlider.get();
                var value = Number(values[handle]);
                // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
                var steps = slider.noUiSlider.steps();
                // [down, up]
                var step = steps[handle];
                var position;
                switch (e.which) {
                    // enter
                    case 13:
                        slider.noUiSlider.setHandle(handle, this.value);
                    break;
                    // key up
                    case 38:
                        // Get step to go increase slider value (up)
                        position = step[1];
                        // false = no step is set
                        if (position === false) {
                            position = 1;
                        }
                        // null = edge of slider
                        if (position !== null) {
                            slider.noUiSlider.setHandle(handle, value + position);
                        }
                    break;
                    // key down
                    case 40:
                        position = step[0];
                        if (position === false) {
                            position = 1;
                        }
                        if (position !== null) {
                            slider.noUiSlider.setHandle(handle, value - position);
                        }
                    break;
                }
            });
        });
	},
    detailYearRange : function(){
        var slider = document.getElementById('slider__model-year');
        var inputStart = document.getElementById('input-with-keypress-0');
        var inputEnd = document.getElementById('input-with-keypress-1');
        var rangeSelect = document.getElementById('text__select-year');
        var inputs = [inputStart, inputEnd];
        noUiSlider.create(slider, {
            start: [2012, 2022],
            connect: true,
            range: {
                'min':2012,
                '10%':2013,
                '20%':2014,
                '30%':2015,
                '40%':2016,
                '50%':2017,
                '60%':2018,
                '70%':2019,
                '80%':2020,
                '90%':2021,
                'max': 2022
            },
            snap: true,
        });
        slider.noUiSlider.on('update', function (values, handle) {
            inputs[handle].value = Math.floor(values[handle]);
            rangeSelect.innerHTML = Math.floor(values[0]) + '년~'+ Math.floor(values[1]) + '년';
        });
        inputs.forEach(function (input, handle) {
                input.addEventListener('change', function () {
                slider.noUiSlider.setHandle(handle, this.value);
            });
            input.addEventListener('keydown', function (e) {
                var values = slider.noUiSlider.get();
                var value = Number(values[handle]);
                // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
                var steps = slider.noUiSlider.steps();
                // [down, up]
                var step = steps[handle];
                var position;
                switch (e.which) {
                    // enter
                    case 13:
                        slider.noUiSlider.setHandle(handle, this.value);
                    break;
                    // key up
                    case 38:
                        // Get step to go increase slider value (up)
                        position = step[1];
                        // false = no step is set
                        if (position === false) {
                            position = 1;
                        }
                        // null = edge of slider
                        if (position !== null) {
                            slider.noUiSlider.setHandle(handle, value + position);
                        }
                    break;
                    // key down
                    case 40:
                        position = step[0];
                        if (position === false) {
                            position = 1;
                        }
                        if (position !== null) {
                            slider.noUiSlider.setHandle(handle, value - position);
                        }
                    break;
                }
            });
        });
	},
    detailYearRangeSingle : function(){
        var slider = document.getElementById('slider__model-year-single');
        var inputStart = document.getElementById('input-with-keypress-5');
        var inputEnd = document.getElementById('input-with-keypress-6');
        var inputs = [inputStart, inputEnd];
        noUiSlider.create(slider, {
            start: [2012, 2022],
            connect: true,
            range: {
                'min':2012,
                '10%':2013,
                '20%':2014,
                '30%':2015,
                '40%':2016,
                '50%':2017,
                '60%':2018,
                '70%':2019,
                '80%':2020,
                '90%':2021,
                'max': 2022
            },
            snap: true,
        });
        slider.noUiSlider.on('update', function (values, handle) {
            inputs[handle].value = Math.floor(values[handle]);
        });
        inputs.forEach(function (input, handle) {
                input.addEventListener('change', function () {
                slider.noUiSlider.setHandle(handle, this.value);
            });
            input.addEventListener('keydown', function (e) {
                var values = slider.noUiSlider.get();
                var value = Number(values[handle]);
                // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
                var steps = slider.noUiSlider.steps();
                // [down, up]
                var step = steps[handle];
                var position;
                switch (e.which) {
                    // enter
                    case 13:
                        slider.noUiSlider.setHandle(handle, this.value);
                    break;
                    // key up
                    case 38:
                        // Get step to go increase slider value (up)
                        position = step[1];
                        // false = no step is set
                        if (position === false) {
                            position = 1;
                        }
                        // null = edge of slider
                        if (position !== null) {
                            slider.noUiSlider.setHandle(handle, value + position);
                        }
                    break;
                    // key down
                    case 40:
                        position = step[0];
                        if (position === false) {
                            position = 1;
                        }
                        if (position !== null) {
                            slider.noUiSlider.setHandle(handle, value - position);
                        }
                    break;
                }
            });
        });
	},
    dynamicfilter : function(){
        document.querySelectorAll(".box__dynamic-filter .button__dynamic-filter, .box__dynamic-filter .button__delete").forEach(function(button) {
            button.addEventListener("click", function() {
                const listItem = this.parentNode;
                listItem.classList.toggle("js-active");
            });
        });
    },
    detailInputChecking : function(){
        // 상세조건 레이어 인풋 제어
        var check = '.js-form__check-detail';
        var selectVal = "";

        $(document).on("click",check,function(){ 
            var $this = $(this);
            var $checks = $this.parents('.list__detail-option').find(check);
            if($this.prop("checked")){
				if($this.parents(".box__option-content").find(".box__select .text__select span:first-child").text() == "전체"){
					selectVal = "";
					selectVal += "<span>" + $this.next(".form__label").text() + "</span>";
				}else{
					selectVal += "<span>" + $this.next(".form__label").text() + "</span>";
				}
				$this.parents(".box__option-content").find(".box__select .text__select").html(selectVal);
			}else{
				$this.parents(".box__option-content").find(".box__select .text__select span").each(function(q){
					if($(this).text() == $this.next(".form__label").text()){
						$(this).remove();
					}
				});
				selectVal = $this.parents(".box__option-content").find(".box__select .text__select").html();
				$this.parents(".box__option-content").find(".box__select .text__select").html(selectVal);
			}
        });
    },
    mapResize : function(){
        var $mapFrame = document.querySelector(".box__map-frame");
        if($mapFrame != null){
            window.addEventListener("load", function(e){
                if(this.innerWidth >= 1024){
                    $mapFrame.classList.remove("box__map-frame--small");   
                }else{
                    $mapFrame.classList.add("box__map-frame--small");   
                }
            });

            window.addEventListener("resize", function(e){
                if(this.innerWidth >= 1024){
                    $mapFrame.classList.remove("box__map-frame--small");   
                }else{
                    $mapFrame.classList.add("box__map-frame--small");   
                }
            });
        }
    },
    mapTouchEvent : function(){
        var startY, moveY;  
        window.addEventListener("touchstart", function(e){
            if(e.target.closest(".box__map-bottom .section__map-result")){
                startY = e.changedTouches[0].clientY;
            }
        });

        window.addEventListener("touchmove", function(e){
            if(e.target.closest(".box__map-bottom .section__map-result")){
                moveY = startY - e.changedTouches[0].clientY;
            }
        });

        window.addEventListener("touchend", function(e){
            if(e.target.closest(".box__map-bottom .box__button-more") && this.window.innerWidth < 1024){
                if(moveY<0){
                    document.querySelector(".box__map-frame").classList.remove("box__map-frame--full");
                    document.querySelector(".box__map-frame").classList.add("box__map-frame--small");
                }else if(moveY > 0){
                    document.querySelector(".box__map-frame").classList.remove("box__map-frame--small");
                    document.querySelector(".box__map-frame").classList.add("box__map-frame--full");
                }
            }
        });

        window.addEventListener("click", function(e){
            if(e.target.closest(".section__map-result .button__more")){
                if(document.querySelector(".box__map-frame").classList.contains("box__map-frame--full")){
                    document.querySelector(".box__map-frame").classList.remove("box__map-frame--full");
                    document.querySelector(".box__map-frame").classList.add("box__map-frame--small");
                }else{
                    document.querySelector(".box__map-frame").classList.remove("box__map-frame--small");
                    document.querySelector(".box__map-frame").classList.add("box__map-frame--full");
                }
            }
        });
    },
    mapMarkerControl : function(){
        // 지도 마커 클릭 이벤트
        var $marker = document.querySelectorAll(".button__map-marker");
        $marker.forEach(function(target){
            target.addEventListener("click", function(){
                $marker.forEach(function(item){
                    item.classList.remove("button__map-marker--active");
                    if(item.nextElementSibling){
                        item.nextElementSibling.classList.remove("box__place-button--active");
                    }
                });
                target.classList.add("button__map-marker--active");
                if(window.innerWidth < 1024){
                    document.querySelector(".box__map-bottom").classList.remove("box__map-frame--small");
                    document.querySelector(".box__map-bottom").classList.remove("box__map-frame--full");
                }

                var $placeButton = target.nextElementSibling;
                if($placeButton){
                    if(!$placeButton.classList.contains("box__place-button--active")){
                        $placeButton.classList.add("box__place-button--active");
                    }else{  
                        $placeButton.classList.remove("box__place-button--active");
                    }
                }
            })
        });
        
        // 지도 자동차 클릭 이벤트
        window.addEventListener("click", function(e){
            if(e.target.closest(".button__map-marker-car")){
                if(window.innerWidth < 1024){
                    document.querySelector(".box__map-bottom").classList.add("box__map-frame--small");
                }
                var $layerCarDetail = document.querySelector(".box__rentcar-detail");
                $layerCarDetail.style.display = "block";
            }
            
            if(e.target.closest(".box__rentcar-detail .button__close")){
                var $layerCarDetail = document.querySelector(".box__rentcar-detail");
                $layerCarDetail.style.display = "none";
            }
        });
    },
    catalogPosition : function(){
        var layerContent = document.querySelector('.box__layer-srp-catalog .box__layer-content');

        layerContent.addEventListener('scroll', function() {
            var scrollSpot = this.scrollTop;
            var catalogTop = this.querySelector('.box__catalog-top');
            
            if (scrollSpot > 0) {
                catalogTop.classList.add('js-fixed');
            } else if (scrollSpot === 0) {
                catalogTop.classList.remove('js-fixed');
            }
        });
    }
};
$(function() {
    RENTERCARSRPUI.init();
});