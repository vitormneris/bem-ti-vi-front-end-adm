import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import UpdateEmail from '../../screens/email/UpdateEmail';
import SendRequestChangeEmail from '../../screens/email/SendRequestChangeEmail';
import UpdatePassword from '../../screens/UpdatePassword';
import SendRequestConfirmationEmail from '../../screens/email/SendRequestConfirmationEmail';
import ConfirmationEmail from '../../screens/email/ConfirmationEmail';
import { SearchAppointment } from '../../screens/search/SearchAppointment';
import { SearchOrder } from '../../screens/search/SearchOrder';
import { GLOBAL_VAR } from '../../api/config/globalVar';
import { AdministratorDeactivated } from '../../screens/AdministratorDeactivated';
import DeleteProfile from '../../screens/DeleteProfile';
import { SearchCustomer } from '../../screens/search/SearchCustomer';
import { UpdatePaymentStatus } from '../../screens/UpdatePaymentStatus';
import { ViewServices } from '../../screens/views/ViewServices';
import { Order, Appointment, Customer, Administrator, Product, Service } from '../../utils/Types';
import { ViewAdministrator } from '../../screens/views/ViewAdministrator';
import { ViewProduct } from '../../screens/views/ViewProduct';
import ChatADM from '../../screens/ChatADM';

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
    SendRequestChangeEmail: { email: string };
    SendRequestConfirmationEmail: { email: string };
    UpdateEmail: { email: string };
    SearchAppointment: undefined;
    SearchOrder: undefined;
    UpdatePassword: undefined;
    ConfirmationEmail: { email: string };
    AdministratorDeactivated: undefined;
    DeleteProfile: undefined;
    SearchCustomer: undefined;
    UpdatePaymentStatus: { item: Order|Appointment, type: string };
    ViewServices: {service: Service};
    ViewAdministrator: {administrator: Administrator};
    ViewProduct: {product: Product};
    ChatADM: { name: string };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function AppRoute() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="ViewProduct"
                    component={ViewProduct}
                    options={() => ({
                        header: () => (
                            <Header
                                title="PRODUTOS"
                                activateBackButton={true}
                                iconName="inventory"
                                backScreen="SearchProduct"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="ViewAdministrator"
                    component={ViewAdministrator}
                    options={() => ({
                        header: () => (
                            <Header
                                title="PERFIL"
                                activateBackButton={true}
                                iconName="person"
                                backScreen="ShowProfile"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="ViewServices"
                    component={ViewServices}
                    options={() => ({
                        header: () => (
                            <Header
                                title="SERVIÇOS"
                                activateBackButton={true}
                                iconName="miscellaneous-services"
                                backScreen="SearchService"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="AdministratorDeactivated"
                    component={AdministratorDeactivated}
                    options={() => ({
                        header: () => <></>
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
                                title="INÍCIO"
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
                                title="CADASTRAR PRODUTO"
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
                                title="EDITAR PRODUTO"
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
                                title="PRODUTOS"
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
                                title="CADASTRAR SERVIÇOS"
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
                                title="EDITAR SERVIÇO"
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
                                title="SERVIÇOS"
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
                                title="CADASTRAR CATEGORIA"
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
                                title="EDITAR CATEGORIA"
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
                                title="CATEGORIAS"
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
                                title="CADASTRAR ADMINISTRADOR"
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
                                title="ADMINISTRADORES"
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
                                title="ADMINISTRADORES INATIVOS"
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
                                title="PERFIL"
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
                                title="EDITAR PERFIL"
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
                                title="ATUALIZAR SENHA"
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
                    name="SendRequestChangeEmail"
                    component={SendRequestChangeEmail}
                    options={() => ({
                        header: () => (
                            <Header
                                title="ALTERAR E-MAIL"
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
                                title="ATUALIZAR E-MAIL"
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
                                title="AGENDAMENTOS"
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
                                title="PEDIDOS"
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
                    name="UpdatePaymentStatus"
                    component={UpdatePaymentStatus}
                    options={() => ({
                        header: () => (
                            <Header
                                title="ATUALIZAR PAGAMENTO"
                                activateBackButton={true}
                                iconName="shopping-cart"
                                backScreen="SearchOrder"
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
                                title="CONFIRMAR E-MAIL"
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
                                title="CONFIRMAR E-MAIL"
                                activateBackButton={true}
                                iconName="mail"
                                backScreen="SendRequestConfirmationEmail"
                                needProps={true}
                                props={{ email: GLOBAL_VAR.USER_EMAIL }}
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="DeleteProfile"
                    component={DeleteProfile}
                    options={() => ({
                        header: () => (
                            <Header
                                title="DELETAR CONTA"
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
                    name="SearchCustomer"
                    component={SearchCustomer}
                    options={() => ({
                        header: () => (
                            <Header
                                title="CLIENTES"
                                activateBackButton={true}
                                iconName="person"
                                backScreen="Home"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="ChatADM"
                    component={ChatADM}
                    options={() => ({
                        header: () => (
                            <Header
                                title="CHAT ADM"
                                activateBackButton={true}
                                iconName="message"
                                backScreen="ShowProfile"
                                needProps={false}
                                props={null}
                            />
                        )
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}