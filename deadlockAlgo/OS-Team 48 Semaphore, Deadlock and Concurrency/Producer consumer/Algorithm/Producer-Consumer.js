var $output = $("#textArea")
var $props = $(".PR")
var doc = new jsPDF();

var process_limit_input = 5;
var process_time_milliseconds = 900;
var ProcessStack = []

let randomness_factor = 0;


function StackFormingQueue() {
	for(var i=0;i<process_limit_input;i++) {
    ProcessStack.push(i);
    $props.append("<section class='props' id='P" + i + "'>" + 'P' + i + "</section>");
	}
}


async function AcceptInput() {
  process_limit_input = document.getElementById("NoOfProcess").value;
  process_time_milliseconds = document.getElementById("ExecutionTime").value;

  //*********Worker Thread**********//
  let iteration = 0;
  $props.text("");
  StackFormingQueue();
  $output.text("");

  while (iteration <= process_time_milliseconds) {
    OptionToProcess();
    iteration++;
    // var noofpages = Math.floor(iteration/40);
    // var itr = 0;
    // if (iteration%40==0) {
    //   var Status = document.getElementById("textArea").value;
    //   doc.text(Status, 10, 10);
    //   doc.addPage();
    // }
    await sleep(100);
  }
  //********************************//
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




//*****Algorithm Processes******//
function Producer(process_no) {
  ProcessStack.push(process_no);
  // console.log('Process no.' + process_no + ' is produced.');
  $output.append('Process no.' + process_no + ' is produced.\n');
  document.getElementById("textArea").scrollTop = document.getElementById(
		"textArea"
	).scrollHeight;
  document.getElementById("P" + process_no).style.background = "black";
  document.getElementById("P" + process_no).style.color = "white";
}

function Consumer(process_no) {
  // console.log('Process no.' + process_no + ' is consumed.');
  $output.append('Process no.' + process_no + ' is consumed.\n');
  document.getElementById("textArea").scrollTop = document.getElementById(
		"textArea"
	).scrollHeight;
  document.getElementById("P" + process_no).style.background = "white";
  document.getElementById("P" + process_no).style.color = "black";
}
//********************************//


//***Random Function to generate process***//
function GenerateRandomProcess() {
  let random_process = Math.floor((Math.random() * (process_limit_input)) + 0);
  return random_process;
}

function ExecuteRandomProcess() {
  let random_process = ProcessStack.pop();
  return random_process;
}

function OptionToProcess() {
  let process_type = Math.floor((Math.random() * randomness_factor) + 1);

  // console.log(process_type);

  if (process_type == 1) {
    randomness_factor = 3;
    Producer(GenerateRandomProcess());
  }
  else {
    randomness_factor = 0;
    Consumer(ExecuteRandomProcess());
  }
}
//********************************//

function getPdf() {
	var allStatus = document.getElementById("textArea").value;
  
  // // pageHeight= doc.internal.pageSize.height;
  // // x = 10
  // // // Before adding new content
  // // y = 500 // Height position of new content
  // // if (y >= pageHeight)
  // // {
    
  // //   y = 0 // Restart height position
  // // }
  // // doc.text(x, y, allStatus);


	doc.text(allStatus, 10, 10);
  doc.save(`ProdCons.pdf`);
}