'use strict';

exports.getTimeSecond = function getTimeSecond(date) {
  return Math.floor(date.getTime() / 1000);
};
