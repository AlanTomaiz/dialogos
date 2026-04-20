import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, MessageCircle, NotebookText, User } from 'lucide-react-native';
import { Agenda } from '../screens/Agenda';
import { Chat } from '../screens/Chat';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { Colors, Radius, Shadow, Spacing } from '../theme';

const Tab = createBottomTabNavigator();

const TAB_ACTIVE_COLOR = '#E8532A';
const TAB_INACTIVE_COLOR = '#9DA3B4';
const TAB_BAR_BG = Colors.text;

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: TAB_ACTIVE_COLOR,
        tabBarInactiveTintColor: TAB_INACTIVE_COLOR,
        tabBarStyle: {
          backgroundColor: TAB_BAR_BG,
          borderTopWidth: 0,
          borderRadius: Radius.xl,
          marginHorizontal: Spacing.base,
          marginBottom: Spacing.base,
          height: 64,
          position: 'absolute',
          ...Shadow.md,
        },
        tabBarItemStyle: {
          paddingVertical: Spacing.sm,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <House size={24} color={color} strokeWidth={focused ? 2.5 : 1.8} />
          ),
          tabBarBadge: '',
          tabBarBadgeStyle: {
            backgroundColor: TAB_ACTIVE_COLOR,
            minWidth: 8,
            height: 8,
            borderRadius: 4,
            fontSize: 0,
            top: 6,
          },
        }}
      />
      <Tab.Screen
        name="Agenda"
        component={Agenda}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <NotebookText size={24} color={color} strokeWidth={focused ? 2.5 : 1.8} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MessageCircle size={24} color={color} strokeWidth={focused ? 2.5 : 1.8} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <User size={24} color={color} strokeWidth={focused ? 2.5 : 1.8} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
