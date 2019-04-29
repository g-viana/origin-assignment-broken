import { extend } from "./utils"

describe("store utils", () => {
    describe("extend()", () => {
        interface Foo {
            foo: string
            bar: number
        }
        it("gives ext function binded with given state", () => {
            const state: Foo = { foo: "bar", bar: 1 }
            expect(extend(state)({ foo: "bar" })).toEqual({ foo: "bar", bar: 1 })
        })
    })
})
