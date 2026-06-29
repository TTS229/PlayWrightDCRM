export class CycleUtility {

    private static counters:
        Record<string, number> = {};

    static next<T>(
        key: string,
        values: T[]
    ): T {

        if (
            this.counters[key] === undefined
        ) {

            this.counters[key] = 0;
        }

        const value =
            values[
                this.counters[key] %
                values.length
            ];

        this.counters[key]++;

        return value;
    }
}