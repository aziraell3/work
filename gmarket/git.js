$(document).ready(function(){
	$('select:not([name=envyzteam-data])').select2();
	$('.js-copy-temp').on('click', function(){
		var myTextarea = $(this).siblings('._code');
		window.navigator.clipboard.writeText(myTextarea.val()).then(() => {
			console.log("복사완료");
			myTextarea.select();
		});
	});
	if (!$('#header').length) {
		$('#container').addClass('single-container');
	}

	var now = new Date();	// 현재 날짜 및 시간
	var year = now.getFullYear();	// 연도
	var month = now.getMonth();	// 월
	$('#env-year').val(year).prop('selected', true);
	$('#env-month').val(month).prop('selected', true);
	loadData();

	var $copy = "";
	$copy += " <button class=\"btn btn-sm btn-primary copy-url\"></button>";

	var $device = $('input[name=device]');
	var $selectionDomain = $('input[name=domain]');
	var isMulti = false;
	$selectionDomain.on('change', function( e ) {
		isMulti = $( e.target ).val() == "gmkt" || $( e.target ).val() == "iac";
		if( !isMulti ) {
			$device.each( function( idx, item ) {
				//$(item).prop("checked", false );
				$(item).attr("disabled", "disabled");
			});
		} else {
			$device.each( function( idx, item ) {
				//$('input[value=pc]').prop("checked", true );
				$(item).removeAttr("disabled");
			});
		}
	});
	$(".js-button").on("click", function(e) {
		e.preventDefault();
		var $this = $(this).parents(".box__form").next("pre"),
			$jira = frm1.branch_no.value,
			$jiraSplit = $jira.split('/'),
			$jiraFilter = $jiraSplit[1].split('-'),
			$jiraNumber = $jiraFilter[0]+"-"+$jiraFilter[1],
			$repoUrl = 'http://github.ebaykorea.com/org-publisher/Publish',
			$server = $("input:radio[name=sever]:checked").val(),
			$domain = $("input:radio[name=domain]:checked").val(),
			$device = $("input:radio[name=device]:checked").val();

		if ($(this).hasClass("type_trigger") == true) {
			if ($server === 'mockup') {
				$('.select-domain').parent().removeClass('select-dev select-master').addClass('select-mockup').find('.text__domain').text($domain)
			} else if ($server === 'dev') {
				$('.select-domain').parent().removeClass('select-mockup select-master').addClass('select-dev').find('.text__domain').text($domain)
			} else if ($server === 'master' || $server === 'main') {
				$('.select-domain').parent().removeClass('select-dev select-mockup').addClass('select-master').find('.text__domain').text($domain)
			}

			if (frm1.branch_no.value == "") {
				//alert("Branch Name 값을 입력하세요.");
				$("input[name=branch_no]").focus();
			} else {
				if ($server == 'master') {
					alert('🚨 MASTER 브랜치 입니다. 🚨');
				}
				$("#contents .box__item pre a:not('#DiffUrl a')").removeClass("link__desabled");
				$("#contents .box__item pre a:not('#DiffUrl a')").removeAttr("onclick");
				$("#jiraNo a").html("https://jira.ebaykorea.com/browse/"+$jiraNumber);
				$("#jiraNo a").attr("href", "https://jira.ebaykorea.com/browse/"+$jiraNumber);
				$("#comparingUrl a").html($repoUrl+'.'+$domain+".pc/compare/cf2deae...a4718f5");
				$("#comparingUrl a").attr("href", $repoUrl+'.'+$domain+".pc/compare/cf2deae...a4718f5");
				//http://github.ebaykorea.com/org-publisher/Publish.GMKT.PC/compare/cf2deae...a4718f5
				if ($domain == "ebay" || $domain == "hanbando") {
					$("#MergeUrl .request-url").eq(0).find("a").html($repoUrl+'.'+$domain+"/compare/"+$server+"..."+frm1.branch_no.value+"?expand=1");
					$("#MergeUrl .request-url").eq(0).find("a").attr("href", $repoUrl+'.'+$domain+"/compare/"+$server+"..."+frm1.branch_no.value+"?expand=1");
					$("#MergeUrl .request-url").eq(1).find("a").html("");
					$("#MergeUrl .request-url").eq(1).find("a").attr("");
					$("#BranchUrl a").html($repoUrl+'.'+$domain+"/tree/"+frm1.branch_no.value);
					$("#BranchUrl a").attr("href", $repoUrl+'.'+$domain+"/tree/"+frm1.branch_no.value);
					$("#CompareUrl a").html($repoUrl+'.'+$domain+"/compare/"+frm1.branch_no.value);
					$("#CompareUrl a").attr("href", $repoUrl+'.'+$domain+"/compare/"+frm1.branch_no.value);
					$('#ShortUrl').val($repoUrl+'.'+$domain+'/commit/');
				} else if ($domain == "starro") {
					if ($server == 'master') {
						$server = 'main';
					}
					$("#MergeUrl .request-url").eq(0).find("a").html($repoUrl+'/'+$domain+"/compare/"+$server+"..."+frm1.branch_no.value+"?expand=1");
					$("#MergeUrl .request-url").eq(0).find("a").attr("href", $repoUrl+'/'+$domain+"/compare/"+$server+"..."+frm1.branch_no.value+"?expand=1");
					$("#MergeUrl .request-url").eq(1).find("a").html("");
					$("#MergeUrl .request-url").eq(1).find("a").attr("");
					$("#BranchUrl a").html($repoUrl+'/'+$domain+"/tree/"+frm1.branch_no.value);
					$("#BranchUrl a").attr("href", $repoUrl+'/'+$domain+"/tree/"+frm1.branch_no.value);
					$("#CompareUrl a").html($repoUrl+'/'+$domain+"/compare/"+frm1.branch_no.value);
					$("#CompareUrl a").attr("href", $repoUrl+'/'+$domain+"/compare/"+frm1.branch_no.value);
					$('#ShortUrl').val($repoUrl+'.'+$domain+'/commit/');
				}else {
					$("#MergeUrl .request-url").eq(0).find("a").html($repoUrl+'.'+$domain+".pc/compare/"+$server+"..."+frm1.branch_no.value+"?expand=1");
					$("#MergeUrl .request-url").eq(0).find("a").attr("href", $repoUrl+'.'+$domain+".pc/compare/"+$server+"..."+frm1.branch_no.value+"?expand=1");
					$("#MergeUrl .request-url").eq(1).find("a").html($repoUrl+'.'+$domain+".mobile/compare/"+$server+"..."+frm1.branch_no.value+"?expand=1");
					$("#MergeUrl .request-url").eq(1).find("a").attr("href", $repoUrl+'.'+$domain+".mobile/compare/"+$server+"..."+frm1.branch_no.value+"?expand=1");
					//$('#ShortUrl').val('http://github.ebaykorea.com/org-publisher/Publish.Ebay/commit/');
					
					$("#BranchUrl a").html($repoUrl+'.'+$domain+"."+$device+"/tree/"+frm1.branch_no.value);
					$("#BranchUrl a").attr("href", $repoUrl+'.'+$domain+"."+$device+"/tree/"+frm1.branch_no.value);
					$("#CompareUrl a").html($repoUrl+'.'+$domain+"."+$device+"/compare/"+frm1.branch_no.value);
					$("#CompareUrl a").attr("href", $repoUrl+'.'+$domain+"."+$device+"/compare/"+frm1.branch_no.value);
					$('#ShortUrl').val($repoUrl+'.'+$domain+'.'+$device+'/commit/');
				}
			}
		} else if ($(this).hasClass("single_trigger") == true){
			if ($(this).prev().val() == "") {
				//alert($(this).prev().attr("placeholder")+" 값을 입력하세요.");
				$(this).prev().focus();
			} else {
				$this.find("a").removeClass("link__desabled");
				$this.find("a").removeAttr("onclick");
				if ($this.hasClass("DiffUrl") == true) {
					console.log('DiffUrl');
					if ($domain == "ebay" || $domain == "hanbando") {
						$this.find("a").html($repoUrl+'.'+$domain+"/commit/"+frm2.DiffUrl.value);
						$this.find(".hide_input").val($repoUrl+'.'+$domain+"/commit/"+frm2.DiffUrl.value);
						$this.find("a").attr("href", $repoUrl+'.'+$domain+"/commit/"+frm2.DiffUrl.value);
					} else {
						$this.find("a").html($repoUrl+'.'+$domain+"."+$device+"/commit/"+frm2.DiffUrl.value);
						$this.find(".hide_input").val($repoUrl+'.'+$domain+"."+$device+"/commit/"+frm2.DiffUrl.value);
						$this.find("a").attr("href", $repoUrl+'.'+$domain+"."+$device+"/commit/"+frm2.DiffUrl.value);
					}
					$this.next().remove("button");
					$this.after($copy);
					$(".copy-url").html("Click to copy");
					copyUlr();
				} else if ($(this).hasClass("UsernameKo") == true) {
					console.log('UsernameKo');
					window.open("https://jira.ebaykorea.com/issues/?jql=assignee%20in%20("+frm3.UsernameKo.value+")", "_blank"); 
				} else if ($(this).hasClass("UserId") == true) {
					console.log('UserId');
					window.open("http://ebase.gmarket.com/my/pages/Person.aspx?accountname=gmarket\\"+frm3.Username.value, "_blank"); 
				} else if ($(this).hasClass("ShortUrl") == true) {
					console.log('ShortUrl');
					window.open("http://is.gd/create.php?format=simple&url="+frm3.ShortUrl.value, "_blank"); 
				} else if ($(this).hasClass("comparingUrls") == true) {
					console.log('comparingUrl');
					console.log($domain);
					console.log($('#comparingType').val());
					console.log($('#comparingStart').val());
					console.log($('#comparingEnd').val());
				}
			}
		}
	})
	$('._check, ._check2').on('click', function(){
		$(this).toggleClass('active')
	})
})

function loadData(){
	var $user = $('#env-user').find('option:selected').val();
	var $year = $('#env-year').find('option:selected').val();
	var $month = $('#env-month').find('option:selected').val();
	var $button = $('#env-button');
	var $url = ($user == 'envyzteam') 
		? 'https://jira.ebaykorea.com/issues/?filter=35561&jql=issuetype%20in%20(BC%2C%20DR%2C%20Sub-Task%2C%20Task)%20AND%20labels%20in%20(od-envyz)%20AND%20labels%20in%20('+$year+$month+')%20ORDER%20BY%20assignee%20DESC%2C%20Key%20ASC' 
		: 'https://jira.ebaykorea.com/issues/?filter=35561&jql=issuetype%20in%20(BC%2C%20DR%2C%20Sub-Task%2C%20Task)%20AND%20labels%20in%20(od-envyz)%20AND%20labels%20in%20('+$year+$month+')%20AND%20assignee%20in%20('+$user+')%20ORDER%20BY%20labels%20ASC%2C%20Key%20DESC'
	$button.attr('href', $url).text($('#env-user').find('option:selected').text() +' '+ $year + $month)
}
$('[name=envyzteam-data]').change(function(){
	loadData();
})
function copyUlr() {
	$(".copy-url").on("click", function(str) {
		$(this).prev().find(".hide_input").select(); 
		try { 
			var successful = document.execCommand('copy');  
			//alert('클립보드에 주소가 복사되었습니다. Ctrl + V 로 붙여넣기 하세요.'); 
		} catch (err) { 
			alert('이 브라우저는 지원하지 않습니다.'); 
		}
	})
}
function noSpaceForm(obj) { // 공백사용못하게
	var str_space = /\s/;  // 공백체크
	if(str_space.exec(obj.value)) { //공백 체크
		//alert("해당 항목에는 공백을 사용할수 없습니다.\n\n공백은 자동적으로 제거 됩니다.");
		obj.focus();
		obj.value = obj.value.replace(/\s| /gi,''); // 공백제거
		return false;
	}
}
$('#selectName').change(function() {
	var $name = $(this).find('option:selected').text();
	var $id = $(this).find('option:selected').val();

	$('#UsernameKoTitle').val($name);
	$('#Userid').val($id);
})

function rate() { 
	var a = parseFloat($('.aa').val()), 
		b = parseFloat($('.bb').val()),
		c = parseFloat($('.cc').val()),
		d = parseFloat($('.dd').val()); 
	if (isEmpty(a)) { 
		$('.aa').val((b*c)/d)
	} else if (isEmpty(b)) { 
		$('.bb').val((a*d)/c)
	} else if (isEmpty(c)) { 
		$('.cc').val((a*d)/b)
	} else if (isEmpty(d)) { 
		$('.dd').val((b*c)/a)
	} else {
		//alert('셀 하난 비워야지...?');
		$('.dd').val((b*c)/a)
	}
} 
function isEmpty(str) { 
	//console.log('isEmpty');
	return (!str || 0 === str.length); 
}
//$('.dd').val((b*c)/a)
$('.swt').click(function(){
	var a = parseFloat($('.aa').val()), 
		b = parseFloat($('.bb').val()),
		c = parseFloat($('.cc').val()),
		d = parseFloat($('.dd').val()); 
	$('.aa').val(b);
	$('.bb').val(a);
})
