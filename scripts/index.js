const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas, 'rgb(200, 255, 255)');

const rectangle = new Rectangle(10, 10, 100, 20, 'red');
const circle = new Circle(500, 200, 20, 'blue');

engine.addObject(rectangle);
engine.addObject(new Rectangle(2, 2, 3, 4, 'blue'));
engine.addObject(circle);

let animation_frame;
function loop()
{
    animation_frame = requestAnimationFrame(loop);
    engine.render();
}

loop()