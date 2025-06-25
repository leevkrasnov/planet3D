import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import '@babylonjs/loaders/glTF'
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  ImportMeshAsync,
  AbstractMesh,
} from '@babylonjs/core'

import { planetsConfig } from './planetsConfig'

export class babylonContainer {
  private planets: { mesh: AbstractMesh; maxSize: number }[] = []

  constructor() {
    const canvas = document.createElement('canvas')

    canvas.id = 'game-canvas'
    document.body.appendChild(canvas)

    const engine = new Engine(canvas, true, { stencil: true }, true)
    const scene = new Scene(engine)

    scene.fogMode = Scene.FOGMODE_LINEAR
    scene.fogStart = 30.0
    scene.fogEnd = 80.0

    const camera: ArcRotateCamera = new ArcRotateCamera(
      'Camera',
      Math.PI / 2,
      Math.PI / 2,
      20,
      Vector3.Zero(),
      scene
    )
    camera.attachControl(canvas, true)
    camera.minZ = 0.01

    new HemisphericLight('light1', new Vector3(1, 1, 0), scene)

    Promise.all(
      planetsConfig.map((planet) =>
        ImportMeshAsync(planet.path, scene).then((result) => {
          const mesh = result.meshes[1]

          mesh.position = planet.position
          mesh.rotationQuaternion = null
          mesh.rotation.x = Math.PI / 4
          mesh.rotation.y = Math.PI / 6
          mesh.scaling.setAll(planet.size)

          const bbox = mesh.getBoundingInfo().boundingBox
          const size = bbox.extendSize.scale(2)
          const maxSize = Math.max(size.x, size.y, size.z) * planet.size
          return { mesh, maxSize }
        })
      )
    ).then((planets) => {
      this.planets = planets
    })

    engine.runRenderLoop(() => {
      if (this.planets) {
        this.planets.forEach((planet) => {
          planet.mesh.rotation.y += 0.002
          const distance = Vector3.Distance(
            camera.position,
            planet.mesh.position
          )
          planet.mesh.isVisible = distance <= planet.maxSize * 10
        })
      }
      scene.render()
    })
  }
}
