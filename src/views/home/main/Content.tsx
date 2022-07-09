import * as React from "react";
import { observer, inject, Observer } from "mobx-react";

const HomeMain = observer(({ homeMain }) => {
	
	return (
		// <KeepAlive key="homeMain" id="homeMain">
		<div className="v-home-main g-relative">
			<span>11111</span>
		</div>
		// </KeepAlive>
	);
});

export default inject('homeMain')(HomeMain);
