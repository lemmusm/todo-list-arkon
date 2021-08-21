import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { blueGrey, deepPurple, grey } from '@material-ui/core/colors';
import tasksRoutes from '../../routes/tasksRoutes';

// style
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  list: {
    padding: theme.spacing(2),
  },
  listItem: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& .MuiListItemText-primary': {
      fontWeight: 600,
      color: blueGrey[800],
    },
    '& .MuiListItemIcon-root': {
      color: grey[400],
      minWidth: theme.spacing(5),
    },
    '&:hover': {
      color: deepPurple['A700'],
      backgroundColor: grey[100],
      borderRadius: theme.spacing(1),
      '& .MuiListItemIcon-root': {
        color: deepPurple['A700'],
      },
      '& .MuiListItemText-primary': {
        fontWeight: 600,
        color: deepPurple['A700'],
      },
    },
  },
  nested: {
    paddingLeft: theme.spacing(5),
    marginTop: theme.spacing(1),
    '& .MuiListItemText-primary': {
      fontWeight: 400,
      color: blueGrey[800],
    },
    '& .MuiListItemIcon-root': {
      color: grey[400],
      minWidth: theme.spacing(5),
    },
    '&:hover': {
      color: deepPurple['A700'],
      backgroundColor: grey[100],
      borderRadius: theme.spacing(1),
      '& .MuiListItemIcon-root': {
        color: deepPurple['A700'],
      },
      '& .MuiListItemText-primary': {
        fontWeight: 600,
        color: deepPurple['A700'],
      },
    },
  },
  link: { textDecoration: 'none' },
  selected: {
    color: deepPurple['A700'],
    borderRadius: theme.spacing(1),
    '& .MuiListItem-root': {
      backgroundColor: grey[100],
      borderRadius: theme.spacing(1),
    },
    '& .MuiListItemIcon-root': {
      color: deepPurple['A700'],
    },
    '& .MuiListItemText-primary': {
      fontWeight: 600,
      color: deepPurple['A700'],
    },
  },
}));

const MenuItems = () => {
  // get classes from style
  const classes = useStyles();

  // manage collapse menu
  const [open, setOpen] = useState(true);

  const handleCollpse = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className={classes.toolbar} />
      <List className={classes.list}>
        <ListItem button className={classes.listItem} onClick={handleCollpse}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {tasksRoutes.map((item, index) => {
              return (
                <NavLink
                  key={index}
                  className={classes.link}
                  activeClassName={classes.selected}
                  to={item.to}
                  exact={item.exact}
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItem>
                </NavLink>
              );
            })}
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default withRouter(MenuItems);
