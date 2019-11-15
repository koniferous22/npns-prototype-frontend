import React from 'react';
import styled from 'styled-components';

const BackendMessage = styled.div`
  color: ${props =>
  ({
    'ERROR': 'red',
    'INFO': 'black'
  })[props.messageType]
}`

export default BackendMessage
