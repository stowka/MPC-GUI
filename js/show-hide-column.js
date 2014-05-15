function columnHider(tableId, panelId, options) {
	var i = 0;
	if (options.amount === 'all') {
		$('#'+panelId).append('<ul>');
		$('table#'+tableId+'>thead>tr>th').each(function(i, t){
			$('#'+panelId).append('<li class="on">'+t.innerHTML+'</li>');
			console.log(i++);
		});
		$('#'+panelId).append('</ul>');
	}
}

function showColumn() {

}

function hideColumn() {

}