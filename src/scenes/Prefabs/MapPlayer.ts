// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MapPlayer extends Phaser.GameObjects.Image {

    constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
        super(scene, x ?? 0, y ?? 0, texture || "MapPlayer", frame);

        /* START-USER-CTR-CODE */
        // Write your code here.
        // Asegurar que la imagen queda en la escena y arrancar el tween de flotación
        scene.add.existing(this);

        this.startFloating();
        /* END-USER-CTR-CODE */
    }

    /* START-USER-CODE */

    // Write your code here.
    private originalY!: number;
    private floatTween?: Phaser.Tweens.Tween;

    private startFloating(amplitude = 6, baseDuration = 1000) {
        // Guardar la posición original (si no está definida)
        this.originalY = this.originalY ?? this.y;

        // Evitar crear múltiples tweens
        if (this.floatTween && !this.floatTween?.isDestroyed) return;

        const dur = baseDuration + Phaser.Math.Between(-400, 400);
        const delay = Phaser.Math.Between(0, 400);

        this.floatTween = this.scene.tweens.add({
            targets: this,
            y: this.originalY + amplitude,
            ease: "Sine.InOut",
            duration: dur,
            yoyo: true,
            repeat: -1,
            delay: 200,
        });
    }

    // Opcional: detener la flotación si se destruye el objeto
    public destroy(fromScene?: boolean) {
        if (this.floatTween) {
            try { this.floatTween.stop(); } catch {}
            this.floatTween = undefined;
        }
        super.destroy(fromScene);
    }
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
