import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
type IconProps = {
    color?: string;
    size?: number;
};


const tabs = [
  {
    name: 'history/index',
    title: 'History',
    icon: ({ color, size }: IconProps) => (
      <MaterialIcons
        name='history'
        size={size || 24}
        color={color || '#6366f1'}
      />
    ),
  },
  {
    name: 'updates/index',
    title: 'Updated',
    icon: ({ color, size }: IconProps) => (
      <MaterialIcons
        name='refresh'
        size={size || 24}
        color={color || '#6366f1'}
      />
    ),
  },
  {
    name: 'explore/index',
    title: 'Explore',
    icon: ({ color, size }: IconProps) => (
      <MaterialIcons
        name='explore'
        size={size || 24}
        color={color || '#6366f1'}
      />
    ),
  },
  {
    name: 'fanart/index',
    title: 'Fan Art',
    icon: ({ color, size }: IconProps) => (
      <MaterialCommunityIcons
        name='brush'
        size={size || 24}
        color={color || '#6366f1'}
      />
    ),
  },
  {
    name: '(account)/account/index',
    title: 'Account',
    icon: ({ color, size }: IconProps) => (
      <MaterialIcons
        name='person'
        size={size || 24}
        color={color || '#6366f1'}
      />
    ),
  },
];

export default tabs