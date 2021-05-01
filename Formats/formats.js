table = {
    name : "basic",
    stands : {
        numofstands : 0,
        sg : {
            name : "sg",
            numofsldrs: 1,
        }//...
    },
    hours : {
        begining : "2:00",
        sizeofstep : "30min",
        numofsteps: 10,
    },
    naglas : {
        nagla1 : {
            hours : "",
            smiras : ["",],
        },
    },
    smiras : {
        //...
    },//...
};// a sample of a table object
alert("hiiii12")

document.getElementById("create-table").onclick = CreateTable;
document.getElementById("add-stand").onclick = AddStand;

function CreateTable() {
    document.getElementById("create-table-div").style.display = "none";
    stepsNum = document.getElementById("num-of-steps").value;
    alert(stepsNum);
    alert(parseInt(stepsNum));
    rows = document.getElementsByTagName("tr");
    
    th = document.createElement("th");
    th.innerHTML = "שעות";
    rows[0].appendChild(th);
    for(i = 0; i < parseInt(stepsNum); i++) {
        CreateRow(i);
    }
}

function CreateRow(i) {
    tr = document.createElement("tr");
    tr.id = i;
    tbody = document.getElementById("tbody");
    td = document.createElement("td");
    td.innerHTML = i;
    td.id = i.toString() + "," + "0";
    tr.appendChild(td);
    tbody.appendChild(tr);
    //alert("done");
}

function AddStand() {
    table.stands.numofstands++;
    numstands = table.stands.numofstands;
    standName = document.getElementById("name-of-stand").value;
    rows = document.getElementsByTagName("tr");
    
    th = document.createElement("th");
    th.innerHTML = standName;
    rows[0].appendChild(th);
    
    for (i = 1; i < rows.length; i++) {
        CreateTd(i,numstands);
    }
}

function CreateTd(i,numstand) {
    rows = document.getElementsByTagName("tr");
    td = document.createElement("td");
    btn = document.createElement("button");
    btn.onclick = CreateSmira;
    btn.innerHTML = "add"+i+numstand;
    td.id = i.toString()+"," +numstand.toString();
    td.appendChild(btn);
    rows[i].insertBefore(td,rows[i].children[numstand]);
}

function CreateSmira() {
    naglotNum = parseInt(document.getElementById("num-of-naglot").value);
    preNaglotNum = this.parentElement.rowSpan;
    currentId = this.parentElement.id;
    sepp = currentId.indexOf(",");
    x = parseInt(currentId.slice(0,sepp));
    y = parseInt(currentId.slice(sepp+1,currentId.length));
    alert(currentId+x + y);
    for (i = x+1; i < x+preNaglotNum ; i++) {
        CreateTd(i,y);
    }
    this.parentElement.rowSpan = naglotNum;
    for (i = x+1; i < (x+naglotNum); i++) {
        tempId = i.toString() + "," + y.toString();
        document.getElementById(tempId).remove();
    }
    this.innerHTML = "שנה"
}