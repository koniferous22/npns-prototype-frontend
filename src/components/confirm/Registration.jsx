import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'

import ContentDiv from '../../styled-components/defaults/ContentDiv'

import { gql, useMutation } from '@apollo/client'

const ConfirmRegistrationPage = ({ token }) => {
  useEffect(() => {
    const emailToken = token
    verify({
      variables: {
        emailToken
      }
    })
  }, [token]);
  
  console.log('bbbb')

  const USER_VERIFY = gql`
    mutation UserVerify($emailToken: String!) {
      userVerify(emailToken: $emailToken) {
        message
      }
    }
  `;

  const [ verify, { loading, error, data } ] = useMutation(USER_VERIFY, { errorPolicy: 'all'})
  console.log(data)

  if (loading) return <ContentDiv>Loading...</ContentDiv>;
  if (error) return (
    <ContentDiv>
      {error.message}
      <p>Error! Account is either already confirmed, or the link is incorrect.</p>
    </ContentDiv>
  )
  return (
    <ContentDiv>
      Success!
      <p>{data && data.userVerify.message}</p>
      <p>Continue to <Link to='/login'>Login</Link></p>
    </ContentDiv>
  )
}

export default ConfirmRegistrationPage