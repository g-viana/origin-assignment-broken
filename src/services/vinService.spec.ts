import { convert, filter, validate, apiCheck, vinValidationErrors } from "./vinService"
import { vinCheckResponseFixture, vinResultEntryFixture, vinFixture, carInfoFixture } from "../test/fixtures"

describe("Vin Service", () => {
    describe("Response converter", () => {
        it("gives empty result when no data is given", () => expect(convert(null)).toEqual(null))
        it("gives empty result when invalid data is given", () => expect(convert({} as any)).toEqual(null))
        it("gives empty result when response contains no data", () =>
            expect(convert(vinCheckResponseFixture({ Results: [] }))).toEqual(null))

        it("takes make from Results array", () =>
            expect(
                convert(vinCheckResponseFixture({ Results: [vinResultEntryFixture({ Make: "MAZDA" })] })).make
            ).toEqual("MAZDA"))

        it("takes year from Results array", () =>
            expect(
                convert(vinCheckResponseFixture({ Results: [vinResultEntryFixture({ ModelYear: "2010" })] })).year
            ).toEqual(2010))

        it("takes type from Results array", () =>
            expect(
                convert(vinCheckResponseFixture({ Results: [vinResultEntryFixture({ VehicleType: "CAR" })] }))
                    .vehicleType
            ).toEqual("CAR"))

        it("takes trim from Results array", () =>
            expect(
                convert(vinCheckResponseFixture({ Results: [vinResultEntryFixture({ Trim: "FN2" })] })).trim
            ).toEqual("FN2"))

        it("takes all values from Results", () =>
            expect(
                convert(
                    vinCheckResponseFixture({
                        Results: [
                            vinResultEntryFixture({
                                Make: "MAZDA",
                                ModelYear: "2010",
                                Model: "rx8",
                                VehicleType: "CAR",
                                Trim: "RX8"
                            })
                        ]
                    })
                )
            ).toEqual(
                carInfoFixture({
                    make: "MAZDA",
                    year: 2010,
                    model: "rx8",
                    vehicleType: "CAR",
                    trim: "RX8"
                })
            ))
    })

    describe("Vin string filter", () => {
        it("uppercases given string", () => expect(filter("abc")).toEqual("ABC"))
        it("disallows IOQ", () => expect(filter("IOQabc")).toEqual("ABC"))
        it("disallows ioq", () => expect(filter("ioqabc")).toEqual("ABC"))
        it("trims to first 17 chars", () => expect(filter("SHHFN23607U002758abc")).toEqual("SHHFN23607U002758"))
    })

    describe("Vin validate", () => {
        it("gives not enough characters error when no data is given", () =>
            expect(validate(null)).toEqual(vinValidationErrors.notEnoughCharacters))

        it("gives not enough characters error when incomplete data is given", () =>
            expect(validate("abc")).toEqual(vinValidationErrors.notEnoughCharacters))

        it("gives empty result when valid data is given", () => expect(validate("shHFn23607U002758abc")).toEqual(null))
    })

    describe("Vin apiCheck", () => {
        it("gives empty result when no data is given", () => expect(apiCheck(null)).resolves.toEqual(null))

        it("gives result with empty field when invalid data is given", () =>
            expect(apiCheck("abc")).resolves.toMatchObject(
                carInfoFixture({
                    make: "",
                    model: "",
                    trim: "",
                    vehicleType: "",
                    year: undefined
                })
            ))

        it("gives valid result when data is given", () =>
            expect(apiCheck(vinFixture())).resolves.toMatchObject(carInfoFixture()))
    })
})
