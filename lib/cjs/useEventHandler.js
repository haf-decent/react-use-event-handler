"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useEventListener(_a) {
    var event = _a.event, handler = _a.handler, _b = _a.target, target = _b === void 0 ? window || document : _b, _c = _a.options, options = _c === void 0 ? undefined : _c, _d = _a.enabled, enabled = _d === void 0 ? true : _d;
    var enabledRef = (0, react_1.useRef)(enabled);
    enabledRef.current = enabled;
    var cb = (0, react_1.useRef)(handler);
    cb.current = handler;
    (0, react_1.useEffect)(function () {
        if (!target)
            return;
        var oldEvent = event;
        var oldTarget = target;
        var oldOptions = options;
        var onEvent = function (e) {
            if (!enabledRef.current)
                return;
            cb.current(e);
        };
        target.addEventListener(event, onEvent, options);
        return function () { return !!oldTarget && oldTarget.removeEventListener(oldEvent, onEvent, oldOptions); };
    }, [event, target, options]);
}
exports.default = useEventListener;
