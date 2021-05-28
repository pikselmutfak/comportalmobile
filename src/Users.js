import React, {useState, useEffect} from 'react'
import { Container, Header, Left, Body, Right, Title, Content, List, ListItem, Text, Icon, Button } from 'native-base'

import { useSelector, useDispatch } from 'react-redux'
import {
    addUser,
    editUser,
    removeUser,
    selectUsers,
    getUsers
} from './redux/userSlice'

import { useNavigation } from '@react-navigation/native'

const Users = () => {

  const navigation = useNavigation()

  const dispatch = useDispatch()
  const users = useSelector(selectUsers)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <Container>
        <Content>
          <List>
          {
            users.map((user) => {
              return (
                <ListItem key={user._id} onPress={() => {
                  navigation.navigate('UserProfile')
                }}>
                  <Text>{user.firstName}</Text>
                </ListItem>
              )
            })
          }
          </List>
        </Content>
      </Container>
    )
}

export default Users