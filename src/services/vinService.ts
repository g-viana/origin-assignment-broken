import { get } from "../utils/https"
import { isInvalid, isInvalidArray } from "../utils/index"

const invalidChars = new RegExp(/[IOQ]/, "g")
const minVinLength = 17

export const filter = (vin: string) =>
    vin
        .toUpperCase()
        .replace(invalidChars, "")
        .substring(0, minVinLength)

export const vinValidationErrors = {
    notEnoughCharacters: `${minVinLength} chars expected`
}

export const validate = (_vin: string): string => {
    if (isInvalid(_vin)) return vinValidationErrors.notEnoughCharacters

    if (_vin.length < minVinLength) return vinValidationErrors.notEnoughCharacters

    return null
}

export const convert = (_res: VinCheckResponse): CarInfo => {
    if (isInvalid(_res)) return null

    if (isInvalidArray(_res.Results)) return null

    const entry = _res.Results[0]

    if (isInvalid(entry)) return null

    return {
        make: entry.Make,
        trim: entry.Trim,
        model: entry.Model,
        vehicleType: entry.VehicleType,
        year: entry.ModelYear ? parseInt(entry.ModelYear) : undefined
    }
}

export const apiCheck = async (_vin: string): Promise<CarInfo> => {
    if (isInvalid(_vin)) return null

    return convert(
        await get<VinCheckResponse>(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${_vin}?format=json`)
    )
}
