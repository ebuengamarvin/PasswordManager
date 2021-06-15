import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Input, Button, Image} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'PasswordManager',
  createFromLocation: '~mrx.db',
});

const LoginScreen = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    isAuth && navigation.replace('Home');
    getStorage();
    // removeStorage();
  }, [isAuth, navigation]);

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('mrx', jsonValue);
    } catch (e) {
      //   console.warn({e});
    }
  };

  const getStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('mrx');
      if (value !== null) {
        setIsAuth(true);
      }
    } catch (e) {
      //   console.warn({e});
    }
  };

  const onSubmit = data => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username=? AND password=?',
        [data.username, data.password],
        (tx, results) => {
          let count = results.rows.length;

          if (count > 0) {
            let accountsArray = [];

            for (let i = 0; i < count; i++) {
              accountsArray.push(results.rows.item(i));
            }

            storeData(accountsArray);
            navigation.replace('Home');
          } else {
            ToastAndroid.showWithGravityAndOffset(
              'Invalid Credentials!',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              0,
              20,
            );
          }
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image
          source={require('../../assets/images/mrx.jpg')}
          style={styles.image}
        />
      </View>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username..."
            leftIcon={<Ionicons name="person" size={24} />}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            errorStyle={{color: 'red'}}
            errorMessage={
              errors.username && <Text>This field is required.</Text>
            }
          />
        )}
        name="username"
        rules={{required: true}}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password..."
            leftIcon={<EntypoIcon name="key" size={24} />}
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            errorStyle={{color: 'red'}}
            errorMessage={
              errors.password && <Text>This field is required.</Text>
            }
          />
        )}
        name="password"
        rules={{required: true}}
        defaultValue=""
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        icon={<AntDesignIcon name="login" size={15} color="white" />}
        title="Login"
        titleStyle={styles.send}
        containerStyle={styles.sendContainer}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
  },
  image: {
    borderRadius: 100,
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  sendContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  send: {
    width: 150,
  },
});
