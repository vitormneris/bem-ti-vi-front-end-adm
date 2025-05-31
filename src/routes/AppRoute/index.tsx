import React from 'react'
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
import { SearchAdministrator } from '../../screens/search/SearchAdministrator';
import CreateAdministrator from '../../screens/create/CreateAdministrator';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
    Home: undefined;
    CreateProduct: undefined;
    ManageProduct: { productId : string};
    SearchProduct: undefined;
    CreateService: undefined;
    ManageService: { serviceId : string};
    SearchService: undefined;
    CreateCategory: undefined;
    ManageCategory: { categoryId : string};
    SearchCategory: undefined;
    ManageProfile: undefined;
    ShowProfile: undefined;
    SearchAdministrator: undefined;
    CreateAdministrator: undefined;
    Login: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function AppRoute() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen 
                    name='Home' 
                    component={Home} 
                    options={() => ({
                        header: () => <Header activateBackButton={false} title="INÍCIO" icon={require('../../assets/images/cachorro.png')} />
                    })}
                />
                <Stack.Screen 
                    name='CreateProduct' 
                    component={CreateProduct} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="CADASTRAR" icon={require('../../assets/images/icone-menu.png')} />
                    })}
                />
                <Stack.Screen 
                    name='ManageProduct' 
                    component={ManageProduct} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="GERENCIAR" icon={require('../../assets/images/icone-menu.png')} />
                    })}
                />
                <Stack.Screen 
                    name='SearchProduct' 
                    component={SearchProduct} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="PRODUTOS" icon={require('../../assets/images/icone-menu.png')} />
                    })}
                />
                <Stack.Screen 
                    name='CreateService' 
                    component={CreateService} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="CADASTRAR" icon={require('../../assets/images/cachorro.png')} />
                    })}
                />
                <Stack.Screen 
                    name='ManageService' 
                    component={ManageService} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="GERENCIAR" icon={require('../../assets/images/cachorro.png')} />
                    })}
                />
                <Stack.Screen 
                    name='SearchService' 
                    component={SearchService} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="SERVIÇOS" icon={require('../../assets/images/cachorro.png')} />
                    })}
                />
                <Stack.Screen 
                    name='CreateCategory' 
                    component={CreateCategory} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="CADASTRAR" icon={require('../../assets/images/categorias.png')} />
                    })}
                />
                <Stack.Screen 
                    name='ManageCategory' 
                    component={ManageCategory} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="GERENCIAR" icon={require('../../assets/images/categorias.png')} />
                    })}
                />
                <Stack.Screen 
                    name='ShowProfile' 
                    component={ShowProfile} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="PERFIL" icon={require('../../assets/images/categorias.png')} />
                    })}
                />
                <Stack.Screen 
                    name='SearchCategory' 
                    component={SearchCategory} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="CATEGORIAS" icon={require('../../assets/images/categorias.png')} />
                    })}
                />
                <Stack.Screen 
                    name='Login' 
                    component={Login} 
                    options={() => ({
                        header: () => <></>
                    })}
                />
                <Stack.Screen 
                    name='CreateAdministrator' 
                    component={CreateAdministrator} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="CADASTRAR" icon={require('../../assets/images/categorias.png')} />
                    })}
                />
                <Stack.Screen 
                    name='ManageProfile' 
                    component={ManageProfile} 
                    options={() => ({
                        header: () =>  <Header activateBackButton={true} title="PERFIL" icon={require('../../assets/images/categorias.png')} />
                    })}
                />
                <Stack.Screen 
                    name='SearchAdministrator' 
                    component={SearchAdministrator} 
                    options={() => ({
                        header: () =>  <Header activateBackButton={true} title="PERFIL" icon={require('../../assets/images/categorias.png')} />
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}