import formatMode from '../util/formatMode.js';
import binsearch from '../util/binsearch.js';

var properties = [
  // meta
  'mode', 'time',
  // both engine
  'text', 'render',
  // DOM engine
  'style',
  // canvas engine
  'canvasStyle'
];

/* eslint-disable no-invalid-this */
export default function(obj) {
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
    return this;
  }
  var cmt = {};
  for (var i = 0; i < properties.length; i++) {
    if (obj[properties[i]] !== undefined) {
      cmt[properties[i]] = obj[properties[i]];
    }
  }
  cmt.text = (cmt.text || '').toString();
  cmt.mode = formatMode(cmt.mode);
  cmt._utc = Date.now() / 1000;
  if (this.media) {
    var position = 0;
    if (cmt.time === undefined) {
      cmt.time = this.media.currentTime;
      position = this._.position;
    } else {
      position = binsearch(this.comments, 'time', cmt.time);
      if (position < this._.position) {
        this._.position += 1;
      }
    }
    this.comments.splice(position, 0, cmt);
  } else {
    this.comments.push(cmt);
  }
  return this;
}
