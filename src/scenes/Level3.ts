// You can write more code here

/* START OF COMPILED CODE */

import BaseEscene from "./BaseEscene";
import DefaultPlatform from "./Prefabs/DefaultPlatform";
import Star from "./Prefabs/Star";
import RanaEnemy from "./Prefabs/RanaEnemy";
import Platform2 from "./Prefabs/Platform2";
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

		// platform_3
		const platform_3 = new DefaultPlatform(this, 480, 388);
		this.add.existing(platform_3);

		// platform
		const platform = new DefaultPlatform(this, 119, 615);
		this.add.existing(platform);

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
		const chestOrigin = this.add.image(532, 231, "CloseChestanimation", "CloseChest0031.png");

		// DoorOrigin
		const doorOrigin = this.add.image(65, 482, "door");

		// ranaEnemy
		const ranaEnemy = new RanaEnemy(this, this.spine, 182, 522);
		this.add.existing(ranaEnemy);

		// platform2
		const platform2 = new Platform2(this, 917, 116, "cloud1");
		this.add.existing(platform2);
		platform2.scaleX = 0.8365933650783711;
		platform2.scaleY = 0.8365933650783711;

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
