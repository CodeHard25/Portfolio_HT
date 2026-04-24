import * as THREE from "three";

function createWayfarerShape(
  width: number,
  height: number,
  inset: number,
  flare: number,
  side: 1 | -1
) {
  const w = width / 1.88;
  const h = height / 1.88;
  const radius = width * 0.11;
  const leftFlare = side === -1 ? flare : flare * 0.18;
  const rightFlare = side === 1 ? flare : flare * 0.18;
  const shape = new THREE.Shape();

  shape.moveTo(-w - leftFlare + radius, h);
  shape.lineTo(w + rightFlare - radius, h);
  shape.quadraticCurveTo(w + rightFlare, h, w + rightFlare, h - radius);
  shape.lineTo(w + rightFlare * 0.6, -h + radius);
  shape.quadraticCurveTo(
    w + rightFlare * 0.45,
    -h,
    w + rightFlare * 0.45 - radius,
    -h
  );
  shape.lineTo(-w + radius, -h);
  shape.quadraticCurveTo(-w, -h, -w, -h + radius);
  shape.lineTo(-w - leftFlare, h - radius);
  shape.quadraticCurveTo(-w - leftFlare, h, -w - leftFlare + radius, h);

  const inner = new THREE.Path();
  const innerWidth = width - inset * 0.8;
  const innerHeight = height - inset * 0.8;
  const iw = innerWidth / 2;
  const ih = innerHeight / 2;
  const innerRadius = innerWidth * 0.1;
  const innerLeftFlare = side === -1 ? flare * 0.82 : flare * 0.16;
  const innerRightFlare = side === 1 ? flare * 0.82 : flare * 0.16;

  inner.moveTo(-iw - innerLeftFlare + innerRadius, ih);
  inner.lineTo(iw + innerRightFlare - innerRadius, ih);
  inner.quadraticCurveTo(
    iw + innerRightFlare,
    ih,
    iw + innerRightFlare,
    ih - innerRadius
  );
  inner.lineTo(iw + innerRightFlare * 0.55, -ih + innerRadius);
  inner.quadraticCurveTo(
    iw + innerRightFlare * 0.38,
    -ih,
    iw + innerRightFlare * 0.38 - innerRadius,
    -ih
  );
  inner.lineTo(-iw + innerRadius, -ih);
  inner.quadraticCurveTo(-iw, -ih, -iw, -ih + innerRadius);
  inner.lineTo(-iw - innerLeftFlare, ih - innerRadius);
  inner.quadraticCurveTo(
    -iw - innerLeftFlare,
    ih,
    -iw - innerLeftFlare + innerRadius,
    ih
  );

  shape.holes.push(inner);
  return shape;
}

function createLensRim(
  side: 1 | -1,
  centerX: number,
  lensWidth: number,
  lensHeight: number,
  inset: number,
  frameDepth: number,
  frameMaterial: THREE.Material,
  lensMaterial: THREE.Material
) {
  const flare = lensWidth * 0.08;
  const rimShape = createWayfarerShape(lensWidth, lensHeight, inset, flare, side);
  const geometry = new THREE.ExtrudeGeometry(rimShape, {
    depth: frameDepth,
    bevelEnabled: false,
    curveSegments: 24,
  });

  geometry.translate(0, 0, -frameDepth / 2);

  const frame = new THREE.Mesh(geometry, frameMaterial);
  const lens = new THREE.Mesh(
    new THREE.PlaneGeometry(lensWidth - inset * 2.1, lensHeight - inset * 2.15),
    lensMaterial
  );
  lens.position.set(0, -lensHeight * 0.02, frameDepth * 0.42);

  const group = new THREE.Group();
  group.position.x = centerX;
  group.add(frame, lens);
  return group;
}

function createTemple(
  side: 1 | -1,
  anchorX: number,
  anchorY: number,
  lensWidth: number,
  frameDepth: number,
  material: THREE.Material
) {
  const points = [
    new THREE.Vector3(anchorX, anchorY, 0),
    new THREE.Vector3(anchorX + side * lensWidth * 0.08, anchorY + 0.004, -0.01),
    new THREE.Vector3(anchorX + side * lensWidth * 0.14, anchorY - 0.01, -0.035),
    new THREE.Vector3(anchorX + side * lensWidth * 0.22, anchorY - 0.04, -0.06),
  ];

  const curve = new THREE.CatmullRomCurve3(points);
  const templeGeometry = new THREE.TubeGeometry(
    curve,
    12,
    Math.max(frameDepth * 0.2, 0.006),
    8,
    false
  );

  const endPoint = points[points.length - 1];
  const hairStart = new THREE.Vector3(
    endPoint.x + side * lensWidth * 0.012,
    endPoint.y + lensWidth * 0.012,
    endPoint.z - 0.002
  );
  const hairCurve = new THREE.CatmullRomCurve3([
    hairStart.clone(),
    new THREE.Vector3(
      endPoint.x + side * lensWidth * 0.09,
      endPoint.y + lensWidth * 0.18,
      endPoint.z - 0.22
    ),
    new THREE.Vector3(
      endPoint.x + side * lensWidth * 0.1,
      endPoint.y + lensWidth * 0.42,
      endPoint.z - 0.75
    ),
  ]);
  const hairGeometry = new THREE.TubeGeometry(
    hairCurve,
    14,
    Math.max(frameDepth * 0.42, 0.012),
    8,
    false
  );

  const templeGroup = new THREE.Group();
  templeGroup.position.z = -frameDepth * 0.1;
  templeGroup.add(new THREE.Mesh(templeGeometry, material));
  const hairMesh = new THREE.Mesh(hairGeometry, material);
  hairMesh.position.z = -frameDepth * 0.45;
  hairMesh.position.y = lensWidth * 0.01;
  const connector = new THREE.Mesh(
    new THREE.SphereGeometry(Math.max(frameDepth * 0.42, 0.014), 16, 16),
    material
  );
  connector.position.set(
    (endPoint.x + hairStart.x) / 2,
    (endPoint.y + hairStart.y + lensWidth * 0.01) / 2,
    (endPoint.z + hairStart.z - frameDepth * 0.45) / 2
  );
  templeGroup.add(connector);
  templeGroup.add(hairMesh);
  return templeGroup;
}

export default function attachGlasses(character: THREE.Object3D) {
  const headBone = character.getObjectByName("spine006");
  if (!headBone || headBone.getObjectByName("squareSpectacles")) return;

  character.updateMatrixWorld(true);

  const leftBrow = character.getObjectByName("eyebrow_L");
  const rightBrow = character.getObjectByName("eyebrow_R");

  const leftPos = new THREE.Vector3(-0.22, 0.14, 0.18);
  const rightPos = new THREE.Vector3(0.22, 0.14, 0.18);

  if (leftBrow && rightBrow) {
    leftBrow.getWorldPosition(leftPos);
    rightBrow.getWorldPosition(rightPos);
    headBone.worldToLocal(leftPos);
    headBone.worldToLocal(rightPos);
  }

  const eyeGap = Math.max(leftPos.distanceTo(rightPos), 0.42);
  const lensWidth = eyeGap * 0.76;
  const lensHeight = lensWidth * 0.84;
  const frameDepth = lensWidth * 0.09;
  const bridgeWidth = eyeGap * 0.3;
  const frameInset = lensWidth * 0.235;

  const center = leftPos.clone().add(rightPos).multiplyScalar(0.5);
  const glassesGroup = new THREE.Group();
  glassesGroup.name = "squareSpectacles";

  const frameMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x16110c,
    transparent: true,
    opacity: 0.72,
    metalness: 0.18,
    roughness: 0.46,
    clearcoat: 0.18,
  });

  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.03,
    roughness: 0.06,
    metalness: 0,
    clearcoat: 0.08,
  });

  const leftCenterX = -(bridgeWidth / 2 + lensWidth / 2);
  const rightCenterX = bridgeWidth / 2 + lensWidth / 2;

  glassesGroup.add(
    createLensRim(
      -1,
      leftCenterX,
      lensWidth,
      lensHeight,
      frameInset,
      frameDepth,
      frameMaterial,
      lensMaterial
    )
  );
  glassesGroup.add(
    createLensRim(
      1,
      rightCenterX,
      lensWidth,
      lensHeight,
      frameInset,
      frameDepth,
      frameMaterial,
      lensMaterial
    )
  );

  const bridge = new THREE.Mesh(
    new THREE.BoxGeometry(bridgeWidth, lensHeight * 0.05, frameDepth * 0.72),
    frameMaterial
  );
  bridge.position.set(0, lensHeight * 0.04, 0);
  glassesGroup.add(bridge);

  const hingeY = lensHeight * 0.17;
  const leftOuterX = leftCenterX - lensWidth * 0.62;
  const rightOuterX = rightCenterX + lensWidth * 0.62;

  glassesGroup.add(
    createTemple(-1, leftOuterX, hingeY, lensWidth, frameDepth, frameMaterial)
  );
  glassesGroup.add(
    createTemple(1, rightOuterX, hingeY, lensWidth, frameDepth, frameMaterial)
  );

  glassesGroup.position.copy(center);
  glassesGroup.position.y -= lensHeight * 0.8;
  glassesGroup.position.z += eyeGap * 0.125;
  glassesGroup.rotation.x = -0.08;

  headBone.add(glassesGroup);
}
