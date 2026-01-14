// You can write more code here

/* START OF COMPILED CODE */

import BaseEscene from "./BaseEscene";
import DefaultPlatform from "./Prefabs/DefaultPlatform";
import Cristal_Platform from "./Prefabs/Cristal_Platform";
import Star from "./Prefabs/Star";
import Fall_Platform from "./Prefabs/Fall_Platform";
import Platform2 from "./Prefabs/Platform2";
import BatCaveGenerator from "./Prefabs/BatCaveGenerator";
import RanaEnemy from "./Prefabs/RanaEnemy";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level6 extends BaseEscene {

	constructor() {
		super("Level6");

		/* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// platform_3
		const platform_3 = new DefaultPlatform(this, 55, 224);
		this.add.existing(platform_3);

		// cristal_Platform
		const cristal_Platform = new Cristal_Platform(this, 890, 421);
		this.add.existing(cristal_Platform);

		// platform
		const platform = new DefaultPlatform(this, 356, 504, "Platform3");
		this.add.existing(platform);

		// platform_1
		const platform_1 = new DefaultPlatform(this, 514, 504, "Platform3");
		this.add.existing(platform_1);

		// platform_6
		const platform_6 = new DefaultPlatform(this, 692, 612, "Platform3");
		this.add.existing(platform_6);
		platform_6.angle = -180;

		// platform_2
		const platform_2 = new DefaultPlatform(this, 692, 432, "Platform3");
		this.add.existing(platform_2);

		// platform_5
		const platform_5 = new DefaultPlatform(this, 86, 616);
		this.add.existing(platform_5);

		// star
		const star = new Star(this, 688, 250);
		this.add.existing(star);

		// frontLayer
		const frontLayer = this.add.image(591, 565, "FrontLayer");

		// star_1
		const star_1 = new Star(this, 887, 508);
		this.add.existing(star_1);

		// star_2
		const star_2 = new Star(this, 348, 280);
		this.add.existing(star_2);

		// ChestOrigin
		const chestOrigin = this.add.image(79, 68, "CloseChestanimation", "CloseChest0031.png");

		// fall_Platform
		const fall_Platform = new Fall_Platform(this, 499, 45);
		this.add.existing(fall_Platform);

		// DoorOrigin
		const doorOrigin = this.add.image(65, 482, "door");

		// platform2
		const platform2 = new Platform2(this, 501, 63, "cloud1");
		this.add.existing(platform2);
		platform2.scaleX = 0.8365933650783711;
		platform2.scaleY = 0.8365933650783711;

		// platform_4
		const platform_4 = new DefaultPlatform(this, 912, 70);
		this.add.existing(platform_4);
		platform_4.angle = -180;

		// batCaveGenerator
		const batCaveGenerator = new BatCaveGenerator(this, 915, 201);
		this.add.existing(batCaveGenerator);

		// ranaEnemy_1
		const ranaEnemy_1 = new RanaEnemy(this, this.spine, 511, 399);
		this.add.existing(ranaEnemy_1);

		this.frontLayer = frontLayer;
		this.chestOrigin = chestOrigin;
		this.doorOrigin = doorOrigin;

		this.events.emit("scene-awake");
	}

	public frontLayer!: Phaser.GameObjects.Image;
	public chestOrigin!: Phaser.GameObjects.Image;
	public doorOrigin!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

		public nextLevel: string = "Level7";

    // Write your code here










    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
