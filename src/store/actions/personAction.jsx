import axios from '../../utils/axios';
import { loadperson, setPersonError } from '../reducers/personSlice';
export { removeperson } from '../reducers/personSlice';

export const asyncloadperson = (id) => async (dispatch) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalids = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);

    let theultimatedetails = {
      detail: detail.data,
      externalids: externalids.data,
      combinedCredits: combinedCredits.data,
    };
    dispatch(loadperson(theultimatedetails));
  } catch (error) {
    console.log('Person Details Error:', error);
    dispatch(setPersonError(error.message || 'Failed to load person details.'));
  }
};

export default asyncloadperson;
