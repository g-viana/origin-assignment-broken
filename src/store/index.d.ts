interface RootState {
    vin: string
    vinCheckResult: Async<CarInfo>
    vinValidationError: string
}
