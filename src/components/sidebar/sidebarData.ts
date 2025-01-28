import { ActivityLogIcon, ViewGridIcon, FileTextIcon, ArchiveIcon} from '@radix-ui/react-icons'

export const sidebarData = [
    {
        routeNames: ['/'],
        name: 'Dashboard',
        icon: ViewGridIcon,
        subMenu: null
    },
    {
        routeNames: ['/product'],
        name: 'Product',
        icon: ActivityLogIcon,
        subMenu: null
    },
    {
        routeNames: ['/cart'],
        name: 'Cart',
        icon: ArchiveIcon,
        subMenu: null
    },
    {
        routeNames: ['/record'],
        name: 'Record',
        icon: FileTextIcon,
        subMenu: null
    },
]