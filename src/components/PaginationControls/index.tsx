import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { Text } from 'react-native';

type Props = {
    pageIndex: number;
    totalPages: number;
    onNext: () => void;
    onPrev: () => void;
};

export const PaginationControls = ({ pageIndex, totalPages, onNext, onPrev }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.paginationContainer}>
                <Button
                    icon={require('../../assets/images/seta-voltar.png')}
                    color={pageIndex > 0 ? '#256489' : '#aaa'}
                    action={() => {
                        if (pageIndex > 0) onPrev();
                    }}
                />
    
                <Text style={styles.text}> {pageIndex + 1} </Text>

                <Button
                    icon={require('../../assets/images/seta-avancar.png')}
                    color={pageIndex < totalPages - 1 ? '#256489' : '#aaa'}
                    action={() => {
                        if (pageIndex < totalPages - 1) onNext();
                    }}
                />
            </View>
        </View>
    );
};

const Button = (props: any) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: props.color }]} onPress={props.action}>
            <Image source={props.icon} style={styles.icon} />
        </TouchableOpacity>
    )

}