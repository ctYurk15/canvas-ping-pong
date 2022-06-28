const canvas = document.querySelector('canvas');
const scoreTables = document.querySelectorAll(".score-text");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas, 'rgb(200, 255, 255)');
const ui_manager = new UI(document.querySelector("#startModal"), document.querySelector("#gameUI"));

let win_score = 5;
let scores = [0, 0];

const bonus_probability = 100;
const bonus_x = canvas.width/2;
const bonus_lifetime = 10000; // in miliseconds

const ball_speed_lifetime = 7000;
const ball_random_lifetime = 8000;

const bonus_radius = 25;

const bonus_max_lifetime = 20000; // in miliseconds
const bonus_min_lifetime = 10000;

const rocket_margin = 20;
const rocket_speed = 27;
const rocket_width = canvas.width/20;
const rocket_height = canvas.height/3;
const start_rocket_y = canvas.height/2-rocket_height/2;

const ball_radius = 20;
const ball_speed = 3;
const ball_color = 'green';

const rocket1 = new Rocket(rocket_margin, start_rocket_y, rocket_width, rocket_height, 'red');
const rocket2 = new Rocket(canvas.width - rocket_width - rocket_margin, start_rocket_y, rocket_width, rocket_height, 'blue');
const ball = new Ball(canvas.width/2, canvas.height/2, ball_radius, ball_color, ball_speed, rocket1, rocket2);
ball.setDirection();

/*const ball_start_direction = {x: -1, y: -1};
ball.setDirection(ball_start_direction);*/

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

        ball.setDirection();
    }
    
});

engine.addObject(rocket1);
engine.addObject(rocket2);
engine.addObject(ball);

engine.addButtonPressEvent('w', function(){
    rocket1.move(-1*rocket_speed, canvas.height);
    //ball.y-= rocket_speed;
});
engine.addButtonPressEvent('s', function(){
    rocket1.move(rocket_speed, canvas.height);
    //ball.y += rocket_speed;
});

/*engine.addButtonPressEvent('a', function(){
    rocket1.move(-1*rocket_speed, canvas.height);
    ball.x-= rocket_speed;
});
engine.addButtonPressEvent('d', function(){
    rocket1.move(rocket_speed, canvas.height);
    ball.x += rocket_speed;
});*/
engine.addButtonPressEvent('ArrowUp', function(){
    rocket2.move(-1*rocket_speed, canvas.height);
});
engine.addButtonPressEvent('ArrowDown', function(){
    rocket2.move(rocket_speed, canvas.height);
});

engine.addFrameAction(function(){
    ball.move(canvas.height, canvas.width);
});

//spawning bonuses
engine.addFrameAction(function(){
    
    if(parseInt(Math.random() * bonus_probability) == 1 && engine.is_working)
    {
        //where we should spanw bonus
        let bonus_y = Math.random() * (canvas.height - bonus_radius*2) + bonus_radius*2;
        bonus_y = Math.min(bonus_y, canvas.height - bonus_radius*2);

        let bonus_time = parseInt(Math.random() * bonus_max_lifetime) + 1;
        bonus_time = Math.max(bonus_time, bonus_min_lifetime);

        //which bonus we should spawn
        let number = parseInt(Math.random() * 3) + 1;
        let bonus = null;

        switch(number)
        {
            case 1:
                bonus = new BallSize(bonus_x, bonus_y, ball, 5, bonus_time, ball_radius);
                break;
            case 2:
                bonus = new BallSpeed(bonus_x, bonus_y, ball, ball_speed*3, 'yellow', ball_speed_lifetime, ball_speed, ball_color);
                break;
            case 3:
                bonus = new BallRandom(bonus_x, bonus_y, ball, ball_random_lifetime);
                break;
        }

        if(bonus != null)
        {
            let bonus_id = engine.addObject(bonus);

            bonus.setCollisionFunction(function(){
                engine.deleteObject(bonus_id);
            });
            
            setTimeout(function(){
                engine.deleteObject(bonus_id);
            }, bonus_lifetime);
        }
    }

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