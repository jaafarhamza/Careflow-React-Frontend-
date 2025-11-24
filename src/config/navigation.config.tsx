import {
  Home,
  Users,
  Settings,
  FileText,
  Calendar,
  MessageSquare,
  BarChart,
  Shield,
} from 'lucide-react'

export interface NavItem {
  label: string
  to: string
  icon?: React.ReactNode
  roles?: string[] 
  children?: NavItem[]
}

export const navigationConfig: NavItem[] = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: <Home className="h-4 w-4" />,
  },
  {
    label: 'Patients',
    to: '/patients',
    icon: <Users className="h-4 w-4" />,
    roles: ['admin', 'doctor', 'nurse'],
    children: [
      {
        label: 'All Patients',
        to: '/patients',
        roles: ['admin', 'doctor', 'nurse'],
      },
      {
        label: 'Add Patient',
        to: '/patients/new',
        roles: ['admin', 'doctor'],
      },
      {
        label: 'Appointments',
        to: '/patients/appointments',
        roles: ['admin', 'doctor', 'nurse'],
      },
    ],
  },
  {
    label: 'Medical Records',
    to: '/records',
    icon: <FileText className="h-4 w-4" />,
    roles: ['admin', 'doctor'],
    children: [
      {
        label: 'View Records',
        to: '/records',
        roles: ['admin', 'doctor'],
      },
      {
        label: 'Create Record',
        to: '/records/new',
        roles: ['admin', 'doctor'],
      },
    ],
  },
  {
    label: 'Schedule',
    to: '/schedule',
    icon: <Calendar className="h-4 w-4" />,
    roles: ['admin', 'doctor', 'nurse'],
  },
  {
    label: 'Messages',
    to: '/messages',
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    label: 'Reports',
    to: '/reports',
    icon: <BarChart className="h-4 w-4" />,
    roles: ['admin', 'doctor'],
    children: [
      {
        label: 'Analytics',
        to: '/reports/analytics',
        roles: ['admin'],
      },
      {
        label: 'Patient Reports',
        to: '/reports/patients',
        roles: ['admin', 'doctor'],
      },
    ],
  },
  {
    label: 'Administration',
    to: '/admin',
    icon: <Shield className="h-4 w-4" />,
    roles: ['admin'],
    children: [
      {
        label: 'Users',
        to: '/admin/users',
        roles: ['admin'],
      },
      {
        label: 'Roles',
        to: '/admin/roles',
        roles: ['admin'],
      },
      {
        label: 'Settings',
        to: '/admin/settings',
        roles: ['admin'],
      },
    ],
  },
  {
    label: 'Settings',
    to: '/settings',
    icon: <Settings className="h-4 w-4" />,
  },
]

// Filter navigation items based on user role
export function filterNavigationByRole(
  items: NavItem[],
  userRole: string
): NavItem[] {
  return items
    .filter((item) => !item.roles || item.roles.includes(userRole))
    .map((item) => ({
      ...item,
      children: item.children
        ? filterNavigationByRole(item.children, userRole)
        : undefined,
    }))
}
