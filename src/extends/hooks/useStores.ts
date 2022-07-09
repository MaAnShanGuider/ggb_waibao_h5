import React, { useState, useEffect } from "react";
import { MobXProviderContext } from 'mobx-react';

function useStores() {
	return React.useContext(MobXProviderContext);
}

export default useStores;