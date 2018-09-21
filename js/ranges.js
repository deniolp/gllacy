'use strict';

(function () {
  var RANGE_WIDTH = 176;
  var RANGE_LEFT_BORDER = 22;
  var PIN_WIDTH = 20;
  var MIN_RANGE = 100;
  var MAX_RANGE = 500;
  var RANGE_STEP = 2.6;

  var rangeLeft = document.querySelector('.runner-left');
  var rangeRight = document.querySelector('.runner-right');
  var rangeLine = document.querySelector('.range-line-selected');
  var rangeLeftInput = document.querySelector('.range-left');
  var rangeRightInput = document.querySelector('.range-right');

  var applyRange = function(boolean, position) {
    if (boolean) {
      if (position < RANGE_LEFT_BORDER) {
        rangeLine.style.left = RANGE_LEFT_BORDER + 'px';
        rangeLeftInput.value = MIN_RANGE;
      } else if (position > RANGE_WIDTH) {
        rangeLine.style.left = RANGE_WIDTH + 'px';
        rangeLeftInput.value = MAX_RANGE;
      } else {
        rangeLine.style.left = position + 'px';
        rangeLeftInput.value = MIN_RANGE + Math.round((position - RANGE_LEFT_BORDER) * RANGE_STEP);
      }
    } else {
      if (position < RANGE_LEFT_BORDER) {
        rangeLine.style.right = RANGE_WIDTH + 'px';
        rangeRightInput.value = MIN_RANGE;
      } else if (position > RANGE_WIDTH) {
        rangeLine.style.right = RANGE_LEFT_BORDER + 'px';
        rangeRightInput.value = MAX_RANGE;
      } else {
        rangeLine.style.right = (RANGE_WIDTH - position + RANGE_LEFT_BORDER) + 'px';
        rangeRightInput.value = MAX_RANGE - Math.round((RANGE_WIDTH - position) * RANGE_STEP);
      }
    }
  };

  var makeBorders = function(boolean, position) {
    if (boolean) {
      if (position + PIN_WIDTH >= rangeRight.offsetLeft) {
        rangeLeft.style.left = rangeRight.offsetLeft - PIN_WIDTH + 'px';
      }
    } else {
      if (position - PIN_WIDTH <= rangeLeft.offsetLeft) {
        rangeRight.style.left = rangeLeft.offsetLeft + PIN_WIDTH + 'px';
      }
    }
  };

  var mouseDownHandler = function(element, boolean) {
    return function(downEvt) {
      downEvt.preventDefault();

      var startCoordX = downEvt.clientX;

      var mouseMoveHandler = function(moveEvt) {
        moveEvt.preventDefault();

        var shiftX = startCoordX - moveEvt.clientX;

        startCoordX = moveEvt.clientX;

        var leftPosition = element.offsetLeft - shiftX;

        if (leftPosition < RANGE_LEFT_BORDER) {
          element.style.left = RANGE_LEFT_BORDER + 'px';
          applyRange(boolean, leftPosition);
        } else if (leftPosition > RANGE_WIDTH) {
          element.style.left = RANGE_WIDTH + 'px';
          applyRange(boolean, leftPosition);
        } else {
          element.style.left = leftPosition + 'px';
          applyRange(boolean, leftPosition);
        }

        makeBorders(boolean, leftPosition);
      };

      var mouseUpHandler = function(upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };
  };

  rangeLeft.addEventListener('mousedown', mouseDownHandler(rangeLeft, true));
  rangeRight.addEventListener('mousedown', mouseDownHandler(rangeRight, false));

})();
