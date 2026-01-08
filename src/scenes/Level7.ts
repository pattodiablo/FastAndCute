// You can write more code here

/* START OF COMPILED CODE */

import BaseEscene from "./BaseEscene";
import Spikes from "./Prefabs/Spikes";
import DefaultPlatform from "./Prefabs/DefaultPlatform";
import Star from "./Prefabs/Star";
import RanaEnemy from "./Prefabs/RanaEnemy";
import Platform2 from "./Prefabs/Platform2";
import BatCaveGenerator from "./Prefabs/BatCaveGenerator";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level7 extends BaseEscene {

	constructor() {
		super("Level7");

		/* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// spikes
		const spikes = new Spikes(this, 456, 55);
		this.add.existing(spikes);
		spikes.angle = 90;

		// platform_3
		const platform_3 = new DefaultPlatform(this, 527, 77, "Platform3");
		this.add.existing(platform_3);
		platform_3.angle = -180;

		// platform
		const platform = new DefaultPlatform(this, 119, 615);
		this.add.existing(platform);

		// platform_1
		const platform_1 = new DefaultPlatform(this, 920, 546);
		this.add.existing(platform_1);

		// star
		const star = new Star(this, 487, 518);
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
		const chestOrigin = this.add.image(923, 389, "CloseChestanimation", "CloseChest0031.png");

		// DoorOrigin
		const doorOrigin = this.add.image(65, 482, "door");

		// ranaEnemy
		const ranaEnemy = new RanaEnemy(this, this.spine, 182, 522);
		this.add.existing(ranaEnemy);

		// platform2
		const platform2 = new Platform2(this, 112, 94, "cloud1");
		this.add.existing(platform2);
		platform2.scaleX = 0.4914675624384814;
		platform2.scaleY = 0.4914675624384814;

		// platform_2
		const platform_2 = new Platform2(this, 480, 510, "cloud2");
		this.add.existing(platform_2);
		platform_2.scaleX = 0.4914675624384814;
		platform_2.scaleY = 0.4914675624384814;

		// platform_4
		const platform_4 = new Platform2(this, 930, 106, "cloud3");
		this.add.existing(platform_4);
		platform_4.scaleX = 0.4914675624384814;
		platform_4.scaleY = 0.4914675624384814;

		// batCaveGenerator
		const batCaveGenerator = new BatCaveGenerator(this, 528, 223);
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

		public nextLevel: string = "Level8";

    // Write your code here










    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
