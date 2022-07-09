/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useCallback } from 'react';
import './index.scss';
import useStores from '@extends/hooks/useStores';

interface Props {

}

const Content: React.FC<Props> = (props) => {
	const { homeMain } = useStores();
	 
	return (
		<div>22222</div>
	);
};
export default Content;
