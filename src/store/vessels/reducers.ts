import { SET_VESSEL_LIST, VesselActionTypes, VesselState } from './types';

const initialState: VesselState = {
  vessels: []
};

export function vesselReducer(
  state = initialState,
  action: VesselActionTypes
): VesselState {
  switch (action.type) {
    case SET_VESSEL_LIST:
      return {
        ...state, vessels: action.payload
      };
    default:
      return state;
  }
}