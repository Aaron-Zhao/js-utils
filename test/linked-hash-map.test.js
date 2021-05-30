const { expect } = require('chai');
const LinkedHashMap = require('../src/linked-hash-map');

describe('Linked hash map tests', () => {
    let map1;

    describe('constructor()', () => {
        it('creates an instance of linked hash map', () => {
            map1 = new LinkedHashMap();
            expect(map1).to.be.instanceof(LinkedHashMap);
        });
    });

    describe('put(key, item, head?)', () => {
        it('should add new item', () => {
            map1.put(1, 'item 1');
            expect(map1.size()).to.equal(1);
            expect(map1.head().key).to.equal(1);
            expect(map1.head().value).to.equal('item 1');
        });

        it('should add new item to the tail', () => {
            map1.put(2, 'item 2');
            expect(map1.size()).to.equal(2);
            expect(map1.head().key).to.equal(1);
            expect(map1.head().value).to.equal('item 1');
            expect(map1.tail().key).to.equal(2);
            expect(map1.tail().value).to.equal('item 2');
        });

        it('should add new item to the head', () => {
            map1.put(3, 'item 3', true);
            expect(map1.size()).to.equal(3);
            expect(map1.head().key).to.equal(3);
            expect(map1.head().value).to.equal('item 3');
        });

        it('should update the item', () => {
            map1.put(3, 'item 3 more text');
            expect(map1.size()).to.equal(3);
            expect(map1.get(3)).to.equal('item 3 more text');
        });
    });

    describe('next() previous() chaining', () => {
        it('should chain next()', () => {
            expect(map1.head().next().value).to.equal('item 1');
            expect(map1.head().next().next().value).to.equal('item 2');
        });

        it('should chain previous()', () => {
            expect(map1.tail().previous().value).to.equal('item 1');
            expect(map1.tail().previous().previous().value).to.equal('item 3 more text');
        });

        it('should chain previous() next()', () => {
            expect(map1.head().next().next().previous().next().value).to.equal('item 2');
            expect(map1.tail().previous().next().previous().next().value).to.equal('item 2');
        });
    });

    describe('get(key)', () => {
        it('should get value', () => {
            expect(map1.get(1)).to.equal('item 1');
            expect(map1.get(2)).to.equal('item 2');
            expect(map1.get(3)).to.equal('item 3 more text');
            expect(map1.get(4)).to.equal(undefined);
            expect(map1.get(null)).to.equal(undefined);
            expect(map1.get(undefined)).to.equal(undefined);
        });
    });

    describe('previousKey() previousValue() nextKey() nextValue()', () => {
        it('should return correct value', () => {
            expect(map1.previousKey(1)).to.equal(3);
            expect(map1.previousValue(1)).to.equal('item 3 more text');
            expect(map1.nextKey(1)).to.equal(2);
            expect(map1.nextValue(1)).to.equal('item 2');

            expect(map1.previousKey(2)).to.equal(1);
            expect(map1.previousValue(2)).to.equal('item 1');
            expect(map1.nextKey(2)).to.equal(undefined);
            expect(map1.nextValue(2)).to.equal(undefined);

            expect(map1.previousKey(3)).to.equal(undefined);
            expect(map1.previousValue(3)).to.equal(undefined);
            expect(map1.nextKey(3)).to.equal(1);
            expect(map1.nextValue(3)).to.equal('item 1');
        });
    });

    describe('remove()', () => {
        it('should remove from the map', () => {
            expect(map1.remove(3)).to.equal('item 3 more text');
            expect(map1.head().key).to.equal(1);
            expect(map1.tail().key).to.equal(2);
            expect(map1.remove(2)).to.equal('item 2');
            expect(map1.head().key).to.equal(1);
            expect(map1.tail().key).to.equal(1);
            expect(map1.remove(1)).to.equal('item 1');
            expect(map1.head().key).to.equal(undefined);
            expect(map1.tail().key).to.equal(undefined);
            expect(map1.size()).to.equal(0);
        });
    });

    describe('keys() values() entries()', () => {
        it('should iterate in inserting order with correct key/value', () => {
            const items = [{k: 4, v: 'item 4'}, {k: 5, v: 'item 5'}, {k: 6, v: 'item 6'}, {k: 7, v: 'item 7'}];
            items.forEach(item => {
                map1.put(item.k, item.v);
            });

            expect(map1.size()).to.equal(4);

            let ikey = items[0].k;
            for (let key of map1.keys()) {
                expect(key).to.equal(ikey);
                ikey++;
            }
            ikey = items[0].k;
            for (let val of map1.values()) {
                expect(val).to.equal('item ' + ikey);
                ikey++;
            }
            ikey = items[0].k;
            for (let [key, val] of map1.entries()) {
                expect(key).to.equal(ikey);
                expect(val).to.equal('item ' + ikey);
                ikey++;
            }
        });
    });

    describe('toArray()', () => {
        it('should return array with correct values in inserting order', () => {
            const arr = map1.toArray();
            expect(arr).to.be.instanceof(Array);
            ikey = 4;
            arr.forEach((item) => {
                expect(item.key).to.equal(ikey);
                expect(item.value).to.equal('item ' + ikey);
                ikey++;
            });
        });

        it('should return array with correct values in link order', () => {
            map1.put(3, 'item 3', true);
            const arr = map1.toArray('orderByLink');
            expect(arr).to.be.instanceof(Array);
            ikey = 3;
            arr.forEach((item) => {
                expect(item.key).to.equal(ikey);
                expect(item.value).to.equal('item ' + ikey);
                ikey++;
            });
        });
    });

    describe('reset()', () => {
        it('should clear the map', () => {
            map1.reset();
            expect(map1.head().key).to.equal(undefined);
            expect(map1.tail().key).to.equal(undefined);
            expect(map1.size()).to.equal(0);
        });
    });
});
