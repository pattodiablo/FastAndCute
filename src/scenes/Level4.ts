// You can write more code here

/* START OF COMPILED CODE */

import BaseEscene from "./BaseEscene";
import Spikes from "./Prefabs/Spikes";
import DefaultPlatform from "./Prefabs/DefaultPlatform";
import Star from "./Prefabs/Star";
import RanaEnemy from "./Prefabs/RanaEnemy";
import Platform2 from "./Prefabs/Platform2";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level4 extends BaseEscene {

	constructor() {
		super("Level4");

		/* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// spikes
		const spikes = new Spikes(this, 572, 342);
		this.add.existing(spikes);
		spikes.angle = -90;

		// platform_3
		const platform_3 = new DefaultPlatform(this, 100, 512, "Platform2");
		this.add.existing(platform_3);

		// platform
		const platform = new DefaultPlatform(this, 953, 583);
		this.add.existing(platform);

		// platform_1
		const platform_1 = new DefaultPlatform(this, 470, 339, "Platform2");
		this.add.existing(platform_1);

		// star
		const star = new Star(this, 106, 98);
		this.add.existing(star);

		// frontLayer
		const frontLayer = this.add.image(511, 568, "FrontLayer");

		// star_1
		const star_1 = new Star(this, 767, 281);
		this.add.existing(star_1);

		// star_2
		const star_2 = new Star(this, 466, 74);
		this.add.existing(star_2);

		// ChestOrigin
		const chestOrigin = this.add.image(89, 355, "CloseChestanimation", "CloseChest0031.png");

		// DoorOrigin
		const doorOrigin = this.add.image(952, 455, "door");

		// ranaEnemy
		const ranaEnemy = new RanaEnemy(this, this.spine, 467, 245);
		this.add.existing(ranaEnemy);

		// platform2
		const platform2 = new Platform2(this, 772, 277, "cloud1");
		this.add.existing(platform2);
		platform2.scaleX = 0.8365933650783711;
		platform2.scaleY = 0.8365933650783711;

		// platform_2
		const platform_2 = new Platform2(this, 133, 114, "cloud2");
		this.add.existing(platform_2);
		platform_2.scaleX = 0.8365933650783711;
		platform_2.scaleY = 0.8365933650783711;

		this.frontLayer = frontLayer;
		this.chestOrigin = chestOrigin;
		this.doorOrigin = doorOrigin;

		this.events.emit("scene-awake");
	}

	public frontLayer!: Phaser.GameObjects.Image;
	public chestOrigin!: Phaser.GameObjects.Image;
	public doorOrigin!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

		public nextLevel: string = "Level5";

    // Write your code here










    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
