import Observer from '^/library/observer';

class Subject {
  observers: Observer[];

  constructor() {
    this.observers = [];
  }

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer) {
    const removeIndex = this.observers.findIndex((obs: Observer) => {
      return observer === obs;
    });

    if (removeIndex !== -1) {
      this.observers = this.observers.slice(removeIndex, 1);
    }
  }

  notify(data: unknown) {
    if (this.observers.length > 0) {
      this.observers.forEach((observer: Observer) => observer.update(data));
    }
  }
}

export default Subject;
