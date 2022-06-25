class Rocket extends Rectangle
{
    constructor(x, y, width, height, color)
    {
        super(x, y, width, height, color);
    }

    move(speed, canvas_height)
    {
        if(this.y + speed <= 0) this.y = 0;
        else if(this.y + speed + this.height >= canvas_height) this.y = this.y;
        else this.y += speed;
    }
}