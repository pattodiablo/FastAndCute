
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface Spikes {

	 body: Phaser.Physics.Arcade.Body;
}

export default class Spikes extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "spikes", frame);

		scene.physics.add.existing(this, false);
		this.body.moves = false;
		this.body.allowGravity = false;
		this.body.pushable = false;
		this.body.immovable = true;
		this.body.setSize(139, 44, false);

		/* START-USER-CTR-CODE */
			this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

create() {
	
		this.scene.physics.add.collider((this.scene as any).player, this, this.killPlayer, undefined, this);
		this.fitBodyToTexture();
	}

	killPlayer(player: any, spike: any) {
		(player as any).Die();
	}


	private fitBodyToTexture() {
		const body = this.body as Phaser.Physics.Arcade.Body | undefined;
		const frame = this.frame;

		if (!body || !frame) return;

		const scaleX = Math.abs(this.scaleX) || 1;
		const scaleY = Math.abs(this.scaleY) || 1;
		let width = (frame.realWidth ?? frame.width) * scaleX;
		let height = (frame.realHeight ?? frame.height) * scaleY;

		// Detectar rotación y swap dimensiones si está rotado 90° o 270°
		const angle = Math.abs(this.angle % 360);
		const isRotated90 = (angle > 45 && angle < 135) || (angle > 225 && angle < 315);
		
		if (isRotated90) {
			// Intercambiar width y height cuando está rotado verticalmente
			[width, height] = [height, width];
		}

		// Ajusta el collider al bounding box rectangular de la textura actual
		body.setSize(width, height, true);
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
