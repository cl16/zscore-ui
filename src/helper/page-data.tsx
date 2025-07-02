export function handleFormValue(arg: FormDataEntryValue | null) {
    if (arg) {
        if (arg === '') {
            return null;
        } else {
            return arg.toString();
        }
    } else {
        return null;
    }
}