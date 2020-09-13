import React from 'react'; // { Component } 이해가...ㅠㅠ
import './Palette.css';

    const Color = ({ color, active, onClick }) => {

        return(
            <div 
                className={`color ${active && 'active'}`}
                style={{background: color}} 
                onClick={onClick}
            > 
            </div>
        );
    }
    const Palette = ({colors, selected, onSelect}) => {
        const colorList = colors.map(
            (color) => (<Color color={color} active={selected===color} onClick={() => onSelect(color)} key={color}></Color>)
        );
        return(
            <div className="palette">
                {colorList}
            </div>
        );
    };

export default Palette;