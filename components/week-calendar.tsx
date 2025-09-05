import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

const WeekCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [weekDates, setWeekDates] = useState([]);

  // Days of the week
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Generate current week dates
  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust for Monday start
    
    const monday = new Date(today.setDate(diff));
    const dates = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }
    
    setWeekDates(dates);
    // Set Sunday (22) as selected by default
    setSelectedDate(6); // Index 6 is Sunday
  }, []);

  const formatDate = (date) => {
    return date.getDate();
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <View className={`p-4 ${colorScheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Week Calendar */}
      <View className="flex-row justify-between items-center mb-4">
        {weekDates.map((date, index) => (
          <View key={index} className="items-center">
            {/* Day Label */}
            <Text className={`text-sm mb-2 ${
              colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {dayLabels[index]}
            </Text>
            
            {/* Date Circle */}
            <TouchableOpacity
              onPress={() => setSelectedDate(index)}
              className={`w-12 h-12 rounded-full border-2 justify-center items-center ${
                selectedDate === index 
                  ? 'border-orange-500' 
                  : 'border-orange-500'
              } ${colorScheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
            >
              <Text className={`text-lg font-medium ${
                selectedDate === index 
                  ? 'text-orange-500' 
                  : 'text-orange-500'
              }`}>
                {formatDate(date)}
              </Text>
            </TouchableOpacity>
            
            {/* Selected indicator dot */}
            {selectedDate === index && (
              <View className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
            )}
          </View>
        ))}
      </View>
      
      {/* Dropdown indicator */}
      <View className="items-center">
        <ChevronDown 
          size={20} 
          color={colorScheme === 'dark' ? '#9CA3AF' : '#9CA3AF'} 
        />
      </View>
    </View>
  );
};

export default WeekCalendar;