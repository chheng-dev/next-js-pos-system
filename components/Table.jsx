import Humanize from "@/lib/dateUtils";
import { Checkbox, Switch } from "@nextui-org/react";
import React, {useState} from "react";
import {Chip} from "@nextui-org/chip";

export default function Table({ columns, data }) {


  if (!columns.length || !data.length) {
    return (
      <div className="text-gray-500 text-center py-4">
        No data available
      </div>
    );
  }

    const handleEdit = (id) => {
      console.log(`Edit record with ID: ${id}`);
    };
  
    const handleRemove = (id) => {
      console.log(`Remove record with ID: ${id}`);
    };

    const [activeRows, setActiveRows] = useState(
      data.reduce((acc, row) => {
        acc[row.id] = row.is_active;
        return acc;
      }, {})
    );
  
    const handleToggleActive = (id, currentState) => {
      console.log(`Toggling active state for ID: ${id} to ${!currentState}`);
    };
  
    const humanize = new Humanize();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-customPrink-400 uppercase bg-secondary-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <Checkbox color="primary" id="checkbox-all-search">
                  <span className="sr-only">checkbox</span>
                </Checkbox>
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            {columns.map((column, index) => (
              <th scope="col" className="px-6 py-3" key={index}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-secondary-400 border-red-500  hover:bg-slate-600 hover:cursor-pointer"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <Checkbox color="primary" id={`checkbox-table-search-${rowIndex}`}>
                    <span className="sr-only">checkbox</span>
                  </Checkbox>
                  <label
                    htmlFor={`checkbox-table-search-${rowIndex}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {rowIndex + 1} 
              </td>

              {columns.map((column, colIndex) => {
                if(column.title === "ID") return null;
                return(
                  <td
                  key={colIndex}
                  className="px-6 py-4 font-medium text-white whitespace-nowrap"
                >
                  {
                    column.accessor === "is_active" ? (
                      <Switch
                        isSelected={row.is_active}
                        color="primary"
                        size="sm"
                        onChange={() => handleToggleActive(row.id, row.is_active)}
                        onValueChange={() =>
                          handleToggleActive(row.id, !row.is_active)
                        }
                      />
                    ) 
                    :
                    column.accessor === "role" ? (
                      <Chip size="sm" color="warning" className="text-white capitalize">{row[column.accessor]}</Chip>
                    ) 
                    :
                    column.accessor === "created_at" ? (
                      humanize.format(row.created_at)
                    ) 
                    :
                    column.accessor === "updated_at" ? (
                      humanize.ago(row.updated_at)
                    ) 
                    : 
                    column.accessor ? (
                      row[column.accessor] || "N/A"
                    ) : null
                  }

                  {!column.accessor && column.title === 'Action' && (
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleEdit(row.id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemove(row.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
