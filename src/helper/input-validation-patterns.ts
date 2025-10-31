interface ITextInputPattern {
    pattern: string;
    desc: string;
}

export class InputValidation {
    static ANY: ITextInputPattern = {pattern: '^.*$', desc: 'any character'};
    static NUMBER: ITextInputPattern = {pattern: '^([0-9]+(\\.[0-9]+)?)?$', desc: 'integer or decimal number'};
}

export function extractPatterns<T extends Record<string, { pattern: string }>>(obj: T): { [K in keyof T]: string } {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, value.pattern])
    ) as { [K in keyof T]: string };
}