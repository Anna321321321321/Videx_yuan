import { ServerError } from 'videx/server/core/error';
import { IUser, UserModel } from 'videx/server/entities';

const teacher = 1;

export default async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { type } = req.body;
    if (!userId || type !== teacher) {
      return next(new ServerError(400, new Error('Bad Request')));
    }
    const user: IUser = await UserModel.findById(userId);
    if (!user) {
      return next(new ServerError(404, new Error('Not Found')));
    }
    if (user.isGlobalAdministrator()) {
      return next(new ServerError(403, new Error('Forbidden')));
    }
    // user type 1 is for teacher
    await user.setType(teacher);
    res.status(200);
    res.json({ id: user.getId() });
    return;
  } catch (e) {
    return next(new ServerError(500, e));
  }
};
