import styles from './styles.module.css';
import Svg from '@site/static/img/zklogo.svg';

interface LogoProps {
}

export default function Logo({}: LogoProps): JSX.Element {
    return (
        <div className={styles.customGradient}>
            <Svg className={styles.logoSvg} role="img"></Svg>
        </div>
    );
}