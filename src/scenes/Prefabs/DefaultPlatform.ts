// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface DefaultPlatform {

	 body: Phaser.Physics.Arcade.Body;
}

export default class DefaultPlatform extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "Platform1", frame);

		scene.physics.add.existing(this, false);
		this.body.moves = false;
		this.body.allowGravity = false;
		this.body.allowDrag = false;
		this.body.allowRotation = false;
		this.body.pushable = false;
		this.body.setSize(261, 154, false);

		/* START-USER-CTR-CODE */
			this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		//this.scene.events.on("update", () => this.update())
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create() {
		// Collider con el player
		this.scene.physics.add.collider((this.scene as any).player, this);

		// Asegurar que el body sea inamovible (mejor respuesta de colisión)
		this.body.setImmovable(true);

		// Collider permanente contra el grupo de enemigos
		const base = this.scene as any;

		const attachEnemiesCollider = () => {
			const group = base.enemiesGroup as Phaser.Physics.Arcade.Group | undefined;
			if (group) {
				this.scene.physics.add.collider(group, this);
				return true;
			}
			return false;
		};

		// Intento inmediato
		if (!attachEnemiesCollider()) {
			// Reintentar algunas veces hasta que el grupo exista
			const retry = this.scene.time.addEvent({
				delay: 100,
				repeat: 30,
				callback: () => {
					if (attachEnemiesCollider()) retry.remove(false);
				}
			});
		}

			this.fitBodyToTexture();

	}


	private fitBodyToTexture() {
		const body = this.body as Phaser.Physics.Arcade.Body | undefined;
		const frame = this.frame;

		if (!body || !frame) return;

		const scaleX = Math.abs(this.scaleX) || 1;
		const scaleY = Math.abs(this.scaleY) || 1;
		const width = (frame.realWidth ?? frame.width) * scaleX;
		const height = (frame.realHeight ?? frame.height) * scaleY;

		// Ajusta el collider al bounding box rectangular de la textura actual
		body.setSize(width, height, true);
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
