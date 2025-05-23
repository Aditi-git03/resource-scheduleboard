// components/Sidebar.jsx
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar
} from "@mui/material";
import {
  Inbox, EventNote, People, AssignmentTurnedIn
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Requests", icon: <Inbox />, path: "/" },
  { text: "Schedule board", icon: <EventNote />, path: "/schedule-board" },
  { text: "Resources", icon: <People />, path: "/resources" },
  { text: "Bookings", icon: <AssignmentTurnedIn />, path: "/bookings" },
];

const Sidebar = ({ open, isMobile, mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();

  const drawerContent = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) handleDrawerToggle();
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {(open || isMobile) && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          [`& .MuiDrawer-paper`]: { width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        display: { xs: 'none', sm: 'block' },
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidth : 60,
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
