// import { useEffect, useRef, useState } from "react";

// const PINS = [
//   { lat: 51.5, lng: -0.1 },
//   { lat: 52.5, lng: 13.4 },
//   { lat: 48.8, lng: 2.35 },
//   { lat: 40.7, lng: -74.0 },
//   { lat: 34.0, lng: -118.2 },
//   { lat: 35.7, lng: 139.7 },
//   { lat: 31.2, lng: 121.5 },
//   { lat: 1.3, lng: 103.8 },
//   { lat: 19.1, lng: 72.9 },
//   { lat: -33.9, lng: 18.4 },
//   { lat: -23.5, lng: -46.6 },
//   { lat: 25.2, lng: 55.3 },
//   { lat: 37.6, lng: 127.0 },
//   { lat: 55.7, lng: 37.6 },
//   { lat: -37.8, lng: 144.9 },
// ];

// function toVec3(THREE, lat, lng, r) {
//   const phi = (90 - lat) * (Math.PI / 180);
//   const theta = (lng + 180) * (Math.PI / 180);
//   return new THREE.Vector3(
//     -(r * Math.sin(phi) * Math.cos(theta)),
//     r * Math.cos(phi),
//     r * Math.sin(phi) * Math.sin(theta)
//   );
// }

// function buildFallback(THREE) {
//   const c = document.createElement("canvas");
//   c.width = 4096; c.height = 2048;
//   const ctx = c.getContext("2d");
//   const og = ctx.createLinearGradient(0, 0, 0, 2048);
//   og.addColorStop(0, "#0d4f7a"); og.addColorStop(0.25, "#0e5a8a"); og.addColorStop(0.5, "#0c5282");
//   og.addColorStop(0.75, "#0e5a8a"); og.addColorStop(1, "#0d4f7a");
//   ctx.fillStyle = og; ctx.fillRect(0, 0, 4096, 2048);
//   for (let lat = -80; lat <= 80; lat += 10) {
//     const y = ((90 - lat) / 180) * 2048;
//     ctx.strokeStyle = "rgba(80,140,200,0.1)"; ctx.lineWidth = 0.8;
//     ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(4096, y); ctx.stroke();
//   }
//   for (let lng = -180; lng <= 180; lng += 10) {
//     const x = ((lng + 180) / 360) * 4096;
//     ctx.strokeStyle = "rgba(80,140,200,0.1)"; ctx.lineWidth = 0.8;
//     ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 2048); ctx.stroke();
//   }
//   const lands = [
//     "M1040,350 Q1124,324 1210,336 Q1300,350 1350,404 Q1400,464 1380,536 Q1352,616 1290,670 Q1228,710 1156,696 Q1080,676 1048,616 Q1016,556 1020,496 Q1024,436 1040,390Z",
//     "M970,556 Q1020,544 1056,576 Q1080,616 1060,656 Q1024,684 980,668 Q940,640 948,600Z",
//     "M1136,756 Q1204,736 1256,776 Q1296,820 1288,896 Q1270,980 1228,1044 Q1180,1096 1124,1096 Q1068,1084 1042,1030 Q1020,968 1032,910 Q1052,836 1096,790Z",
//     "M1872,324 Q1936,304 1996,316 Q2056,328 2088,368 Q2112,410 2080,448 Q2036,480 1976,476 Q1912,468 1884,430 Q1860,392 1872,350Z",
//     "M1916,384 Q1976,372 2028,388 Q2060,410 2050,444 Q2016,468 1972,460 Q1924,448 1914,420Z",
//     "M2010,456 Q2092,436 2160,476 Q2220,520 2230,610 Q2240,710 2210,800 Q2170,880 2100,924 Q2030,956 1964,924 Q1896,888 1872,800 Q1848,710 1864,622 Q1888,532 1956,488Z",
//     "M2116,250 Q2296,216 2560,244 Q2756,272 2876,336 Q2976,396 2984,476 Q2988,548 2932,604 Q2872,656 2780,684 Q2676,708 2556,684 Q2416,656 2324,596 Q2232,532 2192,456 Q2152,384 2144,320Z",
//     "M2790,390 Q2890,372 2972,404 Q3032,436 3032,496 Q3024,552 2976,580 Q2916,600 2856,572 Q2804,536 2804,484Z",
//     "M2952,1104 Q3076,1080 3180,1112 Q3260,1148 3280,1216 Q3292,1288 3240,1332 Q3180,1364 3108,1352 Q3032,1328 2996,1272 Q2960,1212 2972,1148Z",
//     "M3280,410 Q3310,396 3334,414 Q3352,436 3338,462 Q3314,480 3290,466 Q3268,444 3280,414Z",
//   ];
//   lands.forEach(d => {
//     const p = new Path2D(d);
//     const lg = ctx.createLinearGradient(0, 0, 0, 2048);
//     lg.addColorStop(0, "#3d7a35"); lg.addColorStop(0.5, "#4a8a40"); lg.addColorStop(1, "#3d7a35");
//     ctx.fillStyle = lg; ctx.fill(p);
//     ctx.strokeStyle = "#336b2d"; ctx.lineWidth = 1.5; ctx.stroke(p);
//   });
//   ctx.fillStyle = "rgba(230,240,255,0.3)"; ctx.fillRect(0, 0, 4096, 100);
//   ctx.fillRect(0, 1948, 4096, 100);
//   return new THREE.CanvasTexture(c);
// }

// export default function Globe3D() {
//   const mountRef = useRef(null);
//   const [threeLoaded, setThreeLoaded] = useState(!!window.THREE);

//   useEffect(() => {
//     if (window.THREE) { setThreeLoaded(true); return; }
//     const s = document.createElement("script");
//     s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
//     s.onload = () => setThreeLoaded(true);
//     document.head.appendChild(s);
//   }, []);

//   useEffect(() => {
//     if (!threeLoaded || !mountRef.current) return;
//     const THREE = window.THREE;
//     const el = mountRef.current;
//     const W = el.clientWidth, H = el.clientHeight;

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
//     renderer.setSize(W, H);
//     renderer.setClearColor(0x000000, 0);
//     el.appendChild(renderer.domElement);

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
//     camera.position.set(0, 0, 3.2);

//     const R = 1;
//     const loader = new THREE.TextureLoader();
//     loader.crossOrigin = "anonymous";

//     scene.add(new THREE.AmbientLight(0xffffff, 0.4));
//     const sun = new THREE.DirectionalLight(0xfff8ee, 1.8);
//     sun.position.set(6, 3, 5);
//     scene.add(sun);
//     const rim = new THREE.DirectionalLight(0x88aaff, 0.3);
//     rim.position.set(-5, -2, -4);
//     scene.add(rim);

//     const starPos = new Float32Array(3000 * 3);
//     for (let i = 0; i < 3000 * 3; i++) starPos[i] = (Math.random() - 0.5) * 100;
//     const sg = new THREE.BufferGeometry();
//     sg.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
//     scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xddeeff, size: 0.05, transparent: true, opacity: 0.45 })));

//     let earthMesh = null, cloudMesh = null, atmosMesh = null;
//     let pinGroup = null;
//     const ringsArr = [];

//     function buildPins() {
//       pinGroup = new THREE.Group();
//       scene.add(pinGroup);
//       PINS.forEach(({ lat, lng }) => {
//         const pos = toVec3(THREE, lat, lng, R);
//         const pin = new THREE.Group();
//         const head = new THREE.Mesh(
//           new THREE.SphereGeometry(0.016, 16, 16),
//           new THREE.MeshBasicMaterial({ color: 0xff3355 })
//         );
//         head.position.y = 0.022;
//         const stem = new THREE.Mesh(
//           new THREE.CylinderGeometry(0.003, 0.003, 0.042, 8),
//           new THREE.MeshBasicMaterial({ color: 0xff3355 })
//         );
//         const ring = new THREE.Mesh(
//           new THREE.RingGeometry(0.022, 0.032, 32),
//           new THREE.MeshBasicMaterial({ color: 0xff3355, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false })
//         );
//         ring.rotation.x = -Math.PI / 2;
//         ringsArr.push(ring);
//         pin.add(head, stem, ring);
//         pin.position.copy(pos);
//         pin.lookAt(pos.clone().multiplyScalar(2));
//         pin.rotateX(Math.PI / 2);
//         pin.translateY(0.012);
//         pinGroup.add(pin);
//       });
//     }

//     function buildAtmos() {
//       const ag = new THREE.SphereGeometry(R * 1.02, 64, 64);
//       const am = new THREE.MeshPhongMaterial({ color: 0x4499ff, transparent: true, opacity: 0.05, side: THREE.FrontSide, depthWrite: false });
//       atmosMesh = new THREE.Mesh(ag, am);
//       scene.add(atmosMesh);
//       const og = new THREE.SphereGeometry(R * 1.14, 64, 64);
//       const om = new THREE.MeshPhongMaterial({ color: 0x1155cc, transparent: true, opacity: 0.04, side: THREE.BackSide, depthWrite: false });
//       scene.add(new THREE.Mesh(og, om));
//     }

//     let dayTex = null, bumpTex = null, specTex = null;
//     let loaded = 0;
//     const needed = 3;

//     function onTexLoad() {
//       loaded++;
//       if (loaded < needed) return;
//       const geo = new THREE.SphereGeometry(R, 128, 128);
//       const mat = new THREE.MeshPhongMaterial({
//         map: dayTex,
//         bumpMap: bumpTex,
//         bumpScale: 0.05,
//         specularMap: specTex,
//         specular: new THREE.Color(0x222233),
//         shininess: 22,
//       });
//       earthMesh = new THREE.Mesh(geo, mat);
//       scene.add(earthMesh);
//       buildAtmos();
//       buildPins();
//       loader.load(
//         "https://unpkg.com/three-globe/example/img/earth-clouds.png",
//         (ct) => {
//           const cg = new THREE.SphereGeometry(R * 1.008, 64, 64);
//           const cm = new THREE.MeshPhongMaterial({ map: ct, transparent: true, opacity: 0.35, depthWrite: false });
//           cloudMesh = new THREE.Mesh(cg, cm);
//           scene.add(cloudMesh);
//         },
//         undefined,
//         () => {}
//       );
//     }

//     loader.load("https://unpkg.com/three-globe/example/img/earth-day.jpg", (t) => { dayTex = t; onTexLoad(); }, undefined, () => { dayTex = buildFallback(THREE); onTexLoad(); });
//     loader.load("https://unpkg.com/three-globe/example/img/earth-topology.png", (t) => { bumpTex = t; onTexLoad(); }, undefined, () => { bumpTex = new THREE.Texture(); onTexLoad(); });
//     loader.load("https://unpkg.com/three-globe/example/img/earth-water.png", (t) => { specTex = t; onTexLoad(); }, undefined, () => { specTex = new THREE.Texture(); onTexLoad(); });

//     let drag = false, prev = { x: 0, y: 0 };
//     let targetRot = { x: 0.28, y: 0 }, curRot = { x: 0.28, y: 0 };

//     const onMD = (e) => { drag = true; prev = { x: e.clientX, y: e.clientY }; };
//     const onMM = (e) => {
//       if (!drag) return;
//       targetRot.y += (e.clientX - prev.x) * 0.005;
//       targetRot.x += (e.clientY - prev.y) * 0.004;
//       targetRot.x = Math.max(-1.1, Math.min(1.1, targetRot.x));
//       prev = { x: e.clientX, y: e.clientY };
//     };
//     const onMU = () => { drag = false; };
//     const onTD = (e) => { if (e.touches[0]) prev = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
//     const onTM = (e) => { if (!e.touches[0]) return; targetRot.y += (e.touches[0].clientX - prev.x) * 0.005; prev = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };

//     renderer.domElement.addEventListener("mousedown", onMD);
//     window.addEventListener("mousemove", onMM);
//     window.addEventListener("mouseup", onMU);
//     renderer.domElement.addEventListener("touchstart", onTD, { passive: true });
//     renderer.domElement.addEventListener("touchmove", onTM, { passive: true });

//     let raf, t = 0;
//     const tick = () => {
//       raf = requestAnimationFrame(tick);
//       t += 0.012;
//       if (!drag) targetRot.y += 0.0017;
//       curRot.x += (targetRot.x - curRot.x) * 0.07;
//       curRot.y += (targetRot.y - curRot.y) * 0.07;

//       const applyRot = (mesh, extraY = 0) => { if (!mesh) return; mesh.rotation.x = curRot.x; mesh.rotation.y = curRot.y + extraY; };
//       applyRot(earthMesh);
//       applyRot(atmosMesh);
//       applyRot(cloudMesh, t * 0.0025);
//       applyRot(pinGroup);

//       ringsArr.forEach((ring, i) => {
//         const s = 1 + 0.5 * Math.abs(Math.sin(t * 1.8 + i * 0.44));
//         ring.scale.set(s, s, s);
//         ring.material.opacity = 0.55 * (1 - 0.45 * Math.abs(Math.sin(t * 1.8 + i * 0.44)));
//       });
//       renderer.render(scene, camera);
//     };
//     tick();

//     const onResize = () => {
//       const w = el.clientWidth, h = el.clientHeight;
//       camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
//     };
//     window.addEventListener("resize", onResize);

//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("resize", onResize);
//       window.removeEventListener("mousemove", onMM);
//       window.removeEventListener("mouseup", onMU);
//       renderer.dispose();
//       if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
//     };
//   }, [threeLoaded]);

//   return (
//     <div
//       ref={mountRef}
//       style={{ width: "100%", height: 480, cursor: "grab" }}
//       onMouseDown={(e) => (e.currentTarget.style.cursor = "grabbing")}
//       onMouseUp={(e) => (e.currentTarget.style.cursor = "grab")}
//     />
//   );
// }





// import { useEffect, useRef, useState } from "react";

// const PINS = [
//   { lat: 51.5, lng: -0.1 }, { lat: 52.5, lng: 13.4 }, { lat: 48.8, lng: 2.35 },
//   { lat: 40.7, lng: -74.0 }, { lat: 34.0, lng: -118.2 }, { lat: 35.7, lng: 139.7 },
//   { lat: 31.2, lng: 121.5 }, { lat: 1.3, lng: 103.8 }, { lat: 19.1, lng: 72.9 },
//   { lat: -33.9, lng: 18.4 }, { lat: -23.5, lng: -46.6 }, { lat: 25.2, lng: 55.3 },
//   { lat: 37.6, lng: 127.0 }, { lat: 55.7, lng: 37.6 }, { lat: -37.8, lng: 144.9 },
// ];

// function toVec3(THREE, lat, lng, r) {
//   const phi = (90 - lat) * (Math.PI / 180);
//   const theta = (lng + 180) * (Math.PI / 180);
//   return new THREE.Vector3(
//     -(r * Math.sin(phi) * Math.cos(theta)),
//     r * Math.cos(phi),
//     r * Math.sin(phi) * Math.sin(theta)
//   );
// }

// function buildFallback(THREE) {
//   const c = document.createElement("canvas");
//   c.width = 2048; c.height = 1024;
//   const ctx = c.getContext("2d");
//   const og = ctx.createLinearGradient(0, 0, 0, 1024);
//   og.addColorStop(0, "#0d4f7a"); og.addColorStop(0.5, "#0c5282"); og.addColorStop(1, "#0d4f7a");
//   ctx.fillStyle = og; ctx.fillRect(0, 0, 2048, 1024);
//   for (let lat = -80; lat <= 80; lat += 10) {
//     const y = ((90 - lat) / 180) * 1024;
//     ctx.strokeStyle = "rgba(80,140,200,0.1)"; ctx.lineWidth = 0.6;
//     ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(2048, y); ctx.stroke();
//   }
//   for (let lng = -180; lng <= 180; lng += 10) {
//     const x = ((lng + 180) / 360) * 2048;
//     ctx.strokeStyle = "rgba(80,140,200,0.1)"; ctx.lineWidth = 0.6;
//     ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke();
//   }
//   const lands = [
//     "M520,175 Q562,162 605,168 Q650,175 675,202 Q700,232 690,268 Q676,308 645,335 Q614,355 578,348 Q540,338 524,308 Q508,278 510,248 Q512,218 520,195Z",
//     "M485,278 Q510,272 528,288 Q540,308 530,328 Q512,342 490,334 Q470,320 474,300Z",
//     "M568,378 Q602,368 628,388 Q648,410 644,448 Q635,490 614,522 Q590,548 562,548 Q534,542 521,515 Q510,484 516,452 Q526,418 548,395Z",
//     "M936,162 Q968,152 998,158 Q1028,164 1044,184 Q1056,205 1040,224 Q1018,240 988,238 Q956,234 942,215 Q930,196 936,175Z",
//     "M1005,228 Q1046,218 1080,238 Q1112,260 1118,305 Q1124,355 1108,400 Q1088,440 1052,462 Q1015,478 982,462 Q948,442 936,400 Q924,355 932,310 Q944,266 978,244Z",
//     "M1058,125 Q1148,108 1280,122 Q1378,136 1438,168 Q1488,198 1492,238 Q1494,274 1466,302 Q1436,328 1390,342 Q1338,354 1278,342 Q1208,328 1162,298 Q1116,266 1096,228 Q1076,192 1072,160Z",
//     "M1395,195 Q1445,186 1486,202 Q1516,218 1516,248 Q1512,276 1488,290 Q1458,300 1428,286 Q1402,268 1402,242Z",
//     "M1476,552 Q1538,540 1590,556 Q1630,574 1640,608 Q1646,644 1620,666 Q1590,682 1554,676 Q1516,664 1498,636 Q1480,606 1486,574Z",
//   ];
//   lands.forEach(d => {
//     const p = new Path2D(d);
//     const lg = ctx.createLinearGradient(0, 0, 0, 1024);
//     lg.addColorStop(0, "#3d7a35"); lg.addColorStop(0.5, "#4a8a40"); lg.addColorStop(1, "#3d7a35");
//     ctx.fillStyle = lg; ctx.fill(p);
//     ctx.strokeStyle = "#336b2d"; ctx.lineWidth = 1; ctx.stroke(p);
//   });
//   ctx.fillStyle = "rgba(230,240,255,0.25)"; ctx.fillRect(0, 0, 2048, 60); ctx.fillRect(0, 964, 2048, 60);
//   return new THREE.CanvasTexture(c);
// }

// export default function Globe3D() {
//   const mountRef = useRef(null);
//   const [threeLoaded, setThreeLoaded] = useState(!!window.THREE);

//   useEffect(() => {
//     if (window.THREE) { setThreeLoaded(true); return; }
//     const s = document.createElement("script");
//     s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
//     s.onload = () => setThreeLoaded(true);
//     document.head.appendChild(s);
//   }, []);

//   useEffect(() => {
//     if (!threeLoaded || !mountRef.current) return;
//     const THREE = window.THREE;
//     const el = mountRef.current;
//     const W = el.clientWidth, H = el.clientHeight;
//     if (W === 0 || H === 0) return;

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.setSize(W, H);
//     renderer.setClearColor(0x000000, 0);
//     el.appendChild(renderer.domElement);

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
//     camera.position.set(0, 0, 3.2);
//     const R = 1;
//     const loader = new THREE.TextureLoader();
//     loader.crossOrigin = "anonymous";

//     scene.add(new THREE.AmbientLight(0xffffff, 0.4));
//     const sun = new THREE.DirectionalLight(0xfff8ee, 1.8);
//     sun.position.set(6, 3, 5); scene.add(sun);
//     const rim = new THREE.DirectionalLight(0x88aaff, 0.3);
//     rim.position.set(-5, -2, -4); scene.add(rim);

//     const starCount = 1200;
//     const starPos = new Float32Array(starCount * 3);
//     for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 100;
//     const sg = new THREE.BufferGeometry();
//     sg.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
//     scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xddeeff, size: 0.06, transparent: true, opacity: 0.4 })));

//     let earthMesh = null, cloudMesh = null, atmosMesh = null, pinGroup = null;
//     const ringsArr = [];

//     function buildAtmos() {
//       atmosMesh = new THREE.Mesh(
//         new THREE.SphereGeometry(R * 1.02, 64, 64),
//         new THREE.MeshPhongMaterial({ color: 0x4499ff, transparent: true, opacity: 0.05, side: THREE.FrontSide, depthWrite: false })
//       );
//       scene.add(atmosMesh);
//       scene.add(new THREE.Mesh(
//         new THREE.SphereGeometry(R * 1.14, 64, 64),
//         new THREE.MeshPhongMaterial({ color: 0x1155cc, transparent: true, opacity: 0.04, side: THREE.BackSide, depthWrite: false })
//       ));
//     }

//     function buildPins() {
//       pinGroup = new THREE.Group(); scene.add(pinGroup);
//       PINS.forEach(({ lat, lng }) => {
//         const pos = toVec3(THREE, lat, lng, R);
//         const pin = new THREE.Group();
//         const head = new THREE.Mesh(new THREE.SphereGeometry(0.016, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff3355 }));
//         head.position.y = 0.022;
//         const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.042, 8), new THREE.MeshBasicMaterial({ color: 0xff3355 }));
//         const ring = new THREE.Mesh(
//           new THREE.RingGeometry(0.022, 0.032, 32),
//           new THREE.MeshBasicMaterial({ color: 0xff3355, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false })
//         );
//         ring.rotation.x = -Math.PI / 2;
//         ringsArr.push(ring);
//         pin.add(head, stem, ring);
//         pin.position.copy(pos);
//         pin.lookAt(pos.clone().multiplyScalar(2));
//         pin.rotateX(Math.PI / 2);
//         pin.translateY(0.012);
//         pinGroup.add(pin);
//       });
//     }

//     let dayTex = null, bumpTex = null, specTex = null, loaded = 0;
//     function onTexLoad() {
//       loaded++;
//       if (loaded < 3) return;
//       earthMesh = new THREE.Mesh(
//         new THREE.SphereGeometry(R, 96, 96),
//         new THREE.MeshPhongMaterial({ map: dayTex, bumpMap: bumpTex, bumpScale: 0.05, specularMap: specTex, specular: new THREE.Color(0x222233), shininess: 22 })
//       );
//       scene.add(earthMesh);
//       buildAtmos(); buildPins();
//       loader.load("https://unpkg.com/three-globe/example/img/earth-clouds.png", ct => {
//         cloudMesh = new THREE.Mesh(new THREE.SphereGeometry(R * 1.008, 64, 64), new THREE.MeshPhongMaterial({ map: ct, transparent: true, opacity: 0.35, depthWrite: false }));
//         scene.add(cloudMesh);
//       }, undefined, () => {});
//     }

//     loader.load("https://unpkg.com/three-globe/example/img/earth-day.jpg", t => { dayTex = t; onTexLoad(); }, undefined, () => { dayTex = buildFallback(THREE); onTexLoad(); });
//     loader.load("https://unpkg.com/three-globe/example/img/earth-topology.png", t => { bumpTex = t; onTexLoad(); }, undefined, () => { bumpTex = new THREE.Texture(); onTexLoad(); });
//     loader.load("https://unpkg.com/three-globe/example/img/earth-water.png", t => { specTex = t; onTexLoad(); }, undefined, () => { specTex = new THREE.Texture(); onTexLoad(); });

//     let drag = false, prev = { x: 0, y: 0 };
//     let targetRot = { x: 0.28, y: 0 }, curRot = { x: 0.28, y: 0 };
//     const onMD = e => { drag = true; prev = { x: e.clientX, y: e.clientY }; };
//     const onMM = e => {
//       if (!drag) return;
//       targetRot.y += (e.clientX - prev.x) * 0.005;
//       targetRot.x = Math.max(-1.1, Math.min(1.1, targetRot.x + (e.clientY - prev.y) * 0.004));
//       prev = { x: e.clientX, y: e.clientY };
//     };
//     const onMU = () => { drag = false; };
//     const onTD = e => { drag = true; if (e.touches[0]) prev = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
//     const onTM = e => {
//       if (!drag || !e.touches[0]) return;
//       targetRot.y += (e.touches[0].clientX - prev.x) * 0.005;
//       targetRot.x = Math.max(-1.1, Math.min(1.1, targetRot.x + (e.touches[0].clientY - prev.y) * 0.004));
//       prev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
//     };
//     const onTE = () => { drag = false; };

//     renderer.domElement.addEventListener("mousedown", onMD);
//     window.addEventListener("mousemove", onMM);
//     window.addEventListener("mouseup", onMU);
//     renderer.domElement.addEventListener("touchstart", onTD, { passive: true });
//     renderer.domElement.addEventListener("touchmove", onTM, { passive: true });
//     renderer.domElement.addEventListener("touchend", onTE);

//     let raf, t = 0;
//     const tick = () => {
//       raf = requestAnimationFrame(tick); t += 0.012;
//       if (!drag) targetRot.y += 0.0017;
//       curRot.x += (targetRot.x - curRot.x) * 0.07;
//       curRot.y += (targetRot.y - curRot.y) * 0.07;
//       const applyRot = (mesh, extraY = 0) => { if (!mesh) return; mesh.rotation.x = curRot.x; mesh.rotation.y = curRot.y + extraY; };
//       applyRot(earthMesh); applyRot(atmosMesh); applyRot(cloudMesh, t * 0.0025); applyRot(pinGroup);
//       ringsArr.forEach((ring, i) => {
//         const s = 1 + 0.5 * Math.abs(Math.sin(t * 1.8 + i * 0.44));
//         ring.scale.set(s, s, s);
//         ring.material.opacity = 0.55 * (1 - 0.45 * Math.abs(Math.sin(t * 1.8 + i * 0.44)));
//       });
//       renderer.render(scene, camera);
//     };
//     tick();

//     const onResize = () => {
//       const w = el.clientWidth, h = el.clientHeight;
//       if (w === 0 || h === 0) return;
//       camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
//     };
//     window.addEventListener("resize", onResize);

//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("resize", onResize);
//       window.removeEventListener("mousemove", onMM);
//       window.removeEventListener("mouseup", onMU);
//       renderer.dispose();
//       if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
//     };
//   }, [threeLoaded]);

//   return (
//     <div
//       ref={mountRef}
//       style={{ width: "100%", height: "100%", cursor: "grab" }}
//       onMouseDown={e => (e.currentTarget.style.cursor = "grabbing")}
//       onMouseUp={e => (e.currentTarget.style.cursor = "grab")}
//     />
//   );
// }














import { useEffect, useRef, useState } from "react";

const PINS = [
  { lat: 51.5, lng: -0.1 }, { lat: 52.5, lng: 13.4 }, { lat: 48.8, lng: 2.35 },
  { lat: 40.7, lng: -74.0 }, { lat: 34.0, lng: -118.2 }, { lat: 35.7, lng: 139.7 },
  { lat: 31.2, lng: 121.5 }, { lat: 1.3, lng: 103.8 }, { lat: 19.1, lng: 72.9 },
  { lat: -33.9, lng: 18.4 }, { lat: -23.5, lng: -46.6 }, { lat: 25.2, lng: 55.3 },
  { lat: 37.6, lng: 127.0 }, { lat: 55.7, lng: 37.6 }, { lat: -37.8, lng: 144.9 },
];

function toVec3(THREE, lat, lng, r) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function buildFallback(THREE) {
  const c = document.createElement("canvas");
  c.width = 2048; c.height = 1024;
  const ctx = c.getContext("2d");
  const og = ctx.createLinearGradient(0, 0, 0, 1024);
  og.addColorStop(0, "#0d4f7a"); og.addColorStop(0.5, "#0c5282"); og.addColorStop(1, "#0d4f7a");
  ctx.fillStyle = og; ctx.fillRect(0, 0, 2048, 1024);
  for (let lat = -80; lat <= 80; lat += 10) {
    const y = ((90 - lat) / 180) * 1024;
    ctx.strokeStyle = "rgba(80,140,200,0.1)"; ctx.lineWidth = 0.6;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(2048, y); ctx.stroke();
  }
  for (let lng = -180; lng <= 180; lng += 10) {
    const x = ((lng + 180) / 360) * 2048;
    ctx.strokeStyle = "rgba(80,140,200,0.1)"; ctx.lineWidth = 0.6;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke();
  }
  const lands = [
    "M520,175 Q562,162 605,168 Q650,175 675,202 Q700,232 690,268 Q676,308 645,335 Q614,355 578,348 Q540,338 524,308 Q508,278 510,248 Q512,218 520,195Z",
    "M485,278 Q510,272 528,288 Q540,308 530,328 Q512,342 490,334 Q470,320 474,300Z",
    "M568,378 Q602,368 628,388 Q648,410 644,448 Q635,490 614,522 Q590,548 562,548 Q534,542 521,515 Q510,484 516,452 Q526,418 548,395Z",
    "M936,162 Q968,152 998,158 Q1028,164 1044,184 Q1056,205 1040,224 Q1018,240 988,238 Q956,234 942,215 Q930,196 936,175Z",
    "M1005,228 Q1046,218 1080,238 Q1112,260 1118,305 Q1124,355 1108,400 Q1088,440 1052,462 Q1015,478 982,462 Q948,442 936,400 Q924,355 932,310 Q944,266 978,244Z",
    "M1058,125 Q1148,108 1280,122 Q1378,136 1438,168 Q1488,198 1492,238 Q1494,274 1466,302 Q1436,328 1390,342 Q1338,354 1278,342 Q1208,328 1162,298 Q1116,266 1096,228 Q1076,192 1072,160Z",
    "M1395,195 Q1445,186 1486,202 Q1516,218 1516,248 Q1512,276 1488,290 Q1458,300 1428,286 Q1402,268 1402,242Z",
    "M1476,552 Q1538,540 1590,556 Q1630,574 1640,608 Q1646,644 1620,666 Q1590,682 1554,676 Q1516,664 1498,636 Q1480,606 1486,574Z",
  ];
  lands.forEach(d => {
    const p = new Path2D(d);
    const lg = ctx.createLinearGradient(0, 0, 0, 1024);
    lg.addColorStop(0, "#3d7a35"); lg.addColorStop(0.5, "#4a8a40"); lg.addColorStop(1, "#3d7a35");
    ctx.fillStyle = lg; ctx.fill(p);
    ctx.strokeStyle = "#336b2d"; ctx.lineWidth = 1; ctx.stroke(p);
  });
  ctx.fillStyle = "rgba(230,240,255,0.25)"; ctx.fillRect(0, 0, 2048, 60); ctx.fillRect(0, 964, 2048, 60);
  return new THREE.CanvasTexture(c);
}

export default function Globe3D() {
  const mountRef = useRef(null);
  const [threeLoaded, setThreeLoaded] = useState(!!window.THREE);

  useEffect(() => {
    if (window.THREE) { setThreeLoaded(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    s.onload = () => setThreeLoaded(true);
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (!threeLoaded || !mountRef.current) return;
    const THREE = window.THREE;
    const el = mountRef.current;
    const W = el.clientWidth, H = el.clientHeight;
    if (W === 0 || H === 0) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 0, 3.2);
    const R = 1;
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const sun = new THREE.DirectionalLight(0xfff8ee, 1.8);
    sun.position.set(6, 3, 5); scene.add(sun);
    const rim = new THREE.DirectionalLight(0x88aaff, 0.3);
    rim.position.set(-5, -2, -4); scene.add(rim);

    const starCount = 800;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 100;
    const sg = new THREE.BufferGeometry();
    sg.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xddeeff, size: 0.06, transparent: true, opacity: 0.35 })));

    let earthMesh = null, atmosMesh = null, pinGroup = null;
    const ringsArr = [];

    function buildAtmos() {
      atmosMesh = new THREE.Mesh(
        new THREE.SphereGeometry(R * 1.02, 32, 32),
        new THREE.MeshPhongMaterial({ color: 0x4499ff, transparent: true, opacity: 0.05, side: THREE.FrontSide, depthWrite: false })
      );
      scene.add(atmosMesh);
      scene.add(new THREE.Mesh(
        new THREE.SphereGeometry(R * 1.14, 32, 32),
        new THREE.MeshPhongMaterial({ color: 0x1155cc, transparent: true, opacity: 0.04, side: THREE.BackSide, depthWrite: false })
      ));
    }

    function buildPins() {
      pinGroup = new THREE.Group(); scene.add(pinGroup);
      PINS.forEach(({ lat, lng }) => {
        const pos = toVec3(THREE, lat, lng, R);
        const pin = new THREE.Group();
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.016, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff3355 }));
        head.position.y = 0.022;
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.042, 8), new THREE.MeshBasicMaterial({ color: 0xff3355 }));
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.022, 0.032, 32),
          new THREE.MeshBasicMaterial({ color: 0xff3355, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false })
        );
        ring.rotation.x = -Math.PI / 2;
        ringsArr.push(ring);
        pin.add(head, stem, ring);
        pin.position.copy(pos);
        pin.lookAt(pos.clone().multiplyScalar(2));
        pin.rotateX(Math.PI / 2);
        pin.translateY(0.012);
        pinGroup.add(pin);
      });
    }

    const TEX_BASE = "https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img";

    let dayTex = null, bumpTex = null, loaded = 0;
    function onTexLoad() {
      loaded++;
      if (loaded < 2) return;
      earthMesh = new THREE.Mesh(
        new THREE.SphereGeometry(R, 64, 64),
        new THREE.MeshPhongMaterial({ map: dayTex, bumpMap: bumpTex, bumpScale: 0.04, specular: new THREE.Color(0x1a1a2e), shininess: 10 })
      );
      scene.add(earthMesh);
      buildAtmos();
      buildPins();
    }

    loader.load(`${TEX_BASE}/earth-day.jpg`, t => { dayTex = t; onTexLoad(); }, undefined, () => { dayTex = buildFallback(THREE); onTexLoad(); });
    loader.load(`${TEX_BASE}/earth-topology.png`, t => { bumpTex = t; onTexLoad(); }, undefined, () => { bumpTex = new THREE.Texture(); onTexLoad(); });

    let drag = false, prev = { x: 0, y: 0 };
    let targetRot = { x: 0.28, y: 0 }, curRot = { x: 0.28, y: 0 };
    const onMD = e => { drag = true; prev = { x: e.clientX, y: e.clientY }; };
    const onMM = e => {
      if (!drag) return;
      targetRot.y += (e.clientX - prev.x) * 0.005;
      targetRot.x = Math.max(-1.1, Math.min(1.1, targetRot.x + (e.clientY - prev.y) * 0.004));
      prev = { x: e.clientX, y: e.clientY };
    };
    const onMU = () => { drag = false; };
    const onTD = e => { drag = true; if (e.touches[0]) prev = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    const onTM = e => {
      if (!drag || !e.touches[0]) return;
      targetRot.y += (e.touches[0].clientX - prev.x) * 0.005;
      targetRot.x = Math.max(-1.1, Math.min(1.1, targetRot.x + (e.touches[0].clientY - prev.y) * 0.004));
      prev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTE = () => { drag = false; };

    renderer.domElement.addEventListener("mousedown", onMD);
    window.addEventListener("mousemove", onMM);
    window.addEventListener("mouseup", onMU);
    renderer.domElement.addEventListener("touchstart", onTD, { passive: true });
    renderer.domElement.addEventListener("touchmove", onTM, { passive: true });
    renderer.domElement.addEventListener("touchend", onTE);

    let raf, t = 0, lastTime = 0;
    const FPS_INTERVAL = 1000 / 45;
    const tick = (now = 0) => {
      raf = requestAnimationFrame(tick);
      if (now - lastTime < FPS_INTERVAL) return;
      lastTime = now;
      t += 0.012;
      if (!drag) targetRot.y += 0.0017;
      curRot.x += (targetRot.x - curRot.x) * 0.07;
      curRot.y += (targetRot.y - curRot.y) * 0.07;
      const applyRot = (mesh) => { if (!mesh) return; mesh.rotation.x = curRot.x; mesh.rotation.y = curRot.y; };
      applyRot(earthMesh); applyRot(atmosMesh); applyRot(pinGroup);
      ringsArr.forEach((ring, i) => {
        const s = 1 + 0.5 * Math.abs(Math.sin(t * 1.8 + i * 0.44));
        ring.scale.set(s, s, s);
        ring.material.opacity = 0.55 * (1 - 0.45 * Math.abs(Math.sin(t * 1.8 + i * 0.44)));
      });
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMM);
      window.removeEventListener("mouseup", onMU);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [threeLoaded]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", cursor: "grab" }}
      onMouseDown={e => (e.currentTarget.style.cursor = "grabbing")}
      onMouseUp={e => (e.currentTarget.style.cursor = "grab")}
    />
  );
}