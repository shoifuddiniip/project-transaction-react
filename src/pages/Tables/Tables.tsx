import React from "react";
import { Card } from "@blueprintjs/core";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
}

const data: Product[] = [
  { id: 1, name: "Luna Skin Serum", category: "Skincare", price: "$35.00" },
  { id: 2, name: "Velvet Matte Lipstick", category: "Makeup", price: "$22.00" },
  { id: 3, name: "Glow Mist", category: "Skincare", price: "$18.00" },
  { id: 4, name: "Rose Quartz Roller", category: "Tools", price: "$28.00" },
];

const BeautyTable: React.FC = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="bp4-heading bp4-large" style={{ marginBottom: "1rem" }}>
        Beauty Products
      </h1>
      <Card elevation={2}>
        <table className="bp4-html-table bp4-html-table-bordered bp4-html-table-striped" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default BeautyTable;
