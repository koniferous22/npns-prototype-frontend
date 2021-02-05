import React, { useContext } from 'react';
import AuthContext from '../../AuthContext';

import QueueSidebar from '../queue/QueueSidebar';

import ContentDiv from '../../styled-components/defaults/ContentDiv';
import PageDiv from '../../styled-components/defaults/PageDiv';

const Homepage = () => {
  const { user } = useContext(AuthContext);
  return (
    <PageDiv>
      <QueueSidebar />
      <ContentDiv sidebar>
        <h2>
          Welcome {(user && user.username) ? user.username : 'guest'}
        </h2>
        No clue what should be added to the homepage
      </ContentDiv>
    </PageDiv>
  );
};

export default Homepage;
