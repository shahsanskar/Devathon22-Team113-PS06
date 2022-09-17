
var elevators = [];


for(let i=0;i<numElevators;i++) {
  elevators.push({
    element: building.childNodes[i],
    number: i,
    passengers: 0,
    capacity: elevatorCapacity,
    workingTime: 0,
    floor: 0,
    to: [],
    direction: 0,
    default: true,
    defaultFloor: 0,
    minFloor: 0,
    maxFloor: numFloors,
  });
}

function updateState() {
  for(var i=0;i<numElevators;i++) {
    let e = elevators[i];
    e.floor += e.direction;
    if(e.to.length == 0 || e.floor == e.to[0]) {
      e.direction = 0;
      if(e.to.length) e.to.shift();
    }
    if(e.to.length) {
      if(e.floor < e.to[0]) e.direction = 1;
      else if(e.floor > e.to[0]) e.direction = -1;
    } else if(e.default) {
      if(e.floor < e.defaultFloor) e.direction = 1;
      else if(e.floor > e.defaultFloor) e.direction = -1;
    }
    if(marked[e.floor]?.elevator == e) {
      console.log(marked[e.floor]);
      marked[e.floor].target.classList.remove('highlight');
    }
    draw(e);
  }
  setTimeout(updateState, 1000);
}

function draw(elevator) {
  for(let i=0;i<numFloors;i++) {
    elevator.element.childNodes[i].classList.remove('highlight');
  }
  var el = elevator.element.childNodes[numFloors - elevator.floor - 1];
  el.classList.add('highlight');

}


function closestLift(floor) {
  var closest = elevators[0];
  for(var e in elevators) {
    console.log(elevators[e].floor - floor);
    if(closest.floor - floor > elevators[e].floor - floor) {
      closest = elevators[e];
    }
  }
  return closest;
}



function getLift(order) {
  return closestLift(order.from);
}

function assignLift(elevator, order) {
  elevator.workingTime += Math.abs(order.from - order.to);
  console.log(elevator, order);
  elevator.to.push(order.from);
  return elevator;
}

var curr;

function order(floor, direction) {
  if(direction == 1) {
    let o = {from: floor, to: floor + 1};
    curr = assignLift(getLift(o), o);
    marked[floor].elevator = curr;
  } else if(direction == -1) {
    let o = {from: floor, to: floor - 1};
    curr = assignLift(getLift(o), o);
    marked[floor].elevator = curr;
  } else {
    if(curr) {
      curr.to.push(floor);
      marked[floor].elevator = curr;
    }
  }
}

updateState();
