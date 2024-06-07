import React from "react";
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
  CodeBracketIcon
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { CalendarIcon } from "@heroicons/react/24/solid";
import Button from "../formElements/Button";
 
export function SideBar2() {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <div className="hidden lg:flex flex-col bg-black w-full max-w-[15rem] h-screen">
      <div className="flex-grow">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="white">
            Dashboard
          </Typography>
        </div>
        <List>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" color="#ef4444"/>
            </ListItemPrefix>
            <NavLink to="/" className="text-white">Dashboard</NavLink>     
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <DocumentTextIcon className="h-5 w-5" color="#ef4444" />
            </ListItemPrefix>
            <NavLink to="/" className="text-white">Events</NavLink>     
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <DocumentTextIcon className="h-5 w-5" color="#ef4444"/>
            </ListItemPrefix>
            <NavLink to="/" className="text-white">Non Events</NavLink>     
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <CalendarIcon className="h-5 w-5" color="#ef4444"/>
            </ListItemPrefix>
            <NavLink to="/" className="text-white" >Schedule</NavLink>     
          </ListItem>
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <CircleStackIcon className="h-5 w-5" color="#ef4444"/>
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal text-white">
                  <NavLink to="/">Databank</NavLink>
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem className="ml-5 text-white">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Analytics
                </ListItem>
                <ListItem className="ml-5 text-white">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Master data
                </ListItem>
                <ListItem className="ml-5 text-white">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Printable
                </ListItem>
                <ListItem className="ml-5 text-white">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Creatives
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <Cog8ToothIcon className="h-5 w-5" color="#ef4444"/>
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                  Control Panel
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem className="text-white ml-5">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Initial Setup
                </ListItem>
                <ListItem className="text-white ml-5">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Developer
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 3}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 3}>
              <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <CodeBracketIcon className="h-5 w-5" color="#ef4444"/>
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                  Developer
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem className="text-white ml-5">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Add feature
                </ListItem>
                <ListItem className="text-white ml-5">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Developer
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>  
        </List>
      </div>
      <div className="p-4">
        <Button label="Logout" className="logout bg-red-500 text-white text-center py-1 w-full rounded" />
      </div>
    </div>
  );
}
