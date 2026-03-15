import G from 'gemini-loader';
import Hammer from 'hammerjs';

function hammerify(el, options) {
  var $el = G(el);
  if (!$el.data('hammer')) {
    $el.data('hammer', new Hammer($el[0], options));
  }
}

G.fn.hammer = function (options) {
  return this.each(function () {
    hammerify(this, options);
  });
};

// extend the emit method to also trigger jQuery events
Hammer.Manager.prototype.emit = (function (originalEmit) {
  return function (type, data) {
    originalEmit.call(this, type, data);
    G(this.element).trigger({
      type: type,
      gesture: data,
    });
  };
})(Hammer.Manager.prototype.emit);
