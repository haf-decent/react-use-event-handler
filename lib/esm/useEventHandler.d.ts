export default function useEventListener<E extends keyof HTMLElementEventMap>({ event, handler, target, options, enabled }: {
    event: E | string;
    handler: (e: HTMLElementEventMap[E] | CustomEvent) => void;
    target?: EventTarget | HTMLElement | Document | Window | null;
    options?: AddEventListenerOptions;
    enabled?: boolean;
}): void;
