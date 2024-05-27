import Episode from '../../types/episode.type';
import * as episodeApi from '../../api/episode.api';
import FilterEpisodeParama from '../../types/filterEpisodeParams.type';

export const getEpisode = async (episodeId: string): Promise<Episode | null> => {
    const episode = await episodeApi.getEpisode(episodeId);
    return episode;
};

export const getAllEpisodes = async (pageNumber: string): Promise<Episode[] | null> => {
    const episodes = await episodeApi.getAllEpisodes(pageNumber);
    return episodes;
};

export const getAllEpisodesWithFilter = async (FilterEpisodeParama: FilterEpisodeParama): Promise<Episode[] | null> => {
    const episodes = await episodeApi.getAllEpisodesWithFilter(FilterEpisodeParama);
    return episodes;
};
