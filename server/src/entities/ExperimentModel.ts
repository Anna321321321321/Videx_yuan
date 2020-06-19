import * as uuid from 'uuid';
import { IExperimentSchema, Mongoose } from 'videx/server/mongodb';
import IExperiment from './IExperiment';

export default class ExperimentModel implements IExperiment {
  private document_: IExperimentSchema;

  constructor(document) {
    this.document_ = document;
  }

  public getId(): string {
    return this.document_._id;
  }

  public assign(): string {
    const random = Math.random();
    let percentage = 0;
    let treatmentId = null;
    for (const treatement of this.document_.treatments) {
      if (random >= percentage && random < percentage + treatement.percentage) {
        treatmentId = treatement._id;
        break;
      }
      percentage += treatement.percentage;
    }
    return treatmentId;
  }

  public toObject(): { id: string; name: string } {
    return {
      id: this.document_._id,
      name: this.document_.name
    };
  }

  public static async find(filter: object): Promise<ExperimentModel[]> {
    const documents: IExperimentSchema[] = <IExperimentSchema[]>(
      await Mongoose.find('Experiment', filter)
    );
    return documents.map(document => new ExperimentModel(document));
  }

  public payload(
    treatmentId: string
  ): { experimentId: string; treatementId: string; settings: object } {
    return {
      experimentId: this.document_._id,
      treatementId: treatmentId,
      settings: this.document_.treatments.id(treatmentId).settings
    };
  }

  public static validate(treatments: any): boolean {
    let total = 0;
    if (!Array.isArray(treatments)) {
      return false;
    }
    // iterate through treatment
    for (const treatment of treatments) {
      // setting must be an array
      if (!Array.isArray(treatment.settings)) {
        return false;
      }
      for (const setting of treatment.settings) {
        if (!Object.keys(setting).every(e => ['value', 'name'].includes(e))) {
          return false;
        }
        if (typeof setting.name !== 'string') {
          return false;
        }
        switch (typeof setting.value) {
          case 'boolean':
            break;
          case 'number':
            break;
          case 'string':
            break;
          case 'object':
            if (Object.keys(setting.value).length === 0) {
              return false;
            }
            break;
          default:
            return false;
        }
      }
      if (typeof treatment.percentage !== 'number') {
        return false;
      }
      total += treatment.percentage;
    }
    if (total !== 1.0) {
      return false;
    }
    return true;
  }

  public static async findById(experimentId: string): Promise<ExperimentModel> {
    const document = await Mongoose.findById('Experiment', experimentId);
    return document ? new ExperimentModel(document) : null;
  }

  public static async create(
    name: string,
    treatments: {
      percentage: number;
      settings: { name: string; value: object | boolean | string | number }[];
    }[]
  ): Promise<ExperimentModel> {
    const id = uuid.v4();
    await Mongoose.create('Experiment', <IExperimentSchema>{
      _id: id,
      name: name,
      treatments: treatments.map(treatment => ({
        ...treatment,
        _id: uuid.v4()
      }))
    });
    return await ExperimentModel.findById(id);
  }

  public async remove(): Promise<void> {
    await Mongoose.findByIdAndRemove('Experiment', this.document_._id);
  }
}
