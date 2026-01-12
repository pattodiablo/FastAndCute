// You can write more code here

/* START OF COMPILED CODE */

import EnemyCannon from "./EnemyCannon";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Enemy1 extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// cannon1
		const cannon1 = new EnemyCannon(scene, 0, -55);
		this.add(cannon1);

		// cannon2
		const cannon2 = new EnemyCannon(scene, 38, -39);
		cannon2.angle = 45;
		this.add(cannon2);

		// cannon3
		const cannon3 = new EnemyCannon(scene, 54, 0);
		cannon3.angle = 90;
		this.add(cannon3);

		// cannon4
		const cannon4 = new EnemyCannon(scene, 38, 39);
		cannon4.angle = 135;
		this.add(cannon4);

		// cannon5
		const cannon5 = new EnemyCannon(scene, 0, 53);
		cannon5.angle = -180;
		this.add(cannon5);

		// cannon6
		const cannon6 = new EnemyCannon(scene, -40, 40);
		cannon6.angle = -135;
		this.add(cannon6);

		// cannon7
		const cannon7 = new EnemyCannon(scene, -54, 0);
		cannon7.angle = -90;
		this.add(cannon7);

		// cannon8
		const cannon8 = new EnemyCannon(scene, -41, -36);
		cannon8.angle = -45.00000000000006;
		this.add(cannon8);

		// enemyFace
		const enemyFace = scene.add.sprite(0, 0, "EnemyFace", "Enemy10001.png");
		enemyFace.play({"key":"EnemyFace","frameRate":12,"yoyo":true});
		this.add(enemyFace);

		this.cannon1 = cannon1;
		this.cannon2 = cannon2;
		this.cannon3 = cannon3;
		this.cannon4 = cannon4;
		this.cannon5 = cannon5;
		this.cannon6 = cannon6;
		this.cannon7 = cannon7;
		this.cannon8 = cannon8;

		/* START-USER-CTR-CODE */
        // Lista completa de cañones y configuración inicial (8 por defecto)
        this.allCannons = [
            this.cannon1, this.cannon2, this.cannon3, this.cannon4,
            this.cannon5, this.cannon6, this.cannon7, this.cannon8
        ];

        this.configureCannons(this.NumberOfCannons); // Llama con 1, 2, 4 u 8 según necesites
        /* END-USER-CTR-CODE */
	}

	private cannon1: EnemyCannon;
	private cannon2: EnemyCannon;
	private cannon3: EnemyCannon;
	private cannon4: EnemyCannon;
	private cannon5: EnemyCannon;
	private cannon6: EnemyCannon;
	private cannon7: EnemyCannon;
	private cannon8: EnemyCannon;
	public NumberOfCannons: number = 2;

	/* START-USER-CODE */
    private sequenceTimer?: Phaser.Time.TimerEvent;
    private allCannons: EnemyCannon[] = [];
    private activeCannons: EnemyCannon[] = [];

    // Configura cuántos cañones están activos: 1 => [1], 2 => [1,4], 4 => [1,3,5,7], 8 => todos
    public configureCannons(count: number) {
        const allowed = (count === 1 || count === 2 || count === 4 || count === 8) ? count : 8;

        let indices: number[] = [];
        switch (allowed) {
            case 1: indices = [0]; break;                 // cannon1
            case 2: indices = [0, 3]; break;              // cannon1, cannon4
            case 4: indices = [0, 2, 4, 6]; break;        // cannon1, cannon3, cannon5, cannon7
            case 8: indices = [0,1,2,3,4,5,6,7]; break;   // todos
        }

        // Mostrar/ocultar y activar/desactivar
        this.allCannons.forEach((c, i) => {
            const enabled = indices.includes(i);
            c.setVisible(enabled);
            c.active = enabled;
            // Opcional: detener animación si se desactiva
            if (!enabled && (c as any).anims?.isPlaying) {
                (c as any).anims.stop();
            }
        });

        this.activeCannons = indices.map(i => this.allCannons[i]);

        // Reinicia la secuencia con los cañones activos
        this.startCannonSequence();
    }

    private startCannonSequence() {
        // Evita duplicar
        if (this.sequenceTimer) {
            this.sequenceTimer.remove(false);
            this.sequenceTimer = undefined;
        }

        const cannons = this.activeCannons.length > 0 ? this.activeCannons : this.allCannons.filter(c => c.visible && c.active);
        if (cannons.length === 0) return;

        let idx = 0;

        this.sequenceTimer = this.scene.time.addEvent({
            delay: 1000, // medio segundo entre cada cañón
            loop: true,
            callback: () => {
                const cannon = cannons[idx];
                if (cannon && (cannon as any).play && cannon.active && cannon.visible) {
                    (cannon as any).play("EnemyCannon");
                }
                idx = (idx + 1) % cannons.length;
            }
        });
    }
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
