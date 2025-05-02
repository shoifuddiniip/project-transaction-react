import React, { useEffect, useState } from "react";
import { Button, Card, HTMLTable } from "@blueprintjs/core";
import { useAuth } from "../../contexs/AuthContext";
import { getAll as getAllTransaction } from "../../service/transction";
import moment from "moment";

const BeautyTable: React.FC = () => {
  const { payload } = useAuth();

  const [transction, setTransction] = useState<Transaction[]>([]);

  const getToken = (payload?: LoginPayload | null): string =>
    payload?.token ?? "-";

  const getUser = (payload?: LoginPayload | null): User =>
    payload?.user ?? { id: 0, email: "", role_id: 0, username: "" };

  const token = getToken(payload);
  const user = getUser(payload);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getAllTransaction(token);
        if (response.status === 200 && Array.isArray(response.data)) {
          const filter = response.data.filter((obj)=> obj.created_by_user_id === user.id);
          setTransction(filter);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, [token, user.id]);

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="bp4-heading bp4-large" style={{ marginBottom: "1rem" }}>
        Table Transaksi
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 10,
        }}
      >
        <Button
          intent="success"
        >ADD</Button>
      </div>
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
            {transction.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.description}</td>
              <td>{moment(item.created_at).format('YYYY-MM-DD')}</td>
              <td></td>
            </tr>
            ))}
          </tbody>
        </HTMLTable>
      </Card>
    </div>
  );
};

export default BeautyTable;
