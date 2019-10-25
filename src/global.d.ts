/// <reference path="./utils/typedActions.d.ts" />
/// <reference path="./store/index.d.ts" />
/// <reference path="./services/vinService.d.ts" />

declare module "*.scss"

type Async<T> = "NotLoaded" | "Loading" | "Error" | T
type TMap<TKey extends string, TValue> = { [K in TKey]: TValue }
type SMap<TValue> = TMap<string, TValue>
type Casted<T, S> = { [P in keyof T]: S }
type Subtype<T> = { [P in keyof T]?: T[keyof T] }
type CastedSubtype<T, S> = { [P in keyof T]?: S }
