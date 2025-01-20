import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const directories = ['markdown', 'dist', 'test'];

for (const directory of directories) {
    if (!existsSync(join('.', directory))) {
        mkdirSync(directory);
        console.log(`Directory ${directory} created`);
    }
}