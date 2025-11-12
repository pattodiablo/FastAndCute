// You can write more code here

/* START OF COMPILED CODE */

import MapStar from "./Prefabs/MapStar";
import MapDot from "./Prefabs/MapDot";
import MapPlayer from "./Prefabs/MapPlayer";
import MapBtn from "./Prefabs/MapBtn";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Map extends Phaser.Scene {

	constructor() {
		super("Map");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// mapBase
		const mapBase = this.add.image(515, 290, "MapBase");
		mapBase.scaleX = 1.05;
		mapBase.scaleY = 1.05;

		// mapIsland3
		this.add.image(971, 459, "MapIsland3");

		// mapStar_3
		const mapStar_3 = new MapStar(this, 789, 220);
		this.add.existing(mapStar_3);

		// mapRoute
		this.add.image(518, 293, "MapRoute");

		// mapIsland2
		this.add.image(42, 117, "MapIsland2");

		// mapIsland
		this.add.image(40, 540, "MapIsland2");

		// mapIsland_1
		this.add.image(836, 550, "MapIsland2");

		// mapStar2
		this.add.image(806, 342, "MapStar2");

		// mapStar_4
		this.add.image(245, 313, "MapStar2");

		// mapStar_5
		this.add.image(291, 117, "MapStar2");

		// mapStar_6
		this.add.image(533, 105, "MapStar2");

		// mapStar_7
		this.add.image(685, 553, "MapStar2");

		// mapStar_8
		this.add.image(68, 399, "MapStar2");

		// mapStar_9
		this.add.image(1008, 184, "MapStar2");

		// mapDot1
		const mapDot1 = new MapDot(this, 119, 300);
		this.add.existing(mapDot1);

		// mapDot2
		const mapDot2 = new MapDot(this, 209, 458);
		this.add.existing(mapDot2);

		// mapDot3
		const mapDot3 = new MapDot(this, 355, 400);
		this.add.existing(mapDot3);

		// mapDot4
		const mapDot4 = new MapDot(this, 354, 199);
		this.add.existing(mapDot4);

		// mapDot5
		const mapDot5 = new MapDot(this, 498, 234);
		this.add.existing(mapDot5);

		// mapDot6
		const mapDot6 = new MapDot(this, 638, 391);
		this.add.existing(mapDot6);

		// mapDot7
		const mapDot7 = new MapDot(this, 686, 202);
		this.add.existing(mapDot7);

		// mapDot8
		const mapDot8 = new MapDot(this, 789, 98);
		this.add.existing(mapDot8);

		// mapDot9
		const mapDot9 = new MapDot(this, 913, 208);
		this.add.existing(mapDot9);

		// mapDot10
		const mapDot10 = new MapDot(this, 994, 436);
		this.add.existing(mapDot10);

		// mapDot1
		this.add.image(117, 296, "MapDot1");

		// mapDot2
		this.add.image(207, 453, "MapDot2");

		// mapDot3
		this.add.image(358, 400, "MapDot3");

		// mapDot4
		this.add.image(354, 199, "MapDot4");

		// mapDot5
		this.add.image(498, 228, "MapDot5");

		// mapDot6
		this.add.image(637, 392, "MapDot6");

		// mapDot7
		this.add.image(688, 202, "MapDot7");

		// mapDot8
		this.add.image(789, 98, "MapDot8");

		// mapDot9
		this.add.image(914, 208, "MapDot9");

		// mapDot10
		this.add.image(996, 432, "MapDot10");

		// mapIsland_2
		this.add.image(241, 290, "MapIsland");

		// mapIsland_3
		this.add.image(517, 553, "MapIsland");

		// mapIsland_4
		this.add.image(819, 297, "MapIsland");

		// mapPlayer
		const mapPlayer = new MapPlayer(this, 118, 248);
		this.add.existing(mapPlayer);

		// mapStar
		const mapStar = new MapStar(this, 479, 444);
		this.add.existing(mapStar);

		// mapStar_1
		const mapStar_1 = new MapStar(this, 232, 203);
		this.add.existing(mapStar_1);

		// mapStar_2
		const mapStar_2 = new MapStar(this, 574, 138);
		this.add.existing(mapStar_2);

		// mapBtn
		const mapBtn = new MapBtn(this, 44, 46);
		this.add.existing(mapBtn);

		// mapDot1 (prefab fields)
		mapDot1.IsDotActive = true;

		// mapDot2 (prefab fields)
		mapDot2.Level = 2;

		// mapDot3 (prefab fields)
		mapDot3.Level = 3;

		// mapDot4 (prefab fields)
		mapDot4.Level = 4;

		// mapDot5 (prefab fields)
		mapDot5.Level = 5;

		// mapDot6 (prefab fields)
		mapDot6.Level = 6;

		// mapDot7 (prefab fields)
		mapDot7.Level = 7;

		// mapDot8 (prefab fields)
		mapDot8.Level = 8;

		// mapDot9 (prefab fields)
		mapDot9.Level = 9;

		// mapDot10 (prefab fields)
		mapDot10.Level = 10;

		this.mapDot1 = mapDot1;
		this.mapDot2 = mapDot2;
		this.mapDot3 = mapDot3;
		this.mapDot4 = mapDot4;
		this.mapDot5 = mapDot5;
		this.mapDot6 = mapDot6;
		this.mapDot7 = mapDot7;
		this.mapDot8 = mapDot8;
		this.mapDot9 = mapDot9;
		this.mapDot10 = mapDot10;
		this.mapPlayer = mapPlayer;

		this.events.emit("scene-awake");
	}

	public mapDot1!: MapDot;
	public mapDot2!: MapDot;
	public mapDot3!: MapDot;
	public mapDot4!: MapDot;
	public mapDot5!: MapDot;
	public mapDot6!: MapDot;
	public mapDot7!: MapDot;
	public mapDot8!: MapDot;
	public mapDot9!: MapDot;
	public mapDot10!: MapDot;
	public mapPlayer!: MapPlayer;

	/* START-USER-CODE */

	private _lastSceneKey?: string;

	create() {
        this.editorCreate();

        this.cameras.main.fadeIn(1200, 0, 0, 0);

        // Captura la escena previa (si BaseEscene la dejó en el registry) o dedúcela
        this._lastSceneKey = (this.registry.get('LastActiveSceneKey') as string) || this.findUnderlyingActiveSceneKey();

        this.loadMapState();
        this.locatePlayerOnMap();
    }

	private locatePlayerOnMap() {
		// Mover el mapPlayer al MapDot del nivel actual
		const currentLevel = this.registry.get('PlayerMaxLevel') as number || 1;
		const targetMapDot = this.getMapDot(currentLevel);
		if (targetMapDot) {
			this.mapPlayer.x = targetMapDot.x;
			this.mapPlayer.y = targetMapDot.y - 20; // Ajuste vertical para que no se superponga
			console.log(`Player located on MapDot for level ${currentLevel}`);
			this.mapPlayer.startFloating(targetMapDot.y - 40);
		} else {
			console.warn(`No MapDot found for level ${currentLevel}`);
		}
	}
	loadMapState() {

		let PlayerMaxLevel = 1;
		try {
			const raw = localStorage.getItem('PlayerMaxLevel');
			PlayerMaxLevel = raw ? Math.max(1, Number(raw)) : 1;
		} catch {
			// fallback al registry si localStorage falla
			const regVal = this.registry.get('PlayerMaxLevel');
			if (typeof regVal === 'number') PlayerMaxLevel = Math.max(1, regVal);
		}
		// opcional: sincronizar al registry para otras escenas
		try { this.registry.set('PlayerMaxLevel', PlayerMaxLevel); } catch {}
		console.log(`PlayerMaxLevel (localStorage): ${PlayerMaxLevel}`);
        // Activar los MapDots según el nivel máximo del jugador
        for (let i = 1; i <= 10; i++) {
            const mapDot = this.getMapDot(i);
            if (mapDot) {
                mapDot.IsDotActive = i <= PlayerMaxLevel;
                mapDot.awake();
            }
        }
    }

	private getMapDot(index: number): MapDot | undefined {
		switch (index) {
			case 1: return this.mapDot1;
			case 2: return this.mapDot2;
			case 3: return this.mapDot3;
			case 4: return this.mapDot4;
			case 5: return this.mapDot5;
			case 6: return this.mapDot6;
			case 7: return this.mapDot7;
			case 8: return this.mapDot8;
			case 9: return this.mapDot9;
			case 10: return this.mapDot10;
			default: return undefined;
		}
	}

	
	
	// Llamar esto desde tu botón (MapBtn) o desde BaseEscene
	public toggleMapOverlay() {
    this.closeToTopAndResume();
}

private closeToTopAndResume() {
    const h = this.scale.height;
    const cam = this.cameras.main as any;

    this.tweens.add({
        targets: cam,
        y: -h,
        duration: 350,
        ease: 'Cubic.In',
        onComplete: () => {
this.input.enabled = false;

// Leer la escena a reanudar en ese momento (siempre fresco)
			const regKey = this.registry.get('LastActiveSceneKey') as string | undefined;
			const key = regKey || this.findUnderlyingActiveSceneKey();
            if (key) {
                this.scene.resume(key);
                const target = this.scene.get(key) as Phaser.Scene;
                try { (target as any).physics?.world?.resume?.(); } catch {}
                try { (target as any).input.enabled = true; } catch {}
                this.scene.bringToTop(key);
            }

            this.scene.sendToBack(this.scene.key);
        }
    });
}

// Intenta detectar cuál escena activa no es "Map"
private findUnderlyingActiveSceneKey(): string | undefined {
    const mgr: any = this.scene.manager || (this.game as any).scene;
    const list: Phaser.Scene[] =
        (mgr.getScenes ? mgr.getScenes(true) : mgr.scenes) || [];
    // devuelve la última activa distinta de "Map"
    for (let i = list.length - 1; i >= 0; i--) {
        const s = list[i] as any;
        if (s && s.sys && s.sys.settings && s.sys.settings.key !== 'Map' && s.sys.isActive()) {
            return s.sys.settings.key as string;
        }
    }
    return undefined;
}

/* END-USER-CODE */

}
