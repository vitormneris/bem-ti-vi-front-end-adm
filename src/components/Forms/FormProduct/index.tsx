import React from "react"

import { Input } from "../Inputs/Input"
import { InputDescription } from "../Inputs/InputDescription"
import { InputImage } from "../Inputs/InputImage"
import { InputCategory } from "../Inputs/InputCategory"

export const FormProduct = (props: any) => {
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

            <InputCategory
                label={props.label3}
                category={props.category3}
                setCategory={props.setCategory3}
                categories={props.categories3}
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