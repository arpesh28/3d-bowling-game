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
    name: "bowling_alley",
    type: "gltfLoader",
    path: "models/bowling_alley/4/scene.gltf",
  },
  {
    name: "stadiumMap",
    type: "textureLoader",
    path: ["textures/environmentMap/2/8.jpg"],
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
    path: "textures/floor/4/ao.png",
  },
  {
    name: "metalFloor",
    type: "textureLoader",
    path: "textures/floor/4/metalness.png",
  },
  {
    name: "colorFloor",
    type: "textureLoader",
    path: "textures/floor/4/color.png",
  },
  {
    name: "dispFloor",
    type: "textureLoader",
    path: "textures/floor/4/disp.png",
  },

  {
    name: "normalFloor",
    type: "textureLoader",
    path: "textures/floor/4/normal.png",
  },
  {
    name: "roughFloor",
    type: "textureLoader",
    path: "textures/floor/4/rough.png",
  },
];
