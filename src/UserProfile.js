import React, { useState } from 'react';
import { Container, Text, Content, Form, Item, Input, Label } from 'native-base';

import { useNavigation, useRoute } from '@react-navigation/native'

import moment from 'moment'

import DateTimePicker from '@react-native-community/datetimepicker'

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

const UserProfile = () => {

    const {params:{user={}}} = useRoute()

    const [item,setItem] = useState(user)

    const modifyItem = (key,value) => {
        setItem(previousItem => {
            return {
                ...previousItem,
                [key]: value
            }
        })
    }

    return (

      <Container>
        <Content>
          <Form>
            <Item underline>
              <Input disabled value={item.firstName} onChangeText={text => modifyItem('firstName', text)} />
            </Item>
            <Item underline>
              <Input disabled value={item.middleName} onChangeText={text => modifyItem('middleName', text)} />
            </Item>
            <Item underline>
              <Input disabled value={item.lastName} onChangeText={text => modifyItem('lastName', text)} />
            </Item>
            <Item underline>
              <Input disabled value={item.email} onChangeText={text => modifyItem('email', text)} />
            </Item>
            <Item underline>
              <Input disabled value={item.tckn} onChangeText={text => modifyItem('tckn', text)} />
            </Item>
            <Item underline>
              <Input hideKeyboardAccessoryView keyboardType="phone-pad" value={item.phone} onChangeText={text => modifyItem('phone', text)} />
            </Item>
            <Item>
              
            </Item>
            <DateTimePicker
                testID="dateTimePicker"
                value={new Date(item.startedAt)}
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {console.log(selectedDate)}}
              />

          </Form>
        </Content>
      </Container>    
    )
}

export default UserProfile