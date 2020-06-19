import { ServerError } from 'videx/server/core/error';
import {
  ExperimentModel,
  FlightModel,
  IExperiment,
  IFlight,
  IUser,
  UserModel
} from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const experimentId = req.params.experimentId;

    const document: IExperiment = await ExperimentModel.findById(experimentId);
    if (!document) {
      return next(new ServerError(404, new Error('Not Found')));
    }

    await FlightModel.remove({ experimentId });
    await document.remove();

    res.status(200);
    res.json({ id: experimentId });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
