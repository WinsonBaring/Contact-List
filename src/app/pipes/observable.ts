
interface Subject {}

class Observable implements Subject {
    constructor(private fn: Function) {}

    subscribe() {
        this.fn();
    }
}

const hello = () => {
    console.log('hello');
};

const obs = new Observable(hello);
obs.subscribe();


