class BallSize extends Bonus
{
    constructor(x, y, ball, ball_radius, bonus_time, real_ball_radius)
    {
        super(x, y, 25, 'aqua', ball, bonus_time);
        this.ball_radius = ball_radius;
        this.real_ball_radius = real_ball_radius;
    }

    bonusAction()
    {
        let ball = this.ball;
        let real_ball_radius = this.real_ball_radius;
        ball.radius = this.ball_radius;

        setTimeout(function(){
            ball.radius = real_ball_radius;
        }, this.bonus_time);
    }

    draw(canvas_context)
    {
        const particle_radius = 5;
        let particles_count = parseInt(Math.random() * 20) + 1;
        particles_count = Math.max(particles_count, 10);

        for(let i = 0; i < particles_count; i++)
        {
            let x = Math.random() * this.radius + 1;
            let y = Math.random() * this.radius + 1;

            canvas_context.arc(this.x + x, this.y+y, particle_radius, 0, Math.PI * 2, false);
            canvas_context.fillStyle = this.color;

        }
    }
}