import React from "react"

import { Input } from "../Inputs/Input"
import { InputImage } from "../Inputs/InputImage"

export const FormCategory = (props: any) => {
    return (
        <>
            <Input
                label={props.label1}
                placeholder={props.placeholder1}
                keyboardType={props.keyboardType1}
                value={props.value1}
                onChangeText={props.onChangeText1}
            />

            <InputImage
                label={props.label2}
                image={props.image2}
                selectImage={props.selectImage2}
            />
        </>
    )
}