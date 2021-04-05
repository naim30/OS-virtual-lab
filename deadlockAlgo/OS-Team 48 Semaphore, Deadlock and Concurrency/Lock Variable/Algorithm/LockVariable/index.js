// importing queue for ready and suspended.
// import { Queue } from "./asset/queue.js";

// class queue
class Queue {
	// Array is used to implement a Queue
	constructor() {
		this.items = [];
	}

	// enqueue function
	enqueue(element) {
		// adding element to the queue
		this.items.push(element);
	}

	// dequeue function
	dequeue() {
		// removing element from the queue
		// returns underflow when called
		// on empty queue
		if (this.isEmpty()) return null;
		return this.items.shift();
	}

	// front function
	front() {
		// returns the Front element of
		// the queue without removing it.
		if (this.isEmpty()) return null;
		return this.items[0];
	}

	// isEmpty function
	isEmpty() {
		// return true if the queue is empty.
		return this.items.length == 0;
	}

	// printQueue function
	printQueue() {
		var str = "";
		for (var i = 0; i < this.items.length; i++) str += this.items[i] + " ";
		return str;
	}
}

var suspendedQ = new Queue();

var size = 1;
var currSize = -1;

var margin_top = 135;
var box_height = 300;
var incre_height = 170;

const inRQ = 1;
const inSQ = 2;
const inCS = 3;
const inCQ = 4;
var semaphore = 0;
var semArea = document.getElementById("sem");
var blinkingBox = document.getElementById("box2");
semArea.innerHTML = 0;

var insertImg = document.getElementById("insertImg");

var insertButton = document.getElementById("insertButton");

var printSuspendedQueue = document.getElementById("printSuspendedQueue");
var printCriticalSection = document.getElementById("printCriticalSection");
var printCompletedQueue = document.getElementById("printCompletedQueue");
var text = document.getElementById("textArea");
// var hello = "";
text.innerHTML += `\t<--- welcome to the Lock Variable Synchronization Mechanism --->\n\t\nSteps of command initiated by you:\n\n`;

// map for process;
var processes = new Map();
processes.set("p0", { value: 1 });
processes.set("p1", { value: 1 });
text.innerHTML += `\t** process p0 is added and is ready to go to Entry Section. **\n\n`;
text.innerHTML += `\t** process p1 is added and is ready to go to Entry Section. **\n\n`;

async function addProcesses() {
	size++;
	let temp = size.toString();
	let name = "p" + temp; // p2
	let buttonName = "b" + temp; // b2

	processes.set(`${name}`, { value: 1 });
	incre_height += 55;
	margin_top += 55;
	if (temp >= 5) {
		box_height += 55;
	}

	final_box_height = `${box_height}px`;
	final_incre_height = `${incre_height}px`;
	final_margin = ` ${margin_top}px`;
	button_style = `style = "position: absolute; height: auto; width: auto; margin-top: ${final_margin};  margin-left: 115px; " `;

	insertButton.innerHTML += `<button ${button_style} class="right button_slide slide_right" id=${buttonName} onclick='verify("${name}")'>${name}</button>`;

	image_style = `style = "width: 38px;
	margin-top: ${final_margin};
	transition-duration: 2s; "`;
	insertImg.innerHTML += `<img ${image_style} id=${name} src="img/${name}.png" />`;

	document.getElementById("box1").style.height = final_box_height;
	document.getElementById("box2").style.height = final_box_height;
	document.getElementById("entry").style.height = final_box_height;
	document.getElementById("exit").style.height = final_box_height;
	document.getElementById("incre").style.marginTop = final_incre_height;

	text.innerHTML += `\t** process ${name} is added and is ready to go to Entry Section. **\n\n`;
	document.getElementById("textArea").scrollTop = document.getElementById(
		"textArea"
	).scrollHeight;
}

async function verify(val) {
	// val is value send by the button

	let suspendedfEle = suspendedQ.front();
	let suspendedIsEmpty = suspendedQ.isEmpty();

	if (processes.get(val).value == inRQ) {
		if (semaphore == 0) {
			semaphore = 1;

			processes.get(val).value = 3;
			moveToCriticalSection(val);
			printCriticalSection.innerHTML = val;
			semArea.innerHTML = semaphore;
			text.innerHTML += `++ process ${val} is approved for critical section. \n`;
			text.innerHTML += `--  Lock value changed from 0 to 1. \n\n`;
		} else {
			moveright(val);
			processes.get(val).value = 2;
			suspendedQ.enqueue(val);
			text.innerHTML += `++ critical section is occupied so ${val} is kept for busy waiting. \n\n`;
		}
	} else if (processes.get(val).value == inSQ) {
		if (semaphore == 0) {
			moveright(suspendedfEle);
			processes.get(suspendedfEle).value = 3;
			printCriticalSection.innerHTML = suspendedfEle;
			semaphore = 1;
			semArea.innerHTML = semaphore;
			suspendedQ.dequeue();
			text.innerHTML += `++ process ${val} is approved for Critical Section. \n`;
			text.innerHTML += `--  Lock value changed from 0 to 1. \n\n`;
		} else {
			// alert("wait for the process to complete!");
			text.innerHTML += `\t** Warning: wait for the process to complete! **\n`;

			popupForWarning();
		}
	} else if (processes.get(val).value == inCS) {
		if (suspendedIsEmpty) {
			moveright(val);
			semaphore = 0;
			processes.get(val).value = 4;
			printCriticalSection.innerHTML = "";
			printCompletedQueue.innerHTML += `${val} `;
			singleProcessComplete(val);
			text.innerHTML += `\t.. process ${val} is completed. \n\n`;
		} else {
			moveToComplete(val, suspendedfEle);
			semaphore = 1;
			processes.get(val).value = 4;
			printCompletedQueue.innerHTML += `${val} `;
			processes.get(suspendedfEle).value = 3;
			printCriticalSection.innerHTML = suspendedfEle;
			suspendedQ.dequeue();
			singleProcessComplete(val);
			text.innerHTML += `\t.. process ${val} is completed. \n`;
			text.innerHTML += `++ process ${suspendedfEle} is approved for critical section. \n\n`;
		}
		currSize++;
		semArea.innerHTML = semaphore;
	} else if (processes.get(val).value == inCQ) {
		// alert(`process ${val} is already completed!`);
		popupForCompleted(val);
		text.innerHTML += `\t** Warning: process ${val} is already completed! **\n`;
	}
	printSuspendedQueue.innerHTML = suspendedQ.printQueue();
	if (currSize == size) {
		allProcessAreComplete();
		text.innerHTML += `\n<-- processes are completed. -->\n`;
		text.innerHTML += `\n<- Thank you for using our visualization ->\n`;
	}
	document.getElementById("textArea").scrollTop = document.getElementById(
		"textArea"
	).scrollHeight;
}

async function moveToComplete(completeVal, suspendedVal) {
	const img1 = document.getElementById(completeVal);
	img1.style.marginLeft = `${img1.offsetLeft + 170}px`;
	await sleep(1000);

	const img2 = document.getElementById(suspendedVal);
	img2.style.marginLeft = `${img2.offsetLeft + 170}px`;
	await sleep(1000);
	if (!semaphore) {
		blinkingBox.classList.remove("alerts-border");
		blinkingBox.style.borderColor = "#2ecc40";
	} else {
		

		blinkingBox.style.borderColor = "#ff0000";

		blinkingBox.classList.add("alerts-border");
	}
}
async function moveToCriticalSection(val) {
	const img = document.getElementById(val);
	img.style.marginLeft = `${img.offsetLeft + 340}px`;

	await sleep(1000);

	if (!semaphore) {
		blinkingBox.classList.remove("alerts-border");
		blinkingBox.style.borderColor = "#2ecc40";
	} else {
		

		blinkingBox.style.borderColor = "#ff0000";

		blinkingBox.classList.add("alerts-border");
	}
}
async function moveright(val) {
	const img = document.getElementById(val);
	img.style.marginLeft = `${img.offsetLeft + 170}px`;

	await sleep(1000);

	if (!semaphore) {
		blinkingBox.classList.remove("alerts-border");
		blinkingBox.style.borderColor = "#2ecc40";
	} else {
		

		blinkingBox.style.borderColor = "#ff0000";

		blinkingBox.classList.add("alerts-border");
	}
}

function popupForWarning() {
	swal({
		title: "Warning",
		text: "Critical section is being used by process!",
		button: "Ok!",
	});
}
function popupForCompleted(val) {
	swal({
		title: "Warning",
		text: `Process ${val} is already completed!`,
		button: "Ok!",
	});
}
function singleProcessComplete(val) {
	swal({
		title: "Hola!",
		text: `Process ${val} is completed!`,
		icon: "success",
		button: "Nice!",
	});
}
function allProcessAreComplete() {
	swal({
		title: "We Are Done!",
		text: "All the process are complete",
		icon: "success",
		button: "Aww yiss!",
	});
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getPdf(val) {
	var allStatus = document.getElementById("textArea").value;
	var doc = new jsPDF();
	doc.text(allStatus, 10, 10);
	doc.save(`${val}.pdf`);
}
