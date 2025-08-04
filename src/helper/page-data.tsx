export function handleFormValue(arg: FormDataEntryValue | null) {
    if (arg) {
        if (arg === '') {
            return undefined;
        } else {
            return arg.toString();
        }
    } else {
        return undefined;
    }
}