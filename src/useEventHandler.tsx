import { useEffect, useRef } from "react";

export default function useEventListener<E extends keyof HTMLElementEventMap>({
	event,
	handler,
	target = window || document,
	options = undefined,
	enabled = true
}: {
	event: E | string,
	handler: (e: HTMLElementEventMap[E] | CustomEvent) => void,
	target?: EventTarget | HTMLElement | Document | Window | null,
	options?: AddEventListenerOptions,
	enabled?: boolean
}) {
	const enabledRef = useRef(enabled);
	enabledRef.current = enabled;

	const cb = useRef(handler);
	cb.current = handler;

	useEffect(() => {
		if (!target) return;

		const oldEvent = event;
		const oldTarget = target;
		const oldOptions = options;

		const onEvent = (e: HTMLElementEventMap[E] | CustomEvent) => {
			if (!enabledRef.current) return;
			cb.current(e);
		}
		target.addEventListener(event, onEvent, options);

		return () => !!oldTarget && oldTarget.removeEventListener(oldEvent, onEvent, oldOptions);
	}, [ event, target, options ]);
}