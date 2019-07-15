import React from 'react'

const authContext = React.createContext({ status: false, authenticate: () => { } });

export default authContext;