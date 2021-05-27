const { expect } = require('chai');
const Queue = require('../src/queue');

describe('Queue tests', () => {
    let queue1;
    let queue2;
    let queue3;

    describe('constructor(data, capacity)', () => {
        it('creates an instance of queue', () => {
            queue1 = new Queue();
            expect(queue1).to.be.instanceof(Queue);
        });

        it('creates an instance of queue with data input', () => {
            queue2 = new Queue([3, 5, 1, 8]);
            expect(queue2).to.be.instanceof(Queue);
        });

        it('creates an instance of with capacity restraint', () => {
            queue3 = new Queue(null, 3);
            expect(queue3).to.be.instanceof(Queue);
        });

        it('throws an error if the data input is invalid', () => {
            expect(() => new Queue({}))
                .to.throw('Constructor expects data to be an array');
        });

        it('throws an error if the capacity input is invalid', () => {
            expect(() => new Queue(null, '1'))
                .to.throw('Constructor expects capacity to be a number');
        });
    });

    describe('peek()', () => {
        it('should return head', () => {
            const head = queue2.peek();
            expect(head).to.equal(3);
        });

        it('should return null if empty queue', () => {
            const head = queue1.peek();
            expect(head).to.equal(null);
        });
    });

    describe('enqueue()', () => {
        it('should insert item to the queue', () => {
            queue3.enqueue(1);
            expect(queue3.size()).to.equal(1);
        });

        it('should restrained by capacity', () => {
            queue3.enqueue(2);
            const result1 = queue3.enqueue(3);
            const result2 = queue3.enqueue(4);
            expect(result1).to.equal(true);
            expect(result2).to.equal(false);
        });
    });

    describe('dequeue()', () => {
        it('should dequeue head', () => {
            const head = queue2.dequeue();
            expect(head).to.equal(3);
            expect(queue2.size()).to.equal(3);
        });

        it('should halving correctly', () => {
            const head = queue2.dequeue();
            expect(head).to.equal(5);
            expect(queue2.size()).to.equal(2);
        });
    });

    describe('forEach()', () => {
        it('should iterate through queue', () => {
            const values = [5, 7, 6, 3, 1, 9];

            values.forEach((v) => {
                queue1.enqueue(v);
            });

            expect(queue1.size()).to.equal(values.length);

            queue1.forEach((v, i) => {
                expect(v).to.equal(values[i]);
            });

            queue1.dequeue();
            queue1.dequeue();

            queue1.forEach((v, i) => {
                expect(v).to.equal(values[i + 2]);
            });
        });
    });

    describe('toArray()', () => {
        it('should return array representation of the queue', () => {
            const result = [6, 3, 1, 9];
            queue1.toArray().forEach((v, i) => {
                expect(v).to.equal(result[i]);
            });
        });
    });
});
