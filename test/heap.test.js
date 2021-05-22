const { expect } = require('chai');
const Heap = require('../src/heap');

describe('Heap tests', () => {
    let minHeap, maxHeap, objectMinHeap;
    
    describe('constructor(data, comparator)', () => {
        it('creates an instance min heap', () => {
            minHeap = new Heap();
            expect(minHeap).to.be.instanceof(Heap);
        });

        it('creates an instance of max heap with data input', () => {
            maxHeap = new Heap([5, 3], function(a, b) {
                return a <= b;
            });
            expect(maxHeap).to.be.instanceof(Heap);
        });

        it('creates an instance min heap with data type object', () => {
            objectMinHeap = new Heap(null, function(a, b) {
                return a.score >= b.score;
            });
            expect(objectMinHeap).to.be.instanceof(Heap);
        });

        it('throws an error if the data input is invalid', () => {
            expect(() => new Heap({}))
                .to.throw('Constructor expects data to be an array');
        });

        it('throws an error if the comparator input is invalid', () => {
            expect(() => new Heap(null, 1))
                .to.throw('Constructor expects comparator to be a function');
        });
    });

    describe('peek()', () => {
        it('should return root', () => {
            let root = maxHeap.peek();
            expect(root).to.equal(5);
        });

        it('should return undefined if empty heap', () => {
            let root = minHeap.peek();
            expect(root).to.equal(undefined);
        });
    });

    describe('push()', () => {
        it('should add item to the top', () => {
            let newItem = maxHeap.peek() + 1;
            maxHeap.push(newItem);
            let root = maxHeap.peek();
            expect(root).to.equal(newItem);
            expect(maxHeap.size()).to.equal(3);
        });

        it('should add item to the bottom', () => {
            maxHeap.push(1);
            let root = maxHeap.peek();
            expect(root).to.not.equal(1);
            expect(maxHeap.size()).to.equal(4);
        });

        it('should add score to the top', () => {
            objectMinHeap.push({ score: 10 });
            objectMinHeap.push({ score: 6 });
            objectMinHeap.push({ score: 7 });
            let root = objectMinHeap.peek();
            expect(root.score).to.equal(6);
            expect(objectMinHeap.size()).to.equal(3);
        });

        it('should add score to the bottom', () => {
            objectMinHeap.push({ score: 20 });
            let root = objectMinHeap.peek();
            expect(root.score).to.not.equal(20);
            expect(objectMinHeap.size()).to.equal(4);
        });
    });

    describe('pop()', () => {
        it('should return root', () => {
            let newItem = maxHeap.peek() + 1;
            let size = maxHeap.size();
            maxHeap.push(newItem);
            let root = maxHeap.pop();
            expect(root).to.equal(newItem);
            expect(maxHeap.size()).to.equal(size);
        });

        it('should return undefined if empty heap', () => {
            let root = minHeap.pop();
            expect(root).to.equal(undefined);
        });
    });

    describe('replaceTop()', () => {
        it('should return and replace the root', () => {
            let newItem = maxHeap.peek() + 1;
            let size = maxHeap.size();
            let oldRoot = maxHeap.replaceTop(newItem);
            let root = maxHeap.peek();
            expect(oldRoot).to.equal(newItem - 1);
            expect(root).to.equal(newItem);
            expect(maxHeap.size()).to.equal(size);
        });

        it('should return undefined if empty heap', () => {
            let root = minHeap.replaceTop(1);
            expect(root).to.equal(undefined);
        });
    });
});
