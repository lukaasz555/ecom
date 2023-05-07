import React, { useState } from 'react';
import 'draft-js/dist/Draft.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ProductModel } from '../../../models/Product';

interface ITextfield {
	newProduct: ProductModel;
	setNewProduct: React.Dispatch<React.SetStateAction<ProductModel>>;
}

const Textfield = ({ newProduct, setNewProduct }: ITextfield) => {
	const [editorState, setEditorState] = useState<EditorState | undefined>(
		undefined
	);
	const [content, setContent] = useState<string>('');

	const handleClick = () => {
		setNewProduct((prev) => ({ ...prev, description: content }));
	};

	return (
		<>
			<Editor
				editorState={editorState}
				onEditorStateChange={(newState) => {
					setEditorState(newState);
					setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
				}}
				toolbar={{
					options: ['inline', 'list', 'textAlign', 'history'],
				}}
			/>
			<button
				onClick={handleClick}
				className='border-[1px] px-3 py-1 uppercase hover:bg-black hover:text-white duration-150 mt-5'>
				zapisz opis
			</button>
		</>
	);
};

export default Textfield;
