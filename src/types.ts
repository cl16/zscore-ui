type JsonPrimitive = string | number | boolean | null | undefined;

export type JsonObject = JsonPrimitive | JsonObject[] | {
    [key: string]: JsonObject;
};