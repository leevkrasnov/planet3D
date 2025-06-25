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

export class babylonContainer {
  private planet: AbstractMesh | null = null
  private maxSize: number = 1

  constructor() {
    const canvas = document.createElement('canvas')

    canvas.id = 'game-canvas'
    document.body.appendChild(canvas)

    const engine = new Engine(canvas, true, { stencil: true }, true)
    const scene = new Scene(engine)

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

    ImportMeshAsync('/Planet.gltf', scene).then((result) => {
      const mesh = result.meshes[1]

      this.planet = mesh
      this.planet.rotationQuaternion = null
      this.planet.rotation.x = Math.PI / 4
      this.planet.rotation.y = Math.PI / 6
      this.planet.scaling.x = 1

      const bbox = mesh.getBoundingInfo().boundingBox
      const size = bbox.extendSize.scale(2)
      console.log(size)
      this.maxSize = Math.max(size.x, size.y, size.z)
    })

    engine.runRenderLoop(() => {
      if (this.planet) {
        this.planet.rotation.y += 0.002

        const distance = Vector3.Distance(camera.position, this.planet.position)

        this.planet.isVisible = distance <= this.maxSize * 10
      }
      scene.render()
    })
  }
}
