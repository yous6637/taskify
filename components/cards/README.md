# Reusable Card Components

This directory contains theme-compatible, reusable card components for the Taskify application. All components are built using the UI component system and support dark mode automatically.

## Components Overview

### 1. GoalCard (`goal-card.tsx`)
A flexible card component for displaying goals with various configurations.

**Features:**
- Multiple variants: `default`, `explore`, `compact`
- Support for images and illustrations
- Progress tracking for habits and tasks
- User count display
- Days left indicator
- Configurable actions (add button, press handler)

**Usage:**
```tsx
import { GoalCard, GoalCardConfigs } from '@/components/cards';

// Basic usage
<GoalCard 
  {...GoalCardConfigs.myGoals}
  goal={{
    id: 1,
    title: "Learn React Native",
    habits: { completed: 3, total: 5 },
    tasks: { completed: 2, total: 4 },
    daysLeft: 30
  }}
  onPress={() => navigate('/goal/1')}
/>
```

### 2. HabitCard (`habit-card.tsx`)
A comprehensive card component for displaying habits with progress tracking.

**Features:**
- Multiple variants: `default`, `compact`, `detailed`
- Weekly progress visualization
- Streak tracking
- Toggle completion state
- Delete functionality
- Time and frequency display

**Usage:**
```tsx
import { HabitCard, HabitCardConfigs } from '@/components/cards';

// Detailed habit card with weekly progress
<HabitCard 
  {...HabitCardConfigs.detailed}
  habit={{
    id: 1,
    title: "Morning Exercise",
    reminder: "07:00",
    frequency: "Daily",
    completed: [true, true, false, true, false, true, true],
    streak: 5
  }}
  onDelete={() => handleDelete(1)}
  showProgress={true}
/>
```

### 3. TaskCard (`task-card.tsx`)
A versatile card component for displaying tasks with various display options.

**Features:**
- Multiple variants: `default`, `compact`, `inline`
- Priority indicators
- Category display
- Due date and time
- Completion toggle
- Color indicators
- Notes display

**Usage:**
```tsx
import { TaskCard, TaskCardConfigs } from '@/components/cards';

// Inline task card for lists
<TaskCard 
  {...TaskCardConfigs.inline}
  task={{
    id: 1,
    title: "Complete project proposal",
    time: "14:00",
    priority: "high",
    completed: false,
    color: "bg-red-500"
  }}
  onToggle={() => toggleTask(1)}
  showColorIndicator={true}
/>
```

### 4. StatsCard (`stats-card.tsx`)
A flexible card component for displaying statistics and metrics.

**Features:**
- Multiple variants: `default`, `progress`, `metric`, `compact`
- Progress bar visualization
- Trend indicators
- Custom icons
- Metrics breakdown

**Usage:**
```tsx
import { StatsCard, StatsCardConfigs } from '@/components/cards';

// Progress card
<StatsCard 
  {...StatsCardConfigs.progress}
  progress={{
    current: 7,
    total: 10,
    label: "Tasks completed today"
  }}
/>

// Metric card
<StatsCard 
  {...StatsCardConfigs.metric}
  metrics={{
    habits: 5,
    tasks: 3,
    completed: 7,
    total: 8
  }}
/>
```

## Configuration Presets

Each card component comes with predefined configuration presets for common use cases:

### GoalCard Configs
- `GoalCardConfigs.explore` - For explore page with add button and user count
- `GoalCardConfigs.myGoals` - For personal goals with progress and days left
- `GoalCardConfigs.compact` - Minimal version for small spaces

### HabitCard Configs
- `HabitCardConfigs.simple` - Basic display with toggle
- `HabitCardConfigs.detailed` - Full features with weekly progress
- `HabitCardConfigs.compact` - Minimal version
- `HabitCardConfigs.manageable` - With all management options

### TaskCard Configs
- `TaskCardConfigs.simple` - Basic task display
- `TaskCardConfigs.detailed` - Full features with priority and category
- `TaskCardConfigs.compact` - Minimal version
- `TaskCardConfigs.inline` - For inline lists with color indicators

### StatsCard Configs
- `StatsCardConfigs.progress` - Progress bar display
- `StatsCardConfigs.metric` - Metrics breakdown
- `StatsCardConfigs.simple` - Basic stats display
- `StatsCardConfigs.compact` - Minimal version

## Theme Compatibility

All card components are fully compatible with dark mode and use semantic color tokens:

- `bg-card` - Card background
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `border-border` - Border colors
- `bg-primary` - Primary accent
- `bg-destructive` - Destructive actions

## Implementation Details

### Architecture
- Built on top of the base `Card` component from `@/components/ui/card`
- Uses `class-variance-authority` for variant management
- Fully typed with TypeScript interfaces
- Responsive design with proper spacing

### Performance
- Optimized with proper React patterns
- Minimal re-renders with efficient prop handling
- Lazy loading support for images

### Accessibility
- Proper semantic markup
- Touch target sizing
- Screen reader support
- Keyboard navigation

## Migration Guide

### From Old Components
The existing `HabitCard` and `TaskCard` components in `components/list/` have been updated to use the new card system while maintaining backward compatibility.

### Usage in Pages
Components have been integrated into:
- `app/(app)/index.tsx` - Home page with TaskCard and StatsCard
- `app/(app)/goals/index.tsx` - Goals list with GoalCard
- `app/(app)/explore.tsx` - Explore page with GoalCard
- `app/(app)/goals/details/[id].tsx` - Goal details with HabitCard

## Best Practices

1. **Use Configuration Presets**: Start with predefined configs and customize as needed
2. **Consistent Spacing**: Use the `className` prop for consistent margins
3. **Theme Colors**: Always use semantic color tokens, never hardcoded colors
4. **Accessibility**: Provide proper onPress handlers and accessible content
5. **Performance**: Use React.memo for cards in large lists
6. **Type Safety**: Always provide proper TypeScript types for data

## Examples

See `components/examples/` for comprehensive usage examples and live demonstrations of all card components and their configurations.
