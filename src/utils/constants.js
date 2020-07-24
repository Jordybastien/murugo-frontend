import {
  faShieldAlt,
  faSlidersH,
  faHome,
  faUserCog,
  faExchangeAlt,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';

export const AllRoles = Object.freeze({
  admin: 'Admin',
  developer: 'Developer',
  user: 'User',
  creditScore: 'Credit-Score',
  bank: 'Bank',
  manager: 'Manager',
});

export const AdminRoutes = [
  {
    activeRoute: 'dashboard',
    icon: faSlidersH,
    label: 'Dashboard',
    goTo: '/dashboard',
  },
  {
    activeRoute: 'mortgages',
    icon: faLayerGroup,
    label: 'Mortgages',
    goTo: '/dashboard/mortgages',
  },
  {
    activeRoute: 'roles',
    icon: faShieldAlt,
    label: 'Roles',
    goTo: '/dashboard/roles',
  },
  {
    activeRoute: 'users',
    icon: faUserCog,
    label: 'Users',
    goTo: '/dashboard/users',
  },
  {
    activeRoute: 'properties',
    icon: faHome,
    label: 'Properties',
    goTo: '/dashboard/properties',
  },
  {
    activeRoute: 'ranges',
    icon: faExchangeAlt,
    label: 'Ranges',
    goTo: '/dashboard/ranges',
  },
];
