class BallSpeed extends Bonus
{
    constructor(x, y, ball, ball_speed, ball_color, bonus_time, real_ball_speed, real_ball_color)
    {
        super(x, y, 25, 'yellow', ball);
        this.ball_speed = ball_speed;
        this.ball_color = ball_color;
        this.bonus_time = bonus_time;
        this.real_ball_speed = real_ball_speed;
        this.real_ball_color = real_ball_color;
    }

    bonusAction()
    {
        let ball = this.ball;

        ball.speed = this.ball_speed;
        ball.color = this.ball_color;

        let real_ball_speed = this.real_ball_speed;
        let real_ball_color = this.real_ball_color;

        setTimeout(function(){
            ball.speed = real_ball_speed;
            ball.color = real_ball_color;
        }, this.bonus_time);
    }

    render(canvas_context)
    {
        super.render(canvas_context);

        canvas_context.beginPath();
        canvas_context.arc(this.x+2, this.y+2, this.radius+1, 0, Math.PI * 2, false);
        canvas_context.fillStyle = 'white';
        canvas_context.fill();

        canvas_context.beginPath();
        canvas_context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        canvas_context.fillStyle = this.color;
        canvas_context.fill();
    }
}