const Node$internal = new WeakMap();

/**
 * Hierarchical resource node.
 * @constructor
 */
function Node() {
    Node.init(this);
}

/**
 * True if value is a Node instance.
 * @param {*} value
 * @returns {boolean}
 */
Node.isNode = function(value) {
    return Node$internal.has(value);
};

/**
 * Initialize node internals.
 * @param {Node} node
 */
Node.init = function(node) {
    Node$internal.set(node, {
        attached: new Map();
    });
};

/**
 * Mix Node class into a constructor or object.
 * @param {function|object} mixed
 */
Node.mix = function(mixed) {
    mixed = typeof mixed === "function" ? mixed.prototype : mixed;

    Object.keys(Node.prototype).forEach(key => {
        mixed[key] = Node.prototype[key];
    });
};

/**
 * Attach a value to this node.
 * @param {string} name
 * @param {*} value
 */
Node.prototype.attach = function(name, value) {
    var attached = Node$internal.get(this).attached;

    if (attached.has(name)) {
        throw new Error(`'${name}' already attached`);
    }

    attached.set(name, value);
};

/**
 * Detach a name from this node and return the corresponding value.
 * @param {string} name
 * @returns {*}
 */
Node.prototype.detach = function(name) {
    var attached = Node$internal.get(this).attached,
        result;

    if (attached.has(name)) {
        result = attached.get(name);
        attached.delete(name);
    }

    return result;
};

/**
 * Return attached value.
 * @param {string} name
 * @returns {*}
 */
Node.prototype.attached = function(name) {
    return Node$internal.get(this).attached.get(name);
};

/**
 * Return dictionary of attached values.
 * @returns {object.<string,*>}
 */
Node.prototype.attachments = function() {
    var attachments = {};

    for (entry of Node$internal.get(this).attached.entries()) {
        attachments[entry[0]] = entry[1];
    }

    return attachments;
};

/**
 * Lookup value of resource expression starting with this node.
 * @param {string} expr
 * @returns {*}
 */
Node.prototype.find = function(expr) {
    if (expr === ".") return this;
};

module.exports = Node;

