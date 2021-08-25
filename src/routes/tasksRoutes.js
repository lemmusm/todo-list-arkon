import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
//import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';

const tasksRoutes = [
  {
    title: 'All tasks',
    to: '/',
    icon: <FormatListBulletedOutlinedIcon />,
    exact: true,
  },
  /* {
    title: 'New task',
    to: '/new-task',
    icon: <NoteAddOutlinedIcon />,
  }, */
  {
    title: 'Completed',
    to: '/complete-tasks',
    icon: <AssignmentTurnedInOutlinedIcon />,
  },
];

export default tasksRoutes;
