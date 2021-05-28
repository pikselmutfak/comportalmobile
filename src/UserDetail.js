import React, { useState } from 'react';
import { Container, Text, Content, Form, Item, Input, Label, ListItem, List } from 'native-base';

import { useNavigation, useRoute } from '@react-navigation/native'

import {TouchableOpacity, Linking, Share} from 'react-native'

const formatPhone = (phone,shapeIt) => {

    let text = ""

    if (shapeIt) {
        if (phone.length === 10) {
            for (let i=0; i<phone.length; i++) {
                if (i===0) text += "("
                if (i===3) text += ") "
                if (i===6) text += " "
                if (i===8) text += " "
                text += phone.charAt(i)
            }
            text = '0 '+text
        }
    } else {
        text = phone.replace(/ /g, '').replace(/_/g,'').replace('(','').replace(')','').replace(/-/g,'')
    }

    return text
}

const UserDetail = () => {

    const {params:{user={}}} = useRoute()

    const sendMail = (to) => {
        const toURL = "ms-outlook://compose?to="+to
        Linking.openURL(toURL)
    }

    const callPhone = (phone) => {
        const toURL = "tel://0"+phone
        Linking.openURL(toURL)
    }

    const viewActivity = (message) => {
        Share.share({
            message
        })
    }

    return (

    <Container>
        <Content>
            <List>
                <ListItem>
                    <Label>{user.firstName} {user.middleName} {user.lastName}</Label>
                </ListItem>
                <ListItem>
                    <TouchableOpacity onPress={() => sendMail(user.email)}>
                        <Label>{user.email}</Label>
                    </TouchableOpacity>
                </ListItem>
                <ListItem>
                    <TouchableOpacity onPress={() => callPhone(user.phone)}>
                        <Label>{formatPhone(user.phone,true)}</Label>
                    </TouchableOpacity>
                </ListItem>
                <ListItem>
                    <TouchableOpacity onPress={() => viewActivity(user.tckn)}>
                        <Label>{user.tckn}</Label>
                    </TouchableOpacity>
                </ListItem>
            </List>
        </Content>
      </Container>    
    )
}

export default UserDetail