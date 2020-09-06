class _Set {
    constructor() {
        this.item = {};
    }

    add(element) {
        if (!this.has(element)) {
            this.item[element] = element;
            return true;
        }

        return false;
    }

    has(element) {
        return Object.prototype.hasOwnProperty.call(this.item, element);
    }

    delete(element) {
        if (!this.has(element)) {
            let result = this.item[element];
            delete this.item[element];
            return result;
        }
        return false;
    }
    clear() {
        this.item = {};
    }

    size() {
        return Object.keys(this.item).length;
    }

    values() {
        return Object.values(this.item);
    }

    union(otherSet) {
        let unionSet = new _Set();
        this.values().forEach(val => unionSet.add(val));
        otherSet.values().forEach(val => unionSet.add(val));
        return unionSet;
    }

    intersection(otherSet) {
        let result = new _Set();
        let currentValues = this.values(),
            otherValues = otherSet.values();
        if (currentValues.length >= otherSet.length) {
            [currentValues, otherValues] = [otherValues, currentValues];
        }
        for (let index = 0; index < currentValues.length; index++) {
            if (otherSet.has(currentValues[index])) {
                result.add(currentValues[index]);
            }
        }
        return result;
    }

    difference(otherSet) {
        let result = new _Set();
        this.values().forEach(val => {
            if (!otherSet.has(val)) {
                result.add(val);
            }
        });
        return result;
    }
}

let set = new _Set();
set.add(10);
set.add(11);
set.add(12);

let otherSet = new _Set();

otherSet.add(12);
otherSet.add(2);
otherSet.add(3);
otherSet.add(4);

console.log(set.intersection(otherSet));
