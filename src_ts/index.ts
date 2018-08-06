import * as ovrlayjs from "./lib/ovrlayjs";
import { performance } from 'perf_hooks';

interoptTest();

function interoptTest ()
{
    let its = 10;

    let start = 0, end = 0;

    console.log( "Test Start!" );

    while ( its-- )
    {
        start = performance.now();
        ovrlayjs.Director.isStarted();
        end = performance.now();

        console.log( end - start );
    }

    console.log( "Test End!" );
}