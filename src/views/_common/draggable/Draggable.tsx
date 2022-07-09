import useStores from '@extends/hooks/useStores';
import { observer } from 'mobx-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import "./draggable.scss";

interface Props {
	width?: number,
	left?:number,
	top?:number,
}

const Draggable: React.FC<Props> = observer((props) => {
	
	const { homeMain } = useStores();
	
	const totalWidth = document.documentElement.clientWidth;
	const totalHeight = document.documentElement.clientHeight;
	let objX = 0;
	let objY = 0;
	const isMouseDown = useRef<boolean>(false);
	const width = props.width ?? 300;
	const [targetX, setTargetX] = useState<number>(props.left ?? document.documentElement.clientWidth - width);
	const [targetY, setTargetY] = useState<number>(props.top ?? 151);

	// const [isMouseDown, setMouseDown] = useState(mouseRef.current);
	
	const handleMove2 = useCallback((e) => {
		e.stopPropagation();

		if (isMouseDown.current) {
			console.log("第一次");
			let tempX = parseInt((e.clientX - objX) + '');
			let tempY = parseInt((e.clientY - objY) + "");
			// console.log(tempX);
			if (tempX < 0) {
				setTargetX(0);
			} else if (tempX > totalWidth - width) {
				setTargetX(totalWidth - width);
			} else {
				setTargetX(tempX);
			}

			if (tempY < 0) {
				setTargetY(0);
			} else if (tempY > totalHeight) {
				setTargetY(totalHeight);

			} else {
				setTargetY(tempY);
			}
		} else {
			isMouseDown.current = false;
			// setMouseDown(false);
		}

	}, [isMouseDown]);

	const handleMove = (e) => {
		e.stopPropagation();
		if (!e.target.className.includes("__drage-title")) {
			return;
		}
		if (isMouseDown.current) {
			let tempX = parseInt((e.clientX - objX) + '');
			let tempY = parseInt((e.clientY - objY) + "");
			// console.log(tempX);
			if (tempX < 0) {
				setTargetX(0);
			} else if (tempX > totalWidth - width) {
				setTargetX(totalWidth - width);
			} else {
				setTargetX(tempX);
			}

			if (tempY < 0) {
				setTargetY(0);
			} else if (tempY > totalHeight) {
				setTargetY(totalHeight);

			} else {
				setTargetY(tempY);

			}
		} else {
			console.log(isMouseDown.current);
			isMouseDown.current = false;
			// setMouseDown(false);
		}

	};
	const handleMouseUp = (event) => {

		event.stopPropagation();
		isMouseDown.current = false;
		document.removeEventListener("mousemove", handleMove);
		document.removeEventListener("mouseup", handleMouseUp);

	};
	
	const handleMouseDown = (event) => {
		event.stopPropagation();
		// let e = event.target;
		let e = event;

		objX = e.nativeEvent.offsetX;
		objY = e.nativeEvent.offsetY;
		isMouseDown.current = true;
	
		document.addEventListener("mousemove", handleMove);
		document.addEventListener("mouseup", handleMouseUp);

	};
	useEffect(() => {
		console.log(isMouseDown);
	}, [isMouseDown]);
	return (
		<div
			className="c-draggable g-fixed"
			style={{
				left: targetX,
				top: targetY,
			}}
			onMouseDown={handleMouseDown}
		>	
			
			{ props.children }
		</div>
	);
});
export default Draggable;