import { TColorHex, TColorRbg, TColorString } from '../types';

export const color2hex = {
  red: '#e32990' as TColorHex,
  yellow: '#fff110' as TColorHex,
  green: '#4cba35' as TColorHex,
  blue: '#28a3dc' as TColorHex,
  purple: '#9719ff' as TColorHex
};

export const hex2color = {
  '#e32990': 'red' as TColorString,
  '#28a3dc': 'blue' as TColorString,
  '#9719ff': 'purple' as TColorString,
  '#4cba35': 'green' as TColorString,
  '#fff110': 'yellow' as TColorString,
  '#ffffff': 'white' as TColorString
};

export const hex2rgb = {
  '#e32990': 'rgba(227,41,144,0.2)' as TColorRbg,
  '#28a3dc': 'rgba(40,163,220,0.2)' as TColorRbg,
  '#9719ff': 'rgba(151,25,255,0.2)' as TColorRbg,
  '#4cba35': 'rgba(76,186,53,0.2)' as TColorRbg,
  '#fff110': 'rgba(255,241,16,0.2)' as TColorRbg
};

export const hex2rgbOpaque = {
  '#e32990': 'rgba(227,41,144,0.8)' as TColorRbg,
  '#28a3dc': 'rgba(40,163,220,0.8)' as TColorRbg,
  '#9719ff': 'rgba(151,25,255,0.8)' as TColorRbg,
  '#4cba35': 'rgba(76,186,53,0.8)' as TColorRbg,
  '#fff110': 'rgba(255,241,16,0.8)' as TColorRbg
};
