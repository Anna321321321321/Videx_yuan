import { TColorHex, TColorString } from '../types';
import { hex2color } from './constants';

export default (hex: TColorHex): TColorString => hex2color[hex];
