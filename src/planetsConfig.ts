import { Vector3 } from '@babylonjs/core'

interface IPlanetConfig {
  readonly path: string
  readonly position: Vector3
  readonly size: number
}

export const planetsConfig: IPlanetConfig[] = [
  {
    path: '/Planet_1.gltf',
    position: new Vector3(-10, 5, 0),
    size: 1,
  },
  {
    path: '/Planet_2.gltf',
    position: new Vector3(-2, -2, 0),
    size: 2,
  },
  {
    path: '/Planet_3.gltf',
    position: new Vector3(10, 5, 0),
    size: 0.5,
  },
]
