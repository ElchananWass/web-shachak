cycles = {};
for (i = 1; i <= 7; i++) {
  name = "pzm_" + i.toString();
  cycles[name] = [];
  //alert(cycles[name]);
}

// an example of how it should be
/*nagla = {
  naglaId: { thread: 0, num: 0 },
  prevNagla: { thread: 0, num: 0 },
  mutable: "bool",
  time: {
    duratio: "",
    end: "",
    duration: "",
  },
  stands: [], //list of objects
  soldiersAvail: [],
  fillsetting: {
    pzm: [],
    //...
  },
};*/

tempCurrentNagla = {
  tempAvail: [],
  tempStands: [],
  tempTime: {},
}
soldiers = {};

groups = {
  בועז: {
    name: "בועז",
    soldiers: [],
    parentgroup: "solela",
    subgroups: []
  },
};

naglasThread = []; // list of list
threadedNaglas = []; //list of objects

document.getElementById("continue-shavchak").onclick = RevealShavchakSetting;

document.getElementById("create-next-nagla").onclick = RevealShavchakSetting;

function RevealShavchakSetting() {
  if (document.getElementById("create-nagla").style.display == "block") {
    document.getElementById("create-nagla").style.display = "none";
  }
  else {
    document.getElementById("create-nagla").style.display = "block";
  }
}

function FillFromPrevious(arg) {
  // body...
}

// ====== time setting part ======

document.getElementById("nagla-date").onchange = SetNaglaTimeObject;
document.getElementById("nagla-start-time").onchange = SetNaglaTimeObject;
document.getElementById("nagla-duration-time").onchange = SetNaglaTimeObject;

function SetNaglaTimeObject() {
  date = document.getElementById("nagla-date").value;
  timeStart = document.getElementById("nagla-start-time").value;
  timeDuration = document.getElementById("nagla-duration-time").value;
  naglaStart = new Date(date + "T00:00+02:00")
  //naglaEnd = new Date(naglaStart + )
  naglaStart.setHours(parseInt(timeStart.slice(0, 2)));
  naglaStart.setMinutes(parseInt(timeStart.slice(3, 5)));
  tempCurrentNagla.tempTime = {
    duration: timeDuration,
    start: naglaStart,
    end: new Date(naglaStart.getTime() + parseInt(timeDuration * 60 * 60000)),
  };
}

// ====== stands setting part ======

document.getElementById("add-stand-bttn").onclick = CreateNewStandFromValues;

// return the current setting for the new stand from the ui div
function StandsSettingValues() {
  values = {
    name: document.getElementById("add-stand-name").value,
    capacity: document.getElementById("add-stand-capacity").value,
    span: document.getElementById("add-stand-span").value,
  };
  document.getElementById("add-stand-name").value = "";
  document.getElementById("add-stand-capacity").value = "";
  document.getElementById("add-stand-span").value = "";
  return values;
}

// entry point for creating ui and data for stand drom the ui
function CreateNewStandFromValues() {
  standValues = StandsSettingValues();
  AddStandUi(standValues);
  AddStandData(standValues);
}

// create a stand ui and data
function AddStandUi(standValues) {
  standDiv = document.createElement("div");
  standDiv.setAttribute("id", standValues.name)
  delBttn = document.createElement("button");
  delBttn.onclick = DeleteStand;
  delBttn.innerHTML = "מחק";
  standDiv.appendChild(delBttn);
  standDiv.appendChild(document.createTextNode(standValues.name));
  document.getElementById("stands-div").appendChild(standDiv);
}

// delete stand ui and data
function DeleteStand() {
  name = this.parentElement.id;
  for (i = 0; i < tempCurrentNagla.tempStands.length; i++) {
    if (tempCurrentNagla.tempStands[i].name == name) {
      tempCurrentNagla.tempStands.splice(i, 1);
    }
  }
  this.parentElement.remove();
}

// add the stand values to the json data
function AddStandData(standValues) {
  tempCurrentNagla.tempStands.push(standValues);
  //console.log(nagla.stands);
}

// ====== soldiers setting part ======

//create the first ui div from which you add other groups/soldiers
CreateGroupDiv("solela", "בועז");

document.getElementById("add-group-div").style.display = "none";
document.getElementById("add-soldier-div").style.display = "none";

document.getElementById("add-soldier-bttn").onclick = AddSoldier;
document.getElementById("add-group-bttn").onclick = AddGroup;

//toggle the ui div visability for everything below it
function Checking() {
  parent = this.parentElement.id;
  parentdiv = document.getElementById(parent);
  if (this.checked) {
    CreateDivTree(parent);
  }
  if (!this.checked) {
    while (parentdiv.lastChild.nodeName == "DIV") {
      parentdiv.removeChild(parentdiv.lastChild);
    }
  }
}

//reveal the ui div which creates new soldier
function RevealAddSoldier() {
  lbl = document.getElementById("soldier-in-group");
  sldringrp = this.parentElement.id;
  same = false;
  if (sldringrp == lbl.innerHTML) {
    same = true;
  }
  lbl.innerHTML = sldringrp;
  //lbl.setAttribute("for",sldringrp);
  document.getElementById("soldier-name").value = "";
  if (document.getElementById("add-soldier-div").style.display == "none") {
    document.getElementById("add-soldier-div").style.display = "block";
    document.getElementById("add-group-div").style.display = "none";
  }
  else if (same) {
    document.getElementById("add-soldier-div").style.display = "none";
  }
}

//reveal the ui div which creates new group
function RevealAddGroup() {
  lbl = document.getElementById("group-in-group");
  groupingroup = this.parentElement.id;
  same = false;
  if (groupingroup == lbl.innerHTML) {
    same = true;
  }
  lbl.innerHTML = groupingroup;
  document.getElementById("group-name").value = "";
  if (document.getElementById("add-group-div").style.display == "none") {
    document.getElementById("add-group-div").style.display = "block";
    document.getElementById("add-soldier-div").style.display = "none";
  }
  else if (same) {
    document.getElementById("add-group-div").style.display = "none";
  }
  //lbl.setAttribute("for",group-in-group);
}

//set the data of the new/old soldier in the json of the groups not the soldiers json
function AddSoldier() {
  sldrname = document.getElementById("soldier-name").value;
  // i want to separete the definning of soldiers vs them in the groups
  // TODO create form for creating soldiera atrributes
  /*radios = document.getElementsByName("pzm");
  for (i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      pzmof = radios[i].value;
    }
  }
  soldiers[sldrname] = {
    name: sldrname,
    pzm: pzmof
  };*/
  parentgrp = document.getElementById("soldier-in-group").innerText;
  groups[parentgrp].soldiers.push(sldrname);
  //alert(soldiers[sldrname].name + soldiers[sldrname].pzm);
  document.getElementById("add-soldier-div").style.display = "none";
}

function RemoveSoldier() {
  soldier = this.parentElement.id;
  console.log(soldier)
}

//set the data of the new group in the json
function AddGroup() {
  //alert("hello");
  grpname = document.getElementById("group-name").value;
  parentgrp = document.getElementById("group-in-group").innerText;
  groups[grpname] = {
    name: grpname,
    soldiers: [],
    parentgroup: parentgrp,
    subgroups: []
  };
  groups[parentgrp].subgroups.push(grpname);
  //alert(groups[grpname].name + groups[grpname].parentgroup);
  document.getElementById("add-group-div").style.display = "none";
}

function RemoveGroup(arg) {
  // body...
}

//create the ui of the soldiers and groups
//only create divs for one level below
function CreateDivTree(temp) {
  //alert(temp);
  tempsubgrps = groups[temp].subgroups;
  for (i = 0; i < tempsubgrps.length; i++) {
    //alert(tempsubgrps[i]);
    CreateGroupDiv(temp, tempsubgrps[i]);
  }
  tempsldrs = groups[temp].soldiers;
  for (i = 0; i < tempsldrs.length; i++) {
    //alert(tempsldrs[i]);
    CreateSoldierDiv(temp, tempsldrs[i]);
  }

}

//create the ui div for a group card and its elements
function CreateGroupDiv(parent, temp) {
  tempdiv = document.createElement("div");
  tempdiv.setAttribute("class", "group-card");
  tempdiv.setAttribute("id", temp);
  check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.setAttribute("id", temp + "chckbox");
  check.onchange = Checking;
  txt = document.createTextNode(temp);
  grpbtn = document.createElement("button");
  grpbtn.innerHTML = "קבוצה";
  grpbtn.onclick = RevealAddGroup;
  sldrbtn = document.createElement("button");
  sldrbtn.innerHTML = "חייל";
  sldrbtn.onclick = RevealAddSoldier;
  delbtn = document.createElement("button");
  delbtn.innerHTML = "del";
  delbtn.onclick = RemoveGroup;

  tempdiv.appendChild(delbtn);
  tempdiv.appendChild(grpbtn);
  tempdiv.appendChild(sldrbtn);
  tempdiv.appendChild(txt);
  tempdiv.appendChild(check);

  document.getElementById(parent).appendChild(tempdiv);
}

//create the ui div for a soldiers card and its elements
function CreateSoldierDiv(parent, temp) {
  tempdiv = document.createElement("div");
  tempdiv.setAttribute("id", temp);
  tempdiv.setAttribute("class", "group-card");
  delbtn = document.createElement("button");
  delbtn.innerHTML = "del";
  delbtn.onclick = RemoveSoldier;
  txt = document.createTextNode(temp);
  avail = document.createElement("input");
  avail.setAttribute("type", "checkbox");
  avail.setAttribute("id", temp + "checkbox");
  avail.onchange = MakeAvail;
  if (tempCurrentNagla.tempAvail.includes(temp)) {
    avail.checked = true;
  }

  tempdiv.appendChild(delbtn);
  tempdiv.appendChild(txt);
  tempdiv.appendChild(avail);

  document.getElementById(parent).appendChild(tempdiv);
}
// this binds the checking ui of soldiers
// to the data in nagla list of avails
function MakeAvail() {
  name = this.parentElement.id;
  isAvail = false;
  indexOf = -1;
  for (i = 0; i < tempCurrentNagla.tempAvail.length; i++) {
    if (tempCurrentNagla.tempAvail[i] == name) {
      isAvail = true;
      indexOf = i;
    }
  }
  if (this.checked && !isAvail) {
    tempCurrentNagla.tempAvail.push(name);
  }
  if (!this.checked && isAvail && indexOf != -1) {
    tempCurrentNagla.tempAvail.splice(indexOf, 1);
  }
}

// ====== pazam setting part ======

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

function OrderNagla() {
  // sort by which soldier to which stand
}

function PushBackFoward() {
  // a little problamatic but soppuose to change between hours
  // alot of if else for conditions...
}

// ====== creating next nagla part ======

document.getElementById("create-next-nagla").onclick = CreateNextNagla;

function CreateNextNagla() {
  mutable = false;
  now = new Date();
  if (tempCurrentNagla.tempTime.start.getTime() > now.getTime()){
    mutable = true;
  }
  nagla = {
    naglaId: { thread: 0, num: 0 },
    prevNagla: { thread: 0, num: 0 },
    mutable: mutable,
    time: tempCurrentNagla.tempTime,
    stands: tempCurrentNagla.tempStands,
    soldiersAvail: tempCurrentNagla.tempAvail,
    fillsetting: {
      pzm: [],
      //...
    },
  };

  CreateNewTableLine(tempCurrentNagla.tempStands, tempCurrentNagla.tempAvail);
}

function CreateNewTableLine(stands, soldiers) {
  naglaDiv = document.createElement("div");
  document.getElementById("tables-div").appendChild(naglaDiv);
  table = document.createElement("table");
  table.setAttribute("border", "1")
  naglaDiv.appendChild(table);
  thead = document.createElement("thead");
  table.appendChild(thead);
  tbody = document.createElement("tbody");
  table.appendChild(tbody)
  hRow = document.createElement("tr");
  for (var i = 0; i < stands.length; i++) {
    th = document.createElement("th");
    th.innerHTML = stands[i].name;
    hRow.appendChild(th);
  }
  thead.appendChild(hRow);
  dRow = document.createElement("tr");
  for (var i = 0; i < soldiers.length; i++) {
    td = document.createElement("td");
    td.innerHTML = soldiers[i];
    dRow.appendChild(td);
  }
  tbody.appendChild(dRow);
}