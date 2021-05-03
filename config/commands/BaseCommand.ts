export interface BaseCommand<T = string, P = undefined> {
    type: T,
    payload?: P
}
