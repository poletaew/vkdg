/**
 *
 * The Daily Gifts parse from VK
 * skifin = 53773684
 *
 * @author Michael Poletaew <michael@poletaew.de>
 */

var monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
	"июля", "августа", "сентября", "октября", "ноября", "декабря"
];

var groupList = [
	"22darom",
	"3rozygrysha",
	"3tolyatti",
	"4erfreee",
	"4itafree",
	"4lyabafree",
	"all_free_kazan",
	"arkhangelskfree",
	"barnaulfree",
	"belfree",
	"belgorodfreecheese",
	"bes_chel",
	"bes_ekat",
	"bes_kaz",
	"besplat_saratov",
	"besplatnaipossia",
	"besplatnayaufasiti",
	"besplatnayavologda",
	"besplatno.zarepost",
	"besplatno_ni_no",
	"besplatno_rus",
	"besplatnostu",
	"besplatnosty",
	"besplatny",
	"besplatny_igm",
	"besplatnykz",
	"besplcrimea",
	"besplekaterinburg",
	"besplfreecheese",
	"besplizhevsk",
	"besplkaliningrad",
	"besplkazan",
	"besplkrasnodar",
	"besplmoskow",
	"besplpiter",
	"besplrostov",
	"besplrus",
	"bkonkurs",
	"clothesaliexpress",
	"crimea_freemoney",
	"eburgnomoney",
	"fastprizee",
	"free0rub",
	"free_allrussia",
	"free_almatu",
	"free_arh",
	"free_cheboksary",
	"free_chita",
	"free_kursk",
	"free_nnovgorod",
	"free_okt",
	"free_oren",
	"free_original",
	"free_penza",
	"free_rostov1st",
	"free_russia2015",
	"free_russia_free",
	"free_spburg",
	"free_tomsk",
	"free_ulnvsk",
	"free_voro",
	"free_worldd",
	"free_xalava",
	"freecitybest",
	"freedimitrovgrad",
	"freeeufa",
	"freeforrepost",
	"freeizhevsk1",
	"freekazan",
	"freekazan16",
	"freekzn16",
	"freeprm",
	"freerostov1",
	"gadgetsrepost",
	"halyava_nsk54",
	"hochu.podarok",
	"igromania",
	"ilovepriz",
	"interesnye_shtyki",
	"irkutskfreee",
	"iwant2win",
	"iwonit",
	"iwonit_sam",
	"izhevskfree",
	"kaliningradfree",
	"khabarovskfree",
	"khalyavavufe",
	"khfree",
	"kirovfree",
	"kostromanomoney",
	"krasnodarfree",
	"krasnoyarskfree",
	"moscow0free",
	"moscow_0",
	"moscownomoney",
	"nanomebel",
	"nchelnyfree",
	"ninofree",
	"notforsalerussia",
	"notforsalespb",
	"novokuznetskfree",
	"novosibnomoney",
	"o_burg",
	"omsknomoney",
	"orelnomoney",
	"orenburgfree",
	"otdam_bes_platno",
	"penza_0rub",
	"piterfreegifts",
	"piternomoney",
	"pobezhdaytlt",
	"podarki_besplatnooo",
	"podarok_like",
	"priz152",
	"priz21",
	"prizarium_rf",
	"prizberry",
	"prizevk",
	"regionpriz",
	"repostyn",
	"rossia_free",
	"rostovfree",
	"rostovfree1",
	"rpz_1",
	"ru.for.free",
	"rusbesplatny",
	"russia0p",
	"russia_0rub",
	"russiaafree",
	"ryazanfree",
	"sale_v_pitere",
	"samaranomoney",
	"samfree",
	"saransk_free",
	"saratovfree",
	"shchedryechelny",
	"shtuks",
	"skidki111",
	"spburgfree",
	"stav_halyava",
	"surgutfree",
	"surguthalyava",
	"tltfree",
	"togliatti_free",
	"tolatti_free",
	"tolyattynomoney",
	"tulanomoney",
	"tumenfree",
	"tytxalava",
	"ufaafree",
	"ukrbesplatny",
	"ulyanovskfree",
	"vladinirnomoney",
	"vladivostokfree",
	"vlg_free",
	"volgogradfree",
	"vologdafree",
	"vologdafreee",
	"voronezhfreecheese",
	"vrnfree",
	"what_to_buy",
	"will_be_winner",
	"yaroslavl_free",
	"yaroslavlfree",
	"yfaafree",
	"yfafree",
	"yfafreecheese",
	"yfafreeee",
	"zaberiprizi",
	"zarepost_by",
	"zarepost_ru",
	"zarepostsu"
];

function updateGroupList(myGroups) {
	for (var i in myGroups) {
		var item = myGroups[i];

		if ($.inArray(item.screen_name, groupList) == -1 && !item.deactivated) {
			if (!window.newGroups) window.newGroups = [];
			item.link = 'http://vk.com/' + item.screen_name;
			console.log(item);
			window.newGroups.push(item.screen_name);


			$('body').text(JSON.stringify($.unique($.merge(window.newGroups, groupList)).sort()));
		}
	}
}

$(document).ready(function(){

	$('#find').click(function(){
		$(this).attr('disabled',true);
		$('#result').html('');

		$('#loader').show();
		$('#result-count').hide();

		var post,
			today = new Date(),
			dayNum = today.getDate(),
			monthPos = parseInt(today.getMonth()) + 1,
			monthNum = (monthPos > 9) ? monthPos : ('0' + monthPos),
			dateVariants = [
				dayNum + ' ' + monthNames[monthPos - 1],
				dayNum + '\\.' + monthNum,
				dayNum + '\\-' + monthNum,
				dayNum + '\\/' + monthNum
			];

		window.counter = 1;
		window.added = [];
		for (var i in groupList) {
			for (var j in dateVariants) {
				wallSearch(i * j, groupList[i], dateVariants[j], function (domain, data) {
					// формируем список групп с ошибками
					// if (data.error) {
					// 	 if (!window.badGroup) window.badGroup = [];
					// 	 window.badGroup.push(domain);
					//
					// 	 console.warn('Bad groups: ', window.badGroup);
					// 	 console.info('Good groups: ', $(groupList).not(window.badGroup).get());
					// 	 $('body').text(JSON.stringify($(groupList).not(window.badGroup).get()));
					// }
					if (data.response) {
//					console.log(domain + ':', + data.response.length);
						for (var j in data.response) {
							if (j > 0) {
								post = data.response[j];
								makePost(post, domain, dateVariants);
							}
						}
					}

					if (domain === groupList[groupList.length - 1]) {
						$('#find').attr('disabled',false);
						$('#loader').hide();
					}
				});
			}
		}

	});

	function makePost(post, domain, dateVariants) {
		try {
			var photo = post.attachment.photo.src_big;
		} catch(e) {
//			console.log('no photo in post', post);
		}

		if (photo === undefined) return;
		else {
			//хотя бы одно совпадение из списка
			var hasString = false;

			for (var i in dateVariants) {
				var date = dateVariants[i],
					search = '([^1-3]+' + date.substr(0,5) + '|^' +  date.substr(0,5) + ')';

				if (post.text.search(search) !== -1) hasString = true;
			}

			if (!hasString) return;
		}

//		console.log('#',window.counter,post);

		var vkLink = isMobile() ? 'https://m.vk.com/wall' : 'https://vk.com/' + domain + '?w=wall',
			uri = (post.copy_owner_id || post.from_id)  + '_' + (post.copy_post_id || post.id),
			originalUri = post.from_id + '_' + post.id,
			postDate = new Date(post.date * 1000);

		if (
			((new Date()).getTime() - postDate.getTime()) < 24*60*60*1000*90 // 90 если пост старше 90 дней
			&& $.inArray(uri, window.added) === -1
		) {
			var html = '<div class="col-sm-3 text-left">'
				+ '<h2>Приз #' + window.counter + '</h2>'
				+ '<p><img class="img-responsive" src="' + photo + '"></p>'
				+ '<p class="gray">(' + postDate.getDate() + '.'
				+ (postDate.getMonth()+1) + '.' + (postDate.getYear()+1900) + ')</p>'
				+ '<p class="gift-content">' + prepareText(post.text) + '</p>'
				+ '<a onclick="$(this).parent().css(\'opacity\', \'0.3\')" href="' + vkLink + uri + '" target="blank">\n\
					<span class="glyphicon glyphicon-gift"></span> Открыть\n\
				</a>'
				+ ((originalUri !== uri ) ? '&#160; <small><a class="gray" href="' + vkLink + originalUri + '" target="blank">\n\
						(Оригинал)\n\
						</a></small>'
					: '')
				+ '</div>';

			if (window.counter % 4 === 0) html += '<div class="clearfix"></div>';

			window.counter++;
			window.added.push(uri);
			$('#result').append(html);
			$('#result-count').show().removeClass('hide');
			$('#result-count').find('b').text(window.counter-1);
		}

	}

	function isMobile() {
		return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
	}

	function prepareText(str) {
		return str.replace(/\[([^|]+)\|([^\]]+)\]/g,'<b>$2</b>');
	}

	function wallSearch(position, groupId, query, callback){
		var apiVK = "https://api.vk.com/method/",
			limit = 100;
		setTimeout(function () {
			$.get(apiVK + "wall.search", {
					domain: groupId,
					query: query,
					count : limit

				},
				function( data ) {
					callback(groupId, data);
				},
				"jsonp"
			);
		}, position*5);
	}
});