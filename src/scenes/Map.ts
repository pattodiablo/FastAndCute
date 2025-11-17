// You can write more code here

/* START OF COMPILED CODE */

import MapBtn from "./Prefabs/MapBtn";
import MapStar from "./Prefabs/MapStar";
import MapDot from "./Prefabs/MapDot";
import MapPlayer from "./Prefabs/MapPlayer";
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

		// mapBg
		const mapBg = this.add.image(0, 0, "MapBg");
		mapBg.setOrigin(0, 0);

		// mapDeviceBase
		this.add.image(494, 323, "MapDeviceBase");

		// mapBtnOn
		this.add.image(274, 136, "MapBtnOn");

		// bigCassette
		this.add.image(821, 118, "BigCassette");

		// basePlayer
		this.add.image(821, 319, "BasePlayer");

		// mapBtn
		const mapBtn = new MapBtn(this, 44, 46);
		this.add.existing(mapBtn);

		// mapBtnOn_1
		this.add.image(487, 136, "MapBtnOn");

		// WholeMap
		const wholeMap = this.add.container(143, 116);

		// mapBase
		const mapBase = this.add.image(237, 223, "MapBase");
		wholeMap.add(mapBase);

		// mapIsland3
		const mapIsland3 = this.add.image(420, 277, "MapIsland3");
		mapIsland3.scaleX = 0.485148175624755;
		mapIsland3.scaleY = 0.485148175624755;
		wholeMap.add(mapIsland3);

		// mapStar_3
		const mapStar_3 = new MapStar(this, 251, 138);
		wholeMap.add(mapStar_3);

		// mapRoute
		const mapRoute = this.add.image(237, 228, "MapRoute");
		mapRoute.scaleX = 0.4839260914617205;
		mapRoute.scaleY = 0.4839260914617205;
		wholeMap.add(mapRoute);

		// mapIsland2
		const mapIsland2 = this.add.image(-6, 114, "MapIsland2");
		mapIsland2.scaleX = 0.4200679672068577;
		mapIsland2.scaleY = 0.4200679672068577;
		wholeMap.add(mapIsland2);

		// mapIsland_1
		const mapIsland_1 = this.add.image(363, 330, "MapIsland2");
		mapIsland_1.scaleX = 0.4314879593255744;
		mapIsland_1.scaleY = 0.4314879593255744;
		wholeMap.add(mapIsland_1);

		// mapStar2
		const mapStar2 = this.add.image(196, 105, "MapStar2");
		wholeMap.add(mapStar2);

		// mapStar_4
		const mapStar_4 = this.add.image(163, 111, "MapStar2");
		wholeMap.add(mapStar_4);

		// mapStar_5
		const mapStar_5 = this.add.image(355, 262, "MapStar2");
		wholeMap.add(mapStar_5);

		// mapStar_6
		const mapStar_6 = this.add.image(8, 271, "MapStar2");
		wholeMap.add(mapStar_6);

		// mapStar_7
		const mapStar_7 = this.add.image(74, 352, "MapStar2");
		wholeMap.add(mapStar_7);

		// mapStar_8
		const mapStar_8 = this.add.image(188, 325, "MapStar2");
		wholeMap.add(mapStar_8);

		// mapStar_9
		const mapStar_9 = this.add.image(267, 198, "MapStar2");
		wholeMap.add(mapStar_9);

		// mapDot1
		const mapDot1 = new MapDot(this, 27, 196);
		mapDot1.scaleX = 0.6174998739057824;
		mapDot1.scaleY = 0.6174998739057824;
		wholeMap.add(mapDot1);

		// mapDot2
		const mapDot2 = new MapDot(this, 67, 284);
		mapDot2.scaleX = 0.6174998739057824;
		mapDot2.scaleY = 0.6174998739057824;
		wholeMap.add(mapDot2);

		// mapDot3
		const mapDot3 = new MapDot(this, 151, 296);
		mapDot3.scaleX = 0.6174998739057824;
		mapDot3.scaleY = 0.6174998739057824;
		wholeMap.add(mapDot3);

		// mapDot4
		const mapDot4 = new MapDot(this, 149, 193);
		mapDot4.scaleX = 0.6174998739057824;
		mapDot4.scaleY = 0.6174998739057824;
		wholeMap.add(mapDot4);

		// mapDot5
		const mapDot5 = new MapDot(this, 220, 205);
		mapDot5.scaleX = 0.6174998739057824;
		mapDot5.scaleY = 0.6174998739057824;
		wholeMap.add(mapDot5);

		// mapDot6
		const mapDot6 = new MapDot(this, 281, 276);
		mapDot6.scaleX = 0.6174998739057824;
		mapDot6.scaleY = 0.6174998739057824;
		wholeMap.add(mapDot6);

		// mapDot7
		const mapDot7 = new MapDot(this, 317, 188);
		mapDot7.scaleX = 0.6174998739057824;
		mapDot7.scaleY = 0.6174998739057824;
		wholeMap.add(mapDot7);

		// mapDot8
		const mapDot8 = new MapDot(this, 381, 133);
		mapDot8.scaleX = 0.6174998739057824;
		mapDot8.scaleY = 0.6174998739057824;
		wholeMap.add(mapDot8);

		// mapDot9
		const mapDot9 = new MapDot(this, 439, 199);
		mapDot9.scaleX = 0.6174998739057824;
		mapDot9.scaleY = 0.6174998739057824;
		wholeMap.add(mapDot9);

		// mapDot10
		const mapDot10 = new MapDot(this, 466, 294);
		mapDot10.scaleX = 0.6174998739057824;
		mapDot10.scaleY = 0.6174998739057824;
		wholeMap.add(mapDot10);

		// mapDot1Number
		const mapDot1Number = this.add.image(25, 195, "MapDot1");
		mapDot1Number.scaleX = 0.5345951773847478;
		mapDot1Number.scaleY = 0.5345951773847478;
		wholeMap.add(mapDot1Number);

		// mapDot2Number
		const mapDot2Number = this.add.image(67, 282, "MapDot2");
		mapDot2Number.scaleX = 0.5482835545204905;
		mapDot2Number.scaleY = 0.5482835545204905;
		wholeMap.add(mapDot2Number);

		// mapDot3Number
		const mapDot3Number = this.add.image(151, 294, "MapDot3");
		mapDot3Number.scaleX = 0.5345951773847478;
		mapDot3Number.scaleY = 0.5345951773847478;
		wholeMap.add(mapDot3Number);

		// mapDot4Number
		const mapDot4Number = this.add.image(147, 191, "MapDot4");
		mapDot4Number.scaleX = 0.5345951773847478;
		mapDot4Number.scaleY = 0.5345951773847478;
		wholeMap.add(mapDot4Number);

		// mapDot5Number
		const mapDot5Number = this.add.image(220, 201, "MapDot5");
		mapDot5Number.scaleX = 0.5345951773847478;
		mapDot5Number.scaleY = 0.5345951773847478;
		wholeMap.add(mapDot5Number);

		// mapDot6Number
		const mapDot6Number = this.add.image(281, 272, "MapDot6");
		mapDot6Number.scaleX = 0.5482835545204905;
		mapDot6Number.scaleY = 0.5482835545204905;
		wholeMap.add(mapDot6Number);

		// mapDot7Number
		const mapDot7Number = this.add.image(317, 182, "MapDot7");
		mapDot7Number.scaleX = 0.5345951773847478;
		mapDot7Number.scaleY = 0.5345951773847478;
		wholeMap.add(mapDot7Number);

		// mapDot8Number
		const mapDot8Number = this.add.image(381, 129, "MapDot8");
		mapDot8Number.scaleX = 0.5345951773847478;
		mapDot8Number.scaleY = 0.5345951773847478;
		wholeMap.add(mapDot8Number);

		// mapDot9Number
		const mapDot9Number = this.add.image(441, 192, "MapDot9");
		mapDot9Number.scaleX = 0.5345951773847478;
		mapDot9Number.scaleY = 0.5345951773847478;
		wholeMap.add(mapDot9Number);

		// mapDot10Number
		const mapDot10Number = this.add.image(466, 293, "MapDot10");
		mapDot10Number.scaleX = 0.5345951773847478;
		mapDot10Number.scaleY = 0.5345951773847478;
		wholeMap.add(mapDot10Number);

		// mapIsland
		const mapIsland = this.add.image(36, 325, "MapIsland2");
		mapIsland.scaleX = 0.41868662442697524;
		mapIsland.scaleY = 0.41868662442697524;
		wholeMap.add(mapIsland);

		// mapIsland_2
		const mapIsland_2 = this.add.image(93, 203, "MapIsland");
		mapIsland_2.scaleX = 0.606880368437767;
		mapIsland_2.scaleY = 0.606880368437767;
		wholeMap.add(mapIsland_2);

		// mapIsland_3
		const mapIsland_3 = this.add.image(271, 347, "MapIsland");
		mapIsland_3.scaleX = 0.606880368437767;
		mapIsland_3.scaleY = 0.606880368437767;
		wholeMap.add(mapIsland_3);

		// mapIsland_4
		const mapIsland_4 = this.add.image(378, 218, "MapIsland");
		mapIsland_4.scaleX = 0.606880368437767;
		mapIsland_4.scaleY = 0.606880368437767;
		wholeMap.add(mapIsland_4);

		// mapPlayer
		const mapPlayer = new MapPlayer(this, 26, 174);
		mapPlayer.scaleX = 0.5248733321815928;
		mapPlayer.scaleY = 0.5248733321815928;
		wholeMap.add(mapPlayer);

		// mapStar
		const mapStar = new MapStar(this, 226, 323);
		mapStar.scaleX = 0.5493458055294465;
		mapStar.scaleY = 0.5493458055294465;
		wholeMap.add(mapStar);

		// mapStar_1
		const mapStar_1 = new MapStar(this, 86, 168);
		mapStar_1.scaleX = 0.5493458055294465;
		mapStar_1.scaleY = 0.5493458055294465;
		wholeMap.add(mapStar_1);

		// mapStar_2
		const mapStar_2 = new MapStar(this, 462, 128);
		mapStar_2.scaleX = 0.5493458055294465;
		mapStar_2.scaleY = 0.5493458055294465;
		wholeMap.add(mapStar_2);

		// new_txt
		this.add.image(486, 83, "new_txt");

		// world_Txt
		this.add.image(272, 136, "world_Txt");

		// unlocks_txt
		this.add.image(483, 134, "unlocks_txt");

		// nextBtn
		const nextBtn = this.add.image(886, 409, "NextBtn");
		nextBtn.scaleX = 1.2;
		nextBtn.scaleY = 1.2;

		// playBtn
		const playBtn = this.add.image(827, 409, "PlayBtn");
		playBtn.scaleX = 1.2;
		playBtn.scaleY = 1.2;

		// prevBtn
		const prevBtn = this.add.image(766, 409, "PrevBtn");
		prevBtn.scaleX = 1.2;
		prevBtn.scaleY = 1.2;

		// songTimeline
		this.add.image(824, 339, "SongTimeline");

		// songStatusHandle
		this.add.image(773, 339, "SongStatusHandle");

		// song1Almbum
		this.add.image(821, 216, "song1Almbum");

		// songPortrait
		this.add.image(821, 215, "SongPortrait");

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

/* END OF COMPILED CODE */

// You can write more code here
