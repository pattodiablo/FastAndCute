// You can write more code here

/* START OF COMPILED CODE */

import BaseEscene from "./BaseEscene";
import DefaultPlatform from "./Prefabs/DefaultPlatform";
import Star from "./Prefabs/Star";
import RanaEnemy from "./Prefabs/RanaEnemy";
import Platform2 from "./Prefabs/Platform2";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level9 extends BaseEscene {

	constructor() {
		super("Level9");

		/* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// platform_3
		const platform_3 = new DefaultPlatform(this, 949, 158);
		this.add.existing(platform_3);
		platform_3.scaleX = 0.6753246753246753;
		platform_3.scaleY = 0.6753246753246753;

		// platform
		const platform = new DefaultPlatform(this, 144, 276, "Platform2");
		this.add.existing(platform);

		// platform_1
		const platform_1 = new DefaultPlatform(this, 370, 511, "Platform3");
		this.add.existing(platform_1);

		// platform_2
		const platform_2 = new DefaultPlatform(this, 823, 510, "Platform3");
		this.add.existing(platform_2);

		// platform_4
		const platform_4 = new DefaultPlatform(this, 1016, 498, "Platform3");
		this.add.existing(platform_4);

		// star
		const star = new Star(this, 487, 518);
		this.add.existing(star);

		// frontLayer
		const frontLayer = this.add.image(511, 568, "FrontLayer");

		// star_1
		const star_1 = new Star(this, 144, 460);
		this.add.existing(star_1);

		// star_2
		const star_2 = new Star(this, 113, 62);
		this.add.existing(star_2);

		// ChestOrigin
		const chestOrigin = this.add.image(946, 22, "CloseChestanimation", "CloseChest0031.png");

		// DoorOrigin
		const doorOrigin = this.add.image(815, 365, "door");

		// ranaEnemy
		const ranaEnemy = new RanaEnemy(this, this.spine, 333, 404);
		this.add.existing(ranaEnemy);

		// platform2
		const platform2 = new Platform2(this, 637, 501, "cloud1");
		this.add.existing(platform2);
		platform2.scaleX = 0.8365933650783711;
		platform2.scaleY = 0.8365933650783711;

		// ranaEnemy_1
		const ranaEnemy_1 = new RanaEnemy(this, this.spine, 990, 390);
		this.add.existing(ranaEnemy_1);

		// ranaEnemy_2
		const ranaEnemy_2 = new RanaEnemy(this, this.spine, 169, 182);
		this.add.existing(ranaEnemy_2);

		// star_3
		const star_3 = new Star(this, 977, 276);
		this.add.existing(star_3);

		// platform_5
		const platform_5 = new Platform2(this, 144, 467, "cloud2");
		this.add.existing(platform_5);
		platform_5.scaleX = 0.8365933650783711;
		platform_5.scaleY = 0.8365933650783711;

		this.frontLayer = frontLayer;
		this.chestOrigin = chestOrigin;
		this.doorOrigin = doorOrigin;

		this.events.emit("scene-awake");
	}

	public frontLayer!: Phaser.GameObjects.Image;
	public chestOrigin!: Phaser.GameObjects.Image;
	public doorOrigin!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

		public nextLevel: string = "Level10";

    // Write your code here










    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
