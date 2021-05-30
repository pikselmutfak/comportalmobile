import React, { useEffect, useState } from 'react'
import { Container, Text, Content, Form, Item, Input, Label, ListItem, List, Button } from 'native-base'

import { useNavigation, useRoute } from '@react-navigation/native'

import {TouchableOpacity, Linking, Share, StyleSheet} from 'react-native'

import { Col, Row, Grid } from "react-native-easy-grid"

import Icon from 'react-native-vector-icons/Ionicons'
import { TextInputMask } from 'react-native-masked-text'

import { useSelector, useDispatch } from 'react-redux'
import {
    editUser,
    selectUsers
} from './redux/userSlice'

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

    const navigation = useNavigation()

    const dispatch = useDispatch()

    const {params:{_id=""}} = useRoute()
    const user = useSelector(selectUsers).find(user => user._id === _id)

    const [isEditing,setEditing] = useState(false)

    const filterUser = () => {
        const clone = {...user}
        delete clone.firstName
        delete clone.middleName
        delete clone.lastName
        delete clone.tckn
        delete clone.email
        delete clone.phone
        return clone
    }
    const [item,setItem] = useState({})

    useEffect(() => {
        setItem(filterUser())
    }, [user])

    const modifyItem = (key,value) => {
        setItem(previousItem => {
            return {
                ...previousItem,
                [key]: value
            }
        })
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => user._id === "60b02a1acbf94a797a3c96dc" ? (
              isEditing ? (
                <>
                    <Grid>
                        <Row>
                            <Col style={styles.headerRightCol}>
                                <Button 
                                    small
                                    danger
                                    onPress={() => {
                                        setEditing(p => !p)
                                    }}
                                >
                                    <Text>Vazgeç</Text>
                                </Button>
                            </Col>
                            <Col style={styles.headerRightCol}>
                                <Button 
                                    small
                                    success
                                    onPress={() => {
                                        console.log('saving edit', item)
                                        dispatch(editUser(item, user._id, () => {
                                            setEditing(p => !p)
                                        }))
                                    }}
                                >
                                    <Text>Kaydet</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </>
              ) : (
                <Grid>
                    <Row>
                        <Col style={styles.headerRightCol}>
                            <Button 
                                small
                                onPress={() => {
                                    setEditing(p => !p)
                                }}
                            >
                                <Text>Değiştir</Text>
                            </Button>
                        </Col>
                    </Row>
                </Grid>
              )
          ) : (
              <></>
          )
        })
      }, [isEditing, item])    

    const sendMail = (to) => {
        const toURL = "ms-outlook://compose?to="+to
        Linking.openURL(toURL)
    }

    const callPhone = (phone) => {
        const toURL = "tel://0"+phone
        Linking.openURL(toURL)
    }

    const sendWhatsapp = (phone) => {
        const toURL = 'whatsapp://send?phone=+90'+phone
        console.log({toURL})
        Linking.openURL(toURL)
    }

    const viewActivity = (message) => {
        Share.share({
            message: 'TR'+message
        })
    }

    const listItemHeight = 84

    return (

    <Container>
        <Content>
            <List>
                <ListItem style={styles.listItem}>
                    <Grid>
                        <Row>
                            <Col>
                                <Label style={styles.listItemTitle}>İsim</Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label>{user.firstName}{user.middleName ? ' ' + user.middleName : ''} {user.lastName}</Label>
                            </Col>
                        </Row>
                    </Grid>
                    
                </ListItem>
                <ListItem style={{height: listItemHeight}}>
                    <Grid>
                        <Row>
                            <Col>
                                <Label style={styles.listItemTitle}>Email</Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col size={7}>
                                <Label>{user.email}</Label>
                            </Col>
                            <Col size={1}>
                                <TouchableOpacity style={{alignItems: 'center'}} onPress={() => sendMail(user.email)}>
                                    <Icon name="mail-outline" size={24} />
                                </TouchableOpacity>
                            </Col>
                        </Row>
                    </Grid>
                </ListItem>
                <ListItem style={styles.listItem}>
                    <Grid>
                        <Row>
                            <Col>
                                <Label style={styles.listItemTitle}>TCKN</Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col size={7}>
                                <Label>{user.tckn}</Label>
                            </Col>
                            <Col size={1}>
                                <TouchableOpacity style={{alignItems: 'center'}} onPress={() => viewActivity(user.tckn)}>
                                    <Icon name="copy-outline" size={24} />
                                </TouchableOpacity>
                            </Col>
                        </Row>
                    </Grid>
                </ListItem>
                <ListItem style={styles.listItem}>
                    <Grid>
                        <Row>
                            <Col>
                                <Label style={styles.listItemTitle}>Telefon</Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col size={6}>
                                <Label>{formatPhone(user.phone,true)}</Label>
                            </Col>
                            <Col size={1}>
                                <TouchableOpacity style={{alignItems: 'center'}} onPress={() => callPhone(user.phone)}>
                                    <Icon name="call" size={24} />
                                </TouchableOpacity>
                            </Col>
                            <Col size={1}>
                                <TouchableOpacity style={{alignItems: 'center'}} onPress={() => sendWhatsapp(user.phone)}>
                                    <Icon name="logo-whatsapp" size={24} />
                                </TouchableOpacity>
                            </Col>
                        </Row>
                    </Grid>
                </ListItem>
                <ListItem style={isEditing ? styles.listItemEditing : styles.listItem}>
                    <Grid>
                        <Row size={2}>
                            <Col>
                                <Label style={styles.listItemTitle}>IBAN</Label>
                            </Col>
                        </Row>
                        <Row size={4}>
                            <Col size={7}>
                            {
                                isEditing ? (
                                    <Item regular>
                                        <Label>TR</Label>
                                        <TextInputMask
                                            type="custom"
                                            options={{mask: '99 9999 9999 9999 9999 9999 99'}} 
                                            keyboardType="number-pad" 
                                            value={item.iban ? item.iban : ""}
                                            onChangeText={(text) => {
                                                modifyItem('iban', text)
                                            }}
                                            placeholder="IBAN Girin" 
                                            style={{fontSize: 16, paddingBottom: 14, paddingTop: 14}} />
                                    </Item>
                                ) : (
                                    <Label>TR{user.iban}</Label>
                                )
                            }
                            </Col>
                            {
                                (user.iban && !isEditing) && (
                                    <Col size={1}>
                                        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => viewActivity(user.iban)}>
                                            <Icon name="copy-outline" size={24} />
                                        </TouchableOpacity>
                                    </Col>
                                )
                            }
                        </Row>
                    </Grid>
                </ListItem>
            </List>
        </Content>
      </Container>    
    )
}

const styles = StyleSheet.create({
    listItem: {
        height: 84
    },
    listItemEditing: {
        height: 124,
        justifyContent: 'space-around'
    },
    listItemTitle: {
        fontSize: 13, 
        fontWeight: 'bold',
        color: '#777777'
    },
    headerRightCol: {
        marginRight: 6,
        justifyContent: 'center'
    }
})

export default UserDetail