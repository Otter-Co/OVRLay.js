import { sep } from 'path';

export function ArrayToPath(basePath: string, arrPath: string[]) {
    return `${basePath}${sep}${arrPath.join(sep)}`;
}