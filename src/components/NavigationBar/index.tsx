import React, { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

import { styles } from "./style"

export const NavigationBar = () => {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <View style={styles.bottomNavigation}>
            <NavItem
                setActiveTab={() => setActiveTab('home')}
                activeTab={activeTab}
                type="home"
                icon={require('../../assets/images/home.png')}
                text="Home"
            />
            <NavItem
                setActiveTab={() => setActiveTab('loja')}
                activeTab={activeTab}
                type="loja"
                icon={require('../../assets/images/cachorro.png')}
                text="Loja"
            />

            <NavItem
                setActiveTab={() => setActiveTab('servicos')}
                activeTab={activeTab}
                type="servicos"
                icon={require('../../assets/images/carrinho.png')}
                text="Serviços"
            />

            <NavItem
                setActiveTab={() => setActiveTab('perfil')}
                activeTab={activeTab}
                type="perfil"
                icon={require('../../assets/images/perfil.png')}
                text="Perfil"
            />
        </View>
    )
}


function NavItem(props: any) {
    return (
        <TouchableOpacity style={styles.navItem} onPress={props.setActiveTab}>
            <View style={styles.navIconContainer}>
                {props.activeTab === props.type &&
                    <View style={styles.activeIndicator} />
                }
                <Image source={props.icon} style={styles.navIcon} />
            </View>
            <Text style={styles.navLabel}> {props.text} </Text>
        </TouchableOpacity>
    )
}
