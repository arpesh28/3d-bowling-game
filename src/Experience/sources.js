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
];
