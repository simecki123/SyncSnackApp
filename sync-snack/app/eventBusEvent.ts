
// Not ready yet...
const eventBusEvent = {
    on(event: string, callback: EventListenerOrEventListenerObject){
        document.addEventListener(event, callback);
    },
    dispatch(event: string) {
        document.dispatchEvent(new CustomEvent(event))
    },
    remove(event: string, callback: EventListenerOrEventListenerObject) {
        document.removeEventListener(event, callback);
    },
};

export default eventBusEvent;