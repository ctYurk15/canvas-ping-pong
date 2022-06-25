class Engine
{
    game_objects = [];
    keys = {};
    button_actions = [];

    constructor(canvas, background_color)
    {
        this.canvas = canvas;
        this.background_color = background_color;
        this.context = canvas.getContext('2d');

        this.registerEvents();
    }

    registerEvents()
    {
        this.checkButtonsPress();
    }

    addButtonPressEvent(button, action)
    {
        this.button_actions.push({key: button, action: action});
    }

    render()
    {
        this.clear();

        const context = this.context;

        this.game_objects.forEach(function(game_object){
            game_object.render(context);
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

    checkButtonsPress()
    {
        const self = this;

        window.addEventListener('keydown', (e) => {
            
            self.keys[e.key] = true;
            //console.log(self.keys);
            self.button_actions.forEach(function(button_action){
                
                if(self.keys[button_action.key])
                {
                    button_action.action();
                }

            });
        });

        window.addEventListener('keyup', (e) => {
            self.keys[e.key] = false;

        });
    }

}