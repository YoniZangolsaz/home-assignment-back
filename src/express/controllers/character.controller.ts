import { Request, Response } from 'express';
import Character from '../../types/character.type';
import * as characterService from '../services/character.service';
import FilterCharacterParams from '../../types/filterCharacterParams.type';

export const getCharacter = async (req: Request, res: Response) => {
    const characterId = req.params.id;
    const character: Character | null = await characterService.getCharacter(characterId);
    if (!character) res.status(404).send('character not found');
    else res.send(character);
};

export const getAllCharacters = async (req: Request, res: Response) => {
    const pageNumber: string = req.query.page as string;
    const character: Character[] | null = await characterService.getAllCharacters(pageNumber);
    if (!character) res.status(404).send({ error: 'fail to get all characters' });
    else res.send(character);
};

export const getAllCharactersWithFilter = async (req: Request, res: Response) => {
    const FilterCharacterParams: FilterCharacterParams = {};

    if (req.query.name) FilterCharacterParams.name = req.query.name as string;
    if (req.query.status) FilterCharacterParams.status = req.query.status as string;
    if (req.query.species) FilterCharacterParams.species = req.query.species as string;
    if (req.query.type) FilterCharacterParams.type = req.query.type as string;
    if (req.query.gender) FilterCharacterParams.gender = req.query.gender as string;

    try {
        const characters = await characterService.getAllCharactersWithFilter(FilterCharacterParams);
        if (!characters) {
            res.status(404).send({ error: 'Failed to get all characters' });
        } else {
            res.send(characters);
        }
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching characters' });
    }
};
