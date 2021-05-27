/**
 * @copyright 2021 Aaron Zhao <yujianzhao2013@gmail.com>
 * @license MIT
 * FIFO queue data structure
 * @class Queue
 */
class Queue {
    /**
    * Creates a queue instance
    * @public
    * @param {array<any>} data
    */
    constructor(data, capacity) {
        this._data = [];
        this._head = 0;
        this._cap = null;
        if (data != null) {
            if (!Array.isArray(data)) {
                throw Error('Constructor expects data to be an array');
            }
            this._data = data;
        }
        if (capacity != null) {
            if (typeof capacity === 'number') {
                this._cap = capacity;
            } else {
                throw Error('Constructor expects capacity to be a number');
            }
        }
    }

    /**
    * Inserts an item to the queue.
    * @public
    * @param {any} item
    * @return {boolean} if insert successfully
    */
    enqueue(item) {
        if (this._cap != null && this.size() >= this._cap) {
            return false;
        } else {
            this._data.push(item);
            return true;
        }
    }

    /**
     * Removes and returns an item from the queue
     * @public
     * @returns {any} item
     */
    dequeue() {
        if (this.size() === 0) {
            return null;
        }

        const head = this._data[this._head];
        this._head += 1;

        if (this._head * 2 >= this._data.length) {
            this._data = this._data.slice(this._head);
            this._head = 0;
        }

        return head;
    }

    /**
     * Returns the head of the queue by default
     * Returns the tail of the queue if tail option is true
     * @public
     * @param {boolean} tail;
     * @returns {any}
     */
    peek(tail = false) {
        if (this.size() > 0) {
            return tail ? this._data[this._data.length - 1] : this._data[this._head];
        } else {
            return null;
        }
    }

    /**
     * Returns the size of the queue.
     * @public
     * @returns {number}
     */
    size() {
        return this._data.length - this._head;
    }

    /**
     * Updates queue capacity.
     * @public
     * @param {number} item
     */
    updateCapacity(newCapacity) {
        this._cap = newCapacity;
    }

    /**
     * Empties the queue
     * @public
     */
    reset() {
        this._data = [];
        this._head = 0;
    }

    /**
     * forEach function
     * @public
     * @param {function(item, index)} callback
     */
    forEach(callback) {
        for (let i = this._head; i < this._data.length; i++) {
            callback(this._data[i], i - this._head);
        }
    }

    /**
     * Returns array representation of the queue
     * @public
     * @returns {Array<any>}
     */
    toArray() {
        return this._data.slice(this._head);
    }
}

module.exports = Queue;
