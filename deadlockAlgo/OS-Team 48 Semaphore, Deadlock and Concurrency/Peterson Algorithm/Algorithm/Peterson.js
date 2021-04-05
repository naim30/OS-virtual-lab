let Process0 = 0;
// let interestP0 = false;
let Process1 = 1;
// let interestP1 = false;
var $output = $("#textArea")
var $i0 = $(".interestP0");
var $i1 = $(".interestP1");
var $vari = $(".Pruce");
var interest = [false, false];


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}



async function EntrySection(process) {
	let other;
	other = 1 - process;
	interest[process] = true;
	turn = process;

	$vari.text('P' + process);
	if (turn == 1) {
		// P1Move(100)
		$output.append('Process no.' + process + ' has started.\n');
		$i1.text(interest[process]);
		document.getElementById("textArea").scrollTop = document.getElementById(
			"textArea"
		).scrollHeight;
		await sleep(2000);
	}
	else {
		// P0Move(100)
		$output.append('Process no.' + process + ' has started.\n');
		$i0.text(interest[process]);
		document.getElementById("textArea").scrollTop = document.getElementById(
			"textArea"
		).scrollHeight;
		await sleep(2000);
	}

	if (interest[other] == true && turn == process) {
		$vari.text('P' + process);
		$output.append('Process no.' + other + ' is already in the critical section.\n');
		document.getElementById("textArea").scrollTop = document.getElementById(
			"textArea"
		).scrollHeight;
		await sleep(3000);
		return;
	}

	CriticalSection(process)
}

async function CriticalSection(process) {

	if (process == 0) {
		$vari.text('P' + process);
		// P0Move(200)
		$output.append('Process no.' + process + ' has entered the critical section.\n');
		document.getElementById("textArea").scrollTop = document.getElementById(
			"textArea"
		).scrollHeight;
		await sleep(2000);
	}
	else {
		// P1Move(300)
		$vari.text('P' + process);
		$output.append('Process no.' + process + ' has entered the critical section.\n');
		document.getElementById("textArea").scrollTop = document.getElementById(
			"textArea"
		).scrollHeight;
		await sleep(2000);
	}

	if (process == 0) {
		// P1Move(100);
		EntrySection(1 - process);
	}
	$output.append('Process no.' + process + ' has exited the critical section.\n');
	document.getElementById("textArea").scrollTop = document.getElementById(
		"textArea"
	).scrollHeight;
	await sleep(1000);
	if (process == 0) {
		// P1Move(100);
		CriticalSection(1 - process);
	}
	ExitSection(process)
}

async function ExitSection(process) {

	if (process == 0) {
		$vari.text('P' + process);
		$output.append('Process no.' + process + ' has exited.\n');
		document.getElementById("textArea").scrollTop = document.getElementById(
			"textArea"
		).scrollHeight;
		await sleep(1000);
		// P0Move(500)
	}
	else {
		$vari.text('P' + process);
		$output.append('Process no.' + process + ' has exited.\n');
		document.getElementById("textArea").scrollTop = document.getElementById(
			"textArea"
		).scrollHeight;
		await sleep(1000);
		// P1Move(500)
	}

	interest[process] = false;
}

function P0Move(valuetomove1) {
	var elem1 = document.getElementById("P000");
	var pos1 = 0;
	var id1 = setInterval(frame1, 15);
	function frame1() {
		if (pos1 == 800) {
			clearInterval(id1);
		} else {
			pos1++;
			elem1.style.left = pos1 + "px";
		}
	}
}

function P1Move(valuetomove2) {
	var elem2 = document.getElementById("P001");
	var pos2 = 0;
	var id2 = setInterval(frame2, 5);
	function frame2() {
		if (pos2 == 800) {
			clearInterval(id2);
		} else {
			pos2++;
			elem2.style.left = pos2 + "px";
		}
	}
}

EntrySection(Process0);