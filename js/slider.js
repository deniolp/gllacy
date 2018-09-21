'use strict';

(function () {
  var RANGE_WIDTH = 176;
  var RANGE_LEFT_BORDER = 22;

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

  rangeLeft.addEventListener('mousedown', mouseDownHandler(rangeLeft, true, window.ranges.applyRange));
  rangeRight.addEventListener('mousedown', mouseDownHandler(rangeRight, false, window.ranges.applyRange));
})();
