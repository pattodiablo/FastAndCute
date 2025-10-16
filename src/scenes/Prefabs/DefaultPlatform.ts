
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
	
			this.scene.physics.add.collider((this.scene as any).player, this);
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
