class BallRandom extends Bonus
{
    transparency = 0.5;
    balls_count = 8;
    colors = [];

    constructor(x, y, ball, bonus_time)
    {
        super(x, y, 25, 'white', ball, bonus_time);
        this.generateBallCurver();
        this.generateColors();
    }

    generateColors()
    {
        for(let i = 0; i < this.balls_count; i++)
        {
            this.colors.push('rgba('+parseInt(Math.random() * 256)+', '+parseInt(Math.random() * 256)+', '+parseInt(Math.random() * 256)+', '+this.transparency+')');
        }
    }

    generateBallCurver()
    {
        let x = parseInt((Math.random() * 7) + 1) / 10;
        let y = parseInt((Math.random() * 7) + 1) / 10;

        this.ball_curver = {x: x, y: y};
    }

    bonusAction()
    {
        let ball = this.ball;

        ball.curver = this.ball_curver;

        setTimeout(function(){
            ball.curver = {x: 0, y: 0}
        }, this.bonus_time);
    }

    draw(canvas_context)
    {
        // ...
    }

    render(canvas_context)
    {
        super.render(canvas_context);

        for(let i = 0; i < this.balls_count; i++)
        {
            canvas_context.beginPath();
            canvas_context.arc(this.x+(i+3), this.y+(i+3), this.radius/1.25, 0, Math.PI * 2, false);
            canvas_context.fillStyle = this.colors[i];
            canvas_context.fill();
        }
    }
}