class Booking {
    constructor(show, date) {
        this._show = show;
        this._date = date;
    }
    _behost(extras) {
        this._host = new _Booking(this, extras);
    }
}

class _Booking {
    constructor(host, extras) {
        this.extends = host;
        this.extras = extras;
    }
}

let booking = new Booking([], new Date());
booking._behost({});
console.log(booking);
