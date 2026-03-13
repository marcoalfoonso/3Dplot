const canvas = document.getElementById("robotCanvas");
const ctx = canvas.getContext("2d");

let l1 = 120;
let l2 = 100;
let b1 = 50;
let b2 = 50;

let q1 = 0.5;
let q2 = 0.5;
let q3 = 0.5;

function FK(){

let P0 = {x:0, y:0, z:b1};

let P1 = {x:0, y:0, z:b1+b2};

let P2 = {
x: l1*Math.cos(q1)*Math.cos(q2),
y: l1*Math.sin(q1)*Math.cos(q2),
z: b1+b2 - l1*Math.sin(q2)
};

let P3 = {
x: l2*(Math.cos(q1)*Math.cos(q2)*Math.cos(q3) - Math.cos(q1)*Math.sin(q2)*Math.sin(q3)) + l1*Math.cos(q1)*Math.cos(q2),
y: l1*Math.cos(q2)*Math.sin(q1) - l2*(Math.sin(q1)*Math.sin(q2)*Math.sin(q3) - Math.cos(q2)*Math.cos(q3)*Math.sin(q1)),
z: b1+b2 - l2*(Math.cos(q2)*Math.sin(q3) + Math.cos(q3)*Math.sin(q2)) - l1*Math.sin(q2)
};

return [P0,P1,P2,P3];
}

// proyección 3D simple
function project(p){

let scale = 2;

let x = canvas.width/2 + scale*(p.x - p.y*0.5);
let y = canvas.height/2 - scale*(p.z + p.y*0.5);

return {x,y};

}

function drawRobot(){

ctx.clearRect(0,0,canvas.width,canvas.height);

let points = FK();

ctx.strokeStyle="cyan";
ctx.lineWidth=4;

ctx.beginPath();

let p = project(points[0]);
ctx.moveTo(p.x,p.y);

for(let i=1;i<points.length;i++){

let pr = project(points[i]);
ctx.lineTo(pr.x,pr.y);

}

ctx.stroke();

for(let pt of points){

let pr = project(pt);

ctx.beginPath();
ctx.arc(pr.x,pr.y,6,0,Math.PI*2);
ctx.fillStyle="red";
ctx.fill();

}

}

function animate(){

q1 += 0.01;
q2 += 0.005;
q3 += 0.008;

drawRobot();

requestAnimationFrame(animate);

}

animate();