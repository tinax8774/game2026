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
        this.add.text(40, 100, "Use arrow keys to move (up arrow to jump)", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 150, "Solve chemistry problems to avoid obstacles", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 200, "If you get the question wrong, you have one more try.", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 250, "If you got your second try wrong, the correct answer and explanation", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 300, "will pop up. The obstacle will disappear after that.", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 350, "Get through all the obstacles", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 400, "Match the chemistry symbol ⚛️ to win the game!", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 450, "There will be subscripts and charges in some of the problems.", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 500, "Remember: _ and a number means a subscript", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });
        this.add.text(40, 550, "Good luck & have fun!", {fontFamily: 'Nunito', fontSize: "23px", fill: "black" });

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
        this.load.image("homeBg", "assets/peach.png");
        this.load.image("creditbutton", "assets/creditbutton.png"); // Load button
    }

    create() {
        this.add.image(612, 598, "homeBg").setScale(1.5); // Set background image

        if (!this.game.global.didIntroQuestions) {
            this.askIntroQuestions();
            this.game.global.didIntroQuestions = true;
        }

        this.add.text(25, 25, "Select a Level", {
            stroke: '#000000',
            strokeThickness: 1.9,
            fontFamily: 'Nunito',
            fontSize: "40px",
            fill: "black"
        });

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

        const unlocked = this.game.global.unlockedLevels;

        levelData.forEach((level) => {
            const levelNumber = parseInt(level.label);
            const isUnlocked = levelNumber <= unlocked;

            const circleColor = isUnlocked ? 0x84c7ff : 0xADADAD;

            const circle = this.add.circle(level.x, level.y, 35, circleColor);
            circle.setStrokeStyle(3, 0x000000);
            circle.alpha = isUnlocked ? 0.9 : 0.5;

            circle.setInteractive();

            const text = this.add.text(level.x, level.y, level.label, {
                fontFamily: 'Nunito',
                stroke: '#000000',
                strokeThickness: 1.9,
                fontSize: '40px',
                fill: '#000000',
                align: 'center',
            }).setOrigin(0.5);

            circle.on('pointerover', () => {
                if (isUnlocked) {
                    circle.setFillStyle(0x80ff75);
                    circle.alpha = 1;
                }
            });

            circle.on('pointerout', () => {
                circle.setFillStyle(circleColor);
                circle.alpha = isUnlocked ? 0.9 : 0.5;
            });

            circle.on('pointerdown', () => {
                if (!isUnlocked) {
                    alert("This level is locked. Complete previous levels first.");
                    return;
                }

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
    askIntroQuestions() {
        let unit = parseInt(prompt("Which AP Chemistry Unit are you least confident with? (1–9)"));
        if (isNaN(unit) || unit < 1 || unit > 9) unit = 1;
        this.game.global.leastConfidentUnit = unit;
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
        this.score = 0;
        this.winningScore = 100;
        this.scoreText = null;
        this.firstAttemptFailed = false;
    }

    preload() {
        this.load.image("home", "assets/home.png");
        this.load.image("sky", "./assets/sky.png");
        this.load.image("ground", "./assets/platform2.jpg");
        this.load.image("groundOne", "./assets/platform.png");

        // Chemistry note
        this.load.image("onenote", "./assets/atom_symbol_3d.png");

        // Obstacle
        this.load.image("redObstacle", "./assets/obstacle.png");
    }

    create() {
        this.score = 0;
        this.firstAttemptFailed = false;

        this.add.image(400, 318, "sky").setDisplaySize(800, 636);

        // Question bank (Units 1–9)
        this.chemQuestions = {
            1: [
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" }
            ],
            2: [
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" }
            ],
            3: [
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" }
            ],
            4: [
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" }
            ],
            5: [
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" }
            ],
            6: [
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" }
            ],
            7: [
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" }
            ],
            8: [
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" }
            ],
            9: [
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" },
                { q: "", a: "", exp: "" }
            ]
        };

        const platforms = this.physics.add.staticGroup();
        const floor = this.physics.add.staticGroup();
        const notes = this.physics.add.group();
        this.notes = notes;

        // Ground platforms
        platforms.create(90, 590, "ground").setScale(0.5, 0.75).refreshBody();
        platforms.create(180, 590, "ground").setScale(0.5, 0.75).refreshBody();
        platforms.create(270, 590, "ground").setScale(0.5, 0.75).refreshBody();
        platforms.create(360, 590, "ground").setScale(0.5, 0.75).refreshBody();
        platforms.create(450, 590, "ground").setScale(0.5, 0.75).refreshBody();
        platforms.create(540, 590, "ground").setScale(0.5, 0.75).refreshBody();
        platforms.create(630, 590, "ground").setScale(0.5, 0.75).refreshBody();
        platforms.create(720, 590, "ground").setScale(0.5, 0.75).refreshBody();

        // Floors + chemistry notes
        this.createFloorWithNotes(floor, 130, 205, 5);
        this.createFloorWithNotes(floor, 130, 355, 5);
        this.createFloorWithNotes(floor, 640, 130, 5);
        this.createFloorWithNotes(floor, 640, 280, 5);
        this.createFloorWithNotes(floor, 640, 430, 5);

        // Obstacle
        this.obstacles = this.physics.add.group();
        const obstaclePositions = [
            { x: 283, y: 147 },
            { x: 468.80, y: 64 },
            { x: 468.80, y: 215 },
            { x: 468.80, y: 367 },
            { x: 283, y: 298 }
        ];

        obstaclePositions.forEach(pos => {
            let obs = this.obstacles.create(pos.x, pos.y, "redObstacle").setScale(0.015, 0.2);
            obs.setImmovable(true);
        });

        // Disable obstacle collisions at start
        this.obstaclesActive = false;

        // Enable after 200ms
        this.time.delayedCall(200, () => {
            this.obstaclesActive = true;
        });

        // Character
        const chosen = this.game.global.selectedCharacterKey;
        let player = this.add.sprite(30, 465, chosen).setScale(0.25);
        player.flipX = true;

        this.physics.world.enable(player);
        player.body.gravity.y = 800;
        player.body.collideWorldBounds = true;

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, floor);
        this.physics.add.collider(player, this.notes, this.collectNote, null, this);
        this.physics.add.collider(player, this.obstacles, this.handleObstacleCollision, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = player;

        // Score text
        this.scoreText = this.add.text(
            16,
            16,
            "Score: 0/" + this.winningScore,
            { stroke: "#000", strokeThickness: 1.9, fontSize: "32px", fill: "#000" }
        );

        // Home button
        this.homeButton = this.add.image(390, 590, "home")
            .setScale(0.5)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("HomeScene");
            });

        this.time.delayedCall(100, () => {
            if (
                !this.game.global.leastConfidentUnit ||
                !this.chemQuestions[this.game.global.leastConfidentUnit]
            ) {
                this.game.global.leastConfidentUnit = 1;
            }

            this.leastConfidentUnit = this.game.global.leastConfidentUnit;
        });
    }

    createFloorWithNotes(floorGroup, x, y, count) {
        floorGroup.create(x, y, "groundOne").setScale(1).refreshBody();

        const noteY = y - 40;
        const spacing = 50;

        const startX = x - ((count - 1) / 2) * spacing;

        for (let i = 0; i < count; i++) {
            this.notes.create(startX + i * spacing, noteY, "onenote").setScale(0.15);
        }

        this.notes.getChildren().forEach(note => {
            note.body.setAllowGravity(false);
            note.body.immovable = true;
        });
    }

    collectNote(player, note) {
        note.disableBody(true, true);
        this.score += (100/25);
        this.scoreText.setText("Score: " + this.score + "/" + this.winningScore);

        if (this.score >= this.winningScore) {
            alert("Congrats, you completed level 1, you can try level 2.");

            // Unlock Level 2
            this.game.global.unlockedLevels = 2;

            this.homeButton.setVisible(true);
        }
    }

    handleObstacleCollision(player, obstacle) {
        if (!this.obstaclesActive) return;
        if (!obstacle.active) return;

        let unitQuestions = this.chemQuestions[this.leastConfidentUnit];
        if (!unitQuestions || unitQuestions.length === 0) return;

        let q = unitQuestions[Math.floor(Math.random() * unitQuestions.length)];

        let answer = prompt(q.q);
        if (answer && answer.trim().toLowerCase() === q.a.toLowerCase()) {
            obstacle.disableBody(true, true);
            return;
        }

        alert("Wrong. Try again.");
        let answer2 = prompt(q.q);

        if (answer2 && answer2.trim().toLowerCase() === q.a.toLowerCase()) {
            obstacle.disableBody(true, true);
            return;
        }

        alert("Correct answer: " + q.a + "\nExplanation: " + q.exp);

        let finalAnswer = "";
        while (finalAnswer.trim().toLowerCase() !== q.a.toLowerCase()) {
            finalAnswer = prompt("Please enter the correct answer to continue:");
        }

        obstacle.disableBody(true, true);
    }

    update() {
        const player = this.player;
        if (!player) return;

        player.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            player.body.velocity.x = -300;
            player.flipX = false;
        } else if (this.cursors.right.isDown) {
            player.body.velocity.x = 300;
            player.flipX = true;
        }

        if (this.cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -450;
        }
    }
}

class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2");
        this.score = 0;
        this.winningScore = 200;
        this.scoreText = null;
        this.obstaclesActive = false;
    }

    preload() {
        this.load.image("home", "assets/home.png");
        this.load.image("sky", "./assets/sky.png");
        this.load.image("ground", "./assets/platform2.jpg");
        this.load.image("groundOne", "./assets/platform.png");
        this.load.image("onenote", "./assets/atom_symbol_3d.png");
        this.load.image("redObstacle", "./assets/obstacle.png");
    }

    create() {
        this.score = 0;

        this.add.image(400, 318, "sky").setDisplaySize(800, 636);

        // Question bank from Level1
        this.chemQuestions = this.scene.get("Level1").chemQuestions;

        // Ensure unit is valid
        this.time.delayedCall(100, () => {
            if (
                !this.game.global.leastConfidentUnit ||
                !this.chemQuestions[this.game.global.leastConfidentUnit]
            ) {
                this.game.global.leastConfidentUnit = 1;
            }
            this.leastConfidentUnit = this.game.global.leastConfidentUnit;
        });

        const platforms = this.physics.add.staticGroup();
        const floor = this.physics.add.staticGroup();
        this.notes = this.physics.add.group();

        // Ground
        const groundY = 590;
        [90,180,270,360,450,540,630,720].forEach(x => {
            platforms.create(x, groundY, "ground").setScale(0.5, 0.75).refreshBody();
        });

        this.createFloorWithNotes(floor, 120, 450, 5);
        this.createFloorWithNotes(floor, 220, 350, 5);
        this.createFloorWithNotes(floor, 320, 250, 5);

        this.createFloorWithNotes(floor, 400, 150, 5);

        this.createFloorWithNotes(floor, 600, 350, 5);
        this.createFloorWithNotes(floor, 600, 200, 5);

        this.createFloorWithNotes(floor, 500, 80, 5);

        // Obstacles
        this.obstacles = this.physics.add.group();

        const obstaclePositions = [
            { x: 150, y: 420 },
            { x: 250, y: 320 },
            { x: 350, y: 220 },

            { x: 400, y: 120 },

            { x: 600, y: 320 },
            { x: 600, y: 170 },

            { x: 500, y: 50 },

            { x: 450, y: 260 }
        ];

        obstaclePositions.forEach(pos => {
            let obs = this.obstacles.create(pos.x, pos.y, "redObstacle").setScale(0.015, 0.2);
            obs.setImmovable(true);
        });

        // Delay obstacle activation
        this.time.delayedCall(200, () => {
            this.obstaclesActive = true;
        });

        // Character
        const chosen = this.game.global.selectedCharacterKey;
        let player = this.add.sprite(30, 465, chosen).setScale(0.25);
        player.flipX = true;

        this.physics.world.enable(player);
        player.body.gravity.y = 800;
        player.body.collideWorldBounds = true;

        // Colliders
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, floor);
        this.physics.add.collider(player, this.notes, this.collectNote, null, this);
        this.physics.add.collider(player, this.obstacles, this.handleObstacleCollision, null, this);

        this.player = player;
        this.cursors = this.input.keyboard.createCursorKeys();

        // Score text
        this.scoreText = this.add.text(
            16, 16,
            "Score: 0/" + this.winningScore,
            { stroke: "#000", strokeThickness: 1.9, fontSize: "32px", fill: "#000" }
        );

        // Home button
        this.homeButton = this.add.image(390, 590, "home")
            .setScale(0.5)
            .setInteractive()
            .on("pointerdown", () => this.scene.start("HomeScene"));
    }

    createFloorWithNotes(floorGroup, x, y, count) {
        floorGroup.create(x, y, "groundOne").setScale(1).refreshBody();

        const noteY = y - 40;
        const spacing = 50;
        const startX = x - ((count - 1) / 2) * spacing;

        for (let i = 0; i < count; i++) {
            this.notes.create(startX + i * spacing, noteY, "onenote").setScale(0.15);
        }

        this.notes.getChildren().forEach(note => {
            note.body.setAllowGravity(false);
            note.body.immovable = true;
        });
    }

    collectNote(player, note) {
        note.disableBody(true, true);
        this.score += (200 / 25);
        this.scoreText.setText("Score: " + Math.floor(this.score) + "/" + this.winningScore);

        if (this.score >= this.winningScore) {
            alert("Congrats, you completed level 2! Now, level 3 is unlocked!");
            this.game.global.unlockedLevels = 3;
            this.homeButton.setVisible(true);
        }
    }

    handleObstacleCollision(player, obstacle) {
        if (!this.obstaclesActive) return;
        if (!obstacle.active) return;

        let unitQuestions = this.chemQuestions[this.leastConfidentUnit];
        if (!unitQuestions || unitQuestions.length === 0) return;

        let q = unitQuestions[Math.floor(Math.random() * unitQuestions.length)];

        let answer = prompt(q.q);
        if (answer && answer.trim().toLowerCase() === q.a.toLowerCase()) {
            obstacle.disableBody(true, true);
            return;
        }

        alert("Wrong. Try again.");
        let answer2 = prompt(q.q);

        if (answer2 && answer2.trim().toLowerCase() === q.a.toLowerCase()) {
            obstacle.disableBody(true, true);
            return;
        }

        alert("Correct answer: " + q.a + "\nExplanation: " + q.exp);

        let finalAnswer = "";
        while (finalAnswer.trim().toLowerCase() !== q.a.toLowerCase()) {
            finalAnswer = prompt("Please enter the correct answer to continue:");
        }

        obstacle.disableBody(true, true);
    }

    update() {
        const player = this.player;
        if (!player) return;

        player.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            player.body.velocity.x = -300;
            player.flipX = false;
        } else if (this.cursors.right.isDown) {
            player.body.velocity.x = 300;
            player.flipX = true;
        }

        if (this.cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -450;
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 636,
    scene: [StartScene, CharacterScene, InstructionScene, HomeScene, CreditsScene, Level1, Level2],
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
    unlockedLevels: 1,
    playerName: "",
    leastConfidentUnit: 1
};
