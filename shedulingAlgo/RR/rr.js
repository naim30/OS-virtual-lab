let menu_open = false;
let menu_button = document.querySelector(".nav>div>.button>div");

menu_button.addEventListener("click", open_menu);
menu_button.addEventListener("mouseover", hoverin_button);
menu_button.addEventListener("mouseout", hoverout_button);

function hoverin_button(e) {
  let button_before = document.querySelector(".nav>div>.button>div>div");
  button_before.style.animation = "hover-on";
  button_before.style.animationDuration = "300ms";
  button_before.style.animationFillMode = "forwards";

  menu_button.style.animation = "forward-text";
  menu_button.style.animationDuration = "300ms";
  menu_button.style.animationFillMode = "forwards";
}

function hoverout_button(e) {
  if (menu_open == false) {
    let button_before = document.querySelector(".nav>div>.button>div>div");
    button_before.style.animation = "hover-out";
    button_before.style.animationDuration = "300ms";
    button_before.style.animationFillMode = "forwards";

    menu_button.style.animation = "reverse-text";
    menu_button.style.animationDuration = "300ms";
    menu_button.style.animationFillMode = "forwards";
  }
}

function open_menu(e) {
  let menu = document.querySelector(".menu");
  let menu_item = document.querySelector(".menu>.menu-item");
  if (menu_open == false) {
    menu_open = true;
    menu.style.animation = "slide-out";
    menu.style.animationDuration = "500ms";
    menu.style.animationFillMode = "forwards";

    menu_item.style.animation = "reverse-menu";
    menu_item.style.animationDuration = "700ms";
    menu_item.style.animationFillMode = "forwards";
  } else {
    menu_open = false;
    menu.style.animation = "slide-in";
    menu.style.animationDuration = "500ms";
    menu.style.animationFillMode = "forwards";

    menu_item.style.animation = "forward-menu";
    menu_item.style.animationDuration = "200ms";
    menu_item.style.animationFillMode = "forwards";
  }
}

// ---------------------------------------------------------------------

let add_button = document.querySelector(
  ".container>div:last-child>.add-process>.add"
);
let table = document.querySelector(".table>table");
let play_button = document.querySelector(
  ".container>div:first-child>.buttons>.play"
);
let reset_button = document.querySelector(
  ".container>div:first-child>.buttons>.reset"
);

add_button.addEventListener("click", add_process);
table.addEventListener("click", delete_process);
play_button.addEventListener("click", run_algorithm);
reset_button.addEventListener("click", reset_table);

function add_process(e) {
  let arrivalTime = parseInt(document.getElementById("arrival-time").value, 10);
  let burstTime = parseInt(document.getElementById("brust-time").value, 10);
  let tableBody = document.querySelector(".table>table>tbody");

  if (
    Number.isInteger(arrivalTime) &&
    Number.isInteger(burstTime) &&
    burstTime > 0 &&
    arrivalTime >= 0
  ) {
    document.querySelector(".error").style.display = "none";
    tableBody.innerHTML += `<tr>
        <td></td>
        <td>${arrivalTime}</td>
        <td>${burstTime}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="del">DEL</td>
      </tr>`;

    document.getElementById("arrival-time").value = "";
    document.getElementById("brust-time").value = "";

    for (let i = 0; i < table.rows.length; i++) {
      document.querySelector(
        `.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)`
      ).innerHTML = "P" + (i + 1);
    }
  } else {
    document.querySelector(".error").innerHTML = "Invalid Input";
    document.querySelector(".error").style.display = "block";
  }
}

function delete_process(e) {
  if (!e.target.classList.contains("del")) {
    return;
  }
  let deleteButton = e.target;
  deleteButton.closest("tr").remove();

  for (let i = 0; i < table.rows.length; i++) {
    document.querySelector(
      `.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)`
    ).innerHTML = "P" + (i + 1);
  }
}

function reset_table(e) {
  location.reload();
}

var processArr = [];
var g = [];
var tm = [];
var pid = [];
var data = {
  header: ["processId", "TAT"],
  rows: [],
};

function run_algorithm(e) {
  processArr = [];
  let times = ["st", "ct", "rt", "wt", "tat"];
  let rowLength = table.rows.length;
  let timeQ = parseInt(document.getElementById("time-q").value, 10);

  if (!Number.isInteger(timeQ)) {
    document.querySelector(".error").innerHTML = "Time Quantum is required";
    document.querySelector(".error").style.display = "block";
    return;
  }
  document.querySelector(".error").style.display = "none";

  for (let i = 1; i < rowLength; i++) {
    processArr.push({
      at: parseInt(table.rows.item(i).cells.item(1).innerHTML, 10),
      bt: parseInt(table.rows.item(i).cells.item(2).innerHTML, 10),
      rbt: parseInt(table.rows.item(i).cells.item(2).innerHTML, 10),
      pid: "P" + i,
    });
  }

  processArr = calculateAllTimes(processArr, timeQ);
  let avgTAT = 0,
    avgWT = 0,
    avgRT = 0;

  for (let i = 0; i < processArr.length; i++) {
    avgTAT += processArr[i].tat;
    avgWT += processArr[i].wt;
    avgRT += processArr[i].rt;
    for (let j = 0; j < 5; j++) {
      document.querySelector(
        `.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(${j + 4})`
      ).innerHTML = processArr[i][times[j]];
    }
  }

  document.querySelector(".container>div:first-child>.avg-tat>span").innerHTML =
    (avgTAT / processArr.length).toFixed(2) == "NaN"
      ? 0
      : (avgTAT / processArr.length).toFixed(2);
  document.querySelector(".container>div:first-child>.avg-wt>span").innerHTML =
    (avgWT / processArr.length).toFixed(2) == "NaN"
      ? 0
      : (avgWT / processArr.length).toFixed(2);
  document.querySelector(".container>div:first-child>.avg-rt>span").innerHTML =
    (avgRT / processArr.length).toFixed(2) == "NaN"
      ? 0
      : (avgRT / processArr.length).toFixed(2);

  processArr.sort(function (a, b) {
    var keyA = a.st,
      keyB = b.st;
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  tableCreate();
  console.log(processArr);
  processArr.forEach((a, index) => {
    data.rows[index] = [a.pid, a.tat];
  });

  anychart.onDocumentReady(function () {
    // anychart.theme(anychart.themes.darkEarth);

    // set a data from process array for tat chart

    console.log(data);
    // create the chart
    var chart = anychart.bar();

    // add data
    chart.data(data);

    // set the chart title
    chart.title("process TAT comparison");

    // draw
    chart.container("container");
    chart.draw();
  });
}

function calculateAllTimes(arr, timeQ) {
  let time = Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].at < time) {
      time = arr[i].at;
    }
  }

  while (arr.find((el) => el.finish == undefined)) {
    let sortedArr = [...arr];
    sortedArr.sort((a, b) => a.at - b.at);

    let pArr = [];
    for (let i = 0; i < sortedArr.length; i++) {
      if (sortedArr[i].at <= time && sortedArr[i].finish != true) {
        pArr.push(sortedArr[i]);
      }
    }
    if (pArr.length == 0) {
      time++;
      continue;
    }
    for (let i = 0; i < pArr.length; i++) {
      if (pArr[i].st == undefined) {
        pArr[i].st = time;
        pArr[i].rt = pArr[i].st - pArr[i].at;
      }
      time = time + Math.min(timeQ, pArr[i].rbt);
      pArr[i].rbt = pArr[i].rbt - Math.min(timeQ, pArr[i].rbt);
      g.push(pArr[i].pid);
      tm.push(time);
      if (pArr[i].rbt == 0) {
        pArr[i].ct = time;
        pArr[i].tat = pArr[i].ct - pArr[i].at;
        pArr[i].wt = pArr[i].tat - pArr[i].bt;
        pArr[i].finish = true;
      }

      for (let j = i + 1; j < sortedArr.length; j++) {
        if (
          sortedArr[j].at <= time &&
          sortedArr[j].finish != true &&
          !pArr.includes(sortedArr[j])
        ) {
          pArr.push(sortedArr[j]);
        }
      }
      if (pArr[i].rbt != 0) {
        pArr.push(pArr[i]);
      }
    }
  }
  console.log(g);
  console.log(tm);
  return arr;
}

var row1 = document.getElementById("row1");
var row = document.getElementById("row");
var colors = [
  "#58508d",
  "#bc5090",
  "#ff6361",
  "#ffa600",
  "#fc979e",
  "#a8f796",
  "#b0f287",
  "#f49381",
  "#b2ffda",
];

function tableCreate() {
  var z = row1.insertCell(0);
  var w = row2.insertCell(0);
  z.id = "cell1";
  w.id = "cell2";
  document.getElementById("cell1").style.width = "80px";
  document.getElementById("cell2").style.width = "80px";
  z.innerHTML = "Start Time";
  w.innerHTML = processArr[0].st;
  document.getElementById("cell1").style.border = "none";
  document.getElementById("cell2").style.border = "none";
  document.getElementById("cell1").style.background = "#e0e0e0";
  document.getElementById("cell2").style.background = "#e0e0e0";
  document.getElementById("cell1").style.textAlign = "center";
  document.getElementById("cell2").style.textAlign = "center";
  for (let i = 0; i < g.length; i++) {
    var f = i % 9;
    var x = row1.insertCell(i + 1);
    var y = row2.insertCell(i + 1);
    if(g[i] == undefined){
      x.innerHTML = 'CPU Idle';
    }
    else{
    x.innerHTML = g[i];
    }
    y.innerHTML = tm[i];
    x.id = "c" + i;
    y.id = "cc" + i;
    document.getElementById("c" + i).style.width = "50px";
    document.getElementById("cc" + i).style.width = "50px";
    document.getElementById("c" + i).style.height = "35px";
    document.getElementById("cc" + i).style.height = "35px";
    document.getElementById("am").style.margin = "20px";
    document.getElementById("am").style.padding = "20px";
    document.getElementById("c" + i).style.backgroundColor = colors[f];
    document.getElementById("cc" + i).style.backgroundColor = colors[f];
    document.getElementById("c" + i).style.textAlign = "center";
    document.getElementById("cc" + i).style.textAlign = "center";
    document.getElementById("c" + i).style.border = "none";
    document.getElementById("cc" + i).style.border = "none";
  }
}
