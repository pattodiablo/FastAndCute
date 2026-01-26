// You can write more code here

/* START OF COMPILED CODE */

import BaseEscene from "./BaseEscene";
import DefaultPlatform from "./Prefabs/DefaultPlatform";
import Star from "./Prefabs/Star";
import Platform2 from "./Prefabs/Platform2";
import CursorTutorial from "./Prefabs/CursorTutorial";
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

		// platform_3
		const platform_3 = new DefaultPlatform(this, 116, 515, "Platform1");
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

		// platform_2
		const platform_2 = new DefaultPlatform(this, 526, 510);
		this.add.existing(platform_2);

		// star2
		const star2 = new Star(this, 539, 290);
		this.add.existing(star2);

		// frontLayer
		const frontLayer = this.add.image(511, 568, "FrontLayer");

		// star1
		const star1 = new Star(this, 242, 92);
		this.add.existing(star1);

		// star_2
		const star_2 = new Star(this, 944, 74);
		this.add.existing(star_2);

		// ChestOrigin
		const chestOrigin = this.add.image(127, 354, "CloseChestanimation", "CloseChest0031.png");

		// DoorOrigin
		const doorOrigin = this.add.image(941, 439, "door");

		// cloud
		const cloud = new Platform2(this, 938, 72);
		this.add.existing(cloud);

		// clickHand0001_png
		const clickHand0001_png = new CursorTutorial(this, 609, 226);
		this.add.existing(clickHand0001_png);

		this.star2 = star2;
		this.frontLayer = frontLayer;
		this.star1 = star1;
		this.chestOrigin = chestOrigin;
		this.doorOrigin = doorOrigin;
		this.cloud = cloud;

		this.events.emit("scene-awake");
	}

	public star2!: Star;
	public frontLayer!: Phaser.GameObjects.Image;
	public star1!: Star;
	public chestOrigin!: Phaser.GameObjects.Image;
	public doorOrigin!: Phaser.GameObjects.Image;
	public cloud!: Platform2;

	/* START-USER-CODE */

		public nextLevel: string = "Level2";

    // Write your code here










    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
