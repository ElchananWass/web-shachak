//alert("<8");

soldiers = {
    
};

groups = {
    boaz : {
        name : "boaz",
        soldiers : [],
        parentgroup : "solela",
        subgroups : []
    },
};

CreateGroupDiv("solela","boaz");

document.getElementById("addgroupbox").style.display = "none";
document.getElementById("addsoldierbox").style.display = "none";

document.getElementById("addsoldier").onclick = AddSoldier;
document.getElementById("addgroup").onclick = AddGroup;

document.getElementById("boazsldradd").onclick = RevealAddSoldier;
document.getElementById("boazgrpadd").onclick = RevealAddGroup;

function Checking() {
    parent = this.parentElement.id;
    parentdiv = document.getElementById(parent);
    if(this.checked){
        
       //parentdiv.remove();
        CreateDivTree(parent);
    }
    if(!this.checked){
        grandpa = groups[parent].parentgroup;
        parentdiv.remove();
        CreateGroupDiv(grandpa,parent);
    }
}

function RevealAddSoldier() {
    lbl = document.getElementById("sldringroup");
    sldringrp = this.parentElement.id;
    lbl.innerHTML = sldringrp;
    //lbl.setAttribute("for",sldringrp);
    document.getElementById("nameofsoldier").value = "";
    document.getElementById("addsoldierbox").style.display = "block";
}

function RevealAddGroup() {
    lbl = document.getElementById("grpingroup");
    grpingrp = this.parentElement.id;
    lbl.innerHTML = grpingrp;
    document.getElementById("nameofgroup").value = "";
    document.getElementById("addgroupbox").style.display = "block";
    //lbl.setAttribute("for",grpingrp);
}

function AddSoldier() {
    sldrname = document.getElementById("nameofsoldier").value;
    radios = document.getElementsByName("pzm");
    for(i = 0; i < radios.length; i++){
        if(radios[i].checked){
            pzmof = radios[i].value;
        }
    }
    soldiers[sldrname] = {
        name : sldrname,
        pzm : pzmof
    };
    parentgrp = document.getElementById("sldringroup").innerText;
    groups[parentgrp].soldiers.push(sldrname);
    //alert(soldiers[sldrname].name + soldiers[sldrname].pzm);
    document.getElementById("addsoldierbox").style.display = "none";
}

function AddGroup() {
    //alert("hello");
    grpname = document.getElementById("nameofgroup").value;
    parentgrp = document.getElementById("grpingroup").innerText;
    groups[grpname] = {
        name : grpname,
        soldiers : [],
        parentgroup : parentgrp,
        subgroups : []
    };
    groups[parentgrp].subgroups.push(grpname);
    //alert(groups[grpname].name + groups[grpname].parentgroup);
    document.getElementById("addgroupbox").style.display = "none";
}

function CreateDivTree(temp) {
    //alert(temp);
    tempsubgrps = groups[temp].subgroups;
    for(i=0; i<tempsubgrps.length;i++){
        //alert(tempsubgrps[i]);
        CreateGroupDiv(temp,tempsubgrps[i]);
    }
    tempsldrs = groups[temp].soldiers;
    for(i=0;i<tempsldrs.length;i++){
        //alert(tempsldrs[i]);
        CreateSoldierDiv(temp,tempsldrs[i]);
    }
    
}

function CreateGroupDiv(parent,temp) {
    tempdiv = document.createElement("div");
    tempdiv.setAttribute("class","group-card");
    tempdiv.setAttribute("id",temp);
    check = document.createElement("input");
    check.setAttribute("type","checkbox");
    check.setAttribute("id",temp+"chckbox");
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

function CreateSoldierDiv(parent,temp) {
    tempdiv = document.createElement("div");
    tempdiv.setAttribute("id",temp);
    tempdiv.setAttribute("class","group-card");
    delbtn = document.createElement("button");
    delbtn.innerHTML = "del";
    txt = document.createTextNode(temp);
    
    tempdiv.appendChild(delbtn);
    tempdiv.appendChild(txt);
    
    document.getElementById(parent).appendChild(tempdiv);
}