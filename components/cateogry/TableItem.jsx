import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Tooltip} from "@nextui-org/react";
import { Edit, EyeIcon, Trash2Icon, User } from "lucide-react";

const renderButtonAction = (itemId) => {
  return(
    <div className="relative flex items-center gap-2">
      <Tooltip content="Details">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EyeIcon className="w-5 h-5" />
        </span>
      </Tooltip>
      <Tooltip content="Edit product">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <Edit className="w-5 h-5" />
        </span>
      </Tooltip>
      <Tooltip color="danger" content="Delete product">
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <Trash2Icon className="w-5 h-5" />
        </span>
      </Tooltip>
    </div>
  )
}

const columns = [
  {
    key: "image",
    label: "Image",
  },
  {
    key: "name",
    label: "Product Name",
  },
  {
    key: "itemID",
    label: "Item ID",
  },
  {
    key: "stock",
    label: "Stock",
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "availability",
    label: "Availability",
  },
  {
    key: 'action'
  }
];

const rows = [
  {
    key: '1',
    name: 'Product A',
    itemID: '0022klalfda',
    stock: "In Stock",
    category: 'Seafood',
    price: 1019,
    availability: 'Active',
    image: <User />,
    action: renderButtonAction('0022klalfda')
  }
]

export default function TableItem() {

  return (
    <div className="mt-6">
      <Table 
        color="primary"
        aria-label="Controlled table example with dynamic content"
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
  );
}
