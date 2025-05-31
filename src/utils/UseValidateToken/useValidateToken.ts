import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes/AppRoute";
import { AdministratorId, validateTokenAdm } from "../../api/auth/validateTokenAdm/validateTokenAdm";
import { Alert } from "react-native";
import { useEffect } from "react";

export function useValidateToken() {
    const { navigate } = useNavigation<NavigationProps>();
    
    useEffect(() => {
        async function loadAdministratorId() {
            try {
                const administradorId: AdministratorId | undefined = await validateTokenAdm();
                if (administradorId == undefined) {
                    Alert.alert("Atenção!", "Você foi deslogado!")
                    navigate("Login");
                } 
            } catch (error) {
                console.error('Erro ao autenticar usuário.', error);
            }
        }
        loadAdministratorId();
    }, []);
}