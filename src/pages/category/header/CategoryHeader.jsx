import React from "react";
import CategoryForm from "../../../components/ui/form/CategoryForm";

const CategoryHeader = () => {
  return (
    <div className="mt-12">
      <div className="container">
        <div className="grid grid-cols-2 gap-6">
          <div className="aspect-video rounded-lg shadow-2xl">
            <img
              src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t39.30808-6/315089370_686417329515056_4251857865293074564_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=e3f864&_nc_ohc=PhXl9TQf8xUAX_nMPND&_nc_ht=scontent.fsgn5-2.fna&oh=00_AfB50fz3m3uVPTgDDiIcbh3OQ8NT37QishIl3N81ve3Efg&oe=6376C5D0"
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <CategoryForm type="update" />
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
