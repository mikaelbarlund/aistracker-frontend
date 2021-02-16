import { Action } from 'redux';
import { setVesselList } from './actions';
import { RootState } from '../';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { Vessel } from './types';
const baseUrl = '/api/vessels';

export const thunkSetVesselList = (): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  const { data: vessels } = await axios.get<Vessel[]>(baseUrl);
  dispatch(setVesselList(vessels));
};