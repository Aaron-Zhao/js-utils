/**
 * @copyright 2021 Aaron Zhao <yujianzhao2013@gmail.com>
 * @license MIT
 * Heap implementation using 1-d array
 * Children is index of 2n + 1 and 2n + 2 where n is the parent index
 * Parent is math.floor((m - 1) / 2) where m is is the child index
 * @class Heap
 */
class Heap {
    /**
    * Creates a heap instance
    * By default it is a min heap, which can be changed by passing in a comparator function
    * If the data type is not number, a comparator function is also required
    * @public
    * @param {array<string|number|object>} data
    */
    constructor(data, comparator) {
        this._data = [];
        this._comparator = function compare(a, b) {
            return a >= b;
        };
        if (data != null) {
            if (!Array.isArray(data)) {
                throw Error('Constructor expects data to be an array');
            }
            this._data = data;
        }
        if (comparator != null) {
            if (typeof comparator !== 'function') {
                throw Error('Constructor expects comparator to be a function');
            }
            this._comparator = comparator;
        }
    }

    /**
    * Returns the root of the heap
    * @public
    * @returns {string|number|object} root of the heap
    */
    peek() {
        return this._data[0];
    }

    /**
    * Returns and removes the root of the heap
    * @public
    * @returns {string|number|object} root of the heap
    */
    pop() {
        if (this.size() < 1) { return undefined; }
        const root = this._data[0];
        this.swap(this.size() - 1, 0);
        this._data.pop();
        this.heapifyDown(0);
        return root;
    }

    /**
    * Returns and replaces the root of the heap
    * @public
    * @param {string|number|object} val
    * @returns {string|number|object} root of the heap
    */
    replaceTop(val) {
        if (this.size() < 1) { return undefined; }
        const root = this._data[0];
        this._data[0] = val;
        this.heapifyDown(0);
        return root;
    }

    /**
    * Pushes a new item to the heap
    * @public
    * @param {string|number|object} val
    */
    push(val) {
        this._data.push(val);
        this.heapifyUp(this._data.length - 1);
    }

    /**
    * Returns the size of the heap
    * @public
    * @returns {number} size of the heap
    */
    size() {
        return this._data.length;
    }

    /**
    * Swaps items in index s and e
    * @private
    * @param {number} s
    * @param {number} e
    */
    swap(s, e) {
        const temp = this._data[s];
        this._data[s] = this._data[e];
        this._data[e] = temp;
    }

    /**
    * Move the item from the input index to its appropriate place up in the tree
    * @public
    * @param {number} index
    */
    heapifyUp(index) {
        if (index === 0) return;
        const parent = Math.floor((index - 1) / 2);
        if (this._comparator(this._data[index], this._data[parent])) return;
        this.swap(index, parent);
        this.heapifyUp(parent);
    }

    /**
    * Move the item from the input index to its appropriate place down in the tree
    * @public
    * @param {number} index
    */
    heapifyDown(index) {
        const left = index * 2 + 1;
        const right = index * 2 + 2;
        if (left >= this._data.length) return;
        const child = (right < this._data.length
            && !this._comparator(this._data[right], this._data[left])) ? right : left;
        if (!this._comparator(this._data[index], this._data[child])) return;
        this.swap(index, child);
        this.heapifyDown(child);
    }
}

module.exports = Heap;
