// You can write more code here

/* START OF COMPILED CODE */

import BaseEscene from "./BaseEscene";
import Spikes from "./Prefabs/Spikes";
import DefaultPlatform from "./Prefabs/DefaultPlatform";
import Star from "./Prefabs/Star";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level1 extends BaseEscene {

	constructor() {
		super("Level1");

		/* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// spikes
		const spikes = new Spikes(this, 549, 150);
		this.add.existing(spikes);

		// platform_3
		const platform_3 = new DefaultPlatform(this, 116, 322, "Platform1");
		this.add.existing(platform_3);
		platform_3.scaleX = 1;
		platform_3.scaleY = 1;

		// platform
		const platform = new DefaultPlatform(this, 939, 573);
		this.add.existing(platform);

		// platform_1
		const platform_1 = new DefaultPlatform(this, 545, 65);
		this.add.existing(platform_1);
		platform_1.angle = -180;

		// star
		const star = new Star(this, 539, 290);
		this.add.existing(star);

		// frontLayer
		const frontLayer = this.add.image(511, 568, "FrontLayer");

		// star_1
		const star_1 = new Star(this, 143, 469);
		this.add.existing(star_1);

		// star_2
		const star_2 = new Star(this, 944, 74);
		this.add.existing(star_2);

		// ChestOrigin
		const chestOrigin = this.add.image(137, 164, "CloseChestanimation", "CloseChest0031.png");

		// DoorOrigin
		const doorOrigin = this.add.image(941, 439, "door");

		this.frontLayer = frontLayer;
		this.chestOrigin = chestOrigin;
		this.doorOrigin = doorOrigin;

		this.events.emit("scene-awake");
	}

	public frontLayer!: Phaser.GameObjects.Image;
	public chestOrigin!: Phaser.GameObjects.Image;
	public doorOrigin!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

		public nextLevel: string = "Level2";

    // Write your code here










    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
