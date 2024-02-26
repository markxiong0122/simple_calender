import React,{useState} from 'react';
import {ScrollView,StyleSheet,Text,View} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarWithEvents = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const events = {
    '2024-02-26': [{ time: '10:00', title: 'Meeting' }, { time: '12:00', title: 'Lunch' }],

  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true },
        }}
        
      />
      {selectedDate && events[selectedDate] ? (
        <ScrollView style={styles.eventList}>
          {events[selectedDate].map((event, index) => (
            <View key={index} style={styles.eventItem}>
              <Text style={styles.eventTime}>{event.time}</Text>
              <Text style={styles.eventTitle}>{event.title}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noEventsText}>No Events</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventList: {
    marginTop: 20,
  },
  eventItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  eventTime: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  eventTitle: {
    flex: 1,
  },
  noEventsText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CalendarWithEvents;
