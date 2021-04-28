cycles = {
}

for (i = 1; i <= 7; i++) {
  name = "pzm_" + i.toString();
  cycles[name] = [];
  //alert(cycles[name]);
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