// Start Scene
class StartScene extends Phaser.Scene {
    constructor() {
        super("StartScene");
    }
    preload() {
        this.load.image("startBg", "assets/background.png"); // your border image
        this.load.image("button", "assets/playbutton.png"); // Load button
    }
    create() {
        this.add.image(0, 0, "startBg").setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height).setScale(1); // Set background image
        // Create an "Credits" button
        const CreditsButton = this.add.image(this.scale.width / 2, this.scale.height / 2, 'button')
            .setScale(0.75)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("CharacterScene"); // Switch to CharacterScene
            });
    }
}

// Choose Character Scene
class CharacterScene extends Phaser.Scene {
    constructor() {
        super({ key: "CharacterScene" });
    }
    preload() {
        this.load.image("charactersBg", "assets/peach.png"); // Load characters background

        this.load.image("instructions", "assets/instructionsbutton.png"); // Load button

        this.load.image("chick", "assets/baby_chick_3d.png");
        this.load.image("blackcat", "assets/black_cat_3d.png");
        this.load.image("lightcat", "assets/cat_3d.png");
        this.load.image("chipmunk", "assets/chipmunk_3d.png");
        this.load.image("cow", "assets/cow_3d.png");
        this.load.image("dog", "assets/dog_3d.png");
        this.load.image("poodle", "assets/poodle_3d.png");
        this.load.image("gorilla", "assets/gorilla_3d.png");
        this.load.image("hedgehog", "assets/hedgehog_3d.png");
        this.load.image("honeybee", "assets/honeybee_3d.png");
        this.load.image("monkey", "assets/monkey_3d.png");
        this.load.image("pig", "assets/pig_3d.png");
        this.load.image("rabbit", "assets/rabbit_3d.png");
        this.load.image("tiger", "assets/tiger_3d.png");
    }
    create() {
        const bg = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2,
            "charactersBg"
        );

        // Auto-scale to fit screen
        const scaleX = this.scale.width / bg.width;
        const scaleY = this.scale.height / bg.height;
        const scale = Math.max(scaleX, scaleY);
        bg.setScale(scale);

        bg.setDepth(0);

        const characterPositions = [
            { key: "chick", x: 100, y: 150 },
            { key: "blackcat", x: 250, y: 150 },
            { key: "lightcat", x: 395, y: 150 },
            { key: "chipmunk", x: 537.5, y: 150 },
            { key: "cow", x: 700, y: 150 },
            { key: "dog", x: 100, y: 290 },
            { key: "poodle", x: 250, y: 290 },
            { key: "gorilla", x: 395, y: 290 },
            { key: "hedgehog", x: 537.5, y: 290 },
            { key: "honeybee", x: 710, y: 290 },
            { key: "monkey", x: 185, y: 430 },
            { key: "pig", x: 325, y: 430 },
            { key: "rabbit", x: 475, y: 430 },
            { key: "tiger", x: 625, y: 430 }
        ];

        this.add.text(400, 50, "Choose Your Character", {fontFamily: 'Nunito', stroke: '#000000', strokeThickness: 1.9, fontSize: "40px", fill: "#000000" }).setOrigin(0.5);

        let selectedAnimalKey = null;
        let greenOutline = this.add.graphics();
        greenOutline.lineStyle(6, 0x00FF00);
        greenOutline.strokeRect(0, 0, 90, 90);
        greenOutline.setVisible(false);

        const handleCharacterSelection = (characterKey, image) => {
            greenOutline.x = image.x - image.width * 0.3 / 2 - 5; // Adjust x based on scale and outline width
            greenOutline.y = image.y - image.height * 0.31 / 2 - 5; // Adjust y based on scale and outline width
            greenOutline.setVisible(true);
            selectedAnimalKey = characterKey;
            this.game.global.selectedCharacterKey = characterKey; // Store the key globally
            console.log('Selected character:', this.game.global.selectedCharacterKey);
        };

        characterPositions.forEach(charInfo => {
            const image = this.add.image(charInfo.x, charInfo.y, charInfo.key).setScale(0.35);
            image.setInteractive();
            image.on('pointerdown', () => handleCharacterSelection(charInfo.key, image));
        });

        const instructionsButton = this.add.image(395, 570, 'instructions')
            .setScale(0.350)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("InstructionScene");
            });
    }
}

// Instruction Scene
class InstructionScene extends Phaser.Scene {
    constructor() {
        super("InstructionScene");
    }
    preload() {
        this.load.image("instructionsBg", "assets/peach.png"); // Load home background
        this.load.image("start", "assets/start.jpg"); // Load button
    }
    create() {
        this.add.image(612, 598, "instructionsBg").setScale(1.5); // Set background image
        this.add.text(25, 25, "Game Instructions", {fontFamily: 'Nunito',stroke: '#000000', strokeThickness: 1.5, fontSize: "35px", fill: "black" });
        this.add.text(40, 75, "Use arrow keys to move (up arrow to jump)", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 125, "Solve chemistry problems to avoid obstacles", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 175, "If you get the question wrong, you have one more try.", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 225, "If you got your second try wrong, the correct answer and explanation", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 275, "will pop up. The obstacle will disappear after that.", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 325, "Get through all the obstacles", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 375, "Match the chemistry symbol ⚛️ to win the game!", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 425, "There will be subscripts and charges in some of the problems.", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 470, "Remember: _ and a number means a subscript", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" }); 
        this.add.text(40, 525, "Good luck & have fun!", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });

        const startButton = this.add.image(675, 75, 'start')
        .setScale(0.20)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("HomeScene");
            });
    }
}

// Home Scene (List of Levels)
class HomeScene extends Phaser.Scene {
    constructor() {
        super("HomeScene");
    }
    preload() {
        this.load.image("homeBg", "assets/peach.png"); // Load home background
        this.load.image("creditbutton", "assets/creditbutton.png"); // Load button
    }
    create() {
        this.add.image(612, 598, "homeBg").setScale(1.5); // Set background image
        this.add.text(25, 25, "Select a Level", {stroke: '#000000', strokeThickness: 1.9, fontFamily: 'Nunito', fontSize: "40px", fill: "black" });

        if (!this.game.global.leastConfidentUnit) {
            const unit = prompt("Which unit are you least confident with? Unit 1-9? Type the unit number below");
            this.game.global.leastConfidentUnit = unit;
            alert("My least confident unit is " + unit);
        }

        if (!this.game.global.leastConfidentQuestions) {
            const question = prompt("Multiple Choice? Free Response? Both?");
            this.game.global.leastConfidentQuestions = question;
            alert("My least confident type question is " + question);
        }

        const levelData = [
            { key: "Level1", x: 200, y: 180, label: "1" },
            { key: "Level2", x: 400, y: 180, label: "2" },
            { key: "Level3", x: 600, y: 180, label: "3" },
            { key: "Level4", x: 200, y: 300, label: "4" },
            { key: "Level5", x: 400, y: 300, label: "5" },
            { key: "Level6", x: 600, y: 300, label: "6" },
            { key: "Level7", x: 200, y: 420, label: "7" },
            { key: "Level8", x: 400, y: 420, label: "8" },
            { key: "Level9", x: 600, y: 420, label: "9" },
        ];

        levelData.forEach((level) => {
            // Create a circle for the button
            const circle = this.add.circle(level.x, level.y, 35, 0xF6CEFC); // Example fill color
            circle.setInteractive(); // Make it clickable

            // Style the circle to have a black stroke (border)
            circle.setStrokeStyle(2, 0x000000); // 2 is the thickness, 0x000000 is black
            circle.alpha = 0.8;

            // Create text for the button label
            const text = this.add.text(level.x, level.y, level.label, {
                fontFamily: 'Nunito',
                stroke: '#000000',
                strokeThickness: 1.9,
                fontSize: '40px',
                fill: '#000000',
                align: 'center',
            }).setOrigin(0.5);

            // Add a glow effect on hover (optional)
            circle.on('pointerover', () => {
                circle.setFillStyle(0x80ff75);
                circle.alpha = 1;
            });

            circle.on('pointerout', () => {
                circle.setFillStyle(0x80ff75);
                circle.alpha = 0.8;
            });

            // Handle button click to start the level
            circle.on('pointerdown', () => {
                if (this.game.global.selectedCharacterKey) {
                    this.scene.start(level.key);
                } else {
                    alert("Please choose a character before playing the game! Thank you.");
                }
            });
        });

        const instructionsButton = this.add.image(400, 550, 'instructions')
        .setScale(0.350)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("InstructionScene");
            });

        const CreditsButton = this.add.image(650, 50, 'creditbutton')
            .setScale(0.50)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("CreditsScene"); // Switch to CreditsScene
            });
    }
}

// Credits Scene
class CreditsScene extends Phaser.Scene {
    constructor() {
        super("CreditsScene");
    }
    preload() {
        this.load.image("creditsBg", "assets/peach.png"); // Load credits background
        this.load.image("buttonone", "assets/home.png");
    }
    create() {
        this.add.image(612, 598, "creditsBg").setScale(1.5); // Set background image

        this.add.text(325, 50, "Credits", {fontFamily: 'Nunito', stroke: '#000000', strokeThickness: 1.9, fontSize: '50px', fill: 'black'});
        this.add.text(325, 150, "Made By", {fontFamily: 'Nunito', stroke: '#000000', strokeThickness: 1.9, fontSize: "40px", fill: "black" });
        this.add.text(230, 250, "⚛️ Nancy Chen ⚛️", {fontFamily: 'Nunito', fontSize: "40px", fill: "black" });
        this.add.text(240, 350, "⚛️ Tina Xiao ⚛️", {fontFamily: 'Nunito', fontSize: "40px", fill: "black" });

        const HomeButton = this.add.image(400, 475, 'buttonone')
            .setScale(0.5)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("HomeScene"); // Switch to CreditsScene
            });
    }
}

// Level 1 Scene
class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1");
        this.score = 0; // Initialize the score
        this.scoreText = null; // Variable to hold the score text object
        this.obstacle = null; // To hold the red obstacle
        this.obstacleActive = true;
    }
    preload() {
        this.load.image("home", "assets/home.png"); // Load home button
        this.load.image('sky', './assets/sky.png');
        this.load.image('ground', './assets/platform2.jpg');
        this.load.image('groundOne', './assets/platform.png');
        this.load.image('onenote', './assets/atom_symbol_3d.png'); // Singular chem note
        this.load.image('redObstacle', './assets/obstacle.png'); // Load the red obstacle image
    }
    create() {
        this.input.on('pointerdown', (pointer) => {
            console.log(pointer.x, pointer.y);
            this.add.circle(pointer.x, pointer.y, 5, 0xff0000);
        });

        this.score = 0; // Reset the score when the level starts
        this.obstacleActive = true; // Reset the obstacle flag
        this.add.sprite(0,0,'sky').setScale(2);

        const platforms = this.physics.add.staticGroup();
        const floor = this.physics.add.staticGroup();
        const notes = this.physics.add.group(); // Create a group for the musical notes
        this.notes = notes; // Store the notes group in the scene

        // Create the ground platforms

        // Create the green floors and place notes on them
        floor.create(25,175,'groundOne').setScale(1).refreshBody();
        this.placeNotesOnFloor(25, 175, floor);
        floor.create(25,325,'groundOne').setScale(1).refreshBody();
        this.placeNotesOnFloor(25, 325, floor);
        floor.create(550,100,'groundOne').setScale(1).refreshBody();
        this.placeNotesOnFloor(550, 100, floor);
        floor.create(550,250,'groundOne').setScale(1).refreshBody();
        this.placeNotesOnFloor(550, 250, floor);
        floor.create(550,400,'groundOne').setScale(1).refreshBody();
        this.placeNotesOnFloor(550, 400, floor);

        // Create the red obstacle
        this.obstacle = this.physics.add.sprite(285, 220, 'redObstacle').setScale(0.15,1);
        this.obstacle.setImmovable(true);
        this.obstacle.setActive(true).setVisible(true); // Ensure the obstacle is active and visible
        this.physics.world.enableBody(this.obstacle); // Re-enable the physics body

        const chosenAnimalKey = this.game.global.selectedCharacterKey;
        let player;
        switch (chosenAnimalKey) {
            case 'chick':
                player = this.add.sprite(100, 300, 'chick').setScale(0.25);
                player.flipX = true;
                break;
            case 'blackcat':
                player = this.add.sprite(100, 300, 'blackcat').setScale(0.25);
                player.flipX = true;
                break;
            case 'lightcat':
                player = this.add.sprite(30, 465, 'lightcat').setScale(0.25);
                player.flipX = true;
                break;
            case 'chipmunk':
                player = this.add.sprite(30, 465, 'chipmunk').setScale(0.25);
                player.flipX = true;
                break;
            case 'cow':
                player = this.add.sprite(30, 465, 'cow').setScale(0.25);
                player.flipX = true;
                break;
            case 'dog':
                player = this.add.sprite(30, 465, 'dog').setScale(0.25);
                player.flipX = true;
                break;
            case 'poodle':
                player = this.add.sprite(30, 465, 'poodle').setScale(0.25);
                player.flipX = true;
                break;
            case 'gorilla':
                player = this.add.sprite(30, 465, 'gorilla').setScale(0.25);
                player.flipX = true;
                break;
            case 'hedgehog':
                player = this.add.sprite(30, 465, 'hedgehog').setScale(0.25);
                player.flipX = true;
                break;
            case 'honeybee':
                player = this.add.sprite(30, 465, 'honeybee').setScale(0.25);
                player.flipX = true;
                break;
            case 'monkey':
                player = this.add.sprite(30, 465, 'monkey').setScale(0.25);
                player.flipX = true;
                break;
            case 'pig':
                player = this.add.sprite(30, 465, 'pig').setScale(0.25);
                player.flipX = true;
                break;
            case 'rabbit':
                player = this.add.sprite(30, 465, 'rabbit').setScale(0.25);
                player.flipX = true;
                break;
            case 'tiger':
                player = this.add.sprite(30, 465, 'tiger').setScale(0.25);
                player.flipX = true;
                break;
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 636,
    scene: [StartScene, CharacterScene, InstructionScene, HomeScene, CreditsScene, Level1],
    physics: { // Add this physics configuration
        default: 'arcade', // Use the Arcade Physics system
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
game.global = { 
    selectedCharacterKey: null,
    leastConfidentUnit: null,
    leastConfidentQuestions: null 
};