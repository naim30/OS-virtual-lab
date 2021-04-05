// var remRow = document.getElementById("AddRow");
var size = 0;

function removeRow() {
	if (size > -1) {
		document.getElementById("myTable").deleteRow(size + 1);
		size--;
	}
}
var width = 165;
function addRow() {
	size++;
	let name = "p" + size;
	width += 90;
	document.getElementById("printProcess").style.width = `${width}px`;

	document.getElementById("myTable").innerHTML += `
                    <tr id=${name}>
						<td>${name}</td>
						<td><input value="2" /></td>
						<td><input value="0" /></td>
						<td><input value="0" /></td>
						<td><input value="3" /></td>
						<td><input value="2" /></td>
						<td><input value="2" /></td>
						<td><input value="" /></td>
						<td><input value="" /></td>
						<td><input value="" /></td>
					</tr>`;
}

function submitValue() {
	// $("section").remove();
	var printProcess = document.getElementById("printProcess");

	document.getElementById("printProcess").innerHTML = "";
	var myTab = document.getElementById("myTable").rows;

	let alloc = [];
	// take values of alloc
	for (let i = 1; i < myTab.length; i++) {
		let myrow = myTab[i];
		let tempList = [];
		for (let j = 1; j <= 3; j++) {
			let mytd = myrow.cells[j];
			let currValue = mytd.children[0].value;
			tempList.push(currValue);
		}
		alloc.push(tempList);
	}

	let max = [];
	// take values of max.
	for (let i = 1; i < myTab.length; i++) {
		let myrow = myTab[i];
		let tempList = [];
		for (let j = 4; j <= 6; j++) {
			let mytd = myrow.cells[j];
			let currValue = mytd.children[0].value;
			tempList.push(currValue);
		}
		max.push(tempList);
	}

	n = size + 1;
	m = 3;
	let f = [];
	for (i = 0; i < n; i++) f[i] = 0;
	let ans = [];
	for (i = 0; i < n; i++) ans[i] = -1;
	let ind = 0;

	// fill the need array.
	let need = [];
	for (i = 0; i < n; i++) {
		need[i] = [];
		for (j = 0; j < m; j++) {
			need[i][j] = max[i][j] - alloc[i][j];
		}
	}

	// fill the avail array
	let avail = [
		myTab[1].cells[7].children[0].value,
		myTab[1].cells[8].children[0].value,
		myTab[1].cells[9].children[0].value,
	];

	let y = 0;

	for (k = 0; k < n; k++) {
		for (i = 0; i < n; i++) {
			if (f[i] == 0) {
				let flag = false;
				for (j = 0; j < m; j++) {
					if (need[i][j] > avail[j]) {
						flag = true;

						break;
					}
				}

				if (flag == false) {
					ans[ind++] = i;
					for (y = 0; y < m; y++) avail[y] += alloc[i][y];
					f[i] = 1;
				}
			}
		}
	}

	function addElement(parentId, elementTag) {
		// Adds an element to the document
		var p = document.createElement(parentId);
		var newElement = document.createTextNode(elementTag);
		//newElement.setAttribute('id', elementId);
		//newElement.innerHTML = html;
		p.appendChild(newElement);
		document.body.appendChild(p);
	}

	// for (i = 0; i < n; i++) console.log(ans[i]);
	// var mastList = [];
	// var mastString = "";
	console.log("Following is the SAFE Sequence");
	printProcess.innerHTML = "";
	for (i = 0; i < n; i++) {
		if (ans[i] >= 0) {
			// addElement("section", "P" + ans[i]);
			printProcess.innerHTML += "P" + ans[i] + " ";
		} else {
			// addElement("section", "deadlock");
			printProcess.innerHTML += "deadlock";
			break;
		}
	}
}
