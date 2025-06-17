import clsx from 'clsx';
import styles from './styles.module.css';
import Svg from '@site/static/img/zklogo.svg';

interface LogoProps {
}

export default function Logo({}: LogoProps): JSX.Element {
    return (
        <Svg 
        className={clsx(styles.customGradient, 'tw:w-150 tw:h-150 tw:flex-shrink-0')} 
        style={{ 
            transform: 'scaleX(-1) scale(1.2) rotate(10deg) translateX(-10%)', 
            transformOrigin: 'center' 
        }} 
        role="img"
        />
    );
}