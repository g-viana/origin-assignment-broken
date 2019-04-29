import * as React from "react"
import { Spinner } from "./Spinner"
import { bindBem } from "../utils/bem"
import "./CarInfoPreview.scss"

const { block, element } = bindBem("CarInfoPreview")

const Line: React.SFC<{ label: string; value: string | number }> = ({ label, value }) => {
    if (!value) return null
    return (
        <div className={element("Line")}>
            <label>{label}</label> {value}
        </div>
    )
}

interface Props {
    carInfo: Async<CarInfo>
}

export const CarInfoPreview: React.SFC<Props> = ({ carInfo }) => {
    if (carInfo === "Loading") return <Spinner />
    if (carInfo === "NotLoaded" || !carInfo) return null
    const { year, make, trim, model } = carInfo
    if (!make) return <div className={block()}>not registered with NHTSA</div>
    return (
        <div className={block()}>
            <Line label="Make" value={make} />
            <Line label="Trim" value={trim} />
            <Line label="Year" value={year} />
            <Line label="Model" value={model} />
        </div>
    )
}
