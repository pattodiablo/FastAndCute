// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class NewUnlockText extends Phaser.GameObjects.Image {

    constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
        super(scene, x ?? 0, y ?? 0, texture || "new_txt", frame);

        /* START-USER-CTR-CODE */
        // Flotar suavemente arriba/abajo
		this.setVisible(false);

        const baseY = this.y;
        this._bobTween = scene.tweens.add({
            targets: this,
            y: baseY - 12,           // amplitud hacia arriba
            duration: 900,
            ease: 'Sine.InOut',
            yoyo: true,
            repeat: -1,
            delay: Phaser.Math.Between(0, 250)
        });

        /* END-USER-CTR-CODE */
    }

    /* START-USER-CODE */
    private _bobTween?: Phaser.Tweens.Tween;

    // Limpieza del tween al destruir
    destroy(fromScene?: boolean): void {
        this._bobTween?.stop();
        this._bobTween = undefined;
        super.destroy(fromScene);
    }
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
