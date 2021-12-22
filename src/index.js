/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( 'jay-section/jay-section', {
	/**
	 * @see ./edit.js
	 */
	edit,

	/**
	 * @see ./save.js
	 */
	save,
} );

/* CHILD BLOCKS  */
// header 
import {headerMetaData, headerName, headerSettings } from './blocks/header-with-img';
//registerBlockType({headerName, ...headerMetaData}, headerSettings);
// paragraph 
import {paraMetadata, paraName, paraSettings } from './blocks/paragraph-with-img';
//registerBlockType({paraName, ...paraMetadata}, paraSettings);

const registerBlk = (name, metadata, settings) => {
registerBlockType({name,...metadata}, settings);
};

registerBlk(headerName, headerMetaData, headerSettings );
registerBlk(paraName, paraMetadata, paraSettings);
