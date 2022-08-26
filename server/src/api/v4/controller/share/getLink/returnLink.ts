import { IShare, ShareModel } from 'videx/server/entities';
import { ServerError } from 'videx/server/core/error';

export default async (req, res, next) => {
  try {
    const link: string = req.params.link;
    const share: IShare = await ShareModel.findByLink(link);
    res.status(200);
    if (share !== null) {
      res.json(share[0]);
    } else {
      res.json(null);
    }
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
