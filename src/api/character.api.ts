import axios from 'axios';
import Character from '../types/character.type';
import config from '../config';
import FilterCharacterParams from '../types/filterCharacterParams.type';

export const getCharacter = async (characterId: string): Promise<Character | null> => {
    console.log(`${config.rickAndMortyApi.baseUrl}character/${characterId}`);
    const character = await axios.get(`${config.rickAndMortyApi.baseUrl}character/${characterId}`);
    return character.data;
};

export const getAllCharacter = async (pageNumber: string): Promise<Character[] | null> => {
    const characters = await axios.get(`${config.rickAndMortyApi.baseUrl}character/?page=${pageNumber}`);
    return characters.data;
};

export const getAllCharacterWithFilter = async (FilterCharacterParams: FilterCharacterParams) => {
    const queryParams = new URLSearchParams();

    for (const [key, value] of Object.entries(FilterCharacterParams)) {
        if (value) {
            queryParams.append(key, value);
        }
    }
    const url = `${config.rickAndMortyApi.baseUrl}character/?${queryParams.toString()}`;
    const characters = await axios.get(url);
    return characters.data;
};
