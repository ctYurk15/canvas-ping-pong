class Ball extends Circle
{
    constructor(x, y, radius, color, speed, rocket1, rocket2)
    {
        super(x, y, radius, color);
        this.speed = speed;
        this.rocket1 = rocket1;
        this.rocket2 = rocket2;
    }

    setDirection(direction)
    {
        this.direction = direction;
    }

    setGatesCollidAction(action)
    {
        this.gates_collide_action = action;
    }

    checkBorderCollision(canvas_height)
    {
        if(this.y - this.radius <= 0)
        {
            this.direction.y = 1;
        }
        else if(this.y + this.radius >= canvas_height)
        {
            this.direction.y -= 1;
        }
    }

    checkRocketsCollision()
    {
        if(this.rocket2.x - (this.x + this.radius) <= 0 
            && this.y >= this.rocket2.y && this.y <= this.rocket2.y + this.rocket2.height )
        {
            this.direction.x = -1;
        }
        else if((this.x - this.radius) - (this.rocket1.x + this.rocket1.width) <= 0 
            && this.y >= this.rocket1.y && this.y <= this.rocket1.y + this.rocket1.height )
        {
            this.direction.x = 1;
        }
    }

    checkGatesCollision(canvas_width)
    {
        let gates = null;

        if(this.x - this.radius <= 0) gates = 0;
        else if(this.x + this.radius >= canvas_width) gates = 1;

        if(gates != null) this.gates_collide_action(gates);
    }

    move(canvas_height, canvas_width)
    {

        this.x = this.x + (this.direction.x * this.speed);
        this.y = this.y + (this.direction.y * this.speed);

        this.checkBorderCollision(canvas_height);
        this.checkRocketsCollision();
        this.checkGatesCollision(canvas_width);
    }
}