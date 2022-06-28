class Bonus extends Circle
{
    constructor(x, y, radius, color, ball, bonus_time)
    {
        super(x, y, radius, color);
        this.ball = ball;
        this.bonus_time = bonus_time;
    }

    setCollisionFunction(collisionFunction)
    {
        this.collisionFunction = collisionFunction;
    }

    render(canvas_context)
    {
        super.render(canvas_context);
        this.checkBallCollision();
    }

    checkBallCollision()
    {
        const distance = Math.hypot(this.x - this.ball.x, this.y - this.ball.y);
        if(distance - this.radius - this.ball.radius <= 1)
        {
            this.bonusAction();
            this.collisionFunction();
        }
    }

    bonusAction()
    {
        //...
    }
}