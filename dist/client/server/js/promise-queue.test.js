import { PromiseQueue } from "./promise-queue";
var queue = new PromiseQueue();
describe("when adding multiple items to the queue", function () {
    it("should all execute in order", function (done) {
        var results = [];
        var _loop_1 = function (i) {
            queue.enqueue(function () {
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        results.push(i);
                        resolve(i);
                    }, Math.floor(Math.random() * 100));
                });
            });
        };
        for (var i = 0; i <= 10; i++) {
            _loop_1(i);
        }
        setTimeout(function () {
            expect(results).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            done();
        }, 3000);
    });
});
