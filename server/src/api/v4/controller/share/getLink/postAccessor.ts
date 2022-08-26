import { IShare, IUser, ShareModel } from 'videx/server/entities';
import { ServerError } from 'videx/server/core/error';

export default async (req, res, next) => {
  try {
    const user: string = res.locals.videx.user.toObject().name;
    const link = req.params.link;
    const share: IShare = await ShareModel.findOneByLink(link);
    if (!share) {
      return next(new ServerError(404, new Error('Not Found')));
    }
    await share.addAccessor(user);
    res.status(200);
    res.json(user);
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
