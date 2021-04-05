let n, m, i, j, k;
var $dudeoutput1 = $(".deadlockoutput_1");
n = 4; // no. of processes
m = 3; // types of resources.
let alloc = [];

// decalration can also be like:
// for (var i = 1; i <= mynumber; i++) {
// 	arr.push(i.toString());
// }

function onClickButton() {
	$("section").remove();

	var a11 = $(".Allocation11").val();
	var a12 = $(".Allocation12").val();
	var a13 = $(".Allocation13").val();
	var a21 = $(".Allocation21").val();
	var a22 = $(".Allocation22").val();
	var a23 = $(".Allocation23").val();
	var a31 = $(".Allocation31").val();
	var a32 = $(".Allocation32").val();
	var a33 = $(".Allocation33").val();
	var a41 = $(".Allocation41").val();
	var a42 = $(".Allocation42").val();
	var a43 = $(".Allocation43").val();

	var m11 = $(".Max11").val();
	var m12 = $(".Max12").val();
	var m13 = $(".Max13").val();
	var m21 = $(".Max21").val();
	var m22 = $(".Max22").val();
	var m23 = $(".Max23").val();
	var m31 = $(".Max31").val();
	var m32 = $(".Max32").val();
	var m33 = $(".Max33").val();
	var m41 = $(".Max41").val();
	var m42 = $(".Max42").val();
	var m43 = $(".Max43").val();

	var compVar = $(".lol");
	var avail11 = $(".Avail11").val();
	var avail12 = $(".Avail12").val();
	var avail13 = $(".Avail13").val();
	//

	alloc = [
		[a11, a12, a13],
		[a21, a22, a23],
		[a31, a32, a33],
		[a41, a42, a43],

		// [0, 1, 0],
		// [2, 0, 0],
		// // [3, 0, 2],
		// [2, 1, 1],
		// [0, 0, 2],
	];

	//console.log(alloc[0][0]);

	let max = [];
	// console.log(typeof max);

	max = [
		[m11, m12, m13],
		[m21, m22, m23],
		[m31, m32, m33],
		[m41, m42, m43],
		// [7, 5, 3], // P0 // MAX Matrix
		// [3, 2, 2], // P1
		// // [9, 0, 2], // P2
		// [2, 2, 2], // P3
		// [4, 3, 3],
	];

	let avail = [avail11, avail12, avail13];
	// console.log(typeof available);

	let need = [];
	// console.log(typeof need);
	// need.fill(0);

	let f = [];
	for (i = 0; i < n; i++) f[i] = 0;
	let ans = [];
	for (i = 0; i < n; i++) ans[i] = -1;
	let ind = 0;

	for (i = 0; i < n; i++) {
		need[i] = [];
		for (j = 0; j < m; j++) {
			need[i][j] = max[i][j] - alloc[i][j];
		}
	}

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
	var mastString = "";
	console.log("Following is the SAFE Sequence");
	for (i = 0; i < n; i++) {
		if (ans[i] >= 0) {
			addElement("section", "P" + ans[i]);
			//$dudeoutput1.append("<i>" + ans[i] + "</i>");
			console.log(` P${ans[i]} ->`);
			mastString += ` P${ans[i]} ->`;
			compVar.text(mastString);
		} else {
			addElement("section", "deadlock");
			//console.log("deadlock!");
			compVar.text("DEADLOCK");
			break;
		}
	}
	// console.log(` P${ans[n - 1]}`);
}

// $(".ClickOn").on("click", function() {

//     $dudeoutput1.text("");

// });
