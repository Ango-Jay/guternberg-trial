import buttonMetaData from './adv-button-block.json';
import { InnerBlocks, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {Fragment} from '@wordpress/element'
import {Panel, PanelBody, PanelRow} from '@wordpress/components'


const {name} = buttonMetaData;

const buttonName = name;
export {buttonMetaData, buttonName };

export const buttonSettings = {
    icon:'smiley',
    edit(){
        const blockProps = useBlockProps();
        const BUT_TEMP = [
            ['core/button',{backgroundColor:'#ff0',placeholder:'Enter text'}]
        ]
        return (
            <div {...blockProps}>
           {/*     <Fragment>
                    <InspectorControls>
                        <Panel>
                            <PanelBody title="Advanced Block Settings">
                                <PanelRow>Inputs and Labels</PanelRow>
                            </PanelBody>
                        </Panel>
                    </InspectorControls>
                <button>go to</button>
                </Fragment> */}
                <InnerBlocks template={BUT_TEMP} templateLock='all' />
            </div>
        );
    },
    save(){
        const blockProps = useBlockProps.save();
        return (
            <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
        );
    },
}
