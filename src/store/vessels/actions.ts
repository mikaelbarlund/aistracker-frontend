import { SET_VESSEL_LIST, Vessel, VesselActionTypes } from './types';

export function setVesselList(vessels:Vessel[]): VesselActionTypes {
  return {
    type: SET_VESSEL_LIST,
    payload: vessels
  };
}