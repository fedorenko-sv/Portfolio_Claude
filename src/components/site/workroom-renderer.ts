import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export type WorkroomController = {
  select: (index: number) => void;
  visible: (value: boolean) => void;
  motion: (value: boolean) => void;
  dispose: () => void;
};

/** Procedural objects: no remote model service or continuously running render loop. */
export function createWorkroom(
  host: HTMLElement,
  initial: number,
  reduced: boolean,
  events: {
    onSelect: (index: number) => void;
    onHover: (index: number) => void;
  },
): WorkroomController {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 3, -3, 0.1, 50);
  camera.position.set(6.5, 7.8, 12);
  camera.lookAt(0, 0.45, 0);
  scene.add(new THREE.HemisphereLight(0xf4f5ee, 0x343235, 1.8));
  const key = new THREE.DirectionalLight(0xfff1df, 2.8);
  key.position.set(-3, 8, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -6;
  key.shadow.camera.right = 6;
  key.shadow.camera.top = 5;
  key.shadow.camera.bottom = -5;
  key.shadow.normalBias = 0.035;
  key.shadow.bias = -0.0002;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc7d5ec, 1.7);
  rim.position.set(5, 4, -4);
  scene.add(rim);
  const stage = new THREE.Group();
  scene.add(stage);
  const textures: THREE.Texture[] = [];
  const material = (color: number, metalness = 0, roughness = 0.5) =>
    new THREE.MeshStandardMaterial({ color, metalness, roughness });
  const silver = material(0x909794, 0.8, 0.33),
    black = material(0x191b1c, 0.35, 0.45),
    paper = material(0xf4f5ee, 0, 0.95),
    cherry = material(0x8d2034, 0.1, 0.57);
  function box(
    parent: THREE.Object3D,
    w: number,
    h: number,
    d: number,
    mat: THREE.Material,
    x = 0,
    y = 0,
    z = 0,
  ) {
    const mesh = new THREE.Mesh(
      new RoundedBoxGeometry(
        w,
        h,
        d,
        3,
        Math.min(0.045, w * 0.2, h * 0.2, d * 0.2),
      ),
      mat,
    );
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function print(lines: string[], bg: string, ink: string, size = 68) {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = ink;
    ctx.font = `${size}px Georgia`;
    lines.forEach((line, i) => ctx.fillText(line, 50, 100 + i * size * 1.25));
    ctx.strokeStyle = ink;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, 355);
    ctx.lineTo(460, 355);
    ctx.stroke();
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    textures.push(texture);
    return texture;
  }
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.ShadowMaterial({ opacity: 0.32 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.27;
  floor.receiveShadow = true;
  scene.add(floor);
  const desk = box(
    stage,
    8.2,
    0.22,
    3.25,
    material(0x191b1b, 0.05, 0.9),
    0,
    -0.16,
    0,
  );
  desk.receiveShadow = true;
  const laptop = new THREE.Group();
  laptop.position.set(-2.5, 0.02, 0);
  laptop.rotation.y = 0.18;
  stage.add(laptop);
  box(laptop, 2, 0.09, 1.35, silver, 0, 0, 0.1);
  box(laptop, 1.65, 0.014, 0.65, black, 0, 0.052, -0.04);
  const keys = new THREE.InstancedMesh(
    new RoundedBoxGeometry(0.105, 0.008, 0.105, 2, 0.0016),
    material(0x3c403e, 0.2, 0.6),
    48,
  );
  for (let row = 0; row < 4; row++)
    for (let col = 0; col < 12; col++)
      keys.setMatrixAt(
        row * 12 + col,
        new THREE.Matrix4().makeTranslation(
          -0.72 + col * 0.13,
          0.065,
          -0.26 + row * 0.14,
        ),
      );
  keys.castShadow = true;
  laptop.add(keys);
  box(laptop, 0.6, 0.008, 0.3, material(0x68706e, 0.7, 0.4), 0, 0.053, 0.52);
  const lid = new THREE.Group();
  lid.position.set(0, 0.05, -0.51);
  lid.rotation.x = -0.17;
  laptop.add(lid);
  box(lid, 2, 1.3, 0.085, black, 0, 0.65, 0);
  const screenMat = new THREE.MeshBasicMaterial({
    map: print(["Заявки", "Ученики", "Группы"], "#f4f5ee", "#242525", 56),
    toneMapped: false,
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.85, 1.13), screenMat);
  screen.position.set(0, 0.66, 0.045);
  lid.add(screen);
  let disposed = false,
    visible = true,
    selected = initial,
    frame = 0,
    end = 0,
    tilt = 0,
    tiltX = 0,
    hovered = -1,
    burstAt = -2000,
    burstIndex = initial,
    lastTime = performance.now();
  new THREE.TextureLoader().load(
    "/media/projects/edcrm-result.webp",
    (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      textures.push(texture);
      screenMat.map = texture;
      screenMat.needsUpdate = true;
      draw();
    },
    undefined,
    () => {
      /* Keep the locally generated readable screen. */
    },
  );
  const folder = new THREE.Group();
  folder.position.set(0.1, 0.04, 0.05);
  folder.rotation.y = -0.22;
  stage.add(folder);
  box(folder, 1.75, 0.08, 2.05, cherry, 0, 0, 0);
  for (let i = 0; i < 4; i++)
    box(folder, 1.6, 0.014, 1.92, paper, 0.02, 0.055 + i * 0.018, 0);
  const sheet = new THREE.Mesh(
    new THREE.PlaneGeometry(1.47, 1.79),
    new THREE.MeshStandardMaterial({
      map: print(
        ["Моя задача", "", "Данные", "Результат", "Проверка"],
        "#f4f5ee",
        "#242525",
        40,
      ),
      roughness: 1,
    }),
  );
  sheet.rotation.x = -Math.PI / 2;
  sheet.position.set(0.02, 0.12, 0);
  folder.add(sheet);
  const hinge = new THREE.Group();
  hinge.position.set(-0.87, 0.15, 0);
  folder.add(hinge);
  box(hinge, 1.75, 0.06, 2.05, cherry, 0.875, 0, 0);
  const title = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.8),
    new THREE.MeshStandardMaterial({
      map: print(["Практика", "ИИ"], "#8d2034", "#f4f5ee", 78),
      roughness: 0.65,
    }),
  );
  title.rotation.x = -Math.PI / 2;
  title.position.set(0.875, 0.032, 0);
  hinge.add(title);
  box(folder, 0.045, 0.24, 2.05, cherry, -0.85, 0.07, 0);
  const mic = new THREE.Group();
  mic.position.set(2.6, 0.02, 0);
  stage.add(mic);
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.43, 0.46, 0.09, 48),
    black,
  );
  base.position.y = 0.03;
  base.castShadow = true;
  mic.add(base);
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.045, 1.3, 16),
    silver,
  );
  stem.position.y = 0.69;
  stem.castShadow = true;
  mic.add(stem);
  const head = new THREE.Group();
  head.position.set(0, 1.42, 0);
  head.rotation.z = -0.23;
  mic.add(head);
  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.09, 0.65, 24),
    black,
  );
  head.add(handle);
  handle.castShadow = true;
  const grille = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 32, 24),
    material(0xb4b9b6, 0.85, 0.45),
  );
  grille.scale.y = 1.3;
  grille.position.y = 0.43;
  grille.castShadow = true;
  head.add(grille);
  for (let i = 0; i < 7; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(
        0.215 * Math.sin(((i + 1) / 8) * Math.PI),
        0.008,
        6,
        32,
      ),
      black,
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.43 + (i - 3) * 0.067;
    head.add(ring);
  }
  const cable = new THREE.CatmullRomCurve3([
    new THREE.Vector3(2.6, 0.02, 0),
    new THREE.Vector3(3, 0.01, 0.6),
    new THREE.Vector3(2.1, 0.01, 1),
    new THREE.Vector3(1.3, 0.01, 0.8),
    new THREE.Vector3(1.1, 0.01, 1.4),
  ]);
  const cord = new THREE.Mesh(
    new THREE.TubeGeometry(cable, 40, 0.017, 8, false),
    black,
  );
  stage.add(cord);
  const objects = [laptop, folder, mic];
  // Each object owns its emissive response; shared metal must not light all three.
  const originalMaterials = new Set<THREE.Material>();
  const objectMaterials = objects.map((object, index) => {
    object.userData.workroomIndex = index;
    const copies = new Map<THREE.Material, THREE.MeshStandardMaterial>();
    object.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        const original = child.material;
        originalMaterials.add(original);
        let copy = copies.get(original);
        if (!copy) {
          copy = original.clone();
          copy.emissive.set(0xe9a5b2);
          copies.set(original, copy);
        }
        child.material = copy;
      }
    });
    return [...copies.values()];
  });
  const raycaster = new THREE.Raycaster();
  const pointerPosition = new THREE.Vector2();
  // A soft pool of light belongs to the desk, not to a full-screen postprocessing pass.
  const glowCanvas = document.createElement("canvas");
  glowCanvas.width = glowCanvas.height = 128;
  const gc = glowCanvas.getContext("2d")!;
  const gradient = gc.createRadialGradient(64, 64, 4, 64, 64, 64);
  gradient.addColorStop(0, "rgba(233,165,178,.85)");
  gradient.addColorStop(0.4, "rgba(141,32,52,.3)");
  gradient.addColorStop(1, "rgba(141,32,52,0)");
  gc.fillStyle = gradient;
  gc.fillRect(0, 0, 128, 128);
  const glowTexture = new THREE.CanvasTexture(glowCanvas);
  textures.push(glowTexture);
  const pools = objects.map((object) => {
    const pool = new THREE.Mesh(
      new THREE.PlaneGeometry(3.1, 2.7),
      new THREE.MeshBasicMaterial({
        map: glowTexture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        toneMapped: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    pool.rotation.x = -Math.PI / 2;
    pool.position.set(object.position.x, -0.035, object.position.z);
    stage.add(pool);
    return pool;
  });
  const accentLight = new THREE.PointLight(0xffb6c4, 0, 5, 2);
  stage.add(accentLight);
  // One small, finite particle response on selection. No idle particle field.
  const count = 32;
  const particlePositions = new Float32Array(count * 3);
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3),
  );
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xf2c3cd,
    size: 0.038,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    toneMapped: false,
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  particles.frustumCulled = false;
  stage.add(particles);
  function pick(event: PointerEvent | MouseEvent) {
    const bounds = host.getBoundingClientRect();
    pointerPosition.set(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      (-(event.clientY - bounds.top) / bounds.height) * 2 + 1,
    );
    scene.updateMatrixWorld(true);
    raycaster.setFromCamera(pointerPosition, camera);
    const hit = raycaster.intersectObjects(objects, true)[0];
    let object: THREE.Object3D | undefined = hit?.object;
    while (object && object.userData.workroomIndex === undefined)
      object = object.parent ?? undefined;
    return object?.userData.workroomIndex ?? -1;
  }
  function hover(index: number) {
    if (hovered === index) return;
    hovered = index;
    host.style.cursor = index < 0 ? "default" : "pointer";
    events.onHover(index);
    animate();
  }
  function draw() {
    if (!disposed && visible && !document.hidden)
      renderer.render(scene, camera);
  }
  function tick(time: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const delta = Math.max(1, time - lastTime);
    lastTime = time;
    const amount = reduced || time >= end ? 1 : 1 - Math.exp(-delta / 80);
    objects.forEach((object, i) => {
      const hot = i === hovered;
      const scale =
        (i === selected ? 1.12 : 0.9) + (hot && !reduced ? 0.055 : 0);
      object.scale.setScalar(
        object.scale.x + (scale - object.scale.x) * amount,
      );
      object.position.y +=
        ((i === selected ? 0.16 : 0.01) +
          (hot && !reduced ? 0.16 : 0) -
          object.position.y) *
        amount;
      objectMaterials[i].forEach((mat) => {
        mat.emissiveIntensity +=
          ((hot ? 0.2 : 0) - mat.emissiveIntensity) * amount;
      });
      pools[i].material.opacity +=
        ((hot ? 0.9 : i === selected ? 0.28 : 0) - pools[i].material.opacity) *
        amount;
    });
    hinge.rotation.z +=
      ((selected === 1 ? 1.12 : hovered === 1 && !reduced ? 0.55 : 0.06) -
        hinge.rotation.z) *
      amount;
    lid.rotation.x +=
      ((hovered === 0 && !reduced ? -0.32 : -0.17) - lid.rotation.x) * amount;
    head.rotation.z +=
      ((hovered === 2 && !reduced ? -0.42 : -0.23) - head.rotation.z) * amount;
    stage.rotation.y += (tilt - stage.rotation.y) * amount;
    stage.rotation.x += (tiltX - stage.rotation.x) * amount;
    accentLight.intensity +=
      ((hovered >= 0 ? 3.5 : 0) - accentLight.intensity) * amount;
    if (hovered >= 0)
      accentLight.position.set(objects[hovered].position.x, 1.8, 1.3);
    const age = (time - burstAt) / 850;
    particleMaterial.opacity =
      !reduced && age >= 0 && age < 1 ? (1 - age) * 0.8 : 0;
    if (particleMaterial.opacity > 0) {
      const origin = objects[burstIndex].position;
      for (let i = 0; i < count; i++) {
        const angle = i * 2.399963;
        const spread = 0.25 + age * (0.6 + (i % 5) * 0.1);
        particlePositions[i * 3] = origin.x + Math.cos(angle) * spread;
        particlePositions[i * 3 + 1] = 0.15 + age * (0.6 + (i % 7) * 0.15);
        particlePositions[i * 3 + 2] =
          origin.z + Math.sin(angle) * spread * 0.75;
      }
      particleGeometry.attributes.position.needsUpdate = true;
    }
    draw();
    if (!reduced && time < end) frame = requestAnimationFrame(tick);
  }
  function animate() {
    end = performance.now() + 900;
    if (!frame) frame = requestAnimationFrame(tick);
  }
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height || disposed) return;
    renderer.setSize(width, height);
    const aspect = width / height,
      half = Math.max(2.35, 4.5 / aspect);
    camera.left = -half * aspect;
    camera.right = half * aspect;
    camera.top = half;
    camera.bottom = -half;
    camera.updateProjectionMatrix();
    draw();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const fine = matchMedia("(hover:hover) and (pointer:fine)");
  function pointer(e: PointerEvent) {
    if (!fine.matches || e.pointerType === "touch") return;
    hover(pick(e));
    if (reduced) return;
    tilt =
      ((e.clientX - host.getBoundingClientRect().left) / host.clientWidth -
        0.5) *
      0.22;
    tiltX =
      ((e.clientY - host.getBoundingClientRect().top) / host.clientHeight -
        0.5) *
      0.045;
    animate();
  }
  function leave() {
    tilt = 0;
    tiltX = 0;
    hover(-1);
    animate();
  }
  let down: { x: number; y: number; index: number } | null = null;
  function pointerDown(e: PointerEvent) {
    if (e.button !== 0) return;
    down = { x: e.clientX, y: e.clientY, index: pick(e) };
  }
  function pointerCancel() {
    down = null;
  }
  function click(e: MouseEvent) {
    const index = pick(e);
    if (
      !down ||
      Math.hypot(e.clientX - down.x, e.clientY - down.y) > 8 ||
      index < 0 ||
      index !== down.index
    ) {
      down = null;
      return;
    }
    down = null;
    selected = index;
    if (!reduced) {
      burstAt = performance.now();
      burstIndex = index;
    }
    events.onSelect(index);
    animate();
  }
  function visibility() {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else animate();
  }
  host.addEventListener("pointermove", pointer);
  host.addEventListener("pointerleave", leave);
  host.addEventListener("pointerdown", pointerDown);
  host.addEventListener("pointercancel", pointerCancel);
  host.addEventListener("click", click);
  document.addEventListener("visibilitychange", visibility);
  objects.forEach((object, index) => {
    object.scale.setScalar(index === selected ? 1.12 : 0.9);
    object.position.y = index === selected ? 0.16 : 0.01;
    pools[index].material.opacity = index === selected ? 0.28 : 0;
  });
  hinge.rotation.z = selected === 1 ? 1.12 : 0.06;
  resize();
  animate();
  return {
    motion(value) {
      reduced = value;
      if (value) {
        tilt = 0;
        tiltX = 0;
      }
      animate();
    },
    select(index) {
      if (index !== selected && !reduced) {
        burstAt = performance.now();
        burstIndex = index;
      }
      selected = index;
      animate();
    },
    visible(value) {
      visible = value;
      if (value) {
        resize();
        animate();
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      ro.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      host.removeEventListener("pointermove", pointer);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointerdown", pointerDown);
      host.removeEventListener("pointercancel", pointerCancel);
      host.removeEventListener("click", click);
      host.style.cursor = "";
      particleGeometry.dispose();
      particleMaterial.dispose();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          (Array.isArray(object.material)
            ? object.material
            : [object.material]
          ).forEach((m) => materials.add(m));
        }
      });
      materials.forEach((m) => m.dispose());
      originalMaterials.forEach((m) => {
        if (!materials.has(m)) m.dispose();
      });
      textures.forEach((t) => t.dispose());
      key.shadow.map?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
