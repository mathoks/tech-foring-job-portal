import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';

function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  const navigate = useNavigate();
  return (
    <Tab
      component="a"
      onClick={(e) => {
        return navigate(`/${e.target.dataset.active}`);
      }}
      aria-current={props.selected && "page"}
      {...props}
    />
  );
}

LinkTab.propTypes = {
  selected: PropTypes.bool,
};

export default function NavTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    // if (
    //   event.type !== 'click' ||
    //   (event.type === 'click' && samePageLinkNavigation(event))
    // ) {
   
      setValue(newValue);

    // }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
        centered
      >
        <LinkTab label="View All Jobs" data-active = "views"/>
        <LinkTab label="Add A Job" data-active= 'create' />
      </Tabs>
    </Box>
  );
}
