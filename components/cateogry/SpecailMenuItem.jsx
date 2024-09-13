import {Tabs, Tab} from "@nextui-org/react"; 
import { Button } from "@nextui-org/react";
import { PlusCircleIcon } from "lucide-react";


export default function SpecialMenuItem() {
  const tabItems = [
    {
      title: "Normal Menu",
      key: "normal"
    },
    {
      title: "Special Deals",
      key: "special-deals"
    },
    {
      title: "New Year Special",
      key: "new-year-special"
    },
    {
      title: "Deserts and Drinks",
      key: "drink"
    },
  ]
  return (
    <div className="lg:mt-16 mt-4">
      <div className="flex items-center justify-between">
        <h4>Special menu all items</h4>
        <PlusCircleIcon className="w-6 h-6 text-customPrink-400" />
      </div>
      <div className="mt-4 flex items-center justify-between w-full overflow-auto">
        <Tabs variant="light" aria-label="Tabs variants" color="primary">
          {
            tabItems.map((item) => {
              return(
                <Tab key={item.key} title={item.title}/>
              )
            })
          }
        </Tabs>
        <Button className="bg-customPrink-400 lg:block hidden" size="sm">
          Add Menu Item
        </Button>
      </div>
    </div>
  );
}
