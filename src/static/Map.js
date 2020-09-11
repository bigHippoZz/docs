export function defaultToString(item) {
    if (item === null) {
        return "NULL";
    } else if (item === undefined) {
        return "UNDEFINED";
    } else if (typeof item === "string" || item instanceof String) {
        return `${item}`;
    } else {
        return item.toString();
    }
}

class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}:${this.value}]`;
    }
}
class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    hasKey(key) {
        return this.table[this.toStrFn(key)] != null;
    }
    set(key, value) {
        if (value != null && key != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }

    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }

    get(key) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair;
    }

    keyValues() {
        return Object.values(this.table);
    }

    keys() {
        return this.keyValues().map(valuePair => valuePair.key);
    }
    values() {
        return this.keyValues().map(valuePair => valuePair.value);
    }

    forEach(cb) {
        const valuePairs = this.keyValues();
        console.log(valuePairs);
        for (let index = 0; index < valuePairs.length; index++) {
            let result = cb(valuePairs[index].key, valuePairs[index].value);
            if (result === false) {
                break;
            }
        }
    }

    size() {
        return Object.keys(this.table).length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    clear() {
        this.table = {};
    }

    toString() {
        if (this.isEmpty()) {
            return "";
        }
        const valuePairs = this.keyValues();
        let objectString = `${valuePairs[0].toString()}`;
        for (let index = 1; index < valuePairs.length; index++) {
            objectString = `${objectString},${valuePairs[index].toString()}`;
        }
        return objectString;
    }
}

let map = new Dictionary();

map.set("gandalf", "gandalf.com");
map.set("john", "john.com");
map.set("tyrion", "tyrion.com");

// console.log(map);
// console.log(map.size());
// map.forEach((key, value) => {
//     console.log(key, value);
// });
// console.log(map.get("tyrion"));
// console.log(map.values());
// console.log(map.keyValues());
// console.log(map.toString());

class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }

    loseloseHashCode(key) {
        if (typeof key === "number") {
            return key;
        }
        const tableKey = this.toStrFn(key);
        console.log(tableKey);
        let hash = "";
        for (let index = 0; index < tableKey.length; index++) {
            hash += tableKey.charCodeAt(index);
        }
        console.log(hash % 37);
        return hash % 37;
    }

    hashCode(key) {
        return this.loseloseHashCode(key);
    }

    put(key, value) {
        if (key != null && value != value) {
            const position = this.hashCode(key);
            this.table[position] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    get(key) {
        const valuePair = this.table[this.hashCode(key)];
        return valuePair == null ? undefined : valuePair;
    }

    remove(key) {
        const hash = this.hashCode(key);
        const valuePair = this.table[hash];
        if (valuePair != null) {
            delete this.table[hash];
            return true;
        }
        return false;
    }
}
let hashTable = new HashTable();

hashTable.hashCode({});
