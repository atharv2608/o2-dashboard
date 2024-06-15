import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  Cog6ToothIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  CircleStackIcon,
  Cog8ToothIcon,
  CodeBracketIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { MobileSidebar } from "../../components"

const iconMap = {
  PresentationChartBarIcon: PresentationChartBarIcon,
  Cog6ToothIcon: Cog6ToothIcon,
  CalendarDaysIcon: CalendarDaysIcon,
  DocumentTextIcon: DocumentTextIcon,
  CircleStackIcon: CircleStackIcon,
  Cog8ToothIcon: Cog8ToothIcon,
  CodeBracketIcon: CodeBracketIcon,
  BuildingOfficeIcon: BuildingOfficeIcon,
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
                          <NavLink to={subOption.link}>
                        <ListItem key={subIndex} className="ml-5 text-white">
                          <ListItemPrefix>
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-5"
                            />
                          </ListItemPrefix>
                            {subOption.name}
                        </ListItem>
                          </NavLink>
                      ))}
                    </List>
                  </AccordionBody>
                </Accordion>
              ) : (
                  <NavLink to={option.link} className="text-white">
                <ListItem key={index}>
                  <ListItemPrefix>
                    <IconComponent className="h-5 w-5" color="#ef4444" />
                  </ListItemPrefix>
                    {option.name}
                </ListItem>
                  </NavLink>
              );
            })}
          </List>
        </div>
      </div>

      <div className="lg:hidden w-full p-15 bg-black">
        <MobileSidebar iconMap={iconMap} menu={menu} />
      </div>
    </>
  );
}
