'use strict';

var RANGE_WIDTH = 176;
var RANGE_LEFT_BORDER = 22;
var PIN_WIDTH = 20;

var rangeLeftInput = document.querySelector('.range-left');
var rangeRightInput = document.querySelector('.range-right');
var rangeLeft = document.querySelector('.runner-left');
var rangeRight = document.querySelector('.runner-right');

rangeLeft.addEventListener('mousedown', function(evt) {
  evt.preventDefault();

  var startCoordX = evt.clientX;

  var mouseMoveHandler = function(moveEvt) {
    moveEvt.preventDefault();

    var shiftX = startCoordX - moveEvt.clientX;

    startCoordX = moveEvt.clientX;

    if (rangeLeft.offsetLeft - shiftX < RANGE_LEFT_BORDER) {
      rangeLeft.style.left = RANGE_LEFT_BORDER + 'px';
    } else if (rangeLeft.offsetLeft - shiftX > RANGE_WIDTH) {
      rangeLeft.style.left = RANGE_WIDTH + 'px';
    } else {
      rangeLeft.style.left = (rangeLeft.offsetLeft - shiftX) + 'px';
    }

    if (rangeLeft.offsetLeft - shiftX + PIN_WIDTH >= rangeRight.offsetLeft - shiftX) {
      rangeLeft.style.left = rangeRight.offsetLeft - shiftX - PIN_WIDTH + 'px';
    }
  };

  var mouseUpHandler = function(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
});

rangeRight.addEventListener('mousedown', function(evt) {
  evt.preventDefault();

  var startCoordX = evt.clientX;

  var mouseMoveHandler = function(moveEvt) {
    moveEvt.preventDefault();

    var shiftX = startCoordX - moveEvt.clientX;

    startCoordX = moveEvt.clientX;

    if (rangeRight.offsetLeft - shiftX < RANGE_LEFT_BORDER) {
      rangeRight.style.left = RANGE_LEFT_BORDER + 'px';
    } else if (rangeRight.offsetLeft - shiftX > RANGE_WIDTH) {
      rangeRight.style.left = RANGE_WIDTH + 'px';
    } else {
      rangeRight.style.left = (rangeRight.offsetLeft - shiftX) + 'px';
    }

    if (rangeRight.offsetLeft - shiftX - PIN_WIDTH <= rangeLeft.offsetLeft - shiftX) {
      rangeRight.style.left = rangeLeft.offsetLeft - shiftX + PIN_WIDTH + 'px';
    }
  };

  var mouseUpHandler = function(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
});
