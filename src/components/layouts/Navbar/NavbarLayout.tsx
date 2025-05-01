import React, { useRef } from "react";

import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  AnchorButton,
} from "@blueprintjs/core";

interface Props {
  isSidebarOpen: boolean;
  onToogleSlidebar: () => void;
}

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
          <Button className={Classes.MINIMAL} icon="notifications"/>
        </NavbarGroup>
      </Navbar>
    </>
  );
}

export default NavbarLayout;