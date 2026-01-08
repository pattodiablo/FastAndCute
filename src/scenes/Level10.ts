// You can write more code here

/* START OF COMPILED CODE */

import BaseEscene from "./BaseEscene";
import DefaultPlatform from "./Prefabs/DefaultPlatform";
import Star from "./Prefabs/Star";
import RanaEnemy from "./Prefabs/RanaEnemy";
import Platform2 from "./Prefabs/Platform2";
import Enemy1 from "./Prefabs/Enemy1";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level10 extends BaseEscene {

	constructor() {
		super("Level10");

		/* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// platform_3
		const platform_3 = new DefaultPlatform(this, 764, 539);
		this.add.existing(platform_3);

		// platform
		const platform = new DefaultPlatform(this, 119, 615);
		this.add.existing(platform);

		// star
		const star = new Star(this, 96, 286);
		this.add.existing(star);

		// frontLayer
		const frontLayer = this.add.image(511, 568, "FrontLayer");

		// star_1
		const star_1 = new Star(this, 927, 106);
		this.add.existing(star_1);

		// star_2
		const star_2 = new Star(this, 249, 47);
		this.add.existing(star_2);

		// ChestOrigin
		const chestOrigin = this.add.image(98, 456, "CloseChestanimation", "CloseChest0031.png");

		// DoorOrigin
		const doorOrigin = this.add.image(976, 441, "door");

		// ranaEnemy
		const ranaEnemy = new RanaEnemy(this, this.spine, 221, 519);
		this.add.existing(ranaEnemy);

		// platform2
		const platform2 = new Platform2(this, 895, 97, "cloud1");
		this.add.existing(platform2);
		platform2.scaleX = 0.8365933650783711;
		platform2.scaleY = 0.8365933650783711;

		// enemy1
		const enemy1 = new Enemy1(this, 479, 291);
		this.add.existing(enemy1);

		// platform_1
		const platform_1 = new DefaultPlatform(this, 1018, 572, "Platform2");
		this.add.existing(platform_1);

		// platform_2
		const platform_2 = new DefaultPlatform(this, 471, 576, "Platform3");
		this.add.existing(platform_2);

		// star_3
		const star_3 = new Star(this, 959, 285);
		this.add.existing(star_3);

		// ranaEnemy_1
		const ranaEnemy_1 = new RanaEnemy(this, this.spine, 677, 446);
		this.add.existing(ranaEnemy_1);

		// ranaEnemy_2
		const ranaEnemy_2 = new RanaEnemy(this, this.spine, 762, 446);
		this.add.existing(ranaEnemy_2);

		// ranaEnemy_3
		const ranaEnemy_3 = new RanaEnemy(this, this.spine, 840, 446);
		this.add.existing(ranaEnemy_3);

		// star_4
		const star_4 = new Star(this, 477, 100);
		this.add.existing(star_4);

		this.frontLayer = frontLayer;
		this.chestOrigin = chestOrigin;
		this.doorOrigin = doorOrigin;

		this.events.emit("scene-awake");
	}

	public frontLayer!: Phaser.GameObjects.Image;
	public chestOrigin!: Phaser.GameObjects.Image;
	public doorOrigin!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

		public nextLevel: string = "Level1";

    // Write your code here










    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
