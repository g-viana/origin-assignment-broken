import { get } from "../utils/https"
import { toDictionary } from "../utils"

const BASE_URL = "https://vpic.nhtsa.dot.gov/api"
const decodeVinUrl = (vin: string) => BASE_URL + `/vehicles/decodevin/${vin}?format=json`

const invalidChars = new RegExp(/[^0-9A-Z]|[IOQ]/, "gi")
export const filter = (vin: string) =>
    vin
        .toUpperCase()
        .slice(0, 17)
        .replace(invalidChars, "")

export const validate = (vin: string): string => vin.length < 17 && "17 chars expected"

const carInfoApiFields = [
    { variable: "trim", label: "Trim" },
    { variable: "make", label: "Make" },
    { variable: "model", label: "Model" },
    { variable: "year", label: "Model Year" },
    { variable: "vehicleType", label: "Vehicle Type" }
]

const getResultKey = (result: VinResultEntry): string => result.Variable
const getResultValue = (result: VinResultEntry): string => result.Value
const convertResultArray = (resultArray: VinResultEntry[]) =>
    toDictionary<VinResultEntry, string>(resultArray, getResultKey, getResultValue)

const isEmpty = (obj: Object): Boolean => Object.keys(obj).length === 0

export const convert = (res: VinCheckResponse): CarInfo => {
    if (res == null || isEmpty(res) || isEmpty(res.Results)) return null

    const resultsMap = convertResultArray(res.Results)

    return carInfoApiFields.reduce(
        (prev, next) => ({ ...prev, [next.variable]: resultsMap[next.label] }),
        {}
    ) as CarInfo
}

export const apiCheck = async (_vin: string): Promise<CarInfo> => get(decodeVinUrl(_vin)).then(convert)
