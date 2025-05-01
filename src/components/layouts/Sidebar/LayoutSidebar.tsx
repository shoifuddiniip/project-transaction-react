import React, { useState } from 'react';
import {
  Popover,
  Position,
  AnchorButton,
  H3,
  Text,
  Icon,
  Menu,
  MenuItem,
  MenuDivider,
} from '@blueprintjs/core';
import profileImg from '../../../assets/profile.jpg';
import { menudata } from './data';
import LoginDialog from './LoginDialog';
import { useAuth } from '../../../contexs/AuthContext';
import styles from './layoutsidebar.module.css';

interface Props {
  isOpen: boolean;
}

const LayoutSidebar: React.FC<Props> = (props: Props) => {
  const { isOpen } = props;
  const { payload } = useAuth();

  const [onOpenLogin, setOnOpenLogin] = useState(false);

  const renderMenus = (menu: MenuList[]) => {
    return menu.map((v) => {
      return (
        <>
          <div className={styles.menuitem}>
            <div className={styles.leftbaritem}>&nbsp;</div>
            <div>
              <Icon
                className={styles.iconitem}
                icon={v.icon}
              />
            </div>
            {v.icon === "log-in" ? <AnchorButton
              minimal
              className={styles.buttonitem}
              onClick={()=>setOnOpenLogin(true)}
              style={{
                color: '#CED9E0',
                textAlign: 'left',
                marginLeft: 15,
              }}
            >
              {v.name}
            </AnchorButton> :
              <AnchorButton
                minimal
                className={styles.buttonitem}
                style={{
                  color: '#CED9E0',
                  textAlign: 'left',
                  marginLeft: 15,
                }}
              >
                {v.name}
              </AnchorButton>
            }
          </div>
        </>
      );
    });
  }

  return (
    <>
      <div className={[styles.sidebar, isOpen ? styles.open : ''].join(" ")}>
        <div className={styles.topelement}>
          <Popover
            portalClassName={styles.topportal}
            interactionKind="click"
            position={Position.BOTTOM_RIGHT}
            content={
              <>
                <Menu>
                  <MenuItem icon="person" text="Profile" />
                  <MenuItem icon="key" text="Change Password" />
                  <MenuDivider />
                  <MenuItem icon="log-out" text="Logout" />
                </Menu>
              </>
            }
          >
            <AnchorButton
              minimal
              className={styles.topbutton}
            >
              <Icon
                icon="cog"
                style={{
                  color: '#CED9E0',
                }}
                className={styles.icon}
              />
            </AnchorButton>
          </Popover>
        </div>
        <div className={styles.profile}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div className={styles.profilephoto}>
              <img
                src={profileImg}
                alt="Profile"
              />
            </div>
          </div>
          <H3>{payload?.user.username}</H3>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
            }}
          >
            {payload?.user.email}
          </Text>
        </div>
        <div>
          {renderMenus(menudata)}
        </div>
      </div>
      <LoginDialog
        isOpen={onOpenLogin}
        onClose={() => setOnOpenLogin(false)}
      />
    </>
  );
};

export default LayoutSidebar;
