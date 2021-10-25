export class Node<T> {
	constructor(public element: T, public next?: Node<T>) {}
	toString(): string {
		return `${this.element} => ${this.next?.element}`;
	}
}

export class DoublyNode<T> extends Node<T> {}
