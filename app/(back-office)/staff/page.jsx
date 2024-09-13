"use client"
import React, { useState } from "react";
import DropdownComp from "@/components/form/DropdownComp";
import {Tabs, Tab} from "@nextui-org/react"; 
import { Button } from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Radio, RadioGroup} from "@nextui-org/react";

export default function page() {
  const sortbyItems = [
    {
      key: "a-z",
      label: "A-Z",
    },
    {
      key: "z-a",
      label: "Z-A",
    },
  ];
  
  const staffManagementItems = [
    {
      title: "Staff Management",
      key: "staff-management"
    },
    {
      title: "Attendance",
      key: "attendance"
    },
  ]

  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];
  
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

  const [selected, setSelected] = React.useState("staff-management");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg">Staff (22)</h3>
        </div>
        <div className="flex gap-2">
          <Button className="bg-customPrink-400">
            Add Staff
          </Button>

          <DropdownComp 
            title="Sort by"
            items={sortbyItems}
          />
        </div>
      </div>

      <div className="mt-4">
        <Tabs 
          variant="light" 
          aria-label="Tabs" 
          color="primary" 
          className="text-red-200"
          onSelectionChange={setSelected}
        >
          {
            staffManagementItems.map((item) => {
              return(
                <Tab key={item.key} title={item.title} className="text-red-100"/>
              )
            })
          }
        </Tabs>
      </div>

      {
        selected === 'staff-management' ? 
          <div className="flex flex-col gap-3 mt-4">
            <Table 
              aria-label="Selection behavior table example with dynamic content"
              selectionMode="multiple"
            >
              <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        : 
        ""
      }
    </div>
  );
}
