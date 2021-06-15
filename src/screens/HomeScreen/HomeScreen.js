import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, ToastAndroid} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import CustomCard from '../../components/CustomCard';

const db = SQLite.openDatabase({
  name: 'PasswordManager',
  createFromLocation: '~mrx.db',
});

const HomeScreen = ({navigation}) => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM apps ORDER BY id DESC',
        [],
        (tx, results) => {
          let count = results.rows.length;

          if (count > 0) {
            let accountsArray = [];
            for (let i = 0; i < count; i++) {
              accountsArray.push(results.rows.item(i));
            }
            setAccounts(accountsArray);
          }
        },
      );
    });
  }, []);

  const deleteAccount = id => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM apps WHERE id=?', [id], (tx, results) => {
        if (results.rowsAffected > 0) {
          navigation.replace('Home');
        }
      });
    });

    ToastAndroid.showWithGravityAndOffset(
      'Deleted Successfully!',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      0,
      20,
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={accounts}
        scrollable
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CustomCard
            id={item.id}
            name={item.name}
            website={item.website}
            username={item.username}
            password={item.password}
            deleteAccount={deleteAccount}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
