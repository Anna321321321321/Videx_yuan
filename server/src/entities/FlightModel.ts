import * as crypto from 'crypto';
import { IFlightSchema, Mongoose } from 'videx/server/mongodb';
import IFlight from './IFlight';

export default class FlightModel implements IFlight {
  private document_: IFlightSchema;

  constructor(document) {
    this.document_ = document;
  }

  public getExperimentId(): string {
    return this.document_.experimentId;
  }

  public getTreatementId(): string {
    return this.document_.treatmentId;
  }

  private static getId(userId: string, courseId: string) {
    return crypto
      .createHash('sha256')
      .update(userId + courseId)
      .digest('hex');
  }

  public static async find(userId: string): Promise<FlightModel[]> {
    const documents = await Mongoose.find('Flight', { userId });
    return documents.map(document => new FlightModel(document));
  }

  public static async remove(filter: object): Promise<void> {
    await Mongoose.remove('Flight', filter);
  }

  public static async findById(
    userId: string,
    experimentId: string
  ): Promise<FlightModel> {
    const document = await Mongoose.findById(
      'Flight',
      FlightModel.getId(userId, experimentId)
    );
    return document ? new FlightModel(document) : null;
  }

  public static async create(
    userId: string,
    experimentId: string,
    treatmentId: string
  ): Promise<FlightModel> {
    await Mongoose.create('Flight', <IFlightSchema>{
      _id: FlightModel.getId(userId, experimentId),
      experimentId: experimentId,
      userId: userId,
      treatmentId: treatmentId
    });
    return await FlightModel.findById(userId, experimentId);
  }

  public async remove(): Promise<void> {
    await Mongoose.findByIdAndRemove('Flight', this.document_._id);
  }

  public static async findByIdAndRemove(
    userId: string,
    experimentId: string
  ): Promise<void> {
    await Mongoose.findByIdAndRemove(
      'Flight',
      FlightModel.getId(userId, experimentId)
    );
  }
}
