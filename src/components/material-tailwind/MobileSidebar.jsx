import React from "react";
import { NavLink } from "react-router-dom";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,

  Accordion,
  AccordionHeader,
  AccordionBody,

  Drawer,
} from "@material-tailwind/react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import MyProfile from "./MyProfile";
export function MobileSidebar({ menu, iconMap }) {
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const userData = useSelector((state) => state?.auth?.userData);
 

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <div className="flex p-3">
        <IconButton
          color="white"
          variant="text"
          size="lg"
          onClick={openDrawer}
          className="mr-auto"
        >
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2" />
          ) : (
            <Bars3Icon className="h-8 w-8 stroke-2" />
          )}
        </IconButton>
        <MyProfile username={`${userData.firstName} ${userData.lastName}`} role={userData.designation} />
      </div>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <div
          color="transparent"
          shadow={"false"}
          className="h-screen w-full p-4 bg-black"
        >
          <div className="flex flex-col h-screen">
          <List className="flex-grow">
            <XMarkIcon
              className="h-8 w-8 stroke-2 mb-8"
              onClick={closeDrawer}
              color="white"
            />
            {menu.map((option, index) => {
              const IconComponent = iconMap[option.icon];
              return option?.submenu ? (
                <Accordion
                  key={index}
                  open={open === index}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === index ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={open === index}>
                    <AccordionHeader
                      onClick={() => handleOpen(index)}
                      className="border-b-0 p-3"
                    >
                      <ListItemPrefix>
                        <IconComponent className="h-5 w-5" color="#ef4444" />
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="mr-auto font-normal text-white"
                      >
                        <NavLink to={option.link}>{option.name}</NavLink>
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0">
                      {option.submenu.map((subOption, subIndex) => (
                        <ListItem key={subIndex} className="ml-5 text-white">
                          <ListItemPrefix>
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-5"
                            />
                          </ListItemPrefix>
                          <NavLink to={subOption.link}>
                            {subOption.name}
                          </NavLink>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionBody>
                </Accordion>
              ) : (
                <ListItem key={index}>
                  <ListItemPrefix>
                    <IconComponent className="h-5 w-5" color="#ef4444" />
                  </ListItemPrefix>
                  <NavLink to={option.link} className="text-white">
                    {option.name}
                  </NavLink>
                </ListItem>
              );
            })}
          </List>
          </div>
        </div>
      </Drawer>
    </>
  );
}
