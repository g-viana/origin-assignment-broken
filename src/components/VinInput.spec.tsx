import * as React from "react"
import { shallow } from "enzyme"
import { VinInput } from "./VinInput"

describe("<VinInput>", () => {
    it("should exist", () => expect(VinInput).toBeDefined())

    it("should render", () => {
        const input = shallow(<VinInput value="Invalid VIN" onChange={_ => null} />).find("input")
        expect(input.props().value).toEqual("Invalid VIN")
    })
})
