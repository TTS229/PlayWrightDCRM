import * as fs from 'fs';
import * as path from 'path';

export class ConfigUtility {

    static getConfig(environment: string) {

        const filePath = path.join(
            process.cwd(),
            'config',
            `${environment}.json`
        );

        const fileContent =
            fs.readFileSync(filePath, 'utf-8');

        return JSON.parse(fileContent);
    }
}