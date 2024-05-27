import axios from 'axios';
import Location from '../types/location.type';
import config from '../config';
import FilterLocationParams from '../types/filterLocatinParams.type';

export const getLocation = async (locationId: string): Promise<Location | null> => {
    try {
        const response = await axios.get(`${config.rickAndMortyApi.baseUrl}/location/${locationId}`);
        return response.data;
    } catch (error) {
        return null;
    }
};

export const getAllLocations = async (pageNumber: string): Promise<Location[] | null> => {
    try {
        const response = await axios.get(`${config.rickAndMortyApi.baseUrl}/location/?page=${pageNumber}`);
        return response.data;
    } catch (error) {
        return null;
    }
};

export const getAllLocationsWithFilter = async (FilterLocationParams: FilterLocationParams): Promise<Location[] | null> => {
    try {
        const queryParams = new URLSearchParams();

        for (const [key, value] of Object.entries(FilterLocationParams)) {
            if (value) {
                queryParams.append(key, value);
            }
        }
        const url = `${config.rickAndMortyApi.baseUrl}/location/?${queryParams.toString()}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return null;
    }
};
