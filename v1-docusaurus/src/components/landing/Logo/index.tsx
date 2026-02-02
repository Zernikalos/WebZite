import clsx from 'clsx';
import styles from './styles.module.css';
import Svg from '@site/static/img/zklogo.svg';

interface LogoProps {
  isMobile?: boolean;
}

export default function Logo({ isMobile }: LogoProps): JSX.Element {
    return (
        <Svg 
        className={clsx(
            styles.customGradient, 
            'tw:flex-shrink-0',
            isMobile ? 'tw:w-96 tw:h-96' : 'tw:w-150 tw:h-150'
        )} 
        style={{ 
            transform: isMobile 
                ? 'scaleX(-1) scale(1) rotate(10deg) translateX(-10%)' 
                : 'scaleX(-1) scale(1.2) rotate(10deg) translateX(-10%)', 
            transformOrigin: 'center' 
        }} 
        role="img"
        />
    );
}