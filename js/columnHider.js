/**
 *
 * @author Antoine De Gieter
 * @require jQuery library
 * @digest allow you toggle a column display in a table
 */

function addEvent(tableId) {
	$(".on").off();
	$(".off").off();
	$(".on").on('click', function(e) {
		var $this = $(e.currentTarget);
		$this.removeClass('on').addClass('off');
		hideColumn(tableId, e.currentTarget.innerText);
		addEvent(tableId);
	});
	$(".off").on('click', function(e) {
		var $this = $(e.currentTarget);
		$this.removeClass('off').addClass('on');
		showColumn(tableId, e.currentTarget.innerText);
		addEvent(tableId);
	});
}

/**
 * @param String: tableId 
 * 		DOM id of the table
 * @param String: panelId 
 *		DOM id of the control panel (show/hide columns)
 * @param Object: options
 * 		amount: 'all' / 'range' / 'indexes'
 *
 *		(range: [start, (end)]) - end is not included in the range
 * 		(index: [index_1, index_2, ...])
 *		
 *		(hide: 'range' / 'indexes')
 * 		(hidden: [start, (end)] / [index_1, index_2, ...])
 */
function columnHider(tableId, panelId, options) {
	var i = 0;
	var columnNames = [];

	$('table#'+tableId+'>thead>tr>th').each(function(key, value){
		columnNames[key] = value.innerHTML;
	});

	if (options.amount === 'range'
	&& typeof options.range !== 'undefined') {
		switch (options.range.length) {
			case 1:
				columnNames = columnNames.slice(options.range[0]);
				break;
			case 2:
				columnNames = columnNames.slice(options.range[0], 
					options.range[1]);
				break;
		}
	} else if (options.amount === 'indexes'
	&& typeof options.indexes !== 'undefined') {
		var tmp = [];
		for (var key in options.indexes) {
			if (typeof columnNames[options.indexes[key]] !== 'undefined') {
				tmp[key] = columnNames[options.indexes[key]];
			}
		}
		columnNames = tmp;
	} else if (options.amount !== 'all') {
		console.error('columnHider: wrong param options')
	}

	$('#'+panelId).append('<ul></ul>');
	for (var key in columnNames) {
		$('#'+panelId+'>ul').append('<li class="on">'+columnNames[key]+'</li>');
	}

	if (typeof options.hide !== 'undefined'
	&& Object.prototype.toString.call(options.hidden) === '[object Array]') {
		switch (options.hide) {
			case 'range':

				break;
			case 'indexes':
				var $n;
				for(var key in options.hidden) {
					$n = options.hidden[key] + 1;
					$('table#'+tableId+'>tbody tr td:nth-child('+$n+')').hide();
					$('table#'+tableId+'>thead>tr th:nth-child('+$n+')').hide();
					$('#'+panelId+'>ul li:nth-child('+($n - 1)+')')
						.removeClass('on').addClass('off');
				}
				break;
		}
	}

	addEvent(tableId);
}

function showColumn(tableId, columnName) {
	var $n = 0;
	$('table#'+tableId+'>thead>tr>th').each(function(key, value) {
		if (value.innerText === columnName)
			$n = $(value).index() + 1;
	});
	$('table#'+tableId+'>tbody tr td:nth-child('+$n+')').show();
	$('table#'+tableId+'>thead>tr th:nth-child('+$n+')').show();
	addEvent(tableId);
}

function hideColumn(tableId, columnName) {
	var $n = 0;
	$('table#'+tableId+'>thead>tr>th').each(function(key, value) {
		if (value.innerText === columnName)
			$n = $(value).index() + 1;
	});
	$('table#'+tableId+'>tbody tr td:nth-child('+$n+')').hide();
	$('table#'+tableId+'>thead>tr th:nth-child('+$n+')').hide();
	addEvent(tableId);
}