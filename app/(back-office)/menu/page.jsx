"use client"
import React, { Component } from "react";
import CategoryItem from "@/components/cateogry/CategoryItem";
import { Button } from "@nextui-org/react";
import { PiHamburgerBold } from "react-icons/pi";
import { GiFullPizza, GiChickenOven, GiBread, GiSadCrab } from "react-icons/gi";
import { RiDrinks2Line } from "react-icons/ri";
import { LayoutGridIcon } from "lucide-react";
import TableItem from "@/components/cateogry/TableItem";
import AddCategoryModal from "@/components/cateogry/AddCategoryModal";
import SpecialMenuItem from "@/components/cateogry/SpecailMenuItem";
import { toast } from "react-hot-toast";
import {Skeleton} from "@nextui-org/react";



class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      isModalOpen: false,
      loading: false,
      items: []
    };
  }

  handleTabClick = (index) => {
    this.setState({ activeTab: index });
  };

  async componentWillMount(){
    await this.getCategoriesList();
  }

  handleModalClick = () => {
    this.setState({ isModalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

    getCategoriesList = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch("http://localhost:3000/api/categories", {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const result = await response.json();
      this.setState({ items: result });
    } catch (error) {
      toast.error('An error occurred while making the request');
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  } 

  render() {
    const { activeTab, isModalOpen, items } = this.state;
    

    return (
      <div className="mt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3>Categories</h3>
          </div>
          <div>
            <Button className="bg-customPrink-400" size="sm" onClick={this.handleModalClick}>
              Add New Category
            </Button>
          </div>
        </div>

        {/* Category Item */}
        <div className="lg:flex grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {this.state.loading ? ( 
            items.map((item, idx) => (
              <div key={idx}>
                <Skeleton
                  animate={true}
                  css={{ borderRadius: "$md" }}
                  style={{ height: '100px' }}
                  className="bg-secondary-400 rounded-md"
                />
              </div>
            ))
          ) : (
            items && items.map((item, idx) => (
              <CategoryItem
                key={idx}
                title={item.title}
                icon={item.icon}
                qty={item.qty}
                isActive={activeTab === idx}
                onClick={() => this.handleTabClick(idx)}
              />
            ))
          )}
        </div>

        <div>
          {/* Special Menu Item */}
          <SpecialMenuItem />
          <TableItem />
          <AddCategoryModal isOpen={isModalOpen} onClose={this.handleModalClose} handleGetCategoriesList={this.getCategoriesList} />
        </div>
      </div>
    );
  }
}

export default Page;
