class UI
{
    constructor(start_modal, gameUI)
    {
        this.start_modal = start_modal;
        this.gameUI = gameUI;

        this.registerEvents();
    }

    setStartAction(action)
    {
        this.startGameFunction = action;
    }

    start()
    {
        this.start_modal.classList.add('hidden');
        this.gameUI.classList.remove('hidden');

        const scoreTables = document.querySelectorAll(".score-text");
        scoreTables[0].innerHTML = '0';
        scoreTables[1].innerHTML = '0';
    }

    getColors()
    {
        let first_rocket_color = document.querySelector("#firstRocketColorInput").value;
        let second_rocket_color = document.querySelector("#secondRocketColorInput").value;

        return [first_rocket_color, second_rocket_color]
    }

    stop()
    {
        this.start_modal.classList.remove('hidden');
        this.gameUI.classList.add('hidden');
    }

    registerEvents()
    {
        const self = this;

        document.getElementById("startButton").addEventListener('click', function(){
            self.start();
            self.startGameFunction(document.getElementById("scoresInput").value);
        });
    }
}