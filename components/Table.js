import React, { Component } from "react";
import { Checkbox, Pagination } from "@nextui-org/react";

class Table extends Component {
  constructor(props) {
    super(props);
    const { data } = props;

    this.state = {
      activeRows: data.reduce((acc, row) => {
        acc[row.id] = row.is_active;
        return acc;
      }, {}),
      currentPage: props.currentPage | 0,
      rowsPerPage: props.rowsPerPage | 0
    };

  }

  getTotalPages() {
    return Math.ceil(this.props.data.length / this.state.rowsPerPage);
  }

  getCurrentData() {
    const { currentPage, rowsPerPage } = this.state;
    const { data } = this.props;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  }

  handlePageChange(newPage) {
    if (newPage < 1 || newPage > this.getTotalPages()) return;
    this.setState({ currentPage: newPage });
  }

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
    const { currentPage, rowsPerPage } = this.state;
    const currentData = this.getCurrentData();
    const totalPages = this.getTotalPages();

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
            {currentData.map((row, rowIndex) => (
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
                  {(currentPage - 1) * rowsPerPage + rowIndex + 1}
                </td>


                {columns.map((column, colIndex) => {
                  if (column.title === "ID") return null;
                  return (
                    <td
                      key={colIndex}
                      className="px-6 py-4 font-medium text-white whitespace-nowrap"
                    >
                      {column.render
                        ? column.render(row) // Use the custom render function if provided
                        : row[column.accessor] || 'N/A'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {
          data.length > rowsPerPage && (
            <div className="flex justify-center items-center space-x-4 mt-4">
              <p className="text-small text-default-500">Page {currentPage} of {totalPages}</p>
              <Pagination
                loop
                showControls
                color="primary"
                radius="full"
                total={totalPages}
                initialPage={1}
                page={currentPage}
                onChange={(page) => this.handlePageChange(page)}
                size="sm"
              />
            </div>
          )
        }

      </div>
    );
  }
}

export default Table;
