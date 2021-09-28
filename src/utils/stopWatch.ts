export class StopWatch {
  protected _execution = window.performance;
  protected _startTime = -1;
  protected _runTime!: number;
  constructor() {}

  public stop() {
    this._startTime = this._now();
  }

  public elapsed() {
    if (this._startTime === -1) {
      throw new Error("StopWatch is not executed stop method");
    }
    this._runTime = this._now() - this._startTime;
    this._startTime = -1;
    return this._runTime;
  }
  get runTime(): number {
    return this._runTime;
  }
  protected _now(): number {
    return this._execution.now();
  }
}
