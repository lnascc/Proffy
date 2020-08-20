import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../Components/PageHeader';
import TeacherItem, { Teacher } from '../../Components/TeacherItem';

import styles from './styles'

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);

        setFavorites(favoritedTeachers);
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  },);

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16,
        }}
      >
        {favorites.map((teacher: Teacher, index) => {
          return (
            <TeacherItem 
              key={index}
              teacher={teacher}
              favorited
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Favorites;