import React, { forwardRef } from "react";
import "./DrumPad.css";

const DrumPad = forwardRef(({ id, src, label, playSound, audioRef }, ref) => {
	const handleClick = () => {
		playSound(id, label);
	};

	return (
		<div className="drum-pad" id={id} onClick={handleClick}>
			{id}
			<audio className="clip" id={id} src={`/${src}`} ref={audioRef}></audio>
		</div>
	);
});

export default DrumPad;
