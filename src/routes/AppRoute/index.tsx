import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Header } from '../../components/Header';

import { Home } from '../../screens/Home';
import { Login } from '../../screens/Login';

import { CreateProduct } from '../../screens/create/CreateProduct';
import ManageProduct from '../../screens/manage/ManageProduct';
import { SearchProduct } from '../../screens/search/SearchProduct';

import { CreateService } from '../../screens/create/CreateService';
import ManageService from '../../screens/manage/ManageService';
import { SearchService } from '../../screens/search/SearchService';

import { CreateCategory } from '../../screens/create/CreateCategory';
import ManageCategory from '../../screens/manage/ManageCategory';
import { SearchCategory } from '../../screens/search/SearchCategory';

import { ShowProfile } from '../../screens/ShowProfile';
import ManageProfile from '../../screens/manage/ManageProfile';

import CreateAdministrator from '../../screens/create/CreateAdministrator';
import { SearchAdministrator } from '../../screens/search/SearchAdministrator';
import { SearchDeactivatedAdministrator } from '../../screens/search/SearchDeactivatedAdministrator';

import SendRequestEmail from '../../screens/email/SendRequestEmail';
import UpdateEmail from '../../screens/email/UpdateEmail';

import UpdatePassword from '../../screens/password/UpdatePassword';

import SendRequestConfirmationEmail from '../../screens/email/SendRequestConfirmationEmail';
import ConfirmationEmail from '../../screens/email/ConfirmationEmail';

import { SearchAppointment } from '../../screens/search/SearchAppointment';
import { SearchOrder } from '../../screens/search/SearchOrder';

import { GLOBAL_VAR } from '../../api/config/globalVar';
import { AdministratorDeactivated } from '../../screens/AdministratorDeactivated';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
    Home: undefined;
    CreateProduct: undefined;
    ManageProduct: { id: string };
    SearchProduct: undefined;
    CreateService: undefined;
    ManageService: { id: string };
    SearchService: undefined;
    CreateCategory: undefined;
    ManageCategory: { id: string };
    SearchCategory: undefined;
    ManageProfile: undefined;
    ShowProfile: undefined;
    SearchAdministrator: undefined;
    CreateAdministrator: undefined;
    Login: undefined;
    SearchDeactivatedAdministrator: undefined;
    SendRequestEmail: undefined;
    SendRequestConfirmationEmail: { email: string };
    UpdateEmail: undefined;
    SearchAppointment: undefined;
    SearchOrder: undefined;
    UpdatePassword: undefined;
    ConfirmationEmail: undefined;
    AdministratorDeactivated: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function AppRoute() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">

                <Stack.Screen
                    name="AdministratorDeactivated"
                    component={AdministratorDeactivated}
                    options={() => ({
                        header: () => (
                            <></>
                        )
                    })}
                />

                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        header: () => <></>
                    }}
                />

                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Início"
                                activateBackButton={false}
                                iconName="home"
                                backScreen={null}
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="CreateProduct"
                    component={CreateProduct}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Cadastrar Produto"
                                activateBackButton={true}
                                iconName="add-shopping-cart"
                                backScreen="SearchProduct"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="ManageProduct"
                    component={ManageProduct}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Editar Produto"
                                activateBackButton={true}
                                iconName="edit"
                                backScreen="SearchProduct"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="SearchProduct"
                    component={SearchProduct}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Produtos"
                                activateBackButton={false}
                                iconName="inventory"
                                backScreen={null}
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="CreateService"
                    component={CreateService}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Cadastrar Serviço"
                                activateBackButton={true}
                                iconName="build"
                                backScreen="SearchService"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="ManageService"
                    component={ManageService}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Editar Serviço"
                                activateBackButton={true}
                                iconName="edit"
                                backScreen="SearchService"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="SearchService"
                    component={SearchService}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Serviços"
                                activateBackButton={false}
                                iconName="miscellaneous-services"
                                backScreen={null}
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="CreateCategory"
                    component={CreateCategory}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Cadastrar Categoria"
                                activateBackButton={true}
                                iconName="category"
                                backScreen="SearchCategory"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="ManageCategory"
                    component={ManageCategory}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Editar Categoria"
                                activateBackButton={true}
                                iconName="edit"
                                backScreen="SearchCategory"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="SearchCategory"
                    component={SearchCategory}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Categorias"
                                activateBackButton={false}
                                iconName="category"
                                backScreen={null}
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="CreateAdministrator"
                    component={CreateAdministrator}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Cadastrar Administrador"
                                activateBackButton={true}
                                iconName="person-add"
                                backScreen="SearchAdministrator"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="SearchAdministrator"
                    component={SearchAdministrator}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Administradores"
                                activateBackButton={true}
                                iconName="admin-panel-settings"
                                backScreen="ShowProfile"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="SearchDeactivatedAdministrator"
                    component={SearchDeactivatedAdministrator}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Administradores Inativos"
                                activateBackButton={true}
                                iconName="person-off"
                                backScreen="SearchAdministrator"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="ShowProfile"
                    component={ShowProfile}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Perfil"
                                activateBackButton={false}
                                iconName="person"
                                backScreen={null}
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="ManageProfile"
                    component={ManageProfile}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Editar Perfil"
                                activateBackButton={true}
                                iconName="manage-accounts"
                                backScreen="ShowProfile"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="UpdatePassword"
                    component={UpdatePassword}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Atualizar Senha"
                                activateBackButton={true}
                                iconName="lock-reset"
                                backScreen="ShowProfile"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="SendRequestEmail"
                    component={SendRequestEmail}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Solicitar Alteração de Email"
                                activateBackButton={true}
                                iconName="mail"
                                backScreen="ShowProfile"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="UpdateEmail"
                    component={UpdateEmail}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Atualizar Email"
                                activateBackButton={true}
                                iconName="alternate-email"
                                backScreen="SendRequestEmail"
                                needProps={false}
                                props={null}   
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="SearchAppointment"
                    component={SearchAppointment}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Agendamentos"
                                activateBackButton={true}
                                iconName="event"
                                backScreen="Home"
                                needProps={false}
                                props={null}   
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="SearchOrder"
                    component={SearchOrder}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Pedidos"
                                activateBackButton={true}
                                iconName="shopping-cart"
                                backScreen="Home"
                                needProps={false}
                                props={null}                               
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="SendRequestConfirmationEmail"
                    component={SendRequestConfirmationEmail}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Confirmar Email"
                                activateBackButton={true}
                                iconName="mail"
                                backScreen="ShowProfile"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="ConfirmationEmail"
                    component={ConfirmationEmail}
                    options={() => ({
                        header: () => (
                            <Header
                                title="Confirmar Email"
                                activateBackButton={true}
                                iconName="mail"
                                backScreen="SendRequestConfirmationEmail"
                                needProps={true}
                                props={{ email: GLOBAL_VAR.USER_EMAIL }}
                            />
                        )
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
