const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = this.addWithin(this._root, data);
  }

  addWithin(node, data) {
    if (!node) {
      return new Node(data);
    }
    if (data === node.data) {
      return node;
    }
    if (data < node.data) {
      node.left = this.addWithin(node.left, data);
    } else {
      node.right = this.addWithin(node.right, data);
    }
    return node;
  }

  has(data) {
    return this.searchWithin(this._root, data);
  }

  searchWithin(node, data) {
    if (!node) {
      return false;
    }
    if (data === node.data) {
      return true;
    }
    return data < node.data ? 
      this.searchWithin(node.left, data) : 
      this.searchWithin(node.right, data);
  }

  find(data) {
    return this.findWithin(this._root, data);
  }

  findWithin(node, data) {
    if (!node) {
      return null;
    }
    if (data === node.data) {
      return node;
    }
    return data < node.data ? 
      this.findWithin(node.left, data) : 
      this.findWithin(node.right, data);
  }

  remove(data) {
    this._root = this.removeNode(this._root, data);
  }

  removeNode(node, data) {
    if (!node) {
      return null;
    }
    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
    } else {
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }
      let minFromRight = this.minNode(node.right);
      node.data = minFromRight.data;
      node.right = this.removeNode(node.right, minFromRight.data);
    }
    return node;
  }

  min() {
    if (!this._root) {
      return;
    }
    let node = this._root;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this._root) {
      return;
    }
    let node = this._root;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }

  minNode(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
}

module.exports = {
  BinarySearchTree
};