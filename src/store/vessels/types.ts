export interface Geometry {
  type: string
  coordinates: number[]
}
export interface Properties {
  mmsi: number
  timestampExternal: number
}

export interface Feature {
  _id: string
  geometry: Geometry
  mmsi: number
  type: string
  properties: Properties
}

export interface Vessel {
  _id: string
  mmsi: number
  destination: string
  name: string
  features: Feature[]
}

export interface VesselState {
  vessels: Vessel[]
}

export const SET_VESSEL_LIST = 'SET_VESSEL_LIST';

interface SetVesselListAction {
  type: typeof SET_VESSEL_LIST
  payload: Vessel[]
}

export type VesselActionTypes = SetVesselListAction;