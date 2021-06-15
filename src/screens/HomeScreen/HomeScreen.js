import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import SQLite from 'react-native-sqlite-storage';
import CustomCard from '../../components/CustomCard';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

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
