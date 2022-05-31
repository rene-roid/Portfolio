// Imports:
import '../styles/style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Setting up scene
// Scene
const scene = new THREE.Scene();

// Camera values: fov, aspect, near, far
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

// Detect when the width or height of the window changes
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Ambient light: color, intensity
const ambientLight = new THREE.AmbientLight(0xffffff, .5);
scene.add(ambientLight);

// Helpers
// Grid helper: size, step, color
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

// Move camera on scroll
function MoveCamera() {
    const t = document.body.getBoundingClientRect().top;

    camera.position.z = t * -0.1;
    camera.position.x = t * -0.01;
    camera.position.y = t * -0.1;
}
document.body.onscroll = MoveCamera;

// Objects
const geometry = new THREE.TorusBufferGeometry(10, 3, 16, 100); // Creating geometry
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true }); // Creating material
const torus = new THREE.Mesh(geometry, material); // Creating mesh

scene.add(torus); // Adding mesh to scene


function OnUpdate() {

    // Rotating the torus
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
}

// UNITY LIKE FUNCTIONS
let start = true;

function Start() {
    requestAnimationFrame(Start);
    renderer.render(scene, camera);
}

let updates = 0;
function Update() {
    requestAnimationFrame(Update);
    
    OnUpdate();
    
    //console.log(`Update: ${updates++}`);
    renderer.render(scene, camera);
}

if (start) {
    Start();
    start = false;
    console.log('Started');
}
if (!start) {
    Update();
}
