// You can write more code here

/* START OF COMPILED CODE */

import BaseEscene from "./BaseEscene";
import DefaultPlatform from "./Prefabs/DefaultPlatform";
import Star from "./Prefabs/Star";
import RanaEnemy from "./Prefabs/RanaEnemy";
import Platform2 from "./Prefabs/Platform2";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level5 extends BaseEscene {

	constructor() {
		super("Level5");

		/* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// platform_3
		const platform_3 = new DefaultPlatform(this, 620, 499, "Platform3");
		this.add.existing(platform_3);

		// platform
		const platform = new DefaultPlatform(this, 107, 302);
		this.add.existing(platform);

		// platform_1
		const platform_1 = new DefaultPlatform(this, 421, 521, "Platform3");
		this.add.existing(platform_1);

		// platform_2
		const platform_2 = new DefaultPlatform(this, 831, 516, "Platform3");
		this.add.existing(platform_2);

		// star
		const star = new Star(this, 92, 489);
		this.add.existing(star);

		// frontLayer
		const frontLayer = this.add.image(511, 568, "FrontLayer");

		// star_1
		const star_1 = new Star(this, 927, 106);
		this.add.existing(star_1);

		// star_2
		const star_2 = new Star(this, 620, 220);
		this.add.existing(star_2);

		// ChestOrigin
		const chestOrigin = this.add.image(115, 144, "CloseChestanimation", "CloseChest0031.png");

		// DoorOrigin
		const doorOrigin = this.add.image(417, 378, "door");

		// ranaEnemy
		const ranaEnemy = new RanaEnemy(this, this.spine, 831, 407);
		this.add.existing(ranaEnemy);

		// platform2
		const platform2 = new Platform2(this, 131, 474, "cloud1");
		this.add.existing(platform2);
		platform2.scaleX = 0.8365933650783711;
		platform2.scaleY = 0.8365933650783711;

		// ranaEnemy_1
		const ranaEnemy_1 = new RanaEnemy(this, this.spine, 620, 395);
		this.add.existing(ranaEnemy_1);

		// star_3
		const star_3 = new Star(this, 829, 276);
		this.add.existing(star_3);

		// platform_4
		const platform_4 = new Platform2(this, 922, 71, "cloud3");
		this.add.existing(platform_4);
		platform_4.scaleX = 0.8365933650783711;
		platform_4.scaleY = 0.8365933650783711;

		this.frontLayer = frontLayer;
		this.chestOrigin = chestOrigin;
		this.doorOrigin = doorOrigin;

		this.events.emit("scene-awake");
	}

	public frontLayer!: Phaser.GameObjects.Image;
	public chestOrigin!: Phaser.GameObjects.Image;
	public doorOrigin!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

		public nextLevel: string = "Level6";

    // Write your code here










    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
