import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Card, ListItem, Button} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import * as RootNavigation from '../App/RootNavigation';

const CustomCard = ({
  id,
  name,
  website,
  username,
  password,
  deleteAccount,
  navigation,
}) => {
  const [show, setShow] = useState(false);

  return (
    <Card>
      <View style={styles.title}>
        <Card.Title>{name}</Card.Title>
        <View style={styles.iconView}>
          <Card.Title onPress={() => setShow(!show)}>
            <TouchableOpacity onPress={() => deleteAccount(id)}>
              <MaterialIcons name="delete" size={24} color="#000" />
            </TouchableOpacity>
          </Card.Title>
          <Card.Title onPress={() => setShow(!show)}>
            <TouchableOpacity
              onPress={() =>
                RootNavigation.navigate('Update', {
                  id,
                  name,
                  website,
                  username,
                  password,
                })
              }>
              <Feather name="edit-2" size={24} color="#000" />
            </TouchableOpacity>
          </Card.Title>
          <Card.Title onPress={() => setShow(!show)}>
            <Entypo
              name={`${show ? 'eye' : 'eye-with-line'}`}
              size={24}
              color="#000"
            />
          </Card.Title>
        </View>
      </View>
      <Card.Divider />
      <View>
        <Text style={styles.list}>Website: {website}</Text>
        <Text style={styles.list}>
          username: {show ? username : username.replace(/./g, '*')}
        </Text>
        <Text style={styles.list}>
          password: {show ? password : password.replace(/./g, '*')}
        </Text>
      </View>
    </Card>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  list: {
    padding: 10,
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 150,
  },
});
