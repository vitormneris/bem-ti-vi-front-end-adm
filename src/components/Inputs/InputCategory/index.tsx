import React, { Dispatch, SetStateAction } from "react"
import { Text, View } from "react-native"

import { Picker } from "@react-native-picker/picker"

import { CategoryFormated } from "../../../api/category/search/findAll"

import { styles } from "./style"

type InputCategoryProps = {
    label: string
    categoriesToSelect: CategoryFormated[] | undefined,
    category: string,
    setCategory: Dispatch<SetStateAction<string>>
}

export const InputCategory = ({ label, categoriesToSelect, category, setCategory }: InputCategoryProps) => {
    if (categoriesToSelect == undefined) {
        return <></>;
    }

    if (!categoriesToSelect.some((c: CategoryFormated) => c.key === "")) {
        categoriesToSelect.unshift({key: '', label:''});
    }
    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.pickerWrapper}>
                {!category && (
                    <Text style={styles.pickerPlaceholder}>
                        Selecione uma categoria
                    </Text>
                )}
                <Picker
                    selectedValue={category}
                    onValueChange={setCategory}
                    style={styles.picker}
                >
                    {categoriesToSelect.map((item: CategoryFormated) => (
                        <Picker.Item key={item.key} label={item.label} value={item.key} />
                    ))}
                </Picker>
            </View>
        </View>
    )
}