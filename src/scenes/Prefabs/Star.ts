// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface Star {

	 body: Phaser.Physics.Arcade.Body;
}

export default class Star extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "star", frame);

		scene.physics.add.existing(this, false);
		this.body.moves = false;
		this.body.allowGravity = false;
		this.body.allowDrag = false;
		this.body.allowRotation = false;
		this.body.pushable = false;
		this.body.immovable = true;
		this.body.setSize(40, 40, false);

		/* START-USER-CTR-CODE */
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		const originalY = this.y;
		this.moveTween = this.scene.tweens.add({
			targets: this,
			y: originalY + 20,      // Baja 20 píxeles (ajusta a gusto)
			duration: 1200,         // Duración del ciclo (ajusta a gusto)
			yoyo: true,
			repeat: -1,
			ease: 'Sine.easeInOut'
		});
		/* END-USER-CTR-CODE */
	}

	public collectFx!: any;
	public isCollected: boolean = false;
	public moveTween!: any;
	public shakeTween!: any;
	public shakeTimer!: any;

	/* START-USER-CODE */

	create() {
		this.scene.physics.add.overlap((this.scene as any).player, this, this.collectStar, undefined, this);
		this.addStarToSceneStarsGroup();
		this.collectFx = this.scene.sound.add("collectStar");
		(this.scene as any).addFx(this.collectFx);

	}

	addStarToSceneStarsGroup() {
		const levelScene = this.scene as any; // Asegúrate de que 'levelScene' tenga el tipo correcto
		if (levelScene.starsGroup) {
			levelScene.starsGroup.add(this);
		} else {
			console.warn("starsGroup no está definido en la escena.");
		}
	}

	collectStar(player: any, star: any) {
		if (this.isCollected) return; // Evita ejecuciones múltiples
		this.isCollected = true;

			this.collectFx.play();
		// Elimina tweens y timers antes de destruir
		if (this.moveTween) this.moveTween.stop();
		if (this.shakeTween) this.shakeTween.stop();
		if (this.shakeTimer) this.shakeTimer.remove();

		const levelScene = this.scene as any;

		this.scene.tweens.add({
			targets: this,
			angle: this.angle + 360,
			scale: 0,
			duration: 400,
			ease: 'Back.easeIn',
			onComplete: () => {
				if (levelScene && levelScene.starsGroup) {
					levelScene.starsGroup.remove(this, true, true);
				}
				if (levelScene && typeof levelScene.collectStar === "function") {
					levelScene.collectStar();
				}
				this.destroy();
			}
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
