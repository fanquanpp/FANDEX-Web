import { visit } from 'unist-util-visit';

export function rehypeLazyImages() {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if (node.tagName !== 'img') return;
      if (!node.properties) node.properties = {};

      if (!node.properties.loading) {
        node.properties.loading = 'lazy';
      }

      if (!node.properties.decoding) {
        node.properties.decoding = 'async';
      }
    });
  };
}
