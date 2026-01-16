
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface LateralDoor {

	 body: Phaser.Physics.Arcade.Body;
}

export default class LateralDoor extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "DoorGlow", frame ?? "LateralDoor0001.png");

		this.setInteractive(new Phaser.Geom.Rectangle(0, 0, 68, 141), Phaser.Geom.Rectangle.Contains);
		scene.physics.add.existing(this, false);
		this.body.moves = false;
		this.body.allowGravity = false;
		this.body.pushable = false;
		this.body.immovable = true;
		this.body.setSize(68, 141, false);

		/* START-USER-CTR-CODE */
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}

	public DoorName: string = "Door1";
	public flickTimer!: any;

	/* START-USER-CODE */

	create() {
			const base = this.scene as any;
			if (base.plataformas) {
			base.plataformas.add(this);
	base.physics.add.collider((this.scene as any).player, this);


		}

		this.scheduleFlick();

	}

	private scheduleFlick() {
		if (!this.scene || !this.scene.time) return;
		const delay = Phaser.Math.Between(4000, 9000);
		this.flickTimer = this.scene.time.delayedCall(delay, () => {
			this.playFlick();
		}, undefined, this);
	}

	private playFlick() {
		// Solo si está activa, visible y con colisión habilitada (idle)
		const body = this.body as Phaser.Physics.Arcade.Body | undefined;
		const currentKey = this.anims?.currentAnim?.key;
		const isOpen = currentKey === "OpenLateralDoor";
		if (!this.active || !this.visible || isOpen || body?.enable === false) {
			this.scheduleFlick();
			return;
		}

		this.play("LateralDoorFlick", true);
		this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
			// Volver al frame base
			this.setTexture("DoorGlow", "LateralDoor0001.png");
			this.scheduleFlick();
		});
	}

	destroy(fromScene?: boolean) {
		this.flickTimer?.remove(false);
		this.flickTimer = undefined;
		super.destroy(fromScene);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
