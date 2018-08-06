import { EdgeFunc, EdgeOpts } from './edge_utils';

declare module "edge" {
    export function func ( opts: EdgeOpts ): EdgeFunc;
}