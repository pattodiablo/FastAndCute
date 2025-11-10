// You can write more code here

/* START OF COMPILED CODE */

import BaseEscene from "./BaseEscene";
import DefaultPlatform from "./Prefabs/DefaultPlatform";
import Star from "./Prefabs/Star";
import Enemy1 from "./Prefabs/Enemy1";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level2 extends BaseEscene {

	constructor() {
		super("Level2");

		/* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// platform_3
		const platform_3 = new DefaultPlatform(this, 116, 322);
		this.add.existing(platform_3);

		// platform
		const platform = new DefaultPlatform(this, 946, 509);
		this.add.existing(platform);

		// star
		const star = new Star(this, 132, 481);
		this.add.existing(star);

		// frontLayer
		const frontLayer = this.add.image(511, 568, "FrontLayer");

		// star_1
		const star_1 = new Star(this, 927, 106);
		this.add.existing(star_1);

		// star_2
		const star_2 = new Star(this, 530, 117);
		this.add.existing(star_2);

		// ChestOrigin
		const chestOrigin = this.add.image(137, 164, "CloseChestanimation", "CloseChest0031.png");

		// enemy1
		const enemy1 = new Enemy1(this, 539, 321);
		this.add.existing(enemy1);

		// DoorOrigin
		const doorOrigin = this.add.image(947, 376, "door");

		this.frontLayer = frontLayer;
		this.chestOrigin = chestOrigin;
		this.doorOrigin = doorOrigin;

		this.events.emit("scene-awake");
	}

	public frontLayer!: Phaser.GameObjects.Image;
	public chestOrigin!: Phaser.GameObjects.Image;
	public doorOrigin!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

		public nextLevel: string = "Level";

    // Write your code here










    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
