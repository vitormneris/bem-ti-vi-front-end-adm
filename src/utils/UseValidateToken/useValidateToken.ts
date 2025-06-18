import { Alert } from "react-native";
import { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";

import { AdministratorId, validateTokenAdm } from "../../api/auth/validateTokenAdm/validateTokenAdm";
import { Administrator } from "../../api/administrator/create/create";
import { findById } from "../../api/administrator/search/findById";

import { NavigationProps } from "../../routes/AppRoute";

export function useValidateToken() {
    const { navigate } = useNavigation<NavigationProps>();
    
    useEffect(() => {
        async function loadAdministratorId() {
            try {
                const administratorIdResult: AdministratorId | undefined = await validateTokenAdm();
                
                if (!administratorIdResult) {
                    Alert.alert("Atenção!", "Você foi deslogado!");
                    navigate("Login");
                    return;
                }

                const id = administratorIdResult.id;

                const administrator: Administrator | undefined = await findById(id);

                if (!administrator) {
                    throw new Error('Administrador não encontrado');
                }

                if (administrator.activationStatus != null && !administrator.activationStatus.isActive) {
                    navigate("AdministratorDeactivated");
                }
            } catch (error) {
                console.error('Erro ao autenticar usuário.', error);
            }
        }
        loadAdministratorId();
    }, []);
}