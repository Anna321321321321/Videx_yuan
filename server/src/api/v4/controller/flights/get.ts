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
    const user: IUser = res.locals.videx.user;
    // if user is not student, we will return an empty array
    if (!user.isStudent()) {
      res.status(200);
      res.json([]);
      return;
    }
    const experimentIds: string[] = [];

    const experiments: IExperiment[] = await ExperimentModel.find({});
    const result = await Promise.all(
      experiments.map(async experiment => {
        experimentIds.push(experiment.getId());
        const flight: IFlight = await FlightModel.findById(
          user.getId(),
          experiment.getId()
        );
        if (!flight) {
          const treatmentId = experiment.assign();
          await FlightModel.create(
            user.getId(),
            experiment.getId(),
            treatmentId
          );
          return experiment.payload(treatmentId);
        } else {
          return experiment.payload(flight.getTreatementId());
        }
      })
    );
    await FlightModel.remove({ experimentId: { $nin: experimentIds } });

    res.status(200);
    res.json(result);
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
