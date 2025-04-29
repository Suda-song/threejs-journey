import * as THREE from 'three';
import gsap from 'gsap';

/**
 * cursor
 */
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

const canvas = document.querySelector('canvas.webgl');
/*Scene*/
const scene = new THREE.Scene();

/*Geometry*/
// const group = new THREE.Group();
// scene.add(group);
// const cubel = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
// );
// cubel.position.x = -2;
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

// const cubel2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0x0000ff }),
// );
// cubel2.position.x = 2;

// group.add(cubel);
// group.add(mesh);
// group.add(cubel2);
// group.position.y = 1;

// mesh.position.set(1, 2, 1); //设置位置
scene.add(mesh);

/*scale*/
// mesh.scale.set(2, 0.5, 1);

/*rotation pi转圈,先重排列再旋转*/
// mesh.rotation.reorder('YXZ');
// mesh.rotation.y = Math.PI * 0.25;
// mesh.rotation.x = Math.PI * 0.25;

/*Axes helper*/
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

/*camera 透视摄影机：视野范围和焦距*/
const sizes = {
  width: 800,
  height: 600,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100); //75度视野范围，宽高比,近景，远景
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100); //左右上下，近景，远景
camera.position.z = 2; //x轴正方向为右，前后是z轴，z正数靠近自己，z负数远离自己,y往上
// camera.position.x = 2;
// camera.position.y = 2;
camera.lookAt(mesh.position);
scene.add(camera);

// camera.lookAt(new THREE.Vector3(1, 1, 1));
// camera.lookAt(mesh.position);

console.log(mesh.position.distanceTo(camera.position));

/*renderer*/
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// renderer.render(scene, camera);

/*Animations*/
// let time = Date.now();
// gsap.to(mesh.position, { duration: 1, x: 2, delay: 1 });
const clock = new THREE.Clock(); //秒
const tick = () => {
  //update camera 鼠标事件中y轴向下
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  camera.position.y = cursor.y * 5;
  camera.lookAt(mesh.position);
  //time,多久刷新一次
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;
  // console.log(deltaTime);

  const elapsedTime = clock.getElapsedTime(); //始终创建以来的总时间，从0开始

  //updata object
  // mesh.rotation.y = elapsedTime;
  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.rotation.x += 0.001 * deltaTime;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick); //传递函数，并不是执行函数
};
tick();
