import paraMetadata from './paragraph-with-img-block.json';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';


const {name} = paraMetadata;
const paraName = name;

export {paraMetadata, paraName};

export const paraSettings = {
    icon:'smiley',
    edit(){
        const blockProps = useBlockProps();
        const SUB_TEMP = [
            ['core/columns',{templateLock:'all'},[

                ['core/column', {templateLock:'all'}, [['core/column', {templateLock:'all', width:'30%',verticalAlignment:'center'},[ ['core/image',{align:'left'}] ] ],
                ['core/column',{templateLock:'all',verticalAlignment:'center'},[ ['core/paragraph',{placeholder:'enter txt'}] ] ]
            ]],

            ['core/column', {templateLock:'all'}, [['core/column', {templateLock:'all', width:'30%',verticalAlignment:'center'},[ ['core/image',{align:'left'}] ] ],
            ['core/column',{templateLock:'all',verticalAlignment:'center'},[ ['core/paragraph',{placeholder:'enter txt'}] ] ]
        ]]

                
           
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