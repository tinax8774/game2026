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

        const startButton = this.add.image(650, 145, 'start')
        .setScale(0.20)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("HomeScene");
            });
        const button = this.add.text(375, 25, 'Character Options', {
            fontFamily: 'Nunito',
            fontSize: '40px',
            color: 'black',
            backgroundColor: '#51ff4b',
            padding: { x: 10, y: 10 }
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start("CharacterScene");
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
            { key: "Level1", x: 300, y: 175, label: "1" },
            { key: "Level2", x: 500, y: 175, label: "2" },
            { key: "Level3", x: 300, y: 320, label: "3" },
            { key: "Level4", x: 500, y: 320, label: "4" },
        ];

        const unlocked = this.game.global.unlockedLevels;

        levelData.forEach((level) => {
            const levelNumber = parseInt(level.label);
            const isUnlocked = levelNumber <= unlocked;

            const circleColor = isUnlocked ? 0x84c7ff : 0xADADAD;

            const circle = this.add.circle(level.x, level.y, 50, circleColor);
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

        const instructionsButton = this.add.image(400, 450, 'instructions')
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

        const button = this.add.text(230, 520, 'Character Options', {
            fontFamily: 'Nunito',
            fontSize: '40px',
            color: 'black',
            backgroundColor: '#51ff4b',
            padding: { x: 10, y: 10 }
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start("CharacterScene");
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
                { q: "How many moles of calcium carbonate (CaCO_3) are present in 200.0g of the compound?", a: "b", options: {a: "1.00 mol", b: "2.00 mol", c: "2.50 mol", d: "5.00 mol"}, exp: "To calculate moles, divide the mass by the molar mass. Calcium carbonate has a molar mass of approximately 100.1 g/mol (40.1+12.0+3*16.0). 200.0g / 100.1 g/mol = 2.00 mol." },
                { q: "A sample contains 75% of an isotope with mass 10 amu and 25% of an isotope with mass 11 amu. What is the average atomic mass?", a: "a", options: {a: "10.25 amu", b: "10.50 amu", c: "10.75 amu", d: "11.00 amu"}, exp: "Average atomic mass is calculated using a weighted average, not a simple mean. Each isotope's mass is multiplied by its fractional abundance: (10 * 0.75) + (11 * 0.25) = 7.50 + 2.75 = 10.25 amu. This reflects the fact that the lighter isotope is more abundant, pulling the average closer to its mass." },
                { q: "One mole of carbon-12 contains how many atoms?", a: "b", options: {a: "6.02*10^22", b: "6.02*10^23", c: "12.0*10^23", d: "1.0*10^23"}, exp: "Avogadro's number, 6.02*10^23 particles per mole, defines the mole. By definition, one mole of carbon-12 contains exactly this amount of atoms. This value provides the bridge between atomic-scale quantities and laboratory-scale measurements and is essential for all mole calculations in chemistry." },
                { q: "Which sample contains the greatest amount of atoms?", a: "d", options: {a: "1 mol of He", b: "1 mol of Ne", c: "1 mole of Ar", d: "All contain the same number"}, exp: "One mole of any substance contains the same number of particles (Avogadro's number). Even though helium, neon, and argon have different atomic masses, one mole of each contains 6.022*10^23 atoms. This highlights the importance of distinguishing between mass and number of particles." },
                { q: "How many moles are present in 36.0g of water (H_2O)?", a: "b", options: {a: "1.0 mol", b: "2.0 mol", c: "18.0 mol", d: "0.50 mol"}, exp: "The molar mass is approximately 18.0 g/mol. Dividing the given mass by the molar mass gives: 36.0 g / 18.0 g/mol = 2.0 mol." },
                { q: "Which particle contributes most to an atom's volume?", a: "c", options: {a: "Proton", b: "Neutron", c: "Electron Cloud", d: "Nucleus"}, exp: "Although the nucleus contains nearly all of an atom's mass, it occupies very little space. The electron cloud extends far from the nucleus and defines the atom's size and volume. This explains why atoms are mostly empty space and why electron interactions dominate chemical reactions." },
                { q: "A neutral atom has 17 protons. How many electrons does it contain?", a: "b", options: {a: "16", b: "17", c: "18", d: "Cannot be determined"}, exp: "In a neutral atom, the number of electrons equals the number of protons so that positive and negative charges balance. With 17 protons, the atom must also have 17 electrons. This principle is essential for understanding ion formation later in the course." },
                { q: "Which best describes the relationship between atomic mass and molar mass?", a: "c", options: {a: "They are unrelated", b: "Atomic mass is larger", c: "Molar mass is atomic mass in grams", d: "Molar mass applies only to compounds"}, exp: "Atomic mass is expressed in atomic mass units for individual atoms, while molar mass represents the mass of one mole of those atoms in grams. Numerically, the values are the same. This relationship allows seamless conversion between atomic-scale and macroscopic quantities." },
                { q: "How many atoms are in 0.25 mol of neon?", a: "a", options: {a: "1.51*10^23", b: "6.02*10^23", c: "2.41*10^23", d: "0.25 atoms"}, exp: "To find the number of atoms, multiply the number of moles by Avogadro's number: 0.25 mol * 6.02*10^23 atoms/mol = 1.51*10^23 atoms." },
                { q: "Which statement best distinguishes a pure substance from a mixture?", a: "b", options: {a: "A pure substance contains only one element", b: "A pure substance has fixed composition", c: "A mixture has a chemical formula", d: "A mixture cannot be separated"}, exp: "A pure substance (element or compound) has a fixed, constant composition and a definite set of properties. A mixture, in contrast, can have a variable composition depending on how much of each component is present. Elements are not the only pure substances—compounds are also pure if their composition is fixed." },
                { q: "A compound is 52.2% carbon, 13.0% hydrogen, and 34.8% oxygen by mass. What is the first step in determining the empirical formula?", a: "b", options: {a: "Divide each percentage by atomic mass", b: "Assume 100 g of the compound", c: "Round percentages", d: "Calculate molar mass"}, exp: "Assuming a 100 g sample allows percent values to be treated directly as grams, simplifying conversion to moles." },
                { q: "What fundamental information does photoelectron spectroscopy provide about an atom?", a: "b", options: {a: "Atomic mass and isotope ratios", b: "Electron binding energies and subshell occupancy", c: "Molecular geometry", d: "Nuclear Stability"}, exp: "PES measures the energy required to remove electrons from an atom. Each peak corresponds to electrons in a specific subshell; the peak position reflects binding energy, while the peak area reflects the number of electrons present." },
                { q: "Which of the following correctly compares periodic properties of two elements and provides an accurate explanation of that difference?", a: "d", options: {a: "The first ionization energy of Al is greater than that of B because Al has a larger molecular charge than B does", b: "The first ionization energy of F is greater than that of O because O has a larger electronegativity", c: "The atomic radius of Ca is larger than that of Mg because the valence electrons in Mg experience more shielding than the valence electrons in Ca do", d: "The atomic radius of Cl is smaller than that of S because Cl has a larger nuclear charge than S does"}, exp: "Chlorine (Cl) and Sulfur (S) are in the same period (row 3). Moving left to right across a period, the number of protons (nuclear charge) increases while the electron shielding remains relatively constant. This higher effective nuclear charge pulls the valence electrons closer to the nucleus, making the atomic radius of Cl smaller than that of S." },
                { q: "Which has a higher electronegativity?", a: "d", options: {a: "Cs", b: "Ag", c: "Pb", d: "Br"}, exp: "Bromine has the highest electronegativity because it is a nonmetal located toward the top right of the periodic table. Atoms in this region have a strong pull on electrons because they have a high effective nuclear charge and few electron shells, meaning they strongly attract shared electrons in a chemical bond." },
                { q: "Which has the largest atomic radius?", a: "a", options: {a: "Cs", b: "Ag", c: "Pb", d: "Br"}, exp: "Chlorine (Cl) and Sulfur (S) are in the same period (row 3). Moving left to right across a period, the number of protons (nuclear charge) increases while the electron shielding remains relatively constant. This higher effective nuclear charge pulls the valence electrons closer to the nucleus, making the atomic radius of Cl smaller than that of S." },
                { q: "Which has the lowest first-ionization energy?", a: "a", options: {a: "Cs", b: "Ag", c: "Pb", d: "Br"}, exp: "Cesuim (Cs) has the largest atomic radius because it sits furthest down and to the left on the periodic table. Atomic size increases down groups as new electron shells are added, and decreases from left to right as a stronger nuclear charge pulls electrons inward. While Cs and lead (Pb) both have six electron shells- making them larger than silver (Ag) and bromine (Br)-Cs has far fewer protons have Pb. THis weaker nuclear pull allows the outermost electrons of cs to expand further outward, giving it the largest radius." },
                { q: "The elements in which of the following have most nearly the same atomic radius?", a: "b", options: {a: "Be, B, C, N", b: "Cr, Mn, Fe, Co", c: "Mg, Ca, Sr, Ba", d: "C, P, Se, I"}, exp: "These are all transition metals located in the middle of the fourth row. As you move across this row, electrons are added to an inner shell rather than the outermost shell. These inner electrons shield the outer electrons very effectively, which keeps the overall size of the atoms nearly identical. The other options involve elements from main groups where sizes change dramatically between rows and columns." },
                { q: "A sample of a compound that contains only the element C, H, and N is completely burned in O_2 to produce 44.0 g of CO_2, 45.0g of H_2O and some NO_2. A possible empirical formula of the compound is", a: "b", options: {a: "CH_2N", b: "CH_5N", c: "C_2H_5N", d: "C_3H_3N_2"}, exp: "When forty-four grams of carbon dioxide is produced, it contains exactly one mole of carbon atoms. When forty-five grams of water is produced, it contains exactly five moles of hydrogen atoms. This sets up a strict carbon to hydrogen ratio of one to five." },
                { q: "A 23.0 g sample of a compound contains 12.0 g of C, 3.0 g of H, and 8.0 g of O. Which of the following is the empirical formula of the compound?", a: "b", options: {a: "CH_3O", b: "C_2H_6O", c: "C_3H_9O_2", d: "C_4H_12O_2"}, exp: "Converting the given mass to moles yields 1 mole of carbon from the 12 grams, 3 moles of hydrogen from the 3 grams, and half a mole of oxygen from the 8 grams. To find the simplest whole number ratio, you divide all of these values by the smallest number, which is half a mole. This doubles the value to give 2 carbons, 6 oxygen, resulting in the empirical formula C_2H_5O." },
                { q: "A sample of a compound contains 3.21 g of sulfur and 11.4 g of fluorine. Which of the following represents the empirical formula of the compound?", a: "d", options: {a: "SF_2", b: "SF_3", c: "SF_4", d: "SF_6"}, exp: "Converting 3.21 grams of sulfur to moles gives roughly 0.1 moles. Converting eleven 11.4 g of fluorine to moles gives roughly 0.6 moles. Dividing both values of 0.1 shows that there are six fluorine atoms for each one sulfur atom, giving the formula SF_6." },
                { q: "After completing an experiment to determine gravimetrically the percentage of water in a hydrate, a student reported a value of 38 percent. The correct value for the percentage of water in the hydrate is 51 percent. Which of the following is the most likely explanation for this difference?", a: "c", options: {a: "CrO", b: "CrO_2", c: "CrO_3", d: "Cr_2O"}, exp: "For the 100 gram sample of the oxide, 48 grams of oxygen and 52 grams of chromium. Dividing 48 grams of oxygen by its molar mass it gives exactly 3 moles of oxygen. Dividing 52 grams of chromium gives exactly 1 mole of chromium. This leaves a one to three ratio, making the formula CrO_3." },
                { q: "What is the empirical formula of an oxide of chromium that is 48 percent oxygen by mass?", a: "b", options: {a: "Strong initial heating caused some of the hydrate sample to spatter out of the crucible", b: "The dehydrated sample absorbed moisture after heating", c: "The amount of the hydrate sample used was too small", d: "The crucible was not heated to constant mass before use"}, exp: "The student calculated a water loss of 38% instead of the true value of 51%, meaning they measured less weight loss than expected. If the dry sample is allowed to sit out uncovered after heating, it will absorb moisture from the surrounding air. This increases the final weight of the sample and makes it appear as though less water evaporated during the experiment." },
                { q: "Silicon crystals are semiconductors. Which of the following is a correct reason for the increase in the conductivity of Si crystals when a small fraction of Si atoms are replaced with those of a different element?", a: "a", options: {a: "P atoms introduce additional mobile negative charges", b: "P atoms introduce additional mobile positive charges", c: "Ge atoms have more electrons than Si atoms have", d: "Ge atoms are much smaller than Si"}, exp: "Silicon has 4 valence electrons. When a phosphorous atom replaces a silicon atom in the crystal structure, it brings five valence electrons. Four of those electrons form bonds with the surrounding silicon network, leaving the fifth electron entirely unbonded. This free electron acts as a mobile negative charge that can move through the crystal, which dramatically increases the overall conductivity of the material and creates an n-type semiconductor." },
                { q: "A pure sample of KClO_3 is found to contain 71 grams of chlorine atoms. What is the mass of the sample?", a: "d", options: {a: "122 grams", b: "170 grams", c: "209 grams", d: "245 grams"}, exp: "To find the total mass of the potassium chlorate sample, you first determine the number of moles of chlorine atoms present. The atomic mass of chlorine is approximately 35.5 grams per mole, so dividing 71 grams by 35.5 gives exactly 2 moles of chlorine atoms. Because each formula unit of KClO_3 contains exactly one chlorine atom, having exactly 2 moles of the entire KClO_3 compound. Next, you calculate the molar mass of KClO_3 by adding the atomic masses of one potassium atom, one chlorine atom, and three oxygen atoms, which totals roughly 122.6 grams per mole. Finally, multiplying those 122.6 grams by the 2 moles gives a total sample mass of 245 grams." },
                { q: "Which of the following experimental procedures is used to separate two substances by taking advantage of their differing boiling points?", a: "b", options: {a: "Titration", b: "Distillation", c: "Filtration", d: "Decantation"}, exp: "Distillation is a laboratory technique used to separate a mixture of liquids based on differences in their boiling points. When the mixture is heated, the liquid with the lower boiling point vaporizes first. This vapor then passes through a cooling condenser, where it turns back into a liquid and is collected in a separate container." },
                { q: "Which of the following sets of quantum numbers (n, l, ml, ms) best describes the highest energy valence electron in a ground-state aluminum atom?", a: "d", options: {a: "2, 0, 0, 1/2", b: "2, 1, 0, -1/2", c: "3, 0, 0, 1/2", d: "3, 1, 1, 1/2"}, exp: "Aluminum has thirteen total electrons, giving it a ground-state election configuration of 1s2 2s2 2p6 3s2 3p1. The valence electrons are those located in the outermost shell, where the principal quantum number n equals 3. Among these valence electrons in the 3s subshell. For a p subshell, the angular momentum quantum number l must equal 1. Therefore, the highest energy valence electron must have n equals to 3 and l equal to 1." },
                { q: "Which statement correctly compares the C-C bond in C_2H_6 (single bond) to the C-C bond in C_2H_2 (triple bond)?", a: "d", options: {a: "Both are identical", b: "C_2H_2 has lower energy and shorter length", c: "C_2H_2 has higher energy and longer strength", d: "C_2H_2 has higher energy and shorter length"}, exp: "The molecule C_2H_6 contains a carbon-carbon single bond, while the molecule C_2H_2 contains a carbon-carbon triple bond. A triple bond shares more electrons between the two carbon atoms than a single bond does. This extra electron sharing creates a much stronger electrostatic pull between the nuclei, which draws the carbon atoms closer together and makes the bond length shorter. Because a triple bond is much tighter and stronger, it also requires significantly more energy to break, meaning its bond energy is much greater. Therefore, C_2H_2 will have a greater bond energy and a shorter bond length than C_2H_6." },
                { q: "2MnO_4-+5SO_3 2- + 6H+ ->2Mn2+ +5SO_4 2- + 3H_2O  Which of the following statements is true regarding the reaction given above?", a: "c", options: {a: "MnO_4- acts as the reducing agent", b: "H+ acts as the oxidizing agent", c: "SO_3 2- acts as the reducing agent", d: "Manganese is oxidized"}, exp: "In the sulfite reactant, SO_3 2-, sulfur has an oxidation number of positive 4. In the sulfate product, SO_4 2-, sulfur goes up to an oxidation number of positive 6. Because its oxidation number increased, sulfur lost electrons and was oxidized. The substance that undergoes oxidation always acts as the reducing agent for the rest of the reaction. Therefore, the sulfite ion is the reducing agent." },
                { q: "Which of the following can function as both a Bronsted-Lowry acid and Bronsted-Lowry base?", a: "c", options: {a: "HCl", b: "H_2SO_4", c: "HSO_4-", d: "SO_4 2-"}, exp: "A substance that can act as both a Bronsted-Lowry acid and a Bronsted-Lowry base is called amphiprotic. To act as an acid, a substance must be able to donate a hydrogen ion. To act as a base, a substance must be able to accept a hydrogen ion. THe hydrogen sulfate ion, HSO_4-, can do both. It can donate its remaining hydrogen ion to become a sulfate ion, SO_4 2-, or it can accept a hydrogen ion to become sulfuric acid, N_2SO_4." },
                { q: "Which of the following correctly identifies which has the higher first-ionization energy, Cl or Ar, and supplies the best justification?", a: "d", options: {a: "Cl, because of its higher electronegativity", b: "Cl, because of its higher electron affinity", c: "Ar, because of its completely filled valence shell", d: "Ar, because of its higher effective nuclear charge"}, exp: "Chlorine and argon are located in the same period of the periodic table. As you move from left to right across a period, the number of protons in the nucleus increases while the amount of inner-core electron shielding remains the same. Because argon has eighteen protons compared to chlorine's seventeen, its valence electrons experience a higher effective nuclear charge. This stronger positive charge exerts a tighter electrostatic pull on the outer electrons, making it require more energy to remove an electron from argon." },
                { q: "A sample of a solid labeled as NaCl may be impure. A student analyzes the sample and determines that it contains 75 percent chlorine by mass. Pure NaCl(s) contains 61 percent chlorine by mass. Which of the following statements is consistent with the data?", a: "d", options: {a: "The sample contians only NaCl(s)", b: "The sample contains NaCl(s) and NaI(s)", c: "The sample contains NaCl(s) and KCl(s)", d: "The sample contains NaCl(s) and LiCl(s)"}, exp: "The student found that the impure sample has a chlorine mass percent of 75 percent, which is higher than the 61 percent found in pure sodium chloride. This means the impurity must be a compound that contains a higher mass percentage of chlorine than sodium chloride does. To increase the overall chlorine mass percent, the non-chlorine part of the impurity must have a smaller molar mass than sodium. From the options, lithium has a much smaller atomic mass than sodium, which makes the chlorine make up a larger percentage of the total mass in lithium chloride. Potassium and iodine are heavier than sodium, which would decrease the total percentage of chlorine in the sample. Therefore, lithium chloride is the only impurity that would raise the chlorine mass percent to 75 percent." },
                { q: "The mass percent of carbon is pure glucose, C_5H_12O_6, is 40.0 percent. A chemist analyzes an impure sample of glucose and determines that the mass percent of carbon is 38.2 percent. Which of the following impurities could account for the low mass percent of carbon in the sample?", a: "a", options: {a: "Water, H_2O", b: "Ribose, C_5H_10O_5", c: "Fructose, C_6H_12O_6, an isomer of glucose", d: "Sucrose, C_12H_22O_11"}, exp: "The chemist found that the impure sample has a carbon mass percent of 38.2 percent, which is lower than the 40.0 percent found in pure glucose. This means the impurity must either contain no carbon at all, or contain  a lower mass percentage of carbon than glucose does, thereby diluting the overall carbon content. Water contains zero percent carbon by mass, so its presence as an impurity would directly lower the total mass percent of carbon in the mixture." },
                { q: "Which element forms monatomic ions with 2- charge in solutions?", a: "b", options: {a: "F", b: "S", c: "Mg", d: "Ar"}, exp: "To form a monatomic ion with a 2- charge, an element must gain two electrons to achieve a stable, full valence shell configuration resembling the nearest noble gas. Sulfur is a nonmetal located in Group 16 of the periodic table, meaning it naturally has six valence electrons. Gaining two additional electrons allows it to complete its octet, forming the sulfide ion with a stable 2- charge." },
                { q: "Which subatomic particle determines the atomic number of an element?", a: "c", options: {a: "Neutron", b: "Electron", c: "Proton", d: "Nucleus"}, exp: "The number of protons in the nucleus defines the atomic number of an element." }
            ],
            2: [
                { q: "Which statement best explains why sodium chloride has a much higher melting point than water?", a: "b", options: {a: "NaCl has covalent bonds, while water has hydrogen bonds", b: "NaCl forms a rigid ionic lattice with strong electrostatic forces", c: "Water molecules are heavier than Na+ and Cl- ions", d: "NaCl are nonpolar"}, exp: "Sodium chloride forms an extended ionic lattice where each Na+ ion is surrounded by Cl- ions and vice versa. The strong electrostatic attractions between oppositely charged ions require a large amount of energy to overcome, resulting in a high melting point. Water, by contrast, consists of discrete molecules held together by hydrogen bonding, which is significantly weaker than ionic attractions." },
                { q: "Which compound is expected to have the greatest lattice energy?", a: "c", options: {a: "NaF", b: "NaCl", c: "MgO", d: "KBr"}, exp: "Lattice energy increases with higher ionic charge and smaller ionic radius. Magnesium oxide consists of Mg2+ and O2- ions, both of which have higher charges than the ions in the other compounds listed. THis leads to much stronger electrostatic attractions within the lattice, making MgO's lattice energy significantly greater." },
                { q: "Which molecule has the strongest intermolecular forces?", a: "b", options: {a: "CH_4", b: "NH_3", c: "CO_2", d: "H_2S"}, exp: "Ammonia exhibits hydrogen bonding because hydrogen is bonded to a highly electronegative nitrogen atom. Hydrogen bonding is stronger than dipole-dipole forces and London dispersion forces. CH_4 and CO_2 are nonpolar, and H_2S lacks the electronegativity required for hydrogen bonding, making NH_3 the strongest." },
                { q: "Why does iodine(I_2) have a higher boiling point than fluorine(F_2?)", a: "b", options: {a: "I_2 is polar while F_2 is nonpolar", b: "I_2 has stronger London dispersion forces due to more electrons", c: "I_2 has ionic character", d: "F_2 forms hydrogen bonds"}, exp: "Both I_2 and F_2 are nonpolar diatomic molecules, so their intermolecular forces are limited to London dispersion forces. Iodine has a much larger electron cloud, which is more polarizable, leading to stronger temporary dipoles and stronger dispersion forces. This causes iodine to have a significantly higher boiling point." },
                { q: "Which property best indicated the presence of ionic bonding in a compound?", a: "c", options: {a: "Low melting point", b: "Poor electrical conductivity when dissolved", c: "High melting point and conductivity when molten", d: "Insolubility in water"}, exp: "Ionic compounds typically have high melting points due to strong electrostatic attractions. When molten or dissolved in water, the ions become mobile and can conduct electricity. Covalent compounds generally lack these properties, making conductivity in the molten state a key indicator of ionic bonding." },
                { q: "Which molecule is polar?", a: "c", options: {a: "CO_2", b: "BF_3", c: "SO_2", d: "CCl_4"}, exp: "Sulfur dioxide has a bent molecular geometry due to lone pairs on the sulfur atom. This shape prevents the dipoles from cancelling out, resulting in a net dipole moment. CO_2, BF_3 and CCl_4 are all symmetrical molecules where bond dipoles cancel, making them nonpolar." },
                { q: "Which primarily determines the strength of London dispersion forces?", a: "b", options: {a: "Bond polarity", b: "Molecular mass and surface area", c: "Presence of hydrogen bonding", d: "Ionic Charge"}, exp: "London dispersion forces arise from temporary fluctuations in electron density. Larger molecules with greater molecular mass and surface area have more electrons and are more easily polarized, resulting in stronger dispersion forces. These forces dominate intermolecular interactions in nonpolar substances." },
                { q: "Which compound would be most soluble in water?", a: "b", options: {a: "C_6H_6", b: "CaCl_2", c: "I_2", d: "CO_2"}, exp: "Calcium chloride is an ionic compound whose ions interact strongly with polar water molecules through ion-dipole forces. These interactions have enough energy to overcome lattice energy, allowing CaCl_2 to dissolve readily. Nonpolar substances like benzene and iodine have limited solubility in water." },
                { q: "Why do ionic solids not conduct electricity in the solid state?", a: "c", options: {a: "Ions are neutral", b: "Electrons are tightly bound", c: "Ions are fixed in place within the lattice", d: "Ionic bonds prevent charge movement"}, exp: "In solid ionic compounds, ions are locked into a rigid lattice structure and cannot move freely. Electrical conductivity requires the movement of charged particles. When ionic compounds melt or dissolve, the ions become mobile, allowing electricity to flow." },
                { q: "Which factor increases lattice energy?", a: "d", options: {a: "Larger ions", b: "Lower ionic charge", c: "Greater distance between ions", d: "Higher ionic charge"}, exp: "Lattice energy is directly proportional to the magnitude of the charges on the ions. Higher charges result in stronger electrostatic attraction. While ion size also matters, increasing ionic charge has the greatest effect on lattice energy when comparing compounds." },
                { q: "Which molecule can form hydrogen bonds?", a: "b", options: {a: "H_2S", b: "HF", c: "HCl", d: "PH_3"}, exp: "Hydrogen bonding occurs when hydrogen is bonded to nitrogen, oxygen, or fluorine. Fluorine's high electronegativity creates a strong dipole, allowing significant intermolecular attraction. H_2S, HCl and PH_3 lack the required electronegativity difference." },
                { q: "Which statement best explains why NaCl dissolves in water?", a: "b", options: {a: "Water breaks covalent bonds", b: "Ion-dipole forces overcome lattice energy", c: "NaCl reacts chemically with water", d: "Water molecules ionize NaCl"}, exp: "NH_3 is polar due to its trigonal pyramidal shape and electronegativity differences. This polarity allows dipole-dipole interactions in addition to hydrogen bonding. The other molecules listed are nonpolar and rely only on dispersion forces." },
                { q: "Which compound has the greatest dipole-dipole attractions?", a: "b", options: {a: "CO_2", b: "NH_3", c: "O_2", d: "N_2"}, exp: "When NaCl dissolves, polar water molecules surround Na+ and Cl- ions. The ion-dipole attractions between water molecules and ions release enough energy to overcome the lattice energy holding the ions together. No chemical reaction occurs- only physical dissociation." },
                { q: "Which substance would have the higher vapor pressure at room temperature?", a: "b", options: {a: "H_2O", b: "NH_3", c: "I_2", d: "NaCl"}, exp: "Vapor pressure is inversely related to intermolecular force strength. NH_3 has weaker intermolecular forces than water(which hydrogen bonds strongly) and iodine (strong dispersion forces). NaCl has extremely strong ionic forces, resulting in negligible vapor pressure." },
                { q: "Which trend explains increasing boiling points down group 18?", a: "c", options: {a: "Increasing polarity", b: "Increasing hydrogen bonding", c: "Increasing London dispersion forces", d: "Increasing ionic character"}, exp: "Noble gases are nonpolar atoms, so their intermolecular attractions are solely due to London dispersion forces. As atomic size increases down the group, the electron London dispersion forces becomes more polarizable, strengthening dispersion forces and increasing boiling points." },
                { q: "Why is CaF_2 less soluble in water than NaF?", a: "b", options: {a: "CaF_2 is nonpolar", b: "Ca2+ has a higher charge, increasing lattice energy", c: "F- is larger in CaF_2", d: "NaF reacts with water"}, exp: "CaF_2 has a much higher lattice energy due to the +2 charge on Ca2+. Although ion-dipole forces with water are strong, they are not sufficient to overcome the strong electrostatic attractions in the lattice, reducing solubility compared to NaF." },
                { q: "Which molecule is nonpolar despite having polar bonds?", a: "c", options: {a: "H_2O", b: "NH_3", c: "CO_2", d: "SO_2"}, exp: "CO_2 has polar C=O bonds, but its linear geometry causes the bond dipoles to cancel each other out. Molecular polarity depends on both bond polarity and molecular shape, making CO_2 nonpolar overall." },
                { q: "Which best explains why diamond is extremely hard?", a: "c", options: {a: "Strong intermolecular forces", b: "High polarity", c: "Extended covalent network source", d: "Ionic bonding"}, exp: "" },
                { q: "Which compound would have the highest boiling point?", a: "d", options: {a: "CH_4", b: "C_2H_6", c: "C_3 H_8", d: "C_4H_10"}, exp: "Diamond consists of a three-dimensional covalent network where each carbon atom is covalently bonded to four others. These strong covalent bonds extend throughout the entire structure, making diamond extremely hard compared to substances held together by intermolecular forces." },
                { q: "Which interaction occurs between water and Na+ ions?", a: "c", options: {a: "Hydrogen Bonding", b: "Dipole-dipole forces", c: "Ion-dipole forces", d: "London dispersion forces"}, exp: "As molecular size increases, London dispersion forces become stronger due to increased electron count and surface area. Among these nonpolar hydrocarbons, C_4 H_10 has the largest molar mass and therefore the highest boiling point." },
                { q: "Why do molecular solids generally have low boiling points?", a: "b", options: {a: "Weak covalent bonds", b: "Weak intermolecular forces", c: "Large lattice energies", d: "High polarity"}, exp: "Ion-dipole forces form where ions interact with polar molecules. The partially negative oxygen in water attracts Na+ ions, stabilizing them in solution. This interaction is stronger than dipole-dipole forces and is crucial for dissolving ionic compounds in water." },
                { q: "Which compound has the strongest hydrogen bonding?", a: "b", options: {a: "H_2S", b: "HF", c: "HCl", d: "PH_3"}, exp: "Molecular solids consist of discrete molecules held together by intermolecular forces such as dispersion, dipole-dipole, or hydrogen bonding. These forces are much weaker than ionic or covalent network bonds, so less energy is required to melt molecular solids." },
                { q: "Which substance is most likely to be brittle solid?", a: "b", options: {a: "Copper", b: "NaCl", c: "Paraffin wax", d: "Rubber"}, exp: "Hydrogen fluoride forms very strong hydrogen bonds due to fluorine's extremely high electronegativity and small size. This creates a strong dipole and allows close approach of molecules, resulting in stronger intermolecular attraction than in other hydrogen-containing compounds." },
                { q: "Why does MgO have a higher boiling point than NaCl?", a: "c", options: {a: "MgO is heavier", b: "MgO has covalent character", c: "Mg2+ and O2- have higher charges", d: "MgO has hydrogen bonding"}, exp: "Ionic solids like NaCl are brittle because shifting the lattice under stress causes charges to align, resulting in strong repulsion and fracture. Metals are malleable, and molecular solids are generally soft or flexible." },
                { q: "Which molecule experiences only London dispersion forces?", a: "c", options: {a: "NH_3", b: "H_2O", c: "CO_2", d: "HF"}, exp: "CO_2 is nonpolar and has no hydrogen bonding or dipole-dipole interactions. As a result, its intermolecular attractions consist solely of London dispersion forces arising from temporary electron density fluctuations." },
                { q: "Which property best distinguishes ionic from molecular compounds?", a: "b", options: {a: "Color", b: "Melting point", c: "Molecular mass", d: "Density"}, exp: "Ionic compounds typically have very high melting point due to strong electrostatic forces between ions, while molecular compounds melt at much lower temperatures because they are held together by weaker intermolecular forces." },
                { q: "Which compound is most likely to conduct electricity when dissolved in water?", a: "b", options: {a: "C_12H_22O_11", b: "HCl", c: "CO_2", d: "CCl_4"}, exp: "HCl ionizes completely in water to form H+ and Cl-, which are free to move and conduct electricity. The other substances remain as neutral molecules in solution and do not conduct." },
                { q: "Why is covalent network solids insoluble in water?", a: "b", options: {a: "They are nonpolar molecules", b: "They have strong covalent bonds through the structure", c: "Water is nonpolar", d: "They react with water"}, exp: "Covalent network solids consist of atoms bonded together by strong covalent bonds in an extended structure. Water molecules cannot break these bonds, making such substances insoluble despite water's polarity." },
                { q: "Which factor most affects molecular polarity?", a: "c", options: {a: "Atomic mass", b: "Bond Length", c: "Molecular geometry", d: "Number of atoms"}, exp: "Even if individual bonds are polar, the overall polarity of a molecule depends on its geometry. Symmetrical shapes can cancel dipoles, while asymmetrical arrangements produce a net dipole moment." },
                { q: "Which compound would have the lowest boiling point?", a: "c", options: {a: "H_2O", b: "NH_3", c: "CH_4", d: "HF"}, exp: "CH_4 is nonpolar and experiences only weak London dispersion forces. The other compounds exhibit hydrogen bonding, which significantly raises boiling point. As a result, methane has the lowest boiling point among the options." },
                { q: "Which factor explains why MgF_2 is far less soluble in water than NaF?", a: "b", options: {a: "Lower polarity of MgF_2", b: "Greater lattice energy of MgF_2", c: "Lower hydration energy of F-", d: "Covalent character of NaF"}, exp: "MgF_2 contains Mg2+, producing much stronger electrostatic attraction within the lattice than NaF. Although hydration energy is high, it is insufficient to overcome the much larger lattice energy of MgF_2." },
                { q: "A salt dissolves in water with ΔH>0 but still dissolves readily at room temperature. Which factor most directly explains this behavior?", a: "c", options: {a: "Strong hydrogen bonding", b: "High lattice energy", c: "Large positive entropy change", d: "Low hydration energy"}, exp: "When ΔH is positive, dissolution absorbs heat and is enthalpically unfavorable. The process can still occur if the entropy increase ΔS from dispersing solid ions into solution is large enough to make ΔG= ΔH-TΔS negative. This entropy-driven dissolution is common for salts like KNO_3." },
                { q: "Rank the following ionic solids from highest to lowest lattice energy: NaCl, MgO, CaF_2, KBr?", a: "a", options: {a: "MgO>CaF_2>NaCl>KBr", b: "CaF_2>MgO>NaCl>KBr", c: "MgO>NaCl>CaF_2>KBr", d: "CaF_2>NaCl>MgO>KBr"}, exp: "Lattice energy increases with higher ionic charge and smaller ionic radii. MgO (2+/2-) has the strongest attraction. CaF_2 involves Ca2+ with small F- ions, giving high lattice energy but less than MgO. NaCl exceeds KBr due to smaller ions." },
                { q: "Which type of bond involves the transfer of electrons from one atom to another?", a: "d", options: {a: "Covalent", b: "Metallic", c: "Hydrogen", d: "Ionic"}, exp: "Ionic bonds form when one atom donates electrons to another, typically between metals and nonmetals." }
            ],
            3: [
                { q: "Which intermolecular force is primarily responsible for the usually high boiling point of hydrogen fluoride(HF) compared with other hydrogen halides?", a: "c", options: {a: "London-dispersion forces", b: "Dipole-dipole interactions", c: "Hydrogen bonding", d: "Ion-dipole forces"}, exp: "HF has strong hydrogen bonding because a hydrogen atom is covalently bonded to highly electronegative fluorine. Hydrogen bonds are directional, relatively strong intermolecular attractions that occur when H is bonded to N, O, or F and interacts with lone pairs on another molecule. This network of hydrogen bonds greatly increases the energy required to separate molecules into gas, so HF's boiling point is much higher than would be predicted by the molecular weight alone. London dispersion and dipole-dipole forces exist too, but they are weaker contributions here. Ion-dipole is not relevant for pure HF." },
                { q: "Two compounds, A and B, have equal molar mass. A is nonpolar and spherical;B is a long chain, nonpolar molecule. At the same temperature, which is expected to have the highest boiling point and why?", a: "c", options: {a: "A, because spherical molecules rotate faster", b: "A, because lower surface area reduces vapor pressure", c: "B, because larger surface area reduces vapor pressure", d: "B, because chain molecules form hydrogen bonds"}, exp: "For nonpolar molecules, London dispersion forces dominate. Those forces increase with larger surface area and more easily polarizable electron clouds. A long-chain nonpolar molecule (B) has a larger contact area and can induce larger instantaneous dipoles, so dispersion attractions between molecules are stronger. Thus B requires more energy to vaporize and has a higher boiling point. Spherical molecules (A) have smaller contact surfaces and weaker dispersion attractions. Hydrogen bonding isn't applicable for purely nonpolar chains." },
                { q: "Which of the following best explains why ionic solids typically have much higher melting points than molecular solids?", a: "b", options: {a: "Ionic solids are always covalently bonded networks", b: "Ionic solids are held by strong electrostatic attractions between ions", c: "Molecular solids have higher molar masses than ionic solids", d: "Ionic solids have weaker lattice energies"}, exp: "Ionic solids consist of positive and negative ions packed in a crystal lattice; the electrostatic Coulombic attraction between oppositely charged ions is strong and extends throughout the solid. Breaking the lattice into mobile ions requires substantial energy, producing a high melting point. Molecular solids are held together by comparatively weak intermolecular forces (dispersion, dipole-dipole, hydrogen bonds) rather than full ionic charges, so they melt at much lower temperatures. Lattice energy describes the strong ionic compounds (opposite of option D, and ionic solids), and ionic solids are not 'always covalent networks'." },
                { q: "At constant temperature, which change will increase the vapor pressure of a volatile liquid in a closed container?", a: "d", options: {a: "Add the immiscible nonvolatile solute to the liquid", b: "Increase the surface area of the liquid while keeping amount constant", c: "Decrease the temperature of the system", d: "Remove some vapor from the gas phase and allow system to re-equilibrate"}, exp: "Vapor pressure is an equilibrium property: at a given T, a liquid's vapor pressure is fixed by temperature and the nature of the liquid. Removing vapor decreases gas-phase pressure, so molecules evaporate until equilibrium vapor pressure is reestablished, temporarily increasing evaporation rate and restoring the original vapor pressure. Adding a nonvolatile solute vapor pressure (Raoult's law). Increasing surface area affect rate to reach equilibrium but not equilibrium vapor pressure at fixed T. Decreasing temperature reduces vapor pressure." },
                { q: "Which description of an ideal gas is consistent with the kinetic molecular theory?", a: "b", options: {a: "Gas molecules attract each other strongly at all distances", b: "Collisions between molecules are perfectly elastic and molecules occupy negligible volume.", c: "Gas molecules undergo only inelastic collisions and lose energy each collision", d: "Molecules move slower at higher temperature"}, exp: "The kinetic molecular theory for ideal gases assumes point-like particles with negligible volume, no intermolecular attractive or repulsive forces, and elastic collisions (total kinetic energy conserved). Temperature is a measure of average translational kinetic energy, so higher T means faster average molecular speed, opposite of D. Real gases deviate from the ideal assumptions when pressures are high or temperatures low, where finite volume and attractive forces become important, but for ideal behavior these effects are negligible." },
                { q: "Which gas will deviate most from ideal behavior at high pressure and moderate temperature?", a: "c", options: {a: "Helium, because it has the smallest molar mass", b: "Nitrogen, because it forms diatomic molecules", c: "Carbon dioxide, because it is more polarizable and has stronger intermolecular attractions", d: "Neon, because noble gases are always unideal"}, exp: "Deviations from ideality are driven by finite molecular volume and intermolecular attractions. More polarizable molecules with larger electron clouds (like CO_2)experience stronger dispersion forces, increasing attractions at moderate temperatures and high pressures; these attractions reduce measured pressure relative to ideal predictions (Z < 1). Helium and neon are small and less polarizable, so they stay closer to ideal behavior under the same conditions. Being diatomic (N_2) doesn't make it markedly more nonideal compared with CO_2's larger polarizability." },
                { q: "Dalton's law of partial pressures states that tin a mixture of nonreacting gases at constant volume and temperature, the total pressure equals:", a: "a", options: {a: "the sum of partial pressures of individual gases", b: "the product of partial pressures", c: "the pressure of the most abundant gas only", d: "the average of the partial pressure"}, exp: "Dalton's law holds that each gas in a mixture behaves independently and contributes a partial pressure equal to the pressure it would exert alone at the same T and V. The total pressure is the arithmetic sum of all partial pressures. This follows from the ideal gas law because PV=(n_total)RT, so P_total=P_1+P_2+... . Dalton's law is valid when gases don't react chemically and behave approximately ideally." },
                { q: "Which experiment technique separates a mixture based on differences in boiling point?", a: "b", options: {a: "Chromotography", b: "Distillation", c: "Filtration", d: "Centrifugation"}, exp: "Distillation separates components of a liquid mixture by exploiting differences in volatility (boiling points); the more volatile component vaporizes and then is condensed and collected. Chromatography separates based on interactions with stationary vs mobile phases (polarity and adsorption differences), filtration separates solids from liquids by particle size, and centrifugation separates components by density under high g-forces. Fractional distillation works when boiling points differ but are not widely spread." },
                { q: "Which change will most directly increase the rate of diffusion of a gas at constant?", a: "c", options: {a: "Increasing molar mass", b: "Decreasing temperature", c: "Increasing temperature", d: "Increasing intermolecular attractions"}, exp: "According to kinetic molecular theory, gas particles move faster as temperature increases because average kinetic energy is proportional to temperature. Faster-moving particles spread out more quickly, increasing the rate of diffusion. Molar mass affects diffusion rate inversely (lighter gases diffuse faster), but increasing molar mass slows diffusion. Intermolecular attractions hinder motion and reduce diffusion rates. Therefore, increasing temperature directly increases molecular speed and diffusion rate." },
                { q: "Which condition will increase gas solubility in a liquid?", a: "c", options: {a: "Increasing temperature for most gases", b: "Decreasing pressure", c: "Increasing pressure of the gas above the liquid", d: "Decreasing the polarity of the solvent"}, exp: "According to Henry's law, the solubility of a gas is directly proportional to the partial pressure of what gas above the liquid. Increasing pressure forces more gas molecules into solution. Increasing temperature usually decreases gas solubility because dissolved gas molecules gain enough kinetic energy to escape. Solvent polarity affects solubility, but pressure is the most direct controlling factor for gases." },
                { q: "Which statement best explains why water and ethanol are completely miscible, but water and hexane are not?", a: "b", options: {a: "Ethanol and hexane have similar molar masses", b: "Hexane can form hydrogen bonds with water, while hexane cannot", c: "Hexane has stronger London dispersion forces", d: "Water has a higher boiling point than ethanol"}, exp: "Miscibility depends on favorable intermolecular interactions between solute and solvent. Ethanol contains an -OH group that can hydrogen bond with water, allowing strong water-ethanol interactions that compensate for breaking water-water hydrogen bonds. Hexane is nonpolar and interacts with water only through weak dispersion forces, which are insufficient to stabilize mixing. As a result, water and hexane separate into layers." },
                { q: "A liquid has a low vapor pressure, high viscosity, and large heat of vaporization. Which conclusion is most justified?", a: "c", options: {a: "The liquid has strong covalent bonds", b: "The liquid contains ions", c: "Intermolecular attractions between molecules are strong", d: "The molecules are very small"}, exp: "Low vapor pressure, high viscosity, and large enthalpy of vaporization are all macroscopic indicators of strong intermolecular forces. These properties reflect resistance to evaporation, flow, and phase change, respectively. None of these observations require ionic bonding or unusually strong covalent bonds-only strong attractions between intact molecules." },
                { q: "A real gas shows Z < 1 at moderate pressure but Z > 1 at very high pressure. What does this reveal?", a: "c", options: {a: "Attractive forces dominate at all pressure", b: "Particle volume dominates at all pressures", c: "Attractions dominate first, then repulsions and volume effects", d: "The gas becomes ideal at high pressure"}, exp: "At moderate pressures, attractive intermolecular forces reduce effective pressure, producing Z < 1. At very high pressures, finite volume and repulsive interactions dominate, increasing volume relative to ideal predictions and producing Z > 1." },
                { q: "A student measures the boiling point of four liquids at 1 atm and observes the order: W > X > Y > Z?", a: "b", options: {a: "Vapor pressure at 25° C", b: "Strength of intermolecular forces", c: "Diffusion of vapor", d: "Entropy of vaporization"}, exp: "Higher boiling points require greater energy to overcome intermolecular attractions. Therefore, stronger intermolecular forces correspond directly to higher boiling points. Vapor pressure and diffusion rate decrease as boiling point increases." },
                { q: "Rank the following gases by increasing rate of effusion: CO_2, He, N_2", a: "a", options: {a: "CO_2 < N_2 < He", b: "He < N_2 < CO_2", c: "N_2 < CO_2 < He", d: "CO_2 < He < N_2"}, exp: "Effusion rate is inversely proportional to the square root of molar mass. CO_2(44 g/mol) is slowest, N_2 (28 g/mol) is intermediate, and He (4 g/mol)diffuses fastest." },
                { q: "Which type of intermolecular force is present in all molecular substances?", a: "c", options: {a: "Hydrogen bonding", b: "Ion-dipole forces", c: "London dispersion forces", d: "Dipole-dipole forces"}, exp: "London dispersion forces arise from temporary dipoles and are present in all molecular substances, regardless of polarity." },
                { q: "What causes water to have a relatively high boiling point compared to similar-sized molecules?", a: "a", options: {a: "Hydrogen bonding", b: "Covalent bonding", c: "Dipole-dipole force", d: "Ion-ion interactions"}, exp: "Hydrogen bonding between water molecules creates strong intermolecular attractions, increasing the boiling point." },
                { q: "Which of the following substances is most likely to be miscible with water?", a: "b", options: {a: "CH_4", b: "NH_3", c: "CCl_4", d: "I_2"}, exp: "NH_3 forms hydrogen bonds with water due to its polarity and lone pair on nitrogen, making it highly miscible." },
                { q: "Which compound will have the highest vapor pressure at 25°C?", a: "c", options: {a: "H_2O", b: "CH_3CH_2OH", c: "CH_4", d: "HF"}, exp: "CH_4 has only weak dispersion forces and will evaporate more readily. While others form hydrogen bonds, which lowers their vapor pressures." },
                { q: "Which property would increase when a substance has stronger intermolecular forces?", a: "b", options: {a: "Vapor pressure", b: "Boiling point", c: "Rate of evaporation", d: "Volatiliy"}, exp: "Stronger IMFs make it harder for molecules to escape into the gas phase, raising the boiling point." },
                { q: "Which of the following pure substances has the highest boiling point?", a: "b", options: {a: "CH_4", b: "NH_3", c: "CO_2", d: "C_2H_6"}, exp: "NH_3 forms hydrogen bonds with water due to its polarity and lone pair on nitrogen, making it highly miscible." },
                { q: "The boiling point of HF (20°C) is much higher than that of HCl (_85°C). Which of the following best explains this difference?", a: "b", options: {a: "HF has a smaller molecular mass than HCl", b: "HF molecules experience hydrogen bonding, while HCl molecules only experience dipole-dipole interactions", c: "HCl is a linear molecule, while HF is bent", d: "HF has a stronger covalent bonds than HCl"}, exp: "Fluorine is highly electronegative, allowing HF to form stronger hydrogen bonds between molecules. HCl lacks the necessary H-F, H-O, or H-N bonds required for true hydrogen bonding; its intermolecular attractions are weaker dipole-dipole forces." },
                { q: "Two identical flasks at the same temperature contain equal volumes of two different liquids. Liquid A has a higher vapor pressure than Liquid B. Which of the following statements is true?", a: "c", options: {a: "Liquid A has a stronger intermolecular forces than Liquid B", b: "Liquid B has a lower boiling point than Liquid A", c: "Liquid A molecules are held together than Liquid B molecules", d: "Liquid A requires more heat to vaporize than Liquid B"}, exp: "Vapor pressure is inversely related to intermolecular force strength. If Liquid A has a higher vapor pressure, its molecules escape into the gas phase more easily, meaning its intermolecular forces are weaker than Liquid B's." },
                { q: "Which of the following substances will sublime at room temperature and pressure?", a: "c", options: {a: "NaCl", b: "Cu", c: "CO_2", d: "SiO_2"}, exp: "Solid CO_2 (dry ice) is a molecular solid held together by weak London dispersion forces. Because these forces are so weak, it transitions directly from a solid to a gas at standard pressure. NaCl and SiO_2 have ionic and covalent network bonds, respectively, resulting in very high melting and boiling points" },
                { q: "Which of the following pairs of liquids is most likely to be miscible?", a: "b", options: {a: "H_2O and C_6H_14(hexane)", b: "C_6H_14 and CCl_4", c: "CH_3OH and C_6H_14", d: "H_2O and CCl_4"}, exp: "The rule 'like dissolves like' applies to polar and nonpolar substances. Hexane(c_6H_14) and carbon tetrachloride (CCl_4) are both nonpolar, allowing them to mix freely due to similar London dispersion forces." },
                { q: "A paper chromatography experiment is performed using a nonpolar solvent as the mobile phase and a polar paper as the stationary phase. A solute is spotted on the baseline. Which of the following is true regarding a highly polar solute?", a: "b", options: {a: "It will move up the paper very quickly", b: "It will have a low retention factor (Rf) value", c: "It will dissolve completely in the nonpolar solvent", d: "It will move further up the paper than a nonpolar solute"}, exp: "In chromatography, 'like interacts with like.' Because the stationary phase is polar, a highly polar solute will be strongly attracted to the paper, causing it to travel slowly. This results in a lower retention factor (Rf)." },
                { q: "Which statement correctly describes the behavior of real gases compared to ideal gases?", a: "c", options: {a: "Real gases behave most ideally at low temperatures and high pressures", b: "The volume of a real gas is negligible compared to the total space of the container", c: "Attractive forces between molecules cause real gases to exert less pressure than ideal gases", d: "Collisions of real gas molecules lose kinetic energy"}, exp: "Under conditions of high pressure or low temperatures, gas molecules are closer together. The intermolecular attractions between the gas molecules 'pull' them inward, resulting in fewer collisions with the container walls and lower pressure than predicted by the ideal gas law." },
                { q: "A sample of N_2 gas and a sample of O_2 gas are kept at the same temperature. Which of the following statements is true?", a: "c", options: {a: "The N_2 molecules have a higher average kinetic energy than the O_2 molecules", b: "The O_2 molecules have a higher average speed than the N_2 molecules", c: "Both gases have the same average kinetic energy", d: "The velocity of all N_2 molecules is the same"}, exp: "Temperature is a direct measure of the average kinetic energy of gas particles. Since both samples are at the same temperature, their particles have the same average kinetic energy, regardless of their different masses." },
                { q: "A 5.0L flask contains 0.20 mol of He gas and 0.30 mol of Ne gas at a certain temperature. What is the partial pressure of the He gas if the total pressure is 2.5 atm?", a: "b", options: {a: "0.50 atm", b: "1.0 atm", c: "1.5 atm", d: "2.0 atm"}, exp: "According to Dalton's law, the partial pressure of a gas is equal to its mole fraction multiplied by the total pressure. The total moles = 0.20+0.30=0.50 mol. The mole fraction of He=0.20/0.50=0.40. The partial pressure of He=0.40*2.5 atm=1.0 atm." },
                { q: "What is the density of O_2 gas at standard temperature and pressure (STP)?(Molar mass of O_2=32.0g/mol, standard volume=22.4L/mol)", a: "b", options: {a: "0.71 g/L", b: "1.43 g/L", c: "2.86 g/L", d: "32.0 g/L"}, exp: "At STP, one mole of any ideal gas occupies 22.4 L. The density of a gas is calculated as mass/volume. Therefore, density=32.0g/22.4L=1.43 g/L." },
                { q: "A student measures the absorbance of a colored solution using a spectrophotometer. If the concentration of the solution is doubled, what happens to the absorbance, assuming the path length remains constant?", a: "c", options: {a: "It is halved", b: "It remains the same", c: "It is doubled", d: "It is quadrupled"}, exp: "The Beer-Lambert Law, A=(molar absorptivity)bc, (where A is absorbance, b is path length, c is concentration), shows that absorbance is directly proportional to concentration. If the concentration doubles, the absorbance will also double." },
                { q: "Which of the following properties is characteristic of network covalent solids like diamond (C) and quartz (SiO_2)?", a: "b", options: {a: "Low melting points", b: "Poor electrical conductivity", c: "Soluble in water", d: "Malleable"}, exp: "Network covalent solids are held together by a continuous 3D network of covalent bonds. This makes them extremely hard and characterized by very high melting points. Because there are no free-moving electrons or mobile ions, they are poor electrical conductors." },
                { q: "Which of the following ionic compounds is expected to have the highest lattice energy?", a: "c", options: {a: "NaCl", b: "KCl", c: "MgO", d: "CaO"}, exp: "Lattice energy increases as the charges of the ions increase and as the ionic radii decrease (Coulomb's law). Mg 2+ and O 2- have the higher charges (+2 and -2) than Na+ and Cl-, and they are physically smaller,creating a much stronger electrostatic attraction." },
                { q: "When LiCl is dissolved in water, the temperature of the water increases. Which of the following statements about the dissolution process is accurate?", a: "b", options: {a: "The energy required to break the ionic lattice is greater than the energy released when ion-dipole interactions form", b: "The hydration energy of the ions is greater than the lattice energy of the solid", c: "The process is endothermic", d: "The entropy of the system decreases"}, exp: "The dissolution of an ionic salt involves breaking the ionic bonds in the lattice (requires energy) and forming ion-dipole interactions with water (releases energy). Because the temperature of the water increases, the process is exothermic, meaning the energy released from forming ion-dipole interactions (hydration energy) exceeds the energy required to break the lattice." }
            ],
            4: [
                { q: "Which reaction is best classified as a synthesis (combination) reaction?", a: "b", options: {a: "CaCO_3(s)->CaO(s)+CO_2(g)", b: "2K(s)+Cl_2->2KCl(s)", c: "Zn(s)+CuSO_4(aq)->ZnSO_4(aq)+Cu(s)", d: "HCl(aq)+NaOH(aq)->NaCl(aq)+H_2O(l)"}, exp: "A synthesis reaction occurs when two or more simpler substances combine to form a single compound. In option B, elemental potassium and chlorine react to form potassium chloride, a single product. Choice A is decomposition, C is single replacement, and D is double replacement (acid-base). Recognizing the number of reactants versus products is critical for correct classification." },
                { q: "Which reaction represents a decomposition reaction?", a: "c", options: {a: "2Na(s)+Cl_2(g)->2NaCl(s)", b: "Mg(s)+2HCl(aq)->MgCl_2(aq)+H_2(g)", c: "2HgO(s)->2Hg(l)+O_2(g)", d: "AgNO_3(aq)+NaCl(aq)->AgCl(s)+NaNO_3(aq)"}, exp: "Decomposition reactions involve a single compound breaking apart into two or more simpler substances. In option C, solid mercury(II) oxide decomposes into liquid mercury and oxygen gas. THe other options involve either combination or exchange of components. Students often confuse decomposition with combustion, but decomposition does not require oxygen as a react." },
                { q: "Which reaction type always involves two ionic compounds exchanging ions?", a: "d", options: {a: "Synthesis", b: "Decomposition", c: "Single replacement", d: "Double replacement"}, exp: "Double-replacement reactions involve two ionic compounds, usually aqueous, exchanging ions to form two new compounds. This category includes precipitation, acid-base, and gas-forming reactions. The other reaction types do not involve ion exchange between two compounds." },
                { q: "Which is the correct net ionic equation for mixing aqueous AgNO_3 and NaCl?", a: "c", options: {a: "AgNO_3(aq)+NaCl(aq)->AgCl(s)+NaNO_3(aq)", b: "Ag+(aq)+NO_3- ->AgCl(s)+Na+(aq)+NO_3-(aq)", c: "Ag+(aq)+Cl-(aq)->AgCl(s)", d: "Na+ +NO_3-(aq)->NaNO_3(aq)"}, exp: "The net ionic equation shows only species that change. AgNO_3 and NaCl are strong electrolytes and dissociate completely; Na+ and NO_3- remain unchanged and are spectators. Removing spectators leave Ag+ and Cl- forming solid AgCl. Options A and B are molecular/complete ionic forms, not net ionic." },
                { q: "Which substance should remain intact (not dissociate) in a complete ionic equation?", a: "c", options: {a: "NaCl(aq)", b: "HCl(aq)", c: "CH_3COOH(aq)", d: "KNO_3(aq)"}, exp: "Aceitic acid is a weak acid and therefore a weak electrolyte; it does not fully ionize and is written as a molecular species in complete ionic equations. NaCl, HCl, and KNO_3 are strong electrolytes and must be written as ions." },
                { q: "Which molecular equation correctly represents a precipitation reaction?", a: "b", options: {a: "NaNO_3(aq)+KCl(aq)->NaCl(aq)+KNO_3(aq)", b: "BaCl_2(aq)+Na_2SO_4(aq)->BaSO_4(s)+2NaCl(aq)", c: "HCl(aq)+NaOH(aq)->NaCl(aq)+H_2O", d: "CaCO_3(s)->CaO(s)+CO_2(g)"}, exp: "Barium sulfate is insoluble, so a solid precipitate forms. Option A produces only soluble salts (no reaction). Option C is acid-base neutralization(water formation), and D is decomposition. Identifying the solid via solubility rules is essential." },
                { q: "Which is the correct net ionic equation for mixing Na_2CO_3(aq) and HNO_3(aq)?", a: "b", options: {a: "Na_2CO_3+2HNO_3->2NaNo_3+Co_2+H_2O", b: "CO_3 ^-2(aq)+2H^+(aq)->CO_2(g)+H_2O(l)", c: "Na^+ + NO_3^- ->NaNO_3", d: "CO_3 2- + HNO_3->HCO_3-"}, exp: "Carbonate ions react with hydrogen ions to form carbonic acid, which decomposes into CO_2 and water. Sodium and nitrate ions are spectators and must be canceled." },
                { q: "Which pair of aqueous solutions will form a precipitate when mixed?", a: "b", options: {a: "NaNO_3(aq)+KCl(aq)", b: "AgNO_3(aq)+NaCl(aq)", c: "NH_4Cl(aq)_NaSodium chloride is insoluble according to solubility rules. Sodium and nitrate salts are always soluble, so the other combinations produce no precipitate. Recognizing Ag+ as an exception to halide solubility is essential.NO_3(aq)", d: "K_2SO_4(aq)+NaNO_3(aq)"}, exp: "" },
                { q: "Which net ionic equation correctly represents the reaction of AgNO_3(aq) and NaBr(aq)?", a: "c", options: {a: "AgNO_3+NaBr->AgBr+NaNO_3", b: "Ag+ +NO_3- + Na+ + Br- ->AgBr+Na+ +NO_3-", c: "Ag2+(aq)+Br-(aq)->AgBr(s)", d: "Na+ +NO_3- ->NaNO_3"}, exp: "Sodium bromide is insoluble and precipitates. Sodium and nitrate ions are spectators and must be canceled. Choice C shows only the species that undergo chemical change." },
                { q: "Which reaction forms a precipitate due to a carbonate exception?", a: "b", options: {a: "Na_2CO_3 + KCl", b: "Na_2CO_3 + CaCl_2", c: "Na_2CO_3 + NaNO_3", d: "K_2CO_3 + NaCl"}, exp: "Calcium carbonate is insoluble. Carbonates are generally insoluble except with Group 1 and NH_4+ ions. Calcium is not an exception so a precipitate forms." },
                { q: "Which reaction represents strong acid-strong base neutralization?", a: "b", options: {a: "CH_3COOH(aq)+NaOH(aq)", b: "HCl(aq)+NaOH(aq)", c: "NH_3(aq)+HCl(aq)", d: "H_2CO_3(aq)+KOH(aq)"}, exp: "Hydrochloric acid and sodium hydroxide are both strong electrolytes. They fully dissociate and neutralize to form water and a soluble salt. The defining net ionic pattern is H+ + OH- ->H_2O, which only applies to strong acid-strong base pairs." },
                { q: "What is the net ionic equation for HCl(aq)+KOH(aq)?", a: "c", options: {a: "K+ + Cl- ->KCl", b: "HCl+KOH->Kcl+H_2O", c: "H+(aq)+OH-(aq)->H_20(l)", d: "K+ + OH- ->KOH"}, exp: "Both reactants fully dissociate; K+ and Cl- are spectators. Removing spectators leaves hydrogen and hydroxide ions forming water. This simplified net ionic equation is the hallmark of strong acid-strong base neutralization." },
                { q: "Which ions are spectator ions in HNO_3(aq)+NaOH(aq)?", a: "b", options: {a: "H+ and OH-", b: "Na+ and NO_3-", c: "H+ and NO_3-", d: "Na+ and OH-"}, exp: "Sodium and nitrate ions remain unchanged before and after the reaction, so they are spectators. Hydrogen and hydroxide ions react to form water and must remain in the net ionic equation" },
                { q: "What is the oxidation number of sulfur in SO_4 2-?", a: "d", options: {a: "-2", b: "+2", c: "+4", d: "+6"}, exp: "Oxygen is -2 each (4*-2=-8). The overall change is -2, so sulfur must be +6 to balance +6+(-8)=-2. Sulfate is a classic polyatomic ion used to test careful oxidation-state bookkeeping." },
                { q: "What is the oxidation number of carbon in CO_2?", a: "d", options: {a: "-4", b: "-2", c: "+2", d: "+4"}, exp: "Oxygen is =2 each (2*-2=-4). The molecule is neutral, so carbon must be +4 to balance. Combustion products like CO_2 commonly test high oxidation states of carbon." },
                { q: "Which reaction represents oxidation?", a: "b", options: {a: "Cl_2(g)->2Cl-(aq)", b: "Fe2+(aq)->Fe3+(aq)", c: "O_2(g)->O2-(s)", d: "Cu2+(aq)->Cu(s)"}, exp: "Iron goes from +2 to +3, an increase in oxidation number, meaning loss of an electron. The other processes involve gain of electrons(reduction)." },
                { q: "Which reaction will occur spontaneously based on the activity series?", a: "b", options: {a: "Cu(s)+Zn2+(aq)->Cu2+(aq)+Zn(s)", b: "Zn(s)+Cu2+(aq)->Zn2+(aq)+Cu(s)", c: "Ag(s)+Na+(aq)->Ag+(aq)+Na(s)", d: "Au(s)+Fe2+(aq)->Au2+(aq)+Fe(s)"}, exp: "Zinc is more active than copper and can displace Cu2+ from solution. The reverse (A) will not occur. SOdium is far more reactive than silver (C), and gold is less reactive than iron (D). Activity series predicts feasibility of single-replacement oxidation." },
                { q: "How many moles of H_2O are produced when 3.0 moles of O_2 react completely in 2H_2+O_2->H_2O?", a: "c", options: {a: "3.0", b: "4.0", c: "6.0", d: "1.5"}, exp: "From the balanced equation, 1 mole of O_2 produces 2 moles of H_2O. Using the mole ratio (2mol H_2O/1 mole O_2), 3.0 mole O_2*2=6.0 mol H_2O. No masses are needed-this is a pure mole-to-mole conversion." },
                { q: "How many moles of CO_2 form when 5.0 moles of C_3 H_8 combust? C_3 H_8+5O_2->3CO_2+4H_2O?", a: "d", options: {a: "5.0", b: "10.0", c: "12.0", d: "15.0"}, exp: "The mole ratio from the balanced equation is 3 mol of CO_2 per 1 mol of C_3H_8. 5.0 mol C_3H_8*3=15.0 mol CO_2. This is a direct mole-to-mole stoichiometry problem." },
                { q: "How many grams of NaCl are produced when 2.0 moles of NaOH react? HCl+NaOH->NaCl+H_2O?", a: "c", options: {a: "58 g", b: "94 g", c: "117 g", d: "234 g"}, exp: "The mole ratio is 1:1, so 2.0 moles NaOH produce 2.0 moles NaCl. The molar mass of NaCCl is about 58.5 g/mol. 2.0*58.5=117 g. Always convert moles to mass at the final step." },
                { q: "When 6.0 g of H_2 reacts with reactant is it limiting? 2H_2+O_2->2H_2O?", a: "a", options: {a: "H_2", b: "O_2", c: "Neither", d: "Cannot be determined"}, exp: "Convert to moles: H_2: 6.0g /2.0g/mol=3.0 mol  O_2: 64.0g /32 g/mol=2.0 mole The ratio requires 2 mole of H_2 per 1 mole of O_2. 2.0 mol O_2 would need 4.0 mol of H_2, but only 3.0 mol are available, so H_2 is limiting." },
                { q: "When 10.0 g of Al reacts with 35.0 g of O_2, which reactant is limiting? 4Al+3O_2->2Al_2O_3?", a: "a", options: {a: "Al", b: "O_2", c: "Neither", d: "Cannot be determined"}, exp: "Convert to moles: Al: 10.0g/27.0 is about 0.370 mol, O_2: 35.0g/32.0 is about 1.09 mol The ratio requires 4 mol of H_2 per 3 mol of O_2. 0.370 mol Al needs only  0.278 mol of O_2, so Al is limiting." },
                { q: "What does the theoretical yield of a reaction represent?", a: "b", options: {a: "The amount of product actually collected", b: "The maximum possible product from the limiting reactant", c: "The average experimental result", d: "The product formed after purification"}, exp: "The theoretical yield is the maximum amount of product that can form if the reaction goes perfectly according to stoichiometry and the limiting reactant is completely consumed. It is calculated, not measured, and serves as a benchmark for evaluating experimental efficiency." },
                { q: "A reaction has a theoretical yield of 40.0 g and an actual yield of 30.0 g. What is the percent yield?", a: "c", options: {a: "60%", b: "70%", c: "75%", d: "80%"}, exp: "Percent yield=(actual yield/theoretical yield)*100 = (30.0/40.0)*100=75%. This calculation compares experimental results to the ideal maximum." },
                { q: "A reaction has a theoretical yield of 80.0 g but produces 56.0 g of product. What is the percent yield?", a: "c", options: {a: "60%", b: "65%", c: "70%", d: "75%"}, exp: "Percent yield is calculated using the ratio of actual yield to theoretical yield (56.0/80.0)*100=70%. This value indicates that 70% of the maximum possible product was successfully obtained under the experimental conditions." },
                { q: "Which statement correctly describes an exothermic reaction?", a: "b", options: {a: "Energy is absorbed by the system", b: "Energy is released to the surroundings", c: "Bonds are broken only", d: "Products have more energy than reactants"}, exp: "In an exothermic reaction, energy is released from the system to the surroundings, often as heat. This means the products are a lower potential energy than the reactants." },
                { q: "Which statement correctly describes an endothermic reaction?", a: "c", options: {a: "Energy is released to the surroundings", b: "Products are lower in energy than reactants", c: "Energy is absorbed by the system", d: "Temeprature of surroundings increases"}, exp: "Endothermic reactions absorb energy from the surroundings. As a result, the products have higher potential energy than the reactants. The surroundings often cool slightly, which helps distinguish endothermic from exothermic processes." },
                { q: "In an exothermic reaction, the potential energy of the products is:", a: "c", options: {a: "Greater than reactants", b: "Equal to reactants", c: "Less than reactants", d: "Unrelated to reactants"}, exp: "Endothermic reactions release energy, meaning energy is lost from the system. Therefore, the products release energy would be lower in potential energy than the reactants. Energy conservation requires this drop in energy to match the energy released." },
                { q: "A particle diagram shows 4 hydrogen molecules (H_2) and 1 oxygen molecule (O_2) before reaction. After reaction, what particles must remain unreacted?", a: "c", options: {a: "No particle remains", b: "1 H_2 molecule", c: "2H_2 molecules", d: "1 O_2 molecule"}, exp: "The balanced equation is 2H_2 +O_2->2H_2O. One O_2 reacts with only 2H_2 molecules. Since 4 H_2 are present initially, only half react. The remaining 2 H_2 molecules stay unre" },
                { q: "Which feature of a particle model best represents a balanced chemical equation?", a: "c", options: {a: "Equal number of molecules", b: "Equal number of particles", c: "Equal number of atoms before and after", d: "Equal number of bonds"}, exp: "Balanced equations ensure conservation of atoms. Particle models must show the same number of each type of atoms before and after reaction." },
                { q: "Which particulate change indicates product formation?", a: "c", options: {a: "Particles seperate", b: "Bonds break only", c: "New bonds appear", d: "Colors change"}, exp: "New bonds between atoms indicate formation of products. This is the defining feature of a chemical reaction in particle models." },
                { q: "Which of the following is a clear sign that a chemical reaction has occured?", a: "c", options: {a: "A substance dissolves in water", b: "A solid melts at room temperature", c: "A color change occurs when two solutions mix", d: "A liquid evaporates"}, exp: "A color change when substances are mixed indicates a chemical change, often due to the formation of new substances." },
                { q: "Which of the following best describes a combustion reaction?", a: "c", options: {a:"A metal combines with a nonmetal to form a salt", b: "A compound breaks down into its elements", c: "A hydrocarbon reacts with oxygen to produce CO_2 and H_2O", d: "Two ionic compounds exchange ions to form a precipitate"}, exp: "Combustion involves a hydrocarbon reaction with oxygen, forming CO_2 and H_2O." },
                { q: "A student combines solutions of silver nitrate and sodium chloride, and a while precipitate forms. What type of reaction occurred?", a: "c", options: {a: "Synthesis", b: "Decomposition", c: "Double replacement", d: "Combustion"}, exp: "This is a double replacement reaction as it forms AgCl (precipitate) and NaNO_3 in solution." }
            ],
            5: [
                { q: "Which statement best describes a reversible reaction at equilibrium?", a: "c", options: {a: "The reaction has stopped completely", b: "The concentrations has stopped completely", c: "The forward and reverse reactions occur at the same rate", d: "All reactants have been converted into products"}, exp: "" },
                { q: "In a system at dynamic equilibrium, which of the following is true?", a: "c", options: {a: "No molecular motion occurs", b: "Forward and reverse reaction rates are zero", c: "Molecular collisions continue to occur", d: "Products are no longer reacting"}, exp: "" },
                { q: "Which reaction is most clearly an example of a reversible chemical equilibrium?", a: "c", options: {a: "Combustion of gasoline", b: "Rusting of iron", c: "Formation of ammonia in the Haber process", d: "Burning magnesium ribbon"}, exp: "" },
                { q: "What does the equilibrium constant (K) primarily indicate about a reaction?", a: "c", options: {a: "The speed of the reaction", b: "The time required to reach equilibrium", c: "The relative amounts of products and reactants at equilibrium", d: "The activation energy of the reaction"}, exp: "" },
                { q: "Which statement about the equilibrium constant K is always true?", a: "c", options: {a: "It changes as concentrations change", b: "It is equal to the reaction rate", c: "It depends on the temperature", d: "It must be greater than 1"}, exp: "" },
                { q: "For the reaction 2NO_2(g)<->N_2O_4(g) Which is the correct Kc expression?", a: "b", options: {a: "[NO_2]^2/[N_2O_4]", b: "[N_2O_4]/[NO_2]^2", c: "[NO_2]/[N_2O_4]", d: "[N_2O_4]^2/[NO_2]^2"}, exp: "" },
                { q: "What does the equilibrium constant mathematically represent?", a: "b", options: {a: "The ratio of reaction rates", b: "The ratio of product and reactant concentrations at equilibrium", c: "The amount of reactant consumed", d: "The speed of equilibrium establishment"}, exp: "" },
                { q: "Why are ICE tables useful when working with equilibrium constants?", a: "b", options: {a: "They calculate reaction rates", b: "They track concentration changes from initial to equilibrium", c: "They determine activation energy", d: "They predict temperature effects"}, exp: "" },
                { q: "What is the primary purpose of an ICE table when calculating equilibrium concentrations?", a: "b", options: {a: "To determine reaction rate", b: "To organize concentration changes logically", c: "To eliminate algebra", d: "To calculate temperature effects"}, exp: "" },
                { q: "A reaction has only reactants present initially. What can be concluded before calculation?", a: "d", options: {a: "The reaction is already at equilibrium", b: "Q>K", c: "Q=K", d: "Q<K"}, exp: "" },
                { q: "What does Le Chatelier's principle state?", a: "c", options: {a: "Systems always favors products", b: "Reactions proceed to completion", c: "A system at equilibrium responds to stress by counteracting it", d: "Equilibrium constants change to reduce stress"}, exp: "" },
                { q: "What is the correct order of steps when solving equilibrium concentration problems?", a: "b", options: {a: "Write ICE->calculate x->compare Q and K", b: "Compare Q and K->write ICE->solve->validate", c: "Solve for x->Write ICE->validate", d: "Write K->calculate equilibrium->Check Q"}, exp: "" },
                { q: "What is the reaction quotient (Q)?", a: "c", options: {a: "The equilibrium constant at equilibrium", b: "A ratio using equilibrium concentrations only", c: "A ratio using current concentrations at any time", d: "A measure of reaction speed"}, exp: "" },
                { q: "How does the expression for Q compare to the expression for K?", a: "", options: {a: "Q includes solids while K does not", b: "Q uses different exponents", c: "Q uses the same mathematical format as K", d: "Q is written only for gases"}, exp: "" },
                { q: "Q=K, what can be concluded?", a: "", options: {a: "The reaction has stopped", b: "The reaction is at equilibrium", c: "The reaction is irreversible", d: "Concentrations are equal"}, exp: "" },
                { q: "Which statement correctly describes Q immediately after a reactant is added to a system at equilibrium?", a: "", options: {a: "Q remains equal to K", b: "Q decreases or increases depending on the reactant added", c: "Q changes only after the system shifts", d: "Q becomes 0"}, exp: "" },
                { q: "A system at equilibrium has additional reactants added. What is the immediate effect?", a: "", options: {a: "The equilibrium constant increases", b: "The system shifts to consume the added reactant", c: "The reaction stops temporarily", d: "The temperature increases"}, exp: "" },
                { q: "For a gas-phase equilibrium, increasing pressure favors which side?", a: "", options: {a: "The side with more gas moles", b: "The side with fewer gas moles", c: "The side with higher molar mass", d: "The side with solids"}, exp: "" },
                { q: "For an endothermic reaction, increasing temperature causes the system to:", a: "", options: {a: "Shifts toward reactants", b: "Shift towards products", c: "Remain unchanged", d: "Increase pressure"}, exp: "" },
                { q: "What is the single most important rule for Le Chatelier questions?", a: "", options: {a: "Always count coefficients", b: "Only temperature changes K", c: "Presure always causes shifts", d: "Catalysts favor products"}, exp: "" },
                { q: "A system at equilibrium has its reactant concentration doubled. What happens next?", a: "", options: {a: "The equilibrium constant doubles", b: "The system shifts to consume reactant", c: "The reaction stops", d: "The system becomes irreversible"}, exp: "" },
                { q: "What does an energy diagram for a reversible reaction primarily illustrate?", a: "", options: {a: "Reaction speed", b: "Amount of catalyst used", c: "Relative energies of reactants, products, and transition states", d: "Value of the equilibrium constant"}, exp: "" },
                { q: "If products are lower in energy than reactants, which statement is correct?", a: "", options: {a: "ΔG>0 and K<1", b: "ΔG<0 and K>1", c: "ΔG=0 and K=1", d: "Reaction is irreversible"}, exp: "" },
                { q: "If ΔG=0, what can be concluded about equilibrium?", a: "", options: {a: "Reaction does not occur", b: "Reactants are favored", c: "Products are formed", d: "Neither sides is favored"}, exp: "" },
                { q: "What distinguishes Kp from Kc?", a: "", options: {a: "Kp uses molarity;Kc uses pressure", b: "Kp uses partial pressures;Kc uses concentrations", c: "Kp applies only to liquid", d: "Kp changes with catalysts"}, exp: "" },
                { q: "A concentration vs. time graph shows reactant concentration decreasing and then becoming constant. What does the flat region indicate?", a: "", options: {a: "Reaction has stopped", b: "Reactants are exhausted", c: "Equilibrium has been reached", d: "Reaction is irreversible"}, exp: "" },
                { q: "A sudden increase in product concentration appears as a vertical jump on a graph. What likely occured?", a: "", options: {a: "Temperature change", b: "Catalysts added", c: "Product added", d: "Pressure decreased"}, exp: "" },
                { q: "Which factor directly increases the rate of a chemical reaction?", a: "", options: {a: "Increasing temperature", b: "Decreasing surface area", c: "Diluting the reactants", d: "Removing a catalyst"}, exp: "" },
                { q: "Why does increasing the concentration of a reactant typically increase the reaction rate?", a: "", options: {a: "It increases the molar mass", b: "It lowers activation energy", c: "It leads to more collisions per unit time", d: "It changes the enthalpy of reaction"}, exp: "" },
                { q: "A reaction is first order in A. If [A]=0.40M and the rate constant k=0.20 s^-1, what is the rate?", a: "", options: {a: "0.08 M/s", b: "0.50 M/s", c: "0.20 M/s", d: "0.80 M/s"}, exp: "" },
                { q: "Which best defines the activation energy of a reaction?", a: "", options: {a: "The energy released during product formation", b: "The difference in energy between reactants and products", c: "The energy required to break ionic bonds", d: "The minimum energy needed for an effective collsion"}, exp: "" },
                { q: "Given the rate law Rate=k[A][B]^2, what is the order of the reaction?", a: "", options: {a: "First-order", b: "Second-order", c: "Third-order", d: "Zero-order"}, exp: "" },
                { q: "C_12H_22O_11(aq) + H_2O(l)->2C_6H_12O_6(aq) The chemical equation shown above represents the hydrolysis of sucrose. Under certain conditions, the rate is directly proportional to the concentration of sucrose. Which statement supports how a change in conditions can increase the rate of this reaction?", a: "", options: {a: "Increasing the amount of water in which the sugar is dissolved will increase the frequency of collisions between the sucrose molecules and the water molecules resulting in an increase in the rate of hydrolysis.", b: "Decreasing the temperature will increase the frequency of the collisions between the sucrose molecules and the water molecules resulting in an increase in the rate of hydrolysis.", c: "Increasing the concentration of sucrose will increase the rate of hydrolysis by increasing the frequency of the collisions between the sucrose and the water molecules.", d: "Decreasing the concentration of sucrose will increase the rate of hydrolysis by increasing the frequency of the collisions between the sucrose and the water molecules."}, exp: "" },
                { q: "CH_3I+NaOH ->CH_3OH+NaI. The rate of the expression represented by the chemical equation shown above is expressed as rate = k[CH_3I][NaOH]. Based on this information, which of the following claims is correct?", a: "", options: {a: "The reaction will proceed at a slower rate with increasing temperature", b: "The rate of the reaction will double when the concentrations of both CH_3I and NaOH are doubled", c: "The rate of the reaction will double if the concentration of CH_3I is doubled while keeping the concentration of NaOH constant", d: "A larger amount of CH_3OH will be produced if the concentrations of CH_3I and NaOH are halved"}, exp: "" }
            ],
            6: [
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" }
            ],
            7: [
                { q: "Chemical equilibrium is most likely analogous to which physical situation?", a: "c", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "A system at equilibrium is disturbed, and both forward and reverse reaction rates increase, yet equilibrium position does not change. Why does this not violate Le Chatelier's principle?", a: "c", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "A reaction has a very small K, yet the product concentration is nonzero at equilibrium. Which statement best explains this?", a: "b", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "A reaction mixture is at equilibrium. A student removes a small amount of product, but the measured equilibrium concentrations after re-equilibration are numerically identical to before. Which conclusion is valid?", a: "c", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "A student observes that Q = K at a single instant. What can be concluded with certainty?", a: "c", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "A system is at equilibrium. Reactants are added, but equilibrium concentrations of both reactants and products increase after re-equilibration. Which conclusion is logically valid?", a: "d", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "A reaction has K=1.0*10^-3 at 25°C. Which statement must be true?", a: "b", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "Which conclusion can be drawn if a reaction reaches the same equilibrium composition from three different starting mixtures?", a: "d", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "A system is at equilibrium. A student adds reactant and immediately measures concentrations before any shift occurs. Which statement must be true at that instant?", a: "b", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "Two experiments of the same reaction are conducted at the same temperature. Both reach equilibrium, but Experiment 1 has a larger product-to-reactant ratio than Experiment 2. Which conclusion is valid?", a: "d", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "A concentration-time graph shows reactant concentration decreasing smoothly and then becoming constant, while product reactant increases and then becomes constant. What does the flat portion of both curves  indicate?", a: "c", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "Which change causes an equilibrium shift only because concentrations change, not because pressure changes?", a: "d", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "A reaction mixture is prepared with reactants only and then sealed at constant temperature. Which statement must be true before equilibrium is reached?", a: "c", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "Which change will increase the value of KKK for an endothermic reaction?", a: "b", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "If a reaction mixture has Q=4.5Q=4.5Q=4.5 and K=1.2K=1.2K=1.2, what will occur?", a: "b", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "Which change will not shift the equilibrium position of a system?", a: "c", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "What does it mean for a chemical reaction to be at dynamic equilibrium?", a: "b", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "Which observation indicates that a chemical system has reached equilibrium?", a: "c", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "For the reaction: N_2(g)+3H_2(g)<-->2NH_3(g)+heat  Which change will shift the equilibrium to the right?", a: "b", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "In the exothermic reaction: 2NO(g)+O_2(g)<-->2NO-2(g), which happens if temperature is increased?", a: "c", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "A student says that increasing pressure always favors the product side. Is this true?", a: "c", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "N_2(g)+3H_2(g)<-->2NH_3(g), Give the reaction above, what is the equilibrium constant, Kc?", a: "c", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "At a constant temperature, which of the following reactions would be affected from a change in pressure?", a: "a", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "At a constant temperature, an increase in pressure would lead to an increase in product for which of the following reactions?", a: "c", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "CaCO_3(g)+energy<-->CaO(s)+CO_2(g), The given reaction above takes place in a container. Given the reaction, which of the following changes would lead to an increase in the concentration of CO_2(g)?", a: "a", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "H_2(g)+I_2(g)<-->2HI ΔH=58 kJ/mol, The reaction provided is in an equilibrium at 25°C. What is the expression of the equilibrium constant for the reaction?", a: "a", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "Which of the following changes would affect the reverse reaction to speed up?", a: "b", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "Which of the following would lead to a reduction in the value of the equilibrium constant?", a: "a", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "The value of the Kc is 5.0. Which of the following would result in order to reach equilibrium if the initial concentration of all three species is 3.0?", a: "b", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "2NO(g)<-->N_2(g)+O_2(g) From the reaction given above, what is the expression of the equilibrium constant, Kp?", a: "a", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "The reaction provided above has reached equilibrium at a certain temperature. During that time, the partial pressure due to No has 3 atmospheres, the partial pressure due to N_2 has 2 atmospheres, and the partial pressure due to O_2 was 3 atmospheres. What is the value of the equilibrium constant, Kp?", a: "b", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "The Ksp value of AgBr is 7.7*10^-13. Which of the following is equal to the solubility of AgBr?", a: "c", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "Pb 2+(aq)+Zn 2+(s) <-->Pb(s)+Zn 2+(aq) Keq=3*10^30. A student performed an experiment where he put a 0.20 mol sample of solid zinc into a 500mL solution of 1.0M PbSO_3(aq). After a long period of time, what would be a possible result?", a: "d", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "The solubility of AgI is 8.0*10^-17. What is the solubility product constant Ksp, for AgI?", a: "d", options: {a: "", b: "", c: "", d: ""}, exp: "" }
            ],
            8: [
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" }
            ],
            9: [
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" },
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" }
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
            { x: 468.80, y: 64 },
            { x: 468.80, y: 215 },
            { x: 468.80, y: 367 },
            { x: 283, y: 298 }
        ];

        const obstacleOnePositions = [
            { x: 283, y: 135 }
        ];

        obstaclePositions.forEach(pos => {
            let obs = this.obstacles.create(pos.x, pos.y, "redObstacle").setScale(0.015, 0.2);
            obs.setImmovable(true);
        });

        obstacleOnePositions.forEach(pos => {
            let obs = this.obstacles.create(pos.x, pos.y, "redObstacle").setScale(0.015, 0.25);
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

        let promptText =
            q.q + "\n\n" +
            "A. " + q.options.a + "\n" +
            "B. " + q.options.b + "\n" +
            "C. " + q.options.c + "\n" +
            "D. " + q.options.d;

        let answer = prompt(promptText);
        if (answer && answer.trim().toLowerCase() === q.a.toLowerCase()) {
            obstacle.disableBody(true, true);
            return;
        }

        alert("Wrong. Try again.");
        let answer2 = prompt(promptText);
        if (answer2 && answer2.trim().toLowerCase() === q.a.toLowerCase()) {
            obstacle.disableBody(true, true);
            return;
        }

        alert("Correct answer: " + q.options[q.a] + "\nExplanation: " + q.exp);

        let finalAnswer = "";
        while (finalAnswer.trim().toLowerCase() !== q.a.toLowerCase()) {
            finalAnswer = prompt(promptText + "\n\nPlease enter the correct letter:");
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

        this.createFloorWithNotes(floor, 130, 450, 5);
        this.createFloorWithNotes(floor, 650, 450, 5);

        this.createFloorWithNotes(floor, 130, 340, 5);
        this.createFloorWithNotes(floor, 650, 340, 5);

        this.createFloorWithNotes(floor, 400, 220, 5);

        let wall = floor.create(580, 110, "groundOne").setScale(0.1, 8).refreshBody();

        // Obstacles
        this.obstacles = this.physics.add.group();

        const obstaclePositions = [
            { x: 294, y: 400 },
            { x: 475, y: 400 },
            { x: 295, y: 295 },

            { x: 475, y: 295 },

            { x: 220, y: 150 },
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

        let promptText =
            q.q + "\n\n" +
            "A. " + q.options.a + "\n" +
            "B. " + q.options.b + "\n" +
            "C. " + q.options.c + "\n" +
            "D. " + q.options.d;

        let answer = prompt(promptText);
        if (answer && answer.trim().toLowerCase() === q.a.toLowerCase()) {
            obstacle.disableBody(true, true);
            return;
        }

        alert("Wrong. Try again.");
        let answer2 = prompt(promptText);
        if (answer2 && answer2.trim().toLowerCase() === q.a.toLowerCase()) {
            obstacle.disableBody(true, true);
            return;
        }

        alert("Correct answer: " + q.options[q.a] + "\nExplanation: " + q.exp);

        let finalAnswer = "";
        while (finalAnswer.trim().toLowerCase() !== q.a.toLowerCase()) {
            finalAnswer = prompt(promptText + "\n\nPlease enter the correct letter:");
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

class Level3 extends Phaser.Scene {
    constructor() {
        super("Level3");
        this.score = 0;
        this.winningScore = 300;
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

        this.notes = this.physics.add.group();

        const columns = 8;
        const notesPerColumn = 3;

        const columnSpacing = 100;
        const rowSpacing = 80;

        const centerX = 400;
        const startX = centerX - ((columns - 1) * columnSpacing) / 2;

        const startY = 200;

        for (let col = 0; col < columns; col++) {
            for (let row = 0; row < notesPerColumn; row++) {
                let x = startX + col * columnSpacing;
                let y = startY + row * rowSpacing;

                let note = this.notes.create(x, y, "onenote").setScale(0.18);
                note.body.setAllowGravity(false);
                note.body.immovable = true;
            }
        }

        this.chemQuestions = this.scene.get("Level1").chemQuestions;

        // Validate unit after scene loads
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

        // Ground
        const groundY = 590;
        [90,180,270,360,450,540,630,720].forEach(x => {
            platforms.create(x, groundY, "ground").setScale(0.5, 0.75).refreshBody();
        });

        // Obstacles
        this.obstacles = this.physics.add.group();

        const obstaclePositions = [
            { x: 110, y: 330 },
            { x: 210, y: 330 },
            { x: 310, y: 330 },
            { x: 410, y: 330 },
            { x: 510, y: 330 },
            { x: 610, y: 330 },
            { x: 710, y: 330 }
        ];

        obstaclePositions.forEach(pos => {
            let obs = this.obstacles.create(pos.x, pos.y, "redObstacle").setScale(0.015, 0.75);
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

    collectNote(player, note) {
        note.disableBody(true, true);
        this.score += (300 / 24);
        this.scoreText.setText("Score: " + Math.floor(this.score) + "/" + this.winningScore);

        if (this.score >= this.winningScore) {
            alert("Congrats, you completed level 3! Now, the final level: level 4 is unlocked!");
            this.game.global.unlockedLevels = 4;
            this.homeButton.setVisible(true);
        }
    }

    handleObstacleCollision(player, obstacle) {
        let noteX = obstacle.x;
        let noteY = obstacle.y - 50;

        if (!this.obstaclesActive) return;
        if (!obstacle.active) return;

        let unitQuestions = this.chemQuestions[this.leastConfidentUnit];
        if (!unitQuestions || unitQuestions.length === 0) return;

        let q = unitQuestions[Math.floor(Math.random() * unitQuestions.length)];

        let promptText =
            q.q + "\n\n" +
            "A. " + q.options.a + "\n" +
            "B. " + q.options.b + "\n" +
            "C. " + q.options.c + "\n" +
            "D. " + q.options.d;

        let answer = prompt(promptText);
        if (answer && answer.trim().toLowerCase() === q.a.toLowerCase()) {
            obstacle.disableBody(true, true);
            return;
        }

        alert("Wrong. Try again.");
        let answer2 = prompt(promptText);
        if (answer2 && answer2.trim().toLowerCase() === q.a.toLowerCase()) {
            obstacle.disableBody(true, true);
            return;
        }

        alert("Correct answer: " + q.options[q.a] + "\nExplanation: " + q.exp);

        let finalAnswer = "";
        while (finalAnswer.trim().toLowerCase() !== q.a.toLowerCase()) {
            finalAnswer = prompt(promptText + "\n\nPlease enter the correct letter:");
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
            player.body.velocity.y = -700;
        }
    }
}

class Level4 extends Phaser.Scene {
    constructor() {
        super("Level4");
        this.score = 0;
        this.winningScore = 400;
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

        this.chemQuestions = this.scene.get("Level1").chemQuestions;

        this.time.delayedCall(100, () => {
            if (!this.game.global.leastConfidentUnit ||
                !this.chemQuestions[this.game.global.leastConfidentUnit]) {
                this.game.global.leastConfidentUnit = 1;
            }
            this.leastConfidentUnit = this.game.global.leastConfidentUnit;
        });

        const platforms = this.physics.add.staticGroup();
        const floor = this.physics.add.staticGroup();
        this.notes = this.physics.add.group();

        const groundY = 590;
        [90,180,270,360,450,540,630,720].forEach(x => {
            platforms.create(x, groundY, "ground").setScale(0.5, 0.75).refreshBody();
        });

        this.createFloorWithNotes(floor, 130, 140, 5);
        this.createFloorWithNotes(floor, 650, 140, 5);

        this.createFloorWithNotes(floor, 300, 450, 5);
        this.createFloorWithNotes(floor, 380, 350, 5);
        this.createFloorWithNotes(floor, 520, 250, 5);

        const bottomY = 500;
        const bottomStartX = 130;
        const bottomSpacing = 60;

        for (let i = 0; i < 10; i++) {
            let note = this.notes.create(bottomStartX + i * bottomSpacing, bottomY, "onenote").setScale(0.18);
            note.body.setAllowGravity(false);
            note.body.immovable = true;
        }

        const rightColumns = 5;
        const rightSpacing = 60;
        const rightCenterX = 650;
        const rightStartX = rightCenterX - ((rightColumns - 1) * rightSpacing) / 2;

        const startY = 190;

        for (let col = 0; col < columns; col++) {
            for (let row = 0; row < notesPerColumn; row++) {
                let x = startX + col * columnSpacing;
                let y = startY + row * rowSpacing;

                let note = this.notes.create(x, y, "onenote").setScale(0.18);
                note.body.setAllowGravity(false);
                note.body.immovable = true;
            }
        }

        let wall1 = floor.create(470, 390, "groundOne").setScale(0.15, 3).refreshBody();
        let wall2 = floor.create(550, 300, "groundOne").setScale(0.15, 3).refreshBody();
        let wall3 = floor.create(710, 380, "groundOne").setScale(0.05, 10).refreshBody();

        this.obstacles = this.physics.add.group();
        const obstaclePositions = [
            {x: 170, y: 395},

            {x: 327, y: 190},
            {x: 680, y: 190},

            {x: 290, y: 75},
            {x: 485, y: 75}
        ];

        const obstacleTwoPositions = [
            {x: 195, y: 240}
        ];

        obstaclePositions.forEach(pos => {
            let obs = this.obstacles.create(pos.x, pos.y, "redObstacle").setScale(0.015, 0.2);
            obs.setImmovable(true);
        });

        obstacleTwoPositions.forEach(pos => {
            let obs = this.obstacles.create(pos.x, pos.y, "redObstacle").setScale(0.015, 0.35);
            obs.setImmovable(true);
        });

        this.time.delayedCall(200, () => this.obstaclesActive = true);

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

        this.player = player;
        this.cursors = this.input.keyboard.createCursorKeys();

        this.scoreText = this.add.text(
            16, 16,
            "Score: 0/" + this.winningScore,
            { stroke: "#000", strokeThickness: 1.9, fontSize: "32px", fill: "#000" }
        );

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
        this.score += (400 / 40);
        this.scoreText.setText("Score: " + Math.floor(this.score) + "/" + this.winningScore);

        if (this.score >= this.winningScore) {
            alert("Congrats, you completed all the levels!");
            this.homeButton.setVisible(true);
        }
    }

    handleObstacleCollision(player, obstacle) {
        if (!this.obstaclesActive || !obstacle.active) return;

        let unitQuestions = this.chemQuestions[this.leastConfidentUnit];
        if (!unitQuestions || unitQuestions.length === 0) return;

        let q = unitQuestions[Math.floor(Math.random() * unitQuestions.length)];

        let promptText =
            q.q + "\n\n" +
            "A. " + q.options.a + "\n" +
            "B. " + q.options.b + "\n" +
            "C. " + q.options.c + "\n" +
            "D. " + q.options.d;

        let answer = prompt(promptText);
        if (answer && answer.trim().toLowerCase() === q.a.toLowerCase()) {
            obstacle.disableBody(true, true);
            return;
        }

        alert("Wrong. Try again.");
        let answer2 = prompt(promptText);
        if (answer2 && answer2.trim().toLowerCase() === q.a.toLowerCase()) {
            obstacle.disableBody(true, true);
            return;
        }

        alert("Correct answer: " + q.options[q.a] + "\nExplanation: " + q.exp);

        let finalAnswer = "";
        while (finalAnswer.trim().toLowerCase() !== q.a.toLowerCase()) {
            finalAnswer = prompt(promptText + "\n\nPlease enter the correct letter:");
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
    scene: [StartScene, CharacterScene, InstructionScene, HomeScene, CreditsScene, Level1, Level2, Level3, Level4],
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
