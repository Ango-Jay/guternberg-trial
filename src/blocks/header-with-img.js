import headerMetaData from './header-with-img-block.json';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';


const {name} = headerMetaData;

const headerName = name;
export {headerMetaData, headerName };

export const headerSettings = {
    icon:'smiley',
    edit(){
        const blockProps = useBlockProps();
        const SUB_TEMP = [
            ['core/columns',{},[
                ['core/column', {templateLock:'all', width:'30%',verticalAlignment:'center'},[ ['core/image',{align:'center'}] ] ],
                ['core/column',{templateLock:'all',verticalAlignment:'center'},[ ['core/heading',{placeholder:'enter title'}] ] ]
            ]]
        ]
        return (
            <div {...blockProps}>
                <InnerBlocks template={SUB_TEMP} templateLock='all' />
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