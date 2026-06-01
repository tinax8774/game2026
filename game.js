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
            { key: "Level1", x: 200, y: 200, label: "1" },
            { key: "Level2", x: 400, y: 200, label: "2" },
            { key: "Level3", x: 600, y: 200, label: "3" },
            { key: "Level4", x: 300, y: 370, label: "4" },
            { key: "Level5", x: 500, y: 370, label: "5" },
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
                { q: "How many moles of calcium carbonate (CaCO_3) are present in 200.0g of the compound?", a: "b", options: {a: "1.00 mol", b: "2.00 mol", c: "2.50 mol", d: "5.00 mol"}, exp: "To calculate moles, divide the mass by the molar mass. Calcium carbonate has a molar mass of approximately 100.1 g/mol (40.1+12.0+3*16.0). 200.0g / 100.1 g/mol = 2.00 mol." },
                { q: "A sample contains 75% of an isotope with mass 10 amu and 25% of an isotope with mass 11 amu. What is the average atomic mass?", a: "a", options: {a: "10.25 amu", b: "10.50 amu", c: "10.75 amu", d: "11.00 amu"}, exp: "Average atomic mass is calculated using a weighted average, not a simple mean. Each isotope's mass is multiplied by its fractional abundance: (10 * 0.75) + (11 * 0.25) = 7.50 + 2.75 = 10.25 amu. This reflects the fact that the lighter isotope is more abundant, pulling the average closer to its mass." },
                { q: "One mole of carbon-12 contains how many atoms?", a: "b", options: {a: "6.02*10^22", b: "6.02*10^23", c: "12.0*10^23", d: "1.0*10^23"}, exp: "Avogadro's number, 6.02*10^23 particles per mole, defines the mole. By definition, one mole of carbon-12 contains exactly this amount of atoms. This value provides the bridge between atomic-scale quantities and laboratory-scale measurements and is essential for all mole calculations in chemistry." },
                { q: "Which sample contains the greatest amount of atoms?", a: "d", options: {a: "1 mol of He", b: "1 mol of Ne", c: "1 mole of Ar", d: "All contain the same number"}, exp: "" },
                { q: "How many moles are present in 36.0g of water (H_2O)?", a: "b", options: {a: "1.0 mol", b: "2.0 mol", c: "18.0 mol", d: "0.50 mol"}, exp: "One mole of any substance contains the same number of particles (Avogadro's number). Even though helium, neon, and argon have different atomic masses, one mole of each contains 6.022*10^23 atoms. This highlights the importance of distinguishing between mass and number of particles." },
                { q: "Which particle contributes most to an atom's volume?", a: "c", options: {a: "Proton", b: "Neutron", c: "Electron Cloud", d: "Nucleus"}, exp: "" },
                { q: "A neutral atom has 17 protons. How many electrons does it contain?", a: "b", options: {a: "16", b: "17", c: "18", d: "Cannot be determined"}, exp: "The molar mass is approximately 18.0 g/mol. Dividing the given mass by the molar mass gives: 36.0 g / 18.0 g/mol = 2.0 mol." },
                { q: "Which best describes the relationship between atomic mass and molar mass?", a: "c", options: {a: "They are unrelated", b: "Atomic mass is larger", c: "Molar mass is atomic mass in grams", d: "Molar mass applies only to compounds"}, exp: "Although the nucleus contains nearly all of an atom's mass, it occupies very little space. The electron cloud extends far from the nucleus and defines the atom's size and volume. This explains why atoms are mostly empty space and why electron interactions dominate chemical reactions." },
                { q: "How many atoms are in 0.25 mol of neon?", a: "a", options: {a: "1.51*10^23", b: "6.02*10^23", c: "2.41*10^23", d: "0.25 atoms"}, exp: "In a neutral atom, the number of electrons equals the number of protons so that positive and negative charges balance. With 17 protons, the atom must also have 17 electrons. This principle is essential for understanding ion formation later in the course." },
                { q: "Which statement best distinguishes a pure substance from a mixture?", a: "b", options: {a: "A pure substance contains only one element", b: "A pure substance has fixed composition", c: "A mixture has a chemical formula", d: "A mixture cannot be separated"}, exp: "Atomic mass is expressed in atomic mass units for individual atoms, while molar mass represents the mass of one mole of those atoms in grams. Numerically, the values are the same. This relationship allows seamless conversion between atomic-scale and macroscopic quantities." },
                { q: "A compound is 52.2% carbon, 13.0% hydrogen, and 34.8% oxygen by mass. What is the first step in determining the empirical formula?", a: "b", options: {a: "Divide each percentage by atomic mass", b: "Assume 100 g of the compound", c: "Round percentages", d: "Calculate molar mass"}, exp: "To find the number of atoms, multiply the number of moles by Avogadro's number: 0.25 mol * 6.02*10^23 atoms/mol = 1.51*10^23 atoms." },
                { q: "What fundamental information does photoelectron spectroscopy provide about an atom?", a: "b", options: {a: "Atomic mass and isotope ratios", b: "Electron binding energies and subshell occupancy", c: "Molecular geometry", d: "Nuclear Stability"}, exp: "A pure substance (element or compound) has a fixed, constant composition and a definite set of properties. A mixture, in contrast, can have a variable composition depending on how much of each component is present. Elements are not the only pure substances—compounds are also pure if their composition is fixed." },
                { q: "Which of the following correctly compares periodic properties of two elements and provides an accurate explanation of that difference?", a: "d", options: {a: "The first ionization energy of Al is greater than that of B because Al has a larger molecular charge than B does", b: "The first ionization energy of F is greater than that of O because O has a larger electronegativity", c: "The atomic radius of Ca is larger than that of Mg because the valence electrons in Mg experience more shielding than the valence electrons in Ca do", d: "The atomic radius of Cl is smaller than that of S because Cl has a larger nuclear charge than S does"}, exp: "Assuming a 100 g sample allows percent values to be treated directly as grams, simplifying conversion to moles." },
                { q: "Which has a higher electronegativity?", a: "d", options: {a: "Cs", b: "Ag", c: "Pb", d: "Br"}, exp: "PES measures the energy required to remove electrons from an atom. Each peak corresponds to electrons in a specific subshell; the peak position reflects binding energy, while the peak area reflects the number of electrons present." },
                { q: "Which has the largest atomic radius?", a: "a", options: {a: "Cs", b: "Ag", c: "Pb", d: "Br"}, exp: "Chlorine (Cl) and Sulfur (S) are in the same period (row 3). Moving left to right across a period, the number of protons (nuclear charge) increases while the electron shielding remains relatively constant. This higher effective nuclear charge pulls the valence electrons closer to the nucleus, making the atomic radius of Cl smaller than that of S." },
                { q: "Which has the lowest first-ionization energy?", a: "a", options: {a: "Cs", b: "Ag", c: "Pb", d: "Br"}, exp: "Cesuim (Cs) has the largest atomic radius because it sits furthest down and to the left on the periodic table. Atomic size increases down groups as new electron shells are added, and decreases from left to right as a stronger nuclear charge pulls electrons inward. While Cs and lead (Pb) both have six electron shells- making them larger than silver (Ag) and bromine (Br)-Cs has far fewer protons have Pb. THis weaker nuclear pull allows the outermost electrons of cs to expand further outward, giving it the largest radius." },
                { q: "The elements in which of the following have most nearly the same atomic radius?", a: "b", options: {a: "Be, B, C, N", b: "Cr, Mn, Fe, Co", c: "Mg, Ca, Sr, Ba", d: "C, P, Se, I"}, exp: "These are all transition metals located in the middle of the fourth row. As you move across this row, electrons are added to an inner shell rather than the outermost shell. These inner electrons shield the outer electrons very effectively, which keeps the overall size of the atoms nearly identical. The other options involve elements from main groups where sizes change dramatically between rows and columns." },
                { q: "A sample of a compound that contains only the element C, H, and N is completely burned in O_2 to produce 44.0 g of CO_2, 45.0g of H_2O and some NO_2. A possible empirical formula of the compound is", a: "b", options: {a: "CH_2N", b: "CH_5N", c: "C_2H_5N", d: "C_3H_3N_2"}, exp: "When forty-four grams of carbon dioxide is produced, it contains exactly one mole of carbon atoms. When forty-five grams of water is produced, it contains exactly five moles of hydrogen atoms. This sets up a strict carbon to hydrogen ratio of one to five." },
                { q: "A 23.0 g sample of a compound contains 12.0 g of C, 3.0 g of H, and 8.0 g of O. Which of the following is the empirical formula of the compound?", a: "b", options: {a: "CH_3O", b: "C_2H_6O", c: "C_3H_9O_2", d: "C_4H_12O_2"}, exp: "Converting the given mass to moles yields 1 mole of carbon from the 12 grams, 3 moles of hydrogen from the 3 grams, and half a mole of oxygen from the 8 grams. To find the simplest whole number ratio, you divide all of these values by the smallest number, which is half a mole. This doubles the value to give 2 carbons, 6 oxygen, resulting in the empirical formula C_2H_5O." },
                { q: "A sample of a compound contains 3.21 g of sulfur and 11.4 g of fluorine. Which of the following represents the empirical formula of the compound?", a: "d", options: {a: "SF_2", b: "SF_3", c: "SF_4", d: "SF_6"}, exp: "Converting 3.21 grams of sulfur to moles gives roughly 0.1 moles. Converting eleven 11.4 g of fluorine to moles gives roughly 0.6 moles. Dividing both values of 0.1 shows that there are six fluorine atoms for each one sulfur atom, giving the formula SF_6." },
                { q: "After completing an experiment to determine gravimetrically the percentage of water in a hydrate, a student reported a value of 38 percent. The correct value for the percentage of water in the hydrate is 51 percent. Which of the following is the most likely explanation for this difference?", a: "C", options: {a: "CrO", b: "CrO_2", c: "CrO_3", d: "Cr_2O"}, exp: "For the 100 gram sample of the oxide, 48 grams of oxygen and 52 grams of chromium. Dividing 48 grams of oxygen by its molar mass it gives exactly 3 moles of oxygen. Dividing 52 grams of chromium gives exactly 1 mole of chromium. This leaves a one to three ratio, making the formula CrO_3." },
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
            3: [
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
            4: [
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
            5: [
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
                { q: "", a: "", options: {a: "", b: "", c: "", d: ""}, exp: "" }
            ],
            7: [
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
        this.input.on('pointerdown', (pointer) => {
            console.log(pointer.x, pointer.y);
            this.add.circle(pointer.x, pointer.y, 5, 0xff0000);
        });

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
        this.notes = this.physics.add.group();

        // Ground
        const groundY = 590;
        [90,180,270,360,450,540,630,720].forEach(x => {
            platforms.create(x, groundY, "ground").setScale(0.5, 0.75).refreshBody();
        });

        // Left Tower (vertical climb)
        this.createFloorWithNotes(floor, 120, 480, 5);
        this.createFloorWithNotes(floor, 120, 380, 5);
        this.createFloorWithNotes(floor, 120, 280, 5);
        this.createFloorWithNotes(floor, 120, 180, 5);

        // Middle Floating Islands
        this.createFloorWithNotes(floor, 350, 330, 4);
        this.createFloorWithNotes(floor, 450, 230, 4);
        this.createFloorWithNotes(floor, 350, 130, 4);

        // Right Descending Platforms
        this.createFloorWithNotes(floor, 650, 350, 5);
        this.createFloorWithNotes(floor, 650, 250, 5);
        this.createFloorWithNotes(floor, 650, 150, 5);

        // Top Platform
        this.createFloorWithNotes(floor, 400, 60, 5);

        // Obstacles
        this.obstacles = this.physics.add.group();

        const obstaclePositions = [
            // Left tower
            { x: 120, y: 450 },
            { x: 120, y: 350 },
            { x: 120, y: 250 },
            { x: 120, y: 150 },

            // Middle islands
            { x: 350, y: 300 },
            { x: 450, y: 200 },

            // Right descent
            { x: 650, y: 320 },
            { x: 650, y: 220 },

            // Top platform
            { x: 400, y: 40 },

            // Bonus floating obstacle
            { x: 500, y: 100 }
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
        this.score += (300 / 33); // ~33 notes total
        this.scoreText.setText("Score: " + Math.floor(this.score) + "/" + this.winningScore);

        if (this.score >= this.winningScore) {
            alert("Amazing! Level 3 complete — Level 4 unlocked.");
            this.game.global.unlockedLevels = 4;
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

        this.createFloorWithNotes(floor, 120, 480, 5);
        this.createFloorWithNotes(floor, 250, 380, 4);
        this.createFloorWithNotes(floor, 380, 300, 4);
        this.createFloorWithNotes(floor, 520, 220, 5);
        this.createFloorWithNotes(floor, 650, 150, 5);

        let wall1 = floor.create(300, 200, "groundOne").setScale(0.15, 3).refreshBody();
        let wall2 = floor.create(600, 350, "groundOne").setScale(0.15, 3).refreshBody();

        this.obstacles = this.physics.add.group();
        const obstaclePositions = [
            {x: 120, y: 450},
            {x: 250, y: 350},
            {x: 380, y: 270},
            {x: 520, y: 190},
            {x: 650, y: 120},
            {x: 200, y: 480},
            {x: 450, y: 300},
            {x: 600, y: 200},
            {x: 350, y: 380},
            {x: 500, y: 260}
        ];

        obstaclePositions.forEach(pos => {
            let obs = this.obstacles.create(pos.x, pos.y, "redObstacle").setScale(0.015, 0.2);
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
        this.score += (400 / 35);
        this.scoreText.setText("Score: " + Math.floor(this.score) + "/" + this.winningScore);

        if (this.score >= this.winningScore) {
            alert("Great job! Level 4 complete — Level 5 unlocked.");
            this.game.global.unlockedLevels = 5;
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

class Level5 extends Phaser.Scene {
    constructor() {
        super("Level5");
        this.score = 0;
        this.winningScore = 500;
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

        this.createFloorWithNotes(floor, 120, 480, 5);
        this.createFloorWithNotes(floor, 250, 380, 5);
        this.createFloorWithNotes(floor, 380, 280, 5);
        this.createFloorWithNotes(floor, 520, 200, 5);
        this.createFloorWithNotes(floor, 650, 120, 5);

        let wall1 = floor.create(200, 300, "groundOne").setScale(0.15, 3).refreshBody();
        let wall2 = floor.create(500, 250, "groundOne").setScale(0.15, 3).refreshBody();
        let wall3 = floor.create(700, 200, "groundOne").setScale(0.15, 3).refreshBody();

        this.obstacles = this.physics.add.group();
        const obstaclePositions = [
            {x: 120, y: 450}, {x: 250, y: 350}, {x: 380, y: 250},
            {x: 520, y: 170}, {x: 650, y: 90},
            {x: 200, y: 480}, {x: 450, y: 300}, {x: 600, y: 200},
            {x: 350, y: 380}, {x: 500, y: 260},
            {x: 300, y: 200}, {x: 700, y: 150}
        ];

        obstaclePositions.forEach(pos => {
            let obs = this.obstacles.create(pos.x, pos.y, "redObstacle").setScale(0.015, 0.2);
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
        this.score += (500 / 40);
        this.scoreText.setText("Score: " + Math.floor(this.score) + "/" + this.winningScore);

        if (this.score >= this.winningScore) {
            alert("Amazing! Level 5 complete — Level 6 unlocked.");
            this.game.global.unlockedLevels = 6;
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
    scene: [StartScene, CharacterScene, InstructionScene, HomeScene, CreditsScene, Level1, Level2, Level3, Level4, Level5],
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
