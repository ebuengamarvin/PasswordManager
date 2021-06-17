import React from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  Image,
  Dimensions,
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Input, Button} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import SQLite from 'react-native-sqlite-storage';
import validationSchema from './validationSchema';
import {yupResolver} from '@hookform/resolvers/yup';

const db = SQLite.openDatabase({
  name: 'PasswordManager',
  createFromLocation: '~mrx.db',
});

const CreateScreen = ({navigation, route}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = data => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO apps(name, website, username, password) VALUES('${data.name}', '${data.website}', '${data.username}', '${data.password}')`,
        [],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            navigation.replace('Home');
          }
        },
      );
    });

    ToastAndroid.showWithGravityAndOffset(
      'Created Successfully!',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      0,
      20,
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60}>
      <Image
        source={require('../../assets/images/marvin.jpg')}
        blurRadius={12}
        style={[
          StyleSheet.absoluteFillObject,
          {
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
          },
        ]}
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="App name..."
            leftIcon={<Ionicons name="apps" size={24} />}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            errorStyle={{color: 'red'}}
            errorMessage={errors.name && <Text>{errors.name.message}</Text>}
          />
        )}
        name="name"
        rules={{required: true}}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Website..."
            leftIcon={<FoundationIcon name="link" size={30} />}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            errorStyle={{color: 'red'}}
            errorMessage={
              errors.website && <Text>{errors.website.message}</Text>
            }
          />
        )}
        name="website"
        rules={{required: true}}
        defaultValue=""
      />
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
              errors.username && <Text>{errors.username.message}</Text>
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
              errors.password && <Text>{errors.password.message}</Text>
            }
          />
        )}
        name="password"
        rules={{required: true}}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm Password..."
            leftIcon={<EntypoIcon name="key" size={24} />}
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            errorStyle={{color: 'red'}}
            errorMessage={
              errors.confirmPassword && (
                <Text>{errors.confirmPassword.message}</Text>
              )
            }
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        )}
        name="confirmPassword"
        rules={{required: true}}
        defaultValue=""
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        icon={<FeatherIcon name="send" size={15} color="white" />}
        title="Save"
        titleStyle={styles.send}
        containerStyle={styles.sendContainer}
      />
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    marginBottom: 20,
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
