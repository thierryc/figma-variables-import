import React, { useRef } from "react"
import styled from "styled-components"

interface FileDropZoneProps {
	accept: string
	onFileChosen: (files: FileList) => void
}

function FileUpload({ accept, onFileChosen }: FileDropZoneProps) {
	const inputFileRef = useRef<HTMLInputElement | null>(null)
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const element = event.target as HTMLInputElement
		const files = element.files
		if (files) {
			onFileChosen(files)
		}
	}

	const handleFileActive = () => {
		// to reset the input element state before to upload the files
		if (inputFileRef.current) {
			const element = inputFileRef.current as HTMLInputElement
			element.files = new DataTransfer().files
		}
	}

	return (
		<ButtonContainer>
			<input
				type="file"
				accept={accept} // Specify the allowed file types
				multiple
				onChange={handleFileChange}
				ref={inputFileRef}
				onClick={handleFileActive}
			/>
			<ButtonText>Choose files</ButtonText>
		</ButtonContainer>
	)
}

export default FileUpload

const ButtonContainer = styled.label`
	display: inline-block;
	position: relative;
	width: 100%;
	border: 1px solid var(--figma-color-bg-brand, #0d99ff);
	background-color: var(--figma-color-bg-brand, #0d99ff);
	text-align: center;
	line-height: 32px;
	cursor: pointer;
	border-radius: 5px; /* Add border-radius */
	transition: background-color 0.2s ease; /* Add a transition for hover effect */
	outline-color: transparent;
	background-clip: border-box;
	font-weight: 500;

	input[type="file"] {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		top: 0;
		left: 0;
	}

	&:hover {
		background-color: var(--figma-color-bg-brand-hover, #007be5);
	}
`

const ButtonText = styled.span`
	font-size: 11px;
	letter-spacing: calc(0.005px * 11px);
	color: var(--figma-color-text-oninverse, rgba(255, 255, 255, 0.9));
`
