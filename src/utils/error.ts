export class ViperError extends Error {
	public name: string;
	public constructor(public message: string) {
		super(message);
		this.name = new.target.prototype.constructor.name;
	}
}
