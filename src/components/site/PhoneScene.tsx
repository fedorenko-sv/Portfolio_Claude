"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { acceptsShowcaseMessage } from "@/lib/showcase-protocol";

// A geometric model, rendered on demand. The image is the actual menu capture;
// interaction launches the independently controlled live application viewer.
export default function PhoneScene({
  interactive = false,
}: {
  interactive?: boolean;
}) {
  const active = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const [liveReady, setLiveReady] = useState(false);
  const activate = useRef<(on: boolean) => void>(() => {});
  const button = useRef<HTMLButtonElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!expanded) return;
    function keepFocus(event: FocusEvent) {
      if (!host.current?.parentElement?.contains(event.target as Node))
        button.current?.focus();
    }
    document.addEventListener("focusin", keepFocus);
    return () => document.removeEventListener("focusin", keepFocus);
  }, [expanded]);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    let dispose = () => {};
    async function setup() {
      const THREE = await import("three");
      const { CSS3DRenderer, CSS3DObject } =
        await import("three/addons/renderers/CSS3DRenderer.js");
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
      renderer.shadowMap.type = THREE.PCFShadowMap;
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
      const environmentMap = pmrem.fromScene(environment, 0.04, 0.1, 100, {
        size: 64,
      });
      scene.environment = environmentMap.texture;
      scene.environmentIntensity = 0.6;
      environment.dispose();
      pmrem.dispose();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 1.6, 14.4);
      camera.lookAt(0, 0.45, 0);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x343038, 1.05));
      const key = new THREE.DirectionalLight(0xffffff, 2.4);
      key.position.set(-4, 7, 8);
      key.castShadow = true;
      key.shadow.mapSize.set(512, 512);
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
      phone.rotation.set(0.04, -0.17, 0.14);
      phone.position.set(0.35, 0.55, 0.7);
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
        "/images/restaurant-menu-v2.png",
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
        color: 0x420b1b,
        roughness: 0.75,
      });
      const plinths: InstanceType<typeof THREE.Mesh>[] = [];
      for (const [w, h, x, y, z] of [
        [9.5, 0.45, -0.4, -3.65, -0.8],
        [2.5, 0.7, -3.5, -3.5, -2.8],
      ]) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(w, h, 3.5), cherry);
        step.position.set(x, y, z);
        step.castShadow = true;
        step.receiveShadow = true;
        group.add(step);
        plinths.push(step);
      }
      const htmlRenderer = new CSS3DRenderer();
      htmlRenderer.domElement.className = "phone-screen-layer";
      element.appendChild(htmlRenderer.domElement);
      const htmlScene = new THREE.Scene();
      const surface = document.createElement("div");
      surface.style.width = "390px";
      surface.style.height = "775px";
      surface.style.borderRadius = "46px";
      surface.style.overflow = "hidden";
      const iframe = document.createElement("iframe");
      function receive(event: MessageEvent) {
        if (
          acceptsShowcaseMessage(
            event,
            iframe.contentWindow,
            window.location.origin,
          )
        )
          setLiveReady(true);
      }
      window.addEventListener("message", receive);
      iframe.title = "Интерактивное меню для ресторана";
      iframe.setAttribute("allow", "fullscreen");
      const screenObject = new CSS3DObject(surface);
      const htmlPhone = new THREE.Group();
      htmlPhone.add(screenObject);
      htmlScene.add(htmlPhone);
      screenObject.position.z = 0.27;
      screenObject.scale.setScalar(2.48 / 390);
      screenObject.visible = false;
      let previousOverflow = "";
      activate.current = (on) => {
        active.current = on;
        plinths.forEach((step) => {
          step.visible = !on;
        });
        if (on) {
          previousOverflow = document.body.style.overflow;
          document.body.style.overflow = "hidden";
          if (!iframe.src) {
            iframe.src = "/showcase/menu/index.html";
            surface.appendChild(iframe);
          }
          phone.rotation.set(0, 0, 0);
          phone.position.set(0, 0.55, 0.7);
        } else {
          document.body.style.overflow = previousOverflow;
          phone.rotation.set(0.04, -0.17, 0.14);
          phone.position.set(0.35, 0.55, 0.7);
        }
        screen.visible = !on;
        screenObject.visible = on;
        htmlRenderer.domElement.style.visibility = on ? "visible" : "hidden";
        resize();
      };
      function render() {
        renderer.render(scene, camera);
        htmlPhone.position.copy(phone.position);
        htmlPhone.quaternion.copy(phone.quaternion);
        htmlPhone.scale.copy(phone.scale);
        htmlRenderer.render(htmlScene, camera);
      }
      function resize() {
        if (!element) return;
        const { width, height } = element.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        htmlRenderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        render();
      }
      const observer = new ResizeObserver(resize);
      observer.observe(element);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      let targetX = 0.04,
        targetY = -0.17;
      let hovering = false,
        visible = true,
        animation = 0;
      function animate(time: number) {
        animation = 0;
        if (cancelled || !visible || reduced.matches) return;
        if (!active.current) {
          const idle = hovering ? 0 : Math.sin(time * 0.00065) * 0.22;
          phone.rotation.y += (targetY + idle - phone.rotation.y) * 0.075;
          phone.rotation.x += (targetX - phone.rotation.x) * 0.075;
          phone.position.y = 0.55 + Math.sin(time * 0.001) * 0.08;
          render();
        }
        animation = requestAnimationFrame(animate);
      }
      function start() {
        if (!animation && visible && !reduced.matches)
          animation = requestAnimationFrame(animate);
      }
      const visibility = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else {
          cancelAnimationFrame(animation);
          animation = 0;
        }
      });
      visibility.observe(element);
      function move(event: PointerEvent) {
        if (active.current || reduced.matches || event.pointerType === "touch")
          return;
        hovering = true;
        const rect = element!.getBoundingClientRect();
        targetY =
          -0.17 + ((event.clientX - rect.left) / rect.width - 0.5) * 1.65;
        targetX = 0.04 + ((event.clientY - rect.top) / rect.height - 0.5) * 0.3;
        start();
      }
      function reset() {
        hovering = false;
        targetY = -0.17;
        targetX = 0.04;
      }
      function motionChanged() {
        cancelAnimationFrame(animation);
        animation = 0;
        if (reduced.matches && !active.current) {
          phone.rotation.set(0.04, -0.17, 0.14);
          phone.position.y = 0.55;
          render();
        } else start();
      }
      reduced.addEventListener("change", motionChanged);
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", reset);
      start();
      resize();
      dispose = () => {
        observer.disconnect();
        visibility.disconnect();
        cancelAnimationFrame(animation);
        reduced.removeEventListener("change", motionChanged);
        if (active.current) document.body.style.overflow = previousOverflow;
        htmlRenderer.domElement.remove();
        window.removeEventListener("message", receive);
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
      className={`phone-stage ${expanded ? "is-active" : ""}`}
      role={expanded ? "dialog" : undefined}
      aria-modal={expanded || undefined}
      aria-label={expanded ? "Ресторанное меню" : undefined}
      onKeyDown={(e) => {
        if (e.key === "Escape" && expanded) {
          setExpanded(false);
          activate.current(false);
          button.current?.focus();
        }
      }}
    >
      <div
        ref={host}
        className={`phone-scene ${ready ? "scene-ready" : ""}`}
        role={expanded ? "group" : "img"}
        aria-label="Объёмный телефон с ресторанным меню"
      >
        {!ready && (
          <Image
            className="phone-fallback"
            src="/images/restaurant-menu-v2.png"
            width={390}
            height={775}
            alt="Экран интерактивного меню ресторана"
            priority
          />
        )}
      </div>
      {interactive && (
        <button
          ref={button}
          type="button"
          className="phone-control"
          disabled={!ready}
          aria-expanded={expanded}
          onClick={() => {
            const on = !expanded;
            setExpanded(on);
            activate.current(on);
            if (!on) button.current?.focus();
          }}
        >
          {expanded ? "Закрыть меню" : "Управлять меню"}
        </button>
      )}
      {expanded && !liveReady && (
        <p className="phone-loading" role="status">
          Открываем меню…
        </p>
      )}
    </div>
  );
}
