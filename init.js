
var numElevators = 5;
var numFloors = 20;
var elevatorCapacity = 20;

var marked = [];

var building = document.createElement('div');
building.classList.add('building');
document.body.appendChild(building);

var button = document.createElement('div');
button.id = 'button';

var ctrl = document.createElement('div');
ctrl.classList.add('controls');
document.body.appendChild(ctrl);

function reset() {
  document.removeChild(building);
  building = document.createElement('div');
  building.classList.add('building');
  document.body.appendChild(building);
}

function init() {
  for(var i=0;i<numElevators;i++) {
    var e = document.createElement('div');
    e.classList.add('elevator');
    for(var j=0;j<numFloors;j++) {
      var f = document.createElement('div');
      f.classList.add('floor');
      e.appendChild(f);
    }
    building.appendChild(e);
  }
  for(var j=0;j<numFloors;j++) {
    var b1 = document.createElement('div');
    var b2 = document.createElement('div');
    var b3 = document.createElement('div');
    var bb = document.createElement('div');
    b1.innerText = '^';
    b2.innerText = 'v';
    b3.innerText = '-';
    let ind = j;
    b1.onclick = (a) => {
      a.target.classList.add('highlight');
      let floor = numFloors - ind - 1;
      marked[floor] = { target: a.target};
      order(floor, 1);
    }
    b2.onclick = (a) => {
      a.target.classList.add('highlight');
      let floor = numFloors - ind - 1;
      marked[floor] = { target: a.target};
      order(floor, -1);
    }
    b3.onclick = (a) => {
      a.target.classList.add('highlight');
      let floor = numFloors - ind - 1;
      marked[floor] = { target: a.target};
      order(floor);
    }

    b1.classList.add('up', 'btn');
    b2.classList.add('down', 'btn');
    b3.classList.add('to', 'btn');
    bb.appendChild(b1);
    bb.appendChild(b2);
    bb.appendChild(b3);
    bb.classList.add('btn');
    
    button.appendChild(bb);
  }
  building.appendChild(button);
}

var c = [];

function addCtrl(name, callback) {
  var b = document.createElement('div');
  b.innerText = name;
  b.classList.add("ctrlbtn")
  b.onclick = callback;
  ctrl.appendChild(b);
  c.push(b);
}

function controls() {

  addCtrl("disable defaults", () => {
    if(c[0].innerText == "disable defaults") {
      c[0].innerText = "enable defaults";
      for(let i=0;i<numElevators;i++) {
        elevators[i].default = false;
      }
    } else {
      c[0].innerText = "disable defaults";
      for(let i=0;i<numElevators;i++) {
        elevators[i].default = true;
      }
    }
  });


  addCtrl("distribute defaults", () => {
    if(c[1].innerText == "distribute defaults") {
      c[1].innerText = "set default 0";
      for(let i=0;i<numElevators;i++) {
        elevators[i].defaultFloor = Math.floor(i / numElevators * numFloors);
      }
    } else {
      c[1].innerText = "distribute defaults";
      for(let i=0;i<numElevators;i++) {
        elevators[i].defaultFloor = 0;
      }
    }
  });
}





init();
controls();










