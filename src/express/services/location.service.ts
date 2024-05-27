import * as locationApi from '../../api/location.api';
import Location from '../../types/location.type';
import FilterLocationParams from '../../types/filterLocatinParams.type';

export const getLocation = async (locationId: string): Promise<Location | null> => {
    const location = await locationApi.getLocation(locationId);
    return location;
};

export const getAllLocations = async (pageNumber: string): Promise<Location[] | null> => {
    const locations = await locationApi.getAllLocations(pageNumber);
    return locations;
};

export const getAllLocationsWithFilter = async (FilterLocationParams: FilterLocationParams): Promise<Location[] | null> => {
    const locations = await locationApi.getAllLocationsWithFilter(FilterLocationParams);
    return locations;
};
