import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import MainContainer from '../../components/main-container/MainContainer';

import HomeStyles from './Home.styles';
import DateDisplay from '../../components/date-display/DateDisplay';
import Calendar from '../../components/calendar/Calendar';
import { ThemeContext } from '../../context/ThemeContext';
import { colors } from '../../constants/theme';
import Schedule from '../../components/schedule/Schedule';
import { dayNames } from '../../constants/dayNames';

function compareObjects(obj1, obj2) {
  const time1 = obj1.time;
  const time2 = obj2.time;

  // Сравниваем объекты по времени (сначала по часам, затем по минутам)
  if (time1.startHours < time2.startHours) return -1;
  if (time1.startHours > time2.startHours) return 1;
  if (time1.startMinutes < time2.startMinutes) return -1;
  if (time1.startMinutes > time2.startMinutes) return 1;
  return 0;
}

function Home({ route }) {
  const { theme } = useContext(ThemeContext);
  const themeColors = colors[theme];

  const currentGroup = route.params?.selectedGroup || useSelector((store) => store.mainGroup);
  const lessons = route.params?.lessons || useSelector((store) => store.mainGroupLessons);

  const d = new Date();
  const [selectedDate, setSelectedDate] = useState(d);
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const filterData = () => {
    const firstSeptember =
      selectedDate.getMonth() >= 8
        ? new Date(selectedDate.getFullYear(), 8, 1)
        : new Date(selectedDate.getFullYear() - 1, 8, 1);

    let add = 0;
    if (firstSeptember.getDay() === 0) {
      add = 6;
    } else if (firstSeptember.getDay() === 1) {
      add = 0;
    } else {
      add = firstSeptember.getDay() - 1;
    }

    const evenOrOddWeek =
      Math.floor(((selectedDate - firstSeptember) / (1000 * 60 * 60 * 24) - (7 - add)) / 7) % 2 === 1 ? 1 : 0;

    return lessons.filter((item) => item.week === evenOrOddWeek && item.weekday === dayNames[selectedDate.getDay()]);
  };

  return (
    <MainContainer>
      <View style={HomeStyles.header}>
        <DateDisplay />
        <Text style={[HomeStyles.groupName, { color: themeColors.primary }]}>{currentGroup.groupName}</Text>
      </View>
      <View style={HomeStyles.calendar}>
        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
      </View>
      <Schedule lessons={filterData().sort(compareObjects)} selectedD={selectedDate} />
    </MainContainer>
  );
}

Home.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      selectedGroup: PropTypes.object,
      lessons: PropTypes.array,
    }),
  }),
};

Home.defaultProps = {
  route: {},
};

export default Home;
