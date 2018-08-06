import { EdgeFunc, EdgeOpts } from './edge_utils';

declare module "edge" {
    export function func<RT=any, AT=void>(opts: EdgeOpts): EdgeFunc<RT, AT>;
}