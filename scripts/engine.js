class Engine
{
    game_objects = [];

    constructor(canvas, background_color)
    {
        this.canvas = canvas;
        this.background_color = background_color;
        this.context = canvas.getContext('2d');
    }

    render()
    {
        this.clear();

        const context = this.context;

        this.game_objects.forEach(function(game_object){
            //game_object.render(context);
            context.beginPath();
            //this.draw(canvas_context);
            game_object.draw(context);
            context.fill();
            console.log(game_object.x, game_object.y);
        });
        
    }

    clear()
    {
        this.context.fillStyle = this.background_color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addObject(game_object)
    {
        this.game_objects.push(game_object);
    }
}