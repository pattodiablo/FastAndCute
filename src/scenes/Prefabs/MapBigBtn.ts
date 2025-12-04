
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MapBigBtn extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "MapBtnOff", frame);

		/* START-USER-CTR-CODE */
		this.on('pointerover', () => this.btnHover());
		this.on('pointerout', () => this.btnOut());
		this.on('pointerdown', () => this.btnClick());
		this.setInteractive({ useHandCursor: true });

		/* END-USER-CTR-CODE */
	}

	public IsClicked: boolean = false;
	public ActivateSection: string = "Map";

	/* START-USER-CODE */

	btnHover() {
	this.setTint(0xdddddd);
	}

	btnOut() {

		this.setTexture("MapBtnOff");
			this.setTint(0xffffff);
			if (this.IsClicked) {
				this.setTint(0xffffff);
				this.setTexture("MapBtnOn");
			}
	}	

	btnClick() {
		if (this.IsClicked) return;
			this.IsClicked = true;
			this.setTint(0xffffff);
			this.setTexture("MapBtnOn");

			(this.scene as any).ActivateSection(this.ActivateSection);
	}

	unclickBtn() {
		this.IsClicked = false;
		this.setTexture("MapBtnOff");
		this.setTint(0xffffff);
	}	
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
