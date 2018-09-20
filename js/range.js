'use strict';

var RANGE_WIDTH = 176;
var RANGE_LEFT_BORDER = 22;
var PIN_WIDTH = 20;
var MIN_RANGE = 100;
var MAX_RANGE = 500;
var RANGE_STEP = 2.6;

var rangeLeftInput = document.querySelector('.range-left');
var rangeRightInput = document.querySelector('.range-right');
var rangeLeft = document.querySelector('.runner-left');
var rangeRight = document.querySelector('.runner-right');
var rangeLine = document.querySelector('.range-line-selected');

rangeLeft.addEventListener('mousedown', function(evt) {
  evt.preventDefault();

  var startCoordX = evt.clientX;

  var mouseMoveHandler = function(moveEvt) {
    moveEvt.preventDefault();

    var shiftX = startCoordX - moveEvt.clientX;

    startCoordX = moveEvt.clientX;

    if (rangeLeft.offsetLeft - shiftX < RANGE_LEFT_BORDER) {
      rangeLeft.style.left = RANGE_LEFT_BORDER + 'px';
      rangeLine.style.left = RANGE_LEFT_BORDER + 'px';
      rangeLeftInput.value = MIN_RANGE;
    } else if (rangeLeft.offsetLeft - shiftX > RANGE_WIDTH) {
      rangeLeft.style.left = RANGE_WIDTH + 'px';
      rangeLine.style.left = RANGE_WIDTH + 'px';
      rangeLeftInput.value = MAX_RANGE;
    } else {
      rangeLeft.style.left = (rangeLeft.offsetLeft - shiftX) + 'px';
      rangeLine.style.left = (rangeLeft.offsetLeft - shiftX) + 'px';
      rangeLeftInput.value = MIN_RANGE + Math.round(((rangeLeft.offsetLeft - shiftX - RANGE_LEFT_BORDER) * RANGE_STEP));
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
      rangeLine.style.right = RANGE_WIDTH + 'px';
      rangeRightInput.value = MIN_RANGE;
    } else if (rangeRight.offsetLeft - shiftX > RANGE_WIDTH) {
      rangeRight.style.left = RANGE_WIDTH + 'px';
      rangeLine.style.right = RANGE_LEFT_BORDER + 'px';
      rangeRightInput.value = MAX_RANGE;
    } else {
      rangeRight.style.left = (rangeRight.offsetLeft - shiftX) + 'px';
      rangeLine.style.right = (RANGE_WIDTH - (rangeRight.offsetLeft - shiftX) + RANGE_LEFT_BORDER) + 'px';
      rangeRightInput.value = MAX_RANGE - Math.round(((RANGE_WIDTH - rangeRight.offsetLeft - shiftX) * RANGE_STEP));
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
