import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, HeaderConfigs } from '@/components/ui/header';

const { width: screenWidth } = Dimensions.get('window');

const ReportPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [chartMode, setChartMode] = useState('bar'); // 'bar' or 'line'

  const periods = [
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'yearly', label: 'Yearly' },
  ];

  const stats = {
    goalsAchieved: 4,
    formedHabits: 12,
    finishedTasks: 16,
  };

  const completionRateData = [
    { day: '16', value: 85, highlighted: false },
    { day: '17', value: 65, highlighted: true },
    { day: '18', value: 90, highlighted: false },
    { day: '19', value: 100, highlighted: false },
    { day: '20', value: 75, highlighted: false },
    { day: '21', value: 95, highlighted: false },
    { day: '22', value: 100, highlighted: false },
  ];

  const habitsCompletedData = [
    { day: '16', value: 6, highlighted: false },
    { day: '17', value: 5, highlighted: true },
    { day: '18', value: 5, highlighted: false },
    { day: '19', value: 7, highlighted: false },
    { day: '20', value: 5, highlighted: false },
    { day: '21', value: 6, highlighted: false },
    { day: '22', value: 7, highlighted: false },
  ];

  const tasksCompletedData = [
    { day: '16', value: 6, highlighted: false },
    { day: '17', value: 4, highlighted: true },
    { day: '18', value: 5, highlighted: false },
    { day: '19', value: 7, highlighted: false },
    { day: '20', value: 4, highlighted: false },
    { day: '21', value: 7, highlighted: false },
    { day: '22', value: 5, highlighted: false },
  ];

  const BarChart = ({ data, color, maxValue = 100, showPercentage = false }: { data: any[], color: string, maxValue?: number, showPercentage?: boolean }) => {
    const chartHeight = 120;
    const barWidth = (screenWidth - 80) / data.length - 8;

    return (
      <View className="bg-white rounded-2xl p-4 mb-6">
        <View className="flex-row items-end justify-between mb-4" style={{ height: chartHeight }}>
          {data.map((item: any, index: number) => {
            const barHeight = (item.value / maxValue) * (chartHeight - 20);
            const isHighlighted = item.highlighted;
            
            return (
              <View key={index} className="items-center">
                <View className="flex-1 justify-end mb-2" style={{ height: chartHeight - 20 }}>
                  {isHighlighted && showPercentage && (
                    <View className="absolute -top-8 bg-white rounded-full border-2 border-orange-500 px-2 py-1 z-10">
                      <Text className="text-orange-500 font-bold text-sm">{item.value}{showPercentage ? '%' : ''}</Text>
                    </View>
                  )}
                  {isHighlighted && !showPercentage && (
                    <View className="absolute -top-8 bg-white rounded-full border-2 border-orange-500 px-2 py-1 z-10">
                      <Text className="text-orange-500 font-bold text-sm">{item.value}</Text>
                    </View>
                  )}
                  <View 
                    className={`rounded-t-lg ${isHighlighted ? color.replace('200', '500') : color}`}
                    style={{ 
                      width: barWidth,
                      height: Math.max(barHeight, 4),
                      minHeight: 4 
                    }}
                  />
                </View>
                <Text className="text-xs text-gray-600 mt-1">{item.day}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const LineChart = ({ data, color, maxValue = 100, showPercentage = false }: { data: any[], color: string, maxValue?: number, showPercentage?: boolean }) => {
    const chartHeight = 120;
    const chartWidth = screenWidth - 80;
    const pointSpacing = chartWidth / (data.length - 1);

    // Calculate points for the line
    const points = data.map((item: any, index: number) => ({
      x: (index * pointSpacing) + 20,
      y: 20 + (1 - item.value / maxValue) * (chartHeight - 40),
      value: item.value,
      highlighted: item.highlighted,
      day: item.day,
    }));

    return (
      <View className="bg-white rounded-2xl p-4 mb-6">
        <View className="relative" style={{ height: chartHeight }}>
          {/* Background area with gradient effect */}
          <View className="absolute inset-0">
            <View 
              className={`${color} opacity-30 rounded-b-lg`}
              style={{ 
                height: chartHeight - 20,
              }}
            />
          </View>

          {/* Line segments */}
          {points.map((point: any, index: number) => (
            index < points.length - 1 && (
              <View
                key={`line-${index}`}
                className={`absolute ${color.replace('bg-', 'bg-').replace('-200', '-500')}`}
                style={{
                  left: point.x,
                  top: point.y,
                  width: points[index + 1].x - point.x,
                  height: 3,
                  transform: [
                    {
                      rotate: `${Math.atan2(
                        points[index + 1].y - point.y,
                        points[index + 1].x - point.x
                      )}rad`,
                    },
                  ],
                }}
              />
            )
          ))}

          {/* Points */}
          {points.map((point: any, index: number) => (
            <View key={`point-${index}`}>
              <View
                className={`absolute w-4 h-4 rounded-full border-2 ${
                  point.highlighted 
                    ? `${color.replace('bg-', 'bg-').replace('-200', '-500')} border-white` 
                    : `bg-white ${color.replace('bg-', 'border-').replace('-200', '-500')}`
                }`}
                style={{
                  left: point.x - 8,
                  top: point.y - 8,
                }}
              />
              
              {/* Highlighted value */}
              {point.highlighted && (
                <View 
                  className="absolute bg-white rounded-full border-2 border-orange-500 px-2 py-1"
                  style={{
                    left: point.x - 15,
                    top: point.y - 35,
                  }}
                >
                  <Text className="text-orange-500 font-bold text-sm">
                    {point.value}{showPercentage ? '%' : ''}
                  </Text>
                </View>
              )}
            </View>
          ))}

          {/* X-axis labels */}
          <View className="absolute bottom-0 left-0 right-0 flex-row justify-between px-5">
            {data.map((item: any, index: number) => (
              <Text key={index} className="text-xs text-gray-600">{item.day}</Text>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const ChartModeToggle = ({ color }: { color: string }) => (
    <View className="flex-row bg-gray-100 rounded-lg p-1 ml-auto">
      <TouchableOpacity
        className={`p-2 rounded ${chartMode === 'bar' ? color.replace('bg-', 'bg-').replace('-200', '-500') : 'bg-transparent'}`}
        onPress={() => setChartMode('bar')}
      >
        <Ionicons 
          name="bar-chart" 
          size={16} 
          color={chartMode === 'bar' ? 'white' : '#6b7280'} 
        />
      </TouchableOpacity>
      <TouchableOpacity
        className={`p-2 rounded ${chartMode === 'line' ? color.replace('bg-', 'bg-').replace('-200', '-500') : 'bg-transparent'}`}
        onPress={() => setChartMode('line')}
      >
        <Ionicons 
          name="trending-up" 
          size={16} 
          color={chartMode === 'line' ? 'white' : '#6b7280'} 
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <Header {...HeaderConfigs.basic("Report")} size="large" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View className="mx-4 mt-6">
          <View className="flex-row bg-white rounded-2xl p-1">
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                className={`flex-1 py-3 rounded-xl ${
                  selectedPeriod === period.id ? 'bg-orange-500' : 'bg-transparent'
                }`}
                onPress={() => setSelectedPeriod(period.id)}
              >
                <Text className={`text-center font-medium ${
                  selectedPeriod === period.id ? 'text-white' : 'text-gray-600'
                }`}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Date Range */}
        <View className="flex-row items-center justify-between mx-4 mt-4">
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color="#6b7280" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">
            Dec 16 - Dec 22, 2024
          </Text>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View className="flex-row justify-between mx-4 mt-6 mb-8">
          <View className="flex-1 items-center">
            <Text className="text-3xl font-bold text-gray-900">{stats.goalsAchieved}</Text>
            <Text className="text-gray-500 text-sm mt-1">Goals achieved</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-3xl font-bold text-gray-900">{stats.formedHabits}</Text>
            <Text className="text-gray-500 text-sm mt-1">Formed habits</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-3xl font-bold text-gray-900">{stats.finishedTasks}</Text>
            <Text className="text-gray-500 text-sm mt-1">Finished tasks</Text>
          </View>
        </View>

        {/* Completion Rate Chart */}
        <View className="mx-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-900">Completion Rate</Text>
            <ChartModeToggle color="bg-orange-200" />
          </View>
          {chartMode === 'bar' ? (
            <BarChart 
              data={completionRateData} 
              color="bg-orange-200" 
              maxValue={100}
              showPercentage={true}
            />
          ) : (
            <LineChart 
              data={completionRateData} 
              color="bg-orange-200" 
              maxValue={100}
              showPercentage={true}
            />
          )}
        </View>

        {/* Habits Completed Chart */}
        <View className="mx-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-900">Habits Completed</Text>
            <ChartModeToggle color="bg-orange-200" />
          </View>
          {chartMode === 'bar' ? (
            <BarChart 
              data={habitsCompletedData} 
              color="bg-orange-200" 
              maxValue={8}
            />
          ) : (
            <LineChart 
              data={habitsCompletedData} 
              color="bg-orange-200" 
              maxValue={8}
            />
          )}
        </View>

        {/* Tasks Completed Chart */}
        <View className="mx-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-900">Tasks Completed</Text>
            <ChartModeToggle color="bg-blue-200" />
          </View>
          {chartMode === 'bar' ? (
            <BarChart 
              data={tasksCompletedData} 
              color="bg-blue-200" 
              maxValue={8}
            />
          ) : (
            <LineChart 
              data={tasksCompletedData} 
              color="bg-blue-200" 
              maxValue={8}
            />
          )}
        </View>

        {/* Bottom spacing */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportPage;