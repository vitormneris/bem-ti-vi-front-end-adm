import { useEffect } from "react";
import { BackHandler } from "react-native";

export default function hardwareBackPress(goTo: any, screen: any) {
    
        useEffect(() => {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                goTo(screen);
                return true;
            });
    
            return () => backHandler.remove();
        }, []);

};