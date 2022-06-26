class Ball extends Circle
{
    constructor(x, y, radius, color, speed, rocket1, rocket2)
    {
        super(x, y, radius, color);
        this.speed = speed;
        this.rocket1 = rocket1;
        this.rocket2 = rocket2;
    }

    setDirection(direction = null)
    {
        if(direction != null)
        {
            this.direction = direction;
        } 
        else this.direction = this.generateDirection();
    }

    generateDirection()
    {
        let x = 1;
        let y = 1;

        if(Math.random() <= 0.5) x = -1;
        if(Math.random() <= 0.5) y = -1;

        return {x: x, y: y};
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
        //colliding with second rocket`s bigger side
        if(this.rocket2.x - (this.x + this.radius) <= 0 
            && this.y >= this.rocket2.y && this.y <= this.rocket2.y + this.rocket2.height )
        {
            this.direction.x = -1;
        }

        //colliding with first rocket`s bigger side
        else if((this.x - this.radius) - (this.rocket1.x + this.rocket1.width) <= 0 
            && this.y >= this.rocket1.y && this.y <= this.rocket1.y + this.rocket1.height )
        {
            this.direction.x = 1;
        }

        //colliding with second rocket`s up side
        else if((this.x >= this.rocket2.x && this.x <= this.rocket2.x + this.rocket2.width)
            && this.rocket2.y.toFixed(0) == (this.y + this.radius).toFixed(0))
        {
            this.direction.y = -1;
        }

        
        //colliding with second rocket`s down side
        else if((this.x >= this.rocket2.x && this.x <= this.rocket2.x + this.rocket2.width)
            && (parseInt(this.y) - parseInt(this.radius) - (parseInt(this.rocket2.y) + parseInt(this.rocket2.height)) <= 1
            && parseInt(this.y) - parseInt(this.radius) >= (parseInt(this.rocket2.y) + parseInt(this.rocket2.height)))
           )
        {
            this.direction.y = 1;
        }

        //colliding with first rocket`s up side
        else if((this.x >= this.rocket1.x && this.x <= this.rocket1.x + this.rocket1.width)
            && this.rocket1.y.toFixed(0) == (this.y + this.radius).toFixed(0))
        {
            this.direction.y = -1;
        }

        
        //colliding with first rocket`s down side
        else if((this.x >= this.rocket1.x && this.x <= this.rocket1.x + this.rocket1.width)
            && (parseInt(this.y) - parseInt(this.radius) - (parseInt(this.rocket1.y) + parseInt(this.rocket1.height)) <= 1
            && parseInt(this.y) - parseInt(this.radius) >= (parseInt(this.rocket1.y) + parseInt(this.rocket1.height)))
           )
        {
            this.direction.y = 1;
        }
        //console.log(parseInt(this.y) - parseInt(this.radius), parseInt(this.rocket2.y), parseInt(this.rocket2.height));
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