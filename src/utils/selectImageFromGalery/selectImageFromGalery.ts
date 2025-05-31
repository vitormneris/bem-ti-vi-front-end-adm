import { Alert } from "react-native";

import * as ImagePicker from 'expo-image-picker';

export async function selectImageFromGalery(): Promise<string | null> {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar suas fotos!');
            return null;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            return result.assets[0].uri;
        }
        return null;
    };