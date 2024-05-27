import { Request, Response } from 'express';
import Location from '../../types/location.type';
import * as locationService from '../services/location.service';
import FilterLocationParams from '../../types/filterLocatinParams.type';

export const getLocation = async (req: Request, res: Response) => {
    const locationId = req.params.id;
    const location: Location | null = await locationService.getLocation(locationId);
    if (!location) res.status(404).send('location not found');
    else res.send(location);
};

export const getAllLocations = async (req: Request, res: Response) => {
    const pageNumber: string = req.query.page as string;
    const location: Location[] | null = await locationService.getAllLocations(pageNumber);
    if (!location) res.status(404).send({ error: 'fail to get all locations' });
    else res.send(location);
};

export const getAllLocationsWithFilter = async (req: Request, res: Response) => {
    const FilterLocationParams: FilterLocationParams = {};

    if (req.query.name) FilterLocationParams.name = req.query.name as string;
    if (req.query.type) FilterLocationParams.type = req.query.type as string;
    if (req.query.dimension) FilterLocationParams.dimension = req.query.dimension as string;

    try {
        const locations = await locationService.getAllLocationsWithFilter(FilterLocationParams);
        if (!locations) {
            res.status(404).send({ error: 'Failed to get all locations' });
        } else {
            res.send(locations);
        }
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching locations' });
    }
};
