class Booking {
    constructor() {}
    extension() {
        return new enhanceBooking(this, {
            name: "liwuzhou",
        });
    }

    parseString(string) {
        try {
            return JSON.parse(string);
        } catch (error) {
            console.log(error);
        }
    }
}

class enhanceBooking {
    constructor(extend, params) {
        this._extend = extend;
        this._params = params;
    }
    parseString(string) {
        console.log("this is Subclass");
        return this._extend.parseString(string);
    }
}

// let booking = new Booking().extension();

// console.log(booking.parseString(JSON.stringify({ name: "liwuzhou" })));
