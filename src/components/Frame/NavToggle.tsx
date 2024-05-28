import React from 'react';
import { Navbar, Nav } from 'rsuite';
import {Icon} from '@rsuite/icons';
import {NavOpen,RightRound } from '@/components/CustomIcons';

interface NavToggleProps {
  expand?: boolean;
  onChange?: () => void;
}

const NavToggle = ({ expand, onChange }: NavToggleProps) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav>
        <Nav.Item
          onClick={onChange}
          style={{ textAlign: 'center' }}
          icon={expand ? <Icon as={NavOpen} /> : <Icon as={NavOpen} style={{transform: "rotate(180deg)"}} />}
        />
      </Nav>
      {expand && (
        <Nav pullRight className='note'>
          <Nav.Item style={{ textAlign: 'center' }}>
            <Icon as={RightRound}/>
          </Nav.Item>
        </Nav>
      )}
    </Navbar>
  );
};

export default NavToggle;
