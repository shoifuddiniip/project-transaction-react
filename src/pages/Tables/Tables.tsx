import React from "react";
import { Card, HTMLTable } from "@blueprintjs/core";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
}

const BeautyTable: React.FC = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="bp4-heading bp4-large" style={{ marginBottom: "1rem" }}>
        Table Transaksi
      </h1>
      <Card elevation={2}>
        <HTMLTable striped bordered style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Description</th>
              <th>Datetime</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map((item) => ( */}
              <tr>
                <td>1</td>
                <td>Pembayarna Baru</td>
                <td>2025-05-02</td>
                <td></td>
              </tr>
            {/* ))} */}
          </tbody>
        </HTMLTable>
      </Card>
    </div>
  );
};

export default BeautyTable;
