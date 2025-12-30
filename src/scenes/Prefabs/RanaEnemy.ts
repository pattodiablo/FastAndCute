// You can write more code here

/* START OF COMPILED CODE */

import { SpineGameObject } from "@esotericsoftware/spine-phaser";
import { SpinePlugin } from "@esotericsoftware/spine-phaser";
import { SpineGameObjectBoundsProvider } from "@esotericsoftware/spine-phaser";
import { SkinsAndAnimationBoundsProvider } from "@esotericsoftware/spine-phaser";
/* START-USER-IMPORTS */
import BaseEscene from "../BaseEscene";
/* END-USER-IMPORTS */

export default interface RanaEnemy {

	 body: Phaser.Physics.Arcade.Body;
}

export default class RanaEnemy extends SpineGameObject {

	constructor(scene: Phaser.Scene, plugin: SpinePlugin, x: number, y: number, dataKey?: string, atlasKey?: string, skin?: string, boundsProvider?: SpineGameObjectBoundsProvider, xargs?: any) {
		super(scene, plugin, x ?? 0, y ?? 0, dataKey ?? "RanaEnemy", atlasKey ?? "RanaEnemy-atlas", boundsProvider ?? new SkinsAndAnimationBoundsProvider("Idle", ["default"]));

		this.skeleton.setSkinByName(skin ?? "default");
		this.scaleX = 0.4786267887723732;
		this.scaleY = 0.4786267887723732;
		scene.physics.add.existing(this, false);
		this.body.setSize(83.0000027382022, 76.49000000953671, false);

		/* START-USER-CTR-CODE */
		// Animación por defecto
		this.animationState.setAnimation(0, "Idle", true);

		// Física: gravedad efectiva y sin drag
		const body = this.body as Phaser.Physics.Arcade.Body;
		body.setAllowGravity(true);
		body.setGravityY(900);           // más fuerte
		body.setDrag(0, 0);
		body.setMaxVelocity(300, 1200);  // evita límites bajos
		body.setOffset(body.offset.x, body.offset.y - 15);

			this.scene.physics.add.overlap((this.scene as any).player, this, this.killPlayer, undefined, this);

		// Añadir automáticamente al grupo de enemigos para colisionar con plataformas
		const base = scene as BaseEscene;
		if (typeof base.addCollidingEnemy === 'function') {
			base.addCollidingEnemy(this);
			this._addedToList = true;
		} else if ((base as any).enemiesGroup) {
			(base as any).enemiesGroup.add(this);
			this._addedToList = true;
		}

		// Remover del grupo al destruir
		this.once(Phaser.GameObjects.Events.DESTROY, () => {
			if (this._addedToList) {
				if (typeof base.removeCollidingEnemy === 'function') {
					base.removeCollidingEnemy(this);
				} else if ((base as any).enemiesGroup) {
					(base as any).enemiesGroup.remove(this, false, false);
				}
				this._addedToList = false;
			}
			this.jumpTimer?.remove(false);
		});

		// Iniciar bucle de salto cada ~5s
		this.initJumpLoop();
		/* END-USER-CTR-CODE */
	}

		killPlayer(player: any, spike: any) {
		(player as any).Die();
	}

	/* START-USER-CODE */
	// Impulso vertical hacia arriba (en píxeles/segundo). Se usa como -jumpImpulse en Y.
	public jumpImpulse: number = 200;
	// Intervalo del bucle de salto (ms)
	public jumpIntervalMs: number = 6000;

	private _addedToList = false;
	private jumpTimer?: Phaser.Time.TimerEvent;
	private isJumping: boolean = false;

	private initJumpLoop() {
		// Listener para detectar fin de la animación "Jumping"
		try {
			this.animationState.addListener({
				complete: (entry: any) => {
					if (entry?.animation?.name === "Jumping") {
						// Impulso hacia arriba al terminar la animación
						const body = this.body as Phaser.Physics.Arcade.Body;
						if (body) body.setVelocityY(-this.jumpImpulse);

						// Volver a Idle en loop
						try { this.animationState.setAnimation(0, "Idle", true); } catch {}
						this.isJumping = false;
					}
				}
			});
		} catch {}

		// Timer que dispara el salto periódicamente
		this.jumpTimer = this.scene.time.addEvent({
			delay: this.jumpIntervalMs,
			loop: true,
			callback: () => this.triggerJump()
		});
	}
	// Opcional: actualizar el intervalo en runtime
	public setJumpInterval(ms: number) {
		this.jumpIntervalMs = Math.max(100, ms);
		if (this.jumpTimer) {
			this.jumpTimer.remove(false);
			this.jumpTimer = this.scene.time.addEvent({
				delay: this.jumpIntervalMs,
				loop: true,
				callback: () => this.triggerJump()
			});
		}
	}

	private triggerJump() {
		if (this.isJumping) return;
		this.isJumping = true;
		// Reproducir animación de salto una vez
		try {
			this.animationState.setAnimation(0, "Jumping", false);
		} catch {
			// Fallback: si no existe la animación, aplicar el impulso igual y volver a Idle
			const body = this.body as Phaser.Physics.Arcade.Body;
			if (body) body.setVelocityY(-this.jumpImpulse);
			try { this.animationState.setAnimation(0, "Idle", true); } catch {}
			this.isJumping = false;
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
