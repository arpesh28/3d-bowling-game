export default [
  {
    name: "environmentMapTexture",
    type: "cubeTextureLoader",
    path: [
      "textures/environmentMap/px.jpg",
      "textures/environmentMap/nx.jpg",
      "textures/environmentMap/py.jpg",
      "textures/environmentMap/ny.jpg",
      "textures/environmentMap/pz.jpg",
      "textures/environmentMap/nz.jpg",
    ],
  },
  {
    name: "bowling_ball",
    type: "gltfLoader",
    path: "models/bowling_ball/scene.gltf",
  },
  {
    name: "bowling_pin",
    type: "gltfLoader",
    path: "models/bowling_pin/scene.gltf",
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
