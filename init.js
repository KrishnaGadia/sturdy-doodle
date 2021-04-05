function myDownload() {
	var table = document.getElementById("Products");
	var tr = table.getElementsByTagName("tr");
	var tp = 0;
	var item = 0;
	var report = []
	report.push("** Bankey Bihari Toys **");
	report.push("-----------------------Items----------------------");
	// Loop through all table rows, and add qty more than 0
	for (i = 1; i < tr.length - 1; i++) {

		var row = tr[i].getElementsByTagName("td");
		var name = row[0].innerHTML;
		console.log(name);
		var price = parseInt(row[3].innerText, 10);
		var qty = parseInt(row[4].children[1].value, 10);

		if (qty > 0) {
			report.push(name + " Rs " + price + " * " + qty + " = Rs " + price * qty);
			tp = tp + (price * qty);
			item++;
			console.log(name + " Rs " + price + " * " + qty + " " + tp);
		}
	}
	report.push("-------------------------------------------------");

	report.push("Items : " + item);
	report.push("Amount Due : " + tp);

	console.log(report);

	download(Date().toString() + ".txt", report);
}
function download(filename, rows) {
	var element = document.createElement('a');
	var text = "";
	for (i = 0; i < rows.length; i++) {
		text = text + rows[i] + "\n";
	}
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function myFunction() {
	// Declare variables
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("input");
	filter = input.value.toUpperCase();
	table = document.getElementById("Products");
	tr = table.getElementsByTagName("tr");

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[0];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}
}

function decrement(id) {
	var value = parseInt(document.getElementById(id).value, 10);
	value--;
	var item = parseInt(document.getElementById("items").innerHTML, 10);
	var tprice = parseInt(document.getElementById("price").innerHTML, 10);
	var itemprice = parseInt(document.getElementById(id + "-price").innerHTML, 10);
	item = isNaN(item) ? 0 : item;
	if (value == 0)
		item--;
	if (value >= 0)
		tprice = tprice - itemprice;
	item = (item < 0) ? 0 : item;
	value = (value < 0) ? 0 : value;
	document.getElementById(id).value = value;
	document.getElementById("items").innerHTML = item;
	document.getElementById("price").innerHTML = tprice;

}
function onChangeQty(element) {
	var newqty = element.value;
	var oldqty = element.oldvalue;

	var item = parseInt(document.getElementById("items").innerHTML, 10);
	var tprice = parseInt(document.getElementById("price").innerHTML, 10);
	var itemprice = parseInt(document.getElementById(element.id + "-price").innerHTML, 10);
	if (newqty == 0) {
		if (oldqty > 0)
			item--;
	}
	if (oldqty == 0) {
		if (newqty > 0)
			item++;
	}
	tprice = tprice + (newqty - oldqty) * itemprice;
	document.getElementById("items").innerHTML = item;
	document.getElementById("price").innerHTML = tprice;

}


function increment(id) {
	var value = parseInt(document.getElementById(id).value, 10);
	var item = parseInt(document.getElementById("items").innerHTML, 10);
	var tprice = parseInt(document.getElementById("price").innerHTML, 10);
	var itemprice = parseInt(document.getElementById(id + "-price").innerHTML, 10);
	tprice = isNaN(tprice) ? 0 : tprice;
	value = isNaN(value) ? 0 : value;
	item = isNaN(item) ? 0 : item;
	if (value == 0)
		item++;
	value++;
	tprice = tprice + itemprice;
	document.getElementById(id).value = value;
	document.getElementById("items").innerHTML = item;
	document.getElementById("price").innerHTML = tprice;
}
function arrayToTable(tableData) {
	var table = $('<table id="Products"></table>');
	$(tableData).each(function(i, rowData) {
		var row = $('<tr></tr>');
		$(rowData).each(function(j, cellData) {
			if (i == 0) {
				row.append($('<th>' + cellData + '</th>'));
			} else {
				if (j == 4) {
					row.append($('<td><input type="button" value="-" onClick="decrement(' + i +
						')"><input type="text" inputmode="numeric" value="0" id="' + i +
						'" style="width: 1em" onfocus="this.oldvalue = this.value;" onchange="onChangeQty(this);this.oldvalue = this.value;"/>' +
						'<input type="button" value="+"onClick="increment(' + i + ')"></td>'));
				}
				else if (j == 3) {
					row.append($('<td><b id="' + i + '-price">' + cellData + '</b></td>'));
				} else {
					row.append($('<td>' + cellData + '</td>'));
				}
			}
		});
		table.append(row);
	});
	return table;
}
function init() {
	console.log("Called init");
	$.ajax({
		type: "GET",
		url: "ProductList.csv",
		success: function(data) {
			$('#Products').remove();
			$('body').append(arrayToTable(Papa.parse(data).data));
			document.getElementById("input").value = "";
			document.getElementById("input").value = "";
			document.getElementById("price").innerHTML = 0;
			document.getElementById("items").innerHTML = 0;
		}
	});
}
init();
