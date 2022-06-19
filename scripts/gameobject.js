class GameObject
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    draw(canvas_context)
    {
        /*canvas_context.beginPath();
        canvas_context.arc(this.x, this.y, 30, 0, Math.PI * 2, false);
        canvas_context.fillStyle = this.color;
        canvas_context.fill();*/
    }

    render(canvas_context)
    {
        canvas_context.beginPath();
        //this.draw(canvas_context);
        canvas_context.arc(this.x, this.y, 30, 0, Math.PI * 2, false);
        canvas_context.fillStyle = this.color;
        canvas_context.fill();
    }
}