import React, { useState } from 'react';
import { Button, Dialog, FormGroup, Intent, Classes, TextArea } from '@blueprintjs/core';
import { useAuth } from '../../../contexs/AuthContext';
import { insert as insertTransaction } from '../../../service/transction'

interface Props {
  isOpen?: boolean;
  onClose: () => void;
}

const AddDialog: React.FC<Props> = (props: Props) => {
  const { payload } = useAuth();

  const [description, setDescription] = useState('');

  const getToken = (payload?: LoginPayload | null): string =>
    payload?.token ?? "-";

  const getUser = (payload?: LoginPayload | null): User =>
    payload?.user ?? { id: 0, email: "", role_id: 0, username: "" };

  const token = getToken(payload);
  const user = getUser(payload);


  const handleSubmit = async (str: string) => {
    try {
      const form: TransactionForm = {
        created_by_user_id: user.id,
        action: user.role_id === 1 ? 'CREATE' : 'UPDATE',
        description: str,
      }
      const response = await insertTransaction(token, form);

      if (response.status === 200) {
        if (typeof props.onClose === 'function') {
          props.onClose();
        }  
      }

    } catch (error: any) {
      alert('Cannot Login');
    }
  };


  return (
    <>
      <Dialog
        isOpen={props.isOpen}
        onClose={props.onClose}
        title="Add Transaksi"
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup label="Description" labelFor="desc" helperText="Input Description">
            <TextArea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fill
              placeholder="Description"
            />
          </FormGroup>

        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button
            intent={Intent.SUCCESS}
            onClick={()=>handleSubmit(description)}
          >
            Add Transaction
          </Button>
        </div>

      </Dialog>
    </>
  );
};

export default AddDialog;
