
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import BatEnemy from "./BatEnemy";
/* END-USER-IMPORTS */

export default class BatCaveGenerator extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "BatCave", frame);

		this.scaleX = 0.5;
		this.scaleY = 0.54;

		/* START-USER-CTR-CODE */
		this.startSpawner();

		this.scene.events.once(Phaser.Scenes.Events.DESTROY, () => {
			this.stopSpawner();
		});
		/* END-USER-CTR-CODE */
	}

	public DeployTime: number = 3000;
	private spawnTimer?: Phaser.Time.TimerEvent;

	/* START-USER-CODE */

	private startSpawner() {
		this.stopSpawner();
		const delay = Math.max(200, this.DeployTime || 0);
		this.spawnTimer = this.scene.time.addEvent({
			delay,
			loop: true,
			callback: () => this.spawnBat()
		});
	}

	private stopSpawner() {
		if (this.spawnTimer) {
			this.spawnTimer.remove(false);
			this.spawnTimer = undefined;
		}
	}

	private spawnBat() {
		const spinePlugin = (this.scene as any).spine as any;
		if (!spinePlugin) return;
		const bat = new BatEnemy(this.scene, spinePlugin, this.x, this.y);
		this.scene.add.existing(bat);
	}



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
