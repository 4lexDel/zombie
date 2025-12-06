export default class Utils {
    public static pause(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public static getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public static prettyStringify(value: any, indent: number = 4): string {
        const space = ' '.repeat(indent);

        function serialize(v: any, level: number): string {
            const pad = space.repeat(level);

            // null
            if (v === null) return 'null';

            // ARRAY
            if (Array.isArray(v)) {
                if (v.length === 0) return '[]';

                // handle first-dimension expansion
                // inner arrays compact
                const items = v.map(elem => {
                    if (Array.isArray(elem)) {
                        // inner arrays compact
                        return space.repeat(level + 1) + serializeCompactArray(elem);
                    }
                    if (typeof elem === 'object' && elem !== null) {
                        // object inside array: compact object
                        return space.repeat(level + 1) + JSON.stringify(elem);
                    }
                    // primitive
                    return space.repeat(level + 1) + JSON.stringify(elem);
                });

                return `[\n${items.join(',\n')}\n${pad}]`;
            }

            // OBJECT
            if (typeof v === 'object') {
                const entries = Object.entries(v);
                if (entries.length === 0) return '{}';

                const out = entries.map(([key, val]) => {
                    return `${pad + space}"${key}": ${serialize(val, level + 1)}`;
                });

                return `{\n${out.join(',\n')}\n${pad}}`;
            }

            // primitive
            return JSON.stringify(v);
        }

        function serializeCompactArray(arr: any[]): string {
            return '[ ' + arr.map(x => JSON.stringify(x)).join(', ') + ' ]';
        }

        return serialize(value, 0);
    }
}