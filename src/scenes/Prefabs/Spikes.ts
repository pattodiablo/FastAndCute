
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
	}

	killPlayer(player: any, spike: any) {
		(player as any).Die();
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
