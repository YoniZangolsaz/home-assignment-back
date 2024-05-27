import { Request, Response } from 'express';
import Episode from '../../types/episode.type';
import * as episodeService from '../services/episode.service';
import FilterEpisodeParama from '../../types/filterEpisodeParams.type';

export const getEpisode = async (req: Request, res: Response) => {
    const episodeId = req.params.id;
    const episode: Episode | null = await episodeService.getEpisode(episodeId);
    if (!episode) res.status(404).send('episode not found');
    else res.send(episode);
};

export const getAllEpisodes = async (req: Request, res: Response) => {
    const pageNumber: string = req.query.page as string;
    const episode: Episode[] | null = await episodeService.getAllEpisodes(pageNumber);
    if (!episode) res.status(404).send({ error: 'fail to get all episodes' });
    else res.send(episode);
};

export const getAllEpisodesWithFilter = async (req: Request, res: Response) => {
    const FilterEpisodeParama: FilterEpisodeParama = {};

    if (req.query.name) FilterEpisodeParama.name = req.query.name as string;
    if (req.query.episode) FilterEpisodeParama.episode = req.query.episode as string;

    try {
        const episodes = await episodeService.getAllEpisodesWithFilter(FilterEpisodeParama);
        if (!episodes) {
            res.status(404).send({ error: 'Failed to get all episodes' });
        } else {
            res.send(episodes);
        }
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching episodes' });
    }
};
