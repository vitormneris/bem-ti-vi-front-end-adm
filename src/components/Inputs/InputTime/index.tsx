import React, { Dispatch, SetStateAction } from "react"
import { KeyboardTypeOptions, Pressable, Text, TextInput, View } from "react-native"

import { styles } from "./style"
import DateTimePickerAndroid from "@react-native-community/datetimepicker"

export type InputProps = {
    label: string;
    durationEstimated: string;
    setShowTimePicker: Dispatch<SetStateAction<boolean>>;
    showTimePicker: boolean;
    handleTimeChange: (event: any, selectedDate?: Date) => void;
};

export const InputTime = ({ label, showTimePicker, durationEstimated, handleTimeChange, setShowTimePicker }: InputProps) => {
    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>{label}</Text>
            <Pressable
                onPress={() => setShowTimePicker(true)}
                style={styles.inputField}
            >
                <Text>{durationEstimated ? durationEstimated : "Selecionar Duração"}</Text>
            </Pressable>
            {showTimePicker && (
                <DateTimePickerAndroid
                    mode="time"
                    display="default"
                    value={new Date(1970, 0, 1, 0, 0, 0)} // Data local
                    is24Hour={true}
                    onChange={handleTimeChange}
                />
            )}
        </View>
    )
}