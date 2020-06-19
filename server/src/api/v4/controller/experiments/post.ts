import { ServerError } from 'videx/server/core/error';
import { ExperimentModel, IExperiment } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    const { name, treatments } = req.body;

    if (!ExperimentModel.validate(treatments)) {
      return next(new ServerError(400, new Error('Bad Request')));
    }
    const experiment: IExperiment = await ExperimentModel.create(
      name,
      treatments
    );

    res.status(200);
    res.json({ id: experiment.getId() });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
