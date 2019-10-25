export const fixtureFactory = <T>(defaults: T) => (params: Partial<T> = {}) =>
    (({ ...(defaults as any), ...(params as any) } as any) as T)

export const vinResultEntryFixture = fixtureFactory<VinResultEntry>({
    Make: "HONDA",
    Model: "",
    ModelYear: "2007",
    Trim: "",
    VehicleType: "PASSENGER CAR"
})

export const vinCheckResponseFixture = fixtureFactory<VinCheckResponse>({
    Results: []
})

export const vinFixture = (vin: string = "SHHFN23607U002758") => vin

export const carInfoFixture = fixtureFactory<CarInfo>({
    make: "HONDA",
    model: "",
    trim: "",
    vehicleType: "PASSENGER CAR",
    year: 2007
})
