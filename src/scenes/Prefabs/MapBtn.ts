
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MapBtn extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "MapBtn", frame);

		/* START-USER-CTR-CODE */
			this.setInteractive({ useHandCursor: true });

		this.on('pointerdown', () => {
			console.log("Map button clicked");
			(this.scene as any).toggleMapOverlay();

		});

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
