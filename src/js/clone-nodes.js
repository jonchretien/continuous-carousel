/**
 * Clones the first x nodes and appends them to a container.
 *
 * @param {Array} items - A list of items to clone.
 * @param {Number} number - The number of items to clone.
 * @param {Object} container - The container to append cloned nodes to.
 * @api public
 */
const cloneNodes = (items, number, container) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < number; ++i) {
    const node = items[i].cloneNode(true);
    fragment.appendChild(node);
  }

  container.appendChild(fragment);
};

export default cloneNodes;
