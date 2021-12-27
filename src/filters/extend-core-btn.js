import {addFilter} from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls, __experimentalUseColorProps as useColorProps, }  from '@wordpress/block-editor';
import { PanelBody, SelectControl, ColorPalette }   from '@wordpress/components';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { Children, cloneElement } from '@wordpress/element';

const { assign, merge } = lodash;


function extendBtnBlock(settings, name){
    if('core/button' === name){
       console.log(settings);
        return assign({}, settings, {
			attributes: merge(settings.attributes, {
				size: {
					type: 'string',
					default: '',
                },
                backgroundColor: {
                    type:'string',
					default: 'red',
                    
                               },
            }),
          
		});
    }
    return settings;
}

addFilter(
    'blocks.registerBlockType',
    'jay-section/button-block/extend-btn-block',
    extendBtnBlock
);

/**
 * Add Size control to Button block
 */
const addInspectorControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
	
		const {
			attributes: { size, backgroundColor },
			setAttributes,
			name,
		
        } = props;
        
	

        const colors = [
            { name: 'red', color: 'red' },
            { name: 'white', color: 'white' },
            { name: 'blue', color: 'blue' },
        ];
		const setStyle = style === undefined ? {backgroundColor,  margin:'auto'}  : assign({}, style, {backgroundColor, margin:'auto'} );
		
		
	//	const colorProps = async useColorProps( attributes );
	console.log(setStyle);
	console.log(props);


		if (name !== 'core/button') {
			return <BlockEdit {...props} />;
		}
		
		return (
			<Fragment>
				<BlockEdit {...props} className={classnames(className,
			backgroundColor.includes('#') ?  '' : `has-${backgroundColor}-background-color`
					)
						} style={setStyle}  />
				<InspectorControls>
					<PanelBody title={__('Size settings', 'jay-section')} initialOpen={false}>
						<SelectControl
							label={__('Size', 'jay-section')}
							value={size}
							options={[
								{
									label: __('Regular', 'jay-section'),
									value: 'regular',
								},
								{
									label: __('Small', 'jay-section'),
									value: 'small',
								},
								{
									label: __('Large', 'jay-section'),
									value: 'large',
								},
							]}
							onChange={(value) => {
								setAttributes({ size: value });
								//console.log(backgroundColor);
							}}
						/>
					</PanelBody>
                    <PanelBody title={__('My Color','jay-section')} initialOpen={false}>
                    <ColorPalette
            colors={ colors }
            value={backgroundColor}
            onChange={ (name ) => { 
			
				setAttributes({backgroundColor: name})
				
			} 
			}
        /> 
                      </PanelBody> 
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withInspectorControl');

addFilter(
	'editor.BlockEdit',
	'jay-section/button-block/add-inspector-controls',
	addInspectorControl,
);

/**
 * Add size class to the block in the editor
 */
const addSizeClassEditor = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		const {
			attributes: { size, backgroundColor },
			className,
			style,
			name,
		} = props;

	/* 	console.log(
			assign({}, style, {backgroundColor} )	
		) ; */

		if (name !== 'core/button') {
			return <BlockListBlock {...props} />;
		}


		return (
			
			<BlockListBlock
				{...props}
				className={classnames(className,
					
					size ? `has-size-${size}` : '',
					//backgroundColor.includes('#') ?  '' : `has-${backgroundColor}-background-color-p`
					)
						}
				//style={ assign({}, style, {backgroundColor} )} 
			>
</BlockListBlock>
				
		);
	};
}, 'withClientIdClassName');

addFilter(
	'editor.BlockListBlock',
	'jay-section/button-block/add-editor-class',
	addSizeClassEditor,
);

// m
// Our filter function
/* function setBlockCustomClassName( className, blockName ) {
    return blockName === 'core/button' ? 'my-plugin-code' : className;
}
 
// Adding the filter
addFilter(
    'blocks.getBlockDefaultClassName',
    'jay-section//button-block/set-block-custom-class-name',
    setBlockCustomClassName
) */
// m

/**
 * Add size class to the block on the front end
 *
 * @param  {Object} props      Additional props applied to save element.
 * @param  {Object} block      Block type.
 * @param  {Object} attributes Current block attributes.
 * @return {Object}            Filtered props applied to save element.
 */
function addSizeClassFrontEnd(props, block, attributes) {
	if (block.name !== 'core/button') {
		return props;
	}

	const { className, style } = props;
	const { size, backgroundColor } = attributes;

	return assign({}, props, {
		className: classnames(className, 
			size ? `has-size-${size}` : '',
			//backgroundColor.includes('#') ?  '' : `has-${backgroundColor}-background-color-p`
			),
		//style: assign({}, style, {backgroundColor})
	}
	);
}

// Comment out to test the PHP approach defined in intro-to-block-filters.php
addFilter(
	'blocks.getSaveContent.extraProps',
	'jay-section/button-block/add-front-end-class',
	addSizeClassFrontEnd,
);
