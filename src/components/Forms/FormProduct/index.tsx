import React, { Dispatch, SetStateAction } from "react"

import { Input } from "../Inputs/Input"
import { InputDescription } from "../Inputs/InputDescription"
import { InputImage } from "../Inputs/InputImage"
import { InputCategory } from "../Inputs/InputCategory"
import { CategoryFormated } from "../../../api/category/search/getCategoryList"

type FormProduct = {
    label1: string,
    placeholder1: string,
    keyboardType1: string,
    value1: string,
    onChangeText1: Dispatch<SetStateAction<string>>

    label2: string,
    placeholder2: string,
    keyboardType2: string,
    value2: string,
    onChangeText2: Dispatch<SetStateAction<string>>

    label3: string,
    category3: string,
    setCategory3: Dispatch<SetStateAction<string>>,
    categories3: CategoryFormated[] | undefined

    label4: string,
    image4: string | null,
    selectImage4: Dispatch<SetStateAction<string>>,

    label5: string,
    placeholder5: string,
    keyboardType5: string,
    value5: string,
    onChangeText5: Dispatch<SetStateAction<string>>
}

export const FormProduct = (props: FormProduct) => {
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
                categoriesToSelect={props.categories3}
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