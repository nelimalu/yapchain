import React, { Component } from 'react';
import '../clearBG.css';
var html = '<h1>Hello, world!</h1>'

export default function Canvas() {
    return React.createElement("div", {dangerouslySetInnerHTML: {__html: html}})
}
  

