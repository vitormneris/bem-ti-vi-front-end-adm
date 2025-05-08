import React from "react"

import { Input } from "../Inputs/Input"
import { InputDescription } from "../Inputs/InputDescription"
import { InputImage } from "../Inputs/InputImage"

export const FormService = (props: any) => {
    return (
        <>
            <Input
                label={props.label1}
                placeholder={props.placeholder1}
                keyboardType={props.keyboardType1}
                value={props.value1}
                onChangeText={props.onChangeText1}
            />

            <Input
                label={props.label2}
                placeholder={props.placeholder2}
                keyboardType={props.keyboardType2}
                value={props.value2}
                onChangeText={props.onChangeText2}
            />

            <Input
                label={props.label3}
                placeholder={props.placeholder3}
                keyboardType={props.keyboardType3}
                value={props.value3}
                onChangeText={props.onChangeText3}
            />

            <InputImage
                label={props.label4}
                image={props.image4}
                selectImage={props.selectImage4}
            />

            <InputDescription
                label={props.label5}
                placeholder={props.placeholder5}
                keyboardType={props.keyboardType5}
                value={props.value5}
                onChangeText={props.onChangeText5}
            />
        </>
    )
}