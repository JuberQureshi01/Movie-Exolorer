import axios from '../../utils/axios';
import { loadmovie, setMovieError } from '../reducers/movieSlice';
export { removemovie } from '../reducers/movieSlice';

export const asyncloadmovie = (id) => async (dispatch) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalids = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

    let theultimatedetails = {
      detail: detail.data,
      externalids: externalids.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type == 'Trailer'),
      watchproviders: watchproviders.data.results.IN,
    };
    dispatch(loadmovie(theultimatedetails));
  } catch (error) {
    console.log('Movie Details Error:', error);
    dispatch(setMovieError(error.message || 'Failed to load movie details.'));
  }
};

export default asyncloadmovie;
