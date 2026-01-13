// You can write more code here

/* START OF COMPILED CODE */

import BaseEscene from "./BaseEscene";
import Spikes from "./Prefabs/Spikes";
import DefaultPlatform from "./Prefabs/DefaultPlatform";
import Cristal_Platform from "./Prefabs/Cristal_Platform";
import Star from "./Prefabs/Star";
import Platform2 from "./Prefabs/Platform2";
import Fall_Platform from "./Prefabs/Fall_Platform";
import RanaEnemy from "./Prefabs/RanaEnemy";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level3 extends BaseEscene {

	constructor() {
		super("Level3");

		/* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// spikes_1
		const spikes_1 = new Spikes(this, 682, 519);
		this.add.existing(spikes_1);
		spikes_1.angle = -90;

		// platform_3
		const platform_3 = new DefaultPlatform(this, 610, 390);
		this.add.existing(platform_3);

		// platform
		const platform = new DefaultPlatform(this, 119, 615);
		this.add.existing(platform);

		// spikes
		const spikes = new Spikes(this, 675, 123);
		this.add.existing(spikes);
		spikes.angle = -180;

		// platform_1
		const platform_1 = new DefaultPlatform(this, 675, 226, "Platform3");
		this.add.existing(platform_1);

		// cristal_Platform
		const cristal_Platform = new Cristal_Platform(this, 889, 399);
		this.add.existing(cristal_Platform);

		// star
		const star = new Star(this, 877, 507);
		this.add.existing(star);

		// frontLayer
		const frontLayer = this.add.image(511, 568, "FrontLayer");

		// star_1
		const star_1 = new Star(this, 927, 106);
		this.add.existing(star_1);

		// star_2
		const star_2 = new Star(this, 96, 80);
		this.add.existing(star_2);

		// ChestOrigin
		const chestOrigin = this.add.image(536, 228, "CloseChestanimation", "CloseChest0031.png");

		// platform_4
		const platform_4 = new Platform2(this, 684, 71, "cloud1");
		this.add.existing(platform_4);
		platform_4.scaleX = 0.8365933650783711;
		platform_4.scaleY = 0.8365933650783711;

		// platform_5
		const platform_5 = new DefaultPlatform(this, 604, 494, "Platform3");
		this.add.existing(platform_5);

		// fall_Platform
		const fall_Platform = new Fall_Platform(this, 897, 67);
		this.add.existing(fall_Platform);

		// DoorOrigin
		const doorOrigin = this.add.image(65, 482, "door");

		// ranaEnemy
		const ranaEnemy = new RanaEnemy(this, this.spine, 182, 522);
		this.add.existing(ranaEnemy);

		this.frontLayer = frontLayer;
		this.chestOrigin = chestOrigin;
		this.doorOrigin = doorOrigin;

		this.events.emit("scene-awake");
	}

	public frontLayer!: Phaser.GameObjects.Image;
	public chestOrigin!: Phaser.GameObjects.Image;
	public doorOrigin!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

		public nextLevel: string = "Level4";

    // Write your code here










    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
