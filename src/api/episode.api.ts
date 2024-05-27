import axios from 'axios';
import config from '../config';
import Episode from '../types/episode.type';
import FilterEpisodeParama from '../types/filterEpisodeParams.type';

export const getEpisode = async (episodeId: string): Promise<Episode | null> => {
    const response = await axios.get(`${config.rickAndMortyApi.baseUrl}/episode/${episodeId}`);
    return response.data;
};

export const getAllEpisodes = async (pageNumber: string): Promise<Episode[] | null> => {
    const response = await axios.get(`${config.rickAndMortyApi.baseUrl}/episode/?page=${pageNumber}`);
    return response.data;
};

export const getAllEpisodesWithFilter = async (FilterEpisodeParama: FilterEpisodeParama): Promise<Episode[] | null> => {
    const queryParams = new URLSearchParams();

    for (const [key, value] of Object.entries(FilterEpisodeParama)) {
        if (value) {
            queryParams.append(key, value);
        }
    }
    const url = `${config.rickAndMortyApi.baseUrl}/episode/?${queryParams.toString()}`;
    const response = await axios.get(url);
    return response.data;
};
