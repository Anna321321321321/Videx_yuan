import { TColorHex, TColorRbg } from '../types';
import { hex2rgb } from './constants';

export default (color: TColorHex): TColorRbg => hex2rgb[color];
