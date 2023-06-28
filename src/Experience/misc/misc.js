import * as CANNON from "cannon-es";
import * as THREE from "three";

export const createCannonShape = (mesh, geometry) => {
  if (!geometry || !mesh) {
    console.error("Invalid geometry or mesh.");
    return null;
  }
  let vertices = geometry.attributes.position.array;
  let numVertices = vertices.length / 3;

  // Create an array to store the vertex positions
  var positions = [];
  for (var i = 0; i < numVertices; i++) {
    var x = vertices[i * 3];
    var y = vertices[i * 3 + 1];
    var z = vertices[i * 3 + 2];

    // Transform the vertex position based on the mesh's world matrix
    var position = new THREE.Vector3(x, y, z);
    position.applyMatrix4(mesh.matrixWorld);

    // Convert the position to Cannon.js format
    var cannonPosition = new CANNON.Vec3(position.x, position.y, position.z);
    positions.push(cannonPosition);
  }
  // Create a convex hull shape using the vertex positions
  var shape = new CANNON.Sphere(position);
  return shape;
};
