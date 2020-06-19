import { ServerError } from 'videx/server/core/error';
import { ILink, LinkModel } from 'videx/server/entities';

export default async (req, res, next) => {
  try {
    // query will contain the id for the shorter url
    const token: string = req.params.token;

    // return error if parameter is empty
    if (!token) {
      return next(new ServerError(400, new Error('Bad Request')));
    }

    // search MongoDB by using the query id
    const link: ILink = await LinkModel.findByToken(token);
    if (!link) {
      return next(new ServerError(404, new Error('Not Found')));
    }

    res.status(200);
    res.json({ link: link.getLink() });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
