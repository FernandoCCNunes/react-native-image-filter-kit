import {
  color,
  colorVector,
  scalarVector,
  position,
  distance,
  text,
  scalar
} from '../common/inputs'
import { Generator } from '../common/shapes'
import { Position } from '../common/configs'

interface GradientConfig {
  readonly colors?: ReadonlyArray<string>
  readonly stops?: ReadonlyArray<number>
  readonly image: object
}

export interface LinearGradientConfig extends GradientConfig {
  readonly start?: Position
  readonly end?: Position
}

export interface RadialGradientConfig extends GradientConfig {
  readonly center?: Position
  readonly radius?: string
}

export interface SweepGradientConfig extends GradientConfig {
  readonly center?: Position
}

export interface TextImageConfig {
  readonly text: string
  readonly fontName?: string
  readonly fontSize?: string
  readonly image: object
  readonly color?: string
}

export interface CircleConfig {
  readonly radius?: string
  readonly color?: string
  readonly image: object
}

export interface OvalConfig {
  readonly radiusX?: string
  readonly radiusY?: string
  readonly rotation?: string
  readonly color?: string
  readonly image: object
}

export const shapes = {
  Color: {
    color: color,
    ...Generator
  },

  LinearGradient: {
    colors: colorVector,
    stops: scalarVector,
    start: position,
    end: position,
    ...Generator
  },

  RadialGradient: {
    colors: colorVector,
    stops: scalarVector,
    center: position,
    radius: distance,
    ...Generator
  },

  SweepGradient: {
    colors: colorVector,
    stops: scalarVector,
    center: position,
    ...Generator
  },

  TextImage: {
    text: text,
    fontName: text,
    fontSize: distance,
    color: color,
    ...Generator
  },

  Circle: {
    radius: distance,
    color: color,
    ...Generator
  },

  Oval: {
    radiusX: distance,
    radiusY: distance,
    rotation: scalar,
    color: color,
    ...Generator
  }
}
