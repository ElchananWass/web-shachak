cycles = {};
for (i = 1; i <= 7; i++) {
  name = "pzm_" + i.toString();
  cycles[name] = [];
  //alert(cycles[name]);
}

// an example of how it should be
nagla = {
  naglaId: { thread: 0, num: 0 },
  prevNagla: { thread: 0, num: 0 },
  mutable: "bool",
  start: "#date object",
  end: "#date object",
  stands: [], //list of objects
  soldiersAval: [],
  fillsetting: {
    pzm: [],
    //...
  },
};

soldiers = {};

groups = {
  boaz: {
    name: "boaz",
    soldiers: [],
    parentgroup: "solela",
    subgroups: []
  },
};

naglasThread = []; // list of list
threadedNaglas = []; //list of objects

document.getElementById("continue-shavchak").onclick = RevealShavchakSetting;

document.getElementById("create-new-nagla").onclick = RevealShavchakSetting;

document.getElementById("add-stand-bttn").onclick = AddStand;

function RevealShavchakSetting() {
  if (document.getElementById("create-nagla").style.display == "block") {
    document.getElementById("create-nagla").style.display = "none";
  }
  else {
    document.getElementById("create-nagla").style.display = "block";
  }
}

// ====== stands setting part ======

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

// create a stand ui and data
function AddStand() {
  standValues = StandsSettingValues();
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
  this.parentElement.remove();
}

// ====== soldiers setting part ======

CreateGroupDiv("solela", "boaz");

document.getElementById("add-group-div").style.display = "none";
document.getElementById("add-soldier-div").style.display = "none";

document.getElementById("add-soldier-bttn").onclick = AddSoldier;
document.getElementById("add-group-bttn").onclick = AddGroup;

function Checking() {
  parent = this.parentElement.id;
  parentdiv = document.getElementById(parent);
  if (this.checked) {

    //parentdiv.remove();
    CreateDivTree(parent);
  }
  if (!this.checked) {
    grandpa = groups[parent].parentgroup;
    parentdiv.remove();
    CreateGroupDiv(grandpa, parent);
  }
}

function RevealAddSoldier() {
  lbl = document.getElementById("soldier-in-group");
  sldringrp = this.parentElement.id;
  lbl.innerHTML = sldringrp;
  //lbl.setAttribute("for",sldringrp);
  document.getElementById("soldier-name").value = "";
  document.getElementById("add-soldier-div").style.display = "block";
}

function RevealAddGroup() {
  lbl = document.getElementById("group-in-group");
  groupingroup = this.parentElement.id;
  lbl.innerHTML = groupingroup;
  document.getElementById("group-name").value = "";
  document.getElementById("add-group-div").style.display = "block";
  //lbl.setAttribute("for",group-in-group);
}

function AddSoldier() {
  sldrname = document.getElementById("soldier-name").value;
  radios = document.getElementsByName("pzm");
  for (i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      pzmof = radios[i].value;
    }
  }
  soldiers[sldrname] = {
    name: sldrname,
    pzm: pzmof
  };
  parentgrp = document.getElementById("soldier-in-group").innerText;
  groups[parentgrp].soldiers.push(sldrname);
  //alert(soldiers[sldrname].name + soldiers[sldrname].pzm);
  document.getElementById("add-soldier-div").style.display = "none";
}

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

  tempdiv.appendChild(grpbtn);
  tempdiv.appendChild(sldrbtn);
  tempdiv.appendChild(txt);
  tempdiv.appendChild(check);

  document.getElementById(parent).appendChild(tempdiv);
}

function CreateSoldierDiv(parent, temp) {
  tempdiv = document.createElement("div");
  tempdiv.setAttribute("id", temp);
  tempdiv.setAttribute("class", "group-card");
  delbtn = document.createElement("button");
  delbtn.innerHTML = "del";
  txt = document.createTextNode(temp);

  tempdiv.appendChild(delbtn);
  tempdiv.appendChild(txt);

  document.getElementById(parent).appendChild(tempdiv);
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