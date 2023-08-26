import React from 'react';
import './styles.css';
import logoImage from '../Logo/logo.png';

export const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logoImage} alt="Logo" className="logo" />
            </div>
            <div className="title">
                <div className="main-title">Diário Oficial Eletrônico</div>
                <div className="sub-title">Município de Borrazópolis-PR</div>
            </div>
        </header>
    );
}
