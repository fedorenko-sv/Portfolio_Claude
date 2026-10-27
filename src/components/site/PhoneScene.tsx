"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// A geometric model, rendered on demand. The image is the actual menu capture;
// interaction launches the independently controlled live application viewer.
export default function PhoneScene() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    let dispose = () => {};
    async function setup() {
      const THREE = await import("three");
      if (cancelled || !element) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.domElement.setAttribute("aria-hidden", "true");
      element.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const { RoomEnvironment } =
        await import("three/addons/environments/RoomEnvironment.js");
      if (cancelled) {
        renderer.dispose();
        renderer.domElement.remove();
        return;
      }
      const environment = new RoomEnvironment();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environmentMap = pmrem.fromScene(environment, 0.04);
      scene.environment = environmentMap.texture;
      scene.environmentIntensity = 0.6;
      environment.dispose();
      pmrem.dispose();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 1.6, 12.9);
      camera.lookAt(0, 0.45, 0);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x343038, 1.8));
      const key = new THREE.DirectionalLight(0xffffff, 5);
      key.position.set(-4, 7, 8);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.left = -6;
      key.shadow.camera.right = 6;
      key.shadow.camera.top = 6;
      key.shadow.camera.bottom = -5;
      key.shadow.normalBias = 0.02;
      key.shadow.bias = -0.0002;
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xe9a5b2, 2.3);
      rim.position.set(5, 3, -2);
      scene.add(rim);
      const group = new THREE.Group();
      scene.add(group);
      const phone = new THREE.Group();
      phone.rotation.set(-0.04, -0.28, 0.14);
      phone.position.set(0.25, 0.55, 0.7);
      phone.scale.setScalar(1.23);
      group.add(phone);
      function shape(w: number, h: number, r: number) {
        const s = new THREE.Shape();
        const x = -w / 2,
          y = -h / 2;
        s.moveTo(x + r, y);
        s.lineTo(x + w - r, y);
        s.quadraticCurveTo(x + w, y, x + w, y + r);
        s.lineTo(x + w, y + h - r);
        s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        s.lineTo(x + r, y + h);
        s.quadraticCurveTo(x, y + h, x, y + h - r);
        s.lineTo(x, y + r);
        s.quadraticCurveTo(x, y, x + r, y);
        return s;
      }
      const geometry = new THREE.ExtrudeGeometry(shape(2.73, 5.25, 0.42), {
        depth: 0.18,
        bevelEnabled: true,
        bevelSize: 0.075,
        bevelThickness: 0.07,
        bevelSegments: 5,
        steps: 1,
        curveSegments: 16,
      });
      const metal = new THREE.MeshStandardMaterial({
        color: 0x76767a,
        metalness: 0.9,
        roughness: 0.24,
      });
      const body = new THREE.Mesh(geometry, metal);
      body.castShadow = true;
      phone.add(body);
      const glassGeometry = new THREE.ShapeGeometry(shape(2.67, 5.19, 0.4), 24);
      const glass = new THREE.Mesh(
        glassGeometry,
        new THREE.MeshStandardMaterial({
          color: 0x08090a,
          metalness: 0.4,
          roughness: 0.18,
        }),
      );
      glass.position.z = 0.258;
      phone.add(glass);
      const texture = new THREE.TextureLoader().load(
        "/images/restaurant-menu.jpg",
        () => {
          if (!cancelled) {
            render();
            setReady(true);
          }
        },
      );
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(
        renderer.capabilities.getMaxAnisotropy(),
        4,
      );
      const screenGeometry = new THREE.ShapeGeometry(
        shape(2.48, 4.93, 0.31),
        24,
      );
      const positions = screenGeometry.attributes.position;
      const uv = screenGeometry.attributes.uv;
      for (let i = 0; i < positions.count; i++)
        uv.setXY(
          i,
          (positions.getX(i) + 1.24) / 2.48,
          (positions.getY(i) + 2.465) / 4.93,
        );
      const screen = new THREE.Mesh(
        screenGeometry,
        new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }),
      );
      screen.position.z = 0.265;
      phone.add(screen);
      const lens = new THREE.Mesh(
        new THREE.ShapeGeometry(shape(0.7, 0.16, 0.08)),
        new THREE.MeshBasicMaterial({ color: 0x0b0b0c }),
      );
      lens.position.set(0, 2.3, 0.28);
      phone.add(lens);
      for (const [y, h] of [
        [0.8, 0.55],
        [1.55, 0.28],
        [-0.05, 0.55],
      ]) {
        const button = new THREE.Mesh(
          new THREE.BoxGeometry(0.07, h, 0.13),
          metal,
        );
        button.position.set(-1.43, y, 0.1);
        phone.add(button);
      }
      const cherry = new THREE.MeshStandardMaterial({
        color: 0x651426,
        roughness: 0.75,
      });
      for (const [w, h, x, y, z] of [
        [9.5, 0.7, -0.4, -3.1, 0],
        [3.5, 0.95, -2.4, -2.3, -0.5],
      ]) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(w, h, 3.5), cherry);
        step.position.set(x, y, z);
        step.castShadow = true;
        step.receiveShadow = true;
        group.add(step);
      }
      function render() {
        renderer.render(scene, camera);
      }
      function resize() {
        if (!element) return;
        const { width, height } = element.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        render();
      }
      const observer = new ResizeObserver(resize);
      observer.observe(element);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      function move(event: PointerEvent) {
        if (reduced.matches || event.pointerType === "touch") return;
        const rect = element!.getBoundingClientRect();
        phone.rotation.y =
          -0.28 + ((event.clientX - rect.left) / rect.width - 0.5) * 0.13;
        render();
      }
      function reset() {
        phone.rotation.y = -0.28;
        render();
      }
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", reset);
      resize();
      dispose = () => {
        observer.disconnect();
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", reset);
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material)
              ? object.material
              : [object.material];
            materials.forEach((material) => material.dispose());
          }
        });
        texture.dispose();
        environmentMap.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }
    void setup();
    return () => {
      cancelled = true;
      dispose();
    };
  }, []);
  return (
    <div
      ref={host}
      className={`phone-scene ${ready ? "scene-ready" : ""}`}
      role="img"
      aria-label="Объёмный телефон с настоящим экраном ресторанного меню"
    >
      {!ready && (
        <Image
          className="phone-fallback"
          src="/images/restaurant-menu.jpg"
          width={448}
          height={720}
          alt="Экран интерактивного меню ресторана"
          priority
        />
      )}
    </div>
  );
}
