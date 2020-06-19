export type TGetUserFlights = Array<{
  experimentId: string;
  treatmentId: string;
  settings: {
    name: string;
    value: string | boolean | number | object;
  }[];
}>;
