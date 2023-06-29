export default [
  {
    name: "environmentMapTexture",
    type: "cubeTextureLoader",
    path: [
      "textures/environmentMap/1/px.jpg",
      "textures/environmentMap/1/nx.jpg",
      "textures/environmentMap/1/py.jpg",
      "textures/environmentMap/1/ny.jpg",
      "textures/environmentMap/1/pz.jpg",
      "textures/environmentMap/1/nz.jpg",
    ],
  },
  {
    name: "stadiumMap",
    type: "textureLoader",
    path: ["textures/environmentMap/2/7.jpg"],
  },
  {
    name: "bowling_ball",
    type: "gltfLoader",
    path: "models/bowling_ball/scene.gltf",
  },
  {
    name: "bowling_pin",
    type: "gltfLoader",
    path: "models/1/scene.gltf",
  },
  {
    name: "aoFloor",
    type: "textureLoader",
    path: "textures/floor/ao.png",
  },
  {
    name: "metalFloor",
    type: "textureLoader",
    path: "textures/floor/ao-rough-metal.png",
  },
  {
    name: "colorFloor",
    type: "textureLoader",
    path: "textures/floor/color.png",
  },
  {
    name: "dispFloor",
    type: "textureLoader",
    path: "textures/floor/disp.png",
  },
  // {
  //   name: "floor",
  //   type: "textureLoader",
  //   path: "textures/floor/normal_dx.png",
  // },
  {
    name: "normalFloor",
    type: "textureLoader",
    path: "textures/floor/normal_gl.png",
  },
  {
    name: "roughFloor",
    type: "textureLoader",
    path: "textures/floor/rough.png",
  },
];
