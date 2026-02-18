export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'main-navigation',
    title: 'Main Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item'
      },
      {
        id: 'vehicles',
        title: 'Vehicles',
        type: 'item',
        url: '/vehicles',
        icon: 'feather icon-truck',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'account',
    title: 'Account',
    type: 'group',
    icon: 'icon-pages',
    children: [
      {
        id: 'login',
        title: 'Sign in',
        type: 'item',
        url: '/auth/login',
        icon: 'feather icon-log-in',
        classes: 'nav-item',
        breadcrumbs: false
      },
      {
        id: 'register',
        title: 'Sign up',
        type: 'item',
        url: '/auth/register',
        icon: 'feather icon-user-plus',
        classes: 'nav-item',
        breadcrumbs: false
      }
    ]
  }
];
