import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type IconProps = {
    color?: string;
    size?: number;
};

export type novelDetailTabType = 'chapters' | 'volumes' | 'bookmarks';

export interface NovelDetailTabInfo {
  key: novelDetailTabType;
  label: string;
  renderIcon: (isActive: boolean) => React.ReactElement;
}

export const bottomNavTabs = [
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
    name: 'index',
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
    name: 'account/index',
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

export const novelDetailTabs: NovelDetailTabInfo[] = [
  {
    key: 'chapters',
    label: 'Chapters',
    renderIcon: (isActive: boolean) => (
      <MaterialCommunityIcons
        name="format-list-bulleted-square"
        size={24}
        color={isActive ? "#1f2937" : "#4b5563"}
      />
    )
  },
  {
    key: 'volumes',
    label: 'Volumes',
    renderIcon: (isActive: boolean) => (
      <MaterialCommunityIcons
        name="view-grid-outline"
        size={24}
        color={isActive ? "#1f2937" : "#4b5563"}
      />
    )
  },
  {
    key: 'bookmarks',
    label: 'Bookmarks',
    renderIcon: (isActive: boolean) => (
      <FontAwesome
        name="bookmark-o"
        size={24}
        color={isActive ? "#1f2937" : "#4b5563"}
      />
    )
  }
];