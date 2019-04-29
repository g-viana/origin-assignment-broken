export const fixtureFactory = <T>(defaults: T) => (params: Partial<T> = {}) =>
    (({ ...(defaults as any), ...(params as any) } as any) as T)

export const vinResultEntryFixture = fixtureFactory<VinResultEntry>({
    Value: "Foo",
    ValueId: "108",
    Variable: "Name",
    VariableId: 127
})

export const vinCheckResponseFixture = fixtureFactory<VinCheckResponse>({
    Results: []
})
