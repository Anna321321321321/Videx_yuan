import * as config from 'config';
import * as cors from 'cors';

export const corsOptions = cors({
  origin: `${config.get('SERVER.URL')}`,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
});
