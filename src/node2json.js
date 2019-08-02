'use strict';

const util = require('./util');

const convertToJson = function(node, options) {
  const jObj = {};
  jObj.tag = node.tagname;
  //when no child node or attr is present
  if ((!node.child || util.isEmptyObject(node.child)) && (!node.attrsMap || util.isEmptyObject(node.attrsMap))) {
    return util.isExist(node.val) ? node.val : '';
  } else {
    //otherwise create a textnode if node has some text
    if (util.isExist(node.val)) {
      if (!(typeof node.val === 'string' && (node.val === '' || node.val === options.cdataPositionChar))) {
        jObj[options.textNodeName] = node.val;
      }
    }
  }

  util.merge(jObj, node.attrsMap);

  jObj.children = [];
  for (let child of node.child) {
        jObj.children.push(convertToJson(child, options));
  }

  //add value
  return jObj;
};

exports.convertToJson = convertToJson;
