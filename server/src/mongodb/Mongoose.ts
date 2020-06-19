import * as mongoose from 'mongoose';
import log from 'videx/server/log';

type Model =
  | 'Course'
  | 'Consent'
  | 'Lesson'
  | 'User'
  | 'History'
  | 'Flight'
  | 'Link'
  | 'Annotation'
  | 'Experiment'
  | 'Reaction'
  | 'Playlist';

export default class Mongoose {
  public static async bulkWrite(model: Model, actions): Promise<void> {
    try {
      await Mongoose.getModel_(model).bulkWrite(actions);
      return;
    } catch (e) {
      log.exception(e, { model, actions });
      throw new Error('bulkWrite error');
    }
  }

  public static async create(model: Model, data: object): Promise<any> {
    await this.getModel_(model).create(data);
  }

  public static async find(
    model: Model,
    filter: object
  ): Promise<mongoose.Document[]> {
    return await this.getModel_(model).find(filter);
  }

  public static async findById(
    model: Model,
    id: string | number
  ): Promise<null | mongoose.Document> {
    const document = await this.getModel_(model).findById(id);
    return document;
  }

  public static async findByIdAndRemove(
    model: Model,
    id: string
  ): Promise<void> {
    try {
      await this.getModel_(model).findByIdAndRemove(id);
      return;
    } catch (e) {
      log.exception(e, { model, id });
      throw new Error('findByIdAndRemove error');
    }
  }

  public static async findByIdAndUpdate(
    model: Model,
    id: string,
    data: object,
    options: object = {}
  ): Promise<any> {
    try {
      const document = await this.getModel_(model).findByIdAndUpdate(id, data, {
        ...options,
        new: true,
        runValidators: true
      });
      return document;
    } catch (e) {
      log.exception(e, { model, id, data: JSON.stringify(data) });
      throw new Error('findByIdAndUpdate error');
    }
  }

  public static async findOneAndUpdate(
    model: Model,
    condition: object,
    data: object,
    options: object = {}
  ): Promise<any> {
    try {
      const document = await this.getModel_(model).findOneAndUpdate(
        condition,
        data,
        {
          ...options,
          runValidators: true
        }
      );
      return document;
    } catch (e) {
      log.exception(e, {
        model,
        condition: JSON.stringify(condition),
        data: JSON.stringify(data)
      });
      throw new Error('findOneAndUpdate error');
    }
  }

  public static async findOne(model: Model, condition: any): Promise<any> {
    try {
      const document = await this.getModel_(model).findOne(condition);
      return document;
    } catch (e) {
      log.exception(e, { model, condition });
      throw new Error('findOne error');
    }
  }

  private static getModel_(model: Model) {
    switch (model) {
      case 'Course':
        return mongoose.model('Course');
      case 'Consent':
        return mongoose.model('Consent');
      case 'Lesson':
        return mongoose.model('Lesson');
      case 'User':
        return mongoose.model('User');
      case 'History':
        return mongoose.model('History');
      case 'Flight':
        return mongoose.model('Flight');
      case 'Link':
        return mongoose.model('Link');
      case 'Annotation':
        return mongoose.model('Annotation');
      case 'Experiment':
        return mongoose.model('Experiment');
      case 'Reaction':
        return mongoose.model('Reaction');
      case 'Playlist':
        return mongoose.model('Playlist');
    }
  }

  public static async save(document: mongoose.Document): Promise<object> {
    try {
      await document.save();
      return;
    } catch (e) {
      log.exception(e, { document: document.toJSON() });
      throw new Error('save error');
    }
  }

  public static async update(
    model: Model,
    filter: object,
    command: object,
    options?: object
  ): Promise<void> {
    try {
      await this.getModel_(model).update(filter, command, {
        ...options,
        runValidators: true
      });
      return;
    } catch (e) {
      log.exception(e, {
        model,
        filter: JSON.stringify(filter),
        document: JSON.stringify(command)
      });
      throw new Error('update error');
    }
  }

  public static async remove(model: Model, filter: object): Promise<void> {
    await this.getModel_(model).remove(filter);
  }
}
