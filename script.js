import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
  antialias:true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene,camera);



// Geometry

const geometry = new THREE.IcosahedronGeometry(10,1);

const material = new THREE.MeshStandardMaterial({
  color:0x00ffff,
  wireframe:true
});

const sphere = new THREE.Mesh(geometry,material);

scene.add(sphere);



// Lights

const pointLight = new THREE.PointLight(0xffffff,2);

pointLight.position.set(20,20,20);

scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff,0.5);

scene.add(ambientLight);



// Stars

function addStar(){

  const geometry = new THREE.SphereGeometry(0.25,24,24);

  const material = new THREE.MeshStandardMaterial({
    color:0xffffff
  });

  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3)
    .fill()
    .map(()=>THREE.MathUtils.randFloatSpread(200));

  star.position.set(x,y,z);

  scene.add(star);
}

Array(500).fill().forEach(addStar);



// Mouse movement

document.addEventListener('mousemove',(event)=>{

  const mouseX = (event.clientX/window.innerWidth)*2-1;
  const mouseY = -(event.clientY/window.innerHeight)*2+1;

  sphere.rotation.y = mouseX;
  sphere.rotation.x = mouseY;

});



// Scroll animation

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;

  camera.position.z = 30 + t * -0.01;

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
}

document.body.onscroll = moveCamera;



// Animation loop

function animate(){

  requestAnimationFrame(animate);

  sphere.rotation.x += 0.002;
  sphere.rotation.y += 0.003;

  renderer.render(scene,camera);
}

animate();



// Resize

window.addEventListener('resize',()=>{

  camera.aspect = window.innerWidth/window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth,window.innerHeight);

});



// Loader

window.addEventListener('load',()=>{

  document.getElementById('loader').style.display='none';

});