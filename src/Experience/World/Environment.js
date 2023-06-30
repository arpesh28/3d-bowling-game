//  libs
import * as THREE from "three";
import { GroundProjectedSkybox } from "three/addons/objects/GroundProjectedSkybox.js";

//  custom classes
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.helpers = this.experience.helpers;
    this.resources = this.experience.resources;
    this.resource = this.resources.items.bowling_alley;
    this.gui = this.experience.gui.dat;
    this.debugFolderEnvironment = this.gui.addFolder("Environment");

    this.setEnvironmentMap();
    this.setLight();
    this.setModel();
    this.setDebug();
  }
  setLight() {
    this.debugFolderLights = this.gui.addFolder("Lights");
    this.setSunlight();
    this.setSpotLight();
  }
  setSunlight() {
    this.sunlight = new THREE.DirectionalLight("#ffffff", 4);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.camera.far = 150;
    this.sunlight.shadow.mapSize.set(1024, 1024);
    this.sunlight.shadow.normalBias = 0.05;
    this.sunlight.position.set(-25, 43, 100);
    this.scene.add(this.sunlight);
    this.helpers.setLightHelper("sunlightHelper", this.sunlight);
  }
  setSpotLight() {
    this.spotLight = new THREE.SpotLight(
      0x78ff00,
      54.5,
      57.4,
      Math.PI * 0.1,
      10,
      10
    );
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.set(1024, 1024);
    // this.scene.add(this.spotLight);
    this.helpers.setLightHelper("spotLightHelper", this.spotLight);
  }
  setDebug() {
    this.debugFolderEnvironment.add(this.model.position, "x", -100, 100, 0.1);
    this.debugFolderEnvironment.add(this.model.position, "y", -100, 100, 0.1);
    this.debugFolderEnvironment.add(this.model.position, "z", -100, 100, 0.1);
    this.debugFolderLights
      .add(this.sunlight.shadow.camera, "far", -500, 500, 1)
      .name("Sunlight Far");
    this.debugFolderLights
      .add(this.sunlight.position, "x", -100, 100, 0.1)
      .name("sunlightX");
    this.debugFolderLights
      .add(this.sunlight.position, "y", -100, 100, 0.1)
      .name("sunlightY");
    this.debugFolderLights
      .add(this.sunlight.position, "z", -100, 100, 0.1)
      .name("sunlightZ");
    this.debugFolderLights
      .add(this.spotLight.position, "x", -100, 100, 0.1)
      .name("spotLightX");
    this.debugFolderLights
      .add(this.spotLight.position, "y", -100, 100, 0.1)
      .name("spotLightY");
    this.debugFolderLights
      .add(this.spotLight.position, "z", -100, 100, 0.1)
      .name("spotLightZ");
    this.debugFolderLights
      .add(this.spotLight, "intensity", 1, 1000, 0.1)
      .name("Spotlight Intensity");
    this.debugFolderLights
      .add(this.spotLight, "distance", 1, 100, 0.1)
      .name("Spotlight Distance");
    this.debugFolderLights
      .add(this.spotLight, "angle", -Math.PI * 2, Math.PI * 2, 0.1)
      .name("Spotlight Angle");
  }
  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 0.3;
    this.environmentMap.texture = this.resources.items.stadiumMap;
    this.environmentMap.texture.mapping =
      THREE.EquirectangularReflectionMapping;
    this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;
    this.scene.environment = this.environmentMap.texture;

    this.setEnvironmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child.isMesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap?.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.setEnvironmentMap.updateMaterials();
  }

  setModel() {
    this.model = this.resource.scene;
    // this.scene.environment = this.model;
    this.model.position.set(15.3, 5.7, 58.7);
    this.model.scale.set(3, 3, 3);
    this.scene.add(this.model);
  }
}
