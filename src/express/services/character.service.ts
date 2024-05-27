import * as characterApi from '../../api/character.api';
import Character from '../../types/character.type';
import FilterCharacterParams from '../../types/filterCharacterParams.type';

export const getCharacter = async (characterId: string) => {
    const character = await characterApi.getCharacter(characterId);
    return character;
};

export const getAllCharacters = async (pageNumber: string) => {
    const characters = await characterApi.getAllCharacter(pageNumber);
    return characters;
};

export const getAllCharactersWithFilter = async (FilterCharacterParams: FilterCharacterParams): Promise<Character[] | null> => {
    const characters = await characterApi.getAllCharacterWithFilter(FilterCharacterParams);
    return characters;
};
