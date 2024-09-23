import React, { Component } from "react";
import Humanize from "@/lib/dateUtils";
import { Checkbox, Switch } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";

class Table extends Component {
  constructor(props) {
    super(props);
    const { data } = props;

    this.state = {
      activeRows: data.reduce((acc, row) => {
        acc[row.id] = row.is_active;
        return acc;
      }, {}),
    };

    this.humanize = new Humanize();
  }

  handleEdit = (id) => {
    console.log(`Edit record with ID: ${id}`);
  };

  handleRemove = (id) => {
    this.props.setHandleRemoveButton(id);
  };

  handleToggleActive = (id, currentState) => {
    console.log(`Toggling active state for ID: ${id} to ${!currentState}`);
    this.setState((prevState) => ({
      activeRows: {
        ...prevState.activeRows,
        [id]: !currentState,
      },
    }));
  };

  render() {
    const { columns, data } = this.props;
    const { activeRows } = this.state;

    if (!columns.length || !data.length) {
      return (
        <div className="text-gray-500 text-center py-4">
          No data available
        </div>
      );
    }

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
                className="bg-secondary-400 border-red-500 hover:bg-slate-600 hover:cursor-pointer"
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
                  if (column.title === "ID") return null;
                  return (
                    <td
                      key={colIndex}
                      className="px-6 py-4 font-medium text-white whitespace-nowrap"
                    >
                      {column.accessor === "is_active" ? (
                        <Switch
                          isSelected={activeRows[row.id]}
                          color="primary"
                          size="sm"
                          onChange={() => this.handleToggleActive(row.id, activeRows[row.id])}
                        />
                      ) : column.accessor === "role" ? (
                        <Chip size="sm" color="warning" className="text-white capitalize">{row[column.accessor]}</Chip>
                      ) : column.accessor === "created_at" ? (
                        this.humanize.format(row.created_at)
                      ) : column.accessor === "updated_at" ? (
                        this.humanize.format(row.updated_at)
                      ) : column.accessor ? (
                        row[column.accessor] || "N/A"
                      ) : null}

                      {!column.accessor && column.title === 'Action' && (
                        <div className="flex space-x-4">
                          <button
                            onClick={() => this.handleEdit(row.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => this.handleRemove(row.id)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
