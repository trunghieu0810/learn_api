import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const options = [
  {
    month: 'All',
    value: 0,
  },
  {
    month: 'Jan',
    value: 1,
  },
  {
    month: 'Feb',
    value: 2,
  },
  {
    month: 'Mar',
    value: 3,
  },
  {
    month: 'Apr',
    value: 4,
  },
  {
    month: 'May',
    value: 5,
  },
  {
    month: 'Jun',
    value: 6,
  },
  {
    month: 'Jul',
    value: 7,
  },
  {
    month: 'Aug',
    value: 8,
  },
  {
    month: 'Sep',
    value: 9,
  },
  {
    month: 'Oct',
    value: 10,
  },
  {
    month: 'Nov',
    value: 11,
  },
  {
    month: 'Dec',
    value: 12,
  }
];

export default function SplitButtonMonth(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    props.setMonth(index)
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <div className='relative z-50'>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <Button style={{ backgroundColor: '#1565c0' }} onClick={handleClick}>{options[selectedIndex].month}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          style={{ backgroundColor: '#1565c0' }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        className='shadow-md'
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={index}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option.month}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
