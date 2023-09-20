import './style.css'

import * as THREE from 'three';

// Allows us to move around the scene with our mouse
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

// When starting this type of project, you'll always need:
/*
1. Scene - this is like a containter that holds all the objects, cameras, and lights 

2. Camera
- 1st arg is FOV.
- 2nd arg is Aspect Ratio (based off the users browsers window)
- 3rd & 4th arg is ViewFrustrum which controls which objects are visible relative to the camera itself

3. Renderer - makes the "magic" happen
*/

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
// render == DRAW
renderer.render(scene, camera);

// Adding Objects to the screen

// Geometry: the {x,y,z} points that makeup a shape
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
// Material: the wrapping paper for an object
const material = new THREE.MeshNormalMaterial( { color: 0xFF6347} );
// Mesh: geometry + material
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)
//                                    hexadecimal literal
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25,75, 7)

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper);

// Here, I am adding the OrbitControl
const controls = new OrbitControls(camera, renderer.domElement);

// We want to randomly generate stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff} );
  const star = new THREE.Mesh(geometry, material);

  //Randomly generate an x,y,z position value for each star
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

  // Here, we set the stars positions
  star.position.set(x,y,z);
  // Add the stars to the scene
  scene.add(star);
}
// Randomly place 200 stars using a forEach loop
Array(200).fill().forEach(addStar);

// Going to add some texture from a JPG image using the texture loader
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Moon

// Texture for the moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');


const moon = new THREE.Mesh (
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture
  })
);
scene.add(moon)

// reposition the moon to be further down since we'll be scrolling that direction
// moon.position.z = 30;
// moon.position.setX(-10);

// function moveCamera() {

//   // calculate where the user is scrolled to
//   const t = document.body.getBoundingClientRect().top;
//   moon.rotation.x += 0.05;
//   moon.rotation.y += 0.075;
//   moon.rotation.z += 0.05;

//   camera.position.z = t * -0.01;
//   camera.position.x = t * -0.0002;
//   camera.position.y = t * -0.0002;

// }
// document.body.onscroll = moveCamera
// moveCamera();


// Don't want to have to call the renderer method over and over again so we set up a recursive function that gives an infinite loop that calls the method automatically
function animate() {
  requestAnimationFrame (animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update

  renderer.render(scene, camera);
}
animate()


