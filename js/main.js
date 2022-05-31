// Imports:
import '../styles/style.css'
import * as THREE from 'three'


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