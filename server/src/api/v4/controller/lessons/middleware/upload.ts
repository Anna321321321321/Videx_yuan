import * as fse from 'fs-extra';
import * as multer from 'multer';
import { ServerError } from 'videx/server/core/error';

export default (req, res, next) => {
  multer({ dest: '/app/tmp/' }).single('file')(req, res, e => {
    if (e) {
      return next(new ServerError(500, e));
    }
    if (!req.file) {
      return next(new ServerError(400, new Error('Bad Request')));
    }
    // remove file in the end
    res.on('finish', async () => {
      try {
        await fse.remove(req.file.path);
      } catch (e) {
        return next(new ServerError(500, e));
      }
    });
    return next();
  });
};
