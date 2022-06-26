const canvas = document.querySelector('canvas');
const scoreTables = document.querySelectorAll(".score-text");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas, 'rgb(200, 255, 255)');
const ui_manager = new UI(document.querySelector("#startModal"), document.querySelector("#gameUI"));

let win_score = 5;
let scores = [0, 0];

const rocket_margin = 20;
const rocket_speed = 20;
const rocket_width = canvas.width/20;
const rocket_height = canvas.height/3;
const start_rocket_y = canvas.height/2-rocket_height/2;

const ball_radius = 20;
const ball_start_direction = {x: -1, y: -1};

const rocket1 = new Rocket(rocket_margin, start_rocket_y, rocket_width, rocket_height, 'red');
const rocket2 = new Rocket(canvas.width - rocket_width - rocket_margin, start_rocket_y, rocket_width, rocket_height, 'blue');
const ball = new Ball(canvas.width/2, canvas.height/2, ball_radius, 'green', 2, rocket1, rocket2);
ball.setDirection(ball_start_direction);
ball.setGatesCollidAction(function(gate_index){
    scores[gate_index]++;

    scoreTables[0].innerHTML = scores[0];
    scoreTables[1].innerHTML = scores[1];

    if(scores[0] >= win_score)
    {
        engine.clear();
        engine.stop();
        alert('First win!');
        scores = [0, 0];
        ui_manager.stop();

        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        rocket1.y = start_rocket_y;
        rocket2.y = start_rocket_y;
        scores = [0, 0];

    }
    else if(scores[1] >= win_score)
    {
        engine.clear();
        engine.stop();
        alert('Second win!');
        scores = [0, 0];
        ui_manager.stop();

        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        rocket1.y = start_rocket_y;
        rocket2.y = start_rocket_y;
    }
    else
    {
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
    }
    
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
});

ui_manager.setStartAction(function(scores){
    engine.start();
    win_score = scores;
});

//engine.start();
let animation_frame;
function loop()
{
    animation_frame = requestAnimationFrame(loop);
    engine.render();
}

loop();