import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';

const tasksRoutes = [
  {
    title: 'All tasks',
    to: '/',
    icon: <FormatListBulletedOutlinedIcon />,
    exact: true,
  },
  {
    title: 'Other filters',
    to: '/filtering-tasks',
    icon: <FilterListOutlinedIcon />,
  },
];

export default tasksRoutes;
