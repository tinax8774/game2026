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

        this.add.text(50, 50, "Game Instructions",{
                fontFamily: "Nunito",
                stroke: "#000000",
                strokeThickness: 1.5,
                fontSize: "35px",
                fill: "black"
            }
        ).setDepth(1);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 636,
    scene: [StartScene, CharacterScene],
};

const game = new Phaser.Game(config);
// game.global = { selectedCharacterKey: null };