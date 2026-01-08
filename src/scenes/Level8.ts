// You can write more code here

/* START OF COMPILED CODE */

import BaseEscene from "./BaseEscene";
import DefaultPlatform from "./Prefabs/DefaultPlatform";
import Spikes from "./Prefabs/Spikes";
import Star from "./Prefabs/Star";
import RanaEnemy from "./Prefabs/RanaEnemy";
import Platform2 from "./Prefabs/Platform2";
import BatCaveGenerator from "./Prefabs/BatCaveGenerator";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level8 extends BaseEscene {

	constructor() {
		super("Level8");

		/* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// platform_7
		const platform_7 = new DefaultPlatform(this, 290, 541, "Platform3");
		this.add.existing(platform_7);

		// spikes
		const spikes = new Spikes(this, 940, 460);
		this.add.existing(spikes);
		spikes.angle = -180;

		// platform_3
		const platform_3 = new DefaultPlatform(this, 937, 545);
		this.add.existing(platform_3);

		// platform
		const platform = new DefaultPlatform(this, 135, 490, "Platform3");
		this.add.existing(platform);

		// star
		const star = new Star(this, 284, 351);
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
		const chestOrigin = this.add.image(523, 359, "CloseChestanimation", "CloseChest0031.png");

		// DoorOrigin
		const doorOrigin = this.add.image(136, 345, "door");

		// ranaEnemy
		const ranaEnemy = new RanaEnemy(this, this.spine, 283, 436);
		this.add.existing(ranaEnemy);

		// platform2
		const platform2 = new Platform2(this, 770, 102, "cloud1");
		this.add.existing(platform2);
		platform2.scaleX = 0.8365933650783711;
		platform2.scaleY = 0.8365933650783711;

		// platform_1
		const platform_1 = new DefaultPlatform(this, 528, 508);
		this.add.existing(platform_1);

		// platform_2
		const platform_2 = new Platform2(this, 95, 58, "cloud1");
		this.add.existing(platform_2);
		platform_2.scaleX = 0.8365933650783711;
		platform_2.scaleY = 0.8365933650783711;

		// platform_4
		const platform_4 = new Platform2(this, 292, 70, "cloud2");
		this.add.existing(platform_4);
		platform_4.scaleX = 0.8365933650783711;
		platform_4.scaleY = 0.8365933650783711;

		// platform_5
		const platform_5 = new Platform2(this, 953, 59, "cloud3");
		this.add.existing(platform_5);
		platform_5.scaleX = 0.8365933650783711;
		platform_5.scaleY = 0.8365933650783711;

		// platform_6
		const platform_6 = new DefaultPlatform(this, 533, 27, "Platform3");
		this.add.existing(platform_6);
		platform_6.angle = -180;

		// batCaveGenerator
		const batCaveGenerator = new BatCaveGenerator(this, 529, 171);
		this.add.existing(batCaveGenerator);

		this.frontLayer = frontLayer;
		this.chestOrigin = chestOrigin;
		this.doorOrigin = doorOrigin;

		this.events.emit("scene-awake");
	}

	public frontLayer!: Phaser.GameObjects.Image;
	public chestOrigin!: Phaser.GameObjects.Image;
	public doorOrigin!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

		public nextLevel: string = "Level9";

    // Write your code here










    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
