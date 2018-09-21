'use strict';

(function () {
  var RANGE_WIDTH = 176;
  var RANGE_LEFT_BORDER = 22;
  var KEYCODE_LEFT = 37;
  var KEYCODE_RIGHT = 39;
  var RANGE_SCROLL_STEP = 5;

  var rangeLeft = document.querySelector('.runner-left');
  var rangeRight = document.querySelector('.runner-right');

  var mouseDownHandler = function (element, boolean, callback) {
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
        } else if (leftPosition > RANGE_WIDTH) {
          element.style.left = RANGE_WIDTH + 'px';
        } else {
          element.style.left = leftPosition + 'px';
        }

        callback(boolean, leftPosition);
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

  var keyDownHandler = function (element, boolean, callback) {
    return function(downEvt) {
      var leftPosition;
      if (downEvt.keyCode === KEYCODE_LEFT) {
        leftPosition = element.offsetLeft - RANGE_SCROLL_STEP;
        if (leftPosition < RANGE_LEFT_BORDER) {
          element.style.left = RANGE_LEFT_BORDER + 'px';
        } else {
          element.style.left = leftPosition + 'px';
        }
        callback(boolean, leftPosition);
      } else if (downEvt.keyCode === KEYCODE_RIGHT) {
        leftPosition = element.offsetLeft + RANGE_SCROLL_STEP;
        if (leftPosition > RANGE_WIDTH) {
          element.style.left = RANGE_WIDTH + 'px';
        } else {
          element.style.left = leftPosition + 'px';
        }
        callback(boolean, leftPosition);
      }
    };
  };

  var touchStartHandler = function(element, boolean, callback) {
    return function(startTouchEvt) {
      startTouchEvt.preventDefault();

      var startCoordX = startTouchEvt.changedTouches[0].screenX;

      var touchMoveHandler = function(moveTouchEvt) {
        var shiftX = startCoordX - moveTouchEvt.changedTouches[0].screenX;

        startCoordX = moveTouchEvt.changedTouches[0].screenX;

        var leftPosition = element.offsetLeft - shiftX;

        if (leftPosition < RANGE_LEFT_BORDER) {
          element.style.left = RANGE_LEFT_BORDER + 'px';
        } else if (leftPosition > RANGE_WIDTH) {
          element.style.left = RANGE_WIDTH + 'px';
        } else {
          element.style.left = leftPosition + 'px';
        }

        callback(boolean, leftPosition);
      };

      var touchEndHandler = function(endTouchEvt) {
        endTouchEvt.preventDefault();

        document.removeEventListener('touchmove', touchMoveHandler);
        document.removeEventListener('touchend', touchEndHandler);
      };

      document.addEventListener('touchmove', touchMoveHandler);
      document.addEventListener('touchend', touchEndHandler);
    };
  };

  rangeLeft.addEventListener('mousedown', mouseDownHandler(rangeLeft, true, window.ranges.applyRange));
  rangeRight.addEventListener('mousedown', mouseDownHandler(rangeRight, false, window.ranges.applyRange));

  rangeLeft.addEventListener('touchstart', touchStartHandler(rangeLeft, true, window.ranges.applyRange));
  rangeRight.addEventListener('touchstart', touchStartHandler(rangeRight, false, window.ranges.applyRange));

  rangeLeft.addEventListener('focus', function () {
    rangeLeft.addEventListener('keydown', keyDownHandler(rangeLeft, true, window.ranges.applyRange));
  });
  rangeRight.addEventListener('focus', function () {
    rangeRight.addEventListener('keydown', keyDownHandler(rangeRight, false, window.ranges.applyRange));
  });

  rangeLeft.addEventListener('focusout', function () {
    rangeLeft.removeEventListener('keydown', keyDownHandler);
  });
  rangeRight.addEventListener('focusout', function () {
    rangeRight.removeEventListener('keydown', keyDownHandler);
  });
})();
