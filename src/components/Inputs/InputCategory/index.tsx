import React, { Dispatch, SetStateAction } from "react";
import { Text, View, Pressable, TouchableOpacity } from "react-native";

import { CategoryFormated } from "../../../utils/Types";

import { styles } from "./style";

type InputCategoryProps = {
  label: string;
  categoriesToSelect: CategoryFormated[] | undefined;
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
};

export const InputCategory = ({
  label,
  categoriesToSelect,
  selectedCategories,
  setSelectedCategories,
}: InputCategoryProps) => {
  if (!categoriesToSelect) return null;

  const toggleCategory = (key: string) => {
    if (selectedCategories.includes(key)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== key));
    } else {
      setSelectedCategories([...selectedCategories, key]);
    }
  };

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ marginTop: 10 }}>
        {categoriesToSelect.map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => toggleCategory(item.key)}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 6,
              backgroundColor: selectedCategories.includes(item.key)
                ? "#cce5cc"
                : "#eee",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: selectedCategories.includes(item.key)
                  ? "#006316"
                  : "#333",
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
