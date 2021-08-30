import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import TimelineIcon from '@material-ui/icons/Timeline';

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
  {
    title: 'Charts',
    to: '/chart-tasks',
    icon: <TimelineIcon />,
  },
];

export default tasksRoutes;
