import axios from 'axios';
import logger from '../utils/logger';
import { SWAPI_BASE_URL } from '../utils/secrets';

const axiosInstance = axios.create({
  baseURL: SWAPI_BASE_URL,
});

export async function getSwapiFilmsAPI(film_index?: string): Promise<any> {
  try {
    const { data } = await axiosInstance.get(`/films/${film_index || ''}`);
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    logger.error(error.response.data);
    return {
      success: false,
      error: error.response.data.message,
    };
  }
}

export async function getSwapiCharactersAPI(people_index: string): Promise<any> {
  try {
    const { data } = await axiosInstance.get(`/people/${people_index}`);
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    logger.error(error.response.data);
    return {
      success: false,
      error: error.response.data.message,
    };
  }
}
