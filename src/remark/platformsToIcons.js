// const {visit} = require('unist-util-visit');

// function platformsToIcons() {
//   return (tree) => {
//     visit(tree, 'paragraph', (node) => {
//       if (node.children && node.children[0]?.type === 'text') {
//         const text = node.children[0].value;
//         const matches = text.match(/\[(.*?)\]\\$/);
        
//         if (matches) {
//           const tags = matches[1].split(',').map(t => t.trim());
          
//           // Transform into MDX component
//           node.type = 'mdxJsxFlowElement';
//           node.name = 'TechIcons';
//           node.attributes = [{
//             type: 'mdxJsxAttribute',
//             name: 'tags',
//             value: `{${JSON.stringify(tags)}}`
//           }];
//           node.children = [];
//         }
//       }
//     });
//   };
// }

// module.exports = platformsToIcons;

import {visit} from 'unist-util-visit';
import logger from '@docusaurus/logger';

// const plugin = (options) => {
//   const transformer = async (ast) => {
//     let number = 1;
//     visit(ast, 'text', (node) => {
//       //node.text = 'hello';
            
//       if (node.depth === 2 && node.children.length > 0) {
//         node.children.unshift({
//           type: 'text',
//           value: `Section ${number}. `,
//         });
//         number++;
//       }
//     });
//   };
//   return transformer;
// };

const plugin = () => {
  return (tree) => {
    visit(tree, 'paragraph', (node) => {
      if (node.children && node.children[0]?.type === 'text') {
        const text = node.children[0].value;
        const matches = text.match(/\[(.*?)\]/);
        
        if (matches) {
          const tags = matches[1].split(',').map(t => t.trim());
          
          node.type = 'mdxJsxFlowElement';
          node.name = 'TechIcons';
          node.attributes = [{
            type: 'mdxJsxAttribute',
            name: 'tags',
            value: JSON.stringify(tags)
          }];
          node.children = [];
        }
      }
    });
  };
};

export default plugin;