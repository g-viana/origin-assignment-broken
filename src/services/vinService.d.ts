interface CarInfo {
    make: string
    model: string
    year: number
    trim: string
    vehicleType: string
}

interface VinResultEntry {
    Make: string
    Model: string
    ModelYear: string
    Trim: string
    VehicleType: string
}

interface VinCheckResponse {
    Results: VinResultEntry[]
}
