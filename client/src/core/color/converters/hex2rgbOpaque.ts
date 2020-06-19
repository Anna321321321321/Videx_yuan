import { TColorHex, TColorRbg } from '../types';
import { hex2rgbOpaque } from './constants';

export default (color: TColorHex): TColorRbg => hex2rgbOpaque[color];
