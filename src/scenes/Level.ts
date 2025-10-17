// You can write more code here

/* START OF COMPILED CODE */

import Spikes from "./Prefabs/Spikes";
import DefaultPlatform from "./Prefabs/DefaultPlatform";
import Chest from "./Prefabs/Chest";
import Door from "./Prefabs/Door";
import SpinePlayer from "./Prefabs/SpinePlayer";
import Star from "./Prefabs/Star";
import FxButton from "./Prefabs/FxButton";
import MusicBtn from "./Prefabs/MusicBtn";
import { SpineGameObject } from "@esotericsoftware/spine-phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */

		// Custom constructor code can go here

		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// gameBg
		const gameBg = this.add.tileSprite(-48, -22, 1031, 580, "bg1");
		gameBg.scaleX = 1.1;
		gameBg.scaleY = 1.1;
		gameBg.setOrigin(0, 0);

		// bg2
		const bg2 = this.add.tileSprite(-215, 47, 1500, 580, "bg2");
		bg2.setOrigin(0, 0);

		// bg3
		const bg3 = this.add.tileSprite(-215, 57, 1500, 580, "bg3");
		bg3.setOrigin(0, 0);

		// bg4
		const bg4 = this.add.tileSprite(-223, 108, 1500, 580, "bg4");
		bg4.setOrigin(0, 0);

		// spikes
		const spikes = new Spikes(this, 543, 144);
		this.add.existing(spikes);

		// platform_3
		const platform_3 = new DefaultPlatform(this, 92, 320);
		this.add.existing(platform_3);

		// platform
		const platform = new DefaultPlatform(this, 939, 320);
		this.add.existing(platform);

		// platform_1
		const platform_1 = new DefaultPlatform(this, 545, 65);
		this.add.existing(platform_1);
		platform_1.angle = -180;

		// vinete
		const vinete = this.add.image(516, 270, "Vinete");
		vinete.blendMode = Phaser.BlendModes.MULTIPLY;
		vinete.visible = false;

		// Chest
		const chest = new Chest(this, 135, 164);
		this.add.existing(chest);
		chest.name = "Chest";

		// Door
		const door = new Door(this, 938, 177);
		this.add.existing(door);

		// Player
		const player = new SpinePlayer(this, this.spine, 133, 149);
		this.add.existing(player);

		// star
		const star = new Star(this, 539, 290);
		this.add.existing(star);

		// frontLayer
		this.add.image(511, 568, "FrontLayer");

		// star_1
		const star_1 = new Star(this, 143, 469);
		this.add.existing(star_1);

		// star_2
		const star_2 = new Star(this, 887, 474);
		this.add.existing(star_2);

		// fxON
		const fxON = new FxButton(this, 918, 46);
		this.add.existing(fxON);

		// musicON
		const musicON = new MusicBtn(this, 987, 46);
		this.add.existing(musicON);

		// carboardEffect
		const carboardEffect = this.add.image(0, 0, "CarboardEffect");
		carboardEffect.blendMode = Phaser.BlendModes.MULTIPLY;
		carboardEffect.setOrigin(0, 0);
		carboardEffect.visible = false;

		// curtain1
		const curtain1 = this.add.image(515, -218, "Curtain1");

		// curtain2
		const curtain2 = this.add.image(515, 743, "Curtain2");

		this.gameBg = gameBg;
		this.bg2 = bg2;
		this.bg3 = bg3;
		this.bg4 = bg4;
		this.vinete = vinete;
		this.chest = chest;
		this.door = door;
		this.player = player;
		this.musicON = musicON;
		this.carboardEffect = carboardEffect;
		this.curtain1 = curtain1;
		this.curtain2 = curtain2;

		this.events.emit("scene-awake");
	}

	private gameBg!: Phaser.GameObjects.TileSprite;
	private bg2!: Phaser.GameObjects.TileSprite;
	private bg3!: Phaser.GameObjects.TileSprite;
	private bg4!: Phaser.GameObjects.TileSprite;
	private vinete!: Phaser.GameObjects.Image;
	public chest!: Chest;
	public door!: Door;
	public player!: SpinePlayer;
	private musicON!: MusicBtn;
	private carboardEffect!: Phaser.GameObjects.Image;
	private curtain1!: Phaser.GameObjects.Image;
	private curtain2!: Phaser.GameObjects.Image;

	/* START-USER-CODE */
	public plataformas!: Phaser.Physics.Arcade.StaticGroup;
	public starsGroup!: Phaser.Physics.Arcade.Group;
	public music!: Phaser.Sound.BaseSound;
	public fxList: Phaser.Sound.BaseSound[] = [];
	// Write your code here

	create() {


		this.plataformas = this.physics.add.staticGroup();
		this.editorCreate();
			this.curtain1.y = 144;
		this.curtain2.y = 434;
		this.vinete.visible = true;
		this.carboardEffect.visible = true;
		this.starsGroup = this.physics.add.group();
		this.physics.add.collider(this.plataformas, this.player);

		this.input.once('pointerdown', () => {
			if (
				!this.sys.game.device.os.desktop &&
				!this.scale.isFullscreen &&
				this.scale.fullscreen.available
			) {
				this.scale.startFullscreen();
			}
		});

		// --- FADE IN DESDE NEGRO ---
		const fadeRect = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
			.setOrigin(0, 0)
			.setDepth(1000)
			.setAlpha(1);

		this.tweens.add({
			targets: fadeRect,
			alpha: 0,
			duration: 700,
			ease: 'Quad.Out',
			onComplete: () => {
				fadeRect.destroy();
				this.openCurtains();
			}
		});

		// Partículas de lluvia
		/* const rainParticles = this.add.particles(0, 0, 'BubbleParticle', {
			x: { min: 0, max: this.scale.width },
			y: 0,
			lifespan: 1200,
			speedY: { min: 400, max: 600 },
			scale: { start: 0.15, end: 0.05 },
			alpha: { start: 0.7, end: 0 },
			quantity: 2,
			frequency: 30,
			blendMode: 'ADD'
		});
			rainParticles.setDepth(999); // Para que la lluvia esté por encima de los fondos */

	}

	addFx(fx: Phaser.Sound.BaseSound) {
		this.fxList.push(fx);
	}

	public muteAllFx(mute: boolean) {
		this.fxList.forEach(fx => (fx as any).setMute(mute));
	}
	openCurtains() {


		this.music = this.sound.add("WholeMusic", { loop: true });
		
		this.music.play();

		this.tweens.add({
			targets: this.curtain1,
			y: -150,
			duration: 700,
			ease: 'Quad.Out'
		});
			this.tweens.add({
			targets: this.curtain2,
			y: 740,
			duration: 700,
			ease: 'Quad.Out'
		});

	}

public closeCurtains() {
    this.tweens.add({
        targets: this.curtain1,
        y: 144,
        duration: 700,
        ease: 'Quad.Out'
    });
    this.tweens.add({
        targets: this.curtain2,
        y: 434,
        duration: 700,
        ease: 'Quad.Out'
    });

    // Fade out de la música
    if (this.music) {
        this.tweens.add({
            targets: this.music,
            volume: 0,
            duration: 1000,
            ease: 'Quad.Out',
            onComplete: () => {
                this.music.stop();
            }
        });
    }

    this.time.delayedCall(1000, () => {
        this.scene.restart();
    });
}

	update() {
    if (!this.player) return;

    const playerX = this.player.x;
    const playerY = this.player.y;

    // Factores muy bajos para un parallax sutil

    this.bg2.x    = -100    + (playerX - 299) * 0.05;
    this.bg2.y    = 40    + (playerY - 322) * 0.05;

    this.bg3.x    = -100    + (playerX - 299) * 0.08;
    this.bg3.y    = 40    + (playerY - 322) * 0.08;

    this.bg4.x    = -100    + (playerX - 299) * 0.12;
    this.bg4.y    = 40    + (playerY - 322) * 0.12;
}


public collectStar() {
	console.log("Estrella recogida");
		// Aquí puedes agregar efectos de sonido o partículas si lo deseas
		// Por ejemplo: this.sound.play('star-collect-sound');

		// Verifica si quedan estrellas en la escena
		if (this.starsGroup.countActive(true) === 0) {
			// Todas las estrellas han sido recogidas
			console.log("Todas las estrellas recogidas, aparece la puerta");
			this.door.AppearDoor();
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
