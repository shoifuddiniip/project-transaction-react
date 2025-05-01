import React, { useRef } from "react";

import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  AnchorButton,
} from "@blueprintjs/core";
import NotificationButton from './NotificationButton';

interface Props {
  isSidebarOpen: boolean;
  onToogleSlidebar: () => void;
}

const notifications = [
  "Kamu memiliki pesan baru",
  "Pembaruan sistem tersedia",
  "Seseorang menyukai komentar kamu",
];

const NavbarLayout: React.FC<Props> = (props: Props) => {
  const { isSidebarOpen, onToogleSlidebar } = props;
  const alignRight = useRef(false);
  return (
    <>
      <Navbar>
        <NavbarGroup align={alignRight.current ? Alignment.RIGHT : Alignment.LEFT}>
          <NavbarHeading>
            <AnchorButton
              className={Classes.MINIMAL}
              rightIcon={isSidebarOpen ? "arrow-left" : "menu"}
              text={isSidebarOpen === false ? 'Menu' : ''}
              onClick={() => onToogleSlidebar()}
            />
          </NavbarHeading>
          <NavbarHeading>Blueprint</NavbarHeading>
          {/* <NavbarDivider />
            <Button className={Classes.MINIMAL} icon="home" text="Home" />
            <Button className={Classes.MINIMAL} icon="document" text="Files" /> */}
        </NavbarGroup>
        <NavbarGroup align="right">
          <div>
            <NotificationButton />
          </div>
        </NavbarGroup>
      </Navbar>
    </>
  );
}

export default NavbarLayout;