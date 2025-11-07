import EnemyBullet from "./EnemyBullet";

// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class EnemyCannon extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "EnemyCannon", frame ?? "EnemyCannon0001.png");

		/* START-USER-CTR-CODE */
		// Dispara al completar la animación (y en cada loop si la animación está en bucle)
		this.on("animationcomplete-EnemyCannon", this.shoot, this);
		this.on("animationrepeat-EnemyCannon", this.shoot, this);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	private shoot() {
		const bullet = new EnemyBullet(this.scene);

		// Si EnemyBullet implementa fireFrom, úsalo
		if ((bullet as any).fireFrom) {
			(bullet as any).fireFrom(this, 100);
			return;
		}

		// Fallback: calcula posición/rotación mundial
		const m = (this as any).getWorldTransformMatrix?.();
		let wx = this.x, wy = this.y, ang = this.rotation;
		if (m) {
			const p = new Phaser.Math.Vector2();
			m.transformPoint(0, 0, p);
			wx = p.x; wy = p.y;
			ang = Math.atan2(m.b, m.a);
		}

		bullet.setPosition(wx, wy);
		const body = bullet.body as Phaser.Physics.Arcade.Body;
		const speed = 500;
		body.setVelocity(Math.cos(ang) * speed, Math.sin(ang) * speed);
		this.setDepth(100); // Render detrás del cañón
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
