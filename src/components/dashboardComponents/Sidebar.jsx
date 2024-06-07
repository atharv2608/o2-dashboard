import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  CircleStackIcon,
  Cog8ToothIcon,
  CodeBracketIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { CalendarIcon } from "@heroicons/react/24/solid";
import Button from "../formElements/Button";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import user from "../../api/User";
import { MobileSidebar } from "../MobileSidebar";

const iconMap = {
    PresentationChartBarIcon: PresentationChartBarIcon,
    Cog6ToothIcon: Cog6ToothIcon,
    CalendarDaysIcon: CalendarDaysIcon,
    DocumentTextIcon: DocumentTextIcon,
    CircleStackIcon: CircleStackIcon,
    Cog8ToothIcon: Cog8ToothIcon,
    CodeBracketIcon: CodeBracketIcon,
    BuildingOfficeIcon:BuildingOfficeIcon
  };
  
const menu = [
  {
    name: "Dashboard",
    link: "/",
    icon: "PresentationChartBarIcon",
  },
  {
    name: "Events",
    link: "/",
    icon: "DocumentTextIcon",
  },
  {
    name: "Non Events",
    link: "/",
    icon: "DocumentTextIcon",
  },
  {
    name: "Schedule",
    link: "/",
    icon: "CalendarDaysIcon",
  },
  {
    name: "Colleges",
    link: "/",
    icon: "BuildingOfficeIcon",
  },
  {
    name: "Data Bank",
    link: "/",
    icon: "CircleStackIcon",
    submenu: [
      {
        name: "Registration",
        link: "/",
      },
      {
        name: "Master Data",
        link: "/",
      },
    ],
  },
  {
    name: "Control Panel",
    link: "/",
    icon: "Cog8ToothIcon",
    submenu: [
      {
        name: "Initial Setup",
        link: "/",
      },
      {
        name: "Features",
        link: "/",
      },
    ],
  },
  {
    name: "Developer",
    link: "/",
    icon: "CodeBracketIcon",
    submenu: [
      {
        name: "Add Feature",
        link: "/",
      },
      {
        name: "Add Role",
        link: "/",
      },
    ],
  },
];


export function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const logoutHandler = async () => {
    dispatch(logout());
    setLoading(true);
    try {
      await user
        .logoutUser()
        .then((res) => {
          if (res.data?.statusCode === 200) {
            navigate("/login", { replace: true });
            setLoading(false);
          }
        })
        .catch((error) => {
          if (error?.response?.status === 401) toast.error("No user logged in");
          else {
            console.error("Error: ", error)
            toast.error("Ran into problem")
          }
          setLoading(false);
        });
    } catch (error) {
      console.error("Error: ", error)
      toast.error("Some error occured")
      setLoading(false)
    } finally{
      setLoading(false)
    }
  };


  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <>
    <div className="hidden lg:flex flex-col bg-black w-full max-w-[15rem]">
      <div className="flex-grow">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="white">
            Dashboard
          </Typography>
        </div>
        <List>
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
                        <NavLink to={subOption.link}>{subOption.name}</NavLink>
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
      <div className="p-4">
        <Button
        loading={loading}
          label="Logout"
          className="logout bg-red-500 text-white text-center py-1 w-full rounded"
          onClick={logoutHandler}
        />
      </div>
    </div>

    <div className="lg:hidden w-full p-15 bg-black">
          <MobileSidebar iconMap={iconMap} menu={menu}/>
    </div>
  </>
  );
}
