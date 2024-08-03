import React, { useState, useRef, useEffect, useCallback } from "react";
import DrumPad from "./DrumPad";
import "./DrumMachine.css";
import muteIcon from "./mute-icon.png";
import unmuteIcon from "./unmute-icon.png";

const drumPads = [
	{ id: "Q", key: "Heater 1", src: "Heater-1.mp3" },
	{ id: "W", key: "Heater 2", src: "Heater-2.mp3" },
	{ id: "E", key: "Heater 3", src: "Heater-3.mp3" },
	{ id: "A", key: "Heater 4", src: "Heater-4_1.mp3" },
	{ id: "S", key: "Clap", src: "Heater-6.mp3" },
	{ id: "D", key: "Open-HH", src: "Kick_n_Hat.mp3" },
	{ id: "Z", key: "Kick-n-Hat", src: "RP4_KICK_1.mp3" },
	{ id: "X", key: "Kick", src: "CEV_H2.mp3" },
	{ id: "C", key: "Closed-HH", src: "Dsc_Oh.mp3" },
];

const DrumMachine = () => {
	const [display, setDisplay] = useState("Come, Play Drums!");
	const [volume, setVolume] = useState(0.5);
	const [power, setPower] = useState(true);
	const audioRefs = useRef({});

	const playSound = (id, key) => {
		if (!power) return;
		setDisplay(key);
		if (audioRefs.current[id]) {
			audioRefs.current[id].volume = volume;
			audioRefs.current[id].currentTime = 0;
			audioRefs.current[id].play();
		}
	};

	const handleKeyDown = useCallback(
		(e) => {
			const drumPad = drumPads.find((pad) => pad.id === e.key.toUpperCase());
			if (drumPad) playSound(drumPad.id, drumPad.key);
		},
		[playSound]
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	return (
		<div id="drum-machine" className="drum-machine">
			<div id="display" className="display text-[#333]">
				{display}
			</div>

			<div className="drum-pads">
				{drumPads.map((pad) => (
					<DrumPad key={pad.id} id={pad.id} src={pad.src} label={pad.key} playSound={playSound} audioRef={(ref) => (audioRefs.current[pad.id] = ref)} />
				))}
			</div>
			<div id="controls" className="flex items-center justify-between">
				<div className="flex align-items-center gap-x-1">
					<label className="text-[#333]" htmlFor="volume">
						Volume: {Math.round(volume * 100)}
					</label>
					<input id="volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(e.target.value)} />
				</div>
				<div>
					<button className="px-4 py-2" onClick={() => setPower(!power)}>
						<img className="w-6 h-6" src={power ? unmuteIcon : muteIcon} alt={power ? "Mute" : "Unmute"} />
					</button>
				</div>
			</div>
			<p>by hari</p>
		</div>
	);
};

export default DrumMachine;
