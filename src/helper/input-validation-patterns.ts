export interface ITextInputPattern {
    pattern: string;
    desc: string;
}

export type FormPatternSet<T> = { [K in keyof T as string]: ITextInputPattern}

export class InputValidation {
    static ANY: ITextInputPattern = {pattern: '^.*$', desc: 'any character'};
    static NUMBER: ITextInputPattern = {pattern: '^([0-9]+(\\.[0-9]+)?)?$', desc: 'number'};
    static NUMBER_ZERO_TO_ONE_HUNDRED = {pattern: '^(0*(([0-9]+\\.)?[0-9])[0-9]*)?$', desc: 'number between 0 and 100'}
    static INTEGER: ITextInputPattern = {pattern: '^[0-9]+$', desc: 'integer'};
}

export function extractPatterns<T>(obj: FormPatternSet<T>): { [K in keyof T]: string } {
    return Object.fromEntries<string>(
        Object.entries<ITextInputPattern>(obj).map(([key, value]) =>  [key, value.pattern])
    ) as { [K in keyof T]: string };
}