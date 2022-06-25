const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas, 'rgb(200, 255, 255)');

const rocket_margin = 20;
const rocket_speed = 5;
const rocket_width = canvas.width/20;
const rocket_height = canvas.height/3;
const start_rocket_y = canvas.height/2-rocket_height/2;

const ball_radius = 20;
const ball_start_direction = {x: -1, y: 1};
const scores = [0, 0];

const rocket1 = new Rocket(rocket_margin, start_rocket_y, rocket_width, rocket_height, 'red');
const rocket2 = new Rocket(canvas.width - rocket_width - rocket_margin, start_rocket_y, rocket_width, rocket_height, 'blue');
const ball = new Ball(canvas.width/2, canvas.height/2, ball_radius, 'green', 2, rocket1, rocket2);
ball.setDirection(ball_start_direction);
ball.setGatesCollidAction(function(gate_index){
    scores[gate_index]++;

    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
});

engine.addObject(rocket1);
engine.addObject(rocket2);
engine.addObject(ball);

engine.addButtonPressEvent('w', function(){
    rocket1.move(-1*rocket_speed, canvas.height);
});
engine.addButtonPressEvent('s', function(){
    rocket1.move(rocket_speed, canvas.height);
});
engine.addButtonPressEvent('ArrowUp', function(){
    rocket2.move(-1*rocket_speed, canvas.height);
});
engine.addButtonPressEvent('ArrowDown', function(){
    rocket2.move(rocket_speed, canvas.height);
});

engine.addFrameAction(function(){
    ball.move(canvas.height, canvas.width);
    console.log(scores);
});

let animation_frame;
function loop()
{
    animation_frame = requestAnimationFrame(loop);
    engine.render();
}

loop();