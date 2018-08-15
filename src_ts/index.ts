import * as ovrlayjs from "./lib/ovrlayjs";
import { performance } from 'perf_hooks';

interoptTest();

function interoptTest ()
{
    let its = 10;

    let start = 0, end = 0;

    console.log("Test Start!");

    while (its--)
    {
        start = performance.now();
        let res = ovrlayjs.Director.isStarted();
        end = performance.now();

        console.log(`Call Perf: ${ end - start } Res: ${ res }`);
    }

    console.log("Test End!");
}