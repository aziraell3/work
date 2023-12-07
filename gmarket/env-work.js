$(document).ready(function(){
	$('.js-copy-temp').on('click', function(){
		var myTextarea = $(this).siblings('._code');
		window.navigator.clipboard.writeText(myTextarea.val()).then(() => {
			console.log('복사완료');
			myTextarea.select();
		});
	});
	$('textarea').on('click', function(){
		$(this).select();
	})
	if (!$('#header').length) {
		$('#container').addClass('single-container');
	}
	var $device = $('input[name=device]');
	var $selectionDomain = $('input[name=domain]');
	var isMulti = false;
	$selectionDomain.on('change', function( e ) {
		isMulti = $( e.target ).val() == 'gmkt' || $( e.target ).val() == 'iac';
		if( !isMulti ) {
			$device.each( function( idx, item ) {
				//$(item).prop('checked', false );
				$(item).attr('disabled', 'disabled');
			});
		} else {
			$device.each( function( idx, item ) {
				//$('input[value=pc]').prop('checked', true );
				$(item).removeAttr('disabled');
			});
		}
	});
	$('.js-button').on('click', function(e) {
		e.preventDefault();
		var $this = $(this).parents('.box__form').next('pre');
		var $jira = frm1.branch_no.value;
		if ($jira !== '') {
			var $jiraSplit = $jira.split('/');
			var $jiraFilter = $jiraSplit[1].split('-');
			var $jiraNumber = $jiraFilter[0]+'-'+$jiraFilter[1];
		}
		var $repoUrl = 'http://github.ebaykorea.com/org-publisher/Publish';
		var $server = $('input:radio[name=sever]:checked').val();
		var $domain = $('input:radio[name=domain]:checked').val();
		var $device = $('input:radio[name=device]:checked').val();

		if ($(this).hasClass('type_trigger') == true) {
			if ($server === 'mockup') {
				$('.select-domain').parent().removeClass('select-dev select-master').addClass('select-mockup').find('.text__domain').text($domain)
			} else if ($server === 'dev') {
				$('.select-domain').parent().removeClass('select-mockup select-master').addClass('select-dev').find('.text__domain').text($domain)
			} else if ($server === 'master' || $server === 'main') {
				$('.select-domain').parent().removeClass('select-dev select-mockup').addClass('select-master').find('.text__domain').text($domain)
			}
			if (frm1.branch_no.value == '') {
				alert('Branch Name 값을 입력하세요.');
				$('input[name=branch_no]').focus();
			} else {
				if ($server == 'master') {
					alert('🚨 MASTER 브랜치 입니다. \n주의하세요. 🚨');
				}
				$('#contents .box__item pre a:not(#DiffUrl a)').removeClass('link__desabled');
				$('#contents .box__item pre a:not(#DiffUrl a)').removeAttr('onclick');
				$('#jiraNo a').html('https://jira.ebaykorea.com/browse/'+$jiraNumber);
				$('#jiraNo a').attr('href', 'https://jira.ebaykorea.com/browse/'+$jiraNumber);
				$('#comparingUrl span').eq(0).show().html($repoUrl+'.'+$domain+'.pc/compare/aaa...bbb');
				$('#comparingUrl span').eq(1).show().html($repoUrl+'.'+$domain+'.mobile/compare/aaa...bbb');
				if ($domain == 'ebay' || $domain == 'hanbando') {
					$('#MergeUrl .request-url').eq(0).find('a').html($repoUrl+'.'+$domain+'/compare/'+$server+'...'+frm1.branch_no.value+'?expand=1');
					$('#MergeUrl .request-url').eq(0).find('a').attr('href', $repoUrl+'.'+$domain+'/compare/'+$server+'...'+frm1.branch_no.value+'?expand=1');
					$('#MergeUrl .request-url').eq(1).find('a').html('');
					$('#MergeUrl .request-url').eq(1).find('a').attr('');
					$('#comparingUrl span').eq(0).show().html($repoUrl+'.'+$domain+'/compare/aaa...bbb');
					$('#comparingUrl span').eq(1).hide();
				} else if ($domain == 'starro') {
					if ($server == 'master') {
						$server = 'main';
					}
					$('#MergeUrl .request-url').eq(0).find('a').html($repoUrl+'/'+$domain+'/compare/'+$server+'...'+frm1.branch_no.value+'?expand=1');
					$('#MergeUrl .request-url').eq(0).find('a').attr('href', $repoUrl+'/'+$domain+'/compare/'+$server+'...'+frm1.branch_no.value+'?expand=1');
					$('#MergeUrl .request-url').eq(1).find('a').html('');
					$('#MergeUrl .request-url').eq(1).find('a').attr('');
					$('#CompareUrl a').html($repoUrl+'/'+$domain+'/compare/'+frm1.branch_no.value);
					$('#CompareUrl a').attr('href', $repoUrl+'/'+$domain+'/compare/'+frm1.branch_no.value);
				}else {
					$('#MergeUrl .request-url').eq(0).find('a').html($repoUrl+'.'+$domain+'.pc/compare/'+$server+'...'+frm1.branch_no.value+'?expand=1');
					$('#MergeUrl .request-url').eq(0).find('a').attr('href', $repoUrl+'.'+$domain+'.pc/compare/'+$server+'...'+frm1.branch_no.value+'?expand=1');
					$('#MergeUrl .request-url').eq(1).find('a').html($repoUrl+'.'+$domain+'.mobile/compare/'+$server+'...'+frm1.branch_no.value+'?expand=1');
					$('#MergeUrl .request-url').eq(1).find('a').attr('href', $repoUrl+'.'+$domain+'.mobile/compare/'+$server+'...'+frm1.branch_no.value+'?expand=1');
					$('#CompareUrl a').html($repoUrl+'.'+$domain+'.'+$device+'/compare/'+frm1.branch_no.value);
					$('#CompareUrl a').attr('href', $repoUrl+'.'+$domain+'.'+$device+'/compare/'+frm1.branch_no.value);
				}
			}
		} else if ($(this).hasClass('single_trigger') == true){
			if ($(this).prev().val() == '') {
				//alert($(this).prev().attr('placeholder')+' 값을 입력하세요.');
				$(this).prev().focus();
			} else {
				$this.find('a').removeClass('link__desabled');
				$this.find('a').removeAttr('onclick');
				if ($this.hasClass('DiffUrl') == true) {
					console.log('DiffUrl');
					if ($domain == 'ebay' || $domain == 'hanbando') {
						$this.find('a').html($repoUrl+'.'+$domain+'/commit/'+frm2.DiffUrl.value);
						$this.find('.hide_input').val($repoUrl+'.'+$domain+'/commit/'+frm2.DiffUrl.value);
						$this.find('a').attr('href', $repoUrl+'.'+$domain+'/commit/'+frm2.DiffUrl.value);
					} else {
						$this.find('a').html($repoUrl+'.'+$domain+'.'+$device+'/commit/'+frm2.DiffUrl.value);
						$this.find('.hide_input').val($repoUrl+'.'+$domain+'.'+$device+'/commit/'+frm2.DiffUrl.value);
						$this.find('a').attr('href', $repoUrl+'.'+$domain+'.'+$device+'/commit/'+frm2.DiffUrl.value);
					}
					$this.next().remove('button');
					$this.after($copy);
					$('.copy-url').html('Click to copy');
					copyUlr();
				} else if ($(this).hasClass('UsernameKo') == true) {
					console.log('UsernameKo');
					window.open('https://jira.ebaykorea.com/issues/?jql=assignee%20in%20('+frm3.UsernameKo.value+')', '_blank'); 
				} else if ($(this).hasClass('UserId') == true) {
					console.log('UserId');
					window.open('http://ebase.gmarket.com/my/pages/Person.aspx?accountname=gmarket\\'+frm3.Username.value, '_blank'); 
				} else if ($(this).hasClass('ShortUrl') == true) {
					console.log('ShortUrl');
					window.open('http://is.gd/create.php?format=simple&url='+frm3.ShortUrl.value, '_blank'); 
				} else if ($(this).hasClass('comparingUrls') == true) {
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

function noSpaceForm(obj) { // 공백사용못하게
	var str_space = /\s/;  // 공백체크
	if(str_space.exec(obj.value)) { //공백 체크
		//alert('해당 항목에는 공백을 사용할수 없습니다.\n\n공백은 자동적으로 제거 됩니다.');
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

function isEmpty(str) { 
	//console.log('isEmpty');
	return (!str || 0 === str.length); 
}
