import React, { useState } from 'react';
import { Button, Dialog, FormGroup, InputGroup, Intent, Icon, Classes } from '@blueprintjs/core';
import { login as serviceLogin } from '../../../../service/login';
import { useAuth } from '../../../../contexs/AuthContext';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<Props> = (props: Props) => {
  const { payload, login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fungsi untuk membuka dialog
  // const openDialog = () => setIsOpen(true);

  // Fungsi untuk menangani form submit
  const handleSubmit = async () => {
    try {
      const response = await serviceLogin({ email, password });

      if (response.status === 200) {
        if (response.data != null) {
          if (typeof login === 'function') {
            login(response.data);
          }
        }
      } else {
      }

      if (typeof props.onClose === 'function') {
        props.onClose();
      }
    } catch (error: any) {
      alert('Cannot Login');
    }
  };

  console.log(payload);

  return (
    <>
      <Dialog
        isOpen={props.isOpen}
        onClose={props.onClose}
        title="Login"
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup label="Email" labelFor="email" helperText="Masukkan username Anda">
            <InputGroup
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              leftIcon="envelope"
            />
          </FormGroup>
          <FormGroup label="Password" labelFor="password" helperText="Masukkan password Anda">
            <InputGroup
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              leftIcon="lock"
              type="password"
            />
          </FormGroup>

          <div className={Classes.DIALOG_FOOTER}>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button intent={Intent.PRIMARY} onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default LoginDialog;
