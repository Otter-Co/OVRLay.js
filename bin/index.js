"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ovrlayjs = require("./lib/ovrlayjs");
const perf_hooks_1 = require("perf_hooks");
interoptTest();
function interoptTest() {
    let its = 10;
    let start = 0, end = 0;
    console.log("Test Start!");
    while (its--) {
        start = perf_hooks_1.performance.now();
        let res = ovrlayjs.Director.isStarted();
        end = perf_hooks_1.performance.now();
        console.log(`Call Perf: ${end - start} Res: ${res}`);
    }
    console.log("Test End!");
}
