import * as React from "react"
import { bindBem } from "../utils/bem"
import "./VinInput.scss"

const { block, element } = bindBem("VinInput")
const VIN_MAXLENGTH = 17

interface Props {
    value: string
    error?: string
    onChange: (value: string) => void
    className?: string
}

export const VinInput: React.SFC<Props> = ({ value, className, error, onChange }) => (
    <div className={block({ invalid: !!error }, className)}>
        <input maxLength={VIN_MAXLENGTH} onChange={e => onChange(e.target.value)} name="vin" value={value} />
        <div className={element("Error")}>{error}</div>
    </div>
)
