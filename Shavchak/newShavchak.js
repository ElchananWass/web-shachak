cycles = {}
for (i = 1; i <= 7; i++) {
  name = "pzm_" + i.toString();
  cycles[name] = [];
  //alert(cycles[name]);
}

nagla = {
  naglanum: { thread: 0, num: 0 },
  prevNagla: { thread: 0, num: 0 },
  mutable: "bool",
  start: "#date object",
  end: "#date object",
  stands: [],
  soldiersAval: [],
  fillsetting: {
    pzm: [],
    //...
  },
};

naglasthread = []; // list of list
threadednaglas = []; //list of objects

document.getElementById("continue-shavchak").onclick = RevealShavchakSetting;

document.getElementById("create-new-nagla").onclick = RevealShavchakSetting;

document.getElementById("add-stand-bttn").onclick = AddStand;

function AddStand() {
  standName = document.getElementById("add-stand-name").value;
  standDiv = document.createElement("div");
  standDiv.setAttribute("id",standName)
  delBttn = document.createElement("button");
  delBttn.innerHTML = "מחק";
  standDiv.appendChild(delBttn);
  standDiv.appendChild(document.createTextNode(standName));
  document.getElementById("stands-div").appendChild(standDiv);
}

function RevealShavchakSetting() {
  if (document.getElementById("create-nagla").style.display == "block") {
    document.getElementById("create-nagla").style.display = "none";
  }
  else {
    document.getElementById("create-nagla").style.display = "block";
  }
}

function* CyclesItirate(i) {
  // get the יחסים from page 
  //calculate which pazam
  //and teturns a liat
  while (true) {
    yield i % 7 + 1;
    i++;
  }
}
const currentCycle = CyclesItirate(0);
//currentCycle.next().value

function SoldiersForNagla(naglaNum) {
  // returns soldiers from the cycles
  // returns a nagla list

  // draws n soldiers with cycle
  //"sort them by goodness" and return
}

function OrderNagla(argument) {
  // sort by which soldier to which stand
}

function PushBackFoward(argument) {
  // a little problamatic but soppuose to change between hours
  // alot of if else for conditions...
}