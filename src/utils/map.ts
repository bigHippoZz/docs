import { Observable } from "./observable";

declare module "./observable" {
    interface Observable<T> {
        list: Array<T>;
        map<U>(f: (arg: T) => U): Observable<U>;
    }
}

Observable.prototype.map = function (f) {
    return this;
};
