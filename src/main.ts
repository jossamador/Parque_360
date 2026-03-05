import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) {
  throw new Error("No se encontro #app en el DOM");
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(0, 0, 0.1);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
app.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

const help = document.createElement("div");
help.className = "vr-help";
help.innerHTML = [
  "Desktop: arrastra para mirar alrededor.",
  "Quest: abre esta pagina y pulsa Enter VR para usar tracking de cabeza."
].join("<br />");
document.body.appendChild(help);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.rotateSpeed = -0.3;
controls.target.set(0, 0, -1);
controls.update();

const panoramaUrl = new URL("../PuenteSalleVR.png", import.meta.url).href;

const textureLoader = new THREE.TextureLoader();
textureLoader.load(
  panoramaUrl,
  (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;

    // Sphere geometry is rendered from the inside using BackSide.
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(500, 60, 40),
      new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide })
    );

    // Flip X so the panorama orientation is natural for equirectangular maps.
    sphere.scale.set(-1, 1, 1);
    scene.add(sphere);
  },
  undefined,
  (err) => {
    console.error("Error al cargar la imagen 360:", err);
  }
);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
