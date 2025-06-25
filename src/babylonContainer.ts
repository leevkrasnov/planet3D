import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import '@babylonjs/loaders/glTF'
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
} from '@babylonjs/core'

export class babylonContainer {
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
      2,
      Vector3.Zero(),
      scene
    )
    camera.attachControl(canvas, true)

    new HemisphericLight('light1', new Vector3(1, 1, 0), scene)

    MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene)

    engine.runRenderLoop(() => {
      scene.render()
    })
  }
}
