(function(){
var canvas;
var context;
var current_grid = [];
var next_grid = [];

var hue = grn(16,255)
var saturation = grn(20,60)
var lightness = grn(20,80)
var rules;

document.addEventListener("DOMContentLoaded",init,false);

function init(){
  canvas = document.querySelector('canvas');
  context = canvas.getContext('2d');
  canvas.width = window.screen.availWidth;
  canvas.height = window.screen.availHeight;
  for(var i = 0; i < canvas.width; i++){
    current_grid.push([]);
    next_grid.push([]);
    for(var j = 0; j < canvas.height; j++){
      current_grid[i].push(0);
      next_grid[i].push(0);
    }
  }
  rules = {
    "000":0,
    "001":grn(0,1),
    "010":grn(0,1),
    "011":grn(0,1),
    "100":grn(0,1),
    "101":grn(0,1),
    "110":grn(0,1),
    "111":grn(0,1),
  }
  for (var i = 2; i < canvas.width/2 -2; i++){
    current_grid[i][2] = grn(0,1);
  }
  draw();
  context.fillRect(20,20,20,20);
  window.setInterval(main,"1");
}

function main(){
  for(var i = 2; i < (canvas.width/2) - 2; i++){
    for(var j = 2; j < (canvas.height/2) - 2; j++){
      if (current_grid[i][j] == 1){
        next_grid[i][j] = 1;
      }
      else{
        next_grid[i][j] = rules[get_neighbours(i,j)];
      }
    }
  }
  current_grid = next_grid;
  next_grid = [];
  for(var i = 0; i < canvas.width/2; i++){
    next_grid.push([]);
    for(var j = 0; j < canvas.height/2; j++){
      next_grid[i].push(0);
    }
  }
  draw()
}

function draw(){
  context.clearRect(0,0,canvas.width,canvas.height);
  context.fillStyle = "hsl("+hue+","+saturation+"%,"+lightness+"%)";
  context.fillRect(0,0,canvas.width,canvas.height);
  context.fillStyle = "hsl("+(hue-8)+","+saturation+"%,"+(lightness-8)+"%)";;
  for(var i = 0; i < canvas.width/2; i++){
    for(var j = 0; j < canvas.height/2; j++){
      if (current_grid[i][j]){
        context.fillRect(i*2,j*2,2,2);
      }
    }
  }
  context.fillStyle = "hsl("+(hue-16)+","+saturation+"%,"+(lightness-16)+"%)";
  context.fillRect(0,0,4,canvas.height);
  context.fillRect(0,0,canvas.width,4);
  context.fillRect(canvas.width-4,0,4,canvas.height);
  context.fillRect(0,canvas.height-4,canvas.width,4);
}

function get_neighbours(x,y){
  neighbours = "";
  for(var i = x-1; i < x+2; i++ ){
    neighbours += current_grid[i][y-1];
  }
  return neighbours;
}
function grn(min, max){
    		return Math.floor(Math.random() * (max - min+1)) + min;
}

})()
