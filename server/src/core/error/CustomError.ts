export default interface CustomError {
  code: number;
  error: Error;
  properties: object;
}
