// Imports:
import '../styles/style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Varibles
const clock = new THREE.Clock();

// Setting up scene
// Scene
const scene = new THREE.Scene();

// Setting up camera
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
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

// Move camera on scroll
let lastT = 0;
function MoveCamera() {
    const t = document.body.getBoundingClientRect().top;
    
    // On scroll move the camera arround the scene
    camera.position.x += (t - lastT) * 0.1;
    camera.position.z += (t - lastT) * 0.1 ;

    lastT = t;
}
document.body.onscroll = MoveCamera;

// Mouse
document.addEventListener('mousemove', animateParticles)
let mouseX = 0;
let mouseY = 0;
function animateParticles(event) {
    mouseX = (event.clientX - window.innerWidth / 2) / 2;
    mouseY = (event.clientY - window.innerHeight / 2) / 2;
}

// Instantiate 200 circles with random positions
let circles = [];
const stars = function() {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 1000; i++) {
        const sphere = new THREE.Mesh(geometry, material);

        sphere.position.x = Math.random() * 500 - 250;
        sphere.position.y = Math.random() * 500 - 250;
        sphere.position.z = Math.random() * 500 - 250;

        circles.push(sphere);

        scene.add(sphere);
    }
}

function MoveStars() {
    // Get time between frames
    const delta = clock.getDelta();
    // Move the stars to a randomm direction
    // for (let i = 0; i < circles.length; i++) {
    //     circles[i].position.x += (Math.random() * .1) * (Math.round(Math.random()) ? 1 : -1);
    //     circles[i].position.y += (Math.random() * .1) * (Math.round(Math.random()) ? 1 : -1);
    //     circles[i].position.z += (Math.random() * .1) * (Math.round(Math.random()) ? 1 : -1);
    // }

    // If the stars are out of the scene, move them back to a random position inside the scene
    for (let i = 0; i < circles.length; i++) {
        if (circles[i].position.x > 250 || circles[i].position.x < -250) {
            circles[i].position.x = Math.random() * 500 - 250;
        }
        if (circles[i].position.y > 250 || circles[i].position.y < -250) {
            circles[i].position.y = Math.random() * 500 - 250;
        }
        if (circles[i].position.z > 250 || circles[i].position.z < -250) {
            circles[i].position.z = Math.random() * 500 - 250;
        }
    }

    
    for (let i = 0; i < circles.length; i++) {
        // circles[i].position.x += 0.;
        // circles[i].position.y += 0.;
        circles[i].position.z += 5 * delta;
    }
}

// Objects
const torusGeo = new THREE.TorusBufferGeometry(10, 3, 16, 100); // Creating geometry
const torusMat = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true }); // Creating material
// const torusMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.005 }); // Creating material
const torus = new THREE.Mesh(torusGeo, torusMat); // Creating mesh
// const torus = new THREE.Points(torusGeo, torusMat); // Creating mesh

function RotateTorus() {
    const delta = clock.getDelta();
    // Rotating the torus
    torus.rotation.x += 0.005;
    torus.rotation.y += 0.005;
    // torus.rotation.z += 100;
}

const particlesGeo = new THREE.BufferGeometry();
const particlesMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.005 });

const particleCount = 5000;
const posArray = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
    posArray[i] = Math.random() * 500 - 250;
}

particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMesh = new THREE.Points(particlesGeo, particlesMat);

let lastMouseX = 0;
function MoveParticles() {
    const delta = clock.getElapsedTime();

    // If mouseX is not moving move the particles
    
    particlesMesh.rotation.y = -.1 * delta;
    if (mouseX != 0) {
    particlesMesh.rotation.x = -(mouseY * 0.001);
    particlesMesh.rotation.y = (mouseX * 0.001);
    }
    
    lastMouseX = mouseX;
}

scene.add(torus); // Adding mesh to scene
scene.add(particlesMesh);

function OnStart() {
    //stars();
}

function OnUpdate() {
    //MoveStars();
    RotateTorus();
    MoveParticles();
}

// UNITY LIKE FUNCTIONS
let start = true;

function Start() {
    OnStart();

    renderer.render(scene, camera);
}

let updates = 0;
function Update() {
    requestAnimationFrame(Update);
    
    OnUpdate();
    
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
