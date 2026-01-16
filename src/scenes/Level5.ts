// You can write more code here

/* START OF COMPILED CODE */

import BaseEscene from "./BaseEscene";
import Spikes from "./Prefabs/Spikes";
import Cristal_Platform from "./Prefabs/Cristal_Platform";
import Fall_Platform from "./Prefabs/Fall_Platform";
import DefaultPlatform from "./Prefabs/DefaultPlatform";
import Star from "./Prefabs/Star";
import Platform2 from "./Prefabs/Platform2";
import RanaEnemy from "./Prefabs/RanaEnemy";
import LateralDoor from "./Prefabs/LateralDoor";
import BtnPresion from "./Prefabs/BtnPresion";
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

		// spikes
		const spikes = new Spikes(this, 240, 305);
		this.add.existing(spikes);
		spikes.angle = -90;

		// cristal_Platform
		const cristal_Platform = new Cristal_Platform(this, 921, 466);
		this.add.existing(cristal_Platform);

		// fall_Platform
		const fall_Platform = new Fall_Platform(this, 950, 89);
		this.add.existing(fall_Platform);

		// platform
		const platform = new DefaultPlatform(this, 107, 302);
		this.add.existing(platform);

		// platform_1
		const platform_1 = new DefaultPlatform(this, 421, 521, "Platform3");
		this.add.existing(platform_1);

		// platform_2
		const platform_2 = new DefaultPlatform(this, 817, 204, "Platform3");
		this.add.existing(platform_2);
		platform_2.angle = -180;

		// star
		const star = new Star(this, 92, 489);
		this.add.existing(star);

		// frontLayer
		const frontLayer = this.add.image(511, 568, "FrontLayer");

		// star_1
		const star_1 = new Star(this, 951, 254);
		this.add.existing(star_1);

		// star_2
		const star_2 = new Star(this, 584, 68);
		this.add.existing(star_2);

		// ChestOrigin
		const chestOrigin = this.add.image(115, 144, "CloseChestanimation", "CloseChest0031.png");

		// DoorOrigin
		const doorOrigin = this.add.image(417, 378, "door");

		// platform2
		const platform2 = new Platform2(this, 131, 474, "cloud1");
		this.add.existing(platform2);
		platform2.scaleX = 0.8365933650783711;
		platform2.scaleY = 0.8365933650783711;

		// ranaEnemy_1
		const ranaEnemy_1 = new RanaEnemy(this, this.spine, 658, 410);
		this.add.existing(ranaEnemy_1);

		// star_3
		const star_3 = new Star(this, 963, 537);
		this.add.existing(star_3);

		// platform_4
		const platform_4 = new Platform2(this, 580, 66, "cloud3");
		this.add.existing(platform_4);
		platform_4.scaleX = 0.8365933650783711;
		platform_4.scaleY = 0.8365933650783711;

		// lateralDoor
		const lateralDoor = new LateralDoor(this, 849, 364);
		this.add.existing(lateralDoor);

		// platform_5
		const platform_5 = new DefaultPlatform(this, 573, 521);
		this.add.existing(platform_5);

		// platform_6
		const platform_6 = new DefaultPlatform(this, 816, 26, "Platform3");
		this.add.existing(platform_6);
		platform_6.angle = -180;

		// btnPresion
		const btnPresion = new BtnPresion(this, 566, 435);
		this.add.existing(btnPresion);
		btnPresion.scaleX = 0.4;
		btnPresion.scaleY = 0.4;

		// fall_Platform_1
		const fall_Platform_1 = new Fall_Platform(this, 300, 69);
		this.add.existing(fall_Platform_1);

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
