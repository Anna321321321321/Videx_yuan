import { TColorHex, TColorString } from '../types';
import { color2hex } from './constants';

export default (color: TColorString): TColorHex => color2hex[color];
