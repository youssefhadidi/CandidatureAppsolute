import { useStoreRehydrated } from 'easy-peasy';
import React from 'react'

function IsHydrated({children}) {
    const isRehydrated = useStoreRehydrated();
    return isRehydrated ? children : <p>loading...</p>;
}

export default IsHydrated