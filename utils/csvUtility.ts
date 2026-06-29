import * as fs from 'fs';
import * as path from 'path';
import Papa from 'papaparse';

export class CsvUtility {

    static getUser(
        environment: string,
        role: string,
        userId: string
    ) {

        const filePath = path.join(
            process.cwd(),
            'test-data',
            'users.csv'
        );

        const csvFile =
            fs.readFileSync(filePath, 'utf8');

        const parsedData = Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true
        });

        const users = parsedData.data as any[];

        const user = users.find(
            user =>
                user.environment === environment &&
                user.role === role &&
                user.userid === userId
        );

        if (user) {
            return user;
        }

        throw new Error(
            `User not found: ${environment} | ${role} | ${userId}`
        );
    }
}