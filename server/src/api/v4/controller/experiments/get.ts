import { ServerError } from 'videx/server/core/error';
import { ExperimentModel, IExperiment } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const experiments = await ExperimentModel.find({});
    res.status(200);
    res.json(experiments.map(experiment => experiment.toObject()));
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
